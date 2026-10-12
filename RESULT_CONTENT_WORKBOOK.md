# LAWvalues Result Content Workbook

This file is the editorial control panel for the result system. The machine-readable implementation now lives in `result_content.js`; this workbook remains the place to review or rename the public wording.

The **current live draft wording** for every residual feature is summarized in `RESULT_WORDING_DRAFT.md`. The older modifier/phrase worksheets below are retained as design history until the wording pass is finalized; `result_content.js` and `RESULT_WORDING_DRAFT.md` are authoritative for what the site currently displays.

The goal is **not** to assign one fixed axis to each title slot. The goal is to compress the respondent's three most important jurisprudential characteristics into three nonredundant pieces. Thinker matching is separately implemented through sparse signatures in `profiles.js` / `classification.js`; see `MATCHING_ARCHITECTURE.md`:

> **[modifier] [real anchor] [phrase]**

Example structure only:

> **Precedent-preserving Originalist who lets democracy decide**

The middle slot is the **best real jurisprudential nearest neighbor we can honestly justify**—including established eponymous labels such as Dworkinian, Thayerian, or Waldronian when the evidence is genuinely that specific. The noun is the person's #1 characteristic. After its coverage is spent, every remaining **sufficiently supported** axis or question-level trait competes in one pool. The strongest residual feature gets the longer phrase (#2); after spending that information, the next genuinely different feature gets the compact modifier (#3). Question-level quirks are not enough by themselves: narrow features need breadth from several existing core items or independent corroboration from their matching axis/diagnostic. The funny wording is allowed to be a slightly unfair critic's caricature because the backend feature being scored remains neutral and precise.

---

## HOW TO REVIEW THIS FILE

For every entry below, use:

- `[x] KEEP` — concept and wording are approved.
- `[ ] RENAME:` — keep the concept, replace the display wording.
- `[ ] DELETE` — do not use this result component.
- `[ ] COPY:` — optional replacement result copy.
- `[ ] CHAMPION:` — optional person, court, institution, case tradition, or school that exemplifies it.
- `[ ] NOTES:` — anything the scoring logic should know.

You do **not** need to specify numerical thresholds. Once the content set is approved, scoring conditions can be fit to the existing question signals.

A useful review shorthand is just:

> A06 keep. M12 rename to "precedent-hoarding." P07 wording sucks; use "...". Delete A11.

---

# I. RESULT ASSEMBLY RULES

## 1. Special overrides come first

Normal three-part titles are skipped if one of these fires strongly enough:

- `OVR-L` — outcome-driven / partisan-left pattern
- `OVR-R` — outcome-driven / partisan-right pattern
- `OVR-C` — incoherent / chaos pattern
- `OVR-S` — mechanical spam / unusable-response pattern, if added later

These should require a strong pattern, not one contradiction.

## 2. Build a trait profile

The result engine should use both the eight headline axes and question-level distinctions.

A trait has:

- `id`
- `evidence` — questions / axis patterns that support it
- `importance` — how central it is to this respondent
- `confidence` — how broad and internally consistent the evidence is
- `coverage_tags` — what intellectual information the trait conveys

Agree / neutral / disagree are the substantive directions. Slight / ordinary / strong are modifiers to evidence strength, not different jurisprudential positions.

## 3. Choose the real anchor

Generate every anchor whose conditions plausibly fit the respondent.

Rank by:

1. fit to actual answers,
2. specificity,
3. amount of important information explained,
4. confidence / breadth of evidence,
5. avoidance of overclaiming.

A narrower real school should beat a vague generic label when the evidence actually supports it.

Example:

- Strong historical fixation alone -> `Originalist`
- Historical fixation + fixed semantic meaning + broad principle application + rejection of expected-applications lock-in -> still `Originalist`, but a modifier can identify the principle-originalist version.
- Living + very strong precedent-as-law + accumulated-practice answers -> `Common-Law Constitutionalist` may beat generic `Living Constitutionalist`.

## 4. Mark what the anchor already communicates

Each anchor has `COVERS` tags.

Those tags are now "spent." Later title pieces should be discounted if they merely repeat them.

Example:

`Originalist` already substantially communicates:
- `time.fixation`
- `time.historical_meaning`

So `history-following Originalist` is normally rejected as redundant.

It does **not** automatically communicate:
- textualism,
- positivism,
- stare decisis,
- judicial restraint,
- rules,
- separation-of-powers formalism.

Those remain available.

## 5. Choose the phrase (#2)

Among important traits not already communicated by the anchor, choose the feature with the greatest **marginal information value**. This gets the longer trailing phrase because it is the second-most important thing about the respondent.

The feature can come from any axis or subtype. The engine should not force Posture, Remedies, or any other fixed axis into this slot.

## 6. Choose the front modifier (#3)

Spend the phrase's information and rank the same feature pool again. The strongest genuinely different remaining feature gets the compact front modifier.

The modifier can be an adjective, participle, compound, metaphor, or short critic-flavored joke; it does not need to end in -ing.

It can describe:
- judicial role,
- remedies,
- precedent,
- separation of powers,
- source,
- time,
- form,
- or another subtype.

Examples:

- `... who lets democracy decide`
- `... who wants bad precedent gone`
- `... who fixes only the case in front of them`
- `... who thinks morality can outrank enacted law`
- `... who keeps the branches in their lanes`

## 7. Redundancy check

Reject a candidate title if two components substantially duplicate the same tags.

Bad:
- `text-reading Textualist who sticks to the enacted words`
- `history-following Originalist who keeps meaning historically fixed`
- `precedent-preserving Common-Law Constitutionalist who trusts accumulated precedent`

