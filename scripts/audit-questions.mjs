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
assert.equal(context.LAW_QUESTION_COUNT, 93, "The configured question count must be 93");
assert.equal(questions.length, 93, "The question bank must contain 93 questions");
assert.equal(new Set(questions.map((item) => item.id)).size, 93, "Question IDs must be unique");
assert.equal(new Set(questions.map((item) => item.prompt)).size, 93, "Question prompts must be unique");

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
const t1 = questions.find(q => q.id === "T1");
const s9 = questions.find(q => q.id === "S9");
const s10 = questions.find(q => q.id === "S10");
assert.ok(t1.prompt.startsWith("Laws passed right after the American Civil War"));
assert.ok(s9.prompt.includes("judge’s personal moral judgment") && s9.prompt.includes("no established objective moral rule"));
assert.ok(s10.prompt.includes("objectively true moral rule") && s10.prompt.includes("independent moral rule"));
assert.ok(scoring.signalFor(s9,"agree","sorc") < 0 && Math.abs(scoring.signalFor(s9,"agree","sorc")) < 0.5,
  "Subjective moral override must not receive full Natural-Law-equivalent Source weight");
assert.equal(scoring.signalFor(s9,"disagree","sorc"),0,
  "Rejecting personal discretion is not proof of legal positivism");
assert.equal(scoring.signalFor(s10,"agree","sorc"),-1,
  "An objectively true moral rule has independent Source significance");
// Mirrored legal hypotheticals remain in the core bank as intentionally
// cross-ideological evidence; they never constitute an additional axis.
for(const id of ["T1","T2","C3","C4","R1","R2","R6","R7","R9","R10"]){
  assert.ok(questions.some(q=>q.id===id),`${id} must remain an available mirror item`);
}

const c13 = questions.find((item) => item.id === "C13");
assert.equal(scoring.signalFor(c13, "agree", "cons"), 0,
  "Agreeing that boats count should not be treated as purposivism/open construction");
assert.equal(scoring.signalFor(c13, "disagree", "cons"), 1,
  "Rejecting boats because the list is of road vehicles should score toward contextual textualism");

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

assert.ok(htmlByFile["index.html"].includes("Version 0.6 Beta"), "Front page must show Version 0.6 Beta");
assert.ok(htmlByFile["instructions.html"].includes("You will be presented with a series of statements about legal interpretation and judicial philosophy. For each one, click the button with your opinion on it."),
  "Instructions must retain the original wording");
assert.ok(htmlByFile["quiz.html"].includes('aria-valuemax="100"'), "Quiz progress maximum must allow 93 core plus up to 7 diagnostics");
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
assert.ok(!htmlByFile["results.html"].includes("Print / PDF"), "Results should not show Print / PDF");
assert.ok(!htmlByFile["results.html"].includes(">Retake<"), "Results should not show Retake");

console.table(axisRows);
console.log("All-agree scores:", Object.fromEntries(axes.map((axis)=>[axis.id,allAgree[axis.id].score])));
console.log("All-disagree scores:", Object.fromEntries(axes.map((axis)=>[axis.id,allDisagree[axis.id].score])));
console.log("PASS: all 93 questions inform at least one axis in at least one response direction.");
console.log("PASS: C13 now scores disagreement toward contextual textualism.");
console.log("PASS: asymmetric pole evidence; no forced acquiescence normalization.");
console.log("PASS: original visible copy and Version 0.6 Beta preserved.");
