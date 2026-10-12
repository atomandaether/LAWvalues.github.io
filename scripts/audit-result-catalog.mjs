import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const context = vm.createContext({ console });
context.globalThis = context;

for (const filename of ["axes.js", "result_catalog.js", "diagnostics.js", "profiles.js", "result_content.js", "classification.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, filename), "utf8"), context, { filename });
}

const identities = context.LAW_RESULT_IDENTITIES;
const champions = context.LAW_CHAMPIONS;
const rules = context.LAW_CHAMPION_MATCHING_RULES;
const diagnostics = context.LAW_DIAGNOSTIC_QUESTIONS;
const profiles = context.LAW_PROFILES;
const classifier = context.LAW_CLASSIFIER;
const resultContent = context.LAW_RESULT_CONTENT;
const allDiagnostics = classifier.diagnosticBank();

assert.ok(Array.isArray(identities) && identities.length >= 20, "Need a substantial identity catalog");
assert.ok(Array.isArray(champions) && champions.length >= 25, "Need a substantial champion catalog");
assert.ok(Array.isArray(diagnostics) && diagnostics.length >= 10, "Need an adaptive diagnostic bank");
assert.ok(Array.isArray(profiles) && profiles.length >= 30, "Need broad sparse personality coverage");
assert.ok(resultContent && Array.isArray(resultContent.PHRASE_FEATURES),
  "Need a machine-readable broad phrase pool");
assert.equal(resultContent.PHRASE_FEATURES.length, 18,
  "Public phrase pool should contain the sixteen axis poles plus objective morality and anti-discretion");
assert.equal(resultContent.PHRASES.length, resultContent.PHRASE_FEATURES.length,
  "Every phrase feature needs exactly one public phrase rendering");
assert.ok(Array.isArray(resultContent.TWISTS) && resultContent.TWISTS.length >= 20,
  "Need a substantial noun-conditioned twist pool");
assert.equal(resultContent.MODIFIERS.length, resultContent.TWISTS.length,
  "Every noun-conditioned twist needs a modifier rendering");
assert.ok(typeof classifier.buildTraitEvidence === "function",
  "Classifier must expose breadth/confidence metadata for narrow phrase gates");
assert.ok(typeof resultContent.rankPhrases === "function", "Need separate broad phrase ranking");
assert.ok(typeof resultContent.rankTwists === "function", "Need separate noun-conditioned twist ranking");

const expectedPhraseIds = [
  "source_positive", "source_nonpositive", "objective_morality",
  "textual_constraint", "purposive", "fixed_meaning", "living_meaning",
  "precedent_stability", "precedent_correction", "narrow_remedies", "structural_remedies",
  "majoritarian", "countermajoritarian", "separation_formal", "separation_functional",
  "rules", "anti_discretion", "balancing"
];
assert.deepEqual(Array.from(resultContent.PHRASE_FEATURES, (x) => x.id), expectedPhraseIds,
  "Phrase pool must stay limited to the approved broad, meaningfully supported outcomes");
for (const removed of [
  "law_runs_out", "practice_authority", "principles_as_law", "contextual_text",
  "enacted_bargain", "intent", "historical_practice", "statutory_precedent",
  "universal_relief", "severability", "prophylactic", "proportionality",
  "pragmatic_consequences", "legal_process", "pluralism", "low_theory", "realism",
  "principle_application", "clear_error", "judicial_independence", "electoral_accountability"
]) {
  assert.ok(!resultContent.PHRASE_FEATURES.some((x) => x.id === removed),
    `${removed} is too narrow or indirect to be a stand-alone broad phrase outcome`);
}
assert.equal(classifier.MAX_DIAGNOSTICS, 7, "Adaptive phase must cap the quiz at 100 total questions");

assert.equal(new Set(identities.map((x) => x.id)).size, identities.length, "Identity IDs must be unique");
assert.equal(new Set(identities.map((x) => x.label)).size, identities.length, "Identity labels must be unique");
assert.equal(new Set(champions.map((x) => x.id)).size, champions.length, "Champion IDs must be unique");
assert.equal(new Set(diagnostics.map((x) => x.id)).size, diagnostics.length, "Diagnostic IDs must be unique");
assert.equal(new Set(diagnostics.map((x) => x.prompt)).size, diagnostics.length, "Diagnostic prompts must be unique");
assert.equal(new Set(profiles.map((x) => x.id)).size, profiles.length, "Profile IDs must be unique");
assert.equal(new Set(allDiagnostics.map((x) => x.id)).size, allDiagnostics.length, "Combined diagnostic IDs must be unique");

const identityIds = new Set(identities.map((x) => x.id));
const diagnosticIds = new Set(allDiagnostics.map((x) => x.id));
const axisIds = new Set(context.LAW_AXES.map((x) => x.id));
const allowedStatuses = new Set(["core", "adaptive", "fallback", "override"]);
const allowedRoles = new Set(["primary", "subtype", "historical", "institutional"]);
const allowedProfileTiers = new Set(["main", "specialist", "catchall", "lineage"]);

for (const identity of identities) {
  assert.ok(allowedStatuses.has(identity.status), `${identity.id} has invalid status`);
  assert.ok(Array.isArray(identity.covers) && identity.covers.length > 0, `${identity.id} needs coverage tags`);
  if (identity.parentId !== null) {
    assert.ok(identityIds.has(identity.parentId), `${identity.id} has unknown parent ${identity.parentId}`);
  }
}

for (const champion of champions) {
  assert.ok(allowedRoles.has(champion.role), `${champion.id} has invalid role`);
  assert.ok(Array.isArray(champion.eligibleIdentityIds), `${champion.id} needs eligibleIdentityIds`);
  champion.eligibleIdentityIds.forEach((id) => {
    assert.ok(identityIds.has(id), `${champion.id} refers to unknown identity ${id}`);
  });
  assert.ok(Array.isArray(champion.signatureTraits) && champion.signatureTraits.length > 0,
    `${champion.id} needs signatureTraits`);
  assert.ok(Array.isArray(champion.antiTraits), `${champion.id} needs antiTraits`);
}

for (const diagnostic of allDiagnostics) {
  assert.ok(["high", "medium", "deferred"].includes(diagnostic.priority),
    `${diagnostic.id} has invalid priority`);
  assert.ok(diagnostic.prompt.trim().split(/\s+/).length <= 95,
    `${diagnostic.id} is too long`);
  assert.ok(Array.isArray(diagnostic.agreeTraits), `${diagnostic.id} needs agreeTraits`);
  assert.ok(Array.isArray(diagnostic.disagreeTraits), `${diagnostic.id} needs disagreeTraits`);
  assert.ok(Array.isArray(diagnostic.relatedIdentityIds) && diagnostic.relatedIdentityIds.length > 0,
    `${diagnostic.id} needs related identities`);
  diagnostic.relatedIdentityIds.forEach((id) => {
    assert.ok(identityIds.has(id), `${diagnostic.id} refers to unknown identity ${id}`);
  });
  for (const next of [...diagnostic.nextOnAgree, ...diagnostic.nextOnDisagree]) {
    assert.ok(diagnosticIds.has(next), `${diagnostic.id} refers to unknown next diagnostic ${next}`);
  }
}

for (const profile of profiles) {
  assert.ok(allowedProfileTiers.has(profile.tier), `${profile.id} has invalid tier`);
  assert.ok(Array.isArray(profile.identityIds), `${profile.id} needs identityIds`);
  assert.ok(Array.isArray(profile.signatureTraits), `${profile.id} needs signatureTraits`);
  assert.ok(Array.isArray(profile.requiredTraits), `${profile.id} needs requiredTraits`);
  assert.ok(Array.isArray(profile.antiTraits), `${profile.id} needs antiTraits`);
  assert.ok(profile.description && typeof profile.description === "string", `${profile.id} needs a description`);

  for (const [axisId, spec] of Object.entries(profile.axisSignature || {})) {
    assert.ok(axisIds.has(axisId), `${profile.id} has unknown axis ${axisId}`);
    assert.ok(Number.isFinite(spec.target) && spec.target >= 0 && spec.target <= 100,
      `${profile.id} has invalid target for ${axisId}`);
    assert.ok(Number.isFinite(spec.weight) && spec.weight > 0 && spec.weight <= 1,
      `${profile.id} has invalid weight for ${axisId}`);
  }

  if (profile.tier === "lineage") {
    assert.equal(profile.selectable, false, `${profile.id} lineage must never win a match`);
  }
  if (profile.tier === "specialist") {
    const hasGate = profile.requiredTraits.length > 0 ||
      Object.keys(profile.minAxisSalience || {}).length > 0;
    assert.ok(hasGate, `${profile.id} specialist needs a trait or salience gate`);
  }
}

assert.ok(identityIds.has("legal_realist"), "Legal Realist must be in the identity catalog");
assert.equal(
  identities.find((x) => x.id === "legal_realist").status,
  "override",
  "Legal Realist should remain the approved non-axis override identity"
);
for (const id of [
  "positivist", "nonpositivist", "dworkinian", "moral_impact_theorist", "natural_lawyer", "legal_process_theorist",
  "originalist", "purposivist", "common_law_constitutionalist",
  "thayerian", "waldronian", "popular_constitutionalist", "proportionalist"
]) {
  assert.ok(identityIds.has(id), `Missing major jurisprudential family ${id}`);
}

const originalistChildren = identities.filter((x) => x.parentId === "originalist" && x.public !== false).map((x) => x.id);
assert.deepEqual(
  Array.from(originalistChildren).sort(),
  ["original_intent_originalist", "public_meaning_originalist"],
  "Public Originalist nouns should resolve only to Original Intent or Public Meaning; generic Originalist remains the fallback parent"
);
assert.equal(identities.find((x) => x.id === "original_methods_originalist").public, false,
  "Original Methods is champion-level evidence, not a public noun");
assert.equal(identities.find((x) => x.id === "framework_originalist").public, false,
  "Framework Originalism is Balkin champion-level theory inside New OPM, not a public noun");

for (const id of [
  "D-RLS1", "D-RLS2", "D-RLS3", "D-POS1", "D-NP1", "D-MAJ1", "D-MAJ2",
  "D-INT1", "D-LP1", "D-NP4", "D-QC1", "D-SOC1", "D-PLU1", "D-OCO1",
  "D-ORI1", "D-ORI2", "D-ORI3", "D-ORI4", "D-ORI5"
]) {
  assert.ok(diagnosticIds.has(id), `Missing high-value diagnostic ${id}`);
}

assert.equal(rules.selectAfterIdentity, true, "Champion selection must happen after identity selection");
assert.equal(rules.doNotForceChampion, true, "Champion matching must permit no single winner");
assert.equal(rules.requireMarginalExplanatoryValue, true, "Champions must add marginal explanatory coverage");
assert.equal(rules.pruneRedundantChampions, true, "Redundant champions must be pruned");

assert.equal(identities.find((x) => x.id === "moral_impact_theorist").label, "Greenbergian",
  "Moral Impact Theory should use the punchier public noun Greenbergian");
assert.equal(identities.find((x) => x.id === "legal_process_theorist").label, "Legal Process Jurist",
  "Legal Process should use a jurist identity rather than a generic Theorist suffix");
assert.equal(identities.find((x) => x.id === "proportionalist").label, "Proportionalist",
  "Structured proportionality should retain the established Proportionalist label");
assert.equal(identities.find((x) => x.id === "alexyan").public, false,
  "Alexyan should remain internal/legacy; public Alexy-like results use Proportionalist plus a modifier twist");
assert.equal(identities.find((x) => x.id === "bickelian").public, false,
  "Bickelian should remain internal/legacy; public Bickel-like results use Judicial Minimalist plus a modifier twist");
assert.equal(identities.find((x) => x.id === "formalist").label, "Formalist",
  "Keep the public noun Formalist exactly as-is");
assert.equal(identities.find((x) => x.id === "functionalist").label, "Functionalist",
  "Keep the public noun Functionalist exactly as-is");
assert.equal(identities.find((x) => x.id === "interpretivist").public, false,
  "Interpretivist should remain an internal parent, not a competing public noun");
assert.equal(identities.find((x) => x.id === "nonpositivist").broadFallback, true,
  "Non-positivist should be marked as a broad last-resort fallback");

const profileById = Object.fromEntries(profiles.map((x) => [x.id, x]));
assert.equal(profileById.finnis.tier, "main", "Finnis must remain a first-class Natural Law result");
assert.equal(profileById.greenberg.tier, "specialist",
  "Greenberg should be a diagnosable Moral Impact Theory specialist");
assert.equal(profileById.pound.tier, "specialist", "Pound should be a diagnosable sociological-jurisprudence specialist");
assert.equal(profileById.savigny.tier, "lineage", "Savigny should be Historical School lineage/further reading");
assert.equal(profileById.oconnor.tier, "catchall", "O'Connor should be the low-theory/contextual catch-all");
assert.deepEqual(Array.from(profileById.alexy.identityIds), ["proportionalist"],
  "Robert Alexy should match through the public Proportionalist noun, not Alexyan");
assert.deepEqual(Array.from(profileById.bickel.identityIds), ["minimalist"],
  "Alexander Bickel should match through the public Judicial Minimalist noun, not Bickelian");
assert.ok(!profiles.some((x) => /ginsburg/i.test(x.name)), "Ginsburg should not be forced into the main jurisprudential pool");

// Sparse means unmodeled axes stay absent rather than silently becoming 50.
assert.deepEqual(Object.keys(profileById.hart.axisSignature), ["sorc"], "Hart should not acquire invented positions on seven unrelated axes");
assert.deepEqual(Object.keys(profileById.schauer.axisSignature), ["form"], "Schauer should remain a Rules specialist");

// Natural-law evidence should not collapse into generic nonpositivism or Dworkin.
const naturalScores = { sorc: 8, cons: 50, time: 50, prec: 50, remed: 50, post: 50, separ: 50, form: 50 };
const naturalResponses = { S9: 3, S10: 3, S11: 3, S7: -3, S8: -3 };
const natural = classifier.classify(naturalScores, naturalResponses, {});
assert.equal(natural.identity.id, "natural_lawyer", "Strong objective-morality evidence should resolve to Natural Lawyer");
assert.ok(natural.champions.some((x) => x.id === "finnis"), "Finnis should be available for a clean natural-law profile");
assert.ok(!natural.champions.some((x) => x.id === "hart"), "Hart must not win a strongly nonpositivist natural-law profile");

// A specialist cannot win just because a sparse axis happens to be nearby.
const neutralScores = Object.fromEntries(context.LAW_AXES.map((axis) => [axis.id, 50]));
const neutral = classifier.classify(neutralScores, {}, {});
assert.ok(!neutral.champions.some((x) => ["solum", "pound", "alexy", "vermeule"].includes(x.id)),
  "Diagnostic specialists must not win a neutral profile without their distinctive evidence");

// The router starts with Realism and then gives everyone one explicit response check.
const firstDiagnostic = classifier.nextDiagnostic(neutralScores, {}, {});
assert.equal(firstDiagnostic.id, "D-RLS1", "Realism soft probe should remain the universal first diagnostic");
const secondDiagnostic = classifier.nextDiagnostic(
  { sorc: 90, cons: 90, time: 90, prec: 90, remed: 90, post: 90, separ: 90, form: 90 },
  {},
  { "D-RLS1": -2 }
);
assert.equal(secondDiagnostic.id, "D-QC1", "The response check should be universal before specialist routing");

const failedQuality = classifier.classify(neutralScores, {}, { "D-RLS1": -2, "D-QC1": 2 });
assert.equal(failedQuality.identity.id, "unusable_response",
  "Missing the explicit response check must suppress a jurisprudential match");
assert.equal(failedQuality.champions.length, 0,
  "A failed response check must never manufacture a thinker match");

const variedResponses = Object.fromEntries(
  Array.from({length:93}, (_,i)=>[`Q${i}`, [-2,-1,0,1,2][i % 5]])
);
const passedQuality = classifier.classify(
  neutralScores,
  variedResponses,
  { "D-RLS1": -2, "D-QC1": -2 }
);
assert.notEqual(passedQuality.identity.id, "unusable_response",
  "Selecting the instructed response should allow ordinary classification to continue when a usable core response pattern exists");

// Very fast or straight-line completion should be withheld even if the response check happened to be passed.
const spamResponses = Object.fromEntries(Array.from({length:93}, (_,i)=>[`Q${i}`, 2]));
const spam = classifier.classify(neutralScores, spamResponses, { "D-RLS1": -2, "D-QC1": -2 }, { elapsedMs: 30000 });
assert.equal(spam.identity.id, "unusable_response", "Implausibly fast completion must suppress personality matching");

// Public title grammar: noun + broad phrase + noun-conditioned twist.
const syntheticIdentity = identities.find((x) => x.id === "public_meaning_originalist");
const syntheticScores = { sorc: 56, cons: 72, time: 92, prec: 92, remed: 55, post: 61, separ: 54, form: 58 };
const syntheticResponses = { T8: 3 };
const syntheticDiagnostics = { "D-ORI3": 3 };
const syntheticTraits = classifier.buildTraits(syntheticScores, syntheticResponses, syntheticDiagnostics);
const syntheticEvidence = classifier.buildTraitEvidence(syntheticResponses, syntheticDiagnostics);
const assembled = resultContent.assemble(
  { identity: syntheticIdentity },
  syntheticScores,
  syntheticTraits,
  syntheticEvidence
);
assert.ok(assembled.title.includes("Public-Meaning Originalist"),
  "Assembled title must preserve the real jurisprudential noun");
assert.equal(assembled.phrase.id, "precedent_stability",
  "The strongest broad residual characteristic should become the phrase");
assert.equal(assembled.modifier.id, "new_originalism",
  "A Solum-like construction-zone package should become the noun-conditioned twist");
assert.equal(assembled.phrase.text, "who thinks being wrong for 50 years makes it right",
  "Precedent-stability phrase should use the approved critic-rib wording");
assert.equal(assembled.modifier.text, "New",
  "Constructionist public-meaning originalism should use the self-described New modifier");
assert.ok(assembled.rankedTwists.some((x) => x.id === "new_originalism"),
  "Result debug data should expose why the noun-conditioned twist won");

// Every approved phrase must be reachable as the strongest residual outcome under
// an internally coherent score/evidence fixture. This protects against dead copy.
const phraseNeutral = { sorc: 50, cons: 50, time: 50, prec: 50, remed: 50, post: 50, separ: 50, form: 50 };
const textualistIdentity = identities.find((x) => x.id === "textualist");
const originalistIdentity = identities.find((x) => x.id === "originalist");
const publicMeaningIdentity = identities.find((x) => x.id === "public_meaning_originalist");

function assertTopPhrase(expectedId, identity, scores, responses = {}, diagnostics = {}) {
  const traits = classifier.buildTraits(scores, responses, diagnostics);
  const evidence = classifier.buildTraitEvidence(responses, diagnostics);
  const top = resultContent.rankPhrases(identity, scores, traits, evidence)[0];
  assert.equal(top?.feature.id, expectedId, `${expectedId} should be reachable as the top public phrase`);
}

assertTopPhrase("source_positive", textualistIdentity, { ...phraseNeutral, cons: 100, sorc: 90 });
assertTopPhrase("source_nonpositive", textualistIdentity, { ...phraseNeutral, cons: 100, sorc: 10 });
assertTopPhrase(
  "objective_morality",
  publicMeaningIdentity,
  { ...phraseNeutral, time: 100, sorc: 20 },
  { S9: 3, S10: 3, S11: 3 },
  { "D-NP1": 3 }
);
assertTopPhrase("textual_constraint", originalistIdentity, { ...phraseNeutral, time: 100, cons: 90 });
assertTopPhrase("purposive", originalistIdentity, { ...phraseNeutral, time: 100, cons: 10 });
assertTopPhrase("fixed_meaning", textualistIdentity, { ...phraseNeutral, cons: 100, time: 90 });
assertTopPhrase("living_meaning", textualistIdentity, { ...phraseNeutral, cons: 100, time: 10 });
assertTopPhrase("precedent_stability", textualistIdentity, { ...phraseNeutral, cons: 100, prec: 90 });
assertTopPhrase("precedent_correction", textualistIdentity, { ...phraseNeutral, cons: 100, prec: 10 });
assertTopPhrase("narrow_remedies", textualistIdentity, { ...phraseNeutral, cons: 100, remed: 90 });
assertTopPhrase("structural_remedies", textualistIdentity, { ...phraseNeutral, cons: 100, remed: 10 });
assertTopPhrase("majoritarian", textualistIdentity, { ...phraseNeutral, cons: 100, post: 90 });
assertTopPhrase("countermajoritarian", textualistIdentity, { ...phraseNeutral, cons: 100, post: 10 });
assertTopPhrase("separation_formal", textualistIdentity, { ...phraseNeutral, cons: 100, separ: 90 });
assertTopPhrase("separation_functional", textualistIdentity, { ...phraseNeutral, cons: 100, separ: 10 });
assertTopPhrase("rules", textualistIdentity, { ...phraseNeutral, cons: 100, form: 90 });
assertTopPhrase(
  "anti_discretion",
  textualistIdentity,
  { ...phraseNeutral, cons: 100, form: 70 },
  { F1: 3, F3: 3, F7: 3, F8: 3 }
);
assertTopPhrase("balancing", textualistIdentity, { ...phraseNeutral, cons: 100, form: 10 });

// Also prove that every phrase survives the real classifier/assembler path, not
// merely direct result-content ranking. A varied 93-response shell keeps the
// response-quality checks realistic while score fixtures isolate each target.
const reachabilityResponses = Object.fromEntries(
  Array.from({length:93}, (_,i)=>[`Q${i}`, [-2,-1,0,1,2][i % 5]])
);
function assertClassifiedPhrase(expectedId, scores, overrides = {}, diagnostics = {}) {
  const classified = classifier.classify(
    scores,
    { ...reachabilityResponses, ...overrides },
    diagnostics
  );
  assert.equal(
    classified.resultTitle?.phrase?.id,
    expectedId,
    `${expectedId} should be reachable through classifier -> assembler, got ${classified.identity.id} / ${classified.resultTitle?.phrase?.id}`
  );
}
assertClassifiedPhrase("source_positive", { ...phraseNeutral, cons: 100, sorc: 90 });
assertClassifiedPhrase("source_nonpositive", { ...phraseNeutral, cons: 100, sorc: 10 });
assertClassifiedPhrase(
  "objective_morality",
  { ...phraseNeutral, time: 100, sorc: 20 },
  { S9: 3, S10: 3, S11: 3 },
  { "D-NP1": 3 }
);
assertClassifiedPhrase("textual_constraint", { ...phraseNeutral, time: 100, cons: 90 });
assertClassifiedPhrase("purposive", { ...phraseNeutral, time: 100, cons: 10 });
assertClassifiedPhrase("fixed_meaning", { ...phraseNeutral, cons: 100, time: 90 });
assertClassifiedPhrase("living_meaning", { ...phraseNeutral, cons: 100, time: 10 });
assertClassifiedPhrase("precedent_stability", { ...phraseNeutral, cons: 100, prec: 90 });
assertClassifiedPhrase("precedent_correction", { ...phraseNeutral, cons: 100, prec: 10 });
assertClassifiedPhrase("narrow_remedies", { ...phraseNeutral, cons: 100, remed: 90 });
assertClassifiedPhrase("structural_remedies", { ...phraseNeutral, cons: 100, remed: 10 });
assertClassifiedPhrase("majoritarian", { ...phraseNeutral, cons: 100, post: 90 });
assertClassifiedPhrase("countermajoritarian", { ...phraseNeutral, cons: 100, post: 10 });
assertClassifiedPhrase("separation_formal", { ...phraseNeutral, cons: 100, separ: 90 });
assertClassifiedPhrase("separation_functional", { ...phraseNeutral, cons: 100, separ: 10 });
assertClassifiedPhrase("rules", { ...phraseNeutral, cons: 100, form: 90 });
assertClassifiedPhrase(
  "anti_discretion",
  { ...phraseNeutral, cons: 100, form: 70 },
  { F1: 3, F3: 3, F7: 3, F8: 3 }
);
assertClassifiedPhrase("balancing", { ...phraseNeutral, cons: 100, form: 10 });

// New Originalism is a modifier, not a separate noun.  Both Solum-like and
// Balkin-like respondents remain Public-Meaning Originalists while champion
// routing distinguishes their construction theories.
const solumLike = classifier.classify(
  { sorc:52, cons:72, time:92, prec:50, remed:50, post:50, separ:50, form:58 },
  { ...reachabilityResponses, T7:3, T8:3, T10:3, T12:-3 },
  { "D-ORI3":3 }
);
assert.equal(solumLike.identity.id, "public_meaning_originalist",
  "Construction must not create a separate Framework/New noun");
assert.equal(solumLike.resultTitle.modifier.id, "new_originalism",
  "Construction should surface publicly as New");
assert.ok(solumLike.champions.some((x) => x.id === "solum"),
  "Lawrence Solum should remain available for a clean methodological New-OPM profile");

const balkinLike = classifier.classify(
  { sorc:50, cons:50, time:72, prec:66, remed:50, post:50, separ:50, form:50 },
  { ...reachabilityResponses, T7:3, T8:3, T12:3, P3:3 },
  { "D-ORI3":3 }
);
assert.equal(balkinLike.identity.id, "public_meaning_originalist",
  "Balkin-like construction should remain within the Public-Meaning noun");
assert.equal(balkinLike.resultTitle.modifier.id, "new_originalism",
  "Balkin-like construction should also display New");
assert.ok(balkinLike.champions.some((x) => x.id === "balkin"),
  "Jack Balkin should remain separately reachable at champion level");

// Locked Originalist champion units must all be selectable and separately reachable.
const lockedOriginalistUnits = [
  "bork_berger", "alexander_kay_prakash", "whittington",
  "solum", "barnett_bernick", "balkin",
  "scalia_manning", "mcginnis_rappaport", "mcconnell_green", "amar",
  "thomas_paulsen", "barrett", "natural_law_originalists"
];
for (const id of lockedOriginalistUnits) {
  assert.ok(profileById[id] && profileById[id].selectable !== false,
    `Locked Originalist champion unit ${id} must be selectable`);
}
assert.ok(!profileById.lawson.identityIds.includes("originalist"),
  "Lawson is no longer an Originalist champion unit; fiduciary constitutionalism is handled outside this taxonomy");

function assertOriginalistChampion(expectedId, identityId, scores, traits) {
  const identity = identities.find((x) => x.id === identityId);
  const resolved = classifier.resolveChampions(scores, traits, identity);
  assert.equal(resolved.matches[0]?.profile?.id, expectedId,
    `${expectedId} should be the leading ${identityId} champion, got ${resolved.matches[0]?.profile?.id}`);
}
const OBASE = { sorc:50, cons:50, time:90, prec:50, remed:50, post:50, separ:50, form:50 };
assertOriginalistChampion("bork_berger", "original_intent_originalist",
  { ...OBASE, time:94, post:84, form:78 },
  { "time.original_intent":1, "time.no_construction":1, "posture.majoritarian":0.8 });
assertOriginalistChampion("alexander_kay_prakash", "original_intent_originalist",
  { ...OBASE, time:94 },
  { "time.original_intent":1, "time.intent_as_meaning":1 });
assertOriginalistChampion("whittington", "original_intent_originalist",
  { ...OBASE, time:86 },
  { "time.original_intent":1, "time.construction_zone":1 });
assertOriginalistChampion("solum", "public_meaning_originalist",
  { ...OBASE, time:90 },
  { "time.public_meaning":1, "time.semantic_fixation":1, "time.construction_zone":1, "time.principle_originalism":1 });
assertOriginalistChampion("barnett_bernick", "public_meaning_originalist",
  { ...OBASE, time:90, post:18 },
  { "time.public_meaning":1, "time.construction_zone":1, "posture.rights_trumps":1 });
assertOriginalistChampion("balkin", "public_meaning_originalist",
  { ...OBASE, time:72, prec:66 },
  { "time.public_meaning":1, "time.construction_zone":1, "time.principle_originalism":1, "time.common_law_development":1 });
assertOriginalistChampion("scalia_manning", "public_meaning_originalist",
  { ...OBASE, cons:92, time:90, separ:82, form:92 },
  { "time.public_meaning":1, "constraint.textual":1, "form.anti_discretion":1 });
assertOriginalistChampion("mcginnis_rappaport", "public_meaning_originalist",
  { ...OBASE, time:94, cons:86 },
  { "time.original_methods":1, "time.fixation":1, "time.no_construction":1 });
assertOriginalistChampion("mcconnell_green", "public_meaning_originalist",
  { ...OBASE, time:88 },
  { "time.public_meaning":1, "time.principle_originalism":1 });
assertOriginalistChampion("amar", "public_meaning_originalist",
  { ...OBASE, time:84, cons:78 },
  { "time.public_meaning":1, "time.intratextualism":1, "method.holistic_constitution":1 });
assertOriginalistChampion("thomas_paulsen", "public_meaning_originalist",
  { ...OBASE, time:96, prec:10 },
  { "time.fixation":1, "precedent.correctness_first":1, "precedent.correction":1 });
assertOriginalistChampion("barrett", "public_meaning_originalist",
  { ...OBASE, time:90, prec:82 },
  { "time.fixation":1, "precedent.stability":1, "precedent.settlement":1 });
assertOriginalistChampion("natural_law_originalists", "public_meaning_originalist",
  { ...OBASE, sorc:14, time:88 },
  { "time.public_meaning":0.8, "time.fixation":1, "source.objective_morality":1, "source.positive_law_settlement":1 });

// Alexy and Bickel now live at champion/modifier granularity rather than consuming
// their own public nouns.
const alexyLike = classifier.classify(
  { sorc:20, cons:50, time:50, prec:50, remed:50, post:45, separ:50, form:8 },
  reachabilityResponses,
  { "D-PROP1":3 }
);
assert.equal(alexyLike.identity.id, "proportionalist",
  "Alexy-like evidence should resolve publicly to Proportionalist");
assert.equal(alexyLike.resultTitle.modifier.id, "nonpositivist_proportionality",
  "Alexy-like nonpositivist proportionality should surface as the modifier twist");
assert.ok(alexyLike.champions.some((x) => x.id === "alexy"),
  "Robert Alexy should remain available as the closest thinker");

const bickelLike = classifier.classify(
  { sorc:50, cons:50, time:50, prec:60, remed:82, post:67, separ:50, form:50 },
  { ...reachabilityResponses, O7:3 },
  {}
);
assert.equal(bickelLike.identity.id, "minimalist",
  "Bickel-like passive-virtues evidence should resolve publicly to Judicial Minimalist");
assert.equal(bickelLike.resultTitle.modifier.id, "passive_virtues_minimalism",
  "Bickel-like avoidance should surface as the modifier twist");
assert.ok(bickelLike.champions.some((x) => x.id === "bickel"),
  "Alexander Bickel should remain available among the closest thinkers");

const fitIdentity = identities.find((x) => x.id === "dworkinian");
const unmistakable = resultContent.assemble(
  { identity: fitIdentity, identityScore: 0.91, identityAlternatives: [{ score: 0.73 }] },
  { sorc:20, cons:50, time:50, prec:50, remed:50, post:50, separ:50, form:50 },
  {},
  {}
);
assert.equal(unmistakable.modifier.id, "fit_unmistakable",
  "Exceptionally clean noun fits should display Unmistakably a/an");

const ordinaryFit = resultContent.assemble(
  { identity: fitIdentity, identityScore: 0.77, identityAlternatives: [{ score: 0.70 }] },
  { sorc:20, cons:50, time:50, prec:50, remed:50, post:50, separ:50, form:50 },
  {},
  {}
);
assert.equal(ordinaryFit.modifier, null,
  "The deliberately narrow middle fit band should use no modifier");

const weakFit = resultContent.assemble(
  { identity: fitIdentity, identityScore: 0.69, identityAlternatives: [{ score: 0.67 }] },
  { sorc:20, cons:50, time:50, prec:50, remed:50, post:50, separ:50, form:50 },
  {},
  {}
);
assert.equal(weakFit.modifier.id, "fit_some_kind",
  "Weak nearest-neighbor fits should display Some kind of");

// Approved wording is part of the product contract while this editorial pass is active.
const phraseText = Object.fromEntries(resultContent.PHRASES.map((x) => [x.id, x.text]));
assert.equal(phraseText.source_positive, "who thinks evil just needs the right paperwork");
assert.equal(phraseText.source_nonpositive, "who thinks the law is haunted, and the ghosts agree with them");
assert.equal(phraseText.objective_morality, "who says “of course I’m right, here’s an MLK quote”");
assert.equal(phraseText.textual_constraint, "who’d eat their own Grandma because Congress forgot a comma");
assert.equal(phraseText.purposive, "who doesn’t let their inability to read hold them down");
assert.equal(phraseText.fixed_meaning, "who uses an Ouija board as a dictionary");
assert.equal(phraseText.living_meaning, "who thinks amendments are for suckers");
assert.equal(phraseText.precedent_stability, "who thinks being wrong for 50 years makes it right");
assert.equal(phraseText.precedent_correction, "who’ll tell you the opposite tomorrow");
assert.equal(phraseText.narrow_remedies, "who brought a hand towel to a hurricane");
assert.equal(phraseText.structural_remedies, "who let themselves in and started knocking down walls");
assert.equal(phraseText.majoritarian, "who’d let two wolves and a sheep vote on dinner");
assert.equal(phraseText.countermajoritarian, "who thinks 5 is more than 535");
assert.equal(phraseText.separation_formal, "who’d fire the lifeguard for getting in the pool");
assert.equal(phraseText.separation_functional, "who thinks the kitchen can never have too many cooks");
assert.equal(phraseText.rules, "who’d rather be consistently wrong than occasionally right");
assert.equal(phraseText.anti_discretion, "who doesn’t trust themselves to decide when to pee");
assert.equal(phraseText.balancing, "who does whatever they want");

const greenbergDiagnostic = classifier.diagnosticBank().find((x) => x.id === "D-NP4");
assert.ok(greenbergDiagnostic && greenbergDiagnostic.relatedIdentityIds.includes("moral_impact_theorist"),
  "Moral Impact Theory must have an adaptive diagnostic");

const greenbergScores = { sorc: 12, cons: 50, time: 50, prec: 50, remed: 50, post: 50, separ: 50, form: 50 };
const greenberg = classifier.classify(
  greenbergScores,
  variedResponses,
  { "D-RLS1": -2, "D-QC1": -2, "D-NP4": 3 }
);
assert.equal(greenberg.identity.id, "moral_impact_theorist",
  "Direct Moral Impact evidence should resolve to Greenbergian/Moral Impact identity");
assert.equal(greenberg.identity.label, "Greenbergian",
  "Moral Impact identity should display as Greenbergian");
assert.ok(greenberg.champions.some((x) => x.id === "greenberg"),
  "Mark Greenberg should be available as the closest thinker for a clean Moral Impact profile");

console.log(`PASS: ${identities.length} real/fallback identities audited.`);
console.log(`PASS: ${profiles.length} sparse thinker profiles across main, specialist, catch-all, and lineage tiers.`);
console.log(`PASS: ${allDiagnostics.length} adaptive diagnostics with a seven-question cap.`);
console.log("PASS: Natural Law remains first-class; Pound is specialist; Savigny is lineage; O'Connor is catch-all.");
console.log("PASS: sparse profiles ignore unmodeled axes and diagnostic specialists require evidence.");
console.log("PASS: public titles split broad phrase ranking from noun-conditioned twist selection.");
console.log("PASS: all 18 approved phrases are reachable and use the approved critic-rib wording.");
console.log("PASS: Originalism resolves to OPM/OI nouns, New construction modifier, and the locked 13 champion units.");
console.log("PASS: Alexyan and Bickelian are champion/modifier-level distinctions, not public nouns.");
console.log("PASS: Formalist and Functionalist public labels remain unchanged.");
console.log("PASS: generic fit modifiers use Unmistakably / blank / Some kind of, with substantive modifiers taking priority.");
