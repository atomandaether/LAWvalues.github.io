# Result narrative contract

The result consists of one portrait expressed in two paragraphs:

1. A plain-English opening of at most 70 words describing the respondent's judicial outlook.
2. A connected explanation of the outlook's mechanism, place in legal thought, and unresolved difficulty, at most 300 words. Roughly 180–300 words is an editorial target, not a minimum.

## Relationship-first selection

`selectPortrait` selects a relationship supported by at least two commitments. Current plans cover continuity with explicitly prioritized, diagnostically confirmed empirical Realism or practical Interpretive Pluralism; continuity with development or rights; historical authority with reliance, correction, or general rules; public text/history/rules qualified by reliance; rules with rights; text or purpose with democratic restraint; text with general rules; development with rights or democratic authority; practical interpretation with continuity; and contextual rights review.

Moderate combinations matter: Time at 42 or below and Precedent at 62 or above support continuity through development. They do not require an extreme Living score. A common-law trait cannot by itself erase a strongly Historical temporal score. Several eligible relationships use an explicit, deterministic priority; this is an editorial choice, not an empirically calibrated ranking.

Each relationship has one opening, one explanatory mechanism, and one unresolved problem. Source-aware openings and explanations connect the selected relationship to its legal authority. Fully authored combinations cover public constraint with incorporated morality, continuity through source-based development, and continuity with independent rights, including natural-law settlement qualified by independent principles and extreme injustice. Remaining combinations use a relationship-specific authority sentence before the unresolved problem, producing finite catalog entries. Both paragraphs select that same entry. Explicit Realism requires extra-doctrinal and empirical evidence; explicit pluralist continuity requires affirmative modal pluralism, without requiring the stronger practical-reasoning subtype. In both cases a supported priority must accompany the evidence, and neither the noun nor champion activates it. These are reusable patterns, with no respondent names, biographies, occupations, answer rationales, or champion inputs.

When the evidence does not establish one of these relationships, the supported specialist route retains its own matching opening. This deliberately avoids manufacturing a whole-profile synthesis from neutral or missing evidence. It also means some profiles still receive narrower specialist explanations; the finite set is not a bespoke essay generator or a promise to mention every score.

## Source compatibility

Source qualifies the portrait without usually supplying its subject. Frames distinguish recognized public sources, incorporated morality, exclusive sources, source-based answers qualified by extreme injustice, independent principles, independent principles plus extreme injustice, extreme-injustice-only evidence, interpretivism, moral impact, moral practice, legality, natural law, strong natural law, and strong natural law combined with independently binding principles.

- Core-only `source.independent_moral_validity` comes from S10/S11. D-NP1 settlement support and D-CLC1 common-law rights cannot establish this proposition. Positive-law settlement does not turn a strongly source-based profile into an independent-moral-validity profile.
- Independent principles must not vanish behind an extreme-injustice gate. Endorsing both is broader than an extreme-injustice-only thesis.
- A source-based respondent who gives even qualified support to extreme injustice is not described as excluding that possibility categorically. The narrative does not invent an explanation for that answer.
- Inclusive positivism does not make every good moral claim law. Moral impact does not make every moral consequence of official conduct a legal obligation.
- Natural law, legality, and interpretivism are not interchangeable explanations.
- The Form axis cannot establish judicial supremacy or strong review. Purpose is not identical to practical consequences. Historical interpretation can concern public meaning, intention, or historical legal methods.
- Special unusable, incoherent, and outcome-driven identities take precedence over supplied prose IDs. Ordinary mixed profiles do not independently establish contradiction.

## Share replay and compatibility

`build(classification, scores, x, o)` retains its existing API. New `portrait_*` IDs are finite own-property entries in both `ROUTES` and `OPENINGS`. They serialize in the existing `x` and `o` parameters without storing prose or raw answers. An integrated context is atomic: its opening comes from the same plan, even if an unrelated valid `o` is supplied. It can reconstruct both paragraphs without session traits or champion information.

Legacy context/opening pairs remain supported and replay independently. A valid legacy context with missing or malformed opening uses its historical opening inference, preserving pre-opening-ID links. Missing or malformed context IDs fall back to the supported inferred plan. `fromId` retains its safe legacy fallback. All public catalogs are frozen after construction. Modifier and phrase catalogs and their wording are outside this module and unchanged by this revision.

## Testing and limits

Run `node scripts/audit-result-narrative.mjs` and `node scripts/audit-result-share.mjs`, or `npm test`.

Tests cover opening/context limits, all catalog identities, moderate paired evidence, historical/developmental near-neighbors, Source distinctions, exceptional precedence, narrow-diagnostic limits, 301,806 finite axis-grid/champion swaps, actual quiz completion, fresh-session render/copy handlers, malformed/legacy links, and all stored opening/context replay combinations.

The three frozen fictional runs supplied editorial acceptance examples. Their actual score/trait records were inspected separately from their biographies: historical constraint with reliance, continuity enabling source-grounded development, and continuity supporting independent rights must not collapse to interchangeable prose. Their unchanged answers can still produce different scores under a revised scorer; review the live classified results as well as the frozen baseline.

These checks establish structural properties and selected semantic boundaries. They do not validate the quiz empirically, prove every possible answer pattern coherent, or replace reading both paragraphs together. The engine expresses tendencies and unresolved conflicts, not a diagnosis of someone's life, politics, or personal motivations.

The detailed Source theory distinctions and references remain in [SOURCE_ENGINE.md](SOURCE_ENGINE.md).
