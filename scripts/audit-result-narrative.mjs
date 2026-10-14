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
}

for (const [id, route] of Object.entries(engine.ROUTES)) {
  assert.ok(route.opening?.trim(), id + " has no opening");
  assert.ok(route.context?.trim(), id + " has no context");
  assert.ok(engine.wordCount(route.opening) <= 70, id + " opening exceeds 70 words");
  assert.ok(engine.wordCount(route.context) <= 230, id + " context exceeds 230 words");
  assert.ok(!route.context.includes("\n"), id + " context must remain one paragraph");
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
  ["traditional equity",
    { identity:{id:"formalist"}, traits:{"remedies.traditional_equity":1} },
    {...neutralScores,remed:90}, "traditional_equity"]
];

for (const [name, classification, scores, expected] of cases) {
  assert.equal(engine.selectContextId(classification, scores), expected, name);
}

console.log("result narrative audit passed:", Object.keys(engine.ROUTES).length, "routes,", (globalThis.LAW_RESULT_IDENTITIES || []).length, "catalog identities");
