import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const context = vm.createContext({ console });
context.globalThis = context;

for (const filename of ["result_catalog.js", "diagnostics.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, filename), "utf8"), context, { filename });
}

const identities = context.LAW_RESULT_IDENTITIES;
const champions = context.LAW_CHAMPIONS;
const rules = context.LAW_CHAMPION_MATCHING_RULES;
const diagnostics = context.LAW_DIAGNOSTIC_QUESTIONS;

assert.ok(Array.isArray(identities) && identities.length >= 20, "Need a substantial identity catalog");
assert.ok(Array.isArray(champions) && champions.length >= 25, "Need a substantial champion catalog");
assert.ok(Array.isArray(diagnostics) && diagnostics.length >= 10, "Need an adaptive diagnostic bank");

assert.equal(new Set(identities.map((x) => x.id)).size, identities.length, "Identity IDs must be unique");
assert.equal(new Set(identities.map((x) => x.label)).size, identities.length, "Identity labels must be unique");
assert.equal(new Set(champions.map((x) => x.id)).size, champions.length, "Champion IDs must be unique");
assert.equal(new Set(diagnostics.map((x) => x.id)).size, diagnostics.length, "Diagnostic IDs must be unique");
assert.equal(new Set(diagnostics.map((x) => x.prompt)).size, diagnostics.length, "Diagnostic prompts must be unique");

const identityIds = new Set(identities.map((x) => x.id));
const diagnosticIds = new Set(diagnostics.map((x) => x.id));
const allowedStatuses = new Set(["core", "adaptive", "fallback", "override"]);
const allowedRoles = new Set(["primary", "subtype", "historical", "institutional"]);

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

for (const diagnostic of diagnostics) {
  assert.ok(["high", "medium", "deferred"].includes(diagnostic.priority),
    `${diagnostic.id} has invalid priority`);
  assert.ok(diagnostic.prompt.trim().split(/\s+/).length <= 85,
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

assert.ok(identityIds.has("legal_realist"), "Legal Realist must be in the identity catalog");
assert.equal(
  identities.find((x) => x.id === "legal_realist").status,
  "override",
  "Legal Realist should be modeled as the approved non-axis override identity"
);
assert.ok(identityIds.has("pragmatist"), "Pragmatist must be represented");
assert.ok(identityIds.has("intentionalist"), "Intentionalism must not be collapsed into purposivism");
assert.ok(identityIds.has("common_law_constitutionalist"), "Common-Law Constitutionalism must be represented");
assert.ok(identityIds.has("popular_constitutionalist"), "Popular Constitutionalism must be represented");
assert.ok(identityIds.has("departmentalist"), "Departmentalism must be represented");

const originalistChildren = identities.filter((x) => x.parentId === "originalist").map((x) => x.id);
for (const required of [
  "public_meaning_originalist",
  "original_intent_originalist",
  "original_methods_originalist",
  "framework_originalist"
]) {
  assert.ok(originalistChildren.includes(required), `Missing originalist subtype ${required}`);
}

for (const id of ["D-RLS1", "D-RLS2", "D-RLS3", "D-POS1", "D-NP1", "D-MAJ1", "D-MAJ2", "D-INT1"]) {
  assert.ok(diagnosticIds.has(id), `Missing high-value diagnostic ${id}`);
}

assert.equal(rules.selectAfterIdentity, true, "Champion selection must happen after identity selection");
assert.equal(rules.doNotForceChampion, true, "Champion matching must permit no single winner");
assert.equal(rules.requireMarginalExplanatoryValue, true, "Champions must add marginal explanatory coverage");
assert.equal(rules.pruneRedundantChampions, true, "Redundant champions must be pruned");

const championIds = new Set(champions.map((x) => x.id));
for (const requiredChampion of ["scalia", "hugo_black", "llewellyn", "leiter", "posner"]) {
  assert.ok(championIds.has(requiredChampion), `Missing high-value cross-profile champion ${requiredChampion}`);
}
const frank = champions.find((x) => x.id === "frank");
assert.equal(frank.role, "historical", "Frank should remain lineage until fact/psychology diagnostics exist");
assert.equal(frank.selectable, false, "Frank should not be selectable without subtype diagnostics");

// Naming guardrails.
const forbiddenIdentityLabels = new Set([
  "Structural Reform",
  "Stability Institutionalist",
  "Structuralist",
  "Remedialist"
]);
for (const identity of identities) {
  assert.ok(!forbiddenIdentityLabels.has(identity.label), `Invented/invalid middle label: ${identity.label}`);
}

console.log(`PASS: ${identities.length} real/fallback identities audited.`);
console.log(`PASS: ${champions.length} champions/lineage exemplars with identity-constrained matching.`);
console.log(`PASS: ${diagnostics.length} adaptive diagnostics, including Realism, Originalism, Source, Majoritarian, Intentionalist, and Legal Process routers.`);
console.log("PASS: champion matching is separate from identity naming and never forced.");
