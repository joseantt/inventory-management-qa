import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
		await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle');
  });

	test('should have a title', async ({ page }) => {
		await page.waitForSelector('h2');

		const title = await page.title();
		expect(title).toBe('Fuji Inventory');
	});

	test('should display the hero section with illustration', async ({
		page,
	}) => {
		const heroSection = await page.locator('#productinspection');
		await expect(heroSection).toBeVisible();
	});

	test('should display the main heading', async ({ page }) => {
		const heading = await page.locator('h2');
		await expect(heading).toHaveText('Manage inventory made easy');
	});

	test('should display the subheading', async ({ page }) => {
		const subheading = await page.locator('p.chakra-text').first();

		await expect(subheading).toContainText(
			'An inventory management system that helps you keep track of your products',
		);
	});
});

test.describe('Homepage - authenticated with permission', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('should display Go to Inventory button for authenticated users with permission', async ({ page }) => {
    const button = page.locator('button:has-text("Go to Inventory")');
    await expect(button).toBeVisible();
  });
});

test.describe('Homepage - authenticated without permission', () => {
  test.use({ storageState: 'playwright/.auth/user-no-perm.json' });

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('should display Welcome button for authenticated users without permission', async ({ page }) => {
    const button = page.locator('button:has-text("Welcome")');
    await expect(button).toBeVisible();
  });
});