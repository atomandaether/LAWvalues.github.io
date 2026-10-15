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

// The editorial target is roughly 180–300 words, not a minimum that licenses padding.
const CONTEXT_MAX_WORDS = 300;
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
  assert.ok(engine.wordCount(route.context) <= CONTEXT_MAX_WORDS, id + " context exceeds 300 words");
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
  assert.equal(textual.id, "profile_source_textual");
  assert.equal(purposive.id, "profile_source_purposive");
  // Check conceptual content, not obsolete bolt-on sentences. Both must retain
  // source-based validity while taking opposite positions on judicial latitude.
  for (const result of [textual, purposive]) {
    assert.match(result.context, /source|institution/i, "Both profiles retain the source-grounded premise");
    assert.doesNotMatch(result.context, /On statutes,|Your broader judicial style|You also/i,
      "Whole-profile context must not regress to appended axis clauses");
  }
  assert.match(textual.context, /enacted (?:language|text|wording)|public words/i);
  assert.match(textual.context, /limit|constrain|bind/i,
    "Textual constraint must restrict judicial reconstruction");
  assert.match(purposive.context, /purpose|purposive|objectiv|open interpretation/i);
  assert.match(purposive.context, /room|judgment|discretion|open|specify/i,
    "Open construction must explain the source-authorized interpretive latitude");
  assert.doesNotMatch(textual.context, /Dworkin|Interpretivism/i,
    "Inclusive Positivism needs no unrelated name-drop");
  assert.doesNotMatch(purposive.context, /Dworkin|Interpretivism/i);
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
  assert.ok(engine.wordCount(result.context) <= CONTEXT_MAX_WORDS, identity.id + " generated context exceeds 300 words");
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
    {...neutralScores,remed:90}, "formalist_mainstream"]
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




// Every catalog identity must resolve to a theory-specific context, including
// legacy link identities. Only the explicit mixed identity may use the fallback.
for (const identity of globalThis.LAW_RESULT_IDENTITIES) {
  if (identity.id === "mixed_jurisprudence") continue;
  assert.ok(!["low_theory", "profile_low_commitment", "profile_unresolved_commitments"]
    .includes(engine.selectContextId({identity, traits:{}}, neutralScores)),
  identity.id + " fell through to an unrelated low-commitment explanation");
}
assert.equal(engine.selectContextId({identity:{id:"common_good_constitutionalist"}}, neutralScores),
  "common_good", "The existing Common-Good route must remain reachable");

// Distinct source theories cannot borrow Interpretivism's premise merely
// because they share a public Non-Positivist umbrella noun.
const sourceCases = [
  ["interpretivist", {}, "principled_nonpositive", "interpretivist"],
  ["nonpositivist", {}, "nonpositive_general", "nonpos_generic"],
  ["nonpositivist", {"source.moral_impact":1}, "moral_impact", "nonpos_moral_impact"],
  ["moral_impact_theorist", {}, "moral_impact", "nonpos_moral_impact"],
  ["nonpositivist", {"source.moral_practice":1}, "moral_practice", "nonpos_moral_practice"],
  ["nonpositivist", {"source.extreme_injustice":1}, "extreme_injustice", "nonpos_extreme"],
  ["radbruchian", {}, "extreme_injustice", "nonpos_extreme"],
  ["natural_lawyer", {"source.strong_natural_law":1}, "strong_natural_law", "natural_law_strong"],
  ["natural_lawyer", {"source.positive_law_settlement":1}, "moral_settlement", "natural_law_mainstream"],
  ["fullerian", {}, "legality_form", "fullerian"]
];
for (const [id, traits, opening, context] of sourceCases) {
  const c = {identity:{id}, traits};
  assert.equal(engine.selectOpeningId(c, neutralScores), opening, id + " source diagnosis");
  assert.equal(engine.selectContextId(c, neutralScores), context, id + " source explanation");
  if (!["principled_nonpositive"].includes(opening)) {
    assert.doesNotMatch(engine.buildOpening(c, neutralScores), /fit and justif|coherence.*practice|principles.*explain/i,
      id + " must not assume a Dworkinian theory of legal practice");
  }
}

