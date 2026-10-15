# Champion result cards

The existing champion line remains between the result title and respondent portrait. A compact, network-styled card now adds a single-sentence tagline and a short paragraph combining the thinker's biography/contribution with the respondent's evidenced connection.

## Content and boundaries

`champion_content.js` contains individually authored entries for all 83 selectable profile units. Existing grouped units remain grouped. Every entry records primary institutional, author, or publisher sources. `profiles.js`, identities, modifiers, scoring, champion selection, and the respondent's separate opening/context are unchanged.

`champion_cards.js` only presents an already-selected champion. It selects up to two complementary fit clauses from that entry, limited to actual signature/supporting traits with support of at least 0.5 or the classifier's supported-trait ledger. Neither the result title nor the selected thinker can supply missing evidence.

Where no retained trait evidence exists, an axis connection is described only when the score and modeled prototype are on the same side, both at least 18 points from the midpoint, and within 22 points of one another. The copy explicitly limits this to the saved scores. Without a supported trait or aligned modeled axis, the card identifies the saved match without inventing a personal rationale. A focused theoretical affinity and low-confidence match retain concise qualification. Ambiguous, absent, withheld, and legacy matches have safe fallbacks.

## Shared replay

New links add `cev=1` and `ce`, a bounded list of at most two allowlisted trait IDs. No raw answers are added. Reading requires the known evidence version, a known selected champion, and trait IDs present both in that champion's signature/supporting traits and its authored fit copy. Unknown IDs and oversized payloads are ignored. Older links remain usable with score-based or saved-match fallback. The main result narratives keep their existing independent sharing contract.

## Validation

`audit-champion-cards.mjs` checks complete coverage, source metadata, trait allowlists, fresh/shared exact replay, absent/negative evidence, legacy and exceptional states, invalid/oversized values, modeled-score agreement and card order. The actual quiz completion/share audit also checks the versioned evidence payload and exact card replay after storage is cleared. Existing full-suite audits remain in place.
