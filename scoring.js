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
    const rows = items.map((item) => {
      const agree = signalFor(item, "agree", axisId);
      const disagree = signalFor(item, "disagree", axisId);
      return {
        item,
        agree,
        disagree,
        leftPotential: Math.max(0, agree, disagree),
        rightPotential: Math.max(0, -agree, -disagree)
      };
    });

    const totalLeftPotential = rows.reduce((sum, row) => sum + row.leftPotential, 0);
    const totalRightPotential = rows.reduce((sum, row) => sum + row.rightPotential, 0);

    // Information weights are normalized against each pole before being placed
    // on one common scale. This preserves asymmetric items without allowing the
    // pole with more raw weight to acquire a mathematical advantage.
    for (const row of rows) {
      const leftWeight = totalLeftPotential > 0 ? row.leftPotential / totalLeftPotential : 0;
      const rightWeight = totalRightPotential > 0 ? row.rightPotential / totalRightPotential : 0;
      row.informationWeight = Math.max(leftWeight, rightWeight);
    }

    const totalInformation = rows.reduce((sum, row) => sum + row.informationWeight, 0);
    let answeredInformation = 0;
    let answered = 0;
    let answeredLeftPotential = 0;
    let answeredRightPotential = 0;
    let leftEvidence = 0;
    let rightEvidence = 0;
    let signedEvidence = 0;

    for (const row of rows) {
      const item = row.item;
      if (!hasResponse(responses, item.id) || responses[item.id] === null) continue;

      answered += 1;
      answeredInformation += row.informationWeight;
      answeredLeftPotential += row.leftPotential;
      answeredRightPotential += row.rightPotential;

      const response = Number(responses[item.id]);
      if (!Number.isFinite(response) || response === 0) continue;
      const direction = response > 0 ? "agree" : "disagree";
      const signal = signalFor(item, direction, axisId);
      const contribution = Math.abs(response) / RESPONSE_MAX * signal;

      if (contribution > 0) {
        leftEvidence += contribution;
        if (totalLeftPotential > 0) signedEvidence += contribution / totalLeftPotential;
      }
      if (contribution < 0) {
        rightEvidence += -contribution;
        if (totalRightPotential > 0) signedEvidence += contribution / totalRightPotential;
      }
    }

    const leftSupport = answeredLeftPotential > 0 ? leftEvidence / answeredLeftPotential : 0;
    const rightSupport = answeredRightPotential > 0 ? rightEvidence / answeredRightPotential : 0;

    // "Not sure" removes the item's information opportunity rather than acting
    // like a neutral answer. A genuine neutral answer contributes no directional
    // evidence but does enlarge the answered-information denominator, so it can
    // only leave extremity unchanged or pull the score toward 50. Sparse answers
    // are still shrunk toward 50 by the square-root information-coverage term.
    const coverage = totalInformation > 0 ? answeredInformation / totalInformation : 0;
    const raw = answeredInformation > 0 && totalInformation > 0
      ? clamp(signedEvidence * Math.sqrt(totalInformation / answeredInformation), -1, 1)
      : 0;
    const score = clamp(50 + roundAwayFromZero(50 * raw), 0, 100);
    const strength = Math.round(100 * Math.max(leftSupport, rightSupport));
    const conflict = Math.round(100 * Math.min(leftSupport, rightSupport));

    return {
      score,
      answered,
      total: items.length,
      coverage,
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

  function scoreAllWithDiagnostics(
    responses,
    diagnosticResponses = {},
    axes = global.LAW_AXES,
    questions = global.LAW_QUESTIONS,
    diagnostics = global.LAW_DIAGNOSTIC_QUESTIONS
  ) {
    const supplemental = (Array.isArray(diagnostics) ? diagnostics : []).filter(
      (item) =>
        item?.signals &&
        hasResponse(diagnosticResponses, item.id) &&
        diagnosticResponses[item.id] !== null
    );
    if (supplemental.length === 0) return scoreAll(responses, axes, questions);
    return scoreAll(
      { ...(responses || {}), ...(diagnosticResponses || {}) },
      axes,
      [...questions, ...supplemental]
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
    scoreAllWithDiagnostics,
    axisLabel,
    dominantPole,
    profileDistance
  });
})(globalThis);
