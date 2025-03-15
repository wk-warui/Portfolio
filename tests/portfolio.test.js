const { test, expect } = require('@playwright/test');

// Test suite for portfolio
test.describe('Portfolio Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://kelvinwarui.com');
  });

  // Test navigation
  test('navigation works correctly', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible();
    await page.click('text=Portfolio');
    await expect(page).toHaveURL(/.*#portfolio/);
  });

  // Test contact form
  test('contact form submission', async ({ page }) => {
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#message', 'Test message');
    await page.click('button[type="submit"]');
    await expect(page.locator('.success-message')).toBeVisible();
  });

  // Test portfolio filters
  test('portfolio filters work', async ({ page }) => {
    await page.click('[data-filter="technical"]');
    await expect(page.locator('.portfolio-item[data-category="technical"]')).toBeVisible();
    await expect(page.locator('.portfolio-item[data-category="blog"]')).toBeHidden();
  });

  // Test responsive design
  test('responsive design', async ({ page }) => {
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.mobile-menu')).toBeVisible();

    // Desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('.desktop-menu')).toBeVisible();
  });
}); 