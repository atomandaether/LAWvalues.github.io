/* Public result-title grammar: [noun-conditioned twist] [real jurisprudential identity] [broad residual phrase]. */
(function attachResultContent(global) {
  "use strict";

  const AXIS_POLES = Object.freeze({
    sorc: { left: "source.positive_sources", right: "source.nonpositive_sources" },
    cons: { left: "constraint.textual", right: "constraint.open_construction" },
    time: { left: "time.fixation", right: "time.living_content" },
    prec: { left: "precedent.stability", right: "precedent.correction" },
    remed: { left: "remedies.party_specific", right: "remedies.structural" },
    post: { left: "posture.majoritarian", right: "posture.countermajoritarian" },
    separ: { left: "separation.formalist", right: "separation.functionalist" },
    form: { left: "form.rules", right: "form.balancing" }
  });

  const IDENTITY_COPY = Object.freeze({
    positivist: "You treat recognized legal sources and social legal practice as what makes law legally valid, even when the resulting law is morally bad.",
    inclusive_positivist: "You are broadly positivist, but you allow a legal system's own source rules to incorporate moral criteria into legal validity.",
    exclusive_positivist: "You are strongly source-based: moral merit can guide criticism, but legal validity itself depends on source rather than moral correctness.",
    nonpositivist: "You reject the idea that recognized social sources alone exhaust what counts as law.",
    interpretivist: "You treat legal principles and the best justification of legal practice as part of determining what the law already is.",
    dworkinian: "You resemble Dworkinian interpretivism: hard cases can have legal answers in principles that best fit and justify the legal system rather than requiring fresh judicial legislation.",
    moral_impact_theorist: "You fit Moral Impact Theory: legislation, adjudication, and other institutional legal actions matter because of the moral rights and obligations they generate, and those resulting obligations constitute the law.",
    natural_lawyer: "You fit the natural-law tradition: objective practical morality is relevant to law itself, while positive law can still settle many questions authoritatively.",
    fullerian: "You treat basic conditions of legality—publicity, prospectivity, clarity, consistency, and congruent administration—as internal requirements of law rather than mere conveniences.",
    radbruchian: "You ordinarily respect positive law but allow sufficiently extreme injustice to defeat its claim to legal validity.",
    alexyan: "You combine non-positivist claims about law's connection to correctness with a structured proportionality approach to competing principles.",
    legal_realist: "Your answers fit Legal Realism's central suspicion that formal doctrine often underdetermines genuinely hard cases and that actual judicial behavior cannot be understood from doctrine alone.",
    pragmatist: "You favor practical consequences and institutional workability over a single master interpretive theory.",
    textualist: "You treat enacted language as the authoritative legal bargain and resist replacing it with unenacted purpose or intention.",
    intentionalist: "When enacted language leaves room, you treat the lawmakers' actual intended legal result as the central interpretive target.",
    purposivist: "You interpret legal text in light of the objective purpose the law was enacted to serve.",
    legal_process_theorist: "You fit the Legal Process tradition: purpose matters, but so do institutional role, competence, settlement, and reasoned elaboration.",
    interpretive_pluralist: "You do not insist that one interpretive method controls every hard case; several recognized forms of legal argument can legitimately matter.",
    originalist: "You think constitutional meaning is substantially fixed at adoption rather than changing simply because later generations prefer a different understanding.",
    public_meaning_originalist: "You anchor constitutional meaning in the public legal meaning that was adopted, not the private intentions of particular drafters.",
    original_intent_originalist: "You give special authority to the intentions of the people who framed or enacted the constitutional provision.",
    original_methods_originalist: "You would interpret the Constitution using the legal interpretive methods accepted for such a document when it was adopted.",
    framework_originalist: "You combine fixed original meaning with substantial legitimate construction where that original framework leaves questions unresolved.",
    living_constitutionalist: "You accept that constitutional content can legitimately develop with precedent, experience, changed circumstances, and later understandings.",
    common_law_constitutionalist: "You treat accumulated precedent and practice as major components of constitutional law, allowing change through common-law development rather than free-form updating.",
    common_good_constitutionalist: "You approach public law through a classical account of lawful authority directed toward the common good rather than through historically fixed meaning alone.",
    legal_constitutionalist: "You treat entrenched constitutional rights and independent judicial enforcement as authoritative constraints on ordinary political majorities.",
    political_constitutionalist: "You give functioning representative institutions the stronger claim to final constitutional authority when citizens reasonably disagree about rights.",
    thayerian: "You preserve judicial review but invalidate legislation only when the legislature's constitutional judgment falls outside the range of reasonable interpretation.",
    weak_form_constitutionalist: "You favor independent judicial rights review without giving courts an entrenched monopoly on the final constitutional word.",
    popular_constitutionalist: "You reject exclusive judicial ownership of constitutional meaning and leave ultimate constitutional authority with the people and democratic politics.",
    departmentalist: "You reject judicial interpretive monopoly and allow coordinate governmental branches to maintain their own good-faith constitutional judgments.",
    political_process_jurist: "You ordinarily leave substantive disagreements to politics but favor stronger judicial intervention when democratic channels are blocked, distorted, or exclusionary.",
    waldronian: "Legacy label for Political Constitutionalism.",
    elyan: "Legacy label for Political Process Jurisprudence.",
    bickelian: "Legacy label for Passive-virtues Judicial Minimalism.",
    minimalist: "You prefer narrow, shallow, incompletely theorized decisions that resolve the case without unnecessarily settling broader controversies.",
    formalist: "You place unusual weight on legal categories, assigned powers, and prescribed institutional boundaries even when a looser arrangement might be more convenient.",
    functionalist: "You evaluate institutional arrangements mainly by workability, accountability, checks, and preservation of each branch's core role rather than categorical separation.",
    proportionalist: "You prefer structured proportionality and contextual weighing to categorical rules when rights or principles conflict."
  });

  /*
    The public title now has three different jobs:

      1. noun: the nearest serious jurisprudential identity;
      2. phrase: the strongest broad, well-supported characteristic the noun did not
         already communicate;
      3. modifier: a noun-conditioned "twist" that explains what is unusual about
         this person's version of that noun.

    Phrases therefore use only broad axis poles plus two narrow characteristics
    that the existing bank measures with genuine breadth. Twists may use narrower
    subtype/diagnostic evidence because their job is conditional nuance, not to
    declare a stand-alone top-three worldview.
  */
  const PHRASE_FEATURES = Object.freeze(  [
    {
      "id": "source_positive",
      "group": "source",
      "axis": "sorc",
      "direction": "left",
      "primaryTag": "source.positive_sources",
      "tags": [
        "source.positive_sources"
      ],
      "spentBy": [
        "positivist",
        "inclusive_positivist",
        "exclusive_positivist"
      ],
      "phrase": "who thinks evil just needs the right paperwork",
      "explanation": "You sharply separate legal validity from moral merit and give recognized social/legal sources the decisive role."
    },
    {
      "id": "source_nonpositive",
      "group": "source",
      "axis": "sorc",
      "direction": "right",
      "primaryTag": "source.nonpositive_sources",
      "tags": [
        "source.nonpositive_sources"
      ],
      "spentBy": [
        "nonpositivist",
        "dworkinian",
        "moral_impact_theorist",
        "natural_lawyer",
        "radbruchian",
        "fullerian",
        "alexyan"
      ],
      "phrase": "who thinks the law is haunted, and the ghosts agree with them",
      "explanation": "You reject the idea that recognized social sources exhaust what counts as law, allowing moral principles or higher-law considerations to contribute to legal validity."
    },
    {
      "id": "objective_morality",
      "group": "source",
      "primaryTag": "source.objective_morality",
      "tags": [
        "source.objective_morality",
        "source.moral_constraint"
      ],
      "supportAxis": {
        "axis": "sorc",
        "direction": "right"
      },
      "minCoreCount": 2,
      "minCoreUnits": 2,
      "minDiagnosticCount": 1,
      "minDiagnosticUnits": 0.65,
      "spentBy": [
        "natural_lawyer",
        "common_good_constitutionalist",
        "alexyan"
      ],
      "phrase": "who says “of course I’m right, here’s an MLK quote”",
      "explanation": "You treat objective morality as independently relevant to what the law legally requires."
    },
    {
      "id": "textual_constraint",
      "group": "constraint",
      "axis": "cons",
      "direction": "left",
      "primaryTag": "constraint.textual",
      "tags": [
        "constraint.textual",
        "constraint.textual_axis"
      ],
      "spentBy": [
        "textualist"
      ],
      "phrase": "who’d eat their own Grandma because Congress forgot a comma",
      "explanation": "Enacted wording puts unusually hard limits on what you think judges may do, even when a more purposive result seems sensible."
    },
    {
      "id": "purposive",
      "group": "constraint",
      "axis": "cons",
      "direction": "right",
      "primaryTag": "constraint.open_construction",
      "tags": [
        "constraint.purpose",
        "constraint.open_construction",
        "constraint.anti_evasion"
      ],
      "spentBy": [
        "purposivist",
        "legal_process_theorist"
      ],
      "phrase": "who doesn’t let their inability to read hold them down",
      "explanation": "You are comparatively willing to let purpose, practical sense, context, or anti-evasion principles overcome a rigid reading of enacted words."
    },
    {
      "id": "fixed_meaning",
      "group": "time",
      "axis": "time",
      "direction": "left",
      "primaryTag": "time.fixation",
      "tags": [
        "time.fixation",
        "time.semantic_fixation"
      ],
      "spentBy": [
        "originalist",
        "public_meaning_originalist",
        "original_intent_originalist",
        "original_methods_originalist",
        "framework_originalist"
      ],
      "phrase": "who uses an Ouija board as a dictionary",
      "explanation": "You treat constitutional meaning as substantially fixed at adoption rather than updated by later usage or values."
    },
    {
      "id": "living_meaning",
      "group": "time",
      "axis": "time",
      "direction": "right",
      "primaryTag": "time.living_content",
      "tags": [
        "time.living_content"
      ],
      "spentBy": [
        "living_constitutionalist",
        "common_law_constitutionalist"
      ],
      "phrase": "who thinks amendments are for suckers",
      "explanation": "You accept genuine constitutional development without requiring every change in constitutional content to pass through formal amendment."
    },
    {
      "id": "precedent_stability",
      "group": "precedent",
      "axis": "prec",
      "direction": "left",
      "primaryTag": "precedent.stability",
      "tags": [
        "precedent.stability",
        "precedent.reliance",
        "precedent.settlement"
      ],
      "spentBy": [
        "common_law_constitutionalist"
      ],
      "phrase": "who thinks being wrong for 50 years makes it right",
      "explanation": "Reliance, settlement, and legal continuity make you unusually reluctant to discard an established decision even when it was mistaken."
    },
    {
      "id": "precedent_correction",
      "group": "precedent",
      "axis": "prec",
      "direction": "right",
      "primaryTag": "precedent.correction",
      "tags": [
        "precedent.correction",
        "precedent.correctness_first"
      ],
      "spentBy": [],
      "phrase": "who’ll tell you the opposite tomorrow",
      "explanation": "You put correcting legal error ahead of preserving precedent and are comparatively willing to overrule decisions you think are wrong."
    },
    {
      "id": "narrow_remedies",
      "group": "remedies",
      "axis": "remed",
      "direction": "left",
      "primaryTag": "remedies.party_specific",
      "tags": [
        "remedies.party_specific",
        "remedies.incremental"
      ],
      "spentBy": [
        "minimalist"
      ],
      "phrase": "who brought a hand towel to a hurricane",
      "explanation": "You generally want judicial relief confined to the parties and violation actually before the court."
    },
    {
      "id": "structural_remedies",
      "group": "remedies",
      "axis": "remed",
      "direction": "right",
      "primaryTag": "remedies.structural",
      "tags": [
        "remedies.structural",
        "remedies.supervision"
      ],
      "spentBy": [],
      "phrase": "who let themselves in and started knocking down walls",
      "explanation": "Once a systemic violation is established, you are comparatively comfortable with restructuring institutions and continuing judicial supervision."
    },
    {
      "id": "majoritarian",
      "group": "posture",
      "axis": "post",
      "direction": "left",
      "primaryTag": "posture.majoritarian",
      "tags": [
        "posture.majoritarian",
        "posture.democratic_legitimacy"
      ],
      "spentBy": [
        "political_constitutionalist",
        "thayerian",
        "popular_constitutionalist",
        "departmentalist"
      ],
      "phrase": "who’d let two wolves and a sheep vote on dinner",
      "explanation": "You give elected government unusually broad room when constitutional meaning is reasonably contestable."
    },
    {
      "id": "countermajoritarian",
      "group": "posture",
      "axis": "post",
      "direction": "right",
      "primaryTag": "posture.countermajoritarian",
      "tags": [
        "posture.countermajoritarian",
        "posture.rights_trumps"
      ],
      "spentBy": [
        "legal_constitutionalist"
      ],
      "phrase": "who thinks 5 is more than 535",
      "explanation": "You are unusually willing to have courts enforce constitutional rights against sustained majority opposition."
    },
    {
      "id": "separation_formal",
      "group": "separation",
      "axis": "separ",
      "direction": "left",
      "primaryTag": "separation.formalist",
      "tags": [
        "separation.formalist",
        "separation.prescribed_process",
        "separation.nondelegation"
      ],
      "spentBy": [
        "formalist"
      ],
      "phrase": "who’d fire the lifeguard for getting in the pool",
      "explanation": "You are unusually strict about constitutionally assigned institutional powers and prescribed procedures."
    },
    {
      "id": "separation_functional",
      "group": "separation",
      "axis": "separ",
      "direction": "right",
      "primaryTag": "separation.functionalist",
      "tags": [
        "separation.functionalist",
        "separation.combined_functions"
      ],
      "spentBy": [
        "functionalist"
      ],
      "phrase": "who thinks the kitchen can never have too many cooks",
      "explanation": "You tolerate institutional overlap when the arrangement remains workable, accountable, and preserves each branch’s core role."
    },
    {
      "id": "rules",
      "group": "form",
      "axis": "form",
      "direction": "left",
      "primaryTag": "form.rules",
      "tags": [
        "form.rules",
        "form.predictability",
        "form.edge_case_tolerance"
      ],
      "spentBy": [],
      "phrase": "who’d rather be consistently wrong than occasionally right",
      "explanation": "You accept ugly edge cases as the price of general rules that constrain decision-makers."
    },
    {
      "id": "anti_discretion",
      "group": "form",
      "primaryTag": "form.anti_discretion",
      "tags": [
        "form.anti_discretion"
      ],
      "minCoreCount": 4,
      "minCoreUnits": 2.5,
      "spentBy": [],
      "phrase": "who doesn’t trust themselves to decide when to pee",
      "explanation": "Your attraction to rules is especially driven by distrust of discretionary human judgment and its risks of arbitrariness, bias, or inconsistency."
    },
    {
      "id": "balancing",
      "group": "form",
      "axis": "form",
      "direction": "right",
      "primaryTag": "form.balancing",
      "tags": [
        "form.balancing"
      ],
      "spentBy": [
        "proportionalist"
      ],
      "phrase": "who does whatever they want",
      "explanation": "You prefer contextual weighing of competing considerations over categorical rules in hard cases."
    }
  ]);

  const TWISTS = Object.freeze(  [
    {
      "id": "new_originalism",
      "text": "New",
      "appliesTo": [
        "public_meaning_originalist",
        "original_intent_originalist"
      ],
      "traits": [
        "time.construction_zone"
      ],
      "min": 0.5,
      "priority": 1.5,
      "explanation": "You accept the New Originalist interpretation/construction distinction: fixed original meaning can genuinely underdetermine a case and leave legitimate room for constitutional construction."
    },
    {
      "id": "democratic_living",
      "text": "Democratic",
      "appliesTo": ["living_constitutionalist"],
      "traits": ["time.democratic_constitutionalism"],
      "min": 0.5,
      "priority": 1.6,
      "explanation": "Your Living Constitutionalism treats sustained public constitutional contestation and political mobilization as legitimate participants in the development of enforceable constitutional meaning, while preserving a judicial role in rights enforcement."
    },
    {
      "id": "transformative_living",
      "text": "Transformative",
      "appliesTo": ["living_constitutionalist"],
      "traits": ["time.transformative_constitutionalism"],
      "min": 0.5,
      "priority": 1.62,
      "explanation": "Your Living Constitutionalism treats the constitution as an ongoing legal project of transforming inherited institutions and power relations toward its democratic, participatory, egalitarian, and dignity-based commitments."
    },
    {
      "id": "inclusive_positivism",
      "text": "Inclusive",
      "appliesTo": ["positivist"],
      "traits": ["source.morality_incorporated"],
      "min": 0.5,
      "priority": 1.42,
      "explanation": "You are a Positivist who thinks a socially grounded legal system can itself incorporate genuine moral criteria into its tests of legal validity."
    },
    {
      "id": "exclusive_positivism",
      "text": "Exclusive",
      "appliesTo": ["positivist"],
      "traits": ["source.source_thesis"],
      "min": 0.5,
      "priority": 1.42,
      "explanation": "You are a Positivist who thinks legal validity must remain identifiable from source or social facts without making moral merits themselves a criterion of what law exists."
    },
    {
      "id": "normative_positivism",
      "text": "Normative",
      "appliesTo": ["positivist"],
      "traits": ["source.normative_positivism"],
      "min": 0.5,
      "priority": 1.5,
      "explanation": "You defend source-based legality not merely as a conceptual account of law but as a desirable institutional discipline that limits contested merits-based judicial lawmaking."
    },
    {
      "id": "moral_impact_nonpositivism",
      "text": "Moral-Impact",
      "appliesTo": ["nonpositivist"],
      "traits": ["source.moral_impact"],
      "min": 0.5,
      "priority": 1.5,
      "explanation": "You think institutional legal action changes the moral situation, and the resulting moral rights and obligations constitute the law."
    },
    {
      "id": "moral_practice_nonpositivism",
      "text": "Moral-Practice",
      "appliesTo": ["nonpositivist"],
      "traits": ["source.moral_practice"],
      "min": 0.5,
      "priority": 1.5,
      "explanation": "You treat legal claims as claims about genuine moral rights and responsibilities rather than as claims inside a separate source-generated domain of legal obligation."
    },
    {
      "id": "extreme_injustice_nonpositivism",
      "text": "Extreme-Injustice",
      "appliesTo": ["nonpositivist"],
      "traits": ["source.extreme_injustice"],
      "min": 0.5,
      "priority": 1.48,
      "explanation": "You think ordinary injustice can coexist with legal validity, but sufficiently extreme injustice can defeat a purported rule's legal status."
    },
    {
      "id": "imaginative_reconstruction",
      "text": "Imaginative-Reconstruction",
      "appliesTo": ["intentionalist"],
      "traits": ["constraint.imaginative_reconstruction"],
      "min": 0.5,
      "priority": 1.55,
      "explanation": "When lawmakers never confronted the precise problem, you ask what they would have intended had the issue been presented to them."
    },
    {
      "id": "practical_reasoning_pluralism",
      "text": "Practical-Reasoning",
      "appliesTo": ["interpretive_pluralist"],
      "traits": ["method.practical_reasoning"],
      "min": 0.5,
      "priority": 1.55,
      "explanation": "You treat multiple interpretive resources as legitimate and let their relative weight shift with the problem rather than imposing a fixed hierarchy."
    },
    {
      "id": "fact_skeptical_realism",
      "text": "Fact-Skeptical",
      "appliesTo": ["legal_realist"],
      "traits": ["realism.fact_skepticism"],
      "min": 0.5,
      "priority": 1.55,
      "explanation": "Your Realism extends beyond indeterminate rules to the uncertainty of trial facts, witness credibility, factfinding, and judicial psychology."
    },
    {
      "id": "hartian_gap",
      "text": "Gap-friendly",
      "appliesTo": [
        "positivist",
        "inclusive_positivist",
        "exclusive_positivist"
      ],
      "traits": [
        "source.law_runs_out"
      ],
      "min": 0.5,
      "priority": 1.2,
      "explanation": "Within a positivist framework, you are comparatively willing to say that existing law can genuinely run out in a hard case."
    },
    {
      "id": "positive_law_settlement",
      "text": "Settlement-minded",
      "appliesTo": [
        "natural_lawyer",
        "common_good_constitutionalist"
      ],
      "traits": [
        "source.positive_law_settlement"
      ],
      "min": 0.45,
      "priority": 1.2,
      "explanation": "Your higher-law commitments coexist with a strong view that positive law legitimately settles many questions morality leaves open."
    },
    {
      "id": "contextual_textualism",
      "text": "Dictionary-skeptical",
      "appliesTo": [
        "textualist",
        "originalist",
        "public_meaning_originalist",
        "original_intent_originalist",
        "original_methods_originalist"
      ],
      "traits": [
        "constraint.contextual_textualism"
      ],
      "min": 0.5,
      "priority": 1.12,
      "explanation": "You are text-centered without treating isolated dictionary definitions as the whole interpretive enterprise."
    },
    {
      "id": "enacted_bargain",
      "text": "Fine-print",
      "appliesTo": [
        "textualist",
        "positivist",
        "inclusive_positivist",
        "exclusive_positivist"
      ],
      "traits": [
        "constraint.enacted_bargain"
      ],
      "min": 0.55,
      "priority": 1.05,
      "explanation": "You are especially willing to make the legal system live with enacted compromises, exceptions, and omissions."
    },
    {
      "id": "precedent_skeptic",
      "text": "Case-burning",
      "appliesTo": [
        "originalist",
        "public_meaning_originalist",
        "original_intent_originalist",
        "original_methods_originalist",
        "framework_originalist",
        "textualist",
        "formalist",
        "positivist"
      ],
      "axis": "prec",
      "direction": "right",
      "min": 0.35,
      "priority": 1,
      "blockedPhraseIds": [
        "precedent_correction"
      ],
      "explanation": "You combine your main methodology with unusual willingness to discard precedent you think is wrong."
    },
    {
      "id": "precedent_loyal",
      "text": "Error-hoarding",
      "appliesTo": [
        "originalist",
        "public_meaning_originalist",
        "original_intent_originalist",
        "original_methods_originalist",
        "framework_originalist",
        "textualist",
        "formalist"
      ],
      "axis": "prec",
      "direction": "left",
      "min": 0.35,
      "priority": 1,
      "blockedPhraseIds": [
        "precedent_stability"
      ],
      "explanation": "You combine your main methodology with unusual respect for settlement, reliance, and continuity."
    },
    {
      "id": "rights_aggressive",
      "text": "Democracy-vetoing",
      "appliesTo": [
        "positivist",
        "inclusive_positivist",
        "exclusive_positivist",
        "textualist",
        "originalist",
        "public_meaning_originalist",
        "original_intent_originalist",
        "original_methods_originalist",
        "formalist"
      ],
      "axis": "post",
      "direction": "right",
      "min": 0.35,
      "priority": 1,
      "blockedPhraseIds": [
        "countermajoritarian"
      ],
      "explanation": "You pair a usually constraint-oriented methodology with unusually aggressive judicial enforcement against majority will."
    },
    {
      "id": "democracy_deferential",
      "text": "Rights-on-honor-system",
      "appliesTo": [
        "dworkinian",
        "moral_impact_theorist",
        "natural_lawyer",
        "living_constitutionalist",
        "common_good_constitutionalist",
        "proportionalist",
        "pragmatist"
      ],
      "axis": "post",
      "direction": "left",
      "min": 0.35,
      "priority": 1,
      "blockedPhraseIds": [
        "majoritarian"
      ],
      "explanation": "You pair a morality-, rights-, or adaptation-friendly methodology with unusually strong democratic deference."
    },
    {
      "id": "narrow_enforcement",
      "text": "Remedy-stingy",
      "appliesTo": [
        "dworkinian",
        "natural_lawyer",
        "living_constitutionalist",
        "common_good_constitutionalist",
        "proportionalist",
        "political_process_jurist"
      ],
      "axis": "remed",
      "direction": "left",
      "min": 0.35,
      "priority": 0.98,
      "blockedPhraseIds": [
        "narrow_remedies"
      ],
      "explanation": "You are willing to recognize strong rights or evolving legal obligations while remaining unusually cautious about the breadth of judicial relief."
    },
    {
      "id": "systemic_enforcement",
      "text": "Court-running",
      "appliesTo": [
        "political_constitutionalist",
        "thayerian",
        "weak_form_constitutionalist",
        "popular_constitutionalist",
        "departmentalist",
        "originalist",
        "public_meaning_originalist",
        "textualist",
        "formalist"
      ],
      "axis": "remed",
      "direction": "right",
      "min": 0.35,
      "priority": 0.98,
      "blockedPhraseIds": [
        "structural_remedies"
      ],
      "explanation": "You combine a restraint-, democracy-, or constraint-oriented methodology with unusually sweeping remedial instincts once a violation is established."
    },
    {
      "id": "rulebound_open",
      "text": "Rule-worshipping",
      "appliesTo": [
        "purposivist",
        "pragmatist",
        "functionalist",
        "living_constitutionalist",
        "common_law_constitutionalist",
        "legal_process_theorist",
        "interpretive_pluralist",
        "legal_realist"
      ],
      "axis": "form",
      "direction": "left",
      "min": 0.35,
      "priority": 1,
      "blockedPhraseIds": [
        "rules",
        "anti_discretion"
      ],
      "explanation": "You are comparatively open or pragmatic about finding the governing law but unusually rule-bound once doctrine is identified."
    },
    {
      "id": "balancing_strict",
      "text": "Vibes-balancing",
      "appliesTo": [
        "positivist",
        "exclusive_positivist",
        "textualist",
        "originalist",
        "public_meaning_originalist",
        "original_intent_originalist",
        "original_methods_originalist",
        "formalist"
      ],
      "axis": "form",
      "direction": "right",
      "min": 0.35,
      "priority": 1,
      "blockedPhraseIds": [
        "balancing"
      ],
      "explanation": "You combine a constraint-oriented main methodology with unusually contextual, balancing-oriented doctrinal form."
    },
    {
      "id": "formal_structure",
      "text": "Org-chart-worshipping",
      "appliesTo": [
        "dworkinian",
        "natural_lawyer",
        "pragmatist",
        "purposivist",
        "legal_process_theorist",
        "interpretive_pluralist",
        "living_constitutionalist"
      ],
      "axis": "separ",
      "direction": "left",
      "min": 0.4,
      "priority": 0.96,
      "blockedPhraseIds": [
        "separation_formal"
      ],
      "explanation": "Your broader methodology is flexible in other domains, but you become unusually strict about institutional boundaries."
    },
    {
      "id": "functional_structure",
      "text": "Separation-“optional”",
      "appliesTo": [
        "positivist",
        "exclusive_positivist",
        "natural_lawyer",
        "textualist",
        "originalist",
        "public_meaning_originalist",
        "original_methods_originalist"
      ],
      "axis": "separ",
      "direction": "right",
      "min": 0.4,
      "priority": 0.96,
      "blockedPhraseIds": [
        "separation_functional"
      ],
      "explanation": "Your broader methodology is constraint-oriented, but you tolerate unusually pragmatic overlap among governmental institutions."
    },
    {
      "id": "source_bound_living",
      "text": "Source-bound",
      "appliesTo": [
        "living_constitutionalist",
        "common_law_constitutionalist",
        "pragmatist",
        "legal_realist"
      ],
      "axis": "sorc",
      "direction": "left",
      "min": 0.35,
      "priority": 1.05,
      "blockedPhraseIds": [
        "source_positive"
      ],
      "explanation": "Your adaptive or pragmatic method remains grounded in socially recognized legal sources rather than freestanding moral validity."
    },
    {
      "id": "higher_law_historical",
      "text": "Higher-law",
      "appliesTo": [
        "textualist",
        "originalist",
        "public_meaning_originalist",
        "original_methods_originalist",
        "formalist"
      ],
      "axis": "sorc",
      "direction": "right",
      "min": 0.35,
      "priority": 1.05,
      "blockedPhraseIds": [
        "source_nonpositive",
        "objective_morality"
      ],
      "explanation": "You combine historical or textual constraint with a nonpositivist view that legal validity is not exhausted by positive sources."
    },
    {
      "id": "common_law_growth",
      "text": "Precedent-grown",
      "appliesTo": [
        "originalist",
        "public_meaning_originalist",
        "framework_originalist"
      ],
      "traits": [
        "time.common_law_development"
      ],
      "min": 0.45,
      "priority": 1.12,
      "explanation": "Your account of constitutional change or construction leans unusually heavily on accumulated precedent and practice."
    },
    {
      "id": "institutional_process",
      "text": "Process-pilled",
      "appliesTo": [
        "purposivist",
        "pragmatist",
        "intentionalist",
        "interpretive_pluralist"
      ],
      "traits": [
        "method.institutional_competence",
        "method.reasoned_elaboration"
      ],
      "min": 0.5,
      "priority": 1.18,
      "explanation": "What makes your broader interpretive method distinctive is a strong concern with institutional role, competence, and reasoned elaboration."
    },
    {
      "id": "sociological",
      "text": "Law-in-action",
      "appliesTo": [
        "purposivist",
        "pragmatist",
        "legal_process_theorist",
        "interpretive_pluralist"
      ],
      "traits": [
        "method.social_interests",
        "method.law_in_action"
      ],
      "min": 0.5,
      "priority": 1.15,
      "explanation": "You put unusual weight on how doctrine actually operates in society and on the social interests legal rules organize."
    },
    {
      "id": "low_theory",
      "text": "Theory-light",
      "appliesTo": [
        "pragmatist",
        "interpretive_pluralist",
        "minimalist"
      ],
      "traits": [
        "method.case_by_case",
        "method.anti_grand_theory"
      ],
      "min": 0.5,
      "priority": 1.12,
      "explanation": "You resist turning your main approach into a comprehensive theory and prefer narrow, fact-sensitive judgment."
    },
    {
      "id": "realist_tinge",
      "text": "Doctrine-cynical",
      "appliesTo": [
        "positivist",
        "textualist",
        "originalist",
        "pragmatist",
        "interpretive_pluralist"
      ],
      "allTraits": [
        "realism.underdetermination",
        "realism.extra_doctrinal"
      ],
      "min": 0.3,
      "priority": 1.08,
      "explanation": "You retain your normative methodology while showing an unusually Realist suspicion that doctrine alone explains hard-case outcomes."
    },
    {
      "id": "proportionality_tinge",
      "text": "Balancing-with-homework",
      "appliesTo": [
        "dworkinian",
        "natural_lawyer",
        "living_constitutionalist",
        "pragmatist",
        "purposivist"
      ],
      "traits": [
        "form.proportionality"
      ],
      "min": 0.5,
      "priority": 1.18,
      "blockedPhraseIds": [
        "balancing"
      ],
      "explanation": "Your otherwise broader methodology has a distinctive preference for structured proportionality rather than free-form balancing."
    },
    {
      "id": "responsive_process",
      "text": "Responsive",
      "appliesTo": [
        "political_process_jurist"
      ],
      "traits": [
        "posture.responsive_review"
      ],
      "min": 0.5,
      "priority": 1.55,
      "explanation": "Within Political Process Jurisprudence, you calibrate the timing, intensity, reasoning, and remedies of review to the specific democratic dysfunction and to judicial capacity."
    },
    {
      "id": "passive_virtues_minimalism",
      "text": "Passive-virtues",
      "appliesTo": [
        "minimalist"
      ],
      "traits": [
        "posture.passive_virtues"
      ],
      "min": 0.55,
      "priority": 1.2,
      "explanation": "Within Judicial Minimalism, your restraint is especially Bickel-like: strategic avoidance and delay are themselves part of the judicial method, not merely a preference for narrow remedies."
    },
    {
      "id": "nonpositivist_proportionality",
      "text": "Higher-law",
      "appliesTo": [
        "proportionalist"
      ],
      "axis": "sorc",
      "direction": "right",
      "min": 0.3,
      "priority": 1.2,
      "explanation": "Within Proportionalism, your balancing sits inside a nonpositivist account of legal principles and moral correctness rather than functioning as a merely practical judicial technique."
    },
    {
      "id": "purposive_proportionality",
      "text": "Purpose-led",
      "appliesTo": [
        "proportionalist"
      ],
      "axis": "cons",
      "direction": "right",
      "min": 0.35,
      "priority": 1.1,
      "explanation": "Within Proportionalism, your structured balancing is embedded in a broader purposive and open-construction approach to legal interpretation."
    },
    {
      "id": "anti_discretion_tinge",
      "text": "Judgment-allergic",
      "appliesTo": [
        "positivist",
        "textualist",
        "originalist",
        "public_meaning_originalist",
        "formalist"
      ],
      "traits": [
        "form.anti_discretion"
      ],
      "min": 0.55,
      "priority": 1.1,
      "blockedPhraseIds": [
        "rules",
        "anti_discretion"
      ],
      "explanation": "Your main methodology is sharpened by an unusually strong distrust of discretionary judicial judgment."
    },
    {
      "id": "archetypal",
      "text": "Textbook",
      "fallback": true,
      "explanation": "No narrower measured subtype or cross-cutting twist clearly improves on the selected noun; this respondent is comparatively close to the noun's central package."
    }
  ]);

  // Compatibility alias for code that previously referred to the residual pool as FEATURES.
  const FEATURES = PHRASE_FEATURES;

  const PHRASES = Object.freeze(PHRASE_FEATURES.map((feature) => Object.freeze({
    id:feature.id,
    text:feature.phrase,
    axis:feature.axis||null,
    direction:feature.direction||null,
    adds:feature.tags||[],
    explanation:feature.explanation
  })));

  // Public selection is deliberately narrower than the retained historical
  // twist catalog. Internal/legacy descriptions remain available for older
  // shared result links and scholarship, but are not promised quiz outcomes.
  const PUBLIC_SUBSTANTIVE_MODIFIER_IDS = Object.freeze([
    "new_originalism",
    "democratic_living",
    "transformative_living",
    "inclusive_positivism",
    "exclusive_positivism",
    "normative_positivism",
    "moral_impact_nonpositivism",
    "moral_practice_nonpositivism",
    "extreme_injustice_nonpositivism",
    "imaginative_reconstruction",
    "practical_reasoning_pluralism",
    "fact_skeptical_realism",

    // Pending editorial review: these may encode genuine subtypes/hybrids rather
    // than merely another high-scoring axis. Keep them public until that review
    // resolves their jurisprudential status.
    "positive_law_settlement",
    "source_bound_living",
    "higher_law_historical",
    "proportionality_tinge",
    "nonpositivist_proportionality",
    "purposive_proportionality",

    "responsive_process",
    "passive_virtues_minimalism"
  ]);
  const PUBLIC_MODIFIER_SET = new Set(PUBLIC_SUBSTANTIVE_MODIFIER_IDS);
  const INTERNAL_TWIST_IDS = Object.freeze(TWISTS.filter(twist =>
    !twist.fallback && !PUBLIC_MODIFIER_SET.has(twist.id)).map(twist=>twist.id));
  const PUBLIC_MODIFIERS = Object.freeze(TWISTS.filter(twist =>
    PUBLIC_MODIFIER_SET.has(twist.id)).map(twist => Object.freeze({
      id:twist.id,text:twist.text,explanation:twist.explanation
    })));

  const MODIFIERS = Object.freeze(TWISTS.map((twist) => Object.freeze({
    id:twist.id,
    text:twist.text,
    explanation:twist.explanation
  })));

  const BRIDGES = Object.freeze([
    { id:"nonpositivist_historical", when:(s,t)=>right(s,"sorc")>=0.35 && left(s,"time")>=0.35, text:"Your combination is important: treating morality as legally relevant does not require you to believe constitutional meaning evolves with contemporary morality." },
    { id:"principle_originalism", when:(s,t,i)=>isOriginalist(i) && (t["time.principle_originalism"]||0)>=0.45, text:"Your originalism is principle-oriented: fixed historical meaning can govern applications that the adopting generation itself did not expect." },
    { id:"framework_originalism", when:(s,t,i)=>i?.id==="framework_originalist" || (t["time.framework"]||0)>=0.5, text:"You distinguish fixed original meaning from later constitutional construction inside areas the original framework leaves unresolved." },
    { id:"living_stability", when:(s)=>right(s,"time")>=0.35 && left(s,"prec")>=0.45, text:"Your living approach is unusually precedent-centered: constitutional development comes through accumulated doctrine and practice rather than free-floating updating." },
    { id:"originalist_correction", when:(s,t,i)=>isOriginalist(i) && right(s,"prec")>=0.4, text:"You combine historical constitutional meaning with a strong willingness to discard precedent you think departed from it." },
    { id:"originalist_stability", when:(s,t,i)=>isOriginalist(i) && left(s,"prec")>=0.45, text:"You combine historically fixed meaning with substantial respect for precedent and legal settlement rather than treating every old error as immediately disposable." },
    { id:"textualist_balancing", when:(s)=>left(s,"cons")>=0.4 && right(s,"form")>=0.35, text:"Your answers separate textual constraint from doctrinal form: enacted language can bind what law authorizes while open-textured standards are still applied contextually." },
    { id:"open_rules", when:(s)=>right(s,"cons")>=0.4 && left(s,"form")>=0.35, text:"You are flexible about interpreting what a legal provision reaches but comparatively rule-bound once the governing doctrine is identified." },
    { id:"counter_narrow", when:(s)=>right(s,"post")>=0.4 && left(s,"remed")>=0.4, text:"You favor strong judicial enforcement of rights while keeping the resulting remedy comparatively narrow." },
    { id:"majoritarian_systemic", when:(s)=>left(s,"post")>=0.4 && right(s,"remed")>=0.4, text:"You defer substantially on whether elected government crossed the legal line, but once a violation is established you are willing to remedy it broadly." },
    { id:"formal_balancing", when:(s)=>left(s,"separ")>=0.4 && right(s,"form")>=0.35, text:"Your strictness about separation of powers does not translate into rule-bound judging everywhere else." },
    { id:"functional_rules", when:(s)=>right(s,"separ")>=0.4 && left(s,"form")>=0.35, text:"Your pragmatic view of governmental structure coexists with a comparatively strong preference for rules in ordinary adjudication." },
    { id:"positivist_living", when:(s)=>left(s,"sorc")>=0.4 && right(s,"time")>=0.35, text:"You allow constitutional law to develop through socially recognized precedent and practice without making morality itself a freestanding source of legal validity." },
    { id:"nonpositivist_textualist", when:(s)=>right(s,"sorc")>=0.35 && left(s,"cons")>=0.4, text:"You combine higher-law or moral commitments with comparatively strict interpretation of enacted positive law." },
    { id:"defer_then_enforce", when:(s,t)=>left(s,"post")>=0.25 && (t["posture.clear_error"]||0)>=0.45 && right(s,"remed")>=0.2, text:"You distinguish deference under genuine legal uncertainty from weakness once a clear violation has actually been established." }
  ]);

  function clamp01(value) { return Math.max(0,Math.min(1,Number(value)||0)); }

  function axisScore(scores,id) {
    const raw=scores?.[id];
    const value=typeof raw==="object" && raw!==null ? raw.score : raw;
    const numeric=Number(value);
    return Math.max(0,Math.min(100,Number.isFinite(numeric) ? numeric : 50));
  }

  function left(scores,id) { return Math.max(0,(axisScore(scores,id)-50)/50); }
  function right(scores,id) { return Math.max(0,(50-axisScore(scores,id))/50); }
  function directionStrength(scores,axis,direction) {
    return direction==="left" ? left(scores,axis) : right(scores,axis);
  }

  function isOriginalist(identity) {
    return identity?.id==="originalist" || /originalist$/.test(identity?.id||"");
  }

  function identityCoverage(identity) {
    const catalog=(global.LAW_RESULT_IDENTITIES||[]).find(item=>item.id===identity?.id);
    return new Set(catalog?.covers||[]);
  }

  function traitValues(tags,traits) {
    return (tags||[])
      .map(tag=>clamp01(traits?.[tag]))
      .filter(value=>value>0)
      .sort((a,b)=>b-a);
  }

  function aggregateEvidence(tags,traitEvidence={}) {
    const coreSupport={};
    const diagnosticSupport={};
    for(const tag of tags||[]) {
      const evidence=traitEvidence?.[tag];
      if(!evidence) continue;
      for(const [id,value] of Object.entries(evidence.coreSupport||{})) {
        coreSupport[id]=Math.max(Number(coreSupport[id])||0,Number(value)||0);
      }
      for(const [id,value] of Object.entries(evidence.diagnosticSupport||{})) {
        diagnosticSupport[id]=Math.max(Number(diagnosticSupport[id])||0,Number(value)||0);
      }
    }
    return {
      coreCount:Object.keys(coreSupport).length,
      diagnosticCount:Object.keys(diagnosticSupport).length,
      coreUnits:Object.values(coreSupport).reduce((sum,value)=>sum+(Number(value)||0),0),
      diagnosticUnits:Object.values(diagnosticSupport).reduce((sum,value)=>sum+(Number(value)||0),0)
    };
  }

  function phraseEvidence(feature,scores,traits) {
    if(feature.axis) return directionStrength(scores,feature.axis,feature.direction);
    const values=traitValues(feature.tags,traits);
    const direct=values[0]||0;
    const corroboration=values[1]||0;
    return clamp01(direct+0.08*corroboration);
  }

  function phraseQuality(feature,scores,traits,traitEvidence={}) {
    const evidence=phraseEvidence(feature,scores,traits);
    if(feature.axis) {
      return {eligible:evidence>0,confidence:1,effectiveBreadth:8,coreCount:null,diagnosticCount:null};
    }

    const direct=aggregateEvidence(feature.tags,traitEvidence);
    const supportAxis=feature.supportAxis
      ? directionStrength(scores,feature.supportAxis.axis,feature.supportAxis.direction)
      : 0;
    const eligible=
      direct.coreCount >= Number(feature.minCoreCount||4) &&
      direct.coreUnits >= Number(feature.minCoreUnits||2.5) &&
      direct.diagnosticCount >= Number(feature.minDiagnosticCount||0) &&
      direct.diagnosticUnits >= Number(feature.minDiagnosticUnits||0) &&
      (!feature.supportAxis || supportAxis>=0.25);

    const breadth=
      direct.coreUnits +
      2*direct.diagnosticUnits +
      (feature.supportAxis ? 2*supportAxis : 0);

    return {
      eligible,
      confidence:eligible ? clamp01(breadth/6) : 0,
      effectiveBreadth:breadth,
      coreCount:direct.coreCount,
      diagnosticCount:direct.diagnosticCount,
      supportAxis:Number(supportAxis.toFixed(3))
    };
  }

  function nounSpendsPhrase(identity,feature) {
    if((feature.spentBy||[]).includes(identity?.id)) return true;
    const coverage=identityCoverage(identity);
    if(feature.primaryTag && coverage.has(feature.primaryTag)) return true;
    return (feature.tags||[]).some(tag=>coverage.has(tag));
  }

  function phraseScore(feature,scores,traits,identity,traitEvidence={}) {
    const quality=phraseQuality(feature,scores,traits,traitEvidence);
    if(!quality.eligible) return 0;
    let score=phraseEvidence(feature,scores,traits);
    if(nounSpendsPhrase(identity,feature)) score*=0.04;
    if(!feature.axis) score*=0.72+0.28*quality.confidence;
    return clamp01(score);
  }

  function rankPhrases(identity,scores,traits,traitEvidence={}) {
    return PHRASE_FEATURES
      .map(feature=>{
        const quality=phraseQuality(feature,scores,traits,traitEvidence);
        return {
          feature,
          evidence:phraseEvidence(feature,scores,traits),
          quality,
          score:phraseScore(feature,scores,traits,identity,traitEvidence)
        };
      })
      .filter(item=>item.score>0)
      .sort((a,b)=>b.score-a.score || b.evidence-a.evidence || a.feature.id.localeCompare(b.feature.id));
  }

  function identityAllowsTwist(identity,twist) {
    if((twist.appliesTo||[]).includes(identity?.id)) return true;
    if((twist.appliesFamilies||[]).includes(identity?.family)) return true;
    return false;
  }

  function twistEvidence(twist,scores,traits) {
    const values=[];
    if(twist.axis) values.push(directionStrength(scores,twist.axis,twist.direction));
    if(twist.traits?.length) values.push(Math.max(0,...twist.traits.map(tag=>clamp01(traits?.[tag]))));
    if(twist.allTraits?.length) values.push(Math.min(...twist.allTraits.map(tag=>clamp01(traits?.[tag]))));
    return values.length ? Math.max(...values) : 0;
  }

  function twistScore(twist,identity,scores,traits,phraseFeature=null) {
    if(twist.fallback) return 0;
    if(!identityAllowsTwist(identity,twist)) return 0;
    if(phraseFeature && (twist.blockedPhraseIds||[]).includes(phraseFeature.id)) return 0;
    const evidence=twistEvidence(twist,scores,traits);
    if(evidence<Number(twist.min||0.4)) return 0;
    return clamp01(evidence*Number(twist.priority||1));
  }

  function rankTwists(identity,scores,traits,phraseFeature=null) {
    return TWISTS.filter(twist => PUBLIC_MODIFIER_SET.has(twist.id))
      .map(twist=>({
        twist,
        evidence:twistEvidence(twist,scores,traits),
        score:twistScore(twist,identity,scores,traits,phraseFeature)
      }))
      .filter(item=>item.score>0)
      .sort((a,b)=>b.score-a.score || b.evidence-a.evidence || a.twist.id.localeCompare(b.twist.id));
  }

  function asPhrase(feature) {
    return feature ? {
      id:feature.id,
      text:feature.phrase,
      axis:feature.axis||null,
      direction:feature.direction||null,
      adds:feature.tags||[],
      explanation:feature.explanation
    } : null;
  }

  function asModifier(twist) {
    return twist ? {
      id:twist.id,
      text:twist.text,
      explanation:twist.explanation
    } : null;
  }

  function indefiniteArticle(phrase) {
    const spoken=String(phrase||"").trim();
    if(!spoken) return "a";
    // Public jurisprudential labels are ordinary words, so vowel-initial labels
    // take "an"; this keeps the article tied to the actual rendered phrase.
    return /^[aeiou]/i.test(spoken) ? "an" : "a";
  }

  function fitModifier(classification) {
    const score=Number(classification?.identityScore);
    if(!Number.isFinite(score)) return null;
    const runner=Number(classification?.identityAlternatives?.[0]?.score);
    const margin=Number.isFinite(runner)?score-runner:1;
    const noun=classification?.identity?.label||"";
    const article=indefiniteArticle(noun);

    // Deliberately generous outer bands: the unmodified noun is the relatively
    // narrow middle case, while "Unmistakably a/an" and "Some kind of" communicate
    // unusually clean versus weak nearest-neighbor classification.
    const corroboration=Number(classification?.primaryStrength);
    const isolated=new Set(["weak_form_constitutionalist","minimalist","thayerian",
      "nonpositivist","fullerian","intentionalist","political_process_jurist",
      "sociological_jurist","proportionalist","common_good_constitutionalist"]);
    const needsMore=isolated.has(classification?.identity?.id) &&
      Number.isFinite(corroboration) && corroboration<0.6;
    if(score>=0.82 && margin>=0.07 && !needsMore) {
      return {
        id:"fit_unmistakable",
        text:`Unmistakably ${article}`,
        explanation:"Your answers form an unusually clean and well-separated match for this jurisprudential identity."
      };
    }
    if(score<0.72 || margin<0.04) {
      return {
        id:"fit_some_kind",
        text:"Some kind of",
        explanation:"This is your nearest jurisprudential neighbor, but the match is comparatively weak, mixed, or close to another identity."
      };
    }
    return null;
  }

  function isOriginalistIdentity(identity) {
    return ["originalist","public_meaning_originalist","original_intent_originalist"].includes(identity?.id);
  }

  function isSourceIdentity(identity) {
    return ["positivist","natural_lawyer","interpretivist","fullerian","nonpositivist"].includes(identity?.id);
  }

  function isMethodIdentity(identity) {
    return [
      "textualist","intentionalist","purposivist","legal_process_theorist",
      "interpretive_pluralist","pragmatist","legal_realist","sociological_jurist"
    ].includes(identity?.id);
  }

  const SOURCE_SUBSTANTIVE_MODIFIERS = new Set([
    "inclusive_positivism",
    "exclusive_positivism",
    "normative_positivism",
    "moral_impact_nonpositivism",
    "moral_practice_nonpositivism",
    "extreme_injustice_nonpositivism"
  ]);

  const METHOD_SUBSTANTIVE_MODIFIERS = new Set([
    "imaginative_reconstruction",
    "practical_reasoning_pluralism",
    "fact_skeptical_realism"
  ]);

  const MIXED_PHRASE=Object.freeze({id:"mixed_profile",text:"who keeps the hard cases open",explanation:"No secondary judicial commitment was strong enough to justify a more definite description."});

  function specialTitle(classification) {
    const id=classification?.identity?.id;
    if(id==="unusable_response") return "Unclear response pattern";
    if(id==="outcome_driven_left") return "Outcome-driven pattern · left-coded outcomes";
    if(id==="outcome_driven_right") return "Outcome-driven pattern · right-coded outcomes";
    if(id==="incoherent_response") return "Inconsistent response pattern";
    return null;
  }

  function assemble(classification,scores,traits={},traitEvidence={}) {
    const special=specialTitle(classification);
    if(special) {
      return {
        title:special,
        noun:classification.identity.label,
        modifier:null,
        phrase:null,
        bridge:null,
        rankedPhrases:[],
        rankedTwists:[],
        rankedFeatures:[],
        special:true
      };
    }

    const identity=classification?.identity || {id:"interpretive_pluralist",label:"Interpretive Pluralist",family:"method"};

    // The phrase carries the strongest broad residual characteristic.
    const phraseRanking=rankPhrases(identity,scores,traits,traitEvidence);
    const phrasePick=phraseRanking.find(item=>item.score>=0.18)||null;
    const phrase=asPhrase(phrasePick?.feature||null)||MIXED_PHRASE;

    // Substantive modifiers beat generic fit language.  Originalism currently has
    // one such public intermediate camp: New Originalism (constructionist OPM/OI).
    // Otherwise fit quality is expressed as Unmistakably / blank / Some kind of.
    const twistRanking=rankTwists(identity,scores,traits,phrasePick?.feature||null);
    let modifier=null;
    const bestCompatibleSubstantive = (exclude = null) =>
      twistRanking.find(item =>
        item.score >= 0.3 &&
        !item.twist.fallback &&
        (!exclude || !exclude.has(item.twist.id))
      ) || null;

    if(isOriginalistIdentity(identity)) {
      // New Originalism is the canonical Originalist subtype and keeps first
      // priority. If it is not established, a genuinely informative compatible
      // twist (precedent loyalty, higher-law grounding, etc.) should beat generic
      // fit language rather than being silently discarded.
      const newOriginalist=twistRanking.find(item=>item.twist.id==="new_originalism" && item.score>=0.3)||null;
      const substantive=newOriginalist||bestCompatibleSubstantive();
      modifier=substantive?asModifier(substantive.twist):fitModifier(classification);
    } else if(isSourceIdentity(identity)) {
      const preferred=twistRanking.find(item=>SOURCE_SUBSTANTIVE_MODIFIERS.has(item.twist.id) && item.score>=0.3)||null;
      const substantive=preferred||bestCompatibleSubstantive();
      modifier=substantive?asModifier(substantive.twist):fitModifier(classification);
    } else if(isMethodIdentity(identity)) {
      const preferred=twistRanking.find(item=>METHOD_SUBSTANTIVE_MODIFIERS.has(item.twist.id) && item.score>=0.3)||null;
      const substantive=preferred||bestCompatibleSubstantive();
      modifier=substantive?asModifier(substantive.twist):fitModifier(classification);
    } else {
      const substantive=bestCompatibleSubstantive();
      modifier=substantive?asModifier(substantive.twist):fitModifier(classification);
    }

    const title=[modifier?.text,identity.label,phrase?.text].filter(Boolean).join(" ");
    const bridge=BRIDGES.find(item=>item.when(scores,traits,identity))||null;

    const rankedPhrases=phraseRanking.slice(0,8).map(item=>({
      id:item.feature.id,
      group:item.feature.group,
      evidence:Number(item.evidence.toFixed(3)),
      score:Number(item.score.toFixed(3)),
      confidence:Number(item.quality.confidence.toFixed(3)),
      effectiveBreadth:Number(item.quality.effectiveBreadth.toFixed(3)),
      coreCount:item.quality.coreCount,
      diagnosticCount:item.quality.diagnosticCount
    }));
    const rankedTwists=twistRanking.slice(0,8).map(item=>({
      id:item.twist.id,
      evidence:Number(item.evidence.toFixed(3)),
      score:Number(item.score.toFixed(3))
    }));

    return {
      title,
      noun:identity.label,
      nounExplanation:IDENTITY_COPY[identity.id]||"",
      modifier,
      phrase,
      bridge,
      rankedPhrases,
      rankedTwists,
      // Backward-compatible debug key: this now means phrase ranking only.
      rankedFeatures:rankedPhrases,
      special:false
    };
  }

  const LEGACY_FEATURE_ALIASES=Object.freeze({
    source_following:"source_positive",
    principle_seeking:"principles_as_law",
    morality_grounding:"objective_morality",
    practice_following:"practice_authority",
    text_binding:"textual_constraint",
    context_reading:"contextual_text",
    bargain_respecting:"enacted_bargain",
    purpose_seeking:"purposive",
    meaning_fixing:"fixed_meaning",
    principle_applying:"principle_application",
    tradition_following:"historical_practice",
    precedent_preserving:"precedent_stability",
    precedent_breaking:"precedent_correction",
    rule_following:"rules",
    discretion_limiting:"anti_discretion",
    consequence_weighing:"balancing",
    exception_making:"equitable_exceptions",
    boundary_policing:"separation_formal",
    institution_trusting:"separation_functional",
    rights_protecting:"countermajoritarian",
    democracy_deferring:"majoritarian",
    system_reforming:"structural_remedies",
    remedy_narrowing:"narrow_remedies",
    case_by_case:"low_theory",
    democracy_decides:"majoritarian",
    clear_error_only:"clear_error",
    rights_beat_majorities:"countermajoritarian",
    judicial_independence:"judicial_independence",
    electoral_judges:"electoral_accountability",
    preserve_precedent:"precedent_stability",
    correction_first:"precedent_correction",
    statutory_stare_decisis:"statutory_precedent",
    plaintiff_specific:"narrow_remedies",
    systemic_relief:"structural_remedies",
    universal_relief:"universal_relief",
    severability:"severability",
    prophylactic:"prophylactic",
    strict_separation:"separation_formal",
    functional_institutions:"separation_functional",
    balancing:"balancing",
    moral_source:"objective_morality",
    positive_law:"source_positive",
    fixed_meaning:"fixed_meaning",
    evolving_meaning:"living_meaning",
    public_meaning:"fixed_meaning",
    enacted_bargain:"enacted_bargain",
    purpose:"purposive",
    low_theory:"low_theory"
  });

  const LEGACY_FEATURE_RENDERINGS=Object.freeze(  {
    "source_positive": {
      "modifier": "Morality-\\u201cblind\\u201d",
      "phrase": "who insists \\u201cevil\\u201d and \\u201cillegal\\u201d are different complaints",
      "explanation": "You sharply separate legal validity from moral merit; the joke is the non-positivist complaint that this quarantines morality from the question of what law is."
    },
    "law_runs_out": {
      "modifier": "Gap-friendly",
      "phrase": "who thinks judges sometimes have to make it up",
      "explanation": "You think genuinely novel cases can exhaust the existing law, leaving judges to create a rule rather than discover an already-existing legal answer."
    },
    "principles_as_law": {
      "modifier": "Principle-smuggling",
      "phrase": "who keeps finding law nobody enacted",
      "explanation": "You give unwritten legal principles real legal force rather than treating them as merely moral reasons outside the law."
    },
    "objective_morality": {
      "modifier": "Bench-moralizing",
      "phrase": "who brought moral philosophy to a legal-text fight",
      "explanation": "You are unusually willing to treat objective moral requirements as part of the legal question itself."
    },
    "textual_constraint": {
      "modifier": "Text-worshipping",
      "phrase": "who thinks the words are, annoyingly, legally binding",
      "explanation": "Enacted language puts unusually hard limits on what you think judges may do."
    },
    "contextual_text": {
      "modifier": "Dictionary-dodging",
      "phrase": "who thinks the dictionary forgot context exists",
      "explanation": "You resist isolated dictionary literalism and read legal language in its linguistic and legal context."
    },
    "enacted_bargain": {
      "modifier": "Fine-print-loving",
      "phrase": "who makes Congress live with the loophole it wrote",
      "explanation": "You give unusual weight to enacted compromises, exceptions, and omissions even when they frustrate a broader statutory goal."
    },
    "purposive": {
      "modifier": "Text-hating",
      "phrase": "who apparently can\\u2019t read",
      "explanation": "You are comparatively willing to let statutory purpose and practical sense overcome a rigid reading of enacted words."
    },
    "intent": {
      "modifier": "Mind-reading",
      "phrase": "who wants to know what Congress was thinking",
      "explanation": "Actual legislative or enactor intent matters to you independently of text and objective statutory purpose."
    },
    "fixed_meaning": {
      "modifier": "Dead-hand-bound",
      "phrase": "who lets dead people freeze the meaning",
      "explanation": "You treat legal meaning as substantially fixed at adoption rather than updated by later usage or values."
    },
    "living_meaning": {
      "modifier": "Amendment-optional",
      "phrase": "who thinks formal amendment is apparently optional",
      "explanation": "You accept genuine constitutional development without requiring every change in constitutional content to pass through formal amendment."
    },
    "historical_practice": {
      "modifier": "Ouija-board-guided",
      "phrase": "who asks the dead how they did it",
      "explanation": "Historical applications and longstanding early governmental practice carry unusual evidentiary weight for you."
    },
    "precedent_stability": {
      "modifier": "Error-hoarding",
      "phrase": "who thinks being wrong for 50 years counts for something",
      "explanation": "Reliance, settlement, and legal continuity make you unusually reluctant to discard an established decision even when it was mistaken."
    },
    "precedent_correction": {
      "modifier": "Case-burning",
      "phrase": "who thinks old mistakes deserve no retirement plan",
      "explanation": "You put correctness ahead of preserving precedent and are unusually willing to overrule decisions you think are seriously wrong."
    },
    "statutory_precedent": {
      "modifier": "Congress-can-fix-it",
      "phrase": "who makes Congress clean up the Court\\u2019s old mistakes",
      "explanation": "You give extra staying power to statutory precedent because the legislature can amend the statute itself."
    },
    "narrow_remedies": {
      "modifier": "Remedy-stingy",
      "phrase": "who brought a Band-Aid to a house fire",
      "explanation": "You generally want judicial relief confined to the parties and violation actually before the court."
    },
    "structural_remedies": {
      "modifier": "Court-running",
      "phrase": "who thinks the judge should just run the place",
      "explanation": "Once a systemic violation is established, you are comparatively comfortable with restructuring institutions and continuing judicial supervision."
    },
    "universal_relief": {
      "modifier": "One-lawsuit-fixes-all",
      "phrase": "who refuses to make everyone sue separately",
      "explanation": "You are willing to extend relief beyond the named plaintiff when the same unlawful rule affects many people."
    },
    "severability": {
      "modifier": "Statute-surgery",
      "phrase": "who amputates the bad part and sends the rest home",
      "explanation": "You prefer cutting out the invalid provision while preserving the remainder of a workable law."
    },
    "prophylactic": {
      "modifier": "Extra-rule-writing",
      "phrase": "who writes an extra rule because the right needs backup",
      "explanation": "You allow courts to create protective rules beyond the bare constitutional minimum when needed to make the underlying right effective."
    },
    "majoritarian": {
      "modifier": "Rights-on-honor-system",
      "phrase": "who lets the majority grade its own rights homework",
      "explanation": "You give elected government unusually broad room when constitutional meaning is reasonably contestable."
    },
    "countermajoritarian": {
      "modifier": "Democracy-vetoing",
      "phrase": "who trusts judges with democracy\\u2019s emergency brake",
      "explanation": "You are unusually willing to have courts enforce constitutional rights against sustained majority opposition."
    },
    "separation_formal": {
      "modifier": "Org-chart-worshipping",
      "phrase": "who thinks the boxes on the diagram are sacred",
      "explanation": "You are unusually strict about constitutionally assigned institutional powers and prescribed procedures."
    },
    "separation_functional": {
      "modifier": "Separation-\\u201coptional\\u201d",
      "phrase": "who thinks separation of powers is more of a suggestion",
      "explanation": "You tolerate institutional overlap when the arrangement remains workable, accountable, and preserves each branch\\u2019s core role."
    },
    "rules": {
      "modifier": "Rule-worshipping",
      "phrase": "who would rather be predictably wrong than unpredictably fair",
      "explanation": "You accept some ugly edge cases as the price of general rules that constrain decision-makers."
    },
    "anti_discretion": {
      "modifier": "Judgment-allergic",
      "phrase": "who thinks judges exercising judgment is the problem",
      "explanation": "Your attraction to rules is especially driven by fear of arbitrary, biased, or inconsistent discretion."
    },
    "balancing": {
      "modifier": "Vibes-balancing",
      "phrase": "who turns every rule into a vibes check",
      "explanation": "You prefer contextual weighing of competing considerations over categorical rules in hard cases."
    },
    "equitable_exceptions": {
      "modifier": "Exception-addicted",
      "phrase": "who thinks every hard case deserves a loophole",
      "explanation": "You resist rigid rules when their margins create outcomes you regard as arbitrary or unfair."
    },
    "proportionality": {
      "modifier": "Balancing-with-homework",
      "phrase": "who makes balancing wear a checklist",
      "explanation": "You favor structured proportionality rather than free-form all-things-considered balancing."
    },
    "pragmatic_consequences": {
      "modifier": "Policy-playing",
      "phrase": "who keeps asking what happens after the opinion",
      "explanation": "Practical consequences and institutional workability matter unusually strongly to your legal reasoning."
    },
    "legal_process": {
      "modifier": "Process-pilled",
      "phrase": "who asks whose job it is before asking who is right",
      "explanation": "Institutional role and competence are part of the legal answer for you, not merely afterthoughts."
    },
    "low_theory": {
      "modifier": "Vibes-based",
      "phrase": "who calls it case-by-case because \\u201cI know it when I see it\\u201d sounded worse",
      "explanation": "You prefer concrete, fact-sensitive judgment over forcing every hard case through one comprehensive theory."
    },
    "realism": {
      "modifier": "Doctrine-cynical",
      "phrase": "who thinks the holding is only half the story",
      "explanation": "You think formal legal materials often underdetermine hard cases and that extra-doctrinal facts help explain what courts actually do."
    }
  });

  function phraseByAnyId(id) {
    const resolved=LEGACY_FEATURE_ALIASES[id]||id;
    return PHRASE_FEATURES.find(feature=>feature.id===resolved)||null;
  }

  function twistByAnyId(id) {
    return TWISTS.find(twist=>twist.id===id)||null;
  }

  function legacyRendering(id,kind) {
    const resolved=LEGACY_FEATURE_ALIASES[id]||id;
    const old=LEGACY_FEATURE_RENDERINGS[resolved];
    if(!old) return null;
    return kind==="phrase"
      ? {id:resolved,text:old.phrase,explanation:old.explanation}
      : {id:resolved,text:old.modifier,explanation:old.explanation};
  }

  function fromIds(identity,scores,traits,ids={}) {
    const assembled=assemble({identity},scores,traits||{},{});
    if(ids.phraseId) {
      const feature=phraseByAnyId(ids.phraseId);
      assembled.phrase=ids.phraseId==="mixed_profile"?MIXED_PHRASE:feature?asPhrase(feature):legacyRendering(ids.phraseId,"phrase")||assembled.phrase;
    }
    if(ids.modifierId) {
      const twist=twistByAnyId(ids.modifierId);
      assembled.modifier=ids.modifierId.startsWith("fit_")
        ? ids.modifierId==="fit_some_kind"
          ? {id:"fit_some_kind",text:"Some kind of",explanation:"This is your nearest jurisprudential neighbor, but the match is comparatively weak, mixed, or close to another identity."}
          : ids.modifierId==="fit_unmistakable"
            ? {id:"fit_unmistakable",text:`Unmistakably ${indefiniteArticle(identity.label)}`,explanation:"Your answers form an unusually clean and well-separated match for this jurisprudential identity."}
            : null
        : twist?asModifier(twist):legacyRendering(ids.modifierId,"modifier")||assembled.modifier;
    }
    if(ids.bridgeId) assembled.bridge=BRIDGES.find(x=>x.id===ids.bridgeId)||assembled.bridge;
    assembled.title=[assembled.modifier?.text,identity.label,assembled.phrase?.text].filter(Boolean).join(" ");
    return assembled;
  }

  global.LAW_RESULT_CONTENT=Object.freeze({
    AXIS_POLES,
    IDENTITY_COPY,
    FEATURES,
    PHRASE_FEATURES,
    TWISTS,
    MODIFIERS,
    PUBLIC_SUBSTANTIVE_MODIFIER_IDS,
    PUBLIC_MODIFIERS,
    INTERNAL_TWIST_IDS,
    PHRASES,
    BRIDGES,
    phraseEvidence,
    phraseQuality,
    phraseScore,
    rankPhrases,
    rankTwists,
    // Backward-compatible alias for older debug/test callers.
    rankFeatures:rankPhrases,
    assemble,
    fromIds
  });
})(globalThis);
