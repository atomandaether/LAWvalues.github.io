(function renderMethodology() {
  "use strict";

  const axisGrid = document.getElementById("method-axis-grid");
  const itemBank = document.getElementById("item-bank");
  const bibliography = document.getElementById("bibliography");

  globalThis.LAW_AXES.forEach((axis) => {
    const items = globalThis.LAW_QUESTIONS.filter((question) => question.axis === axis.id);
    const positive = items.filter((question) => question.key === 1).length;
    const negative = items.filter((question) => question.key === -1).length;
    const card = document.createElement("article");
    card.className = "method-axis-card";
    card.style.setProperty("--left", axis.leftColor);
    card.style.setProperty("--right", axis.rightColor);
    card.innerHTML = `
      <span class="eyebrow">${axis.name}</span>
      <h3>${axis.left} ↔ ${axis.right}</h3>
      <p>${axis.question}</p>
      <span class="item-count">${items.length} items · ${positive}/${negative} balanced keying</span>
    `;
    axisGrid.appendChild(card);

    const details = document.createElement("details");
    details.className = "item-bank-axis";
    const summary = document.createElement("summary");
    summary.textContent = `${axis.name}: ${axis.left} ↔ ${axis.right}`;
    details.appendChild(summary);
    const list = document.createElement("ol");
    items.forEach((item) => {
      const li = document.createElement("li");
      const prompt = document.createElement("p");
      prompt.textContent = item.prompt;
      const sources = document.createElement("p");
      sources.className = "item-sources";
      sources.append("Grounding: ");
      item.sourceIds.forEach((sourceId, index) => {
        const source = globalThis.LAW_SOURCES[sourceId];
        const link = document.createElement("a");
        link.href = source.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = source.citation.split(",")[0];
        sources.appendChild(link);
        if (index < item.sourceIds.length - 1) sources.append("; ");
      });
      li.append(prompt, sources);
      list.appendChild(li);
    });
    details.appendChild(list);
    itemBank.appendChild(details);
  });

  Object.values(globalThis.LAW_SOURCES)
    .sort((a, b) => a.citation.localeCompare(b.citation))
    .forEach((source) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = source.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = source.citation;
      li.appendChild(link);
      bibliography.appendChild(li);
    });
})();
