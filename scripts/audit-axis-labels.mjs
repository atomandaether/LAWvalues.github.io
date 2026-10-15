/* The contextual headings are an evidence layer, never a second scoring model. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const ctx=vm.createContext({console});
for (const file of ['axes.js','questions.js','scoring.js','diagnostics.js','axis_labels.js']) {
  vm.runInContext(fs.readFileSync(new URL('../'+file,import.meta.url),'utf8'),ctx,{filename:file});
}
const engine=ctx.LAW_AXIS_LABELS;
const axes=Array.from(ctx.LAW_AXES,a=>a.id);
const scores=Object.fromEntries(axes.map(id=>[id,50]));
const plain=value=>JSON.parse(JSON.stringify(value));
const neutral=()=>Object.fromEntries(ctx.LAW_QUESTIONS.map(q=>[q.id,0]));
const describe=(responses={},diagnosticResponses={},overrides={})=>engine.describeAll({scores,responses,diagnosticResponses,version:'0.9 Beta',...overrides});
let checks=0;
function label(axis,responses,diagnosticResponses,expected,overrides={}) {
  const result=describe(responses,diagnosticResponses,overrides)[axis];
  assert.equal(result.label,expected,`${axis}: ${JSON.stringify(responses)} / ${JSON.stringify(diagnosticResponses)} => ${JSON.stringify(result)}`);
  checks++;
  for (const id of result.evidenceIds) assert.ok(Object.hasOwn(id.startsWith('D-')?diagnosticResponses||{}:responses||{},id),`${axis} cites an unanswered item ${id}`);
  return result;
}

// A saved percentage cannot invent a school, and true zero is not missing.
for (const axis of axes) {
  for (const value of [0,18,18.5,35,35.5,44,44.5,50,55.5,56,64.5,65,81.5,82,100]) {
    const numeric=describe({}, {}, {scores:{...scores,[axis]:value}})[axis];
    const object=describe({}, {}, {scores:{...scores,[axis]:{score:value,answered:0}}})[axis];
    assert.equal(numeric.status,'limited');
    assert.deepEqual(plain(numeric),plain(object));
    checks++;
  }
  for (const invalid of [null,undefined,NaN,Infinity,-1,101,'',true,{}, {score:null}]) {
    assert.equal(describe({}, {}, {scores:{...scores,[axis]:invalid}})[axis].status,'unavailable');checks++;
  }
  const missing={...scores};delete missing[axis];
  assert.equal(describe({}, {}, {scores:missing})[axis].status,'unavailable');
  assert.equal(describe(neutral())[axis].status,'weak');
  assert.equal(describe(Object.fromEntries(ctx.LAW_QUESTIONS.map(q=>[q.id,null])))[axis].status,'limited');
  checks+=3;
}
for (const version of [undefined,null,'','0.8','0.8 Beta','0.10 Beta','0.9 beta','0.9 Beta ']) {
  const descriptions=describe({S10:3,S11:3},{'D-NL2':3},{version});
  assert.ok(axes.every(axis=>descriptions[axis].status==='limited'));
  assert.equal(engine.fromIds({ids:engine.toIds(descriptions),scores,version}),null);checks++;
}

// Same percentages, distinct substantive methods, with exact answer evidence.
const natural=label('sorc',{S10:3,S11:2},{'D-NL2':3},'Natural Law');
const interpretive=label('sorc',{S8:3,S7:-2},{'D-NP2':3},'Interpretivism');
assert.notEqual(natural.id,interpretive.id);
label('sorc',{S10:3,S11:3},{'D-NP1':3},'Natural Law');
label('sorc',{S2:3,S4:3},{'D-NP1':3},'Limited Evidence');
label('sorc',{S2:3,S4:3},{'D-NP6':3},'Radbruch Formula');
label('sorc',{S1:3,S4:3},{'D-POS1':3},'Inclusive Positivism');
label('sorc',{S1:3,S4:3},{'D-POS1':-3},'Exclusive Positivism');
label('sorc',{S1:3,S4:3},{},'Legal Positivism');
label('sorc',{S10:3,S11:3},{},'Non-positivism');
label('sorc',{S8:3,S10:2},{'D-NP3':3},'Fullerian Legality');
label('sorc',{S8:3,S10:2},{'D-NP4':3},'Moral-Impact Theory');
label('sorc',{S8:3,S10:2},{'D-NP5':3},'Moral-Practice Theory');
label('sorc',{S7:3,S8:3},{'D-NP2':3},'Conflicting');
label('sorc',{S8:3,S10:3},{'D-NP2':-3},'Non-positivism');
label('sorc',{S10:-3,S11:3},{'D-NL2':3},'Varied');
label('sorc',{}, {'D-NL2':3,'D-NP2':3},'Limited Evidence');
for(const raw of [null,undefined,0,1,-1,NaN,'',true,4]) {
  assert.notEqual(describe({S8:3,S7:-3},{'D-NP2':raw}).sorc.label,'Interpretivism');checks++;
}

label('cons',{C5:3,C13:-3},{},'Contextual Textualism');
label('cons',{C2:3,C11:3,C18:3},{},'Enacted-Compromise Textualism');
label('cons',{C1:3,C7:3},{},'Textualism');
label('cons',{C12:3,C14:3},{},'Purposivism');
label('cons',{C6:3,C10:3},{},'Open Construction');
label('cons',{C7:-2,C15:3},{'D-INT1':3},'Intentionalism');
label('cons',{C8:2,C15:3},{'D-DYN1':3},'Dynamic Statutory Interpretation');
label('cons',{C5:3,C13:-3,C14:3,C12:3},{},'Varied');
assert.notEqual(describe({C5:3,C13:-3},{'D-TXT1':-3}).cons.label,'Contextual Textualism');
checks++;

// Historical vocabulary and public-versus-intent preference are not authority.
label('time',{T7:3,T8:3,T10:3},{},'Limited Evidence');
label('time',{...neutral(),T7:3,T8:3,T10:3},{},'Weak');
label('sorc',{S3:3,S4:3,S5:3},{},'Limited Evidence');
label('sorc',{...neutral(),S3:3,S4:3,S5:3},{},'Weak');
label('time',{T11:-3},{},'Limited Evidence');
label('time',{T1:3,T2:3},{},'Originalism');
label('time',{T11:3,T1:3,T7:3},{},'Original Public Meaning');
label('time',{T1:3,T2:3,T7:3},{'D-ORI7':-3},'Originalism');
label('time',{T11:3,T1:3,T7:3},{'D-ORI7':-3},'Original Public Meaning');
label('time',{T1:3,T2:3,T7:-3},{'D-ORI1':-3,'D-ORI7':-3},'Original Intent');
label('time',{T1:3,T2:3},{'D-ORI2':3},'Original-Methods Originalism');
label('time',{T1:3,T2:3},{'D-ORI6':3},'Original-Law Originalism');
label('time',{T1:3,T2:3},{'D-ORI3':3},'New Originalism');
assert.notEqual(describe({T7:3,T8:3,T10:3},{'D-ORI3':3}).time.label,'New Originalism');checks++;
label('time',{T4:3,T5:3,T11:-3},{},'Living Constitutionalism');
label('time',{T12:3,P3:3},{},'Common-Law Constitutionalism');
label('time',{T4:2,T5:3},{'D-LIV1':3},'Democratic Constitutionalism');
label('time',{T4:2,T5:3},{'D-LIV2':3},'Transformative Constitutionalism');
label('time',{T11:3,T12:3},{'D-ORI3':3},'Varied');
label('time',{T1:3,T2:3,T4:3,T5:3},{},'Varied');

label('prec',{P4:3,P12:3},{},'Reliance-Based Stare Decisis');
label('prec',{P2:3,P12:3},{},'Statutory Stare Decisis');
label('prec',{P5:3,P7:3},{},'Stare Decisis');
label('prec',{P6:3,P4:-3},{},'Precedent Correction');
label('prec',{P2:3,P12:3,P6:3},{},'Selective Stare Decisis');
label('prec',{P10:3,P11:3},{},'Limited Evidence');

label('remed',{R1:-3,R2:-3},{},'Party-Specific Relief');
label('remed',{R1:-3,R2:-3,R6:3,R7:3},{},'Party-Specific Relief');
label('remed',{R6:3,R7:3},{},'Severability');
label('remed',{R3:3,R5:3},{},'Structural Reform');
label('remed',{R1:3,R2:3},{},'Universal Relief');
label('remed',{R9:3,R10:3},{},'Prophylactic Relief');
label('remed',{R3:3,R5:3,R6:3,R8:-3},{},'Remedial Tailoring');
label('remed',{R1:3,R2:-3},{},'Varied');
assert.notEqual(describe({R1:3,R2:3},{'D-UNI1':-3}).remed.label,'Universal Relief');checks++;

label('post',{O1:3,O9:3},{},'Clear-Error Review');
label('post',{O2:3,O8:3},{},'Democratic Deference');
label('post',{O4:3,O10:3},{},'Independent Rights Review');
label('post',{O1:3,O4:3},{'D-ELY1':3},'Representation-Reinforcing Review');
label('post',{O6:3,O10:3},{'D-GRD1':3},'Dialogic Rights Review');
label('post',{O1:3,O10:3},{'D-RESP1':3},'Responsive Judicial Review');
label('post',{O1:3,O9:3,O4:3,O10:3},{},'Varied');

label('separ',{E1:-3,E4:3,E6:3},{},'Structural Formalism');
label('separ',{E5:3,E7:3},{},'Functionalism');
label('separ',{E3:3},{'D-SEP3':3},'Nondelegation Doctrine');
label('separ',{E5:-3},{'D-SEP4':3},'Judicial-Power Separation');
label('separ',{E2:-3},{'D-SEP1':-3},'Unitary Executive Theory');
label('separ',{E5:3,E1:-3,E4:3},{},'Administrative Functionalism');
label('separ',{E5:3,E7:3},{'D-MET1':3},'Administrative Constitutionalism');

label('form',{F1:3,F3:3},{},'Rule Formalism');
label('form',{F4:3,F1:3},{},'Categorical Adjudication');
label('form',{F5:3,F9:3},{},'Contextual Balancing');
label('form',{F6:3,F9:3},{},'Contextual Judgment');
label('form',{F5:3,F9:3},{'D-PROP1':3},'Structured Proportionality');
label('form',{F5:3,F9:3},{'D-PROP1':-3},'Contextual Balancing');
label('form',{F1:3,F3:3,F5:-3,F6:3},{},'Equitable Exceptions');
label('form',{F4:3,F5:3},{},'Varied');
label('form',{F5:1},{'D-PROP1':3},'Structured Proportionality');
label('form',{F5:0,F9:0},{'D-PROP1':3},'Limited Evidence');

label('sorc',{S1:'3',S7:'3'},{'D-POS1':'3'},'Limited Evidence');
label('time',{T1:3,T2:3,T4:3},{'D-ORI1':3},'Varied');
label('time',{T1:1},{'D-ORI1':-3},'Limited Evidence');
label('time',{T11:3},{'D-ORI1':-3},'Original Intent');
label('time',{T11:3},{'D-ORI3':3},'New Originalism');
label('time',{T11:3},{},'Limited Evidence');

// Output is invariant under title/champion changes and irrelevant axis inputs.
const sample={S8:3,S7:-3,C5:3,C13:-3,T1:3,T2:3,P2:3,P12:3,R1:-3,R2:-3,O1:3,O9:3,E5:3,E7:3,F5:3,F9:3};
const diagnosticResponses={'D-NP2':3,'D-PROP1':3};
const baseline=describe(sample,diagnosticResponses);
const serial=JSON.stringify(baseline);
for (const identityId of ['natural_lawyer','textualist','originalist','functionalist','pragmatist']) {
  assert.equal(JSON.stringify(describe(sample,diagnosticResponses,{identityId,championId:identityId,profile:{name:identityId},title:identityId})),serial);checks++;
}
assert.deepEqual(plain(describe({...sample,T1:-3,T2:-3},{...diagnosticResponses,'D-LIV1':3}).sorc),plain(baseline.sorc));checks++;
const before=JSON.stringify({scores,sample,diagnosticResponses});describe(sample,diagnosticResponses);assert.equal(JSON.stringify({scores,sample,diagnosticResponses}),before);

// Exact catalog-only fresh-session round trip. Unknown/cross-axis/tampered IDs
// cannot inject copy or invent a score; answer evidence is never reconstructed.
const encoded=engine.toIds(baseline);
assert.equal(typeof encoded,'string');assert.equal(encoded.split(',').length,8);
const decoded=engine.fromIds({ids:encoded,scores,version:'0.9'});
for (const axis of axes) {
  assert.equal(decoded[axis].label,baseline[axis].label);
  assert.equal(decoded[axis].explanation,baseline[axis].explanation);
  assert.equal(decoded[axis].status,baseline[axis].status);
  assert.deepEqual(Array.from(decoded[axis].evidenceIds),[]);checks++;
}
for(const malicious of [encoded+',extra',encoded.split(',').slice(1).join(','),encoded.replace('sorc-interpretivism','form-structured-proportionality'),encoded.replace('sorc-interpretivism','__proto__'),encoded.replace('sorc-interpretivism','<script>alert(1)</script>'),encoded+' ',encoded.split(',')]) {
  assert.equal(engine.fromIds({ids:malicious,scores,version:'0.9 Beta'}),null);checks++;
}
assert.equal(engine.toIds({...baseline,sorc:{id:'form-rule-formalism'}}),null);
assert.equal(engine.fromIds({ids:encoded,scores:{...scores,sorc:null},version:'0.9 Beta'}),null);
const unavailable=describe({}, {}, {scores:{...scores,sorc:undefined}});
assert.equal(engine.fromIds({ids:engine.toIds(unavailable),scores:{...scores,sorc:undefined},version:'0.9 Beta'}).sorc.status,'unavailable');

// Exercise complete-axis extremes with actual scoring; zero remains available.
for(const axis of ctx.LAW_AXES) for(const sign of [1,-1]) {
  const responses=Object.fromEntries(ctx.LAW_QUESTIONS.map(q=>[q.id,
    ctx.LAW_SCORING.signalFor(q,'agree',axis.id)*sign >= ctx.LAW_SCORING.signalFor(q,'disagree',axis.id)*sign?3:-3]));
  const scored=ctx.LAW_SCORING.scoreAll(responses);
  assert.equal(scored[axis.id].score,sign>0?100:0);
  const d=describe(responses,{}, {scores:scored});
  assert.notEqual(d[axis.id].status,'unavailable');
  assert.ok(engine.fromIds({ids:engine.toIds(d),scores:scored,version:'0.9 Beta'}));checks++;
}
console.log(`PASS: ${checks} contextual-axis checks; answer gates, same-score distinctions, conflicts, legacy safety, exact endpoints, title independence, and safe serialization.`);
