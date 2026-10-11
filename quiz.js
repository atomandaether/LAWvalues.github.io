(function runQuiz() {
    'use strict';

    const STORAGE_KEY = `lawvalues-quiz-${globalThis.LAW_VERSION}`;
    const LATEST_KEY = `lawvalues-latest-${globalThis.LAW_VERSION}`;
    const CORE_TOTAL = globalThis.LAW_QUESTIONS.length;
    const MAX_DIAGNOSTICS = globalThis.LAW_CLASSIFIER?.MAX_DIAGNOSTICS ?? 7;
    const DISPLAY_MAX = CORE_TOTAL + MAX_DIAGNOSTICS;
    const questionById = Object.fromEntries(globalThis.LAW_QUESTIONS.map((question) => [question.id, question]));
    const diagnosticById = Object.fromEntries(
        (globalThis.LAW_CLASSIFIER?.diagnosticBank?.() || []).map((question) => [question.id, question])
    );
    const responseButtons = Array.from(document.querySelectorAll('[data-response]'));
    const keyboardValues = [3, 2, 1, 0, -1, -2, -3];

    const elements = {
        number: document.getElementById('question-number'),
        prompt: document.getElementById('question-text'),
        progress: document.getElementById('quiz-progress'),
        back: document.getElementById('back_button'),
        backOff: document.getElementById('back_button_off'),
        skip: document.getElementById('skip_button'),
        restart: document.getElementById('restart_button')
    };

    function shuffle(items) {
        const copy = [...items];
        for (let i = copy.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function buildOrder() {
        const buckets = Object.fromEntries(globalThis.LAW_AXES.map((axis) => [
            axis.id,
            shuffle(globalThis.LAW_QUESTIONS.filter((question) => question.axis === axis.id))
        ]));
        const rounds = Math.max(...Object.values(buckets).map((bucket) => bucket.length));
        const order = [];

        for (let round = 0; round < rounds; round += 1) {
            shuffle(globalThis.LAW_AXES.map((axis) => axis.id)).forEach((axisId) => {
                if (buckets[axisId][round]) order.push(buckets[axisId][round].id);
            });
        }
        return order;
    }

    function freshState() {
        return {
            version: globalThis.LAW_VERSION,
            order: buildOrder(),
            index: 0,
            responses: {},
            phase: 'core',
            diagnosticOrder: [],
            diagnosticIndex: 0,
            diagnosticResponses: {},
            startedAt: new Date().toISOString()
        };
    }

    function loadState() {
        try {
            const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
            const validIds = new Set(globalThis.LAW_QUESTIONS.map((question) => question.id));
            const valid = stored?.version === globalThis.LAW_VERSION &&
                Array.isArray(stored.order) &&
                stored.order.length === globalThis.LAW_QUESTIONS.length &&
                stored.order.every((id) => validIds.has(id)) &&
                Number.isInteger(stored.index) &&
                stored.index >= 0 &&
                stored.index < stored.order.length &&
                stored.responses && typeof stored.responses === 'object';
            if (valid) {
                stored.phase = stored.phase === 'diagnostic' ? 'diagnostic' : 'core';
                stored.diagnosticOrder = Array.isArray(stored.diagnosticOrder)
                    ? stored.diagnosticOrder.filter((id) => diagnosticById[id])
                    : [];
                stored.diagnosticResponses = stored.diagnosticResponses && typeof stored.diagnosticResponses === 'object'
                    ? stored.diagnosticResponses
                    : {};
                stored.diagnosticIndex = Number.isInteger(stored.diagnosticIndex)
                    ? Math.max(0, Math.min(stored.diagnosticIndex, Math.max(0, stored.diagnosticOrder.length - 1)))
                    : 0;
                if (stored.phase === 'diagnostic' && stored.diagnosticOrder.length === 0) stored.phase = 'core';
                return stored;
            }
        } catch (_) {
            // Start fresh when storage is unavailable or malformed.
        }
        return freshState();
    }

    let state = loadState();

    function currentQuestion() {
        if (state.phase === 'diagnostic') {
            return diagnosticById[state.diagnosticOrder[state.diagnosticIndex]];
        }
        return questionById[state.order[state.index]];
    }

    function activeResponses() {
        return state.phase === 'diagnostic' ? state.diagnosticResponses : state.responses;
    }

    function hasResponse(questionId) {
        return Object.prototype.hasOwnProperty.call(activeResponses(), questionId);
    }

    function saveState() {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (_) {
            // The quiz still works when session storage is unavailable or malformed.
        }
    }

    function fitQuestionText() {
        const prompt = elements.prompt;
        if (!prompt) return;

        const width = window.innerWidth;
        let size = width <= 540 ? 18 : width <= 900 ? 22 : 36;
        const minimum = width <= 540 ? 9.5 : width <= 900 ? 11 : 16;
        prompt.style.fontSize = `${size}pt`;

        // The question panel itself never scrolls. Shrink only as much as needed
        // to keep the complete prompt visible inside the stable viewport.
        while (
            size > minimum &&
            (prompt.scrollHeight > prompt.clientHeight + 1 || prompt.scrollWidth > prompt.clientWidth + 1)
        ) {
            size -= 0.5;
            prompt.style.fontSize = `${size}pt`;
        }
    }

    function render() {
        const question = currentQuestion();
        if (!question) {
            finish();
            return;
        }

        const diagnosticNumber = state.phase === 'diagnostic' ? state.diagnosticIndex + 1 : 0;
        const completed = state.phase === 'diagnostic' ? CORE_TOTAL + state.diagnosticIndex : state.index;

        elements.number.textContent = state.phase === 'diagnostic'
            ? `Question ${CORE_TOTAL + diagnosticNumber} · result refinement`
            : `Question ${state.index + 1} of ${CORE_TOTAL}`;
        elements.prompt.textContent = question.prompt;
        fitQuestionText();
        elements.progress.style.width = `${Math.min(100, (completed / DISPLAY_MAX) * 100)}%`;
        elements.progress.parentElement.setAttribute('aria-valuenow', String(completed));
        elements.progress.parentElement.setAttribute('aria-valuemax', String(DISPLAY_MAX));

        const atAbsoluteStart = state.phase === 'core' && state.index === 0;
        elements.back.hidden = atAbsoluteStart;
        elements.backOff.hidden = !atAbsoluteStart;

        const responses = activeResponses();
        responseButtons.forEach((button) => {
            const selected = Object.prototype.hasOwnProperty.call(responses, question.id) &&
                responses[question.id] !== null &&
                Number(button.dataset.response) === Number(responses[question.id]);
            button.classList.toggle('selected', selected);
            button.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });

        const skipped = Object.prototype.hasOwnProperty.call(responses, question.id) && responses[question.id] === null;
        elements.skip.classList.toggle('selected', skipped);
        elements.skip.setAttribute('aria-pressed', skipped ? 'true' : 'false');
        saveState();
    }

    function coreScores() {
        return globalThis.LAW_SCORING.scoreAll(state.responses);
    }

    function beginOrContinueDiagnostics() {
        const next = globalThis.LAW_CLASSIFIER.nextDiagnostic(
            coreScores(),
            state.responses,
            state.diagnosticResponses
        );
        if (!next) {
            finish();
            return;
        }

        state.phase = 'diagnostic';
        state.diagnosticOrder.push(next.id);
        state.diagnosticIndex = state.diagnosticOrder.length - 1;
        render();
    }

    function answerCore(value) {
        const question = currentQuestion();
        state.responses[question.id] = value;
        if (state.index === state.order.length - 1) {
            // A changed final core answer can change the entire adaptive path.
            state.diagnosticOrder = [];
            state.diagnosticResponses = {};
            state.diagnosticIndex = 0;
            beginOrContinueDiagnostics();
            return;
        }
        state.index += 1;
        render();
    }

    function answerDiagnostic(value) {
        const question = currentQuestion();

        // Revising an earlier diagnostic invalidates every later branch.
        if (state.diagnosticIndex < state.diagnosticOrder.length - 1) {
            const removed = state.diagnosticOrder.slice(state.diagnosticIndex + 1);
            for (const id of removed) delete state.diagnosticResponses[id];
            state.diagnosticOrder = state.diagnosticOrder.slice(0, state.diagnosticIndex + 1);
        }

        state.diagnosticResponses[question.id] = value;
        beginOrContinueDiagnostics();
    }

    function answer(value) {
        if (state.phase === 'diagnostic') answerDiagnostic(value);
        else answerCore(value);
    }

    function goBack() {
        if (state.phase === 'diagnostic') {
            if (state.diagnosticIndex > 0) {
                state.diagnosticIndex -= 1;
                render();
                return;
            }
            state.phase = 'core';
            state.index = state.order.length - 1;
            render();
            return;
        }
        if (state.index === 0) return;
        state.index -= 1;
        render();
    }

    function restart() {
        if (!window.confirm('Restart the quiz and erase the answers saved in this tab?')) return;
        state = freshState();
        render();
    }

    function finish() {
        const scored = coreScores();
        const completedAt = new Date().toISOString();
        const startedMs = Date.parse(state.startedAt);
        const completedMs = Date.parse(completedAt);
        const classification = globalThis.LAW_CLASSIFIER.classify(
            scored,
            state.responses,
            state.diagnosticResponses,
            {
                startedAt: state.startedAt,
                completedAt,
                elapsedMs: Number.isFinite(startedMs) && Number.isFinite(completedMs)
                    ? completedMs - startedMs
                    : null
            }
        );
        const params = new URLSearchParams({ v: globalThis.LAW_VERSION });
        globalThis.LAW_AXES.forEach((axis) => params.set(axis.id, String(scored[axis.id].score)));
        params.set('n', globalThis.LAW_AXES.map((axis) => scored[axis.id].answered).join(','));
        params.set('i', classification.identity.id);
        if (classification.champions.length > 0) {
            params.set('c', classification.champions.map((item) => item.id).join(','));
        }
        if (classification.resultTitle?.modifier?.id) params.set('m', classification.resultTitle.modifier.id);
        if (classification.resultTitle?.phrase?.id) params.set('p', classification.resultTitle.phrase.id);
        if (classification.resultTitle?.bridge?.id) params.set('b', classification.resultTitle.bridge.id);
        params.set('d', String(classification.diagnosticCount));

        const record = {
            version: globalThis.LAW_VERSION,
            startedAt: state.startedAt,
            scores: Object.fromEntries(globalThis.LAW_AXES.map((axis) => [axis.id, scored[axis.id].score])),
            coverage: Object.fromEntries(globalThis.LAW_AXES.map((axis) => [axis.id, scored[axis.id].answered])),
            strength: Object.fromEntries(globalThis.LAW_AXES.map((axis) => [axis.id, scored[axis.id].strength])),
            conflict: Object.fromEntries(globalThis.LAW_AXES.map((axis) => [axis.id, scored[axis.id].conflict])),
            poleSupport: Object.fromEntries(globalThis.LAW_AXES.map((axis) => [
                axis.id,
                {
                    left: scored[axis.id].leftSupport,
                    right: scored[axis.id].rightSupport
                }
            ])),
            responses: state.responses,
            diagnosticResponses: state.diagnosticResponses,
            diagnosticOrder: state.diagnosticOrder,
            classification,
            order: state.order,
            completedAt
        };

        try {
            sessionStorage.setItem(LATEST_KEY, JSON.stringify(record));
        } catch (_) {
            // The score URL remains shareable without storage.
        }
        window.location.assign(`results.html?${params.toString()}`);
    }

    responseButtons.forEach((button) => {
        button.addEventListener('click', () => answer(Number(button.dataset.response)));
    });
    elements.skip.addEventListener('click', () => answer(null));
    elements.back.addEventListener('click', goBack);
    elements.restart.addEventListener('click', restart);

    document.addEventListener('keydown', (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        const number = Number(event.key);
        if (number >= 1 && number <= 7) answer(keyboardValues[number - 1]);
        if (event.key === 'ArrowLeft') goBack();
    });

    window.addEventListener('resize', () => window.requestAnimationFrame(fitQuestionText));

    render();
    window.requestAnimationFrame(fitQuestionText);
})();
