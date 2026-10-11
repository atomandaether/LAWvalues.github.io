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
      priority: "medium",
      unlock: "Open, functional, or balancing profile where Pound could materially improve on a generic Pragmatist/Purposivist match.",
      prompt: "When legal doctrine leaves real room for judgment, courts should openly identify the competing social interests, examine how the rule actually operates in society, and shape the doctrine so those interests are reconciled as well as the legal materials permit.",
      agreeTraits: ["method.social_interests", "method.law_in_action"],
      disagreeTraits: [],
      nextOnAgree: [],
      nextOnDisagree: [],
      relatedIdentityIds: ["pragmatist", "purposivist"],
      note: "Specialist router for Roscoe Pound / sociological jurisprudence, not a new headline family by itself."
    },
    {
      id: "D-PLU1",
      family: "pluralism",
      priority: "medium",
      unlock: "No single jurisprudential axis or family strongly dominates.",
      prompt: "Constitutional interpretation legitimately uses several different forms of argument—text, history, precedent, structure, consequences, and broader constitutional principles—and no one of those methods should control every hard case.",
      agreeTraits: ["method.modal_pluralism"],
      disagreeTraits: [],
      nextOnAgree: [],
      nextOnDisagree: ["D-OCO1"],
      relatedIdentityIds: ["interpretive_pluralist"],
      note: "Separates principled methodological pluralism from merely deciding cases without a grand theory."
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
    "posture.clear_error": [["O1", 1, 1]],
    "posture.democratic_legitimacy": [["O2", 1, 0.9], ["O5", 1, 0.75], ["O8", 1, 1]],
    "posture.dialogic": [["O6", 1, 1]],
    "posture.passive_virtues": [["O7", 1, 1]],
    "posture.rights_trumps": [["O4", 1, 0.8], ["O11", 1, 1], ["O13", 1, 0.6]],
    "posture.judicial_independence": [["O13", 1, 1]],
    "posture.electoral_accountability": [["O12", 1, 1]],
    "separation.nondelegation": [["E3", 1, 1]],
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

    if (l.sorc >= 0.25 && (traits["source.morality_incorporated"] || 0) >= 0.45) {
      add("inclusive_positivist", 0.82 + 0.12 * s.sorc, "Positive-source profile plus incorporation diagnostic.");
    }
    if (l.sorc >= 0.25 && (traits["source.source_thesis"] || 0) >= 0.45) {
      add("exclusive_positivist", 0.82 + 0.12 * s.sorc, "Positive-source profile plus source-thesis diagnostic.");
    }
    if (r.sorc >= 0.2 && (traits["source.principles_are_law"] || 0) >= 0.5) {
      add("dworkinian", 0.78 + 0.16 * s.sorc, "Principles-as-existing-law pattern.");
    }
    if (r.sorc >= 0.2 && (traits["source.moral_impact"] || 0) >= 0.5) {
      add("moral_impact_theorist", 0.86 + 0.08 * s.sorc, "Institutional action understood through the moral rights and obligations it generates.");
    }
    if (r.sorc >= 0.2 &&
        (traits["source.objective_morality"] || 0) >= 0.45 &&
        ((traits["source.positive_law_settlement"] || 0) >= 0.35 ||
         ((traits["source.objective_morality"] || 0) >= 0.72 && (traits["source.principles_are_law"] || 0) < 0.4))) {
      add("natural_lawyer", 0.77 + 0.16 * s.sorc, "Objective-morality pattern distinct from Dworkinian principles.");
    }
    if ((traits["source.internal_legality"] || 0) >= 0.5) {
      add("fullerian", 0.86, "Internal morality of legality diagnostic.");
    }
    if ((traits["source.extreme_injustice"] || 0) >= 0.5 &&
        (traits["source.objective_morality"] || 0) < 0.4) {
      add("radbruchian", 0.81, "Extreme-injustice threshold without broad moral invalidation.");
    }

    if ((traits["time.framework"] || 0) >= 0.5) {
      add("framework_originalist", 0.92, "Fixed framework plus legitimate construction.");
    }
    if (l.time >= 0.2 && (traits["time.original_methods"] || 0) >= 0.5) {
      add("original_methods_originalist", 0.9, "Historically accepted interpretive methods.");
    }
    if (l.time >= 0.2 && (traits["time.original_intent"] || 0) >= 0.5) {
      add("original_intent_originalist", 0.88, "Affirmative original-intent evidence.");
    }
    if (l.time >= 0.2 && (traits["time.public_meaning"] || 0) >= 0.45) {
      add("public_meaning_originalist", 0.78 + 0.14 * s.time, "Public meaning at adoption.");
    }
    if (r.time >= 0.15 && l.prec >= 0.2 && (traits["time.common_law_development"] || 0) >= 0.4) {
      add("common_law_constitutionalist", 0.8 + 0.12 * Math.min(s.time, s.prec), "Living development through precedent and accumulated practice.");
    }
    if ((traits["method.common_good"] || 0) >= 0.5) {
      add("common_good_constitutionalist", 0.9, "Direct common-good/classical-law diagnostic.");
    }

    if ((traits["method.institutional_competence"] || 0) >= 0.45) {
      add("legal_process_theorist", 0.88, "Institutional competence and reasoned elaboration.");
    }
    if ((traits["constraint.intent"] || 0) >= 0.5) {
      add("intentionalist", 0.86, "Actual legislative/enactor intent diagnostic.");
    }
    if ((traits["form.proportionality"] || 0) >= 0.5) {
      add("proportionalist", 0.88, "Structured proportionality rather than generic balancing.");
    }

    if ((traits["posture.process_reinforcement"] || 0) >= 0.5) {
      add("elyan", 0.91, "Representation-reinforcement diagnostic.");
    }
    if ((traits["posture.anti_judicial_supremacy"] || 0) >= 0.45 &&
        (traits["posture.popular_authority"] || 0) >= 0.45) {
      add("popular_constitutionalist", 0.91, "Popular constitutional authority beyond mere deference.");
    }
    if ((traits["posture.anti_judicial_supremacy"] || 0) >= 0.45 &&
        (traits["posture.branch_interpretation"] || 0) >= 0.45 &&
        (traits["posture.popular_authority"] || 0) < 0.4) {
      add("departmentalist", 0.88, "Independent branch interpretation without broader popular-authority claim.");
    }
    if (l.post >= 0.2 && (traits["posture.reasonable_disagreement"] || 0) >= 0.45) {
      add("waldronian", 0.86 + 0.1 * s.post, "Democratic legitimacy under reasonable rights disagreement.");
    }
    if (l.post >= 0.2 && (traits["posture.clear_error"] || 0) >= 0.5) {
      add("thayerian", 0.78 + 0.12 * s.post, "Clear-error judicial deference.");
    }
    if ((traits["posture.passive_virtues"] || 0) >= 0.55 && l.post >= 0.1) {
      add("bickelian", 0.82, "Passive virtues and avoidance.");
    }
    if (l.remed >= 0.25 && (traits["posture.passive_virtues"] || 0) >= 0.35) {
      add("minimalist", 0.72 + 0.12 * s.remed, "Narrow/incremental adjudication.");
    }

    if (l.time >= 0.3) add("originalist", 0.56 + 0.34 * s.time, "Historical fixation is a dominant feature.");
    if (r.time >= 0.3) add("living_constitutionalist", 0.56 + 0.34 * s.time, "Evolving constitutional content is a dominant feature.");
    if (l.sorc >= 0.3) add("positivist", 0.56 + 0.34 * s.sorc, "Positive legal sources dominate the Source axis.");
    if (r.sorc >= 0.3) add("nonpositivist", 0.46 + 0.18 * s.sorc, "Non-positivism is clear but the narrower theory is not yet established.", "Non-positivist");
    if (l.cons >= 0.3) add("textualist", 0.56 + 0.34 * s.cons, "Textual constraint is a dominant feature.");
    if (r.cons >= 0.3) add("purposivist", 0.54 + 0.32 * s.cons, "Purpose/open construction dominates and no narrower method is established.");
    if (l.separ >= 0.4) add("formalist", 0.55 + 0.32 * s.separ, "Formal separation of powers is highly distinctive.");
    if (r.separ >= 0.4) add("functionalist", 0.55 + 0.32 * s.separ, "Functional separation of powers is highly distinctive.");

    const pragmatic = (r.cons + r.separ + r.form) / 3;
    if (pragmatic >= 0.32) add("pragmatist", 0.57 + 0.25 * pragmatic, "Open, functional, consequence-sensitive pattern across domains.");

    if ((traits["method.modal_pluralism"] || 0) >= 0.5) {
      add("interpretive_pluralist", 0.9, "Direct methodological-pluralism diagnostic.");
    }

    if (candidates.length === 0) {
      add("interpretive_pluralist", 0.5 + 0.25 * (1 - Math.max(...Object.values(s))), "No single methodology strongly dominates.");
    }

    candidates.sort((a, b) => b.score - a.score);
    return { best: candidates[0], candidates: candidates.slice(0, 5) };
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

  function scoreProfile(profile, scores, traits, identity) {
    if (profile.selectable === false || profile.tier === "lineage") return null;
    if (!requiredTraitsSatisfied(profile, traits)) return null;

    for (const [axisId, minimum] of Object.entries(profile.minAxisSalience || {})) {
      if (salience(scores, axisId) < Number(minimum)) return null;
    }

    const { fit, shape, modeledAxes } = axisProfileFit(profile, scores);
    const traitFit = profileTraitFit(profile, traits);
    const anti = Math.max(0, ...(profile.antiTraits || []).map((trait) => traits[trait] || 0));
    const compatible = (profile.identityIds || []).includes(identity.id);
    const identityBonus = compatible ? 0.09 : ((profile.identityIds || []).length === 0 ? 0 : -0.04);

    let score;
    if (modeledAxes === 0) {
      score = 0.5 + 0.34 * traitFit + identityBonus - 0.22 * anti;
    } else {
      score = 0.62 * fit + 0.18 * shape + 0.15 * traitFit + identityBonus - 0.22 * anti;
    }
    if (profile.tier === "main") score += 0.015;
    return clamp01(score);
  }

  function resolveChampions(scores, traits, identity) {
    const profiles = Array.isArray(global.LAW_PROFILES) ? global.LAW_PROFILES : [];
    const normal = [];
    const catchalls = [];

    for (const profile of profiles) {
      if (profile.tier === "catchall") {
        catchalls.push(profile);
        continue;
      }
      const score = scoreProfile(profile, scores, traits, identity);
      if (score !== null) normal.push({ profile, score });
    }
    normal.sort((a, b) => b.score - a.score);

    const maxSalience = Math.max(...AXIS_IDS.map((axisId) => salience(scores, axisId)));
    let pool = normal;
    const topNormal = normal[0]?.score ?? 0;

    for (const profile of catchalls) {
      const lowTheoryEvidence = Math.max(
        traits["method.case_by_case"] || 0,
        traits["method.anti_grand_theory"] || 0,
        traits["method.low_theory_space"] || 0
      );
      if (maxSalience <= 0.52 || topNormal < 0.61 || lowTheoryEvidence >= 0.5) {
        const base = scoreProfile(profile, scores, traits, identity) ?? 0;
        const score = clamp01(base + 0.16 * lowTheoryEvidence);
        pool = [...pool, { profile, score }].sort((a, b) => b.score - a.score);
      }
    }

    const viable = pool.filter((item) => item.score >= 0.55);
    if (viable.length === 0) return { matches: [], confidence: "low" };

    const first = viable[0];
    const second = viable[1];
    const ambiguous = second && Math.abs(first.score - second.score) < 0.055;
    const matches = ambiguous ? [first, second] : [first];
    const confidence = first.score >= 0.76 && !ambiguous ? "high" : first.score >= 0.63 ? "medium" : "low";
    return { matches, confidence };
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

  function finalizeResult(result, scores, traits) {
    if (global.LAW_RESULT_CONTENT?.assemble) {
      result.resultTitle = global.LAW_RESULT_CONTENT.assemble(result, scores, traits);
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

    const time = axisValue(scores, "time");
    const source = axisValue(scores, "sorc");
    const posture = axisValue(scores, "post");
    const constraint = axisValue(scores, "cons");
    const form = axisValue(scores, "form");
    const precedent = axisValue(scores, "prec");
    const maxSalience = maxSalienceEarly;

    if (time >= 60) {
      if ((traits["time.public_meaning"] || 0) < 0.5) offer("D-ORI1", 92);
      if ((traits["time.principle_originalism"] || 0) >= 0.35 || constraint <= 55 || time < 78) offer("D-ORI3", 86);
      offer("D-ORI2", 62);
    }

    if (source >= 65) offer("D-POS1", 76);

    if (source <= 40) {
      const naturalPlausible = (traits["source.objective_morality"] || 0) >= 0.25;
      const dworkinPlausible = (traits["source.principles_are_law"] || 0) >= 0.25;
      if (naturalPlausible || dworkinPlausible || source <= 28) offer("D-NP1", 88);
      if ((traits["source.moral_impact"] || 0) < 0.5) offer("D-NP4", 84);
      if ((traits["source.principles_are_law"] || 0) < 0.5) offer("D-NP2", 80);
      if (!naturalPlausible && !dworkinPlausible) offer("D-NP3", 48);
    }

    if (posture >= 62) {
      offer("D-MAJ1", 82);
      if ((traits["posture.democratic_legitimacy"] || 0) >= 0.35 || (traits["posture.clear_error"] || 0) >= 0.35) {
        offer("D-WAL1", 78);
      }
    } else if (posture >= 42 && posture <= 68) {
      offer("D-ELY1", 54);
    }

    if (constraint <= 40) {
      if (precedent >= 52 || posture >= 45) offer("D-LP1", 72);
      offer("D-SOC1", form <= 50 ? 70 : 58);
      offer("D-INT1", 64);
    }

    if (form <= 28) offer("D-PROP1", 74);

    if (source <= 35 && constraint <= 40 && posture >= 55) offer("D-CGC1", 42);

    if (maxSalience <= 0.38) {
      offer("D-PLU1", 78);
      if (hasAsked(diagnosticResponses, "D-PLU1") && Number(diagnosticResponses["D-PLU1"]) <= 0) {
        offer("D-OCO1", 76);
      }
    }

    priorities.sort((a, b) => b.priority - a.priority);
    return priorities.length ? byId[priorities[0].id] : null;
  }

  function classify(scored, responses = {}, diagnosticResponses = {}, meta = {}) {
    const scores = Object.fromEntries(AXIS_IDS.map((id) => [id, axisValue(scored, id)]));
    const traits = buildTraits(scores, responses, diagnosticResponses);

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
      }, scores, traits);
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
      }, scores, traits);
    }

    const identityResolution = resolveIdentity(scores, traits);
    const championResolution = resolveChampions(scores, traits, identityResolution.best.identity);
    return finalizeResult({
      identity: identityResolution.best.identity,
      identityScore: identityResolution.best.score,
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
    }, scores, traits);
  }

  global.LAW_PROFILE_EXTRA_DIAGNOSTICS = EXTRA_DIAGNOSTICS;
  global.LAW_CLASSIFIER = Object.freeze({
    MAX_DIAGNOSTICS,
    AXIS_IDS,
    diagnosticBank,
    buildTraits,
    detectMechanicalPattern,
    detectBroadIncoherence,
    resolveIdentity,
    resolveChampions,
    nextDiagnostic,
    classify
  });
})(globalThis);
