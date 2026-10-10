# LAWvalues

LAWvalues is a static, client-side legal-philosophy instrument. Version 2 maps respondents across eight bipolar dimensions:

- Source: Positivist ↔ Non-positivist
- Constraint: Textualist ↔ Open construction
- Time: Historical ↔ Living
- Precedent: Stability ↔ Overruling
- Remedies: Narrow ↔ Systemic
- Posture: Majoritarian ↔ Counter-majoritarian
- Separation: Formalist ↔ Functionalist
- Form: Rules ↔ Balancing

## Instrument design

The bank contains 48 questions, six per dimension. Every item affects exactly one axis, and every axis has three items keyed toward each pole. Responses use a seven-point scale from −3 to +3. “Not sure” answers are omitted from the relevant denominator.

The scoring formula is:

```text
axis score = 50 + 50 × Σ(item key × response) / (3 × answered items)
```

A score of 100 is the first pole, 0 is the second, and 50 is the midpoint. The results page intentionally withholds jurist, movement, and champion matches until pilot data support calibrated profiles. `profiles.js` contains the future profile schema.

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

It checks item counts, balanced keying, source references, constant-response neutrality, endpoint behavior, scoring symmetry, simulated off-axis independence, local asset references, and removal of legacy advertising/tracking code. GitHub Actions runs the same audit on pull requests and pushes to `main`.

## Validation status

Version 2 is content-grounded and structurally audited, not empirically validated. Factor structure, reliability, test–retest stability, convergent/discriminant validity, subgroup invariance, and profile locations require pilot response data. The methodology page describes the intended validation sequence and publishes the complete item bank and bibliography.
