# Explicit fixture migration for instrument 0.9

This report concerns the instrument/axis-label migration. Historical inputs are
not answers to the revised questions. No historical persona was retuned to
recover a preferred title or champion. Unknown-version links remain conservative.

## Historical fixtures

| Harness or artifact | Before | After and preserved assertion |
| --- | --- | --- |
| `audit-whole-profile.mjs` | Ten frozen 0.8 literal-answer plans were loaded through the active global bank. | Explicit 0.8 bank, version, and trait context. Every frozen prompt, answer, deterministic route, 88+12 limit, supported-priority rule, and six-field local/share replay assertion remains. Current label semantics are not loaded in that historical context. |
| `legacy-08-score-baseline.json` | The whole-profile test compared the completion path against the scorer used by the same run. | Added independent immutable expected scores for all ten fixtures, calculated from pre-revision HEAD after matching its full bank hash to the pre-edit working-bank hash. The test now additionally requires every original numeric score exactly. |
| `audit-result-catalog.mjs` | Historical literal vectors and fixed expected outcomes implicitly used whichever bank was active. | Explicit 0.8 context before classifier initialization. Existing response values and outcome assertions remain. This is a historical catalog-regression suite, not evidence that those old responses establish current doctrines. |
| `audit-primary-commitment.mjs` | Historical T7/public-meaning and other literal premise tests implicitly used the active instrument. | Explicit 0.8 bank and trait context. Existing answers and expected primary-priority behavior remain. |
| `audit-questions.mjs`, old prompt/semantic checks | Old T1 wording and asymmetric T8 expectations assumed the active bank was 0.8. | Those exact checks explicitly inspect the preserved bank. Current 0.9 structural/scoring invariants remain separate. The exhaustive no-diagnostic-score-change checks still run against 0.8, whose guarantee is unchanged. |
| `fixtures/instrument-context.mjs` and shared runtime | No explicit historical mode. | A named, opt-in 0.8 selector runs before classifier initialization. The default runtime is still current 0.9. No global downgrade of all tests. |

The complete preserved-bank JSON SHA-256 is
`e9574a33364a5730acd114eda9558887fa8a19e8b309c5f2e1943e5a84f78b41`.
The locked historical score-baseline file SHA-256 is
`af26d8032e6a882506dac2e22eff1a597c31d3aac0dbd3bbef29a35e8f98d0f9`.
Existing frozen answer/prompt manifest checks were not removed or rewritten.

## Current synthetic and serialization fixtures

| Harness | Changed premise | Why assertions were retained |
| --- | --- | --- |
| `audit-title-contract.mjs` | The synthetic Source 95 / Time 80 priority test previously supplied no temporal evidence. It now expressly supplies T1=3, T11=3, T7=3 when testing the competing current commitment. | A Time percentage alone no longer establishes Originalism. This grammar/priority unit test requires a genuinely supported rival to test unresolved priority. The scores and all primary-label, unresolved-priority, modifier, and margin assertions remain; no champion is targeted. This is not a translated historical persona. |
| `audit-eskridge-dynamic.mjs` | Share URLs carrying current narrative IDs now include the current version instead of being versionless. | Dynamic versus practical-only evidence, routing, unchanged D-DYN1 percentages, and exact narrative replay assertions are unchanged. Unknown-version behavior is tested separately. |
| `audit-moral-consolidation.mjs` | Historical Greenberg/Hershovitz URLs explicitly identify 0.8; current combined-ID and current residual-phrase URLs identify the current version. | Exact historical/current champion and phrase assertions remain. No raw answers or target outcomes were adjusted. |
| `audit-kavanaugh-retirement.mjs` | The saved retired-champion URL explicitly identifies 0.8. | Exact historical champion replay is retained. Current manual-trait roster tests remain current and unchanged. |
| `audit-results-layout.mjs` | Current title-layout examples identify the current version; a separate no-identity fallback explicitly identifies 0.8. | Exact noun emphasis, New Originalist word order, champion preservation, fallback, and layout assertions remain. A layout test no longer pretends current reconstruction is a historical inference. |
| `audit-result-title-rendering.mjs` | The current local-record escaping fixture now has a matching current-version URL. | Exact escaping/security assertions remain. Unknown/versionless/invalid controls are retained and expanded in compatibility tests. |
| `audit-result-share.mjs` and current shared runtime | Load `result_compatibility.js` and `axis_labels.js` in production order. | Existing mocked serialization inputs and expected text remain. The tests now exercise actual version/label integration rather than bypass it. |
| `audit-questions.mjs`, current UI assertions | Front-page version expects 0.9, and the old core-only explanatory sentence is checked specifically as a 0.8 statement. | Current public version must match the active instrument; historical scoring promises remain historically accurate. |

New `audit-time-construct`, `audit-axis-labels`, and `audit-result-compatibility`
controls test the revised instrument directly: weak/direct evidence, bounded
named diagnostic clarification, malformed inputs, 0/100 endpoints, doctrine
and contrary-evidence gates, and explicit version boundaries. They do not
replace historical assertions.

## New fictional completed demonstration

`current09-demo-initial.json` was frozen before any adaptive routing. It contains
88 explicit current answers and rationales, all current prompts, and a complete
98-question diagnostic answer policy. The fictional worldview is stated in
advance; there is no expected title, label, champion, or numeric target.
Its SHA-256 is
`5942a76bde2fa56e265b4374de85d638c5e85b7c1af07354a5f3ecf220817844`.

After the final S6 wording clarification, `current09-demo.json` records an
explicit revision trail containing the old/new prompt and the rereview reason.
S6 remains -2 because the same source-based worldview rejects a legal duty
independent of all recognized sources. All 88 answer values/rationales and all
98 diagnostic-policy entries remain identical to the initial file. The
O6/O7/O12 weighting revision changes no question premise or answer.
The revised fixture SHA-256 is
`1258889ba1123459c033e188f53cd019bd1a0df0ff5e865d1ad7306a191895de`.

`run-current09-demo.mjs` verifies both hashes and the no-answer-change assertions,
clicks through the real quiz, obeys only the diagnostics actually asked, enforces
the 100-answer cap, and checks final source hashes before writing output.
The repository output is always written; an optional `LAW_DEMO_EXPORT_PATH`
can additionally export it for screenshots. Initial and final output files are
fictional reproducibility artifacts, not live user data.

The final completed route has 88 core and 12 adaptive answers. The observed
scores are Source 93, Constraint 88, Time 97, Precedent 84, Remedies 57,
Posture 19, Separation 55, Form 79. Its actual twelve-diagnostic route ends
with D-ORI3. These are observations, not fixture targets. Source hashes, the
complete raw final record, all answer rationales, and the result URL are saved
in `current09-demo-output.json`.
