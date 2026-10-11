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

  function weightForAxis(item, axisId) {
    const value = Number(item?.weights?.[axisId] ?? 0);
    return Number.isFinite(value) ? value : 0;
  }

  function weightedResponseMean(items, responses, axisId) {
    const denominator = items.reduce(
      (sum, item) => sum + Math.abs(weightForAxis(item, axisId)),
      0
    );
    if (denominator === 0) return null;
    return items.reduce(
      (sum, item) => sum + Number(responses[item.id]) * Math.abs(weightForAxis(item, axisId)),
      0
    ) / denominator;
  }

  function scoreAxis(axisId, responses, questions = global.LAW_QUESTIONS) {
    const items = questions.filter((item) => weightForAxis(item, axisId) !== 0);
    const answered = items.filter(
      (item) => hasResponse(responses, item.id) && responses[item.id] !== null
    );

    if (answered.length === 0) {
      return { score: 50, answered: 0, total: items.length, strength: 0, raw: 0 };
    }

    const positive = answered.filter((item) => weightForAxis(item, axisId) > 0);
    const negative = answered.filter((item) => weightForAxis(item, axisId) < 0);
    const positiveMean = weightedResponseMean(positive, responses, axisId);
    const negativeMean = weightedResponseMean(negative, responses, axisId);

    let raw;
    if (positiveMean !== null && negativeMean !== null) {
      // Equalize the two directional families so response-style agreement does not
      // push an axis merely because the working bank contains more items on one side.
      raw = (positiveMean - negativeMean) / 2;
    } else if (positiveMean !== null) {
      raw = positiveMean;
    } else {
      raw = -negativeMean;
    }

    const score = clamp(50 + roundAwayFromZero((50 * raw) / RESPONSE_MAX), 0, 100);
    const totalWeight = answered.reduce(
      (sum, item) => sum + Math.abs(weightForAxis(item, axisId)),
      0
    );
    const strength = totalWeight === 0 ? 0 : Math.round(
      (100 * answered.reduce(
        (sum, item) => sum + Math.abs(Number(responses[item.id])) *
          Math.abs(weightForAxis(item, axisId)),
        0
      )) / (RESPONSE_MAX * totalWeight)
    );

    return {
      score,
      answered: answered.length,
      total: items.length,
      strength,
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
      return {
        name: axis.left,
        percent: value,
        opposite: 100 - value,
        direction: "left"
      };
    }
    return {
      name: axis.right,
      percent: 100 - value,
      opposite: value,
      direction: "right"
    };
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
    weightForAxis,
    scoreAxis,
    scoreAll,
    axisLabel,
    dominantPole,
    profileDistance
  });
})(globalThis);
