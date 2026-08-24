/**
 * Menghasilkan berkas cetak untuk kemasan:
 *   - QR GS1 Digital Link  -> dipindai konsumen, membuka halaman produk resmi
 *   - Simbol EAN-13        -> tetap dipakai kasir ritel, jangan dihapus
 *
 * Catatan penting: simbologi EAN/UPC hanya mengkodekan 13 digit angka dan
 * secara fisik TIDAK dapat menyimpan URL. Karena itu "scan lalu buka website"
 * hanya bisa dipenuhi kode 2D. QR yang dibuat di sini memakai format GS1
 * Digital Link, sehingga satu kode berlaku sebagai URL sekaligus pembawa GTIN.
 *
 * Jalankan: npm run barcode
 */
import QRCode from 'qrcode';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const OUT = 'assets-src/barcode';

// Disalin dari src/data/constants.js. Script ini berjalan di Node murni tanpa
// resolver Vite, jadi nilainya ditulis ulang di sini — jika barcode berubah,
// ubah di kedua tempat.
const EAN13 = '0661706054362';
const GTIN14 = '00661706054362';
const DIGITAL_LINK = `https://jahepadjajaran.com/01/${GTIN14}`;

const BRAND_DARK = '#2B2015';

// ---------------------------------------------------------------- QR code

async function buildQr() {
  // Error correction M memberi ketahanan ~15% dengan modul yang masih longgar.
  // Quiet zone 4 modul adalah minimum spesifikasi — jangan dikurangi.
  const options = { errorCorrectionLevel: 'M', margin: 4, color: { dark: BRAND_DARK, light: '#FFFFFF' } };

  const svg = await QRCode.toString(DIGITAL_LINK, { ...options, type: 'svg' });
  await writeFile(join(OUT, 'qr-digital-link.svg'), svg, 'utf-8');

  await QRCode.toFile(join(OUT, 'qr-digital-link.png'), DIGITAL_LINK, { ...options, width: 1024 });

  // Varian hitam-putih murni untuk proses cetak satu warna.
  await QRCode.toFile(join(OUT, 'qr-digital-link-mono.png'), DIGITAL_LINK, {
    ...options,
    color: { dark: '#000000', light: '#FFFFFF' },
    width: 1024
  });
}

// ---------------------------------------------------------------- EAN-13

// Tabel encoding EAN-13 standar.
const L = ['0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'];
const G = ['0100111','0110011','0011011','0100001','0011101','0111001','0000101','0010001','0001001','0010111'];
const R = ['1110010','1100110','1101100','1000010','1011100','1001110','1010000','1000100','1001000','1110100'];
const PARITY = ['LLLLLL','LLGLGG','LLGGLG','LLGGGL','LGLLGG','LGGLLG','LGGGLL','LGLGLG','LGLGGL','LGGLGL'];

/** Hitung check digit EAN-13 dari 12 digit pertama. */
function checkDigit(twelve) {
  const sum = [...twelve].reduce((acc, d, i) => acc + Number(d) * (i % 2 === 0 ? 1 : 3), 0);
  return (10 - (sum % 10)) % 10;
}

function encodeEan13(code) {
  if (!/^\d{13}$/.test(code)) throw new Error(`EAN-13 harus 13 digit, dapat: ${code}`);
  const expected = checkDigit(code.slice(0, 12));
  if (Number(code[12]) !== expected) {
    throw new Error(`Check digit salah. ${code.slice(0, 12)} seharusnya berakhir ${expected}, bukan ${code[12]}.`);
  }

  const [first, ...rest] = code;
  const parity = PARITY[Number(first)];
  let bits = '101'; // guard kiri
  rest.slice(0, 6).forEach((d, i) => {
    bits += parity[i] === 'L' ? L[Number(d)] : G[Number(d)];
  });
  bits += '01010'; // guard tengah
  rest.slice(6).forEach((d) => {
    bits += R[Number(d)];
  });
  bits += '101'; // guard kanan
  return bits;
}

/**
 * Gambar simbol EAN-13 sebagai SVG pada magnification 100% (SC2):
 * lebar modul 0,33 mm, tinggi bar 22,85 mm, sesuai spesifikasi umum GS1.
 */
