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
  assert.equal(classifier.nextDiagnostic(scores, responses, diagnosticResponses), null,
    "Completed or exhausted routes must stop");
  return { order, diagnosticResponses };
}

// A moderately nonpositive Source core can legitimately start as Mixed: the
// Source nouns require the affirmative diagnostic evidence still being sought.
// Test the actual 88-answer path rather than injecting that missing evidence.
const sourceProbes = new Set([
  "D-NP1", "D-NP2", "D-NP3", "D-NP4", "D-NP5", "D-NP6", "D-NL2"
]);
function unresolvedSourceCore() {
  return Object.assign(Object.fromEntries(questions.map((q) => [q.id, 0])), {
    S1:-3, S2:-1, S3:-3, S4:-3, S5:-3, S6:3, S7:-3, S8:-1, S10:0, S11:0
  });
}
{
  const responses = unresolvedSourceCore();
  const scores = scoring.scoreAll(responses);
  assert.ok(scores.sorc.score > 18 && scores.sorc.score <= 38);
  assert.equal(classifier.resolveIdentity(scores, classifier.buildTraits(scores, responses, {}))
    .best.identity.id, "mixed_jurisprudence");

  for (const acceptImpact of [false, true]) {
    const { order, diagnosticResponses } = run(scores, responses, (id) =>
      id === "D-QC1" ? -2 : id === "D-NP4" && acceptImpact ? 3 : -3
    );
    assert.ok(order.includes("D-NP4"), "Mixed must be able to test Moral Impact Theory");
    const result = classifier.classify(scoring.scoreAllWithDiagnostics(responses, diagnosticResponses),
      responses, diagnosticResponses, { coreElapsedMs: 10 * 60 * 1000 });
    assert.equal(result.identity.id, acceptImpact ? "nonpositivist" : "mixed_jurisprudence");
    assert.equal(result.champions[0]?.id, acceptImpact ? "greenberg" : "oconnor");
    if (acceptImpact) {
      assert.ok(!order.includes("D-NP5") && !order.includes("D-NP3"),
        "An established Moral-Impact theory must stop competing Source probes");
    } else {
      assert.ok(order.includes("D-NP5") && order.includes("D-NP3"),
        "Rejected theories must allow the remaining existing Source alternatives to be tested");
    }
  }

  const failedCheck = run(scores, responses, (id) => id === "D-QC1" ? 0 : -3);
  assert.deepEqual(failedCheck.order, ["D-QC1"],
    "Source exploration must not bypass response-quality checks");
}

// Established competing families retain their slots. This literal Originalist
// core also has moderate nonpositive Source answers but no confirmed Source noun.
{
  const responses = unresolvedSourceCore();
  for (const q of questions.filter((q) => q.axis === "time")) {
    responses[q.id] = Number(q.signals?.agree?.time || 0) >=
      Number(q.signals?.disagree?.time || 0) ? 3 : -3;
  }
  const scores = scoring.scoreAll(responses);
  assert.ok(scores.sorc.score > 18 && scores.sorc.score <= 38);
  const { order } = run(scores, responses, (id) =>
    id === "D-QC1" ? -2 : id === "D-ORI1" ? 3 : -3
  );
  assert.ok(order.includes("D-ORI1"), "The established Originalist branch must retain its noun refinement");
  assert.ok(!order.some((id) => sourceProbes.has(id)),
    "The Mixed-only Source repair must not spend an established competing family's budget");
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

