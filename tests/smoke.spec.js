import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.roster')).toBeVisible();
  await expect(page.locator('.ticker')).toBeVisible();
});

test('work sections are present', async ({ page }) => {
  await page.goto('/');
  const sections = page.locator('[data-work-section]');
  await expect(sections.first()).toBeVisible();
});

test('click opens bandeau', async ({ page }) => {
  await page.goto('/');
  const trigger = page.locator('[data-work-trigger]').first();
  await trigger.click();
  await expect(page.locator('.work-section.is-open').first()).toBeVisible();
});

test('contact page loads', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('.contact-page')).toBeVisible();
});

test('404 page loads', async ({ page }) => {
  await page.goto('/404');
  await expect(page.locator('.page-404')).toBeVisible();
});

test('talent pages exist', async ({ page }) => {
  await page.goto('/talents/sophie-marchand');
  await expect(page.locator('.talent-page')).toBeVisible();
});

test('film pages exist', async ({ page }) => {
  await page.goto('/talents/sophie-marchand/brumes-du-soir');
  await expect(page.locator('.project-page')).toBeVisible();
});

test('dark mode toggle', async ({ page }) => {
  await page.goto('/');
  // Default is dark, click to switch to light
  const toggle = page.locator('[data-theme-toggle]').first();
  await toggle.click();
  await expect(page.locator('html.light')).toBeVisible();
  await toggle.click();
  await expect(page.locator('html.light')).not.toBeVisible();
});

test('a-propos page loads', async ({ page }) => {
  await page.goto('/a-propos');
  await expect(page.locator('.about-page')).toBeVisible();
});
