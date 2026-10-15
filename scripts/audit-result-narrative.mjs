import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const load=name=>vm.runInThisContext(fs.readFileSync(new URL('../'+name,import.meta.url),'utf8'),{filename:name});
load('result_catalog.js'); load('result_narrative.js');
const e=globalThis.LAW_RESULT_NARRATIVE;
const neutral={sorc:50,cons:50,time:50,prec:50,remed:50,post:50,separ:50,form:50};
const c=(id='positivist',traits={})=>({identity:{id},traits});
for(const [id,r] of Object.entries(e.ROUTES)){
  assert.ok(r.opening.trim()&&r.context.trim(),id);
  assert.ok(e.wordCount(r.opening)<=70,id+' opening cap');
  assert.ok(e.wordCount(r.context)<=300,id+' context cap');
  assert.ok(!r.context.includes('\n'),id+' single paragraph');
}
for(const [id,o] of Object.entries(e.OPENINGS)) assert.ok(o.trim()&&e.wordCount(o)<=70,id);
// Ordinary profiles use one plan. Historical/developmental commitments remain
// distinguishable even with the same Source noun and moderate axis evidence.
const alex=e.build(c('positivist',{'source.morality_incorporated':2/3,'time.common_law_development':.5}),
 {...neutral,sorc:94,cons:91,time:80,prec:69,form:83,post:45});
const imani=e.build(c('positivist',{'source.morality_incorporated':2/3,'source.extreme_injustice':1/3}),
 {...neutral,sorc:80,cons:59,time:37,prec:84,post:42});
const mara=e.build(c('common_law_constitutionalist',{'source.objective_morality':5/6,'source.extreme_injustice':1}),
 {...neutral,sorc:34,cons:59,time:31,prec:81,post:18});