Good:
- `precedent-preserving Originalist who lets democracy decide`
- `principle-applying Originalist who wants bad precedent gone`
- `rule-following Natural-Law Theorist who fixes only the case in front of them`

## 8. Weird but coherent combinations are features, not bugs

Do not suppress an unusual title merely because the components are not stereotypically bundled.

Examples that can be coherent:
- Non-positivist + Historical
- Textualist + Balancing
- Counter-majoritarian + Narrow Remedies
- Majoritarian + Systemic Remedies
- Functionalist Separation + Rules-heavy adjudication
- Originalist + very strong stare decisis

Only suppress combinations that are semantically redundant, genuinely contradictory, or unsupported by the questionnaire.

## 9. Body-copy assembly

After the title:

1. One paragraph explaining the anchor.
2. One paragraph explaining the modifier and why it matters.
3. One paragraph explaining the phrase / practical judicial consequence.
4. Optional "Your twist" paragraph for a particularly interesting interaction.
5. Optional champion / intellectual-relative line.

Do not force all eight axes into the prose.

---

## 10. Adaptive diagnostics refine the middle identity

The 93-item core should not ask everyone every specialist distinction.

After the core:
- one soft Realism probe may be asked universally because Realism is not discoverable from the eight axes;
- otherwise, extra questions are unlocked only when they can distinguish live middle-identity candidates;
- a respondent already cleanly classified should see no redundant specialist questions;
- if a subtype remains unresolved, fall back to the broader real label rather than guess.

Examples:
- Originalist -> Public Meaning vs Original Intent -> Original Methods / Framework only if still relevant.
- Positivist -> Inclusive vs Exclusive only if precision matters.
- Nonpositivist -> Dworkinian vs Natural Lawyer only if both remain plausible.
- Extreme Majoritarian -> Popular Constitutionalist / Departmentalist only after anti-judicial-supremacy evidence.
- Open-construction statutory profile -> Intentionalist vs Purposivist when actual intent and objective purpose remain ambiguous.

See `diagnostics.js` for the proposed bank.

## 11. Champions are selected after the identity

The champion is not the definition of the middle label.

Examples:
- a Public-Meaning Originalist may be closest to Solum, Scalia, Barrett, or Thomas depending on the rest of the profile;
- a Textualist may be closer to Manning than Scalia if Rules / Originalism / structural Formalism are absent;
- a confirmed Legal Realist may be closer to Llewellyn than Holmes;
- a Purposivist may be closest to Hart & Sacks, Breyer, or Barak depending on institutional competence, pragmatism, and proportionality.

A champion should be omitted or pluralized when the fit is not clearly better than alternatives.

See `result_catalog.js` and `CHAMPION_MATRIX.md`.

# II. TRAIT TAG DICTIONARY

These are not public-facing labels. They are the internal vocabulary used to prevent repetition and assemble nuanced results.

## Source

- `source.positive_sources` — enactment, precedent, and recognized practice determine legal validity.
- `source.social_practice` — official practice can itself determine a rule of recognition / legal rule.
- `source.law_runs_out` — genuinely novel cases can require judges to make new law.
- `source.principles_are_law` — unwritten legal principles can already be part of law.
- `source.moral_constraint` — morality can constrain legal validity or obligation.
- `source.extreme_injustice` — extreme injustice can strip a norm of legal status.
- `source.objective_morality` — objective moral norms can be legally controlling without positive adoption.

## Constraint

- `constraint.textual` — enacted linguistic meaning constrains legal effect.
- `constraint.contextual_textualism` — text is read contextually, not dictionary-literally.
- `constraint.enacted_bargain` — negotiated exceptions and compromises must be respected.
- `constraint.anti_history` — legislative history is not authoritative over enacted text.
- `constraint.purpose` — statutory purpose can narrow or extend enacted words.
- `constraint.anti_evasion` — courts may extend law to schemes designed to evade its purpose.
- `constraint.open_construction` — purpose / consequences can legitimately shape legal effect beyond text alone.

## Time

- `time.fixation` — constitutional meaning is fixed at adoption.
- `time.public_meaning` — public legal meaning beats private drafter intention.
- `time.semantic_fixation` — later linguistic drift does not change old legal language.
- `time.expected_applications` — historical concrete applications strongly constrain current outcomes.
- `time.principle_originalism` — fixed historical principles can yield applications the adopters did not expect.
- `time.level_of_generality` — historical tradition can be framed at broader or narrower levels.
- `time.early_practice` — early governmental practice has special interpretive weight.
- `time.living_content` — constitutional content can change with later understandings.
- `time.common_law_development` — precedent and accumulated practice legitimately develop constitutional doctrine.

## Precedent

- `precedent.stability` — prior decisions carry independent weight.
- `precedent.reliance` — reliance / settled expectations justify retaining error.
- `precedent.settlement` — precedent preserves one impersonal law across judges.
- `precedent.statutory` — statutory precedent gets extra protection because legislatures can correct it.
- `precedent.embeddedness` — later institutions / rights can make correction too disruptive.
- `precedent.correction` — serious error should be fixed rather than preserved.
- `precedent.correctness_first` — fidelity to the best legal answer outranks stare decisis.
- `precedent.judge_made_skepticism` — judge-created doctrines/remedies receive weak protection.

## Remedies

- `remedies.party_specific` — relief should normally protect the actual plaintiff.
- `remedies.universal` — courts may protect nonparties / everyone subject to the same illegality.
- `remedies.severability` — remove only the invalid piece when the rest can stand.
- `remedies.incremental` — decide / remedy no more than needed.
- `remedies.prophylactic` — courts may create protective rules beyond the bare constitutional minimum.
- `remedies.structural` — courts may restructure institutions to cure pervasive violations.
- `remedies.supervision` — long-term judicial monitoring can be legitimate.
- `remedies.third_party_burden` — effective relief can justify burdens on actors not themselves found liable.

