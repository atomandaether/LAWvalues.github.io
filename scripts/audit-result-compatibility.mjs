import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { runtime } from './fixtures/whole-profile/runtime.mjs';

const root = fileURLToPath(new URL('../', import.meta.url)).replace(/\/$/, '');
const plain = value => JSON.parse(JSON.stringify(value));
const axes = ['sorc', 'cons', 'time', 'prec', 'remed', 'post', 'separ', 'form'];
const labelIds = ['source', 'constraint', 'time', 'precedent', 'remedies', 'posture', 'separation', 'form'];
const scores = { sorc: 0, cons: 100, time: 75, prec: 0, remed: 50, post: 100, separ: 49, form: 51 };
const query = (version = '0.9 Beta', extras = {}) => new URLSearchParams({
  ...scores, ...(version === null ? {} : { v: version }), ...extras
});
const create = params => runtime(root, { search: '?' + params });
const subject = create(query());
const compat = subject.ctx.LAW_RESULT_COMPAT;

assert.equal(subject.ctx.LAW_VERSION, '0.9 Beta');
assert.equal(subject.ctx.LAW_SCORING.questionsForVersion('0.8 Beta'), subject.ctx.LAW_LEGACY_QUESTIONS);
assert.equal(subject.ctx.LAW_SCORING.questionsForVersion('0.8'), subject.ctx.LAW_LEGACY_QUESTIONS);
assert.equal(subject.ctx.LAW_SCORING.questionsForVersion('0.9'), subject.ctx.LAW_QUESTIONS);
for (const invalid of [null, undefined, '', '0.7 Beta', '0.9 garbage', '0.10', 'constructor']) {
  assert.throws(() => subject.ctx.LAW_SCORING.questionsForVersion(invalid), /Unsupported LAWvalues instrument version/);
}
const originalAnswers = Object.fromEntries(subject.ctx.LAW_LEGACY_QUESTIONS.map((q, i) => [q.id, (i % 7) - 3]));
assert.deepEqual(
  plain(subject.ctx.LAW_SCORING.scoreAllForVersion(originalAnswers, '0.8')),
  plain(subject.ctx.LAW_SCORING.scoreAll(originalAnswers, subject.ctx.LAW_AXES, subject.ctx.LAW_LEGACY_QUESTIONS))
);
assert.deepEqual(
  plain(subject.ctx.LAW_SCORING.scoreAxisForVersion('time', originalAnswers, '0.8')),
  plain(subject.ctx.LAW_SCORING.scoreAxis('time', originalAnswers, subject.ctx.LAW_LEGACY_QUESTIONS))
);

// Only explicit, recognized versions may interpret raw answers.
for (const version of [null, '', 'garbage', '0.9garbage', '0.9 Beta extra', '0.10', '0.9.0', '0.80', '1.0']) {
  assert.equal(compat.versionInfo(version).canInterpretResponses, false, String(version));
}
assert.equal(compat.versionInfo('0.8').kind, 'legacy');
assert.equal(compat.versionInfo('0.7 Beta').kind, 'legacy');
assert.equal(compat.versionInfo('0.9').kind, 'current');
const duplicateVersion = query(); duplicateVersion.append('v', '0.8');
assert.equal(compat.versionFromParams(duplicateVersion).canInterpretResponses, false);
assert.deepEqual(plain(compat.parseScores(query())), scores, 'Exact zero is a saved score, not missing');
const fractional = query(); fractional.set('time', '75.25');
assert.equal(compat.parseScores(fractional).time, 75.25, 'Preserve saved numbers without re-rounding');
for (const invalid of ['', ' ', 'NaN', 'Infinity', '-1', '101', '0x10', '2e1', 'null', 'undefined']) {
  const q = query(); q.set('time', invalid);
  assert.equal(compat.parseScores(q), null, `Invalid score: ${invalid}`);
}
const missing = query(); missing.delete('time'); assert.equal(compat.parseScores(missing), null);
const duplicateScore = query(); duplicateScore.append('time', '75'); assert.equal(compat.parseScores(duplicateScore), null);

