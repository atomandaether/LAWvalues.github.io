# Results presentation and evidence-preserving narratives

## Scope

This release changes result presentation and explanation, not the questionnaire or scoring instrument. The 88 core questions, diagnostic wording, answer values, eight axes, primary/champion matching, and 12-diagnostic cap are unchanged. Existing noun, modifier, and phrase inventories are unchanged.

The approved title order is `Public-Meaning New Originalist` (and `Original-Intent New Originalist`). The `new_originalism` modifier and catalog identity IDs remain stable. The noun's components are bold and the inserted `New` remains regular. Other modifiers and humorous phrases remain regular. Stored titles and legacy IDs remain readable; presentation is escaped as text.

The full title and `Champion: NAME` precede the diagnosis. The complete eight-axis profile now sits between that first diagnostic paragraph and the second academic/legal-context paragraph, so the evidence is visible before the longer interpretation. Copy/export actions then precede the interactive network; its heading and color legend remain removed. Champion descriptions remain separately below the network. Results-specific responsive styles use more available width and restore mobile vertical scrolling without changing the quiz layout.

Current titles use answer-grounded axis-label status as well as the normalized percentage. Weak, limited, varied, conflicting, or score-only evidence cannot produce a confident directional residual phrase merely because normalization moves the percentage away from 50. Only the reviewed logical-conflict status can select the contradiction fallback; generic cancellation is not labeled contradiction. A logical conflict in the winning noun or champion's defining domain caps generic fit language and champion confidence without forcing a different result. Historical shared title IDs continue to replay verbatim, while a URL without a stored phrase falls back conservatively instead of regenerating doctrine from percentages alone.

## Narrative scope and limits

The evidence-based narrative changes and their coverage are documented by the dedicated distinction audit. Authored full-profile examples are selected by supported answer traits and score relationships, not persona IDs or champion identity. A champion match does not import that scholar's unmeasured beliefs. Construction permission remains conditional on genuinely unresolved original meaning; it does not establish the size or prevalence of a construction zone.

This is bounded editorial and routing work, not new empirical validation of the quiz or a claim that every possible combination has a bespoke paragraph. Previously saved narrative IDs remain available for shared-result replay.

## Verification

`npm test` runs the existing aggregate instrument audits and the added result-layout, title-rendering, and narrative-distinction regressions. Tests include preserved inventories and frozen answer paths, legacy/unknown shared results, title escaping and noun-only emphasis, and full-profile replay. Actual-browser desktop/mobile review supplements the DOM and CSS checks; browser results and deployment status are reported with the release rather than inferred from unit-test success.
