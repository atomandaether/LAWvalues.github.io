# Instrument 0.9: contextual axes and bounded evidence

This version keeps eight poles and 88 core questions plus at most 12 adaptive questions. It changes the measurement instrument, so historical answers are not silently reinterpreted as answers to revised questions.

## What changed

- Axis headings describe the respondent's independently evidenced doctrine or method on that axis. They never read the overall headline or champion.
- Time asks whether original constitutional meaning independently constrains legitimate development. Original linguistic usage, selecting public meaning rather than private intent, and applying an original principle are retained as weak clues rather than treated as complete Originalism.
- Rewritten temporal examples distinguish original legal meaning from original expected applications and distinguish changing constitutional content from developing implementing doctrine. T11 directly asks about independent authority; disagreement is not affirmative Living evidence. T12 expressly tests development beyond original constraints.
- The Source compensation example excludes recognized custom as well as written sources. This avoids treating source-based unwritten law as independent moral validity.
- Source settlement, generic judicial review and independence, judicial finality/avoidance/accountability, and analogous cross-axis clues retain appropriately limited influence. False links were removed where the proposition did not measure the target construct: e.g. accepting precedent is not inherently positivist; severability is not a preference for categorical doctrine; rejecting living constitutional development is not a preference for overruling.
- Political mirror comparisons no longer treat nationwide relief questions as identical when only one adds the single-trial-judge/no-appellate-review qualification. Contextual differences in delegation and rule application do not automatically count as inconsistency.

## Weak evidence budget

Question records explicitly tag reviewed weak links with `evidenceKinds[axis] = "hint"`. The tags are not inferred from nominal sections or ID prefixes. Direct multi-axis propositions retain their specified weights.

For each pole separately, let D be the total direct potential and H the total hint potential. Hint signals are multiplied by `min(1, D / (4H))` when H is positive. Thus weak clues supply no more than 20% of the available directional weight. This is a transparent design heuristic, not an empirically validated confidence estimate.

The existing asymmetric scoring and information-coverage shrinkage remain. Neutral answers supply answered information without directional support. Skips and invalid current answers supply neither. A fully answered profile with only weak directional clues and neutral direct answers cannot move beyond 60/40 solely through those clues. A sparse profile with direct questions skipped can be more extreme because missing answers are not converted to neutrality; coverage and evidence-qualified labels must be read alongside that number. All coherent pole extremes remain reachable.

Repeated opposite-policy examples still test consistency within the same construct. A question count is not a claim that each example supplies an independent psychometric factor.

## Precisely bounded diagnostic correction

Only one 0.9 numeric correction is implemented:

- D-ORI7 can retract historical-authority implications of T7, T8, and T10 after explicit rejection of independent public-meaning authority.
- It requires a measured public-meaning route, a neutral/rejecting T11 answer, and no strong direct T1/T2/T3 fixation answer or affirmed alternative original-intent, Original-Methods, or Original-Law theory.
- Agreement with historical semantics remains recorded. Only its weak inference about independent authority is attenuated, proportionally to the diagnostic strength.
- The correction never adds Living evidence, changes a direct answer, changes the denominator/coverage, or imputes an unasked diagnostic. Confirmation does not double-count a clue.
- Other diagnostics continue to refine doctrines, priorities, and thinker matches without changing the percentages.

A fully answered neutral profile with strong T7/T8/T10 clues produces 53 Historical. Appropriate strong D-ORI7 clarification retracts that to 50. Direct fixation, original-intent, Original-Methods, and Original-Law controls prevent that retraction. This is not a whole-score reset.

Each current axis result records its core estimate, final score, adjustment, coverage, policy identifier, and a per-question contribution ledger. A local results page can show the exact question, diagnostic, before/after contribution, and reason. Shared links may carry core/final totals and a whitelisted policy identifier, but do not pretend to contain raw-answer evidence they omit.

## Trait reliability and doctrine boundaries

- A fractional single-item trait rule no longer renormalizes back to certainty merely because other evidence was skipped. The same reliability is represented in trait provenance.
- Systemic-remedy support does not manufacture structural-supervision evidence. Supervision comes from the actual supervision question.
- Rejecting an independent special prosecutor supplies only a weak unitary-executive clue. The explicit general separation diagnostic can clarify that clue.
- Rejecting contextual textualism does not affirm enacted-compromise theory. Rejecting popular constitutional authority does not independently establish departmentalism.
- Positive-law settlement does not exclude separately established nonpositivist theories.
- Current Originalism eligibility requires independent fixation or Original-Law evidence, not a historically tilted percentage alone.
- Judicial independence does not itself establish rights-as-trumps reasoning. Severability does not itself establish a general minimalist philosophy.

## Axis label contract

`LAW_AXIS_LABELS.describeAll` reads current core answers, answered diagnostics, scores, and an explicit instrument version. It produces a whitelisted label, explanation, evidence status, and supporting answer IDs for each axis.

Specific methods generally require two corroborating core answers or a genuinely distinguishing diagnostic plus compatible core evidence. Strong contrary evidence prevents unqualified narrow claims. Equally supported same-family descriptions coarsen to their broader method; opposing unresolved families yield Varied rather than a catalog-order winner. Source validity anchors are required for Positivism; ordinary institutional settlement alone is insufficient. Proportionality requires its structured-sequence diagnostic. Originalism requires actual independent-authority evidence. New Originalism requires fixed meaning plus permission for conditional construction.

- **Weak:** the direct relevant answers show little commitment, even when semantic or contextual clues are strong.
- **Limited Evidence:** direct evidence is too sparse, unavailable, malformed, or belongs to an unsupported instrument version.
- **Varied:** substantive commitments differ without a demonstrated unifying rule or genuine contradiction.
- **Conflicting:** only a reviewed incompatibility, currently the Source pair affirming both that law runs out and that principles already supply the answer. Opposing poles and reverse-key disagreement are not sufficient. T11/T12 may express a defeasible-constraint combination and are conservatively Varied, not branded contradictory.
- Coherent conditional positions receive substantive labels such as Representation-Reinforcing Review, Remedial Tailoring, Administrative Functionalism, or Equitable Exceptions.

The catalog deliberately mixes established academic schools with accurate legal methods where there is no defensible narrower school. No named jurist is inferred from an unmeasured specialty. Percentages, label confidence, and thinker fit are separate claims.

## Historical compatibility

The exact 0.8 question bank remains immutable as `LAW_LEGACY_QUESTIONS`. Explicit version replay uses that bank and its original scoring behavior. Regression fixtures freeze the old bank's hash and genuine old scores. Historical fixture tests select legacy questions and trait semantics before classification; they are not passed off as responses to rewritten prompts.

New session storage uses the 0.9 key. Old saved numbers and explicit encoded headline/narrative IDs are preserved through stable whitelisted catalogs without calling the new classifier on old raw answers. Old exports retain their original instrument version and responses. Versionless, invalid, unsupported, or mismatched records cannot borrow current answer evidence.

New labels serialize as whitelisted axis-specific IDs; sharing never serializes the answer-level ledger. A shared label restores catalog copy, not fabricated supporting answer IDs. A newly authored current fictional demonstration has its own full prompt/answer record and a predeclared diagnostic policy, with no target headline or champion.

## Verification

`npm test` includes historical regressions, current scoring and trait controls, all-axis endpoints/neutral/missingness, adaptive routing and the 100-answer ceiling, label gates and serialization, interrupted/versioned session replay, complete result rendering, and contribution provenance. Both conceptual fixes and compatibility behavior must pass; the old fixture expectations are not weakened to fit the new instrument.
