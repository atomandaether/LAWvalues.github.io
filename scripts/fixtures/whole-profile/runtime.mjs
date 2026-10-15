import fs from 'node:fs';
import vm from 'node:vm';
import {selectLegacy08Instrument} from '../instrument-context.mjs';
export const runtimeFiles=['axes.js','questions.js','scoring.js','result_compatibility.js','result_catalog.js','diagnostics.js','profiles.js','champion_content.js','champion_cards.js','result_content.js','classification.js','result_narrative.js','axis_labels.js'];
class NodeStub {
  constructor(id='') {this.id=id;this.textContent='';this.innerHTML='';this.hidden=false;this.style={};this.dataset={};this.events={};this.attributes={};this.scrollHeight=0;this.clientHeight=1000;this.scrollWidth=0;this.clientWidth=1000;this.classList={toggle(){},add(){},remove(){}};}
  setAttribute(k,v){this.attributes[k]=v;}
  addEventListener(k,fn){(this.events[k]??=[]).push(fn);}
  click(){for(const fn of this.events.click||[]) fn({currentTarget:this});}
  remove(){}
  appendChild(){}
  select(){}
}
function makeDocument(){
  const nodes=new Map();const buttons=[3,2,1,0,-1,-2,-3].map(v=>{const n=new NodeStub('response-'+v);n.dataset.response=String(v);return n;});
  const document={
    getElementById(id){if(!nodes.has(id)){const n=new NodeStub(id);n.parentElement=new NodeStub(id+'-parent');nodes.set(id,n);}return nodes.get(id);},
    querySelectorAll(selector){if(selector==='[data-response]')return buttons;throw Error('Unexpected selector: '+selector);},
    addEventListener(){},createElement(){return new NodeStub();},body:new NodeStub('body'),execCommand(){return true;}
  };
  return {document,nodes,buttons};
}
function makeStorage(){const storage=new Map();return {getItem:key=>storage.has(key)?storage.get(key):null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:key=>storage.delete(key),clear:()=>storage.clear(),entries:()=>[...storage.entries()]};}

export function runtime(root,opts={}){
 const {document,nodes,buttons}=makeDocument(); const storage=makeStorage();
 let virtualMs=Date.parse('2026-10-15T03:10:00Z');
 const VirtualDate=class extends Date{constructor(...args){super(...(args.length?args:[virtualMs]));}static now(){return virtualMs;}};
 let seed=0x6c617700;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const location={search:opts.search||'',href:'https://example.test/quiz.html'+(opts.search||''),destination:null,assign(url){this.destination=url;this.href=new URL(url,this.href).href;this.search=new URL(this.href).search;}};
 let clipboard='';
 const window={innerWidth:1280,innerHeight:900,location,addEventListener(){},requestAnimationFrame(fn){fn();},confirm(){return true;},setTimeout(){}};
 const ctx=vm.createContext({console,Date:VirtualDate,Math:seededMath,URLSearchParams,URL,Blob,document,window,sessionStorage:storage,navigator:{clipboard:{async writeText(text){clipboard=text;}}},setTimeout(){}});
 const run=file=>vm.runInContext(fs.readFileSync(root+'/'+file,'utf8'),ctx,{filename:root+'/'+file,timeout:60000});
 runtimeFiles.forEach(file=>{
   // Reproduce the historical instrument without current answer-label semantics.
   if(file==='axis_labels.js' && opts.instrumentVersion==='0.8') return;
   run(file);
   if(file==='questions.js' && opts.instrumentVersion==='0.8') selectLegacy08Instrument(ctx);
 });
 return{ctx,run,nodes,buttons,storage,location,clipboard:()=>clipboard,advance:(ms=20000)=>virtualMs+=ms,newDocument:()=>{const d=makeDocument();ctx.document=d.document;return d;}};
}
