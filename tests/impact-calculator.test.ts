import { describe, expect, it } from "vitest";

import { calculateImpact } from "@/components/impact-calculator";

describe("calculateImpact", () => {
  it("calcule le trafic et le volume évité sur douze mois", () => {
    expect(calculateImpact(25_000, 2.4, 50)).toEqual({
      monthlyGb: 58.59375,
      savedMonthlyGb: 29.296875,
      savedAnnualGb: 351.5625,
    });
  });

  it("retourne zéro donnée évitée pour un objectif nul", () => {
    expect(calculateImpact(1_000, 1, 0).savedAnnualGb).toBe(0);
  });
});