// Form measures rules versus contextual judgment. It cannot supply an
// independent preference for strong judicial review (the Posture axis).
for (const id of ["interpretivist", "nonpositivist", "natural_lawyer", "moral_impact_theorist"]) {
  const c = {identity:{id}, traits:{}};
  for (const post of [50, 100]) {
    const contextual = {...neutralScores, form:0, post};
    assert.notEqual(engine.selectContextId(c, contextual), "profile_nonpositive_rights",
      id + " cannot infer strong review from contextual doctrine alone");
  }
  assert.equal(engine.selectContextId(c, {...neutralScores, form:0, post:0}), "profile_nonpositive_rights",
    id + " strong Posture evidence should still activate the rights-review thread");
}
for (const id of ["proportionalist", "alexyan"]) {
  assert.equal(engine.selectOpeningId({identity:{id}}, neutralScores), "proportionality_method");
  assert.equal(engine.selectOpeningId({identity:{id}}, {...neutralScores,post:0}), "rights_structured");
}

// Democratic authority, statutory purpose, and institutional boundaries have
// distinct meanings; their diagnoses must not assume deference, Pragmatism,
// or rule absolutism without the corresponding evidence.
for (const [id, expected] of [
  ["popular_constitutionalist", "popular_authority"],
  ["departmentalist", "departmental_authority"],
  ["purposivist", "purposive_method"],
  ["formalist", "structural_formalist"]
]) assert.equal(engine.selectOpeningId({identity:{id}}, neutralScores), expected);

// Stare decisis can alter intentionalist and public-meaning Originalism alike.
// These broad precedent threads must not silently relabel intent as public meaning.
for (const id of ["public_meaning_originalist", "original_intent_originalist", "originalist"]) {
  const c={identity:{id}, traits:{"precedent.correctness_first":1}};
  for (const [prec, route] of [[0,"opm_correction"],[100,"opm_settlement"]]) {
    const result=engine.build(c,{...neutralScores,time:90,prec});
    assert.equal(result.id,route);
    assert.match(result.context,/historical|historically/i);
    assert.match(result.context,/precedent|stare decisis/i);
    assert.match(result.context,/intention/i,
      "The precedent discussion must explicitly accommodate intentionalist historical authority");
  }
}

// A genuinely mixed profile is neither necessarily neutral nor contradictory.
// Only the classifier's explicit exceptional identity licenses the latter claim.
const mixed={identity:{id:"mixed_jurisprudence"},traits:{}};
const extremes={sorc:0,cons:100,time:0,prec:100,remed:0,post:100,separ:0,form:100};
const centered=engine.build(mixed,neutralScores);
const unresolved=engine.build(mixed,extremes);
assert.equal(centered.id,"profile_low_commitment");
assert.equal(unresolved.id,"profile_unresolved_commitments");
assert.notEqual(centered.opening,unresolved.opening);
assert.doesNotMatch(unresolved.context,/near-center|moderate scores|weak commitments/i);
assert.match(unresolved.context,/Direct contradiction requires separate evidence/i);
assert.doesNotMatch(unresolved.opening,/contradict|incoherent|indifferen/i);
for (const [id,route] of [["unusable_response","special_unusable"],
  ["incoherent_response","special_incoherent"],["outcome_driven_left","special_outcome"],
  ["outcome_driven_right","special_outcome"]]) {
  for (const scores of [neutralScores,extremes]) {
    const result=engine.build({identity:{id},traits:{"source.fit_and_justification":1}},scores);
    assert.equal(result.id,route);
    assert.equal(result.opening,engine.ROUTES[route].opening);
    assert.equal(result.context,engine.ROUTES[route].context);
  }
}

// Narrow remedies/agency evidence cannot seize the whole-profile paragraph.
for (const [id, scores, expected] of [
  ["legal_process_theorist", {...neutralScores,cons:36,prec:68}, "legal_process_mainstream"],
  ["formalist", {...neutralScores,remed:90}, "formalist_mainstream"],
  ["functionalist", {...neutralScores,separ:10}, "functionalist_mainstream"]
]) {
  for (const key of ["method.agency_interpretive_autonomy","method.administrative_reason_giving",
    "remedies.traditional_equity","remedies.universal_relief","remedies.structural_reform",
    "remedies.constitutional_common_law","remedies.remedial_equilibration"]) {
    assert.equal(engine.selectContextId({identity:{id},traits:{[key]:1}},scores),expected,
      key + " must remain subordinate to " + id + " whole-profile explanation");
  }
}

