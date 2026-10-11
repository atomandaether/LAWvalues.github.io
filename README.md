# LAWvalues

LAWvalues is a static, client-side legal-philosophy quiz. The current public label is **Version 0.5 Beta**. It maps respondents across eight bipolar dimensions:

- Source: Positivist ↔ Non-positivist
- Constraint: Textualist ↔ Open construction
- Time: Historical ↔ Living
- Precedent: Stability ↔ Overruling
- Remedies: Narrow ↔ Systemic
- Posture: Majoritarian ↔ Counter-majoritarian
- Separation: Formalist ↔ Functionalist
- Form: Rules ↔ Balancing

## Instrument design

The working bank contains 93 questions across eight dimensions. Questions are grouped by a nominal section for presentation, but scoring is multidimensional: an item may contribute to any axis it materially informs, with smaller fractional weights for secondary signals. Directional item families are normalized separately within each axis so a respondent who simply agrees with everything is not pushed toward the side with more keyed items. One literalism/context diagnostic is currently recorded without moving a headline axis. Responses use a seven-point scale from −3 to +3, and “Not sure” answers are omitted from each affected axis.

The questions are written as plain-language legal problems rather than definitions of the measured categories. They draw on recurring cases, hypotheticals, and disputes from jurisprudence, statutory interpretation, constitutional law, remedies, separation of powers, and rules-versus-standards scholarship. Politically cross-cutting examples are used to reduce the chance that a respondent can infer an answer merely from a school’s partisan reputation.

The scoring formula is:

```text
axis score = 50 + 50 × Σ(item key × response) / (3 × answered items)
```

A score of 100 is the first pole, 0 is the second, and 50 is the midpoint. The results page intentionally withholds jurist, movement, and champion matches until pilot data support calibrated profiles. `profiles.js` contains the future profile schema, and `sources.js` records the item bank's academic and doctrinal grounding.

## Local use

No build step or dependencies are required. Serve the repository with any static server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Audit

The repository includes a dependency-free structural and scoring audit:

```bash
npm test
```

It checks item counts, balanced keying, source references, question length and terminology, constant-response neutrality, endpoint behavior, scoring symmetry, simulated off-axis independence, local asset references, and preservation of the original visible interface. GitHub Actions runs the same audit on pull requests and pushes to `main`.

## Validation status

The item bank is content-grounded and structurally audited, not empirically validated. Factor structure, reliability, test–retest stability, convergent and discriminant validity, subgroup invariance, and profile locations require pilot response data.
