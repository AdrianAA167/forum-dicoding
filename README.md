# Forum Diskusi App

Aplikasi forum diskusi berbasis React dengan fitur lengkap termasuk autentikasi, voting, komentar, dan leaderboard.

## 🚀 Live Demo

**URL Vercel:** _(Isi dengan URL Vercel kamu setelah deploy, contoh: https://forum-diskusi-app.vercel.app)_

## ✨ Fitur

- Autentikasi (Login & Register)
- Daftar Thread & Detail Thread
- Buat Thread Baru
- Sistem Voting (Up/Down Vote) pada Thread dan Komentar
- Komentar pada Thread
- Filter Thread berdasarkan Kategori
- Leaderboard pengguna

## 🛠️ Tech Stack

- **React 18** - UI Library
- **Redux Toolkit** - State Management
- **React Router DOM** - Client-side Routing
- **date-fns** - Date formatting (React Ecosystem)
- **react-toastify** - Notifikasi
- **react-markdown** - Render markdown pada konten thread
- **Axios** - HTTP Client

## 🧪 Testing

### Unit & Integration Tests
```bash
npm test
```

### End-to-End Tests
```bash
npm run e2e
```

## 📦 Instalasi

```bash
npm install
npm run dev
```

## 🔧 CI/CD

- **Continuous Integration:** GitHub Actions (`.github/workflows/ci.yml`)
- **Continuous Deployment:** Vercel

### Setup E2E di GitHub Actions

Tambahkan secrets berikut di GitHub repository:
- `TEST_EMAIL` - Email akun forum untuk testing
- `TEST_PASSWORD` - Password akun forum untuk testing

## 📸 Screenshots CI/CD

Lihat folder `screenshots/` untuk bukti implementasi CI/CD:
- `1_ci_check_error.png` - CI check error saat test gagal
- `2_ci_check_pass.png` - CI check pass saat semua test lolos
- `3_branch_protection.png` - Branch protection aktif pada PR
