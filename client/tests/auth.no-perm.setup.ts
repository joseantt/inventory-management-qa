import { test as setup, expect } from '@playwright/test';
import path from 'path';

const noPermFile = path.join(__dirname, '../playwright/.auth/user-no-perm.json');

setup('authenticate as user without permission', async ({ page }) => {
  await page.goto(
    'http://localhost:7080/realms/inventory-realm/protocol/openid-connect/auth?client_id=inventory-frontend&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&state=f0bf7df6-303e-4398-af50-0b6a566cba77&response_mode=fragment&response_type=code&scope=openid&nonce=8fc417cb-f39f-4e11-ab78-e45217d6a7df&code_challenge=jM6XGojdokuccskDzkeDM0R3sYRGtjIvntofAr48LwU&code_challenge_method=S256'
  );

  await page.fill('input#username', process.env.KEYCLOAK_USER_NO_ROLE ?? "user")
  await page.fill('input#password', process.env.KEYCLOAK_PASSWORD_NO_ROLE ?? "password");

  await page.click('button[type="submit"]');
  await page.waitForURL('http://localhost:3000/');

  await expect(page.locator('button:has-text("Welcome")')).toBeVisible();

  await page.context().storageState({ path: noPermFile, indexedDB: true });
});