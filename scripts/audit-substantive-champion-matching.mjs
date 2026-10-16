import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {runtime} from './fixtures/whole-profile/runtime.mjs';

const root=fileURLToPath(new URL('../',import.meta.url)).replace(/\/$/,'');
const c=runtime(root).ctx,cl=c.LAW_CLASSIFIER;
const selectable=c.LAW_PROFILES.filter(p=>p.selectable!==false&&p.tier!=='lineage');
const neutral=Object.fromEntries(cl.AXIS_IDS.map(id=>[id,50]));
assert.equal(selectable.length,83,'The locked selectable champion roster changed');

function affirmativeProfile(profile) {
  const scores={...neutral};
  for(const [axis,spec] of Object.entries(profile.axisSignature||{})) scores[axis]=spec.target;
  const traits={};
  for(const trait of [...profile.signatureTraits||[],...profile.supportingTraits||[]]) traits[trait]=1;
  for(const rule of profile.requiredTraits||[]) for(const trait of [...rule.all||[],...rule.any||[]]) traits[trait]=1;
  return {scores,traits};
}

// Every selectable profile is audited against arbitrary noun arguments and a
// copy with all identity/display membership removed. Only substantive evidence
// may affect its score.
for(const profile of selectable) {
  const {scores,traits}=affirmativeProfile(profile);
  const baseline=cl.scoreProfile(profile,scores,traits,{id:'textualist'});
  assert.notEqual(baseline,null,`${profile.id}: affirmative profile must be scoreable`);
  for(const identity of [{id:'public_meaning_originalist'},{id:'living_constitutionalist'},{id:'mixed_jurisprudence'},null])
    assert.equal(cl.scoreProfile(profile,scores,traits,identity),baseline,`${profile.id}: noun argument changed score`);
  const stripped={...profile,identityIds:[],crossCuttingIdentityIds:[],crossCuttingRequirements:{}};
  assert.equal(cl.scoreProfile(stripped,scores,traits,{id:'positivist'}),baseline,
    `${profile.id}: catalog membership changed substantive score`);
  const resolvedA=cl.resolveChampions(scores,traits,{id:'textualist'},{best:{priorityFamily:'method'}});
  const resolvedB=cl.resolveChampions(scores,traits,{id:'living_constitutionalist'},{best:{priorityFamily:'time'}});
  assert.equal(resolvedB.confidence,resolvedA.confidence,`${profile.id}: noun metadata changed confidence`);
  assert.deepEqual(resolvedB.candidates.map(item=>[item.profile.id,item.score]),
    resolvedA.candidates.map(item=>[item.profile.id,item.score]),`${profile.id}: noun metadata changed ranking`);
}

// Direct priority answers weight evidence already present in a profile. They
// cannot manufacture a specialist's missing doctrine.
const solum=c.LAW_PROFILES.find(p=>p.id==='solum');
const solumScores={...neutral,time:90};
for(const value of [undefined,0,.33]) {
  const traits=value===undefined?{}:{'time.construction_zone':value};
  assert.equal(cl.scoreProfile(solum,solumScores,traits,null),null,'Unconfirmed Solum prerequisite leaked');
}
assert.notEqual(cl.scoreProfile(solum,solumScores,{'time.construction_zone':.5},null),null);
assert.equal(cl.scoreProfile(solum,solumScores,{
  'time.construction_zone':1,'time.precedent_mediated_historicism':1
},null),null,'Strong defining rejection must exclude Solum');
assert.equal(cl.scoreProfile(solum,solumScores,{'priority.time.over.method':1},null),null,
  'Priority evidence alone cannot establish construction-zone doctrine');

for(const profile of selectable.filter(p=>p.definingConflicts?.length)) {
  const {scores,traits}=affirmativeProfile(profile);
  assert.notEqual(cl.scoreProfile(profile,scores,traits,null),null,`${profile.id}: clean baseline unexpectedly excluded`);
  const conflict={...traits};
  for(const rule of profile.definingConflicts) for(const trait of [...rule.all||[],...rule.any||[]]) conflict[trait]=1;
  assert.equal(cl.scoreProfile(profile,scores,conflict,null),null,`${profile.id}: documented defining conflict did not exclude`);
}

for(const id of ['hugo_black','kagan','scalia_manning','thayer','bickel','solum','dworkin_stavropoulos','barak']) {
  const profile=c.LAW_PROFILES.find(p=>p.id===id);
  const {scores,traits}=affirmativeProfile(profile);
  const resolution=cl.resolveIdentity(scores,traits);
  const match=cl.resolveChampions(scores,traits,resolution.best.identity,resolution);
  assert.equal(match.matches[0]?.profile.id,id,`${id}: coherent affirmative profile regressed`);
  assert.equal(new Set(match.candidates.map(item=>item.profile.id)).size,match.candidates.length,`${id}: duplicate candidate`);
}

const barak=c.LAW_PROFILES.find(p=>p.id==='barak');
assert.ok(barak.identityIds.includes('living_constitutionalist'));
assert.ok(Object.hasOwn(barak.axisSignature,'time'));
assert.ok(barak.signatureTraits.includes('time.living_content'));
const barakEvidence={
  'constraint.purpose':1,'time.living_content':1,'form.proportionality':1,'posture.rights_trumps':1
};
const barakScores={...neutral,sorc:25,cons:10,time:8,prec:55,remed:24,post:10,separ:30,form:6};
const barakResolution=cl.resolveIdentity(barakScores,barakEvidence);
assert.equal(cl.resolveChampions(barakScores,barakEvidence,barakResolution.best.identity,barakResolution).matches[0]?.profile.id,'barak');

// Unmodeled commitments are uncertainty: they do not become agreement or
// increase confidence for a zero-axis specialist.
const levinson=c.LAW_PROFILES.find(p=>p.id==='levinson');
const levinsonTraits={'remedies.equilibration':1};
const sparse=cl.scoreProfile(levinson,neutral,levinsonTraits,null);
const unrelated=cl.scoreProfile(levinson,{...neutral,sorc:100,time:0,cons:100},levinsonTraits,null);
assert.ok(unrelated<=sparse,'Strong unmodeled commitments increased sparse-profile affinity');
const sparseMatch=cl.resolveChampions({...neutral,remed:25},levinsonTraits,{id:'minimalist'});
assert.equal(sparseMatch.matches[0]?.profile.id,'levinson','Sparse-confidence control must exercise the intended specialist winner');
assert.notEqual(sparseMatch.confidence,'high','Zero-axis specialist cannot claim broad high confidence');

// Rejected theory probes are evidence against those theories, not a license to
// force an adjacent named profile. Low-theory evidence must retain the explicit
// conservative catchall.
const rejectedTheoryTraits={
  'method.low_theory_space':1,
  'source.independent_moral_validity_rejected':1,
  'source.interpretivism_rejected':1
};
const rejectedTheory=cl.resolveChampions(neutral,rejectedTheoryTraits,{id:'mixed_jurisprudence'});
assert.equal(rejectedTheory.matches[0]?.profile.id,'oconnor','Rejected theories must preserve the low-theory O\'Connor fallback');

console.log(`PASS: all ${selectable.length} selectable champions are noun/display invariant; explicit conflicts, prerequisites, priorities, Barak repair, coherence controls, uniqueness, and sparse confidence.`);
