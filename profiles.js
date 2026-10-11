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
  {
    id: "hart",
    name: "H. L. A. Hart",
    tier: "main",
    identityIds: ["positivist", "inclusive_positivist"],
    axisSignature: { sorc: { target: 92, weight: 1 } },
    signatureTraits: ["source.social_practice", "source.law_runs_out"],
    requiredTraits: [{ any: ["source.social_practice", "source.law_runs_out"], min: 0.35 }],
    antiTraits: ["source.objective_morality"],
    description: "A strong fit when recognized social sources make law and genuinely novel cases can leave judges with discretion to make new law.",
    related: ["Joseph Raz", "Hans Kelsen", "John Austin"]
  },
  {
    id: "raz",
    name: "Joseph Raz",
    tier: "specialist",
    identityIds: ["exclusive_positivist", "positivist"],
    axisSignature: { sorc: { target: 97, weight: 1 } },
    signatureTraits: ["source.source_thesis"],
    requiredTraits: [{ all: ["source.source_thesis"], min: 0.45 }],
    antiTraits: ["source.morality_incorporated", "source.objective_morality"],
    description: "The more source-exclusive positivist fit: legal validity turns on source-based criteria rather than moral merit.",
    related: ["H. L. A. Hart", "Hans Kelsen"]
  },
  {
    id: "dworkin",
    name: "Ronald Dworkin",
    tier: "main",
    identityIds: ["dworkinian", "interpretivist"],
    axisSignature: {
      sorc: { target: 8, weight: 1 },
      post: { target: 22, weight: 0.45 }
    },
    signatureTraits: ["source.principles_are_law", "source.fit_and_justification", "source.right_answer"],
    requiredTraits: [{ any: ["source.principles_are_law", "source.fit_and_justification"], min: 0.45 }],
    antiTraits: ["source.law_runs_out"],
    description: "A fit when legal principles are themselves part of law and hard cases call for the interpretation that best fits and justifies legal practice.",
    related: ["Lon Fuller", "Robert Alexy"]
  },
  {
    id: "finnis",
    name: "John Finnis",
    tier: "main",
    identityIds: ["natural_lawyer"],
    axisSignature: { sorc: { target: 6, weight: 1 } },
    signatureTraits: ["source.objective_morality", "source.positive_law_settlement"],
    requiredTraits: [
      { all: ["source.objective_morality"], min: 0.35 },
      { any: ["source.positive_law_settlement", "source.objective_morality"], min: 0.45 }
    ],
    antiTraits: ["source.principles_are_law"],
    description: "The central modern natural-law fit: objective practical morality matters to law, while positive law still performs an important settlement and coordination function.",
    related: ["Thomas Aquinas", "William Blackstone", "Jeffrey Pojanowski & Kevin Walsh"]
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
    description: "A specialist fit when publicity, prospectivity, clarity, consistency, and congruent administration are treated as constitutive virtues of legality itself.",
    related: ["H. L. A. Hart", "Ronald Dworkin"]
  },
  {
    id: "radbruch",
    name: "Gustav Radbruch",
    tier: "specialist",
    identityIds: ["radbruchian"],
    axisSignature: { sorc: { target: 25, weight: 0.75 } },
    signatureTraits: ["source.extreme_injustice"],
    requiredTraits: [{ all: ["source.extreme_injustice"], min: 0.5 }],
    antiTraits: ["source.every_injustice_invalidates"],
    description: "A narrow non-positivist fit for the view that positive law ordinarily governs but sufficiently extreme injustice can destroy its claim to legal validity.",
    related: ["Lon Fuller", "John Finnis"]
  },
  {
    id: "scalia",
    name: "Antonin Scalia",
    tier: "main",
    identityIds: ["textualist", "public_meaning_originalist", "originalist", "formalist"],
    axisSignature: {
      cons: { target: 92, weight: 1 },
      time: { target: 88, weight: 0.9 },
      separ: { target: 84, weight: 0.65 },
      form: { target: 93, weight: 0.9 }
    },
    signatureTraits: ["time.public_meaning", "form.anti_discretion"],
    requiredTraits: [],
    antiTraits: ["constraint.purpose", "form.proportionality"],
    description: "The classic cross-axis bundle of enacted text, public-meaning originalism, rules, and relatively formal separation of powers.",
    related: ["John Manning", "Hugo Black"]
  },
  {
    id: "hugo_black",
    name: "Hugo Black",
    tier: "main",
    identityIds: ["textualist", "formalist"],
    axisSignature: {
      cons: { target: 90, weight: 0.9 },
      form: { target: 97, weight: 1 },
      post: { target: 10, weight: 0.9 }
    },
    signatureTraits: ["form.anti_discretion", "posture.rights_trumps"],
    requiredTraits: [],
    antiTraits: ["form.proportionality"],
    description: "Distinctive because categorical, text-centered judging is paired with unusually aggressive enforcement of enumerated constitutional rights.",
    related: ["Antonin Scalia"]
  },
  {
    id: "thomas",
    name: "Clarence Thomas",
    tier: "main",
    identityIds: ["originalist", "public_meaning_originalist"],
    axisSignature: {
      time: { target: 96, weight: 1 },
      prec: { target: 12, weight: 1 }
    },
    signatureTraits: ["precedent.correctness_first"],
    requiredTraits: [],
    antiTraits: ["precedent.stability"],
    description: "A strong fit for historical constitutional meaning combined with unusual willingness to reconsider entrenched precedent thought to be wrong.",
    related: ["Michael Stokes Paulsen", "Antonin Scalia"]
  },
  {
    id: "barnett",
    name: "Randy Barnett",
    tier: "main",
    identityIds: ["originalist", "public_meaning_originalist"],
    axisSignature: {
      time: { target: 90, weight: 1 },
      post: { target: 15, weight: 0.85 },
      prec: { target: 28, weight: 0.5 }
    },
    signatureTraits: ["time.public_meaning"],
    requiredTraits: [],
    antiTraits: ["posture.majoritarian"],
    description: "A useful cross-cutting fit for original meaning combined with vigorous judicial protection of individual liberty rather than reflexive judicial restraint.",
    related: ["Lawrence Solum", "Hugo Black"]
  },
  {
    id: "solum",
    name: "Lawrence Solum",
    tier: "specialist",
    identityIds: ["public_meaning_originalist", "originalist"],
    axisSignature: { time: { target: 88, weight: 1 } },
    signatureTraits: ["time.public_meaning", "time.principle_originalism", "time.construction_zone"],
    requiredTraits: [
      { any: ["time.public_meaning", "time.principle_originalism"], min: 0.45 }
    ],
    antiTraits: ["time.living_content"],
    description: "A specialist originalist fit where original semantic meaning is fixed but applying that meaning can still leave genuine room for constitutional construction.",
    related: ["Will Baude & Stephen Sachs", "Randy Barnett"]
  },
  {
    id: "balkin",
    name: "Jack Balkin",
    tier: "specialist",
    identityIds: ["framework_originalist", "originalist"],
    axisSignature: { time: { target: 55, weight: 0.35 } },
    signatureTraits: ["time.framework", "time.construction_zone", "time.principle_originalism"],
    requiredTraits: [{ all: ["time.framework"], min: 0.5 }],
    antiTraits: [],
    description: "A distinctive fixed-framework-plus-living-construction position: original semantic commitments coexist with substantial legitimate constitutional development.",
    related: ["Reva Siegel", "Lawrence Solum"]
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
    identityIds: ["alexyan", "proportionalist"],
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
    identityIds: ["pragmatist", "common_law_constitutionalist"],
    axisSignature: {
      cons: { target: 36, weight: 0.55 },
      prec: { target: 74, weight: 0.7 },
      form: { target: 40, weight: 0.4 }
    },
    signatureTraits: [],
    requiredTraits: [],
    antiTraits: [],
    description: "A bounded common-law creativity fit: hard cases involve genuine law development, but within precedent, history, custom, justice, and social welfare.",
    related: ["Roscoe Pound", "David Strauss", "Lord Denning"]
  },
  {
    id: "posner",
    name: "Richard Posner",
    tier: "main",
    identityIds: ["pragmatist"],
    axisSignature: {
      cons: { target: 35, weight: 0.45 },
      separ: { target: 24, weight: 0.55 },
      form: { target: 22, weight: 0.75 },
      prec: { target: 36, weight: 0.35 }
    },
    signatureTraits: ["method.consequences", "method.workability"],
    requiredTraits: [],
    antiTraits: ["form.rules"],
    description: "A pragmatic fit where consequences, institutional workability, and practical administration matter more than an overarching interpretive theory.",
    related: ["Oliver Wendell Holmes Jr.", "Roscoe Pound"]
  },
  {
    id: "breyer",
    name: "Stephen Breyer",
    tier: "main",
    identityIds: ["purposivist", "pragmatist", "functionalist"],
    axisSignature: {
      cons: { target: 20, weight: 0.8 },
      separ: { target: 12, weight: 0.8 },
      form: { target: 24, weight: 0.65 },
      post: { target: 58, weight: 0.25 }
    },
    signatureTraits: ["constraint.purpose", "method.workability"],
    requiredTraits: [],
    antiTraits: ["constraint.textual"],
    description: "Purpose, consequences, institutional workability, and democratic functionality form the distinctive Breyer combination.",
    related: ["Henry Hart & Albert Sacks", "Roscoe Pound"]
  },
  {
    id: "barak",
    name: "Aharon Barak",
    tier: "main",
    identityIds: ["purposivist", "proportionalist"],
    axisSignature: {
      cons: { target: 12, weight: 0.8 },
      time: { target: 24, weight: 0.45 },
      remed: { target: 24, weight: 0.5 },
      post: { target: 12, weight: 0.8 },
      separ: { target: 24, weight: 0.35 },
      form: { target: 8, weight: 1 }
    },
    signatureTraits: ["constraint.purpose", "form.proportionality"],
    requiredTraits: [],
    antiTraits: ["form.rules"],
    description: "A broad purposive, proportionality-centered, rights-enforcing judicial philosophy with substantial confidence in the judicial role.",
    related: ["Robert Alexy", "Michael Kirby", "Albie Sachs"]
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
    name: "Henry Hart & Albert Sacks",
    tier: "specialist",
    identityIds: ["legal_process_theorist", "purposivist"],
    axisSignature: {
      cons: { target: 28, weight: 0.65 },
      post: { target: 63, weight: 0.3 },
      prec: { target: 70, weight: 0.35 }
    },
    signatureTraits: ["method.institutional_competence", "method.reasoned_elaboration", "constraint.purpose"],
    requiredTraits: [{ all: ["method.institutional_competence"], min: 0.45 }],
    antiTraits: [],
    description: "The Legal Process specialist: respect institutional settlement and competence, then justify decisions through purposive, reasoned elaboration.",
    related: ["John Hart Ely", "Alexander Bickel"]
  },
  {
    id: "pound",
    name: "Roscoe Pound",
    tier: "specialist",
    identityIds: ["pragmatist", "purposivist"],
    axisSignature: {
      cons: { target: 28, weight: 0.5 },
      form: { target: 30, weight: 0.5 },
      separ: { target: 32, weight: 0.35 }
    },
    signatureTraits: ["method.social_interests", "method.law_in_action"],
    requiredTraits: [{ all: ["method.social_interests"], min: 0.5 }],
    antiTraits: [],
    description: "A sociological-jurisprudence specialist: legal doctrine should be understood in action and shaped with explicit attention to competing social interests and practical social effects.",
    related: ["Eugen Ehrlich", "Benjamin Cardozo"]
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
    identityIds: ["bickelian", "minimalist"],
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
    tier: "specialist",
    identityIds: ["interpretive_pluralist"],
    axisSignature: {},
    signatureTraits: ["method.modal_pluralism"],
    requiredTraits: [{ all: ["method.modal_pluralism"], min: 0.5 }],
    antiTraits: [],
    description: "A principled pluralist fit: multiple recognized modalities of constitutional argument are legitimate, rather than one interpretive method having to dominate every case.",
    related: []
  },
  {
    id: "vermeule",
    name: "Adrian Vermeule",
    tier: "specialist",
    identityIds: ["common_good_constitutionalist", "natural_lawyer"],
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
    identityIds: ["formalist", "originalist"],
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
    tier: "specialist",
    identityIds: ["legal_realist"],
    axisSignature: {},
    signatureTraits: ["realism.underdetermination", "realism.law_in_action", "realism.extra_doctrinal"],
    requiredTraits: [
      { all: ["realism.underdetermination", "realism.extra_doctrinal"], min: 0.45 }
    ],
    antiTraits: [],
    description: "The broad mature-American-Realist fit: hard-case doctrine is often underdeterminate, so law in action and actual institutional behavior matter.",
    related: ["Jerome Frank", "Oliver Wendell Holmes Jr.", "Brian Leiter"]
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
  {
    id: "manning",
    name: "John Manning",
    tier: "lineage",
    selectable: false,
    identityIds: ["textualist"],
    axisSignature: { cons: { target: 96, weight: 1 } },
    signatureTraits: ["constraint.textual"],
    requiredTraits: [],
    antiTraits: ["constraint.purpose"],
    description: "Important modern textualist scholarship, retained as further reading rather than a separate default match when Scalia or the Textualist identity already explains the measured space.",
    related: []
  }
]);
