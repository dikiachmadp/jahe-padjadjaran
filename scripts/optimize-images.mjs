/**
 * Membangun turunan gambar yang siap web dari assets-src/ ke public/img/.
 *
 * Sumber aslinya adalah file kamera (sampai 4080x3072, 1,4 MB per file) yang
 * sebelumnya dikirim apa adanya ke pengunjung. Script ini menghasilkan varian
 * responsif sehingga browser hanya mengunduh ukuran yang benar-benar dipakai.
 *
 * Jalankan: npm run optimize:img
 */
import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';

const SRC_GALLERY = 'assets-src/gallery';
const SRC_BRAND = 'assets-src/brand';
const OUT = 'public/img';

// Lebar yang dipakai galeri. Kolom gambar utama maksimal ~600 px (grid 2 kolom
// di dalam container max-w-7xl), jadi 1200w sudah cukup untuk layar retina 2x —
// tidak perlu menyimpan varian 1600w yang tak pernah terpakai.
//   240  strip thumbnail (8 gambar sekaligus)
//   480  gambar utama di ponsel, DPR 1
//   800  gambar utama di ponsel DPR 2 / desktop kecil
//  1200  gambar utama di desktop DPR 2
const GALLERY_WIDTHS = [240, 480, 800, 1200];
const QUALITY = 72;

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

async function buildGallery() {
  const files = (await readdir(SRC_GALLERY)).filter((f) => /\.(webp|jpe?g|png)$/i.test(f));
  files.sort();

  let totalIn = 0;
  let totalOut = 0;

  for (const file of files) {
    const { name } = parse(file);
    const src = join(SRC_GALLERY, file);
    const meta = await sharp(src).metadata();
    const srcBytes = (await stat(src)).size;
    totalIn += srcBytes;

    for (const width of GALLERY_WIDTHS) {
      // Jangan pernah memperbesar gambar melebihi resolusi aslinya.
      if (width > meta.width) continue;
      const dest = join(OUT, `${name}-${width}.webp`);
      const info = await sharp(src)
        .rotate() // hormati EXIF orientation sebelum metadata dibuang
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(dest);
      totalOut += info.size;
    }

    console.log(`  ${file.padEnd(12)} ${meta.width}x${meta.height} ${kb(srcBytes).padStart(8)} -> ${GALLERY_WIDTHS.filter((w) => w <= meta.width).join('/')}w`);
  }

  return { totalIn, totalOut, count: files.length };
}

async function buildBrand() {
  // Logo dirender maksimal ~240 px di header; aslinya 1920x1024.
  const logo = join(SRC_BRAND, 'logo.webp');
  for (const width of [240, 480, 960]) {
    await sharp(logo).resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(join(OUT, `logo-${width}.webp`));
  }

  // Gambar hero: elemen LCP, dirender ~160 px tapi sediakan 2x untuk layar retina.
  const hero = join(SRC_BRAND, 'hero.webp');
  for (const width of [160, 320, 480]) {
    await sharp(hero).resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(join(OUT, `hero-${width}.webp`));
  }

  // Favicon & ikon aplikasi dari sumber persegi.
  const icon = join(SRC_BRAND, 'favicon.webp');
  await sharp(icon).resize(180, 180).png({ compressionLevel: 9 }).toFile(join(OUT, 'apple-touch-icon.png'));
  await sharp(icon).resize(192, 192).png({ compressionLevel: 9 }).toFile(join(OUT, 'icon-192.png'));
  await sharp(icon).resize(512, 512).png({ compressionLevel: 9 }).toFile(join(OUT, 'icon-512.png'));
  await sharp(icon).resize(32, 32).png({ compressionLevel: 9 }).toFile(join(OUT, 'favicon-32.png'));
  await sharp(icon).resize(16, 16).png({ compressionLevel: 9 }).toFile(join(OUT, 'favicon-16.png'));
}

/**
 * Kartu Open Graph 1200x630. Foto produk berorientasi potret, jadi dipakai
 * sebagai latar buram lalu foto aslinya ditempel di tengah agar tidak terpotong.
 */
async function buildOgImage() {
  const source = join(SRC_GALLERY, 'img5.webp'); // 1600x1200, orientasi lanskap
  const W = 1200;
  const H = 630;

  const background = await sharp(source)
    .resize({ width: W, height: H, fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.92 })
    .toBuffer();

  await sharp(background).jpeg({ quality: 82, progressive: true }).toFile(join(OUT, 'og-image.jpg'));
}

async function main() {
  await mkdir(OUT, { recursive: true });

  console.log('Galeri:');
  const gallery = await buildGallery();

  console.log('Branding: logo, hero, favicon, ikon aplikasi');
  await buildBrand();

  console.log('Open Graph: og-image.jpg (1200x630)');
  await buildOgImage();

  console.log(
    `\nSelesai. ${gallery.count} gambar galeri: ${kb(gallery.totalIn)} sumber -> ${kb(gallery.totalOut)} total semua varian.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