function renderEan13Svg(code) {
  const bits = encodeEan13(code);
  const MODULE = 0.33;
  const BAR_H = 22.85;
  const GUARD_EXTRA = 1.65; // guard bar memanjang ke bawah
  const QUIET_LEFT = 11 * MODULE;
  const QUIET_RIGHT = 7 * MODULE;
  const TEXT_H = 3.5;

  const width = QUIET_LEFT + bits.length * MODULE + QUIET_RIGHT;
  const height = BAR_H + GUARD_EXTRA + TEXT_H;

  // Posisi guard bar yang harus lebih panjang.
  const isGuard = (i) => (i < 3) || (i >= 45 && i < 50) || (i >= 92);

  let bars = '';
  for (let i = 0; i < bits.length; i += 1) {
    if (bits[i] !== '1') continue;
    const x = QUIET_LEFT + i * MODULE;
    const h = isGuard(i) ? BAR_H + GUARD_EXTRA : BAR_H;
    bars += `<rect x="${x.toFixed(3)}" y="0" width="${MODULE}" height="${h.toFixed(2)}" />`;
  }

  const baseline = BAR_H + GUARD_EXTRA + 2.8;
  const fontSize = 3.2;
  const leftGroupX = QUIET_LEFT + (3 + 21) * MODULE;
  const rightGroupX = QUIET_LEFT + (50 + 21) * MODULE;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width.toFixed(2)}mm" height="${height.toFixed(2)}mm" viewBox="0 0 ${width.toFixed(2)} ${height.toFixed(2)}">
  <rect width="100%" height="100%" fill="#FFFFFF"/>
  <g fill="#000000">${bars}</g>
  <g fill="#000000" font-family="OCRB, 'Courier New', monospace" font-size="${fontSize}">
    <text x="${(QUIET_LEFT - 1.5).toFixed(2)}" y="${baseline.toFixed(2)}" text-anchor="end">${code[0]}</text>
    <text x="${leftGroupX.toFixed(2)}" y="${baseline.toFixed(2)}" text-anchor="middle" letter-spacing="0.35">${code.slice(1, 7)}</text>
    <text x="${rightGroupX.toFixed(2)}" y="${baseline.toFixed(2)}" text-anchor="middle" letter-spacing="0.35">${code.slice(7)}</text>
  </g>
</svg>
`;
}

async function main() {
  await mkdir(OUT, { recursive: true });

  await buildQr();
  await writeFile(join(OUT, 'ean13.svg'), renderEan13Svg(EAN13), 'utf-8');

  await writeFile(
    join(OUT, 'README.md'),
    `# Berkas Barcode — Permen Jahe Padjajaran

Dihasilkan oleh \`npm run barcode\`. Jangan diedit manual.

## qr-digital-link.svg / .png / -mono.png

QR berformat **GS1 Digital Link** yang berisi:

    ${DIGITAL_LINK}

Satu kode ini berlaku sebagai URL (dipindai kamera ponsel akan membuka halaman
produk resmi) sekaligus pembawa GTIN \`(01) ${GTIN14}\`.

**Aturan cetak:**

- Ukuran minimum **20 x 20 mm**. Di bawah itu kamera ponsel sering gagal membaca
  dari jarak rak toko.
- Sisakan *quiet zone* (area putih polos) di keempat sisi — sudah termasuk dalam
  berkas, jangan dipotong.
- Kontras harus tinggi: modul gelap di atas latar terang. Jangan menaruh QR di
  atas foto atau gradasi.
- Gunakan berkas **SVG** untuk percetakan (vektor, tajam di ukuran berapa pun).
  PNG hanya untuk keperluan digital.
- Varian \`-mono\` untuk cetak satu warna.

Jika ingin menaruh logo di tengah QR, error correction harus dinaikkan ke level
H dan logo maksimal 15% dari luas kode — dan hasilnya **wajib diuji pindai**
dengan beberapa ponsel sebelum masuk produksi.

## ean13.svg

Simbol EAN-13 \`${EAN13}\` pada magnification 100% (lebar modul 0,33 mm, tinggi
bar 22,85 mm).

**Jangan menghapus barcode EAN-13 dari kemasan.** Kasir ritel modern masih
memindai simbol linear ini. QR Digital Link adalah tambahan, bukan pengganti.
Tata letak yang disarankan: EAN-13 tetap di posisinya sekarang, QR di sebelahnya
atau di panel belakang, dengan teks pendamping singkat seperti
"Pindai untuk keaslian & info produk".
`,
    'utf-8'
  );

  console.log('Berkas barcode dibuat di', OUT);
  console.log('  qr-digital-link.svg / .png / -mono.png ->', DIGITAL_LINK);
  console.log('  ean13.svg                              ->', EAN13);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
