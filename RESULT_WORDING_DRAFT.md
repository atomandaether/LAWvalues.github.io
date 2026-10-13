> **Authority implementation note (2026-10-12):** `AUTHORITY_ENGINE.md` supersedes older public references to Waldronian and Elyan. Public authority nouns are Legal Constitutionalist, Political Constitutionalist, Thayerian, Weak-Form Constitutionalist, Popular Constitutionalist, Departmentalist, Political Process Jurist, and Judicial Minimalist.

# LAWvalues Result Wording Draft

> **Fit-article note (2026-10-12):** the strong generic fit label always includes the correct indefinite article: **Unmistakably a Positivist**, **Unmistakably an Interpretivist**, etc. It is never rendered as article-less `Unmistakably [noun]`.

> **Modifier architecture note (2026-10-12):** generic fallback wording is now fit-based: **Unmistakably a/an**, blank, or **Some kind of**. Originalism uses **New** as its substantive constructionist modifier. The older `Textbook`/archetypal and `Elbow-room` examples below are retained only as editorial history until the broader modifier rewrite.

This is the current live editorial surface for the humorous parts of the public result title.

The grammar is:

> **[noun-conditioned twist] [real jurisprudential noun] [broad residual phrase]**

The **phrase** is the strongest broad characteristic not already communicated by the noun. It is deliberately conservative: the live pool is the sixteen poles of the eight public axes plus `objective_morality` and `anti_discretion`, the two narrower traits that the existing question bank can support with genuine breadth.

The **modifier** is a twist on the noun, not a third-place axis and not a disguised champion. Its intended granularity is **between noun and champion**: a real sub-umbrella or meaningful internal/cross-cutting variation that changes what kind of Positivist, Originalist, Minimalist, Proportionalist, etc. the respondent is. If no such measured twist is supported, the explicit `archetypal` fallback is used rather than inventing fake precision. Alexy-like respondents therefore use **Proportionalist** as the noun with a proportionality subtype modifier; Bickel-like respondents use **Judicial Minimalist** with a passive-virtues modifier. Formalist and Functionalist remain the public noun labels exactly as written.

The tone target remains an intelligent enemy of the view taking a cheap but recognizable shot at it: unfair is fine; accidentally describing a different axis is not.

## Approved phrase pool

| Internal feature | Phrase | What the backend actually means |
| --- | --- | --- |
| `source_positive` | who thinks evil just needs the right paperwork | You sharply separate legal validity from moral merit and give recognized social/legal sources the decisive role. |
| `source_nonpositive` | who thinks the law is haunted, and the ghosts agree with them | You reject the idea that recognized social sources exhaust what counts as law, allowing moral principles or higher-law considerations to contribute to legal validity. |
| `objective_morality` | who says “of course I’m right, here’s an MLK quote” | You treat objective morality as independently relevant to what the law legally requires. |
| `textual_constraint` | who’d eat their own Grandma because Congress forgot a comma | Enacted wording puts unusually hard limits on what you think judges may do, even when a more purposive result seems sensible. |
| `purposive` | who doesn’t let their inability to read hold them down | You are comparatively willing to let purpose, practical sense, context, or anti-evasion principles overcome a rigid reading of enacted words. |
| `fixed_meaning` | who uses an Ouija board as a dictionary | You treat constitutional meaning as substantially fixed at adoption rather than updated by later usage or values. |
| `living_meaning` | who thinks amendments are for suckers | You accept genuine constitutional development without requiring every change in constitutional content to pass through formal amendment. |
| `precedent_stability` | who thinks being wrong for 50 years makes it right | Reliance, settlement, and legal continuity make you unusually reluctant to discard an established decision even when it was mistaken. |
| `precedent_correction` | who’ll tell you the opposite tomorrow | You put correcting legal error ahead of preserving precedent and are comparatively willing to overrule decisions you think are wrong. |
| `narrow_remedies` | who brought a hand towel to a hurricane | You generally want judicial relief confined to the parties and violation actually before the court. |
| `structural_remedies` | who let themselves in and started knocking down walls | Once a systemic violation is established, you are comparatively comfortable with restructuring institutions and continuing judicial supervision. |
| `majoritarian` | who’d let two wolves and a sheep vote on dinner | You give elected government unusually broad room when constitutional meaning is reasonably contestable. |
| `countermajoritarian` | who thinks 5 is more than 535 | You are unusually willing to have courts enforce constitutional rights against sustained majority opposition. |
| `separation_formal` | who’d fire the lifeguard for getting in the pool | You are unusually strict about constitutionally assigned institutional powers and prescribed procedures. |
| `separation_functional` | who thinks the kitchen can never have too many cooks | You tolerate institutional overlap when the arrangement remains workable, accountable, and preserves each branch’s core role. |
| `rules` | who’d rather be consistently wrong than occasionally right | You accept ugly edge cases as the price of general rules that constrain decision-makers. |
| `anti_discretion` | who doesn’t trust themselves to decide when to pee | Your attraction to rules is especially driven by distrust of discretionary human judgment and its risks of arbitrariness, bias, or inconsistency. |
| `balancing` | who does whatever they want | You prefer contextual weighing of competing considerations over categorical rules in hard cases. |

