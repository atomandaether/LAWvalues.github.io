// Current 0.9 construct controls. These answers are authored for the revised
// propositions; no 0.8 persona answer is reused as if its wording were unchanged.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';

const ctx=vm.createContext({console});
for(const file of ['axes.js','questions.js','scoring.js','result_catalog.js',
  'diagnostics.js','profiles.js','result_content.js','classification.js']) {
  vm.runInContext(fs.readFileSync(new URL('../'+file,import.meta.url),'utf8'),ctx,{filename:file});
}
const bank=ctx.LAW_QUESTIONS, legacy=ctx.LAW_LEGACY_QUESTIONS;
const scorer=ctx.LAW_SCORING, classifier=ctx.LAW_CLASSIFIER;
const plain=value=>JSON.parse(JSON.stringify(value));
const neutral=()=>Object.fromEntries(bank.map(q=>[q.id,0]));
const hash=value=>crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
assert.match(ctx.LAW_VERSION,/^0\.9\s*Beta$/);
assert.equal(hash(legacy),'e9574a33364a5730acd114eda9558887fa8a19e8b309c5f2e1943e5a84f78b41',
  'Preserve every original 0.8 prompt, signal, source and ordering exactly');
assert.notEqual(hash(bank),hash(legacy));
assert.equal(bank.length,88);
assert.equal(classifier.MAX_DIAGNOSTICS,12);
assert.equal(classifier.MAX_TOTAL_QUESTIONS,100);
assert.equal(bank.length+classifier.MAX_DIAGNOSTICS,100);
assert.deepEqual(Array.from(bank,q=>q.id),Array.from(legacy,q=>q.id),'Revision must not add core slots');
assert.equal(scorer.signalFor(bank.find(q=>q.id==='S5'),'agree','time'),0,
  'Choosing the official clerk copy is not a temporal commitment');
assert.ok(bank.find(q=>q.id==='T11').prompt.includes('independently'));
assert.equal(scorer.signalFor(bank.find(q=>q.id==='T11'),'disagree','time'),0,
  'Rejecting independent original authority is not affirmative living-content evidence');
for(const id of ['T1','T2','T3','T4','T5','T6','T11','T12']) {
  assert.notEqual(bank.find(q=>q.id===id).prompt,legacy.find(q=>q.id===id).prompt,
    id+' must isolate the revised construct rather than rename its old score');
}

// Missing, skipped, neutral, and every genuine extreme remain distinct.
for(const axis of ctx.LAW_AXES){
  const empty=scorer.scoreAxis(axis.id,{},bank);
  const skipped=scorer.scoreAxis(axis.id,Object.fromEntries(bank.map(q=>[q.id,null])),bank);
  const centered=scorer.scoreAxis(axis.id,neutral(),bank);
  assert.equal(empty.answered,0);assert.equal(skipped.answered,0);
  assert.equal(empty.coverage,0);assert.equal(skipped.coverage,0);
  assert.equal(centered.score,50);assert.equal(centered.coverage,1);
  assert.ok(centered.answered>0);
  for(const sign of [1,-1]){
    const answers=Object.fromEntries(bank.map(q=>[q.id,
      scorer.signalFor(q,'agree',axis.id)*sign>=scorer.signalFor(q,'disagree',axis.id)*sign?3:-3]));
    const score=scorer.scoreAxis(axis.id,answers,bank);
    assert.equal(score.score,sign>0?100:0,axis.id+' must preserve its real extreme');
    assert.ok(score.strength<=100 && score.conflict<=100);
  }
}

// Paired temporal controls hold all other answers constant. They represent the
// new statements' asserted legal premises, without choosing real case outcomes.
const fixed=neutral(), evolving=neutral();
for(const id of ['T1','T2','T3','T11']) fixed[id]=3;
for(const id of ['T4','T5','T6','T12']) fixed[id]=-3;
for(const id of ['T1','T2','T3']) evolving[id]=-3;
for(const id of ['T4','T5','T6','T12']) evolving[id]=3;
evolving.T11=-3;
const historicalHints={...neutral(),T7:3,T8:3,T10:3};
const rejectedAuthority={...neutral(),T11:-3};
assert.ok(scorer.scoreAxis('time',fixed,bank).score>=90,'Direct independent constraint must dominate');
assert.ok(scorer.scoreAxis('time',evolving,bank).score<=10,'Direct evolving content must dominate');
assert.equal(scorer.scoreAxis('time',rejectedAuthority,bank).score,50);
assert.ok(scorer.scoreAxis('time',historicalHints,bank).score<60,
  'Public/intent choice, principle application and semantic fidelity alone are weak historical hints');

// New T11 can establish only independent temporal authority. It no longer
// supplies a preference for early practice as a source of meaning.
const centeredScores=Object.fromEntries(ctx.LAW_AXES.map(a=>[a.id,50]));
const authorityTraits=classifier.buildTraits(centeredScores,{T11:3},{});
assert.ok((authorityTraits['time.originalism_independent_authority']||0)>0);
assert.equal(authorityTraits['time.early_practice']||0,0);

