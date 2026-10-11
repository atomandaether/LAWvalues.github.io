import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const context = vm.createContext({ console });
context.globalThis = context;

for (const filename of ["axes.js", "sources.js", "questions.js", "scoring.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, filename), "utf8"), context, { filename });
}

const axes = context.LAW_AXES;
const sources = context.LAW_SOURCES;
const questions = context.LAW_QUESTIONS;
const scoring = context.LAW_SCORING;

assert.equal(axes.length, 8, "There must be exactly eight axes");
assert.equal(context.LAW_QUESTION_COUNT, 93, "The configured question count must be 93");
assert.equal(questions.length, 93, "The question bank must contain 93 questions");
assert.equal(new Set(questions.map((item) => item.id)).size, 93, "Question IDs must be unique");
assert.equal(new Set(questions.map((item) => item.prompt)).size, 93, "Question prompts must be unique");

const axisIds = new Set(axes.map((axis) => axis.id));
for (const item of questions) {
  assert.ok(axisIds.has(item.axis), `${item.id} has an unknown nominal axis`);
  assert.ok(item.key === 1 || item.key === -1, `${item.id} must have a primary key of +1 or -1`);
  assert.ok(item.weights && typeof item.weights === "object", `${item.id} needs a scoring vector`);
  for (const [axisId, weight] of Object.entries(item.weights)) {
    assert.ok(axisIds.has(axisId), `${item.id} has unknown weighted axis ${axisId}`);
    assert.ok(Number.isFinite(weight) && weight !== 0 && Math.abs(weight) <= 1,
      `${item.id} has invalid weight ${axisId}=${weight}`);
  }
  assert.ok(Array.isArray(item.sourceIds) && item.sourceIds.length > 0, `${item.id} needs source grounding`);
  item.sourceIds.forEach((sourceId) => assert.ok(sources[sourceId], `${item.id} cites unknown source ${sourceId}`));
  assert.ok(item.prompt.trim().split(/\s+/).length <= 125, `${item.id} is too long`);
}

const unscored = Array.from(
  questions.filter((item) => Object.keys(item.weights).length === 0),
  (item) => String(item.id)
);
assert.equal(
  unscored.join(","),
  "C13",
  "Only the literalism/context subtype item should be headline-unscored"
);

const axisRows = [];
for (const axis of axes) {
  const items = questions.filter((item) => scoring.weightForAxis(item, axis.id) !== 0);
  const positive = items.filter((item) => scoring.weightForAxis(item, axis.id) > 0);
  const negative = items.filter((item) => scoring.weightForAxis(item, axis.id) < 0);
  assert.ok(positive.length > 0 && negative.length > 0, `${axis.id} needs both directional families`);
  axisRows.push({
    axis: axis.name,
    contributingItems: items.length,
    positiveItems: positive.length,
    negativeItems: negative.length,
    absoluteWeight: Number(items.reduce(
      (sum, item) => sum + Math.abs(scoring.weightForAxis(item, axis.id)), 0
    ).toFixed(2))
  });
}

function responsesFrom(fn) {
  return Object.fromEntries(questions.map((item) => [item.id, fn(item)]));
}

// Acquiescence must remain neutral even though the working instrument is not polarity-count-balanced.
for (const constant of [-3, -2, -1, 0, 1, 2, 3]) {
  const result = scoring.scoreAll(responsesFrom(() => constant), axes, questions);
  for (const axis of axes) {
    assert.equal(result[axis.id].score, 50, `Constant response ${constant} should score ${axis.id} at 50`);
  }
}

// Each axis must still span its full theoretical range when responses track that axis's weights.
for (const axis of axes) {
  const towardFirst = responsesFrom((item) => {
    const weight = scoring.weightForAxis(item, axis.id);
    return weight === 0 ? 0 : 3 * Math.sign(weight);
  });
  const towardSecond = Object.fromEntries(
    Object.entries(towardFirst).map(([id, value]) => [id, -value])
  );
  assert.equal(scoring.scoreAxis(axis.id, towardFirst, questions).score, 100,
    `${axis.id} first-pole ideal must score 100`);
  assert.equal(scoring.scoreAxis(axis.id, towardSecond, questions).score, 0,
    `${axis.id} second-pole ideal must score 0`);
}

let seed = 0x5eed1234;
function random() {
  seed = (1664525 * seed + 1013904223) >>> 0;
  return seed / 4294967296;
}
function randomResponse() {
  return Math.floor(random() * 7) - 3;
}

for (let test = 0; test < 100; test += 1) {
  const response = responsesFrom(() => randomResponse());
  const mirrored = Object.fromEntries(Object.entries(response).map(([id, value]) => [id, -value]));
  const a = scoring.scoreAll(response, axes, questions);
  const b = scoring.scoreAll(mirrored, axes, questions);
  for (const axis of axes) {
    assert.equal(a[axis.id].score + b[axis.id].score, 100, `${axis.id} scoring must be symmetric`);
  }
}

// Shared questions intentionally create some mechanical cross-axis correlation.
// Report it for inspection instead of incorrectly requiring independence.
const sampleSize = 20000;
const vectors = Object.fromEntries(axes.map((axis) => [axis.id, []]));
for (let respondent = 0; respondent < sampleSize; respondent += 1) {
  const result = scoring.scoreAll(responsesFrom(() => randomResponse()), axes, questions);
  axes.forEach((axis) => vectors[axis.id].push(result[axis.id].score));
}
function correlation(a, b) {
  const meanA = a.reduce((sum, value) => sum + value, 0) / a.length;
  const meanB = b.reduce((sum, value) => sum + value, 0) / b.length;
  let covariance = 0, varianceA = 0, varianceB = 0;
  for (let i = 0; i < a.length; i += 1) {
    const da = a[i] - meanA, db = b[i] - meanB;
    covariance += da * db;
    varianceA += da * da;
    varianceB += db * db;
  }
  return covariance / Math.sqrt(varianceA * varianceB);
}
const correlations = [];
for (let i = 0; i < axes.length; i += 1) {
  for (let j = i + 1; j < axes.length; j += 1) {
    correlations.push({
      pair: `${axes[i].id}/${axes[j].id}`,
      r: Number(correlation(vectors[axes[i].id], vectors[axes[j].id]).toFixed(3))
    });
  }
}
correlations.sort((a, b) => Math.abs(b.r) - Math.abs(a.r));

const htmlFiles = ["index.html", "instructions.html", "quiz.html", "results.html"];
const htmlByFile = {};
for (const filename of htmlFiles) {
  const html = fs.readFileSync(path.join(root, filename), "utf8");
  htmlByFile[filename] = html;
  assert.ok(!/adsbygoogle|statcounter/i.test(html), `${filename} contains legacy tracking code`);
  assert.ok(!/methodology\.html/i.test(html), `${filename} links to the removed methodology page`);
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|#|mailto:)/.test(target)) continue;
    const pathname = target.split(/[?#]/)[0];
    assert.ok(fs.existsSync(path.join(root, pathname)), `${filename} references missing local file ${pathname}`);
  }
}

assert.ok(htmlByFile["index.html"].includes("Version 0.5 Beta"), "Front page must show Version 0.5 Beta");
assert.ok(htmlByFile["instructions.html"].includes("You will be presented with a series of statements about legal interpretation and judicial philosophy. For each one, click the button with your opinion on it."),
  "Instructions must retain the original wording");
assert.ok(htmlByFile["quiz.html"].includes('aria-valuemax="93"'), "Quiz progress maximum must be 93");
assert.ok(htmlByFile["results.html"].includes('<script src="questions.js"></script>'),
  "Results must load questions for multidimensional coverage counts");
assert.ok(!htmlByFile["results.html"].includes("Print / PDF"), "Results should not show Print / PDF");
assert.ok(!htmlByFile["results.html"].includes(">Retake<"), "Results should not show Retake");

console.table(axisRows);
console.log("Highest mechanical score correlations from shared questions:", correlations.slice(0, 8));
console.log(`PASS: 93 items; 92 affect at least one headline axis and C13 remains a subtype-only diagnostic.`);
console.log(`PASS: ${questions.filter((item) => Object.keys(item.weights).length > 1).length} questions cross-load onto multiple axes.`);
console.log("PASS: polarity-balanced multidimensional scoring, endpoint coverage, and mirror symmetry.");
console.log("PASS: original visible copy and Version 0.5 Beta preserved.");
