import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {runtime} from './fixtures/whole-profile/runtime.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)).replace(/\/$/,'');
const c=runtime(root).ctx,cl=c.LAW_CLASSIFIER;
const profiles=Object.fromEntries(c.LAW_PROFILES.map(p=>[p.id,p]));
assert.equal(profiles.kavanaugh_barrett.selectable,false);
assert.equal(profiles.kavanaugh_barrett.tier,'lineage');
assert.notEqual(profiles.barrett.selectable,false);
const textualist=c.LAW_RESULT_IDENTITIES.find(x=>x.id==='textualist');
const originalist=c.LAW_RESULT_IDENTITIES.find(x=>x.id==='public_meaning_originalist');
const scores={sorc:72,cons:92,time:86,prec:68,remed:58,post:48,separ:78,form:78};
const traits={'constraint.textual':1,'constraint.contextual_textualism':1,'constraint.best_reading_context':1,'separation.independent_judicial_interpretation':1,'time.public_meaning':.8,'time.fixation':.8,'form.anti_discretion':.65};
const resolution=cl.resolveIdentity(scores,traits);
const match=cl.resolveChampions(scores,traits,resolution.best.identity);
assert.equal(match.matches[0].profile.id,'scalia_manning_easterbrook');
assert.ok(!match.candidates.some(x=>['kavanaugh_barrett','kagan'].includes(x.profile.id)));
console.log('Frozen former-Kavanaugh vector:',resolution.best.identity.id,JSON.stringify(match.candidates.map(x=>[x.profile.id,x.score])));
const get=(t,s=scores,i=textualist)=>cl.resolveChampions(s,t,i).candidates.find(x=>x.profile.id==='scalia_manning_easterbrook');
const without={...traits};delete without['constraint.contextual_textualism'];delete without['constraint.best_reading_context'];
assert.ok(get(traits).score>=get(without).score,'Context is not an anti-trait for Manning');
assert.ok(!profiles.scalia_manning_easterbrook.antiTraits.includes('constraint.best_reading_context'));
// Kagan still needs affirmative institutional accommodation, not just contextual reading.
for(const accommodation of [undefined,0,.3]){
 const t={...traits,'separation.interpretive_accommodation':accommodation};
 assert.ok(!cl.resolveChampions(scores,t,textualist).candidates.some(x=>x.profile.id==='kagan'));
}
assert.ok(cl.resolveChampions({...scores,separ:34,prec:88},{...traits,'separation.interpretive_accommodation':1},textualist).candidates.some(x=>x.profile.id==='kagan'));
const barrettTraits={'time.public_meaning':1,'time.fixation':1,'time.originalism_independent_authority':1,'precedent.stability':1,'precedent.settlement':1,'precedent.protective_rule_stability':1,'constraint.textual':.8};
assert.equal(cl.resolveChampions({sorc:76,cons:86,time:90,prec:84,remed:72,post:60,separ:76,form:78},barrettTraits,originalist).matches[0].profile.id,'barrett');
const params=new URLSearchParams({...scores,i:'textualist',c:'kavanaugh_barrett'});
const rr=runtime(root,{search:'?'+params});rr.run('results.js');
assert.equal(rr.nodes.get('champion-line').textContent,'Closest thinker: Brett Kavanaugh');
rr.nodes.get('copy-link').click();assert.equal(new URL(rr.clipboard()).searchParams.get('c'),'kavanaugh_barrett');
console.log('PASS: Kavanaugh historical replay, contextual Manning without forced transfer, Kagan gate, Barrett preserved');
