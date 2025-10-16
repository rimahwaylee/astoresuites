import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage';
import { credentials } from '../../utils/env';

test.describe('Mot de passe oublié', () => {
  let forgotPassword: ForgotPasswordPage;

  test.beforeEach(async ({ page }) => {
    forgotPassword = new ForgotPasswordPage(page);
    await forgotPassword.goto();
  });

  test('email valide - lien envoyé', async ({ page }) => {
    await forgotPassword.resetPassword(credentials.username);
    await expect(page.locator('#success')).toBeVisible();
    await expect(page.locator('#success')).toHaveText(
    'An email with a link to reset your password has been sent.'
  );
  });


  test('email non actif - avertissement affiché', async ({ page }) => {
    await forgotPassword.resetPassword(credentials.inactive_username);
    await expect(page.locator('#warning')).toContainText('Your account has been deactivated');
  });

  test('email erroné ou inexistant - erreur affichée', async ({ page }) => {
    await forgotPassword.resetPassword('adresse@inconnue.com');
   await expect(page.locator('#warning')).toContainText('No user is registered with this email');
  });


  test('mdp non identique - message d’erreur cohérent', async ({ page }) => {
    await forgotPassword.gotoResetLink();
    await forgotPassword.fillNewPassword('Test1234!', 'Test12345!');
    await expect(page.locator('//span[contains(text(),"non identiques")]')).toBeVisible();
  });

});
