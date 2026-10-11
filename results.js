(function renderResults() {
    'use strict';

    const LATEST_KEY = `lawvalues-latest-${globalThis.LAW_VERSION}`;
    const axisScoredCounts = globalThis.LAW_AXIS_SCORED_COUNTS;
    const scoredQuestionCount = globalThis.LAW_SCORED_QUESTION_COUNT;
    const params = new URLSearchParams(window.location.search);
    const error = document.getElementById('results-error');
    const main = document.getElementById('results-main');

    const display = [
        { axisId: 'sorc', label: 'source-label', leftId: 'positivist', rightId: 'nonpositivist' },
        { axisId: 'cons', label: 'constraint-label', leftId: 'textualist', rightId: 'openconstruction' },
        { axisId: 'time', label: 'time-label', leftId: 'historical', rightId: 'living' },
        { axisId: 'prec', label: 'precedent-label', leftId: 'stability', rightId: 'overruling' },
        { axisId: 'remed', label: 'remedies-label', leftId: 'narrow', rightId: 'systemic' },
        { axisId: 'post', label: 'posture-label', leftId: 'majoritarian', rightId: 'countermajoritarian' },
        { axisId: 'separ', label: 'separation-label', leftId: 'formalist', rightId: 'functionalist' },
        { axisId: 'form', label: 'form-label', leftId: 'rules', rightId: 'balancing' }
    ];

    function parseScores() {
        const scores = {};
        for (const axis of globalThis.LAW_AXES) {
            const raw = params.get(axis.id);
            const value = Number(raw);
            if (raw === null || !Number.isFinite(value) || value < 0 || value > 100) return null;
            scores[axis.id] = Math.round(value);
        }
        return scores;
    }

    function parseCoverage() {
        const encoded = params.get('n');
        const fullCoverage = Object.fromEntries(
            globalThis.LAW_AXES.map((axis) => [axis.id, axisScoredCounts[axis.id]])
        );
        if (!encoded) return fullCoverage;

        const parts = encoded.split(',');
        if (parts.length !== globalThis.LAW_AXES.length) return fullCoverage;

        return Object.fromEntries(globalThis.LAW_AXES.map((axis, index) => {
            const maximum = axisScoredCounts[axis.id];
            const value = Number(parts[index]);
            return [axis.id, Number.isInteger(value) && value >= 0 && value <= maximum ? value : maximum];
        }));
    }

    const scores = parseScores();
    const coverage = parseCoverage();
    if (!scores) {
        error.hidden = false;
        main.hidden = true;
        return;
    }

    function setBarValue(name, value) {
        const inner = document.getElementById(name);
        const outer = document.getElementById(`bar-${name}`);
        outer.style.display = value === 0 ? 'none' : 'flex';
        outer.style.width = `${value}%`;
        outer.style.flex = `0 0 ${value}%`;
        inner.textContent = `${value}%`;
        inner.style.visibility = value < 11 ? 'hidden' : 'visible';
        outer.setAttribute('aria-label', `${value} percent`);
    }

    display.forEach((entry) => {
        const axis = globalThis.LAW_AXIS_MAP[entry.axisId];
        const left = scores[entry.axisId];
        const right = 100 - left;
        document.getElementById(entry.label).textContent = globalThis.LAW_SCORING.axisLabel(axis, left);
        setBarValue(entry.leftId, left);
        setBarValue(entry.rightId, right);
    });

    const ranked = globalThis.LAW_AXES.map((axis) => {
        const pole = globalThis.LAW_SCORING.dominantPole(axis, scores[axis.id]);
        return { axis, pole, distance: Math.abs(scores[axis.id] - 50) };
    }).sort((a, b) => b.distance - a.distance || a.axis.name.localeCompare(b.axis.name));

    const top = ranked.slice(0, 3).map(({ axis, pole }) => {
        if (pole.direction === 'mixed') return `mixed on ${axis.name.toLowerCase()}`;
        return `${pole.percent}% ${pole.name}`;
    });
    document.getElementById('result-summary').textContent = `Your most distinctive results are ${top.join(', ').replace(/, ([^,]*)$/, ', and $1')}.`;

    const incomplete = globalThis.LAW_AXES.filter((axis) => coverage[axis.id] < axisScoredCounts[axis.id]);
    if (incomplete.length > 0) {
        const answered = globalThis.LAW_AXES.reduce((sum, axis) => sum + coverage[axis.id], 0);
        const note = document.getElementById('coverage-note');
        note.hidden = false;
        note.textContent = `These scores use ${answered} of ${scoredQuestionCount} scored questions because “not sure” responses are excluded. Diagnostic questions are recorded but do not move the headline axis score.`;
    }

    function textSummary() {
        return [
            'LAWvalues',
            ...globalThis.LAW_AXES.map((axis) => `${axis.name}: ${scores[axis.id]}% ${axis.left} / ${100 - scores[axis.id]}% ${axis.right}`),
            window.location.href
        ].join('\n');
    }

    async function copyText(text, button, success) {
        const original = button.textContent;
        try {
            await navigator.clipboard.writeText(text);
        } catch (_) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
        }
        button.textContent = success;
        window.setTimeout(() => { button.textContent = original; }, 1500);
    }

    function loadLocalRecord() {
        try {
            const record = JSON.parse(sessionStorage.getItem(LATEST_KEY));
            const matches = record?.version === globalThis.LAW_VERSION &&
                record.responses &&
                globalThis.LAW_AXES.every((axis) => Number(record.scores?.[axis.id]) === scores[axis.id]);
            return matches ? record : null;
        } catch (_) {
            return null;
        }
    }

    const record = loadLocalRecord();
    const download = document.getElementById('download-record');
    if (record) {
        download.hidden = false;
        download.addEventListener('click', () => {
            const exportRecord = {
                instrument: 'LAWvalues',
                version: globalThis.LAW_VERSION,
                completedAt: record.completedAt,
                scores: record.scores,
                coverage: record.coverage,
                strength: record.strength,
                responses: record.responses
            };
            const blob = new Blob([JSON.stringify(exportRecord, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'lawvalues-results.json';
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        });
    }

    if (Array.isArray(globalThis.LAW_PROFILES) && globalThis.LAW_PROFILES.length > 0) {
        const closest = [...globalThis.LAW_PROFILES]
            .map((profile) => ({ profile, distance: globalThis.LAW_SCORING.profileDistance(scores, profile) }))
            .sort((a, b) => a.distance - b.distance)[0]?.profile;
        if (closest) document.getElementById('classification-label').textContent = closest.name;
    }

    document.getElementById('copy-link').addEventListener('click', (event) => copyText(window.location.href, event.currentTarget, 'Copied'));
    document.getElementById('copy-summary').addEventListener('click', (event) => copyText(textSummary(), event.currentTarget, 'Copied'));

    error.hidden = true;
    main.hidden = false;
})();