## Posture

- `posture.majoritarian` — reasonable constitutional disagreement belongs mainly to elected institutions.
- `posture.clear_error` — courts should invalidate only beyond a range of reasonable judgment.
- `posture.democratic_legitimacy` — legislatures have superior democratic credentials in genuine disagreement.
- `posture.dialogic` — courts can force rights reconsideration without necessarily having final authority.
- `posture.passive_virtues` — courts should sometimes avoid resolving divisive constitutional questions.
- `posture.countermajoritarian` — courts independently enforce constitutional rights against majority will.
- `posture.rights_trumps` — democratic popularity does not weaken a constitutional right.
- `posture.judicial_independence` — judges need insulation from electoral retaliation.
- `posture.electoral_accountability` — judges exercising public power may properly face democratic accountability.

## Separation

- `separation.formalist` — assigned powers / procedures are hard constitutional boundaries.
- `separation.functionalist` — overlap is acceptable if accountability and core capacities remain.
- `separation.nondelegation` — major policy choices must remain with the legislature.
- `separation.prescribed_process` — efficiency cannot replace constitutionally specified procedures.
- `separation.independent_officers` — protected independence can be constitutionally valuable.
- `separation.combined_functions` — rulemaking / enforcement / adjudication can coexist institutionally.
- `separation.emergency_formalism` — necessity does not erase structural boundaries.

## Form

- `form.rules` — categorical rules are affirmatively valuable.
- `form.predictability` — notice / administrability justify imperfect rules.
- `form.anti_discretion` — rules prevent bias and arbitrary judgment.
- `form.edge_case_tolerance` — ugly cases are an accepted cost of having a rule.
- `form.categories` — legal questions should often turn on category membership.
- `form.balancing` — judges should weigh competing facts / values in context.
- `form.equitable_exception` — unfair applications can justify exceptions.
- `form.proportionality` — burdens and justifications should be weighed against one another.
- `form.cliff_skepticism` — sharp thresholds can be too arbitrary at the margins.

---

# III. REAL ANCHOR WORKSHEET

The second slot should be a **real** jurisprudential school, identity, method, or recognized family. Avoid invented serious-sounding tribes.

A multiword recognized term is acceptable even though the conceptual slot is the "-ist" identity slot.

---

## A01 — Positivist

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **Positivist**
- REAL BASIS: Legal positivism; Hart / Raz / inclusive-positivist variants can be distinguished in body copy.
- COVERS:
  - `source.positive_sources`
  - some `source.social_practice`
- DOES NOT IMPLY:
  - textualism
  - originalism
  - majoritarianism
  - rules
  - narrow remedies
- SHOULD WIN WHEN:
  - Source is one of the person's most distinctive and coherent features.
  - Positive-source answers dominate moral-validity answers.
- SUBTYPE HOOKS:
  - Hartian/social-practice
  - Razian/source-thesis
  - morality-incorporating / inclusive
  - "law can run out"
- CHAMPION:
- COPY:
- NOTES:

## A02 — Interpretivist

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **Interpretivist**
- REAL BASIS: Dworkinian interpretivism / law as integrity.
- COVERS:
  - `source.principles_are_law`
  - moral / coherent justification as part of determining existing law
- DOES NOT IMPLY:
  - living constitutionalism
  - balancing
  - systemic remedies
  - any particular attitude toward precedent
- SHOULD WIN WHEN:
  - principles-as-law and one-right-answer style Source answers are unusually strong.
- CHAMPION: Ronald Dworkin
- COPY:
- NOTES:

## A03 — Natural-Law Theorist

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **Natural-Law Theorist**
- REAL BASIS: Classical natural-law jurisprudence.
- COVERS:
  - `source.moral_constraint`
  - `source.objective_morality`
- DOES NOT IMPLY:
  - living constitutionalism
  - purposivism
  - judicial activism
- SHOULD WIN WHEN:
  - objective morality independently constrains / constitutes legal obligation, especially across the company-contract Source items.
- SUBTYPE HOOK:
  - historically/textually constrained natural law -> Pojanowski/Finnis-like combination.
- CHAMPION:
- COPY:
- NOTES:

## A04 — Textualist

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **Textualist**
- REAL BASIS: Modern textualism; Scalia / Manning traditions.
- COVERS:
  - `constraint.textual`
  - some `constraint.anti_history`
- DOES NOT IMPLY:
  - literalism
  - originalism
  - rules formalism
  - judicial restraint
- SHOULD WIN WHEN:
  - statutory constraint is more distinctive than the person's constitutional-time theory or source theory.
- SUBTYPE HOOKS:
  - contextual textualist
  - enacted-bargain textualist
  - anti-legislative-history
- CHAMPION:
- COPY:
- NOTES:

## A05 — Purposivist

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **Purposivist**
- REAL BASIS: Purposivist statutory interpretation / Hart & Sacks-style purposive method.
- COVERS:
  - `constraint.purpose`
  - some `constraint.open_construction`
- DOES NOT IMPLY:
  - balancing generally
  - living constitutionalism
  - systemic remedies
- SHOULD WIN WHEN:
  - purpose-driven statutory answers are unusually coherent and central.
- CHAMPION:
- COPY:
- NOTES:

## A06 — Originalist

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **Originalist**
- REAL BASIS: Originalism broadly; subtype should be supplied by modifier/body copy.
- COVERS:
  - `time.fixation`
  - `time.historical_meaning`
- DOES NOT IMPLY:
  - expected-applications originalism
  - textualism
  - positivism
  - stare decisis skepticism
  - majoritarianism
  - rules
- SHOULD WIN WHEN:
  - historical fixation is central and coherent.
