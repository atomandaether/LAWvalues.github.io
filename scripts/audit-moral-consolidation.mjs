import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {runtime} from './fixtures/whole-profile/runtime.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)).replace(/\/$/,'');
const r=runtime(root),c=r.ctx,cl=c.LAW_CLASSIFIER;
const id='greenberg_hershovitz';
const profiles=Object.fromEntries(c.LAW_PROFILES.map(p=>[p.id,p]));
const identity=c.LAW_RESULT_IDENTITIES.find(x=>x.id==='nonpositivist');
const scores=Object.fromEntries(c.LAW_AXES.map(a=>[a.id,a.id==='sorc'?28:50]));
const core=Object.fromEntries(c.LAW_QUESTIONS.map(q=>[q.id,0]));
const candidate=(diags, shell=scores)=>{
 const traits=cl.buildTraits(shell,core,diags);
 return cl.resolveChampions(shell,traits,identity).candidates.find(x=>x.profile.id===id);
};
const impact=candidate({'D-NP4':3});
const practice=candidate({'D-NP5':3});
const both=candidate({'D-NP4':3,'D-NP5':3});
assert.ok(impact && practice && both,'Either direct signature and both together qualify');
assert.equal(both.score,impact.score,'No dual-agreement reward or penalty');
assert.equal(both.score,practice.score,'Alternative evidence is equally sufficient');
assert.deepEqual(Array.from(both.evidence.traitDisagreements),[]);
for(const a of [-3,-2,-1,0,null]){
 assert.equal(candidate({'D-NP4':a,'D-NP5':a}),undefined,'No affirmation, no combined match');
 assert.ok(candidate({'D-NP4':3,'D-NP5':a}),'Impact evidence does not require rejecting or knowing practice');
 assert.ok(candidate({'D-NP4':a,'D-NP5':3}),'Practice evidence does not require rejecting or knowing impact');
}
assert.equal(candidate({}),undefined);
assert.equal(cl.resolveChampions(scores,{'source.one_system':1},identity).candidates.some(x=>x.profile.id===id),false,'Generic one-system evidence alone does not pass the specific gate');
for(const shell of [scores,{...scores,cons:65,time:40,post:30,form:60}]){
 const match=candidate({'D-NP4':3,'D-NP5':3},shell);
 assert.ok(match);
 assert.deepEqual(Array.from(match.evidence.modeledAxes),['sorc']);
 if(shell.post===30) assert.ok(match.evidence.unknownAxes.includes('post'),'Salient unmodeled commitments remain disclosed');
}
for(const old of ['greenberg','hershovitz']){
 assert.equal(profiles[old].selectable,false);
 assert.equal(profiles[old].supersededBy,id);
 assert.ok(!cl.resolveChampions(scores,cl.buildTraits(scores,core,{'D-NP4':3,'D-NP5':3}),identity).candidates.some(x=>x.profile.id===old));
}
assert.equal(c.LAW_QUESTIONS.length,88);
assert.equal(cl.MAX_DIAGNOSTICS,12);
assert.equal(cl.MAX_TOTAL_QUESTIONS,100);
// Exercise actual fresh-session renderer and copy-link for both historical IDs
// and the new combined ID, preserving each link's selected champion and modifier.
for(const [champion,modifier] of [['greenberg','moral_impact_nonpositivism'],['hershovitz','moral_practice_nonpositivism'],[id,'moral_impact_nonpositivism'],[id,'moral_practice_nonpositivism']]){
 const params=new URLSearchParams({...scores,i:'nonpositivist',c:champion,m:modifier});
 const rr=runtime(root,{search:'?'+params});rr.run('results.js');
 assert.equal(rr.nodes.get('champion-line').textContent,'Champion: '+profiles[champion].name);
 assert.ok(rr.nodes.get('champion-description').textContent.startsWith(profiles[champion].description));
 rr.nodes.get('copy-link').click();
 const copied=new URL(rr.clipboard());
 assert.equal(copied.searchParams.get('c'),champion);
 assert.equal(copied.searchParams.get('m'),modifier);
}
console.log('PASS: moral-rights consolidation, either signature, dual agreement, mixed/unknown evidence, historical/new share replay, 88+12 cap');

// Roster-dependent fuzz exposed a pre-existing replay gap for residual fallback
// phrases. Explicit saved IDs must win over recomputation without answer traits.
for(const phrase of Object.values(c.LAW_RESULT_CONTENT.FALLBACK_PHRASES)){
 const replay=c.LAW_RESULT_CONTENT.fromIds(identity,scores,{}, {phraseId:phrase.id});
 assert.equal(replay.phrase.id,phrase.id);assert.equal(replay.phrase.text,phrase.text);
 const params=new URLSearchParams({...scores,i:'nonpositivist',c:id,p:phrase.id});
 const rr=runtime(root,{search:'?'+params});rr.run('results.js');
 assert.ok(rr.nodes.get('result-title').textContent.endsWith(phrase.text));
}
console.log('PASS: both existing residual fallback phrase IDs replay without changing their wording');
