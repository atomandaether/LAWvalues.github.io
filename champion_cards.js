/* Champion presentation only. This module never selects a thinker or changes a score. */
(function (global) {
  'use strict';
  const AXIS_FIT = {
    sorc: ['grounding law in recognized social sources', 'treating moral principle as part of legal authority'],
    cons: ['giving enacted wording priority in interpretation', 'reading legal language through its purposes'],
    time: ['keeping constitutional meaning anchored in its historical adoption', 'allowing constitutional law to develop over time'],
    prec: ['giving settled precedent substantial independent weight', 'correcting mistaken precedent rather than preserving it'],
    remed: ['limiting judicial remedies to the dispute before the court', 'using broader judicial remedies to address legal wrongs'],
    post: ['leaving more contested decisions to elected institutions', 'giving courts a stronger role in enforcing legal limits'],
    separ: ['enforcing distinct constitutional allocations of institutional power', 'allowing more flexibility in how institutions share power'],
    form: ['using clear rules to constrain case-by-case judgment', 'using context-sensitive standards to decide hard cases']
  };
  const profiles = () => global.LAW_PROFILES || [];
  const content = () => global.LAW_CHAMPION_CONTENT || {};
  const profileFor = id => profiles().find(p => p.id === id);
  function supportedTraits(classification, champion) {
    const profile = profileFor(champion?.id);
    if (!profile) return [];
    const allowed = new Set([...(profile.signatureTraits || []), ...(profile.supportingTraits || [])]);
    // A champion ID, result title, or theoretical description is never evidence.
    const evidence = new Set(Array.isArray(champion.evidence?.supportedTraits) ? champion.evidence.supportedTraits : []);
    return Object.keys(content()[profile.id]?.fitTraits || {}).filter(id => allowed.has(id) &&
      (Number(classification.traits?.[id]) >= 0.5 || evidence.has(id)));
  }
  function toIds(classification) {
    if (classification?.champions?.length !== 1) return '';
    return supportedTraits(classification, classification.champions[0]).slice(0, 2).join(',');
  }
  function fromIds(championId, value) {
    const profile = profileFor(championId);
    if (!profile || typeof value !== 'string' || value.length > 300) return [];
    const allowed = new Set([...(profile.signatureTraits || []), ...(profile.supportingTraits || [])]);
    const copy = content()[championId];
    return [...new Set(value.split(','))].filter(id => allowed.has(id) && Object.hasOwn(copy?.fitTraits || {}, id)).slice(0, 2);
  }
  function scoreFit(profile, scores) {
    return Object.entries(profile.axisSignature || {}).filter(([id, spec]) => {
      const value = Number(scores?.[id]);
      return AXIS_FIT[id] && scores?.[id] != null && Number.isFinite(value) && value >= 0 && value <= 100 &&
        Math.abs(value - 50) >= 18 && Math.abs(Number(spec.target) - 50) >= 18 &&
        (value - 50) * (Number(spec.target) - 50) > 0 && Math.abs(value - Number(spec.target)) <= 22;
    }).sort((a, b) => Number(b[1].weight || 1) - Number(a[1].weight || 1))
      .slice(0, 2).map(([id]) => AXIS_FIT[id][Number(scores[id]) >= 50 ? 0 : 1]);
  }
  function build(classification, scores, options = {}) {
    if (['unusable_response', 'incoherent_response', 'outcome_driven_left', 'outcome_driven_right'].includes(classification?.identity?.id)) return null;
    const champions = classification?.champions || [];
    if (champions.length !== 1) return null;
    const champion = champions[0], profile = profileFor(champion.id), copy = content()[champion.id];
    if (!profile || !copy) return null;
    const supported = options.legacy ? [] : supportedTraits(classification, champion);
    const phrases = supported.slice(0, 2).map(id => copy.fitTraits[id]);
    const lowConfidence = classification.championConfidence === 'low';
    let fit;
    if (phrases.length) {
      fit = `${lowConfidence ? 'Your closest shared ground is the view that' : 'You share the view that'} ${phrases.join(', and that ')}.`;
    } else {
      const axes = scoreFit(profile, scores);
      fit = axes.length
        ? `Your saved scores suggest a connection through ${axes.join(' and ')}; they do not establish agreement with the whole theory.`
        : 'This is the thinker match saved with your result; a more specific connection needs the original answer evidence.';
    }
    if (phrases.length && (champion.evidence?.scope === 'specific-affinity' || !Object.keys(profile.axisSignature || {}).length)) {
      fit += ' This is a focused affinity rather than a whole-profile match.';
    } else if (phrases.length && lowConfidence) {
      fit += ' The broader match remains tentative.';
    }
    return { id: champion.id, name: profile.name, tagline: copy.tagline, paragraph: `${copy.bio} ${fit}`, supportedTraits: supported.slice(0, 2), sources: copy.sources || [] };
  }
  global.LAW_CHAMPION_CARDS = Object.freeze({build, toIds, fromIds, supportedTraits});
})(globalThis);
