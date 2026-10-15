# LAWvalues

> Method/interpretation classifier details are documented in [`METHOD_ENGINE.md`](METHOD_ENGINE.md): eight public nouns, three substantive modifiers, twenty-five locked champion units, noun-conditioned compatibility, and literal-answer reachability.

> Source-of-law classifier details are documented in [`SOURCE_ENGINE.md`](SOURCE_ENGINE.md): public nouns, substantive modifiers, fourteen champion units, adaptive routing, article-aware fit labels, and end-to-end reachability.

> Originalism classifier details are documented in [`ORIGINALISM_ENGINE.md`](ORIGINALISM_ENGINE.md): OPM/OI public nouns, New construction modifier, fit modifiers, thirteen champion units, and adaptive routing under the twelve-question cap.

> Non-originalist constitutional-time details are documented in [`NONORIGINALISM_ENGINE.md`](NONORIGINALISM_ENGINE.md): Living/Common-Law public nouns, Democratic/Transformative Living modifiers, eight locked champion units, and end-to-end reachability under the twelve-question cap.

> Judicial-review / constitutional-authority details are documented in [`AUTHORITY_ENGINE.md`](AUTHORITY_ENGINE.md): six narrow public authority nouns, Responsive/Passive-virtues modifiers, eight locked public champion units, and strong-/weak-form review retained as nonpublic descriptors.

> Institutional-structure / doctrinal-form / remedies details are documented in [`STRUCTURE_FORM_ENGINE.md`](STRUCTURE_FORM_ENGINE.md): Formalist/Functionalist/Proportionalist plus thirteen selectable structure/form/remedies champion units, tightly gated cross-noun remedies specialists, and the exactly-one-champion rule.

LAWvalues is a static, client-side legal-philosophy quiz. The current public label is **Version 0.9 Beta**. It maps respondents across eight bipolar dimensions:

- Source: Positivist ↔ Non-positivist
- Constraint: Textualist ↔ Open construction
- Time: Historical ↔ Living
- Precedent: Stability ↔ Overruling
- Remedies: Narrow ↔ Systemic
- Posture: Majoritarian ↔ Counter-majoritarian
- Separation: Formalist ↔ Functionalist
- Form: Rules ↔ Balancing

## Instrument design

The core bank contains 88 questions across eight dimensions. Questions are grouped by a nominal section for presentation, but scoring is multidimensional and asymmetric: agreement and disagreement can carry different implications, and an item may contribute to any axis it materially informs. Each pole is estimated separately from the evidence that actually bears on it. Responses use a seven-point scale from −3 to +3, and “Not sure” answers are excluded from both evidence and scoring denominators; low coverage conservatively shrinks estimates toward 50 rather than projecting certainty from a single item.

For each axis, the scorer separately totals available evidence for the first and second pole. A respondent's answer contributes in proportion to response strength and to that answer direction's signed signal for the axis. The displayed score is the difference between normalized support for the two poles, centered at 50 and clamped to 0–100. Rejection of a proposition therefore does not automatically count as support for its opposite unless the item explicitly encodes that implication.

The questions are written as plain-language legal problems rather than definitions of the measured categories. They draw on recurring cases, hypotheticals, and disputes from jurisprudence, statutory interpretation, constitutional law, remedies, separation of powers, and rules-versus-standards scholarship. Politically cross-cutting examples reduce the chance that a respondent can infer an answer merely from a school's partisan reputation.

## Jurisprudential matching

After the 88-question core, LAWvalues may ask up to twelve adaptive questions, with a hard maximum of 100 total. The core supplies all direct axis evidence. In 0.9, a narrowly gated diagnostic clarification can retract specific weak Time inferences without overriding direct answers or adding opposite-pole evidence. Other adaptive answers establish defining priorities, refine doctrines, and distinguish compatible thinker matches. Per-question ledgers retain score provenance; historical shared scores are preserved as saved. See [`AXIS_LABELS_AND_SCORING_09.md`](AXIS_LABELS_AND_SCORING_09.md) for the complete version and evidence contract.

Public results retain the approved **[modifier] [noun] [phrase]** inventory. The noun names the best-supported primary commitment, rather than every belief the person holds. The modifier identifies a meaningful subtype within that noun or expresses strength of fit. The phrase reports the strongest remaining commitment after accounting for what the noun and its modifier already communicate. Catalog entries and their wording are unchanged; tests freeze their contents.

Subtype precision is not automatically evidence of defining importance. In particular, answering Inclusive versus Exclusive Positivism no longer promotes Positivism over other supported commitments. Conditional comparative-priority questions can distinguish which supported family is more central; they do not change axis scores or establish acceptance of a doctrine on their own. Missing priority answers remain missing evidence.

Champion matching receives fine-grained adaptive attention to supported differences and known disagreements. Questions are evaluated for their ability to resolve live noun/champion uncertainty, including useful prerequisite questions, rather than following an automatically privileged chain. These routing weights are design heuristics, not measured information gain or population probabilities.

The opening and context paragraphs explain a coherent relationship among the full response profile's commitments. They are independent of the selected champion and do not merely define the headline noun. See `NARRATIVE_ENGINE.md` for evidence and legacy-link rules.

The matching model is deliberately sparse:

- a thinker has positions only on axes that meaningfully characterize that thinker; an unmodeled axis is unknown rather than treated as a neutral 50 or as agreement; coverage and known disagreements qualify the match;
- major jurisprudential families remain first-class results, including Legal Positivism, Natural Law, Dworkinian jurisprudence, Greenbergian Moral Impact Theory, Legal Process, Originalism, Purposivism, Living/Common-Law Constitutionalism, judicial-restraint traditions, popular/weak-form constitutionalism, and proportionality;
- specialist thinkers can win only when their distinctive proposition is affirmatively supported;
- lineage/further-reading figures can enrich a result without being eligible to win it;
- anti-traits and minimum-salience gates prevent a numerically nearby thinker from being selected when the respondent rejects the idea that makes that thinker distinctive;
- every valid classified result returns exactly one champion unit; close races reduce confidence rather than creating co-champions.

