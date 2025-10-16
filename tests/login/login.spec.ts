
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { credentials } from '../../utils/env';

test.describe('Login Tests', () => {

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(credentials.username,credentials.password);
    // Extra check after login
    await expect(page).toHaveURL(/\/welcome$/);
    await expect(page.getByRole('alert')).toContainText("You're now logged as");
  });


   test('should fail when login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(credentials.inactive_username,credentials.inactive_password);
    await expect(page.locator('//span[@id="warning"]')).toBeVisible();
  });


  test('should fail with invalid email and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    // Ici on override volontairement les bons credentials
    await loginPage.login('wrong@email.com', 'wrongpassword');
    // Vérifier le message d'erreur
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toContainText('Wrong Email or Password');
  });

});
