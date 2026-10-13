/* Shared scoring helpers for the quiz, results page, and audit script. */
(function attachScoring(global) {
  const RESPONSE_MIN = -3;
  const RESPONSE_MAX = 3;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function roundAwayFromZero(value) {
    if (value === 0) return 0;
    return Math.sign(value) * Math.round(Math.abs(value));
  }

  function hasResponse(responses, id) {
    return Object.prototype.hasOwnProperty.call(responses, id);
  }

  function signalFor(item, direction, axisId) {
    const value = Number(item?.signals?.[direction]?.[axisId] ?? 0);
    return Number.isFinite(value) ? value : 0;
  }

  function contributesToAxis(item, axisId) {
    return signalFor(item, "agree", axisId) !== 0 ||
      signalFor(item, "disagree", axisId) !== 0;
  }

  function scoreAxis(axisId, responses, questions = global.LAW_QUESTIONS) {
    const items = questions.filter((item) => contributesToAxis(item, axisId));
    const answered = items.filter(
      (item) => hasResponse(responses, item.id) && responses[item.id] !== null
    );

    let leftPotential = 0;
    let rightPotential = 0;
    for (const item of answered) {
      const possible = [
        signalFor(item, "agree", axisId),
        signalFor(item, "disagree", axisId)
      ];
      leftPotential += Math.max(0, ...possible);
      rightPotential += Math.max(0, ...possible.map((value) => -value));
    }

    let leftEvidence = 0;
    let rightEvidence = 0;
    for (const item of answered) {
      const response = Number(responses[item.id]);
      if (!Number.isFinite(response) || response === 0) continue;
      const direction = response > 0 ? "agree" : "disagree";
      const signal = signalFor(item, direction, axisId);
      const contribution = Math.abs(response) / RESPONSE_MAX * signal;
      if (contribution > 0) leftEvidence += contribution;
      if (contribution < 0) rightEvidence += -contribution;
    }

    const leftSupport = leftPotential > 0 ? leftEvidence / leftPotential : 0;
    const rightSupport = rightPotential > 0 ? rightEvidence / rightPotential : 0;

    // The two poles are estimated separately. An answer that is evidence for one pole
    // need not be treated as evidence for the other when the proposition is asymmetric.
    // "Not sure" is not a neutral answer: exclude its potential from the
    // denominator. Shrink sparse evidence toward 50 to avoid false certainty.
    const coverage = items.length ? answered.length / items.length : 0;
    const raw = (leftSupport - rightSupport) * Math.sqrt(coverage);
    const score = clamp(50 + roundAwayFromZero(50 * raw), 0, 100);
    const strength = Math.round(100 * Math.max(leftSupport, rightSupport));
    const conflict = Math.round(100 * Math.min(leftSupport, rightSupport));

    return {
      score,
      answered: answered.length,
      total: items.length,
      strength,
      conflict,
      leftSupport: Math.round(100 * leftSupport),
      rightSupport: Math.round(100 * rightSupport),
      raw
    };
  }

  function scoreAll(responses, axes = global.LAW_AXES, questions = global.LAW_QUESTIONS) {
    return Object.fromEntries(
      axes.map((axis) => [axis.id, scoreAxis(axis.id, responses, questions)])
    );
  }

  function axisLabel(axis, score) {
    const value = clamp(Number(score), 0, 100);
    if (value >= 82) return `Strongly ${axis.left}`;
    if (value >= 65) return axis.left;
    if (value >= 56) return `Leans ${axis.left}`;
    if (value <= 18) return `Strongly ${axis.right}`;
    if (value <= 35) return axis.right;
    if (value <= 44) return `Leans ${axis.right}`;
    return "Mixed";
  }

  function dominantPole(axis, score) {
    const value = clamp(Number(score), 0, 100);
    if (value === 50) {
      return { name: "Mixed", percent: 50, opposite: 50, direction: "mixed" };
    }
    if (value > 50) {
      return { name: axis.left, percent: value, opposite: 100 - value, direction: "left" };
    }
    return { name: axis.right, percent: 100 - value, opposite: value, direction: "right" };
  }

  function profileDistance(scores, profile, axes = global.LAW_AXES) {
    const squared = axes.reduce((sum, axis) => {
      const delta = Number(scores[axis.id]) - Number(profile.scores[axis.id]);
      return sum + delta * delta;
    }, 0);
    return Math.sqrt(squared / axes.length);
  }

  global.LAW_SCORING = Object.freeze({
    RESPONSE_MIN,
    RESPONSE_MAX,
    clamp,
    roundAwayFromZero,
    signalFor,
    contributesToAxis,
    scoreAxis,
    scoreAll,
    axisLabel,
    dominantPole,
    profileDistance
  });
})(globalThis);
