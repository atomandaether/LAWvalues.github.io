(function renderResults() {
  "use strict";

  const LATEST_KEY = `lawvalues-latest-${globalThis.LAW_VERSION}`;
  const params = new URLSearchParams(window.location.search);
  const elements = {
    error: document.getElementById("results-error"),
    content: document.getElementById("results-content"),
    version: document.getElementById("result-version"),
    summary: document.getElementById("result-summary"),
    commitments: document.getElementById("commitment-grid"),
    axes: document.getElementById("axis-results"),
    coverage: document.getElementById("coverage-note"),
    profiles: document.getElementById("profile-panel"),
    profileName: document.getElementById("profile-name"),
    profileDescription: document.getElementById("profile-description"),
    profileImage: document.getElementById("profile-image"),
    copyLink: document.getElementById("copy-link"),
    copySummary: document.getElementById("copy-summary"),
    print: document.getElementById("print-results"),
    retake: document.getElementById("retake-quiz"),
    download: document.getElementById("download-record")
  };

  function parseScores() {
    const scores = {};
    for (const axis of globalThis.LAW_AXES) {
      const raw = params.get(axis.id);
      const value = Number(raw);
      if (raw === null || !Number.isFinite(value) || value < 0 || value > 100) {
        return null;
      }
      scores[axis.id] = Math.round(value);
    }
    return scores;
  }

  function parseCoverage() {
    const encoded = params.get("n");
    if (!encoded || encoded.length !== globalThis.LAW_AXES.length) {
      return Object.fromEntries(globalThis.LAW_AXES.map((axis) => [axis.id, 6]));
    }
    return Object.fromEntries(
      globalThis.LAW_AXES.map((axis, index) => {
        const value = Number(encoded[index]);
        return [axis.id, Number.isInteger(value) && value >= 0 && value <= 6 ? value : 6];
      })
    );
  }

  const scores = parseScores();
  const coverage = parseCoverage();

  if (!scores) {
    elements.error.hidden = false;
    elements.content.hidden = true;
    return;
  }

  const ranked = globalThis.LAW_AXES.map((axis) => ({
    axis,
    score: scores[axis.id],
    distance: Math.abs(scores[axis.id] - 50),
    pole: globalThis.LAW_SCORING.dominantPole(axis, scores[axis.id])
  })).sort((a, b) => b.distance - a.distance || a.axis.name.localeCompare(b.axis.name));

  function resultPhrase(entry) {
    if (entry.pole.direction === "mixed") return `mixed on ${entry.axis.name.toLowerCase()}`;
    return `${entry.pole.percent}% ${entry.pole.name}`;
  }

  function commitmentCard(entry) {
    const article = document.createElement("article");
    article.className = "commitment-card";
    article.style.setProperty("--accent", entry.pole.direction === "right" ? entry.axis.rightColor : entry.axis.leftColor);
    article.innerHTML = `
      <span class="eyebrow">${entry.axis.name}</span>
      <strong>${entry.pole.direction === "mixed" ? "Mixed" : `${entry.pole.percent}% ${entry.pole.name}`}</strong>
      <p>${entry.axis.question}</p>
    `;
    return article;
  }

  function axisCard(axis) {
    const score = scores[axis.id];
    const pole = globalThis.LAW_SCORING.dominantPole(axis, score);
    const label = globalThis.LAW_SCORING.axisLabel(axis, score);
    const markerPosition = 100 - score;
    const article = document.createElement("article");
    article.className = "axis-result-card";
    article.style.setProperty("--left", axis.leftColor);
    article.style.setProperty("--right", axis.rightColor);
    article.innerHTML = `
      <div class="axis-result-header">
        <div>
          <span class="eyebrow">${axis.name}</span>
          <h3>${label}</h3>
        </div>
        <div class="axis-score" aria-label="${score} toward ${axis.left}; ${100 - score} toward ${axis.right}">
          <strong>${pole.direction === "mixed" ? "50 / 50" : `${pole.percent}%`}</strong>
          <span>${pole.direction === "mixed" ? "mixed" : pole.name}</span>
        </div>
      </div>
      <p class="axis-question">${axis.question}</p>
      <div class="scale-labels" aria-hidden="true">
        <span>${axis.left}</span>
        <span>${axis.right}</span>
      </div>
      <div class="result-track" role="img" aria-label="${axis.left} ${score} percent; ${axis.right} ${100 - score} percent">
        <span class="result-midline"></span>
        <span class="result-marker" style="left:${markerPosition}%"></span>
      </div>
      <div class="scale-values" aria-hidden="true">
        <span>${score}%</span>
        <span>${100 - score}%</span>
      </div>
      <details>
        <summary>What this result means</summary>
        <div class="axis-explanation">
          <p><strong>${axis.left}:</strong> ${axis.leftDescription}</p>
          <p><strong>${axis.right}:</strong> ${axis.rightDescription}</p>
        </div>
      </details>
    `;
    return article;
  }

  function plainTextSummary() {
    const lines = [
      `LAWvalues ${globalThis.LAW_VERSION}`,
      ...globalThis.LAW_AXES.map((axis) => {
        const score = scores[axis.id];
        return `${axis.name}: ${score}% ${axis.left} / ${100 - score}% ${axis.right}`;
      }),
      window.location.href
    ];
    return lines.join("\n");
  }

  async function copyText(text, button, successText) {
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    button.textContent = successText;
    window.setTimeout(() => {
      button.textContent = original;
    }, 1600);
  }

  function loadLocalRecord() {
    try {
      const record = JSON.parse(sessionStorage.getItem(LATEST_KEY));
      if (record?.version !== globalThis.LAW_VERSION || !record.responses) return null;
      const sameScores = globalThis.LAW_AXES.every(
        (axis) => Number(record.scores?.[axis.id]) === Number(scores[axis.id])
      );
      return sameScores ? record : null;
    } catch (_) {
      return null;
    }
  }

  function enableDownload(record) {
    if (!record) return;
    elements.download.hidden = false;
    elements.download.addEventListener("click", () => {
      const exportRecord = {
        instrument: "LAWvalues",
        version: globalThis.LAW_VERSION,
        completedAt: record.completedAt,
        scores: record.scores,
        coverage: record.coverage,
        strength: record.strength,
        responses: record.responses
      };
      const blob = new Blob([JSON.stringify(exportRecord, null, 2)], {
        type: "application/json"
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `lawvalues-${globalThis.LAW_VERSION}-pilot-record.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    });
  }

  function renderProfile() {
    if (!Array.isArray(globalThis.LAW_PROFILES) || globalThis.LAW_PROFILES.length === 0) return;
    const profileScores = Object.fromEntries(globalThis.LAW_AXES.map((axis) => [axis.id, scores[axis.id]]));
    const closest = [...globalThis.LAW_PROFILES]
      .map((profile) => ({
        profile,
        distance: globalThis.LAW_SCORING.profileDistance(profileScores, profile)
      }))
      .sort((a, b) => a.distance - b.distance)[0]?.profile;
    if (!closest) return;

    elements.profileName.textContent = closest.name;
    elements.profileDescription.textContent = closest.description || "";
    if (closest.image) {
      elements.profileImage.src = closest.image;
      elements.profileImage.alt = closest.name;
      elements.profileImage.hidden = false;
    }
    elements.profiles.hidden = false;
  }

  elements.version.textContent = `Instrument ${globalThis.LAW_VERSION}`;
  const top = ranked.slice(0, 3);
  elements.summary.textContent = `Your most distinctive results are ${top.map(resultPhrase).join(", ").replace(/, ([^,]*)$/, ", and $1")}.`;
  top.forEach((entry) => elements.commitments.appendChild(commitmentCard(entry)));
  globalThis.LAW_AXES.forEach((axis) => elements.axes.appendChild(axisCard(axis)));

  const incomplete = globalThis.LAW_AXES.filter((axis) => coverage[axis.id] < 6);
  if (incomplete.length > 0) {
    const count = globalThis.LAW_AXES.reduce((sum, axis) => sum + coverage[axis.id], 0);
    elements.coverage.hidden = false;
    elements.coverage.textContent = `These scores use ${count} of 48 items because “not sure” responses are excluded. Axes with fewer answered items are less precise.`;
  }

  elements.copyLink.addEventListener("click", () => copyText(window.location.href, elements.copyLink, "Link copied"));
  elements.copySummary.addEventListener("click", () => copyText(plainTextSummary(), elements.copySummary, "Summary copied"));
  elements.print.addEventListener("click", () => window.print());
  elements.retake.addEventListener("click", () => {
    try {
      sessionStorage.removeItem(`lawvalues-quiz-${globalThis.LAW_VERSION}`);
      sessionStorage.removeItem(LATEST_KEY);
    } catch (_) {
      // Navigation still works without storage access.
    }
    window.location.assign("quiz.html");
  });

  enableDownload(loadLocalRecord());
  renderProfile();
  elements.content.hidden = false;
})();