- SUBTYPE HOOKS:
  - public-meaning
  - principle originalism
  - expected-applications
  - semantic fixation
  - framework construction
- CHAMPION:
- COPY:
- NOTES:

## A07 — Living Constitutionalist

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **Living Constitutionalist**
- REAL BASIS: Living constitutionalism.
- COVERS:
  - `time.living_content`
- DOES NOT IMPLY:
  - Dworkinian nonpositivism
  - balancing
  - counter-majoritarianism
  - structural remedies
- SHOULD WIN WHEN:
  - the respondent affirmatively accepts changing constitutional content, not merely new applications of fixed meaning.
- CHAMPION:
- COPY:
- NOTES:

## A08 — Common-Law Constitutionalist

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **Common-Law Constitutionalist**
- REAL BASIS: David Strauss / common-law constitutional interpretation.
- COVERS:
  - `time.common_law_development`
  - `precedent.stability`
  - `precedent.settlement`
  - accumulated practice as constitutive
- DOES NOT IMPLY:
  - generic moral nonpositivism
  - systemic remedies
  - proportionality
- SHOULD WIN WHEN:
  - Living/developmental answers combine with very strong precedent/practice-as-law answers.
- CHAMPION: David Strauss
- COPY:
- NOTES:

## A09 — Pragmatist

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **Pragmatist**
- REAL BASIS: Legal pragmatism / Posner-style pragmatic adjudication.
- COVERS:
  - consequence sensitivity
  - workability
  - some `form.balancing`
  - some institutional functionalism
- DOES NOT IMPLY:
  - living constitutionalism
  - nonpositivism
  - counter-majoritarianism
- SHOULD WIN WHEN:
  - several different domains converge on consequences / workability over categorical form.
- CHAMPION:
- COPY:
- NOTES:

## A10 — Formalist

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **Formalist**
- REAL BASIS: Separation-of-powers / legal formalism.
- COVERS:
  - `separation.formalist`
  - potentially some `form.rules` when both are strong
- DOES NOT IMPLY:
  - originalism
  - textualism
  - positivism
- SHOULD WIN WHEN:
  - constitutional structure / categorical boundaries are much more distinctive than other methods.
- CHAMPION:
- COPY:
- NOTES:

## A11 — Functionalist

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **Functionalist**
- REAL BASIS: Functional separation-of-powers scholarship / Peter Strauss-type institutional analysis.
- COVERS:
  - `separation.functionalist`
  - institutional workability
- DOES NOT IMPLY:
  - balancing in every legal domain
  - purposivism
  - living constitutionalism
- SHOULD WIN WHEN:
  - acceptance of institutional overlap and pragmatic checks is highly distinctive.
- CHAMPION:
- COPY:
- NOTES:

## A12 — Proportionalist

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **Proportionalist**
- REAL BASIS: Proportionality / balancing traditions; Alexy as major theoretical champion.
- COVERS:
  - `form.proportionality`
  - strong `form.balancing`
- DOES NOT IMPLY:
  - purposivism
  - nonpositivism
  - systemic remedies
- SHOULD WIN WHEN:
  - contextual balancing is extreme and broad rather than merely willingness to make occasional exceptions.
- CHAMPION:
- COPY:
- NOTES:

## A13 — Judicial Minimalist

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **Judicial Minimalist**
- REAL BASIS: Judicial minimalism / Bickelian passive virtues / narrow-decision traditions.
- COVERS:
  - `posture.passive_virtues`
  - `remedies.incremental`
  - some `remedies.party_specific`
- DOES NOT IMPLY:
  - majoritarianism
  - precedent stability
  - textualism
- SHOULD WIN WHEN:
  - narrowness / avoidance is the clearest overall characteristic.
- CHAMPION:
- COPY:
- NOTES:

## A14 — Legal-Process Theorist

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **Legal-Process Theorist**
- REAL BASIS: Hart & Sacks / legal-process tradition.
- COVERS:
  - purposive institutional reasoning
  - role-sensitive decisionmaking
  - some institutional settlement
- DOES NOT IMPLY:
  - strong living constitutionalism
  - Dworkinian moral reading
  - structural reform
- SHOULD WIN WHEN:
  - purposivism + institutional competence / settlement is more characteristic than free-standing pragmatism.
- CHAMPION:
- COPY:
- NOTES:

---

# IV. –ING MODIFIER WORKSHEET

Modifiers are not required to be names of schools. They should be concise, natural English descriptions of an important trait that the anchor has **not already communicated**.

---

## M01 — source-following

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **source-following**
- ADDS:
  - `source.positive_sources`
- REDUNDANT WITH:
  - strongly Positivist anchor
- GOOD USE:
  - Originalist / Pragmatist / Formalist / Functionalist whose Source answers are unusually positivist.
- COPY:
- NOTES:

## M02 — principle-seeking

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **principle-seeking**
- ADDS:
  - `source.principles_are_law`
  - can also express `time.principle_originalism` when paired with Originalist
- REDUNDANT WITH:
  - Interpretivist if used only for Dworkinian Source
- SPECIAL CONDITIONAL:
  - With Originalist, prefer this when T8-style broad-principle application is strong and expected-applications lock-in is weak.
- COPY:
- NOTES:

## M03 — morality-grounding

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **morality-grounding**
- ADDS:
  - `source.objective_morality`
  - `source.moral_constraint`
- REDUNDANT WITH:
  - Natural-Law Theorist
- COPY:
- NOTES:

## M04 — practice-following

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **practice-following**
- ADDS:
  - `source.social_practice`
  - `time.early_practice`
- REDUNDANT WITH:
  - Common-Law Constitutionalist when the evidence is overwhelmingly precedent/practice based.
- COPY:
- NOTES:

