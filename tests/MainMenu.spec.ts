import { test, expect } from '@playwright/test';
import { MainMenuPage } from '../pageObjects/MainMenuPage';

let mainMenu: MainMenuPage;

test.beforeEach(async ({ page, context }) => {
  // Load storage state from file (if exists)
  try {
    await context.storageState({ path: 'state.json' });
  } catch (e) {
    console.warn('No existing storage state found. Proceeding with a fresh session.');
  }

  // Initialize the Page Object
  mainMenu = new MainMenuPage(page);
  await page.goto('/');
});

test.describe('Main Menu Verification', () => {

  test('T-shirts link should be visible in sub-menu', async () => {
    await mainMenu.hoverOverWomenMenu();
    await expect(mainMenu.tshirtsLink).toBeVisible();
  });

  test('Tops link should be visible', async () => {
    await mainMenu.hoverOverWomenMenu();
    await expect(mainMenu.topsLink).toBeVisible();
  });

  test('Blouses link should be visible', async () => {
    await mainMenu.hoverOverWomenMenu();
    await expect(mainMenu.blousesLink).toBeVisible();
  });

  test('Dresses link should be visible', async () => {
    await mainMenu.hoverOverWomenMenu();
    await expect(mainMenu.dressesLink).toBeVisible();
  });

  test('Casual Dresses link should be visible', async () => {
    await mainMenu.hoverOverWomenMenu();
    await expect(mainMenu.casualDressesLink).toBeVisible();
  });

  test('Evening Dresses link should be visible', async () => {
    await mainMenu.hoverOverWomenMenu();
    await expect(mainMenu.eveningDressesLink).toBeVisible();
  });

  test('Summer Dresses link should be visible', async () => {
    await mainMenu.hoverOverWomenMenu();
    await expect(mainMenu.summerDressesLink).toBeVisible();
  });

  test('Main T-shirts link should be visible', async () => {
    await expect(mainMenu.tshirtsMainLink).toBeVisible();
  });

  test('Blog link should be visible', async () => {
    await expect(mainMenu.blogLink).toBeVisible();
  });

});
