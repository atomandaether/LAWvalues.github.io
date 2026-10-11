/* Internal result-identity and champion catalog.
   This file is not yet loaded by the public results page. It defines the vocabulary
   and champion pool that a future adaptive classifier can use after the 93-item core. */

globalThis.LAW_RESULT_IDENTITIES = Object.freeze([
  {
    id: "unusable_response",
    label: "Unclear response pattern",
    family: "meta",
    status: "override",
    parentId: null,
    covers: ["quality.response_check"],
    notes: "Not a jurisprudential identity. Used only when an explicit response-quality check is missed, so the system withholds a thinker match rather than manufacture false precision."
  },

  // Nature / source of law
  {
    id: "positivist",
    label: "Positivist",
    family: "source",
    status: "core",
    parentId: null,
    covers: ["source.positive_sources"],
    notes: "Fallback source-theory identity when positive-law/social-source answers dominate but no narrower positivist subtype is established."
  },
  {
    id: "inclusive_positivist",
    label: "Inclusive Positivist",
    family: "source",
    status: "adaptive",
    parentId: "positivist",
    covers: ["source.positive_sources", "source.social_practice", "source.morality_incorporated"],
    notes: "Use only after the respondent affirms that a social rule of recognition can incorporate moral criteria."
  },
  {
    id: "exclusive_positivist",
    label: "Exclusive Positivist",
    family: "source",
    status: "adaptive",
    parentId: "positivist",
    covers: ["source.positive_sources", "source.source_thesis"],
    notes: "Use only after a genuine Hart/Raz-style incorporation diagnostic; do not infer merely from hard textualism."
  },
  {
    id: "interpretivist",
    label: "Interpretivist",
    family: "source",
    status: "fallback",
    parentId: null,
    covers: ["source.principles_are_law"],
    notes: "Broader real label when principle-based nonpositivism is clear but the specifically Dworkinian package is not."
  },
  {
    id: "dworkinian",
    label: "Dworkinian",
    family: "source",
    status: "adaptive",
    parentId: "interpretivist",
    covers: ["source.principles_are_law", "source.fit_and_justification", "source.right_answer"],
    notes: "Requires more than generic moral reasoning: existing-law principles, fit/justification, and discovery rather than free creation in hard cases."
  },
  {
    id: "natural_lawyer",
    label: "Natural Lawyer",
    family: "source",
    status: "core",
    parentId: null,
    covers: ["source.moral_constraint", "source.objective_morality"],
    notes: "Modern classical-natural-law identity. Positive law's settlement function can be used to distinguish Finnis-style natural law from freer moral reading."
  },
  {
    id: "radbruchian",
    label: "Radbruchian",
    family: "source",
    status: "adaptive",
    parentId: null,
    covers: ["source.extreme_injustice"],
    notes: "Use only for the distinctive threshold view: ordinary injustice can remain law, but extreme injustice can destroy legal validity."
  },
  {
    id: "fullerian",
    label: "Fullerian",
    family: "source",
    status: "adaptive",
    parentId: null,
    covers: ["source.internal_legality"],
    notes: "Requires targeted diagnostics on publicity, prospectivity, clarity, consistency, congruence, and legality as an internal morality."
  },
  {
    id: "alexyan",
    label: "Alexyan",
    family: "source",
    status: "adaptive",
    parentId: null,
    covers: ["source.claim_to_correctness", "source.extreme_injustice", "form.proportionality"],
    notes: "Rare precise identity: dual nature/claim to correctness plus proportionality. Do not use for generic balancing."
  },

  // Interpretation / adjudicative method
  {
    id: "legal_realist",
    label: "Legal Realist",
    family: "meta",
    status: "override",
    parentId: null,
    covers: ["realism.underdetermination", "realism.extra_doctrinal", "realism.empirical_prediction"],
    notes: "Special legitimate override. Because Realism is largely descriptive, it can coexist with almost any normative axis profile."
  },
  {
    id: "pragmatist",
    label: "Pragmatist",
    family: "method",
    status: "core",
    parentId: null,
    covers: ["method.consequences", "method.workability"],
    notes: "Use when forward-looking consequences/workability recur across domains, not from one isolated balancing answer."
  },
  {
    id: "textualist",
    label: "Textualist",
    family: "method",
    status: "core",
    parentId: null,
    covers: ["constraint.textual"],
    notes: "Contextual textualism counts. Textualism is not literalism and does not itself imply originalism, rules, or judicial restraint."
  },
  {
    id: "intentionalist",
    label: "Intentionalist",
    family: "method",
    status: "adaptive",
    parentId: null,
    covers: ["constraint.intent"],
    notes: "Leading real theory of legal interpretation that the current core does not cleanly separate from purposivism. Add only after an intent-versus-purpose diagnostic."
  },
  {
    id: "purposivist",
    label: "Purposivist",
    family: "method",
    status: "core",
    parentId: null,
    covers: ["constraint.purpose", "constraint.open_construction"],
    notes: "Use when purpose, rather than subjective legislative intent, systematically drives interpretation."
  },
  {
    id: "legal_process_theorist",
    label: "Legal-Process Theorist",
    family: "method",
    status: "adaptive",
    parentId: null,
    covers: ["constraint.purpose", "method.institutional_competence", "method.reasoned_elaboration"],
    notes: "Hart-and-Sacks-style package: purposive reasoning plus institutional competence, role allocation, settlement, and reasoned elaboration."
  },
  {
    id: "interpretive_pluralist",
    label: "Interpretive Pluralist",
    family: "method",
    status: "fallback",
    parentId: null,
    covers: ["method.pluralism"],
    notes: "Real fallback when no single interpretive methodology dominates but the pattern is coherent rather than chaotic."
  },

  // Constitutional time
  {
    id: "originalist",
    label: "Originalist",
    family: "time",
    status: "core",
    parentId: null,
    covers: ["time.fixation", "time.historical_meaning"],
    notes: "Fallback parent. Do not infer textualism, expected applications, precedent skepticism, majoritarianism, or formalism."
  },
  {
    id: "public_meaning_originalist",
    label: "Public-Meaning Originalist",
    family: "time",
    status: "adaptive",
    parentId: "originalist",
    covers: ["time.fixation", "time.public_meaning", "time.semantic_fixation"],
    notes: "Use when public communicative/legal meaning at adoption controls over private drafting intentions."
  },
  {
    id: "original_intent_originalist",
    label: "Original-Intent Originalist",
    family: "time",
    status: "adaptive",
    parentId: "originalist",
    covers: ["time.fixation", "time.original_intent"],
    notes: "Use only when the respondent affirmatively privileges enactor/framer intent, not merely because public-meaning evidence is weak."
  },
  {
    id: "original_methods_originalist",
    label: "Original-Methods Originalist",
    family: "time",
    status: "adaptive",
    parentId: "originalist",
    covers: ["time.fixation", "time.original_methods"],
    notes: "McGinnis/Rappaport theory: use historically accepted legal interpretive methods for a document of the Constitution's type."
  },
  {
    id: "framework_originalist",
    label: "Framework Originalist",
    family: "time",
    status: "adaptive",
    parentId: "originalist",
    covers: ["time.fixation", "time.construction_zone", "time.framework"],
    notes: "Balkin's real label: fixed original framework with substantial legitimate later constitutional construction."
  },
  {
    id: "living_constitutionalist",
    label: "Living Constitutionalist",
    family: "time",
    status: "core",
    parentId: null,
    covers: ["time.living_content"],
    notes: "Requires acceptance that constitutional content itself may evolve, not merely new applications of fixed meaning."
  },
  {
    id: "common_law_constitutionalist",
    label: "Common-Law Constitutionalist",
    family: "time",
    status: "core",
    parentId: null,
    covers: ["time.common_law_development", "precedent.stability", "precedent.settlement"],
    notes: "Strauss-style theory: precedent and accumulated practice are themselves major components of constitutional law."
  },
  {
    id: "common_good_constitutionalist",
    label: "Common-Good Constitutionalist",
    family: "time",
    status: "adaptive",
    parentId: null,
    covers: ["source.objective_morality", "method.common_good", "time.classical_tradition"],
    notes: "Real Vermeule-associated theory, but only diagnose with targeted common-good/classical-law questions; never infer from Natural Law alone."
  },

  // Judicial review / democratic constitutional authority
  {
    id: "thayerian",
    label: "Thayerian",
    family: "posture",
    status: "adaptive",
    parentId: null,
    covers: ["posture.clear_error", "posture.majoritarian"],
    notes: "Clear-mistake/beyond-reasonable-doubt judicial deference. High Majoritarian scores alone are insufficient."
  },
  {
    id: "waldronian",
    label: "Waldronian",
    family: "posture",
    status: "adaptive",
    parentId: null,
    covers: ["posture.democratic_legitimacy", "posture.reasonable_disagreement"],
    notes: "Use when the objection to strong judicial review is specifically democratic legitimacy under functioning institutions and good-faith rights disagreement."
  },
  {
    id: "popular_constitutionalist",
    label: "Popular Constitutionalist",
    family: "posture",
    status: "adaptive",
    parentId: null,
    covers: ["posture.majoritarian", "posture.anti_judicial_supremacy", "posture.popular_authority"],
    notes: "Extreme Majoritarianism is only the unlock. The label requires independent popular/political authority over constitutional meaning."
  },
  {
    id: "departmentalist",
    label: "Departmentalist",
    family: "posture",
    status: "adaptive",
    parentId: null,
    covers: ["posture.anti_judicial_supremacy", "posture.branch_interpretation"],
    notes: "Political branches retain independent constitutional interpretive authority; this is narrower than Popular Constitutionalism."
  },
  {
    id: "elyan",
    label: "Elyan",
    family: "posture",
    status: "adaptive",
    parentId: null,
    covers: ["posture.process_reinforcement", "posture.conditional_intervention"],
    notes: "Representation-reinforcement: ordinary deference plus aggressive review when democratic processes malfunction or exclude groups."
  },
  {
    id: "bickelian",
    label: "Bickelian",
    family: "posture",
    status: "adaptive",
    parentId: null,
    covers: ["posture.passive_virtues", "posture.countermajoritarian_difficulty"],
    notes: "Use only when avoidance/passive virtues are central, not for generic restraint."
  },
  {
    id: "minimalist",
    label: "Judicial Minimalist",
    family: "posture",
    status: "core",
    parentId: null,
    covers: ["posture.passive_virtues", "remedies.incremental"],
    notes: "Broader real label when narrow decisionmaking/avoidance is clear but a specifically Bickelian theory is not."
  },

  // Structure / form
  {
    id: "formalist",
    label: "Formalist",
    family: "structure",
    status: "core",
    parentId: null,
    covers: ["separation.formalist"],
    notes: "Use when formal institutional boundaries are genuinely identity-defining. If only rule preference is strong, use a modifier instead."
  },
  {
    id: "functionalist",
    label: "Functionalist",
    family: "structure",
    status: "core",
    parentId: null,
    covers: ["separation.functionalist"],
    notes: "Established separation-of-powers category centered on workability, checks, accountability, and tolerated institutional overlap."
  },
  {
    id: "proportionalist",
    label: "Proportionalist",
    family: "form",
    status: "adaptive",
    parentId: null,
    covers: ["form.proportionality", "form.balancing"],
    notes: "Only for structured proportionality, not any respondent who likes standards or balancing."
  }
]);

