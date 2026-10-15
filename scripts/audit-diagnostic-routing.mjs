import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const context = vm.createContext({ console });
context.globalThis = context;

for (const filename of [
  "axes.js", "questions.js", "scoring.js", "result_catalog.js",
  "diagnostics.js", "profiles.js", "result_content.js", "classification.js"
]) {
  vm.runInContext(fs.readFileSync(path.join(root, filename), "utf8"), context, { filename });
}

const classifier = context.LAW_CLASSIFIER;
const scoring = context.LAW_SCORING;
const questions = context.LAW_QUESTIONS;

assert.equal(classifier.MAX_TOTAL_QUESTIONS, 100);
assert.equal(questions.length + classifier.MAX_DIAGNOSTICS, 100);

function run(scores, responses, answerFor) {
  const diagnosticResponses = {};
  const order = [];
  for (let i = 0; i < classifier.MAX_DIAGNOSTICS; i += 1) {
    const next = classifier.nextDiagnostic(scores, responses, diagnosticResponses);
    if (!next) break;
    assert.ok(!order.includes(next.id), "Router repeated " + next.id);
    order.push(next.id);
    diagnosticResponses[next.id] = answerFor(next.id);
  }
  assert.ok(order.length <= classifier.MAX_DIAGNOSTICS);
  return { order, diagnosticResponses };
}

// Regression: a strong Source result must not lose Positivist architecture
// questions merely because Time is also historical.
{
  const scores = {sorc:96,cons:70,time:65,prec:75,remed:90,post:65,separ:25,form:65};
  const { order } = run(scores, {}, (id) =>
    id === "D-QC1" ? -2 :
    id === "D-POS1" ? -3 :
    id === "D-AUS1" ? 3 :
    id === "D-RLS1" ? 0 : -2
  );
  assert.ok(order.includes("D-POS1"), "Strong Positivism must reach D-POS1");
  assert.ok(order.includes("D-AUS1"), "Strong Positivism must be able to reach Austin discrimination");
}

// Structural extremes must still reach the distinct specialist questions.
function structuralAnswers(side) {
  const responses = Object.fromEntries(questions.map((q) => [q.id, 0]));
  for (const q of questions.filter((q) => q.axis === "separ")) {
    const agree = Number(q.signals?.agree?.separ || 0) * side;
    const disagree = Number(q.signals?.disagree?.separ || 0) * side;
    responses[q.id] = agree >= disagree ? 3 : -3;
  }
  return responses;
}
{
  const seen = new Set();
  for (const side of [1, -1]) {
    const responses = structuralAnswers(side);
    const scores = scoring.scoreAll(responses);
    const { order } = run(scores, responses, (id) =>
      id === "D-QC1" ? -2 : id === "D-RLS1" ? -2 : id === "D-QC2" ? 1 : 0
    );
    for (const id of ["D-SEP1","D-SEP2","D-SEP3","D-SEP4"]) {
      if (order.includes(id)) seen.add(id);
    }
  }
  assert.deepEqual([...seen].sort(), ["D-SEP1","D-SEP2","D-SEP3","D-SEP4"]);
}

// Deterministic fuzzing: no repeats, no overflow, no router exceptions.
{
  let seed = 246813579;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const values = [-3,-2,-1,0,1,2,3];

  for (let n = 0; n < 200; n += 1) {
    const responses = {};
    for (const q of questions) responses[q.id] = values[Math.floor(random() * values.length)];
    const scores = scoring.scoreAll(responses);
    const diagnostics = {};
    const order = [];

    for (let i = 0; i < classifier.MAX_DIAGNOSTICS; i += 1) {
      const next = classifier.nextDiagnostic(scores, responses, diagnostics);
      if (!next) break;
      assert.ok(!order.includes(next.id), "Synthetic route repeated " + next.id);
      order.push(next.id);
      let value = values[Math.floor(random() * values.length)];
      if (next.id === "D-QC1") value = -2;
      if (next.id === "D-QC2") value = 1;
      diagnostics[next.id] = value;
    }

    assert.ok(order.length <= classifier.MAX_DIAGNOSTICS);
    classifier.classify(
      scoring.scoreAllWithDiagnostics(responses, diagnostics),
      responses,
      diagnostics,
      { coreElapsedMs: 10 * 60 * 1000 }
    );
  }
}

console.log("PASS: candidate-aware diagnostic routing stays inside the 100-question cap.");
