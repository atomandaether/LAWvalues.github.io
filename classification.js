/* Sparse jurisprudential matching and adaptive diagnostic router. */
(function attachClassification(global) {
  "use strict";

  const AXIS_IDS = ["sorc", "cons", "time", "prec", "remed", "post", "separ", "form"];
  const MAX_DIAGNOSTICS = 7;

  const EXTRA_DIAGNOSTICS = Object.freeze([
    {
      id: "D-QC1",
      family: "quality",
      priority: "high",
      unlock: "Asked once after the universal Realism probe before any other adaptive routing.",
      prompt: "Response check: please select Disagree for this item.",
      agreeTraits: [],
      disagreeTraits: [],
      nextOnAgree: [],
      nextOnDisagree: [],
      relatedIdentityIds: ["interpretive_pluralist"],
      qualityCheckExpected: -2,
      note: "Does not affect any jurisprudential axis or trait. Missing it suppresses personality classification rather than interpreting inattentive clicking as a worldview."
    },
    {
      id: "D-SOC1",
      family: "sociological",
      priority: "high",
      unlock: "Open, functional, consequence-sensitive judging makes Sociological Jurisprudence a live primary-fixation candidate.",
      prompt: "When legal doctrine leaves real room for judgment, courts should openly identify the competing social interests, examine how the rule actually operates in society, and shape the doctrine so those interests are reconciled as well as the legal materials permit.",
      agreeTraits: ["method.social_interests", "method.law_in_action"],
      disagreeTraits: [],
      nextOnAgree: [],
      nextOnDisagree: [],
      relatedIdentityIds: ["sociological_jurist"],
      note: "Noun-level Sociological Jurisprudence router and Roscoe Pound champion evidence."
    },
    {
      id: "D-PLU1",
      family: "pluralism",
      priority: "medium",
      unlock: "No single jurisprudential method strongly dominates, or multiple interpretive modalities are already evident.",
      prompt: "Constitutional interpretation legitimately uses several different forms of argument—text, history, precedent, structure, consequences, and broader constitutional principles—and no one of those methods should control every hard case.",
      agreeTraits: ["method.modal_pluralism"],
      disagreeTraits: [],
      nextOnAgree: ["D-PLU2"],
      nextOnDisagree: ["D-OCO1"],
      relatedIdentityIds: ["interpretive_pluralist"],
      note: "Noun-level principled methodological-pluralism router."
    },
    {
      id: "D-PLU2",
      family: "pluralism",
      priority: "medium",
      unlock: "Interpretive Pluralist is established and Practical Reasoning could materially change the modifier/champion.",
      prompt: "The legitimate interpretive tools do not have a fixed hierarchy. Their weight should shift with the case: text may dominate one dispute, while purpose, legal context, consequences, or policy may legitimately carry more weight in another.",
      agreeTraits: ["method.practical_reasoning", "method.modal_pluralism"],
      disagreeTraits: [],
      nextOnAgree: [],
      nextOnDisagree: [],
      relatedIdentityIds: ["interpretive_pluralist"],
      note: "Practical-Reasoning modifier and Eskridge/Frickey champion discriminator; disagreement leaves Bobbitt-style modal pluralism."
    },
    {
      id: "D-OCO1",
      family: "low_theory",
      priority: "medium",
      unlock: "Broadly moderate profile remains without a strong theoretical identity after pluralism is considered.",
      prompt: "In genuinely hard cases, I would rather decide narrowly from the concrete facts and practical circumstances than commit to a comprehensive theory that is supposed to determine the correct method across very different cases.",
      agreeTraits: ["method.case_by_case", "method.anti_grand_theory", "remedies.incremental"],
      disagreeTraits: [],
      nextOnAgree: [],
      nextOnDisagree: [],
      relatedIdentityIds: ["interpretive_pluralist", "minimalist"],
      note: "Allows an O'Connor-like low-theory judicial personality without pretending it is a formal jurisprudential school."
    }
  ]);

  const CORE_TRAIT_RULES = Object.freeze({
    "source.social_practice": [["S5", 1, 1]],
    "source.law_runs_out": [["S7", 1, 1], ["S8", -1, 0.35]],
    "source.principles_are_law": [["S8", 1, 1], ["S7", -1, 0.35]],
    "source.extreme_injustice": [["S2", 1, 1]],
    "source.objective_morality": [["S10", 1, 1], ["S11", 1, 1], ["S9", 1, 0.6]],
    "constraint.purpose": [["C8", 1, 0.8], ["C12", 1, 0.8], ["C14", 1, 0.9], ["C15", 1, 1]],
    "constraint.textual": [["C1", 1, 0.6], ["C2", 1, 0.7], ["C7", 1, 0.8], ["C9", 1, 0.7], ["C11", 1, 0.7], ["C17", 1, 1], ["C18", 1, 0.8]],
    "constraint.contextual_textualism": [["C5", 1, 0.8], ["C13", -1, 1]],
    "constraint.enacted_bargain": [["C2", 1, 0.65], ["C11", 1, 0.8], ["C18", 1, 1]],
    "constraint.anti_evasion": [["C14", 1, 1]],
    "time.public_meaning": [["T7", 1, 1]],
    "time.principle_originalism": [["T8", 1, 1]],
    "time.semantic_fixation": [["T10", 1, 1]],
    "time.expected_applications": [["T3", 1, 0.7], ["T9", -1, 0.8]],
    "time.early_practice": [["T11", 1, 1]],
    "time.common_law_development": [["T12", 1, 1], ["P3", 1, 1]],
    "precedent.reliance": [["P1", 1, 1], ["P4", 1, 0.8], ["P12", 1, 1]],
    "precedent.settlement": [["P5", 1, 0.9], ["P7", 1, 1]],
    "precedent.statutory": [["P2", 1, 0.8], ["P12", 1, 0.7]],
    "remedies.universal": [["R1", 1, 0.9], ["R2", 1, 1]],
    "remedies.severability": [["R6", 1, 0.9], ["R7", 1, 0.9], ["R11", 1, 1]],
    "remedies.prophylactic": [["R9", 1, 1], ["R10", 1, 1]],
    "remedies.structural": [["R3", 1, 0.9], ["R5", 1, 0.9], ["R8", 1, 0.8]],
    "remedies.supervision": [["R4", 1, 1]],
    "method.narrow_shallow": [["R11", 1, 1], ["R6", 1, 0.6], ["R7", 1, 0.6]],
    "posture.clear_error": [["O1", 1, 1]],
    "posture.democratic_legitimacy": [["O2", 1, 0.9], ["O5", 1, 0.75], ["O8", 1, 1]],
    "posture.dialogic": [["O6", 1, 1]],
    "posture.passive_virtues": [["O7", 1, 1]],
    "posture.rights_trumps": [["O4", 1, 0.8], ["O11", 1, 1], ["O13", 1, 0.6]],
    "posture.judicial_independence": [["O13", 1, 1]],
    "posture.electoral_accountability": [["O12", 1, 1]],
    "separation.nondelegation": [["E3", 1, 1]],
    "separation.unitary_executive": [["E2", -1, 1]],
    "separation.prescribed_process": [["E1", -1, 0.7], ["E4", 1, 1], ["E6", 1, 0.8]],
    "separation.combined_functions": [["E5", 1, 1]],
    "form.predictability": [["F1", 1, 1]],
    "form.anti_discretion": [["F1", 1, 0.7], ["F3", 1, 1], ["F7", 1, 0.8], ["F8", 1, 0.8]],
    "form.edge_case_tolerance": [["F3", 1, 1], ["F8", 1, 0.6]],
    "form.categories": [["F4", 1, 1]],
    "form.equitable_exception": [["F6", 1, 1]],
    "form.cliff_skepticism": [["F9", 1, 1]]
  });

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function clamp01(value) {
    return clamp(Number(value) || 0, 0, 1);
  }

  function axisValue(scores, axisId) {
    const raw = scores?.[axisId];
    const value = typeof raw === "object" && raw !== null ? raw.score : raw;
    return clamp(Number(value), 0, 100);
  }

  function leftStrength(scores, axisId) {
    return Math.max(0, (axisValue(scores, axisId) - 50) / 50);
  }

  function rightStrength(scores, axisId) {
    return Math.max(0, (50 - axisValue(scores, axisId)) / 50);
  }

  function salience(scores, axisId) {
    return Math.abs(axisValue(scores, axisId) - 50) / 50;
  }

  function responseSupport(responses, id, direction) {
    if (!responses || !Object.prototype.hasOwnProperty.call(responses, id)) return 0;
    const value = Number(responses[id]);
    if (!Number.isFinite(value)) return 0;
    return Math.max(0, direction * value / 3);
  }

  function weightedRuleSupport(responses, rules) {
    let numerator = 0;
    let denominator = 0;
    for (const [id, direction, weight] of rules) {
      if (!responses || !Object.prototype.hasOwnProperty.call(responses, id) || responses[id] === null) continue;
      numerator += responseSupport(responses, id, direction) * weight;
      denominator += weight;
    }
    return denominator ? clamp01(numerator / denominator) : 0;
  }

  function setMax(target, trait, value) {
    target[trait] = Math.max(Number(target[trait]) || 0, clamp01(value));
  }

  function buildTraitEvidence(responses = {}, diagnosticResponses = {}) {
    const evidence = {};

    const ensure = (trait) => {
      if (!evidence[trait]) {
        evidence[trait] = {
          coreAvailable: 0,
          coreAnswered: [],
          coreSupporting: [],
          coreStrong: [],
          coreSupport: {},
          coreSupportUnits: 0,
          diagnosticSupporting: [],
          diagnosticStrong: [],
          diagnosticSupport: {},
          diagnosticSupportUnits: 0
        };
      }
      return evidence[trait];
    };

    for (const [trait, rules] of Object.entries(CORE_TRAIT_RULES)) {
      const item = ensure(trait);
      const available = new Set();
      const answered = new Set();
      const supportByQuestion = new Map();

      for (const [id, direction] of rules) {
        available.add(id);
        if (!Object.prototype.hasOwnProperty.call(responses || {}, id) || responses[id] === null) continue;
        answered.add(id);
        const support = responseSupport(responses, id, direction);
        supportByQuestion.set(id, Math.max(supportByQuestion.get(id) || 0, support));
      }

      item.coreAvailable = available.size;
      item.coreAnswered = [...answered];
      item.coreSupporting = [...supportByQuestion.entries()].filter(([, value]) => value > 0).map(([id]) => id);
      item.coreStrong = [...supportByQuestion.entries()].filter(([, value]) => value >= (2 / 3)).map(([id]) => id);
      item.coreSupport = Object.fromEntries(supportByQuestion);
      item.coreSupportUnits = [...supportByQuestion.values()].reduce((sum, value) => sum + value, 0);
    }

    const byId = Object.fromEntries(diagnosticBank().map((item) => [item.id, item]));
    for (const [id, raw] of Object.entries(diagnosticResponses || {})) {
      const diagnostic = byId[id];
      if (!diagnostic || raw === null) continue;
      const value = Number(raw);
      if (!Number.isFinite(value) || value === 0) continue;

      const magnitude = Math.min(1, Math.abs(value) / 3);
      const tags = value > 0 ? diagnostic.agreeTraits : diagnostic.disagreeTraits;
      for (const trait of tags || []) {
        const item = ensure(trait);
        if (!item.diagnosticSupporting.includes(id)) item.diagnosticSupporting.push(id);
        if (magnitude >= (2 / 3) && !item.diagnosticStrong.includes(id)) item.diagnosticStrong.push(id);
        item.diagnosticSupport[id] = Math.max(Number(item.diagnosticSupport[id]) || 0, magnitude);
        item.diagnosticSupportUnits = Object.values(item.diagnosticSupport).reduce((sum, support) => sum + support, 0);
      }
    }

    return evidence;
  }

  function buildCoreTraits(scores, responses) {
    const traits = {};
    for (const [trait, rules] of Object.entries(CORE_TRAIT_RULES)) {
      setMax(traits, trait, weightedRuleSupport(responses, rules));
    }

    const axisTraits = [
      ["sorc", "source.positive_sources", "source.nonpositive_sources"],
      ["cons", "constraint.textual_axis", "constraint.open_construction"],
      ["time", "time.fixation", "time.living_content"],
      ["prec", "precedent.stability", "precedent.correction"],
      ["remed", "remedies.party_specific", "remedies.structural"],
      ["post", "posture.majoritarian", "posture.countermajoritarian"],
      ["separ", "separation.formalist", "separation.functionalist"],
      ["form", "form.rules", "form.balancing"]
    ];
    for (const [axisId, leftTrait, rightTrait] of axisTraits) {
      setMax(traits, leftTrait, leftStrength(scores, axisId));
      setMax(traits, rightTrait, rightStrength(scores, axisId));
    }

    setMax(traits, "constraint.textual", Math.max(traits["constraint.textual"] || 0, leftStrength(scores, "cons")));
    setMax(traits, "precedent.correctness_first", rightStrength(scores, "prec"));
    setMax(traits, "remedies.incremental", leftStrength(scores, "remed"));
    setMax(traits, "remedies.supervision", rightStrength(scores, "remed"));
    setMax(traits, "separation.formalist", leftStrength(scores, "separ"));
    setMax(traits, "separation.functionalist", rightStrength(scores, "separ"));
    setMax(traits, "form.rules", leftStrength(scores, "form"));
    setMax(traits, "form.balancing", rightStrength(scores, "form"));

    const pragmaticCluster = (
      rightStrength(scores, "cons") +
      rightStrength(scores, "separ") +
      rightStrength(scores, "form")
    ) / 3;
    setMax(traits, "method.consequences", pragmaticCluster);
    setMax(traits, "method.workability", pragmaticCluster);

    // Contextual-textualist evidence from the core helps champion scoring, but
    // the narrower modern "best reading" champion gate is diagnostic-only.
    setMax(traits, "method.pluralism", traits["method.modal_pluralism"] || 0);

    const maxAxisSalience = Math.max(...AXIS_IDS.map((id) => salience(scores, id)));
    setMax(traits, "method.low_theory_space", 1 - maxAxisSalience);

    return traits;
  }

  function diagnosticBank() {
    return [
      ...(Array.isArray(global.LAW_DIAGNOSTIC_QUESTIONS) ? global.LAW_DIAGNOSTIC_QUESTIONS : []),
      ...EXTRA_DIAGNOSTICS
    ];
  }

  function applyDiagnosticTraits(traits, diagnosticResponses) {
    const byId = Object.fromEntries(diagnosticBank().map((item) => [item.id, item]));
    for (const [id, raw] of Object.entries(diagnosticResponses || {})) {
      const item = byId[id];
      if (!item || raw === null) continue;
      const value = Number(raw);
      if (!Number.isFinite(value) || value === 0) continue;
      const magnitude = Math.min(1, Math.abs(value) / 3);
      const tags = value > 0 ? item.agreeTraits : item.disagreeTraits;
      for (const trait of tags || []) setMax(traits, trait, magnitude);
    }
    if ((traits["posture.dialogic"] || 0) > 0) setMax(traits, "posture.weak_form", traits["posture.dialogic"]);
    if ((traits["method.social_interests"] || 0) > 0) setMax(traits, "method.law_in_action", traits["method.social_interests"]);
    // An explicit rejection of the direct Dworkinian legal-answer diagnostic
    // defeats a weaker affirmative hint inferred from a different core case.
    if (Number(diagnosticResponses?.["D-NP2"]) <= -2) {
      setMax(traits, "source.interpretivism_rejected",
        Math.abs(Number(diagnosticResponses["D-NP2"])) / 3);
    }
    return traits;
  }

  function buildTraits(scores, responses, diagnosticResponses) {
    return applyDiagnosticTraits(buildCoreTraits(scores, responses), diagnosticResponses);
  }

  function identityFromCatalog(id, fallbackLabel) {
    const found = (global.LAW_RESULT_IDENTITIES || []).find((item) => item.id === id);
    return found ? { id: found.id, label: found.label, family: found.family, status: found.status } :
      { id, label: fallbackLabel || id, family: "fallback", status: "fallback" };
  }


  // Match the primary judicial commitment, not merely the easiest subtype
  // to trigger. A narrow diagnostic adds specificity but never cancels
  // strong contrary evidence on the axis that defines its parent theory.
  function calibrateIdentityCandidates(candidates, scores, traits) {
    const sal=Object.fromEntries(AXIS_IDS.map(id=>[id,salience(scores,id)]));
    const left=Object.fromEntries(AXIS_IDS.map(id=>[id,leftStrength(scores,id)]));
    const right=Object.fromEntries(AXIS_IDS.map(id=>[id,rightStrength(scores,id)]));
    const singleProposition=new Set([
      "weak_form_constitutionalist","minimalist","thayerian","nonpositivist","fullerian",
      "intentionalist","political_process_jurist","legal_process_theorist",
      "sociological_jurist","proportionalist","common_good_constitutionalist"
    ]);
    const output=[];
    for(const candidate of candidates) {
      const id=candidate.identity.id, family=candidate.identity.family;
      if(["nonpositivist","natural_lawyer","interpretivist"].includes(id) && axisValue(scores,"sorc")>=56) continue;
      if(id==="positivist" && axisValue(scores,"sorc")<=44) continue;
      if(["originalist","public_meaning_originalist","original_intent_originalist"].includes(id) && axisValue(scores,"time")<55) continue;
      if(["living_constitutionalist","common_law_constitutionalist"].includes(id) &&
         axisValue(scores,"time")>=56) continue;
      if(id==="textualist" && axisValue(scores,"cons")<=44) continue;
      if(["purposivist","intentionalist","legal_process_theorist"].includes(id) && axisValue(scores,"cons")>=65) continue;
      if(id==="functionalist" && axisValue(scores,"separ")>=56) continue;
      if(id==="proportionalist" && axisValue(scores,"form")>=56) continue;
      if(["thayerian","political_constitutionalist","popular_constitutionalist","departmentalist"].includes(id) &&
         axisValue(scores,"post")<=44) continue;
      if(id==="legal_constitutionalist" && axisValue(scores,"post")>=56) continue;
      let focus=[], basis=0;
      if(id==="common_good_constitutionalist"){
        focus=["sorc","cons","post"];
        basis=(right.sorc+right.cons+left.post)/3;
      }else if(family==="source"){focus=["sorc"];basis=id==="positivist"?left.sorc:right.sorc;}
      else if(family==="time"){
        focus=["time"];basis=id.includes("originalist")?left.time:right.time;
        if(id==="common_law_constitutionalist"){focus=["time","prec"];basis=(right.time+left.prec)/2;}
      }else if(family==="structure"){
        focus=id==="formalist"?["separ","form"]:["separ"];
        basis=id==="formalist"?Math.max(left.separ,left.form*(traits["form.anti_discretion"]||0)):right.separ;
      }else if(family==="form"){focus=["form"];basis=right.form;}
      else if(family==="posture"){
        focus=id==="minimalist"?["post","remed"]:["post"];
        if(id==="weak_form_constitutionalist")basis=Math.max(sal.post,(traits["posture.dialogic"]||0)*0.45);
        else if(id==="minimalist")basis=Math.max(left.remed,(traits["posture.passive_virtues"]||0)*0.38);
        else if(id==="legal_constitutionalist")basis=right.post;
        else if(["political_constitutionalist","thayerian","popular_constitutionalist","departmentalist"].includes(id))basis=left.post;
        else basis=Math.max(sal.post,(traits["posture.process_reinforcement"]||0)*0.45);
      }else if(family==="method"){
        focus=["cons"];
        if(id==="textualist")basis=left.cons;
        else if(id==="interpretive_pluralist"){focus=[];basis=Math.max(0.18,(traits["method.modal_pluralism"]||0)*0.45);}
        else basis=right.cons;
      }else if(id==="legal_realist"){basis=Math.max(0.25,(traits["realism.empirical_prediction"]||0)*0.55);}
      // Cooke's common-law-rights claim itself explains a nonpositive Source
      // score; treating that same axis as a rival theory double-counts it.
      if(id==="common_law_constitutionalist" &&
         (traits["source.common_law_fundamental_rights"]||0)>=0.5) focus.push("sorc");
      const other=Math.max(0,...AXIS_IDS.filter(axis=>!focus.includes(axis)).map(axis=>sal[axis]));
      let score=candidate.score;
      if(id==="legal_realist"){
        // A descriptive view of judicial behavior can accompany Originalism,
        // Positivism, or another strong normative judicial philosophy.
        score=Math.min(score,0.96-0.35*other);
      }else{
        if(singleProposition.has(id))score=Math.min(score,0.80+0.13*basis);
        score-=Math.max(0,other-basis-0.08)*(focus.length?0.39:0.17);
      }
      output.push({...candidate,score:clamp01(score),basis});
    }
    return output;
  }

  function resolveIdentity(scores, traits) {
    const candidates = [];
    const add = (id, score, reason, fallbackLabel) => {
      candidates.push({ identity: identityFromCatalog(id, fallbackLabel), score: clamp01(score), reason });
    };

    const s = Object.fromEntries(AXIS_IDS.map((id) => [id, salience(scores, id)]));
    const l = Object.fromEntries(AXIS_IDS.map((id) => [id, leftStrength(scores, id)]));
    const r = Object.fromEntries(AXIS_IDS.map((id) => [id, rightStrength(scores, id)]));

    const realismConfirmed =
      (traits["realism.underdetermination"] || 0) >= 0.45 &&
      (traits["realism.extra_doctrinal"] || 0) >= 0.45 &&
      ((traits["realism.empirical_prediction"] || 0) >= 0.35 || (traits["realism.law_in_action"] || 0) >= 0.5);
    if (realismConfirmed) add("legal_realist", 0.99, "Confirmed Realism diagnostics.");

    const positivistSpecificity = Math.max(
      traits["source.morality_incorporated"] || 0,
      traits["source.source_thesis"] || 0,
      traits["source.normative_positivism"] || 0
    );
    const nonpositivistSpecificity = Math.max(
      traits["source.moral_impact"] || 0,
      traits["source.moral_practice"] || 0,
      traits["source.extreme_injustice"] || 0
    );
    const interpretivistEvidence = Math.max(
      traits["source.principles_are_law"] || 0,
      traits["source.fit_and_justification"] || 0,
      traits["source.right_answer"] || 0
    );

    if (r.sorc >= 0.2 && interpretivistEvidence >= 0.5 && (traits["source.interpretivism_rejected"]||0) < 0.67) {
      add("interpretivist", 0.82 + 0.12 * s.sorc, "Principles, fit, and justification support Legal Interpretivism.");
    }
    if (r.sorc >= 0.2 &&
        (traits["source.objective_morality"] || 0) >= 0.45 &&
        (traits["source.positive_law_settlement"] || 0) >= 0.35 &&
        interpretivistEvidence < 0.65) {
      add("natural_lawyer", 0.83 + 0.11 * s.sorc, "Objective morality plus a genuine settlement and coordination role for positive law.");
    }
    if ((traits["source.internal_legality"] || 0) >= 0.5) {
      add("fullerian", 0.9, "Internal morality/principles of legality diagnostic.");
    }
    const narrowOneSystem = Math.max(
      traits["source.moral_impact"] || 0,
      traits["source.moral_practice"] || 0
    );
    const extremeInjustice = traits["source.extreme_injustice"] || 0;
    if (((axisValue(scores, "sorc") <= 60 && narrowOneSystem >= 0.5) ||
         (extremeInjustice >= 0.5 && (traits["source.objective_morality"] || 0) < 0.5)) &&
        interpretivistEvidence < 0.5 &&
        (traits["source.positive_law_settlement"] || 0) < 0.5 &&
        (traits["source.internal_legality"] || 0) < 0.5) {
      add("nonpositivist", 0.88, "A distinctive nonpositivist theory is established below the noun layer.", "Non-Positivist");
    }

    if (l.time >= 0.2 && (traits["time.original_intent"] || 0) >= 0.5) {
      add("original_intent_originalist", 0.88, "Affirmative original-intent evidence.");
    }
    if (l.time >= 0.2 && (traits["time.public_meaning"] || 0) >= 0.45) {
      add("public_meaning_originalist", 0.78 + 0.14 * s.time, "Public meaning at adoption.");
    }
    if (r.time >= 0.15 && l.prec >= 0.2 && (traits["time.common_law_development"] || 0) >= 0.4) {
      const strongCommonLawRights = (traits["source.common_law_fundamental_rights"] || 0) >= 0.5;
      add(
        "common_law_constitutionalist",
        strongCommonLawRights ? 0.97 : 0.8 + 0.12 * Math.min(s.time, s.prec),
        strongCommonLawRights
          ? "Fundamental common-law rights are treated as constitutional limits on ordinary legislative supremacy."
          : "Living development through precedent and accumulated practice."
      );
    }
    if ((traits["method.common_good"] || 0) >= 0.5) {
      add("common_good_constitutionalist", 0.9, "Direct common-good/classical-law diagnostic.");
    }

    if ((traits["method.institutional_competence"] || 0) >= 0.45) {
      add("legal_process_theorist", 0.9, "Institutional competence, settlement, and reasoned elaboration establish Legal Process as the primary method.");
    }
    if ((traits["constraint.intent"] || 0) >= 0.5) {
      add("intentionalist", 0.89, "Legislative/enactor intention is the primary interpretive target.");
    }
    if ((traits["method.social_interests"] || 0) >= 0.5 &&
        (traits["method.law_in_action"] || 0) >= 0.5) {
      add("sociological_jurist", 0.92, "Law-in-action and explicit social-interest reasoning establish Sociological Jurisprudence.");
    }
    if ((traits["method.pragmatic_priority"] || 0) >= 0.5) {
      add("pragmatist", 0.91, "Consequences and practical workability are independent adjudicative reasons rather than merely evidence of purpose.");
    }
    if ((traits["form.proportionality"] || 0) >= 0.5) {
      add("proportionalist", 0.99, "Affirmative structured-proportionality evidence establishes Proportionalism rather than generic balancing.");
    }

    const establishedNonAuthorityScore = Math.max(0, ...candidates.map((item) => item.score));
    const authorityCanDominate =
      Math.max(s.sorc, s.cons, s.time, s.separ, s.form) <= 0.7 &&
      establishedNonAuthorityScore < 0.85;
    const processReinforcement = traits["posture.process_reinforcement"] || 0;
    const responsiveReview = traits["posture.responsive_review"] || 0;
    const antiJudicialSupremacy = traits["posture.anti_judicial_supremacy"] || 0;
    const popularAuthority = traits["posture.popular_authority"] || 0;
    const branchInterpretation = traits["posture.branch_interpretation"] || 0;
    const reasonableDisagreement = traits["posture.reasonable_disagreement"] || 0;
    const clearError = traits["posture.clear_error"] || 0;
    const dialogic = traits["posture.dialogic"] || 0;
    const passiveVirtues = traits["posture.passive_virtues"] || 0;
    const narrowShallow = traits["method.narrow_shallow"] || 0;
    const incremental = traits["remedies.incremental"] || 0;

    if (authorityCanDominate && dialogic >= 0.5 && s.post <= 0.5) {
      add("weak_form_constitutionalist", 0.98, "Direct weak-form/dialogic-review evidence within an intermediate judicial-authority posture.");
    }
    if (authorityCanDominate && antiJudicialSupremacy >= 0.45 && popularAuthority >= 0.45) {
      add("popular_constitutionalist", 0.99, "Popular constitutional authority beyond branch-specific departmentalism.");
    }
    if (authorityCanDominate && antiJudicialSupremacy >= 0.45 && branchInterpretation >= 0.45 && popularAuthority < 0.4) {
      add("departmentalist", 0.97, "Independent branch interpretation without a broader popular-authority claim.");
    }
    if (authorityCanDominate && processReinforcement >= 0.5) {
      add(
        "political_process_jurist",
        responsiveReview >= 0.5 ? 0.99 : 0.96,
        responsiveReview >= 0.5
          ? "Responsive political-process review calibrated to specific democratic dysfunctions."
          : "Representation reinforcement / political-process review."
      );
    }
    if (authorityCanDominate && l.post >= 0.2 && reasonableDisagreement >= 0.5) {
      add("political_constitutionalist", 0.98, "Democratic finality under functioning institutions and reasonable rights disagreement.");
    }
    if (authorityCanDominate && l.post >= 0.2 && clearError >= 0.5 && reasonableDisagreement < 0.5) {
      add("thayerian", 0.96, "Courts retain review but invalidate only constitutional judgments outside the range of reasonableness.");
    }
    if (authorityCanDominate && passiveVirtues >= 0.5) {
      add("minimalist", 0.98, "Strategic avoidance and passive virtues establish a distinctive form of Judicial Minimalism.");
    } else if (authorityCanDominate && narrowShallow >= 0.5 && incremental >= 0.45) {
      add("minimalist", 0.94, "Narrow, shallow, incremental adjudication establishes Judicial Minimalism.");
    }

    const rightsReview = traits["posture.rights_trumps"] || 0;
    if (authorityCanDominate && r.post >= 0.3 && rightsReview >= 0.4) {
      add("legal_constitutionalist", 0.8 + 0.14 * s.post, "Entrenched rights and independent courts constrain ordinary political majorities.");
    }

    if (l.time >= 0.3) add("originalist", 0.56 + 0.34 * s.time, "Historical fixation is a dominant feature.");
    const livingSubtypeEvidence = Math.max(
      traits["time.democratic_constitutionalism"] || 0,
      traits["time.transformative_constitutionalism"] || 0
    );
    if (livingSubtypeEvidence >= 0.5) {
      add(
        "living_constitutionalist",
        0.98,
        (traits["time.transformative_constitutionalism"] || 0) >= 0.5
          ? "Transformative Constitutionalism directly establishes a Living constitutional-development theory."
          : "Democratic Constitutionalism directly establishes a Living constitutional-development theory."
      );
    } else if (r.time >= 0.3) {
      add("living_constitutionalist", 0.56 + 0.34 * s.time, "Evolving constitutional content is a dominant feature.");
    }
    if (l.sorc >= 0.25) {
      add(
        "positivist",
        positivistSpecificity >= 0.5 ? 0.8 + 0.12 * s.sorc : 0.56 + 0.34 * s.sorc,
        positivistSpecificity >= 0.5
          ? "Positive-law grounding plus a distinctive Positivist branch."
          : "Positive legal sources dominate the Source axis."
      );
    }
    if (r.sorc >= 0.3 &&
        nonpositivistSpecificity < 0.5 &&
        interpretivistEvidence < 0.5 &&
        (traits["source.objective_morality"] || 0) < 0.45 &&
        (traits["source.internal_legality"] || 0) < 0.5) {
      add("nonpositivist", 0.5 + 0.2 * s.sorc, "Non-positivism is clear but no narrower public Source identity is established.", "Non-Positivist");
    }
    if (l.cons >= 0.3) add("textualist", 0.56 + 0.34 * s.cons, "Textual constraint is a dominant feature.");
    if (r.cons >= 0.3) add("purposivist", 0.54 + 0.32 * s.cons, "Purpose/open construction dominates and no narrower method is established.");
    if (l.separ >= 0.4) {
      add("formalist", 0.55 + 0.32 * s.separ, "Formal separation of powers is highly distinctive.");
    }
    const antiDiscretion = traits["form.anti_discretion"] || 0;
    const ruleFormalistCanDominate =
      Math.max(s.sorc, s.cons, s.time, s.separ) <= 0.65;
    if (ruleFormalistCanDominate && l.form >= 0.55 && antiDiscretion >= 0.55) {
      add("formalist", 0.93, "Rule-centered anti-discretion Formalism is the respondent's dominant jurisprudential commitment.");
    }
    if (r.separ >= 0.4) add("functionalist", 0.55 + 0.32 * s.separ, "Functional separation of powers is highly distinctive.");

    const pragmatic = (r.cons + r.separ + r.form) / 3;
    if (pragmatic >= 0.32) add("pragmatist", 0.57 + 0.25 * pragmatic, "Open, functional, consequence-sensitive pattern across domains.");

    if ((traits["method.modal_pluralism"] || 0) >= 0.5) {
      add("interpretive_pluralist", 0.9, "Direct methodological-pluralism diagnostic.");
    }

    if (candidates.length === 0) {
      add("interpretive_pluralist", 0.5 + 0.25 * (1 - Math.max(...Object.values(s))), "No single methodology strongly dominates.");
    }

    const calibrated=calibrateIdentityCandidates(candidates,scores,traits);
    if(!calibrated.length) calibrated.push({identity:identityFromCatalog("interpretive_pluralist"),score:0.5,basis:0,reason:"No dominant, internally consistent judicial philosophy emerges."});
    calibrated.sort((a,b)=>b.score-a.score || b.basis-a.basis || a.identity.id.localeCompare(b.identity.id));
    return {best:calibrated[0],candidates:calibrated.slice(0,5)};
  }

  function requiredTraitsSatisfied(profile, traits) {
    for (const rule of profile.requiredTraits || []) {
      const min = Number(rule.min ?? 0.5);
      if (Array.isArray(rule.all) && !rule.all.every((trait) => (traits[trait] || 0) >= min)) return false;
      if (Array.isArray(rule.any) && !rule.any.some((trait) => (traits[trait] || 0) >= min)) return false;
    }
    return true;
  }

  function axisProfileFit(profile, scores) {
    const entries = Object.entries(profile.axisSignature || {});
    if (entries.length === 0) return { fit: 0.5, shape: 0, modeledAxes: 0 };
    let fitNumerator = 0;
    let shapeNumerator = 0;
    let weightTotal = 0;
    for (const [axisId, spec] of entries) {
      const weight = Number(spec.weight ?? 1);
      const target = Number(spec.target);
      const user = axisValue(scores, axisId);
      const fit = 1 - Math.min(1, Math.abs(user - target) / 60);
      const profileExtreme = Math.abs(target - 50) / 50;
      fitNumerator += fit * weight;
      shapeNumerator += salience(scores, axisId) * profileExtreme * weight;
      weightTotal += weight;
    }
    return {
      fit: weightTotal ? fitNumerator / weightTotal : 0.5,
      shape: weightTotal ? shapeNumerator / weightTotal : 0,
      modeledAxes: entries.length
    };
  }

  function profileTraitFit(profile, traits) {
    const tags = profile.signatureTraits || [];
    if (tags.length === 0) return 0.35;
    return tags.reduce((sum, trait) => sum + (traits[trait] || 0), 0) / tags.length;
  }

  function identityLineageIds(identityId) {
    const catalog = Array.isArray(global.LAW_RESULT_IDENTITIES) ? global.LAW_RESULT_IDENTITIES : [];
    const byId = Object.fromEntries(catalog.map((item) => [item.id, item]));
    const ids = [];
    const seen = new Set();
    let cursor = byId[identityId] || null;
    while (cursor && !seen.has(cursor.id)) {
      ids.push(cursor.id);
      seen.add(cursor.id);
      cursor = cursor.parentId ? byId[cursor.parentId] || null : null;
    }
    return ids;
  }

  function championIdentityCompatibility(profile, identity) {
    const lineage = identityLineageIds(identity?.id);
    const primary = new Set(profile.identityIds || []);
    const crossCutting = new Set(profile.crossCuttingIdentityIds || []);

    if (lineage.some((id) => primary.has(id))) return "primary";
    if (lineage.some((id) => crossCutting.has(id))) return "cross-cutting";
    return "incompatible";
  }

  function scoreProfile(profile, scores, traits, identity) {
    if (profile.selectable === false || profile.tier === "lineage") return null;
    if (!requiredTraitsSatisfied(profile, traits)) return null;

    const compatibility = championIdentityCompatibility(profile, identity);
    if (compatibility === "incompatible") return null;

    for (const [axisId, minimum] of Object.entries(profile.minAxisSalience || {})) {
      if (salience(scores, axisId) < Number(minimum)) return null;
    }

    const { fit, shape, modeledAxes } = axisProfileFit(profile, scores);
    const traitFit = profileTraitFit(profile, traits);
    const anti = Math.max(0, ...(profile.antiTraits || []).map((trait) => traits[trait] || 0));
    // The noun is already resolved from the respondent's primary jurisprudential
    // fixation. Champion matching is then conditioned on that noun: a thinker
    // who directly exemplifies it receives the full compatibility bonus, while
    // a genuinely cross-cutting but less canonical fit remains eligible at a
    // smaller bonus. Everyone else is excluded rather than rescued by vector
    // proximity.
    const identityBonus = compatibility === "primary" ? 0.09 : 0.025;

    let score;
    if (modeledAxes === 0) {
      score = 0.5 + 0.34 * traitFit + identityBonus - 0.22 * anti;
    } else {
      score = 0.62 * fit + 0.18 * shape + 0.15 * traitFit + identityBonus - 0.22 * anti;
    }
    if (profile.tier === "main") score += 0.015;
    score += Number(profile.specificityBonus || 0);
    return clamp01(score);
  }

  function resolveChampions(scores, traits, identity) {
    const profiles = Array.isArray(global.LAW_PROFILES) ? global.LAW_PROFILES : [];
    const normal = [];
    const catchalls = [];

    for (const profile of profiles) {
      if (profile.tier === "catchall") {
        if (championIdentityCompatibility(profile, identity) !== "incompatible") catchalls.push(profile);
        continue;
      }
      const score = scoreProfile(profile, scores, traits, identity);
      if (score !== null) normal.push({ profile, score });
    }
    normal.sort((a, b) =>
      b.score - a.score ||
      Number(b.profile.specificityBonus || 0) - Number(a.profile.specificityBonus || 0) ||
      a.profile.id.localeCompare(b.profile.id)
    );

    const maxSalience = Math.max(...AXIS_IDS.map((axisId) => salience(scores, axisId)));
    let pool = normal;
    const topNormal = normal[0]?.score ?? 0;

    const fiss = profiles.find((profile) => profile.id === "fiss" && profile.selectable !== false);
    if (fiss && requiredTraitsSatisfied(fiss, traits)) {
      const remedialSalience = salience(scores, "remed");
      const strongestOtherAxis = Math.max(
        ...AXIS_IDS.filter((axisId) => axisId !== "remed").map((axisId) => salience(scores, axisId))
      );
      const structural = traits["remedies.structural"] || 0;
      const supervision = traits["remedies.supervision"] || 0;
      const strongJudicialRole = traits["posture.countermajoritarian"] || 0;
      const fissMayDisplace =
        remedialSalience >= 0.75 &&
        structural >= 0.65 &&
        supervision >= 0.65 &&
        strongJudicialRole >= 0.55 &&
        (topNormal < 0.72 || remedialSalience >= strongestOtherAxis + 0.12);

      if (fissMayDisplace) {
        const { fit, shape } = axisProfileFit(fiss, scores);
        const traitFit = profileTraitFit(fiss, traits);
        const anti = Math.max(0, ...(fiss.antiTraits || []).map((trait) => traits[trait] || 0));
        const fissScore = clamp01(0.58 * fit + 0.17 * shape + 0.20 * traitFit - 0.20 * anti - 0.03);
        pool = [...pool, { profile: fiss, score: fissScore }].sort((a, b) =>
          b.score - a.score ||
          Number(b.profile.specificityBonus || 0) - Number(a.profile.specificityBonus || 0) ||
          a.profile.id.localeCompare(b.profile.id)
        );
      }
    }

    for (const profile of catchalls) {
      const lowTheoryEvidence = Math.max(
        traits["method.case_by_case"] || 0,
        traits["method.anti_grand_theory"] || 0,
        traits["method.low_theory_space"] || 0
      );
      if (maxSalience <= 0.52 || topNormal < 0.61 || lowTheoryEvidence >= 0.5) {
        const base = scoreProfile(profile, scores, traits, identity) ?? 0;
        const score = clamp01(base + 0.16 * lowTheoryEvidence);
        pool = [...pool, { profile, score }].sort((a, b) =>
          b.score - a.score ||
          Number(b.profile.specificityBonus || 0) - Number(a.profile.specificityBonus || 0) ||
          a.profile.id.localeCompare(b.profile.id)
        );
      }
    }

    if (pool.length === 0) {
      const globalFallback = [];
      for (const profile of profiles) {
        if (profile.selectable === false || profile.tier === "lineage" || profile.tier === "catchall" || profile.globalSpecialist) continue;
        if (!requiredTraitsSatisfied(profile, traits)) continue;
        let salienceGateFailed = false;
        for (const [axisId, minimum] of Object.entries(profile.minAxisSalience || {})) {
          if (salience(scores, axisId) < Number(minimum)) salienceGateFailed = true;
        }
        if (salienceGateFailed) continue;

        const { fit, shape, modeledAxes } = axisProfileFit(profile, scores);
        const traitFit = profileTraitFit(profile, traits);
        const anti = Math.max(0, ...(profile.antiTraits || []).map((trait) => traits[trait] || 0));
        let score = modeledAxes === 0
          ? 0.42 + 0.28 * traitFit - 0.22 * anti
          : 0.52 * fit + 0.14 * shape + 0.16 * traitFit - 0.22 * anti;
        score += Number(profile.specificityBonus || 0);
        globalFallback.push({ profile, score: clamp01(score) });
      }
      globalFallback.sort((a, b) =>
        b.score - a.score ||
        Number(b.profile.specificityBonus || 0) - Number(a.profile.specificityBonus || 0) ||
        a.profile.id.localeCompare(b.profile.id)
      );
      pool = globalFallback;
    }

    if (pool.length === 0) return { matches: [], confidence: "withheld" };

    const first = pool[0];
    const second = pool[1];
    const margin = second ? first.score - second.score : 1;
    const confidence =
      first.score >= 0.76 && margin >= 0.055 ? "high" :
      first.score >= 0.63 ? "medium" : "low";
    return { matches: [first], confidence };
  }

  function responseValue(responses, id) {
    if (!responses || !Object.prototype.hasOwnProperty.call(responses, id) || responses[id] === null) return 0;
    const value = Number(responses[id]);
    return Number.isFinite(value) ? value : 0;
  }

  function hasAsked(diagnosticResponses, id) {
    return diagnosticResponses && Object.prototype.hasOwnProperty.call(diagnosticResponses, id);
  }

  function detectMechanicalPattern(responses, meta = {}) {
    const values = Object.values(responses || {});
    const answered = values.filter((value) => value !== null && Number.isFinite(Number(value))).map(Number);
    const skipped = values.filter((value) => value === null).length;
    if (answered.length === 0) return "no-answers";

    const coreElapsedMs = Number(meta.coreElapsedMs);
    const elapsedMs = Number(meta.elapsedMs);
    const timingMs = Number.isFinite(coreElapsedMs) && coreElapsedMs > 0 ? coreElapsedMs : elapsedMs;
    if (answered.length >= 80 && Number.isFinite(timingMs) && timingMs > 0 && timingMs < 90000) {
      return "implausibly-fast";
    }

    const counts = new Map();
    for (const value of answered) counts.set(value, (counts.get(value) || 0) + 1);
    const mostCommon = Math.max(...counts.values());
    if (answered.length >= 80 && mostCommon / answered.length >= 0.9) return "straight-line";
    if (answered.length >= 80 && answered.filter((value) => value === 0).length / answered.length >= 0.85) return "mostly-neutral";
    if (values.length >= 80 && skipped / values.length >= 0.5) return "excessive-skips";
    return null;
  }

  function detectBroadIncoherence(responses) {
    const strongAgree = (id) => responseValue(responses, id) >= 2;
    const sourceContradiction = strongAgree("S7") && strongAgree("S8");
    const formContradiction =
      (strongAgree("F1") && strongAgree("F5")) ||
      (strongAgree("F3") && strongAgree("F5"));
    return sourceContradiction && formContradiction;
  }

  function finalizeResult(result, scores, traits, traitEvidence) {
    if (global.LAW_RESULT_CONTENT?.assemble) {
      result.resultTitle = global.LAW_RESULT_CONTENT.assemble(result, scores, traits, traitEvidence);
    }
    return result;
  }

  function nextDiagnostic(scores, responses, diagnosticResponses = {}) {
    const askedCount = Object.keys(diagnosticResponses).length;
    if (askedCount >= MAX_DIAGNOSTICS) return null;
    const byId = Object.fromEntries(diagnosticBank().map((item) => [item.id, item]));

    if (!hasAsked(diagnosticResponses, "D-RLS1")) return byId["D-RLS1"];
    if (!hasAsked(diagnosticResponses, "D-QC1")) return byId["D-QC1"];
    if (Number(diagnosticResponses["D-QC1"]) !== -2) return null;

    const maxSalienceEarly = Math.max(...AXIS_IDS.map((id) => salience(scores, id)));

    if (Number(diagnosticResponses["D-RLS1"]) > 0) {
      if (!hasAsked(diagnosticResponses, "D-RLS2")) return byId["D-RLS2"];
      if (!hasAsked(diagnosticResponses, "D-RLS3")) return byId["D-RLS3"];
    }

    const traits = buildTraits(scores, responses, diagnosticResponses);
    const priorities = [];
    const offer = (id, priority) => {
      if (byId[id] && !hasAsked(diagnosticResponses, id)) priorities.push({ id, priority });
    };

    const realismConfirmed =
      (traits["realism.underdetermination"] || 0) >= 0.45 &&
      (traits["realism.extra_doctrinal"] || 0) >= 0.45 &&
      ((traits["realism.empirical_prediction"] || 0) >= 0.35 ||
       (traits["realism.law_in_action"] || 0) >= 0.5);
    if (realismConfirmed) {
      if (!hasAsked(diagnosticResponses, "D-RLS4")) offer("D-RLS4", 99);
      else if (!hasAsked(diagnosticResponses, "D-RLS5")) offer("D-RLS5", 98);
    }

    if (!realismConfirmed &&
        hasAsked(diagnosticResponses, "D-MAJ1") &&
        Number(diagnosticResponses["D-MAJ1"]) > 0 &&
        !hasAsked(diagnosticResponses, "D-MAJ2")) {
      return byId["D-MAJ2"];
    }
    if (!realismConfirmed &&
        hasAsked(diagnosticResponses, "D-ELY1") &&
        Number(diagnosticResponses["D-ELY1"]) > 0 &&
        !hasAsked(diagnosticResponses, "D-RESP1")) {
      return byId["D-RESP1"];
    }

    const time = axisValue(scores, "time");
    const source = axisValue(scores, "sorc");
    const posture = axisValue(scores, "post");
    const constraint = axisValue(scores, "cons");
    const form = axisValue(scores, "form");
    const precedent = axisValue(scores, "prec");
    const remedies = axisValue(scores, "remed");
    const maxSalience = maxSalienceEarly;

    if (time >= 60) {
      const publicMeaning = traits["time.public_meaning"] || 0;
      const originalIntent = traits["time.original_intent"] || 0;
      const construction = traits["time.construction_zone"] || 0;
      const originalMethods = traits["time.original_methods"] || 0;
      const intentAsMeaning = traits["time.intent_as_meaning"] || 0;
      const intratextual = traits["time.intratextualism"] || 0;

      // First resolve the public noun when the core did not already do it.
      if (Math.max(publicMeaning, originalIntent) < 0.5) offer("D-ORI1", 96);

      // Construction is the only substantive public Originalist modifier ("New").
      // Ask it once a noun is known or nearly known, because it also identifies
      // Whittington on the OI side and routes the New-OPM champion cluster.
      if ((Math.max(publicMeaning, originalIntent) >= 0.4 || hasAsked(diagnosticResponses, "D-ORI1")) &&
          !hasAsked(diagnosticResponses, "D-ORI3")) {
        offer("D-ORI3", 90);
      }

      const provisional = resolveIdentity(scores, traits).best.identity.id;
      const looksOI = provisional === "original_intent_originalist" || originalIntent >= 0.45;
      const looksOPM = provisional === "public_meaning_originalist" || publicMeaning >= 0.45;

      // If OI + construction is affirmed, Whittington is already the distinctive
      // champion; otherwise distinguish modern semantic intentionalism from the
      // first-generation Bork/Berger restraint package.
      if (looksOI && hasAsked(diagnosticResponses, "D-ORI3") && construction < 0.5 && intentAsMeaning < 0.5) {
        offer("D-ORI4", 82);
      }

      // Original Methods is champion-level evidence, not a noun.  Ask only on
      // the OPM side, and only when it can materially change the champion.
      if (looksOPM && originalMethods < 0.5 && !hasAsked(diagnosticResponses, "D-ORI2")) {
        offer("D-ORI2", 74);
      }

      // Amar-style intratextualism is a specialist tie-breaker.  It is lower
      // priority than noun, construction, and Original Methods questions.
      if (looksOPM && intratextual < 0.5 && constraint >= 55 &&
          hasAsked(diagnosticResponses, "D-ORI2") && !hasAsked(diagnosticResponses, "D-ORI5")) {
        offer("D-ORI5", 54);
      }
    }

    // Non-originalist constitutional-time refinement.  These questions never
    // create a new public noun: they distinguish substantive varieties of an
    // already strongly Living profile.  Common-law-development respondents are
    // routed instead to Strauss/Harlan/Cooke/Waluchow.
    const commonLawCore = traits["time.common_law_development"] || 0;
    const democraticLiving = traits["time.democratic_constitutionalism"] || 0;
    const transformativeLiving = traits["time.transformative_constitutionalism"] || 0;
    const provisionalTimeIdentity = resolveIdentity(scores, traits).best.identity.id;
    const strongLiving = time <= 32;
    const pureLivingBranch =
      strongLiving && provisionalTimeIdentity === "living_constitutionalist" && posture <= 45;
    const transformativeShape =
      pureLivingBranch && constraint <= 45 && remedies <= 35 && posture <= 35;

    if (pureLivingBranch && Math.max(democraticLiving, transformativeLiving) < 0.5) {
      if (transformativeShape) {
        if (!hasAsked(diagnosticResponses, "D-LIV2")) offer("D-LIV2", 99);
        else if (Number(diagnosticResponses["D-LIV2"]) <= 0 &&
                 !hasAsked(diagnosticResponses, "D-LIV1")) offer("D-LIV1", 98);
      } else {
        if (!hasAsked(diagnosticResponses, "D-LIV1")) offer("D-LIV1", 98);
        else if (Number(diagnosticResponses["D-LIV1"]) <= 0 &&
                 constraint <= 45 && remedies <= 45 &&
                 !hasAsked(diagnosticResponses, "D-LIV2")) offer("D-LIV2", 97);
      }
    }

    // When the Time axis already puts the respondent squarely in the Originalist
    // refinement zone, do not let exploratory Source diagnostics consume the
    // seven-question budget. Originalist source-sensitive champions use the core
    // Source evidence instead.
    if (time < 60) {
      const extremeSourcePlausible = (traits["source.extreme_injustice"] || 0) >= 0.35;
      if (extremeSourcePlausible &&
          (traits["source.objective_morality"] || 0) < 0.5 &&
          !hasAsked(diagnosticResponses, "D-NP6")) {
        offer("D-NP6", 94);
      }
  
      if (source >= 65) {
        const incorporated = traits["source.morality_incorporated"] || 0;
        const exclusive = traits["source.source_thesis"] || 0;
        const normative = traits["source.normative_positivism"] || 0;
  
        if (Math.max(incorporated, exclusive) < 0.5) offer("D-POS1", 90);
        if (normative < 0.5 &&
            (hasAsked(diagnosticResponses, "D-POS1") || source >= 78)) {
          offer("D-POS2", 70);
        }
      }
  
      if (source <= 38) {
        const naturalCorePlausible = (traits["source.objective_morality"] || 0) >= 0.25;
        const interpretivistCorePlausible = (traits["source.principles_are_law"] || 0) >= 0.25 ||
          (traits["source.fit_and_justification"] || 0) >= 0.25;
        const naturalRejected = hasAsked(diagnosticResponses, "D-NP1") && Number(diagnosticResponses["D-NP1"]) <= 0;
        const interpretivistRejected = hasAsked(diagnosticResponses, "D-NP2") && Number(diagnosticResponses["D-NP2"]) <= 0;
        const naturalPlausible = naturalCorePlausible && !naturalRejected;
        const interpretivistPlausible = interpretivistCorePlausible && !interpretivistRejected;
        const extremePlausible = (traits["source.extreme_injustice"] || 0) >= 0.35;
        const impact = traits["source.moral_impact"] || 0;
        const practice = traits["source.moral_practice"] || 0;
        const internalLegality = traits["source.internal_legality"] || 0;
  
        // Core S2 can make the threshold theory visible immediately.
        if (extremePlausible && (traits["source.objective_morality"] || 0) < 0.5) offer("D-NP6", 94);
  
        if (naturalPlausible && (traits["source.positive_law_settlement"] || 0) < 0.5) {
          offer("D-NP1", 92);
        }
        if (interpretivistPlausible && (traits["source.fit_and_justification"] || 0) < 0.5) {
          offer("D-NP2", 90);
        }
  
        const naturalEstablished =
          (traits["source.objective_morality"] || 0) >= 0.45 &&
          (traits["source.positive_law_settlement"] || 0) >= 0.5;
        const interpretivistEstablished =
          (traits["source.fit_and_justification"] || 0) >= 0.5 &&
          (traits["source.principles_are_law"] || 0) >= 0.35;
        const naturalCleared = !naturalCorePlausible || naturalRejected;
        const interpretivistCleared = !interpretivistCorePlausible || interpretivistRejected;
  
        // Once a broad Source noun is affirmatively established, do not spend
        // diagnostics searching for narrower alternative theories.
        if (!naturalEstablished && !interpretivistEstablished &&
            naturalCleared && interpretivistCleared && impact < 0.5) offer("D-NP4", 86);
        if (!naturalEstablished && !interpretivistEstablished &&
            naturalCleared && interpretivistCleared &&
            hasAsked(diagnosticResponses, "D-NP4") && impact < 0.5 && practice < 0.5) {
          offer("D-NP5", 82);
        }
        const oneSystemEstablished = impact >= 0.5 || practice >= 0.5;
        if (!naturalEstablished && !interpretivistEstablished && !oneSystemEstablished &&
            naturalCleared && interpretivistCleared &&
            hasAsked(diagnosticResponses, "D-NP4") &&
            hasAsked(diagnosticResponses, "D-NP5") &&
            internalLegality < 0.5) {
          offer("D-NP3", 76);
        }
  
        // If the core supplied no clue at all, use remaining capacity to test the
        // two broad nonpositivist nouns before settling for the generic fallback.
        if (!naturalEstablished && !interpretivistEstablished &&
            !naturalCorePlausible && !interpretivistCorePlausible &&
            hasAsked(diagnosticResponses, "D-NP3")) {
          if (!hasAsked(diagnosticResponses, "D-NP1")) offer("D-NP1", 58);
          if (!hasAsked(diagnosticResponses, "D-NP2")) offer("D-NP2", 56);
        }
      }
  
      }

    const dialogicPosture = traits["posture.dialogic"] || 0;
    if (posture >= 62 && dialogicPosture < 0.5) {
      offer("D-MAJ1", 82);
      if ((traits["posture.democratic_legitimacy"] || 0) >= 0.35 || (traits["posture.clear_error"] || 0) >= 0.35) {
        offer("D-WAL1", 78);
      }
    } else if (posture >= 42 && posture <= 68 && dialogicPosture < 0.5) {
      offer("D-ELY1", 54);
    }

    const provisionalMethodIdentity = resolveIdentity(scores, traits).best.identity.id;

    if (provisionalMethodIdentity === "textualist" && constraint >= 62) {
      if (!hasAsked(diagnosticResponses, "D-TXT1")) offer("D-TXT1", 74);
      const blackPlausible =
        (traits["posture.rights_trumps"] || 0) >= 0.4 &&
        (traits["form.anti_discretion"] || 0) >= 0.45;
      if (blackPlausible && !hasAsked(diagnosticResponses, "D-TXT2")) {
        offer("D-TXT2", 83);
      }
    }

    if (constraint <= 42) {
      const intent = traits["constraint.intent"] || 0;
      const institutional = traits["method.institutional_competence"] || 0;
      const social = traits["method.social_interests"] || 0;

      // Resolve actual intent versus objective purpose before champion-level
      // refinements when Intentionalism is still untested.
      if (intent < 0.5 && !hasAsked(diagnosticResponses, "D-INT1")) offer("D-INT1", 86);
      if (intent >= 0.5 && !hasAsked(diagnosticResponses, "D-INT2")) offer("D-INT2", 91);

      if ((traits["method.pragmatic_priority"] || 0) < 0.5 &&
          !hasAsked(diagnosticResponses, "D-PRAG1")) {
        offer("D-PRAG1", 82);
      }

      if ((precedent >= 52 || posture >= 45 || institutional >= 0.25) &&
          institutional < 0.5 && !hasAsked(diagnosticResponses, "D-LP1")) {
        offer("D-LP1", 80);
      }
      if (institutional >= 0.5 && !hasAsked(diagnosticResponses, "D-LP2")) {
        offer("D-LP2", 88);
      }

      if (social < 0.5 && !hasAsked(diagnosticResponses, "D-SOC1")) {
        // Strong balancing/open-construction profiles need the Sociological
        // router early enough that a confirmed social-interest method can still
        // receive one champion-level refinement inside the seven-question cap.
        offer("D-SOC1", form <= 40 ? 90 : form <= 50 ? 77 : 64);
      }
    }

    // Champion-only refinements: these are deliberately gated behind a
    // profile that is already plausible from the core bank, so they cannot
    // consume scarce adaptive slots merely to search for exotic names.
    const freeScientific = traits["method.free_scientific_research"] || 0;
    const socialMethod = traits["method.social_interests"] || 0;
    const remediesScore = remedies;
    if (socialMethod >= 0.5 && freeScientific < 0.5 && remediesScore > 25) {
      offer("D-GENY1", 95);
    }

    const commonLawDevelopment = traits["time.common_law_development"] || 0;
    if (provisionalMethodIdentity === "common_law_constitutionalist" &&
        precedent >= 70 && posture >= 58 &&
        (traits["time.ordered_liberty_tradition"] || 0) < 0.5) {
      offer("D-HAR1", 89);
    }

    if (commonLawDevelopment >= 0.4 &&
        axisValue(scores, "time") <= 35 && precedent >= 65 &&
        source <= 48 && posture <= 42 &&
        (traits["source.common_law_fundamental_rights"] || 0) < 0.5) {
      offer("D-CLC1", 97);
    }

    const pilCompatible = new Set(["sociological_jurist", "living_constitutionalist", "purposivist", "legal_constitutionalist"]);
    if (pilCompatible.has(provisionalMethodIdentity) &&
        remediesScore <= 25 && posture <= 32 && constraint <= 45 &&
        (traits["remedies.public_interest_litigation"] || 0) < 0.5) {
      offer("D-PIL1", 96);
    }

    const proportionalityPlausible =
      form <= 25 &&
      (source <= 35 || (constraint <= 25 && posture <= 35));
    if (proportionalityPlausible && (traits["form.proportionality"] || 0) < 0.5) {
      offer("D-PROP1", 98);
    }

    if (source <= 35 && constraint <= 40 && posture >= 55) offer("D-CGC1", 96);

    if (maxSalience <= 0.42 || provisionalMethodIdentity === "interpretive_pluralist") {
      const pluralism = traits["method.modal_pluralism"] || 0;
      if (pluralism < 0.5) offer("D-PLU1", 78);
      if (pluralism >= 0.5 && !hasAsked(diagnosticResponses, "D-PLU2")) {
        offer("D-PLU2", 87);
      }
      if (hasAsked(diagnosticResponses, "D-PLU1") &&
          Number(diagnosticResponses["D-PLU1"]) <= 0) {
        offer("D-OCO1", 76);
      }
    }

    priorities.sort((a, b) => b.priority - a.priority);
    return priorities.length ? byId[priorities[0].id] : null;
  }

  function classify(scored, responses = {}, diagnosticResponses = {}, meta = {}) {
    const scores = Object.fromEntries(AXIS_IDS.map((id) => [id, axisValue(scored, id)]));
    const traits = buildTraits(scores, responses, diagnosticResponses);
    const traitEvidence = buildTraitEvidence(responses, diagnosticResponses);

    const mechanical = detectMechanicalPattern(responses, meta);
    const qualityCheckFailed =
      hasAsked(diagnosticResponses, "D-QC1") &&
      Number(diagnosticResponses["D-QC1"]) !== -2;

    if (mechanical || qualityCheckFailed) {
      return finalizeResult({
        identity: identityFromCatalog("unusable_response", "Unclear response pattern"),
        identityScore: 1,
        identityReason: mechanical
          ? "The response pattern is too mechanical or fast to interpret reliably, so LAWvalues is withholding a jurisprudential identity and thinker match."
          : "The result-refinement response check was missed, so LAWvalues is withholding a jurisprudential identity and thinker match.",
        identityAlternatives: [],
        champions: [],
        championConfidence: "withheld",
        traits,
        diagnosticCount: Object.keys(diagnosticResponses || {}).length,
        responseQuality: mechanical || "attention-check-failed",
        calibration: "theory-derived"
      }, scores, traits, traitEvidence);
    }

    if (detectBroadIncoherence(responses)) {
      return finalizeResult({
        identity: identityFromCatalog("incoherent_response", "Inconsistent response pattern"),
        identityScore: 1,
        identityReason: "Direct contradictions appeared across more than one jurisprudential domain, so LAWvalues is not forcing those answers into a coherent school or thinker.",
        identityAlternatives: [],
        champions: [],
        championConfidence: "withheld",
        traits,
        diagnosticCount: Object.keys(diagnosticResponses || {}).length,
        responseQuality: "broad-incoherence",
        calibration: "theory-derived"
      }, scores, traits, traitEvidence);
    }

    const identityResolution = resolveIdentity(scores, traits);
    const championResolution = resolveChampions(scores, traits, identityResolution.best.identity);
    return finalizeResult({
      identity: identityResolution.best.identity,
      identityScore: identityResolution.best.score,
      primaryStrength: identityResolution.best.basis,
      identityReason: identityResolution.best.reason,
      identityAlternatives: identityResolution.candidates.slice(1, 4),
      champions: championResolution.matches.map(({ profile, score }) => ({
        id: profile.id,
        name: profile.name,
        tier: profile.tier,
        score,
        description: profile.description,
        related: profile.related || []
      })),
      championConfidence: championResolution.confidence,
      traits,
      diagnosticCount: Object.keys(diagnosticResponses || {}).length,
      calibration: "theory-derived"
    }, scores, traits, traitEvidence);
  }

  global.LAW_PROFILE_EXTRA_DIAGNOSTICS = EXTRA_DIAGNOSTICS;
  global.LAW_CLASSIFIER = Object.freeze({
    MAX_DIAGNOSTICS,
    AXIS_IDS,
    diagnosticBank,
    buildTraits,
    buildTraitEvidence,
    detectMechanicalPattern,
    detectBroadIncoherence,
    resolveIdentity,
    championIdentityCompatibility,
    resolveChampions,
    nextDiagnostic,
    classify
  });
})(globalThis);
