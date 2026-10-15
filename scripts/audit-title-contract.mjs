import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
const root = new URL('../', import.meta.url);
const context = vm.createContext({console});
for (const file of ['axes.js','questions.js','scoring.js','result_catalog.js','diagnostics.js','profiles.js','result_content.js','classification.js']) {
  vm.runInContext(fs.readFileSync(new URL(file, root),'utf8'),context,{filename:file});
}
const content=context.LAW_RESULT_CONTENT;
const fixture=JSON.parse(fs.readFileSync(new URL('scripts/fixtures/title-inventory-sha256.json',root)));
for (const [key,expected] of Object.entries(fixture.hashes)) {
  assert.equal(crypto.createHash('sha256').update(JSON.stringify(content[key])).digest('hex'),expected,
    `${key}: approved entries, wording, scope, and order must not change without discussion`);
}
const neutral=Object.fromEntries(context.LAW_AXES.map(axis=>[axis.id,50]));
const identity=id=>context.LAW_RESULT_IDENTITIES.find(item=>item.id===id);
const classification=id=>({identity:identity(id),identityScore:.9,primaryStrength:.9,identityAlternatives:[]});
const assemble=(id,scores={},traits={})=>content.assemble(classification(id),{...neutral,...scores},traits);
// Demonstrated catalog-assignment regressions: exact subtype content cannot be
// reselected as the phrase even when that duplicated signal is strongest.
let result=assemble('proportionalist',{sorc:0,form:0,prec:80});
assert.equal(result.modifier.id,'nonpositivist_proportionality');
assert.equal(result.phrase.id,'precedent_stability');
result=assemble('proportionalist',{cons:0,form:0,prec:80},{'constraint.purpose':1});
assert.equal(result.modifier.id,'purposive_proportionality');
assert.equal(result.phrase.id,'precedent_stability');
// Once noun and subtype are spent, changing the strongest residual changes only
// the phrase, not the already established subtype or noun.
result=assemble('proportionalist',{sorc:0,form:0,prec:80,separ:95});
assert.equal(result.modifier.id,'nonpositivist_proportionality');
assert.equal(result.phrase.id,'separation_formal');
// A source thesis does not spend textual method, and originalism's construction
// zone does not spend every other interpretive dimension merely by association.
result=assemble('positivist',{sorc:100,cons:95},{'source.morality_incorporated':1});
assert.equal(result.modifier.id,'inclusive_positivism');
assert.equal(result.phrase.id,'textual_constraint');
result=assemble('public_meaning_originalist',{time:100,cons:90},{'time.construction_zone':1});
assert.equal(result.modifier.id,'new_originalism');
assert.equal(result.phrase.id,'textual_constraint');
// No unrelated secondary commitment is promoted to a substantive modifier.
for (const id of ['positivist','textualist','public_meaning_originalist']) {
  result=assemble(id,{prec:100,remed:0,separ:100});
  assert.equal(result.modifier.id,'fit_unmistakable');
}
// Every public subtype remains reachable for each catalog-approved noun, and
// every emitted substantive modifier comes from the unchanged public inventory.
for (const twist of content.TWISTS.filter(t=>content.PUBLIC_SUBSTANTIVE_MODIFIER_IDS.includes(t.id))) {
  for (const id of twist.appliesTo||[]) {
    const scores={...neutral};
    if (twist.axis) scores[twist.axis]=twist.direction==='left'?100:0;
    const traits=Object.fromEntries([...(twist.traits||[]),...(twist.allTraits||[])].map(tag=>[tag,1]));
    result=content.assemble(classification(id),scores,traits);
    assert.equal(result.modifier?.id,twist.id,`${twist.id} should remain reachable on ${id}`);
    for (const feature of content.PHRASE_FEATURES) {
      if ((twist.blockedPhraseIds||[]).includes(feature.id)) assert.notEqual(result.phrase.id,feature.id);
    }
  }
}
// Fit wording is preserved. Stored legacy IDs remain renderable even if current
// selection would now avoid their redundant pairing.
assert.equal(assemble('positivist').modifier.text,'Unmistakably a');
assert.equal(assemble('public_meaning_originalist').modifier.text,'Unmistakably a');
assert.equal(content.assemble({...classification('positivist'),identityScore:.5},neutral).modifier.text,'Some kind of');
result=content.fromIds(identity('proportionalist'),neutral,{}, {
  modifierId:'nonpositivist_proportionality',phraseId:'source_nonpositive'});
