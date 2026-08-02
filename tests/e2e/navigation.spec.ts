import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/about',
  '/ecosystem',
  '/contact',
  '/admin/login'
];

test.describe('Iron Shield Certification Suite', () => {
  for (const route of routes) {
    test(`Route ${route} should load correctly and capture screenshot`, async ({ page }) => {
      // Capture any unhandled exceptions in browser
      page.on('pageerror', exception => {
        expect(exception).toBeNull();
      });

      const response = await page.goto(route, { waitUntil: 'networkidle' });

      // Ensure the page didn't throw a 404 or 500
      expect(response?.status()).toBe(200);

      // Verify the KCG Branding Title
      await expect(page).toHaveTitle("Koffmann Capital Group | Building Africa's Sovereign Future");

      // Wait for React to render at least one div
      await page.waitForSelector('div');

      // Verify no blank screen by checking body element size
      // The body height might be reported as 0 by playwright before hydration on our specific CSS structure. Let's check #root instead.
      const rootBox = await page.locator('#root').boundingBox();
      expect(rootBox).not.toBeNull();
      expect(rootBox!.height).toBeGreaterThan(0);
      expect(rootBox!.width).toBeGreaterThan(0);

      // Save screenshot as deployment evidence
      await page.screenshot({ path: `docs/certifications/screenshot_${route.replace(/\//g, '_') || 'home'}.png`, fullPage: true });
    });
  }
});