console.log('PASS: exact 0.8 bank preservation; 0.9 direct/weak temporal controls; all-axis neutral, missing and 0/100 extremes; 88+12 cap.');

// Invalid current responses are absent information, never extra confidence.
for(const invalid of [undefined,NaN,Infinity,-Infinity,'3','garbage',4,-4,0.5,true,{},[]]){
  const answers=Object.fromEntries(bank.map(q=>[q.id,invalid]));
  for(const axis of ctx.LAW_AXES){
    const result=scorer.scoreAxis(axis.id,answers,bank);
    assert.equal(result.answered,0,axis.id+' accepted invalid response '+String(invalid));
    assert.equal(result.coverage,0);
    assert.ok(result.contributions.every(row=>row.status==='missing'));
  }
}

// Reviewed weak links are capped at 20% of each pole's available weight.
// This is not a promise of a fixed maximum score-point shift under missingness.
for(const axis of ctx.LAW_AXES){
  for(const direction of [1,-1]){
    const answers=Object.fromEntries(bank.map(q=>[q.id,
      scorer.signalFor(q,'agree',axis.id)*direction>=scorer.signalFor(q,'disagree',axis.id)*direction?3:-3]));
    const result=scorer.scoreAxis(axis.id,answers,bank);
    const total=result.contributions.reduce((sum,row)=>sum+Math.max(0,(row.budgetedSignal||0)*direction),0);
    const hints=result.contributions.filter(row=>row.kind==='hint')
      .reduce((sum,row)=>sum+Math.max(0,(row.budgetedSignal||0)*direction),0);
    assert.ok(hints<=total*0.2+1e-10,axis.id+' exceeds weak-link potential budget');
    assert.equal(result.adjustment,0);
    assert.equal(result.coreScore,result.score);
    assert.equal(result.conflictIsLogical,false,'Opposing support must not be labeled logical contradiction');
    const missingDirect=Object.fromEntries(bank.map(q=>[q.id,q.evidenceKinds?.[axis.id]==='hint'?answers[q.id]:null]));
    const sparse=scorer.scoreAxis(axis.id,missingDirect,bank);
    assert.ok(Math.abs(sparse.score-50)<=23,axis.id+' sparse hints bypassed the potential/coverage bound');
  }
}

const hintCore={...historicalHints,T11:0};
const base=scorer.scoreAllWithDiagnostics(hintCore,{});
const corrected=scorer.scoreAllWithDiagnostics(hintCore,{'D-ORI7':-3});
assert.ok(base.time.score>50 && corrected.time.score===50,
  'Express public-authority rejection may remove only the weak historical inference');
assert.equal(corrected.time.coreScore,base.time.score);
assert.equal(corrected.time.adjustment,corrected.time.score-base.time.score);
assert.equal(corrected.time.coverage,base.time.coverage,'Clarification must not change the denominator');
assert.equal(corrected.time.answered,base.time.answered);
assert.equal(corrected.time.rightSupport,0,'Rejecting authority adds no Living support');
const changed=corrected.time.contributions.filter(row=>row.adjustment);
assert.deepEqual(Array.from(changed,row=>row.id).sort(),['T10','T7','T8']);
for(const row of changed){
  assert.equal(row.kind,'hint');assert.equal(row.adjustment.diagnosticId,'D-ORI7');
  assert.ok(row.adjustment.reason.length>0);
  assert.equal(row.contribution,0);assert.ok(row.coreContribution>0);
}
for(const axis of ctx.LAW_AXES.filter(a=>a.id!=='time'))
  assert.deepEqual(plain(corrected[axis.id]),plain(base[axis.id]),'Named Time clarification leaked into '+axis.id);

// Partial rejection attenuates the same existing contribution, without adding
// its opposite. All other diagnostics, including strong answers, are inert for
// percentages unless a separately reviewed adjustment rule explicitly exists.
const partial=scorer.scoreAllWithDiagnostics(hintCore,{'D-ORI7':-2});
assert.ok(partial.time.score>=corrected.time.score && partial.time.score<=base.time.score);
for(const diagnostic of ctx.LAW_DIAGNOSTIC_QUESTIONS){
  for(const answer of [-3,-2,-1,0,1,2,3,null]){
    if(diagnostic.id==='D-ORI7' && answer<=-2 && answer!==null) continue;
    assert.deepEqual(plain(scorer.scoreAllWithDiagnostics(hintCore,{[diagnostic.id]:answer})),plain(base),
      diagnostic.id+'='+answer+' unexpectedly changed an axis');
  }
}
for(const alternative of [
  {core:{T11:3},diagnostics:{}},
  {core:{T1:3},diagnostics:{}},
  {core:{T2:3},diagnostics:{}},
  {core:{T3:3},diagnostics:{}},
  {core:{},diagnostics:{'D-ORI1':-3}},
  {core:{},diagnostics:{'D-ORI2':3}},
  {core:{},diagnostics:{'D-ORI6':3}}
]){
  const responses={...hintCore,...alternative.core};
  const before=scorer.scoreAllWithDiagnostics(responses,alternative.diagnostics);
  const after=scorer.scoreAllWithDiagnostics(responses,{...alternative.diagnostics,'D-ORI7':-3});
  assert.deepEqual(plain(after),plain(before),'Clarification must not erase direct/alternative original authority');
}
for(const responses of [fixed,evolving,neutral(),{},Object.fromEntries(bank.map(q=>[q.id,null]))]){
  assert.deepEqual(plain(scorer.scoreAllWithDiagnostics(responses,{'D-ORI7':-3})),
    plain(scorer.scoreAllWithDiagnostics(responses,{})),
    'Missing, neutral, or direct evidence must not be changed by a weak-link correction');
}
console.log('PASS: all-eight weak-link budget; invalid/missing response isolation; transparent bounded Time clarification, no opposite inference or cross-axis leakage.');

