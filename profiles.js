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
    requiredTraits: [{ any: ["source.social_practice", "source.law_runs_out"], min: 0.35 }],
    antiTraits: ["source.objective_morality", "source.normative_positivism"],
    description: "Baseline modern positivism: recognized social sources make law, and open texture can leave genuine hard-case discretion.",
    related: ["Jules Coleman", "Wil Waluchow", "Joseph Raz", "Hans Kelsen"]
  },
  {
    id: "coleman_waluchow_kramer",
    name: "Jules Coleman / Wil Waluchow / Matthew Kramer",
    tier: "specialist",
    identityIds: ["positivist"],
    axisSignature: { sorc: { target: 94, weight: 1 } },
    signatureTraits: ["source.morality_incorporated", "source.positive_sources"],
    requiredTraits: [{ all: ["source.morality_incorporated"], min: 0.5 }],
    antiTraits: ["source.source_thesis"],
    description: "Inclusive Positivism: a source-grounded legal system can itself make genuine moral correctness a criterion of legal validity.",
    related: ["H. L. A. Hart", "Kenneth Einar Himma"]
  },
  {
    id: "raz_shapiro_marmor",
    name: "Joseph Raz / Scott Shapiro / Andrei Marmor",
    tier: "specialist",
    identityIds: ["positivist"],
    axisSignature: { sorc: { target: 97, weight: 1 } },
    signatureTraits: ["source.source_thesis", "source.positive_sources"],
    requiredTraits: [{ all: ["source.source_thesis"], min: 0.5 }],
    antiTraits: ["source.morality_incorporated", "source.objective_morality"],
    description: "Exclusive Positivism: legal validity must remain identifiable from social/source facts without making moral merits themselves the test of what law exists.",
    related: ["Joseph Raz", "Scott Shapiro", "Andrei Marmor", "Leslie Green"]
  },
  {
    id: "campbell_waldron_schauer",
    name: "Tom Campbell / Jeremy Waldron / Frederick Schauer",
    tier: "specialist",
    identityIds: ["positivist"],
    axisSignature: { sorc: { target: 94, weight: 1 } },
    signatureTraits: ["source.normative_positivism", "form.anti_discretion", "posture.majoritarian"],
    requiredTraits: [{ all: ["source.normative_positivism"], min: 0.5 }],
    antiTraits: ["source.objective_morality"],
    description: "Normative/Ethical Positivism: source-based legality is not just a conceptual fact but a desirable institutional discipline that limits contested merits-based judicial lawmaking.",
    related: ["Tom Campbell", "Jeremy Waldron", "Frederick Schauer"]
  },
  {
    id: "dworkin_stavropoulos",
    name: "Ronald Dworkin / Nicos Stavropoulos",
    tier: "main",
    identityIds: ["interpretivist"],
    axisSignature: {
      sorc: { target: 8, weight: 1 },
      post: { target: 24, weight: 0.35 }
    },
    signatureTraits: ["source.principles_are_law", "source.fit_and_justification", "source.right_answer"],
    requiredTraits: [{ any: ["source.principles_are_law", "source.fit_and_justification"], min: 0.45 }],
    antiTraits: ["source.law_runs_out"],
    description: "Central legal Interpretivism: institutional practice bears on legal rights through the principles that best fit and justify that practice.",
    related: ["Ronald Dworkin", "Nicos Stavropoulos", "T.R.S. Allan"]
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
    name: "John Finnis / Mark Murphy / Robert P. George",
    tier: "main",
    identityIds: ["natural_lawyer"],
    axisSignature: { sorc: { target: 6, weight: 1 } },
    signatureTraits: ["source.objective_morality", "source.positive_law_settlement"],
    requiredTraits: [
      { all: ["source.objective_morality"], min: 0.35 },
      { all: ["source.positive_law_settlement"], min: 0.35 }
    ],
    antiTraits: ["source.principles_are_law"],
    description: "Central modern Natural Law: objective practical morality matters to law, while positive law retains an important settlement, coordination, and institutional-authority function.",
    related: ["Thomas Aquinas", "William Blackstone", "Jonathan Crowe"]
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
    crossCuttingIdentityIds: ["formalist"],
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
    name: "Larry Alexander / Richard Kay / Saikrishna Prakash",
    tier: "specialist",
    identityIds: ["original_intent_originalist", "originalist"],
    axisSignature: { time: { target: 94, weight: 1 } },
    signatureTraits: ["time.original_intent", "time.intent_as_meaning"],
    requiredTraits: [{ all: ["time.intent_as_meaning"], min: 0.5 }],
    antiTraits: ["time.public_meaning"],
    description: "Modern strong intentionalism: intended communication is the semantic object of interpretation, not merely a device for judicial restraint.",
    related: ["Larry Alexander", "Richard Kay", "Saikrishna Prakash"]
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
    name: "Antonin Scalia / John Manning",
    tier: "main",
    identityIds: ["public_meaning_originalist", "originalist"],
    crossCuttingIdentityIds: ["formalist"],
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
    related: ["Antonin Scalia", "John Manning"]
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
    id: "mcconnell_green",
    name: "Michael McConnell / Christopher Green",
    tier: "specialist",
    identityIds: ["public_meaning_originalist", "originalist"],
    axisSignature: { time: { target: 88, weight: 1 } },
    signatureTraits: ["time.public_meaning", "time.principle_originalism"],
    requiredTraits: [{ all: ["time.principle_originalism"], min: 0.5 }],
    antiTraits: ["time.expected_applications", "time.common_law_development"],
    description: "Principle/application originalism: fixed historical principles can govern new circumstances even when the adopters expected different concrete applications.",
    related: ["Michael McConnell", "Christopher Green"]
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
    signatureTraits: ["time.fixation", "precedent.correctness_first"],
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
    signatureTraits: ["time.fixation", "precedent.stability", "precedent.settlement"],
    requiredTraits: [],
    antiTraits: ["precedent.correctness_first"],
    description: "Precedent-accommodating originalism: original meaning remains authoritative while stare decisis, reliance, and legal settlement retain substantial force.",
    related: ["Amy Coney Barrett"]
  },
  {
    id: "natural_law_originalists",
    name: "Pojanowski / Walsh / Alicea / Strang",
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
    related: ["Jeffrey Pojanowski", "Kevin Walsh", "J. Joel Alicea", "Lee Strang"]
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
    minAxisSalience: { form: 0.5 },
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
    axisSignature: {
      form: { target: 4, weight: 1 },
      sorc: { target: 16, weight: 0.6 }
    },
    signatureTraits: ["form.proportionality", "source.claim_to_correctness"],
    requiredTraits: [{ all: ["form.proportionality"], min: 0.5 }],
    antiTraits: ["form.rules"],
    description: "A specialist fit for structured proportionality and principles understood as optimization requirements, especially when paired with non-positivism.",
    related: ["Aharon Barak", "German Federal Constitutional Court"]
  },
  {
    id: "cardozo",
    name: "Benjamin Cardozo",
    tier: "main",
    identityIds: ["pragmatist"],
    crossCuttingIdentityIds: ["common_law_constitutionalist", "sociological_jurist"],
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
    axisSignature: {
      cons: { target: 16, weight: 0.85 },
      separ: { target: 16, weight: 0.7 },
      form: { target: 24, weight: 0.6 },
      post: { target: 56, weight: 0.2 }
    },
    signatureTraits: ["constraint.purpose", "method.workability"],
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
    antiTraits: ["precedent.correctness_first"],
    description: "The clearest living-plus-stability fit: constitutional development occurs through precedent, practice, and accumulated institutional experience.",
    related: ["Friedrich Carl von Savigny", "Beverley McLachlin", "Benjamin Cardozo"]
  },
  {
    id: "sunstein",
    name: "Cass Sunstein",
    tier: "main",
    identityIds: ["minimalist"],
    axisSignature: {
      remed: { target: 91, weight: 1 },
      post: { target: 65, weight: 0.35 },
      prec: { target: 68, weight: 0.35 }
    },
    signatureTraits: ["remedies.incremental", "posture.passive_virtues"],
    requiredTraits: [],
    antiTraits: ["remedies.structural"],
    description: "The strongest fit when deciding narrowly and shallowly is itself a major commitment, leaving broader questions for later cases and democratic deliberation.",
    related: ["Alexander Bickel"]
  },
  {
    id: "hart_sacks",
    name: "Henry Hart / Albert Sacks",
    tier: "main",
    identityIds: ["legal_process_theorist"],
    crossCuttingIdentityIds: ["purposivist"],
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
    id: "pound",
    name: "Roscoe Pound",
    tier: "main",
    identityIds: ["sociological_jurist"],
    crossCuttingIdentityIds: ["pragmatist", "purposivist"],
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
    id: "scalia_manning_easterbrook",
    name: "Antonin Scalia / John Manning / Frank Easterbrook",
    tier: "main",
    identityIds: ["textualist"],
    axisSignature: {
      cons: { target: 94, weight: 1 },
      form: { target: 86, weight: 0.55 },
      separ: { target: 76, weight: 0.3 }
    },
    signatureTraits: ["constraint.textual", "constraint.enacted_bargain", "form.anti_discretion"],
    requiredTraits: [],
    antiTraits: ["constraint.purpose", "constraint.best_reading_context"],
    description: "Mainline New Textualism: enacted language and compromise control, judicial repair is disfavored, and rules constrain interpreters even when the result is awkward.",
    related: ["Antonin Scalia", "John Manning", "Frank Easterbrook"]
  },
  {
    id: "kavanaugh_barrett",
    name: "Brett Kavanaugh / Amy Coney Barrett",
    tier: "specialist",
    identityIds: ["textualist"],
    axisSignature: { cons: { target: 90, weight: 1 } },
    signatureTraits: ["constraint.textual", "constraint.contextual_textualism", "constraint.best_reading_context"],
    requiredTraits: [{ all: ["constraint.best_reading_context"], min: 0.5 }],
    antiTraits: ["constraint.intent"],
    description: "Modern best-reading Textualism: choose the better linguistic reading using ordinary usage and whole-text context rather than atomistic parsing or purposive repair.",
    related: ["Brett Kavanaugh", "Amy Coney Barrett"]
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
    antiTraits: ["posture.rights_trumps"],
    description: "The clear-error deference specialist: a judge can think another constitutional interpretation is better yet still uphold a legislature's reasonable judgment.",
    related: ["Learned Hand", "Felix Frankfurter", "Oliver Wendell Holmes Jr."]
  },
  {
    id: "waldron",
    name: "Jeremy Waldron",
    tier: "main",
    identityIds: ["waldronian"],
    axisSignature: { post: { target: 98, weight: 1 } },
    signatureTraits: ["posture.democratic_legitimacy", "posture.reasonable_disagreement"],
    requiredTraits: [{ any: ["posture.democratic_legitimacy", "posture.reasonable_disagreement"], min: 0.45 }],
    antiTraits: ["posture.judicial_supremacy"],
    description: "A rights-respecting majoritarian fit: under functioning democratic institutions and reasonable disagreement, legislatures have the stronger claim to final decision.",
    related: ["James Bradley Thayer"]
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
    description: "A specialist fit when constitutional authority ultimately belongs to the people and democratic politics rather than becoming the exclusive domain of courts.",
    related: ["Mark Tushnet"]
  },
  {
    id: "ely",
    name: "John Hart Ely",
    tier: "specialist",
    identityIds: ["elyan"],
    axisSignature: { post: { target: 48, weight: 0.25 } },
    signatureTraits: ["posture.process_reinforcement", "posture.conditional_intervention"],
    requiredTraits: [{ all: ["posture.process_reinforcement"], min: 0.5 }],
    antiTraits: [],
    description: "A representation-reinforcement fit: defer on ordinary substantive disagreements but intervene aggressively when the democratic process itself is blocked or distorted.",
    related: ["Henry Hart & Albert Sacks"]
  },
  {
    id: "bickel",
    name: "Alexander Bickel",
    tier: "specialist",
    identityIds: ["minimalist"],
    axisSignature: {
      post: { target: 72, weight: 0.55 },
      remed: { target: 80, weight: 0.45 }
    },
    signatureTraits: ["posture.passive_virtues", "posture.countermajoritarian_difficulty"],
    requiredTraits: [{ all: ["posture.passive_virtues"], min: 0.5 }],
    antiTraits: [],
    description: "A restraint fit centered on the counter-majoritarian difficulty and strategic avoidance—the passive virtues—rather than legislative supremacy as such.",
    related: ["Cass Sunstein", "James Bradley Thayer"]
  },
  {
    id: "gardbaum",
    name: "Stephen Gardbaum",
    tier: "specialist",
    identityIds: ["popular_constitutionalist"],
    axisSignature: { post: { target: 60, weight: 0.35 } },
    signatureTraits: ["posture.dialogic", "posture.weak_form"],
    requiredTraits: [{ all: ["posture.dialogic"], min: 0.5 }],
    antiTraits: [],
    description: "A weak-form-review specialist: courts enforce rights without necessarily possessing the final constitutional word over democratic institutions.",
    related: ["Rosalind Dixon", "Mark Tushnet"]
  },
  {
    id: "ackerman",
    name: "Bruce Ackerman",
    tier: "main",
    identityIds: ["living_constitutionalist"],
    axisSignature: {
      time: { target: 18, weight: 0.8 },
      post: { target: 68, weight: 0.55 }
    },
    signatureTraits: [],
    requiredTraits: [],
    antiTraits: [],
    description: "A democratic constitutional-change fit: major constitutional development can occur through extraordinary episodes of sustained popular mobilization, not only formal amendment or ordinary judicial updating.",
    related: ["Larry Kramer", "Jack Balkin"]
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
    axisSignature: {
      remed: { target: 3, weight: 1 },
      post: { target: 18, weight: 0.45 }
    },
    minAxisSalience: { remed: 0.55 },
    signatureTraits: ["remedies.structural", "remedies.supervision"],
    requiredTraits: [],
    antiTraits: ["remedies.party_specific"],
    description: "The structural-remedies specialist: adjudication can vindicate public values through institutional reform and continuing judicial supervision.",
    related: ["Abram Chayes", "P. N. Bhagwati"]
  },
  {
    id: "bray",
    name: "Samuel Bray",
    tier: "specialist",
    identityIds: [],
    axisSignature: { remed: { target: 97, weight: 1 } },
    minAxisSalience: { remed: 0.55 },
    signatureTraits: ["remedies.party_specific", "remedies.incremental"],
    requiredTraits: [],
    antiTraits: ["remedies.structural"],
    description: "A specialist for plaintiff-specific, traditional-equity instincts and strong resistance to remedies broader than the case and parties require.",
    related: []
  },
  {
    id: "peter_strauss",
    name: "Peter Strauss",
    tier: "specialist",
    identityIds: ["functionalist"],
    axisSignature: { separ: { target: 3, weight: 1 } },
    minAxisSalience: { separ: 0.55 },
    signatureTraits: ["separation.functionalist"],
    requiredTraits: [],
    antiTraits: ["separation.formalist"],
    description: "The specialist for functional separation-of-powers analysis: institutional overlap can be legitimate when accountability and each branch's core capacities remain workable.",
    related: ["Stephen Breyer"]
  },
  {
    id: "lawson",
    name: "Gary Lawson",
    tier: "specialist",
    identityIds: ["formalist"],
    axisSignature: {
      separ: { target: 97, weight: 1 },
      time: { target: 82, weight: 0.35 }
    },
    minAxisSalience: { separ: 0.55 },
    signatureTraits: ["separation.formalist"],
    requiredTraits: [],
    antiTraits: ["separation.functionalist"],
    description: "The specialist for hard structural formalism, especially when formal separation-of-powers boundaries coincide with historically fixed constitutional meaning.",
    related: ["Antonin Scalia"]
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
    identityIds: ["interpretive_pluralist", "minimalist"],
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