assert.equal(alex.id,'portrait_public_constraint_reliance_inclusive');
assert.equal(imani.id,'portrait_continuity_development_qualified_positive');
assert.equal(mara.id,'portrait_continuity_rights_independent_extreme');
assert.equal(new Set([alex.opening,imani.opening,mara.opening]).size,3);
assert.match(alex.context,/Enacted language.*historical interpretation/);
assert.match(imani.context,/extreme injustice/);
assert.doesNotMatch(imani.context,/morally best|morality automatically|never.*injustice/);
assert.match(mara.context,/beyond official adoption|need not depend entirely on official adoption/);
assert.match(mara.context,/broader than that exceptional threshold/);
for(const r of [alex,imani,mara]) assert.equal(r.id,r.openingId);
// Neighbors: no extreme-only gate, no trait-induced developmental portrait of
// someone whose actual temporal answers are strongly historical.
for(const time of [36,40,42]) assert.match(e.build(c(),{...neutral,time,prec:64}).id,/continuity_development/);
assert.doesNotMatch(alex.id,/development/);
assert.match(e.build(c(),{...neutral,time:70,prec:34}).id,/historical_correction/);
assert.match(e.build(c(),{...neutral,time:70,prec:64}).id,/historical_reliance/);
assert.match(e.build(c(),{...neutral,cons:70,form:70}).id,/text_rules/);
assert.match(e.build(c(),{...neutral,cons:30,post:70}).id,/purpose_restraint/);
assert.match(e.build(c(),{...neutral,form:30,post:30}).id,/contextual_rights/);
// Form cannot establish strong judicial review. Nor can remedies or an agency
// diagnostic alone supply the subject of the whole portrait.
for(const id of ['nonpositivist','interpretivist','natural_lawyer','proportionalist']){
 const r=e.build(c(id),{...neutral,form:0});
 assert.doesNotMatch(r.id,/portrait_.*rights/);
}
for(const key of ['method.agency_interpretive_autonomy','remedies.traditional_equity','remedies.constitutional_common_law']){
 assert.equal(e.build(c('formalist',{[key]:1}),neutral).id,'formalist_mainstream');
}
const sourceCases=[
 ['nonpositivist',{'source.moral_impact':1},'impact'],
 ['nonpositivist',{'source.moral_practice':1},'practice'],
 ['nonpositivist',{'source.extreme_injustice':1},'extreme'],
 ['nonpositivist',{'source.extreme_injustice':1,'source.objective_morality':1},'independent_extreme'],
 ['interpretivist',{},'interpretive'], ['fullerian',{},'legality'],
 ['natural_lawyer',{'source.strong_natural_law':1,'source.independent_moral_validity':0},'strong_natural'],
 ['natural_lawyer',{'source.strong_natural_law':1,'source.independent_moral_validity':1},'strong_natural_principles'],
 ['natural_lawyer',{'source.positive_law_settlement':1,'source.objective_morality':1,'source.independent_moral_validity':0},'natural'],
 ['natural_lawyer',{'source.positive_law_settlement':1,'source.objective_morality':1,'source.independent_moral_validity':1},'natural_principles'],
 ['inclusive_positivist',{},'inclusive'],['exclusive_positivist',{},'exclusive']
];
for(const [id,traits,frame]of sourceCases){
 const result=e.build(c(id,traits),{...neutral,time:38,prec:68});
 assert.equal(e.sourceFrame(c(id,traits),neutral),frame);
 assert.equal(result.id,`portrait_continuity_development_${frame}`);
}
for(const identity of LAW_RESULT_IDENTITIES){
 const r=e.build({identity,traits:{}},neutral);
 assert.ok(r.opening&&r.context);
 if(identity.id!=='mixed_jurisprudence')assert.notEqual(r.id,'low_theory',identity.id);
}
const extremes={sorc:0,cons:100,time:0,prec:100,remed:0,post:100,separ:0,form:100};
assert.equal(e.build(c('mixed_jurisprudence'),neutral).id,'profile_low_commitment');
assert.equal(e.build(c('mixed_jurisprudence'),extremes).id,'profile_unresolved_commitments');
for(const [id,route]of [['unusable_response','special_unusable'],['incoherent_response','special_incoherent'],['outcome_driven_left','special_outcome'],['outcome_driven_right','special_outcome']]){
 const r=e.build(c(id),extremes,alex.id,alex.openingId);
 assert.equal(r.id,route); assert.equal(r.openingId,null);assert.equal(r.context,e.ROUTES[route].context);
}
// D-NP1 is about moral justification for positive-law settlement, not proof
// that S10/S11's independent moral legality was accepted.
const settlementTraits={'source.objective_morality':2/3,'source.positive_law_settlement':2/3,'source.morality_incorporated':2/3};
const constrainedScores={...neutral,sorc:94,cons:91,time:80,prec:69,form:83,post:45};
assert.equal(e.sourceFrame(c('positivist',settlementTraits),constrainedScores),'inclusive');
assert.equal(e.sourceFrame(c('common_law_constitutionalist',{'source.common_law_fundamental_rights':1}),neutral),'open');
for(const id of ['positivist','natural_lawyer','common_law_constitutionalist','public_meaning_originalist'])
 assert.deepEqual(e.build(c(id,settlementTraits),constrainedScores),e.build(c('positivist',settlementTraits),constrainedScores));
const independentTraits={'source.independent_moral_validity':1,'source.extreme_injustice':1};
for(const id of ['positivist','nonpositivist','common_law_constitutionalist'])
 assert.equal(e.build(c(id,independentTraits),{...neutral,time:35,prec:80,post:20}).id,'portrait_continuity_rights_independent_extreme');
