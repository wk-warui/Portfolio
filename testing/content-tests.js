const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

// Content testing suite
const contentTests = {
    // SEO tests
    seoTests: test('SEO requirements', async ({ page }) => {
        await page.goto('/');
        
        // Meta tags verification
        const title = await page.title();
        expect(title.length).toBeLessThan(60);
        
        const description = await page.$eval(
            'meta[name="description"]',
            el => el.content
        );
        expect(description.length).toBeLessThan(160);
        
        // Headers structure
        const h1Count = await page.$$eval('h1', els => els.length);
        expect(h1Count).toBe(1);
        
        // Image alt texts
        const images = await page.$$eval('img', imgs => 
            imgs.every(img => img.alt)
        );
        expect(images).toBe(true);
    }),

    // Accessibility tests
    accessibilityTests: test('Accessibility standards', async ({ page }) => {
        await page.goto('/');
        
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toHaveLength(0);
    }),

    // Content quality tests
    contentQualityTests: test('Content quality checks', async ({ page }) => {
        await page.goto('/');
        
        // Readability check
        const content = await page.$eval('main', el => el.textContent);
        const readabilityScore = calculateReadabilityScore(content);
        expect(readabilityScore).toBeGreaterThan(60);
        
        // Link validation
        const brokenLinks = await checkBrokenLinks(page);
        expect(brokenLinks).toHaveLength(0);
    })
};

module.exports = contentTests;