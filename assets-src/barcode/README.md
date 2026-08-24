# Berkas Barcode — Permen Jahe Padjajaran

Dihasilkan oleh `npm run barcode`. Jangan diedit manual.

## qr-digital-link.svg / .png / -mono.png

QR berformat **GS1 Digital Link** yang berisi:

    https://jahepadjajaran.com/01/00661706054362

Satu kode ini berlaku sebagai URL (dipindai kamera ponsel akan membuka halaman
produk resmi) sekaligus pembawa GTIN `(01) 00661706054362`.

**Aturan cetak:**

- Ukuran minimum **20 x 20 mm**. Di bawah itu kamera ponsel sering gagal membaca
  dari jarak rak toko.
- Sisakan *quiet zone* (area putih polos) di keempat sisi — sudah termasuk dalam
  berkas, jangan dipotong.
- Kontras harus tinggi: modul gelap di atas latar terang. Jangan menaruh QR di
  atas foto atau gradasi.
- Gunakan berkas **SVG** untuk percetakan (vektor, tajam di ukuran berapa pun).
  PNG hanya untuk keperluan digital.
- Varian `-mono` untuk cetak satu warna.

Jika ingin menaruh logo di tengah QR, error correction harus dinaikkan ke level
H dan logo maksimal 15% dari luas kode — dan hasilnya **wajib diuji pindai**
dengan beberapa ponsel sebelum masuk produksi.

## ean13.svg

Simbol EAN-13 `0661706054362` pada magnification 100% (lebar modul 0,33 mm, tinggi
bar 22,85 mm).

**Jangan menghapus barcode EAN-13 dari kemasan.** Kasir ritel modern masih
memindai simbol linear ini. QR Digital Link adalah tambahan, bukan pengganti.
Tata letak yang disarankan: EAN-13 tetap di posisinya sekarang, QR di sebelahnya
atau di panel belakang, dengan teks pendamping singkat seperti
"Pindai untuk keaslian & info produk".
