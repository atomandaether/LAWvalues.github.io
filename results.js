(function renderResults() {
    'use strict';

    const LATEST_KEY = `lawvalues-latest-${globalThis.LAW_VERSION}`;
    const axisContributingCounts = Object.fromEntries(
        globalThis.LAW_AXES.map((axis) => [
            axis.id,
            globalThis.LAW_QUESTIONS.filter(
                (item) => globalThis.LAW_SCORING.contributesToAxis(item, axis.id)
            ).length
        ])
    );
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
            globalThis.LAW_AXES.map((axis) => [axis.id, axisContributingCounts[axis.id]])
        );
        if (!encoded) return fullCoverage;

        const parts = encoded.split(',');
        if (parts.length !== globalThis.LAW_AXES.length) return fullCoverage;

        return Object.fromEntries(globalThis.LAW_AXES.map((axis, index) => {
            const maximum = axisContributingCounts[axis.id];
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
    document.getElementById('result-summary').textContent =
        `Your most distinctive results are ${top.join(', ').replace(/, ([^,]*)$/, ', and $1')}.`;

    const incomplete = globalThis.LAW_AXES.filter(
        (axis) => coverage[axis.id] < axisContributingCounts[axis.id]
    );
    if (incomplete.length > 0) {
        const note = document.getElementById('coverage-note');
        note.hidden = false;
        note.textContent = '“Not sure” responses are excluded from any axis they would have informed. Some questions contribute to more than one axis.';
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

    function classificationFromUrl() {
        const identityId = params.get('i');
        if (!identityId) return null;

        const catalogIdentity = (globalThis.LAW_RESULT_IDENTITIES || []).find((item) => item.id === identityId);
        const identity = catalogIdentity
            ? { id: catalogIdentity.id, label: catalogIdentity.label, family: catalogIdentity.family, status: catalogIdentity.status }
            : identityId === 'nonpositivist'
                ? { id: 'nonpositivist', label: 'Non-positivist', family: 'source', status: 'fallback' }
                : null;
        if (!identity) return null;

        const profileMap = Object.fromEntries((globalThis.LAW_PROFILES || []).map((profile) => [profile.id, profile]));
        const champions = (params.get('c') || '')
            .split(',')
            .filter(Boolean)
            .map((id) => profileMap[id])
            .filter(Boolean)
            .map((profile) => ({
                id: profile.id,
                name: profile.name,
                tier: profile.tier,
                description: profile.description,
                related: profile.related || []
            }));

        const resultTitle = globalThis.LAW_RESULT_CONTENT?.fromIds
            ? globalThis.LAW_RESULT_CONTENT.fromIds(identity, scores, {}, {
                modifierId: params.get('m'),
                phraseId: params.get('p'),
                bridgeId: params.get('b')
            })
            : null;

        return {
            identity,
            identityReason: '',
            champions,
            championConfidence: champions.length === 1 ? 'shared' : champions.length > 1 ? 'ambiguous' : 'low',
            diagnosticCount: Number(params.get('d')) || 0,
            resultTitle,
            calibration: 'theory-derived'
        };
    }

    function getClassification() {
        if (record?.classification) return record.classification;
        if (record && globalThis.LAW_CLASSIFIER) {
            const startedMs = Date.parse(record.startedAt || '');
            const coreCompletedMs = Date.parse(record.coreCompletedAt || '');
            const completedMs = Date.parse(record.completedAt || '');
            return globalThis.LAW_CLASSIFIER.classify(
                record.scores,
                record.responses,
                record.diagnosticResponses || {},
                {
                    startedAt: record.startedAt || null,
                    coreCompletedAt: record.coreCompletedAt || null,
                    completedAt: record.completedAt || null,
                    coreElapsedMs: Number.isFinite(startedMs) && Number.isFinite(coreCompletedMs)
                        ? coreCompletedMs - startedMs
                        : null,
                    elapsedMs: Number.isFinite(startedMs) && Number.isFinite(completedMs)
                        ? completedMs - startedMs
                        : null
                }
            );
        }
        return classificationFromUrl();
    }

    const classification = getClassification();

    function displayClassification(result) {
        const title = document.getElementById('result-title');
        const label = document.getElementById('classification-label');
        const reason = document.getElementById('classification-reason');
        const anchorExplanation = document.getElementById('anchor-explanation');
        const modifierExplanation = document.getElementById('modifier-explanation');
        const phraseExplanation = document.getElementById('phrase-explanation');
        const bridge = document.getElementById('result-bridge');
        const championLine = document.getElementById('champion-line');
        const championDescription = document.getElementById('champion-description');
        const relatedLine = document.getElementById('related-line');
        const note = document.getElementById('classification-note');

        if (!result?.identity) {
            title.textContent = 'No jurisprudential classification is stored with this result.';
            label.textContent = '';
            reason.textContent = '';
            anchorExplanation.textContent = '';
            modifierExplanation.textContent = '';
            phraseExplanation.textContent = '';
            bridge.textContent = '';
            championLine.textContent = '';
            championDescription.textContent = '';
            relatedLine.textContent = '';
            note.textContent = 'The eight axis scores above remain complete. Older shared result links may not contain the newer personality classification.';
            return;
        }

        const assembled = result.resultTitle || (
            globalThis.LAW_RESULT_CONTENT?.assemble
                ? globalThis.LAW_RESULT_CONTENT.assemble(result, scores, result.traits || {})
                : null
        );
        title.textContent = assembled?.title || result.identity.label;
        label.textContent = assembled?.special ? '' : `Core identity: ${result.identity.label}`;
        reason.textContent = result.identityReason ? result.identityReason : '';
        anchorExplanation.textContent = assembled?.nounExplanation || '';
        modifierExplanation.textContent = assembled?.modifier?.explanation || '';
        phraseExplanation.textContent = assembled?.phrase?.explanation || '';
        bridge.textContent = assembled?.bridge?.text || '';

        if (result.identity.id === 'unusable_response' || result.identity.id === 'incoherent_response') {
            championLine.textContent = 'Thinker match withheld.';
            championDescription.textContent = result.identity.id === 'incoherent_response'
                ? 'Your eight axis scores are still shown above, but direct contradictions across different jurisprudential domains make a personal match misleading.'
                : 'Your eight axis scores are still shown above, but the response pattern did not clear the result-refinement quality checks.';
            relatedLine.textContent = '';
            note.textContent = 'This safeguard prevents rapid or inattentive clicking from being mistaken for a genuine low-theory or centrist jurisprudential profile.';
            return;
        }

        const champions = Array.isArray(result.champions) ? result.champions : [];
        if (champions.length === 1) {
            championLine.textContent = `Closest thinker: ${champions[0].name}`;
            championDescription.textContent = champions[0].description || '';
        } else if (champions.length > 1) {
            championLine.textContent = `Closest thinkers: ${champions.map((item) => item.name).join(' · ')}`;
            championDescription.textContent =
                'The measured evidence does not justify forcing one of these nearby jurisprudential personalities over the other.';
        } else {
            championLine.textContent = 'No single thinker is a clean enough fit to force.';
            championDescription.textContent = '';
        }

        const related = [...new Set(champions.flatMap((item) => item.related || []))].slice(0, 6);
        relatedLine.textContent = related.length ? `Related reading: ${related.join(' · ')}` : '';

        const diagnosticCount = Number(result.diagnosticCount) || 0;
        note.textContent = diagnosticCount > 0
            ? `The thinker match uses the eight-axis profile plus ${diagnosticCount} adaptive tie-breaker question${diagnosticCount === 1 ? '' : 's'}. The eight axis scores themselves come only from the 93-question core. Thinker locations are theory-derived prototypes pending empirical calibration.`
            : 'The thinker match uses sparse theory-derived signatures: unmodeled axes are ignored rather than treated as moderate. The eight axis scores themselves come from the 93-question core. Thinker locations remain provisional pending empirical calibration.';
    }

    displayClassification(classification);

    // The historical-method comparison is a limited partisanship probe, not
    // a political-label inference. It never changes an axis or thinker match.
    const historicalMethodNote = document.getElementById('historical-method-note');
    const sharedConsistency = (() => {
        const value = params.get('hc');
        const match = /^(\d+),(\d+)$/.exec(value || '');
        if (!match) return null;
        const comparisons = Number(match[1]), disagreements = Number(match[2]);
        return comparisons >= 1 && comparisons <= 2 && disagreements <= comparisons
            ? { comparisons, disagreements } : null;
    })();
    const historicalMethod = classification?.historicalMethod || sharedConsistency;
    if (historicalMethod?.comparisons > 0 &&
        classification?.identity?.id !== 'unusable_response' &&
        classification?.identity?.id !== 'incoherent_response') {
        historicalMethodNote.hidden = false;
        historicalMethodNote.textContent = historicalMethod.disagreements > 0
            ? `Historical-method consistency: your Reconstruction-era answer differs from ${historicalMethod.disagreements} of ${historicalMethod.comparisons} comparable historical-meaning answers. This can indicate outcome-sensitive reasoning, but it does not establish partisanship.`
            : `Historical-method consistency: your Reconstruction-era answer agrees with ${historicalMethod.comparisons} comparable historical-meaning answer${historicalMethod.comparisons === 1 ? '' : 's'}. This limited comparison is not a measure of political affiliation.`;
    }


    function textSummary() {
        const classificationLines = classification?.identity
            ? [
                `Jurisprudential fit: ${classification.resultTitle?.title || classification.identity.label}`,
                classification.champions?.length
                    ? `Closest thinker${classification.champions.length === 1 ? '' : 's'}: ${classification.champions.map((item) => item.name).join(', ')}`
                    : null
            ].filter(Boolean)
            : [];
        return [
            'LAWvalues',
            ...classificationLines,
            ...globalThis.LAW_AXES.map((axis) =>
                `${axis.name}: ${scores[axis.id]}% ${axis.left} / ${100 - scores[axis.id]}% ${axis.right}`
            ),
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

    const download = document.getElementById('download-record');
    if (record) {
        download.hidden = false;
        download.addEventListener('click', () => {
            const exportRecord = {
                instrument: 'LAWvalues',
                version: globalThis.LAW_VERSION,
                startedAt: record.startedAt || null,
                coreCompletedAt: record.coreCompletedAt || null,
                completedAt: record.completedAt,
                scores: record.scores,
                coverage: record.coverage,
                strength: record.strength,
                conflict: record.conflict,
                poleSupport: record.poleSupport,
                responses: record.responses,
                diagnosticResponses: record.diagnosticResponses || {},
                diagnosticOrder: record.diagnosticOrder || [],
                classification
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

    document.getElementById('copy-link').addEventListener('click', (event) =>
        copyText(window.location.href, event.currentTarget, 'Copied')
    );
    document.getElementById('copy-summary').addEventListener('click', (event) =>
        copyText(textSummary(), event.currentTarget, 'Copied')
    );

    error.hidden = true;
    main.hidden = false;
})();