// Related all-axis contamination repairs must remain explicit. A temporal
// proposition is not an independent source-of-law or judicial-deference answer.
for(const id of ['T4','T5','T6']){
  const q=bank.find(item=>item.id===id);
  for(const direction of ['agree','disagree']){
    assert.equal(scorer.signalFor(q,direction,'sorc'),0,id+' leaked temporal content into legal validity');
    assert.equal(scorer.signalFor(q,direction,'post'),0,id+' leaked temporal content into deference');
  }
}
assert.equal(scorer.signalFor(bank.find(q=>q.id==='T12'),'disagree','prec'),0,
  'Rejecting development beyond fixed meaning does not reject precedent generally');
const systemic=classifier.buildTraits({...centeredScores,remed:0},{},{});
assert.equal(systemic['remedies.supervision']||0,0,'Broad relief is not proof of ongoing judicial supervision');
assert.equal(systemic['remedies.structural']||0,0,'Broad relief alone does not select the structural subtype');
assert.ok((systemic['remedies.systemic']||0)>0);
const prosecutorOnly=classifier.buildTraits(centeredScores,{E2:-3},{});
assert.ok((prosecutorOnly['separation.unitary_executive']||0)<=0.35,
  'A case-specific independent prosecutor objection is only weak general executive-control evidence');
const limitedControl=classifier.buildTraits(centeredScores,{E2:-3},{'D-SEP1':3});
assert.equal(limitedControl['separation.unitary_executive']||0,0);
const contextualAlternative=classifier.buildTraits(centeredScores,{}, {'D-TXT1':-3});
assert.equal(contextualAlternative['constraint.enacted_bargain']||0,0,
  'Rejecting one textualist formulation does not affirm enacted-compromise doctrine');
const antiSupremacyOnly=classifier.buildTraits(centeredScores,{}, {'D-MAJ2':-3});
assert.equal(antiSupremacyOnly['posture.branch_interpretation']||0,0,
  'Rejecting judicial finality alone does not establish departmental interpretation');
console.log('PASS: temporal/source/posture separation; bounded precedent clue; no automatic supervisory, structural, unitary-executive, compromise, or departmental doctrine.');
const systemicWithoutSupervision=classifier.buildTraits({...centeredScores,remed:0},{R4:-3},{});
assert.equal(systemicWithoutSupervision['remedies.supervision']||0,0,
  'A strong Systemic score cannot override explicit rejection of supervisory intervention');
const weakSource=classifier.buildTraits(centeredScores,{S7:-3},{});
const directSource=classifier.buildTraits(centeredScores,{S8:3},{});
assert.ok((weakSource['source.principles_are_law']||0)<=0.35,
  'An opposite response to law-runs-out is only weak evidence of a particular positive theory');
assert.equal(directSource['source.principles_are_law'],1);
assert.equal(classifier.buildTraits(centeredScores,{O13:3},{})['posture.rights_trumps']||0,0,
  'Judicial tenure does not alone establish searching merits review');
assert.equal(classifier.buildTraits(centeredScores,{R6:3,R7:3},{})['method.narrow_shallow']||0,0,
  'Severability does not alone establish a general minimalist philosophy');
const legacyCtx=vm.createContext({console});
for(const file of ['axes.js','questions.js','scoring.js','result_catalog.js',
  'diagnostics.js','profiles.js','result_content.js','classification.js']){
  vm.runInContext(fs.readFileSync(new URL('../'+file,import.meta.url),'utf8'),legacyCtx,{filename:file});
  if(file==='questions.js'){
    legacyCtx.LAW_VERSION='0.8 Beta';legacyCtx.LAW_INSTRUMENT_VERSION='0.8';
    legacyCtx.LAW_QUESTIONS=legacyCtx.LAW_LEGACY_QUESTIONS;
  }
}
assert.equal(legacyCtx.LAW_CLASSIFIER.buildTraits(centeredScores,{S7:-3},{})['source.principles_are_law'],1,
  'The current reliability repair must not silently reinterpret historical 0.8 trait semantics');
console.log('PASS: current weak/direct Source reliability, anti-supervision and non-crossloaded independence/severability controls; exact legacy trait semantics.');
