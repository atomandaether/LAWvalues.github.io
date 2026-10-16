import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = name => fs.readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const html = source('results.html');
const css = source('v2.css');
const resultsJs = source('results.js');
assert.ok(html.indexOf('id="result-title"') < html.indexOf('id="champion-line"'));
assert.ok(html.indexOf('id="result-title"') < html.indexOf('id="commitment-icons"'));
assert.ok(html.indexOf('id="champion-line"') < html.indexOf('id="result-narrative"'));
assert.ok(html.indexOf('id="result-opening"') < html.indexOf('id="results-axes"'),
    'The complete axis profile must follow diagnosis paragraph one');
assert.ok(html.indexOf('id="results-axes"') < html.indexOf('id="source-label"'));
assert.ok(html.indexOf('id="form-label"') < html.indexOf('id="result-context"'),
    'Legal-context paragraph two must follow all eight axes');
assert.ok(html.indexOf('id="result-context"') < html.indexOf('id="copy-link"'));
assert.ok(html.indexOf('id="copy-link"') < html.indexOf('id="champion-network"'));
assert.ok(html.indexOf('id="champion-network"') < html.indexOf('id="champion-description"'));
for (const obsolete of ['Your jurisprudential profile', 'Your jurisprudential fit', 'id="result-summary"', 'id="classification-label"', 'id="champion-network-legend"', '<h2>Jurisprudential network</h2>']) {
    assert.ok(!html.includes(obsolete), `Obsolete duplicate UI: ${obsolete}`);
}
assert.match(css, /html\.results-document\s*\{[^}]*overflow: auto/s);
assert.match(css, /\.results-page \.result-title\s*\{[^}]*font-weight: 700/s);
assert.match(css, /\.results-page \.result-title \.result-title-noun\s*\{[^}]*color:\s*#365F78/s,
    'Result nouns should use the readable steel-blue title color');
assert.match(css, /\.results-page \.result-narrative p\s*\{[^}]*font-weight: 400/s);
assert.match(html, /id="champion-card"[^>]*role="button"[^>]*aria-expanded="false"/);
assert.match(html, /class="brand-home" href="index\.html"/);
assert.match(html, /id="download-record"/);
assert.match(html, /id="retake-quiz" href="quiz\.html\?fresh=1"/);
assert.match(html, /id="classification-panel" hidden/);
assert.match(html, /id="version-note" hidden/);
assert.equal((html.match(/class="axis-track"/g) || []).length, 8);
assert.equal((html.match(/class="axis-explanation"/g) || []).length, 8);
assert.ok(!html.includes('class="axis-explanation" hidden'));
for (const axis of html.split('<div class="axis-track">').slice(1)) {
    assert.ok(axis.indexOf('class="axis-bars"') < axis.indexOf('class="axis-explanation"'));
    assert.ok(axis.indexOf('class="axis-explanation"') < axis.indexOf('<img'));
}
assert.equal((html.match(/class="axis-evidence"[^>]* hidden/g) || []).length, 8);
assert.match(resultsJs, /supportedStatuses = new Set\(\['supported','conditional'\]\)/,
    'Commitment logos need an affirmative answer-evidence allowlist');
assert.match(resultsJs, /supportedStatuses\.has\(item\.status\)/,
    'Missing, conflicting, withheld, and score-only axes must not emit commitment logos');
class Element {
    constructor() { this.textContent = ''; this.innerHTML = ''; this.style = {}; this.hidden = false; this.children=[]; this.classList={toggle(){}}; }
    setAttribute() {}
    addEventListener() {}
    appendChild(child) { this.children.push(child); }
}
const nodes = new Map();
const document = { getElementById(id) { if (!nodes.has(id)) nodes.set(id, new Element()); return nodes.get(id); }, createElement(){ return new Element(); } };
const location = { search: '', href: '' };
const context = vm.createContext({console, URLSearchParams, document, window: { location }, sessionStorage: { getItem() { return null; } }});
for (const name of ['axes.js', 'questions.js', 'scoring.js', 'result_compatibility.js', 'result_catalog.js', 'profiles.js', 'result_content.js', 'result_narrative.js','axis_labels.js']) vm.runInContext(source(name), context);
function render(identity, modifier, version=context.LAW_VERSION) {
    nodes.clear();
    const query = new URLSearchParams(Object.fromEntries(context.LAW_AXES.map(axis => [axis.id, 50])));
    query.set('i', identity); query.set('c', 'hart'); query.set('v', version);
    if (modifier) query.set('m', modifier);
    location.search = '?' + query;
    vm.runInContext(source('results.js'), context);
    return nodes.get('result-title');
}
for (const [id, expected] of [['public_meaning_originalist', 'Public-Meaning'], ['original_intent_originalist', 'Original-Intent']]) {
    // Use catalog IDs rather than silently treating a missing fixture as a match.
    assert.ok(context.LAW_RESULT_IDENTITIES.some(identity => identity.id === id), `Missing identity: ${id}`);
    const title = render(id, 'new_originalism');
    assert.match(title.innerHTML, new RegExp(`^<strong><span class="result-title-noun">${expected}</span> New <span class="result-title-noun">Originalist</span>.*</strong>$`));
    assert.equal(nodes.get('champion-line').textContent, 'Champion: H. L. A. Hart');
    assert.ok(nodes.get('champion-description').textContent.length > 0);
}
const regular = render('positivist', 'fit_unmistakable');
assert.match(regular.innerHTML, /^<strong>.*Positivist.*<\/strong>$/);
assert.match(regular.innerHTML, /<span class="result-title-noun">Positivist<\/span>/);
assert.equal(nodes.get('commitment-icons').children.length,0,'Score-only shared links must not fabricate supported commitment logos');
assert.equal(nodes.get('commitment-icons').hidden,true);
const legacy = render('',undefined,'0.8');
assert.match(legacy.textContent, /No jurisprudential classification/);
assert.equal(nodes.get('results-main').hidden, false);
assert.equal(nodes.get('version-note').hidden, true);
console.log('Results layout audit passed: top hierarchy, full-title emphasis, champion preservation, legacy fallback, and responsive scrolling.');
