
/** Interactive channel budget planner — illustrative only. */
export const CHANNELS = [
  { id: "creators", label: "Creators / influencers", defaultPct: 30, colorClass: "c1" },
  { id: "campus", label: "Campus & community", defaultPct: 15, colorClass: "c2" },
  { id: "partnerships", label: "Partnerships / distribution", defaultPct: 20, colorClass: "c3" },
  { id: "paid", label: "Paid social & search", defaultPct: 25, colorClass: "c4" },
  { id: "events", label: "Offline / city pods", defaultPct: 10, colorClass: "c5" },
];

export function allocate(totalInr, weights) {
  const sum = Object.values(weights).reduce((a, b) => a + Number(b || 0), 0) || 1;
  const rows = CHANNELS.map((ch) => {
    const pct = (Number(weights[ch.id] || 0) / sum) * 100;
    const amount = Math.round((totalInr * pct) / 100);
    return { ...ch, pct, amount };
  });
  return rows;
}

export function formatInr(n) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

/** Rough illustrative outputs — not forecasts. */
export function illustrateOutcomes(totalInr, rows) {
  const creators = rows.find((r) => r.id === "creators")?.amount || 0;
  const paid = rows.find((r) => r.id === "paid")?.amount || 0;
  // Purely illustrative unit assumptions for planning conversation
  const assumedCpe = 8; // INR per engaged install conversation starter — ILLUSTRATIVE
  const assumedCacExplore = 120; // ILLUSTRATIVE exploration CAC
  return {
    creatorTouches: Math.round(creators / assumedCpe),
    paidExplorers: Math.round(paid / assumedCacExplore),
    note: "Outputs use illustrative unit costs for workshopping, not Wispr Flow actuals.",
  };
}
