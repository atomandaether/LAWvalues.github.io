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
  const allowedTraits = profile => new Set([...(profile?.signatureTraits || []), ...(profile?.supportingTraits || [])]);
  const strength = raw => typeof raw === 'number' && Number.isFinite(raw) && raw >= 0.5 && raw <= 1
    ? Math.round(raw * 1000) / 1000 : null;
  function candidates(classification, champion) {
    const profile = profileFor(champion?.id), copy = content()[champion?.id];
    if (!profile || !copy) return [];
    const allowed = allowedTraits(profile);
    const recorded = new Set(Array.isArray(champion.evidence?.supportedTraits) ? champion.evidence.supportedTraits : []);
    return Object.keys(copy.fitTraits || {}).filter(id => allowed.has(id)).flatMap(id => {
      if (classification.traits && Object.hasOwn(classification.traits,id) && strength(classification.traits[id])===null) return [];
      const measured = strength(classification.traits?.[id]);
      const saved = strength(champion.evidence?.cardTraitStrengths?.[id]);
      if (measured === null && saved === null && !recorded.has(id)) return [];
      const value = measured ?? saved;
      const relevance = Math.max(1, Math.min(5, Number(copy.fitPriority?.[id]) || 3));
      return [{id, strength:value, relevance, rank:(value ?? 0.5) * relevance,
        group:copy.fitGroups?.[id] || id.split('.')[0]}];
    }).sort((a,b) => b.rank-a.rank || b.relevance-a.relevance || a.id.localeCompare(b.id));
  }
  function selectedEvidence(classification, champion) {
    const groups = new Set();
    // Synonymous tags do not get additional votes. No match score or confidence
    // is calculated here; the strongest distinct construct gets first mention.
    return candidates(classification,champion).filter(row => {
      if (groups.has(row.group)) return false;
      groups.add(row.group); return true;
    }).slice(0,3);
  }
  function supportedTraits(classification, champion) {
    return selectedEvidence(classification,champion).map(row => row.id);
  }
  function directEvidence(options) {
    if (!options?.responses || !global.LAW_CLASSIFIER?.buildTraitEvidence) return null;
    return global.LAW_CLASSIFIER.buildTraitEvidence(options.responses, options.diagnosticResponses || {});
  }
  function distinctDirectSupport(traits, evidence) {
    if (!evidence) return false;
    const choices = traits.map(id => Object.entries({...(evidence[id]?.coreSupport || {}), ...(evidence[id]?.diagnosticSupport || {})})
      .filter(([,value]) => Number(value) >= 0.5).map(([question]) => question));
    // A compound needs separately supporting items, not two aliases produced
    // by one answer. Backtracking avoids greedy failure on overlapping sets.
    function assign(index,used) {
      if (index===choices.length) return true;
      return choices[index].some(id => !used.has(id) && assign(index+1,new Set([...used,id])));
    }
    return choices.length > 1 && assign(0,new Set());
  }
  function affinityFor(classification, champion, rows, options={}) {
    const copy=content()[champion.id];
    const selected=new Map(rows.map(row=>[row.id,row]));
    const evidence=directEvidence(options);
    const saved=champion.evidence?.cardEvidenceVersion===2 ? champion.evidence.cardAffinityId : null;
    return (copy.affinities || []).filter(rule => typeof rule.id==='string' && typeof rule.text==='string' &&
      Array.isArray(rule.allTraits) && rule.allTraits.length>=2 && rule.allTraits.length<=3 &&
      rule.allTraits.every(id=> selected.has(id) &&
        (rule.minStrength?.[id] == null || (selected.get(id).strength ?? 0) >= rule.minStrength[id])) &&
      (saved===rule.id || distinctDirectSupport(rule.allTraits,evidence)))
      .sort((a,b)=>(Number(b.priority)||0)-(Number(a.priority)||0) || a.id.localeCompare(b.id))[0] || null;
  }
  function toShare(classification, options={}) {
    if (classification?.champions?.length!==1) return null;
    const champion=classification.champions[0];
    const rows=selectedEvidence(classification,champion);
    if (!rows.length) return null;
    const affinity=affinityFor(classification,champion,rows,options);
    return {version:2, ids:rows.map(row=>`${row.id}~${row.strength===null?'?':row.strength}`).join(','), affinityId:affinity?.id || null};
  }
  function toIds(classification, options={}) { return toShare(classification,options)?.ids || ''; }
  function decodeEvidence(championId, value, version='1', affinityId=null) {
    const empty={supportedTraits:[],cardTraitStrengths:{},cardEvidenceVersion:null,cardAffinityId:null};
    const profile=profileFor(championId), copy=content()[championId];
    if (!profile || !copy || typeof value!=='string' || value.length>500 || !['1','2'].includes(String(version))) return empty;
    const allowed=allowedTraits(profile), supported=[], strengths={};
    const max=String(version)==='1'?2:3;
    for (const token of value.split(',')) {
      const parts=String(version)==='2'?token.split('~'):[token];
      const id=parts[0];
      if (!allowed.has(id) || !Object.hasOwn(copy.fitTraits || {},id) || supported.includes(id)) continue;
      if (String(version)==='2') {
        if (parts.length!==2 || (parts[1]!=='?' && !/^(?:0\.\d{1,3}|1(?:\.0{1,3})?)$/.test(parts[1]))) continue;
        const magnitude=parts[1]==='?'?null:strength(Number(parts[1]));
        if (parts[1]!=='?' && magnitude===null) continue;
        if (magnitude!==null) strengths[id]=magnitude;
      }
      supported.push(id); if(supported.length===max) break;
    }
    const rule=String(version)==='2' && (copy.affinities || []).find(rule=>rule.id===affinityId &&
      rule.allTraits?.every(id=>supported.includes(id) && (rule.minStrength?.[id]==null || (strengths[id]??0)>=rule.minStrength[id])));
    return {supportedTraits:supported,cardTraitStrengths:strengths,cardEvidenceVersion:Number(version),cardAffinityId:rule?rule.id:null};
  }
  function fromIds(championId,value,version='1') { return decodeEvidence(championId,value,version).supportedTraits; }
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
    const rows = options.legacy ? [] : selectedEvidence(classification, champion);
    const supported = rows.map(row=>row.id);
    const affinity = options.legacy ? null : affinityFor(classification,champion,rows,options);
    const phrases = supported.slice(0, 2).map(id => copy.fitTraits[id]);
    const lowConfidence = classification.championConfidence === 'low';
    let fit;
    if (affinity) {
      fit = affinity.text;
    } else if (phrases.length) {
      fit = `${lowConfidence ? 'Your closest shared ground is the view that' : 'You share the view that'} ${phrases.join(', and that ')}.`;
    } else {
      const axes = scoreFit(profile, scores);
      fit = axes.length
        ? `Your saved scores suggest a connection through ${axes.join(' and ')}; they do not establish agreement with the whole theory.`
        : 'This is the thinker match saved with your result; a more specific connection needs the original answer evidence.';
    }
    // The text identifies a specific shared intellectual streak, never a claim
    // that the respondent shares every position of the named thinker.
    return { id: champion.id, name: profile.name, tagline: copy.tagline, paragraph: `${copy.bio} ${fit}`, supportedTraits: affinity ? affinity.allTraits : supported.slice(0, 2), affinityId: affinity?.id || null, sources: copy.sources || [] };
  }
  global.LAW_CHAMPION_CARDS = Object.freeze({build, toShare, toIds, fromIds, decodeEvidence, supportedTraits, selectedEvidence});
})(globalThis);
