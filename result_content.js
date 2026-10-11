/* Public result-title grammar: [modifier] [real jurisprudential identity] [phrase]. */
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
    thayerian: "You favor strong judicial deference under constitutional uncertainty: a judge's preferred reading is not enough to invalidate a legislature's reasonable one.",
    waldronian: "You emphasize democratic legitimacy when rights-respecting citizens reasonably disagree, resisting automatic judicial finality.",
    popular_constitutionalist: "You reject exclusive judicial ownership of constitutional meaning and leave a continuing constitutional role for the people and democratic politics.",
    departmentalist: "You reject judicial interpretive monopoly and allow the political branches to maintain their own good-faith constitutional judgments.",
    elyan: "You favor ordinary democratic deference but much stronger judicial intervention when the political process itself is blocked, distorted, or exclusionary.",
    bickelian: "You take the counter-majoritarian difficulty seriously and favor strategic avoidance or delay when courts need not immediately settle a divisive constitutional question.",
    minimalist: "You prefer narrow, incompletely theorized decisions that resolve the case without unnecessarily settling broader controversies.",
    formalist: "You place unusual weight on legal categories, assigned powers, and prescribed institutional boundaries even when a looser arrangement might be more convenient.",
    functionalist: "You evaluate institutional arrangements mainly by workability, accountability, checks, and preservation of each branch's core role rather than categorical separation.",
    proportionalist: "You prefer structured proportionality and contextual weighing to categorical rules when rights or principles conflict."
  });

  /*
    One substantive feature pool feeds both joke slots.

    Selection order is deliberate:
      1. the classifier chooses the nearest real jurisprudential identity;
      2. that noun spends the traits it already communicates;
      3. the strongest remaining feature becomes the trailing phrase;
      4. the next strongest genuinely different feature becomes the modifier.

    The wording is intentionally a critic's affectionate caricature. The internal
    feature IDs and evidence remain neutral and precise.
  */
  const FEATURES = Object.freeze([
    {
      id:"source_positive", group:"source", axis:"sorc", direction:"left",
      primaryTag:"source.positive_sources", tags:["source.positive_sources"],
      modifier:"Morality-\u201cblind\u201d",
      phrase:"who insists \u201cevil\u201d and \u201cillegal\u201d are different complaints",
      explanation:"You sharply separate legal validity from moral merit; the joke is the non-positivist complaint that this quarantines morality from the question of what law is."
    },
    {
      id:"law_runs_out", group:"source",
      primaryTag:"source.law_runs_out", tags:["source.law_runs_out"],
      supportAxis:{axis:"sorc",direction:"left"},
      modifier:"Gap-friendly",
      phrase:"who thinks judges sometimes have to make it up",
      explanation:"You think genuinely novel cases can exhaust the existing law, leaving judges to create a rule rather than discover an already-existing legal answer."
    },
    {
      id:"principles_as_law", group:"source",
      supportAxis:{axis:"sorc",direction:"right"},
      primaryTag:"source.principles_are_law", tags:["source.principles_are_law","source.fit_and_justification","source.right_answer"],
      modifier:"Principle-smuggling",
      phrase:"who keeps finding law nobody enacted",
      explanation:"You give unwritten legal principles real legal force rather than treating them as merely moral reasons outside the law."
    },
    {
      id:"objective_morality", group:"source",
      supportAxis:{axis:"sorc",direction:"right"},
      primaryTag:"source.objective_morality", tags:["source.objective_morality","source.moral_constraint"],
      modifier:"Bench-moralizing",
      phrase:"who brought moral philosophy to a legal-text fight",
      explanation:"You are unusually willing to treat objective moral requirements as part of the legal question itself."
    },
    {
      id:"textual_constraint", group:"constraint", axis:"cons", direction:"left",
      primaryTag:"constraint.textual", tags:["constraint.textual","constraint.textual_axis"],
      modifier:"Text-worshipping",
      phrase:"who thinks the words are, annoyingly, legally binding",
      explanation:"Enacted language puts unusually hard limits on what you think judges may do."
    },
    {
      id:"contextual_text", group:"constraint",
      supportAxis:{axis:"cons",direction:"left"},
      primaryTag:"constraint.contextual_textualism", tags:["constraint.contextual_textualism"],
      modifier:"Dictionary-dodging",
      phrase:"who thinks the dictionary forgot context exists",
      explanation:"You resist isolated dictionary literalism and read legal language in its linguistic and legal context."
    },
    {
      id:"enacted_bargain", group:"constraint",
      supportAxis:{axis:"cons",direction:"left"},
      primaryTag:"constraint.enacted_bargain", tags:["constraint.enacted_bargain"],
      modifier:"Fine-print-loving",
      phrase:"who makes Congress live with the loophole it wrote",
      explanation:"You give unusual weight to enacted compromises, exceptions, and omissions even when they frustrate a broader statutory goal."
    },
    {
      id:"purposive", group:"constraint", axis:"cons", direction:"right",
      primaryTag:"constraint.purpose", tags:["constraint.purpose","constraint.open_construction","constraint.anti_evasion"],
      modifier:"Text-hating",
      phrase:"who apparently can\u2019t read",
      explanation:"You are comparatively willing to let statutory purpose and practical sense overcome a rigid reading of enacted words."
    },
    {
      id:"intent", group:"constraint",
      supportAxis:{axis:"cons",direction:"right"},
      primaryTag:"constraint.intent", tags:["constraint.intent"],
      modifier:"Mind-reading",
      phrase:"who wants to know what Congress was thinking",
      explanation:"Actual legislative or enactor intent matters to you independently of text and objective statutory purpose."
    },
    {
      id:"fixed_meaning", group:"time", axis:"time", direction:"left",
      primaryTag:"time.fixation", tags:["time.fixation","time.semantic_fixation"],
      modifier:"Dead-hand-bound",
      phrase:"who lets dead people freeze the meaning",
      explanation:"You treat legal meaning as substantially fixed at adoption rather than updated by later usage or values."
    },
    {
      id:"living_meaning", group:"time", axis:"time", direction:"right",
      primaryTag:"time.living_content", tags:["time.living_content"],
      modifier:"Amendment-optional",
      phrase:"who thinks formal amendment is apparently optional",
      explanation:"You accept genuine constitutional development without requiring every change in constitutional content to pass through formal amendment."
    },
    {
      id:"historical_practice", group:"time",
      supportAxis:{axis:"time",direction:"left"},
      primaryTag:"time.early_practice", tags:["time.early_practice","time.expected_applications"],
      modifier:"Ouija-board-guided",
      phrase:"who asks the dead how they did it",
      explanation:"Historical applications and longstanding early governmental practice carry unusual evidentiary weight for you."
    },
    {
      id:"precedent_stability", group:"precedent", axis:"prec", direction:"left",
      primaryTag:"precedent.stability", tags:["precedent.stability","precedent.reliance","precedent.settlement"],
      modifier:"Error-hoarding",
      phrase:"who thinks being wrong for 50 years counts for something",
      explanation:"Reliance, settlement, and legal continuity make you unusually reluctant to discard an established decision even when it was mistaken."
    },
    {
      id:"precedent_correction", group:"precedent", axis:"prec", direction:"right",
      primaryTag:"precedent.correction", tags:["precedent.correction","precedent.correctness_first"],
      modifier:"Case-burning",
      phrase:"who thinks old mistakes deserve no retirement plan",
      explanation:"You put correctness ahead of preserving precedent and are unusually willing to overrule decisions you think are seriously wrong."
    },
    {
      id:"statutory_precedent", group:"precedent",
      supportAxis:{axis:"prec",direction:"left"},
      primaryTag:"precedent.statutory", tags:["precedent.statutory"],
      modifier:"Congress-can-fix-it",
      phrase:"who makes Congress clean up the Court\u2019s old mistakes",
      explanation:"You give extra staying power to statutory precedent because the legislature can amend the statute itself."
    },
    {
      id:"narrow_remedies", group:"remedies", axis:"remed", direction:"left",
      primaryTag:"remedies.party_specific", tags:["remedies.party_specific","remedies.incremental"],
      modifier:"Remedy-stingy",
      phrase:"who brought a Band-Aid to a house fire",
      explanation:"You generally want judicial relief confined to the parties and violation actually before the court."
    },
    {
      id:"structural_remedies", group:"remedies", axis:"remed", direction:"right",
      primaryTag:"remedies.structural", tags:["remedies.structural","remedies.supervision"],
      modifier:"Court-running",
      phrase:"who thinks the judge should just run the place",
      explanation:"Once a systemic violation is established, you are comparatively comfortable with restructuring institutions and continuing judicial supervision."
    },
    {
      id:"universal_relief", group:"remedies",
      supportAxis:{axis:"remed",direction:"right"},
      primaryTag:"remedies.universal", tags:["remedies.universal"],
      modifier:"One-lawsuit-fixes-all",
      phrase:"who refuses to make everyone sue separately",
      explanation:"You are willing to extend relief beyond the named plaintiff when the same unlawful rule affects many people."
    },
    {
      id:"severability", group:"remedies",
      supportAxis:{axis:"remed",direction:"left"},
      primaryTag:"remedies.severability", tags:["remedies.severability"],
      modifier:"Statute-surgery",
      phrase:"who amputates the bad part and sends the rest home",
      explanation:"You prefer cutting out the invalid provision while preserving the remainder of a workable law."
    },
    {
      id:"prophylactic", group:"remedies",
      supportAxis:{axis:"remed",direction:"right"},
      primaryTag:"remedies.prophylactic", tags:["remedies.prophylactic"],
      modifier:"Extra-rule-writing",
      phrase:"who writes an extra rule because the right needs backup",
      explanation:"You allow courts to create protective rules beyond the bare constitutional minimum when needed to make the underlying right effective."
    },
    {
      id:"majoritarian", group:"posture", axis:"post", direction:"left",
      primaryTag:"posture.majoritarian", tags:["posture.majoritarian","posture.democratic_legitimacy"],
      modifier:"Rights-on-honor-system",
      phrase:"who lets the majority grade its own rights homework",
      explanation:"You give elected government unusually broad room when constitutional meaning is reasonably contestable."
    },
    {
      id:"countermajoritarian", group:"posture", axis:"post", direction:"right",
      primaryTag:"posture.countermajoritarian", tags:["posture.countermajoritarian","posture.rights_trumps"],
      modifier:"Democracy-vetoing",
      phrase:"who trusts judges with democracy\u2019s emergency brake",
      explanation:"You are unusually willing to have courts enforce constitutional rights against sustained majority opposition."
    },
    {
      id:"separation_formal", group:"separation", axis:"separ", direction:"left",
      primaryTag:"separation.formalist", tags:["separation.formalist","separation.prescribed_process","separation.nondelegation"],
      modifier:"Org-chart-worshipping",
      phrase:"who thinks the boxes on the diagram are sacred",
      explanation:"You are unusually strict about constitutionally assigned institutional powers and prescribed procedures."
    },
    {
      id:"separation_functional", group:"separation", axis:"separ", direction:"right",
      primaryTag:"separation.functionalist", tags:["separation.functionalist","separation.combined_functions"],
      modifier:"Separation-\u201coptional\u201d",
      phrase:"who thinks separation of powers is more of a suggestion",
      explanation:"You tolerate institutional overlap when the arrangement remains workable, accountable, and preserves each branch\u2019s core role."
    },
    {
      id:"rules", group:"form", axis:"form", direction:"left",
      primaryTag:"form.rules", tags:["form.rules","form.predictability","form.edge_case_tolerance"],
      modifier:"Rule-worshipping",
      phrase:"who would rather be predictably wrong than unpredictably fair",
      explanation:"You accept some ugly edge cases as the price of general rules that constrain decision-makers."
    },
    {
      id:"anti_discretion", group:"form",
      primaryTag:"form.anti_discretion", tags:["form.anti_discretion"],
      modifier:"Judgment-allergic",
      phrase:"who thinks judges exercising judgment is the problem",
      explanation:"Your attraction to rules is especially driven by fear of arbitrary, biased, or inconsistent discretion."
    },
    {
      id:"balancing", group:"form", axis:"form", direction:"right",
      primaryTag:"form.balancing", tags:["form.balancing"],
      modifier:"Vibes-balancing",
      phrase:"who turns every rule into a vibes check",
      explanation:"You prefer contextual weighing of competing considerations over categorical rules in hard cases."
    },
    {
      id:"equitable_exceptions", group:"form",
      supportAxis:{axis:"form",direction:"right"},
      primaryTag:"form.equitable_exception", tags:["form.equitable_exception","form.cliff_skepticism"],
      modifier:"Exception-addicted",
      phrase:"who thinks every hard case deserves a loophole",
      explanation:"You resist rigid rules when their margins create outcomes you regard as arbitrary or unfair."
    },
    {
      id:"proportionality", group:"form",
      supportAxis:{axis:"form",direction:"right"},
      primaryTag:"form.proportionality", tags:["form.proportionality"],
      modifier:"Balancing-with-homework",
      phrase:"who makes balancing wear a checklist",
      explanation:"You favor structured proportionality rather than free-form all-things-considered balancing."
    },
    {
      id:"pragmatic_consequences", group:"method",
      broadTag:"method.consequences",
      primaryTag:"method.consequences", tags:["method.consequences","method.workability"],
      modifier:"Policy-playing",
      phrase:"who keeps asking what happens after the opinion",
      explanation:"Practical consequences and institutional workability matter unusually strongly to your legal reasoning."
    },
    {
      id:"legal_process", group:"method",
      supportAxis:{axis:"cons",direction:"right"},
      primaryTag:"method.institutional_competence", tags:["method.institutional_competence","method.reasoned_elaboration"],
      modifier:"Process-pilled",
      phrase:"who asks whose job it is before asking who is right",
      explanation:"Institutional role and competence are part of the legal answer for you, not merely afterthoughts."
    },
    {
      id:"low_theory", group:"method",
      broadTag:"method.low_theory_space",
      primaryTag:"method.case_by_case", tags:["method.case_by_case","method.anti_grand_theory","method.low_theory_space"],
      modifier:"Vibes-based",
      phrase:"who calls it case-by-case because \u201cI know it when I see it\u201d sounded worse",
      explanation:"You prefer concrete, fact-sensitive judgment over forcing every hard case through one comprehensive theory."
    },
    {
      id:"realism", group:"method",
      primaryTag:"realism.underdetermination", tags:["realism.underdetermination","realism.extra_doctrinal","realism.empirical_prediction"],
      modifier:"Doctrine-cynical",
      phrase:"who thinks the holding is only half the story",
      explanation:"You think formal legal materials often underdetermine hard cases and that extra-doctrinal facts help explain what courts actually do."
    }
  ]);

  const MODIFIERS = Object.freeze(FEATURES.map((feature) => Object.freeze({
    id: feature.id,
    text: feature.modifier,
    axis: feature.axis || null,
    direction: feature.direction || null,
    adds: feature.tags,
    explanation: feature.explanation
  })));

  const PHRASES = Object.freeze(FEATURES.map((feature) => Object.freeze({
    id: feature.id,
    text: feature.phrase,
    axis: feature.axis || null,
    direction: feature.direction || null,
    adds: feature.tags,
    explanation: feature.explanation
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

  function clamp01(value) { return Math.max(0, Math.min(1, Number(value) || 0)); }

  function axisScore(scores,id) {
    const raw=scores?.[id];
    const value=typeof raw==="object" && raw!==null ? raw.score : raw;
    return Math.max(0,Math.min(100,Number(value) || 50));
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

  function traitValues(feature,traits) {
    return (feature.tags||[])
      .map(tag=>clamp01(traits?.[tag]))
      .filter(value=>value>0)
      .sort((a,b)=>b-a);
  }

  function featureEvidence(feature,scores,traits) {
    const axis=feature.axis ? directionStrength(scores,feature.axis,feature.direction) : 0;
    const values=traitValues(feature,traits);
    const direct=values[0] || 0;
    const corroboration=values[1] || 0;
    const breadth=values.length>1
      ? values.reduce((sum,value)=>sum+value,0)/values.length
      : direct;
    const base=Math.max(axis,direct);
    return clamp01(base + 0.09*corroboration + 0.05*Math.min(base,breadth));
  }

  function aggregateFeatureEvidence(feature,traitEvidence={}) {
    const coreSupport={};
    const diagnosticSupport={};
    for (const tag of feature.tags || []) {
      const evidence=traitEvidence?.[tag];
      if(!evidence) continue;
      for (const [id,value] of Object.entries(evidence.coreSupport || {})) {
        coreSupport[id]=Math.max(Number(coreSupport[id])||0,Number(value)||0);
      }
      for (const [id,value] of Object.entries(evidence.diagnosticSupport || {})) {
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

  function evidenceQuality(feature,scores,traits,traitEvidence={}) {
    if(feature.axis) {
      return {eligible:true,confidence:1,effectiveBreadth:8,coreCount:null,diagnosticCount:null};
    }

    const direct=aggregateFeatureEvidence(feature,traitEvidence);
    const supportAxis=feature.supportAxis
      ? directionStrength(scores,feature.supportAxis.axis,feature.supportAxis.direction)
      : 0;
    const broad=feature.broadTag ? clamp01(traits?.[feature.broadTag]) : 0;

    const effectiveBreadth=
      direct.coreUnits +
      2*direct.diagnosticUnits +
      (supportAxis>=0.25 ? 2*supportAxis : 0) +
      (broad>=0.4 ? 2*broad : 0);

    const independentKinds=[
      direct.coreCount>0,
      direct.diagnosticCount>0,
      supportAxis>=0.25,
      broad>=0.4
    ].filter(Boolean).length;

    const eligible=
      (direct.coreCount>=4 && direct.coreUnits>=2.5) ||
      (direct.diagnosticCount>=2 && direct.diagnosticUnits>=1.25) ||
      ((direct.coreCount>=2 || direct.diagnosticCount>=1) &&
        independentKinds>=2 &&
        effectiveBreadth>=3) ||
      (feature.broadTag && broad>=0.5);

    return {
      eligible,
      confidence:eligible ? clamp01(effectiveBreadth/5) : 0,
      effectiveBreadth,
      coreCount:direct.coreCount,
      diagnosticCount:direct.diagnosticCount,
      supportAxis:Number(supportAxis.toFixed(3)),
      broad:Number(broad.toFixed(3))
    };
  }

  function overlapRatio(tags,used) {
    if(!tags?.length) return 0;
    return tags.filter(tag=>used.has(tag)).length/tags.length;
  }

  function featureScore(feature,scores,traits,identity,spentFeature=null,traitEvidence={}) {
    let score=featureEvidence(feature,scores,traits);
    if(score<=0) return 0;

    const quality=evidenceQuality(feature,scores,traits,traitEvidence);
    if(!quality.eligible) return 0;
    score*=0.55+0.45*quality.confidence;

    const coverage=identityCoverage(identity);
    const primarySpent=feature.primaryTag && coverage.has(feature.primaryTag);
    const nounOverlap=overlapRatio(feature.tags,coverage);

    if(primarySpent) score*=0.06;
    else score*=1-0.68*nounOverlap;

    if(spentFeature) {
      const spentTags=new Set(spentFeature.tags||[]);
      const overlap=overlapRatio(feature.tags,spentTags);
      if(overlap>=0.999) score*=0.04;
      else score*=1-0.78*overlap;
      if(feature.group===spentFeature.group) score*=0.22;
    }

    return clamp01(score);
  }

  function rankFeatures(identity,scores,traits,spentFeature=null,traitEvidence={}) {
    return FEATURES
      .map(feature=>{
        const quality=evidenceQuality(feature,scores,traits,traitEvidence);
        return {
          feature,
          evidence:featureEvidence(feature,scores,traits),
          quality,
          score:featureScore(feature,scores,traits,identity,spentFeature,traitEvidence)
        };
      })
      .filter(item=>item.score>0)
      .sort((a,b)=>b.score-a.score || b.evidence-a.evidence || a.feature.id.localeCompare(b.feature.id));
  }

  function asModifier(feature) {
    return feature ? {
      id:feature.id,
      text:feature.modifier,
      axis:feature.axis||null,
      direction:feature.direction||null,
      adds:feature.tags,
      explanation:feature.explanation
    } : null;
  }

  function asPhrase(feature) {
    return feature ? {
      id:feature.id,
      text:feature.phrase,
      axis:feature.axis||null,
      direction:feature.direction||null,
      adds:feature.tags,
      explanation:feature.explanation
    } : null;
  }

  function specialTitle(classification) {
    const id=classification?.identity?.id;
    if(id==="unusable_response") return "Unclear response pattern";
    if(id==="outcome_driven_left") return "Outcome-driven pattern \u00b7 left-coded outcomes";
    if(id==="outcome_driven_right") return "Outcome-driven pattern \u00b7 right-coded outcomes";
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
        rankedFeatures:[],
        special:true
      };
    }

    const identity=classification?.identity || {id:"interpretive_pluralist",label:"Interpretive Pluralist",family:"method"};

    // Second-most-important information gets the more expressive trailing phrase.
    const phraseRanking=rankFeatures(identity,scores,traits,null,traitEvidence);
    const phrasePick=phraseRanking.find(item=>item.score>=0.18) || null;

    // Third-most-important information gets the compact modifier, after spending the
    // phrase's conceptual information and strongly preferring another dimension.
    const modifierRanking=rankFeatures(identity,scores,traits,phrasePick?.feature||null,traitEvidence);
    const modifierPick=modifierRanking.find(item=>item.score>=0.14) || null;

    const phrase=asPhrase(phrasePick?.feature||null);
    const modifier=asModifier(modifierPick?.feature||null);
    const title=[modifier?.text,identity.label,phrase?.text].filter(Boolean).join(" ");
    const bridge=BRIDGES.find(item=>item.when(scores,traits,identity)) || null;

    return {
      title,
      noun:identity.label,
      nounExplanation:IDENTITY_COPY[identity.id] || "",
      modifier,
      phrase,
      bridge,
      rankedFeatures:phraseRanking.slice(0,8).map(item=>({
        id:item.feature.id,
        group:item.feature.group,
        evidence:Number(item.evidence.toFixed(3)),
        score:Number(item.score.toFixed(3)),
        confidence:Number(item.quality.confidence.toFixed(3)),
        effectiveBreadth:Number(item.quality.effectiveBreadth.toFixed(3)),
        coreCount:item.quality.coreCount,
        diagnosticCount:item.quality.diagnosticCount
      })),
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

  function featureByAnyId(id) {
    const resolved=LEGACY_FEATURE_ALIASES[id] || id;
    return FEATURES.find(feature=>feature.id===resolved) || null;
  }

  function fromIds(identity,scores,traits,ids={}) {
    const assembled=assemble({identity},scores,traits||{},{});
    if(ids.phraseId) {
      const feature=featureByAnyId(ids.phraseId);
      if(feature) assembled.phrase=asPhrase(feature);
    }
    if(ids.modifierId) {
      const feature=featureByAnyId(ids.modifierId);
      if(feature) assembled.modifier=asModifier(feature);
    }
    if(ids.bridgeId) assembled.bridge=BRIDGES.find(x=>x.id===ids.bridgeId) || assembled.bridge;
    assembled.title=[assembled.modifier?.text,identity.label,assembled.phrase?.text].filter(Boolean).join(" ");
    return assembled;
  }

  global.LAW_RESULT_CONTENT=Object.freeze({
    AXIS_POLES,
    IDENTITY_COPY,
    FEATURES,
    MODIFIERS,
    PHRASES,
    BRIDGES,
    featureEvidence,
    evidenceQuality,
    featureScore,
    rankFeatures,
    assemble,
    fromIds
  });
})(globalThis);
