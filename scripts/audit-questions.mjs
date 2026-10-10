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
  const source = fs.readFileSync(path.join(root, filename), "utf8");
  vm.runInContext(source, context, { filename });
}

const axes = context.LAW_AXES;
const sources = context.LAW_SOURCES;
const questions = context.LAW_QUESTIONS;
const scoring = context.LAW_SCORING;

assert.equal(axes.length, 8, "There must be exactly eight axes");
assert.equal(new Set(axes.map((axis) => axis.id)).size, axes.length, "Axis IDs must be unique");
assert.equal(questions.length, 48, "There must be exactly 48 questions");
assert.equal(new Set(questions.map((item) => item.id)).size, questions.length, "Question IDs must be unique");
assert.equal(new Set(questions.map((item) => item.prompt)).size, questions.length, "Question prompts must be unique");

for (const item of questions) {
  assert.ok(axes.some((axis) => axis.id === item.axis), `${item.id} has an unknown axis`);
  assert.ok(item.key === 1 || item.key === -1, `${item.id} must have a key of +1 or -1`);
  assert.ok(Array.isArray(item.sourceIds) && item.sourceIds.length > 0, `${item.id} needs source grounding`);
  item.sourceIds.forEach((sourceId) => {
    assert.ok(sources[sourceId], `${item.id} cites unknown source ${sourceId}`);
  });
  const words = item.prompt.trim().split(/\s+/).length;
  assert.ok(words <= 60, `${item.id} is too long at ${words} words`);
}

const axisRows = [];
for (const axis of axes) {
  const items = questions.filter((item) => item.axis === axis.id);
  const positive = items.filter((item) => item.key === 1).length;
  const negative = items.filter((item) => item.key === -1).length;
  assert.equal(items.length, 6, `${axis.id} must have six questions`);
  assert.equal(positive, 3, `${axis.id} must have three first-pole items`);
  assert.equal(negative, 3, `${axis.id} must have three second-pole items`);
  axisRows.push({ axis: axis.name, items: items.length, firstPole: positive, secondPole: negative });
}

function responsesFrom(fn) {
  return Object.fromEntries(questions.map((item) => [item.id, fn(item)]));
}

for (const constant of [-3, -2, -1, 0, 1, 2, 3]) {
  const result = scoring.scoreAll(responsesFrom(() => constant), axes, questions);
  for (const axis of axes) {
    assert.equal(result[axis.id].score, 50, `Constant response ${constant} should score ${axis.id} at 50`);
  }
}

const allLeft = scoring.scoreAll(responsesFrom((item) => 3 * item.key), axes, questions);
const allRight = scoring.scoreAll(responsesFrom((item) => -3 * item.key), axes, questions);
for (const axis of axes) {
  assert.equal(allLeft[axis.id].score, 100, `${axis.id} first-pole ideal must score 100`);
  assert.equal(allRight[axis.id].score, 0, `${axis.id} second-pole ideal must score 0`);
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

const sampleSize = 20000;
const vectors = Object.fromEntries(axes.map((axis) => [axis.id, []]));
for (let respondent = 0; respondent < sampleSize; respondent += 1) {
  const result = scoring.scoreAll(responsesFrom(() => randomResponse()), axes, questions);
  axes.forEach((axis) => vectors[axis.id].push(result[axis.id].score));
}

function correlation(a, b) {
  const meanA = a.reduce((sum, value) => sum + value, 0) / a.length;
  const meanB = b.reduce((sum, value) => sum + value, 0) / b.length;
  let covariance = 0;
  let varianceA = 0;
  let varianceB = 0;
  for (let i = 0; i < a.length; i += 1) {
    const da = a[i] - meanA;
    const db = b[i] - meanB;
    covariance += da * db;
    varianceA += da * da;
    varianceB += db * db;
  }
  return covariance / Math.sqrt(varianceA * varianceB);
}

let maxOffAxisCorrelation = 0;
for (let i = 0; i < axes.length; i += 1) {
  for (let j = i + 1; j < axes.length; j += 1) {
    const value = Math.abs(correlation(vectors[axes[i].id], vectors[axes[j].id]));
    maxOffAxisCorrelation = Math.max(maxOffAxisCorrelation, value);
  }
}
assert.ok(
  maxOffAxisCorrelation < 0.04,
  `Independent-response simulation created excessive off-axis correlation: ${maxOffAxisCorrelation}`
);

const htmlFiles = ["index.html", "instructions.html", "quiz.html", "results.html", "methodology.html"];
for (const filename of htmlFiles) {
  const html = fs.readFileSync(path.join(root, filename), "utf8");
  assert.ok(!/adsbygoogle|statcounter/i.test(html), `${filename} contains legacy tracking code`);
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|#|mailto:)/.test(target)) continue;
    const pathname = target.split(/[?#]/)[0];
    assert.ok(fs.existsSync(path.join(root, pathname)), `${filename} references missing local file ${pathname}`);
  }
}

console.table(axisRows);
console.log(`PASS: 48 items, balanced 3/3 on every axis.`);
console.log(`PASS: constant-response, endpoint, and score-symmetry tests.`);
console.log(`PASS: maximum simulated off-axis correlation = ${maxOffAxisCorrelation.toFixed(4)}.`);
console.log(`PASS: local asset references and no legacy ad/tracking scripts.`);