// 0.8 local data remain discoverable and exportable, without reclassification.
const legacyQuery = query('0.8 Beta');
const legacy = create(legacyQuery);
const legacyRecord = {
  version: '0.8 Beta', resultQuery: legacyQuery.toString(), scores,
  responses: { T1: 0, T2: null, T3: 3 }, diagnosticResponses: { D_PUBLIC_MEANING: -3 },
  completedAt: '2026-10-14T14:00:00Z', customOriginalField: 'preserve-me'
};
const legacySerialized = JSON.stringify(legacyRecord);
legacy.storage.setItem('lawvalues-latest-0.8 Beta', legacySerialized);
let calls = 0;
legacy.ctx.LAW_CLASSIFIER = { classify() { calls++; throw Error('Legacy raw answers reached new classifier'); } };
legacy.ctx.LAW_AXIS_LABELS = {
  describeAll() { calls++; throw Error('Legacy raw answers reached new labels'); },
  fromIds() { calls++; throw Error('Legacy URL reached new labels'); }
};
legacy.run('results.js');
assert.equal(calls, 0);
assert.equal(legacy.nodes.get('time-label').textContent, 'Historical');
assert.equal(legacy.nodes.get('positivist').textContent, '0%');
assert.equal(legacy.nodes.get('bar-positivist').style.display, 'none');
assert.equal(legacy.nodes.get('bar-nonpositivist').style.width, '100%');
assert.match(legacy.nodes.get('version-note').textContent, /Saved 0\.8 Beta result/);
assert.match(legacy.nodes.get('result-title').textContent, /No jurisprudential classification/);
assert.equal(legacy.nodes.get('download-record').hidden, false);
assert.equal(legacy.storage.getItem('lawvalues-latest-0.8 Beta'), legacySerialized);
let exported;
legacy.ctx.URL = class extends URL {
  static createObjectURL(blob) { exported = blob; return 'blob:legacy-export'; }
  static revokeObjectURL() {}
};
legacy.nodes.get('download-record').click();
const savedExport = JSON.parse(await exported.text());
assert.equal(savedExport.version, '0.8 Beta');
assert.equal(savedExport.instrumentVersion, '0.8 Beta');
assert.deepEqual(savedExport.responses, legacyRecord.responses);
assert.deepEqual(savedExport.scores, legacyRecord.scores);
assert.equal(savedExport.customOriginalField, 'preserve-me');
legacy.nodes.get('copy-summary').click();
assert.match(legacy.clipboard(), /LAWvalues 0\.8 Beta/);
assert.match(legacy.clipboard(), /Time: 75% Historical \/ 25% Living/);

// Old saved narrative is shown exactly; absent narrative is never regenerated.
legacyRecord.classification = {
  identity: { id: 'positivist', label: 'Positivist' }, champions: [],
  resultTitle: { title: 'Saved original title', noun: 'Positivist' },
  narrative: { opening: 'Saved original opening.', context: 'Saved original context.' }
};
legacy.storage.setItem('lawvalues-latest-0.8 Beta', JSON.stringify(legacyRecord));
legacy.newDocument(); legacy.run('results.js');
assert.equal(legacy.ctx.document.getElementById('result-title').textContent, 'Saved original title');
assert.equal(legacy.ctx.document.getElementById('result-opening').textContent, 'Saved original opening.');
assert.equal(legacy.ctx.document.getElementById('result-context').textContent, 'Saved original context.');
assert.equal(calls, 0);

