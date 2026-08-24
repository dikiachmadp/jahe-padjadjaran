// =============================================================================
// GALERI PRODUK
// =============================================================================
// Varian lebar dihasilkan oleh scripts/optimize-images.mjs. Sumber aslinya ada
// di assets-src/gallery/ dan tidak pernah dikirim ke browser.

const WIDTHS = [480, 800, 1200];
const THUMB_WIDTH = 240;

/**
 * @param {string} id   nama berkas tanpa ekstensi, mis. "img1"
 * @param {string} alt  kunci i18n untuk teks alternatif
 * @param {number} w    lebar tampilan terbesar (px) — dipakai menyusun sizes
 * @param {number} h    tinggi tampilan terbesar (px)
 */
const image = (id, altKey, w, h) => ({
  id,
  altKey,
  src: `/img/${id}-800.webp`,
  srcSet: WIDTHS.map((width) => `/img/${id}-${width}.webp ${width}w`).join(', '),
  // Gambar utama: lebar penuh di ponsel, setengah container (maks ~600px) di desktop.
  sizes: '(min-width: 1024px) 600px, 100vw',
  thumb: `/img/${id}-${THUMB_WIDTH}.webp`,
  width: w,
  height: h
});

export const GALLERY_IMAGES = [
  image('img1', 'gallery.alt.img1', 1200, 1600),
  image('img2', 'gallery.alt.img2', 3120, 4160),
  image('img3', 'gallery.alt.img3', 1200, 1600),
  image('img4', 'gallery.alt.img4', 3024, 4032),
  image('img5', 'gallery.alt.img5', 1600, 1200),
  image('img6', 'gallery.alt.img6', 1600, 1200),
  image('img7', 'gallery.alt.img7', 3024, 4032),
  image('img8', 'gallery.alt.img8', 4080, 3072)
];
