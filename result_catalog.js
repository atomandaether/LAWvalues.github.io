/* Internal result-identity and champion catalog.
   The public classifier uses these real jurisprudential identities after the 93-item
   core; personality matching is separate and deliberately sparse. */

globalThis.LAW_RESULT_IDENTITIES = Object.freeze([
  {
    id: "incoherent_response",
    label: "Inconsistent response pattern",
    family: "meta",
    status: "override",
    parentId: null,
    covers: ["quality.incoherence"],
    notes: "Not a jurisprudential school. Used conservatively when direct contradictions appear across distinct jurisprudential domains."
  },
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
    id: "nonpositivist",
    label: "Non-positivist",
    family: "source",
    status: "fallback",
    broadFallback: true,
    parentId: null,
    covers: ["source.nonpositive_sources"],
    notes: "Broad last-resort fallback when social-source positivism is rejected but no narrower non-positivist theory or comparably strong middle-level identity can be diagnosed honestly."
  },
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
    public: false,
    parentId: null,
    covers: ["source.principles_are_law"],
    notes: "Internal parent for principle-based nonpositivism. Public results should prefer Dworkinian or another genuine middle-level neighbor rather than showing Interpretivist as a competing noun."
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
    id: "moral_impact_theorist",
    label: "Greenbergian",
    family: "source",
    status: "adaptive",
    parentId: null,
    covers: ["source.moral_impact", "source.one_system"],
    notes: "Greenberg-style nonpositivism: legal institutions change the moral rights and obligations of people, and the resulting moral obligations are the legal obligations."
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
    public: false,
    parentId: "proportionalist",
    covers: ["source.claim_to_correctness", "source.extreme_injustice", "form.proportionality"],
    notes: "Internal/legacy subtype only. Public results should use Proportionalist as the noun, surface the nonpositivist/correctness package as a modifier twist, and let Robert Alexy remain the champion-level match."
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
    label: "Legal Process Jurist",
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
    covers: ["method.pluralism", "method.modal_pluralism"],
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
    public: false,
    parentId: "originalist",
    covers: ["time.fixation", "time.original_methods"],
    notes: "Internal/legacy theory label only. Public results use Public-Meaning Originalist; Original Methods evidence routes to the McGinnis/Rappaport champion unit."
  },
  {
    id: "framework_originalist",
    label: "Framework Originalist",
    family: "time",
    status: "adaptive",
    public: false,
    parentId: "originalist",
    covers: ["time.fixation", "time.construction_zone", "time.framework"],
    notes: "Internal/legacy theory label only. Public results use New Public-Meaning Originalist; framework evidence routes to Jack Balkin at champion level."
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
    covers: ["posture.majoritarian", "posture.democratic_legitimacy", "posture.reasonable_disagreement"],
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
    public: false,
    parentId: "minimalist",
    covers: ["posture.passive_virtues", "posture.countermajoritarian_difficulty"],
    notes: "Internal/legacy subtype only. Public results should use Judicial Minimalist as the noun, surface passive-virtues/avoidance as a modifier twist, and let Alexander Bickel remain the champion-level match."
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
    id: "greenberg",
    name: "Mark Greenberg",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["moral_impact_theorist", "nonpositivist"],
    signatureTraits: ["source.moral_impact", "source.one_system"],
    antiTraits: ["source.source_thesis", "source.fit_and_justification"],
    note: "Primary champion of Moral Impact Theory: institutional legal actions matter because of the moral rights and obligations they generate."
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
    eligibleIdentityIds: ["proportionalist"],
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
  // Champion units deliberately group figures whose differences are below the
  // resolution of a lay judge-type quiz.  Separate units represent materially
  // different adjudicative styles, not merely separate famous names.
  {
    id: "bork_berger",
    name: "Robert Bork / Raoul Berger",
    kind: "people",
    role: "primary",
    eligibleIdentityIds: ["original_intent_originalist", "originalist"],
    signatureTraits: ["time.original_intent", "time.no_construction", "posture.majoritarian"],
    antiTraits: ["time.intent_as_meaning", "time.construction_zone"],
    note: "First-generation Original Intent: historical intention paired with strong judicial constraint/restraint and little legitimate construction."
  },
  {
    id: "alexander_kay_prakash",
    name: "Larry Alexander / Richard Kay / Saikrishna Prakash",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["original_intent_originalist", "originalist"],
    signatureTraits: ["time.original_intent", "time.intent_as_meaning"],
    antiTraits: ["time.public_meaning"],
    note: "Modern strong intentionalism: authorial/enactor intention controls because recovering intended communication is what interpretation fundamentally seeks."
  },
  {
    id: "whittington",
    name: "Keith Whittington",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["original_intent_originalist", "originalist"],
    signatureTraits: ["time.original_intent", "time.construction_zone"],
    antiTraits: ["time.public_meaning"],
    note: "The distinctive Original-Intent plus construction champion; this is the OI branch of the New Originalist movement."
  },
  {
    id: "solum",
    name: "Lawrence Solum",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["public_meaning_originalist", "originalist"],
    signatureTraits: ["time.public_meaning", "time.semantic_fixation", "time.construction_zone", "time.principle_originalism"],
    antiTraits: ["time.original_intent", "time.original_methods"],
    note: "New OPM champion for semantic fixation and a genuine but constrained interpretation/construction distinction."
  },
  {
    id: "barnett_bernick",
    name: "Randy Barnett / Evan Bernick",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["public_meaning_originalist", "originalist"],
    signatureTraits: ["time.public_meaning", "time.construction_zone", "posture.rights_trumps"],
    antiTraits: ["posture.majoritarian"],
    note: "New OPM champion unit for rights-protective / good-faith constitutional construction."
  },
  {
    id: "balkin",
    name: "Jack Balkin",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["public_meaning_originalist", "originalist"],
    signatureTraits: ["time.public_meaning", "time.construction_zone", "time.principle_originalism", "time.common_law_development"],
    antiTraits: ["time.expected_applications"],
    note: "New OPM champion for fixed framework plus comparatively extensive legitimate later constitutional construction and development."
  },
  {
    id: "scalia_manning",
    name: "Antonin Scalia / John Manning",
    kind: "people",
    role: "primary",
    eligibleIdentityIds: ["public_meaning_originalist", "originalist", "textualist", "formalist"],
    signatureTraits: ["time.public_meaning", "constraint.textual", "form.rules", "form.anti_discretion"],
    antiTraits: ["time.construction_zone", "constraint.purpose"],
    note: "Mainline text-and-rule OPM unit: public/legal meaning, strong textual constraint, rules, and comparatively low judicial discretion."
  },
  {
    id: "mcginnis_rappaport",
    name: "John McGinnis / Michael Rappaport",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["public_meaning_originalist", "originalist"],
    signatureTraits: ["time.original_methods", "time.fixation", "time.no_construction"],
    antiTraits: ["time.construction_zone"],
    note: "Original Methods champion unit: historically accepted legal interpretive methods determine original meaning and minimize a free-standing construction zone."
  },
  {
    id: "mcconnell_green",
    name: "Michael McConnell / Christopher Green",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["public_meaning_originalist", "originalist"],
    signatureTraits: ["time.public_meaning", "time.principle_originalism"],
    antiTraits: ["time.expected_applications"],
    note: "Principle/application champion unit: fixed historical principles can require applications the adopters did not expect."
  },
  {
    id: "amar",
    name: "Akhil Reed Amar",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["public_meaning_originalist", "originalist"],
    signatureTraits: ["time.public_meaning", "time.intratextualism", "method.holistic_constitution"],
    antiTraits: [],
    note: "Holistic/intratextual OPM champion: read clauses through recurring constitutional language, architecture, and the document as a whole."
  },
  {
    id: "thomas_paulsen",
    name: "Clarence Thomas / Michael Stokes Paulsen",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["public_meaning_originalist", "originalist", "formalist"],
    signatureTraits: ["time.fixation", "precedent.correctness_first", "precedent.correction"],
    antiTraits: ["precedent.stability"],
    note: "Correction-first/restorationist unit: entrenched precedent yields comparatively readily to the best account of original constitutional law."
  },
  {
    id: "barrett",
    name: "Amy Coney Barrett",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["public_meaning_originalist", "originalist"],
    signatureTraits: ["time.fixation", "precedent.stability", "precedent.settlement"],
    antiTraits: ["precedent.correctness_first"],
    note: "Precedent-accommodating OPM champion: original meaning remains authoritative while stare decisis and legal settlement retain substantial force."
  },
  {
    id: "natural_law_originalists",
    name: "Jeffrey Pojanowski / Kevin Walsh / J. Joel Alicea / Lee Strang",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["public_meaning_originalist", "originalist", "natural_lawyer"],
    signatureTraits: ["time.fixation", "source.objective_morality", "source.positive_law_settlement"],
    antiTraits: ["time.living_content"],
    note: "Natural-law-grounded originalist unit: classical natural law explains the authority and settlement function of promulgated original constitutional law."
  },

  // Adjacent constitutional-time champions
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
    eligibleIdentityIds: ["minimalist"],
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
    eligibleIdentityIds: ["formalist"],
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
