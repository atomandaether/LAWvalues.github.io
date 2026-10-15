/* Internal result-identity and champion catalog.
   The public classifier uses these real jurisprudential identities after the 88-item
   core; personality matching is separate and deliberately sparse. */

globalThis.LAW_RESULT_IDENTITIES = Object.freeze([
  {
    id: "outcome_driven_left",
    label: "Left-Partisan Judging",
    family: "meta",
    status: "override",
    parentId: null,
    covers: ["quality.partisan_outcomes"],
    notes: "Exceptional outcome-selection override after at least three politically matched judicial principles reverse in a left-favoring direction; never a jurist identity."
  },
  {
    id: "outcome_driven_right",
    label: "Right-Partisan Judging",
    family: "meta",
    status: "override",
    parentId: null,
    covers: ["quality.partisan_outcomes"],
    notes: "Exceptional outcome-selection override after at least three politically matched judicial principles reverse in a right-favoring direction; never a jurist identity."
  },
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
  {
    id: "mixed_jurisprudence",
    label: "Mixed Jurisprudence",
    family: "fallback",
    status: "fallback",
    public: false,
    parentId: null,
    covers: ["method.low_theory_space"],
    notes: "Honest no-dominant-school fallback. Used only when no affirmative public jurisprudential identity is established; it must not masquerade as Interpretive Pluralism."
  },

  // Nature / source of law
  {
    id: "nonpositivist",
    label: "Non-Positivist",
    family: "source",
    status: "adaptive",
    parentId: null,
    covers: ["source.nonpositive_sources"],
    notes: "Public umbrella only when a distinctive nonpositivist subtype is affirmatively established below the noun layer, such as Moral Impact, Moral Practice, or Extreme-Injustice theory. A merely nonpositive Source score is not enough."
  },
  {
    id: "positivist",
    label: "Positivist",
    family: "source",
    status: "core",
    parentId: null,
    covers: ["source.positive_sources"],
    notes: "Public positivist noun. Inclusive, Exclusive, and Normative Positivism are substantive modifier-level branches rather than separate nouns."
  },
  {
    id: "inclusive_positivist",
    label: "Inclusive Positivist",
    family: "source",
    status: "adaptive",
    public: false,
    parentId: "positivist",
    covers: ["source.positive_sources", "source.social_practice", "source.morality_incorporated"],
    notes: "Internal/legacy subtype used for compatibility and routing. Public results use Positivist with the Inclusive modifier."
  },
  {
    id: "exclusive_positivist",
    label: "Exclusive Positivist",
    family: "source",
    status: "adaptive",
    public: false,
    parentId: "positivist",
    covers: ["source.positive_sources", "source.source_thesis"],
    notes: "Internal/legacy subtype used for compatibility and routing. Public results use Positivist with the Exclusive modifier."
  },
  {
    id: "interpretivist",
    label: "Interpretivist",
    family: "source",
    status: "adaptive",
    parentId: null,
    covers: ["source.principles_are_law", "source.fit_and_justification", "source.right_answer"],
    notes: "Public noun for legal interpretivism: institutional practice bears on law through the principles that best justify it. Dworkinian is champion-level/internal rather than a separate public noun."
  },
  {
    id: "dworkinian",
    label: "Dworkinian",
    family: "source",
    status: "adaptive",
    public: false,
    parentId: "interpretivist",
    covers: ["source.principles_are_law", "source.fit_and_justification", "source.right_answer"],
    notes: "Internal/legacy subtype only. Public results use Interpretivist; Dworkin/Stavropoulos are champion-level representatives."
  },
  {
    id: "moral_impact_theorist",
    label: "Moral-Impact Non-Positivist",
    family: "source",
    status: "adaptive",
    public: false,
    parentId: "nonpositivist",
    covers: ["source.moral_impact", "source.one_system"],
    notes: "Internal theory record only. Public results use Non-Positivist with the descriptive Moral-Impact modifier and Mark Greenberg as champion."
  },
  {
    id: "natural_lawyer",
    label: "Natural Lawyer",
    family: "source",
    status: "core",
    parentId: null,
    covers: ["source.moral_constraint", "source.objective_morality", "source.positive_law_settlement"],
    notes: "Broad natural-law noun. The central modern champion unit combines objective morality with a substantial settlement and coordination role for positive law."
  },
  {
    id: "radbruchian",
    label: "Extreme-Injustice Non-Positivist",
    family: "source",
    status: "adaptive",
    public: false,
    parentId: "nonpositivist",
    covers: ["source.extreme_injustice"],
    notes: "Internal theory record only. Public results use Non-Positivist with the descriptive Extreme-Injustice modifier and the Radbruch/Soper champion unit."
  },
  {
    id: "fullerian",
    label: "Fullerian",
    family: "source",
    status: "adaptive",
    parentId: null,
    covers: ["source.internal_legality"],
    notes: "Public noun for Fuller's internal morality of legality: publicity, prospectivity, clarity, consistency, possibility of compliance, stability, and congruence are constitutive virtues of legality."
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
    notes: "Special legitimate override because American Legal Realism is substantially descriptive/empirical and can coexist with many normative axis positions."
  },
  {
    id: "pragmatist",
    label: "Pragmatist",
    family: "method",
    status: "core",
    parentId: null,
    covers: ["method.consequences", "method.workability"],
    notes: "Forward-looking consequences and practical workability are the primary adjudicative fixation rather than a single source- or purpose-bound interpretive theory."
  },
  {
    id: "textualist",
    label: "Textualist",
    family: "method",
    status: "core",
    parentId: null,
    covers: ["constraint.textual"],
    notes: "The enacted linguistic text is the primary interpretive fixation. Contextual textualism counts; Textualism does not itself imply Originalism, Formalism, or judicial restraint."
  },
  {
    id: "intentionalist",
    label: "Intentionalist",
    family: "method",
    status: "adaptive",
    parentId: null,
    covers: ["constraint.intent"],
    notes: "Interpretation is centrally oriented toward the legislature/enactor's intended meaning. Imaginative Reconstruction is a substantive modifier rather than a separate noun."
  },
  {
    id: "purposivist",
    label: "Purposivist",
    family: "method",
    status: "core",
    parentId: null,
    covers: ["constraint.purpose", "constraint.open_construction"],
    notes: "The statute or provision's objective purpose is the primary interpretive fixation rather than subjective intent or text alone."
  },
  {
    id: "legal_process_theorist",
    label: "Legal Process Jurist",
    family: "method",
    status: "adaptive",
    parentId: null,
    covers: ["constraint.purpose", "method.institutional_competence", "method.reasoned_elaboration"],
    notes: "Institutional settlement, competence, role allocation, and reasoned elaboration distinguish Legal Process from generic Purposivism."
  },
  {
    id: "interpretive_pluralist",
    label: "Interpretive Pluralist",
    family: "method",
    status: "adaptive",
    parentId: null,
    covers: ["method.pluralism", "method.modal_pluralism"],
    notes: "A real methodological identity: multiple forms of legal argument are legitimately available rather than one method controlling every hard case. Practical Reasoning is a substantive modifier."
  },
  {
    id: "sociological_jurist",
    label: "Sociological Jurist",
    family: "method",
    status: "adaptive",
    parentId: null,
    covers: ["method.social_interests", "method.law_in_action"],
    notes: "Sociological Jurisprudence: judges should attend to law in action, competing social interests, and the actual social operation of legal rules."
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
    notes: "Internal/legacy theory label only. Public results use Public-Meaning New Originalist; framework evidence routes to Jack Balkin at champion level."
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
    id: "legal_constitutionalist",
    label: "Legal Constitutionalist",
    family: "posture",
    status: "adaptive",
    public: false,
    parentId: null,
    covers: ["posture.countermajoritarian", "posture.rights_trumps", "posture.judicial_supremacy", "posture.judicial_independence"],
    notes: "Internal authority descriptor only. Strong-form judicial constitutional authority is too broad to function as a public jurisprudential noun; retain these traits for explanation and champion matching."
  },
  {
    id: "political_constitutionalist",
    label: "Political Constitutionalist",
    family: "posture",
    status: "adaptive",
    parentId: null,
    covers: ["posture.majoritarian", "posture.democratic_legitimacy", "posture.reasonable_disagreement"],
    notes: "Functioning representative institutions retain the stronger claim to final constitutional authority under reasonable rights disagreement."
  },
  {
    id: "thayerian",
    label: "Thayerian",
    family: "posture",
    status: "adaptive",
    parentId: null,
    covers: ["posture.clear_error", "posture.majoritarian"],
    notes: "Courts retain judicial review but invalidate legislation only outside the range of reasonable constitutional judgment."
  },
  {
    id: "weak_form_constitutionalist",
    label: "Weak-Form Constitutionalist",
    family: "posture",
    status: "adaptive",
    public: false,
    parentId: null,
    covers: ["posture.dialogic", "posture.weak_form"],
    notes: "Internal institutional-design descriptor only. Weak-form review is a model of judicial review that can coexist with multiple jurisprudential identities, not a public noun."
  },
  {
    id: "popular_constitutionalist",
    label: "Popular Constitutionalist",
    family: "posture",
    status: "adaptive",
    parentId: null,
    covers: ["posture.majoritarian", "posture.anti_judicial_supremacy", "posture.popular_authority"],
    notes: "Ultimate constitutional authority remains with the people and democratic constitutional politics rather than becoming the exclusive property of courts."
  },
  {
    id: "departmentalist",
    label: "Departmentalist",
    family: "posture",
    status: "adaptive",
    parentId: null,
    covers: ["posture.anti_judicial_supremacy", "posture.branch_interpretation"],
    notes: "Coordinate governmental branches retain independent good-faith constitutional interpretive authority within their own institutional functions."
  },
  {
    id: "political_process_jurist",
    label: "Political Process Jurist",
    family: "posture",
    status: "adaptive",
    parentId: null,
    covers: ["posture.process_reinforcement", "posture.conditional_intervention"],
    notes: "Ordinary substantive disagreements are generally left to politics, with stronger judicial intervention when democratic processes malfunction or exclude groups."
  },
  {
    id: "minimalist",
    label: "Judicial Minimalist",
    family: "posture",
    status: "core",
    parentId: null,
    covers: ["method.narrow_shallow", "remedies.incremental", "posture.passive_virtues"],
    notes: "Narrow, shallow, incompletely theorized adjudication that resolves no more than necessary."
  },
  {
    id: "waldronian",
    label: "Waldronian",
    family: "posture",
    status: "adaptive",
    public: false,
    parentId: "political_constitutionalist",
    covers: ["posture.democratic_legitimacy", "posture.reasonable_disagreement"],
    notes: "Legacy/internal alias. Public output uses Political Constitutionalist."
  },
  {
    id: "elyan",
    label: "Elyan",
    family: "posture",
    status: "adaptive",
    public: false,
    parentId: "political_process_jurist",
    covers: ["posture.process_reinforcement", "posture.conditional_intervention"],
    notes: "Legacy/internal alias. Public output uses Political Process Jurist."
  },
  {
    id: "bickelian",
    label: "Bickelian",
    family: "posture",
    status: "adaptive",
    public: false,
    parentId: "minimalist",
    covers: ["posture.passive_virtues", "posture.countermajoritarian_difficulty"],
    notes: "Internal subtype only. Public results use Judicial Minimalist with the Passive-virtues modifier and Alexander Bickel as champion."
  },

  // Structure / form
  {
    id: "formalist",
    label: "Formalist",
    family: "structure",
    status: "core",
    parentId: null,
    covers: ["separation.formalist", "form.rules", "form.anti_discretion"],
    notes: "Public Formalism covers either strongly categorical institutional structure or strongly rule-centered anti-discretion jurisprudence when that commitment is itself the respondent's primary fixation."
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
    eligibleIdentityIds: ["positivist"],
    signatureTraits: ["source.social_practice", "source.positive_sources", "source.law_runs_out"],
    antiTraits: ["source.objective_morality"],
    note: "Baseline modern positivist champion: social rule of recognition, open texture, and genuine hard-case discretion."
  },
  {
    id: "coleman_waluchow_kramer",
    name: "Jules Coleman / Matthew Kramer",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["positivist"],
    signatureTraits: ["source.positive_sources", "source.morality_incorporated"],
    antiTraits: ["source.source_thesis"],
    note: "Systematic Inclusive Positivist champion unit: socially grounded validity criteria can incorporate genuine moral standards."
  },
  {
    id: "raz_shapiro_marmor",
    name: "Joseph Raz",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["positivist"],
    signatureTraits: ["source.positive_sources", "source.source_thesis"],
    antiTraits: ["source.morality_incorporated"],
    note: "Exclusive Positivist champion: legal validity remains identifiable through social-source facts rather than moral merits; Planning Theory is separately represented by Shapiro."
  },
  {
    id: "campbell_waldron_schauer",
    name: "Tom Campbell",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["positivist"],
    signatureTraits: ["source.positive_sources", "source.normative_positivism", "form.anti_discretion", "posture.majoritarian"],
    antiTraits: ["source.objective_morality"],
    note: "Normative/Ethical Positivist unit: there are moral-democratic reasons for legal institutions to minimize merits-based judicial lawmaking and preserve source-based settlement."
  },
  {
    id: "kelsen",
    name: "Hans Kelsen",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["positivist"],
    signatureTraits: ["source.normative_hierarchy", "source.basic_norm"],
    antiTraits: ["source.objective_morality", "source.command_theory", "source.planning_theory"],
    note: "Pure Theory champion: legal validity is organized through a hierarchy of authorizing norms culminating in a presupposed basic norm."
  },
  {
    id: "austin",
    name: "John Austin",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["positivist"],
    signatureTraits: ["source.command_theory", "source.sovereign"],
    antiTraits: ["source.basic_norm", "source.planning_theory"],
    note: "Command-theory champion: law is fundamentally sovereign command backed by sanction and habitual obedience."
  },
  {
    id: "shapiro",
    name: "Scott Shapiro",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["positivist"],
    signatureTraits: ["source.planning_theory", "source.source_thesis"],
    antiTraits: ["source.morality_incorporated", "source.command_theory", "source.basic_norm"],
    note: "Planning Theory champion: legal systems are systems of shared social planning rather than merely Hartian rules or sovereign commands."
  },
  {
    id: "dworkin_stavropoulos",
    name: "Ronald Dworkin",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["interpretivist"],
    signatureTraits: ["source.principles_are_law", "source.fit_and_justification", "source.right_answer"],
    antiTraits: ["source.law_runs_out"],
    note: "Central Interpretivist champion unit: legal rights are determined through the morally best justification of institutional legal practice rather than source criteria alone."
  },
  {
    id: "greenberg_hershovitz",
    name: "Mark Greenberg / Scott Hershovitz",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["nonpositivist"],
    signatureTraits: ["source.one_system"],
    antiTraits: ["source.source_thesis"],
    note: "Shared moral-rights approach: either moral-impact or moral-practice evidence supports this combined unit. Greenberg's legally-proper-way account and Hershovitz's challenge to a distinct metaphysical account remain different views."
  },
  {
    id: "greenberg",
    name: "Mark Greenberg",
    kind: "person",
    role: "historical",
    supersededBy: "greenberg_hershovitz",
    eligibleIdentityIds: ["nonpositivist"],
    signatureTraits: ["source.moral_impact", "source.one_system"],
    antiTraits: ["source.source_thesis", "source.fit_and_justification"],
    note: "Moral-Impact champion: institutional legal action changes the moral situation, and the resulting moral obligations constitute law."
  },
  {
    id: "hershovitz",
    name: "Scott Hershovitz",
    kind: "person",
    role: "historical",
    supersededBy: "greenberg_hershovitz",
    eligibleIdentityIds: ["nonpositivist"],
    signatureTraits: ["source.one_system", "source.moral_practice"],
    antiTraits: ["source.source_thesis"],
    note: "Moral-Practice champion: legal claims are ultimately claims about genuine moral rights and responsibilities rather than a distinct source-generated domain of legal obligation."
  },
  {
    id: "finnis_murphy_george",
    name: "John Finnis",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["natural_lawyer"],
    signatureTraits: ["source.objective_morality", "source.positive_law_settlement"],
    antiTraits: ["source.principles_are_law"],
    note: "Central modern Natural Law unit: objective moral order matters while positive law performs a genuine settlement, coordination, and institutional-authority function."
  },
  {
    id: "moore_strong_natural_law",
    name: "Michael S. Moore",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["natural_lawyer"],
    signatureTraits: ["source.objective_morality", "source.strong_natural_law"],
    antiTraits: ["source.positive_law_settlement"],
    note: "Strong Natural Law champion: at least some serious normative defects can defeat legal validity itself, rather than merely making an otherwise valid law defective."
  },
  {
    id: "fuller",
    name: "Lon Fuller",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["fullerian"],
    signatureTraits: ["source.internal_legality"],
    antiTraits: [],
    note: "Canonical Fullerian champion for the internal morality/principles of legality."
  },
  {
    id: "radbruch_soper",
    name: "Gustav Radbruch / Philip Soper",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["nonpositivist"],
    signatureTraits: ["source.extreme_injustice"],
    antiTraits: ["source.every_injustice_invalidates"],
    note: "Extreme-Injustice champion unit: ordinary injustice need not erase legality, but sufficiently grave injustice can defeat a norm's legal status."
  },
  {
    id: "blackstone",
    name: "William Blackstone",
    kind: "person",
    role: "historical",
    eligibleIdentityIds: ["natural_lawyer", "common_law_constitutionalist"],
    signatureTraits: ["source.objective_morality", "time.tradition", "precedent.stability"],
    antiTraits: [],
    note: "Natural-law/common-law lineage rather than a default modern champion."
  },
  {
    id: "aquinas",
    name: "Thomas Aquinas",
    kind: "person",
    role: "historical",
    eligibleIdentityIds: ["natural_lawyer"],
    signatureTraits: ["source.objective_morality"],
    antiTraits: [],
    note: "Foundational natural-law lineage rather than a closest modern champion."
  },

  // Interpretation / adjudicative style
  {
    id: "llewellyn",
    name: "Karl Llewellyn",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["legal_realist"],
    signatureTraits: ["realism.underdetermination", "realism.law_in_action", "realism.extra_doctrinal"],
    antiTraits: ["realism.fact_skepticism", "realism.functional_anti_conceptual"],
    note: "Main mature-American-Realist champion: rule skepticism, situation sense, law in action, and attention to actual institutional behavior."
  },
  {
    id: "felix_cohen",
    name: "Felix S. Cohen",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["legal_realist"],
    signatureTraits: ["realism.underdetermination", "realism.functional_anti_conceptual"],
    antiTraits: ["realism.fact_skepticism"],
    note: "Functional/anti-conceptual Realist: strip away abstract doctrinal labels and ask what legal concepts actually do and which normative choices they conceal."
  },
  {
    id: "frank",
    name: "Jerome Frank",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["legal_realist"],
    signatureTraits: ["realism.extra_doctrinal", "realism.psychological", "realism.fact_skepticism"],
    antiTraits: [],
    note: "Fact-skeptical Realist: uncertainty arises not only from rules but from trial facts, credibility, psychology, and factfinding."
  },
  {
    id: "leiter",
    name: "Brian Leiter",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["legal_realist", "positivist"],
    signatureTraits: ["realism.underdetermination", "realism.empirical_prediction", "source.source_thesis"],
    antiTraits: ["realism.fact_skepticism", "realism.functional_anti_conceptual"],
    note: "Cross-cutting Realist/Positivist specialist: empirical explanation of adjudication and rational indeterminacy are combined with a positivist account of law."
  },
  {
    id: "posner",
    name: "Richard Posner",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["pragmatist"],
    signatureTraits: ["method.consequences", "method.workability", "precedent.correction"],
    antiTraits: ["form.rules"],
    note: "Forward-looking consequential/practical Pragmatism."
  },
  {
    id: "guido_calabresi",
    name: "Guido Calabresi",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["pragmatist", "common_law_constitutionalist", "interpretive_pluralist"],
    signatureTraits: ["method.statutory_obsolescence", "method.second_look", "method.common_law_statutory_updating"],
    antiTraits: ["constraint.enacted_bargain"],
    note: "Statutory-obsolescence specialist: obsolete statutes may justify common-law-like updating or a second-look mechanism that requires contemporary political reaffirmation."
  },
  {
    id: "cardozo",
    name: "Benjamin Cardozo",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["pragmatist", "common_law_constitutionalist"],
    signatureTraits: ["method.consequences", "precedent.stability", "time.common_law_development"],
    antiTraits: [],
    note: "Bounded common-law Pragmatism: creative hard-case judging constrained by precedent, custom, continuity, and incremental development."
  },
  {
    id: "hugo_black",
    name: "Hugo Black",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["textualist", "formalist"],
    signatureTraits: ["constraint.textual", "form.rules", "form.anti_discretion", "posture.rights_trumps"],
    antiTraits: ["form.balancing", "constraint.purpose"],
    note: "Text-bound categorical judging plus unusually aggressive enforcement of expressly protected rights."
  },
  {
    id: "scalia_manning_easterbrook",
    name: "John Manning",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["textualist"],
    signatureTraits: ["constraint.textual", "constraint.enacted_bargain", "form.anti_discretion"],
    antiTraits: ["constraint.purpose"],
    note: "Mainline/New Textualist unit: enacted text, enacted compromise, anti-legislative-history instincts, and strong resistance to judicial repair."
  },
  {
    id: "kavanaugh_barrett",
    name: "Brett Kavanaugh",
    kind: "person",
    role: "historical",
    eligibleIdentityIds: ["textualist", "public_meaning_originalist", "originalist"],
    signatureTraits: ["constraint.textual", "constraint.contextual_textualism", "constraint.best_reading_context", "separation.independent_judicial_interpretation"],
    antiTraits: ["constraint.intent"],
    note: "Modern best-reading/context-sensitive Textualism: ordinary usage and whole-text context without abandoning enacted text as the governing object."
  },
  {
    id: "kagan",
    name: "Elena Kagan",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["textualist"],
    signatureTraits: ["constraint.textual", "constraint.contextual_textualism", "constraint.best_reading_context", "precedent.settlement", "separation.interpretive_accommodation"],
    antiTraits: ["separation.independent_judicial_interpretation"],
    note: "Institutionalist contextual Textualism: text and whole-statute context remain central while precedent, delegated institutional responsibility, expertise, and administrability retain substantial weight."
  },
  {
    id: "ekins_intentionalism",
    name: "Richard Ekins",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["intentionalist"],
    signatureTraits: ["constraint.intent", "constraint.actual_group_intent"],
    antiTraits: ["constraint.imaginative_reconstruction"],
    note: "Main modern Intentionalist champion: legislature as a genuine group agent with an intended meaning inferable from the enacted choice in context."
  },
  {
    id: "katzmann",
    name: "Robert A. Katzmann",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["intentionalist", "legal_process_theorist", "purposivist"],
    signatureTraits: ["constraint.intent", "method.congress_aware_interpretation", "method.reliable_legislative_history"],
    antiTraits: ["constraint.imaginative_reconstruction", "constraint.enacted_bargain"],
    note: "Congress-aware Intentionalism: reliable legislative history and actual congressional process are legitimate evidence of statutory meaning because interpretation should respect how Congress itself makes and communicates law."
  },
  {
    id: "hand_posner_imaginative",
    name: "Learned Hand / early Richard Posner",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["intentionalist"],
    signatureTraits: ["constraint.intent", "constraint.imaginative_reconstruction"],
    antiTraits: ["constraint.actual_group_intent"],
    note: "Imaginative Reconstruction: ask what the legislature would have intended had it confronted the unforeseen case."
  },
  {
    id: "breyer",
    name: "Stephen Breyer",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["purposivist", "pragmatist", "functionalist"],
    signatureTraits: ["constraint.purpose", "method.workability", "separation.functionalist"],
    antiTraits: ["constraint.textual"],
    note: "Practical American Purposivism: purpose, consequences, administrability, and institutional workability."
  },
  {
    id: "barak",
    name: "Aharon Barak",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["purposivist", "proportionalist"],
    signatureTraits: ["constraint.purpose", "form.proportionality", "posture.rights_trumps"],
    antiTraits: ["form.rules"],
    note: "Systematic purposive interpretation combined with proportionality and robust rights review."
  },
  {
    id: "hart_sacks",
    name: "Henry Hart / Albert Sacks",
    kind: "people",
    role: "primary",
    eligibleIdentityIds: ["legal_process_theorist"],
    signatureTraits: ["method.institutional_competence", "method.reasoned_elaboration", "constraint.purpose"],
    antiTraits: ["method.neutral_principles"],
    note: "Core Legal Process: institutional settlement and competence followed by purposive reasoned elaboration."
  },
  {
    id: "mashaw",
    name: "Jerry L. Mashaw",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["legal_process_theorist", "functionalist"],
    signatureTraits: ["method.agency_interpretive_autonomy", "method.administrative_reason_giving", "method.institutional_competence", "separation.interpretive_accommodation"],
    antiTraits: ["separation.independent_judicial_interpretation"],
    note: "Administrative Legal Process: agency statutory interpretation is itself a disciplined legal enterprise with institutional competence, internal norms, and reason-giving obligations."
  },
  {
    id: "wechsler",
    name: "Herbert Wechsler",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["legal_process_theorist"],
    signatureTraits: ["method.reasoned_elaboration", "method.neutral_principles"],
    antiTraits: [],
    note: "Neutral-principles Legal Process: constitutional decisions should rest on generalizable principles that transcend the immediate parties and desired outcome."
  },
  {
    id: "bobbitt",
    name: "Philip Bobbitt",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["interpretive_pluralist"],
    signatureTraits: ["method.modal_pluralism"],
    antiTraits: ["method.practical_reasoning"],
    note: "Modal constitutional pluralism: several recognized modalities of constitutional argument are legitimately available."
  },
  {
    id: "charles_black",
    name: "Charles L. Black Jr.",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["positivist", "interpretive_pluralist", "common_law_constitutionalist", "living_constitutionalist", "mixed_jurisprudence"],
    signatureTraits: ["method.structural_inference", "method.holistic_constitution"],
    antiTraits: [],
    note: "Champion-level structural constitutional inference: architecture and institutional relationships can themselves generate constitutional implications. No Structuralist noun is created."
  },
  {
    id: "eskridge_frickey",
    name: "William Eskridge / Philip Frickey",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["interpretive_pluralist"],
    signatureTraits: ["method.pluralism", "method.practical_reasoning"],
    supportingTraits: ["method.dynamic_statutory"],
    antiTraits: [],
    note: "Practical-Reasoning pluralism: text, history, purpose, legal context, consequences, and policy receive context-sensitive weight rather than a fixed hierarchy. Its dynamic statutory branch also gives later legal and social developments interpretive weight."
  },
  {
    id: "pound",
    name: "Roscoe Pound",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["sociological_jurist"],
    signatureTraits: ["method.social_interests", "method.law_in_action"],
    antiTraits: [],
    note: "Canonical Sociological Jurisprudence champion: law in action, competing social interests, and practical social operation."
  },
  {
    id: "geny",
    name: "François Gény",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["sociological_jurist", "interpretive_pluralist", "purposivist"],
    signatureTraits: ["method.free_scientific_research", "method.law_in_action"],
    antiTraits: ["constraint.textual"],
    note: "Free Scientific Research: positive sources control until they genuinely run out, after which disciplined social, equitable, and practical inquiry supplies the missing rule."
  },
  {
    id: "santi_romano",
    name: "Santi Romano",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["sociological_jurist"],
    signatureTraits: ["source.institutional_legal_pluralism", "source.nonstate_legal_orders"],
    antiTraits: ["source.objective_morality"],
    note: "Institutional legal pluralism: organized nonstate institutions can constitute genuine legal orders, so state law is not conceptually exhaustive of law."
  },
  {
    id: "ehrlich",
    name: "Eugen Ehrlich",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["sociological_jurist"],
    signatureTraits: ["method.living_law", "method.law_in_action", "source.social_norms"],
    antiTraits: ["source.positive_sources"],
    note: "Living-law champion: socially operative norms of associations and communities are themselves central legal phenomena even without state enactment."
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
    name: "Larry Alexander / Richard Kay",
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
    name: "Antonin Scalia",
    kind: "person",
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
    id: "baude_sachs",
    name: "William Baude / Stephen Sachs",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["public_meaning_originalist", "originalist"],
    signatureTraits: ["time.original_law", "time.fixation"],
    antiTraits: ["time.original_intent"],
    note: "Original-Law champion unit: recover and apply the law the Constitution originally made, including background legal rules and lawful mechanisms of change."
  },
  {
    id: "mcconnell_green",
    name: "Michael McConnell / Christopher Green",
    kind: "people",
    role: "historical",
    eligibleIdentityIds: ["public_meaning_originalist", "originalist"],
    signatureTraits: ["time.public_meaning", "time.principle_originalism"],
    antiTraits: ["time.expected_applications"],
    note: "Principle/application lineage. The distinction is important but shared broadly enough across New Originalism that it no longer earns a separate champion slot."
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
    name: "Jeffrey Pojanowski / Kevin Walsh",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["public_meaning_originalist", "originalist"],
    signatureTraits: ["time.fixation", "source.objective_morality", "source.positive_law_settlement"],
    antiTraits: ["time.living_content"],
    note: "Natural-law-grounded originalist unit: classical natural law explains the authority and settlement function of promulgated original constitutional law."
  },

  {
    id: "ackerman",
    name: "Bruce Ackerman",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["living_constitutionalist"],
    signatureTraits: ["time.constitutional_moments"],
    antiTraits: ["time.transformative_constitutionalism"],
    note: "Constitutional-moments champion: extraordinary episodes of sustained higher-law popular mobilization can produce constitutional change outside Article V."
  },

  // Adjacent constitutional-time champions
  {
    id: "david_strauss",
    name: "David Strauss",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["common_law_constitutionalist"],
    signatureTraits: ["time.common_law_development", "precedent.stability", "precedent.settlement"],
    antiTraits: ["precedent.correctness_first", "time.ordered_liberty_tradition", "source.common_law_fundamental_rights", "source.morality_incorporated"],
    note: "Very clean champion because the theory label and his scholarship closely coincide; an affirmative Harlan-style ordered-liberty/living-tradition diagnostic points away from this generic common-law fit."
  },
  {
    id: "harlan_ii",
    name: "John Marshall Harlan II",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["common_law_constitutionalist", "living_constitutionalist"],
    signatureTraits: ["time.common_law_development", "precedent.stability", "precedent.settlement", "time.ordered_liberty_tradition"],
    antiTraits: ["precedent.correctness_first"],
    note: "Living-tradition / ordered-liberty champion: evolutionary constitutional tradition combined with substantial restraint and respect for federal structure."
  },
  {
    id: "robin_cooke",
    name: "Lord Cooke of Thorndon",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["common_law_constitutionalist", "living_constitutionalist", "nonpositivist"],
    signatureTraits: ["source.common_law_fundamental_rights", "posture.judicial_supremacy"],
    antiTraits: ["posture.majoritarian"],
    note: "Strong common-law constitutionalism: fundamental common-law rights can constrain ordinary legislative supremacy; require the dedicated diagnostic."
  },
  {
    id: "brennan",
    name: "William J. Brennan Jr.",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["living_constitutionalist"],
    signatureTraits: ["time.living_content", "posture.countermajoritarian", "posture.rights_trumps"],
    antiTraits: ["time.common_law_development", "time.democratic_constitutionalism", "time.transformative_constitutionalism"],
    note: "Contemporary-ratification Living Constitutionalism: broad constitutional commitments receive present-day meaning in light of contemporary understandings, dignity, and strong judicial responsibility for rights."
  },
  {
    id: "post_siegel",
    name: "Robert Post / Reva Siegel",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["living_constitutionalist"],
    signatureTraits: ["time.democratic_constitutionalism"],
    antiTraits: ["time.transformative_constitutionalism"],
    note: "Democratic Living Constitutionalism: sustained public contestation and political mobilization participate in constitutional development without eliminating judicially enforceable rights."
  },
  {
    id: "klare_langa",
    name: "Karl Klare / Pius Langa",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["living_constitutionalist"],
    signatureTraits: ["time.transformative_constitutionalism"],
    antiTraits: ["time.democratic_constitutionalism"],
    note: "Transformative Living Constitutionalism: constitutional interpretation and enforcement operate as a continuing project of institutional and social transformation."
  },
  {
    id: "waluchow_common_law",
    name: "Wil Waluchow",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["common_law_constitutionalist", "positivist"],
    signatureTraits: ["source.morality_incorporated", "time.common_law_development", "precedent.stability"],
    antiTraits: ["source.source_thesis", "precedent.correctness_first"],
    note: "Cross-axis champion for Inclusive Positivism plus common-law constitutional development; do not select from Inclusive Positivism alone."
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

  // Judicial review / constitutional authority
  {
    id: "thayer",
    name: "James Bradley Thayer",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["thayerian"],
    signatureTraits: ["posture.clear_error", "posture.majoritarian"],
    antiTraits: ["posture.rights_trumps"],
    note: "Canonical clear-mistake / reasonable-judgment judicial-deference champion."
  },
  {
    id: "waldron",
    name: "Jeremy Waldron",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["political_constitutionalist", "positivist"],
    signatureTraits: ["posture.democratic_legitimacy", "posture.reasonable_disagreement"],
    antiTraits: ["posture.judicial_supremacy"],
    note: "Political-Constitutionalist champion unit: rights-respecting democratic institutions retain the stronger claim to final constitutional authority."
  },
  {
    id: "gardbaum",
    name: "Stephen Gardbaum",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["political_constitutionalist", "political_process_jurist", "minimalist", "mixed_jurisprudence"],
    signatureTraits: ["posture.dialogic", "posture.weak_form", "posture.structured_legislative_response"],
    antiTraits: ["posture.judicial_supremacy", "posture.popular_authority"],
    note: "Champion-level New Commonwealth / weak-form review: independent judicial rights adjudication combined with a structured legislative response mechanism. No public Weak-Form noun is created."
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
    role: "historical",
    eligibleIdentityIds: ["popular_constitutionalist", "weak_form_constitutionalist"],
    signatureTraits: ["posture.anti_judicial_supremacy", "posture.weak_form"],
    antiTraits: [],
    note: "Important lineage across Popular Constitutionalism and weak-form review rather than a separate locked endpoint."
  },
  {
    id: "walsh_departmentalism",
    name: "Kevin Walsh",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["departmentalist"],
    signatureTraits: ["posture.anti_judicial_supremacy", "posture.branch_interpretation"],
    antiTraits: ["posture.popular_authority"],
    note: "Judicial Departmentalism: judicial judgments and precedent bind within the judicial department without making Supreme Court interpretations uniquely authoritative for every governmental actor."
  },
  {
    id: "ely",
    name: "John Hart Ely",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["political_process_jurist"],
    signatureTraits: ["posture.process_reinforcement", "posture.conditional_intervention"],
    antiTraits: ["posture.responsive_review"],
    note: "Canonical representation-reinforcement / political-process champion."
  },
  {
    id: "dixon_responsive",
    name: "Rosalind Dixon",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["political_process_jurist"],
    signatureTraits: ["posture.process_reinforcement", "posture.responsive_review"],
    antiTraits: [],
    note: "Responsive Judicial Review: calibrate timing, intensity, reasoning, and remedies to specific democratic dysfunctions and judicial capacity."
  },
  {
    id: "bickel",
    name: "Alexander Bickel",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["minimalist"],
    signatureTraits: ["posture.passive_virtues"],
    antiTraits: ["method.narrow_shallow"],
    note: "Passive-virtues specialist: strategic avoidance, timing, and justiciability respond to the counter-majoritarian difficulty."
  },
  {
    id: "sunstein",
    name: "Cass Sunstein",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["minimalist"],
    signatureTraits: ["method.narrow_shallow", "remedies.incremental"],
    antiTraits: ["posture.passive_virtues"],
    note: "Modern judicial-minimalism champion: narrow and shallow decisions, incompletely theorized agreement, and leaving broader questions unresolved."
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
    id: "metzger",
    name: "Gillian E. Metzger",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["functionalist", "legal_process_theorist"],
    signatureTraits: ["separation.supervisory_duty", "separation.administrative_constitutionalism", "separation.functionalist"],
    antiTraits: ["separation.unitary_executive", "separation.strong_nondelegation"],
    note: "Supervisory administrative constitutionalism: modern administration is constitutionally legitimate, agencies participate in constitutional implementation, and meaningful supervision is required without equating supervision with plenary presidential control."
  },
  {
    id: "lawson",
    name: "Gary Lawson",
    kind: "person",
    role: "primary",
    eligibleIdentityIds: ["formalist", "public_meaning_originalist", "originalist"],
    signatureTraits: ["separation.formalist", "separation.nondelegation"],
    antiTraits: ["separation.functionalist"],
    note: "Structural-formalism champion: assigned powers, prescribed processes, and anti-delegation constraints rather than incidental Originalist Time."
  },
  {
    id: "schauer",
    name: "Frederick Schauer",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["formalist"],
    signatureTraits: ["form.rules", "form.predictability", "form.anti_discretion", "form.edge_case_tolerance"],
    antiTraits: ["form.balancing"],
    note: "Rule-Formalism champion: rules constrain decision-makers partly by excluding otherwise attractive all-things-considered outcomes."
  },
  {
    id: "calabresi_prakash",
    name: "Steven Calabresi / Saikrishna Prakash",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["formalist", "public_meaning_originalist", "originalist"],
    signatureTraits: ["separation.formalist", "separation.unitary_executive"],
    antiTraits: ["separation.functionalist"],
    note: "Unitary-executive Formalist unit: executive administration remains subject to presidential control rather than congressional insulation."
  },
  {
    id: "fiss",
    name: "Owen Fiss",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: [],
    signatureTraits: ["remedies.structural", "remedies.supervision", "posture.countermajoritarian"],
    antiTraits: ["remedies.party_specific"],
    note: "Exceptional cross-noun whole-profile champion: selectable only when structural remedies, continuing supervision, and strong judicial role form an extreme multi-trait package; never from broad remedies alone."
  },
  {
    id: "bhagwati_iyer",
    name: "P. N. Bhagwati / V. R. Krishna Iyer",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: ["sociological_jurist", "living_constitutionalist", "purposivist"],
    signatureTraits: ["remedies.public_interest_litigation", "remedies.access_relaxation", "remedies.structural", "posture.countermajoritarian"],
    antiTraits: ["remedies.party_specific"],
    note: "Indian social-action/PIL champion unit: relaxed standing and filing barriers plus systemic rights enforcement for people otherwise unable to reach court."
  },
  {
    id: "chayes",
    name: "Abram Chayes",
    kind: "person",
    role: "historical",
    eligibleIdentityIds: [],
    signatureTraits: ["remedies.structural", "remedies.supervision", "method.managerial_judging"],
    antiTraits: ["remedies.party_specific"],
    note: "Canonical public-law-litigation lineage closely adjacent to Fiss; not separately selectable under the anti-redundancy threshold."
  },
  {
    id: "bray",
    name: "Samuel Bray",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: [],
    signatureTraits: ["remedies.party_specific", "remedies.incremental", "remedies.traditional_equity"],
    antiTraits: ["remedies.universal", "remedies.structural"],
    note: "Exceptional cross-noun traditional-equity specialist. It can take the single champion slot only when narrow remedies are unusually salient and the dedicated traditional-equity diagnostic is affirmed."
  },
  {
    id: "sohoni_frost",
    name: "Mila Sohoni / Amanda Frost",
    kind: "people",
    role: "subtype",
    eligibleIdentityIds: [],
    signatureTraits: ["remedies.universal", "remedies.universal_relief_theory"],
    antiTraits: ["remedies.party_specific"],
    note: "Exceptional cross-noun universal-relief specialist. It can take the champion slot only when systemic Remedies are unusually salient and the dedicated universal-relief theory diagnostic is affirmed."
  },
  {
    id: "monaghan",
    name: "Henry Monaghan",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: ["positivist", "legal_process_theorist", "common_law_constitutionalist", "mixed_jurisprudence"],
    signatureTraits: ["remedies.prophylactic", "remedies.constitutional_common_law"],
    antiTraits: [],
    note: "Champion-level constitutional-common-law specialist: implementing doctrine may exceed the constitutional minimum while remaining legally distinct from the underlying constitutional command."
  },
  {
    id: "levinson",
    name: "Daryl Levinson",
    kind: "person",
    role: "subtype",
    eligibleIdentityIds: [],
    signatureTraits: ["remedies.equilibration"],
    antiTraits: [],
    note: "Exceptional cross-noun remedial-equilibration specialist: remedial consequences can feed back into the scope of the substantive constitutional right itself."
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
  doNotForceChampion: false,
  ambiguityRule: "Return exactly one champion unit for every valid classified result. Close races reduce confidence but never produce a second champion.",
  explanationRule: "A champion is the single thinker or grouped unit that best explains the respondent's whole jurisprudential phenotype. Noun compatibility is a strong preference, not an absolute bar for the exceptional Fiss structural-reform package.",
  marginalCoverageRule: "Do not add or select a champion merely because the figure is canonical. The champion must explain a measurable combination not already captured as well by the respondent's real identity and the existing champion pool. If another champion covers the same measured region more directly, keep the redundant figure as lineage rather than a selectable match."
});

