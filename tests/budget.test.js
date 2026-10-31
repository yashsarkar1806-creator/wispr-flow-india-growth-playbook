
import test from "node:test";
import assert from "node:assert/strict";
import { allocate, formatInr, CHANNELS } from "../js/budget.js";

test("allocate respects relative weights", () => {
  const rows = allocate(100000, { creators: 50, campus: 0, partnerships: 0, paid: 50, events: 0 });
  const creators = rows.find((r) => r.id === "creators");
  const paid = rows.find((r) => r.id === "paid");
  assert.equal(creators.amount, 50000);
  assert.equal(paid.amount, 50000);
});

test("allocate handles zero sum safely", () => {
  const rows = allocate(1000, { creators: 0, campus: 0, partnerships: 0, paid: 0, events: 0 });
  assert.equal(rows.length, CHANNELS.length);
});

test("formatInr returns Indian rupee string", () => {
  assert.match(formatInr(1500), /₹|INR|1,500|1500/);
});