## M05 — text-binding

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **text-binding**
- ADDS:
  - `constraint.textual`
- REDUNDANT WITH:
  - Textualist
- COPY:
- NOTES:

## M06 — context-reading

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **context-reading**
- ADDS:
  - `constraint.contextual_textualism`
- IMPORTANT:
  - This is not purposivism.
  - C5/C13-type answers should be able to trigger it.
- REDUNDANT WITH:
  - none automatically; can be useful specifically with Textualist if the point is "not a literalist."
- COPY:
- NOTES:

## M07 — bargain-respecting

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **bargain-respecting**
- ADDS:
  - `constraint.enacted_bargain`
- EVIDENCE:
  - express exemptions / omitted groups / enacted political compromise.
- COPY:
- NOTES:

## M08 — purpose-seeking

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **purpose-seeking**
- ADDS:
  - `constraint.purpose`
  - some `constraint.anti_evasion`
- REDUNDANT WITH:
  - Purposivist
- COPY:
- NOTES:

## M09 — meaning-fixing

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **meaning-fixing**
- ADDS:
  - `time.semantic_fixation`
  - `time.public_meaning`
- REDUNDANT WITH:
  - Originalist if there is no subtype information beyond generic fixation.
- USEFUL WHEN:
  - anchor comes from another domain, or semantic/public-meaning fixation is unusually distinctive.
- COPY:
- NOTES:

## M10 — principle-applying

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **principle-applying**
- ADDS:
  - `time.principle_originalism`
- SPECIAL:
  - Intended primarily as the Solum-style distinction when the anchor is Originalist.
- REDUNDANT WITH:
  - do not use if it would merely repeat generic Interpretivist principle language without Time significance.
- COPY:
- NOTES:

## M11 — tradition-following

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **tradition-following**
- ADDS:
  - `time.expected_applications`
  - `time.early_practice`
- SPECIAL:
  - useful to distinguish a historically concrete originalist from principle originalism.
- COPY:
- NOTES:

## M12 — precedent-preserving

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **precedent-preserving**
- ADDS:
  - `precedent.stability`
  - `precedent.reliance`
  - `precedent.settlement`
- REDUNDANT WITH:
  - Common-Law Constitutionalist when stability is already central to why that anchor won.
- COPY:
- NOTES:

## M13 — precedent-breaking

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **precedent-breaking**
- ADDS:
  - `precedent.correction`
  - `precedent.correctness_first`
- COPY:
- NOTES:

## M14 — rule-following

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **rule-following**
- ADDS:
  - `form.rules`
  - `form.predictability`
- REDUNDANT WITH:
  - Proportionalist opposite does not itself make this redundant.
  - Formalist only when that anchor won partly from the Form axis rather than Separation.
- COPY:
- NOTES:

## M15 — discretion-limiting

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **discretion-limiting**
- ADDS:
  - `form.anti_discretion`
- SPECIAL:
  - F7/F8-type anti-bias reason for rules, not merely generic formalism.
- COPY:
- NOTES:

## M16 — consequence-weighing

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **consequence-weighing**
- ADDS:
  - `form.balancing`
  - consequence sensitivity
- REDUNDANT WITH:
  - Pragmatist when consequences are why that anchor won.
- COPY:
- NOTES:

## M17 — exception-making

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **exception-making**
- ADDS:
  - `form.equitable_exception`
  - `form.cliff_skepticism`
- COPY:
- NOTES:

## M18 — boundary-policing

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **boundary-policing**
- ADDS:
  - `separation.formalist`
  - `separation.prescribed_process`
- REDUNDANT WITH:
  - Formalist if separation formalism is why the anchor won.
- COPY:
- NOTES:

## M19 — institution-trusting

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **institution-trusting**
- ADDS:
  - `separation.functionalist`
  - role / workability deference
- REDUNDANT WITH:
  - Functionalist where institutional overlap is the defining trait.
- COPY:
- NOTES:

## M20 — rights-protecting

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **rights-protecting**
- ADDS:
  - `posture.countermajoritarian`
  - `posture.rights_trumps`
- REDUNDANT WITH:
  - phrase that already says rights beat majorities.
- COPY:
- NOTES:

## M21 — democracy-deferring

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **democracy-deferring**
- ADDS:
  - `posture.majoritarian`
  - `posture.clear_error`
- REDUNDANT WITH:
  - phrase "who lets democracy decide"
- COPY:
- NOTES:

## M22 — system-reforming

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **system-reforming**
- ADDS:
  - `remedies.structural`
  - `remedies.supervision`
- REDUNDANT WITH:
  - phrase "who fixes the whole system"
- COPY:
- NOTES:

## M23 — remedy-narrowing

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **remedy-narrowing**
- ADDS:
  - `remedies.party_specific`
  - `remedies.incremental`
  - `remedies.severability`
- REDUNDANT WITH:
  - Judicial Minimalist when remedies are why that anchor won.
- COPY:
- NOTES:

---

# V. PHRASE WORKSHEET

The third slot is **not** reserved for Posture / Remedies / Precedent. It should express whichever strong trait remains most important after the anchor and modifier.

---

## P01 — democracy decides

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who lets democracy decide**
- ADDS:
  - `posture.majoritarian`
  - `posture.democratic_legitimacy`
- REDUNDANT WITH:
  - democracy-deferring modifier
- COPY:
- NOTES:

## P02 — clear error only

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who steps in only when the law is clear**
- ADDS:
  - `posture.clear_error`
- DISTINGUISH:
  - more Thayerian than generic anti-judicial sentiment.
- COPY:
- NOTES:

## P03 — rights beat majorities

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who thinks rights are supposed to beat majorities**
- ADDS:
  - `posture.countermajoritarian`
  - `posture.rights_trumps`
