import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const context = vm.createContext({ console });
context.globalThis = context;
for (const filename of [
  'axes.js', 'questions.js', 'scoring.js', 'result_catalog.js',
  'diagnostics.js', 'profiles.js', 'champion_content.js',
  'champion_cards.js', 'result_content.js', 'classification.js',
  'axis_labels.js'
]) {
  vm.runInContext(fs.readFileSync(path.join(root, filename), 'utf8'), context, { filename });
}

const neutralAnswers = () => Object.fromEntries(context.LAW_QUESTIONS.map(question => [question.id, 0]));
const describe = (scores, responses, diagnosticResponses = {}) =>
  context.LAW_AXIS_LABELS.describeAll({
    scores,
    responses,
    diagnosticResponses,
    version: context.LAW_VERSION
  });
const identity = id => context.LAW_RESULT_IDENTITIES.find(item => item.id === id);
const classificationFor = id => ({
  identity: identity(id), identityScore: 0.86, primaryStrength: 0.75,
  identityAlternatives: [{ score: 0.72 }]
});

// A small but consistent directional tilt is still answer-grounded Weak evidence.
// It must not become a confident residual pole claim merely because normalization
// moves the displayed percentage well away from 50.
{
  const responses = neutralAnswers();
  for (const question of context.LAW_QUESTIONS) {
    const agree = Number(question.signals?.agree?.sorc || 0);
    const disagree = Number(question.signals?.disagree?.sorc || 0);
    if (!agree && !disagree) continue;
    responses[question.id] = agree <= disagree ? 1 : -1;
  }
  const scores = context.LAW_SCORING.scoreAllWithDiagnostics(responses, {});
  const descriptions = describe(scores, responses);
  assert.equal(descriptions.sorc.status, 'weak');
  const assembled = context.LAW_RESULT_CONTENT.assemble(
    classificationFor('thayerian'), scores, {}, {}, descriptions
  );
  assert.notEqual(assembled.phrase.id, 'source_nonpositive');
  assert.notEqual(assembled.phrase.id, 'source_positive');
  assert.equal(assembled.phrase.id, 'secondary_neutral',
    'Weak axis evidence must use the residual fallback instead of a confident pole phrase');

  // A stored/shared title explicitly names its historical phrase ID. Replaying
  // that immutable record must not silently rewrite the old title.
  const replay = context.LAW_RESULT_CONTENT.fromIds(
    identity('thayerian'), scores, {}, { phraseId: 'source_nonpositive' }
  );
  assert.equal(replay.phrase.id, 'source_nonpositive');
}

// S7 and S8 directly affirm propositions the reviewed Source label treats as a
// logical conflict. Other strong Source answers cancel around the midpoint.
// Full score metadata plus the explicit label status must reach the fallback.
{
  const responses = neutralAnswers();
  Object.assign(responses, {
    S1: -3, S2: -3, S6: -3, S7: 3, S8: 3, S10: 0, S11: 3
  });
  const scores = context.LAW_SCORING.scoreAllWithDiagnostics(responses, {});
  const descriptions = describe(scores, responses);
  assert.equal(descriptions.sorc.status, 'conflicting');
  const assembled = context.LAW_RESULT_CONTENT.assemble(
    classificationFor('thayerian'), scores, {}, {}, descriptions
  );
  assert.equal(assembled.phrase.id, 'secondary_contradiction');
  assert.equal(assembled.phrase.axis, 'sorc');
}

