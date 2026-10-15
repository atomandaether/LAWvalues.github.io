/* Answer-grounded, axis-local descriptions for the 0.9 instrument.
 * Percentages remain the core scorer's responsibility. This module neither
 * reads the overall title/champion nor derives doctrine from aggregate traits.
 * A shared ID restores catalog copy, never purported individual answer evidence.
 */
(function attachAxisLabels(global) {
  "use strict";
  const AXES = Object.freeze(["sorc", "cons", "time", "prec", "remed", "post", "separ", "form"]);
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object || {}, key);
  const unique = values => [...new Set(values)];
  const isCurrent = version => version === "0.9" || version === "0.9 Beta";
  const catalog = Object.create(null);
  function entry(axis, name, label, explanation, status = "supported") {
    const id = axis + "-" + name;
    catalog[id] = Object.freeze({ id, axis, label, explanation, status });
    return id;
  }
  const common = {};
  for (const axis of AXES) {
    common[axis] = {
      limited: entry(axis, "limited", "Limited Evidence", "There is not enough current, answer-level evidence to identify a method on this axis; a saved percentage alone cannot establish one.", "limited"),
      unavailable: entry(axis, "unavailable", "Limited Evidence", "This axis has no valid available score, so no substantive description can be assigned.", "unavailable"),
      weak: entry(axis, "weak", "Weak", "The relevant answers express little directional commitment; this is an evidence description, not a deduction from a midpoint percentage.", "weak"),
      varied: entry(axis, "varied", "Varied", "Substantial commitments differ across the measured situations, without enough evidence for a single method or a specific contradiction.", "varied")
    };
  }
  const S = {
    positivism: entry("sorc", "legal-positivism", "Legal Positivism", "Recognized enactment and institutional practice determine legal validity, even when the resulting law is morally objectionable."),
    nonpositivism: entry("sorc", "non-positivism", "Non-positivism", "Moral principles can help constitute legal rights or limit legal validity; the evidence does not establish a single narrower account."),
    inclusive: entry("sorc", "inclusive-positivism", "Inclusive Positivism", "Recognized legal sources govern validity, and a system's own accepted rules can incorporate moral standards into its test of law."),
    exclusive: entry("sorc", "exclusive-positivism", "Exclusive Positivism", "Legal validity depends on social sources, with the proposed incorporation of moral correctness into the validity test expressly rejected."),
    natural: entry("sorc", "natural-law", "Natural Law", "Independently true moral standards can themselves determine legal validity, with additional evidence distinguishing that claim from personal moral preference or ordinary positive-law settlement."),
    interpretivism: entry("sorc", "interpretivism", "Interpretivism", "Principles that best fit and morally justify institutional practice help determine existing legal rights in hard cases."),
    legality: entry("sorc", "fullerian-legality", "Fullerian Legality", "The legal character of a system depends on internal requirements of legality, including publicity, prospectivity, and consistency."),
    injustice: entry("sorc", "radbruch-formula", "Radbruch Formula", "Enactments can remain law despite ordinary injustice, but sufficiently extreme injustice can defeat their legal status.", "conditional"),
    impact: entry("sorc", "moral-impact-theory", "Moral-Impact Theory", "Law consists in the changes that institutional actions make to people's actual moral rights and obligations."),
    practice: entry("sorc", "moral-practice-theory", "Moral-Practice Theory", "Legal claims are claims about genuine moral rights and responsibilities, rather than a separate source-defined category of rights."),
    conflict: entry("sorc", "conflicting", "Conflicting", "The answers strongly affirm both that law runs out in unresolved cases and that legal principles already supply the existing answer in those cases; the measured propositions conflict.", "conflicting")
  };
  const C = {
    text: entry("cons", "textualism", "Textualism", "Enacted language and legislative choices constrain legal effect even when unenacted intentions or a broader purpose point elsewhere."),
    context: entry("cons", "contextual-textualism", "Contextual Textualism", "Statutory context and ordinary usage establish the enacted meaning; a contextual reading need not create an exception to that meaning."),
    bargain: entry("cons", "enacted-compromise-textualism", "Enacted-Compromise Textualism", "Express exemptions, deliberate omissions, and legislative bargains remain binding despite the statute's broader purpose."),
    purpose: entry("cons", "purposivism", "Purposivism", "The statute's purpose can justify extending or narrowing its legal effect beyond the language's apparent coverage."),
    intent: entry("cons", "intentionalism", "Intentionalism", "Recovering the enacting lawmakers' actual intention is an express interpretive aim, supported by the treatment of legislative intent in the core answers."),
    dynamic: entry("cons", "dynamic-statutory-interpretation", "Dynamic Statutory Interpretation", "Later legal developments and changed social conditions can shape an open statute's legal meaning without a new enactment."),
    open: entry("cons", "open-construction", "Open Construction", "Purpose, context, or equitable application can affect statutory coverage beyond a strictly text-bound reading; no narrower method is established.")
  };
  const T = {
    original: entry("time", "originalism", "Originalism", "Original constitutional meaning has independent authority that constrains legitimate interpretation, rather than deriving authority only from current precedent."),
    public: entry("time", "original-public-meaning", "Public-Meaning Originalism", "Original constitutional meaning independently governs, and the public meaning at adoption prevails over the drafters' uncommunicated intent."),
    intent: entry("time", "original-intent", "Original-Intent Originalism", "Original constitutional meaning independently governs, with the original authors' communicative intention identifying that meaning."),
    methods: entry("time", "original-methods-originalism", "Original-Methods Originalism", "Independent original authority is implemented using the legal interpretive methods accepted when the Constitution was adopted."),
    law: entry("time", "original-law-originalism", "Original-Law Originalism", "The governing inquiry concerns the law originally made by the Constitution, including its background legal rules and lawful mechanisms of change."),
    construction: entry("time", "constitutional-construction", "New Originalism", "Original meaning remains independently binding while later doctrine may develop within questions that meaning genuinely leaves unresolved.", "conditional"),
    living: entry("time", "living-constitutionalism", "Living Constitutionalism", "Constitutional content may legitimately develop beyond a constraint imposed by original meaning without a formal amendment."),
    commonlaw: entry("time", "common-law-constitutionalism", "Common-Law Constitutionalism", "Accumulated judicial decisions and practical experience can develop constitutional content beyond original constraints."),
    democratic: entry("time", "democratic-constitutionalism", "Democratic Constitutionalism", "Sustained public mobilization and constitutional argument can reshape the constitutional meaning courts enforce over time."),
    transformative: entry("time", "transformative-constitutionalism", "Transformative Constitutionalism", "Constitutional interpretation is an ongoing project of transforming institutions toward constitutional commitments such as democracy, equality, and dignity.")
  };
  const P = {
    stability: entry("prec", "stare-decisis", "Precedential Stability", "Reliance, continuity, and institutional settlement can justify retaining a precedent despite acknowledged interpretive error."),
    reliance: entry("prec", "reliance-based-stare-decisis", "Reliance-Based Stare Decisis", "Embedded institutions, private rights, and established reliance can justify retaining an acknowledged error."),
    statutory: entry("prec", "statutory-stare-decisis", "Statutory Stare Decisis", "Mistaken statutory interpretations may remain in place while the legislature retains responsibility for correction."),
    correction: entry("prec", "precedent-correction", "Precedent Correction", "An independently established constitutional error weighs against adherence, rather than being overcome simply by a prior judicial decision."),
    selective: entry("prec", "selective-stare-decisis", "Selective Stare Decisis", "Statutory settlements remain for legislative correction, while an independently established constitutional error calls for judicial correction.", "conditional")
  };
  const R = {
    party: entry("remed", "party-specific-relief", "Party-Specific Relief", "Relief ordinarily protects the litigants rather than automatically extending to every nonparty affected by the challenged policy."),
    systemic: entry("remed", "systemic-relief", "Systemic Relief", "Relief may extend beyond an individual order when necessary to cure institution-wide or recurring violations."),
    severability: entry("remed", "severability", "Targeted Severance", "Invalid provisions should be removed while independently workable lawful provisions remain in force."),
    structural: entry("remed", "structural-reform", "Structural Reform", "Institution-wide violations can justify institution-wide changes; continuing judicial supervision is a separate question."),
    universal: entry("remed", "universal-relief", "Universal Relief", "A remedy for an unlawful generally applicable policy may also protect affected nonparties."),
    prophylactic: entry("remed", "prophylactic-relief", "Prophylactic Relief", "Protective requirements may exceed the constitutional minimum when necessary to stop recurring violations."),
    tailoring: entry("remed", "remedial-tailoring", "Remedial Tailoring", "Necessary structural repair is combined with preservation of severable lawful provisions and limits on orders against institutions not found responsible.", "conditional")
  };
  const O = {
    restraint: entry("post", "judicial-restraint", "Judicial Restraint", "Courts ordinarily leave reasonable constitutional choices to democratic institutions rather than treating review as ordinary error correction."),
    clear: entry("post", "clear-error-review", "Clear-Error Review", "Courts should uphold a reasonable legislative constitutional judgment and intervene only when it falls outside that reasonable range."),
    democratic: entry("post", "democratic-deference", "Democratic Deference", "Functioning representative institutions have a stronger claim to settle good-faith, reasonable disagreement about rights."),
    rights: entry("post", "independent-rights-review", "Independent Rights Review", "Courts should independently enforce constitutional rights even against sustained electoral support for the challenged measure."),
    representation: entry("post", "representation-reinforcing-review", "Representation-Reinforcing Review", "Ordinary democratic deference gives way to stronger review when exclusion or distortion undermines the political process.", "conditional"),
    dialogic: entry("post", "dialogic-rights-review", "Dialogic Rights Review", "Independent rights scrutiny is combined with a prescribed legislative response rather than an entrenched judicial monopoly on the final word.", "conditional"),
    responsive: entry("post", "responsive-judicial-review", "Responsive Judicial Review", "The intensity of intervention responds to the kind of democratic malfunction and the court's comparative institutional capacity.", "conditional")
  };
  const E = {
    formal: entry("separ", "structural-formalism", "Structural Formalism", "Constitutionally assigned powers and procedures constrain otherwise efficient or convenient institutional arrangements."),
    functional: entry("separ", "functionalism", "Functionalism", "Institutional overlap is acceptable when meaningful checks, accountability, and each branch's core capacity remain intact."),
    nondelegation: entry("separ", "nondelegation-doctrine", "Nondelegation Doctrine", "Some major lawmaking choices must remain with Congress even when a delegation to an agency is perfectly explicit."),
    judicial: entry("separ", "judicial-power-separation", "Judicial-Power Separation", "Specified adjudicative responsibilities belong to courts despite congressional authorization and later judicial review."),
    unitary: entry("separ", "unitary-executive-theory", "Unitary Executive Theory", "Presidential authority entails control over executive judgments, including resistance to legislatively assigned independence."),
    administrative: entry("separ", "administrative-functionalism", "Administrative Functionalism", "Administrative overlap can be permissible while the Constitution's prescribed lawmaking procedures remain binding.", "conditional"),
    supervision: entry("separ", "administrative-constitutionalism", "Administrative Constitutionalism", "Administration requires accountable constitutional supervision without necessarily giving the President control over every lawfully assigned judgment.", "conditional")
  };
  const F = {
    rules: entry("form", "rule-formalism", "Rule Formalism", "General rules constrain decisions even when an individual outcome might be improved by departing from the rule."),
    categorical: entry("form", "categorical-adjudication", "Categorical Adjudication", "Classification under a legal category, rather than open-ended weighing, ordinarily supplies the legal answer."),
    contextual: entry("form", "contextual-judgment", "Contextual Judgment", "Case-specific circumstances and equitable application affect the decision; a formal proportionality method is not established."),
    balancing: entry("form", "contextual-balancing", "Contextual Balancing", "Judges weigh the particular facts and competing considerations rather than resolve the case solely through a fixed category."),
    proportionality: entry("form", "structured-proportionality", "Structured Proportionality", "Rights restrictions are tested through proper purpose, suitability, necessity, and a justified balance of public benefit against rights burden."),
    equity: entry("form", "equitable-exceptions", "Equitable Exceptions", "General rules remain the baseline, with a specifically supported good-cause exception rather than unrestricted case-by-case discretion.", "conditional")
  };

  const CORE = {
    sorc: [["S1",1],["S2",-1],["S3",1],["S4",1],["S5",1],["S6",-1],["S7",1],["S8",-1],["S10",-1],["S11",-1]],
    cons: [["C1",1],["C2",1],["C3",1],["C4",1],["C5",1],["C6",-1],["C7",1],["C8",-1],["C9",1],["C10",-1],["C11",1],["C12",-1],["C13",-1],["C14",-1],["C15",-1],["C17",1],["C18",1]],
    time: [["T1",1],["T2",1],["T3",1],["T4",-1],["T5",-1],["T6",-1],["T7",1],["T8",1],["T9",-1],["T10",1],["T11",1],["T12",-1]],
    prec: [["P2",1],["P3",1],["P4",1],["P5",1],["P6",-1],["P7",1],["P9",1],["P10",-1],["P11",-1],["P12",1]],
    remed: [["R1",-1],["R2",-1],["R3",-1],["R4",-1],["R5",-1],["R6",1],["R7",1],["R8",-1],["R9",-1],["R10",-1],["R11",1]],
    post: [["O1",1],["O2",1],["O3",-1],["O4",-1],["O5",1],["O6",1],["O7",1],["O8",1],["O9",1],["O10",-1],["O11",-1],["O12",1],["O13",-1]],
    separ: [["E1",-1],["E2",-1],["E3",1],["E4",1],["E5",-1],["E6",1],["E7",-1]],
    form: [["F1",1],["F3",1],["F4",1],["F5",-1],["F6",-1],["F7",1],["F8",1],["F9",-1]]
  };
  const DIAGNOSTICS = {
    sorc: ["D-POS1","D-POS2","D-NP1","D-NL2","D-NP2","D-NP3","D-NP4","D-NP5","D-NP6","D-AUS1","D-KEL1","D-SHA1"],
    cons: ["D-TXT1","D-INT1","D-INT2","D-KAT1","D-DYN1","D-CAL1"],
    time: ["D-ORI1","D-ORI2","D-ORI3","D-ORI4","D-ORI5","D-ORI6","D-ORI7","D-LIV1","D-LIV2","D-ACK1","D-HAR1"],
    prec: ["D-PREC1"], remed: ["D-BRAY1","D-UNI1","D-MON1","D-LEV1","D-PIL1"],
    post: ["D-ELY1","D-WAL1","D-GRD1","D-RESP1"],
    separ: ["D-SEP1","D-SEP2","D-SEP3","D-SEP4","D-MET1"], form: ["D-PROP1","D-TXT2"]
  };
  function numeric(raw) {
    if (typeof raw !== "number" && typeof raw !== "string") return null;
    if (typeof raw === "string" && !/^-?\d+(?:\.\d+)?$/.test(raw)) return null;
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  }
  function scoreValue(scores, axis) {
    if (!own(scores, axis)) return null;
    const raw = scores[axis];
    const value = numeric(raw && typeof raw === "object" ? raw.score : raw);
    return value !== null && value >= 0 && value <= 100 ? value : null;
  }
  function result(id, evidenceIds = []) {
    const item = catalog[id];
    return { id, label: item.label, explanation: item.explanation, status: item.status,
      evidenceIds: unique(evidenceIds) };
  }
  function evidence(responses, diagnosticResponses) {
    const value = id => {
      const source = id.startsWith("D-") ? diagnosticResponses : responses;
      if (!own(source, id)) return null;
      const raw = typeof source[id] === "number" ? source[id] : null;
      return raw !== null && Number.isInteger(raw) && raw >= -3 && raw <= 3 ? raw : null;
    };
    const signed = (id, sign = 1) => (value(id) ?? 0) * sign;
    const support = (rules, threshold = 2) => rules.filter(([id, sign]) => signed(id, sign) >= threshold).map(([id]) => id);
    const any = (rules, threshold = 2) => support(rules, threshold).length > 0;
    const against = rules => rules.some(([id, sign]) => signed(id, sign) <= -2);
    const positive = ids => ids.map(id => [id, 1]);
    return { value, signed, support, any, against, positive };
  }
  function describeAxis(axis, scores, responses, diagnosticResponses, version) {
    if (scoreValue(scores, axis) === null) return result(common[axis].unavailable);
    if (!isCurrent(version)) return result(common[axis].limited);
    const e = evidence(responses, diagnosticResponses);
    const p = e.positive, v = e.signed, sup = e.support;
    const candidates = [];
    // Rank distinguishes directly discriminating diagnostics and measured
    // conditional rules from generic examples. Equal candidates are coarsened,
    // never decided by catalog order, headline identity, or champion.
    const add = (id, ids, rank = 1, family = null) => candidates.push({ id, ids: unique(ids), rank, family });
    const core = (id, rules, options = {}) => {
      const ids = sup(rules);
      if (ids.length >= (options.count || 2) && !e.against(options.block || [])) add(id, ids, options.rank || 1, options.family);
    };
    const diagnostic = (id, diagnosticId, sign, rules, options = {}) => {
      const ids = sup(rules, 1);
      if (v(diagnosticId, sign) >= 2 && ids.length && !e.against(options.block || [])) add(id, [diagnosticId, ...ids], options.rank || 2, options.family);
    };
    if (axis === "sorc") {
      if (v("S7") >= 2 && v("S8") >= 2) return result(S.conflict, ["S7", "S8"]);
      const positive = p(["S1","S3","S4","S5","S7"]);
      const validity = [["S1",1],["S7",1],["S10",-1],["S11",-1]];
      const positiveDiagnostic = sup(validity,1).length ? [...validity,...positive] : [];
      const moral = p(["S2","S6","S8","S10","S11"]);
      const objective = p(["S10","S11"]);
      diagnostic(S.inclusive, "D-POS1", 1, positiveDiagnostic, { family: "positive", block: objective.map(([id]) => [id,-1]) });
      diagnostic(S.exclusive, "D-POS1", -1, positiveDiagnostic, { family: "positive", block: objective.map(([id]) => [id,-1]) });
      if (!e.against([...objective,["D-NL2",1]]) && ((sup(objective).length === 2 && v("D-NP1") >= 2) || (v("D-NL2") >= 2 && sup(objective,1).length))) {
        add(S.natural, [...sup(objective,1), ...(v("D-NL2")>=2?["D-NL2"]:["D-NP1"])], 2, "moral");
      }
      diagnostic(S.interpretivism, "D-NP2", 1, [["S8",1]], { family: "moral", block: [["S7",-1],["S8",1]] });
      diagnostic(S.legality, "D-NP3", 1, moral, { family: "moral" });
      diagnostic(S.injustice, "D-NP6", 1, [["S2",1]], { family: "moral", block: [["S2",1]] });
      diagnostic(S.impact, "D-NP4", 1, moral, { family: "moral" });
      diagnostic(S.practice, "D-NP5", 1, moral, { family: "moral" });
      if (!candidates.length) {
        const left = unique([...sup(positive),...sup(validity)]), right = sup(moral);
        const hasSourceValidity = sup(p(["S1","S7"])).length || (sup(validity).length && sup(positive).length);
        if (left.length >= 2 && hasSourceValidity && !right.length) add(S.positivism,left,1,"positive");
        if (right.length >= 2 && !left.length) add(S.nonpositivism,right,1,"moral");
      }
    } else if (axis === "cons") {
      const context = [["C5",1],["C13",-1]];
      const bargain = p(["C2","C11","C18"]);
      const text = p(["C1","C2","C7","C9","C11","C17","C18"]);
      const purpose = p(["C12","C14","C15"]);
      core(C.context,context,{family:"text",block:[...context,["D-TXT1",1]]});
      core(C.bargain,bargain,{family:"text",block:bargain});
      diagnostic(C.context,"D-TXT1",1,[...context,...text],{family:"text",block:context});
      core(C.purpose,purpose,{family:"open",block:[["C15",1]]});
      diagnostic(C.intent,"D-INT1",1,[["C7",-1],["C17",-1],["C15",1]],{family:"open"});
      diagnostic(C.dynamic,"D-DYN1",1,purpose,{family:"open"});
      if (!candidates.length) {
        if (sup(text).length>=2 && !sup(purpose).length) add(C.text,sup(text),1,"text");
        if (sup(purpose).length>=2 && !sup(text).length) add(C.open,sup(purpose),1,"open");
      }
    } else if (axis === "time") {
      if (v("T11")>=2 && v("T12")>=2) return result(common.time.varied,["T11","T12"]);
      const fixed = p(["T1","T2","T3","T11"]), living = p(["T4","T5","T6","T12"]);
      const fixedIds = sup(fixed), evolvingIds = sup(living);
      const independent = v("T11")>-2 && (v("T11")>=2 || fixedIds.length>=2 || (v("D-ORI7")>=2 && sup(fixed,1).length));
      const fixedAllowed = v("T11")>-2 && evolvingIds.length===0;
      const livingAllowed = fixedIds.length===0;
      if (fixedAllowed) {
        if (independent && (fixedIds.length>=2 || (v("D-ORI7")>=2 && sup(fixed,1).length))) add(T.original,fixedIds.length?fixedIds:["D-ORI7",...sup(fixed,1)],1,"fixed");
        const publicAllowed = v("D-ORI1")>-2 && v("T7")>-2 && (v("D-ORI7")>-2 || v("T11")>=2);
        if (publicAllowed && independent && v("T7")>=2) add(T.public,[...fixedIds,"T7",...(v("D-ORI7")>=2?["D-ORI7"]:[])],2,"fixed");
        if (publicAllowed) diagnostic(T.public,"D-ORI7",1,fixed,{family:"fixed"});
        if (publicAllowed && independent) diagnostic(T.public,"D-ORI1",1,fixed,{family:"fixed"});
        if (independent && v("T7")<2 && v("D-ORI1")<2) {
          diagnostic(T.intent,"D-ORI1",-1,fixed,{family:"fixed"});
          diagnostic(T.intent,"D-ORI4",1,fixed,{family:"fixed"});
        }
        // These diagnostics name a temporal method; compatible independent
        // authority must be established separately by the revised core.
        if (independent) {
          diagnostic(T.methods,"D-ORI2",1,fixed,{family:"fixed"});
          diagnostic(T.law,"D-ORI6",1,fixed,{family:"fixed"});
          diagnostic(T.construction,"D-ORI3",1,fixed,{family:"fixed",rank:3});
        }
      }
      if (livingAllowed) {
        core(T.living,living,{family:"living"});
        if (v("T12")>=2 && v("P3")>=2) add(T.commonlaw,["T12","P3"],2,"living");
        diagnostic(T.democratic,"D-LIV1",1,living,{family:"living"});
        diagnostic(T.transformative,"D-LIV2",1,living,{family:"living"});
      }
    } else if (axis === "prec") {
      const reliance = p(["P4","P12"]), statute = p(["P2","P12"]), settlement = p(["P5","P7"]);
      if (sup(statute).length===2 && v("P6")>=2 && v("P4")<2) add(P.selective,["P2","P12","P6"],3,"conditional");
      core(P.reliance,reliance,{family:"stability",block:[["P6",-1],...reliance]});
      core(P.statutory,statute,{family:"stability",block:statute});
      core(P.stability,settlement,{family:"stability",block:[["P6",-1]]});
      if (v("P6")>=2 && e.any([["P4",-1],["P5",-1],["P7",-1]]) && v("P4")<2) add(P.correction,["P6",...sup([["P4",-1],["P5",-1],["P7",-1]])],1,"correction");
      diagnostic(P.correction,"D-PREC1",1,[["P6",1]],{family:"correction",block:[["P4",-1]]});
    } else if (axis === "remed") {
      const structural = p(["R3","R4","R5"]), severable = p(["R6","R7"]);
      if (sup(structural).length>=2 && sup(severable).length && v("R8")<=-2) add(R.tailoring,[...sup(structural),...sup(severable),"R8"],3,"tailored");
      core(R.party,[["R1",-1],["R2",-1]],{family:"narrow",block:[["R1",-1],["R2",-1],["D-BRAY1",1]]});
      diagnostic(R.party,"D-BRAY1",1,[["R1",-1],["R2",-1]],{family:"narrow",block:[["R1",-1],["R2",-1]]});
      core(R.severability,severable,{family:"narrow",block:severable});
      core(R.structural,structural,{family:"broad",block:[["R3",1],["R5",1]]});
      core(R.universal,p(["R1","R2"]),{family:"broad",block:[["R1",1],["R2",1],["D-UNI1",1]]});
      diagnostic(R.universal,"D-UNI1",1,p(["R1","R2"]),{family:"broad",block:[["R1",1],["R2",1]]});
      core(R.prophylactic,p(["R9","R10"]),{family:"broad",block:[["R9",1],["R10",1],["D-MON1",1]]});
      diagnostic(R.prophylactic,"D-MON1",1,p(["R9","R10"]),{family:"broad",block:[["R9",1],["R10",1]]});
    } else if (axis === "post") {
      const defer = p(["O1","O2","O8","O9"]), rights = p(["O4","O10","O11"]);
      core(O.clear,p(["O1","O9"]),{family:"defer",block:[["O1",1],["O9",1]]});
      core(O.democratic,p(["O2","O8"]),{family:"defer",block:[["O2",1],["O8",1],["D-WAL1",1]]});
      diagnostic(O.democratic,"D-WAL1",1,p(["O2","O8"]),{family:"defer",block:[["O2",1],["O8",1]]});
      core(O.rights,rights,{family:"rights",block:[["O4",1]]});
      diagnostic(O.representation,"D-ELY1",1,defer,{rank:3,family:"conditional"});
      diagnostic(O.responsive,"D-RESP1",1,[...defer,...rights],{rank:3,family:"conditional"});
      diagnostic(O.dialogic,"D-GRD1",1,[["O6",1]],{rank:3,family:"conditional",block:[["O6",1]]});
    } else if (axis === "separ") {
      const procedure = [["E1",-1],["E4",1],["E6",1]], functional = p(["E5","E7"]);
      if (v("E5")>=2 && sup(procedure).length>=2) add(E.administrative,["E5",...sup(procedure)],3,"conditional");
      core(E.formal,procedure,{family:"formal"});
      core(E.functional,functional,{family:"functional",block:functional});
      diagnostic(E.nondelegation,"D-SEP3",1,[["E3",1]],{family:"formal",block:[["E3",1]]});
      diagnostic(E.judicial,"D-SEP4",1,[["E5",-1]],{family:"formal",block:[["E5",-1]]});
      diagnostic(E.unitary,"D-SEP1",-1,[["E2",-1]],{family:"formal",block:[["E2",-1],["D-MET1",-1]]});
      diagnostic(E.supervision,"D-MET1",1,p(["E2","E5","E7"]),{rank:3,family:"conditional",block:[["D-SEP1",1]]});
    } else if (axis === "form") {
      const rules = p(["F1","F3","F7","F8"]), contextual = p(["F5","F9"]);
      if (v("F6")>=2 && sup(rules).length>=2 && v("F5")<=-1) add(F.equity,["F6","F5",...sup(rules)],3,"conditional");
      if (v("F4")>=2 && sup(rules).length && v("F5")<2) add(F.categorical,["F4",...sup(rules)],1,"rules");
      core(F.rules,rules,{family:"rules",block:[["F5",-1]]});
      core(F.balancing,contextual,{family:"context",block:[["F4",-1]]});
      diagnostic(F.proportionality,"D-PROP1",1,contextual,{rank:2,family:"context",block:[["F4",-1]]});
    }

    if (candidates.length) {
      const highest = Math.max(...candidates.map(candidate => candidate.rank));
      const best = candidates.filter(candidate => candidate.rank === highest);
      const ids = unique(best.flatMap(candidate => candidate.ids));
      const distinct = unique(best.map(candidate => candidate.id));
      if (distinct.length === 1) return result(distinct[0],ids);
      const families = unique(best.map(candidate => candidate.family));
      if (families.length === 1) {
        const shared = {
          sorc: {positive:S.positivism,moral:S.nonpositivism},
          cons: {text:C.text,open:C.open}, time: {fixed:T.original,living:T.living},
          prec: {stability:P.stability,correction:P.correction},
          remed: {narrow:R.party,broad:R.systemic}, post: {defer:O.restraint,rights:O.rights},
          separ: {formal:E.formal,functional:E.functional}, form: {rules:F.rules,context:F.contextual}
        }[axis]?.[families[0]];
        if (shared) return result(shared,ids);
      }
      return result(common[axis].varied,ids);
    }
    const questions = new Map((global.LAW_QUESTIONS || []).map(question => [question.id, question]));
    // Weak/Varied measure the axis's substantive commitments. A strongly held
    // semantic or institutional hint is not itself a strong doctrinal stance.
    const hints = {sorc:["S3","S4","S5"],cons:["C8"],time:["T7","T8","T9","T10"],prec:["P10","P11"],post:["O3","O5","O13"]};
    const answered = CORE[axis].filter(([id]) => e.value(id) !== null &&
      questions.get(id)?.evidenceKinds?.[axis] !== "hint" && !(hints[axis] || []).includes(id));
    const diagnosticIds = DIAGNOSTICS[axis].filter(id => e.value(id) !== null);
    if (answered.length < 2) return result(common[axis].limited,answered.map(([id])=>id));
    if (answered.every(([id])=>Math.abs(e.value(id))<=1) && diagnosticIds.every(id=>Math.abs(e.value(id))<=1)) {
      return result(common[axis].weak,answered.map(([id])=>id));
    }
    // A high percentage cannot supply doctrine where a direct answer gate
    // failed. Temporal history/semantics hints never become Originalism here.
    const strong = answered.filter(([id])=>Math.abs(e.value(id))>=2).map(([id])=>id);
    if (axis === "cons" || axis === "form") {
      const left = sup(answered), right = sup(answered.map(([id,sign])=>[id,-sign]));
      const pair = axis === "cons" ? [C.text,C.open] : [F.rules,F.contextual];
      if (left.length>=2 && !right.length) return result(pair[0],left);
      if (right.length>=2 && !left.length) return result(pair[1],right);
    }
    if (strong.length < 2) return result(common[axis].limited,strong);
    return result(common[axis].varied,[...strong,...diagnosticIds.filter(id=>Math.abs(e.value(id))>=2)]);
  }
  function describeAll({ scores = {}, responses = {}, diagnosticResponses = {}, version } = {}) {
    return Object.fromEntries(AXES.map(axis => [axis,describeAxis(axis,scores,responses,diagnosticResponses,version)]));
  }
  function toIds(descriptions) {
    const ids = AXES.map(axis => descriptions?.[axis]?.id);
    if (ids.some((id,index) => typeof id !== "string" || !own(catalog,id) || catalog[id].axis !== AXES[index])) return null;
    return ids.join(",");
  }
  function fromIds({ ids, scores = {}, version } = {}) {
    if (!isCurrent(version) || typeof ids !== "string" || ids.length > 600) return null;
    const list = ids.split(",");
    if (list.length !== AXES.length || list.some((id,index) => !own(catalog,id) || catalog[id].axis !== AXES[index])) return null;
    // Score availability is part of the safe contract; an absent score cannot
    // be turned into a doctrinal claim by attaching an otherwise valid ID.
    if (list.some((id,index) => (scoreValue(scores,AXES[index]) === null) !== (id === common[AXES[index]].unavailable))) return null;
    return Object.fromEntries(AXES.map((axis,index)=>[axis,result(list[index])]));
  }
  Object.freeze(catalog);
  global.LAW_AXIS_LABELS = Object.freeze({ describeAll, toIds, fromIds, catalog, axisIds: AXES });
})(globalThis);
