import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = (name) => fs.readFileSync(new URL("../" + name, import.meta.url), "utf8");
class Element {
  constructor() {
    this.textContent=""; this.innerHTML=""; this.hidden=false; this.style={}; this.dataset={}; this.events={};
    this.scrollHeight=0; this.clientHeight=1000; this.scrollWidth=0; this.clientWidth=1000;
    this.classList={toggle(){},add(){},remove(){}};
  }
  setAttribute() {}
  addEventListener(name,fn) { (this.events[name]??=[]).push(fn); }
  click() { return Promise.all((this.events.click||[]).map(fn=>fn({currentTarget:this}))); }
  appendChild() {}
  remove() {}
  select() {}
}
function makeDocument() {
  const nodes=new Map();
  const buttons=[3,2,1,0,-1,-2,-3].map(value=>{
    const el=new Element(); el.dataset.response=String(value); return el;
  });
  return {
    getElementById(id) {
      if (!nodes.has(id)) { const el=new Element(); el.parentElement=new Element(); nodes.set(id,el); }
      return nodes.get(id);
    },
    querySelectorAll(selector) { assert.equal(selector,"[data-response]"); return buttons; },
    addEventListener(){},createElement(){return new Element();},body:new Element(),execCommand(){return true;}
  };
}
function makeRuntime() {
  const data=new Map();
  const storage={getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,String(value)),removeItem:key=>data.delete(key),clear:()=>data.clear()};
  const location={href:"https://example.test/quiz.html",search:"",assign(url){this.href=new URL(url,this.href).href;this.search=new URL(this.href).search;}};
  let clipboard="";
  const ctx=vm.createContext({
    console,URLSearchParams,URL,Blob,document:makeDocument(),sessionStorage:storage,
    window:{location,innerWidth:1280,innerHeight:900,addEventListener(){},requestAnimationFrame(fn){fn();},setTimeout(){}},
    navigator:{clipboard:{async writeText(text){clipboard=text;}}}
  });
  const run=name=>vm.runInContext(source(name),ctx,{filename:name});
  for (const file of ["axes.js","questions.js","scoring.js","result_compatibility.js","result_catalog.js","profiles.js","champion_content.js","champion_cards.js","result_content.js","result_narrative.js","axis_labels.js"]) run(file);
  return {ctx,run,storage,location,clipboard:()=>clipboard};
}

// Reproduce the observed divergence: a source-conditioned diagnosis and a
// developmental context legitimately have different route IDs. Exercise the
// actual quiz completion handler, results renderer, and copy-summary handler.
// Domain services are fixed here because this is a serialization test, not
// another classification or scoring fixture.
const runtime=makeRuntime();
const {ctx,run,storage,location}=runtime;
const scores={sorc:34,cons:59,time:31,prec:81,remed:34,post:18,separ:39,form:50};
const identity=ctx.LAW_RESULT_IDENTITIES.find(x=>x.id==="common_law_constitutionalist");
const champion=ctx.LAW_PROFILES.find(x=>x.id==="monaghan");
const classification={identity,traits:{"source.extreme_injustice":1,"remedies.constitutional_common_law":1},champions:[champion],diagnosticCount:12};
classification.resultTitle=ctx.LAW_RESULT_CONTENT.fromIds(identity,scores,{},
  {modifierId:"fit_unmistakable",phraseId:"countermajoritarian",bridgeId:"living_stability"});
const scored=Object.fromEntries(ctx.LAW_AXES.map(a=>[a.id,{score:scores[a.id],answered:1,strength:1,conflict:0,leftSupport:1,rightSupport:0}]));
ctx.LAW_SCORING={...ctx.LAW_SCORING,scoreAll:()=>scored,scoreAllWithDiagnostics:()=>scored};
ctx.LAW_CLASSIFIER={MAX_DIAGNOSTICS:12,MAX_TOTAL_QUESTIONS:100,diagnosticBank:()=>[],nextDiagnostic:()=>null,classify:()=>classification};
const order=ctx.LAW_QUESTIONS.map(q=>q.id);
storage.setItem("lawvalues-quiz-"+ctx.LAW_VERSION,JSON.stringify({
  version:ctx.LAW_VERSION,order,index:order.length-1,responses:Object.fromEntries(order.slice(0,-1).map(id=>[id,0])),
  phase:"core",diagnosticOrder:[],diagnosticResponses:{},diagnosticIndex:0,startedAt:"2026-10-15T00:00:00Z"
}));
run("quiz.js");
await ctx.document.querySelectorAll("[data-response]")[0].click();
const shareUrl=new URL(location.href);
assert.equal(shareUrl.pathname,"/results.html");
assert.equal(shareUrl.searchParams.get("cev"),"1");
assert.ok(shareUrl.searchParams.get("ce").includes("remedies.constitutional_common_law"));
assert.equal(shareUrl.searchParams.get("x"),"portrait_continuity_rights_extreme");
assert.equal(shareUrl.searchParams.get("o"),"portrait_continuity_rights_extreme");
const record=JSON.parse(storage.getItem("lawvalues-latest-"+ctx.LAW_VERSION));
assert.equal(record.classification.narrative.openingId,"portrait_continuity_rights_extreme");
run("results.js");
const fields=["result-title","result-opening","result-context","champion-line","champion-tagline","champion-portrait"];
const displayed=Object.fromEntries(fields.map(id=>[id,ctx.document.getElementById(id).textContent]));
assert.match(displayed["result-opening"],/^You want courts to make rights effective/);

