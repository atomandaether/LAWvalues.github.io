# LAWvalues

> Method/interpretation classifier details are documented in [`METHOD_ENGINE.md`](METHOD_ENGINE.md): eight public nouns, three substantive modifiers, eighteen locked champion units, noun-conditioned compatibility, and literal-answer reachability.

> Source-of-law classifier details are documented in [`SOURCE_ENGINE.md`](SOURCE_ENGINE.md): public nouns, substantive modifiers, ten champion units, adaptive routing, article-aware fit labels, and end-to-end reachability.

> Originalism classifier details are documented in [`ORIGINALISM_ENGINE.md`](ORIGINALISM_ENGINE.md): OPM/OI public nouns, New construction modifier, fit modifiers, thirteen champion units, and adaptive routing under the seven-question cap.

> Non-originalist constitutional-time details are documented in [`NONORIGINALISM_ENGINE.md`](NONORIGINALISM_ENGINE.md): Living/Common-Law public nouns, Democratic/Transformative Living modifiers, seven locked champion units, and end-to-end reachability under the seven-question cap.

> Judicial-review / constitutional-authority details are documented in [`AUTHORITY_ENGINE.md`](AUTHORITY_ENGINE.md): eight public authority nouns, Responsive/Passive-virtues modifiers, nine locked champion units, and end-to-end reachability under the seven-question cap.

> Institutional-structure / doctrinal-form / remedies details are documented in [`STRUCTURE_FORM_ENGINE.md`](STRUCTURE_FORM_ENGINE.md): Formalist/Functionalist/Proportionalist, eight locked selectable champion units across this zone, tightly gated Fiss cross-noun matching, remedies lineage, and the exactly-one-champion rule.

LAWvalues is a static, client-side legal-philosophy quiz. The current public label is **Version 0.6 Beta**. It maps respondents across eight bipolar dimensions:

- Source: Positivist ↔ Non-positivist
- Constraint: Textualist ↔ Open construction
- Time: Historical ↔ Living
- Precedent: Stability ↔ Overruling
- Remedies: Narrow ↔ Systemic
- Posture: Majoritarian ↔ Counter-majoritarian
- Separation: Formalist ↔ Functionalist
- Form: Rules ↔ Balancing

## Instrument design

The core bank contains 93 questions across eight dimensions. Questions are grouped by a nominal section for presentation, but scoring is multidimensional and asymmetric: agreement and disagreement can carry different implications, and an item may contribute to any axis it materially informs. Each pole is estimated separately from the evidence that actually bears on it. Responses use a seven-point scale from −3 to +3, and “Not sure” answers are excluded from both evidence and scoring denominators; low coverage conservatively shrinks estimates toward 50 rather than projecting certainty from a single item.

For each axis, the scorer separately totals available evidence for the first and second pole. A respondent's answer contributes in proportion to response strength and to that answer direction's signed signal for the axis. The displayed score is the difference between normalized support for the two poles, centered at 50 and clamped to 0–100. Rejection of a proposition therefore does not automatically count as support for its opposite unless the item explicitly encodes that implication.

The questions are written as plain-language legal problems rather than definitions of the measured categories. They draw on recurring cases, hypotheticals, and disputes from jurisprudence, statutory interpretation, constitutional law, remedies, separation of powers, and rules-versus-standards scholarship. Politically cross-cutting examples reduce the chance that a respondent can infer an answer merely from a school's partisan reputation.

## Jurisprudential matching

After the 93-question core, LAWvalues may ask up to seven adaptive tie-breakers, keeping the full quiz at 100 questions or fewer. These follow-ups **do not change the eight headline scores**. The first two are a soft Realism probe and a response check; remaining questions are routed only when they can refine a live jurisprudential distinction.

Public results use the three-part grammar **[noun-conditioned twist] [real jurisprudential identity] [broad residual phrase]**. The middle noun is the nearest real jurisprudential neighbor. The trailing phrase carries the strongest broad, well-supported characteristic that noun does not already communicate; it is drawn from the eight axis poles plus only the few narrower traits that the existing 93 questions genuinely measure with enough independent evidence. The front modifier is no longer "third place" in the same ranking. It is a **twist on the noun**: a narrower, noun-conditioned feature that explains what is unusual about this respondent's particular version of that jurisprudential identity. This lets a Solum-like Public-Meaning Originalist, for example, surface a construction-zone twist without pretending that one narrow distinction is the person's third-largest worldview axis. Closest-thinker matching remains separate.

The matching model is deliberately sparse:

- a thinker has positions only on axes that meaningfully characterize that thinker; an unmodeled axis is ignored rather than treated as a neutral 50;
- major jurisprudential families remain first-class results, including Legal Positivism, Natural Law, Dworkinian jurisprudence, Greenbergian Moral Impact Theory, Legal Process, Originalism, Purposivism, Living/Common-Law Constitutionalism, judicial-restraint traditions, popular/weak-form constitutionalism, and proportionality;
- specialist thinkers can win only when their distinctive proposition is affirmatively supported;
- lineage/further-reading figures can enrich a result without being eligible to win it;
- anti-traits and minimum-salience gates prevent a numerically nearby thinker from being selected when the respondent rejects the idea that makes that thinker distinctive;
- every valid classified result returns exactly one champion unit; close races reduce confidence rather than creating co-champions.

Legal Realism remains a special meta-position because it asks how determinative legal doctrine actually is rather than taking a position on the eight normative axes. A universal soft Realism probe can unlock follow-up questions.

Current specialist examples include Lawrence Solum for principle/construction-sensitive originalism, Roscoe Pound for sociological jurisprudence, Frederick Schauer for unusually rule-centered judging, James Bradley Thayer for clear-error deference, Robert Alexy for structured proportionality, and Owen Fiss for structural remedies. Friedrich Carl von Savigny is retained as Historical School lineage rather than forced into the modern Historical/Living axis. Sandra Day O'Connor is available conservatively as a low-theory, contextual catch-all when no grand jurisprudential theory explains an otherwise moderate case-by-case profile.

Thinker signatures are theory-derived prototypes, not empirical estimates. Pilot data should later calibrate thresholds, profile locations, diagnostic routing, and champion-confidence labels. See `MATCHING_ARCHITECTURE.md` for the matching rules.

## Local use

No build step or dependencies are required. Serve the repository with any static server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Audit

The repository includes dependency-free structural, scoring, and profile audits:

```bash
npm test
```

They check the 93-item core, asymmetric scoring, source references, local asset references, sparse profile validity, specialist gates, major jurisprudential-family coverage, phrase reachability, noun-conditioned twist assembly, the seven-question diagnostic cap, explicit response-quality safeguards, and several false-match tests such as preventing a positivist from winning a strong Natural Law profile.

## Validation status

The item bank is content-grounded and structurally audited, not empirically validated. Factor structure, reliability, test–retest stability, convergent and discriminant validity, subgroup invariance, diagnostic thresholds, and thinker-profile locations require pilot response data.
