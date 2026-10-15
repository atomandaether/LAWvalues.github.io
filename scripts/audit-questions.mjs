import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const context = vm.createContext({ console });
context.globalThis = context;

for (const filename of ["axes.js", "sources.js", "questions.js", "scoring.js", "diagnostics.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, filename), "utf8"), context, { filename });
}

const axes = context.LAW_AXES;
const sources = context.LAW_SOURCES;
const questions = context.LAW_QUESTIONS;
const scoring = context.LAW_SCORING;

const questionText = questions.map((item) => item.prompt).join("\n");
for (const typo of [
  "exactly vastly",
  "Now, its clear",
  "until its fixed",
  "know you're answer"
]) {
  assert.ok(!questionText.includes(typo), `Question bank still contains literal typo: ${typo}`);
}

assert.equal(axes.length, 8, "There must be exactly eight axes");
assert.equal(context.LAW_QUESTION_COUNT, 88, "The configured question count must be 88");
assert.equal(questions.length, 88, "The question bank must contain 88 questions");
assert.equal(new Set(questions.map((item) => item.id)).size, 88, "Question IDs must be unique");
assert.equal(new Set(questions.map((item) => item.prompt)).size, 88, "Question prompts must be unique");

const axisIds = new Set(axes.map((axis) => axis.id));
for (const item of questions) {
  assert.ok(axisIds.has(item.axis), `${item.id} has an unknown nominal axis`);
  assert.ok(item.key === 1 || item.key === -1, `${item.id} must have a primary key of +1 or -1`);
  assert.ok(item.signals && typeof item.signals === "object", `${item.id} needs signals`);
  for (const direction of ["agree", "disagree"]) {
    assert.ok(item.signals[direction] && typeof item.signals[direction] === "object",
      `${item.id} needs ${direction} signals`);
    for (const [axisId, weight] of Object.entries(item.signals[direction])) {
      assert.ok(axisIds.has(axisId), `${item.id} has unknown axis ${axisId}`);
      assert.ok(Number.isFinite(weight) && weight !== 0 && Math.abs(weight) <= 1,
        `${item.id} has invalid ${direction} signal ${axisId}=${weight}`);
    }
  }
  assert.ok(
    Object.keys(item.signals.agree).length + Object.keys(item.signals.disagree).length > 0,
    `${item.id} must inform at least one axis in at least one direction`
  );
  assert.ok(Array.isArray(item.sourceIds) && item.sourceIds.length > 0, `${item.id} needs source grounding`);
  item.sourceIds.forEach((sourceId) => assert.ok(sources[sourceId], `${item.id} cites unknown source ${sourceId}`));
}


// Verify the Reconstruction-meaning anchor and the genuinely distinct moral
// premises of S9 (personal moral discretion) and S10 (objective moral law).
const t1 = questions.find(q=>q.id==="T1");
const s10 = questions.find(q=>q.id==="S10");
const oldSource = context.LAW_DIAGNOSTIC_QUESTIONS.find(q=>q.id==="D-MOR1");
const oldPrecedent = context.LAW_DIAGNOSTIC_QUESTIONS.find(q=>q.id==="D-PREC1");
assert.ok(t1.prompt.startsWith("Laws passed right after the American Civil War"));
assert.ok(s10.prompt.includes("objectively true moral rule"));
assert.ok(oldSource.prompt.includes("judge’s personal moral judgment"));
assert.ok(oldPrecedent.prompt.includes("newspapers"));
for (const id of ["F2","C16","S9","P1","P8"]) {
  assert.ok(!questions.some(q=>q.id===id),`${id} must not be in the common core`);
}
assert.equal(questions.length + 12,100);
assert.ok(!questions.some(q=>q.id==="D-MOR1"||q.id==="D-PREC1"));

const c13 = questions.find((item) => item.id === "C13");
assert.equal(scoring.signalFor(c13, "agree", "cons"), 0,
  "Agreeing that boats count should not be treated as purposivism/open construction");
assert.equal(scoring.signalFor(c13, "disagree", "cons"), 1,
  "Rejecting boats because the list is of road vehicles should score toward contextual textualism");
assert.equal(c13.key, -1,
  "C13 metadata must identify disagreement as its scored primary direction");

const t2Post = questions.find((item) => item.id === "T2");
const p9 = questions.find((item) => item.id === "P9");
const p10 = questions.find((item) => item.id === "P10");
const e3 = questions.find((item) => item.id === "E3");
const f5 = questions.find((item) => item.id === "F5");
assert.equal(scoring.signalFor(t2Post, "agree", "post"), 0,
  "Historical legislative-prayer fixation should not independently score Majoritarian posture");
assert.equal(scoring.signalFor(p9, "agree", "form"), 0,
  "Entrenchment of Miranda is precedent evidence, not an independent rules-over-standards answer");
assert.equal(scoring.signalFor(p10, "agree", "separ"), 0.2,
  "P10 should carry modest institutional-restraint evidence toward formal allocation");
assert.equal(scoring.signalFor(p10, "agree", "post"), 0.1,
  "P10 should carry only a small democratic-deference cross-loading");
assert.equal(scoring.signalFor(e3, "agree", "post"), 0.15,
  "E3 may carry a small congressional-accountability vibe without duplicating the Posture axis");
assert.equal(scoring.signalFor(f5, "agree", "post"), 0,
  "Individualized adjudicative responsibility should not itself imply Countermajoritarian posture");

const t8 = questions.find((item) => item.id === "T8");
assert.ok(scoring.signalFor(t8, "agree", "time") > 0, "Principle originalism should register as historical");
assert.equal(scoring.signalFor(t8, "disagree", "time"), 0,
  "Rejecting principle originalism should not automatically count as living constitutionalism");

const axisRows = [];
for (const axis of axes) {
  const items = questions.filter((item) => scoring.contributesToAxis(item, axis.id));
  const agreePositive = items.filter((item) => scoring.signalFor(item, "agree", axis.id) > 0).length;
  const agreeNegative = items.filter((item) => scoring.signalFor(item, "agree", axis.id) < 0).length;
  const disagreePositive = items.filter((item) => scoring.signalFor(item, "disagree", axis.id) > 0).length;
  const disagreeNegative = items.filter((item) => scoring.signalFor(item, "disagree", axis.id) < 0).length;
  assert.ok(items.length > 0, `${axis.id} needs contributing items`);
  axisRows.push({axis:axis.name,items:items.length,agreePositive,agreeNegative,disagreePositive,disagreeNegative});
}

function responsesFrom(fn) {
  return Object.fromEntries(questions.map((item) => [item.id, fn(item)]));
}

// Neutral responses must produce the center because they contain no directional evidence.
const neutral = scoring.scoreAll(responsesFrom(() => 0), axes, questions);
for (const axis of axes) assert.equal(neutral[axis.id].score, 50, `${axis.id} neutral should score 50`);

// Unlike the old model, blanket agreement/disagreement is intentionally NOT forced to 50.
// It should reflect whatever directional claims the respondent just endorsed or rejected.
const allAgree = scoring.scoreAll(responsesFrom(() => 3), axes, questions);
const allDisagree = scoring.scoreAll(responsesFrom(() => -3), axes, questions);
assert.ok(axes.some((axis) => allAgree[axis.id].score !== 50), "All-agree must not be normalized to 50");
assert.ok(axes.some((axis) => allDisagree[axis.id].score !== 50), "All-disagree must not be normalized to 50");

// Skipping cannot count as an implicitly neutral answer, but one answered
// item also cannot establish a fully certain jurisprudential axis.
const skippedSource = scoring.scoreAxis("sorc",{S1:3,S2:null},questions);
const neutralSource = scoring.scoreAxis("sorc",{S1:3,S2:0},questions);
assert.equal(skippedSource.answered,1);
assert.equal(neutralSource.answered,2);
assert.ok(skippedSource.score>neutralSource.score,
  "Skipped questions must be removed from evidence opportunities");
assert.ok(skippedSource.score<100 && skippedSource.score>50,
  "One answered source question cannot produce unwarranted 100 percent certainty");

// Replacing a skipped item with a genuinely neutral answer must never make an
// axis more extreme. This is the central missing-data invariant: neutral adds
// answered information but no directional evidence.
for (const axis of axes) {
  const contributors = questions.filter((item) => scoring.contributesToAxis(item, axis.id));
  for (const direction of [1, -1]) {
    const base = {};
    contributors.forEach((item, index) => {
      const agree = scoring.signalFor(item, "agree", axis.id) * direction;
      const disagree = scoring.signalFor(item, "disagree", axis.id) * direction;
      if (index % 3 === 0) base[item.id] = null;
      else if (index % 3 === 1) base[item.id] = agree >= disagree ? 3 : -3;
      else base[item.id] = agree >= disagree ? 1 : -1;
    });
    for (const item of contributors.filter((item) => base[item.id] === null)) {
      const skipped = scoring.scoreAxis(axis.id, base, questions).score;
      const neutralized = scoring.scoreAxis(axis.id, { ...base, [item.id]: 0 }, questions).score;
      assert.ok(
        Math.abs(neutralized - 50) <= Math.abs(skipped - 50),
        `${axis.id} neutral ${item.id} must not increase extremity over Not sure`
      );
    }
  }
}

// Every diagnostic and response, including skip, must leave all axis details
// identical to core-only scoring. Exercise neutral, directional, and sparse core.
for (const coreResponses of [responsesFrom(() => 0), responsesFrom(() => 3),
  Object.fromEntries(questions.map((item, index) => [item.id, index % 3 ? -2 : null]))]) {
  const expected = scoring.scoreAll(coreResponses, axes, questions);
  for (const diagnostic of context.LAW_DIAGNOSTIC_QUESTIONS) {
    for (const response of [-3, -2, -1, 0, 1, 2, 3, null]) {
      assert.deepEqual(scoring.scoreAllWithDiagnostics(coreResponses,
        {[diagnostic.id]:response}, axes, questions, context.LAW_DIAGNOSTIC_QUESTIONS), expected,
        `${diagnostic.id}=${response} must not change displayed core-derived axes`);
    }
  }
  for (const response of [-3, 0, 3, null]) {
    const all = Object.fromEntries(context.LAW_DIAGNOSTIC_QUESTIONS.map(q=>[q.id,response]));
    assert.deepEqual(scoring.scoreAllWithDiagnostics(coreResponses, all, axes, questions,
      context.LAW_DIAGNOSTIC_QUESTIONS), expected);
  }
}

// Every axis must be capable of accumulating evidence for both poles somewhere in the bank.
for (const axis of axes) {
  let hasLeft = false, hasRight = false;
  for (const item of questions) {
    for (const direction of ["agree","disagree"]) {
      const signal = scoring.signalFor(item, direction, axis.id);
      if (signal > 0) hasLeft = true;
      if (signal < 0) hasRight = true;
    }
  }
  assert.ok(hasLeft && hasRight, `${axis.id} must have evidence available for both poles`);
}

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

assert.ok(htmlByFile["index.html"].includes("Version 0.8 Beta"), "Front page must show Version 0.8 Beta");
assert.ok(htmlByFile["instructions.html"].includes("You will be presented with a series of statements about legal interpretation and judicial philosophy. For each one, click the button with your opinion on it."),
  "Instructions must retain the original wording");
assert.ok(htmlByFile["quiz.html"].includes('aria-valuemax="100"'), "Quiz progress maximum must allow 88 core plus up to 12 diagnostics");
assert.ok(htmlByFile["results.html"].includes('<script src="questions.js"></script>'),
  "Results must load question signals");
assert.ok(htmlByFile["quiz.html"].includes('<script src="result_content.js"></script>'),
  "Quiz must load the public result-content grammar");
assert.ok(htmlByFile["quiz.html"].includes('<script src="classification.js"></script>'),
  "Quiz must load the adaptive jurisprudence classifier");
assert.ok(htmlByFile["quiz.html"].includes('class="quiz-page"'),
  "Quiz page must use the fixed mobile-screen layout");
assert.ok(htmlByFile["quiz.html"].includes('class="quiz-response-stack"'),
  "Quiz answers must live in a stable response stack");
assert.ok(htmlByFile["results.html"].includes('<script src="result_content.js"></script>'),
  "Results must load the public result-content grammar");
assert.ok(htmlByFile["results.html"].includes('<script src="classification.js"></script>'),
  "Results must load the jurisprudence classifier");
assert.ok(htmlByFile["results.html"].includes('id="result-title"'),
  "Results must expose the assembled modifier + identity + phrase title");
const resultsScript = fs.readFileSync(path.join(root, "results.js"), "utf8");
assert.ok(resultsScript.includes("The eight axis scores come only from the core questions."),
  "New results must explain core-only axis scoring");
assert.ok(resultsScript.includes("earlier scoring version"),
  "Legacy shared scores must retain an accurate version-specific explanation");
assert.ok(!htmlByFile["results.html"].includes("Print / PDF"), "Results should not show Print / PDF");
assert.ok(!htmlByFile["results.html"].includes(">Retake<"), "Results should not show Retake");

console.table(axisRows);
console.log("All-agree scores:", Object.fromEntries(axes.map((axis)=>[axis.id,allAgree[axis.id].score])));
console.log("All-disagree scores:", Object.fromEntries(axes.map((axis)=>[axis.id,allDisagree[axis.id].score])));
console.log("PASS: all 88 questions inform at least one axis in at least one response direction.");
console.log("PASS: C13 now scores disagreement toward contextual textualism.");
console.log("PASS: asymmetric pole evidence; no forced acquiescence normalization.");
console.log("PASS: visible question copy and Version 0.8 Beta preserved.");

