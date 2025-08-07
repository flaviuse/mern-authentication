import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("Mern authentication", () => {
  test("should load homepage and navigate to login", async ({ page }) => {
    const anchor = page.locator('[data-test-id="homepage-anchor"]');
    await expect(anchor).toBeVisible();

    await page.getByRole("link", { name: "Login" }).click();

    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });
});