- REDUNDANT WITH:
  - rights-protecting modifier
- COPY:
- NOTES:

## P04 — judicial independence

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who does not want judges answering to the crowd**
- ADDS:
  - `posture.judicial_independence`
- COPY:
- NOTES:

## P05 — electoral judges

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who thinks judges should answer to voters eventually**
- ADDS:
  - `posture.electoral_accountability`
- COPY:
- NOTES:

## P06 — preserve precedent

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who leaves settled law alone**
- ADDS:
  - `precedent.stability`
  - `precedent.reliance`
- REDUNDANT WITH:
  - precedent-preserving modifier
  - Common-Law Constitutionalist when stability already central.
- COPY:
- NOTES:

## P07 — correction first

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who wants bad precedent gone**
- ADDS:
  - `precedent.correction`
  - `precedent.correctness_first`
- REDUNDANT WITH:
  - precedent-breaking modifier
- COPY:
- NOTES:

## P08 — statutory stare decisis

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who makes Congress fix the Court's old mistakes**
- ADDS:
  - `precedent.statutory`
- COPY:
- NOTES:

## P09 — plaintiff-specific relief

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who fixes only the case in front of them**
- ADDS:
  - `remedies.party_specific`
  - `remedies.incremental`
- COPY:
- NOTES:

## P10 — systemic relief

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who fixes the whole system**
- ADDS:
  - `remedies.structural`
  - `remedies.supervision`
- COPY:
- NOTES:

## P11 — universal relief

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who will not make everyone file the same lawsuit**
- ADDS:
  - `remedies.universal`
- COPY:
- NOTES:

## P12 — severability

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who cuts out only the broken part**
- ADDS:
  - `remedies.severability`
- COPY:
- NOTES:

## P13 — prophylactic remedies

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who will write an extra rule to make the right real**
- ADDS:
  - `remedies.prophylactic`
- COPY:
- NOTES:

## P14 — strict separation

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who keeps the branches in their lanes**
- ADDS:
  - `separation.formalist`
  - `separation.prescribed_process`
- REDUNDANT WITH:
  - boundary-policing modifier
  - Formalist where separation is the reason for anchor.
- COPY:
- NOTES:

## P15 — functional institutions

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who lets government use the arrangement that works**
- ADDS:
  - `separation.functionalist`
  - `separation.combined_functions`
- REDUNDANT WITH:
  - institution-trusting modifier
  - Functionalist anchor
- COPY:
- NOTES:

## P16 — rules

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who would rather have a rule than a perfect exception**
- ADDS:
  - `form.rules`
  - `form.edge_case_tolerance`
- REDUNDANT WITH:
  - rule-following modifier
- COPY:
- NOTES:

## P17 — balancing

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who wants judges to weigh the whole case**
- ADDS:
  - `form.balancing`
- REDUNDANT WITH:
  - consequence-weighing modifier
  - Proportionalist where balancing is the reason for anchor.
- COPY:
- NOTES:

## P18 — moral source

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who thinks morality can outrank enacted law**
- ADDS:
  - `source.moral_constraint`
  - `source.objective_morality`
- REDUNDANT WITH:
  - morality-grounding modifier
  - Natural-Law Theorist
- COPY:
- NOTES:

## P19 — positive law

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who calls it law even when it is awful**
- ADDS:
  - `source.positive_sources`
- REDUNDANT WITH:
  - source-following modifier
  - Positivist
- COPY:
- NOTES:

## P20 — fixed meaning

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who thinks old legal meaning stays put**
- ADDS:
  - `time.fixation`
  - `time.semantic_fixation`
- REDUNDANT WITH:
  - meaning-fixing modifier
  - Originalist
- COPY:
- NOTES:

## P21 — evolving meaning

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who lets constitutional meaning change with the country**
- ADDS:
  - `time.living_content`
- REDUNDANT WITH:
  - Living Constitutionalist
- COPY:
- NOTES:

## P22 — public meaning

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who cares what the public ratified, not what the drafters secretly meant**
- ADDS:
  - `time.public_meaning`
- COPY:
- NOTES:

## P23 — enacted bargain

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who makes Congress live with the deal it actually passed**
- ADDS:
  - `constraint.enacted_bargain`
- REDUNDANT WITH:
  - bargain-respecting modifier
- COPY:
- NOTES:

## P24 — purpose

- [ ] KEEP
- [ ] RENAME:
- [ ] DELETE
- DISPLAY: **who would rather save the law's point than worship its wording**
- ADDS:
  - `constraint.purpose`
  - `constraint.open_construction`
- REDUNDANT WITH:
  - purpose-seeking modifier
  - Purposivist
- COPY:
- NOTES:

---

# VI. SPECIAL OVERRIDE WORKSHEET

These are intentionally outside the normal jurisprudential title grammar.

## OVR-L — outcome-driven left pattern

- [ ] KEEP CONCEPT
- [ ] RENAME:
- PROVISIONAL DISPLAY: **Partisan Left**
- CORE IDEA:
  - repeated abandonment of the same jurisprudential principle when the politically attractive outcome changes;
  - must be directional and systematic, not merely ideologically left-wing jurisprudence.
- CORE MIRROR SET:
  - C3 surveillance / C4 guns
  - R1 pollution / R2 overtime
  - R6 election law / R7 worker protection
  - R9 gun permits / R10 voter registration
  - O9 abortion / O10 handguns
- SOFTER CORROBORATION:
  - C1 / C18
  - T1 / T2
- IMPORTANT:
  - analyze agree / neutral / disagree first;
  - strength modifiers should adjust confidence rather than define the trap;
  - do not trigger on a principled left-coded jurisprudential profile.
- COPY:
- NOTES:

