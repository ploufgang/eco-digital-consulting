import { expect, test } from "@playwright/test";

test("navigation principale et appel à l’action", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Un numérique plus sobre");
  await page.getByRole("link", { name: "Découvrir nos expertises" }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Transformer vos impacts");
});

test("calculateur et formulaire de réservation", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Pages vues par mois").fill("10000");
  await expect(page.getByText(/Go \/ an/)).toBeVisible();
  await page.goto("/reserver");
  await expect(page.getByRole("heading", { name: "Faisons connaissance." })).toBeVisible();
  await page.getByRole("button", { name: /continuer/i }).click();
  await expect(page.getByText("Indiquez votre nom")).toBeVisible();
});