assert.equal(result.modifier.id,'nonpositivist_proportionality');
assert.equal(result.phrase.id,'source_nonpositive');
console.log('PASS: immutable approved title inventories; noun/subtype consumption; strongest residual; legacy IDs.');

// Objective moral validity must be confirmed by its own propositions, never by
// the unrelated positive-law settlement answer or personal moral override.
{
  const classifier=context.LAW_CLASSIFIER;
  const feature=content.PHRASE_FEATURES.find(f=>f.id==='objective_morality');
  const scores={...neutral,sorc:20};
  const quality=(responses,diagnostics={})=>content.phraseQuality(feature,scores,
    classifier.buildTraits(scores,responses,diagnostics),
    classifier.buildTraitEvidence(responses,diagnostics));
  assert.equal(quality({S10:3,S11:3}).eligible,true,
    'Two fully endorsed independent moral-validity core propositions confirm the phrase');
  for (const other of [-3,-2,-1,0,1,2,null]) {
    assert.equal(quality({S10:3,S11:other},{'D-NP1':3}).eligible,false,
      'Settlement agreement cannot repair missing or inadequate independent moral confirmation');
    assert.equal(quality({S10:other,S11:3},{'D-NP1':3}).eligible,false);
  }
  assert.equal(quality({}, {'D-NP1':3,'D-MOR1':3}).eligible,false);
  assert.equal(quality({S10:-3,S11:-3},{'D-NP1':3,'D-NL2':3}).eligible,false,
    'A diagnostic cannot erase core rejection of independently morally constitutive law');
  const withoutSettlement=quality({S10:3,S11:3});
  for (const response of [-3,0,3,null]) {
    assert.deepEqual(quality({S10:3,S11:3},{'D-NP1':response}),withoutSettlement,
      'Settlement responses cannot change objective-morality phrase eligibility or confidence');
  }
  assert.equal(content.phraseQuality(feature,scores,{'source.objective_morality':1},{}).eligible,false,
    'A synthetic trait alone cannot bypass the evidence gate');
}
console.log('PASS: independent moral-validity phrase confirmation; no settlement or personal-morality leakage.');

// Strong compatibility is not resolved primary priority. In particular the
// classifier's .12 live-rival window is wider than the old .07 fit-wording gate.
{
  const scores={...neutral,sorc:95,time:80};
  // Current Time scores alone cannot establish independent original authority.
  // This synthetic priority test expressly supplies the competing commitment.
  const rivalTraits=context.LAW_CLASSIFIER.buildTraits(scores,{T1:3,T11:3,T7:3},{});
  const resolution=context.LAW_CLASSIFIER.resolveIdentity(scores,rivalTraits);
  const classified={...classification(resolution.best.identity.id),
    identityScore:resolution.best.score,
    identityAlternatives:resolution.candidates.filter(c=>c.priorityFamily!==resolution.best.priorityFamily),
    identityPriority:{unresolved:!!resolution.priorityConflict || resolution.candidates.some(c=>
      !c.priorityDefeated && c.priorityFamily!==resolution.best.priorityFamily &&
      resolution.best.score-c.score<=.12)}};
  classified.resultTitle=content.assemble(classified,scores,{},{});
  assert.equal(classified.identity.id,'positivist');
  assert.equal(classified.identityPriority.unresolved,true);
  assert.equal(classified.resultTitle.modifier.id,'fit_some_kind');
  for (const margin of [.04,.07,.10,.12,.4]) {
    const ambiguous={...classification('positivist'),identityScore:.95,
      identityAlternatives:[{score:.95-margin}],identityPriority:{unresolved:true}};
    assert.equal(content.assemble(ambiguous,scores,{},{}).modifier.id,'fit_some_kind',
      'Explicit unresolved priority must defeat strong-fit wording at every numerical margin');
    assert.equal(content.assemble(ambiguous,scores,{'source.morality_incorporated':1},{}).modifier.id,
      'inclusive_positivism','Supported substantive subtype survives primary-priority uncertainty');
  }
  const clear={...classification('positivist'),identityPriority:{unresolved:false}};
  assert.equal(content.assemble(clear,scores,{},{}).modifier.id,'fit_unmistakable',
    'Resolved strong fits retain their existing wording');
}
console.log('PASS: unresolved primary priority blocks unmistakable-fit wording without erasing subtypes.');