for (const version of ['0.8', '0.7 Beta', null, '', 'invalid', '0.10']) {
  const r = create(query(version));
  r.ctx.LAW_CLASSIFIER = { classify() { throw Error('Score-only URL reached classifier'); } };
  r.ctx.LAW_AXIS_LABELS = {
    describeAll() { throw Error('Score-only URL reached labels'); },
    fromIds() { throw Error('Old URL reached current share labels'); }
  };
  r.run('results.js');
  assert.equal(r.nodes.get('results-main').hidden, false);
  assert.equal(r.nodes.get('time-label').textContent, 'Historical');
  assert.match(r.nodes.get('version-note').textContent, /saved|Saved/);
}

// Explicit old title and narrative IDs replay from catalogs only. Omitted IDs
// never trigger today's classification, modifier ranking, or narrative routing.
const savedTextQuery = query('0.8 Beta', {
  i: 'public_meaning_originalist', m: 'new_originalism', p: 'secondary_neutral',
  b: 'framework_originalism', x: 'opm_construction', o: 'opm_public_meaning'
});
const savedText = create(savedTextQuery);
const savedContent = savedText.ctx.LAW_RESULT_CONTENT;
const savedNarrative = savedText.ctx.LAW_RESULT_NARRATIVE;
const safeOpeningId = Object.keys(savedNarrative.OPENINGS)[0];
savedTextQuery.set('o', safeOpeningId); savedText.location.search = '?' + savedTextQuery;
savedText.ctx.LAW_RESULT_CONTENT = { ...savedContent,
  assemble() { throw Error('Legacy title inferred from current scores'); },
  fromIds() { throw Error('Legacy title used current ranking'); }
};
savedText.ctx.LAW_RESULT_NARRATIVE = { ...savedNarrative,
  build() { throw Error('Legacy narrative inferred from current scores'); }
};
savedText.run('results.js');
const expectedLegacyTitle = savedContent.composeTitle(
  savedText.ctx.LAW_RESULT_IDENTITIES.find(x => x.id === 'public_meaning_originalist'),
  savedContent.MODIFIERS.find(x => x.id === 'new_originalism'),
  savedContent.FALLBACK_PHRASES.neutral
);
assert.equal(savedText.nodes.get('result-title').textContent, expectedLegacyTitle);
assert.equal(savedText.nodes.get('result-opening').textContent, savedNarrative.OPENINGS[safeOpeningId]);
assert.equal(savedText.nodes.get('result-context').textContent, savedNarrative.ROUTES.opm_construction.context);
assert.deepEqual(plain(savedText.ctx.LAW_RESULT_COMPAT.parseScores(savedTextQuery)), scores);
savedTextQuery.delete('m'); savedTextQuery.delete('p'); savedTextQuery.delete('b'); savedTextQuery.delete('o'); savedTextQuery.delete('x');
savedText.location.search = '?' + savedTextQuery; savedText.newDocument(); savedText.run('results.js');
assert.equal(savedText.ctx.document.getElementById('result-title').textContent, 'Public-Meaning Originalist');
assert.equal(savedText.ctx.document.getElementById('result-opening').textContent, '');
assert.equal(savedText.ctx.document.getElementById('result-context').textContent, '');
savedTextQuery.set('m', '__proto__'); savedText.location.search = '?' + savedTextQuery;
savedText.newDocument(); savedText.run('results.js');
assert.equal(savedText.ctx.document.getElementById('result-title').textContent, 'Public-Meaning Originalist');