function renderShared(url=shareUrl) {
  storage.clear(); ctx.document=makeDocument(); location.href=String(url); location.search=new URL(url).search;
  run("results.js");
  return Object.fromEntries(fields.map(id=>[id,ctx.document.getElementById(id).textContent]));
}
assert.deepEqual(renderShared(),displayed,"Fresh-session rendering must preserve both paragraphs and title/champion");
await ctx.document.getElementById("copy-summary").click();
assert.ok(runtime.clipboard().includes(displayed["result-opening"]),"Copied summary must preserve the opening");
assert.ok(runtime.clipboard().includes(displayed["result-context"]),"Copied summary must preserve the context");
await ctx.document.getElementById("copy-link").click();
assert.equal(runtime.clipboard(),String(shareUrl));

const engine=ctx.LAW_RESULT_NARRATIVE;
const sharedClassification={identity,traits:{}};
const legacy=new URL(shareUrl); legacy.searchParams.delete("o");
const legacyDisplay=renderShared(legacy);
assert.equal(legacyDisplay["result-opening"],displayed["result-opening"],
  "Old links cannot recover missing traits and retain the established inferred opening");
assert.equal(legacyDisplay["result-context"],displayed["result-context"]);
// Pre-opening-ID legacy links retain their historical inference, while new
// integrated contexts carry enough information to recover both paragraphs.
const oldLink=new URL(shareUrl); oldLink.searchParams.set("x","profile_developmental_rights"); oldLink.searchParams.delete("o");
const oldDisplay=renderShared(oldLink);
assert.equal(oldDisplay["result-opening"],engine.OPENINGS.developmental_settlement);
assert.equal(oldDisplay["result-context"],engine.ROUTES.profile_developmental_rights.context);
for (const invalid of ["", "not_a_route", "__proto__", "constructor", "toString", "<script>alert(1)</script>"]) {
  const url=new URL(shareUrl); url.searchParams.set("o",invalid);
  assert.equal(renderShared(url)["result-opening"],legacyDisplay["result-opening"],"Invalid opening must fall back: "+invalid);
  url.searchParams.set("x",invalid);
  const rendered=renderShared(url);
  assert.equal(rendered["result-context"],engine.build(sharedClassification,scores).context,"Invalid context must fall back: "+invalid);
  assert.equal(engine.fromId(invalid).id,"low_theory","Legacy route lookup must reject inherited properties");
}
for (const special of ["unusable_response","incoherent_response","outcome_driven_left","outcome_driven_right"]) {
  const c={identity:{id:special},traits:{}};
  const normal=engine.build(c,scores);
  const supplied=engine.build(c,scores,null,"extreme_injustice");
  assert.equal(supplied.opening,normal.opening,"An ordinary opening cannot replace a withheld diagnosis");
  assert.equal(supplied.openingId,null);
}

// Legacy pairs replay independently; integrated contexts enforce their plan. This finite
// check also proves no champion field is needed for reconstructing the prose.
let combinations=0;
for (const openingId of Object.keys(engine.OPENINGS)) {
  for (const contextId of Object.keys(engine.ROUTES)) {
    const a=engine.build({...sharedClassification,champions:[{id:"monaghan"}]},scores,contextId,openingId);
    const b=engine.build({...sharedClassification,champions:[{id:"unrelated"}]},scores,contextId,openingId);
    assert.equal(a.opening,engine.OPENINGS[contextId.startsWith("portrait_") ? contextId : openingId]);
    assert.equal(a.context,engine.ROUTES[contextId].context);
    assert.equal(a.openingId,contextId.startsWith("portrait_") ? contextId : openingId);
    assert.deepEqual(a,b);
    combinations+=1;
  }
}
console.log(`result share audit passed: quiz completion, fresh-session display/copy, legacy/malformed links, ${combinations} legacy/atomic paragraph and champion combinations`);