// Real 88-answer inputs plus the live adaptive path must carry the established
// source diagnostic into prose. These checks catch public-umbrella/legacy-ID drift.
for (const file of ["axes.js","questions.js","scoring.js","diagnostics.js","profiles.js","result_content.js","classification.js"]) load(file);
const literalSourceCases = [
  ["greenberg", "D-NP4", "nonpositivist", "moral_impact", "nonpos_moral_impact"],
  ["hershovitz", "D-NP5", "nonpositivist", "moral_practice", "nonpos_moral_practice"],
  ["radbruch_soper", "D-NP6", "nonpositivist", "extreme_injustice", "nonpos_extreme"],
  ["moore_strong_natural_law", "D-NL2", "natural_lawyer", "strong_natural_law", "natural_law_strong"]
];
for (const [champion, diagnostic, identity, opening, context] of literalSourceCases) {
  const responses=Object.fromEntries(globalThis.LAW_QUESTIONS.map(q=>[q.id,0]));
  Object.assign(responses, champion === "radbruch_soper"
    ? {S1:0,S2:3,S3:0,S4:0,S5:0,S6:2,S7:0,S8:2,S10:-2,S11:-2}
    : champion === "moore_strong_natural_law"
      ? {S1:-1,S2:2,S3:-1,S4:-1,S5:-1,S6:2,S7:-2,S8:-3,S10:3,S11:3}
      : {S1:-3,S2:-1,S3:-3,S4:-3,S5:-3,S6:3,S7:-3,S8:-1,S10:0,S11:0});
  const core=globalThis.LAW_SCORING.scoreAll(responses);
  const answers={};
  for (let i=0;i<globalThis.LAW_CLASSIFIER.MAX_DIAGNOSTICS;i+=1) {
    const next=globalThis.LAW_CLASSIFIER.nextDiagnostic(core,responses,answers);
    if (!next) break;
    answers[next.id]=["D-RLS1","D-QC1"].includes(next.id) ? -2 : next.id===diagnostic ? 3 : -3;
  }
  assert.equal(answers[diagnostic],3,champion + " must receive its defining diagnostic");
  const scored=globalThis.LAW_SCORING.scoreAllWithDiagnostics(responses,answers);
  const result=globalThis.LAW_CLASSIFIER.classify(scored,responses,answers,{coreElapsedMs:900000});
  const scores=Object.fromEntries(globalThis.LAW_AXES.map(a=>[a.id,scored[a.id].score]));
  assert.equal(result.identity.id,identity,champion + " public source identity");
  assert.equal(engine.selectOpeningId(result,scores),opening,champion + " actual diagnostic diagnosis");
  assert.equal(engine.build(result,scores).id,context,champion + " actual diagnostic context");
  assert.deepEqual(engine.build({...result,champions:[{id:"unrelated"}]},scores),engine.build(result,scores));
}

// Exhaustive finite property check: all low/middle/high combinations on the
// eight axes, for every identity. This is route/invariance coverage, not a claim
// that every synthetic combination could be produced by the classifier.
const axes=Object.keys(neutralScores);
let gridCases=0;
const selectedRoutes=new Set();
for (const identity of globalThis.LAW_RESULT_IDENTITIES) {
  const c={identity,traits:{},champions:[{id:"dworkin_stavropoulos",name:"Ronald Dworkin"}],championConfidence:"high"};
  const alternative={identity,traits:{},champions:[{id:"unrelated_champion",name:"Unrelated"}],championConfidence:"withheld"};
  for (let encoded=0; encoded<3**axes.length; encoded+=1) {
    let n=encoded;
    const scores={};
    for (const key of axes) { scores[key]=[0,50,100][n%3]; n=Math.floor(n/3); }
    const result=engine.build(c,scores);
    const swapped=engine.build(alternative,scores);
    assert.deepEqual(result,swapped,identity.id + " changed when only champion data changed");
    assert.ok(Object.hasOwn(engine.ROUTES,result.id));
    assert.ok(result.opening.trim() && result.context.trim());
    assert.ok(engine.wordCount(result.opening)<=70);
    assert.ok(engine.wordCount(result.context)<=CONTEXT_MAX_WORDS);
    assert.ok(!result.context.includes("\n"));
    selectedRoutes.add(result.id);
    gridCases+=1;
  }
}
// Exercise champion-blindness with every diagnostic fork as well as the axis grid.
for (const [id,traits] of sourceCases) {
  const c={identity:{id},traits};
  const baseline=engine.build(c,neutralScores);
  for (const champions of [[],[{id:"greenberg"}],[{id:"fuller"}],[{id:"kelsen"}]]) {
    assert.deepEqual(engine.build({...c,champions},neutralScores),baseline);
  }
}

console.log("result narrative audit passed:", Object.keys(engine.ROUTES).length, "routes,",
  globalThis.LAW_RESULT_IDENTITIES.length, "catalog identities,", gridCases,
  "axis-grid/champion-invariance cases,", selectedRoutes.size, "grid-reachable contexts");
