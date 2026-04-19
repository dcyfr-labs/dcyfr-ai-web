import { test, expect } from '@playwright/test';

/**
 * Visual regression baseline per
 * openspec/changes/dcyfr-skeleton-sites-scaffolding/spec.md#51-screenshot-baseline
 *
 * dcyfr-ai-web is the AI platform site — futuristic, neon-teal, dark-default.
 * Unblocked 2026-04-18 when openspec/changes/dcyfr-ai-web-cascade-resolution
 * retired the vendored @dcyfr/design-system and activated theme-dcyfr-ai-web.
 *
 * Two views covered:
 * - `/` home (hero + feature grid)
 * - `/login` (pre-auth surface — primary interior route)
 *
 * Both at desktop (1440×900) and mobile (375×812). Motion paused.
 */

const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 375, height: 812, name: 'mobile' },
] as const;

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/login', name: 'login' },
] as const;

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    test(`${route.name} @ ${vp.name}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      await expect(page).toHaveScreenshot(`${route.name}-${vp.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
        animations: 'disabled',
      });
    });
  }
}
