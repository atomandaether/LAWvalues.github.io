/*
  Theory-derived jurisprudential personality profiles.

  These are intentionally sparse. A missing axis means "not diagnostic here," not
  "the thinker is a 50/50 moderate on this question." Values are prototypes for
  matching relative shape and salience; they are not empirical measurements.

  tier:
    main       - broad/selectable jurisprudential personality
    specialist - selectable only when a distinctive trait/gate is actually evidenced
    catchall   - used conservatively when no grand theory fits better
    lineage    - never wins; further reading only
*/
globalThis.LAW_PROFILES = Object.freeze([
  // Locked source-of-law champion units.
  {
    id: "hart",
    name: "H. L. A. Hart",
    tier: "main",
    identityIds: ["positivist"],
    axisSignature: { sorc: { target: 92, weight: 1 } },
    signatureTraits: ["source.social_practice", "source.law_runs_out"],
    requiredTraits: [],
    antiTraits: ["source.objective_morality", "source.normative_positivism"],
    description: "Baseline modern positivism: recognized social sources make law, and open texture can leave genuine hard-case discretion.",
    related: ["Jules Coleman", "Wil Waluchow", "Joseph Raz", "Hans Kelsen"]
  },
  {
    id: "kelsen",
    name: "Hans Kelsen",
    tier: "specialist",
    identityIds: ["positivist"],
    axisSignature: { sorc: { target: 98, weight: 1 } },
    signatureTraits: ["source.normative_hierarchy", "source.basic_norm"],
    requiredTraits: [{ all: ["source.basic_norm"], min: 0.5 }],
    antiTraits: ["source.objective_morality", "source.planning_theory", "source.command_theory"],
    specificityBonus: 0.03,
    description: "Pure Theory positivism: legal validity is structured through a hierarchy of authorizing norms whose unity ultimately rests on a presupposed basic norm, rather than on moral correctness or a sovereign command.",
    related: ["H. L. A. Hart", "Joseph Raz"]
  },
  {
    id: "austin",
    name: "John Austin",
    tier: "specialist",
    identityIds: ["positivist"],
    axisSignature: { sorc: { target: 99, weight: 1 } },
    signatureTraits: ["source.command_theory", "source.sovereign"],
    requiredTraits: [{ all: ["source.command_theory"], min: 0.5 }],
    antiTraits: ["source.objective_morality", "source.basic_norm", "source.planning_theory"],
    specificityBonus: 0.03,
    description: "Command-theory positivism: law is fundamentally the command of a determinate sovereign, backed by the prospect of sanction and sustained habits of obedience.",
    related: ["Jeremy Bentham", "H. L. A. Hart"]
  },
  {
    id: "shapiro",
    name: "Scott Shapiro",
    tier: "specialist",
    identityIds: ["positivist"],
    axisSignature: { sorc: { target: 96, weight: 0.9 } },
    signatureTraits: ["source.planning_theory", "source.source_thesis"],
    requiredTraits: [{ all: ["source.planning_theory"], min: 0.5 }],
    antiTraits: ["source.morality_incorporated", "source.basic_norm", "source.command_theory"],
    specificityBonus: 0.03,
    description: "Planning Theory positivism: legal institutions are systems of shared social planning, and legal authority is explained through the creation, adoption, and operation of plans rather than Hartian rules or sovereign commands.",
    related: ["H. L. A. Hart", "Joseph Raz"]
  },
  {
    id: "coleman_waluchow_kramer",
    name: "Jules Coleman / Matthew Kramer",
    tier: "specialist",
    identityIds: ["positivist"],
    axisSignature: { sorc: { target: 94, weight: 1 } },
    signatureTraits: ["source.morality_incorporated", "source.positive_sources"],
    requiredTraits: [{ all: ["source.morality_incorporated"], min: 0.5 }],
    antiTraits: ["source.source_thesis"],
    description: "Inclusive Positivism: a source-grounded legal system can itself make genuine moral correctness a criterion of legal validity.",
    related: ["H. L. A. Hart", "Wil Waluchow", "Kenneth Einar Himma"]
  },
  {
    id: "raz_shapiro_marmor",
    name: "Joseph Raz",
    tier: "specialist",
    identityIds: ["positivist"],
    axisSignature: { sorc: { target: 97, weight: 1 } },
    signatureTraits: ["source.source_thesis", "source.positive_sources"],
    requiredTraits: [{ all: ["source.source_thesis"], min: 0.5 }],
    antiTraits: ["source.morality_incorporated", "source.objective_morality"],
    description: "Exclusive Positivism: legal validity must remain identifiable from social/source facts without making moral merits themselves the test of what law exists.",
    related: ["Andrei Marmor", "Leslie Green", "Scott Shapiro"]
  },
  {
    id: "campbell_waldron_schauer",
    name: "Tom Campbell",
    tier: "specialist",
    identityIds: ["positivist"],
    axisSignature: { sorc: { target: 94, weight: 1 } },
    signatureTraits: ["source.normative_positivism", "form.anti_discretion", "posture.majoritarian"],
    requiredTraits: [{ all: ["source.normative_positivism"], min: 0.5 }],
    antiTraits: ["source.objective_morality"],
    description: "Normative/Ethical Positivism: source-based legality is not just a conceptual fact but a desirable institutional discipline that limits contested merits-based judicial lawmaking.",
    related: ["Jeremy Waldron", "Frederick Schauer"]
  },
  {
    id: "dworkin_stavropoulos",
    name: "Ronald Dworkin",
    tier: "main",
    identityIds: ["interpretivist"],
    crossCuttingIdentityIds: ["legal_constitutionalist"],
    axisSignature: {
      sorc: { target: 8, weight: 1 },
      post: { target: 24, weight: 0.35 }
    },
    signatureTraits: ["source.principles_are_law", "source.fit_and_justification", "source.right_answer"],
    requiredTraits: [{ any: ["source.principles_are_law", "source.fit_and_justification"], min: 0.45 }],
    antiTraits: ["source.law_runs_out", "method.subjective_moral_override"],
    description: "Central legal Interpretivism: institutional practice bears on legal rights through the principles that best fit and justify that practice.",
    related: ["Nicos Stavropoulos", "T.R.S. Allan"]
  },
  {
    id: "greenberg",
    name: "Mark Greenberg",
    tier: "specialist",
    identityIds: ["nonpositivist"],
    axisSignature: { sorc: { target: 8, weight: 0.8 } },
    signatureTraits: ["source.moral_impact", "source.one_system"],
    requiredTraits: [{ all: ["source.moral_impact"], min: 0.5 }],
    antiTraits: ["source.source_thesis", "source.fit_and_justification", "source.moral_practice"],
    description: "Moral Impact Theory: legal institutions change people's moral rights and obligations, and those resulting moral obligations constitute law.",
    related: ["Scott Hershovitz", "Ronald Dworkin"]
  },
  {
    id: "hershovitz",
    name: "Scott Hershovitz",
    tier: "specialist",
    identityIds: ["nonpositivist"],
    axisSignature: { sorc: { target: 8, weight: 0.8 } },
    signatureTraits: ["source.one_system", "source.moral_practice"],
    requiredTraits: [{ all: ["source.moral_practice"], min: 0.5 }],
    antiTraits: ["source.source_thesis", "source.moral_impact"],
    description: "Moral-practice nonpositivism: courtroom legal claims ultimately concern genuine moral rights and responsibilities rather than a separate source-generated domain of obligation.",
    related: ["Mark Greenberg", "Ronald Dworkin"]
  },
  {
    id: "finnis_murphy_george",
    name: "John Finnis",
    tier: "main",
    identityIds: ["natural_lawyer"],
    axisSignature: { sorc: { target: 6, weight: 1 } },
    signatureTraits: ["source.objective_morality", "source.positive_law_settlement"],
    requiredTraits: [
      { all: ["source.objective_morality"], min: 0.35 },
      { all: ["source.positive_law_settlement"], min: 0.35 }
    ],
    antiTraits: ["source.principles_are_law", "method.subjective_moral_override"],
    description: "Central modern Natural Law: objective practical morality matters to law, while positive law retains an important settlement, coordination, and institutional-authority function.",
    related: ["Mark Murphy", "Robert P. George", "Thomas Aquinas", "William Blackstone"]
  },
  {
    id: "moore_strong_natural_law",
    name: "Michael S. Moore",
    tier: "specialist",
    identityIds: ["natural_lawyer"],
    axisSignature: { sorc: { target: 4, weight: 0.9 } },
    signatureTraits: ["source.objective_morality", "source.strong_natural_law"],
    requiredTraits: [{ all: ["source.strong_natural_law"], min: 0.5 }],
    antiTraits: ["source.positive_law_settlement"],
    specificityBonus: 0.03,
    description: "Strong Natural Law: at least some sufficiently serious normative defects can defeat legal validity itself, rather than merely making an otherwise valid law morally defective.",
    related: ["Jonathan Crowe", "Robert Alexy", "John Finnis"]
  },
  {
    id: "fuller",
    name: "Lon Fuller",
    tier: "specialist",
    identityIds: ["fullerian"],
    axisSignature: { sorc: { target: 22, weight: 0.8 } },
    signatureTraits: ["source.internal_legality"],
    requiredTraits: [{ all: ["source.internal_legality"], min: 0.5 }],
    antiTraits: [],
    description: "Fullerian legality: publicity, prospectivity, clarity, consistency, stability, possibility of compliance, and congruent administration are constitutive virtues of law.",
    related: ["H. L. A. Hart", "David Dyzenhaus"]
  },
  {
    id: "radbruch_soper",
    name: "Gustav Radbruch / Philip Soper",
    tier: "specialist",
    identityIds: ["nonpositivist"],
    axisSignature: {},
    signatureTraits: ["source.extreme_injustice"],
    requiredTraits: [{ all: ["source.extreme_injustice"], min: 0.5 }],
    antiTraits: ["source.every_injustice_invalidates", "source.objective_morality"],
    description: "Extreme-Injustice nonpositivism: ordinary injustice does not necessarily erase legal status, but sufficiently grave injustice can defeat a purported norm's claim to be law.",
    related: ["Gustav Radbruch", "Philip Soper", "Robert Alexy"]
  },
  {
    id: "hugo_black",
    name: "Hugo Black",
    tier: "main",
    identityIds: ["textualist"],
    crossCuttingIdentityIds: ["formalist", "legal_constitutionalist"],
    crossCuttingRequirements: {
      formalist: [{ all: ["form.anti_discretion"], min: 0.45 }]
    },
    axisSignature: {
      cons: { target: 94, weight: 0.9 },
      form: { target: 98, weight: 1 },
      post: { target: 6, weight: 0.95 }
    },
    signatureTraits: ["constraint.textual", "form.anti_discretion", "posture.rights_trumps", "method.categorical_textual_rights"],
    requiredTraits: [{ all: ["method.categorical_textual_rights"], min: 0.5 }],
    antiTraits: ["form.proportionality", "constraint.purpose"],
    description: "Black-like textualism: unusually categorical, text-centered judging paired with aggressive enforcement of expressly protected rights and deep skepticism of balancing.",
    related: ["Hugo Black", "Antonin Scalia"]
  },
  {
    id: "bork_berger",
    name: "Robert Bork / Raoul Berger",
    tier: "main",
    identityIds: ["original_intent_originalist", "originalist"],
    axisSignature: {
      time: { target: 94, weight: 1 },
      post: { target: 84, weight: 0.65 },
      form: { target: 78, weight: 0.4 }
    },
    signatureTraits: ["time.original_intent", "time.no_construction", "posture.majoritarian"],
    requiredTraits: [{ any: ["time.original_intent"], min: 0.45 }],
    antiTraits: ["time.intent_as_meaning", "time.construction_zone"],
    description: "First-generation Original Intent: recover the founding intention, strongly constrain judicial innovation, and leave little legitimate construction beyond it.",
    related: ["Robert Bork", "Raoul Berger"]
  },
  {
    id: "alexander_kay_prakash",
    name: "Larry Alexander / Richard Kay",
    tier: "specialist",
    identityIds: ["original_intent_originalist", "originalist"],
    axisSignature: { time: { target: 94, weight: 1 } },
    signatureTraits: ["time.original_intent", "time.intent_as_meaning"],
    requiredTraits: [{ all: ["time.intent_as_meaning"], min: 0.5 }],
    antiTraits: ["time.public_meaning"],
    description: "Modern strong intentionalism: intended communication is the semantic object of interpretation, not merely a device for judicial restraint.",
    related: ["Saikrishna Prakash"]
  },
  {
    id: "whittington",
    name: "Keith Whittington",
    tier: "specialist",
    identityIds: ["original_intent_originalist", "originalist"],
    axisSignature: { time: { target: 86, weight: 0.9 } },
    signatureTraits: ["time.original_intent", "time.construction_zone"],
    requiredTraits: [{ all: ["time.construction_zone"], min: 0.5 }],
    antiTraits: ["time.public_meaning"],
    description: "The distinctive Original-Intent plus construction fit: fixed founding intent can leave unresolved constitutional questions for legitimate construction.",
    related: ["Lawrence Solum", "Randy Barnett"]
  },
  {
    id: "solum",
    name: "Lawrence Solum",
    tier: "specialist",
    identityIds: ["public_meaning_originalist", "originalist"],
    axisSignature: { time: { target: 90, weight: 1 } },
    signatureTraits: ["time.public_meaning", "time.semantic_fixation", "time.construction_zone", "time.principle_originalism"],
    requiredTraits: [{ all: ["time.construction_zone"], min: 0.5 }],
    antiTraits: ["time.original_intent", "time.original_methods", "time.common_law_development"],
    description: "New public-meaning originalism centered on semantic fixation and a genuine but constrained interpretation/construction distinction.",
    related: ["Randy Barnett", "Jack Balkin", "Keith Whittington"]
  },
  {
    id: "barnett_bernick",
    name: "Randy Barnett / Evan Bernick",
    tier: "specialist",
    identityIds: ["public_meaning_originalist", "originalist"],
    axisSignature: {
      time: { target: 90, weight: 0.85 },
      post: { target: 18, weight: 0.9 }
    },
    signatureTraits: ["time.public_meaning", "time.construction_zone", "posture.rights_trumps"],
    requiredTraits: [{ all: ["time.construction_zone"], min: 0.5 }],
    antiTraits: ["posture.majoritarian"],
    specificityBonus: 0.02,
    description: "New OPM with rights-protective, good-faith construction once fixed communicative meaning leaves genuine room.",
    related: ["Lawrence Solum", "Jack Balkin"]
  },
  {
    id: "balkin",
    name: "Jack Balkin",
    tier: "specialist",
    identityIds: ["public_meaning_originalist", "originalist"],
    axisSignature: {
      time: { target: 72, weight: 0.7 },
      prec: { target: 66, weight: 0.35 }
    },
    signatureTraits: ["time.public_meaning", "time.construction_zone", "time.principle_originalism", "time.common_law_development"],
    requiredTraits: [
      { all: ["time.construction_zone"], min: 0.5 },
      { all: ["time.common_law_development"], min: 0.35 }
    ],
    antiTraits: ["time.expected_applications"],
    description: "New OPM with a fixed framework and comparatively extensive legitimate doctrinal, institutional, and political construction over time.",
    related: ["Lawrence Solum", "Randy Barnett", "Reva Siegel"]
  },
  {
    id: "scalia_manning",
    name: "Antonin Scalia",
    tier: "main",
    identityIds: ["public_meaning_originalist", "originalist"],
    crossCuttingIdentityIds: ["formalist"],
    crossCuttingRequirements: {
      formalist: [{ all: ["form.anti_discretion"], min: 0.45 }]
    },
    axisSignature: {
      cons: { target: 92, weight: 0.8 },
      time: { target: 90, weight: 0.9 },
      separ: { target: 82, weight: 0.45 },
      form: { target: 92, weight: 0.8 }
    },
    signatureTraits: ["time.public_meaning", "constraint.textual", "form.anti_discretion"],
    requiredTraits: [],
    antiTraits: ["constraint.purpose", "time.construction_zone"],
    description: "Mainline text-and-rule public-meaning originalism: text, legal context, rules, and anti-discretion do most of the work.",
    related: ["John Manning"]
  },
  {
    id: "mcginnis_rappaport",
    name: "John McGinnis / Michael Rappaport",
    tier: "specialist",
    identityIds: ["public_meaning_originalist", "originalist"],
    axisSignature: {
      time: { target: 94, weight: 1 },
      cons: { target: 86, weight: 0.45 }
    },
    signatureTraits: ["time.original_methods", "time.fixation", "time.no_construction"],
    requiredTraits: [{ all: ["time.original_methods"], min: 0.5 }],
    antiTraits: ["time.construction_zone"],
    description: "Original Methods: use the historically accepted legal interpretive rules for the Constitution and minimize a separate construction zone.",
    related: ["Caleb Nelson", "Antonin Scalia", "John Manning"]
  },
  {
    id: "baude_sachs",
    name: "William Baude / Stephen Sachs",
    tier: "specialist",
    identityIds: ["public_meaning_originalist", "originalist"],
    axisSignature: { time: { target: 91, weight: 0.9 }, cons: { target: 76, weight: 0.35 } },
    signatureTraits: ["time.original_law", "time.fixation"],
    requiredTraits: [{ all: ["time.original_law"], min: 0.5 }],
    antiTraits: ["time.original_intent"],
    specificityBonus: 0.03,
    description: "Original-Law Originalism: constitutional interpretation should recover and apply the law that the Constitution originally made, including background legal rules and lawful mechanisms of change, rather than reducing originalism to ordinary semantic meaning alone.",
    related: ["William Baude", "Stephen Sachs", "John McGinnis", "Michael Rappaport"]
  },
  {
    id: "mcconnell_green",
    name: "Michael McConnell / Christopher Green",
    tier: "lineage",
    selectable: false,
    identityIds: ["public_meaning_originalist", "originalist"],
    axisSignature: { time: { target: 88, weight: 1 } },
    signatureTraits: ["time.public_meaning", "time.principle_originalism"],
    requiredTraits: [],
    antiTraits: ["time.expected_applications"],
    description: "Principle/application originalism remains useful lineage, but the measured distinction is shared broadly across New Originalist theories and does not clear the champion anti-redundancy threshold.",
    related: ["Lawrence Solum", "Jack Balkin"]
  },
  {
    id: "amar",
    name: "Akhil Reed Amar",
    tier: "specialist",
    identityIds: ["public_meaning_originalist", "originalist"],
    axisSignature: {
      time: { target: 84, weight: 0.75 },
      cons: { target: 78, weight: 0.45 }
    },
    signatureTraits: ["time.public_meaning", "time.intratextualism", "method.holistic_constitution"],
    requiredTraits: [{ all: ["time.intratextualism"], min: 0.5 }],
    antiTraits: [],
    description: "Holistic/intratextual OPM: ambiguous clauses are read through recurring constitutional language, architecture, and the document as a whole.",
    related: ["Akhil Reed Amar"]
  },
  {
    id: "thomas_paulsen",
    name: "Clarence Thomas / Michael Stokes Paulsen",
    tier: "main",
    identityIds: ["public_meaning_originalist", "originalist", "formalist"],
    axisSignature: {
      time: { target: 96, weight: 0.85 },
      prec: { target: 10, weight: 1 }
    },
    signatureTraits: ["time.fixation", "precedent.correctness_first", "precedent.judicial_invention_skepticism"],
    requiredTraits: [],
    antiTraits: ["precedent.stability"],
    description: "Correction-first originalism: entrenched precedent yields comparatively readily to the best account of original constitutional law.",
    related: ["Clarence Thomas", "Michael Stokes Paulsen"]
  },
  {
    id: "barrett",
    name: "Amy Coney Barrett",
    tier: "main",
    identityIds: ["public_meaning_originalist", "originalist"],
    axisSignature: {
      time: { target: 90, weight: 0.85 },
      prec: { target: 82, weight: 1 }
    },
    signatureTraits: ["time.fixation", "precedent.stability", "precedent.settlement", "precedent.protective_rule_stability"],
    requiredTraits: [],
    antiTraits: ["precedent.correctness_first"],
    description: "Precedent-accommodating originalism: original meaning remains authoritative while stare decisis, reliance, and legal settlement retain substantial force.",
    related: ["Amy Coney Barrett"]
  },
  {
    id: "natural_law_originalists",
    name: "Jeffrey Pojanowski / Kevin Walsh",
    tier: "specialist",
    identityIds: ["public_meaning_originalist", "originalist"],
    axisSignature: {
      sorc: { target: 14, weight: 0.75 },
      time: { target: 88, weight: 0.8 }
    },
    signatureTraits: ["source.objective_morality", "source.positive_law_settlement", "time.fixation"],
    requiredTraits: [{ all: ["source.objective_morality"], min: 0.35 }],
    antiTraits: ["time.living_content"],
    description: "Natural-law-grounded originalism: classical natural law explains why promulgated positive constitutional law has authoritative settlement force.",
    related: ["J. Joel Alicea", "Lee Strang"]
  },
  {
    id: "owen_dixon",
    name: "Sir Owen Dixon",
    tier: "main",
    identityIds: ["formalist"],
    axisSignature: {
      form: { target: 86, weight: 0.9 },
      prec: { target: 78, weight: 0.65 },
      cons: { target: 68, weight: 0.35 }
    },
    signatureTraits: [],
    requiredTraits: [],
    antiTraits: ["form.proportionality"],
    description: "A formal/legalist fit without requiring American originalism: inherited legal principle, authority, analogy, and legal craft do most of the work.",
    related: ["Friedrich Carl von Savigny", "Benjamin Cardozo"]
  },
  {
    id: "schauer",
    name: "Frederick Schauer",
    tier: "specialist",
    identityIds: ["formalist"],
    axisSignature: { form: { target: 98, weight: 1 } },
    minAxisSalience: { form: 0.45 },
    signatureTraits: ["form.rules", "form.anti_discretion"],
    requiredTraits: [],
    antiTraits: ["form.proportionality"],
    description: "The pure rules specialist: rules matter partly because they deny decision-makers permission to reach the best all-things-considered outcome in every case.",
    related: ["Kathleen Sullivan", "Antonin Scalia"]
  },
  {
    id: "alexy",
    name: "Robert Alexy",
    tier: "specialist",
    identityIds: ["proportionalist"],
    crossCuttingIdentityIds: ["legal_constitutionalist"],
    axisSignature: {
      form: { target: 4, weight: 1 },
      sorc: { target: 16, weight: 0.6 }
    },
    signatureTraits: ["form.proportionality", "source.principles_are_law"],
    requiredTraits: [{ all: ["form.proportionality"], min: 0.5 }],
    antiTraits: ["form.rules"],
    description: "A specialist fit for structured proportionality and principles understood as optimization requirements, especially when paired with non-positivism.",
    related: ["Aharon Barak", "German Federal Constitutional Court"]
  },
  {
    id: "guido_calabresi",
    name: "Guido Calabresi",
    tier: "specialist",
    identityIds: ["pragmatist"],
    crossCuttingIdentityIds: ["common_law_constitutionalist", "interpretive_pluralist"],
    crossCuttingRequirements: {
      common_law_constitutionalist: [{ all: ["method.statutory_obsolescence"], min: 0.5 }],
      interpretive_pluralist: [{ all: ["method.statutory_obsolescence"], min: 0.5 }]
    },
    axisSignature: {
      cons: { target: 30, weight: 0.4 },
      time: { target: 34, weight: 0.35 },
      form: { target: 34, weight: 0.3 }
    },
    signatureTraits: ["method.statutory_obsolescence", "method.second_look", "method.common_law_statutory_updating", "method.consequences"],
    requiredTraits: [{ all: ["method.statutory_obsolescence"], min: 0.5 }],
    antiTraits: ["constraint.enacted_bargain"],
    specificityBonus: 0.04,
    description: "Statutory-obsolescence pragmatism: when an old statute becomes seriously out of phase with the surrounding legal order, courts may use common-law-like techniques or a second-look mechanism that forces contemporary political institutions to reaffirm or revise it.",
    related: ["William Eskridge", "Henry Friendly"]
  },
  {
    id: "cardozo",
    name: "Benjamin Cardozo",
    tier: "main",
    identityIds: ["pragmatist"],
    crossCuttingIdentityIds: ["common_law_constitutionalist", "sociological_jurist"],
    crossCuttingRequirements: {
      common_law_constitutionalist: [{ all: ["time.common_law_development"], min: 0.35 }],
      sociological_jurist: [{ all: ["method.social_interests"], min: 0.45 }]
    },
    axisSignature: {
      cons: { target: 36, weight: 0.5 },
      prec: { target: 80, weight: 0.85 },
      form: { target: 42, weight: 0.35 }
    },
    signatureTraits: ["method.pragmatic_priority", "method.consequences", "time.common_law_development", "precedent.settlement"],
    requiredTraits: [],
    antiTraits: [],
    description: "Bounded common-law Pragmatism: hard cases permit development, but precedent, custom, continuity, and incremental legal growth sharply constrain practical judgment.",
    related: ["Roscoe Pound", "David Strauss"]
  },
  {
    id: "posner",
    name: "Richard Posner",
    tier: "main",
    identityIds: ["pragmatist"],
    axisSignature: {
      cons: { target: 30, weight: 0.45 },
      separ: { target: 22, weight: 0.45 },
      form: { target: 16, weight: 0.8 },
      prec: { target: 30, weight: 0.55 }
    },
    signatureTraits: ["method.pragmatic_priority", "method.consequences", "method.workability"],
    requiredTraits: [],
    antiTraits: ["form.rules", "precedent.settlement"],
    description: "Forward-looking Pragmatism: consequences, institutional workability, and practical administration can outweigh doctrinal continuity when inherited law performs badly.",
    related: ["Oliver Wendell Holmes Jr.", "Benjamin Cardozo"]
  },
  {
    id: "breyer",
    name: "Stephen Breyer",
    tier: "main",
    identityIds: ["purposivist"],
    crossCuttingIdentityIds: ["pragmatist", "functionalist"],
    crossCuttingRequirements: {
      pragmatist: [{ all: ["method.workability"], min: 0.45 }, { all: ["method.consequences"], min: 0.35 }],
      functionalist: [{ all: ["separation.interpretive_accommodation"], min: 0.35 }]
    },
    axisSignature: {
      cons: { target: 16, weight: 0.85 },
      separ: { target: 16, weight: 0.7 },
      form: { target: 24, weight: 0.6 },
      post: { target: 56, weight: 0.2 }
    },
    signatureTraits: ["constraint.purpose", "method.workability", "separation.interpretive_accommodation"],
    requiredTraits: [],
    antiTraits: ["constraint.textual", "form.proportionality"],
    description: "Practical American Purposivism: statutory purpose, real-world consequences, administrability, and institutional workability reinforce one another.",
    related: ["Henry Hart", "Albert Sacks", "Robert Katzmann"]
  },
  {
    id: "barak",
    name: "Aharon Barak",
    tier: "main",
    identityIds: ["purposivist", "proportionalist"],
    crossCuttingIdentityIds: ["legal_constitutionalist"],
    axisSignature: {
      cons: { target: 10, weight: 0.8 },
      post: { target: 10, weight: 0.75 },
      form: { target: 6, weight: 1 },
      remed: { target: 24, weight: 0.4 }
    },
    signatureTraits: ["constraint.purpose", "form.proportionality", "posture.rights_trumps"],
    requiredTraits: [],
    antiTraits: ["form.rules"],
    description: "Systematic objective-purpose judging combined with structured proportionality, balancing, and strong judicial responsibility for rights.",
    related: ["Robert Alexy", "Stephen Breyer"]
  },
  {
    id: "david_strauss",
    name: "David Strauss",
    tier: "main",
    identityIds: ["common_law_constitutionalist", "living_constitutionalist"],
    axisSignature: {
      time: { target: 12, weight: 0.9 },
      prec: { target: 94, weight: 1 }
    },
    signatureTraits: ["time.common_law_development"],
    requiredTraits: [{ any: ["time.common_law_development"], min: 0.35 }],
    antiTraits: ["precedent.correctness_first", "time.ordered_liberty_tradition", "source.common_law_fundamental_rights", "source.morality_incorporated"],
    description: "The clearest living-plus-stability fit: constitutional development occurs through precedent, practice, and accumulated institutional experience.",
    related: ["Friedrich Carl von Savigny", "Beverley McLachlin", "Benjamin Cardozo"]
  },
  {
    id: "harlan_ii",
    name: "John Marshall Harlan II",
    tier: "specialist",
    identityIds: ["common_law_constitutionalist", "living_constitutionalist"],
    axisSignature: {
      time: { target: 28, weight: 0.75 },
      prec: { target: 86, weight: 0.8 },
      post: { target: 62, weight: 0.6 },
      remed: { target: 72, weight: 0.35 }
    },
    signatureTraits: ["time.common_law_development", "precedent.settlement", "time.ordered_liberty_tradition"],
    requiredTraits: [{ all: ["time.ordered_liberty_tradition"], min: 0.5 }],
    antiTraits: ["precedent.correctness_first"],
    description: "Living-tradition constitutionalism: ordered liberty develops through historically embedded tradition and precedent, paired with substantial judicial restraint rather than either fixed original meaning or free-form moral updating.",
    related: ["David Strauss", "Felix Frankfurter"]
  },
  {
    id: "robin_cooke",
    name: "Lord Cooke of Thorndon",
    tier: "specialist",
    identityIds: ["common_law_constitutionalist"],
    crossCuttingIdentityIds: ["living_constitutionalist", "nonpositivist"],
    crossCuttingRequirements: {
      living_constitutionalist: [{ all: ["time.living_content"], min: 0.3 }],
      nonpositivist: [{ all: ["source.common_law_fundamental_rights"], min: 0.5 }]
    },
    axisSignature: {
      sorc: { target: 18, weight: 0.55 },
      time: { target: 30, weight: 0.45 },
      prec: { target: 68, weight: 0.35 },
      post: { target: 12, weight: 0.75 }
    },
    signatureTraits: ["source.common_law_fundamental_rights"],
    requiredTraits: [{ all: ["source.common_law_fundamental_rights"], min: 0.5 }],
    antiTraits: ["posture.majoritarian"],
    description: "Strong common-law constitutionalism: some fundamental common-law rights can constrain even otherwise valid legislation, making judicially articulated constitutional principle a potential limit on parliamentary supremacy.",
    related: ["T.R.S. Allan", "John Laws", "David Strauss"]
  },
  {
    id: "brennan",
    name: "William J. Brennan Jr.",
    tier: "main",
    identityIds: ["living_constitutionalist"],
    crossCuttingIdentityIds: ["legal_constitutionalist"],
    axisSignature: {
      time: { target: 5, weight: 1 },
      post: { target: 10, weight: 0.75 },
      cons: { target: 26, weight: 0.35 }
    },
    signatureTraits: ["time.living_content", "posture.rights_trumps"],
    requiredTraits: [],
    antiTraits: [
      "time.common_law_development",
      "time.ordered_liberty_tradition",
      "time.democratic_constitutionalism",
      "time.transformative_constitutionalism"
    ],
    description: "Contemporary-ratification Living Constitutionalism: broad constitutional commitments receive present-day meaning in light of contemporary understandings, human dignity, and the judiciary's responsibility to enforce rights.",
    related: ["Thurgood Marshall", "William O. Douglas"]
  },
  {
    id: "post_siegel",
    name: "Robert Post / Reva Siegel",
    tier: "specialist",
    identityIds: ["living_constitutionalist"],
    axisSignature: {
      time: { target: 10, weight: 0.9 },
      post: { target: 28, weight: 0.45 }
    },
    signatureTraits: ["time.democratic_constitutionalism"],
    requiredTraits: [{ all: ["time.democratic_constitutionalism"], min: 0.5 }],
    antiTraits: ["time.transformative_constitutionalism"],
    description: "Democratic Constitutionalism: constitutional meaning develops through sustained public contestation, political mobilization, and interaction among citizens, officials, and courts while judicially enforceable rights remain part of the system.",
    related: ["Jack Balkin", "Larry Kramer"]
  },
  {
    id: "klare_langa",
    name: "Karl Klare / Pius Langa",
    tier: "specialist",
    identityIds: ["living_constitutionalist"],
    axisSignature: {
      time: { target: 6, weight: 0.8 },
      cons: { target: 14, weight: 0.55 },
      remed: { target: 8, weight: 0.75 },
      post: { target: 10, weight: 0.65 }
    },
    signatureTraits: ["time.transformative_constitutionalism"],
    requiredTraits: [{ all: ["time.transformative_constitutionalism"], min: 0.5 }],
    antiTraits: ["time.democratic_constitutionalism"],
    description: "Transformative Constitutionalism: constitutional interpretation and enforcement form a continuing legal project of remaking inherited institutions and power relations toward democratic, participatory, and egalitarian commitments.",
    related: ["Albie Sachs", "South African Constitutional Court"]
  },
  {
    id: "waluchow_common_law",
    name: "Wil Waluchow",
    tier: "specialist",
    identityIds: ["common_law_constitutionalist", "positivist"],
    axisSignature: {
      sorc: { target: 92, weight: 0.75 },
      time: { target: 12, weight: 0.8 },
      prec: { target: 92, weight: 0.85 }
    },
    signatureTraits: ["source.morality_incorporated", "time.common_law_development"],
    requiredTraits: [
      { all: ["source.morality_incorporated"], min: 0.5 },
      { all: ["time.common_law_development"], min: 0.45 }
    ],
    antiTraits: ["source.source_thesis", "precedent.correctness_first"],
    description: "Inclusive-positivist Common-Law Constitutionalism: a source-grounded legal system can incorporate moral criteria while constitutional rights develop through precedent, practical judgment, and common-law refinement.",
    related: ["David Strauss", "Jules Coleman"]
  },
  {
    id: "sunstein",
    name: "Cass Sunstein",
    tier: "main",
    identityIds: ["minimalist"],
    axisSignature: {
      remed: { target: 91, weight: 1 },
      prec: { target: 68, weight: 0.35 }
    },
    signatureTraits: ["method.narrow_shallow", "remedies.incremental"],
    requiredTraits: [],
    antiTraits: ["posture.passive_virtues", "remedies.structural"],
    description: "Judicial Minimalism: decide narrowly and shallowly, leave broader questions unresolved, and seek incompletely theorized agreement rather than maximal constitutional settlement.",
    related: ["Alexander Bickel"]
  },
  {
    id: "hart_sacks",
    name: "Henry Hart / Albert Sacks",
    tier: "main",
    identityIds: ["legal_process_theorist"],
    crossCuttingIdentityIds: ["purposivist"],
    crossCuttingRequirements: {
      purposivist: [{ all: ["constraint.purpose"], min: 0.4 }]
    },
    axisSignature: {
      cons: { target: 28, weight: 0.6 },
      post: { target: 64, weight: 0.25 },
      prec: { target: 72, weight: 0.45 }
    },
    signatureTraits: ["method.institutional_competence", "method.reasoned_elaboration", "constraint.purpose"],
    requiredTraits: [{ all: ["method.institutional_competence"], min: 0.45 }],
    antiTraits: ["method.neutral_principles"],
    description: "Core Legal Process: respect institutional settlement and comparative competence, then elaborate the law through reasoned, purposive development.",
    related: ["Henry Hart", "Albert Sacks", "Herbert Wechsler"]
  },
  {
    id: "mashaw",
    name: "Jerry L. Mashaw",
    tier: "specialist",
    identityIds: ["legal_process_theorist"],
    crossCuttingIdentityIds: ["functionalist"],
    crossCuttingRequirements: {
      functionalist: [{ all: ["method.agency_interpretive_autonomy"], min: 0.5 }]
    },
    axisSignature: {
      cons: { target: 36, weight: 0.35 },
      separ: { target: 20, weight: 0.55 }
    },
    signatureTraits: ["method.agency_interpretive_autonomy", "method.administrative_reason_giving", "method.institutional_competence", "separation.interpretive_accommodation"],
    requiredTraits: [{ all: ["method.agency_interpretive_autonomy"], min: 0.5 }],
    antiTraits: ["separation.independent_judicial_interpretation"],
    specificityBonus: 0.04,
    description: "Administrative Legal Process: agency statutory interpretation is a genuine legal enterprise with its own institutional competence, internal norms, reason-giving duties, and practical responsibility for implementing legislative programs.",
    related: ["Peter Strauss", "John Willis"]
  },
  {
    id: "pound",
    name: "Roscoe Pound",
    tier: "main",
    identityIds: ["sociological_jurist"],
    crossCuttingIdentityIds: ["pragmatist", "purposivist"],
    crossCuttingRequirements: {
      pragmatist: [{ all: ["method.consequences"], min: 0.4 }],
      purposivist: [{ all: ["constraint.purpose"], min: 0.4 }]
    },
    axisSignature: {
      cons: { target: 28, weight: 0.4 },
      form: { target: 30, weight: 0.45 },
      separ: { target: 32, weight: 0.3 }
    },
    signatureTraits: ["method.social_interests", "method.law_in_action"],
    requiredTraits: [{ all: ["method.social_interests"], min: 0.5 }],
    antiTraits: [],
    description: "Sociological Jurisprudence: identify competing social interests, examine law in action, and shape doctrine with explicit attention to its practical social operation.",
    related: ["Eugen Ehrlich", "Benjamin Cardozo"]
  },
  {
    id: "ehrlich",
    name: "Eugen Ehrlich",
    tier: "specialist",
    identityIds: ["sociological_jurist"],
    axisSignature: { cons: { target: 38, weight: 0.5 } },
    signatureTraits: ["method.living_law", "method.law_in_action", "source.social_norms"],
    requiredTraits: [{ all: ["method.living_law"], min: 0.5 }],
    antiTraits: ["source.positive_sources"],
    specificityBonus: 0.03,
    description: "Living-law Sociological Jurisprudence: the operative norms of associations and social life can constitute the most important law in practice even when they are not produced by legislatures or courts.",
    related: ["Roscoe Pound", "François Gény"]
  },
  {
    id: "santi_romano",
    name: "Santi Romano",
    tier: "specialist",
    identityIds: ["sociological_jurist"],
    axisSignature: {},
    signatureTraits: ["source.institutional_legal_pluralism", "source.nonstate_legal_orders"],
    requiredTraits: [{ all: ["source.institutional_legal_pluralism"], min: 0.5 }],
    antiTraits: ["source.objective_morality"],
    specificityBonus: 0.05,
    description: "Institutional legal pluralism: sufficiently organized social institutions can themselves constitute genuine legal orders, so the state is one legal order among others rather than the conceptual monopoly source of law.",
    related: ["Maurice Hauriou", "Otto von Gierke", "Eugen Ehrlich"]
  },
  {
    id: "geny",
    name: "François Gény",
    tier: "specialist",
    identityIds: ["sociological_jurist"],
    crossCuttingIdentityIds: ["interpretive_pluralist", "purposivist"],
    crossCuttingRequirements: {
      interpretive_pluralist: [{ all: ["method.modal_pluralism"], min: 0.45 }],
      purposivist: [{ all: ["constraint.purpose"], min: 0.4 }]
    },
    axisSignature: {
      cons: { target: 34, weight: 0.5 },
      form: { target: 38, weight: 0.35 }
    },
    signatureTraits: ["method.free_scientific_research", "method.law_in_action"],
    requiredTraits: [{ all: ["method.free_scientific_research"], min: 0.5 }],
    antiTraits: ["constraint.textual"],
    description: "Free Scientific Research: authoritative positive sources govern where they answer the case, but genuine gaps call for disciplined inquiry into social facts, justice, equity, and the nature of things rather than fictitious textual deduction.",
    related: ["Roscoe Pound", "Eugen Ehrlich"]
  },
  {
    id: "scalia_manning_easterbrook",
    name: "John Manning",
    tier: "main",
    identityIds: ["textualist"],
    axisSignature: {
      cons: { target: 94, weight: 1 },
      form: { target: 86, weight: 0.55 },
      separ: { target: 76, weight: 0.3 }
    },
    signatureTraits: ["constraint.textual", "constraint.enacted_bargain", "form.anti_discretion", "separation.independent_judicial_interpretation"],
    requiredTraits: [],
    antiTraits: ["constraint.purpose", "constraint.best_reading_context", "method.categorical_textual_rights"],
    description: "Mainline New Textualism: enacted language and compromise control, judicial repair is disfavored, and rules constrain interpreters even when the result is awkward.",
    related: ["Antonin Scalia", "Frank Easterbrook"]
  },
  {
    id: "kavanaugh_barrett",
    name: "Brett Kavanaugh",
    tier: "specialist",
    identityIds: ["textualist"],
    crossCuttingIdentityIds: ["public_meaning_originalist", "originalist"],
    crossCuttingRequirements: {
      public_meaning_originalist: [
        { all: ["constraint.best_reading_context", "separation.independent_judicial_interpretation"], min: 0.5 }
      ],
      originalist: [
        { all: ["constraint.best_reading_context", "separation.independent_judicial_interpretation"], min: 0.5 }
      ]
    },
    axisSignature: {
      cons: { target: 90, weight: 1 },
      time: { target: 82, weight: 0.35 },
      separ: { target: 78, weight: 0.3 },
      form: { target: 70, weight: 0.2 }
    },
    signatureTraits: ["constraint.textual", "constraint.contextual_textualism", "constraint.best_reading_context", "separation.independent_judicial_interpretation"],
    requiredTraits: [{ all: ["constraint.best_reading_context"], min: 0.5 }],
    specificityBonus: 0.035,
    antiTraits: ["constraint.intent", "separation.interpretive_accommodation"],
    description: "Modern best-reading Textualism: choose the better linguistic reading using ordinary usage and whole-text context, paired with comparatively court-centered responsibility for resolving legal ambiguity.",
    related: ["Amy Coney Barrett"]
  },
  {
    id: "kagan",
    name: "Elena Kagan",
    tier: "specialist",
    identityIds: ["textualist"],
    axisSignature: {
      cons: { target: 82, weight: 0.8 },
      prec: { target: 88, weight: 0.6 },
      separ: { target: 34, weight: 0.45 }
    },
    signatureTraits: ["constraint.textual", "constraint.contextual_textualism", "constraint.best_reading_context", "precedent.settlement", "separation.interpretive_accommodation"],
    requiredTraits: [
      { all: ["constraint.best_reading_context"], min: 0.5 },
      { all: ["separation.interpretive_accommodation"], min: 0.5 }
    ],
    antiTraits: ["separation.independent_judicial_interpretation", "separation.strong_nondelegation"],
    specificityBonus: 0.025,
    description: "Institutionalist contextual Textualism: text and whole-statute context remain central while precedent, delegated institutional responsibility, expertise, and administrability retain substantial weight.",
    related: ["Henry Hart / Albert Sacks", "Stephen Breyer", "Robert Katzmann"]
  },
  {
    id: "ekins_intentionalism",
    name: "Richard Ekins",
    tier: "main",
    identityIds: ["intentionalist"],
    axisSignature: { cons: { target: 32, weight: 0.55 } },
    signatureTraits: ["constraint.intent", "constraint.actual_group_intent"],
    requiredTraits: [{ all: ["constraint.intent"], min: 0.5 }],
    antiTraits: ["constraint.imaginative_reconstruction"],
    description: "Modern institutional Intentionalism: the legislature can form a genuine lawmaking intention whose intended meaning is inferred from the enacted choice and its context.",
    related: ["Richard Ekins", "Steven Knapp", "Walter Benn Michaels"]
  },
  {
    id: "katzmann",
    name: "Robert A. Katzmann",
    tier: "specialist",
    identityIds: ["intentionalist"],
    crossCuttingIdentityIds: ["legal_process_theorist", "purposivist"],
    crossCuttingRequirements: {
      legal_process_theorist: [{ all: ["method.congress_aware_interpretation"], min: 0.5 }],
      purposivist: [{ all: ["method.congress_aware_interpretation"], min: 0.5 }]
    },
    axisSignature: {
      cons: { target: 38, weight: 0.65 },
      prec: { target: 80, weight: 0.35 }
    },
    signatureTraits: ["constraint.intent", "method.congress_aware_interpretation", "method.reliable_legislative_history"],
    requiredTraits: [{ all: ["method.congress_aware_interpretation"], min: 0.5 }],
    antiTraits: ["constraint.imaginative_reconstruction", "constraint.enacted_bargain"],
    specificityBonus: 0.04,
    description: "Congress-aware Intentionalism: statutory meaning should be informed by how Congress actually legislates and communicates its purposes, including reliable legislative history and institutional process rather than an abstract reconstruction of a unitary legislative mind.",
    related: ["Victoria Nourse", "Abbe Gluck", "Lisa Schultz Bressman"]
  },
  {
    id: "hand_posner_imaginative",
    name: "Learned Hand / early Richard Posner",
    tier: "specialist",
    identityIds: ["intentionalist"],
    axisSignature: { cons: { target: 28, weight: 0.5 } },
    signatureTraits: ["constraint.intent", "constraint.imaginative_reconstruction"],
    requiredTraits: [{ all: ["constraint.imaginative_reconstruction"], min: 0.5 }],
    antiTraits: ["constraint.actual_group_intent"],
    description: "Imaginative Reconstruction: when lawmakers never confronted the case, ask what they would have intended had the issue been presented to them.",
    related: ["Learned Hand", "Richard Posner"]
  },
  {
    id: "wechsler",
    name: "Herbert Wechsler",
    tier: "specialist",
    identityIds: ["legal_process_theorist"],
    axisSignature: {
      cons: { target: 34, weight: 0.35 },
      form: { target: 70, weight: 0.35 }
    },
    signatureTraits: ["method.reasoned_elaboration", "method.neutral_principles"],
    requiredTraits: [{ all: ["method.neutral_principles"], min: 0.5 }],
    antiTraits: [],
    description: "Neutral-principles Legal Process: constitutional decisions should rest on generalizable principles capable of application beyond the parties and desired outcome.",
    related: ["Herbert Wechsler", "Henry Hart", "Albert Sacks"]
  },
  {
    id: "eskridge_frickey",
    name: "William Eskridge / Philip Frickey",
    tier: "specialist",
    identityIds: ["interpretive_pluralist"],
    crossCuttingIdentityIds: ["purposivist"],
    crossCuttingRequirements: {
      purposivist: [{ all: ["constraint.purpose"], min: 0.35 }]
    },
    axisSignature: { cons: { target: 36, weight: 0.35 } },
    signatureTraits: ["method.modal_pluralism", "method.practical_reasoning"],
    requiredTraits: [{ all: ["method.practical_reasoning"], min: 0.5 }],
    antiTraits: [],
    description: "Practical-Reasoning pluralism: text, history, purpose, legal context, consequences, and policy receive context-sensitive weight rather than a fixed hierarchy.",
    related: ["William Eskridge", "Philip Frickey"]
  },
  {
    id: "felix_cohen",
    name: "Felix S. Cohen",
    tier: "specialist",
    identityIds: ["legal_realist"],
    axisSignature: {},
    signatureTraits: ["realism.underdetermination", "realism.functional_anti_conceptual"],
    requiredTraits: [{ all: ["realism.functional_anti_conceptual"], min: 0.5 }],
    antiTraits: ["realism.fact_skepticism"],
    description: "Functional Realism: abstract legal concepts should be translated into the concrete conduct, social effects, and normative choices they actually represent.",
    related: ["Felix S. Cohen", "Karl Llewellyn"]
  },
  {
    id: "frank",
    name: "Jerome Frank",
    tier: "specialist",
    identityIds: ["legal_realist"],
    axisSignature: {},
    signatureTraits: ["realism.extra_doctrinal", "realism.fact_skepticism"],
    requiredTraits: [{ all: ["realism.fact_skepticism"], min: 0.5 }],
    antiTraits: [],
    description: "Fact-skeptical Realism: legal uncertainty often originates in witnesses, credibility, trial factfinding, psychology, and the reconstruction of what actually happened.",
    related: ["Jerome Frank", "Karl Llewellyn"]
  },
  {
    id: "thayer",
    name: "James Bradley Thayer",
    tier: "specialist",
    identityIds: ["thayerian"],
    axisSignature: { post: { target: 97, weight: 1 } },
    signatureTraits: ["posture.clear_error"],
    requiredTraits: [{ all: ["posture.clear_error"], min: 0.5 }],
    antiTraits: ["posture.rights_trumps", "posture.reasonable_disagreement"],
    description: "The clear-error deference specialist: courts retain judicial review but uphold any legislative constitutional judgment within the range of reasonable interpretation.",
    related: ["Learned Hand", "Felix Frankfurter", "Oliver Wendell Holmes Jr."]
  },
  {
    id: "waldron",
    name: "Jeremy Waldron",
    tier: "main",
    identityIds: ["political_constitutionalist"],
    crossCuttingIdentityIds: ["positivist"],
    crossCuttingRequirements: {
      positivist: [
        { all: ["source.normative_positivism", "posture.reasonable_disagreement"], min: 0.5 }
      ]
    },
    axisSignature: { post: { target: 96, weight: 1 } },
    signatureTraits: ["posture.democratic_legitimacy", "posture.reasonable_disagreement"],
    requiredTraits: [{ all: ["posture.reasonable_disagreement"], min: 0.5 }],
    antiTraits: ["posture.judicial_supremacy", "posture.clear_error_only"],
    description: "Political Constitutionalism: under functioning democratic institutions and reasonable rights disagreement, representative political processes retain the stronger claim to final constitutional authority.",
    related: ["Richard Bellamy", "J. A. G. Griffith", "Adam Tomkins", "Grégoire Webber"]
  },
  {
    id: "kramer",
    name: "Larry Kramer",
    tier: "specialist",
    identityIds: ["popular_constitutionalist"],
    axisSignature: { post: { target: 88, weight: 0.75 } },
    signatureTraits: ["posture.anti_judicial_supremacy", "posture.popular_authority"],
    requiredTraits: [
      { all: ["posture.anti_judicial_supremacy", "posture.popular_authority"], min: 0.45 }
    ],
    antiTraits: ["posture.judicial_supremacy"],
    description: "Popular Constitutionalism: ultimate constitutional authority remains with the people and democratic constitutional politics rather than becoming the exclusive property of courts.",
    related: ["Mark Tushnet"]
  },
  {
    id: "walsh_departmentalism",
    name: "Kevin Walsh",
    tier: "specialist",
    identityIds: ["departmentalist"],
    axisSignature: { post: { target: 84, weight: 0.55 } },
    signatureTraits: ["posture.anti_judicial_supremacy", "posture.branch_interpretation"],
    requiredTraits: [
      { all: ["posture.anti_judicial_supremacy", "posture.branch_interpretation"], min: 0.45 }
    ],
    antiTraits: ["posture.popular_authority"],
    description: "Judicial Departmentalism: judicial judgments and precedent are authoritative within the judicial department without making the Supreme Court's constitutional interpretation uniquely binding on every governmental actor.",
    related: ["Abraham Lincoln", "Thomas Jefferson"]
  },
  {
    id: "gardbaum",
    name: "Stephen Gardbaum",
    tier: "specialist",
    identityIds: ["mixed_jurisprudence"],
    crossCuttingIdentityIds: ["political_constitutionalist", "political_process_jurist", "minimalist"],
    crossCuttingRequirements: {
      political_constitutionalist: [{ all: ["posture.structured_legislative_response"], min: 0.5 }],
      political_process_jurist: [{ all: ["posture.structured_legislative_response"], min: 0.5 }],
      minimalist: [{ all: ["posture.structured_legislative_response"], min: 0.5 }]
    },
    axisSignature: { post: { target: 58, weight: 0.45 } },
    signatureTraits: ["posture.dialogic", "posture.weak_form", "posture.structured_legislative_response"],
    requiredTraits: [{ all: ["posture.structured_legislative_response"], min: 0.5 }],
    antiTraits: ["posture.judicial_supremacy", "posture.popular_authority"],
    specificityBonus: 0.03,
    description: "Weak-form / New Commonwealth constitutionalism at champion level: courts independently adjudicate rights while legislatures retain a structured, legally authorized capacity to respond without constitutional amendment.",
    related: ["Mark Tushnet", "Rosalind Dixon", "Peter Hogg / Allison Bushell"]
  },
  {
    id: "ely",
    name: "John Hart Ely",
    tier: "main",
    identityIds: ["political_process_jurist"],
    axisSignature: { post: { target: 48, weight: 0.25 } },
    signatureTraits: ["posture.process_reinforcement", "posture.conditional_intervention"],
    requiredTraits: [{ all: ["posture.process_reinforcement"], min: 0.5 }],
    antiTraits: ["posture.responsive_review"],
    description: "Political-process / representation-reinforcement review: ordinary substantive disagreements stay with politics, while courts intervene aggressively when democratic channels are blocked or distorted.",
    related: ["Carolene Products Footnote Four", "Henry Hart / Albert Sacks"]
  },
  {
    id: "dixon_responsive",
    name: "Rosalind Dixon",
    tier: "specialist",
    identityIds: ["political_process_jurist"],
    axisSignature: {
      post: { target: 48, weight: 0.3 },
      remed: { target: 58, weight: 0.2 }
    },
    signatureTraits: ["posture.process_reinforcement", "posture.responsive_review"],
    requiredTraits: [{ all: ["posture.responsive_review"], min: 0.5 }],
    antiTraits: [],
    description: "Responsive Judicial Review: tailor the timing, intensity, reasoning, and remedies of review to specific democratic blind spots, burdens of inertia or monopoly, and the judiciary's comparative capacity.",
    related: ["John Hart Ely", "Stephen Gardbaum"]
  },
  {
    id: "bickel",
    name: "Alexander Bickel",
    tier: "specialist",
    identityIds: ["minimalist"],
    axisSignature: {
      post: { target: 72, weight: 0.45 },
      remed: { target: 80, weight: 0.55 }
    },
    signatureTraits: ["posture.passive_virtues"],
    requiredTraits: [{ all: ["posture.passive_virtues"], min: 0.5 }],
    antiTraits: [],
    description: "Passive-virtues Minimalism: strategic avoidance, timing, and justiciability are themselves tools for managing the counter-majoritarian difficulty.",
    related: ["Cass Sunstein", "James Bradley Thayer"]
  },
  {
    id: "ackerman",
    name: "Bruce Ackerman",
    tier: "specialist",
    identityIds: ["living_constitutionalist"],
    axisSignature: {
      time: { target: 18, weight: 0.8 },
      post: { target: 58, weight: 0.45 }
    },
    signatureTraits: ["time.constitutional_moments"],
    requiredTraits: [{ all: ["time.constitutional_moments"], min: 0.5 }],
    antiTraits: ["time.transformative_constitutionalism"],
    specificityBonus: 0.03,
    description: "Constitutional-moments theory: extraordinary episodes of sustained, higher-law popular mobilization can legitimately produce constitutional change outside ordinary politics and without Article V amendment.",
    related: ["Larry Kramer", "Robert Post", "Reva Siegel", "Jack Balkin"]
  },
  {
    id: "bobbitt",
    name: "Philip Bobbitt",
    tier: "main",
    identityIds: ["interpretive_pluralist"],
    axisSignature: {},
    signatureTraits: ["method.modal_pluralism"],
    requiredTraits: [{ all: ["method.modal_pluralism"], min: 0.5 }],
    antiTraits: ["method.practical_reasoning"],
    description: "Modal constitutional pluralism: text, history, structure, doctrine, prudence, and ethos are distinct legitimate forms of constitutional argument rather than inputs to one master method.",
    related: ["Philip Bobbitt", "William Eskridge", "Philip Frickey"]
  },
  {
    id: "charles_black",
    name: "Charles L. Black Jr.",
    tier: "specialist",
    identityIds: ["mixed_jurisprudence"],
    crossCuttingIdentityIds: ["positivist", "interpretive_pluralist", "common_law_constitutionalist", "living_constitutionalist"],
    crossCuttingRequirements: {
      positivist: [{ all: ["method.structural_inference"], min: 0.5 }],
      interpretive_pluralist: [{ all: ["method.structural_inference"], min: 0.5 }],
      common_law_constitutionalist: [{ all: ["method.structural_inference"], min: 0.5 }],
      living_constitutionalist: [{ all: ["method.structural_inference"], min: 0.5 }]
    },
    axisSignature: {},
    signatureTraits: ["method.structural_inference", "method.holistic_constitution"],
    requiredTraits: [{ all: ["method.structural_inference"], min: 0.5 }],
    antiTraits: [],
    specificityBonus: 0.025,
    description: "Structural constitutional inference: constitutional rules can follow from the relationships and architecture created by the Constitution as a whole even when no single clause expressly states the rule.",
    related: ["Akhil Reed Amar", "Philip Bobbitt"]
  },
  {
    id: "vermeule",
    name: "Adrian Vermeule",
    tier: "specialist",
    identityIds: ["common_good_constitutionalist"],
    axisSignature: {
      sorc: { target: 5, weight: 0.85 },
      cons: { target: 18, weight: 0.6 },
      post: { target: 68, weight: 0.55 },
      separ: { target: 24, weight: 0.35 }
    },
    signatureTraits: ["method.common_good", "time.classical_tradition"],
    requiredTraits: [{ all: ["method.common_good"], min: 0.5 }],
    antiTraits: ["time.public_meaning"],
    description: "A rare classical/common-good fit: non-positivist and purposive legal reasoning combined with a strong account of legitimate public authority.",
    related: ["John Finnis"]
  },
  {
    id: "fiss",
    name: "Owen Fiss",
    tier: "specialist",
    identityIds: [],
    globalSpecialist: true,
    axisSignature: {
      remed: { target: 3, weight: 1 },
      post: { target: 18, weight: 0.45 }
    },
    minAxisSalience: { remed: 0.75 },
    signatureTraits: ["remedies.structural", "remedies.supervision", "posture.countermajoritarian"],
    requiredTraits: [
      { all: ["remedies.structural", "remedies.supervision"], min: 0.65 }
    ],
    antiTraits: ["remedies.party_specific"],
    description: "The structural-remedies specialist: adjudication can vindicate public values through institutional reform and continuing judicial supervision.",
    related: ["Abram Chayes", "P. N. Bhagwati"]
  },
  {
    id: "bhagwati_iyer",
    name: "P. N. Bhagwati / V. R. Krishna Iyer",
    tier: "specialist",
    identityIds: ["sociological_jurist"],
    crossCuttingIdentityIds: ["living_constitutionalist", "purposivist"],
    crossCuttingRequirements: {
      living_constitutionalist: [{ all: ["time.living_content"], min: 0.3 }],
      purposivist: [{ all: ["constraint.purpose"], min: 0.35 }]
    },
    axisSignature: {
      remed: { target: 5, weight: 1 },
      post: { target: 8, weight: 0.8 },
      cons: { target: 20, weight: 0.4 },
      form: { target: 28, weight: 0.3 }
    },
    signatureTraits: ["remedies.public_interest_litigation", "remedies.access_relaxation"],
    requiredTraits: [{ all: ["remedies.public_interest_litigation"], min: 0.5 }],
    antiTraits: ["remedies.party_specific"],
    description: "Indian social-action/PIL judging: relax standing and procedural barriers, innovate access to court, and use systemic constitutional remedies so disadvantaged groups can obtain effective rights enforcement.",
    related: ["Owen Fiss", "Abram Chayes"]
  },
  {
    id: "bray",
    name: "Samuel Bray",
    tier: "specialist",
    globalSpecialist: true,
    identityIds: [],
    axisSignature: { remed: { target: 97, weight: 1 } },
    minAxisSalience: { remed: 0.70 },
    signatureTraits: ["remedies.party_specific", "remedies.incremental", "remedies.traditional_equity"],
    requiredTraits: [{ all: ["remedies.traditional_equity"], min: 0.5 }],
    antiTraits: ["remedies.structural", "remedies.universal"],
    description: "Traditional-equity remedialism: judicial remedial authority is bounded by historically grounded equitable forms and ordinarily remains party-specific rather than expanding to whatever systemic relief seems most effective.",
    related: ["John Harrison", "Mila Sohoni", "Amanda Frost"]
  },
  {
    id: "sohoni_frost",
    name: "Mila Sohoni / Amanda Frost",
    tier: "specialist",
    globalSpecialist: true,
    identityIds: [],
    axisSignature: { remed: { target: 6, weight: 1 } },
    minAxisSalience: { remed: 0.70 },
    signatureTraits: ["remedies.universal", "remedies.universal_relief_theory"],
    requiredTraits: [{ all: ["remedies.universal_relief_theory"], min: 0.5 }],
    antiTraits: ["remedies.party_specific"],
    description: "Universal-relief specialist: courts may in appropriate cases restrain unlawful government action beyond the named plaintiff when broader relief is justified by the nature of the legal violation and the remedial authority being exercised.",
    related: ["Samuel Bray"]
  },
  {
    id: "chayes",
    name: "Abram Chayes",
    tier: "lineage",
    selectable: false,
    identityIds: [],
    axisSignature: { remed: { target: 7, weight: 0.8 } },
    signatureTraits: ["remedies.structural", "remedies.supervision"],
    requiredTraits: [],
    antiTraits: ["remedies.party_specific"],
    description: "Canonical public-law-litigation lineage closely adjacent to Fiss; not separately selectable under the Alexander/Kaye anti-redundancy threshold.",
    related: ["Owen Fiss"]
  },
  {
    id: "monaghan",
    name: "Henry Monaghan",
    tier: "specialist",
    identityIds: ["mixed_jurisprudence"],
    crossCuttingIdentityIds: ["positivist", "legal_process_theorist", "common_law_constitutionalist"],
    crossCuttingRequirements: {
      positivist: [{ all: ["remedies.constitutional_common_law"], min: 0.5 }],
      legal_process_theorist: [{ all: ["remedies.constitutional_common_law"], min: 0.5 }],
      common_law_constitutionalist: [{ all: ["remedies.constitutional_common_law"], min: 0.5 }]
    },
    axisSignature: {},
    signatureTraits: ["remedies.prophylactic", "remedies.constitutional_common_law"],
    requiredTraits: [{ all: ["remedies.constitutional_common_law"], min: 0.5 }],
    antiTraits: [],
    specificityBonus: 0.03,
    description: "Constitutional-common-law specialist: courts may construct implementing doctrines broader than the constitutional minimum while treating those doctrines as legally distinct from the underlying constitutional command.",
    related: ["Richard Fallon", "David Strauss"]
  },
  {
    id: "levinson",
    name: "Daryl Levinson",
    tier: "specialist",
    globalSpecialist: true,
    identityIds: [],
    axisSignature: {},
    signatureTraits: ["remedies.equilibration"],
    requiredTraits: [{ all: ["remedies.equilibration"], min: 0.5 }],
    antiTraits: [],
    specificityBonus: 0.03,
    description: "Remedial equilibration: the anticipated costs and institutional consequences of remedies can feed back into how courts define the scope of the underlying constitutional right itself.",
    related: ["Henry Monaghan", "Owen Fiss"]
  },
  {
    id: "peter_strauss",
    name: "Peter Strauss",
    tier: "specialist",
    identityIds: ["functionalist"],
    axisSignature: { separ: { target: 3, weight: 1 } },
    minAxisSalience: { separ: 0.55 },
    signatureTraits: ["separation.functionalist", "separation.assigned_independence", "separation.interpretive_accommodation", "separation.administrative_adjudication"],
    requiredTraits: [],
    antiTraits: ["separation.formalist"],
    description: "The specialist for functional separation-of-powers analysis: institutional overlap can be legitimate when accountability and each branch's core capacities remain workable.",
    related: ["Stephen Breyer"]
  },
  {
    id: "metzger",
    name: "Gillian E. Metzger",
    tier: "specialist",
    identityIds: ["functionalist"],
    crossCuttingIdentityIds: ["legal_process_theorist"],
    crossCuttingRequirements: {
      legal_process_theorist: [{ all: ["separation.supervisory_duty"], min: 0.5 }]
    },
    axisSignature: {
      separ: { target: 18, weight: 0.7 },
      post: { target: 48, weight: 0.25 }
    },
    signatureTraits: ["separation.supervisory_duty", "separation.administrative_constitutionalism", "separation.functionalist"],
    requiredTraits: [{ all: ["separation.supervisory_duty"], min: 0.5 }],
    antiTraits: ["separation.unitary_executive", "separation.strong_nondelegation"],
    specificityBonus: 0.04,
    description: "Supervisory administrative constitutionalism: modern administration is constitutionally legitimate and itself implements constitutional norms, while constitutional structure still requires meaningful systemic supervision and accountability without collapsing supervision into plenary presidential control.",
    related: ["Peter Strauss", "Jerry Mashaw"]
  },
  {
    id: "lawson",
    name: "Gary Lawson",
    tier: "specialist",
    identityIds: ["formalist"],
    crossCuttingIdentityIds: ["public_meaning_originalist", "originalist"],
    crossCuttingRequirements: {
      public_meaning_originalist: [{ all: ["separation.strong_nondelegation"], min: 0.5 }],
      originalist: [{ all: ["separation.strong_nondelegation"], min: 0.5 }]
    },
    axisSignature: {
      separ: { target: 97, weight: 1 }
    },
    minAxisSalience: { separ: 0.55 },
    signatureTraits: ["separation.formalist", "separation.nondelegation", "separation.strong_nondelegation", "separation.judicial_power_boundary"],
    requiredTraits: [],
    antiTraits: ["separation.functionalist"],
    description: "The specialist for hard structural formalism: constitutionally assigned powers and anti-delegation constraints remain binding even when functional arrangements seem more efficient.",
    related: ["Antonin Scalia", "Steven Calabresi", "Saikrishna Prakash"]
  },
  {
    id: "calabresi_prakash",
    name: "Steven Calabresi / Saikrishna Prakash",
    tier: "specialist",
    identityIds: ["formalist"],
    crossCuttingIdentityIds: ["public_meaning_originalist", "originalist"],
    crossCuttingRequirements: {
      public_meaning_originalist: [{ all: ["separation.unitary_executive"], min: 0.5 }],
      originalist: [{ all: ["separation.unitary_executive"], min: 0.5 }]
    },
    axisSignature: {
      separ: { target: 95, weight: 0.9 }
    },
    minAxisSalience: { separ: 0.55 },
    signatureTraits: ["separation.formalist", "separation.unitary_executive"],
    requiredTraits: [{ all: ["separation.unitary_executive"], min: 0.5 }],
    specificityBonus: 0.05,
    antiTraits: ["separation.functionalist"],
    description: "Unitary-executive Formalism: Article II places executive administration under presidential control rather than permitting Congress to insulate executive officers from presidential supervision.",
    related: ["Gary Lawson"]
  },
  {
    id: "leiter",
    name: "Brian Leiter",
    tier: "specialist",
    identityIds: ["legal_realist", "positivist"],
    axisSignature: { sorc: { target: 92, weight: 0.7 } },
    signatureTraits: ["realism.underdetermination", "realism.empirical_prediction", "source.source_thesis"],
    requiredTraits: [
      { all: ["realism.underdetermination", "realism.empirical_prediction"], min: 0.45 }
    ],
    antiTraits: ["realism.fact_skepticism", "realism.functional_anti_conceptual"],
    specificityBonus: 0.05,
    description: "Naturalized contemporary Legal Realism: empirical explanation of adjudication and rational indeterminacy are combined with a positivist account of law rather than a freestanding normative theory of judging.",
    related: ["Karl Llewellyn", "H. L. A. Hart"]
  },
  {
    id: "llewellyn",
    name: "Karl Llewellyn",
    tier: "main",
    identityIds: ["legal_realist"],
    axisSignature: {},
    signatureTraits: ["realism.underdetermination", "realism.law_in_action", "realism.extra_doctrinal"],
    requiredTraits: [
      { all: ["realism.underdetermination", "realism.extra_doctrinal"], min: 0.45 }
    ],
    antiTraits: ["realism.fact_skepticism", "realism.functional_anti_conceptual"],
    description: "Mature American Legal Realism: doctrine often underdetermines hard cases, so situation sense, law in action, and actual institutional behavior matter.",
    related: ["Jerome Frank", "Felix S. Cohen", "Oliver Wendell Holmes Jr."]
  },
  {
    id: "oconnor",
    name: "Sandra Day O'Connor",
    tier: "catchall",
    identityIds: ["interpretive_pluralist", "minimalist", "mixed_jurisprudence"],
    axisSignature: {
      prec: { target: 70, weight: 0.45 },
      remed: { target: 74, weight: 0.45 },
      form: { target: 34, weight: 0.45 }
    },
    signatureTraits: ["method.case_by_case", "method.anti_grand_theory"],
    requiredTraits: [],
    antiTraits: [],
    description: "A deliberately low-theory judicial fit: contextual, fact-sensitive, incremental decisionmaking with balancing and respect for precedent rather than a comprehensive jurisprudential system.",
    related: ["Bertha Wilson"]
  },

  /* Lineage/further reading only. These never win a match. */
  {
    id: "savigny",
    name: "Friedrich Carl von Savigny",
    tier: "lineage",
    selectable: false,
    identityIds: ["common_law_constitutionalist"],
    axisSignature: {},
    signatureTraits: ["time.organic_tradition"],
    requiredTraits: [],
    antiTraits: [],
    description: "Historical School lineage: law develops organically through custom, legal culture, and inherited social practice rather than simply being designed from above.",
    related: []
  },
]);