// A versionless or changed URL cannot borrow a current session's raw answers.
const record = {
  version: subject.ctx.LAW_VERSION, instrumentVersion: subject.ctx.LAW_VERSION,
  resultQuery: query().toString(), scores, responses: { T1: 0 }, diagnosticResponses: {}
};
subject.storage.setItem('lawvalues-latest-0.9 Beta', JSON.stringify(record));
const load = params => compat.loadLocalRecord({ storage: subject.storage, params, scores: compat.parseScores(params) });
assert.deepEqual(plain(load(query()).responses), { T1: 0 });
assert.equal(load(query(null)), null);
assert.equal(load(duplicateVersion), null);
assert.equal(load(query('0.8 Beta')), null);
assert.equal(load(query('0.9 Beta', { time: 76 })), null);
assert.equal(load(query('0.9 Beta', { al: 'forged' })), null);
for (const patch of [
  { instrumentVersion: '0.8 Beta' }, { instrumentVersion: '' }, { version: '' }, { responses: { T1: '3' } },
  { responses: { T1: 4 } }, { responses: [] }, { diagnosticResponses: { D1: -4 } }
]) {
  subject.storage.setItem('lawvalues-latest-0.9 Beta', JSON.stringify({ ...record, ...patch }));
  assert.equal(load(query()), null, JSON.stringify(patch));
}
subject.storage.setItem('lawvalues-latest-0.9 Beta', '{broken');
assert.equal(load(query()), null);
assert.equal(compat.loadLocalRecord({ storage: { getItem() { throw Error('blocked'); } }, params: query(), scores }), null);

// Current numeric-only links remain explicitly unpersonalized.
const numericOnly = create(query()); numericOnly.run('results.js');
assert.equal(numericOnly.nodes.get('time-label').textContent, 'Score only');
assert.match(numericOnly.nodes.get('time-label-explanation').textContent, /no valid answer-based label/);

// Real labels round-trip as whitelisted IDs, with no raw answers in the URL.
for (const answer of [null, 0, 3, -3]) {
  const r = create(query());
  const responses = Object.fromEntries(r.ctx.LAW_QUESTIONS.map(q => [q.id, answer]));
  const computed = r.ctx.LAW_SCORING.scoreAllWithDiagnostics(responses, {});
  const savedScores = Object.fromEntries(axes.map(id => [id, computed[id].score]));
  const descriptions = r.ctx.LAW_AXIS_LABELS.describeAll({ scores: computed, responses, diagnosticResponses: {}, version: r.ctx.LAW_VERSION });
  const ids = r.ctx.LAW_AXIS_LABELS.toIds(descriptions);
  assert.equal(ids.split(',').length, 8);
  const params = new URLSearchParams({ ...savedScores, v: r.ctx.LAW_VERSION, alv: '1', al: ids });
  const saved = { version: r.ctx.LAW_VERSION, instrumentVersion: r.ctx.LAW_VERSION, resultQuery: params.toString(), scores: savedScores, responses, diagnosticResponses: {} };
  r.storage.setItem('lawvalues-latest-' + r.ctx.LAW_VERSION, JSON.stringify(saved));
  r.location.search = '?' + params; r.run('results.js');
  const displayed = labelIds.map(id => [r.ctx.document.getElementById(id + '-label').textContent, r.ctx.document.getElementById(id + '-label-explanation').textContent]);
  r.storage.clear(); r.newDocument(); r.run('results.js');
  assert.deepEqual(labelIds.map(id => [r.ctx.document.getElementById(id + '-label').textContent, r.ctx.document.getElementById(id + '-label-explanation').textContent]), displayed);
  assert.equal(params.has('responses'), false);
  assert.deepEqual(plain(r.ctx.LAW_RESULT_COMPAT.parseScores(params)), savedScores);
  for (const invalid of ['constructor', '__proto__', '<script>alert(1)</script>', '', ids.split(',').slice(0, -1).join(',')]) {
    const bad = new URLSearchParams(params); bad.set('al', invalid);
    assert.equal(r.ctx.LAW_RESULT_COMPAT.descriptionsForResult({ scores: savedScores, params: bad, record: null }), null);
  }
  const badVersion = new URLSearchParams(params); badVersion.set('alv', '2');
  assert.equal(r.ctx.LAW_RESULT_COMPAT.descriptionsForResult({ scores: savedScores, params: badVersion, record: null }), null);
}

