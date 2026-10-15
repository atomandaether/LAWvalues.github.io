/* Version boundaries for saved LAWvalues scores and raw responses.
   Never reinterpret an older instrument's answers with today's question bank. */
(function attachResultCompatibility(global) {
  'use strict';

  const LEGACY_AXES = Object.freeze([
    ['sorc', 'Source', 'Positivist', 'Non-positivist'],
    ['cons', 'Constraint', 'Textualist', 'Open construction'],
    ['time', 'Time', 'Historical', 'Living'],
    ['prec', 'Precedent', 'Stability', 'Overruling'],
    ['remed', 'Remedies', 'Narrow', 'Systemic'],
    ['post', 'Posture', 'Majoritarian', 'Counter-majoritarian'],
    ['separ', 'Separation', 'Formalist', 'Functionalist'],
    ['form', 'Form', 'Rules', 'Balancing']
  ].map(([id, name, left, right]) => Object.freeze({ id, name, left, right })));

  function versionInfo(version) {
    if (typeof version !== 'string' || !version) {
      return Object.freeze({ kind: 'unversioned', version: null, canInterpretResponses: false });
    }
    const match = /^(0\.[1-9][0-9]*)(?: Beta)?$/.exec(version);
    if (!match) return Object.freeze({ kind: 'unsupported', version, canInterpretResponses: false });
    const canonical = `${match[1]} Beta`;
    if (canonical === global.LAW_VERSION) {
      return Object.freeze({ kind: 'current', version: canonical, canInterpretResponses: true });
    }
    if (Number(match[1].slice(2)) <= 8) {
      return Object.freeze({ kind: 'legacy', version: canonical, canInterpretResponses: false });
    }
    return Object.freeze({ kind: 'unsupported', version, canInterpretResponses: false });
  }

  function versionFromParams(params) {
    return params.getAll('v').length > 1
      ? versionInfo('invalid duplicate version')
      : versionInfo(params.get('v'));
  }

  function axesForVersion(version) {
    return versionInfo(version).kind === 'current' ? global.LAW_AXES : LEGACY_AXES;
  }

  function parseScores(params) {
    const scores = {};
    for (const axis of global.LAW_AXES) {
      const values = params.getAll(axis.id);
      if (values.length !== 1 || !/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(values[0])) return null;
      const value = Number(values[0]);
      if (!Number.isFinite(value) || value < 0 || value > 100) return null;
      scores[axis.id] = value;
    }
    return scores;
  }

  function validResponses(responses) {
    return Boolean(responses) && !Array.isArray(responses) && typeof responses === 'object' &&
      Object.values(responses).every(value => value === null ||
        (typeof value === 'number' && Number.isInteger(value) && value >= -3 && value <= 3));
  }

  function sameQuery(left, right) {
    if (versionFromParams(left).version !== versionFromParams(right).version) return false;
    const entries = params => [...params.entries()]
      .filter(([key]) => key !== 'v').sort(([a, av], [b, bv]) => a.localeCompare(b) || av.localeCompare(bv));
    return JSON.stringify(entries(left)) === JSON.stringify(entries(right));
  }

  function loadLocalRecord({ storage, params, scores }) {
    const info = versionFromParams(params);
    if (!['current', 'legacy'].includes(info.kind)) return null;
    const keys = [...new Set([info.version, params.get('v')])];
    for (const version of keys) {
      try {
        const record = JSON.parse(storage.getItem(`lawvalues-latest-${version}`));
        if (!record || versionInfo(record.version).version !== info.version ||
            (Object.hasOwn(record, 'instrumentVersion') && versionInfo(record.instrumentVersion).version !== info.version) ||
            !validResponses(record.responses) || !record.resultQuery) continue;
        if (!sameQuery(new URLSearchParams(record.resultQuery), params)) continue;
        if (!global.LAW_AXES.every(axis => typeof record.scores?.[axis.id] === 'number' &&
            record.scores[axis.id] === scores[axis.id])) continue;
        if (record.diagnosticResponses && !validResponses(record.diagnosticResponses)) continue;
        return record;
      } catch (_) {
        // Invalid or unavailable storage must never block the score-only URL.
      }
    }
    return null;
  }

  function descriptionsForResult({ scores, params, record }) {
    const info = versionFromParams(params);
    if (!info.canInterpretResponses || !global.LAW_AXIS_LABELS) return null;
    if (record && versionInfo(record.version).version === info.version) {
      return global.LAW_AXIS_LABELS.describeAll({
        scores,
        responses: record.responses,
        diagnosticResponses: record.diagnosticResponses || {},
        version: info.version
      });
    }
    if (params.getAll('alv').length !== 1 || params.get('alv') !== '1' || params.getAll('al').length !== 1) return null;
    return global.LAW_AXIS_LABELS.fromIds({ ids: params.get('al'), scores, version: info.version });
  }

  function legacyTitleFromIds(identity, params) {
    if (versionFromParams(params).kind !== 'legacy') return null;
    const content = global.LAW_RESULT_CONTENT;
    if (!content?.composeTitle) return null;
    const modifierId = params.get('m');
    const phraseId = params.get('p');
    const bridgeId = params.get('b');
    if (['m', 'p', 'b'].some(key => params.getAll(key).length > 1)) return null;
    const modifiers = content.MODIFIERS || [];
    const phrases = [...(content.PHRASES || []), ...Object.values(content.FALLBACK_PHRASES || {})];
    let modifier = modifierId ? modifiers.find(item => item.id === modifierId) : null;
    if (modifierId === 'fit_some_kind') modifier = { id: modifierId, text: 'Some kind of' };
    if (modifierId === 'fit_unmistakable') modifier = {
      id: modifierId, text: `Unmistakably ${/^[aeiou]/i.test(identity.label) ? 'an' : 'a'}`
    };
    const phrase = phraseId ? phrases.find(item => item.id ===
      (phraseId === 'mixed_profile' ? 'secondary_neutral' : phraseId)) : null;
    const bridge = bridgeId ? (content.BRIDGES || []).find(item => item.id === bridgeId) : null;
    if ((modifierId && !modifier) || (phraseId && !phrase) || (bridgeId && !bridge)) return null;
    return { title: content.composeTitle(identity, modifier, phrase), noun: identity.label,
      modifier: modifier || null, phrase: phrase || null, bridge: bridge || null };
  }

  function legacyNarrativeFromIds(params) {
    if (versionFromParams(params).kind !== 'legacy') return null;
    if (['x', 'o'].some(key => params.getAll(key).length > 1)) return null;
    const routes = global.LAW_RESULT_NARRATIVE?.ROUTES || {};
    const openings = global.LAW_RESULT_NARRATIVE?.OPENINGS || {};
    const id = params.get('x');
    const openingId = params.get('o');
    const route = id && Object.hasOwn(routes, id) ? routes[id] : null;
    const opening = openingId && Object.hasOwn(openings, openingId) ? openings[openingId] :
      (route && id.startsWith('portrait_') ? route.opening : '');
    if (!route && !opening) return null;
    return { id: route ? id : null, openingId: opening ? openingId : null,
      opening, context: route?.context || '' };
  }

  function coreScoresForResult({ params, record }) {
    if (versionFromParams(params).kind !== 'current') return null;
    if (record?.coreScores && global.LAW_AXES.every(axis => {
      const value = record.coreScores[axis.id];
      return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100;
    })) return { scores: record.coreScores, source: 'record' };
    if (params.getAll('cs').length !== 1 || params.getAll('sp').length !== 1 ||
        params.get('sp') !== 'reviewed-hints-20pct-v1') return null;
    const values = params.get('cs').split(',');
    if (values.length !== global.LAW_AXES.length) return null;
    const scoreParams = new URLSearchParams();
    global.LAW_AXES.forEach((axis, index) => scoreParams.set(axis.id, values[index]));
    const scores = parseScores(scoreParams);
    return scores ? { scores, source: 'share' } : null;
  }

  function noticeForVersion(info) {
    if (info.kind === 'current') return '';
    if (info.kind === 'legacy') {
      return `Saved ${info.version} result. These scores and the earlier Historical/Living interpretation are preserved. The revised questionnaire and answer-based axis labels have not been applied to these answers.`;
    }
    if (info.kind === 'unversioned') {
      return 'This link does not identify its questionnaire version. Its saved numbers are shown with the earlier axis wording; current answer-based interpretations are unavailable.';
    }
    return 'This link has an unsupported or invalid questionnaire version. Its saved numbers are shown with the earlier axis wording; no current answer-based interpretation has been applied.';
  }

  global.LAW_RESULT_COMPAT = Object.freeze({
    LEGACY_AXES, versionInfo, versionFromParams, axesForVersion, parseScores,
    validResponses, sameQuery, loadLocalRecord, descriptionsForResult, legacyTitleFromIds, legacyNarrativeFromIds, coreScoresForResult, noticeForVersion
  });
})(globalThis);
