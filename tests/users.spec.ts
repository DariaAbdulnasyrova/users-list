import { test, expect } from "@playwright/test";

test.describe("Users", async () => {
  test("Users page is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("text=Users")).toBeVisible();
    await expect(page.locator('[data-testid="add-user-btn"]')).toBeVisible();
  });

  test("Users table is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("text=Eric")).toBeVisible();
    await expect(page.locator("text=Kate")).toBeVisible();
    await expect(page.locator("text=Nick")).toBeVisible();

    await expect(page.locator('[data-testid="edit-user-btn-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="edit-user-btn-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="edit-user-btn-3"]')).toBeVisible();
  });

  test("Add user Modal is visible", async ({ page }) => {
    await page.goto("/");
    await page.click('[data-testid="add-user-btn"]');

    const modalTitle = page.locator('[data-testid="modal-title"]');

    await expect(modalTitle).toBeVisible();
    await expect(modalTitle).toHaveText('Add User');

    await expect(page.locator("form")).toBeVisible();
  });

  test("Edit user Modal is visible", async ({ page }) => {
    await page.goto("/");
    await page.click('[data-testid="edit-user-btn-1"]');

    const modalTitle = page.locator('[data-testid="modal-title"]');

    await expect(modalTitle).toBeVisible();
    await expect(modalTitle).toHaveText('Edit User');
    await expect(page.locator("form")).toBeVisible();
  });
});