globalThis.LAW_CHAMPIONS = Object.freeze([
  // Jurisprudence / source
  {
    id: "hart",
    name: "H. L. A. Hart",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["positivist", "inclusive_positivist"],
    signatureTraits: ["source.social_practice", "source.positive_sources", "source.law_runs_out"],
    antiTraits: ["source.objective_morality"],
    note: "Canonical modern positivist; especially useful for social-practice/rule-of-recognition and hard-case discretion."
  },
  {
    id: "raz",
    name: "Joseph Raz",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["exclusive_positivist", "positivist"],
    signatureTraits: ["source.source_thesis", "source.positive_sources"],
    antiTraits: ["source.morality_incorporated"],
    note: "Canonical exclusive/source-based positivist."
  },
  {
    id: "kelsen",
    name: "Hans Kelsen",
    kind: "person",
    role: "historical",
    eligibleIdentityIds: ["positivist"],
    signatureTraits: ["source.positive_sources"],
    antiTraits: [],
    note: "Major architect of modern positivism, but LAWvalues does not currently test the Pure Theory / basic-norm architecture well enough for a Kelsenian label."
  },
  {
    id: "dworkin",
    name: "Ronald Dworkin",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["dworkinian", "interpretivist"],
    signatureTraits: ["source.principles_are_law", "source.fit_and_justification", "source.right_answer", "posture.rights_trumps"],
    antiTraits: ["source.law_runs_out"],
    note: "Best champion when principles-as-existing-law and fit/justification are specifically present."
  },
  {
    id: "finnis",
    name: "John Finnis",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["natural_lawyer"],
    signatureTraits: ["source.objective_morality", "source.positive_law_settlement"],
    antiTraits: [],
    note: "Canonical modern natural-law champion; especially apt when moral law coexists with strong positive-law settlement."
  },
  {
    id: "pojanowski_walsh",
    name: "Jeffrey Pojanowski & Kevin Walsh",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["natural_lawyer", "originalist", "public_meaning_originalist"],
    signatureTraits: ["source.objective_morality", "source.positive_law_settlement", "time.fixation"],
    antiTraits: ["time.living_content"],
    note: "Special combination champion for classical natural law plus durable positive-law originalism; not a default Natural Law stand-in."
  },
  {
    id: "fuller",
    name: "Lon Fuller",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["fullerian"],
    signatureTraits: ["source.internal_legality"],
    antiTraits: [],
    note: "Use only after internal-morality-of-law diagnostics."
  },
  {
    id: "radbruch",
    name: "Gustav Radbruch",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["radbruchian"],
    signatureTraits: ["source.extreme_injustice"],
    antiTraits: ["source.every_injustice_invalidates"],
    note: "Distinctive extreme-injustice threshold champion."
  },
  {
    id: "alexy",
    name: "Robert Alexy",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["alexyan", "proportionalist"],
    signatureTraits: ["source.claim_to_correctness", "source.extreme_injustice", "form.proportionality"],
    antiTraits: ["form.rules"],
    note: "Best when nonpositivism and proportionality travel together."
  },
  {
    id: "blackstone",
    name: "William Blackstone",
    kind: "person",
    role: "historical",
    eligibleIdentityIds: ["natural_lawyer", "common_law_constitutionalist"],
    signatureTraits: ["source.objective_morality", "time.tradition", "precedent.stability"],
    antiTraits: [],
    note: "Canon/lineage champion, not a default modern middle identity; his bundle cuts across several contemporary categories."
  },
  {
    id: "aquinas",
    name: "Thomas Aquinas",
    kind: "person",
    role: "historical",
    eligibleIdentityIds: ["natural_lawyer"],
    signatureTraits: ["source.objective_morality"],
    antiTraits: [],
    note: "Foundational natural-law ancestor; usually lineage rather than closest modern champion."
  },

  // Realism / pragmatism
  {
    id: "llewellyn",
    name: "Karl Llewellyn",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["legal_realist"],
    signatureTraits: ["realism.underdetermination", "realism.law_in_action", "realism.extra_doctrinal"],
    antiTraits: [],
    note: "Best general champion of mature American Legal Realism."
  },
  {
    id: "leiter",
    name: "Brian Leiter",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["legal_realist", "positivist", "exclusive_positivist"],
    signatureTraits: ["realism.underdetermination", "realism.empirical_prediction", "realism.naturalism", "source.positive_sources"],
    antiTraits: ["source.objective_morality"],
    note: "Modern theorist of naturalized jurisprudence and American Legal Realism. Especially informative for a Realist profile that is also strongly positivist/naturalistic; not the generic stand-in for all Realists."
  },
  {
    id: "frank",
    name: "Jerome Frank",
    kind: "person",
    role: "historical",
    eligibleIdentityIds: ["legal_realist"],
    signatureTraits: ["realism.extra_doctrinal", "realism.psychological", "realism.fact_skepticism"],
    antiTraits: [],
    selectable: false,
    note: "Important Realist subtype/lineage, but the current diagnostics do not test Frank's psychological/fact-skepticism closely enough to select him as a closest champion. Promote only if those diagnostics are later added."
  },
  {
    id: "holmes",
    name: "Oliver Wendell Holmes Jr.",
    kind: "person",
    role: "historical",
    eligibleIdentityIds: ["legal_realist", "thayerian"],
    signatureTraits: ["realism.empirical_prediction", "method.experience", "posture.majoritarian"],
    antiTraits: [],
    note: "Foundational precursor and major influence on Realism; not the sole stand-in for the school."
  },
  {
    id: "posner",
    name: "Richard Posner",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["pragmatist"],
    signatureTraits: ["method.consequences", "method.workability", "form.balancing", "precedent.correction"],
    antiTraits: ["form.rules"],
    note: "Canonical champion of legal pragmatism. Do not equate every Posner-like pragmatist with Law & Economics."
  },
  {
    id: "breyer",
    name: "Stephen Breyer",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["pragmatist", "purposivist"],
    signatureTraits: ["constraint.purpose", "method.consequences", "separation.functionalist", "form.balancing"],
    antiTraits: ["constraint.textual"],
    note: "Useful judicial champion for purposive/pragmatic interpretation and functional institutional reasoning."
  },

  // Interpretation
  {
    id: "scalia",
    name: "Antonin Scalia",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["textualist", "public_meaning_originalist", "formalist"],
    signatureTraits: ["constraint.textual", "time.public_meaning", "form.rules", "separation.formalist"],
    antiTraits: ["constraint.purpose", "form.balancing"],
    note: "Excellent champion for the combined text/rules/public-meaning/formalist bundle; never the generic stand-in for all Originalists."
  },
  {
    id: "hugo_black",
    name: "Hugo Black",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["textualist", "formalist", "originalist"],
    signatureTraits: ["constraint.textual", "form.rules", "form.anti_discretion", "posture.countermajoritarian", "posture.rights_trumps"],
    antiTraits: ["form.balancing", "constraint.purpose"],
    note: "Distinctive judicial bundle: unusually text/language-bound and rule/absolutism-oriented while also strongly rights-protective. His total-incorporation theory is historically important but is not itself directly measured by LAWvalues, so it should not be used as a matching trait."
  },
  {
    id: "manning",
    name: "John Manning",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["textualist", "formalist"],
    signatureTraits: ["constraint.textual", "constraint.enacted_bargain", "separation.formalist"],
    antiTraits: ["constraint.purpose"],
    note: "Major modern textualist theorist; cleaner than Scalia when the respondent lacks Scalia's broader bundle."
  },
  {
    id: "hart_sacks",
    name: "Henry Hart & Albert Sacks",
    kind: "people",
    role: "primary",
    eligibleIdentityIds: ["legal_process_theorist", "purposivist"],
    signatureTraits: ["constraint.purpose", "method.institutional_competence", "method.reasoned_elaboration", "precedent.settlement"],
    antiTraits: [],
    note: "Canonical Legal Process champions."
  },
  {
    id: "eskridge",
    name: "William Eskridge",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["purposivist", "interpretive_pluralist"],
    signatureTraits: ["constraint.purpose", "method.pluralism", "time.dynamic_statutory"],
    antiTraits: [],
    note: "Useful for purposive/pluralist/dynamic statutory interpretation, not a default constitutional-living champion."
  },
  {
    id: "barak",
    name: "Aharon Barak",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["purposivist", "proportionalist"],
    signatureTraits: ["constraint.purpose", "form.proportionality", "posture.countermajoritarian"],
    antiTraits: ["form.rules"],
    note: "Distinctive champion for purposive interpretation plus structured proportionality and robust rights review."
  },

  // Originalism / constitutional time
  {
    id: "solum",
    name: "Lawrence Solum",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["public_meaning_originalist", "originalist"],
    signatureTraits: ["time.public_meaning", "time.semantic_fixation", "time.principle_originalism", "time.construction_zone"],
    antiTraits: ["time.original_intent"],
    note: "Champion for a specific sophisticated public-meaning/fixation/construction account, not for Originalism generally."
  },
  {
    id: "mcginnis_rappaport",
    name: "John McGinnis & Michael Rappaport",
    kind: "people",
    role: "primary",
    eligibleIdentityIds: ["original_methods_originalist"],
    signatureTraits: ["time.original_methods", "time.fixation"],
    antiTraits: [],
    note: "Primary champion pair for Original-Methods Originalism."
  },
  {
    id: "balkin",
    name: "Jack Balkin",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["framework_originalist"],
    signatureTraits: ["time.fixation", "time.framework", "time.construction_zone", "time.principle_originalism"],
    antiTraits: ["time.expected_applications"],
    note: "Primary champion for Framework Originalism / living originalism."
  },
  {
    id: "david_strauss",
    name: "David Strauss",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["common_law_constitutionalist"],
    signatureTraits: ["time.common_law_development", "precedent.stability", "precedent.settlement"],
    antiTraits: ["precedent.correctness_first"],
    note: "Very clean champion because the theory label and his scholarship closely coincide."
  },
  {
    id: "brennan",
    name: "William J. Brennan Jr.",
    kind: "person",
    role: "historical",
    eligibleIdentityIds: ["living_constitutionalist"],
    signatureTraits: ["time.living_content", "posture.countermajoritarian", "posture.rights_trumps"],
    antiTraits: [],
    note: "Recognizable judicial champion for a strong living-constitution/rights-protective profile, but not a theory-defining scholar."
  },
  {
    id: "thomas",
    name: "Clarence Thomas",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["originalist", "public_meaning_originalist", "formalist"],
    signatureTraits: ["time.fixation", "precedent.correctness_first", "precedent.correction", "separation.formalist"],
    antiTraits: ["precedent.stability"],
    note: "Champion for correctness-first / precedent-skeptical originalism; not the generic Originalist."
  },
  {
    id: "barrett",
    name: "Amy Coney Barrett",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["originalist", "public_meaning_originalist"],
    signatureTraits: ["time.fixation", "precedent.stability", "precedent.settlement"],
    antiTraits: [],
    note: "Useful champion for a more stare-decisis-sensitive originalist profile."
  },
  {
    id: "paulsen",
    name: "Michael Paulsen",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["originalist"],
    signatureTraits: ["time.fixation", "precedent.correctness_first"],
    antiTraits: ["precedent.stability"],
    note: "Theoretical champion for the claim that inconsistent precedent corrupts the underlying interpretive theory."
  },
  {
    id: "vermeule",
    name: "Adrian Vermeule",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["common_good_constitutionalist"],
    signatureTraits: ["source.objective_morality", "method.common_good", "time.classical_tradition", "separation.functionalist"],
    antiTraits: ["time.fixation"],
    note: "Use only after targeted Common-Good Constitutionalism diagnostics; Natural Law alone is not enough."
  },

  // Judicial review / democracy
  {
    id: "thayer",
    name: "James Bradley Thayer",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["thayerian"],
    signatureTraits: ["posture.clear_error", "posture.majoritarian"],
    antiTraits: ["posture.countermajoritarian"],
    note: "Canonical clear-mistake/beyond-reasonable-doubt deference champion."
  },
  {
    id: "waldron",
    name: "Jeremy Waldron",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["waldronian"],
    signatureTraits: ["posture.democratic_legitimacy", "posture.reasonable_disagreement"],
    antiTraits: ["posture.judicial_supremacy"],
    note: "Canonical democratic-legitimacy objection to strong judicial review under specified conditions."
  },
  {
    id: "kramer",
    name: "Larry Kramer",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["popular_constitutionalist"],
    signatureTraits: ["posture.anti_judicial_supremacy", "posture.popular_authority"],
    antiTraits: [],
    note: "Primary modern champion for Popular Constitutionalism."
  },
  {
    id: "tushnet",
    name: "Mark Tushnet",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["popular_constitutionalist"],
    signatureTraits: ["posture.anti_judicial_supremacy", "posture.popular_authority", "posture.weak_form"],
    antiTraits: [],
    note: "More radical / weak-form-popular-constitutional champion; do not treat as identical to Kramer."
  },
  {
    id: "ely",
    name: "John Hart Ely",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["elyan"],
    signatureTraits: ["posture.process_reinforcement", "posture.conditional_intervention"],
    antiTraits: [],
    note: "Representation-reinforcement champion; requires conditional pattern, not a point on Majoritarianism."
  },
  {
    id: "bickel",
    name: "Alexander Bickel",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["bickelian", "minimalist"],
    signatureTraits: ["posture.passive_virtues", "posture.countermajoritarian_difficulty"],
    antiTraits: [],
    note: "Passive-virtues/counter-majoritarian-difficulty champion."
  },
  {
    id: "sunstein",
    name: "Cass Sunstein",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["minimalist"],
    signatureTraits: ["posture.passive_virtues", "remedies.incremental", "method.incompletely_theorized"],
    antiTraits: [],
    note: "Modern judicial-minimalism champion distinct from Bickel's more specific passive-virtues theory."
  },

  // Structure / rules / remedies
  {
    id: "peter_strauss",
    name: "Peter Strauss",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["functionalist"],
    signatureTraits: ["separation.functionalist", "separation.combined_functions"],
    antiTraits: ["separation.formalist"],
    note: "Canonical scholarly champion for functional separation-of-powers analysis."
  },
  {
    id: "lawson",
    name: "Gary Lawson",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["formalist", "originalist"],
    signatureTraits: ["separation.formalist", "separation.nondelegation", "time.fixation"],
    antiTraits: ["separation.functionalist"],
    note: "Strong champion for structural formalism, especially when paired with originalism."
  },
  {
    id: "schauer",
    name: "Frederick Schauer",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["formalist"],
    signatureTraits: ["form.rules", "form.predictability", "form.anti_discretion", "form.edge_case_tolerance"],
    antiTraits: ["form.balancing"],
    note: "Best champion for rule-based constraint. Often better as champion/modifier than as the respondent's middle identity."
  },
  {
    id: "fiss",
    name: "Owen Fiss",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: [],
    signatureTraits: ["remedies.structural", "remedies.supervision", "posture.countermajoritarian"],
    antiTraits: ["remedies.party_specific"],
    note: "Structural-reform champion. Normally attaches to a modifier/phrase; do not invent a fake middle school around him."
  },
  {
    id: "chayes",
    name: "Abram Chayes",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: [],
    signatureTraits: ["remedies.structural", "remedies.supervision", "method.managerial_judging"],
    antiTraits: ["remedies.party_specific"],
    note: "Public-law-litigation / managerial-judge champion; ordinarily a champion of the trailing remedial phrase rather than a middle identity."
  },
  {
    id: "bray",
    name: "Samuel Bray",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: [],
    signatureTraits: ["remedies.party_specific", "remedies.incremental"],
    antiTraits: ["remedies.universal"],
    note: "Champion for plaintiff-specific traditional-equity instincts; normally modifies another identity."
  },

  // Institutional / comparative champions
  {
    id: "german_fcc",
    name: "German Federal Constitutional Court / proportionality tradition",
    kind: "institution",
    role: "institutional",
    eligibleIdentityIds: ["proportionalist"],
    signatureTraits: ["form.proportionality", "posture.countermajoritarian"],
    antiTraits: [],
    note: "Institutional/traditional champion when structured proportionality is clearer than any one personal match."
  },
  {
    id: "israeli_sc_barak",
    name: "Israeli Supreme Court (Barak era)",
    kind: "institution",
    role: "institutional",
    eligibleIdentityIds: ["proportionalist", "purposivist"],
    signatureTraits: ["form.proportionality", "constraint.purpose", "posture.countermajoritarian"],
    antiTraits: [],
    note: "Use only with the era/doctrine qualifier; never as a generic synonym for judicial activism."
  }
]);

globalThis.LAW_CHAMPION_MATCHING_RULES = Object.freeze({
  selectAfterIdentity: true,
  requireIdentityCompatibilityWhenPossible: true,
  allowTraitOnlyChampions: true,
  minimumDistinctiveTraits: 2,
  preferSpecificChampionOverFamousChampion: true,
  requireMarginalExplanatoryValue: true,
  pruneRedundantChampions: true,
  doNotForceChampion: true,
  ambiguityRule: "If the leading champion is not materially better supported than the next eligible champion, show multiple intellectual relatives or no single champion.",
  explanationRule: "A champion illustrates a respondent's version of an identity; it does not define the identity itself.",
  marginalCoverageRule: "Do not add or select a champion merely because the figure is canonical. The champion must explain a measurable combination not already captured as well by the respondent's real identity and the existing champion pool. If another champion covers the same measured region more directly, keep the redundant figure as lineage rather than a selectable match."
});
