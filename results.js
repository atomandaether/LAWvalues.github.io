(function renderResults() {
    'use strict';

    const compatibility = globalThis.LAW_RESULT_COMPAT;
    const params = new URLSearchParams(window.location.search);
    const version = compatibility.versionFromParams(params);
    const resultAxes = compatibility.axesForVersion(version.version);
    const resultAxisMap = Object.fromEntries(resultAxes.map(axis => [axis.id, axis]));
    const questions = version.kind === 'current' ? globalThis.LAW_QUESTIONS :
        (globalThis.LAW_LEGACY_QUESTIONS || []);
    const axisContributingCounts = Object.fromEntries(
        resultAxes.map((axis) => [axis.id, questions.filter(
            item => globalThis.LAW_SCORING.contributesToAxis(item, axis.id)
        ).length])
    );
    const error = document.getElementById('results-error');
    const main = document.getElementById('results-main');

    const display = [
        { axisId: 'sorc', label: 'source-label', leftId: 'positivist', rightId: 'nonpositivist', leftImage: 'positivist.svg', rightImage: 'non-positivist.svg' },
        { axisId: 'cons', label: 'constraint-label', leftId: 'textualist', rightId: 'openconstruction', leftImage: 'textualist.svg', rightImage: 'open-construction.svg' },
        { axisId: 'time', label: 'time-label', leftId: 'historical', rightId: 'living', leftImage: 'historical.svg', rightImage: 'living.svg' },
        { axisId: 'prec', label: 'precedent-label', leftId: 'stability', rightId: 'overruling', leftImage: 'stability.svg', rightImage: 'overruling.svg' },
        { axisId: 'remed', label: 'remedies-label', leftId: 'narrow', rightId: 'systemic', leftImage: 'narrow.svg', rightImage: 'systemic.svg' },
        { axisId: 'post', label: 'posture-label', leftId: 'majoritarian', rightId: 'countermajoritarian', leftImage: 'majoritarian.svg', rightImage: 'counter-majoritarian.svg' },
        { axisId: 'separ', label: 'separation-label', leftId: 'formalist', rightId: 'functionalist', leftImage: 'formalist.svg', rightImage: 'functionalist.svg' },
        { axisId: 'form', label: 'form-label', leftId: 'rules', rightId: 'balancing', leftImage: 'rules.svg', rightImage: 'balancing.svg' }
    ];

    function parseCoverage() {
        const encoded = params.getAll('n').length === 1 ? params.get('n') : null;
        const parts = encoded ? encoded.split(',') : [];
        return Object.fromEntries(resultAxes.map((axis, index) => {
            const raw = parts[index];
            const value = Number(raw);
            const valid = parts.length === resultAxes.length && /^\d+$/.test(raw || '') &&
                Number.isInteger(value) && value >= 0 && value <= axisContributingCounts[axis.id];
            return [axis.id, valid ? value : null];
        }));
    }

    const scores = compatibility.parseScores(params);
    const coverage = parseCoverage();
    if (!scores) {
        error.hidden = false;
        main.hidden = true;
        return;
    }
    let record = null;
    try {
        record = compatibility.loadLocalRecord({ storage: sessionStorage, params, scores });
    } catch (_) {
        // Some browsers deny access to the sessionStorage property itself.
    }
    const axisDescriptions = compatibility.descriptionsForResult({ scores, params, record });
    const coreProvenance = compatibility.coreScoresForResult({ params, record });
    const versionNotice = compatibility.noticeForVersion(version);
    const versionNote = document.getElementById('version-note');
    versionNote.textContent = versionNotice || `Questionnaire version ${version.version}.`;
    versionNote.hidden = true;

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

    function showScoreEvidence(entry) {
        const details = document.getElementById(`${entry.label}-evidence`);
        if (!details) return;
        details.hidden = true;
        if (!coreProvenance) return;
        const core = coreProvenance.scores[entry.axisId];
        const final = scores[entry.axisId];
        const ledger = coreProvenance.source === 'record' && Array.isArray(record?.scoringDetails?.[entry.axisId]?.contributions)
            ? record.scoringDetails[entry.axisId].contributions.filter(row => row.adjustment &&
                Number.isFinite(row.coreContribution) && Number.isFinite(row.contribution))
            : [];
        if (core === final && !ledger.length) return;
        // Retain provenance for export, without explanatory UI on the results page.
        details.hidden = true;
        const lines = [`Core estimate ${core}%, final ${final}%.`];
        if (!ledger.length) {
            lines.push(coreProvenance.source === 'share'
                ? 'This shared link does not include the answer-level ledger.'
                : 'This saved record does not include the answer-level ledger.');
        } else {
            const evidenceValue = value => `${value > 0 ? '+' : ''}${Number(value.toFixed(4))}`;
            for (const row of ledger) {
                const question = globalThis.LAW_QUESTIONS.find(item => item.id === row.id);
                const diagnostic = (globalThis.LAW_DIAGNOSTIC_QUESTIONS || []).find(item => item.id === row.adjustment.diagnosticId);
                lines.push(`${row.id}${question ? ': ' + question.prompt : ''}`);
                lines.push(`Weighted evidence ${evidenceValue(row.coreContribution)} → ${evidenceValue(row.contribution)}. ${row.adjustment.reason || ''}`);
                if (diagnostic) lines.push(`${diagnostic.id}: ${diagnostic.prompt}`);
            }
            lines.push('Only the identified weak contributions are clarified. The direct core answers remain intact.');
        }
        document.getElementById(`${entry.label}-evidence-text`).textContent = lines.join('\n\n');
    }

    display.forEach((entry) => {
        const axis = resultAxisMap[entry.axisId];
        const left = scores[entry.axisId];
        const right = 100 - left;
        const description = axisDescriptions?.[entry.axisId];
        const label = document.getElementById(entry.label);
        label.textContent = description?.label ||
            (version.kind === 'current' ? 'Score only' : globalThis.LAW_SCORING.axisLabel(axis, left));
        label.setAttribute('data-label-status', description?.status ||
            (version.kind === 'current' ? 'score-only' : 'legacy-score'));
        const explanation = document.getElementById(`${entry.label}-explanation`);
        if (explanation) {
            explanation.textContent = description?.explanation || (version.kind === 'current'
                ? 'This link has no valid answer-based label. The saved score alone does not establish a particular commitment.'
                : 'Earlier score-based wording is retained for this saved result.');
        }
        setBarValue(entry.leftId, left);
        setBarValue(entry.rightId, right);
        showScoreEvidence(entry);
    });

    const incomplete = globalThis.LAW_AXES.filter(
        (axis) => coverage[axis.id] !== null && coverage[axis.id] < axisContributingCounts[axis.id]
    );
    if (incomplete.length > 0) {
        const note = document.getElementById('coverage-note');
        note.hidden = false;
        note.textContent = '“Not sure” responses are excluded from any axis they would have informed. Some questions contribute to more than one axis.';
    }

    function classificationFromUrl() {
        if (!['current', 'legacy'].includes(version.kind)) return null;
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
                related: profile.related || [],
                evidence: version.kind === 'current' && ['1','2'].includes(params.get('cev')) && globalThis.LAW_CHAMPION_CARDS
                    ? globalThis.LAW_CHAMPION_CARDS.decodeEvidence(profile.id, params.get('ce'), params.get('cev'), params.get('ca'))
                    : undefined
            }));

        const resultTitle = version.kind === 'current' && globalThis.LAW_RESULT_CONTENT?.fromIds
            ? globalThis.LAW_RESULT_CONTENT.fromIds(identity, scores, {}, {
                modifierId: params.get('m'),
                phraseId: params.get('p'),
                bridgeId: params.get('b')
            })
            : compatibility.legacyTitleFromIds(identity, params);

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
            narrative: compatibility.legacyNarrativeFromIds(params),
            narrativeId: params.get('x') || null,
            narrativeOpeningId: params.get('o') || null,
            calibration: 'theory-derived'
        };
    }

    function getClassification() {
        if (record?.classification) return record.classification;
        if (record && version.canInterpretResponses && globalThis.LAW_CLASSIFIER) {
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
            version.kind === 'current' &&
            globalThis.LAW_RESULT_CONTENT?.assemble
                ? globalThis.LAW_RESULT_CONTENT.assemble(result, scores, result.traits || {})
                : null
        );
        const narrative = result.narrative || (
            version.kind === 'current' &&
            globalThis.LAW_RESULT_NARRATIVE?.build
                ? globalThis.LAW_RESULT_NARRATIVE.build(result, scores, result.narrativeId || params.get('x'), result.narrativeOpeningId || params.get('o'))
                : null
        );

        title.textContent = assembled?.title || result.identity.label;
        // The title grammar already exposes noun roles. Use those structured
        // parts so only the jurisprudential identity receives contrast color.
        const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (character) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[character]);
        const titleParts = !assembled?.special && globalThis.LAW_RESULT_CONTENT?.titleParts
            ? globalThis.LAW_RESULT_CONTENT.titleParts(result.identity, assembled?.modifier, assembled?.phrase)
            : [{ text: title.textContent, role: 'title' }];
        title.innerHTML = '<strong>' + titleParts.map((part) =>
            part.role === 'noun'
                ? '<span class="result-title-noun">' + escapeHtml(part.text) + '</span>'
                : escapeHtml(part.text)
        ).join(' ') + '</strong>';
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

        const coreOnlyAxes = version.version === '0.8 Beta';
        const modernProfile = version.kind === 'current' || coreOnlyAxes;
        const champions = Array.isArray(result.champions) ? result.champions : [];
        if (champions.length === 1) {
            championLine.textContent = `Champion: ${champions[0].name}`;
            championDescription.textContent = champions[0].description || '';
            const thinkerProfile = (globalThis.LAW_PROFILES || []).find(item => item.id === champions[0].id);
            const specificAffinity = champions[0].evidence?.scope === 'specific-affinity' ||
                (thinkerProfile && Object.keys(thinkerProfile.axisSignature || {}).length === 0);
            if (modernProfile && specificAffinity) {
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
        const axisExplanation = version.kind === 'current'
            ? 'The axis scores combine core evidence with narrowly targeted diagnostic clarifications where present. Adaptive answers also refine the jurisprudential match.'
            : coreOnlyAxes
                ? 'The eight saved axis scores come only from the 0.8 core questions. Adaptive answers refined the jurisprudential match without changing those scores.'
                : 'These saved axis scores use an earlier scoring version; answered Separation diagnostics could modestly refine Separation.';
        note.textContent = diagnosticCount > 0
            ? `The thinker match uses the eight-axis profile plus ${diagnosticCount} adaptive tie-breaker question${diagnosticCount === 1 ? '' : 's'}. ${axisExplanation} Thinker locations are theory-derived prototypes pending empirical calibration.`
            : `The thinker match uses theory-derived profiles. Unmodeled commitments are unknown, not evidence of agreement. ${axisExplanation} Thinker matches remain provisional pending empirical calibration.`;
        if (modernProfile && champions.length === 1) {
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
        if (modernProfile && result.identityPriority?.unresolved) {
            note.textContent = 'Your leading commitments remain close; the headline is provisional. ' + note.textContent;
        }
    }

    displayClassification(classification);

    function renderCommitmentIcons(result) {
        const container = document.getElementById('commitment-icons');
        const championEvidence = result?.champions?.length === 1 ? result.champions[0].evidence : null;
        const supportedAxes = new Set(championEvidence?.supportedAxes || []);
        const supportedTraits = championEvidence?.supportedTraits || [];
        const traitAxis = trait => trait.startsWith('source.') ? 'sorc' :
            trait.startsWith('time.') ? 'time' :
            (trait.startsWith('constraint.') || trait.startsWith('method.')) ? 'cons' :
            trait.startsWith('precedent.') ? 'prec' : trait.startsWith('remedies.') ? 'remed' :
            trait.startsWith('posture.') ? 'post' : trait.startsWith('separation.') ? 'separ' :
            trait.startsWith('form.') ? 'form' : null;
        const traitAxes = new Set(supportedTraits.map(traitAxis).filter(Boolean));
        const priorityDomain = {sorc:'source',time:'time',cons:'method',post:'posture',separ:'structure',form:'form'};
        const supportedStatuses = new Set(['supported','conditional']);
        const ranked = display.map(entry => {
            const score = Number(scores[entry.axisId]);
            const salience = Math.abs(score-50)/50;
            const status = axisDescriptions?.[entry.axisId]?.status;
            const domain = priorityDomain[entry.axisId];
            const priority = domain ? Object.entries(result?.traits || {}).some(([trait,value]) =>
                Number(value) >= 0.5 && trait.startsWith(`priority.${domain}.over.`)) : false;
            const importance = 0.55*salience + (supportedAxes.has(entry.axisId)?0.25:0) +
                (traitAxes.has(entry.axisId)?0.15:0) + (priority?0.15:0);
            return {entry,score,salience,status,importance};
        }).filter(item => Number.isFinite(item.score) && item.salience >= 0.16 && supportedStatuses.has(item.status))
          .sort((a,b) => b.importance-a.importance || b.salience-a.salience || a.entry.axisId.localeCompare(b.entry.axisId))
          .slice(0,3);
        container.innerHTML = '';
        for (const item of ranked) {
            const axis = resultAxisMap[item.entry.axisId];
            const left = item.score >= 50;
            const image = document.createElement('img');
            image.src = `value_images/${left ? item.entry.leftImage : item.entry.rightImage}`;
            image.alt = left ? axis.left : axis.right;
            image.title = `${axis.name}: ${image.alt}`;
            container.appendChild(image);
        }
        container.hidden = ranked.length === 0;
    }

    renderCommitmentIcons(classification);

    // Keep the champion in its original position, with its own compact card.
    // Biographical text is independent of the respondent's long-form portrait.
    const championCard = document.getElementById('champion-card');
    const championTagline = document.getElementById('champion-tagline');
    const championPortrait = document.getElementById('champion-portrait');
    const championLineText = document.getElementById('champion-line').textContent;
    championCard.hidden = !championLineText;
    const card = globalThis.LAW_CHAMPION_CARDS?.build(classification, scores, { legacy: version.kind !== 'current', responses:record?.responses, diagnosticResponses:record?.diagnosticResponses });
    if (card) document.getElementById('champion-line').textContent = `Champion: ${card.name}`;
    championTagline.textContent = card?.tagline || '';
    championTagline.hidden = !card?.tagline;
    championPortrait.textContent = card?.paragraph || document.getElementById('champion-description').textContent || '';
    championPortrait.hidden = !championPortrait.textContent;
    let championExpanded = false;
    const setChampionExpanded = expanded => {
        championExpanded = expanded;
        championCard.classList?.toggle('is-expanded',expanded);
        championCard.setAttribute('aria-expanded',String(expanded));
    };
    setChampionExpanded(false);
    championCard.addEventListener('click',() => setChampionExpanded(!championExpanded));
    championCard.addEventListener('keydown',(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault?.();
        setChampionExpanded(!championExpanded);
    });


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
            version.kind === 'current' && classification?.identity && globalThis.LAW_RESULT_NARRATIVE?.build
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
            `LAWvalues${version.version ? ' ' + version.version : ''}`,
            versionNotice || null,
            ...classificationLines,
            ...(coreProvenance ? resultAxes.filter(axis => coreProvenance.scores[axis.id] !== scores[axis.id]).map(axis =>
                `${axis.name} clarification: core estimate ${coreProvenance.scores[axis.id]}%, final ${scores[axis.id]}%.`) : []),
            ...resultAxes.map((axis) =>
                `${axis.name}: ${axisDescriptions?.[axis.id]?.label ? axisDescriptions[axis.id].label + '. ' : ''}${scores[axis.id]}% ${axis.left} / ${100 - scores[axis.id]}% ${axis.right}`
            ),
            window.location.href
        ].filter(Boolean).join('\n');
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
    download.hidden = false;
    download.addEventListener('click', () => {
        // A local completed session preserves its real answers. A URL-only view
        // exports an explicit summary and never manufactures absent responses.
        const exportRecord = record ? {
                ...record,
                instrument: 'LAWvalues',
                instrumentVersion: record.instrumentVersion || record.version,
                exportKind: 'completed-session',
                answersIncluded: true
            } : {
                instrument: 'LAWvalues',
                instrumentVersion: version.version,
                exportKind: 'shared-result-summary',
                answersIncluded: false,
                scores,
                axisDescriptions,
                classification,
                shareUrl: window.location.href,
                note: 'This shared result URL does not contain answer-level responses.'
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

    document.getElementById('copy-link').addEventListener('click', (event) =>
        copyText(window.location.href, event.currentTarget, 'Copied')
    );
    document.getElementById('copy-summary').addEventListener('click', (event) =>
        copyText(textSummary(), event.currentTarget, 'Copied')
    );

    error.hidden = true;
    main.hidden = false;
})();

