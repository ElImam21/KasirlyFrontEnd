# Kasirly Frontend

> Platform kasir digital all-in-one untuk mengelola transaksi, stok, dan laporan laba secara real-time.

🌐 **Live:** [kasirly.vercel.app](https://kasirly.vercel.app)

---

## Tentang Proyek

Kasirly adalah aplikasi kasir berbasis web yang dirancang untuk membantu pemilik toko mengelola bisnis mereka secara lebih efisien. Dengan tampilan yang bersih dan modern, Kasirly menyediakan fitur kasir digital, manajemen stok, hingga laporan keuangan emuanya dalam satu platform.

---

## Fitur Utama

- **Kasir Digital** — Transaksi cepat, akurat, dan tanpa batas
- **Manajemen Stok Real-time** — Notifikasi otomatis saat stok habis
- **Laporan Laba & Rugi** — Dashboard harian yang mudah dipahami
- **Export PDF** — Unduh laporan keuangan kapan saja
- **Autentikasi Lengkap** — Login/Register via Email, Google, atau Facebook

---

## Tech Stack

| Teknologi | Versi |
|---|---|
| [Next.js](https://nextjs.org) | 16.2.0 |
| [React](https://react.dev) | 19.2.4 |
| [TypeScript](https://www.typescriptlang.org) | ^5 |
| [Tailwind CSS](https://tailwindcss.com) | ^4 |

---

## Struktur Proyek

```
kasirly-frontend/
├── app/           # Halaman & routing (Next.js App Router)
├── components/    # Komponen UI yang dapat digunakan ulang
├── public/        # Aset statis (gambar, logo, dll)
├── next.config.ts
├── tailwind.config
└── tsconfig.json
```

---

## Memulai (Development)

### Prasyarat

- Node.js >= 18
- npm / yarn / pnpm / bun

### Instalasi

```bash
# Clone repository
git clone https://github.com/ElImam21/KasirlyFrontEnd.git
cd KasirlyFrontEnd

# Install dependencies
npm install
```

### Menjalankan Dev Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

### Build untuk Production

```bash
npm run build
npm run start
```

---

## Scripts

| Script | Fungsi |
|---|---|
| `npm run dev` | Menjalankan development server |
| `npm run build` | Build untuk production |
| `npm run start` | Menjalankan production server |
| `npm run lint` | Menjalankan ESLint |

---

## Deploy

Proyek ini di-deploy menggunakan **[Vercel](https://vercel.com)**. Setiap push ke branch `main` akan otomatis ter-deploy ke [kasirly.vercel.app](https://kasirly.vercel.app).

---

## Lisensi

Private — Hak cipta © 2026 Hakimi Junior. Semua hak dilindungi.
