/* Proposed adaptive diagnostic bank.
   These questions are not part of the public 93-item core yet.
   They are classification tie-breakers and normally do not move the eight headline axes. */

globalThis.LAW_DIAGNOSTIC_QUESTIONS = Object.freeze([
  // Universal soft probe for the only intentionally non-axis identity.
  {
    id: "D-RLS1",
    family: "realism",
    priority: "high",
    unlock: "Ask everyone once after the core, unless skipped by a future response-quality rule.",
    prompt: "In genuinely hard appellate cases, legal materials often support more than one defensible answer. Which answer a judge actually chooses therefore often depends substantially on things outside legal doctrine—such as the judge’s background views, experience, politics, psychology, or sense of practical consequences.",
    agreeTraits: ["realism.underdetermination", "realism.extra_doctrinal"],
    disagreeTraits: [],
    nextOnAgree: ["D-RLS2", "D-RLS3"],
    nextOnDisagree: [],
    relatedIdentityIds: ["legal_realist"],
    note: "Agreement only unlocks Realism; it is not enough by itself to classify someone as a Legal Realist."
  },
  {
    id: "D-RLS2",
    family: "realism",
    priority: "high",
    unlock: "D-RLS1 agree.",
    prompt: "A theory of judging that studies only statutes, precedents, and legal reasoning misses an important part of how courts actually work. Predicting hard cases also requires empirical knowledge about judges and the institutions around them.",
    agreeTraits: ["realism.empirical_prediction", "realism.extra_doctrinal"],
    disagreeTraits: [],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["legal_realist"],
    note: "Captures the Realist empirical/predictive orientation rather than normative pragmatism."
  },
  {
    id: "D-RLS3",
    family: "realism",
    priority: "high",
    unlock: "D-RLS1 agree.",
    prompt: "A judge may sincerely describe a difficult decision as compelled by legal doctrine even when equally respectable legal arguments supported the opposite result and nonlegal considerations did much of the actual deciding.",
    agreeTraits: ["realism.underdetermination", "realism.extra_doctrinal"],
    disagreeTraits: [],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["legal_realist"],
    note: "A confirmed Realist should normally agree with the broader pattern across D-RLS1–3, not just one proposition."
  },

  // Originalism router
  {
    id: "D-ORI1",
    family: "originalism",
    priority: "high",
    unlock: "Originalist is a leading identity candidate and core T7 is not decisive.",
    prompt: "Suppose the public meaning of a constitutional provision at ratification clearly points one way, but reliable private records show that its drafters intended something different. The public meaning should control.",
    agreeTraits: ["time.public_meaning"],
    disagreeTraits: ["time.original_intent"],
    nextOnAgree: ["D-ORI2", "D-ORI3"],
    nextOnDisagree: ["D-ORI2"],
    relatedIdentityIds: ["public_meaning_originalist", "original_intent_originalist"],
    note: "Use only when core public-meaning evidence is insufficient; do not redundantly ask a respondent already cleanly sorted by T7."
  },
  {
    id: "D-ORI2",
    family: "originalism",
    priority: "high",
    unlock: "Originalist candidate remains ambiguous after public-meaning/intent evidence.",
    prompt: "The Constitution should be interpreted using the legal rules and interpretive methods that were accepted when it was adopted, even when those historical methods produce a different answer from simply asking what the words meant to an ordinary reader.",
    agreeTraits: ["time.original_methods"],
    disagreeTraits: [],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["original_methods_originalist"],
    note: "Specific McGinnis/Rappaport-style diagnostic."
  },
  {
    id: "D-ORI3",
    family: "originalism",
    priority: "high",
    unlock: "Originalist candidate has meaningful construction/open-development evidence or Framework Originalism is plausible.",
    prompt: "When the Constitution’s fixed original meaning genuinely leaves a question unresolved, later generations may legitimately develop constitutional doctrine within that unresolved space without changing the Constitution’s original meaning.",
    agreeTraits: ["time.construction_zone", "time.framework"],
    disagreeTraits: [],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["framework_originalist", "public_meaning_originalist", "originalist"],
    note: "Agreement does not by itself make someone Balkinian; combine with the broader framework/living-construction pattern."
  },

  // Positivism / nonpositivism router
  {
    id: "D-POS1",
    family: "positivism",
    priority: "high",
    unlock: "Positivist is a leading identity candidate and Hart/Raz precision would materially change the middle label or champion.",
    prompt: "A legal system can make moral correctness part of its own test for legal validity—for example, by adopting a constitutional rule that no law is valid unless it respects human dignity. Morality matters there because the legal system’s accepted rule itself points to that moral standard.",
    agreeTraits: ["source.morality_incorporated"],
    disagreeTraits: ["source.source_thesis"],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["inclusive_positivist", "exclusive_positivist"],
    note: "Only interpret inside an already-positive-law profile. The same answer outside positivism means something different."
  },
  {
    id: "D-NP1",
    family: "nonpositivism",
    priority: "high",
    unlock: "Natural Lawyer and Dworkinian/other nonpositivist candidates remain competitive.",
    prompt: "Natural law does not give judges a general license to replace clear positive law with whichever result seems morally best. One important purpose of positive law is to authoritatively settle questions that practical morality itself leaves open.",
    agreeTraits: ["source.positive_law_settlement", "source.objective_morality"],
    disagreeTraits: [],
    nextOnAgree: [],
    nextOnDisagree: ["D-NP2"],
    relatedIdentityIds: ["natural_lawyer"],
    note: "Finnis/Pojanowski-sensitive discriminator: natural law plus the settlement function of posited law."
  },
  {
    id: "D-NP2",
    family: "nonpositivism",
    priority: "high",
    unlock: "Dworkinian candidate remains ambiguous after core S8 or D-NP1.",
    prompt: "When statutes and precedents do not uniquely settle a hard case, the legal answer can be the moral principle that best fits and justifies the legal system as a whole. The judge can be discovering part of the existing law rather than creating a new rule.",
    agreeTraits: ["source.principles_are_law", "source.fit_and_justification", "source.right_answer"],
    disagreeTraits: [],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["dworkinian", "interpretivist"],
    note: "Close to S8; ask only if the existing Dworkin evidence is genuinely ambiguous."
  },
  {
    id: "D-NP4",
    family: "nonpositivism",
    priority: "high",
    unlock: "Nonpositivist is clear but Natural Law and Dworkinian interpretivism do not fully explain why institutional action changes legal obligations.",
    prompt: "When legislatures and courts act, what matters legally is the change those institutional actions make to people's actual moral rights and obligations. Those resulting moral obligations are the law; they are not merely moral reasons for obeying a separate source-based legal rule.",
    agreeTraits: ["source.moral_impact", "source.one_system"],
    disagreeTraits: [],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["moral_impact_theorist", "nonpositivist"],
    note: "Greenberg-style Moral Impact Theory diagnostic. Distinguishes institutional moral impact from Dworkinian fit/justification and classical Natural Law."
  },
  {
    id: "D-NP3",
    family: "nonpositivism",
    priority: "medium",
    unlock: "Fullerian candidate is plausible and the project decides that Fuller precision is worth the extra question.",
    prompt: "A system that rules mainly through secret, retroactive, contradictory, or constantly changing commands can fail as law in an important sense even if every command came from the formally authorized ruler.",
    agreeTraits: ["source.internal_legality"],
    disagreeTraits: [],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["fullerian"],
    note: "Do not ask merely because someone is Nonpositivist; this tests Fuller's distinctive internal morality of legality."
  },

  // Majoritarian / constitutional authority router
  {
    id: "D-MAJ1",
    family: "majoritarian",
    priority: "high",
    unlock: "Posture is extremely Majoritarian or anti-judicial-supremacy is otherwise plausible.",
    prompt: "Even after the Supreme Court announces what the Constitution means, Congress and the President remain entitled to form and act on their own good-faith constitutional interpretations rather than treating the Court’s interpretation as uniquely authoritative.",
    agreeTraits: ["posture.anti_judicial_supremacy", "posture.branch_interpretation"],
    disagreeTraits: ["posture.judicial_supremacy"],
    nextOnAgree: ["D-MAJ2"],
    nextOnDisagree: [],
    relatedIdentityIds: ["departmentalist", "popular_constitutionalist"],
    note: "This is the key step beyond mere Majoritarianism."
  },
  {
    id: "D-MAJ2",
    family: "majoritarian",
    priority: "high",
    unlock: "D-MAJ1 agree.",
    prompt: "Constitutional meaning should also remain open to development through ordinary democratic politics, social movements, elections, and sustained public contestation rather than becoming the exclusive property of courts or any single branch of government.",
    agreeTraits: ["posture.popular_authority"],
    disagreeTraits: ["posture.branch_interpretation"],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["popular_constitutionalist", "departmentalist"],
    note: "Agreement points toward Popular Constitutionalism; disagreement paired with D-MAJ1 points more toward Departmentalism."
  },
  {
    id: "D-ELY1",
    family: "majoritarian",
    priority: "medium",
    unlock: "Respondent is generally deferential but shows unusually selective willingness to intervene for process failures / excluded groups.",
    prompt: "Courts should ordinarily defer to democratic government, but intervene much more aggressively when the political process itself is distorted or when a minority is effectively shut out of ordinary political bargaining.",
    agreeTraits: ["posture.process_reinforcement", "posture.conditional_intervention"],
    disagreeTraits: [],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["elyan"],
    note: "Ely is conditional and therefore should never be inferred from a single Majoritarian percentage."
  },
  {
    id: "D-WAL1",
    family: "majoritarian",
    priority: "medium",
    unlock: "Thayerian and Waldronian candidates remain difficult to separate from the core Posture answers.",
    prompt: "When democratic institutions are functioning well and citizens disagree in good faith about what rights require, the strongest reason for legislative rather than judicial finality is that elected institutions have the better claim to make the community’s authoritative decision.",
    agreeTraits: ["posture.democratic_legitimacy", "posture.reasonable_disagreement"],
    disagreeTraits: [],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["waldronian"],
    note: "Use only if O1/O2/O5/O8 have not already made the democratic-legitimacy rationale clear."
  },

  // Statutory-method routers
  {
    id: "D-INT1",
    family: "interpretation",
    priority: "medium",
    unlock: "Open-construction answers are strong but Intentionalist and Purposivist explanations remain both plausible.",
    prompt: "When enacted words are genuinely unclear, the court’s goal should be to recover what the lawmakers who enacted them actually intended, even if that intention differs from the statute’s best objective purpose.",
    agreeTraits: ["constraint.intent"],
    disagreeTraits: ["constraint.objective_purpose"],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["intentionalist", "purposivist"],
    note: "Intentionalism is a leading real interpretive theory and should not be silently collapsed into purposivism."
  },
  {
    id: "D-LP1",
    family: "interpretation",
    priority: "medium",
    unlock: "Purposivist/Pragmatist answers combine with strong institutional-settlement or role-allocation themes.",
    prompt: "In a hard case, one of the first legal questions should be which institution was assigned the decision and is best equipped to make it; courts should then reason from the purposes and principles appropriate to that institution’s role.",
    agreeTraits: ["method.institutional_competence", "method.reasoned_elaboration"],
    disagreeTraits: [],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["legal_process_theorist"],
    note: "Distinguishes Legal Process from purpose-seeking alone."
  },

  // Deferred / niche-but-real branches
  {
    id: "D-CGC1",
    family: "common_good",
    priority: "deferred",
    unlock: "Natural-law/classical-law answers are strong and Common-Good Constitutionalism is a live identity candidate.",
    prompt: "Constitutional interpretation should understand public authority as ordered toward the common good of the political community, rather than treating individual autonomy or historically fixed meaning as the law’s overriding constitutional aim.",
    agreeTraits: ["method.common_good", "time.classical_tradition"],
    disagreeTraits: [],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["common_good_constitutionalist"],
    note: "Real theory, but do not ask unless the base profile makes this genuinely plausible; it should remain rare."
  },
  {
    id: "D-PROP1",
    family: "proportionality",
    priority: "deferred",
    unlock: "Balancing is extremely strong and Proportionalist would materially improve on a generic modifier.",
    prompt: "When government limits a constitutional right, courts should use a structured proportionality inquiry: ask whether the measure serves a proper purpose, is suitably connected to that purpose, is no more restrictive than necessary, and strikes a justified balance between the public benefit and the burden on the right.",
    agreeTraits: ["form.proportionality"],
    disagreeTraits: [],
    nextOnAgree: [],
    nextOnDisagree: [],
    relatedIdentityIds: ["proportionalist", "alexyan"],
    note: "Structured proportionality is narrower than generic case-by-case balancing."
  }
]);
