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

  function scoreWeight(item) {
    const value = Number(item.scoreWeight ?? 1);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }

  function weightedMean(items, responses, transform = (value) => value) {
    const totalWeight = items.reduce((sum, item) => sum + scoreWeight(item), 0);
    if (totalWeight === 0) return null;
    return items.reduce(
      (sum, item) => sum + transform(Number(responses[item.id]), item) * scoreWeight(item),
      0
    ) / totalWeight;
  }

  function scoreAxis(axisId, responses, questions = global.LAW_QUESTIONS) {
    const axisItems = questions.filter((item) => item.axis === axisId);
    const scoredItems = axisItems.filter((item) => scoreWeight(item) > 0);
    const answered = scoredItems.filter(
      (item) => hasResponse(responses, item.id) && responses[item.id] !== null
    );

    if (answered.length === 0) {
      return {
        score: 50,
        answered: 0,
        total: scoredItems.length,
        diagnosticTotal: axisItems.length - scoredItems.length,
        strength: 0,
        raw: 0
      };
    }

    const positive = answered.filter((item) => item.key === 1);
    const negative = answered.filter((item) => item.key === -1);
    const positiveMean = weightedMean(positive, responses);
    const negativeMean = weightedMean(negative, responses);

    let raw;
    if (positiveMean !== null && negativeMean !== null) {
      // Give first-pole- and second-pole-keyed item families equal influence even when
      // the working bank currently contains different numbers of each.
      raw = (positiveMean - negativeMean) / 2;
    } else if (positiveMean !== null) {
      raw = positiveMean;
    } else {
      raw = -negativeMean;
    }

    const score = clamp(50 + roundAwayFromZero((50 * raw) / RESPONSE_MAX), 0, 100);
    const totalWeight = answered.reduce((sum, item) => sum + scoreWeight(item), 0);
    const strength = totalWeight === 0 ? 0 : Math.round(
      (100 * answered.reduce(
        (sum, item) => sum + Math.abs(Number(responses[item.id])) * scoreWeight(item),
        0
      )) / (RESPONSE_MAX * totalWeight)
    );

    return {
      score,
      answered: answered.length,
      total: scoredItems.length,
      diagnosticTotal: axisItems.length - scoredItems.length,
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
    scoreAxis,
    scoreAll,
    axisLabel,
    dominantPole,
    profileDistance
  });
})(globalThis);
