import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

function load(path) {
  vm.runInThisContext(fs.readFileSync(new URL("../" + path, import.meta.url), "utf8"), { filename: path });
}

load("result_catalog.js");
load("result_narrative.js");

const engine = globalThis.LAW_RESULT_NARRATIVE;
assert.ok(engine, "LAW_RESULT_NARRATIVE did not load");

const neutralScores = { sorc:50, cons:50, time:50, prec:50, remed:50, post:50, separ:50, form:50 };

for (const [id, opening] of Object.entries(engine.OPENINGS || {})) {
  assert.ok(opening?.trim(), id + " has no full-profile opening");
  assert.ok(engine.wordCount(opening) <= 70, id + " full-profile opening exceeds 70 words");
  const lowerOpening = opening.toLowerCase();
  for (const hedge of ["comparatively","generally","sometimes","usually","somewhat","relatively","typically","probably"]) {
    assert.ok(!lowerOpening.includes(hedge),
      id + " opening has softened hedge that should be stated more directly: " + hedge);
  }
}

const bannedNarrativePhrases = [
  "that distinction matters",
  "that separation matters",
  "the key point",
  "the important point",
  "your result",
  "your theory therefore",
  "your distinctive move",
  "that is the deeper",
  "in that sense",
  "the attraction is",
  "the real fight",
  "the practical consequence is important",
  "in other words",
  "fundamentally",
  "crucially",
  "not merely",
  "not simply",
  "not just",
  "rather than",
  "therefore"
];

for (const [id, route] of Object.entries(engine.ROUTES)) {
  assert.ok(route.opening?.trim(), id + " has no opening");
  assert.ok(route.context?.trim(), id + " has no context");
  assert.ok(engine.wordCount(route.opening) <= 70, id + " opening exceeds 70 words");
  assert.ok(engine.wordCount(route.context) <= 230, id + " context exceeds 230 words");
  assert.ok(!route.context.includes("\n"), id + " context must remain one paragraph");
  const lowerContext = route.context.toLowerCase();
  assert.ok(!/^you\b/i.test(route.context),
    id + " context should add literature/context instead of restarting the opening in second person");
  assert.ok(!/\bnot\b[^.!?]{0,90}\bbut\b/i.test(route.context),
    id + " contains formulaic not-X-but-Y contrast");
  for (const phrase of bannedNarrativePhrases) {
    assert.ok(!lowerContext.includes(phrase),
      id + " contains banned meta-signposting phrase: " + phrase);
  }
}

// The context paragraph should add theory/history instead of paraphrasing the
// opening. This is only a lexical guardrail; substantive review still matters.
{
  const stop = new Set("the a an and or but to of in on for with as is are was were be been being that this it its your you from by at into than not can may will should do does did have has had more most much some any when where who which their they them one other itself because while through across".split(/\s+/));
  const tokens = (text) => new Set(String(text).toLowerCase()
    .replace(/[^a-z0-9-]/g, " ").split(/\s+/)
    .filter((word) => word.length > 3 && !stop.has(word)));
  const jaccard = (a, b) => {
    let intersection = 0;
    for (const word of a) if (b.has(word)) intersection += 1;
    return intersection / (a.size + b.size - intersection || 1);
  };
  for (const [routeId, route] of Object.entries(engine.ROUTES)) {
    const contextTokens = tokens(route.context);
    for (const [openingId, opening] of Object.entries(engine.OPENINGS || {})) {
      const overlapScore = jaccard(contextTokens, tokens(opening));
      assert.ok(overlapScore < 0.20,
        routeId + " context repeats too much opening language from " + openingId +
        " (Jaccard " + overlapScore.toFixed(3) + ")");
    }
  }
}

// The same noun/subtype must still produce materially different context when
// the respondent's other major judicial commitments are opposite.
{
  const classification = {
    identity:{id:"positivist"},
    traits:{"source.morality_incorporated":1}
  };
  const textual = engine.build(classification,
    {sorc:92,cons:100,time:50,prec:50,remed:50,post:50,separ:50,form:50});
  const purposive = engine.build(classification,
    {sorc:92,cons:0,time:50,prec:50,remed:50,post:50,separ:50,form:50});
  assert.notEqual(textual.context, purposive.context,
    "Whole-profile context must distinguish opposite interpretive commitments inside the same noun/subtype");
  assert.match(textual.context, /enacted wording/i);
  assert.match(purposive.context, /purpose, context/i);
}

