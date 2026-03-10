# 🖤 Love Website — Untuk Andher Brana Meliala

Website hadiah romantis dengan animasi hati beterbangan.

## Cara Jalankan Lokal

```bash
npm install
npm run dev
```

## Cara Deploy ke Vercel

1. Upload folder ini ke GitHub (buat repo baru)
2. Buka [vercel.com](https://vercel.com) → "Add New Project"
3. Pilih repo GitHub kamu → klik **Deploy**
4. Selesai! Vercel otomatis detect Vite ✅

## Cara Edit Konten

| File | Yang bisa diedit |
|------|-----------------|
| `src/App.jsx` | Nama pacar (`PARTNER_NAME`) |
| `src/components/Letter.jsx` | Isi surat (`LETTER_PARAGRAPHS`) & nama pengirim (`SENDER_NAME`) |
| `src/components/Gallery.jsx` | Jumlah slot foto (`NUM_SLOTS`) |

## Cara Tambah Foto Permanen

Taruh foto di folder `public/photos/` lalu edit `Gallery.jsx`:

```jsx
const DEFAULT_PHOTOS = [
  '/photos/foto1.jpg',
  '/photos/foto2.jpg',
]
```
# AndherGift