// Numeric adjustments are transparent without fabricating a shared raw ledger.
const clarification = create(query());
const cr = clarification.ctx;
const clarifiedResponses = Object.fromEntries(cr.LAW_QUESTIONS.map(q => [q.id, 0]));
Object.assign(clarifiedResponses, { T7: 3, T8: 3, T10: 3 });
const diagnostics = { 'D-ORI7': -3 };
const originalScored = cr.LAW_SCORING.scoreAll(clarifiedResponses);
const finalScored = cr.LAW_SCORING.scoreAllWithDiagnostics(clarifiedResponses, diagnostics);
assert.notEqual(originalScored.time.score, finalScored.time.score);
const originalScores = Object.fromEntries(axes.map(id => [id, originalScored[id].score]));
const adjustedScores = Object.fromEntries(axes.map(id => [id, finalScored[id].score]));
const clarifiedQuery = new URLSearchParams({
  ...adjustedScores, v: cr.LAW_VERSION, cs: axes.map(id => originalScores[id]).join(','), sp: 'reviewed-hints-20pct-v1'
});
const clarifiedRecord = {
  version: cr.LAW_VERSION, instrumentVersion: cr.LAW_VERSION, resultQuery: clarifiedQuery.toString(),
  scores: adjustedScores, coreScores: originalScores, scoringDetails: plain(finalScored),
  responses: clarifiedResponses, diagnosticResponses: diagnostics
};
clarification.storage.setItem('lawvalues-latest-' + cr.LAW_VERSION, JSON.stringify(clarifiedRecord));
clarification.location.search = '?' + clarifiedQuery;
clarification.run('results.js');
assert.equal(clarification.nodes.get('time-label-evidence').hidden, true);
assert.match(clarification.nodes.get('time-label-evidence-text').textContent, /Weighted evidence/);
assert.match(clarification.nodes.get('time-label-evidence-text').textContent, /T7/);
assert.match(clarification.nodes.get('time-label-evidence-text').textContent, /D-ORI7/);
clarification.storage.clear(); clarification.newDocument(); clarification.run('results.js');
assert.equal(cr.document.getElementById('time-label-evidence').hidden, true);
assert.match(cr.document.getElementById('time-label-evidence-text').textContent, /shared link does not include the answer-level ledger/);
assert.ok(!cr.document.getElementById('time-label-evidence-text').textContent.includes('D-ORI7'));
cr.document.getElementById('copy-summary').click();
assert.match(clarification.clipboard(), /Time clarification: core estimate/);
for (const bad of ['', '0,0', '101,50,50,50,50,50,50,50', '0,,50,50,50,50,50,50', 'NaN,50,50,50,50,50,50,50']) {
  const params = new URLSearchParams(clarifiedQuery); params.set('cs', bad);
  assert.equal(cr.LAW_RESULT_COMPAT.coreScoresForResult({ params, record: null }), null);
}
for (const [key, value] of [['v', '0.8 Beta'], ['sp', 'unknown-policy']]) {
  const params = new URLSearchParams(clarifiedQuery); params.set(key, value);
  assert.equal(cr.LAW_RESULT_COMPAT.coreScoresForResult({ params, record: null }), null);
}
const duplicateCore = new URLSearchParams(clarifiedQuery); duplicateCore.append('cs', clarifiedQuery.get('cs'));
assert.equal(cr.LAW_RESULT_COMPAT.coreScoresForResult({ params: duplicateCore, record: null }), null);

