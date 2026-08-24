# Deploy — jahepadjajaran.com

Situs di-*host* statis di **Hostinger (LiteSpeed)**. Tidak ada proses Node yang
berjalan di server: seluruh halaman sudah berbentuk HTML jadi saat build.

## Build

```bash
npm install
npm run optimize:img   # hanya perlu saat gambar sumber di assets-src/ berubah
npm run build
```

`npm run build` menjalankan tiga tahap berurutan:

1. `build:client` — bundle browser ke `dist/`
2. `build:server` — bundle SSR ke `dist-ssr/` (tidak diunggah, hanya alat bantu)
3. `prerender` — merender tiap rute menjadi HTML statis, membuat `sitemap.xml`,
   `404.html`, dan menyalin `deploy/.htaccess` ke `dist/`

Hasil akhir yang diunggah **hanya isi folder `dist/`**.

## Unggah ke Hostinger

1. Buka hPanel → File Manager → `public_html`.
2. **Buat cadangan `.htaccess` yang sudah ada** sebelum menimpanya. Berkas ini
   tersembunyi — aktifkan "Show hidden files" di File Manager.
3. Hapus isi lama `public_html`, lalu unggah **seluruh isi** `dist/` —
   termasuk `.htaccess` yang juga tersembunyi.
4. Di hPanel, jalankan *purge* cache LiteSpeed.

Struktur yang harus ada di `public_html` setelah unggah:

```
index.html
404.html
robots.txt
sitemap.xml
manifest.webmanifest
.htaccess
assets/          (JS, CSS, font — nama ber-hash)
img/             (gambar hasil optimasi)
produk/permen-jahe-padjajaran/index.html
01/00661706054362/index.html
kemitraan/index.html
en/index.html
en/product/ginger-candy/index.html
en/partnership/index.html
```

## Verifikasi setelah deploy

```bash
curl -I https://jahepadjajaran.com/robots.txt
```

Harus mengembalikan `content-type: text/plain`. Kalau yang keluar `text/html`,
berarti `.htaccess` belum aktif dan aturan *catch-all* lama masih berlaku —
inilah bug yang membuat Googlebot menganggap robots.txt tidak valid.

```bash
curl -s https://jahepadjajaran.com/sitemap.xml | head -3
curl -I https://jahepadjajaran.com/01/0661706054362
curl -I https://jahepadjajaran.com/
curl -sI https://jahepadjajaran.com/01/00661706054362/ | grep -i cache
```

Yang diharapkan:

| Perintah | Hasil |
|---|---|
| `sitemap.xml` | XML sungguhan, bukan HTML |
| `/01/0661706054362` | `301` menuju `/01/00661706054362/` |
| `/` | `200`, `Cache-Control: no-cache, must-revalidate` |
| `/assets/<berkas>.js` | `Cache-Control: public, max-age=31536000, immutable` |

## Setelah deploy pertama

- Google Search Console: verifikasi domain, submit `sitemap.xml`, lalu jalankan
  URL Inspection untuk `/01/00661706054362/` dan minta *indexing*.
- Bing Webmaster Tools: impor dari Search Console.
- Google Business Profile untuk alamat Sawangan, Depok.
- Google Merchant Center **hanya setelah status registrasi GTIN dipastikan**
  (lihat `assets-src/barcode/README.md`).
