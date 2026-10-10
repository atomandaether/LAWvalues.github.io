(function runQuiz() {
    'use strict';

    const STORAGE_KEY = `lawvalues-quiz-${globalThis.LAW_VERSION}`;
    const LATEST_KEY = `lawvalues-latest-${globalThis.LAW_VERSION}`;
    const questionById = Object.fromEntries(globalThis.LAW_QUESTIONS.map((question) => [question.id, question]));
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
            if (valid) return stored;
        } catch (_) {
            // Start fresh when storage is unavailable or malformed.
        }
        return freshState();
    }

    let state = loadState();

    function hasResponse(questionId) {
        return Object.prototype.hasOwnProperty.call(state.responses, questionId);
    }

    function saveState() {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (_) {
            // The quiz still works when session storage is unavailable.
        }
    }

    function currentQuestion() {
        return questionById[state.order[state.index]];
    }

    function render() {
        const question = currentQuestion();
        const total = state.order.length;
        const completed = state.index;

        elements.number.textContent = `Question ${state.index + 1} of ${total}`;
        elements.prompt.textContent = question.prompt;
        elements.progress.style.width = `${(completed / total) * 100}%`;
        elements.progress.parentElement.setAttribute('aria-valuenow', String(completed));
        elements.progress.parentElement.setAttribute('aria-valuemax', String(total));
        elements.back.hidden = state.index === 0;
        elements.backOff.hidden = state.index !== 0;

        responseButtons.forEach((button) => {
            const selected = hasResponse(question.id) &&
                state.responses[question.id] !== null &&
                Number(button.dataset.response) === Number(state.responses[question.id]);
            button.classList.toggle('selected', selected);
            button.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });

        const skipped = hasResponse(question.id) && state.responses[question.id] === null;
        elements.skip.classList.toggle('selected', skipped);
        elements.skip.setAttribute('aria-pressed', skipped ? 'true' : 'false');
        saveState();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function answer(value) {
        const question = currentQuestion();
        state.responses[question.id] = value;
        if (state.index === state.order.length - 1) {
            finish();
            return;
        }
        state.index += 1;
        render();
    }

    function goBack() {
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
        const scored = globalThis.LAW_SCORING.scoreAll(state.responses);
        const params = new URLSearchParams({ v: globalThis.LAW_VERSION });
        globalThis.LAW_AXES.forEach((axis) => params.set(axis.id, String(scored[axis.id].score)));
        params.set('n', globalThis.LAW_AXES.map((axis) => scored[axis.id].answered).join(''));

        const record = {
            version: globalThis.LAW_VERSION,
            scores: Object.fromEntries(globalThis.LAW_AXES.map((axis) => [axis.id, scored[axis.id].score])),
            coverage: Object.fromEntries(globalThis.LAW_AXES.map((axis) => [axis.id, scored[axis.id].answered])),
            strength: Object.fromEntries(globalThis.LAW_AXES.map((axis) => [axis.id, scored[axis.id].strength])),
            responses: state.responses,
            order: state.order,
            completedAt: new Date().toISOString()
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

    render();
})();
