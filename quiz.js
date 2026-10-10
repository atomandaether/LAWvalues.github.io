(function runQuiz() {
  "use strict";

  const STORAGE_KEY = `lawvalues-quiz-${globalThis.LAW_VERSION}`;
  const LATEST_KEY = `lawvalues-latest-${globalThis.LAW_VERSION}`;
  const values = [-3, -2, -1, 0, 1, 2, 3];
  const labels = [
    "Strongly disagree",
    "Disagree",
    "Slightly disagree",
    "Neither agree nor disagree",
    "Slightly agree",
    "Agree",
    "Strongly agree"
  ];

  const elements = {
    number: document.getElementById("question-number"),
    prompt: document.getElementById("question-text"),
    progress: document.getElementById("quiz-progress"),
    back: document.getElementById("back-button"),
    restart: document.getElementById("restart-button"),
    responseGrid: document.getElementById("response-grid"),
    skip: document.getElementById("skip-button"),
    saved: document.getElementById("saved-note")
  };

  function randomSeed() {
    if (globalThis.crypto?.getRandomValues) {
      const data = new Uint32Array(1);
      globalThis.crypto.getRandomValues(data);
      return data[0];
    }
    return Math.floor(Math.random() * 0xffffffff);
  }

  function mulberry32(seed) {
    return function random() {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffled(items, random) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function buildInterleavedOrder(seed) {
    const random = mulberry32(seed);
    const buckets = Object.fromEntries(
      globalThis.LAW_AXES.map((axis) => [
        axis.id,
        shuffled(
          globalThis.LAW_QUESTIONS.filter((question) => question.axis === axis.id),
          random
        )
      ])
    );
    const rounds = Math.max(...Object.values(buckets).map((bucket) => bucket.length));
    const order = [];

    for (let round = 0; round < rounds; round += 1) {
      const axesThisRound = shuffled(globalThis.LAW_AXES.map((axis) => axis.id), random);
      axesThisRound.forEach((axisId) => {
        if (buckets[axisId][round]) order.push(buckets[axisId][round].id);
      });
    }
    return order;
  }

  function freshState() {
    const seed = randomSeed();
    return {
      version: globalThis.LAW_VERSION,
      seed,
      order: buildInterleavedOrder(seed),
      index: 0,
      responses: {},
      startedAt: new Date().toISOString()
    };
  }

  function loadState() {
    try {
      const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
      const validIds = new Set(globalThis.LAW_QUESTIONS.map((question) => question.id));
      const valid =
        stored?.version === globalThis.LAW_VERSION &&
        Array.isArray(stored.order) &&
        stored.order.length === globalThis.LAW_QUESTIONS.length &&
        stored.order.every((id) => validIds.has(id)) &&
        Number.isInteger(stored.index) &&
        stored.index >= 0 &&
        stored.index < stored.order.length;
      if (valid) return stored;
    } catch (_) {
      // A malformed or blocked session store simply starts a new quiz.
    }
    return freshState();
  }

  let state = loadState();
  const questionById = Object.fromEntries(
    globalThis.LAW_QUESTIONS.map((question) => [question.id, question])
  );

  function saveState() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      elements.saved.textContent = "Progress saved in this tab";
    } catch (_) {
      elements.saved.textContent = "Progress is not being stored";
    }
  }

  function currentQuestion() {
    return questionById[state.order[state.index]];
  }

  function responseIsSet(questionId) {
    return Object.prototype.hasOwnProperty.call(state.responses, questionId);
  }

  function renderResponseButtons() {
    elements.responseGrid.replaceChildren();
    values.forEach((value, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "response-button";
      button.dataset.value = String(value);
      button.setAttribute("aria-keyshortcuts", String(index + 1));
      button.innerHTML = `<span class="response-key">${index + 1}</span><span>${labels[index]}</span>`;
      button.addEventListener("click", () => answer(value));
      elements.responseGrid.appendChild(button);
    });
  }

  function render() {
    const question = currentQuestion();
    const total = state.order.length;
    const completed = state.index;

    elements.number.textContent = `Question ${state.index + 1} of ${total}`;
    elements.prompt.textContent = question.prompt;
    elements.progress.style.width = `${(completed / total) * 100}%`;
    elements.progress.parentElement.setAttribute("aria-valuenow", String(completed));
    elements.progress.parentElement.setAttribute("aria-valuemax", String(total));
    elements.back.disabled = state.index === 0;

    document.querySelectorAll(".response-button").forEach((button) => {
      const selected =
        responseIsSet(question.id) &&
        state.responses[question.id] !== null &&
        Number(button.dataset.value) === Number(state.responses[question.id]);
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });

    const skipped = responseIsSet(question.id) && state.responses[question.id] === null;
    elements.skip.classList.toggle("selected", skipped);
    elements.skip.setAttribute("aria-pressed", skipped ? "true" : "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
    saveState();
  }

  function answer(value) {
    const question = currentQuestion();
    state.responses[question.id] = value;
    if (state.index === state.order.length - 1) {
      finish();
      return;
    }
    state.index += 1;
    render();
  }

  function goBack() {
    if (state.index === 0) return;
    state.index -= 1;
    render();
  }

  function restart() {
    const confirmed = window.confirm("Restart the quiz and erase the answers saved in this tab?");
    if (!confirmed) return;
    state = freshState();
    saveState();
    render();
  }

  function finish() {
    const scored = globalThis.LAW_SCORING.scoreAll(state.responses);
    const params = new URLSearchParams({ v: globalThis.LAW_VERSION });
    globalThis.LAW_AXES.forEach((axis) => {
      params.set(axis.id, String(scored[axis.id].score));
    });
    params.set(
      "n",
      globalThis.LAW_AXES.map((axis) => scored[axis.id].answered).join("")
    );

    const latest = {
      version: globalThis.LAW_VERSION,
      scores: Object.fromEntries(
        globalThis.LAW_AXES.map((axis) => [axis.id, scored[axis.id].score])
      ),
      coverage: Object.fromEntries(
        globalThis.LAW_AXES.map((axis) => [axis.id, scored[axis.id].answered])
      ),
      strength: Object.fromEntries(
        globalThis.LAW_AXES.map((axis) => [axis.id, scored[axis.id].strength])
      ),
      responses: state.responses,
      order: state.order,
      completedAt: new Date().toISOString()
    };

    try {
      sessionStorage.setItem(LATEST_KEY, JSON.stringify(latest));
    } catch (_) {
      // The shareable score URL still works without local storage.
    }
    window.location.assign(`results.html?${params.toString()}`);
  }

  renderResponseButtons();
  elements.skip.addEventListener("click", () => answer(null));
  elements.back.addEventListener("click", goBack);
  elements.restart.addEventListener("click", restart);
  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const number = Number(event.key);
    if (number >= 1 && number <= 7) answer(values[number - 1]);
    if (event.key === "ArrowLeft") goBack();
  });
  render();
})();