Legal Realism remains a special meta-position because it asks how determinative legal doctrine actually is rather than taking a position on the eight normative axes. Realism probes compete with other useful diagnostics; accepting that judgment is not mechanical does not automatically make Realism the primary identity.

Current specialist examples include Lawrence Solum for principle/construction-sensitive originalism, Roscoe Pound for sociological jurisprudence, Frederick Schauer for unusually rule-centered judging, James Bradley Thayer for clear-error deference, Robert Alexy for structured proportionality, and Owen Fiss for structural remedies. Friedrich Carl von Savigny is retained as Historical School lineage rather than forced into the modern Historical/Living axis. Sandra Day O'Connor is available conservatively as a low-theory, contextual catch-all when no grand jurisprudential theory explains an otherwise moderate case-by-case profile.

Thinker signatures are theory-derived prototypes, not empirical estimates. Pilot data should later calibrate thresholds, profile locations, diagnostic routing, and champion-confidence labels. See `MATCHING_ARCHITECTURE.md` for the matching rules.

## Local use

No build step or dependencies are required. Serve the repository with any static server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Audit

The repository includes dependency-free audits covering questions/scoring, the result catalog, adaptive routing, result narratives, shared-result reconstruction, title-inventory preservation, defining-priority matching, and frozen full-quiz profiles. Use Node.js 22 or later (CI uses Node.js 22):

```bash
npm test
```

All registered audits run even if an earlier audit fails; the command reports each result and exits unsuccessfully if any audit fails. The same command runs in the Instrument audit GitHub Actions workflow. Individual checks are available as `npm run audit:questions`, `npm run audit:catalog`, `npm run audit:routing`, `npm run audit:narrative`, `npm run audit:share`, `npm run audit:title`, `npm run audit:primary`, and `npm run audit:whole-profile`.

They check the 88-item core, asymmetric scoring, source references, local asset references, sparse profile validity, specialist gates, major jurisprudential-family coverage, literal-answer adaptive reachability (including unresolved Mixed-to-Source paths), phrase reachability, noun-conditioned twist assembly, the twelve-question diagnostic cap, explicit response-quality safeguards, narrative evidence consistency, fresh-session share-link reconstruction of both paragraphs, and several false-match tests such as preventing a positivist from winning a strong Natural Law profile.

The audit workflow does not configure GitHub Pages deployment or branch protection. When Pages publishes directly from a branch, a separate audit run does not automatically block publishing; changes should only be promoted after the full audit passes on the exact revision being published.

## Validation status

The item bank is content-grounded and structurally audited, not empirically validated. Factor structure, reliability, test–retest stability, convergent and discriminant validity, subgroup invariance, diagnostic thresholds, and thinker-profile locations require pilot response data.

## Public modifiers versus archival twist records

The current result-title grammar exposes **19 public substantive modifiers** plus two fit-strength labels (Unmistakably and Some kind of); intermediate fits use no generic modifier. Public modifiers are limited to genuine jurisprudential subtypes or coherent hybrids. Ordinary cross-axis traits stay in the phrase, bridge, champion, or explanation layers. Retained historical twist records remain **internal/legacy only** and may still support old share links or editorial comparison without being advertised as public outcomes. See `PUBLIC_SUBSTANTIVE_MODIFIER_IDS`, `PUBLIC_MODIFIERS`, and `INTERNAL_TWIST_IDS` in `result_content.js`.

## Theory-based institutional diagnostics

The seven common Separation questions continue to determine the displayed Formalist–Functionalist percentage. Five **conditional** institutional specialist questions (D-SEP1 through D-SEP4 plus D-MET1) investigate the justification for those answers: whether the President can override officers' congressionally assigned discretion, whether courts independently determine the limits of delegated statutory authority, whether broad major-policy delegation remains unconstitutional despite clear authorization, and whether serious executive-branch civil adjudication is compatible with the judicial role. These diagnostics supply narrower champion/identity evidence without changing the displayed Separation percentage or adding another public axis. The router offers them only when the existing Separation profile or linked interpretive commitments make the dispute live, and routing itself continues to use the 88-core scores so a diagnostic cannot create a feedback loop.

## Exceptional results and political mirrors

Jurisprudential matches are withheld on three exceptional paths: mechanical or
inattentive answers (including the universal response check), broad internal
contradictions in independent domains, and repeated selection of politically
favored outcomes across matched judicial-method cases. These are not ninth or
tenth axes. No partisanship meter appears on the result page.

The hidden outcome-selection test uses C3/C4, R2/R1, R7/R6 and R10/R9 as
politically counterbalanced applications of the same kind of judicial rule.
It requires at least three independently reversed pairs favoring the same
political side, weighted evidence of at least 3, and a clear directional
margin. The historically framed T1/T2 pair is weaker corroboration and cannot
substitute for a third direct reversal. O9/O10 are deliberately *not* counted:
their constitutional premises differ too much to infer an inconsistent method
from a simple opposition of substantive outcomes. This is a stringent
heuristic rather than a validated measure of individual political motivation.

A successful outcome-selection override returns the exceptional
"Outcome-driven pattern" result without a jurist or three-part title.
It does not affect the eight plotted scores. Ordinary, valid cases retain
exactly one champion unit and a modifier, noun and phrase. Broad incoherence
requires direct contradictions in more than one jurisprudential domain; mixed
scores and sincere methodological uncertainty do not qualify.

