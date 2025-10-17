import { test, expect } from "@playwright/test";

test.describe("Add User Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.click('[data-testid="add-user-btn"]');
  });

  test("Form inputs are visible", async ({ page }) => {
    await expect(page.locator("#first-name-input")).toBeVisible();
    await expect(page.locator("#last-name-input")).toBeVisible();
    await expect(page.locator("#age-input")).toBeVisible();
    await expect(page.locator("#country-select")).toBeVisible();
    await expect(page.locator('[data-testid="submit-btn"]')).toBeVisible();
    await expect(page.locator('[data-testid="cancel-btn"]')).toBeVisible();
  });

  test("Can fill form and submit", async ({ page }) => {
    await page.fill("#first-name-input", "John");
    await page.fill("#last-name-input", "Miller");
    await page.fill("#age-input", "25");
    await page.selectOption("#country-select", "USA");

    await expect(page.locator('[data-testid="submit-btn"]')).toBeEnabled();

    await page.click('[data-testid="submit-btn"]');

    await expect(page.locator('[data-testid="modal-title"]')).toHaveCount(0);

    await expect(page.locator("table")).toContainText("John");
    await expect(page.locator("table")).toContainText("Miller");
    await expect(page.locator("table")).toContainText("25");
    await expect(page.locator("table")).toContainText("USA");
  });

  test("Cancel button closes form", async ({ page }) => {
    await page.click('[data-testid="cancel-btn"]');
    await expect(page.locator('[data-testid="modal-title"]')).toHaveCount(0);
  });
});

test.describe("Edit User Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.click('[data-testid="edit-user-btn-1"]');
  });

  test("Form inputs are visible and properly filled", async ({ page }) => {
    await expect(page.locator("#country-select")).toHaveValue("USA");
    await expect(page.locator("#first-name-input")).toHaveValue("Eric");
    await expect(page.locator("#last-name-input")).toHaveValue("Smith");
    await expect(page.locator("#age-input")).toHaveValue("35");
    await expect(page.locator('[data-testid="submit-btn"]')).toBeVisible();
    await expect(page.locator('[data-testid="cancel-btn"]')).toBeVisible();
  });

  test("Can edit existing user and table updates", async ({ page }) => {
    await page.fill("#first-name-input", "John");
    await page.fill("#last-name-input", "Miller");
    await page.fill("#age-input", "25");
    await page.selectOption("#country-select", "USA");

    await page.click('[data-testid="submit-btn"]');

    const firstRow = page.locator("table tbody tr").first();
    await expect(firstRow).toContainText("John");
    await expect(firstRow).toContainText("Miller");
    await expect(firstRow).toContainText("25");
    await expect(firstRow).toContainText("USA");
  });

  test("Cancel button closes form", async ({ page }) => {
    await page.click('[data-testid="cancel-btn"]');
    await expect(page.locator('[data-testid="modal-title"]')).toHaveCount(0);
  });
});
