// Frozen real response-derived evidence: no re-scoring or retuned answer vectors.
// The fixtures originated in the reviewed v10 editorial audit. Persona names
// appear only as test labels; runtime selection is evidence-based.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
vm.runInThisContext(fs.readFileSync(new URL('../result_narrative.js', import.meta.url), 'utf8'));
const n=globalThis.LAW_RESULT_NARRATIVE;
const frozen = [
  {
    "fixture": "mara",
    "scores": {
      "sorc": 34,
      "cons": 59,
      "time": 31,
      "prec": 81,
      "remed": 34,
      "post": 18,
      "separ": 39,
      "form": 50
    },
    "identity": {
      "id": "common_law_constitutionalist",
      "label": "Common-Law Constitutionalist",
      "family": "time",
      "status": "core"
    },
    "traits": {
      "source.social_practice": 0.3333333333333333,
      "source.law_runs_out": 0,
      "source.principles_are_law": 1,
      "source.extreme_injustice": 1,
      "source.objective_morality": 0.8333333333333333,
      "source.independent_moral_validity": 0.8333333333333333,
      "source.independent_moral_validity_rejected": 0,
      "constraint.purpose": 0.41904761904761906,
      "constraint.textual": 0.4528301886792453,
      "constraint.contextual_textualism": 0.4814814814814815,
      "constraint.enacted_bargain": 0.19727891156462585,
      "constraint.anti_evasion": 0,
      "time.public_meaning": 1,
      "time.principle_originalism": 1,
      "time.semantic_fixation": 1,
      "time.expected_applications": 0.15555555555555553,
      "time.early_practice": 0,
      "time.common_law_development": 0.8333333333333333,
      "precedent.reliance": 0.3333333333333333,
      "precedent.settlement": 0.6666666666666666,
      "precedent.statutory": 0.3333333333333333,
      "remedies.universal": 0.3333333333333333,
      "remedies.severability": 0.6666666666666667,
      "remedies.prophylactic": 1,
      "remedies.structural": 0.6794871794871794,
      "remedies.supervision": 0.6666666666666666,
      "method.narrow_shallow": 0.6666666666666665,
      "posture.clear_error": 0,
      "posture.democratic_legitimacy": 0.09433962264150944,
      "posture.dialogic": 0,
      "posture.passive_virtues": 0.3333333333333333,
      "posture.rights_trumps": 1,
      "posture.judicial_independence": 1,
      "posture.electoral_accountability": 0,
      "separation.nondelegation": 0,
      "separation.unitary_executive": 0,
      "separation.prescribed_process": 0.4666666666666666,
      "separation.combined_functions": 0.6666666666666666,
      "form.predictability": 0,
      "form.anti_discretion": 0.5252525252525253,
      "form.edge_case_tolerance": 0.7916666666666666,
      "form.categories": 0,
      "form.equitable_exception": 1,
      "form.cliff_skepticism": 0.3333333333333333,
      "source.positive_sources": 0,
      "source.nonpositive_sources": 0.32,
      "constraint.textual_axis": 0.18,
      "constraint.open_construction": 0,
      "time.fixation": 0,
      "time.living_content": 0.38,
      "precedent.stability": 0.62,
      "precedent.correction": 0,
      "remedies.party_specific": 0,
      "posture.majoritarian": 0,
      "posture.countermajoritarian": 0.64,
      "separation.formalist": 0,
      "separation.functionalist": 0.22,
      "form.rules": 0,
      "form.balancing": 0,
      "precedent.correctness_first": 0,
      "remedies.incremental": 0,
      "method.consequences": 0.3333333333333333,
      "method.workability": 0.07333333333333333,
      "method.pluralism": 0,
      "method.low_theory_space": 0.36,
      "source.common_law_fundamental_rights": 0.6666666666666666,
      "posture.judicial_supremacy": 0.6666666666666666,
      "remedies.constitutional_common_law": 1,
      "source.fit_and_justification": 1,
      "source.right_answer": 1,
      "method.structural_inference": 1,
      "method.holistic_constitution": 1,
      "method.statutory_obsolescence": 0.3333333333333333,
      "method.second_look": 0.3333333333333333,
      "method.common_law_statutory_updating": 0.3333333333333333,
      "source.positive_law_settlement": 1,
      "time.ordered_liberty_tradition": 0.3333333333333333
    },
    "expected": "portrait_evidenced_independent_common_law_safeguards",
    "context": "Your view makes legal argument a continuing inquiry into what people are already entitled to. When reasoning from earlier decisions, you would seek an interpretation that fits the legal record and makes moral sense of its principles. That reasoning can carry the law beyond its earlier conclusions. The Constitution’s arrangement of powers and institutions can also imply binding rules that no single clause states. A judge who treats accepted legal practice as the ultimate test of law will see an unauthorized addition where you see an obligation finally understood. The disagreement concerns whether official acceptance finally determines what can count as law. Your answer leaves public institutions substantial work to do, settling questions on which morality permits several reasonable arrangements. Ordinary unfairness therefore leaves much law intact; extreme injustice can destroy its claim to legal validity. Courts must explain how new conclusions belong to the legal order they inherit, without casually undoing arrangements people made in reliance on old decisions. They can create additional legal safeguards to make a right effective, while distinguishing those safeguards from the right itself. You would ordinarily make practical difficulties shape the remedy rather than reduce the right itself. People who reject the judges' moral reasoning must nevertheless live under the resulting law."
  },
  {
    "fixture": "alex",
    "scores": {
      "sorc": 94,
      "cons": 91,
      "time": 80,
      "prec": 69,
      "remed": 62,
      "post": 45,
      "separ": 70,
      "form": 83
    },
    "identity": {
      "id": "positivist",
      "label": "Positivist",
      "family": "source",
      "status": "core"
    },
    "traits": {
      "source.social_practice": 1,
      "source.law_runs_out": 0.7530864197530863,
      "source.principles_are_law": 0,
      "source.extreme_injustice": 0,
      "source.objective_morality": 0,
      "source.independent_moral_validity": 0,
      "source.independent_moral_validity_rejected": 1,
      "constraint.purpose": 0,
      "constraint.textual": 0.9559748427672956,
      "constraint.contextual_textualism": 1,
      "constraint.enacted_bargain": 1,
      "constraint.anti_evasion": 0,
      "time.public_meaning": 1,
      "time.principle_originalism": 1,
      "time.semantic_fixation": 1,
      "time.expected_applications": 0.6444444444444444,
      "time.early_practice": 0.6666666666666666,
      "time.common_law_development": 0.5,
      "precedent.reliance": 0.5185185185185185,
      "precedent.settlement": 0.6666666666666666,
      "precedent.statutory": 0.6666666666666666,
      "remedies.universal": 0,
      "remedies.severability": 1,
      "remedies.prophylactic": 0.6666666666666666,
      "remedies.structural": 0.23076923076923075,
      "remedies.supervision": 0.3333333333333333,
      "method.narrow_shallow": 1,
      "posture.clear_error": 0.3333333333333333,
      "posture.democratic_legitimacy": 0.5408805031446541,
      "posture.dialogic": 0,
      "posture.passive_virtues": 0.6666666666666666,
      "posture.rights_trumps": 0.888888888888889,
      "posture.judicial_independence": 1,
      "posture.electoral_accountability": 0,
      "separation.nondelegation": 0.3333333333333333,
      "separation.unitary_executive": 0,
      "separation.prescribed_process": 0.9066666666666666,
      "separation.combined_functions": 0,
      "form.predictability": 0.6666666666666666,
      "form.anti_discretion": 0.6868686868686869,
      "form.edge_case_tolerance": 0.8749999999999999,
      "form.categories": 0.3333333333333333,
      "form.equitable_exception": 0,
      "form.cliff_skepticism": 0,
      "source.positive_sources": 0.88,
      "source.nonpositive_sources": 0,
      "constraint.textual_axis": 0.82,
      "constraint.open_construction": 0,
      "time.fixation": 0.6,
      "time.living_content": 0,
      "precedent.stability": 0.38,
      "precedent.correction": 0,
      "remedies.party_specific": 0.24,
      "posture.majoritarian": 0,
      "posture.countermajoritarian": 0.1,
      "separation.formalist": 0.4,
      "separation.functionalist": 0,
      "form.rules": 0.66,
      "form.balancing": 0,
      "precedent.correctness_first": 0,
      "remedies.incremental": 0.24,
      "method.consequences": 0,
      "method.workability": 0,
      "method.pluralism": 0,
      "method.low_theory_space": 0.12,
      "source.morality_incorporated": 0.6666666666666666,
      "constraint.best_reading_context": 1,
      "separation.independent_judicial_interpretation": 0.6666666666666666,
      "remedies.constitutional_common_law": 0.6666666666666666,
      "time.originalism_independent_authority": 0.3333333333333333
    },
    "expected": "portrait_evidenced_inclusive_textual_settlement_safeguards",
    "context": "The strength of this outlook is that a judge must explain where a claimed power comes from before explaining why its use would be good. Your inclusive positivism allows accepted legal standards to make moral acceptability a condition of legal validity. A judge applying those standards is determining existing law. Even a sound moral objection cannot supply a missing legal basis. Textualism and originalism carry the same discipline into interpretation. A statute’s wording records how far lawmakers agreed to pursue its aims. Whole-text context and ordinary usage help recover that bargain, including limits that its broader purpose would erase. An adopted principle can reach circumstances its authors misunderstood; its content remains a commitment to be interpreted rather than a proposal to be improved. Your respect for precedent makes this more accommodating than a programme of restoring every original answer. Judicial decisions can become part of the law people legitimately depend on, giving some mistakes continuing legal authority. You would tolerate that cost rather than let every change in judicial philosophy reopen settled arrangements. Courts can fill genuine gaps and create safeguards beyond a constitutional guarantee’s minimum requirements. Those safeguards can be binding law while remaining open to legislative revision that respects the underlying right."
  },
  {
    "fixture": "dev",
    "scores": {
      "sorc": 94,
      "cons": 91,
      "time": 80,
      "prec": 69,
      "remed": 62,
      "post": 45,
      "separ": 70,
      "form": 83
    },
    "identity": {
      "id": "textualist",
      "label": "Textualist",
      "family": "method",
      "status": "core"
    },
    "traits": {
      "source.social_practice": 1,
      "source.law_runs_out": 0.7530864197530863,
      "source.principles_are_law": 0,
      "source.extreme_injustice": 0,
      "source.objective_morality": 0,
      "source.independent_moral_validity": 0,
      "source.independent_moral_validity_rejected": 1,
      "constraint.purpose": 0,
      "constraint.textual": 0.9559748427672956,
      "constraint.contextual_textualism": 1,
      "constraint.enacted_bargain": 1,
      "constraint.anti_evasion": 0,
      "time.public_meaning": 1,
      "time.principle_originalism": 1,
      "time.semantic_fixation": 1,
      "time.expected_applications": 0.6444444444444444,
      "time.early_practice": 0.6666666666666666,
      "time.common_law_development": 0.5,
      "precedent.reliance": 0.5185185185185185,
      "precedent.settlement": 0.6666666666666666,
      "precedent.statutory": 0.6666666666666666,
      "remedies.universal": 0,
      "remedies.severability": 1,
      "remedies.prophylactic": 0.6666666666666666,
      "remedies.structural": 0.23076923076923075,
      "remedies.supervision": 0.3333333333333333,
      "method.narrow_shallow": 1,
      "posture.clear_error": 0.3333333333333333,
      "posture.democratic_legitimacy": 0.5408805031446541,
      "posture.dialogic": 0,
      "posture.passive_virtues": 0.6666666666666666,
      "posture.rights_trumps": 1,
      "posture.judicial_independence": 1,
      "posture.electoral_accountability": 0,
      "separation.nondelegation": 0.3333333333333333,
      "separation.unitary_executive": 0,
      "separation.prescribed_process": 0.9066666666666666,
      "separation.combined_functions": 0,
      "form.predictability": 0.6666666666666666,
      "form.anti_discretion": 1,
      "form.edge_case_tolerance": 0.8749999999999999,
      "form.categories": 0.3333333333333333,
      "form.equitable_exception": 0,
      "form.cliff_skepticism": 0,
      "source.positive_sources": 0.88,
      "source.nonpositive_sources": 0,
      "constraint.textual_axis": 0.82,
      "constraint.open_construction": 0,
      "time.fixation": 0.6,
      "time.living_content": 0,
      "precedent.stability": 0.38,
      "precedent.correction": 0,
      "remedies.party_specific": 0.24,
      "posture.majoritarian": 0,
      "posture.countermajoritarian": 0.1,
      "separation.formalist": 0.4,
      "separation.functionalist": 0,
      "form.rules": 0.66,
      "form.balancing": 0,
      "precedent.correctness_first": 0,
      "remedies.incremental": 0.24,
      "method.consequences": 0,
      "method.workability": 0,
      "method.pluralism": 0,
      "method.low_theory_space": 0.12,
      "priority.method.over.source": 1,
      "priority.method.over.time": 1,
      "priority.method.over.realism": 1,
      "method.categorical_textual_rights": 1,
      "priority.method.over.structure": 1,
      "constraint.best_reading_context": 1,
      "separation.independent_judicial_interpretation": 0.6666666666666666,
      "source.morality_incorporated": 0.6666666666666666,
      "separation.assigned_independence": 0.3333333333333333
    },
    "expected": "portrait_evidenced_inclusive_categorical_textual_settlement",
    "context": "Lawmakers decide how far to pursue an aim, through which institutions, and at what cost to competing interests. Your textualism preserves those choices inside the enacted language. Reading a statute in context should recover the decision that was made, including its limits; pursuing its purpose further would require authority to make a different decision. Your constitutional originalism follows the same logic. Adopted principles can govern applications their authors failed to recognize, while retaining the meaning that gave them authority. Accepted legal standards can make moral requirements part of what determines legal validity. Your preference for general rules and prescribed governmental procedures extends this restraint across public power. When constitutional text states a right categorically, you would enforce that prohibition rather than weigh the right against governmental interests. Defining its scope remains an interpretive task; once it applies, judges cannot reopen the balance because the law they must invalidate is popular. Judges retain responsibility for choosing the best statutory reading, including when an agency disagrees. Earlier judicial decisions can acquire authority through settled practice and the reliance they invite. You would preserve some interpretive mistakes for that reason, especially where legislation can repair them. You would sometimes leave the resulting harm in place because correction would disrupt obligations built around the old rule."
  },
  {
    "fixture": "ellis",
    "scores": {
      "sorc": 94,
      "cons": 91,
      "time": 80,
      "prec": 69,
      "remed": 62,
      "post": 45,
      "separ": 70,
      "form": 83
    },
    "identity": {
      "id": "public_meaning_originalist",
      "label": "Public-Meaning Originalist",
      "family": "time",
      "status": "adaptive"
    },
    "traits": {
      "source.social_practice": 1,
      "source.law_runs_out": 0.7530864197530863,
      "source.principles_are_law": 0,
      "source.extreme_injustice": 0,
      "source.objective_morality": 0,
      "source.independent_moral_validity": 0,
      "source.independent_moral_validity_rejected": 1,
      "constraint.purpose": 0,
      "constraint.textual": 0.9559748427672956,
      "constraint.contextual_textualism": 0.6666666666666666,
      "constraint.enacted_bargain": 1,
      "constraint.anti_evasion": 0,
      "time.public_meaning": 1,
      "time.principle_originalism": 1,
      "time.semantic_fixation": 1,
      "time.expected_applications": 0.6444444444444444,
      "time.early_practice": 0.6666666666666666,
      "time.common_law_development": 0.5,
      "precedent.reliance": 0.5185185185185185,
      "precedent.settlement": 0.6666666666666666,
      "precedent.statutory": 0.6666666666666666,
      "remedies.universal": 0,
      "remedies.severability": 1,
      "remedies.prophylactic": 0.6666666666666666,
      "remedies.structural": 0.23076923076923075,
      "remedies.supervision": 0.3333333333333333,
      "method.narrow_shallow": 1,
      "posture.clear_error": 0.3333333333333333,
      "posture.democratic_legitimacy": 0.5408805031446541,
      "posture.dialogic": 0,
      "posture.passive_virtues": 0.6666666666666666,
      "posture.rights_trumps": 0.888888888888889,
      "posture.judicial_independence": 1,
      "posture.electoral_accountability": 0,
      "separation.nondelegation": 0.3333333333333333,
      "separation.unitary_executive": 0,
      "separation.prescribed_process": 0.9066666666666666,
      "separation.combined_functions": 0,
      "form.predictability": 0.6666666666666666,
      "form.anti_discretion": 0.6868686868686869,
      "form.edge_case_tolerance": 0.8749999999999999,
      "form.categories": 0.3333333333333333,
      "form.equitable_exception": 0,
      "form.cliff_skepticism": 0,
      "source.positive_sources": 0.88,
      "source.nonpositive_sources": 0,
      "constraint.textual_axis": 0.82,
      "constraint.open_construction": 0,
      "time.fixation": 0.6,
      "time.living_content": 0,
      "precedent.stability": 0.38,
      "precedent.correction": 0,
      "remedies.party_specific": 0.24,
      "posture.majoritarian": 0,
      "posture.countermajoritarian": 0.1,
      "separation.formalist": 0.4,
      "separation.functionalist": 0,
      "form.rules": 0.66,
      "form.balancing": 0,
      "precedent.correctness_first": 0,
      "remedies.incremental": 0.24,
      "method.consequences": 0,
      "method.workability": 0,
      "method.pluralism": 0,
      "method.low_theory_space": 0.12,
      "priority.time.over.source": 1,
      "priority.time.over.method": 1,
      "time.originalism_independent_authority": 0.3333333333333333,
      "priority.time.over.realism": 1,
      "time.construction_zone": 0.6666666666666666,
      "time.intratextualism": 0.6666666666666666,
      "method.holistic_constitution": 0.6666666666666666,
      "source.morality_incorporated": 0.6666666666666666,
      "separation.assigned_independence": 0.3333333333333333
    },
    "expected": "portrait_evidenced_inclusive_intratextual_construction_settlement",
    "context": "Your originalism reads constitutional language as part of a connected document. When a phrase is ambiguous, repeated or related wording elsewhere and the Constitution’s overall structure can outweigh an isolated reading. These connections help recover the public meaning adopted, including principles whose applications their adopters misunderstood. That gives constitutional reasoning room to produce unfamiliar conclusions without treating present approval as permission to change the Constitution's content. If that meaning genuinely leaves a question unresolved, you allow later doctrine to develop within the remaining space. The first task is still to determine what the text, read as a whole, has already settled. Your textualism, insistence on recognized legal authority and preference for general rules reinforce its demand that judges respect commitments established before they took office. Moral reasoning enters through standards the legal system accepts. Precedent then complicates what fidelity requires. A court inherits a functioning legal order as well as an original text, and serious reliance can give an erroneous ruling reasons to survive. You would give those reasons weight instead of making historical error decisive. You would sometimes leave a ruling in force while acknowledging that it misread the Constitution. That protects existing arrangements while leaving people harmed by the original mistake with a harder route to correction."
  },
  {
    "fixture": "imani",
    "scores": {
      "sorc": 80,
      "cons": 59,
      "time": 37,
      "prec": 84,
      "remed": 42,
      "post": 42,
      "separ": 44,
      "form": 50
    },
    "identity": {
      "id": "positivist",
      "label": "Positivist",
      "family": "source",
      "status": "core"
    },
    "traits": {
      "source.social_practice": 1,
      "source.law_runs_out": 0.6666666666666665,
      "source.principles_are_law": 0,
      "source.extreme_injustice": 0.3333333333333333,
      "source.objective_morality": 0,
      "source.independent_moral_validity": 0,
      "source.independent_moral_validity_rejected": 0.6666666666666666,
      "constraint.purpose": 0.34285714285714286,
      "constraint.textual": 0.5157232704402516,
      "constraint.contextual_textualism": 0.5185185185185185,
      "constraint.enacted_bargain": 0.5782312925170067,
      "constraint.anti_evasion": 0,
      "time.public_meaning": 0.6666666666666666,
      "time.principle_originalism": 0.6666666666666666,
      "time.semantic_fixation": 1,
      "time.expected_applications": 0,
      "time.early_practice": 0.3333333333333333,
      "time.common_law_development": 1,
      "precedent.reliance": 0.4814814814814815,
      "precedent.settlement": 0.8421052631578948,
      "precedent.statutory": 0.5111111111111111,
      "remedies.universal": 0.17543859649122806,
      "remedies.severability": 0.6666666666666667,
      "remedies.prophylactic": 1,
      "remedies.structural": 0.5641025641025641,
      "remedies.supervision": 0.6666666666666666,
      "method.narrow_shallow": 0.6666666666666665,
      "posture.clear_error": 0.3333333333333333,
      "posture.democratic_legitimacy": 0.4276729559748428,
      "posture.dialogic": 0.3333333333333333,
      "posture.passive_virtues": 0.3333333333333333,
      "posture.rights_trumps": 0.6666666666666666,
      "posture.judicial_independence": 0.6666666666666666,
      "posture.electoral_accountability": 0,
      "separation.nondelegation": 0,
      "separation.unitary_executive": 0,
      "separation.prescribed_process": 0.4666666666666666,
      "separation.combined_functions": 0.6666666666666666,
      "form.predictability": 0,
      "form.anti_discretion": 0.5252525252525253,
      "form.edge_case_tolerance": 0.7916666666666666,
      "form.categories": 0,
      "form.equitable_exception": 1,
      "form.cliff_skepticism": 0.3333333333333333,
      "source.positive_sources": 0.6,
      "source.nonpositive_sources": 0,
      "constraint.textual_axis": 0.18,
      "constraint.open_construction": 0,
      "time.fixation": 0,
      "time.living_content": 0.26,
      "precedent.stability": 0.68,
      "precedent.correction": 0,
      "remedies.party_specific": 0,
      "posture.majoritarian": 0.3333333333333333,
      "posture.countermajoritarian": 0.16,
      "separation.formalist": 0,
      "separation.functionalist": 0.12,
      "form.rules": 0,
      "form.balancing": 0,
      "precedent.correctness_first": 0,
      "remedies.incremental": 0,
      "method.consequences": 0.3333333333333333,
      "method.workability": 0.04,
      "method.pluralism": 0,
      "method.low_theory_space": 0.31999999999999995,
      "source.morality_incorporated": 0.6666666666666666,
      "source.planning_theory": 0.3333333333333333,
      "source.source_thesis": 0.3333333333333333,
      "source.normative_positivism": 0.3333333333333333,
      "remedies.equilibration": 0.3333333333333333,
      "remedies.constitutional_common_law": 1,
      "method.structural_inference": 0.6666666666666666,
      "method.holistic_constitution": 0.6666666666666666,
      "method.statutory_obsolescence": 0.3333333333333333,
      "method.second_look": 0.3333333333333333,
      "method.common_law_statutory_updating": 0.3333333333333333,
      "posture.weak_form": 0.3333333333333333
    },
    "expected": "portrait_evidenced_inclusive_development_structural_safeguards",
    "context": "For you, legal history changes what justice now requires of a court. An earlier ruling may have been wrong when made, yet undoing it can wrong people whose arrangements the law itself encouraged. This gives continuity an independent claim against theoretical tidiness. It also explains how constitutional law can grow through precedent. Each generation works with an accumulated body of decisions that supplies both reasons for development and limits on it. Your inclusive positivism lets recognized legal practices make moral acceptability a condition of legal validity. Constitutional obligations can also follow from the relationships the document establishes, without any single clause stating them. Courts can genuinely make new law where existing standards leave a choice, and should distinguish that work from enforcing a right already owed. You would give purpose and practical judgment room in interpretation while respecting deliberate legislative limits. Courts may create binding safeguards beyond a right’s constitutional minimum. Separating those safeguards from the guarantee itself makes room to revise the protection while continuing to honor the right. Change proceeds through inherited law, with a heavy burden on disruption. People disadvantaged by an entrenched mistake may have to wait for a correction that protects others' reliance, even when the intellectual case against the old rule is strong."
  },
  {
    "fixture": "kai",
    "scores": {
      "sorc": 80,
      "cons": 59,
      "time": 37,
      "prec": 84,
      "remed": 42,
      "post": 42,
      "separ": 44,
      "form": 50
    },
    "identity": {
      "id": "legal_realist",
      "label": "Legal Realist",
      "family": "meta",
      "status": "override"
    },
    "traits": {
      "source.social_practice": 1,
      "source.law_runs_out": 0.6666666666666665,
      "source.principles_are_law": 0,
      "source.extreme_injustice": 0.3333333333333333,
      "source.objective_morality": 0,
      "source.independent_moral_validity": 0,
      "source.independent_moral_validity_rejected": 0.6666666666666666,
      "constraint.purpose": 0.34285714285714286,
      "constraint.textual": 0.5157232704402516,
      "constraint.contextual_textualism": 0.5185185185185185,
      "constraint.enacted_bargain": 0.5782312925170067,
      "constraint.anti_evasion": 0,
      "time.public_meaning": 0.6666666666666666,
      "time.principle_originalism": 0.6666666666666666,
      "time.semantic_fixation": 1,
      "time.expected_applications": 0,
      "time.early_practice": 0.3333333333333333,
      "time.common_law_development": 1,
      "precedent.reliance": 0.4814814814814815,
      "precedent.settlement": 0.8421052631578948,
      "precedent.statutory": 0.5111111111111111,
      "remedies.universal": 0.17543859649122806,
      "remedies.severability": 0.6666666666666667,
      "remedies.prophylactic": 0.6666666666666666,
      "remedies.structural": 0.5641025641025641,
      "remedies.supervision": 0.6666666666666666,
      "method.narrow_shallow": 0.6666666666666665,
      "posture.clear_error": 0.3333333333333333,
      "posture.democratic_legitimacy": 0.4276729559748428,
      "posture.dialogic": 0.3333333333333333,
      "posture.passive_virtues": 0.3333333333333333,
      "posture.rights_trumps": 0.6666666666666666,
      "posture.judicial_independence": 0.6666666666666666,
      "posture.electoral_accountability": 0,
      "separation.nondelegation": 0,
      "separation.unitary_executive": 0,
      "separation.prescribed_process": 0.4666666666666666,
      "separation.combined_functions": 0.6666666666666666,
      "form.predictability": 0,
      "form.anti_discretion": 0.5252525252525253,
      "form.edge_case_tolerance": 0.7916666666666666,
      "form.categories": 0,
      "form.equitable_exception": 1,
      "form.cliff_skepticism": 0.3333333333333333,
      "source.positive_sources": 0.6,
      "source.nonpositive_sources": 0,
      "constraint.textual_axis": 0.18,
      "constraint.open_construction": 0,
      "time.fixation": 0,
      "time.living_content": 0.26,
      "precedent.stability": 0.68,
      "precedent.correction": 0,
      "remedies.party_specific": 0,
      "posture.majoritarian": 0.3333333333333333,
      "posture.countermajoritarian": 0.16,
      "separation.formalist": 0,
      "separation.functionalist": 0.12,
      "form.rules": 0,
      "form.balancing": 0,
      "precedent.correctness_first": 0,
      "remedies.incremental": 0,
      "method.consequences": 0.04,
      "method.workability": 0.04,
      "method.pluralism": 0,
      "method.low_theory_space": 0.31999999999999995,
      "priority.realism.over.source": 1,
      "priority.realism.over.time": 1,
      "source.morality_incorporated": 0.6666666666666666,
      "source.planning_theory": 0.3333333333333333,
      "source.source_thesis": 0.3333333333333333,
      "source.normative_positivism": 0.3333333333333333,
      "remedies.equilibration": 0.3333333333333333,
      "realism.underdetermination": 0.6666666666666666,
      "realism.extra_doctrinal": 0.6666666666666666,
      "realism.empirical_prediction": 0.6666666666666666,
      "posture.weak_form": 0.3333333333333333
    },
    "expected": "portrait_evidenced_inclusive_empirical_development_remedies",
    "context": "Your interest in how judges decide reaches beyond the reasons printed in an opinion. In hard appeals, several outcomes can have defensible legal support. You would investigate whether judges’ outlooks, experience or institutional pressures help explain and predict which they choose. A decision’s legal authority remains a separate question. Recognized practices can make moral requirements part of the law, including conditions of legal validity. Explaining a decision’s origins does not settle what later judges ought to do with it. You give inherited decisions legal authority of their own. Constitutional principles can develop through accumulated decisions, and genuine gaps leave courts responsible for making some new law. Those decisions organize lives and institutions, so a fresh judicial theory is insufficient by itself to justify dismantling them. Serious reliance would normally lead you to preserve even a mistaken ruling. Correction must take account of obligations created by the law people were previously entitled to follow. You would work within that inheritance, giving purpose and practical judgment room in interpretation while respecting deliberate legislative limits. Courts should make established rights effective, using stronger remedies when narrower measures have failed and tailoring relief to the violation."
  }
];
const neutral={sorc:50,cons:50,time:50,prec:50,remed:50,post:50,separ:50,form:50};
const c=(traits={},id='interpretive_pluralist')=>({identity:{id},traits});
const build=(traits={},scores={},id)=>n.build(c(traits,id),{...neutral,...scores});
for (const p of frozen) {
  const result=n.build(p,p.scores);
  assert.equal(result.id,p.expected,p.fixture+' frozen route');
  assert.equal(result.context,p.context,p.fixture+' approved academic context');
  assert.equal(n.wordCount(result.opening),70,p.fixture+' opening');
  assert.ok(n.wordCount(result.context)>=190 && n.wordCount(result.context)<=215);
  for (const id of ['textualist','positivist','common_law_constitutionalist','public_meaning_originalist','legal_realist']) {
    const changed={...p,identity:{id},champions:[{id:'arbitrary_champion',name:'No influence'}],personaId:'arbitrary_persona'};
    assert.deepEqual(n.build(changed,p.scores),result,'identity/champion/persona independence: '+p.fixture);
  }
  const altered={...p,traits:{...p.traits}};
  // Every accepted full-profile claim is gated; weakening its defining
  // diagnostic cannot leave the same full-profile prose selected.
  const defining={mara:'source.common_law_fundamental_rights',alex:'remedies.constitutional_common_law',
    dev:'method.categorical_textual_rights',ellis:'time.intratextualism',
    imani:'method.structural_inference',kai:'realism.empirical_prediction'}[p.fixture];
  delete altered.traits[defining];
  assert.notEqual(n.build(altered,p.scores).id,result.id,p.fixture+' unasked is not affirmative evidence');
  altered.traits[defining]=0;
  assert.notEqual(n.build(altered,p.scores).id,result.id,p.fixture+' rejected is not affirmative evidence');
}
// D-ORI7 tests independent authority; D-ORI6 is the separate Original Law item.
for (const prec of [30,50,70]) {
  const result=build({'time.precedent_mediated_historicism':1},{time:70,prec},'public_meaning_originalist');
  assert.match(result.id,/mediated_history/);
  assert.doesNotMatch(result.opening,/tied to the law established at adoption|Recovering the original answer/);
}
const textual={'constraint.contextual_textualism':1,'precedent.settlement':1};
assert.notEqual(build(textual,{},'textualist').id,'textualist_institutional');
assert.equal(build({...textual,'separation.interpretive_accommodation':1},{},'textualist').id,'textualist_institutional');
const development={time:30,post:30,prec:70};
const democratic=build({'time.democratic_constitutionalism':1},development);
const transformative=build({'time.transformative_constitutionalism':1},development);
assert.notEqual(democratic.id,transformative.id);
assert.match(democratic.context,/public contestation/i);
assert.match(transformative.context,/institutional transformation/);
const process=build({'posture.process_reinforcement':1},{form:30,post:30});
const responsive=build({'posture.responsive_review':1},{form:30,post:30});
assert.match(process.context,/representation, participation, or inclusion/);
assert.match(responsive.context,/monopoly/);
assert.match(responsive.context,/capacity|competence/);
assert.notEqual(process.context,build({},{form:30,post:30}).context);
for (const source of [{},{'source.morality_incorporated':1},{'source.source_thesis':1}]) {
  const result=build({...source,'source.normative_positivism':1},{time:70,prec:70,sorc:80});
  assert.match(result.id,/normative/);
  assert.match(result.context,/normative/);
}
const construction=build({'time.construction_zone':1},{time:70,prec:70},'public_meaning_originalist');
assert.match(construction.context,/New Originalism/);
assert.match(construction.context,/conditional permission/);
assert.match(construction.context,/not a conclusion that a substantial construction zone exists/);
assert.doesNotMatch(construction.opening,/substantial room|large zone|broad construction/);
for (const scores of [{time:70,prec:70},{time:30,prec:70},{form:30,post:30}]) {
  const result=build({'method.dynamic_statutory':1},scores);
  assert.match(result.id,/dynamic_statutory/);
  assert.match(result.context,/unchanged meaning to new facts/);
  assert.match(result.context,/override a clear statutory command/);
}
const fact=build({'realism.fact_skepticism':1,'realism.extra_doctrinal':1,'realism.empirical_prediction':1},development,'legal_realist');
assert.match(fact.context,/trial outcome/);
assert.match(fact.context,/different from rule skepticism/);
assert.match(fact.context,/political preferences/);
const combined=c({'posture.responsive_review':1,'method.dynamic_statutory':1});
const coverage=n.evidenceCoverage(combined,development);
assert.equal(coverage.length,2);
assert.ok(coverage.some(x=>x.represented));
assert.ok(coverage.filter(x=>!x.represented).every(x=>x.reason.includes('not negated')));
for(const [id,r] of Object.entries(n.ROUTES)) {
  assert.ok(n.wordCount(r.opening)<=70,id+' opening cap');
  assert.ok(n.wordCount(r.context)<=300,id+' context cap');
  assert.doesNotMatch(r.opening+r.context,/Construction-Accepting/);
}
for (const id of ['unusable_response','incoherent_response','outcome_driven_left','outcome_driven_right']) {
  const result=build({'method.dynamic_statutory':1,'time.construction_zone':1},{time:70,prec:70},id);
  assert.match(result.id,/^special_/);
}
console.log('Evidence narrative audit passed: six frozen full profiles; identity/champion invariance; diagnostic ablations; nine distinction families; bounded multi-signal coverage.');
