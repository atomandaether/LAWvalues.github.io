import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {runtime} from './fixtures/whole-profile/runtime.mjs';

const root=fileURLToPath(new URL('../',import.meta.url)).replace(/\/$/,'');
const baseScores={sorc:78,cons:82,time:71,prec:66,remed:54,post:48,separ:62,form:74};

async function renderAndDownload({record=null,query={}}) {
  const search='?'+new URLSearchParams({...baseScores,...query});
  const r=runtime(root,{search});
  r.location.href='https://example.test/results.html'+search;
  if(record) r.storage.setItem(`lawvalues-latest-${r.ctx.LAW_VERSION}`,JSON.stringify(record));
  let blob=null;
  r.ctx.URL.createObjectURL=value=>{blob=value;return 'blob:lawvalues-test';};
  r.ctx.URL.revokeObjectURL=()=>{};
  r.run('results.js');
  assert.equal(r.nodes.get('download-record').hidden,false);
  await r.nodes.get('download-record').click();
  assert.ok(blob);
  return {r,json:JSON.parse(await blob.text())};
}

const localRecord={
  version:'0.9 Beta',instrumentVersion:'0.9 Beta',
  resultQuery:'?'+new URLSearchParams({...baseScores,v:'0.9 Beta',i:'textualist',c:'scalia_manning'}),
  scores:baseScores,responses:{S1:3,C1:2},diagnosticResponses:{'D-QC1':-2},
  classification:{identity:{id:'textualist',label:'Textualist',family:'method'},champions:[],traits:{}}
};
const local=await renderAndDownload({record:localRecord,query:{v:'0.9 Beta',i:'textualist',c:'scalia_manning'}});
assert.equal(local.json.exportKind,'completed-session');
assert.equal(local.json.answersIncluded,true);
assert.deepEqual(local.json.responses,localRecord.responses);

const shared=await renderAndDownload({query:{v:'0.9 Beta',i:'textualist',c:'scalia_manning'}});
assert.equal(shared.json.exportKind,'shared-result-summary');
assert.equal(shared.json.answersIncluded,false);
assert.ok(!Object.hasOwn(shared.json,'responses'));
assert.ok(!Object.hasOwn(shared.json,'diagnosticResponses'));
assert.match(shared.json.note,/does not contain answer-level responses/);

const fresh=runtime(root,{search:'?fresh=1'});
const stateKey=`lawvalues-quiz-${fresh.ctx.LAW_VERSION}`;
const latestKey=`lawvalues-latest-${fresh.ctx.LAW_VERSION}`;
fresh.storage.setItem(stateKey,JSON.stringify({stale:true}));
fresh.storage.setItem(latestKey,JSON.stringify({keep:'completed result'}));
fresh.run('quiz.js');
assert.notEqual(fresh.storage.getItem(stateKey),JSON.stringify({stale:true}),'Retake must start a fresh attempt');
assert.equal(fresh.storage.getItem(latestKey),JSON.stringify({keep:'completed result'}),'Retake must preserve the downloadable completed result');

console.log('PASS: local and URL-only JSON exports are explicit about answer provenance; fresh retake preserves the last completed result.');
