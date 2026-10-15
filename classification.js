/* Sparse jurisprudential matching and adaptive diagnostic router. */
(function attachClassification(global) {
  "use strict";

  const AXIS_IDS = ["sorc", "cons", "time", "prec", "remed", "post", "separ", "form"];
  const IDENTITY_CATALOG = new Map((global.LAW_RESULT_IDENTITIES || []).map(item => [item.id,item]));
  const IDENTITY_LINEAGES = new Map();
  const MAX_TOTAL_QUESTIONS = 100;
  const CORE_QUESTION_COUNT = Array.isArray(global.LAW_QUESTIONS) ? global.LAW_QUESTIONS.length : 88;
  const MAX_DIAGNOSTICS = Math.max(0, MAX_TOTAL_QUESTIONS - CORE_QUESTION_COUNT);

  const EXTRA_DIAGNOSTICS = Object.freeze([
    {
      id: "D-QC2",
      family: "quality",
      priority: "high",
      unlock: "Only unusually noisy, low-salience profiles with contradictory extreme answers across several axes need a second explicit response check.",
      prompt: "Response check: please select Slightly Agree for this item.",
      agreeTraits: [],
      disagreeTraits: [],
      nextOnAgree: [],
      nextOnDisagree: [],
      relatedIdentityIds: ["interpretive_pluralist"],
      qualityCheckExpected: 1,
      note: "Does not change an axis, noun, or champion. Disagreement between many strong core responses prompts an additional response-quality confirmation rather than a speculative personality match."
    },
    {
      id: "D-QC1",
      family: "quality",
      priority: "high",
      unlock: "Asked before substantive adaptive routing.",
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
      agreeTraits: ["method.case_by_case", "method.anti_grand_theory", "method.narrow_shallow", "remedies.incremental"],
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
    "source.objective_morality": [["S10", 1, 1], ["S11", 1, 1]],
    "source.independent_moral_validity": [["S10", 1, 1], ["S11", 1, 1]],
    "source.independent_moral_validity_rejected": [["S10", -1, 1], ["S11", -1, 1]],
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
    "precedent.reliance": [["P4", 1, 0.8], ["P12", 1, 1]],
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

  // These probes ask about characteristic priority, not logical incompatibility.
  // Neutral and skipped answers leave the comparison unresolved.
  const PRIORITY_CONTEXTS = Object.freeze({
    source: "deciding what counts as law in the first place",
    time: "deciding how constitutional meaning can change over time",
    method: "deciding how judges should read laws",
    posture: "deciding when courts should overrule elected officials",
    structure: "deciding which powers belong to each branch of government",
    form: "choosing between firm rules and case-by-case judgment",
    realism: "explaining what actually drives judges’ decisions",
    common_good: "directing public power toward the common good of the political community"
  });
  const PRIORITY_DIAGNOSTICS = Object.entries(PRIORITY_CONTEXTS).flatMap(([a, aText], i, entries) =>
    entries.slice(i + 1).map(([b, bText]) => ({
      id: `D-PRI-${a}-${b}`, family: "priority", priority: "high",
      evidenceRoles: ["relative-priority"], priorityComparison: [a, b],
      prompt: `Both can matter. In what most defines your approach to law, ${aText} is more central than ${bText}. Agree favors the first; disagree favors the second; neither means neither consistently defines you more.`,
      agreeTraits: [`priority.${a}.over.${b}`], disagreeTraits: [`priority.${b}.over.${a}`],
      nextOnAgree: [], nextOnDisagree: [], relatedIdentityIds: (global.LAW_RESULT_IDENTITIES || []).filter(item => [a,b].includes(priorityDomain(item))).map(item => item.id),
      note: "Comparative self-reported importance only; does not change any axis or establish a substantive doctrine."
    })));

  // Historical catalog families group title inventories; they are not always
  // the subject of a meaningful defining-priority question.
  function priorityDomain(identity) {
    if (identity.id === "legal_realist") return "realism";
    if (identity.id === "common_good_constitutionalist") return "common_good";
    return identity.family;
  }

  function diagnosticBank() {
    return [
      ...(Array.isArray(global.LAW_DIAGNOSTIC_QUESTIONS) ? global.LAW_DIAGNOSTIC_QUESTIONS : []),
      ...EXTRA_DIAGNOSTICS,
      ...PRIORITY_DIAGNOSTICS
    ].map(item => item.evidenceRoles ? item : {...item,
      evidenceRoles: item.family === "quality" ? ["quality-check"] : ["compatibility", "champion-discriminator"]});
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
    if(Number(diagnosticResponses?.["D-NP6"])<=-2){
      // The direct diagnostic vetoes a conflicting single-example inference.
      traits["source.extreme_injustice"]=0;
      setMax(traits,"source.extreme_injustice_rejected",Math.abs(Number(diagnosticResponses["D-NP6"]))/3);
    }
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
    const found = IDENTITY_CATALOG.get(id);
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
        if(id==="minimalist")basis=Math.max(left.remed,(traits["posture.passive_virtues"]||0)*0.38);
        else if(["political_constitutionalist","thayerian","popular_constitutionalist","departmentalist"].includes(id))basis=left.post;
        else basis=Math.max(sal.post,(traits["posture.process_reinforcement"]||0)*0.45);
      }else if(family==="method"){
        focus=["cons"];
        if(id==="textualist")basis=left.cons;
        else if(id==="interpretive_pluralist"){focus=[];basis=Math.max(0.18,(traits["method.modal_pluralism"]||0)*0.45);}
        else basis=right.cons;
      }else if(id==="legal_realist"){basis=Math.max(0.25,(traits["realism.empirical_prediction"]||0)*0.55);}
      // Compatibility and subtype confidence are established above. Neither
      // gives a family a larger intercept in the defining-priority comparison.
      const priorityFamily = priorityDomain(candidate.identity);
      const comparisons = Object.keys(PRIORITY_CONTEXTS).filter(other => other !== priorityFamily);
      const priorityEvidence = comparisons.reduce((sum, other) => sum +
        (traits[`priority.${priorityFamily}.over.${other}`] || 0) -
        (traits[`priority.${other}.over.${priorityFamily}`] || 0), 0);
      const score = 0.56 + 0.34 * basis + 0.22 * priorityEvidence;
      output.push({...candidate, score:clamp01(score), basis, focus,
        compatibilityScore:candidate.score, priorityFamily, priorityEvidence});
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
        ((traits["source.positive_law_settlement"] || 0) >= 0.35 ||
         (traits["source.strong_natural_law"] || 0) >= 0.5) &&
        interpretivistEvidence < 0.65) {
      add(
        "natural_lawyer",
        0.83 + 0.11 * s.sorc,
        (traits["source.strong_natural_law"] || 0) >= 0.5
          ? "Objective morality is treated as bearing on legal validity itself."
          : "Objective morality plus a genuine settlement and coordination role for positive law."
      );
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

    const precedentMediatedHistoricism = traits["time.precedent_mediated_historicism"] || 0;
    const independentOriginalistAuthority = traits["time.originalism_independent_authority"] || 0;
    const originalismAffirmativelyRejected =
      precedentMediatedHistoricism >= 0.5 && independentOriginalistAuthority < 0.5;

    if (!originalismAffirmativelyRejected &&
        l.time >= 0.2 && (traits["time.original_intent"] || 0) >= 0.5) {
      add("original_intent_originalist", 0.88, "Affirmative original-intent evidence.");
    }
    if (!originalismAffirmativelyRejected &&
        l.time >= 0.2 && (traits["time.public_meaning"] || 0) >= 0.45) {
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
      add("common_good_constitutionalist", 0.99, "Direct common-good/classical-law diagnostic.");
    }

    if ((traits["method.institutional_competence"] || 0) >= 0.45) {
      add("legal_process_theorist", 0.9, "Institutional competence, settlement, and reasoned elaboration establish Legal Process as the primary method.");
    }
    if ((traits["constraint.intent"] || 0) >= 0.5) {
      add("intentionalist", 0.89, "Legislative/enactor intention is the primary interpretive target.");
    }
    if ((traits["source.institutional_legal_pluralism"] || 0) >= 0.5) {
      add("sociological_jurist", 0.97, "Institutional legal pluralism establishes a sociological/institutional account in which organized nonstate bodies can constitute genuine legal orders.");
    } else if ((traits["method.social_interests"] || 0) >= 0.5 &&
        (traits["method.law_in_action"] || 0) >= 0.5) {
      add("sociological_jurist", 0.92, "Law-in-action and explicit social-interest reasoning establish Sociological Jurisprudence.");
    }
    if ((traits["method.pragmatic_priority"] || 0) >= 0.5) {
      add("pragmatist", 0.91, "Consequences and practical workability are independent adjudicative reasons rather than merely evidence of purpose.");
    }
    if ((traits["form.proportionality"] || 0) >= 0.5) {
      add("proportionalist", 0.99, "Affirmative structured-proportionality evidence establishes Proportionalism rather than generic balancing.");
    }

    // Eligibility must not disappear because an unrelated subtype was revealed.
    const authorityCanDominate = true;
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

    if (authorityCanDominate && l.post >= 0.2 &&
        antiJudicialSupremacy >= 0.5 && popularAuthority >= 0.5) {
      add("popular_constitutionalist", 0.99, "Affirmative popular constitutional authority beyond branch-specific departmentalism.");
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
    if (authorityCanDominate && l.post >= 0.2 &&
        reasonableDisagreement >= 0.5 &&
        (traits["posture.democratic_legitimacy"] || 0) >= 0.5) {
      add("political_constitutionalist", 0.98, "Representative democratic finality under functioning institutions and reasonable rights disagreement.");
    }
    if (authorityCanDominate && l.post >= 0.2 && clearError >= 0.5 && reasonableDisagreement < 0.5) {
      add("thayerian", 0.96, "Courts retain review but invalidate only constitutional judgments outside the range of reasonableness.");
    }
    if(authorityCanDominate && passiveVirtues>=0.5 &&
       (narrowShallow>=0.33 || incremental>=0.3)) {
      add("minimalist", 0.98, "Strategic avoidance and passive virtues establish a distinctive form of Judicial Minimalism.");
    } else if (authorityCanDominate && narrowShallow >= 0.5 && incremental >= 0.45) {
      add("minimalist", 0.94, "Narrow, shallow, incremental adjudication establishes Judicial Minimalism.");
    }

    if (!originalismAffirmativelyRejected && l.time >= 0.3)
      add("originalist", 0.56 + 0.34 * s.time, "Historical fixation is a dominant feature.");
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
        0.56 + 0.34 * s.sorc,
        positivistSpecificity >= 0.5
          ? "Positive-law grounding plus a distinctive Positivist branch."
          : "Positive legal sources dominate the Source axis."
      );
    }
    if (l.cons >= 0.3) add("textualist", 0.56 + 0.34 * s.cons, "Textual constraint is a dominant feature.");
    if (r.cons >= 0.3) add("purposivist", 0.54 + 0.32 * s.cons, "Purpose/open construction dominates and no narrower method is established.");
    if (l.separ >= 0.4) {
      add("formalist", 0.55 + 0.32 * s.separ, "Formal separation of powers is highly distinctive.");
    }
    const antiDiscretion = traits["form.anti_discretion"] || 0;
    const ruleFormalistCanDominate = true;
    if (ruleFormalistCanDominate && l.form >= 0.43 && antiDiscretion >= 0.65) {
      add("formalist", 0.93, "Rule-centered anti-discretion Formalism is the respondent's dominant jurisprudential commitment.");
    }
    if (r.separ >= 0.55) add("functionalist", 0.55 + 0.32 * s.separ, "Functional separation of powers is highly distinctive.");

    const pragmatic = (r.cons + r.separ + r.form) / 3;
    if (pragmatic >= 0.32) add("pragmatist", 0.57 + 0.25 * pragmatic, "Open, functional, consequence-sensitive pattern across domains.");

    if ((traits["method.modal_pluralism"] || 0) >= 0.5) {
      add("interpretive_pluralist", 0.9, "Direct methodological-pluralism diagnostic.");
    }

    if (candidates.length === 0) {
      add("mixed_jurisprudence", 0.5, "No affirmative public jurisprudential school is established.");
    }

    const calibrated=calibrateIdentityCandidates(candidates,scores,traits);
    if(!calibrated.length) calibrated.push({identity:identityFromCatalog("mixed_jurisprudence"),score:0.5,basis:0,reason:"No dominant, internally consistent judicial philosophy emerges."});
    // Select the family on a common support scale, then resolve its doctrinal
    // form using compatibility evidence. A CLC subtype must not lose to generic
    // Living merely because its support spans two axes rather than one.
    for (const candidate of calibrated) {
      const familyBasis = Math.max(...calibrated.filter(other => other.priorityFamily === candidate.priorityFamily).map(other => other.basis));
      candidate.familyBasis = familyBasis;
      candidate.score = clamp01(0.56 + 0.34 * familyBasis + 0.22 * (candidate.priorityEvidence || 0));
    }
    const families = [...new Set(calibrated.map(candidate => candidate.priorityFamily))];
    const preferredOver = (a,b) => (traits[`priority.${a}.over.${b}`] || 0) >= 0.5;
    const visiting = new Set(), visited = new Set();
    const hasCycle = family => {
      if (visiting.has(family)) return true;
      if (visited.has(family)) return false;
      visiting.add(family);
      if (families.some(other => other !== family && preferredOver(family,other) && hasCycle(other))) return true;
      visiting.delete(family); visited.add(family); return false;
    };
    const priorityConflict = families.some(hasCycle);
    for (const candidate of calibrated) candidate.priorityDefeated = !priorityConflict &&
      families.some(other => other !== candidate.priorityFamily && preferredOver(other,candidate.priorityFamily));
    // A clear direct preference cannot be canceled merely by beating a third
    // family. A cycle instead remains unresolved and falls back deterministically.
    calibrated.sort((a,b)=>Number(a.priorityDefeated)-Number(b.priorityDefeated) ||
      b.score-a.score || b.compatibilityScore-a.compatibilityScore || b.basis-a.basis || a.identity.id.localeCompare(b.identity.id));
    const distinct = calibrated.filter(candidate => !calibrated.some(other =>
      other !== candidate && other.score >= candidate.score &&
      identityLineageIds(other.identity.id).slice(1).includes(candidate.identity.id)));
    return {best:distinct[0],candidates:distinct,priorityConflict};
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

  function profileEvidenceCoverage(profile, scores, traits) {
    const modeled = new Set(Object.keys(profile.axisSignature || {}));
    const important = AXIS_IDS.filter(id => salience(scores, id) >= 0.35);
    const total = important.reduce((sum, id) => sum + salience(scores,id), 0);
    const covered = important.filter(id => modeled.has(id));
    const coverage = total ? covered.reduce((sum,id) => sum + salience(scores,id),0) / total : 0;
    const knownDisagreements = Object.entries(profile.axisSignature || {}).filter(([id,spec]) =>
      salience(scores,id) >= 0.35 && Math.abs(axisValue(scores,id)-Number(spec.target)) >= 40
    ).map(([id]) => id);
    const traitDisagreements = (profile.antiTraits || []).filter(trait => (traits[trait] || 0) >= 0.5);
    return { coverage, modeledAxes: [...modeled], supportedAxes: covered,
      unknownAxes: important.filter(id => !modeled.has(id)), knownDisagreements, traitDisagreements,
      supportedTraits: (profile.signatureTraits || []).filter(trait => (traits[trait] || 0) >= 0.5),
      scope: modeled.size ? "modeled-profile" : "specific-affinity" };
  }

  function profileUnexplainedSalience(profile, scores) {
    // This is uncertainty discounting, never an assertion of disagreement.
    const evidence = profileEvidenceCoverage(profile, scores, {});
    return 0.22 * (1 - evidence.coverage);
  }

  function crossCuttingRequirementsSatisfied(profile, identity, traits) {
    const rules = profile.crossCuttingRequirements?.[identity?.id];
    if (!Array.isArray(rules) || rules.length === 0) return false;
    for (const rule of rules) {
      const min = Number(rule.min ?? 0.5);
      if (Array.isArray(rule.all) && !rule.all.every((trait) => (traits[trait] || 0) >= min)) return false;
      if (Array.isArray(rule.any) && !rule.any.some((trait) => (traits[trait] || 0) >= min)) return false;
    }
    return true;
  }

  function identityLineageIds(identityId) {
    if (IDENTITY_LINEAGES.has(identityId)) return IDENTITY_LINEAGES.get(identityId);
    const byId = Object.fromEntries(IDENTITY_CATALOG);
    const ids = [];
    const seen = new Set();
    let cursor = byId[identityId] || null;
    while (cursor && !seen.has(cursor.id)) {
      ids.push(cursor.id);
      seen.add(cursor.id);
      cursor = cursor.parentId ? byId[cursor.parentId] || null : null;
    }
    IDENTITY_LINEAGES.set(identityId,Object.freeze(ids));
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
    if (compatibility === "cross-cutting" &&
        !crossCuttingRequirementsSatisfied(profile, identity, traits)) return null;

    for (const [axisId, minimum] of Object.entries(profile.minAxisSalience || {})) {
      if (salience(scores, axisId) < Number(minimum)) return null;
    }

    const { fit, shape, modeledAxes } = axisProfileFit(profile, scores);
    const traitFit = profileTraitFit(profile, traits);
    const anti = Math.max(0, ...(profile.antiTraits || []).map((trait) => traits[trait] || 0));
    const unexplained = profileUnexplainedSalience(profile, scores);
    // The noun is already resolved from the respondent's primary jurisprudential
    // fixation. Champion matching is then conditioned on that noun: a thinker
    // who directly exemplifies it receives the full compatibility bonus, while
    // a genuinely cross-cutting but less canonical fit remains eligible at a
    // smaller bonus. Everyone else is excluded rather than rescued by vector
    // proximity.
    const identityBonus = compatibility === "primary" ? 0.09 : 0.025;

    let score;
    if (modeledAxes === 0) {
      score = 0.5 + 0.34 * traitFit + identityBonus - 0.22 * anti - unexplained;
    } else {
      score = 0.62 * fit + 0.18 * shape + 0.15 * traitFit + identityBonus - 0.22 * anti - unexplained;
    }
    if (profile.tier === "main") score += 0.015;
    score += Number(profile.specificityBonus || 0);
    // A proposition-only affinity cannot claim broad agreement from absent data.
    return clamp01(modeledAxes ? score : Math.min(0.69, score));
  }

  function resolveChampions(scores, traits, identity, identityResolution = null) {
    const profiles = Array.isArray(global.LAW_PROFILES) ? global.LAW_PROFILES : [];
    const normal = [];
    const catchalls = [];
    const resolution = identityResolution || resolveIdentity(scores, traits);
    const primaryChoice = resolution.candidates.find(candidate => candidate.identity.id === identity.id);
    // Hard representation guards require material doctrine and priority evidence;
    // a weak tilt can still have its best whole-person fit in an adjacent school.
    const explicitPrimary = (primaryChoice?.priorityEvidence || 0) >= 0.5 &&
      (primaryChoice?.basis || 0) >= 0.35;
    const primaryTraits = new Set((IDENTITY_CATALOG.get(identity.id)?.covers || []));
    const representsPrimary = profile => {
      const compatibility = championIdentityCompatibility(profile,identity);
      if (compatibility === "primary") return true;
      if (compatibility !== "cross-cutting" || !crossCuttingRequirementsSatisfied(profile,identity,traits)) return false;
      // A bridge can establish affinity without representing the explicitly
      // defining doctrine. Require actual modeled primary-domain or signature
      // coverage, not just an unrelated specialty tagged onto the noun.
      return (primaryChoice?.focus || []).some(axis => profile.axisSignature?.[axis]) ||
        (profile.signatureTraits || []).some(trait => primaryTraits.has(trait));
    };
    const supportedIdentities = resolution.candidates.filter(candidate =>
      candidate.score >= 0.62 && candidate.basis >= 0.2).map(candidate => candidate.identity);
    // A provisional noun should not outweigh a better supported whole-profile
    // match merely through canonicality. Keep only the small compatibility
    // distinction while defining priority remains unresolved.
    const primaryUnresolved = identityPrioritySummary(resolution).unresolved;
    const bestDirect = primaryUnresolved ? profiles.map(profile => ({profile,
      score: scoreProfile(profile,scores,traits,identity)}))
      .filter(item=>item.score!==null).sort((a,b)=>b.score-a.score)[0] : null;
    const directCoverage = bestDirect ? profileEvidenceCoverage(bestDirect.profile,scores,traits).coverage : 0;
    const profileScore = profile => {
      const evidence = profileEvidenceCoverage(profile,scores,traits);
      const clearerBroadEvidence = primaryUnresolved && evidence.coverage > directCoverage + 0.15 &&
        evidence.knownDisagreements.length === 0 && evidence.traitDisagreements.length === 0;
      const secondaryPenalty = clearerBroadEvidence ? 0.025 : 0.09;
      if (explicitPrimary && !representsPrimary(profile)) return null;
      const direct = scoreProfile(profile, scores, traits, identity);
      // A primary label is not an exhaustive worldview. Independently evidenced
      // compatible commitments retain their thinkers; no invented identity maps.
      const secondary = supportedIdentities.filter(other => !explicitPrimary && supportedIdentities.some(primary => primary.id === identity.id) && other.id !== identity.id)
        .map(other => scoreProfile(profile, scores, traits, other))
        .filter(value => value !== null).map(value => value - secondaryPenalty);
      return direct === null && !secondary.length ? null : Math.max(direct ?? -1, ...secondary);
    };

    for (const profile of profiles) {
      if (profile.tier === "catchall") {
        if (championIdentityCompatibility(profile, identity) !== "incompatible") catchalls.push(profile);
        continue;
      }
      const score = profileScore(profile);
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

    const bray = profiles.find((profile) => profile.id === "bray" && profile.selectable !== false);
    if (bray && requiredTraitsSatisfied(bray, traits)) {
      const remedialSalience = salience(scores, "remed");
      const strongestOtherAxis = Math.max(
        ...AXIS_IDS.filter((axisId) => axisId !== "remed").map((axisId) => salience(scores, axisId))
      );
      const partySpecific = traits["remedies.party_specific"] || 0;
      const traditionalEquity = traits["remedies.traditional_equity"] || 0;
      const brayMayDisplace =
        remedialSalience >= 0.75 &&
        partySpecific >= 0.65 &&
        traditionalEquity >= 0.65 &&
        (topNormal < 0.72 || remedialSalience >= strongestOtherAxis + 0.12);

      if (brayMayDisplace) {
        const { fit, shape } = axisProfileFit(bray, scores);
        const traitFit = profileTraitFit(bray, traits);
        const anti = Math.max(0, ...(bray.antiTraits || []).map((trait) => traits[trait] || 0));
        const brayScore = clamp01(0.58 * fit + 0.17 * shape + 0.20 * traitFit - 0.20 * anti - 0.03);
        pool = [...pool, { profile: bray, score: brayScore }].sort((a, b) =>
          b.score - a.score ||
          Number(b.profile.specificityBonus || 0) - Number(a.profile.specificityBonus || 0) ||
          a.profile.id.localeCompare(b.profile.id)
        );
      }
    }

    const universal = profiles.find((profile) => profile.id === "sohoni_frost" && profile.selectable !== false);
    if (universal && requiredTraitsSatisfied(universal, traits)) {
      const remedialSalience = salience(scores, "remed");
      const strongestOtherAxis = Math.max(
        ...AXIS_IDS.filter((axisId) => axisId !== "remed").map((axisId) => salience(scores, axisId))
      );
      const universalSupport = traits["remedies.universal"] || 0;
      const theory = traits["remedies.universal_relief_theory"] || 0;
      const universalMayDisplace =
        remedialSalience >= 0.75 &&
        universalSupport >= 0.60 &&
        theory >= 0.65 &&
        (topNormal < 0.72 || remedialSalience >= strongestOtherAxis + 0.12);

      if (universalMayDisplace) {
        const { fit, shape } = axisProfileFit(universal, scores);
        const traitFit = profileTraitFit(universal, traits);
        const anti = Math.max(0, ...(universal.antiTraits || []).map((trait) => traits[trait] || 0));
        const universalScore = clamp01(0.58 * fit + 0.17 * shape + 0.20 * traitFit - 0.20 * anti - 0.03);
        pool = [...pool, { profile: universal, score: universalScore }].sort((a, b) =>
          b.score - a.score ||
          Number(b.profile.specificityBonus || 0) - Number(a.profile.specificityBonus || 0) ||
          a.profile.id.localeCompare(b.profile.id)
        );
      }
    }

    const levinson = profiles.find((profile) => profile.id === "levinson" && profile.selectable !== false);
    if (levinson && requiredTraitsSatisfied(levinson, traits)) {
      const equilibration = traits["remedies.equilibration"] || 0;
      const remedialSalience = salience(scores, "remed");
      const prophylactic = traits["remedies.prophylactic"] || 0;
      const strongestOtherAxis = Math.max(
        ...AXIS_IDS.filter((axisId) => axisId !== "remed").map((axisId) => salience(scores, axisId))
      );
      const levinsonMayDisplace =
        equilibration >= 0.65 &&
        (remedialSalience >= 0.45 || prophylactic >= 0.65) &&
        (topNormal < 0.72 || strongestOtherAxis <= 0.55);

      if (levinsonMayDisplace) {
        const traitFit = profileTraitFit(levinson, traits);
        const levinsonScore = clamp01(0.68 + 0.22 * traitFit + Number(levinson.specificityBonus || 0));
        pool = [...pool, { profile: levinson, score: levinsonScore }].sort((a, b) =>
          b.score - a.score ||
          Number(b.profile.specificityBonus || 0) - Number(a.profile.specificityBonus || 0) ||
          a.profile.id.localeCompare(b.profile.id)
        );
      }
    }

    for (const profile of catchalls) {
      if (explicitPrimary && identity.id !== "mixed_jurisprudence" &&
          Math.max(traits["method.case_by_case"]||0,traits["method.anti_grand_theory"]||0) < 0.5) continue;
      const lowTheoryEvidence = Math.max(
        traits["method.case_by_case"] || 0,
        traits["method.anti_grand_theory"] || 0,
        traits["method.low_theory_space"] || 0
      );
      if (identity?.id === "mixed_jurisprudence" ||
          maxSalience <= 0.52 || topNormal < 0.61 || lowTheoryEvidence >= 0.5) {
        const base = scoreProfile(profile, scores, traits, identity) ?? 0;
        const score = clamp01(base + 0.16 * lowTheoryEvidence);
        pool = [...pool, { profile, score }].sort((a, b) =>
          b.score - a.score ||
          Number(b.profile.specificityBonus || 0) - Number(a.profile.specificityBonus || 0) ||
          a.profile.id.localeCompare(b.profile.id)
        );
      }
    }

    if (explicitPrimary) pool = pool.filter(item => representsPrimary(item.profile));

    // Never rescue a noun by jumping to an incompatible thinker. If this is
    // empty, the noun/profile contracts are wrong and the audit should fail.
    if (pool.length === 0) return { matches: [], confidence: "withheld", candidates: [] };

    // Apply evidence limits to every route, including special remedial overrides.
    pool = pool.map(item => {
      const evidence = profileEvidenceCoverage(item.profile, scores, traits);
      return {...item, evidence, score: evidence.modeledAxes.length ? item.score : Math.min(item.score, 0.69)};
    }).sort((a,b) => b.score-a.score || a.profile.id.localeCompare(b.profile.id));
    const first = pool[0];
    const second = pool[1];
    const margin = second ? first.score - second.score : 1;
    const confidence =
      first.score >= 0.76 && margin >= 0.055 && first.evidence.coverage >= 0.70 &&
      !first.evidence.knownDisagreements.length && !first.evidence.traitDisagreements.length ? "high" :
      first.score >= 0.63 ? "medium" : "low";
    return { matches: [first], confidence, candidates: pool.slice(0, 5) };
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
    // A respondent may have one sharply held judicial commitment and be
    // genuinely undecided on most other issues. Do not mistake that for
    // straight-line clicking merely because "Neither" is the modal answer.
    const neutralCount = counts.get(0) || 0;
    const mostCommonNonNeutral = Math.max(0, ...[...counts]
      .filter(([value]) => value !== 0).map(([, count]) => count));
    if (answered.length >= 80 && mostCommonNonNeutral / answered.length >= 0.9) return "straight-line";
    if (answered.length >= 80 && neutralCount / answered.length >= 0.85 &&
        answered.length - neutralCount < 4) return "mostly-neutral";
    if (values.length >= 80 && skipped / values.length >= 0.5) return "excessive-skips";
    return null;
  }


  // Hidden, conservative partisan-outcome override. A matched pair offers the
  // same judicial choice with opposed political beneficiaries. Ordinary
  // ideological answers and unrelated case disagreements earn no points.
  const OUTCOME_MIRRORS = Object.freeze([
    { id: "avoidance", left: "C3", right: "C4", weight: 1 },
    { id: "nationwide_relief", left: "R2", right: "R1", weight: 1 },
    { id: "severability", left: "R7", right: "R6", weight: 1 },
    { id: "prophylactic_remedies", left: "R10", right: "R9", weight: 1 },
    // Less comparable: two different constitutional eras and subject areas.
    // Corroboration only; this pair cannot satisfy the main-pair count.
    { id: "historical_fixation", left: "T1", right: "T2", weight: 0.5 }
  ]);

  function detectOutcomeSelection(responses = {}) {
    const getAnswer = (id) => {
      if (!Object.prototype.hasOwnProperty.call(responses,id) ||
          responses[id] === null) return 0;
      const v = Number(responses[id]);
      return Number.isInteger(v) && v >= -3 && v <= 3 ? v : 0;
    };
    const evidence = { left: { units: 0, direct: 0, pairs: [] },
                       right: { units: 0, direct: 0, pairs: [] } };
    for (const mirror of OUTCOME_MIRRORS) {
      const l = getAnswer(mirror.left), r = getAnswer(mirror.right);
      if (!l || !r || Math.sign(l) === Math.sign(r)) continue;
      const side = l > 0 ? "left" : "right";
      const unit = (Math.min(Math.abs(l),Math.abs(r)) === 1 ? 0.75 :
                    Math.min(Math.abs(l),Math.abs(r)) === 2 ? 1 : 1.25) * mirror.weight;
      evidence[side].units += unit;
      if (mirror.weight === 1) evidence[side].direct += 1;
      evidence[side].pairs.push(mirror.id);
    }
    // Three separate directly matched doctrines must reverse in the same
    // political direction, and their combined evidence must be substantial.
    // The T1/T2 contrast cannot, by itself, trigger the override.
    const side = ["left","right"].find(s =>
      evidence[s].direct >= 3 && evidence[s].units >= 3 &&
      evidence[s].units >= evidence[s === "left" ? "right" : "left"].units + 1.5
    ) || null;
    return { side, evidence };
  }

  // A conservative *prompt* for an additional attention check, not itself
  // grounds for labeling a sincere respondent unintelligent or dishonest.
  // Compare each strong answer with its item's nominal pole to avoid treating
  // ordinary reverse-keyed questions as ideological contradictions.
  function detectRandomLikePattern(responses,scores) {
    const items=Array.isArray(global.LAW_QUESTIONS)?global.LAW_QUESTIONS:[];
    let mixedAxes=0,strong=0;
    for(const axis of AXIS_IDS){
      let forPole=0,againstPole=0;
      for(const q of items){
        if(q.axis!==axis)continue;
        const raw=responses?.[q.id];
        if(raw===null||raw===undefined)continue;
        const answer=Number(raw);
        if(!Number.isFinite(answer)||Math.abs(answer)<2)continue;
        const direction=answer>0?"agree":"disagree";
        const signal=Number(q.signals?.[direction]?.[axis]||0);
        strong++;
        if(signal>0)forPole++;
        if(signal<0)againstPole++;
      }
      if(forPole>=2&&againstPole>=2)mixedAxes++;
    }
    return strong>=35 && mixedAxes>=5 &&
      Math.max(...AXIS_IDS.map(axis=>Math.abs(axisValue(scores,axis)-50)))<=18;
  }

  function detectBroadIncoherence(responses, diagnosticResponses = {}) {
    const coreAtLeast = (id, threshold) => responseValue(responses, id) >= threshold;
    const coreAtMost = (id, threshold) => responseValue(responses, id) <= threshold;
    const diagnosticAtLeast = (id, threshold) =>
      hasAsked(diagnosticResponses, id) && Number(diagnosticResponses[id]) >= threshold;
    const diagnosticAtMost = (id, threshold) =>
      hasAsked(diagnosticResponses, id) && Number(diagnosticResponses[id]) <= threshold;

    // Each domain below requires propositions that are genuinely difficult to
    // reconcile, not merely answers that land on opposite ends of an axis.
    // The exceptional result requires contradictions in at least two independent
    // jurisprudential domains, so ordinary nuance and case-specific distinctions
    // remain classifiable.
    const domains = {
      source:
        (coreAtLeast("S7", 2) && coreAtLeast("S8", 2)) ||
        (coreAtLeast("S2", 2) && diagnosticAtMost("D-NP6", -2)),
      form:
        ((coreAtLeast("F1", 2) || coreAtLeast("F3", 2)) && coreAtLeast("F5", 2)),
      constitutional_time:
        (coreAtLeast("T7", 2) && diagnosticAtMost("D-ORI1", -2)) ||
        (coreAtMost("T7", -2) && diagnosticAtLeast("D-ORI1", 2)),
      separation:
        coreAtMost("E3", -2) && diagnosticAtLeast("D-SEP3", 2)
    };

    return Object.values(domains).filter(Boolean).length >= 2;
  }

  function identityPrioritySummary(resolution) {
    return {
      evidence: resolution.best.priorityEvidence || 0,
      basis: "core-axis-support-plus-explicit-comparative-priority",
      conflictingComparisons: !!resolution.priorityConflict,
      unresolved: !!resolution.priorityConflict || resolution.candidates.some(candidate =>
        !candidate.priorityDefeated && candidate.priorityFamily !== resolution.best.priorityFamily &&
        resolution.best.score - candidate.score <= 0.12)
    };
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

    if (!hasAsked(diagnosticResponses, "D-QC1")) return byId["D-QC1"];
    if (Number(diagnosticResponses["D-QC1"]) !== -2) return null;
    if(detectRandomLikePattern(responses,scores) && !hasAsked(diagnosticResponses,"D-QC2"))
      return byId["D-QC2"];
    if(hasAsked(diagnosticResponses,"D-QC2") && Number(diagnosticResponses["D-QC2"]) !== 1)
      return null;

    const maxSalienceEarly = Math.max(...AXIS_IDS.map((id) => salience(scores, id)));

    const traits = buildTraits(scores, responses, diagnosticResponses);
    const priorities = [];
    const offer = (id, priority) => {
      if (!byId[id] || hasAsked(diagnosticResponses, id)) return;
      const existing = priorities.find((item) => item.id === id);
      if (existing) {
        existing.priority = Math.max(existing.priority, priority);
      } else {
        priorities.push({ id, priority });
      }
    };

    // Route from the live result landscape rather than from one axis threshold.
    // A family is "live" when it is leading or close enough that one targeted
    // diagnostic could reasonably move the noun/champion result.
    const routingResolution = resolveIdentity(scores, traits);
    const routingLeading = routingResolution.candidates.filter((candidate, index, all) =>
      (index === 0 || routingResolution.best.score - candidate.score <= 0.26) &&
      all.findIndex(other => other.priorityFamily === candidate.priorityFamily) === index
    );
    const routingIds = new Set(routingLeading.map((candidate) => candidate.identity.id));
    const routingFamilies = new Set(routingLeading.map((candidate) => candidate.identity.family));
    const confirmedPriorityFamilies = new Set(routingLeading.map(candidate => candidate.priorityFamily));
    // Axis moderation is compatible with a principled pluralist or institutional
    // method. Discretion evidence is compatible with, but never proves, Realism.
    // Ask relative importance before buying a discovery chain, rather than
    // requiring the as-yet-unasked doctrine to exist in the noun shortlist.
    const exploratoryFamilies = [];
    if (MAX_DIAGNOSTICS - askedCount >= 3 && !confirmedPriorityFamilies.has("method") && axisValue(scores,"cons") >= 30 &&
        axisValue(scores,"cons") <= 70) exploratoryFamilies.push("method");
    if (MAX_DIAGNOSTICS - askedCount >= 3 && !confirmedPriorityFamilies.has("realism") &&
        ((traits["source.law_runs_out"] || 0) >= 0.33 || maxSalienceEarly <= 0.70)) exploratoryFamilies.push("realism");
    const priorityFamilies = [...routingLeading.filter(candidate =>
      candidate.priorityFamily !== routingResolution.best.priorityFamily &&
      (candidate.familyBasis >= 0.35 || routingResolution.best.score - candidate.score <= 0.12)
    ).map(candidate => candidate.priorityFamily), ...exploratoryFamilies];
    const priorityProbe = [...new Set(priorityFamilies)].map(family => {
      const pair = [routingResolution.best.priorityFamily,family];
      return PRIORITY_DIAGNOSTICS.find(item => pair.every(f => item.priorityComparison.includes(f)));
    }).find(probe => probe && !hasAsked(diagnosticResponses,probe.id));
    if (priorityProbe) offer(priorityProbe.id,112);
    const explicitlyCentral = family => Object.keys(PRIORITY_CONTEXTS).some(other =>
      (traits[`priority.${family}.over.${other}`] || 0) >= 0.5);
    const methodDiscovery = explicitlyCentral("method");
    const realismDiscovery = explicitlyCentral("realism");
    if (methodDiscovery && axisValue(scores,"cons") < 65) {
      if ((traits["method.modal_pluralism"]||0) < 0.5) offer("D-PLU1",116);
      if ((traits["method.institutional_competence"]||0) < 0.5) offer("D-LP1",112);
      else offer("D-LP2",108);
    }
    // Realism remains available without automatic precedence. Affirmed relative
    // centrality justifies its short compatibility chain before fine subtypes.
    offer("D-RLS1",realismDiscovery ? 116 : maxSalienceEarly <= 0.55 ? 78 : 48);
    const bestRoutingId = routingResolution.best.identity.id;
    const identityLive = (id) => routingIds.has(id);
    const anyIdentityLive = (ids) => ids.some((id) => routingIds.has(id));

    const realismConfirmed =
      (traits["realism.underdetermination"] || 0) >= 0.45 &&
      (traits["realism.extra_doctrinal"] || 0) >= 0.45 &&
      ((traits["realism.empirical_prediction"] || 0) >= 0.35 ||
       (traits["realism.law_in_action"] || 0) >= 0.5);
    if (Number(diagnosticResponses["D-RLS1"]) > 0) {
      if (!hasAsked(diagnosticResponses, "D-RLS2")) offer("D-RLS2", realismDiscovery ? 116 : 90);
      if (!hasAsked(diagnosticResponses, "D-RLS3")) offer("D-RLS3", realismDiscovery ? 115 : 89);
    }
    if (realismConfirmed) {
      if (!hasAsked(diagnosticResponses, "D-RLS4")) offer("D-RLS4", 80);
      else if (!hasAsked(diagnosticResponses, "D-RLS5")) offer("D-RLS5", 79);
    }
    if (!realismConfirmed &&
        hasAsked(diagnosticResponses, "D-MAJ1") &&
        Number(diagnosticResponses["D-MAJ1"]) > 0 &&
        !hasAsked(diagnosticResponses, "D-MAJ2")) {
      offer("D-MAJ2", 96);
    }
    if (!realismConfirmed &&
        hasAsked(diagnosticResponses, "D-ELY1") &&
        Number(diagnosticResponses["D-ELY1"]) > 0 &&
        !hasAsked(diagnosticResponses, "D-RESP1")) {
      offer("D-RESP1", 94);
    }

    const time = axisValue(scores, "time");
    const source = axisValue(scores, "sorc");
    const posture = axisValue(scores, "post");
    const constraint = axisValue(scores, "cons");
    const form = axisValue(scores, "form");
    const precedent = axisValue(scores, "prec");
    const remedies = axisValue(scores, "remed");
    const separ = axisValue(scores, "separ");
    const maxSalience = maxSalienceEarly;

    // Structural jurisprudence should be diagnosed only when constitutional
    // allocation of institutional authority is a substantial commitment.
    // These questions DO NOT alter the common-core Separation percentage.
    const structuralIdentity = bestRoutingId;
    const structuralSalience = salience(scores, "separ");
    const structuralLive = structuralSalience >= 0.40 ||
      anyIdentityLive(["formalist", "functionalist"]);
    if (structuralLive) {
      // E2 asks about one especially sensitive special prosecutor. The
      // general Article II theory need not have the same answer.
      if ((separ >= 65 || (separ <= 36 && Math.abs(responseValue(responses,"E2")) >= 2)) && !hasAsked(diagnosticResponses,"D-SEP1"))
        offer("D-SEP1", 86);
      // Differentiate court-owned legal interpretation from administrative
      // policymaking without equating this with hostility to delegation.
      if ((constraint >= 60 || constraint <= 42 || structuralSalience >= 0.57) &&
          !hasAsked(diagnosticResponses,"D-SEP2")) offer("D-SEP2", 83);
      if (separ <= 38 &&
          (traits["separation.unitary_executive"] || 0) < 0.5 &&
          (traits["separation.supervisory_duty"] || 0) < 0.5 &&
          !hasAsked(diagnosticResponses, "D-MET1")) {
        offer("D-MET1", 84);
      }

      // Some strict separationists allow Congress to delegate if it speaks
      // clearly; other theories reject the transfer even then.
      if (separ >= 68 && !hasAsked(diagnosticResponses,"D-SEP3"))
        offer("D-SEP3", 84);
      // E5 supplies the first general clue to administrative adjudication.
      if (Math.abs(responseValue(responses,"E5")) >= 2 &&
          !hasAsked(diagnosticResponses,"D-SEP4"))
        offer("D-SEP4", 76);
    }

    const originalistIds = [
      "originalist", "public_meaning_originalist", "original_intent_originalist",
      "original_methods_originalist", "framework_originalist"
    ];
    const originalistZone = time >= 60 &&
      (anyIdentityLive(originalistIds) ||
       (time >= 82 && Math.max(
         traits["time.public_meaning"] || 0,
         traits["time.original_intent"] || 0,
         traits["time.originalism_independent_authority"] || 0
       ) >= 0.45));
    if(originalistZone && (precedent >= 55 || precedent <= 38 || time >= 78) &&
       !hasAsked(diagnosticResponses,"D-PREC1")) offer("D-PREC1",75);
    const sourceNuanceZone = source <= 43 &&
      ((traits["source.objective_morality"]||0)>=0.33 ||
       (traits["source.fit_and_justification"]||0)>=0.33 ||
       (traits["source.positive_law_settlement"]||0)>=0.4);
    if(sourceNuanceZone && !hasAsked(diagnosticResponses,"D-MOR1")) offer("D-MOR1",64);

    if (originalistZone) {
      // Natural-law grounding is a genuine Originalist subtype rather than an
      // unrelated Source exploration. When objective-morality evidence is
      // already present, D-NP1 tests the positive-law settlement component
      // needed for the Higher-law Originalist modifier/champion cell.
      if ((traits["source.objective_morality"] || 0) >= 0.35 &&
          (traits["source.positive_law_settlement"] || 0) < 0.5 &&
          !hasAsked(diagnosticResponses, "D-NP1")) {
        offer("D-NP1", 86);
      }

      const publicMeaning = traits["time.public_meaning"] || 0;
      const originalIntent = traits["time.original_intent"] || 0;
      const construction = traits["time.construction_zone"] || 0;
      const originalMethods = traits["time.original_methods"] || 0;
      const intentAsMeaning = traits["time.intent_as_meaning"] || 0;
      const intratextual = traits["time.intratextualism"] || 0;
      const originalLaw = traits["time.original_law"] || 0;
      const independentAuthority = traits["time.originalism_independent_authority"] || 0;
      const precedentHistoricism = traits["time.precedent_mediated_historicism"] || 0;

      // First resolve the public noun when the core did not already do it.
      if (Math.max(publicMeaning, originalIntent) < 0.5) offer("D-ORI1", 96);

      // A highly precedent-centered or methodologically eclectic judge may use
      // founding-era meaning because current doctrine tells judges to do so
      // without embracing Originalism as an independently authoritative theory.
      // Test that distinction before spending specialist Originalist slots.
      const precedentCenteredHistoricism =
        precedent >= 72 ||
        (traits["precedent.settlement"] || 0) >= 0.5 ||
        (traits["constraint.intent"] || 0) >= 0.5 ||
        (traits["method.institutional_competence"] || 0) >= 0.45;
      if ((Math.max(publicMeaning, originalIntent) >= 0.4 || hasAsked(diagnosticResponses, "D-ORI1")) &&
          precedentCenteredHistoricism &&
          independentAuthority < 0.5 && precedentHistoricism < 0.5 &&
          !hasAsked(diagnosticResponses, "D-ORI7")) {
        offer("D-ORI7", 95);
      }

      // Construction is the only substantive public Originalist modifier ("New").
      // Ask it once a noun is known or nearly known, because it also identifies
      // Whittington on the OI side and routes the New-OPM champion cluster.
      if ((Math.max(publicMeaning, originalIntent) >= 0.4 || hasAsked(diagnosticResponses, "D-ORI1")) &&
          !hasAsked(diagnosticResponses, "D-ORI3")) {
        offer("D-ORI3", 90);
      }

      const provisional = bestRoutingId;
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

      // Original Law is a distinct champion-level account of what originalism preserves.
      if (looksOPM && originalLaw < 0.5 &&
          hasAsked(diagnosticResponses, "D-ORI2") && !hasAsked(diagnosticResponses, "D-ORI6")) {
        offer("D-ORI6", 62);
      }

      // Amar-style intratextualism is a specialist tie-breaker. It remains lower
      // priority than noun, construction, Original Methods, and Original Law.
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
    const ackermanLivingBranch =
      strongLiving && provisionalTimeIdentity === "living_constitutionalist" &&
      posture >= 48 && posture <= 78;
    const transformativeShape =
      pureLivingBranch && constraint <= 45 && remedies <= 35 && posture <= 35;

    const constitutionalMoments = traits["time.constitutional_moments"] || 0;

    // Ackerman's dualist/higher-law democratic theory is deliberately not
    // forced through the rights-protective Post/Siegel branch.
    if ((ackermanLivingBranch || (pureLivingBranch && democraticLiving >= 0.5)) &&
        constitutionalMoments < 0.5 &&
        !hasAsked(diagnosticResponses, "D-ACK1")) {
      offer("D-ACK1", 99);
    }

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

    // Source refinement follows the live race, but Mixed is not an established
    // competing theory. Nonpositive Source scores cannot create a public noun
    // without affirmative diagnostic evidence, so requiring that noun to be
    // live before asking its identifying questions would be circular. Explore
    // the existing nonpositive zone while Mixed is leading; neutral Source and
    // already-established competing families keep their conservative routing.
    const unresolvedSource = bestRoutingId === "mixed_jurisprudence" && source <= 38;
    const sourceFamilyLive = routingFamilies.has("source") || unresolvedSource ||
      source >= 82 || source <= 18;
    if (sourceFamilyLive) {
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
        const commandTheory = traits["source.command_theory"] || 0;
        const basicNorm = traits["source.basic_norm"] || 0;
        const planningTheory = traits["source.planning_theory"] || 0;
  
        if (Math.max(incorporated, exclusive) < 0.5) offer("D-POS1", 90);

        // These are champion-level architectures of Positivism, not new nouns.
        if (commandTheory < 0.5 && !hasAsked(diagnosticResponses, "D-AUS1"))
          offer("D-AUS1", 84);
        if (basicNorm < 0.5 && !hasAsked(diagnosticResponses, "D-KEL1"))
          offer("D-KEL1", 82);
        if (exclusive >= 0.5 && planningTheory < 0.5 &&
            !hasAsked(diagnosticResponses, "D-SHA1"))
          offer("D-SHA1", 86);

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

        // Strong Natural Law can establish the Natural-Law noun through a direct
        // legal-validity thesis even when Finnis-style settlement is rejected.
        if ((traits["source.objective_morality"] || 0) >= 0.45 &&
            (traits["source.strong_natural_law"] || 0) < 0.5 &&
            !hasAsked(diagnosticResponses, "D-NL2")) {
          offer("D-NL2", 91);
        }
  
        if (naturalPlausible && (traits["source.positive_law_settlement"] || 0) < 0.5) {
          offer("D-NP1", 92);
        }
        if (interpretivistPlausible && (traits["source.fit_and_justification"] || 0) < 0.5) {
          offer("D-NP2", 90);
        }
  
        const naturalEstablished =
          (traits["source.objective_morality"] || 0) >= 0.45 &&
          ((traits["source.positive_law_settlement"] || 0) >= 0.5 ||
           (traits["source.strong_natural_law"] || 0) >= 0.5);
        if (naturalEstablished &&
            (traits["source.strong_natural_law"] || 0) < 0.5 &&
            !hasAsked(diagnosticResponses, "D-NL2")) {
          offer("D-NL2", 88);
        }

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
        // Affirmed Fullerian legality already supplies a noun: absent core clues,
        // do not spend slots on alternatives. Independently supported Source
        // theories still receive the targeted probes above, even alongside Fuller.
        if (!naturalEstablished && !interpretivistEstablished &&
            internalLegality < 0.5 &&
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

    const provisionalMethodIdentity = bestRoutingId;

    const calabresiCompatible = new Set([
      "pragmatist", "common_law_constitutionalist", "interpretive_pluralist"
    ]);
    if (routingLeading.some((candidate) => calabresiCompatible.has(candidate.identity.id)) &&
        (traits["method.statutory_obsolescence"] || 0) < 0.5 &&
        (constraint <= 45 || commonLawCore >= 0.4) &&
        !hasAsked(diagnosticResponses, "D-CAL1")) {
      offer("D-CAL1", 76);
    }

    const blackCompatible = new Set([
      "positivist", "interpretive_pluralist", "common_law_constitutionalist",
      "living_constitutionalist", "mixed_jurisprudence"
    ]);
    const blackStructuralSalience = Math.max(
      salience(scores, "time"), salience(scores, "prec"),
      salience(scores, "post"), salience(scores, "separ")
    );
    if (routingLeading.some((candidate) => blackCompatible.has(candidate.identity.id)) &&
        blackStructuralSalience >= 0.30 &&
        (traits["method.structural_inference"] || 0) < 0.5 &&
        !hasAsked(diagnosticResponses, "D-BLK1")) {
      offer("D-BLK1", 72);
    }

    if (identityLive("textualist") && constraint >= 62) {
      if (!hasAsked(diagnosticResponses, "D-TXT1")) offer("D-TXT1", 74);
      if ((traits["constraint.best_reading_context"] || 0) >= 0.5 &&
          !hasAsked(diagnosticResponses, "D-SEP2")) {
        offer("D-SEP2", 91);
      }
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
      if (intent >= 0.5 &&
          (traits["method.congress_aware_interpretation"] || 0) < 0.5 &&
          !hasAsked(diagnosticResponses, "D-KAT1")) {
        offer("D-KAT1", 92);
      }

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
      if (institutional >= 0.5 &&
          (traits["method.agency_interpretive_autonomy"] || 0) < 0.5 &&
          !hasAsked(diagnosticResponses, "D-MAS1")) {
        offer("D-MAS1", 87);
      }

      if (social < 0.5 && !hasAsked(diagnosticResponses, "D-SOC1")) {
        // Strong balancing/open-construction profiles need the Sociological
        // router early enough that a confirmed social-interest method can still
        // receive one champion-level refinement inside the 12-question cap.
        offer("D-SOC1", form <= 40 ? 90 : form <= 50 ? 77 : 64);
      }
    }

    // Champion-only refinements: these are deliberately gated behind a
    // profile that is already plausible from the core bank, so they cannot
    // consume scarce adaptive slots merely to search for exotic names.
    if (identityLive("functionalist") &&
        (traits["method.agency_interpretive_autonomy"] || 0) < 0.5 &&
        !hasAsked(diagnosticResponses, "D-MAS1")) {
      offer("D-MAS1", 86);
    }

    const gardbaumCompatible = new Set([
      "political_constitutionalist", "political_process_jurist", "minimalist", "mixed_jurisprudence"
    ]);
    if (routingLeading.some((candidate) => gardbaumCompatible.has(candidate.identity.id)) &&
        (traits["posture.dialogic"] || 0) >= 0.5 &&
        (traits["posture.structured_legislative_response"] || 0) < 0.5 &&
        !hasAsked(diagnosticResponses, "D-GRD1")) {
      offer("D-GRD1", 92);
    }

    const monaghanCompatible = new Set([
      "positivist", "legal_process_theorist", "common_law_constitutionalist", "mixed_jurisprudence"
    ]);
    if (routingLeading.some((candidate) => monaghanCompatible.has(candidate.identity.id)) &&
        (traits["remedies.prophylactic"] || 0) >= 0.5 &&
        (traits["remedies.constitutional_common_law"] || 0) < 0.5 &&
        !hasAsked(diagnosticResponses, "D-MON1")) {
      offer("D-MON1", 89);
    }

    if (remedies >= 84 &&
        (traits["remedies.party_specific"] || 0) >= 0.65 &&
        (traits["remedies.traditional_equity"] || 0) < 0.5 &&
        !hasAsked(diagnosticResponses, "D-BRAY1")) {
      offer("D-BRAY1", 94);
    }

    if (remedies <= 18 &&
        (traits["remedies.universal"] || 0) >= 0.60 &&
        (traits["remedies.universal_relief_theory"] || 0) < 0.5 &&
        !hasAsked(diagnosticResponses, "D-UNI1")) {
      offer("D-UNI1", 94);
    }

    if (((traits["remedies.prophylactic"] || 0) >= 0.5 || salience(scores, "remed") >= 0.62) &&
        (traits["remedies.equilibration"] || 0) < 0.5 &&
        !hasAsked(diagnosticResponses, "D-LEV1")) {
      offer("D-LEV1", 74);
    }

    const institutionalPluralism = traits["source.institutional_legal_pluralism"] || 0;
    const romanoPlausible =
      source >= 35 && source <= 68 &&
      (traits["source.objective_morality"] || 0) < 0.35 &&
      (traits["source.fit_and_justification"] || 0) < 0.45;
    if (romanoPlausible && institutionalPluralism < 0.5 &&
        !hasAsked(diagnosticResponses, "D-ROM1")) {
      offer("D-ROM1", 63);
    }

    const freeScientific = traits["method.free_scientific_research"] || 0;
    const livingLaw = traits["method.living_law"] || 0;
    const socialMethod = traits["method.social_interests"] || 0;
    const remediesScore = remedies;
    if (socialMethod >= 0.5 && livingLaw < 0.5 && !hasAsked(diagnosticResponses, "D-EHR1")) {
      offer("D-EHR1", 96);
    }
    if (socialMethod >= 0.5 && freeScientific < 0.5 && remediesScore > 25) {
      offer("D-GENY1", 95);
    }

    const commonLawDevelopment = traits["time.common_law_development"] || 0;
    if (identityLive("common_law_constitutionalist") &&
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

    const pilCompatible = new Set(["sociological_jurist", "living_constitutionalist", "purposivist"]);
    if (routingLeading.some((candidate) => pilCompatible.has(candidate.identity.id)) &&
        remediesScore <= 25 && posture <= 32 && constraint <= 45 &&
        (traits["remedies.public_interest_litigation"] || 0) < 0.5) {
      offer("D-PIL1", 96);
    }

    const proportionalityPlausible =
      (form <= 25 && (source <= 35 || (constraint <= 25 && posture <= 35))) ||
      // A strongly purposive, rights-protective profile can be Barak-like even
      // when generic balancing is not extreme enough to make Proportionalist
      // the leading noun. In that narrow cell, D-PROP1 tests the genuine
      // Purposivist/Proportionalist hybrid rather than inferring it from Form.
      (form <= 35 && constraint <= 25 && posture <= 35);
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

    // If the hand-authored gates leave spare capacity, use the remaining
    // 100-question budget to resolve an actually live noun/champion race rather
    // than stopping merely because no family-specific branch happened to fire.
    // This fallback is conservative: it excludes deferred/exotic diagnostics and
    // only considers questions tied to a live identity or a trait that separates
    // nearby compatible champions.
    // Missing required evidence is an unanswered question, not negative evidence.
    // Offer affordable prerequisite chains for compatible, plausible thinkers.
    const remainingSlots = MAX_DIAGNOSTICS - askedCount;
    for (const profile of global.LAW_PROFILES || []) {
      if (profile.selectable === false || profile.tier === "lineage" || profile.tier === "catchall") continue;
      if (!routingLeading.some(c => championIdentityCompatibility(profile,c.identity) !== "incompatible")) continue;
      const fit = axisProfileFit(profile,scores);
      if (fit.modeledAxes && fit.fit < 0.55) continue;
      const missing = (profile.requiredTraits || []).filter(rule =>
        !requiredTraitsSatisfied({requiredTraits:[rule]},traits));
      if (!missing.length) continue;
      const needed = new Set(missing.flatMap(rule => [...(rule.all||[]),...(rule.any||[])]));
      const questions = Object.values(byId).filter(q =>
        !hasAsked(diagnosticResponses,q.id) && q.family !== "quality" &&
        [...(q.agreeTraits||[]),...(q.disagreeTraits||[])].some(t => needed.has(t)) &&
        (!(q.relatedIdentityIds || []).some(id =>
          ["natural_lawyer","nonpositivist","interpretivist","fullerian"].includes(id)) ||
          priorities.some(item => item.id === q.id)));
      const after = (base,q,positive) => {
        const hypothetical = {...base};
        for (const trait of (positive ? q.agreeTraits : q.disagreeTraits) || []) setMax(hypothetical,trait,1);
        return hypothetical;
      };
      const feasible = new Map();
      for (const q of questions) for (const positive of [true,false]) {
        const one = after(traits,q,positive);
        if (requiredTraitsSatisfied(profile,one)) { feasible.set(q.id,1); continue; }
        if (remainingSlots < 2 || feasible.get(q.id) === 1) continue;
        if (questions.some(second => second.id !== q.id && [true,false].some(sign =>
          requiredTraitsSatisfied(profile,after(one,second,sign))))) feasible.set(q.id,2);
      }
      for (const [id,cost] of feasible) offer(id,76 - 5*(cost-1));
    }
    const fallbackCandidates = [];
    const routingChampion = resolveChampions(scores, traits, routingResolution.best.identity,routingResolution);
    const championPool = routingChampion.candidates || routingChampion.matches || [];
    const championTop = championPool.slice(0, 3).filter((candidate, index) =>
      index === 0 || (championPool[0]?.score ?? 0) - candidate.score <= 0.11
    );

    if (championTop.length >= 2 &&
        (routingChampion.confidence !== "high" ||
         championTop[0].score - championTop[1].score <= 0.09)) {
      const traitCounts = new Map();
      for (const candidate of championTop) {
        const profileTraits = new Set([
          ...(candidate.profile.signatureTraits || []),
          ...(candidate.profile.antiTraits || [])
        ]);
        for (const trait of profileTraits) {
          traitCounts.set(trait, (traitCounts.get(trait) || 0) + 1);
        }
      }
      const differentiatingTraits = new Set(
        [...traitCounts.entries()]
          .filter(([, count]) => count > 0 && count < championTop.length)
          .map(([trait]) => trait)
      );

      for (const diagnostic of Object.values(byId)) {
        if (hasAsked(diagnosticResponses, diagnostic.id) ||
            diagnostic.family === "quality" || diagnostic.priorityComparison ||
            diagnostic.priority === "deferred") continue;
        if (/^D-(NP[1-6]|NL2)$/.test(diagnostic.id) &&
            !priorities.some(item => item.id === diagnostic.id)) continue;
        const covers = diagnostic.relatedIdentityIds || [];
        const identityRelevant =
          covers.includes(routingResolution.best.identity.id) ||
          covers.some((id) => routingIds.has(id));
        if (!identityRelevant) continue;
        const diagnosticTraits = [
          ...(diagnostic.agreeTraits || []),
          ...(diagnostic.disagreeTraits || [])
        ];
        if (diagnosticTraits.some((trait) => differentiatingTraits.has(trait))) {
          fallbackCandidates.push({ id: diagnostic.id, priority: 62 });
        }
      }
    }

    const identityMargin = routingResolution.candidates.length > 1
      ? routingResolution.best.score - routingResolution.candidates[1].score
      : 1;
    if (routingResolution.candidates.length > 1 &&
        (identityMargin <= 0.10 || routingResolution.best.score < 0.78)) {
      const topIds = routingResolution.candidates.slice(0, 2).map((candidate) => candidate.identity.id);
      for (const diagnostic of Object.values(byId)) {
        if (hasAsked(diagnosticResponses, diagnostic.id) ||
            diagnostic.family === "quality" || diagnostic.priorityComparison ||
            diagnostic.priority === "deferred") continue;
        if (/^D-(NP[1-6]|NL2)$/.test(diagnostic.id) &&
            !priorities.some(item => item.id === diagnostic.id)) continue;
        const covers = diagnostic.relatedIdentityIds || [];
        const coveredTop = topIds.filter((id) => covers.includes(id));
        if (coveredTop.length === 1) {
          fallbackCandidates.push({ id: diagnostic.id, priority: 57 });
        }
      }
    }

    fallbackCandidates
      .sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id))
      .slice(0, 8)
      .forEach((candidate) => offer(candidate.id, candidate.priority));

    // Rank questions by decision-sensitivity proxies, not calibrated information gain. Hand-authored gates decide
    // which distinctions are jurisprudentially plausible; the sorter decides
    // which live distinction is most valuable *now*.
    const resolution = routingResolution;
    const leading = routingLeading;
    const relevant = routingIds;
    const currentChampion = routingChampion;
    const currentChampionId = currentChampion.matches[0]?.profile?.id || "none";
    const currentMargin = resolution.candidates.length > 1
      ? resolution.best.score - resolution.candidates[1].score : 1;

    const askedFamilyCounts = {};
    for (const id of Object.keys(diagnosticResponses || {})) {
      const family = byId[id]?.family;
      if (family) askedFamilyCounts[family] = (askedFamilyCounts[family] || 0) + 1;
    }

    const triggeredFollowUp = (diagnosticId) => {
      for (const [askedId, raw] of Object.entries(diagnosticResponses || {})) {
        const prior = byId[askedId];
        if (!prior || raw === null) continue;
        const value = Number(raw);
        const nextIds = value > 0 ? prior.nextOnAgree : value < 0 ? prior.nextOnDisagree : [];
        if ((nextIds || []).includes(diagnosticId)) return true;
      }
      return false;
    };

    const hypotheticalCache = new Map();
    const hypothetical = (diagnosticId, value) => {
      const hypotheticalTraits = buildTraits(
        scores, responses, { ...diagnosticResponses, [diagnosticId]: value }
      );
      const cacheKey = JSON.stringify(hypotheticalTraits);
      if (hypotheticalCache.has(cacheKey)) return hypotheticalCache.get(cacheKey);
      const identityResolution = resolveIdentity(scores, hypotheticalTraits);
      const championResolution = resolveChampions(
        scores, hypotheticalTraits, identityResolution.best.identity,identityResolution
      );
      const championId = championResolution.matches[0]?.profile?.id || "none";
      const margin = identityResolution.candidates.length > 1
        ? identityResolution.best.score - identityResolution.candidates[1].score : 1;
      let modifierId = "none";
      if (global.LAW_RESULT_CONTENT?.assemble) {
        const assembled = global.LAW_RESULT_CONTENT.assemble({
          identity: identityResolution.best.identity,
          identityScore: identityResolution.best.score,
          identityPriority: identityPrioritySummary(identityResolution),
          primaryStrength: identityResolution.best.basis,
          identityAlternatives: identityResolution.candidates.filter(candidate => candidate.priorityFamily !== identityResolution.best.priorityFamily).slice(0, 3)
        }, scores, hypotheticalTraits, {});
        modifierId = assembled?.modifier?.id || "none";
      }
      const outcome = {
        identityId: identityResolution.best.identity.id,
        identityScore: identityResolution.best.score,
        championId,
        championConfidence: championResolution.confidence,
        margin,
        modifierId
      };
      hypotheticalCache.set(cacheKey,outcome);
      return outcome;
    };

    const targeted = priorities.map((p) => {
      const diagnostic = byId[p.id];
      const covers = diagnostic.relatedIdentityIds || [];
      const bestDirect =
        covers.includes(resolution.best.identity.id) ||
        (resolution.best.identity.id.includes("originalist") && diagnostic.family === "originalism");
      const nearDirect = !bestDirect && covers.some((id) => relevant.has(id));
      const followUp = triggeredFollowUp(p.id);

      const outcomes = [-3, -2, -1, 0, 1, 2, 3, null].map(value => hypothetical(p.id, value));
      const agree = outcomes[6];
      const disagree = outcomes[0];

      let information = 0;
      if (new Set(outcomes.map(o => o.identityId)).size > 1) information += 14;
      if (new Set(outcomes.map(o => o.championId)).size > 1) information += 28;
      if (new Set(outcomes.map(o => o.modifierId)).size > 1) information += 3;
      information += Math.min(7, Math.abs(agree.margin - disagree.margin) * 35);
      information += Math.min(5, Math.abs(agree.identityScore - disagree.identityScore) * 18);

      // If the noun is already clear but the thinker is not, questions that can
      // separate champion outcomes remain worth asking.
      if (currentChampion.confidence !== "high" &&
          (agree.championId !== currentChampionId || disagree.championId !== currentChampionId)) {
        information += 6;
      }

      let relevance = bestDirect ? 26 : nearDirect ? 13 : 0;
      if (followUp) relevance += 6;
      if (diagnostic.priorityComparison) relevance += 20;
      if (resolution.best.score >= 0.83 && resolution.best.basis >= 0.34 &&
          !bestDirect && !nearDirect && !followUp) {
        relevance -= 12;
      }

      // Avoid spending half the remaining bank on one family unless the answers
      // themselves opened a chain or the question can still alter a public result.
      const familyCount = askedFamilyCounts[diagnostic.family] || 0;
      const repetitionPenalty =
        familyCount >= 2
          ? (familyCount - 1) * 10
          : 0;

      const rank = p.priority + relevance + information - repetitionPenalty;
      const material = information >= 8;
      return {
        ...p, rank, bestDirect, nearDirect, direct: bestDirect || nearDirect,
        followUp, material, information
      };
    });

    targeted.sort((a, b) =>
      b.rank - a.rank ||
      b.information - a.information ||
      b.priority - a.priority ||
      a.id.localeCompare(b.id)
    );

    // A clear result may stop early only when the remaining questions are both
    // remote from the live result and unable to change any public-facing layer.
    // Otherwise use the available 88+12 budget to refine the noun/champion.
    const settled = askedCount >= 4 &&
      resolution.best.score >= 0.84 &&
      currentMargin >= 0.08 &&
      currentChampion.confidence === "high";
    const bestTarget = targeted[0];
    if (!bestTarget) return null;
    if (settled &&
        !bestTarget.bestDirect &&
        !bestTarget.nearDirect &&
        !bestTarget.followUp &&
        bestTarget.information < 8) {
      return null;
    }
    return byId[bestTarget.id];
  }

  function classify(scored, responses = {}, diagnosticResponses = {}, meta = {}) {
    const scores = Object.fromEntries(AXIS_IDS.map((id) => [id, axisValue(scored, id)]));
    const traits = buildTraits(scores, responses, diagnosticResponses);
    const traitEvidence = buildTraitEvidence(responses, diagnosticResponses);

    const mechanical = detectMechanicalPattern(responses, meta);
    const qualityCheckFailed =
      hasAsked(diagnosticResponses, "D-QC1") &&
      Number(diagnosticResponses["D-QC1"]) !== -2 ||
      (hasAsked(diagnosticResponses,"D-QC2") &&
       Number(diagnosticResponses["D-QC2"]) !== 1);

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

    if (detectBroadIncoherence(responses, diagnosticResponses)) {
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


    const outcomeSelection = detectOutcomeSelection(responses);
    if (outcomeSelection.side) {
      const left = outcomeSelection.side === "left";
      return finalizeResult({
        identity: identityFromCatalog(left ? "outcome_driven_left" : "outcome_driven_right"),
        identityScore: 1,
        identityReason: left
          ? "Across several politically mirrored cases, you repeatedly changed your preferred legal approach when doing so favored the political left."
          : "Across several politically mirrored cases, you repeatedly changed your preferred legal approach when doing so favored the political right.",
        identityAlternatives: [],
        champions: [],
        championConfidence: "withheld",
        traits,
        diagnosticCount: Object.keys(diagnosticResponses || {}).length,
        responseQuality: "partisan-outcome-selection",
        calibration: "conservative-mirror-heuristic"
      }, scores, traits, traitEvidence);
    }

    const identityResolution = resolveIdentity(scores, traits);
    const championResolution = resolveChampions(scores, traits, identityResolution.best.identity,identityResolution);
    return finalizeResult({
      identity: identityResolution.best.identity,
      identityScore: identityResolution.best.score,
      primaryStrength: identityResolution.best.basis,
      identityPriority: identityPrioritySummary(identityResolution),
      identityReason: identityResolution.best.reason,
      identityAlternatives: identityResolution.candidates.filter(candidate => candidate.priorityFamily !== identityResolution.best.priorityFamily).slice(0, 3),
      champions: championResolution.matches.map(({ profile, score, evidence }) => ({
        id: profile.id,
        name: profile.name,
        tier: profile.tier,
        score,
        evidence,
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
    MAX_TOTAL_QUESTIONS,
    MAX_DIAGNOSTICS,
    AXIS_IDS,
    diagnosticBank,
    buildTraits,
    buildTraitEvidence,
    detectMechanicalPattern,
    detectRandomLikePattern,
    detectBroadIncoherence,
    detectOutcomeSelection,
    resolveIdentity,
    championIdentityCompatibility,
    profileEvidenceCoverage,
    resolveChampions,
    nextDiagnostic,
    classify
  });
})(globalThis);

