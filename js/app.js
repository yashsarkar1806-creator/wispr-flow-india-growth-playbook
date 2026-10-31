
import { CHANNELS, allocate, formatInr, illustrateOutcomes } from "./budget.js";

const $ = (id) => document.getElementById(id);

function renderControls() {
  const box = $("sliders");
  box.innerHTML = "";
  CHANNELS.forEach((ch) => {
    const label = document.createElement("label");
    label.innerHTML = `${ch.label} <span data-val="${ch.id}">${ch.defaultPct}%</span>
      <input type="range" min="0" max="60" value="${ch.defaultPct}" data-id="${ch.id}">`;
    box.appendChild(label);
  });
}

function currentWeights() {
  const weights = {};
  document.querySelectorAll("#sliders input[type=range]").forEach((el) => {
    weights[el.dataset.id] = Number(el.value);
    const span = document.querySelector(`[data-val="${el.dataset.id}"]`);
    if (span) span.textContent = `${el.value}%`;
  });
  return weights;
}

function renderBudget() {
  const total = Number($("budget-total").value || 0);
  const rows = allocate(total, currentWeights());
  const bar = $("bar");
  bar.innerHTML = rows.map((r) => `<span class="${r.colorClass}" style="width:${r.pct}%" title="${r.label}"></span>`).join("");
  const tbody = $("budget-rows");
  tbody.innerHTML = rows.map((r) => `<tr><td>${r.label}</td><td>${r.pct.toFixed(1)}%</td><td>${formatInr(r.amount)}</td></tr>`).join("");
  const out = illustrateOutcomes(total, rows);
  $("budget-note").textContent = `${out.note} At these illustrative unit costs: ~${out.creatorTouches.toLocaleString("en-IN")} creator-funnel touches and ~${out.paidExplorers.toLocaleString("en-IN")} paid explorers.`;
}

function init() {
  renderControls();
  $("sliders").addEventListener("input", renderBudget);
  $("budget-total").addEventListener("input", renderBudget);
  renderBudget();
}

init();
