# Champion cards

The existing champion line remains between the result title and respondent portrait. Each selectable champion unit has one authored headline and one explanatory paragraph, including units containing two thinkers. Grouped portraits explain relevant differences without claiming that their authors belong to an identical school.

## Content and boundaries

`champion_content.js` contains individually authored entries for all 83 selectable profile units. The prose explains each intellectual approach and the relationship between its commitments, rather than turning the user's result into a claim of agreement with every position. Headlines are generally 15–25 words and paragraphs generally 90–120 words; these are editorial targets, not reasons to distort a theory. The approved Elena Kagan and Hugo Black portraits are locked verbatim in `scripts/fixtures/approved-champion-copy.json`.

`CHAMPION_SOURCE_AUDIT.json` records the organizing claim, supporting primary evidence, and research limits for each card. Source metadata in the runtime content points readers to the relevant writings. Research distinguishes an author's proposal from current doctrine and notes differences within grouped units. Linked books and articles were not necessarily read in full; the audit identifies the evidence used and any limitations.

`profiles.js`, identities, modifiers, axes, questions, scoring, champion selection, and the respondent's separate opening/context are unchanged. Six lineage-only profiles remain nonselectable and do not gain cards.

## Rendering and evidence

`champion_cards.js` only presents an already-selected champion. Its public `tagline` and `paragraph` are the exact authored strings. The renderer does not append personalized fit boilerplate, shorten the portrait, or split a grouped unit into separate answers.

The separate `fit` API property retains the prior evidence-specific explanation for consumers that need it. The existing evidence logic ranks supported traits by support strength multiplied by individually authored relevance, with deterministic ties and at most one trait per construct group. It retains up to three constructs for sharing and can select an authored compound affinity. A compound requires independently supporting question IDs in the existing read-only trait-evidence ledger; overlapping aliases or an axis score alone cannot earn it. None of this presentation logic feeds back into scoring or matching.

Absent, ambiguous, withheld, unknown, and lineage-only matches retain their safe fallbacks. A legacy or evidence-poor result can still display the intellectual portrait without fabricating an answer-specific affinity.

## Shared replay

The existing `cev=2`, `ce`, and optional `ca` formats are unchanged. No raw answers or question IDs are added. Readers validate the evidence version, champion, allowlisted traits, strengths, and prerequisites for any saved affinity. Old `cev=1` links remain compatible without acquiring compound provenance. This public, editable result-link format is not an authenticity or psychometric-validation claim.

## Validation

`audit-champion-cards.mjs` checks coverage, source metadata, preserved approved text, trait allowlists, independent-item compound gating, deterministic ranking, evidence compatibility, exact authored prose, and rendering of all 83 units under both 0.9 and legacy 0.8 result versions. It also checks invalid/oversized input, exceptional states, modeled-score agreement for the API fit, and card ordering. The quiz completion/share audit checks evidence payloads and exact card replay after storage is cleared. All existing instrument audits remain in the aggregate suite.
