import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const context = vm.createContext({ console });
context.globalThis = context;

for (const filename of ["axes.js", "questions.js", "scoring.js", "result_catalog.js", "diagnostics.js", "profiles.js", "result_content.js", "classification.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, filename), "utf8"), context, { filename });
}

const identities = context.LAW_RESULT_IDENTITIES;
const champions = context.LAW_CHAMPIONS;
const rules = context.LAW_CHAMPION_MATCHING_RULES;
const diagnostics = context.LAW_DIAGNOSTIC_QUESTIONS;
const profiles = context.LAW_PROFILES;
const classifier = context.LAW_CLASSIFIER;
const resultContent = context.LAW_RESULT_CONTENT;
const scoring = context.LAW_SCORING;
const questions = context.LAW_QUESTIONS;
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
  assert.ok(profile.crossCuttingIdentityIds === undefined || Array.isArray(profile.crossCuttingIdentityIds),
    `${profile.id} crossCuttingIdentityIds must be an array when present`);
  for (const id of profile.identityIds) {
    assert.ok(identityIds.has(id), `${profile.id} has unknown primary-compatible identity ${id}`);
  }
  for (const id of profile.crossCuttingIdentityIds || []) {
    assert.ok(identityIds.has(id), `${profile.id} has unknown cross-cutting identity ${id}`);
    assert.ok(!profile.identityIds.includes(id),
      `${profile.id} must not list ${id} as both primary and cross-cutting compatibility`);
  }
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
  "positivist", "nonpositivist", "interpretivist", "natural_lawyer", "fullerian",
  "textualist", "intentionalist", "purposivist", "legal_process_theorist", "interpretive_pluralist",
  "pragmatist", "legal_realist", "sociological_jurist",
  "originalist", "common_law_constitutionalist",
  "legal_constitutionalist", "political_constitutionalist", "thayerian",
  "weak_form_constitutionalist", "popular_constitutionalist", "departmentalist",
  "political_process_jurist", "minimalist", "proportionalist"
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
  "D-RLS1", "D-RLS2", "D-RLS3", "D-RLS4", "D-RLS5",
  "D-POS1", "D-POS2", "D-NP1", "D-NP2", "D-NP3", "D-NP4", "D-NP5", "D-NP6",
  "D-MAJ1", "D-MAJ2", "D-ELY1", "D-WAL1", "D-RESP1", "D-TXT1", "D-TXT2", "D-INT1", "D-INT2", "D-PRAG1",
  "D-LP1", "D-LP2", "D-QC1", "D-SOC1", "D-GENY1", "D-LIV1", "D-LIV2", "D-HAR1", "D-CLC1", "D-PIL1", "D-PLU1", "D-PLU2", "D-OCO1",
  "D-ORI1", "D-ORI2", "D-ORI3", "D-ORI4", "D-ORI5"
]) {
  assert.ok(diagnosticIds.has(id), `Missing high-value diagnostic ${id}`);
}

assert.equal(rules.selectAfterIdentity, true, "Champion selection must happen after identity selection");
assert.equal(rules.doNotForceChampion, false, "Every valid classified result must return exactly one champion unit");
assert.equal(rules.requireMarginalExplanatoryValue, true, "Champions must add marginal explanatory coverage");
assert.equal(rules.pruneRedundantChampions, true, "Redundant champions must be pruned");

assert.equal(identities.find((x) => x.id === "positivist").label, "Positivist",
  "Positivist should remain the public noun while Inclusive/Exclusive/Normative are modifiers");
assert.equal(identities.find((x) => x.id === "inclusive_positivist").public, false,
  "Inclusive Positivist is now an internal compatibility subtype; public output uses an Inclusive modifier");
assert.equal(identities.find((x) => x.id === "exclusive_positivist").public, false,
  "Exclusive Positivist is now an internal compatibility subtype; public output uses an Exclusive modifier");
assert.equal(identities.find((x) => x.id === "interpretivist").public, undefined,
  "Interpretivist must now be a public Source noun");
assert.equal(identities.find((x) => x.id === "dworkinian").public, false,
  "Dworkinian is champion-level/internal; public output uses Interpretivist");
assert.equal(identities.find((x) => x.id === "moral_impact_theorist").public, false,
  "Moral Impact is a descriptive Non-Positivist modifier, not a public noun");
assert.equal(identities.find((x) => x.id === "radbruchian").public, false,
  "Extreme-Injustice is a descriptive Non-Positivist modifier, not a public noun");
assert.equal(identities.find((x) => x.id === "fullerian").label, "Fullerian",
  "Fullerian remains a public noun");
assert.equal(identities.find((x) => x.id === "legal_process_theorist").label, "Legal Process Jurist",
  "Legal Process should use a jurist identity rather than a generic Theorist suffix");
assert.equal(identities.find((x) => x.id === "interpretive_pluralist").status, "adaptive",
  "Interpretive Pluralist is a real diagnosable noun, not merely a generic fallback");
assert.equal(identities.find((x) => x.id === "sociological_jurist").label, "Sociological Jurist",
  "Sociological Jurisprudence should be a public Method noun");
assert.equal(identities.find((x) => x.id === "proportionalist").label, "Proportionalist",
  "Structured proportionality should retain the established Proportionalist label");
assert.equal(identities.find((x) => x.id === "alexyan").public, false,
  "Alexyan should remain internal/legacy; public Alexy-like results use Proportionalist plus a modifier twist");
assert.equal(identities.find((x) => x.id === "bickelian").public, false,
  "Bickelian should remain internal/legacy; public Bickel-like results use Judicial Minimalist plus a modifier twist");
assert.equal(identities.find((x) => x.id === "waldronian").public, false,
  "Waldronian should remain internal/legacy; public results use Political Constitutionalist");
assert.equal(identities.find((x) => x.id === "elyan").public, false,
  "Elyan should remain internal/legacy; public results use Political Process Jurist");
assert.equal(identities.find((x) => x.id === "weak_form_constitutionalist").label, "Weak-Form Constitutionalist",
  "Weak-form review must be a public constitutional-authority noun");
assert.equal(identities.find((x) => x.id === "legal_constitutionalist").label, "Legal Constitutionalist",
  "Strong-form judicial constitutional authority needs a public noun");

assert.equal(identities.find((x) => x.id === "formalist").label, "Formalist",
  "Keep the public noun Formalist exactly as-is");
assert.equal(identities.find((x) => x.id === "functionalist").label, "Functionalist",
  "Keep the public noun Functionalist exactly as-is");
assert.equal(identities.find((x) => x.id === "nonpositivist").broadFallback, true,
  "Non-positivist should be marked as a broad last-resort fallback");

const profileById = Object.fromEntries(profiles.map((x) => [x.id, x]));

// Champion matching is noun-conditioned rather than a free-floating nearest-neighbor search.
// Primary compatibility gets the strongest preference; explicitly cross-cutting thinkers
// remain eligible; incompatible thinkers are excluded outright.
assert.equal(classifier.championIdentityCompatibility(
  profileById.hugo_black,
  identities.find((x) => x.id === "textualist")
), "primary", "Hugo Black should be primarily compatible with the Textualist noun");
assert.equal(classifier.championIdentityCompatibility(
  profileById.hugo_black,
  identities.find((x) => x.id === "formalist")
), "cross-cutting", "Hugo Black may remain available for a Formalist whose whole profile is Black-like");
assert.equal(classifier.championIdentityCompatibility(
  profileById.hugo_black,
  identities.find((x) => x.id === "public_meaning_originalist")
), "incompatible", "Hugo Black must not appear merely because an Originalist shares his rules/rights profile");

