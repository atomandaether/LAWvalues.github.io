import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {runtime} from './fixtures/whole-profile/runtime.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)).replace(/\/$/,'');
const r=runtime(root), c=r.ctx, e=c.LAW_RESULT_NARRATIVE, classifier=c.LAW_CLASSIFIER;
const neutral=Object.fromEntries(c.LAW_AXES.map(a=>[a.id,50]));
const core=Object.fromEntries(c.LAW_QUESTIONS.map(q=>[q.id,0]));
const base={'D-QC1':-2,'D-PLU1':3,'D-PLU2':3};
const plain=classifier.buildTraits(neutral,core,base);
assert.equal(plain['method.practical_reasoning'],1);
assert.equal(plain['method.dynamic_statutory'],undefined);
const positive=classifier.buildTraits(neutral,core,{...base,'D-DYN1':3});
assert.equal(positive['method.dynamic_statutory'],1);
for(const answer of [-3,-2,-1,0,null]){
 const t=classifier.buildTraits(neutral,core,{...base,'D-DYN1':answer});
 assert.equal(t['method.dynamic_statutory']||0,0);
 assert.equal(t['method.practical_reasoning'],1);
}
const onlyDynamic=classifier.buildTraits(neutral,core,{'D-DYN1':3});
assert.equal(onlyDynamic['method.practical_reasoning'],undefined);
assert.equal(onlyDynamic['time.living_content']||0,0);
const identity=c.LAW_RESULT_IDENTITIES.find(x=>x.id==='interpretive_pluralist');
const classification=traits=>({identity,traits});
const practical=e.build(classification(plain),neutral);
assert.equal(practical.id,'pluralist_practical');
assert.doesNotMatch(practical.context,/legal meaning may evolve/);
const dynamic=e.build(classification(positive),neutral);
assert.equal(dynamic.id,'pluralist_practical_dynamic_statutory');
assert.match(dynamic.context,/later life helps determine its legal meaning/);
assert.match(dynamic.context,/precise statutory definition/);
const wholeScores={...neutral,time:35,prec:80,post:20};
const wholePlain=e.build(classification(plain),wholeScores);
const wholeDynamic=e.build(classification(positive),wholeScores);
assert.notEqual(wholeDynamic.id,wholePlain.id,'Confirmed dynamic statutory evidence must remain visible in a whole-profile portrait');
assert.match(wholeDynamic.id,/dynamic_statutory_continuity/);
assert.match(wholeDynamic.context,/unchanged meaning to new facts/);
assert.match(wholeDynamic.context,/reliance/);
assert.ok(wholeDynamic.id.startsWith('portrait_'));
assert.doesNotMatch(wholeDynamic.id,/_dynamic_statutory$/);
assert.deepEqual(e.build(classification(plain),neutral,practical.id,practical.openingId),practical);
assert.equal(e.build(classification({}),neutral,dynamic.id,dynamic.openingId).context,dynamic.context);
for(const p of [practical,dynamic]){
 assert.ok(e.wordCount(p.context)<=300); assert.ok(e.wordCount(p.opening)<=70);
}
// The optional trait improves evidence, not the underlying eligibility gate.
const get=traits=>classifier.resolveChampions(neutral,traits,identity).candidates.find(x=>x.profile.id==='eskridge_frickey');
assert.ok(get(plain));assert.ok(get(positive).score>get(plain).score);
assert.equal(get(onlyDynamic),undefined);
assert.ok(get(positive).evidence.supportedTraits.includes('method.dynamic_statutory'));
// Priority questions retain precedence over this narrow refinement.
const next=classifier.nextDiagnostic(neutral,core,base);
assert.ok(next && next.id!=='D-DYN1','Unresolved primary priorities must be tested first');
// Literal adaptive path: all other theory probes rejected, method central.
const answer=id=>id==='D-QC1'?-2:id==='D-QC2'?1:
 id==='D-PLU1'||id==='D-PLU2'||id==='D-DYN1'?3:
 id.startsWith('D-PRI-')?(id.split('-')[2]==='method'?3:id.split('-')[3]==='method'?-3:0):-3;
const responses={};const order=[];
while(order.length<12){const q=classifier.nextDiagnostic(neutral,core,responses);if(!q)break;assert.ok(!order.includes(q.id));order.push(q.id);responses[q.id]=answer(q.id);}
assert.ok(order.includes('D-DYN1'),'Reachable supported practical path: '+order.join(','));
assert.ok(order.indexOf('D-DYN1')>order.indexOf('D-PLU2'));
assert.equal(classifier.nextDiagnostic(neutral,core,responses),null);
assert.equal(c.LAW_QUESTIONS.length,88);assert.equal(classifier.MAX_DIAGNOSTICS,12);assert.equal(classifier.MAX_TOTAL_QUESTIONS,100);
// The statutory-dynamic diagnostic does not alter any axis percentage.
assert.deepEqual(c.LAW_SCORING.scoreAllWithDiagnostics(core,{...base,'D-DYN1':3}),c.LAW_SCORING.scoreAllWithDiagnostics(core,base));
// Replay with fresh browser state and no traits: new IDs carry the evidence;
// old practical IDs do not acquire new claims.
for(const narrative of [practical,dynamic]){
 const params=new URLSearchParams({...neutral,v:c.LAW_VERSION,i:identity.id,c:'eskridge_frickey',x:narrative.id,o:narrative.openingId});
 r.storage.clear();r.location.search='?'+params;r.newDocument();r.run('results.js');
 const shown=r.ctx.document.getElementById('result-context').textContent;
 assert.equal(shown,narrative.context);
}
console.log('PASS: separate dynamic evidence, practical-only/negative/unknown, optional affinity, live routing, priority ordering, 88+12 cap, unchanged axes, fresh-session old/new narrative replay.');
console.log('Dynamic path:',order.join(' -> '));

