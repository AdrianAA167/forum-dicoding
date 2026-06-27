/**
 * Skenario Pengujian End-to-End: Alur Login
 *
 * 1. Login berhasil dengan kredensial valid
 *    - User membuka halaman login
 *    - User mengisi email dan password yang benar
 *    - User mengklik tombol login
 *    - Sistem menampilkan halaman home (berhasil login)
 *
 * 2. Login gagal dengan kredensial tidak valid
 *    - User membuka halaman login
 *    - User mengisi email dan password yang salah
 *    - User mengklik tombol login
 *    - Sistem menampilkan pesan error toast
 *
 * 3. Halaman login menampilkan elemen form yang lengkap
 *    - Input email, password, dan tombol submit tersedia
 *
 * 4. Navigasi ke halaman register dari halaman login
 *    - User mengklik link "Daftar di sini" dan diarahkan ke halaman register
 */

import { test, expect } from '@playwright/test';

// Ganti dengan akun valid kamu di https://forum-api.dicoding.dev
const VALID_EMAIL = process.env.TEST_EMAIL || 'zaa@gmail.com';
const VALID_PASSWORD = process.env.TEST_PASSWORD || '123456';

test.describe('Alur Login Aplikasi Forum Diskusi', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL(/.*login/);
  });

  test('harus berhasil login dengan kredensial yang valid dan diarahkan ke halaman utama', async ({ page }) => {
    await page.waitForLoadState('networkidle'); // tambahkan ini
    await page.fill('input[type="email"]', VALID_EMAIL);
    await page.fill('input[type="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');

    await page.waitForURL((url) => !url.toString().includes('/login'), {
      timeout: 30000, // tambah timeout
    });

    expect(page.url()).not.toContain('/login');
    await expect(page.locator('nav.navbar')).toBeVisible({ timeout: 10000 });
  });

  test('harus menampilkan pesan error saat login dengan kredensial yang salah', async ({ page }) => {
    await page.fill('input[type="email"]', 'emailsalah@example.com');
    await page.fill('input[type="password"]', 'passwordsalah123');
    await page.click('button[type="submit"]');

    // Tunggu toast error muncul
    await expect(
      page.locator('.Toastify__toast--error, [class*="toast"][class*="error"]'),
    ).toBeVisible({ timeout: 8000 });

    // Pastikan tetap di halaman login
    expect(page.url()).toContain('/login');
  });

  test('harus menampilkan elemen form login yang lengkap', async ({ page }) => {
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('harus bisa navigasi ke halaman register dari halaman login', async ({ page }) => {
    // Pakai link "Daftar di sini" yang ada di bawah form (lebih spesifik)
    const registerLink = page.locator('a[href="/register"]:has-text("Daftar di sini")');
    await expect(registerLink).toBeVisible();
    await registerLink.click();

    await expect(page).toHaveURL(/.*register/);
  });
});
