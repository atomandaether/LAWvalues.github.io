(function renderHome() {
  const grid = document.getElementById("home-axis-grid");
  const count = document.getElementById("question-count");
  count.textContent = String(globalThis.LAW_QUESTIONS.length);

  globalThis.LAW_AXES.forEach((axis) => {
    const card = document.createElement("article");
    card.className = "home-axis-card";
    card.style.setProperty("--left", axis.leftColor);
    card.style.setProperty("--right", axis.rightColor);
    card.innerHTML = `
      <span class="eyebrow">${axis.name}</span>
      <h3><span>${axis.left}</span><span class="axis-divider">↔</span><span>${axis.right}</span></h3>
      <p>${axis.question}</p>
    `;
    grid.appendChild(card);
  });
})();