// Completing a new quiz preserves the old storage key and records both raw-core
// and final scores, including the scoring details used for an auditable result.
const completion = create(query());
const cc = completion.ctx;
const order = cc.LAW_QUESTIONS.map(q => q.id);
completion.storage.setItem('lawvalues-latest-0.8 Beta', legacySerialized);
completion.storage.setItem('lawvalues-quiz-' + cc.LAW_VERSION, JSON.stringify({
  version: cc.LAW_VERSION, instrumentVersion: cc.LAW_VERSION, order, index: order.length - 1,
  responses: Object.fromEntries(order.slice(0, -1).map(id => [id, 0])),
  phase: 'core', diagnosticOrder: [], diagnosticResponses: {}, diagnosticIndex: 0,
  startedAt: '2026-10-15T00:00:00Z'
}));
cc.LAW_CLASSIFIER = { MAX_DIAGNOSTICS: 12, MAX_TOTAL_QUESTIONS: 100, diagnosticBank: () => [],
  nextDiagnostic: () => null, classify: () => ({
    identity: cc.LAW_RESULT_IDENTITIES.find(identity => identity.id === 'positivist'),
    champions: [], traits: {}, diagnosticCount: 0
  })
};
completion.run('quiz.js'); completion.buttons[3].click();
const completed = JSON.parse(completion.storage.getItem('lawvalues-latest-' + cc.LAW_VERSION));
assert.equal(completed.version, '0.9 Beta');
assert.equal(completed.instrumentVersion, '0.9 Beta');
assert.equal(completed.axisLabelVersion, 1);
assert.equal(completed.responses[order.at(-1)], 0);
assert.equal(completion.storage.getItem('lawvalues-latest-0.8 Beta'), legacySerialized);
assert.deepEqual(Object.keys(completed.coreScores), axes);
assert.deepEqual(Object.keys(completed.scoringDetails), axes);
const completedQuery = new URL(completion.location.href).searchParams;
assert.equal(completedQuery.get('v'), '0.9 Beta');
assert.equal(completedQuery.get('alv'), '1');
assert.equal(completedQuery.get('al').split(',').length, 8);
assert.deepEqual(plain(cc.LAW_RESULT_COMPAT.parseScores(completedQuery)), completed.scores);
assert.equal(completedQuery.has('cs'), false, 'Do not claim an adjustment for unadjusted scores');
assert.equal(completedQuery.has('sp'), false);
// The correction is serialized by the real completion path as well.
const correctedCompletion = create(query());
const ccc = correctedCompletion.ctx;
correctedCompletion.storage.setItem('lawvalues-quiz-' + ccc.LAW_VERSION, JSON.stringify({
  version: ccc.LAW_VERSION, instrumentVersion: ccc.LAW_VERSION, order, index: order.length - 1,
  responses: { ...clarifiedResponses }, phase: 'core', diagnosticOrder: [], diagnosticResponses: {}, diagnosticIndex: 0,
  startedAt: '2026-10-15T00:00:00Z'
}));
const bank = ccc.LAW_DIAGNOSTIC_QUESTIONS;
ccc.LAW_CLASSIFIER = { ...cc.LAW_CLASSIFIER, diagnosticBank: () => bank,
  nextDiagnostic: (_scores, _responses, answers) => Object.hasOwn(answers, 'D-ORI7') ? null : bank.find(q => q.id === 'D-ORI7')
};
correctedCompletion.run('quiz.js'); correctedCompletion.buttons[3].click(); correctedCompletion.buttons[6].click();
const correctedQuery = new URL(correctedCompletion.location.href).searchParams;
assert.equal(correctedQuery.get('sp'), 'reviewed-hints-20pct-v1');
assert.equal(correctedQuery.get('cs'), axes.map(id => originalScores[id]).join(','));
assert.equal(Number(correctedQuery.get('time')), finalScored.time.score);


for (const page of ['quiz.html', 'results.html']) {
  const html = fs.readFileSync(root + '/' + page, 'utf8');
  for (const script of ['result_compatibility.js', 'axis_labels.js']) {
    assert.ok(html.indexOf(`src="${script}"`) >= 0, `${page} loads ${script}`);
    assert.ok(html.indexOf(`src="${script}"`) < html.indexOf(`src="${page.replace('.html', '.js')}"`));
  }
}
console.log('PASS: explicit instrument replay, 0.8 records and exports, strict versions and scores, exact zero, local/share label replay, malformed links and unavailable storage.');
