// One genuine current-instrument click path from a predeclared fictional view.
// No target title, champion, label or score; this never tunes response values.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {runtime,runtimeFiles} from './fixtures/whole-profile/runtime.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)).replace(/\/$/,'');
const fixtureBytes=fs.readFileSync(new URL('./fixtures/current09-demo.json',import.meta.url));
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(hash(fixtureBytes),'1258889ba1123459c033e188f53cd019bd1a0df0ff5e865d1ad7306a191895de',
  'Predeclared current-demo answer policy changed after routing');
const fixture=JSON.parse(fixtureBytes);
const initialBytes=fs.readFileSync(new URL('./fixtures/current09-demo-initial.json',import.meta.url));
assert.equal(hash(initialBytes),'5942a76bde2fa56e265b4374de85d638c5e85b7c1af07354a5f3ecf220817844');
const initial=JSON.parse(initialBytes);
assert.deepEqual(fixture.coreAnswers,initial.coreAnswers,'No post-route answer tuning');
assert.deepEqual(fixture.diagnosticAnswerPlan,initial.diagnosticAnswerPlan,'No post-route diagnostic tuning');
assert.deepEqual(Object.keys(fixture.corePrompts).filter(id=>fixture.corePrompts[id]!==initial.corePrompts[id]),['S6']);
const r=runtime(root),c=r.ctx;
assert.equal(c.LAW_VERSION,fixture.instrumentVersion);
assert.equal(Object.keys(fixture.coreAnswers).length,88);
for(const q of c.LAW_QUESTIONS) {
  assert.equal(q.prompt,fixture.corePrompts[q.id],'Current fixture needs explicit review for new wording '+q.id);
  assert.ok(fixture.coreAnswers[q.id]?.rationale);
}
const sourceHashes=Object.fromEntries([...runtimeFiles,'quiz.js','results.js'].map(file=>[file,hash(fs.readFileSync(root+'/'+file))]));
r.run('quiz.js');
const stateKey='lawvalues-quiz-'+c.LAW_VERSION,log=[];
while(!r.location.destination){
  assert.ok(log.length<100,'Real click path exceeded the 88+12 cap');
  const state=JSON.parse(r.storage.getItem(stateKey));
  const id=state.phase==='core'?state.order[state.index]:state.diagnosticOrder[state.diagnosticIndex];
  const answer=state.phase==='core'?fixture.coreAnswers[id]:fixture.diagnosticAnswerPlan[id];
  assert.ok(answer,'No predeclared answer for '+id+'; do not improvise an output-directed answer');
  if(state.phase==='diagnostic') assert.equal(r.nodes.get('question-text').textContent,answer.prompt);
  assert.ok(!log.some(row=>row.id===id),'Repeated question '+id);
  log.push({id,phase:state.phase,value:answer.value,rationale:answer.rationale});
  r.advance();
  if(answer.value===null) r.nodes.get('skip_button').click();
  else r.buttons.find(button=>Number(button.dataset.response)===answer.value).click();
}
const record=JSON.parse(r.storage.getItem('lawvalues-latest-'+c.LAW_VERSION));
assert.equal(log.filter(row=>row.phase==='core').length,88);
assert.ok(log.filter(row=>row.phase==='diagnostic').length<=12);
assert.deepEqual(record.diagnosticOrder,log.filter(row=>row.phase==='diagnostic').map(row=>row.id));
const expected=c.LAW_SCORING.scoreAllWithDiagnostics(record.responses,record.diagnosticResponses);
assert.deepEqual(record.scores,Object.fromEntries(c.LAW_AXES.map(axis=>[axis.id,expected[axis.id].score])));
r.run('results.js');
const fields=['result-title','result-opening','result-context','champion-line','champion-description','classification-note','axis-results'];
const rendered=Object.fromEntries(fields.map(id=>[id,{text:r.nodes.get(id)?.textContent||'',html:r.nodes.get(id)?.innerHTML||''}]));
const descriptions=c.LAW_AXIS_LABELS.describeAll({scores:record.scores,responses:record.responses,
  diagnosticResponses:record.diagnosticResponses,version:c.LAW_VERSION});
const output={fixtureId:fixture.id,fictional:true,instrumentVersion:c.LAW_VERSION,
  fixtureSha256:hash(fixtureBytes),sourceHashes,questionCount:log.length,log,
  relativeResultUrl:r.location.destination,resultQuery:r.location.search,
  record,descriptions,rendered};
assert.deepEqual(Object.fromEntries([...runtimeFiles,'quiz.js','results.js'].map(file=>[file,hash(fs.readFileSync(root+'/'+file))])),sourceHashes,
  'Implementation changed during the demo; rerun the same fixed answers, never retune them');
const outputPath=fileURLToPath(new URL('./fixtures/current09-demo-output.json',import.meta.url));
fs.writeFileSync(outputPath,JSON.stringify(output,null,2)+'\n');
if(process.env.LAW_DEMO_EXPORT_PATH) {
  fs.writeFileSync(process.env.LAW_DEMO_EXPORT_PATH,JSON.stringify(output,null,2)+'\n');
}
console.log(JSON.stringify({fixtureId:fixture.id,questionCount:log.length,diagnostics:record.diagnosticOrder,
  scores:record.scores,title:rendered['result-title'].text,champion:rendered['champion-line'].text,
  labels:Object.fromEntries(Object.entries(descriptions).map(([id,value])=>[id,value.label])),outputPath},null,2));
