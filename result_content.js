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

  const MODIFIERS = Object.freeze([
    { id:"source_following", text:"source-following", axis:"sorc", direction:"left", adds:["source.positive_sources"], explanation:"Your source answers are unusually positivist: recognized enactment, precedent, and legal practice do substantial work." },
    { id:"principle_seeking", text:"principle-seeking", adds:["source.principles_are_law","time.principle_originalism"], explanation:"You repeatedly treat legal principles as doing work beyond a bare catalogue of enacted rules." },
    { id:"morality_grounding", text:"morality-grounding", axis:"sorc", direction:"right", adds:["source.objective_morality","source.moral_constraint"], explanation:"You are unusually willing to treat objective moral constraints as legally relevant." },
    { id:"practice_following", text:"practice-following", adds:["source.social_practice","time.early_practice"], explanation:"Settled official practice and inherited legal practice carry unusual authority for you." },
    { id:"text_binding", text:"text-binding", axis:"cons", direction:"left", adds:["constraint.textual"], explanation:"Enacted language strongly constrains what you think judges may do." },
    { id:"context_reading", text:"context-reading", adds:["constraint.contextual_textualism"], explanation:"You read legal text contextually rather than as a collection of isolated dictionary definitions." },
    { id:"bargain_respecting", text:"bargain-respecting", adds:["constraint.enacted_bargain"], explanation:"You give unusual weight to express compromises, exceptions, and omissions in the deal that actually became law." },
    { id:"purpose_seeking", text:"purpose-seeking", axis:"cons", direction:"right", adds:["constraint.purpose","constraint.anti_evasion"], explanation:"You are unusually willing to read legal provisions in light of the problem the law was trying to solve." },
    { id:"meaning_fixing", text:"meaning-fixing", axis:"time", direction:"left", adds:["time.semantic_fixation","time.public_meaning"], explanation:"You resist allowing old legal language to change meaning merely because modern usage or views have changed." },
    { id:"principle_applying", text:"principle-applying", adds:["time.principle_originalism"], explanation:"You distinguish an originally fixed principle from the specific applications people at the time happened to expect." },
    { id:"tradition_following", text:"tradition-following", adds:["time.expected_applications","time.early_practice"], explanation:"Historical applications and early governmental practice carry unusual weight in your constitutional reasoning." },
    { id:"precedent_preserving", text:"precedent-preserving", axis:"prec", direction:"left", adds:["precedent.stability","precedent.reliance","precedent.settlement"], explanation:"Reliance, continuity, and a stable body of law make you reluctant to discard precedent." },
    { id:"precedent_breaking", text:"precedent-breaking", axis:"prec", direction:"right", adds:["precedent.correction","precedent.correctness_first"], explanation:"You put unusual weight on correcting serious legal error even when doing so disrupts precedent." },
    { id:"rule_following", text:"rule-following", axis:"form", direction:"left", adds:["form.rules","form.predictability"], explanation:"You value rules because they constrain discretion and preserve consistency even when an edge case comes out badly." },
    { id:"discretion_limiting", text:"discretion-limiting", adds:["form.anti_discretion"], explanation:"Your rule preference is especially driven by distrust of subjective or uneven judicial discretion." },
    { id:"consequence_weighing", text:"consequence-weighing", axis:"form", direction:"right", adds:["form.balancing","method.consequences"], explanation:"You are unusually comfortable asking judges to weigh practical consequences and competing considerations in context." },
    { id:"exception_making", text:"exception-making", adds:["form.equitable_exception","form.cliff_skepticism"], explanation:"You resist rigid rules when their margins create results you regard as arbitrary or unfair." },
    { id:"boundary_policing", text:"boundary-policing", axis:"separ", direction:"left", adds:["separation.formalist","separation.prescribed_process"], explanation:"You are unusually strict about constitutionally assigned powers and procedures." },
    { id:"institution_trusting", text:"institution-trusting", axis:"separ", direction:"right", adds:["separation.functionalist","separation.combined_functions"], explanation:"You tolerate institutional overlap when the arrangement remains accountable and workable." },
    { id:"rights_protecting", text:"rights-protecting", axis:"post", direction:"right", adds:["posture.countermajoritarian","posture.rights_trumps"], explanation:"You are unusually willing to have courts enforce rights despite sustained majority opposition." },
    { id:"democracy_deferring", text:"democracy-deferring", axis:"post", direction:"left", adds:["posture.majoritarian","posture.clear_error"], explanation:"You give unusually broad room to elected government when constitutional meaning is genuinely contestable." },
    { id:"system_reforming", text:"system-reforming", axis:"remed", direction:"right", adds:["remedies.structural","remedies.supervision"], explanation:"Once a violation is established, you are comparatively comfortable with broad institutional remedies." },
    { id:"remedy_narrowing", text:"remedy-narrowing", axis:"remed", direction:"left", adds:["remedies.party_specific","remedies.incremental","remedies.severability"], explanation:"You generally want judicial relief confined to what is necessary to resolve the proven violation." },
    { id:"case_by_case", text:"case-by-case", adds:["method.case_by_case","method.anti_grand_theory"], explanation:"You prefer concrete, fact-sensitive judgment to forcing every case through one comprehensive jurisprudential theory." }
  ]);

  const PHRASES = Object.freeze([
    { id:"democracy_decides", text:"who lets democracy decide", axis:"post", direction:"left", adds:["posture.majoritarian","posture.democratic_legitimacy"], explanation:"On genuine constitutional disagreement, you often think representative politics has the stronger claim to decide." },
    { id:"clear_error_only", text:"who steps in only when the law is clear", adds:["posture.clear_error"], explanation:"Your deference is specifically tied to uncertainty: clear constitutional violations remain judicial business." },
    { id:"rights_beat_majorities", text:"who thinks rights are supposed to beat majorities", axis:"post", direction:"right", adds:["posture.countermajoritarian","posture.rights_trumps"], explanation:"Democratic popularity does not make you more willing to tolerate a violation of a constitutional right." },
    { id:"judicial_independence", text:"who does not want judges answering to the crowd", adds:["posture.judicial_independence"], explanation:"You put unusual weight on insulating judges from electoral retaliation for unpopular legal decisions." },
    { id:"electoral_judges", text:"who thinks judges should answer to voters eventually", adds:["posture.electoral_accountability"], explanation:"You are unusually comfortable with democratic accountability for judges exercising public power." },
    { id:"preserve_precedent", text:"who leaves settled law alone", axis:"prec", direction:"left", adds:["precedent.stability","precedent.reliance"], explanation:"The costs of legal disruption often matter enough for you to preserve an imperfect precedent." },
    { id:"correction_first", text:"who wants bad precedent gone", axis:"prec", direction:"right", adds:["precedent.correction","precedent.correctness_first"], explanation:"You would rather correct serious legal error than preserve it solely for continuity." },
    { id:"statutory_stare_decisis", text:"who makes Congress fix the Court's old mistakes", adds:["precedent.statutory"], explanation:"You give especially strong weight to statutory precedent because the legislature can amend the law if it disagrees." },
    { id:"plaintiff_specific", text:"who fixes only the case in front of them", axis:"remed", direction:"left", adds:["remedies.party_specific","remedies.incremental"], explanation:"Your remedial instinct is to give the plaintiffs what they are legally owed without unnecessarily governing everyone else." },
    { id:"systemic_relief", text:"who fixes the whole system", axis:"remed", direction:"right", adds:["remedies.structural","remedies.supervision"], explanation:"You accept structural judicial intervention when narrower orders repeatedly fail to cure a systemic violation." },
    { id:"universal_relief", text:"who will not make everyone file the same lawsuit", adds:["remedies.universal"], explanation:"You are comparatively willing to extend relief beyond the named plaintiff when the same unlawful rule affects everyone." },
    { id:"severability", text:"who cuts out only the broken part", adds:["remedies.severability"], explanation:"You favor severing the invalid provision and leaving the rest of a workable law standing." },
    { id:"prophylactic", text:"who will write an extra rule to make the right real", adds:["remedies.prophylactic"], explanation:"You allow protective judicial rules that go beyond the bare constitutional minimum when needed to stop recurring violations." },
    { id:"strict_separation", text:"who keeps the branches in their lanes", axis:"separ", direction:"left", adds:["separation.formalist","separation.prescribed_process"], explanation:"Efficiency does not persuade you to blur constitutionally assigned governmental powers." },
    { id:"functional_institutions", text:"who lets government use the arrangement that works", axis:"separ", direction:"right", adds:["separation.functionalist","separation.combined_functions"], explanation:"Institutional overlap is acceptable to you when accountability and workable checks remain." },
    { id:"rules", text:"who would rather have a rule than a perfect exception", axis:"form", direction:"left", adds:["form.rules","form.edge_case_tolerance"], explanation:"You accept some ugly edge cases as the price of constraining discretion through general rules." },
    { id:"balancing", text:"who wants judges to weigh the whole case", axis:"form", direction:"right", adds:["form.balancing"], explanation:"You prefer contextual weighing to categorical answers when important facts and values conflict." },
    { id:"moral_source", text:"who thinks morality can outrank enacted law", axis:"sorc", direction:"right", adds:["source.moral_constraint","source.objective_morality"], explanation:"For you, positive enactment does not always exhaust the legal question." },
    { id:"positive_law", text:"who calls it law even when it is awful", axis:"sorc", direction:"left", adds:["source.positive_sources"], explanation:"You distinguish legal validity from moral merit even in deliberately harsh examples." },
    { id:"fixed_meaning", text:"who thinks old legal meaning stays put", axis:"time", direction:"left", adds:["time.fixation","time.semantic_fixation"], explanation:"Later social change does not itself change the legal meaning you think was adopted." },
    { id:"evolving_meaning", text:"who lets constitutional meaning change with the country", axis:"time", direction:"right", adds:["time.living_content"], explanation:"You accept genuine constitutional development without requiring a formal amendment every time." },
    { id:"public_meaning", text:"who cares what the public ratified, not what the drafters secretly meant", adds:["time.public_meaning"], explanation:"Publicly adopted legal meaning matters more to you than uncommunicated drafting intentions." },
    { id:"enacted_bargain", text:"who makes Congress live with the deal it actually passed", axis:"cons", direction:"left", adds:["constraint.enacted_bargain"], explanation:"You enforce negotiated exceptions and omissions even when they frustrate the statute's broader purpose." },
    { id:"purpose", text:"who would rather save the law's point than worship its wording", axis:"cons", direction:"right", adds:["constraint.purpose","constraint.open_construction"], explanation:"You allow statutory purpose to shape legal effect when literal application would defeat the law's evident point." },
    { id:"low_theory", text:"who refuses to make every hard case fit one grand theory", adds:["method.anti_grand_theory","method.case_by_case"], explanation:"You treat the demand for one universal theory of judging with unusual skepticism." }
  ]);

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
  function directionStrength(scores,axis,direction) { return direction==="left" ? left(scores,axis) : right(scores,axis); }
  function traitStrength(traits,adds) { return Math.max(0,...(adds||[]).map(id=>Number(traits?.[id])||0)); }
  function isOriginalist(identity) { return identity?.id==="originalist" || /originalist$/.test(identity?.id||""); }
  function identityCoverage(identity) {
    const catalog=(global.LAW_RESULT_IDENTITIES||[]).find(item=>item.id===identity?.id);
    return new Set(catalog?.covers||[]);
  }
  function familyAxis(identity) {
    const family=identity?.family;
    return ({source:"sorc",method:"cons",time:"time",posture:"post",structure:"separ",form:"form"})[family] || null;
  }
  function overlapRatio(adds,used) {
    if(!adds?.length) return 0;
    return adds.filter(tag=>used.has(tag)).length/adds.length;
  }
  function componentScore(component,scores,traits,identity,usedAxes,usedTags) {
    const a=component.axis ? directionStrength(scores,component.axis,component.direction) : 0;
    const t=traitStrength(traits,component.adds);
    let score=Math.max(a,t*1.08) + 0.12*Math.min(a,t || a);
    if(component.axis && component.axis===familyAxis(identity) && t<0.45) score*=0.62;
    const identityTags=identityCoverage(identity);
    const identityRedundancy=overlapRatio(component.adds,identityTags);
    const usedRedundancy=overlapRatio(component.adds,usedTags);
    if(identityRedundancy>=0.999) score*=0.08;
    else score*=1-0.65*identityRedundancy;
    if(usedRedundancy>=0.999) score*=0.05;
    else score*=1-0.7*usedRedundancy;
    if(component.axis && usedAxes.has(component.axis)) score*=0.28;
    return clamp01(score);
  }
  function choose(list,scores,traits,identity,usedAxes,usedTags,minScore) {
    const ranked=list
      .map(item=>({item,score:componentScore(item,scores,traits,identity,usedAxes,usedTags)}))
      .sort((a,b)=>b.score-a.score);
    return ranked[0] && ranked[0].score>=minScore ? ranked[0] : null;
  }
  function specialTitle(classification) {
    const id=classification?.identity?.id;
    if(id==="unusable_response") return "Unclear response pattern";
    if(id==="outcome_driven_left") return "Outcome-driven pattern · left-coded outcomes";
    if(id==="outcome_driven_right") return "Outcome-driven pattern · right-coded outcomes";
    if(id==="incoherent_response") return "Inconsistent response pattern";
    return null;
  }

  function assemble(classification,scores,traits={}) {
    const special=specialTitle(classification);
    if(special) return { title:special,noun:classification.identity.label,modifier:null,phrase:null,bridge:null,special:true };

    const identity=classification?.identity || {id:"interpretive_pluralist",label:"Interpretive Pluralist",family:"method"};
    const usedAxes=new Set();
    const usedTags=new Set(identityCoverage(identity));
    const modifierPick=choose(MODIFIERS,scores,traits,identity,usedAxes,usedTags,0.24);
    if(modifierPick) {
      if(modifierPick.item.axis) usedAxes.add(modifierPick.item.axis);
      (modifierPick.item.adds||[]).forEach(tag=>usedTags.add(tag));
    }
    const phrasePick=choose(PHRASES,scores,traits,identity,usedAxes,usedTags,0.2);
    const modifier=modifierPick?.item || null;
    const phrase=phrasePick?.item || null;
    const title=[modifier?.text,identity.label,phrase?.text].filter(Boolean).join(" ");
    const bridge=BRIDGES.find(item=>item.when(scores,traits,identity)) || null;
    return {
      title,
      noun:identity.label,
      nounExplanation:IDENTITY_COPY[identity.id] || "",
      modifier,
      phrase,
      bridge,
      special:false
    };
  }

  function fromIds(identity,scores,traits,ids={}) {
    const classification={identity};
    const assembled=assemble(classification,scores,traits||{});
    if(ids.modifierId) assembled.modifier=MODIFIERS.find(x=>x.id===ids.modifierId) || assembled.modifier;
    if(ids.phraseId) assembled.phrase=PHRASES.find(x=>x.id===ids.phraseId) || assembled.phrase;
    if(ids.bridgeId) assembled.bridge=BRIDGES.find(x=>x.id===ids.bridgeId) || assembled.bridge;
    assembled.title=[assembled.modifier?.text,identity.label,assembled.phrase?.text].filter(Boolean).join(" ");
    return assembled;
  }

  global.LAW_RESULT_CONTENT=Object.freeze({
    AXIS_POLES,
    IDENTITY_COPY,
    MODIFIERS,
    PHRASES,
    BRIDGES,
    assemble,
    fromIds
  });
})(globalThis);
