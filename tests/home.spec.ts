import { test, expect } from '@playwright/test';

test('Home', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await expect(page.getByRole('heading', { name: /Bem-vindo ao/i })).toBeVisible();

});