// Narrative prose must be champion-blind. Named theorists may appear when
// necessary to explain a theory's intellectual content, but changing the
// champion result cannot change the opening, context route, or context prose.
{
  const identity = (globalThis.LAW_RESULT_IDENTITIES || []).find((item) => item.id === "interpretivist");
  const scores = { sorc:25, cons:50, time:50, prec:50, remed:50, post:40, separ:50, form:45 };
  const traits = { "source.principles_are_law":1, "source.fit_and_justification":1 };
  const a = engine.build({ identity, traits, champions:[{id:"dworkin_stavropoulos"}] }, scores);
  const b = engine.build({ identity, traits, champions:[{id:"some_other_champion"}] }, scores);
  assert.deepEqual(a, b, "Result narrative must not depend on champion selection");
}

for (const identity of globalThis.LAW_RESULT_IDENTITIES || []) {
  const result = engine.build({ identity, traits:{} }, neutralScores);
  assert.ok(result?.opening?.trim(), identity.id + " does not resolve to an opening");
  assert.ok(result?.context?.trim(), identity.id + " does not resolve to a context");
  assert.ok(engine.wordCount(result.opening) <= 70, identity.id + " generated opening exceeds 70 words");
  assert.ok(engine.wordCount(result.context) <= 230, identity.id + " generated context exceeds 230 words");
}

const cases = [
  ["opm construction",
    { identity:{id:"public_meaning_originalist"}, traits:{"time.public_meaning":1,"time.construction_zone":1} },
    neutralScores, "opm_construction"],
  ["opm original law",
    { identity:{id:"public_meaning_originalist"}, traits:{"time.public_meaning":1,"time.original_law":1} },
    neutralScores, "opm_original_law"],
  ["intentionalist construction",
    { identity:{id:"original_intent_originalist"}, traits:{"time.original_intent":1,"time.construction_zone":1} },
    neutralScores, "oi_construction"],
  ["natural-law originalism",
    { identity:{id:"public_meaning_originalist"}, traits:{"time.public_meaning":1,"source.objective_morality":1,"source.positive_law_settlement":1} },
    neutralScores, "opm_higher_law"],
  ["institutionalist textualism",
    { identity:{id:"textualist"}, traits:{"constraint.contextual_textualism":1,"separation.interpretive_accommodation":1} },
    neutralScores, "textualist_institutional"],
  ["inclusive positivism",
    { identity:{id:"positivist"}, traits:{"source.morality_incorporated":1} },
    neutralScores, "positivist_inclusive"],
  ["planning positivism",
    { identity:{id:"positivist"}, traits:{"source.planning_theory":1} },
    neutralScores, "positivist_planning"],
  ["democratic living",
    { identity:{id:"living_constitutionalist"}, traits:{"time.democratic_constitutionalism":1} },
    neutralScores, "living_democratic"],
  ["political process responsive",
    { identity:{id:"political_process_jurist"}, traits:{"posture.responsive_review":1} },
    neutralScores, "political_process_responsive"],
  ["traditional equity remains secondary context",
    { identity:{id:"formalist"}, traits:{"remedies.traditional_equity":1} },
    {...neutralScores,remed:90}, "formalist_rules"]
];

for (const [name, classification, scores, expected] of cases) {
  assert.equal(engine.selectContextId(classification, scores), expected, name);
}

// Narrow specialist diagnostics may refine champion matching without taking over
// the broad intellectual-context paragraph.
{
  const legalProcess = {
    identity:{id:"legal_process_theorist"},
    traits:{
      "method.institutional_competence":1,
      "method.agency_interpretive_autonomy":1,
      "method.administrative_reason_giving":1,
      "separation.interpretive_accommodation":1
    }
  };
  assert.equal(engine.selectContextId(legalProcess, {...neutralScores,cons:36,prec:68}),
    "legal_process_mainstream",
    "Agency-autonomy evidence must not turn the whole Legal Process context into an administrative-law paragraph");
}

console.log("result narrative audit passed:", Object.keys(engine.ROUTES).length, "routes,", (globalThis.LAW_RESULT_IDENTITIES || []).length, "catalog identities");
