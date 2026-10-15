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

  const HINT_BUDGET = 0.20;
  function currentBank(questions) {
    return Number.parseFloat(global.LAW_VERSION) >= 0.9 && questions !== global.LAW_LEGACY_QUESTIONS;
  }
  function validAnswer(value) {
    return typeof value === "number" && Number.isInteger(value) && value >= -3 && value <= 3;
  }
  function hintAdjustment(axisId, row, response, responses, diagnosticResponses) {
    // Reinterpret only weak public-historical hints, never a direct fixation
    // answer. A rejection of public-meaning authority does not reject original
    // intent or Original Law, and never supplies affirmative Living evidence.
    const rejection = diagnosticResponses?.["D-ORI7"];
    const independent = responses?.T11;
    const publicRoute = (validAnswer(responses?.T7) && responses.T7 >= 2) ||
      (validAnswer(diagnosticResponses?.["D-ORI1"]) && diagnosticResponses["D-ORI1"] >= 2);
    const alternativeOriginalism = diagnosticResponses?.["D-ORI1"] <= -2 ||
      diagnosticResponses?.["D-ORI6"] >= 2 || diagnosticResponses?.["D-ORI2"] >= 2;
    const directFixation = ["T1", "T2", "T3"].some(id => validAnswer(responses?.[id]) && responses[id] >= 2);
    if (axisId === "time" && row.kind === "hint" && ["T7", "T8", "T10"].includes(row.item.id) &&
        response > 0 && validAnswer(rejection) && rejection <= -2 &&
        validAnswer(independent) && independent <= 0 && publicRoute && !alternativeOriginalism && !directFixation) {
      return { diagnosticId: "D-ORI7", factor: 1 - Math.abs(rejection) / 3,
        reason: "Historical semantics no longer imply independent public-meaning authority after the direct clarification; no Living evidence is added." };
    }
    return null;
  }

  function scoreAxis(axisId, responses, questions = global.LAW_QUESTIONS, diagnosticResponses = {}) {
    const current = currentBank(questions);
    responses = responses && typeof responses === "object" ? responses : {};
    const items = questions.filter((item) => contributesToAxis(item, axisId));
    const rows = items.map((item) => {
      const agree = signalFor(item, "agree", axisId);
      const disagree = signalFor(item, "disagree", axisId);
      return {
        item,
        kind: current && item.evidenceKinds?.[axisId] === "hint" ? "hint" : "direct",
        rawAgree: agree,
        rawDisagree: disagree,
        agree,
        disagree,
        leftPotential: Math.max(0, agree, disagree),
        rightPotential: Math.max(0, -agree, -disagree)
      };
    });

    // The budget applies to explicitly reviewed weak links, not question IDs
    // or section names. Direct multi-axis propositions keep their full weight.
    if (current) {
      const potential = { directLeft: 0, directRight: 0, hintLeft: 0, hintRight: 0 };
      for (const row of rows) {
        potential[`${row.kind}Left`] += row.leftPotential;
        potential[`${row.kind}Right`] += row.rightPotential;
      }
      const scale = side => potential[`hint${side}`] > 0
        ? Math.min(1, (HINT_BUDGET / (1 - HINT_BUDGET)) * potential[`direct${side}`] / potential[`hint${side}`]) : 1;
      const leftScale = scale("Left"), rightScale = scale("Right");
      for (const row of rows) {
        row.leftBudgetScale = row.kind === "hint" ? leftScale : 1;
        row.rightBudgetScale = row.kind === "hint" ? rightScale : 1;
        const budget = value => value > 0 ? value * row.leftBudgetScale : value * row.rightBudgetScale;
        row.agree = budget(row.agree);
        row.disagree = budget(row.disagree);
        row.leftPotential = Math.max(0, row.agree, row.disagree);
        row.rightPotential = Math.max(0, -row.agree, -row.disagree);
      }
    }

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
    let coreSignedEvidence = 0;
    const contributions = [];

    for (const row of rows) {
      const item = row.item;
      if (!hasResponse(responses, item.id) || responses[item.id] === null ||
          (current && !validAnswer(responses[item.id]))) {
        if (current) contributions.push({ id: item.id, kind: row.kind, status: "missing", contribution: 0, normalizedContribution: 0 });
        continue;
      }

      answered += 1;
      answeredInformation += row.informationWeight;
      answeredLeftPotential += row.leftPotential;
      answeredRightPotential += row.rightPotential;

      const response = Number(responses[item.id]);
      if (!Number.isFinite(response) || response === 0) {
        if (current) contributions.push({ id: item.id, kind: row.kind, status: "neutral", answer: 0, contribution: 0, normalizedContribution: 0 });
        continue;
      }
      const direction = response > 0 ? "agree" : "disagree";
      const signal = row[direction];
      const coreContribution = Math.abs(response) / RESPONSE_MAX * signal;
      const adjustment = current ? hintAdjustment(axisId, row, response, responses, diagnosticResponses) : null;
      const contribution = coreContribution * (adjustment?.factor ?? 1);
      const divisor = signal > 0 ? totalLeftPotential : totalRightPotential;
      if (divisor > 0) coreSignedEvidence += coreContribution / divisor;
      if (current) contributions.push({ id: item.id, kind: row.kind, status: "answered", answer: response,
        rawSignal: direction === "agree" ? row.rawAgree : row.rawDisagree,
        budgetedSignal: signal, budgetScale: signal > 0 ? row.leftBudgetScale : row.rightBudgetScale,
        coreContribution, contribution, normalizedContribution: divisor > 0 ? contribution / divisor : 0,
        ...(adjustment ? { adjustment } : {}) });

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

    const coreRaw = answeredInformation > 0 && totalInformation > 0
      ? clamp(coreSignedEvidence * Math.sqrt(totalInformation / answeredInformation), -1, 1) : 0;
    const coreScore = clamp(50 + roundAwayFromZero(50 * coreRaw), 0, 100);
    return {
      ...(current ? { instrumentVersion: "0.9", coreScore, adjustment: score - coreScore,
        scoringPolicy: "reviewed-hints-20pct-v1", contributions,
        hintBudget: HINT_BUDGET, conflictIsLogical: false } : {}),
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
    if (!currentBank(questions)) return scoreAll(responses, axes, questions);
    return Object.fromEntries(axes.map(axis => [axis.id,
      scoreAxis(axis.id, responses, questions, diagnosticResponses)]));
  }

  // Explicit replay API: omitting the version here is deliberately an error.
  // Existing scoreAxis/scoreAll calls continue to target the current instrument.
  function questionsForVersion(version) {
    const match = typeof version === "string" && /^(0\.[1-9][0-9]*)(?: Beta)?$/.exec(version);
    const canonical = match ? `${match[1]} Beta` : null;
    if (canonical === global.LAW_VERSION) return global.LAW_QUESTIONS;
    if (canonical === "0.8 Beta" && Array.isArray(global.LAW_LEGACY_QUESTIONS)) {
      return global.LAW_LEGACY_QUESTIONS;
    }
    throw new RangeError(`Unsupported LAWvalues instrument version: ${String(version)}`);
  }

  function scoreAxisForVersion(axisId, responses, version) {
    return scoreAxis(axisId, responses, questionsForVersion(version));
  }

  function scoreAllForVersion(responses, version, axes = global.LAW_AXES) {
    return scoreAll(responses, axes, questionsForVersion(version));
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
    HINT_BUDGET,
    validAnswer,
    clamp,
    roundAwayFromZero,
    signalFor,
    contributesToAxis,
    scoreAxis,
    scoreAll,
    scoreAllWithDiagnostics,
    questionsForVersion,
    scoreAxisForVersion,
    scoreAllForVersion,
    axisLabel,
    dominantPole,
    profileDistance
  });
})(globalThis);

