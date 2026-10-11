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
assert.ok(resultContent && Array.isArray(resultContent.FEATURES) && resultContent.FEATURES.length >= 25,
  "Need one machine-readable residual-feature pool");
assert.equal(resultContent.MODIFIERS.length, resultContent.FEATURES.length,
  "Every residual feature needs a modifier rendering");
assert.equal(resultContent.PHRASES.length, resultContent.FEATURES.length,
  "Every residual feature needs a phrase rendering");
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

const originalistChildren = identities.filter((x) => x.parentId === "originalist").map((x) => x.id);
for (const required of [
  "public_meaning_originalist",
  "original_intent_originalist",
  "original_methods_originalist",
  "framework_originalist"
]) {
  assert.ok(originalistChildren.includes(required), `Missing originalist subtype ${required}`);
}

for (const id of [
  "D-RLS1", "D-RLS2", "D-RLS3", "D-POS1", "D-NP1", "D-MAJ1", "D-MAJ2",
  "D-INT1", "D-LP1", "D-NP4", "D-QC1", "D-SOC1", "D-PLU1", "D-OCO1"
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

// The public result grammar ranks one residual-feature pool: noun first, phrase second,
// modifier third. The phrase must take the strongest unspent feature and the modifier
// should then add a genuinely different next-best feature.
const syntheticIdentity = identities.find((x) => x.id === "public_meaning_originalist");
const syntheticScores = { sorc: 86, cons: 68, time: 92, prec: 82, remed: 55, post: 61, separ: 54, form: 70 };
const syntheticTraits = {
  "source.positive_sources": 0.72,
  "time.public_meaning": 0.9,
  "time.fixation": 0.84,
  "precedent.stability": 0.82,
  "precedent.reliance": 0.85,
  "constraint.textual": 0.35,
  "form.rules": 0.4
};
const assembled = resultContent.assemble(
  { identity: syntheticIdentity },
  syntheticScores,
  syntheticTraits
);
assert.ok(assembled.title.includes("Public-Meaning Originalist"),
  "Assembled title must preserve the real jurisprudential noun");
assert.equal(assembled.phrase.id, "precedent_stability",
  "The strongest residual feature should become the phrase");
assert.equal(assembled.modifier.id, "source_positive",
  "The next strongest distinct residual feature should become the modifier");
assert.equal(assembled.phrase.text, "who thinks being wrong for 50 years counts for something",
  "Precedent-stability phrase should use the current critic-rib wording");
assert.equal(assembled.modifier.text, "Morality-“blind”",
  "Positive-source modifier should use the current critic-rib wording");
assert.notEqual(
  resultContent.FEATURES.find((x) => x.id === assembled.phrase.id).group,
  resultContent.FEATURES.find((x) => x.id === assembled.modifier.id).group,
  "Phrase and modifier should normally compress different substantive dimensions"
);
const ranked = resultContent.rankFeatures(syntheticIdentity, syntheticScores, syntheticTraits);
assert.equal(ranked[0].feature.id, assembled.phrase.id,
  "Phrase selection must follow the common residual-feature ranking rather than a separate phrase list");

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
console.log("PASS: public titles use one ranked residual-feature pool: phrase gets #2, modifier gets #3.");
console.log("PASS: critic-rib wording is presentation only; neutral feature IDs drive the ranking.");