// Settlement support must not erase directly supported independent principles,
// even when no strong-natural-law diagnostic was asked on the adaptive route.
const naturalPrinciples={'source.positive_law_settlement':1,'source.objective_morality':1,'source.independent_moral_validity':1};
const developingRights={...neutral,sorc:34,time:31,prec:81,post:18};
const natural=e.build(c('common_law_constitutionalist',naturalPrinciples),developingRights);
const naturalExtreme=e.build(c('common_law_constitutionalist',{...naturalPrinciples,'source.extreme_injustice':1}),developingRights);
assert.equal(natural.id,'portrait_continuity_rights_natural_principles');
assert.equal(naturalExtreme.id,'portrait_continuity_rights_natural_principles_extreme');
for(const r of [natural,naturalExtreme]){
 assert.match(r.opening,/Principles of justice can bind even before officials recognize them/);
 assert.match(r.context,/several legitimate answers/);
 assert.match(r.context,/independently binding moral principles/);
 assert.equal(r.openingId,r.id);
}
assert.match(naturalExtreme.context,/does not exhaust your acceptance of independent principles/);
assert.doesNotMatch(natural.context,/Extreme injustice/);
// Confirmed and explicitly prioritized empirical/pluralist methods change the
// account of continuity itself. A noun, champion, or weak hint cannot do so.
const continuityScores={...neutral,sorc:80,time:37,prec:84,post:42};
const baseTraits={'source.morality_incorporated':2/3,'source.extreme_injustice':1/3};
const realistTraits={...baseTraits,'priority.realism.over.source':1,'priority.realism.over.time':1,'realism.extra_doctrinal':2/3,'realism.empirical_prediction':2/3};
const pluralTraits={...baseTraits,'priority.method.over.source':1,'priority.method.over.time':1,'method.modal_pluralism':1,'method.practical_reasoning':2/3};
for(const [traits,route] of [[realistTraits,'realist_continuity'],[pluralTraits,'pluralist_continuity']]){
 const baseline=e.build(c('positivist',traits),continuityScores);
 assert.equal(baseline.id,`portrait_${route}_qualified_positive`);
 for(const id of ['legal_realist','interpretive_pluralist','positivist','common_law_constitutionalist'])
  for(const champion of ['any','unrelated'])assert.deepEqual(e.build({...c(id,traits),champions:[{id:champion}]},continuityScores),baseline);
 assert.notEqual(baseline.opening,e.build(c('positivist',baseTraits),continuityScores).opening);
}
assert.equal(e.build(c('legal_realist',baseTraits),continuityScores).id,'portrait_continuity_development_qualified_positive');
assert.equal(e.build(c('positivist',{...realistTraits,'realism.empirical_prediction':0}),continuityScores).id,'portrait_continuity_development_qualified_positive');
assert.equal(e.build(c('positivist',{...pluralTraits,'method.modal_pluralism':0}),continuityScores).id,'portrait_continuity_development_qualified_positive');
assert.match(e.build(c('positivist',realistTraits),continuityScores).context,/does not make that influence a legitimate legal reason/);
assert.match(e.build(c('positivist',pluralTraits),continuityScores).context,/more than list several methods/);
const pluralRights=e.build(c('positivist',{'priority.method.over.time':1,'method.modal_pluralism':2/3,'method.practical_reasoning':1/3,'source.independent_moral_validity':1,'source.extreme_injustice':1}),{...neutral,sorc:34,time:31,prec:81,post:18});
assert.equal(pluralRights.id,'portrait_pluralist_rights_continuity_independent_extreme');
assert.match(pluralRights.context,/even against elected institutions/);
assert.match(pluralRights.context,/Independent moral principles/);
const modalOnly=e.build(c('positivist',{'priority.method.over.time':1,'method.modal_pluralism':2/3,'method.practical_reasoning':0,'source.independent_moral_validity':1,'source.extreme_injustice':1}),{...neutral,sorc:34,time:31,prec:81,post:18});
assert.equal(modalOnly.id,'portrait_pluralist_rights_continuity_independent_extreme');
assert.doesNotMatch(modalOnly.context,/practical reasoning/i);
// Finite structural coverage, not an empirical validation of every profile.
let count=0; const selected=new Set(); const axes=Object.keys(neutral);
for(const identity of LAW_RESULT_IDENTITIES)for(let encoded=0;encoded<3**axes.length;encoded++){
 let n=encoded;const scores={};for(const key of axes){scores[key]=[0,50,100][n%3];n=Math.floor(n/3);}
 const a=e.build({identity,traits:{},champions:[{id:'first'}]},scores);
 const b=e.build({identity,traits:{},champions:[{id:'different'}]},scores);
 assert.deepEqual(a,b);assert.ok(Object.hasOwn(e.ROUTES,a.id));assert.ok(e.wordCount(a.opening)<=70&&e.wordCount(a.context)<=300);
 if(a.id.startsWith('portrait_'))assert.equal(a.openingId,a.id);
 selected.add(a.id);count++;
}
console.log(`Narrative audit passed: ${Object.keys(e.ROUTES).length} routes, ${count} axis-grid/champion invariance cases, ${selected.size} selected routes. Editorial judgment and empirical validity remain separate.`);