## OVR-R — outcome-driven right pattern

- [ ] KEEP CONCEPT
- [ ] RENAME:
- PROVISIONAL DISPLAY: **Partisan Right**
- CORE IDEA:
  - mirror image of OVR-L.
- CORE MIRROR SET:
  - same as above, opposite politically convenient direction.
- COPY:
- NOTES:

## OVR-C — incoherent / chaos

- [ ] KEEP CONCEPT
- [ ] RENAME:
- PROVISIONAL DISPLAY: **Dummy**
- CORE IDEA:
  - answers are globally difficult to explain by any stable jurisprudential profile;
  - contradictions are broad and nondirectional rather than coherently partisan.
- POSSIBLE DIRECT-CONTRADICTION INPUTS:
  - S7 / S8
  - C15 / C16
  - F1 / F5
  - F3 / F5
  - F8 / F9
  - mirror-pair failures that do not point consistently left or right
- PREFERRED FINAL METHOD:
  - leave-one-out predictability / global explanatory fit, not just a contradiction count.
- IMPORTANT:
  - eclectic / pluralist / unusual must not equal Dummy.
- COPY:
- NOTES:

## OVR-S — unusable response pattern

- [ ] KEEP FOR LATER
- [ ] DELETE
- PROVISIONAL DISPLAY:
- POSSIBLE INPUTS:
  - all neutral
  - straight-line clicking
  - impossibly fast completion
  - excessive skips
- IMPORTANT:
  - this is response quality, not jurisprudential incoherence.
- COPY:
- NOTES:

---

# VII. HIGH-VALUE COMBINATION BRIDGES

These are not headline tribes. They are prewritten bridge paragraphs used when two individually coherent traits create an especially informative combination.

The title system should still choose its three components normally.

## B01 — Non-positivist + Historical

- [ ] KEEP
- CORE POINT:
  - morality can help determine what law is without implying that constitutional meaning evolves with contemporary morality.
- REAL INTELLECTUAL ZONE:
  - classical natural law / Finnis / Pojanowski-type combinations.
- COPY:
- NOTES:

## B02 — Originalist + principle application

- [ ] KEEP
- CORE POINT:
  - original meaning is fixed, but historically enacted principles can govern applications the adopters did not expect.
- REAL INTELLECTUAL ZONE:
  - Solum / New Originalism-type distinction.
- COPY:
- NOTES:

## B03 — Originalist + substantial construction

- [ ] KEEP
- CORE POINT:
  - fixed original framework coexists with meaningful later construction where the original meaning underdetermines outcomes.
- REAL INTELLECTUAL ZONE:
  - Balkin / framework originalism.
- COPY:
- NOTES:

## B04 — Living + very high Stability

- [ ] KEEP
- CORE POINT:
  - constitutional development occurs through precedent and accumulated practice rather than free-floating contemporary preference.
- REAL INTELLECTUAL ZONE:
  - common-law constitutionalism / David Strauss.
- COPY:
- NOTES:

## B05 — Originalist + correctness-first precedent

- [ ] KEEP
- CORE POINT:
  - historically correct law outranks erroneous precedent.
- REAL INTELLECTUAL ZONE:
  - Thomas / Paulsen-style strand.
- COPY:
- NOTES:

## B06 — Originalist + strong stare decisis

- [ ] KEEP
- CORE POINT:
  - historical meaning is fixed, but precedent still performs substantial settlement / reliance work.
- REAL INTELLECTUAL ZONE:
  - precedent-sensitive originalism.
- COPY:
- NOTES:

## B07 — Textualist + Balancing

- [ ] KEEP
- CORE POINT:
  - enacted language determines what legal materials authorize, while open-textured standards can still be applied contextually.
- IMPORTANT:
  - demonstrates Constraint and Form are not the same axis.
- COPY:
- NOTES:

## B08 — Purposivist/Open Construction + Rules

- [ ] KEEP
- CORE POINT:
  - flexible interpretation of what the statute reaches can coexist with categorical doctrine once the legal rule is identified.
- COPY:
- NOTES:

## B09 — Counter-majoritarian + Narrow Remedies

- [ ] KEEP
- CORE POINT:
  - courts should enforce rights aggressively while limiting relief to the case / parties properly before them.
- COPY:
- NOTES:

## B10 — Majoritarian + Systemic Remedies

- [ ] KEEP
- CORE POINT:
  - courts can defer heavily on whether elected government crossed the line, then remedy aggressively once a violation is actually established.
- COPY:
- NOTES:

## B11 — Formalist Separation + otherwise Balancing/Pragmatic

- [ ] KEEP
- CORE POINT:
  - rigid constitutional institutional boundaries do not require rule-bound adjudication everywhere else.
- COPY:
- NOTES:

## B12 — Functionalist Separation + Rules-heavy adjudication

- [ ] KEEP
- CORE POINT:
  - pragmatic governmental structure does not imply discretionary case-by-case legal doctrine.
- COPY:
- NOTES:

## B13 — Positivist + Living

- [ ] KEEP
- CORE POINT:
  - legal change can occur through socially recognized precedent and practice without treating morality itself as a freestanding source of legal validity.
- COPY:
- NOTES:

## B14 — Non-positivist + Textualist

- [ ] KEEP
- CORE POINT:
  - higher-law / moral commitments can coexist with strict interpretation of enacted positive law.
- COPY:
- NOTES:

## B15 — Majoritarian under uncertainty + strong enforcement when clear

- [ ] KEEP
- CORE POINT:
  - deference on genuinely reasonable constitutional disagreements is different from hostility to judicial review.
- REAL INTELLECTUAL ZONE:
  - Thayer / Waldron-like distinction depending exact answers.
- COPY:
- NOTES:

