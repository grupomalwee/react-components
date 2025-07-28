import { test, expect } from '@playwright/test';

test('Sonner', async ({ page }) => {
  await page.goto('http://localhost:5173/sonner'); 

  await page.getByRole('button', { name: 'Sucesso' }).click();

  await expect(page.getByText('Operação concluída com sucesso!')).toBeVisible();
});