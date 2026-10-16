// Historical 0.8 literal-answer regressions. Current-instrument controls live
// in audit-time-construct and audit-diagnostic-routing. Frozen answers are unchanged.
import {selectLegacy08Instrument} from './fixtures/instrument-context.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const c = vm.createContext({console});
for (const f of ['axes.js','questions.js','scoring.js','result_catalog.js','diagnostics.js','profiles.js','result_content.js','classification.js']) {
 vm.runInContext(fs.readFileSync(new URL('../'+f,import.meta.url),'utf8'),c);
 if(f==='questions.js') selectLegacy08Instrument(c);
}
const cl=c.LAW_CLASSIFIER;
const neutral=Object.fromEntries(cl.AXIS_IDS.map(id=>[id,50]));
const scores={...neutral,sorc:85,time:90};
const core={T7:3};
const baseline=cl.resolveIdentity(scores,cl.buildTraits(scores,core,{}));
for(const value of [-3,-2,-1,0,1,2,3,null]) {
 const result=cl.resolveIdentity(scores,cl.buildTraits(scores,core,{'D-POS1':value}));
 assert.equal(result.best.identity.id,baseline.best.identity.id,'Subtype exposure cannot manufacture primary importance');
 assert.equal(result.candidates.find(x=>x.identity.id==='positivist').score,baseline.candidates.find(x=>x.identity.id==='positivist').score);
}
const matched={...neutral,sorc:90,time:90};
for(const [answer,expected] of [[3,'positivist'],[-3,'public_meaning_originalist']]) {
 const result=cl.resolveIdentity(matched,cl.buildTraits(matched,core,{'D-PRI-source-time':answer}));
 assert.equal(result.best.identity.id,expected,'Explicit defining priority must resolve matched compatible commitments');
}
for(const [base,diagnostic,extra] of [
 [{...neutral,time:20},'D-LIV1',{}],
 [{...neutral,time:25,prec:85},'D-CLC1',{T12:3,P3:3}],
 [{...neutral,time:90},'D-ORI1',{}]
]) {
 const before=cl.resolveIdentity(base,cl.buildTraits(base,extra,{}));
 const after=cl.resolveIdentity(base,cl.buildTraits(base,extra,{[diagnostic]:3}));
 assert.equal(after.best.score,before.best.score,diagnostic+' cannot promote cross-family importance through specificity');
}
const monaghan=c.LAW_PROFILES.find(p=>p.id==='monaghan');
const coverage=cl.profileEvidenceCoverage(monaghan,{...neutral,sorc:95,time:5,prec:90},{'remedies.constitutional_common_law':1});
assert.equal(coverage.scope,'specific-affinity');
assert.equal(coverage.coverage,0);
assert.equal(coverage.knownDisagreements.length,0,'Unmodeled commitments are unknown, never disagreement');
assert.ok(coverage.unknownAxes.includes('sorc'));
const hart=c.LAW_PROFILES.find(p=>p.id==='hart');
assert.ok(cl.profileEvidenceCoverage(hart,{...neutral,sorc:5},{}).knownDisagreements.includes('sorc'));
const ids=cl.diagnosticBank().map(q=>q.id);
assert.equal(new Set(ids).size,ids.length);
assert.equal(ids.filter(id=>id.startsWith('D-PRI-')).length,28);
assert.equal(cl.nextDiagnostic(neutral,{},{}).id,'D-QC1');
assert.equal(cl.nextDiagnostic(neutral,{}, {'D-QC1':0}),null);
assert.equal(cl.MAX_DIAGNOSTICS+c.LAW_QUESTIONS.length,100);
for(const q of cl.diagnosticBank()) if(q.priorityComparison) {
 assert.equal(q.evidenceRoles[0],'relative-priority');
 assert.ok(!q.signals,'Priority cannot alter core axes');
}
console.log('PASS: subtype invariance, comparative priority, unknown versus disagreement, and budget contracts.');
// Constructive score/trait controls, not historical self-reports or population data.
for (const id of ['charles_black','monaghan']) {
 const p=c.LAW_PROFILES.find(p=>p.id===id);
 const traits=Object.fromEntries(p.signatureTraits.map(trait=>[trait,1]));
 for(const rule of p.requiredTraits||[]) for(const trait of [...rule.all||[],...rule.any||[]]) traits[trait]=1;
 const modest={...neutral,sorc:70};
 const identity=cl.resolveIdentity(modest,traits).best.identity;
 const narrow=cl.resolveChampions(modest,traits,identity);
 assert.equal(narrow.matches[0]?.profile.id,id,'A supported specialist must remain reachable when other commitments do not dominate');
 assert.notEqual(narrow.confidence,'high','Specialty support cannot establish high broad-match confidence');
 const sourceLed={...neutral,sorc:95};
 const broad=cl.resolveChampions(sourceLed,traits,cl.resolveIdentity(sourceLed,traits).best.identity);
 assert.notEqual(broad.matches[0]?.profile.id,id,'The same isolated specialty must not erase a better-supported dominant commitment');
}
for (const value of [-3,-2,-1,0,1,2,3,null]) {
 const t=cl.buildTraits({...neutral,sorc:95},{S10:-3,S11:-3},{'D-NP1':value});
 assert.equal(t['source.independent_moral_validity']||0,0);
 assert.equal(t['source.independent_moral_validity_rejected'],1);
 assert.equal(t['source.objective_morality']||0,0,'Settlement agreement cannot manufacture independent moral law');
}
console.log('PASS: specialist reachability/centrality and independent moral-validity evidence.');
// Literal 88-answer witnesses through only questions the live router asks.
for (const [target,diagnosticId] of [['charles_black','D-BLK1'],['monaghan','D-MON1']]) {
 const responses=Object.fromEntries(c.LAW_QUESTIONS.map(q=>[q.id,q.axis==='sorc'?
   (q.signals.agree.sorc>q.signals.disagree.sorc?1:-1):0]));
 const scores=c.LAW_SCORING.scoreAll(responses), answers={};
 for(let n=0;n<cl.MAX_DIAGNOSTICS;n++) {
  const q=cl.nextDiagnostic(scores,responses,answers); if(!q) break;
  assert.ok(!(q.id in answers));
  answers[q.id]=q.id==='D-QC1'?-2:q.id===diagnosticId?3:q.priorityComparison?null:-3;
 }
 assert.ok(diagnosticId in answers,'Specialist evidence must actually be asked');
 const result=cl.classify(scores,responses,answers,{coreElapsedMs:600000});
 assert.equal(result.champions[0]?.id,target);
 assert.notEqual(result.championConfidence,'high');
 assert.ok(c.LAW_QUESTIONS.length+Object.keys(answers).length<=100);
}
console.log('PASS: Charles Black and Monaghan remain reachable through literal 88+12 routes.');
// Unconfirmed families can express importance, but importance is never doctrine.
const discoveryScores={...neutral,sorc:80,cons:59,time:37,prec:84};
const discoveryCore={T12:3,P3:3,S5:3,S7:2};
for(const family of ['method','realism']) for(const confirm of [true,false,null]) {
 const answers={}; const durations=[];
 for(let n=0;n<cl.MAX_DIAGNOSTICS;n++) {
  const start=performance.now(); const q=cl.nextDiagnostic(discoveryScores,discoveryCore,answers);
  durations.push(performance.now()-start); if(!q) break;
  if(q.id==='D-QC1') answers[q.id]=-2;
  else if(q.priorityComparison) answers[q.id]=q.priorityComparison[0]===family?3:q.priorityComparison[1]===family?-3:null;
  else if((family==='method' && ['D-PLU1','D-LP1','D-LP2'].includes(q.id)) ||
      (family==='realism' && /^D-RLS/.test(q.id))) answers[q.id]=confirm===null?null:confirm?3:-3;
  else answers[q.id]=-3;
 }
 const result=cl.classify(discoveryScores,discoveryCore,answers);
 const resolved=cl.resolveIdentity(discoveryScores,result.traits).best;
 if(confirm) assert.equal(resolved.priorityFamily,family,'Confirmed explicitly central missing family must be discoverable');
 else assert.notEqual(resolved.priorityFamily,family,'Priority alone, rejected or skipped doctrine must not manufacture a school');
 console.log(`Discovery ${family}/${confirm}: max next-question ${Math.round(Math.max(...durations))} ms`);
}
console.log('PASS: bounded missing-family discovery, rejected/skip controls, no priority-only school creation.');
// An explicit priority weights the actual commitment a profile models without
// turning the noun or catalog membership into an eligibility gate.
{
 const scores={...neutral,sorc:94,cons:91,time:80,prec:69,remed:62,post:45,separ:70,form:83};
 const traits=cl.buildTraits(scores,{T7:3,S5:3,S7:3},{'D-PRI-source-time':-3});
 const identity=cl.resolveIdentity(scores,traits).best.identity;
 assert.ok(identity.id.includes('originalist'));
 const match=cl.resolveChampions(scores,traits,identity).matches[0];
 assert.ok(match,'Explicit primary still needs a supported champion');
 assert.ok(match.profile.axisSignature.time || (match.profile.signatureTraits||[]).some(t=>t.startsWith('time.')),
  'The winning profile should represent the preferred Time commitment in substantive evidence');
 const relabeled=cl.resolveChampions(scores,traits,c.LAW_RESULT_IDENTITIES.find(x=>x.id==='positivist'));
 assert.deepEqual(relabeled.candidates.map(x=>[x.profile.id,x.score]),
  cl.resolveChampions(scores,traits,identity).candidates.map(x=>[x.profile.id,x.score]),
  'Changing only the resolved noun cannot change the whole-profile analogue');
}
console.log('PASS: explicit priority weights modeled evidence while noun relabeling is inert.');
{
 const scores={...neutral,sorc:100,time:65,cons:90};
 const traits=cl.buildTraits(scores,{T7:3},{'D-PRI-source-time':-3,'D-PRI-source-method':3});
 const explicit=cl.resolveIdentity(scores,traits);
 assert.equal(explicit.best.priorityFamily,'time','Beating a third family cannot cancel explicit defeat by the preferred family');
 const cyclic=cl.resolveIdentity(scores,{...traits,'priority.method.over.time':1});
 assert.equal(cyclic.priorityConflict,true,'Cyclic priority must be exposed unresolved');
 assert.ok(cyclic.candidates.some(c=>c.identity.id===cyclic.best.identity.id));
}
console.log('PASS: direct-priority consistency and explicit cyclic uncertainty.');
for(const answer of [-1,0,1,null]) {
 const scores={...neutral,sorc:100,time:65,cons:90};
 const result=cl.resolveIdentity(scores,cl.buildTraits(scores,{T7:3},{'D-PRI-source-time':answer}));
 assert.ok(result.candidates.every(candidate=>!candidate.priorityDefeated),'Weak/neutral/skipped preference must not impose hard ordering');
 if(answer===0 || answer===null) assert.equal(result.best.priorityFamily,'source');
 assert.equal(result.priorityConflict,false);
}
console.log('PASS: weak, neutral, and skipped priority preserve proportional evidence.');