// Distinctive-figure pass: the new specialists must be noun-compatible only
// where the quiz can actually see their jurisprudence, and Ackerman must remain
// further reading until constitutional-moments evidence exists.
assert.equal(profileById.ackerman.tier, "lineage",
  "Ackerman should remain lineage until the quiz measures constitutional moments");
assert.equal(profileById.ackerman.selectable, false,
  "Ackerman must not win from generic living-constitution scores");
assert.equal(classifier.championIdentityCompatibility(
  profileById.harlan_ii,
  identities.find((x) => x.id === "common_law_constitutionalist")
), "primary", "Harlan II should be a primary Common-Law Constitutionalist champion");
assert.equal(classifier.championIdentityCompatibility(
  profileById.robin_cooke,
  identities.find((x) => x.id === "common_law_constitutionalist")
), "primary", "Cooke should be available only in a compatible common-law constitutional family");
assert.equal(classifier.championIdentityCompatibility(
  profileById.geny,
  identities.find((x) => x.id === "sociological_jurist")
), "primary", "Gény should sit inside Sociological Jurisprudence rather than create a new noun");
assert.equal(classifier.championIdentityCompatibility(
  profileById.bhagwati_iyer,
  identities.find((x) => x.id === "sociological_jurist")
), "primary", "Bhagwati/Iyer should attach to an existing open social-action family");;

assert.equal(classifier.championIdentityCompatibility(
  profileById.scalia_manning,
  identities.find((x) => x.id === "public_meaning_originalist")
), "primary", "Scalia/Manning should remain primarily Originalist-compatible");
assert.equal(classifier.championIdentityCompatibility(
  profileById.scalia_manning,
  identities.find((x) => x.id === "textualist")
), "incompatible", "The locked Originalist Scalia/Manning unit should not duplicate the dedicated Textualist unit");
assert.equal(classifier.championIdentityCompatibility(
  profileById.scalia_manning_easterbrook,
  identities.find((x) => x.id === "textualist")
), "primary", "Scalia/Manning/Easterbrook should be the dedicated mainline Textualist unit");

assert.equal(profileById.finnis_murphy_george.tier, "main",
  "Finnis/Murphy/George must remain the central modern Natural Law champion unit");
assert.equal(profileById.dworkin_stavropoulos.tier, "main",
  "Dworkin/Stavropoulos must be the central Interpretivist champion unit");
assert.equal(profileById.greenberg.tier, "specialist",
  "Greenberg should be a diagnosable Moral-Impact Non-Positivist specialist");
assert.equal(profileById.hershovitz.tier, "specialist",
  "Hershovitz should be a diagnosable Moral-Practice Non-Positivist specialist");
assert.equal(profileById.radbruch_soper.tier, "specialist",
  "Radbruch/Soper should be a diagnosable Extreme-Injustice Non-Positivist specialist");
assert.equal(profileById.pound.tier, "main", "Pound should be the main Sociological Jurist champion");
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

// A strongly Black-like respondent can receive the Textualist noun because textual
// constraint is the primary fixation, while the full cross-axis profile selects Black.
const blackScores = { sorc: 50, cons: 94, time: 50, prec: 50, remed: 50, post: 8, separ: 50, form: 96 };
const blackTraits = {
  "constraint.textual": 0.95,
  "form.anti_discretion": 0.95,
  "posture.rights_trumps": 0.95,
  "method.categorical_textual_rights": 1
};
const blackMatch = classifier.resolveChampions(
  blackScores,
  blackTraits,
  identities.find((x) => x.id === "textualist")
);
assert.equal(blackMatch.matches[0]?.profile.id, "hugo_black",
  "A Black-like Textualist profile should select Hugo Black as the closest champion");

const blackUnderOriginalism = classifier.resolveChampions(
  blackScores,
  blackTraits,
  identities.find((x) => x.id === "public_meaning_originalist")
);
assert.ok(!blackUnderOriginalism.matches.some((x) => x.profile.id === "hugo_black"),
  "Hugo Black must be excluded when the winning noun is incompatible Originalism");

// Natural-law evidence should not collapse into generic Non-Positivism or Interpretivism.
const naturalScores = { sorc: 8, cons: 50, time: 50, prec: 50, remed: 50, post: 50, separ: 50, form: 50 };
const naturalResponses = { S9: 3, S10: 3, S11: 3, S7: -3, S8: -3 };
const natural = classifier.classify(naturalScores, naturalResponses, { "D-NP1": 3 });
assert.equal(natural.identity.id, "natural_lawyer", "Objective morality plus settlement evidence should resolve to Natural Lawyer");
assert.ok(natural.champions.some((x) => x.id === "finnis_murphy_george"),
  "Finnis/Murphy/George should be available for a clean natural-law profile");
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
assert.equal(passedQuality.champions.length, 1,
  "Every valid classified result must return exactly one champion unit");

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

// End-to-end Originalism reachability: each locked champion must be producible
// from literal 93-item answers plus only diagnostics the live router actually asks.
const ORIGINALIST_OI = new Set(["bork_berger", "alexander_kay_prakash", "whittington"]);
const ORIGINALIST_PM = new Set([
  "solum", "barnett_bernick", "balkin", "scalia_manning", "mcginnis_rappaport",
  "mcconnell_green", "amar", "thomas_paulsen", "barrett", "natural_law_originalists"
]);
const ORIGINALIST_NEW = new Set(["whittington", "solum", "barnett_bernick", "balkin"]);