## Noun-conditioned modifier / twist pool

The table below retains both live and archival twist records for editorial history. **Public selection is controlled only by `PUBLIC_SUBSTANTIVE_MODIFIER_IDS` in `result_content.js`.** The resolved public hybrids added in this pass are Inclusive-Positivist Common-Law Constitutionalist, Higher-law Originalist, Proportionalist Purposivist, Non-Positivist Proportionalist, and Purposivist Proportionalist; Settlement-minded, Source-bound, the old generic Higher-law cross-axis route, and Balancing-with-homework are archival only.

| Twist ID | Modifier draft | Eligible noun IDs | Evidence | What the twist is trying to communicate |
| --- | --- | --- | --- | --- |
| `construction_room` | **Elbow-room** | `originalist`, `public_meaning_originalist`, `original_intent_originalist`, `original_methods_originalist` | `time.construction_zone` + `time.principle_originalism` | Your originalism fixes meaning without treating every expected historical application as binding; genuine underdetermination can leave room for construction. |
| `hartian_gap` | **Gap-friendly** | `positivist`, `inclusive_positivist`, `exclusive_positivist` | `source.law_runs_out` | Within a positivist framework, you are comparatively willing to say that existing law can genuinely run out in a hard case. |
| `positive_law_settlement` | **Settlement-minded** | `natural_lawyer`, `common_good_constitutionalist` | `source.positive_law_settlement` | Your higher-law commitments coexist with a strong view that positive law legitimately settles many questions morality leaves open. |
| `contextual_textualism` | **Dictionary-skeptical** | `textualist`, `originalist`, `public_meaning_originalist`, `original_intent_originalist`, `original_methods_originalist` | `constraint.contextual_textualism` | You are text-centered without treating isolated dictionary definitions as the whole interpretive enterprise. |
| `enacted_bargain` | **Fine-print** | `textualist`, `positivist`, `inclusive_positivist`, `exclusive_positivist` | `constraint.enacted_bargain` | You are especially willing to make the legal system live with enacted compromises, exceptions, and omissions. |
| `precedent_skeptic` | **Case-burning** | `originalist`, `public_meaning_originalist`, `original_intent_originalist`, `original_methods_originalist`, `framework_originalist`, `textualist`, `formalist`, `positivist` | prec right | You combine your main methodology with unusual willingness to discard precedent you think is wrong. |
| `precedent_loyal` | **Error-hoarding** | `originalist`, `public_meaning_originalist`, `original_intent_originalist`, `original_methods_originalist`, `framework_originalist`, `textualist`, `formalist` | prec left | You combine your main methodology with unusual respect for settlement, reliance, and continuity. |
| `rights_aggressive` | **Democracy-vetoing** | `positivist`, `inclusive_positivist`, `exclusive_positivist`, `textualist`, `originalist`, `public_meaning_originalist`, `original_intent_originalist`, `original_methods_originalist`, `formalist` | post right | You pair a usually constraint-oriented methodology with unusually aggressive judicial enforcement against majority will. |
| `democracy_deferential` | **Rights-on-honor-system** | `dworkinian`, `moral_impact_theorist`, `natural_lawyer`, `living_constitutionalist`, `common_good_constitutionalist`, `proportionalist`, `pragmatist` | post left | You pair a morality-, rights-, or adaptation-friendly methodology with unusually strong democratic deference. |
| `narrow_enforcement` | **Remedy-stingy** | `dworkinian`, `natural_lawyer`, `living_constitutionalist`, `common_good_constitutionalist`, `proportionalist`, `political_process_jurist` | remed left | You are willing to recognize strong rights or evolving legal obligations while remaining unusually cautious about the breadth of judicial relief. |
| `systemic_enforcement` | **Court-running** | `thayerian`, `political_constitutionalist`, `popular_constitutionalist`, `departmentalist`, `originalist`, `public_meaning_originalist`, `textualist`, `formalist` | remed right | You combine a restraint-, democracy-, or constraint-oriented methodology with unusually sweeping remedial instincts once a violation is established. |
| `rulebound_open` | **Rule-worshipping** | `purposivist`, `pragmatist`, `functionalist`, `living_constitutionalist`, `common_law_constitutionalist`, `legal_process_theorist`, `interpretive_pluralist`, `legal_realist` | form left | You are comparatively open or pragmatic about finding the governing law but unusually rule-bound once doctrine is identified. |
| `balancing_strict` | **Vibes-balancing** | `positivist`, `exclusive_positivist`, `textualist`, `originalist`, `public_meaning_originalist`, `original_intent_originalist`, `original_methods_originalist`, `formalist` | form right | You combine a constraint-oriented main methodology with unusually contextual, balancing-oriented doctrinal form. |
| `formal_structure` | **Org-chart-worshipping** | `dworkinian`, `natural_lawyer`, `pragmatist`, `purposivist`, `legal_process_theorist`, `interpretive_pluralist`, `living_constitutionalist` | separ left | Your broader methodology is flexible in other domains, but you become unusually strict about institutional boundaries. |
| `functional_structure` | **Separation-“optional”** | `positivist`, `exclusive_positivist`, `natural_lawyer`, `textualist`, `originalist`, `public_meaning_originalist`, `original_methods_originalist` | separ right | Your broader methodology is constraint-oriented, but you tolerate unusually pragmatic overlap among governmental institutions. |
| `source_bound_living` | **Source-bound** | `living_constitutionalist`, `common_law_constitutionalist`, `pragmatist`, `legal_realist` | sorc left | Your adaptive or pragmatic method remains grounded in socially recognized legal sources rather than freestanding moral validity. |
| `inclusive_positivist_common_law` | **Inclusive-Positivist** | `common_law_constitutionalist` | `source.morality_incorporated` + `time.common_law_development` | Waluchow-like hybrid: common-law constitutional development inside an inclusive-positivist theory of legal validity. |
| `higher_law_historical` | **Higher-law** | `textualist`, `originalist`, `public_meaning_originalist`, `original_methods_originalist`, `formalist` | sorc right | You combine historical or textual constraint with a nonpositivist view that legal validity is not exhausted by positive sources. |
| `higher_law_originalism` | **Higher-law** | `originalist`, `public_meaning_originalist`, `original_intent_originalist` | `source.objective_morality` + `source.positive_law_settlement` | Natural-law-grounded Originalism: objective morality matters to law while positive constitutional law retains settlement authority. |
| `common_law_growth` | **Precedent-grown** | `living_constitutionalist`, `originalist`, `public_meaning_originalist`, `framework_originalist` | `time.common_law_development` | Your account of constitutional change or construction leans unusually heavily on accumulated precedent and practice. |
| `institutional_process` | **Process-pilled** | `purposivist`, `pragmatist`, `intentionalist`, `interpretive_pluralist` | `method.institutional_competence` + `method.reasoned_elaboration` | What makes your broader interpretive method distinctive is a strong concern with institutional role, competence, and reasoned elaboration. |
| `sociological` | **Law-in-action** | `purposivist`, `pragmatist`, `legal_process_theorist`, `interpretive_pluralist` | `method.social_interests` + `method.law_in_action` | You put unusual weight on how doctrine actually operates in society and on the social interests legal rules organize. |
| `low_theory` | **Theory-light** | `pragmatist`, `interpretive_pluralist`, `minimalist` | `method.case_by_case` + `method.anti_grand_theory` | You resist turning your main approach into a comprehensive theory and prefer narrow, fact-sensitive judgment. |
| `realist_tinge` | **Doctrine-cynical** | `positivist`, `textualist`, `originalist`, `pragmatist`, `interpretive_pluralist` | `realism.underdetermination` + `realism.extra_doctrinal` | You retain your normative methodology while showing an unusually Realist suspicion that doctrine alone explains hard-case outcomes. |
| `proportionality_tinge` | **Balancing-with-homework** | `dworkinian`, `natural_lawyer`, `living_constitutionalist`, `pragmatist`, `purposivist` | `form.proportionality` | Your otherwise broader methodology has a distinctive preference for structured proportionality rather than free-form balancing. |
| `proportionalist_purposivism` | **Proportionalist** | `purposivist` | `form.proportionality` | Barak-like Purposivism with independently confirmed structured proportionality. |
| `passive_virtues_minimalism` | **Passive-virtues** | `minimalist` | `posture.passive_virtues` | Within Judicial Minimalism, your restraint is especially Bickel-like: strategic avoidance and delay are themselves part of the judicial method, not merely a preference for narrow remedies. |
| `nonpositivist_proportionality` | **Non-Positivist** | `proportionalist` | sorc right | Within Proportionalism, your balancing sits inside a non-positivist account of legal principles and moral correctness rather than functioning as a merely practical judicial technique. |
| `purposive_proportionality` | **Purposivist** | `proportionalist` | `constraint.purpose` | Within Proportionalism, your structured balancing is embedded in a broader purposive approach to legal interpretation. |
| `anti_discretion_tinge` | **Judgment-allergic** | `positivist`, `textualist`, `originalist`, `public_meaning_originalist`, `formalist` | `form.anti_discretion` | Your main methodology is sharpened by an unusually strong distrust of discretionary judicial judgment. |
| `archetypal` | **Textbook** | all ordinary nouns (fallback only) | fallback | No narrower measured subtype or cross-cutting twist clearly improves on the selected noun; this respondent is comparatively close to the noun's central package. |

## Evidence rule

Broad phrase outcomes inherit evidence from their entire public axis. `objective_morality` requires the S9/S10/S11 cluster, matching nonpositivist Source evidence, and corroboration from the existing natural-law diagnostic; `anti_discretion` requires the four independent F1/F3/F7/F8 signals. No one- or two-question niche can become a stand-alone phrase.

Twists make a narrower conditional claim and may therefore use subtype evidence that would be too narrow for the phrase slot. The key restriction is conceptual rather than merely numerical: the twist must genuinely refine the selected noun. It must not merely repeat another public noun, and it should not exist solely to encode one champion. If no non-fallback twist clears its threshold, `archetypal` guarantees that an ordinary jurisprudential result still has a meaningful modifier.
