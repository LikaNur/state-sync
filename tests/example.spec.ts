import { test, expect } from "@playwright/test";

test.describe("React sync state challenge", () => {
  test("allows switching views and preserves custom row edits", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /table mode/i }).click();

    const row2Headline = page.getByPlaceholder("Enter headline...").nth(1);
    await row2Headline.fill("Audiobooks made easy");

    await page.getByRole("button", { name: /gallery mode/i }).click();
    await page.getByRole("button", { name: /table mode/i }).click();

    await expect(row2Headline).toHaveValue("Audiobooks made easy");
  });

  test("edits in Gallery sync to Table (non-customized rows)", async ({
    page,
  }) => {
    await page.goto("/");

    const galleryHeadline = page.getByLabel("Headline");
    await galleryHeadline.fill("Shared headline update");

    await page.getByRole("button", { name: /table mode/i }).click();

    const row1Headline = page.getByPlaceholder("Enter headline...").first();
    await expect(row1Headline).toHaveValue("Shared headline update");
  });
});