function literalOriginalistCore(id) {
  const profile = profileById[id];
  const responses = {};

  for (let i = 0; i < questions.length; i += 1) {
    const item = questions[i];
    const target = profile.axisSignature?.[item.axis]?.target ?? (item.axis === "time" ? 82 : 50);
    const agreeSignal = Number(item.signals?.agree?.[item.axis] || 0);
    const disagreeSignal = Number(item.signals?.disagree?.[item.axis] || 0);
    const desired = target > 55 ? 1 : target < 45 ? -1 : 0;

    if (desired !== 0) {
      const positiveAnswer = desired * agreeSignal >= desired * disagreeSignal;
      const extremity = Math.abs(target - 50);
      const magnitude = extremity >= 32 ? 3 : extremity >= 18 ? 2 : 1;
      responses[item.id] = (positiveAnswer ? 1 : -1) * magnitude;
    } else {
      responses[item.id] = i % 2 ? 1 : -1;
    }
  }

  if (ORIGINALIST_PM.has(id)) responses.T7 = 3;
  if (ORIGINALIST_OI.has(id)) responses.T7 = -3;

  if (["solum", "mcconnell_green", "balkin"].includes(id)) responses.T8 = 3;
  if (id === "solum") responses.T10 = 3;
  if (id === "balkin") {
    responses.T12 = 3;
    responses.P3 = 3;
    responses.T9 = 3;
  }
  if (id === "barnett_bernick") {
    responses.O4 = 3;
    responses.O11 = 3;
    responses.O13 = 3;
  }
  if (id === "scalia_manning") {
    for (const questionId of ["C1", "C2", "C7", "C9", "C11", "C17", "C18", "F1", "F3", "F7", "F8"]) {
      responses[questionId] = 3;
    }
  }

  // Keep McConnell/Green out of the Barrett/Thomas precedent poles while
  // preserving strong principle/application evidence.
  if (id === "mcconnell_green") {
    responses.T12 = -3;
    const precedentItems = questions.filter((item) => item.axis === "prec");
    precedentItems.forEach((item, index) => { responses[item.id] = index % 2 ? 1 : -1; });
    responses.T7 = 3;
    responses.T8 = 3;
    responses.T9 = 3;
  }

  // Natural-law originalism must be reachable without the Natural Lawyer or
  // Dworkinian noun swallowing the OPM result.  This literal source pattern
  // supplies objective-morality evidence while leaving OPM as the best noun.
  if (id === "natural_law_originalists") {
    for (const questionId of ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"]) responses[questionId] = -3;
    for (const questionId of ["S9", "S10", "S11"]) responses[questionId] = 3;
  }

  return responses;
}

function originalistDiagnosticAnswer(id, diagnosticId) {
  if (diagnosticId === "D-RLS1") return -3;
  if (diagnosticId === "D-QC1") return -2;
  if (diagnosticId === "D-ORI1") return ORIGINALIST_PM.has(id) ? 3 : -3;
  if (diagnosticId === "D-ORI3") return ORIGINALIST_NEW.has(id) ? 3 : -3;
  if (diagnosticId === "D-ORI4") return id === "alexander_kay_prakash" ? 3 : -3;
  if (diagnosticId === "D-ORI2") return id === "mcginnis_rappaport" ? 3 : -3;
  if (diagnosticId === "D-ORI5") return id === "amar" ? 3 : -3;
  if (diagnosticId === "D-NP1") return id === "natural_law_originalists" ? 3 : -3;
  if (["D-NP2", "D-NP3", "D-NP4", "D-POS1"].includes(diagnosticId)) return -3;
  return -3;
}

function runLiteralOriginalistFixture(id) {
  const responses = literalOriginalistCore(id);
  const scores = scoring.scoreAll(responses);
  const diagnosticResponses = {};
  const diagnosticOrder = [];

  for (let i = 0; i < classifier.MAX_DIAGNOSTICS; i += 1) {
    const next = classifier.nextDiagnostic(scores, responses, diagnosticResponses);
    if (!next) break;
    diagnosticOrder.push(next.id);
    diagnosticResponses[next.id] = originalistDiagnosticAnswer(id, next.id);
  }

  const result = classifier.classify(
    scores,
    responses,
    diagnosticResponses,
    { coreElapsedMs: 10 * 60 * 1000 }
  );

  return { result, diagnosticOrder };
}

for (const id of lockedOriginalistUnits) {
  const { result, diagnosticOrder } = runLiteralOriginalistFixture(id);
  assert.equal(
    result.champions[0]?.id,
    id,
    `Literal 93-answer + adaptive path must reach ${id}; got ${result.identity.id} / ${result.champions.map((x) => x.id).join(",")}`
  );
  assert.ok(diagnosticOrder.length <= classifier.MAX_DIAGNOSTICS,
    `${id} must remain reachable within the seven-diagnostic cap`);
  if (ORIGINALIST_OI.has(id)) {
    assert.equal(result.identity.id, "original_intent_originalist",
      `${id} should resolve through the Original-Intent noun`);
  } else {
    assert.equal(result.identity.id, "public_meaning_originalist",
      `${id} should resolve through the Public-Meaning noun`);
  }
  if (ORIGINALIST_NEW.has(id)) {
    assert.equal(result.resultTitle.modifier?.id, "new_originalism",
      `${id} should surface the New modifier`);
  }
}

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

const fitIdentity = identities.find((x) => x.id === "interpretivist");
const unmistakable = resultContent.assemble(
  { identity: fitIdentity, identityScore: 0.91, identityAlternatives: [{ score: 0.73 }] },
  { sorc:20, cons:50, time:50, prec:50, remed:50, post:50, separ:50, form:50 },
  {},
  {}
);
assert.equal(unmistakable.modifier.id, "fit_unmistakable",
  "Exceptionally clean noun fits should display an explicit indefinite article");
assert.ok(unmistakable.title.startsWith("Unmistakably an Interpretivist"),
  "Vowel-initial nouns must render as Unmistakably an ..., never Unmistakably a ... or article-less");

const unmistakablePositivist = resultContent.assemble(
  { identity: identities.find((x) => x.id === "positivist"), identityScore: 0.91, identityAlternatives: [{ score: 0.73 }] },
  { sorc:92, cons:50, time:50, prec:50, remed:50, post:50, separ:50, form:50 },
  {},
  {}
);
assert.ok(unmistakablePositivist.title.startsWith("Unmistakably a Positivist"),
  "Consonant-initial nouns must render as Unmistakably a ...");

const ordinaryFit = resultContent.assemble(
  { identity: fitIdentity, identityScore: 0.77, identityAlternatives: [{ score: 0.70 }] },
  { sorc:20, cons:50, time:50, prec:50, remed:50, post:50, separ:50, form:50 },
  {},
  {}
);
assert.equal(ordinaryFit.modifier.id, "fit_moderate",
  "Every valid three-part result needs a modifier even at intermediate fit");

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
assert.ok(greenbergDiagnostic && greenbergDiagnostic.relatedIdentityIds.includes("nonpositivist"),
  "Moral Impact Theory must remain adaptively routable under the Non-Positivist noun");

const greenbergScores = { sorc: 28, cons: 50, time: 50, prec: 50, remed: 50, post: 50, separ: 50, form: 50 };
const greenberg = classifier.classify(
  greenbergScores,
  variedResponses,
  { "D-RLS1": -2, "D-QC1": -2, "D-NP2": -3, "D-NP4": 3 }
);
assert.equal(greenberg.identity.id, "nonpositivist",
  "Direct Moral Impact evidence should keep the public noun Non-Positivist");
assert.equal(greenberg.resultTitle.modifier.id, "moral_impact_nonpositivism",
  "Greenberg-like respondents should receive the descriptive Moral-Impact modifier");
assert.ok(greenberg.champions.some((x) => x.id === "greenberg"),
  "Mark Greenberg should be the closest thinker for a clean Moral-Impact profile");

// Locked Source champion units and literal-answer reachability.
const lockedSourceUnits = [
  "hart",
  "coleman_waluchow_kramer",
  "raz_shapiro_marmor",
  "campbell_waldron_schauer",
  "dworkin_stavropoulos",
  "greenberg",
  "hershovitz",
  "finnis_murphy_george",
  "fuller",
  "radbruch_soper"
];
for (const id of lockedSourceUnits) {
  assert.ok(profileById[id] && profileById[id].selectable !== false,
    `Locked Source champion unit ${id} must be selectable`);
}

const SOURCE_POSITIVISTS = new Set([
  "hart", "coleman_waluchow_kramer", "raz_shapiro_marmor", "campbell_waldron_schauer"
]);

function literalSourceCore(id) {
  const responses = Object.fromEntries(
    questions.map((question, index) => [question.id, [-2, -1, 0, 1, 2][index % 5]])
  );

  if (SOURCE_POSITIVISTS.has(id)) {
    Object.assign(responses, {
      S1:3, S2:-3, S3:3, S4:3, S5:3, S6:-3, S7:3, S8:-3, S9:-3, S10:-3, S11:-3
    });
  } else if (id === "dworkin_stavropoulos") {
    Object.assign(responses, {
      S1:-2, S2:-1, S3:-2, S4:-2, S5:-1, S6:2, S7:-3, S8:3, S9:-1, S10:-1, S11:-1
    });
  } else if (id === "finnis_murphy_george") {
    Object.assign(responses, {
      S1:-1, S2:2, S3:-1, S4:-1, S5:-1, S6:2, S7:-2, S8:-3, S9:3, S10:3, S11:3
    });
  } else if (id === "radbruch_soper") {
    Object.assign(responses, {
      S1:0, S2:3, S3:0, S4:0, S5:0, S6:2, S7:0, S8:2, S9:-2, S10:-2, S11:-2
    });
  } else {
    Object.assign(responses, {
      S1:-3, S2:-1, S3:-3, S4:-3, S5:-3, S6:3, S7:-3, S8:-1, S9:0, S10:0, S11:0
    });
  }
  return responses;
}

function sourceDiagnosticAnswer(id, diagnosticId) {
  if (diagnosticId === "D-RLS1") return -2;
  if (diagnosticId === "D-QC1") return -2;
  if (diagnosticId === "D-POS1") {
    if (id === "coleman_waluchow_kramer") return 3;
    if (id === "raz_shapiro_marmor") return -3;
    return 0;
  }
  if (diagnosticId === "D-POS2") return id === "campbell_waldron_schauer" ? 3 : -3;
  if (diagnosticId === "D-NP1") return id === "finnis_murphy_george" ? 3 : -3;
  if (diagnosticId === "D-NP2") return id === "dworkin_stavropoulos" ? 3 : -3;
  if (diagnosticId === "D-NP4") return id === "greenberg" ? 3 : -3;
  if (diagnosticId === "D-NP5") return id === "hershovitz" ? 3 : -3;
  if (diagnosticId === "D-NP6") return id === "radbruch_soper" ? 3 : -3;
  if (diagnosticId === "D-NP3") return id === "fuller" ? 3 : -3;
  return -3;
}

function runLiteralSourceFixture(id) {
  const responses = literalSourceCore(id);
  const scores = scoring.scoreAll(responses);
  const diagnosticResponses = {};
  const diagnosticOrder = [];

  for (let i = 0; i < classifier.MAX_DIAGNOSTICS; i += 1) {
    const next = classifier.nextDiagnostic(scores, responses, diagnosticResponses);
    if (!next) break;
    diagnosticOrder.push(next.id);
    diagnosticResponses[next.id] = sourceDiagnosticAnswer(id, next.id);
  }

  return {
    result: classifier.classify(scores, responses, diagnosticResponses, { coreElapsedMs: 10 * 60 * 1000 }),
    diagnosticOrder
  };
}

const sourceExpectedIdentity = {
  hart:"positivist",
  coleman_waluchow_kramer:"positivist",
  raz_shapiro_marmor:"positivist",
  campbell_waldron_schauer:"positivist",
  dworkin_stavropoulos:"interpretivist",
  greenberg:"nonpositivist",
  hershovitz:"nonpositivist",
  finnis_murphy_george:"natural_lawyer",
  fuller:"fullerian",
  radbruch_soper:"nonpositivist"
};
const sourceExpectedModifier = {
  coleman_waluchow_kramer:"inclusive_positivism",
  raz_shapiro_marmor:"exclusive_positivism",
  campbell_waldron_schauer:"normative_positivism",
  greenberg:"moral_impact_nonpositivism",
  hershovitz:"moral_practice_nonpositivism",
  radbruch_soper:"extreme_injustice_nonpositivism"
};

for (const id of lockedSourceUnits) {
  const { result, diagnosticOrder } = runLiteralSourceFixture(id);
  assert.equal(result.identity.id, sourceExpectedIdentity[id],
    `Literal Source path for ${id} must use the locked public noun`);
  assert.equal(result.champions[0]?.id, id,
    `Literal 93-answer + adaptive path must reach Source champion ${id}; got ${result.champions.map((x) => x.id).join(",")}`);
  assert.ok(diagnosticOrder.length <= classifier.MAX_DIAGNOSTICS,
    `${id} must remain reachable within the seven-diagnostic cap`);
  if (sourceExpectedModifier[id]) {
    assert.equal(result.resultTitle.modifier?.id, sourceExpectedModifier[id],
      `${id} should surface its locked descriptive Source modifier`);
  }
}


// Locked Interpretation / adjudicative-style champion units.
// The approved roster contains 18 endpoints after adding Gény as the
// source-gap / Free Scientific Research specialist inside Sociological Jurisprudence.
const lockedMethodUnits = [
  "hugo_black",
  "scalia_manning_easterbrook",
  "kavanaugh_barrett",
  "ekins_intentionalism",
  "hand_posner_imaginative",
  "breyer",
  "barak",
  "hart_sacks",
  "wechsler",
  "bobbitt",
  "eskridge_frickey",
  "posner",
  "cardozo",
  "llewellyn",
  "felix_cohen",
  "frank",
  "pound",
  "geny"
];
for (const id of lockedMethodUnits) {
  assert.ok(profileById[id] && profileById[id].selectable !== false,
    `Locked Method champion unit ${id} must be selectable`);
}

function literalMethodCore(id) {
  const profile = profileById[id];
  const responses = {};

  for (let i = 0; i < questions.length; i += 1) {
    const item = questions[i];
    let target = profile.axisSignature?.[item.axis]?.target ?? 50;

    // A Barak-like respondent can still have Purposivism as the primary fixation
    // without structured proportionality becoming the winning noun.
    if (id === "barak" && item.axis === "form") target = 34;
    if (id === "barak" && item.axis === "separ") target = 44;

    const agreeSignal = Number(item.signals?.agree?.[item.axis] || 0);
    const disagreeSignal = Number(item.signals?.disagree?.[item.axis] || 0);
    const desired = target > 55 ? 1 : target < 45 ? -1 : 0;

    if (desired !== 0) {
      const positiveAnswer = desired * agreeSignal >= desired * disagreeSignal;
      const extremity = Math.abs(target - 50);
      const magnitude = extremity >= 32 ? 3 : extremity >= 18 ? 2 : 1;
      responses[item.id] = (positiveAnswer ? 1 : -1) * magnitude;
    } else {
      responses[item.id] = i % 2 ? 1 : -1;
    }
  }

  if (id === "barak") {
    responses.O4 = 3;
    responses.O11 = 3;
    responses.O13 = 3;
  }

  return responses;
}

const METHOD_REALISTS = new Set(["llewellyn", "felix_cohen", "frank"]);
const METHOD_INTENTIONALISTS = new Set(["ekins_intentionalism", "hand_posner_imaginative"]);
const METHOD_LEGAL_PROCESS = new Set(["hart_sacks", "wechsler"]);
const METHOD_PLURALISTS = new Set(["bobbitt", "eskridge_frickey"]);
const METHOD_PRAGMATISTS = new Set(["posner", "cardozo"]);
const METHOD_SOCIOLOGICAL = new Set(["pound", "geny"]);

function methodDiagnosticAnswer(id, diagnosticId) {
  if (diagnosticId === "D-RLS1") return METHOD_REALISTS.has(id) ? 3 : -3;
  if (diagnosticId === "D-QC1") return -2;
  if (diagnosticId === "D-RLS2" || diagnosticId === "D-RLS3") return METHOD_REALISTS.has(id) ? 3 : -3;
  if (diagnosticId === "D-RLS4") return id === "frank" ? 3 : -3;
  if (diagnosticId === "D-RLS5") return id === "felix_cohen" ? 3 : -3;

  if (diagnosticId === "D-TXT1") return id === "kavanaugh_barrett" ? 3 : -3;
  if (diagnosticId === "D-TXT2") return id === "hugo_black" ? 3 : -3;

  if (diagnosticId === "D-INT1") return METHOD_INTENTIONALISTS.has(id) ? 3 : -3;
  if (diagnosticId === "D-INT2") return id === "hand_posner_imaginative" ? 3 : -3;
  if (diagnosticId === "D-PRAG1") return METHOD_PRAGMATISTS.has(id) ? 3 : -3;
  if (diagnosticId === "D-LP1") return METHOD_LEGAL_PROCESS.has(id) ? 3 : -3;
  if (diagnosticId === "D-LP2") return id === "wechsler" ? 3 : -3;
  if (diagnosticId === "D-SOC1") return METHOD_SOCIOLOGICAL.has(id) ? 3 : -3;
  if (diagnosticId === "D-GENY1") return id === "geny" ? 3 : -3;
  if (diagnosticId === "D-PLU1") return METHOD_PLURALISTS.has(id) ? 3 : -3;
  if (diagnosticId === "D-PLU2") return id === "eskridge_frickey" ? 3 : -3;

  // Other-zone diagnostics should not manufacture a different noun in a Method fixture.
  return -3;
}

function runLiteralMethodFixture(id) {
  const responses = literalMethodCore(id);
  const scores = scoring.scoreAll(responses);
  const diagnosticResponses = {};
  const diagnosticOrder = [];

  for (let i = 0; i < classifier.MAX_DIAGNOSTICS; i += 1) {
    const next = classifier.nextDiagnostic(scores, responses, diagnosticResponses);
    if (!next) break;
    diagnosticOrder.push(next.id);
    diagnosticResponses[next.id] = methodDiagnosticAnswer(id, next.id);
  }

  return {
    result: classifier.classify(scores, responses, diagnosticResponses, { coreElapsedMs: 10 * 60 * 1000 }),
    diagnosticOrder
  };
}

const methodExpectedIdentity = {
  hugo_black:"textualist",
  scalia_manning_easterbrook:"textualist",
  kavanaugh_barrett:"textualist",
  ekins_intentionalism:"intentionalist",
  hand_posner_imaginative:"intentionalist",
  breyer:"purposivist",
  barak:"purposivist",
  hart_sacks:"legal_process_theorist",
  wechsler:"legal_process_theorist",
  bobbitt:"interpretive_pluralist",
  eskridge_frickey:"interpretive_pluralist",
  posner:"pragmatist",
  cardozo:"pragmatist",
  llewellyn:"legal_realist",
  felix_cohen:"legal_realist",
  frank:"legal_realist",
  pound:"sociological_jurist",
  geny:"sociological_jurist"
};

const methodExpectedModifier = {
  hand_posner_imaginative:"imaginative_reconstruction",
  eskridge_frickey:"practical_reasoning_pluralism",
  frank:"fact_skeptical_realism"
};

for (const id of lockedMethodUnits) {
  const { result, diagnosticOrder } = runLiteralMethodFixture(id);
  assert.equal(result.identity.id, methodExpectedIdentity[id],
    `Literal Method path for ${id} must use the locked public noun; got ${result.identity.id}`);
  assert.equal(result.champions[0]?.id, id,
    `Literal 93-answer + adaptive path must reach Method champion ${id}; got ${result.champions.map((x) => x.id).join(",")}`);
  assert.ok(diagnosticOrder.length <= classifier.MAX_DIAGNOSTICS,
    `${id} must remain reachable within the seven-diagnostic cap`);
  if (methodExpectedModifier[id]) {
    assert.equal(result.resultTitle.modifier?.id, methodExpectedModifier[id],
      `${id} should surface its locked Method substantive modifier`);
  }
}

// Distinctive constitutional/remedial figures must also be reachable without
// new core questions. Their specialist diagnostics may refine an already-live
// public noun but may not manufacture a result from name recognition alone.
function distinctiveDiagnosticAnswer(id, diagnosticId) {
  if (diagnosticId === "D-RLS1") return -3;
  if (diagnosticId === "D-QC1") return -2;
  if (diagnosticId === "D-HAR1") return id === "harlan_ii" ? 3 : -3;
  if (diagnosticId === "D-CLC1") return id === "robin_cooke" ? 3 : -3;
  if (diagnosticId === "D-PIL1") return id === "bhagwati_iyer" ? 3 : -3;
  if (diagnosticId === "D-SOC1") return id === "bhagwati_iyer" ? 3 : -3;
  return -3;
}

const distinctiveExpectedIdentity = {
  harlan_ii: "common_law_constitutionalist",
  robin_cooke: "common_law_constitutionalist",
  bhagwati_iyer: "sociological_jurist"
};

for (const id of Object.keys(distinctiveExpectedIdentity)) {
  const responses = literalMethodCore(id);
  const scores = scoring.scoreAll(responses);
  const diagnosticResponses = {};
  const diagnosticOrder = [];

  for (let i = 0; i < classifier.MAX_DIAGNOSTICS; i += 1) {
    const next = classifier.nextDiagnostic(scores, responses, diagnosticResponses);
    if (!next) break;
    diagnosticOrder.push(next.id);
    diagnosticResponses[next.id] = distinctiveDiagnosticAnswer(id, next.id);
  }

  const result = classifier.classify(scores, responses, diagnosticResponses, { coreElapsedMs: 10 * 60 * 1000 });
  assert.equal(result.identity.id, distinctiveExpectedIdentity[id],
    `Distinctive path for ${id} must resolve through an existing public noun`);
  assert.equal(result.champions[0]?.id, id,
    `Distinctive path for ${id} must reach the intended champion; got ${result.champions.map((x) => x.id).join(",")}`);
  assert.ok(diagnosticOrder.length <= classifier.MAX_DIAGNOSTICS,
    `${id} must remain reachable within the seven-diagnostic cap`);
}

// Locked non-originalist constitutional-time champion paths.
// Living and Common-Law remain the only public nouns in this family;
// Democratic and Transformative are substantive Living modifiers.
const lockedNonOriginalistUnits = [
  "brennan",
  "post_siegel",
  "klare_langa",
  "david_strauss",
  "harlan_ii",
  "robin_cooke",
  "waluchow_common_law"
];

for (const id of lockedNonOriginalistUnits) {
  assert.ok(profileById[id] && profileById[id].selectable !== false,
    `Locked non-originalist champion unit ${id} must be selectable`);
}

function nonOriginalistDiagnosticAnswer(id, diagnosticId) {
  if (diagnosticId === "D-RLS1") return -3;
  if (diagnosticId === "D-QC1") return -2;
  if (diagnosticId === "D-LIV1") return id === "post_siegel" ? 3 : -3;
  if (diagnosticId === "D-LIV2") return id === "klare_langa" ? 3 : -3;
  if (diagnosticId === "D-HAR1") return id === "harlan_ii" ? 3 : -3;
  if (diagnosticId === "D-CLC1") return id === "robin_cooke" ? 3 : -3;
  if (diagnosticId === "D-POS1") return id === "waluchow_common_law" ? 3 : -3;
  return -3;
}

const nonOriginalistExpectedIdentity = {
  brennan: "living_constitutionalist",
  post_siegel: "living_constitutionalist",
  klare_langa: "living_constitutionalist",
  david_strauss: "common_law_constitutionalist",
  harlan_ii: "common_law_constitutionalist",
  robin_cooke: "common_law_constitutionalist",
  waluchow_common_law: "common_law_constitutionalist"
};

const nonOriginalistExpectedModifier = {
  post_siegel: "democratic_living",
  klare_langa: "transformative_living"
};

for (const id of lockedNonOriginalistUnits) {
  const responses = literalMethodCore(id);
  const scores = scoring.scoreAll(responses);
  const diagnosticResponses = {};
  const diagnosticOrder = [];

  for (let i = 0; i < classifier.MAX_DIAGNOSTICS; i += 1) {
    const next = classifier.nextDiagnostic(scores, responses, diagnosticResponses);
    if (!next) break;
    diagnosticOrder.push(next.id);
    diagnosticResponses[next.id] = nonOriginalistDiagnosticAnswer(id, next.id);
  }

  const result = classifier.classify(scores, responses, diagnosticResponses, { coreElapsedMs: 10 * 60 * 1000 });
  assert.equal(result.identity.id, nonOriginalistExpectedIdentity[id],
    `Non-originalist path for ${id} must resolve to the locked public noun`);
  assert.equal(result.champions[0]?.id, id,
    `Non-originalist path for ${id} must reach the intended champion; got ${result.champions.map((x) => x.id).join(",")}`);
  assert.ok(diagnosticOrder.length <= classifier.MAX_DIAGNOSTICS,
    `${id} must remain reachable within the seven-diagnostic cap`);
  if (nonOriginalistExpectedModifier[id]) {
    assert.equal(result.resultTitle.modifier?.id, nonOriginalistExpectedModifier[id],
      `${id} must surface its locked Living modifier`);
  }
}

assert.equal(profileById.ackerman.selectable, false,
  "Ackerman must remain lineage-only until constitutional-moments evidence exists");

// Locked judicial-review / constitutional-authority champion paths.
const lockedAuthorityUnits = [
  "thayer",
  "waldron",
  "gardbaum",
  "kramer",
  "walsh_departmentalism",
  "ely",
  "dixon_responsive",
  "bickel",
  "sunstein"
];

for (const id of lockedAuthorityUnits) {
  assert.ok(profileById[id] && profileById[id].selectable !== false,
    `Locked authority champion unit ${id} must be selectable`);
}

function literalAuthorityCore(id) {
  const responses = literalMethodCore(id);

  // O6 directly tests weak-form review.  Do not let a generic posture vector
  // accidentally manufacture that theory in unrelated authority fixtures.
  responses.O6 = id === "gardbaum" ? 3 : -3;

  // O7 is the Bickelian passive-virtues discriminator; generic Sunsteinian
  // minimalism instead comes from narrow/shallow remedial evidence.
  if (id === "bickel") responses.O7 = 3;
  if (id === "sunstein") {
    responses.O7 = -3;
    responses.R6 = 3;
    responses.R7 = 3;
    responses.R11 = 3;
  }
  if (["thayer", "waldron", "kramer", "walsh_departmentalism"].includes(id)) {
    responses.O7 = -3;
  }
  return responses;
}

function authorityDiagnosticAnswer(id, diagnosticId) {
  if (diagnosticId === "D-RLS1") return -3;
  if (diagnosticId === "D-QC1") return -2;
  if (diagnosticId === "D-MAJ1") {
    return ["kramer", "walsh_departmentalism"].includes(id) ? 3 : -3;
  }
  if (diagnosticId === "D-MAJ2") return id === "kramer" ? 3 : -3;
  if (diagnosticId === "D-WAL1") return id === "waldron" ? 3 : -3;
  if (diagnosticId === "D-ELY1") {
    return ["ely", "dixon_responsive"].includes(id) ? 3 : -3;
  }
  if (diagnosticId === "D-RESP1") return id === "dixon_responsive" ? 3 : -3;
  return -3;
}

const authorityExpectedIdentity = {
  thayer: "thayerian",
  waldron: "political_constitutionalist",
  gardbaum: "weak_form_constitutionalist",
  kramer: "popular_constitutionalist",
  walsh_departmentalism: "departmentalist",
  ely: "political_process_jurist",
  dixon_responsive: "political_process_jurist",
  bickel: "minimalist",
  sunstein: "minimalist"
};

const authorityExpectedModifier = {
  dixon_responsive: "responsive_process",
  bickel: "passive_virtues_minimalism"
};

for (const id of lockedAuthorityUnits) {
  const responses = literalAuthorityCore(id);
  const scores = scoring.scoreAll(responses);
  const diagnosticResponses = {};
  const diagnosticOrder = [];

  for (let i = 0; i < classifier.MAX_DIAGNOSTICS; i += 1) {
    const next = classifier.nextDiagnostic(scores, responses, diagnosticResponses);
    if (!next) break;
    diagnosticOrder.push(next.id);
    diagnosticResponses[next.id] = authorityDiagnosticAnswer(id, next.id);
  }

  const result = classifier.classify(scores, responses, diagnosticResponses, { coreElapsedMs: 10 * 60 * 1000 });
  assert.equal(result.identity.id, authorityExpectedIdentity[id],
    `Authority path for ${id} must resolve to the locked public noun; got ${result.identity.id}`);
  assert.equal(result.champions[0]?.id, id,
    `Authority path for ${id} must reach its intended champion; got ${result.champions.map((x) => x.id).join(",")}`);
  assert.ok(diagnosticOrder.length <= classifier.MAX_DIAGNOSTICS,
    `${id} must remain reachable within the seven-diagnostic cap`);
  if (authorityExpectedModifier[id]) {
    assert.equal(result.resultTitle.modifier?.id, authorityExpectedModifier[id],
      `${id} must surface its locked authority modifier`);
  }
}

// Legal Constitutionalism is intentionally a real public noun without a forced
// one-size-fits-all champion.
{
  const responses = Object.fromEntries(
    questions.map((question, index) => [question.id, [-1, 0, 1, -1, 1][index % 5]])
  );
  Object.assign(responses, {
    O1:-3, O2:-3, O3:3, O4:3, O5:-3, O6:-3, O7:-3,
    O8:-3, O9:-3, O10:3, O11:3, O12:-3, O13:3
  });
  const scores = scoring.scoreAll(responses);
  const diagnosticResponses = {};
  const diagnosticOrder = [];
  for (let i = 0; i < classifier.MAX_DIAGNOSTICS; i += 1) {
    const next = classifier.nextDiagnostic(scores, responses, diagnosticResponses);
    if (!next) break;
    diagnosticOrder.push(next.id);
    diagnosticResponses[next.id] = next.id === "D-QC1" ? -2 : -3;
  }
  const result = classifier.classify(scores, responses, diagnosticResponses, { coreElapsedMs: 10 * 60 * 1000 });
  assert.equal(result.identity.id, "legal_constitutionalist",
    "A strongly rights-protective judicial-finality profile must reach Legal Constitutionalist");
  assert.ok(diagnosticOrder.length <= classifier.MAX_DIAGNOSTICS,
    "Legal Constitutionalist must remain reachable within the seven-diagnostic cap");
}

// Locked institutional-structure / doctrinal-form / remedies champion paths.
const lockedStructureFormUnits = [
  "peter_strauss",
  "lawson",
  "calabresi_prakash",
  "schauer",
  "alexy",
  "barak",
  "fiss",
  "bhagwati_iyer"
];

for (const id of lockedStructureFormUnits) {
  assert.ok(profileById[id] && profileById[id].selectable !== false,
    `Locked structure/form/remedies champion unit ${id} must be selectable`);
}

for (const id of ["bray", "sohoni_frost", "chayes", "monaghan", "levinson"]) {
  assert.equal(profileById[id]?.selectable, false,
    `${id} must remain lineage/explanation only and cannot take the single champion slot`);
}

function literalStructureFormCore(id) {
  const profile = profileById[id];
  const responses = {};

  for (let i = 0; i < questions.length; i += 1) {
    const item = questions[i];
    const target = profile.axisSignature?.[item.axis]?.target ?? 50;
    const agreeSignal = Number(item.signals?.agree?.[item.axis] || 0);
    const disagreeSignal = Number(item.signals?.disagree?.[item.axis] || 0);
    const desired = target > 55 ? 1 : target < 45 ? -1 : 0;

    if (desired !== 0) {
      const positiveAnswer = desired * agreeSignal >= desired * disagreeSignal;
      const extremity = Math.abs(target - 50);
      const magnitude = extremity >= 32 ? 3 : extremity >= 18 ? 2 : 1;
      responses[item.id] = (positiveAnswer ? 1 : -1) * magnitude;
    } else {
      responses[item.id] = i % 2 ? 1 : -1;
    }
  }

  // Structural Formalism without the unitary-executive proposition should
  // remain Lawson rather than Calabresi/Prakash.
  if (id === "lawson") responses.E2 = 3;
  return responses;
}

function structureFormDiagnosticAnswer(id, diagnosticId) {
  if (diagnosticId === "D-RLS1") return -3;
  if (diagnosticId === "D-QC1") return -2;
  if (diagnosticId === "D-PROP1") return ["alexy", "barak"].includes(id) ? 3 : -3;
  if (diagnosticId === "D-PIL1") return id === "bhagwati_iyer" ? 3 : -3;
  if (diagnosticId === "D-SOC1") return id === "bhagwati_iyer" ? 3 : -3;
  return -3;
}

const structureFormExpectedIdentity = {
  peter_strauss: "functionalist",
  lawson: "formalist",
  calabresi_prakash: "formalist",
  schauer: "formalist",
  alexy: "proportionalist",
  barak: "proportionalist",
  fiss: "legal_constitutionalist",
  bhagwati_iyer: "sociological_jurist"
};

const structureFormExpectedModifier = {
  alexy: "nonpositivist_proportionality",
  barak: "purposive_proportionality",
  schauer: "anti_discretion_tinge"
};

function runLiteralStructureFormFixture(id, mutator = null) {
  const responses = literalStructureFormCore(id);
  if (mutator) mutator(responses);
  const scores = scoring.scoreAll(responses);
  const diagnosticResponses = {};
  const diagnosticOrder = [];

  for (let i = 0; i < classifier.MAX_DIAGNOSTICS; i += 1) {
    const next = classifier.nextDiagnostic(scores, responses, diagnosticResponses);
    if (!next) break;
    diagnosticOrder.push(next.id);
    diagnosticResponses[next.id] = structureFormDiagnosticAnswer(id, next.id);
  }

  return {
    result: classifier.classify(scores, responses, diagnosticResponses, { coreElapsedMs: 10 * 60 * 1000 }),
    diagnosticOrder
  };
}

for (const id of lockedStructureFormUnits) {
  const { result, diagnosticOrder } = runLiteralStructureFormFixture(id);
  assert.equal(result.identity.id, structureFormExpectedIdentity[id],
    `Structure/form path for ${id} must resolve to the locked public noun; got ${result.identity.id}`);
  assert.equal(result.champions.length, 1,
    `Structure/form path for ${id} must return exactly one champion unit`);
  assert.equal(result.champions[0]?.id, id,
    `Structure/form path for ${id} must reach its intended champion; got ${result.champions.map((x) => x.id).join(",")}`);
  assert.ok(diagnosticOrder.length <= classifier.MAX_DIAGNOSTICS,
    `${id} must remain reachable within the seven-diagnostic cap`);
  if (structureFormExpectedModifier[id]) {
    assert.equal(result.resultTitle.modifier?.id, structureFormExpectedModifier[id],
      `${id} must surface its locked structure/form modifier`);
  }
}

// Fiss is the exceptional cross-noun specialist, not a remedy-axis trump card.
// An otherwise unmistakable Barak profile remains Barak even with structural remedies.
{
  const { result } = runLiteralStructureFormFixture("barak", (responses) => {
    for (const id of ["R3", "R4", "R5", "R8", "R9", "R10"]) responses[id] = 3;
  });
  assert.equal(result.champions.length, 1, "Barak-plus-structural-remedies must still produce one champion");
  assert.equal(result.champions[0]?.id, "barak",
    "Fiss must not displace an otherwise strong whole-profile Barak match merely because remedies are broad");
}

// Exact-zero axis scores must remain extreme evidence in the title engine.
{
  const { result } = runLiteralStructureFormFixture("barak");
  assert.equal(result.resultTitle.modifier?.id, "purposive_proportionality",
    "An exact-zero open-construction score must still produce Purpose-led Proportionalist rather than being treated as neutral");
}

// The Alexander-v-Bork threshold is executable: these paired units differ by
// adjudicatively meaningful evidence, not merely by academic rationale.
assert.notDeepEqual(
  runLiteralMethodFixture("ekins_intentionalism").diagnosticOrder,
  runLiteralMethodFixture("hand_posner_imaginative").diagnosticOrder.filter((x) => x !== "D-INT2"),
  "Imaginative Reconstruction must require distinct adjudicative evidence rather than merely rename mainline Intentionalism"
);

console.log(`PASS: ${identities.length} real/fallback identities audited.`);
console.log(`PASS: ${profiles.length} sparse thinker profiles across main, specialist, catch-all, and lineage tiers.`);
console.log(`PASS: ${allDiagnostics.length} adaptive diagnostics with a seven-question cap.`);
console.log("PASS: Source nouns/modifiers are locked: Positivist, Natural Lawyer, Interpretivist, Fullerian, and residual Non-Positivist.");
console.log("PASS: sparse profiles ignore unmodeled axes and diagnostic specialists require evidence.");
console.log("PASS: public titles split broad phrase ranking from noun-conditioned twist selection.");

// Cross-family adversarial invariants: narrow yes-answers may refine a theory
// but must not invert a strongly opposing primary judicial commitment.
{
  const positivistCore=Object.fromEntries(questions.map((q,i)=>[q.id,i%2?1:-1]));
  for(const q of questions){
    const agree=q.signals?.agree?.sorc||0, disagree=q.signals?.disagree?.sorc||0;
    if(agree>0||disagree>0) positivistCore[q.id]=agree>=disagree?3:-3;
    else if(agree<0||disagree<0) positivistCore[q.id]=0;
  }
  const original=classifier.classify(scoring.scoreAll({...positivistCore,S2:-3}),
    {...positivistCore,S2:-3},{"D-RLS1":-2,"D-QC1":-2},{coreElapsedMs:900000});
  const changedCore={...positivistCore,S2:3};
  const changedScores=scoring.scoreAll(changedCore);
  const changed=classifier.classify(changedScores,changedCore,{"D-RLS1":-2,"D-QC1":-2},{coreElapsedMs:900000});
  assert.equal(original.identity.id,"positivist","Uncontradicted strongly sourced law must remain Positivist");
  assert.ok(changedScores.sorc.score>=80,"Fixture must remain overwhelmingly source-positivist");
  assert.equal(changed.identity.id,"positivist",
    "One exceptional-injustice answer must not invert an overwhelmingly Positivist result");
}
{
  const originalist=Object.fromEntries(questions.map((q,i)=>[q.id,i%2?1:-1]));
  for(const q of questions){
    const agree=q.signals?.agree?.time||0, disagree=q.signals?.disagree?.time||0;
    if(agree>0||disagree>0)originalist[q.id]=agree>=disagree?3:-3;
    else if(agree<0||disagree<0)originalist[q.id]=0;
  }
  Object.assign(originalist,{T7:3,T8:3,T10:3});
  const core=scoring.scoreAll(originalist);
  const legalOnly=classifier.classify(core,originalist,{"D-RLS1":-2,"D-QC1":-2},{coreElapsedMs:900000});
  const alsoRealist=classifier.classify(core,originalist,
    {"D-RLS1":3,"D-QC1":-2,"D-RLS2":3,"D-RLS3":3},{coreElapsedMs:900000});
  assert.equal(legalOnly.identity.id,"public_meaning_originalist");
  assert.equal(alsoRealist.identity.id,"public_meaning_originalist",
    "Descriptive Realism must not erase a dominating normative Originalist commitment");
}
// End-to-end fuzzing exercises the actual adaptive router and literal core
// responses, not unattainable synthetic coordinates or directly supplied traits.
let fuzzSeed=20261013;
function fuzzRandom(){fuzzSeed=(Math.imul(fuzzSeed,1664525)+1013904223)>>>0;return fuzzSeed/4294967296;}
let validCases=0;
for(let i=0;i<600;i++){
  const responses=Object.fromEntries(questions.map(q=>[q.id,[-3,-2,-1,0,1,2,3][Math.floor(fuzzRandom()*7)]]));
  const scores=scoring.scoreAll(responses),diagnosticResponses={};
  let asked=0;
  while(asked<classifier.MAX_DIAGNOSTICS){
    const next=classifier.nextDiagnostic(scores,responses,diagnosticResponses);
    if(!next)break;
    diagnosticResponses[next.id]=next.id==="D-QC1"||next.id==="D-RLS1"
      ? -2 : [-3,-2,-1,0,1,2,3][Math.floor(fuzzRandom()*7)];
    asked++;
  }
  assert.ok(!classifier.nextDiagnostic(scores,responses,diagnosticResponses),
    "No adaptive router may ask an eighth question");
  const result=classifier.classify(scores,responses,diagnosticResponses,{coreElapsedMs:900000});
  if(result.responseQuality)continue;
  validCases++;
  assert.equal(result.champions.length,1,"Each valid respondent gets exactly one champion unit");
  assert.ok(result.identity?.public!==false,"A valid result may not expose an internal noun");
  assert.ok(result.resultTitle?.modifier?.text && result.resultTitle?.phrase?.text,
    "Every valid respondent gets modifier + noun + phrase");
  const source=scores.sorc.score;
  if(source>=65)assert.ok(!["nonpositivist","natural_lawyer","interpretivist"].includes(result.identity.id),
    "Contradictory source-of-law noun must not override Positivism");
  const recreated=resultContent.fromIds(result.identity,
    Object.fromEntries(Object.entries(scores).map(([k,v])=>[k,v.score])),{},
    {modifierId:result.resultTitle.modifier.id,phraseId:result.resultTitle.phrase.id,bridgeId:result.resultTitle.bridge?.id});
  assert.equal(recreated.title,result.resultTitle.title,
    "Shared result links must preserve all title words and modifiers");
}
assert.ok(validCases>=550,"Fuzz must check enough valid completed profiles");

console.log("PASS: adversarial primary-commitment, modifier/phrase, share-link, and 600 adaptive fuzz invariants.");
console.log("PASS: all 18 approved phrases are reachable and use the approved critic-rib wording.");
console.log("PASS: Originalism resolves end-to-end from literal 93-item answers through adaptive routing to all 13 locked champion units.");
console.log("PASS: Alexyan and Bickelian are champion/modifier-level distinctions, not public nouns.");
console.log("PASS: Formalist and Functionalist public labels remain unchanged.");
console.log("PASS: generic fit modifiers render Unmistakably a/an / blank / Some kind of, with correct articles and substantive modifiers taking priority.");
console.log("PASS: all 10 locked Source champion units are reachable end-to-end from literal answers within the seven-diagnostic cap.");
console.log("PASS: Method nouns/modifiers are locked, including Sociological Jurist and the three substantive Method modifiers.");
console.log("PASS: all 18 locked Method champion units are reachable end-to-end from literal answers within the seven-diagnostic cap.");
console.log("PASS: champion matching is noun-conditioned: primary and cross-cutting compatibility are explicit, incompatible champions are excluded.");
console.log("PASS: Living/Common-Law constitutionalism resolves to all 7 locked non-originalist champion units, including Democratic/Transformative Living modifiers, within the seven-diagnostic cap.");
console.log("PASS: Judicial review / constitutional authority resolves to all 9 locked champion units plus standalone Legal Constitutionalism within the seven-diagnostic cap.");
console.log("PASS: Institutional structure / doctrinal form resolves to Lawson, Calabresi-Prakash, Schauer, Peter Strauss, Alexy, and Barak; remedies retain Bhagwati-Iyer and tightly gated Fiss under the single-champion rule.");
