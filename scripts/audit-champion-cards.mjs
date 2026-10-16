import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {runtime} from './fixtures/whole-profile/runtime.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)).replace(/\/$/,'');
const r=runtime(root), c=r.ctx, api=c.LAW_CHAMPION_CARDS;
const profiles=c.LAW_PROFILES.filter(p=>p.tier!=='lineage');
assert.equal(profiles.length,83);
const scores={sorc:50,cons:50,time:50,prec:50,remed:50,post:50,separ:50,form:50};
let count=0;
for(const p of profiles){
 const copy=c.LAW_CHAMPION_CONTENT[p.id];
 assert.ok(copy,`Missing content ${p.id}`);
 assert.ok(copy.tagline && copy.bio && copy.sources.length,`Incomplete ${p.id}`);
 assert.ok(copy.tagline.split(/\s+/).length<=40,`Long tagline ${p.id}`);
 assert.ok(copy.bio.split(/\s+/).length>=80 && copy.bio.split(/\s+/).length<=150,`Portrait length ${p.id}`);
 for(const source of copy.sources) assert.match(source.url,/^https:\/\//);
 for(const id of Object.keys(copy.fitTraits)) assert.ok([...(p.signatureTraits||[]),...(p.supportingTraits||[])].includes(id),`${p.id}: unmapped trait ${id}`);
 for (const id of Object.keys(copy.fitTraits)) assert.ok(copy.fitPriority[id]>=1 && copy.fitPriority[id]<=5, `${p.id}: authored relevance ${id}`);
 for (const rule of copy.affinities || []) { assert.ok(rule.allTraits.length>=2 && rule.allTraits.length<=3); for(const id of rule.allTraits) assert.ok(copy.fitTraits[id],`${p.id}: affinity trait ${id}`); }
 const traits=Object.fromEntries(Object.keys(copy.fitTraits).map(id=>[id,1]));
 const classification={identity:{id:p.identityIds[0]},champions:[{id:p.id}],traits,championConfidence:'high'};
 const card=api.build(classification,scores);
 assert.equal(card.name,p.name);assert.equal(card.tagline,copy.tagline);assert.equal(card.paragraph,copy.bio);
 if(Object.keys(traits).length) assert.ok(card.fit.includes('You share the view that'));
 else assert.ok(!card.fit.includes('You share the view that'));
 const serialized=api.toShare(classification);
 const shared={...classification,traits:undefined,champions:[{id:p.id,evidence:api.decodeEvidence(p.id,serialized?.ids || '',serialized?.version || '2',serialized?.affinityId)}]};
 assert.equal(api.build(shared,scores).paragraph,card.paragraph,`${p.id} share replay`);
 const absent=api.build({...classification,traits:{}},scores);
 assert.ok(!absent.fit.includes('You share the view that'),`${p.id} invented evidence`);
 const negative=api.build({...classification,traits:Object.fromEntries(Object.keys(traits).map(id=>[id,-1]))},scores);
 assert.equal(negative.paragraph,absent.paragraph);
 const legacy=api.build(classification,scores,{legacy:true});
 assert.equal(legacy.paragraph,absent.paragraph);
 assert.deepEqual([...api.fromIds(p.id,'<script>alert(1)</script>,unrelated.trait')],[]);
 assert.deepEqual([...api.fromIds(p.id,'x'.repeat(301))],[]);
 count++;
}

const sourceAudit=JSON.parse(fs.readFileSync(root+'/CHAMPION_SOURCE_AUDIT.json','utf8'));
assert.deepEqual(sourceAudit.cards.map(row=>row.id).sort(),Array.from(profiles,p=>p.id).sort());
assert.equal(new Set(profiles.map(p=>c.LAW_CHAMPION_CONTENT[p.id].tagline)).size,83);
assert.equal(new Set(profiles.map(p=>c.LAW_CHAMPION_CONTENT[p.id].bio)).size,83);
for (const row of sourceAudit.cards) {
 assert.ok(row.thesis && row.primaryEvidence && row.limits,`${row.id}: source audit completeness`);
 assert.deepEqual(row.sources,JSON.parse(JSON.stringify(c.LAW_CHAMPION_CONTENT[row.id].sources)),`${row.id}: source audit parity`);
}

// Every selectable single/group remains one authored card in current and legacy
// shared results. Evidence affects the API fit, never the intellectual portrait.
for (const version of [c.LAW_VERSION, '0.8']) {
 for (const p of profiles) {
  const query = new URLSearchParams({...scores,v:version,i:p.identityIds[0] || 'interpretivist',c:p.id});
  const rendered=runtime(root,{search:'?'+query}); rendered.run('results.js');
  assert.equal(rendered.nodes.get('champion-card').hidden,false,`${version}: ${p.id} visible`);
  assert.equal(rendered.nodes.get('champion-line').textContent,`Champion: ${p.name}`);
  assert.equal(rendered.nodes.get('champion-tagline').textContent,c.LAW_CHAMPION_CONTENT[p.id].tagline);
  assert.equal(rendered.nodes.get('champion-portrait').textContent,c.LAW_CHAMPION_CONTENT[p.id].bio);
 }
}
const approved=JSON.parse(fs.readFileSync(root+'/scripts/fixtures/approved-champion-copy.json','utf8'));
for (const [id,copy] of Object.entries(approved)) {
 assert.equal(c.LAW_CHAMPION_CONTENT[id].tagline,copy.tagline,`${id}: approved headline`);
 assert.equal(c.LAW_CHAMPION_CONTENT[id].bio,copy.bio,`${id}: approved paragraph`);
}

// Ranked evidence must not depend on object insertion order. Compounds require
// independently supporting questions, and old links never manufacture that provenance.
const kaganTraits={'constraint.contextual_textualism':0.667,'precedent.settlement':1,'separation.interpretive_accommodation':0.667};
const kc={champions:[{id:'kagan'}],traits:kaganTraits};
assert.equal(api.build(kc,scores).affinityId,null);
assert.equal(api.build({...kc,traits:Object.fromEntries(Object.entries(kaganTraits).reverse())},scores).paragraph,api.build(kc,scores).paragraph);
const originalEvidence=c.LAW_CLASSIFIER.buildTraitEvidence;
const evidence=(unique)=>Object.fromEntries(Object.keys(kaganTraits).map((id,i)=>[id,{coreSupport:{[unique?'Q'+i:'Qsame']:1}}]));
c.LAW_CLASSIFIER={...c.LAW_CLASSIFIER,buildTraitEvidence:()=>evidence(false)};
assert.equal(api.build(kc,scores,{responses:{}}).affinityId,null);
c.LAW_CLASSIFIER={...c.LAW_CLASSIFIER,buildTraitEvidence:()=>evidence(true)};
const compound=api.build(kc,scores,{responses:{}});
assert.equal(compound.affinityId,'kagan-institutional-craft');
const payload=api.toShare(kc,{responses:{}});
assert.equal(payload.version,2);
const decoded=api.decodeEvidence('kagan',payload.ids,payload.version,payload.affinityId);
assert.equal(api.build({champions:[{id:'kagan',evidence:decoded}]},scores).paragraph,compound.paragraph);
assert.equal(api.decodeEvidence('kagan','precedent.settlement~0.9','2',payload.affinityId).cardAffinityId,null);
assert.equal(api.decodeEvidence('kagan',Object.keys(kaganTraits).join(','),'1',payload.affinityId).cardAffinityId,null);
for (const bad of ['precedent.settlement~NaN','precedent.settlement~0.499','precedent.settlement~1.1','precedent.settlement~0.9~1','x'.repeat(501)]) assert.equal(api.decodeEvidence('kagan',bad,'2').supportedTraits.length,0);
c.LAW_CLASSIFIER={...c.LAW_CLASSIFIER,buildTraitEvidence:originalEvidence};

assert.equal(api.build({champions:[]},scores),null);
assert.equal(api.build({champions:[{id:'hart'},{id:'kelsen'}]},scores),null);
assert.equal(api.build({champions:[{id:'unknown'}]},scores),null);
assert.doesNotThrow(()=>api.build({champions:[{id:'hart',evidence:{supportedTraits:{bad:true}}}]},scores));
for (const profile of c.LAW_PROFILES.filter(p=>p.tier==='lineage')) assert.equal(api.build({champions:[{id:profile.id}]},scores),null);
assert.equal(api.build({identity:{id:'incoherent_response'},champions:[{id:'hart'}]},scores),null);
assert.deepEqual([...api.fromIds('unknown','source.social_practice')],[]);
const axisOnly=api.build({champions:[{id:'hart'}]}, {...scores,sorc:95});
assert.match(axisOnly.fit,/saved scores suggest/);
assert.ok(!api.build({champions:[{id:'hart'}]},{...scores,sorc:0}).fit.includes('saved scores suggest'));
const coleman=c.LAW_PROFILES.find(p=>p.id==='coleman_waluchow_kramer');
const query=new URLSearchParams({...scores,v:c.LAW_VERSION,i:'positivist',c:coleman.id,cev:'1',ce:'source.morality_incorporated',cf:'high'});
const sharedRuntime=runtime(root,{search:'?'+query}); sharedRuntime.run('results.js');
assert.equal(sharedRuntime.nodes.get('champion-card').hidden,false);
assert.equal(sharedRuntime.nodes.get('champion-portrait').textContent,c.LAW_CHAMPION_CONTENT[coleman.id].bio);
assert.equal(sharedRuntime.nodes.get('champion-line').textContent,`Champion: ${coleman.name}`);
const unsupported=runtime(root,{search:'?'+new URLSearchParams({...scores,v:c.LAW_VERSION,i:'positivist',c:coleman.id,cev:'99',ce:'source.morality_incorporated'})});unsupported.run('results.js');
assert.ok(!unsupported.nodes.get('champion-portrait').textContent.includes('You share the view that'));
const missing=runtime(root,{search:'?'+new URLSearchParams(scores)});missing.run('results.js');assert.equal(missing.nodes.get('champion-card').hidden,true);
const html=fs.readFileSync(root+'/results.html','utf8');
assert.ok(html.indexOf('id="champion-card"')<html.indexOf('id="result-narrative"'));
assert.ok(html.indexOf('id="champion-line"')<html.indexOf('id="champion-tagline"'));
assert.ok(html.indexOf('id="champion-tagline"')<html.indexOf('id="champion-portrait"'));
assert.match(html,/id="classification-panel" hidden/);
console.log(`PASS: ${count} champion cards, sourced content, exact authored prose and shared replay, supported-only API fit, legacy/unknown/ambiguous/withheld fallback, unsafe-ID rejection and top-card placement.`);
