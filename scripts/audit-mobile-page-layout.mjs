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

// The lower explanations keep their left / axis / right relationship on mobile.
assert.match(css, /body\.home-page \.explanation_bg \.spacer\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\) clamp\(54px,\s*16vw,\s*110px\) minmax\(0,\s*1fr\)/s,
    'Mobile explanations must retain three explicit columns');
assert.doesNotMatch(css, /\.spacer\s*\{[^}]*display:\s*block/s,
    'Phone rules must not stack the two opposing explanations');
assert.match(css, /body\.home-page \.explanation_bg \.blurb-text\s*\{[^}]*font-size:\s*clamp\(13px,\s*2\.9vw,\s*18px\)/s,
    'Mobile explanation text must shrink while retaining a readable minimum');
assert.match(index, /id="numOfQuestions">100<\/span>/,
    'The homepage advertises 100 questions');
assert.doesNotMatch(index, /LAW_QUESTIONS\.length/,
    'The 88-question core must not overwrite the homepage total');
assert.equal((index.match(/class="spacer"/g) || []).length, 8);
assert.equal((index.match(/class="blurb-text"/g) || []).length, 16);

// Entry prose must not inherit the large, fixed-size quiz question treatment.
assert.match(instructions, /<body class="instructions-page">/);
assert.match(instructions, /<p class="instructions-copy">/);
assert.doesNotMatch(instructions, /class="question"/);
assert.match(css, /\.instructions-page h1\s*\{[^}]*font-size:\s*clamp\(32px,\s*10vw,\s*96px\)/s,
    'The entry heading must fit narrow phones');
assert.match(css, /\.instructions-page \.instructions-copy\s*\{[^}]*font-size:\s*clamp\(18px,\s*2\.5vw,\s*24px\);[^}]*line-height:\s*1\.45/s);
assert.match(css, /\.instructions-page \.button\s*\{[^}]*width:\s*min\(100%,\s*680px\);[^}]*min-width:\s*0/s);
assert.match(css, /@media \(max-width: 900px\) and \(max-height: 420px\)\s*\{\s*html\.quiz-document,\s*body\.quiz-page\s*\{[^}]*height:\s*auto;[^}]*overflow:\s*visible/s,
    'Short landscape screens must allow document scrolling');
assert.match(css, /\.quiz-page \.quiz-question-slot p\.question\s*\{[^}]*height:\s*auto;[^}]*max-height:\s*none;[^}]*overflow:\s*visible/s,
    'The short-landscape prompt must be fully readable');
assert.match(quizJs, /width <= 900 \? 11 : 14;/,
    'Desktop text fitting must accommodate the longest prompt without clipping');
for (const content of [instructions, quiz, css]) {
    assert.doesNotMatch(content, /quiz-guidance|Answer for your own legal approach|Unless a question specifically asks about precedent/,
        'Removed quiz guidance must not return on the entry or question pages');
}

// Protect the real document route from landing page through a completed quiz.
assert.match(index, /location\.href='instructions\.html'/);
assert.match(instructions, /location\.href='quiz\.html'/);
assert.match(quiz, /<script src="quiz\.js"><\/script>/);
assert.match(quizJs, /window\.location\.assign\(`results\.html\?\$\{params\.toString\(\)\}`\)/);
assert.match(results, /<html lang="en" class="results-document">/);
assert.match(results, /id="copy-link"/);
assert.match(results, /id="champion-card"[^>]*aria-expanded="false"/);

console.log('PASS: mobile document scoping, four-column homepage overview, three-column explanations, 100-question copy, and home-to-results route.');
