import { fileURLToPath } from 'node:url';
import fs from 'node:fs';import assert from 'node:assert/strict';import crypto from 'node:crypto';import{runtime,runtimeFiles}from './fixtures/whole-profile/runtime.mjs';
const out=fileURLToPath(new URL('./fixtures/whole-profile/',import.meta.url)),root=fileURLToPath(new URL('../',import.meta.url)).replace(/\/$/,'');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');const manifest=JSON.parse(fs.readFileSync(out+'extended-input-manifest.json'));for(const[file,{sha256}]of Object.entries(manifest.files))assert.equal(hash(fs.readFileSync(out+file)),sha256);
const legacyScoreBytes=fs.readFileSync(out+'legacy-08-score-baseline.json');
assert.equal(hash(legacyScoreBytes),'af26d8032e6a882506dac2e22eff1a597c31d3aac0dbd3bbef29a35e8f98d0f9','Historical score baseline changed');
const legacyScores=Object.fromEntries(JSON.parse(legacyScoreBytes).fixtures.map(f=>[f.id,f.scores]));
const controlsBytes=fs.readFileSync(out+'prospective-controls-frozen.json');assert.equal(hash(controlsBytes),JSON.parse(fs.readFileSync(out+'prospective-controls-manifest.json')).sha256);
const packageManifest=JSON.parse(fs.readFileSync(out+'package-manifest.json'));for(const[file,sha256]of Object.entries(packageManifest))assert.equal(hash(fs.readFileSync(out+file)),sha256,'Fixture changed '+file);
const originals=['mara','alex','imani'].map(id=>({id,answers:JSON.parse(fs.readFileSync(out+id+'-answer-plan-extended.json')).answers}));const controls=JSON.parse(controlsBytes).fixtures;
const commonGoodAmendment=JSON.parse(fs.readFileSync(out+'common-good-priority-amendment.json'));for(const f of [...originals,...controls]){for(const [id,answer]of Object.entries(commonGoodAmendment.answersByFixture[f.id])){assert.ok(!Object.hasOwn(f.answers,id),'Amendment must not overwrite frozen answers');f.answers[id]=answer;}}
const dynamicAmendment=JSON.parse(fs.readFileSync(out+'dynamic-statutory-amendment.json'));assert.equal(dynamicAmendment.answer.value,null);for(const f of [...originals,...controls]){assert.ok(!Object.hasOwn(f.answers,dynamicAmendment.prompt.id));f.answers[dynamicAmendment.prompt.id]=dynamicAmendment.answer;}
const prompts=Object.fromEntries([dynamicAmendment.prompt,...commonGoodAmendment.prompts,...JSON.parse(fs.readFileSync(out+'baseline-prompts.json')),...JSON.parse(fs.readFileSync(out+'priority-wording-amendment.json')).prompts].map(x=>[x.id,x.prompt]));
const fields=['result-title','result-opening','result-context','champion-line','champion-description','classification-note'];
function runFixture(f){const r=runtime(root,{instrumentVersion:'0.8'});const{ctx,storage}=r;assert.match(ctx.LAW_VERSION,/^0\.8\s*Beta$/);for(const q of[...ctx.LAW_QUESTIONS,...ctx.LAW_CLASSIFIER.diagnosticBank()]){assert.equal(q.prompt,prompts[q.id],'Unfrozen prompt '+q.id);assert.ok(Object.hasOwn(f.answers,q.id),'Unfrozen answer '+q.id);}r.run('quiz.js');const stateKey='lawvalues-quiz-'+ctx.LAW_VERSION;const log=[];
 while(!r.location.destination){assert.ok(log.length<100,'Cap exceeded');const s=JSON.parse(storage.getItem(stateKey));const id=s.phase==='core'?s.order[s.index]:s.diagnosticOrder[s.diagnosticIndex];assert.equal(r.nodes.get('question-text').textContent,prompts[id]);assert.ok(!log.some(x=>x.id===id),'Repeated question');const value=f.answers[id].value;r.advance();log.push({id,phase:s.phase,value});if(value===null)r.nodes.get('skip_button').click();else r.buttons.find(b=>Number(b.dataset.response)===value).click();}
 const record=JSON.parse(storage.getItem('lawvalues-latest-'+ctx.LAW_VERSION));assert.deepEqual(record.scores,legacyScores[f.id],'Historical 0.8 scores changed for '+f.id);assert.equal(log.filter(x=>x.phase==='core').length,88);assert.deepEqual(record.diagnosticOrder,log.filter(x=>x.phase==='diagnostic').map(x=>x.id));const core=ctx.LAW_SCORING.scoreAll(record.responses);assert.deepEqual(record.scores,Object.fromEntries(ctx.LAW_AXES.map(a=>[a.id,core[a.id].score])));r.run('results.js');const local=Object.fromEntries(fields.map(id=>[id,r.nodes.get(id).textContent]));storage.clear();const fresh=r.newDocument();r.run('results.js');const shared=Object.fromEntries(fields.map(id=>[id,fresh.nodes.get(id).textContent]));const replay=Object.fromEntries(fields.map(id=>[id,shared[id]===local[id]]));for(const id of fields)assert.equal(shared[id],local[id],f.id+' replay '+id);
 const result={id:f.id,primary:f.primary||null,log,record,local,shared,replay,url:r.location.destination};
 // Exact current result survives query reordering, but never contaminates a
 // different shared result that happens to have identical eight axis scores.
 storage.setItem('lawvalues-latest-'+ctx.LAW_VERSION,JSON.stringify(record));
 const originalSearch=r.location.search;
 const reversed=new URLSearchParams([...new URLSearchParams(originalSearch)].reverse());
 r.location.search='?'+reversed.toString();let cacheDoc=r.newDocument();r.run('results.js');
 for(const id of fields)assert.equal(cacheDoc.nodes.get(id).textContent,local[id],'Query ordering changed output');
 const other=new URLSearchParams(originalSearch);
 other.set('i',ctx.LAW_RESULT_IDENTITIES.find(x=>x.id!==record.classification.identity.id&&x.id==='textualist')?.id||'positivist');
 other.set('c',ctx.LAW_PROFILES.find(x=>x.id!==record.classification.champions[0]?.id&&x.selectable!==false)?.id||'');
 const portrait=Object.keys(ctx.LAW_RESULT_NARRATIVE.ROUTES).find(id=>id.startsWith('portrait_')&&id!==other.get('x'));
 other.set('x',portrait);other.set('o',portrait);r.location.search='?'+other.toString();cacheDoc=r.newDocument();r.run('results.js');
 const cachedOther=Object.fromEntries(fields.map(id=>[id,cacheDoc.nodes.get(id).textContent]));storage.clear();cacheDoc=r.newDocument();r.run('results.js');
 for(const id of fields)assert.equal(cacheDoc.nodes.get(id).textContent,cachedOther[id],'Same-axis cache contamination '+id);
 r.location.search=originalSearch;
return result;}
const sourceHashes=Object.fromEntries([...runtimeFiles,'quiz.js','results.js'].map(file=>[file,hash(fs.readFileSync(root+'/'+file))]));
const summaries=[];const missingPriorityDiscovery=[];const unsupportedPrimaryConfidence=[];
const primaryDomains={source:{axes:['sorc'],prefixes:['source.']},time:{axes:['time'],prefixes:['time.']},method:{axes:['cons'],prefixes:['method.','constraint.']},realism:{axes:[],prefixes:['realism.']},posture:{axes:['post'],prefixes:['posture.']},structure:{axes:['separ'],prefixes:['separation.']},form:{axes:['form'],prefixes:['form.']}};for(const f of[...originals,...controls]){const result=runFixture(f);const repeat=runFixture(f);assert.deepEqual(repeat.record,result.record,'Nondeterministic '+f.id);const c=result.record.classification;
 if(c.identityPriority?.unresolved)assert.notEqual(c.resultTitle?.modifier?.id,'fit_unmistakable','Unresolved primary cannot claim unmistakable separation');
 if((f.primary==='realism'&&(c.traits['realism.extra_doctrinal']||0)>=.5&&(c.traits['realism.empirical_prediction']||0)>=.5)||(f.primary==='method'&&(c.traits['method.modal_pluralism']||0)>=.5)){
   const probe=runtime(root,{instrumentVersion:'0.8'});const withoutPriority={...c,traits:Object.fromEntries(Object.entries(c.traits).filter(([key])=>!key.startsWith('priority.')))};
   const ordinary=probe.ctx.LAW_RESULT_NARRATIVE.build(withoutPriority,result.record.scores);const full=probe.ctx.LAW_RESULT_NARRATIVE.build(c,result.record.scores);
   assert.notEqual(full.id,ordinary.id,'Confirmed defining method/realism must survive in whole-profile portrait '+f.id);
 }
 const row={id:f.id,expectedPrimary:f.primary||null,identity:c.identity.id,family:c.identity.family,champions:c.champions,championConfidence:c.championConfidence,questionCount:result.log.length,diagnostics:result.record.diagnosticOrder,title:result.local['result-title'],opening:result.local['result-opening'],context:result.local['result-context'],replay:result.replay};summaries.push(row);if(f.primary&&c.champions.length){const domain=primaryDomains[f.primary],e=c.champions[0].evidence||{};const supported=(e.modeledAxes||[]).some(axis=>domain.axes.includes(axis)&&!(e.knownDisagreements||[]).includes(axis))||(e.supportedTraits||[]).some(trait=>domain.prefixes.some(prefix=>trait.startsWith(prefix)));if(!supported&&c.championConfidence!=='low')unsupportedPrimaryConfidence.push(f.id+': '+f.primary+' unknown despite '+c.championConfidence+' match');}if(f.primary&&!result.log.some(answer=>answer.id.startsWith('D-PRI-')&&answer.id.split('-').slice(2).includes(f.primary)&&answer.value!==null))missingPriorityDiscovery.push(f.id+': '+f.primary);console.log(`PASS: ${f.id}, ${result.log.length} clicks, deterministic routing, core-only axes, six-field shared replay.`);}
assert.deepEqual(Object.fromEntries([...runtimeFiles,'quiz.js','results.js'].map(file=>[file,hash(fs.readFileSync(root+'/'+file))])),sourceHashes,'Source changed during audit; rerun required');
assert.deepEqual(missingPriorityDiscovery,[],'Supported explicit primary domains must receive a priority comparison; do not force exact noun labels');
assert.deepEqual(unsupportedPrimaryConfidence,[],'Unknown explicit-primary fit requires low/partial confidence rather than broad support');
console.log('PASS: explicit legacy 0.8 instrument; all ten frozen whole-profile click paths and supported primary-domain discovery/coverage and whole-profile portraits; no expected champion names or exact titles.');
