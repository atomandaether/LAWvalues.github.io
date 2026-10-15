import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {runtime} from './fixtures/whole-profile/runtime.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)).replace(/\/$/,'');
const scores={sorc:50,cons:50,time:50,prec:50,remed:50,post:50,separ:50,form:50};
for(const [id,prefix] of [['public_meaning_originalist','Public-Meaning'],['original_intent_originalist','Original-Intent']]) {
 const r=runtime(root),c=r.ctx,identity=c.LAW_RESULT_IDENTITIES.find(x=>x.id===id);
 const result=c.LAW_RESULT_CONTENT.fromIds(identity,scores,{}, {modifierId:'new_originalism',phraseId:'secondary_neutral'});
 assert.equal(result.title,`${prefix} New Originalist ${result.phrase.text}`);
 assert.equal(result.noun,identity.label);assert.equal(result.modifier.text,'New');
 assert.equal(c.LAW_RESULT_CONTENT.titleParts(identity,result.modifier,result.phrase).filter(x=>x.role==='noun').map(x=>x.text).join(' '),identity.label);
}
const r=runtime(root), c=r.ctx;
r.location.search='?'+new URLSearchParams({...scores,v:c.LAW_VERSION});
r.location.href='https://example.test/results.html'+r.location.search;
const noun='<img src=x onerror=alert(1)> & "law"';
const modifier='<script>alert(2)</script>',phrase='who <svg onload=alert(3)>';
r.storage.setItem(`lawvalues-latest-${c.LAW_VERSION}`,JSON.stringify({version:c.LAW_VERSION,resultQuery:r.location.search,scores,responses:{},classification:{identity:{id:'positivist',label:noun},champions:[],traits:{},resultTitle:{title:`${modifier} ${noun} ${phrase}`,noun,modifier:{text:modifier},phrase:{text:phrase}}}}));
r.run('results.js');
const html=r.nodes.get('result-title').innerHTML;
assert.ok(html.startsWith('<strong>&lt;script&gt;'));
assert.ok(html.includes('&lt;script&gt;'));assert.ok(html.includes('&amp; &quot;law&quot;'));
assert.ok(!/<(?:script|img|svg)\b/i.test(html));
for(const query of [{...scores,i:'unknown-legacy',c:'unknown'},{sorc:'NaN'},{}]) {
 const rr=runtime(root,{search:'?'+new URLSearchParams(query)});rr.run('results.js');
 if(Object.keys(query).length>2){assert.equal(rr.nodes.get('results-main').hidden,false);assert.match(rr.nodes.get('result-title').textContent,/No jurisprudential classification/);}
 else assert.equal(rr.nodes.get('results-main').hidden,true);
}
console.log('PASS: approved New Originalist word order, unchanged noun/modifier IDs, title escaping, unknown legacy and invalid scores.');
