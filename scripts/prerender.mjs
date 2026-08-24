/**
 * Mengubah hasil build SPA menjadi kumpulan halaman HTML statis.
 *
 * Sebelumnya dist/index.html yang dikirim ke pengunjung hanya berisi
 * <div id="root"></div> — seluruh teks baru muncul setelah JavaScript berjalan.
 * Crawler non-Google, pratinjau tautan WhatsApp, dan pembaca layar tidak
 * mendapat apa-apa. Script ini merender tiap rute di Node lalu menuliskannya
 * sebagai berkas HTML lengkap, sehingga konten sudah ada sebelum JS dimuat.
 *
 * Jalankan setelah `vite build` dan `vite build --ssr`. Lihat npm run build.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';

const TEMPLATE = 'dist/index.html';
// Prerender menimpa dist/index.html, sehingga penanda <!--app-html--> hilang
// setelah proses pertama. Salinan bersih hasil `vite build` disimpan di sini
// agar `npm run prerender` bisa dijalankan ulang tanpa build ulang.
const TEMPLATE_SNAPSHOT = 'dist-ssr/index.template.html';
const SERVER_ENTRY = '../dist-ssr/entry-server.js';
const OUT_DIR = 'dist';
const SITE_URL = 'https://jahepadjajaran.com';

const { render, ROUTES, renderHead } = await import(SERVER_ENTRY);

/** Ubah "/produk/permen-jahe-padjajaran/" menjadi path berkas yang benar. */
const outputPathFor = (routePath) => {
  const clean = routePath.replace(/^\/+|\/+$/g, '');
  return clean ? join(OUT_DIR, clean, 'index.html') : join(OUT_DIR, 'index.html');
};

async function prerenderRoutes(template) {
  const written = [];

  for (const route of ROUTES) {
    const appHtml = await render(route.path, route.locale);
    const headHtml = renderHead(route);

    const html = template
      .replace('<!--app-head-->', headHtml)
      .replace('<!--app-html-->', appHtml)
      // lang harus ikut bahasa halaman, bukan selalu "id"
      .replace('<html lang="id">', `<html lang="${route.locale}">`);

    const dest = outputPathFor(route.path);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, html, 'utf-8');

    written.push({ route: route.path, dest, bytes: Buffer.byteLength(html) });
  }

  return written;
}

/**
 * Halaman 404. Hostinger/LiteSpeed menyajikannya lewat ErrorDocument, jadi
 * berkasnya berdiri sendiri dan tidak masuk sitemap.
 */
async function writeNotFound(template) {
  const appHtml = await render('/__404__', 'id');
  const html = template
    .replace('<!--app-head-->', '<title>404 — Permen Jahe Padjajaran</title>\n    <meta name="robots" content="noindex, follow" />')
    .replace('<!--app-html-->', appHtml);
  await writeFile(join(OUT_DIR, '404.html'), html, 'utf-8');
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const byPair = new Map();
  for (const r of ROUTES) {
    if (!byPair.has(r.pairKey)) byPair.set(r.pairKey, []);
    byPair.get(r.pairKey).push(r);
  }

  const urls = ROUTES.map((route) => {
    const alternates = byPair.get(route.pairKey) ?? [];
    const links = alternates
      .map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${alt.locale === 'en' ? 'en-US' : 'id-ID'}" href="${SITE_URL}${alt.path}" />`
      )
      .join('\n');

    return [
      '  <url>',
      `    <loc>${SITE_URL}${route.path}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority.toFixed(1)}</priority>`,
      links,
      '  </url>'
    ]
      .filter(Boolean)
      .join('\n');
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

async function loadTemplate() {
  const fresh = await readFile(TEMPLATE, 'utf-8');
  if (fresh.includes('<!--app-html-->')) {
    await writeFile(TEMPLATE_SNAPSHOT, fresh, 'utf-8');
    return fresh;
  }

  const snapshot = await readFile(TEMPLATE_SNAPSHOT, 'utf-8').catch(() => null);
  if (snapshot?.includes('<!--app-html-->')) return snapshot;

  throw new Error(
    'Template tanpa penanda <!--app-html-->. Jalankan `npm run build:client` lebih dulu.'
  );
}

async function main() {
  const template = await loadTemplate();

  const written = await prerenderRoutes(template);
  await writeNotFound(template);
  await writeFile(join(OUT_DIR, 'sitemap.xml'), buildSitemap(), 'utf-8');

  // Salin konfigurasi server ke folder yang akan diunggah.
  try {
    const htaccess = await readFile('deploy/.htaccess', 'utf-8');
    await writeFile(join(OUT_DIR, '.htaccess'), htaccess, 'utf-8');
    console.log('  .htaccess disalin ke dist/');
  } catch {
    console.warn('  deploy/.htaccess tidak ditemukan — dilewati.');
  }

  console.log('\nHalaman yang dirender:');
  for (const w of written) {
    console.log(`  ${w.route.padEnd(34)} -> ${w.dest.padEnd(48)} ${(w.bytes / 1024).toFixed(1)} KB`);
  }
  console.log(`  404.html`);
  console.log(`  sitemap.xml (${ROUTES.length} URL)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