// A logical conflict in the primary Source domain does not choose a different
// noun or thinker by fiat. It does cap claims of certainty about both layers.
{
  const responses = neutralAnswers();
  for (const question of context.LAW_QUESTIONS) {
    const agree = Number(question.signals?.agree?.sorc || 0);
    const disagree = Number(question.signals?.disagree?.sorc || 0);
    if (!agree && !disagree) continue;
    responses[question.id] = agree >= disagree ? 3 : -3;
  }
  responses.S7 = 3;
  responses.S8 = 3;
  const scores = context.LAW_SCORING.scoreAllWithDiagnostics(responses, {});
  const descriptions = describe(scores, responses);
  const result = context.LAW_CLASSIFIER.classify(scores, responses, {});
  assert.equal(descriptions.sorc.status, 'conflicting');
  assert.equal(result.identity.id, 'positivist');
  assert.equal(result.champions[0]?.id, 'hart');
  assert.equal(result.primaryConflict, true);
  assert.equal(result.championConflict, true);
  assert.equal(result.resultTitle.modifier?.id, 'fit_some_kind',
    'A logically conflicting primary domain cannot render as Unmistakable');
  assert.notEqual(result.championConfidence, 'high',
    'A champion modeled on the conflicting domain cannot retain high confidence');
}

// Entering through results.html has no answer-level evidence unless the URL
// carries valid serialized label IDs. Missing or explicitly Weak labels must not
// regenerate a directional phrase from the Source percentage. A valid stored p
// remains an immutable historical title component.
{
  class Element {
    constructor() {
      this.textContent=''; this.innerHTML=''; this.style={}; this.hidden=false;
      this.children=[]; this.className=''; this.classList={toggle(){}};
    }
    setAttribute() {}
    addEventListener() {}
    appendChild(child) { this.children.push(child); return child; }
    remove() {}
    select() {}
    click() {}
  }
  const renderNodes=new Map();
  const document={
    body:new Element(),
    getElementById(id){if(!renderNodes.has(id))renderNodes.set(id,new Element());return renderNodes.get(id);},
    createElement(){return new Element();},
    execCommand(){return true;}
  };
  const location={search:'',href:''};
  const renderContext=vm.createContext({
    console, URLSearchParams, document,
    window:{location,setTimeout(){}},
    sessionStorage:{getItem(){return null;}},
    navigator:{clipboard:{writeText:async()=>{}}}
  });
  renderContext.globalThis=renderContext;
  for(const filename of [
    'axes.js','questions.js','scoring.js','result_compatibility.js','result_catalog.js',
    'diagnostics.js','profiles.js','champion_content.js','champion_cards.js',
    'result_content.js','classification.js','result_narrative.js','axis_labels.js'
  ]) vm.runInContext(fs.readFileSync(path.join(root,filename),'utf8'),renderContext,{filename});

  const base=new URLSearchParams({
    v:'0.9 Beta',sorc:'33',cons:'50',time:'50',prec:'50',remed:'50',post:'85',separ:'50',form:'50',
    i:'thayerian',c:'thayer'
  });
  const render=query=>{
    renderNodes.clear(); location.search='?'+query.toString(); location.href='https://example.test/results.html'+location.search;
    vm.runInContext(fs.readFileSync(path.join(root,'results.js'),'utf8'),renderContext,{filename:'results.js'});
    return renderNodes.get('result-title').textContent;
  };
  const scoreOnly=render(base);
  assert.doesNotMatch(scoreOnly,/ghosts agree|evil just needs/,
    'A score-only URL must not invent a directional Source phrase');

  const weak=new URLSearchParams(base);
  weak.set('alv','1');
  weak.set('al','sorc-weak,cons-weak,time-weak,prec-weak,remed-weak,post-weak,separ-weak,form-weak');
  const weakTitle=render(weak);
  assert.doesNotMatch(weakTitle,/ghosts agree|evil just needs/,
    'An explicitly Weak URL label must not invent a directional Source phrase');

  const stored=new URLSearchParams(weak);
  stored.set('p','source_nonpositive');
  assert.match(render(stored),/ghosts agree/,
    'An explicitly stored historical phrase ID must replay verbatim');
}

console.log('PASS: weak axes cannot emit confident pole phrases; reviewed conflicts reach fallback and confidence; stored title IDs replay unchanged.');