---

# VIII. COVERAGE CHECKLIST

This is the editorial "are we missing a whole kind of person?" checklist.

An axis is covered when:
1. both poles can become meaningful title content,
2. important subtypes have language,
3. the trait can appear in more than one title slot if another anchor wins.

## Source

- [ ] Positivist headline available
- [ ] Interpretivist headline available
- [ ] Natural-law headline available
- [ ] positive-source modifier / phrase available
- [ ] moral-source modifier / phrase available
- [ ] social-practice subtype covered
- [ ] principles-as-law subtype covered
- [ ] extreme-injustice escape hatch covered
- [ ] "law runs out" subtype covered

## Constraint

- [ ] Textualist headline available
- [ ] Purposivist headline available
- [ ] textual modifier / phrase available
- [ ] purposive modifier / phrase available
- [ ] contextual textualism covered
- [ ] enacted bargain covered
- [ ] legislative-history hostility covered
- [ ] anti-evasion purposivism covered

## Time

- [ ] Originalist headline available
- [ ] Living Constitutionalist headline available
- [ ] Common-Law Constitutionalist headline available
- [ ] semantic fixation covered
- [ ] public meaning vs private intent covered
- [ ] expected applications covered
- [ ] principle originalism covered
- [ ] framework construction covered
- [ ] level of generality covered
- [ ] early practice covered
- [ ] genuinely evolving content covered

## Precedent

- [ ] stability modifier / phrase available
- [ ] correction modifier / phrase available
- [ ] reliance covered
- [ ] settlement / impersonal-law rationale covered
- [ ] statutory stare decisis covered
- [ ] embedded precedent covered
- [ ] correctness-first covered
- [ ] skepticism of judge-created doctrines/remedies covered

## Remedies

- [ ] party-specific content available
- [ ] systemic content available
- [ ] universal relief covered
- [ ] severability covered
- [ ] incrementalism covered
- [ ] prophylactic rules covered
- [ ] structural reform covered
- [ ] long-term supervision covered
- [ ] burdening nonviolators covered

## Posture

- [ ] majoritarian content available
- [ ] counter-majoritarian content available
- [ ] Thayerian clear-error distinction covered
- [ ] Waldron democratic-legitimacy distinction covered
- [ ] dialogic / weak-form idea covered
- [ ] passive virtues covered
- [ ] rights-as-trumps covered
- [ ] judicial independence covered
- [ ] electoral accountability covered

## Separation

- [ ] Formalist headline available
- [ ] Functionalist headline available
- [ ] nondelegation covered
- [ ] prescribed procedure covered
- [ ] officer independence covered
- [ ] combined administrative functions covered
- [ ] emergency formalism covered

## Form

- [ ] Proportionalist headline available
- [ ] rule modifier / phrase available
- [ ] balancing modifier / phrase available
- [ ] predictability rationale covered
- [ ] anti-bias / anti-discretion rationale covered
- [ ] ugly-edge-case tolerance covered
- [ ] equitable exception covered
- [ ] proportionality covered
- [ ] cliff-effect skepticism covered

---

# IX. COMBINATION-QUALITY CHECKS

When the content catalog is implemented, automatically enumerate generated titles and flag:

- duplicate semantic coverage across two or three slots;
- grammatically ugly combinations;
- title pieces that logically contradict one another;
- real anchors paired with wording that misstates the school;
- important trait combinations with no available title language;
- titles where a weaker trait displaced a much more distinctive one;
- titles that encode the same underlying information under different wording;
- titles whose body copy would need a bridge but no bridge exists.

Do **not** blacklist merely unusual combinations.

---

# X. PROPOSED INFORMATION-SELECTION LOGIC

This is a starting point for later implementation; the editorial content above should be approved first.

For each respondent:

1. Compute headline axis evidence and all subtype traits.
2. Convert the seven-point response into:
   - direction: agree / neutral / disagree
   - confidence modifier: slight / ordinary / strong
3. Score every trait for:
   - strength,
   - consistency,
   - breadth,
   - distinctiveness.
4. Test special overrides.
5. Generate eligible real anchors.
6. Select the anchor maximizing:
   - fit,
   - specificity,
   - evidence breadth,
   - information explained.
7. Mark anchor coverage tags as represented.
8. Rank one common residual-feature pool by **marginal information value** after noun redundancy.
9. Give the strongest residual feature the trailing phrase (#2).
10. Mark that feature's tags and conceptual group as represented.
11. Rank the same pool again with phrase redundancy discounted.
12. Give the strongest genuinely different remaining feature the modifier (#3).
13. Run grammar / redundancy / incompatibility checks.
14. If a high-value bridge applies, insert its bridge paragraph.
15. Use remaining strong traits for secondary body copy, not the title.

A possible internal objective function later:

`component_value = importance × confidence × novelty × wording_quality`

where `novelty` falls toward zero as the candidate's coverage tags overlap the already selected components.

The exact numeric implementation can wait until the content vocabulary is approved.

---

# XI. FIRST EDITORIAL PASS

Recommended review order:

1. **Anchors A01–A14**  
   Delete anything that is not a real enough jurisprudential identity. Add missing real anchors.

2. **Modifiers M01–M23**  
   Ignore scoring. Ask only: "Would I be happy seeing this before a result name?"

3. **Phrases P01–P24**  
   This is where tone can be most playful. Rewrite aggressively.

4. **Bridges B01–B15**  
   Check that the intellectual combinations are worth special explanatory prose.

5. **Overrides**  
   Rename Partisan / Dummy only after the normal vocabulary feels right.

The workbook has now been converted into machine-readable result content. Future editorial changes should update both this workbook and `result_content.js`; automated audits verify that the public modifier/identity/phrase assembly remains live.
