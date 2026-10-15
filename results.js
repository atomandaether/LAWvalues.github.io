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
            const storedParams = new URLSearchParams(record?.resultQuery || '');
            const hasMatchingQuery = Boolean(record?.resultQuery) &&
                [...storedParams.entries()].every(([key, value]) => params.get(key) === value) &&
                ['v','i','c','m','p','b','x','o','d','u','cf','ua'].every(key => params.get(key) === storedParams.get(key));
            const matches = hasMatchingQuery && record?.version === globalThis.LAW_VERSION &&
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
            .map((id) => Object.hasOwn(profileMap, id) ? profileMap[id] : null)
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
            identityPriority: { unresolved: params.get('u') === '1' },
            champions,
            championConfidence: ['low', 'medium', 'high'].includes(params.get('cf'))
                ? params.get('cf') : champions.length === 1 ? 'shared' : champions.length > 1 ? 'ambiguous' : 'low',
            sharedUnknownAxes: [...new Set((params.get('ua') || '').split(','))]
                .filter(id => globalThis.LAW_AXES.some(axis => axis.id === id)),
            diagnosticCount: Number(params.get('d')) || 0,
            resultTitle,
            narrativeId: params.get('x') || null,
            narrativeOpeningId: params.get('o') || null,
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
        const opening = document.getElementById('result-opening');
        const context = document.getElementById('result-context');
        const championLine = document.getElementById('champion-line');
        const championDescription = document.getElementById('champion-description');
        const relatedLine = document.getElementById('related-line');
        const note = document.getElementById('classification-note');

        if (!result?.identity) {
            title.textContent = 'No jurisprudential classification is stored with this result.';
            opening.textContent = '';
            context.textContent = '';
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
        const narrative = result.narrative || (
            globalThis.LAW_RESULT_NARRATIVE?.build
                ? globalThis.LAW_RESULT_NARRATIVE.build(result, scores, result.narrativeId || params.get('x'), result.narrativeOpeningId || params.get('o'))
                : null
        );

        title.textContent = assembled?.title || result.identity.label;
        // Keep the complete saved title, emphasizing only its identity noun.
        // Escape all content: shared-link and saved-record data are plain text.
        const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (character) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[character]);
        const parts = !assembled?.special && globalThis.LAW_RESULT_CONTENT?.titleParts
            ? globalThis.LAW_RESULT_CONTENT.titleParts(result.identity, assembled?.modifier, assembled?.phrase)
            : null;
        if (parts && parts.map((part) => part.text).join(' ') === title.textContent) {
            title.innerHTML = parts.map((part) => part.role === 'noun'
                ? '<strong>' + escapeHtml(part.text) + '</strong>'
                : escapeHtml(part.text)).join(' ');
        } else {
            const noun = assembled?.noun || result.identity.label;
            const nounIndex = title.textContent.indexOf(noun);
            if (noun && nounIndex >= 0) {
                const fullTitle = title.textContent;
                title.innerHTML = escapeHtml(fullTitle.slice(0, nounIndex)) +
                    '<strong>' + escapeHtml(noun) + '</strong>' +
                    escapeHtml(fullTitle.slice(nounIndex + noun.length));
            }
        }
        opening.textContent = narrative?.opening || '';
        context.textContent = narrative?.context || '';

        if (['unusable_response','incoherent_response','outcome_driven_left','outcome_driven_right'].includes(result.identity.id)) {
            championLine.textContent = 'Thinker match withheld.';
            championDescription.textContent = ['outcome_driven_left','outcome_driven_right'].includes(result.identity.id)
                ? 'Several paired cases suggest that preferred political outcomes repeatedly displaced the same judicial principle. The eight axis scores remain visible, but a named jurist match would be misleading.'
                : result.identity.id === 'incoherent_response'
                    ? 'Your eight axis scores are still shown above, but direct contradictions across different jurisprudential domains make a personal match misleading.'
                    : 'Your eight axis scores are still shown above, but the response pattern did not clear the result-refinement quality checks.';
            relatedLine.textContent = '';
            note.textContent = ['outcome_driven_left','outcome_driven_right'].includes(result.identity.id)
                ? 'This exceptional result requires multiple same-direction changes across politically mirrored legal cases. An isolated difference does not qualify.'
                : 'This safeguard prevents rapid or inattentive clicking from being mistaken for a genuine low-theory or centrist jurisprudential profile.';
            return;
        }

        const resultVersion = Number.parseFloat(params.get('v') || record?.version || '');
        const coreOnlyAxes = Number.isFinite(resultVersion) && resultVersion >= 0.8;
        const champions = Array.isArray(result.champions) ? result.champions : [];
        if (champions.length === 1) {
            championLine.textContent = `Champion: ${champions[0].name}`;
            championDescription.textContent = champions[0].description || '';
            const thinkerProfile = (globalThis.LAW_PROFILES || []).find(item => item.id === champions[0].id);
            const specificAffinity = champions[0].evidence?.scope === 'specific-affinity' ||
                (thinkerProfile && Object.keys(thinkerProfile.axisSignature || {}).length === 0);
            if (coreOnlyAxes && specificAffinity) {
                championDescription.textContent += ' This is a specific theoretical affinity; the available thinker profile does not establish a broad match across your other commitments.';
            }
        } else if (champions.length > 1) {
            championLine.textContent = `Champions: ${champions.map((item) => item.name).join(' · ')}`;
            championDescription.textContent =
                'The measured evidence does not justify forcing one of these nearby jurisprudential personalities over the other.';
        } else {
            championLine.textContent = 'No single thinker is a clean enough fit to force.';
            championDescription.textContent = '';
        }

        const related = [...new Set(champions.flatMap((item) => item.related || []))].slice(0, 6);
        relatedLine.textContent = related.length ? `Related reading: ${related.join(' · ')}` : '';

        const diagnosticCount = Number(result.diagnosticCount) || 0;
        const axisExplanation = coreOnlyAxes
            ? 'The eight axis scores come only from the core questions. Adaptive answers refine the jurisprudential match without changing axis scores.'
            : 'These saved axis scores use the earlier scoring version; answered Separation diagnostics could modestly refine Separation.';
        note.textContent = diagnosticCount > 0
            ? `The thinker match uses the eight-axis profile plus ${diagnosticCount} adaptive tie-breaker question${diagnosticCount === 1 ? '' : 's'}. ${axisExplanation} Thinker locations are theory-derived prototypes pending empirical calibration.`
            : 'The thinker match uses theory-derived profiles. Unmodeled commitments are unknown, not evidence of agreement. The eight axis scores come from the core questions. Thinker matches remain provisional pending empirical calibration.';
        if (coreOnlyAxes && champions.length === 1) {
            const matchConfidence = result.championConfidence;
            const unknown = champions[0].evidence?.unknownAxes || result.sharedUnknownAxes || [];
            const axisNames = {sorc:'legal authority',cons:'interpretation',time:'constitutional change',prec:'precedent',remed:'remedies',post:'judicial role',separ:'institutional structure',form:'rules and standards'};
            const unknownNames = unknown.filter(id => Object.hasOwn(axisNames,id)).map(id => axisNames[id]);
            if (['low','medium','high'].includes(matchConfidence)) {
                note.textContent += ` Match confidence: ${matchConfidence} (a model assessment, not a probability).`;
            }
            if (unknownNames.length) {
                note.textContent += ` The thinker profile leaves these important commitments unmodeled: ${unknownNames.join(', ')}.`;
            }
        }
        if (coreOnlyAxes && result.identityPriority?.unresolved) {
            note.textContent = 'Your leading commitments remain close; the headline is provisional. ' + note.textContent;
        }
    }

    displayClassification(classification);

    const networkContainer = document.getElementById('champion-network');
    const networkSelection = document.getElementById('champion-network-selection');
    if (networkContainer && globalThis.LAW_CHAMPION_NETWORK?.render) {
        const championId = classification?.champions?.length === 1
            ? classification.champions[0].id
            : null;
        globalThis.LAW_CHAMPION_NETWORK.render({
            container: networkContainer,
            selectionElement: networkSelection,
            championId
        });
    }


    function textSummary() {
        const summaryNarrative = classification?.narrative || (
            classification?.identity && globalThis.LAW_RESULT_NARRATIVE?.build
                ? globalThis.LAW_RESULT_NARRATIVE.build(classification, scores, classification.narrativeId || params.get('x'), classification.narrativeOpeningId || params.get('o'))
                : null
        );
        const classificationLines = classification?.identity
            ? [
                `Jurisprudential fit: ${classification.resultTitle?.title || classification.identity.label}`,
                summaryNarrative?.opening || null,
                summaryNarrative?.context || null,
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