// Routing priority domains need not copy the legacy title-catalog taxonomy.
{
 const s={sorc:3,cons:0,time:56,prec:46,remed:52,post:75,separ:18,form:33};
 const traits=cl.buildTraits(s,{}, {'D-CGC1':3});
 const resolution=cl.resolveIdentity(s,traits);
 assert.equal(resolution.best.identity.id,'purposivist');
 const cgc=resolution.candidates.find(x=>x.identity.id==='common_good_constitutionalist');
 assert.equal(cgc.identity.family,'time');
 assert.equal(cgc.priorityFamily,'common_good');
 const broad=cl.resolveChampions(s,traits,resolution.best.identity,resolution);
 assert.equal(broad.matches[0].profile.id,'vermeule','Better modeled broad fit may beat canonicality of an unresolved noun');
 const breyer=c.LAW_PROFILES.find(p=>p.id==='breyer');
 assert.ok(cl.profileEvidenceCoverage(breyer,s,traits).unknownAxes.includes('sorc'));
 assert.equal(broad.matches[0].evidence.coverage,1);
 const withoutDoctrine={...traits,'method.common_good':0,'time.classical_tradition':0};
 const rejected=cl.resolveIdentity(s,withoutDoctrine);
 assert.notEqual(cl.resolveChampions(s,withoutDoctrine,rejected.best.identity,rejected).matches[0]?.profile.id,'vermeule','Broad fit cannot bypass missing doctrinal prerequisites');
 const weakPriority={...traits,'priority.method.over.common_good':1/3};
 const weak=cl.resolveIdentity(s,weakPriority);
 assert.equal(cl.resolveChampions(s,weakPriority,weak.best.identity,weak).matches[0]?.profile.id,'vermeule','Weak self-reported priority cannot prohibit a better evidenced adjacent fit');
 const methodPrimary={...traits,'priority.method.over.common_good':1,'priority.method.over.source':1,'priority.method.over.structure':1,'priority.method.over.posture':1};
 const method=cl.resolveIdentity(s,methodPrimary);
 assert.equal(method.best.identity.id,'purposivist');
 const methodMatch=cl.resolveChampions(s,methodPrimary,method.best.identity,method);
 const baseGap=broad.candidates[0].score-broad.candidates.find(x=>x.profile.id==='breyer').score;
 const methodGap=methodMatch.candidates.find(x=>x.profile.id==='vermeule').score-
  methodMatch.candidates.find(x=>x.profile.id==='breyer').score;
 assert.ok(methodGap<baseGap,'Strong Method priority must narrow the advantage of a profile defined by subordinated common-good evidence');
 const cgPrimary={...traits,'priority.common_good.over.method':1,'priority.common_good.over.source':1,'priority.common_good.over.structure':1,'priority.common_good.over.posture':1};
 assert.equal(cl.resolveIdentity(s,cgPrimary).best.identity.id,'common_good_constitutionalist');
 const timeOnly={...traits,'priority.time.over.method':1,'priority.time.over.source':1};
 assert.equal(cl.resolveIdentity(s,timeOnly).candidates.find(x=>x.identity.id==='common_good_constitutionalist').priorityEvidence,0,'Temporal priority does not manufacture common-good importance');
}
console.log('PASS: common-good priority domain, uncertainty-aware whole-profile matching, and prerequisite/explicit-primary counterfactuals.');
