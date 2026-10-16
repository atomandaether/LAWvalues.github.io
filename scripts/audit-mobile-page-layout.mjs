import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = name => fs.readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const index = source('index.html');
const instructions = source('instructions.html');
const quiz = source('quiz.html');
const quizJs = source('quiz.js');
const results = source('results.html');
const css = source('v2.css');

assert.match(index, /<body class="home-page">/,
    'Homepage responsive rules must be scoped to an explicit page class');
assert.match(quiz, /<html lang="en" class="quiz-document">/,
    'Only the quiz root may opt into the fixed mobile viewport');
assert.match(css, /html\.quiz-document,\s*body\.quiz-page\s*\{[^}]*overflow:\s*hidden/s,
    'Quiz viewport locking must be explicitly scoped');
assert.doesNotMatch(css, /(?:^|\n)\s*html,\s*\n\s*body\.quiz-page\s*\{/,
    'Bare html must never inherit the quiz overflow lock');

assert.match(css, /body\.home-page div\.center\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\)/s,
    'Mobile homepage overview must use four explicit columns');
assert.match(css, /body\.home-page div\.center > a > img\.quadcolumn\s*\{[^}]*width:\s*100%/s,
    'Homepage icons must fill their assigned grid cell instead of participating in inline wrapping');
assert.equal((index.match(/<div class="center">/g) || []).length, 2);
assert.equal((index.match(/class="axis_name quadcolumn"/g) || []).length, 8);
assert.equal((index.match(/<a href="#[^"]+"><img[^>]+class="quadcolumn"/g) || []).length, 16);

// Protect the real document route from landing page through a completed quiz.
assert.match(index, /location\.href='instructions\.html'/);
assert.match(instructions, /location\.href='quiz\.html'/);
assert.match(quiz, /<script src="quiz\.js"><\/script>/);
assert.match(quizJs, /window\.location\.assign\(`results\.html\?\$\{params\.toString\(\)\}`\)/);
assert.match(results, /<html lang="en" class="results-document">/);
assert.match(results, /id="copy-link"/);
assert.match(results, /id="champion-card"[^>]*aria-expanded="false"/);

console.log('PASS: mobile document scoping, four-column homepage overview, and home-to-results route.');
