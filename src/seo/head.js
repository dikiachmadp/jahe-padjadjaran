// =============================================================================
// PEMBANGUN <head> PER RUTE
// =============================================================================
// Dipakai dua kali dengan sumber data yang sama:
//   - saat build (scripts/prerender.mjs) -> menghasilkan string HTML
//   - saat navigasi klien (useSeo)       -> menambal DOM
// Dengan begitu HTML statis dan hasil navigasi SPA tidak pernah berbeda isi.

import { SITE } from '../data/constants';
import { alternatesFor, absoluteUrl } from './routes';

const HREFLANG = { id: 'id-ID', en: 'en-US' };
const OG_LOCALE = { id: 'id_ID', en: 'en_US' };

/**
 * Susun daftar tag <head> untuk satu rute sebagai data terstruktur.
 * @returns {{ title: string, meta: object[], link: object[], jsonld: object }}
 */
export function buildHead(route) {
  const canonical = absoluteUrl(route.path);
  const ogImage = absoluteUrl(SITE.ogImage);
  const alternates = alternatesFor(route);

  const meta = [
    { name: 'description', content: route.description },
    { name: 'author', content: 'PT Padjajaran Pratama Wijaya' },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' },

    { property: 'og:type', content: route.page === 'home' ? 'website' : 'product' },
    { property: 'og:site_name', content: SITE.name },
    { property: 'og:locale', content: OG_LOCALE[route.locale] },
    { property: 'og:url', content: canonical },
    { property: 'og:title', content: route.title },
    { property: 'og:description', content: route.description },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: route.title },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: route.title },
    { name: 'twitter:description', content: route.description },
    { name: 'twitter:image', content: ogImage }
  ];

  // Padanan bahasa. x-default menunjuk versi Indonesia sebagai default.
  const link = [{ rel: 'canonical', href: canonical }];
  for (const alt of alternates) {
    link.push({ rel: 'alternate', hreflang: HREFLANG[alt.locale], href: absoluteUrl(alt.path) });
  }
  const fallback = alternates.find((a) => a.locale === 'id') ?? alternates[0];
  if (fallback) {
    link.push({ rel: 'alternate', hreflang: 'x-default', href: absoluteUrl(fallback.path) });
  }

  return { title: route.title, meta, link, jsonld: route.jsonld?.() ?? null, lang: route.locale };
}

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Render hasil buildHead menjadi potongan HTML (dipakai saat prerender). */
export function renderHead(route) {
  const head = buildHead(route);
  const out = [`<title>${escapeAttr(head.title)}</title>`];

  for (const m of head.meta) {
    const key = m.name ? 'name' : 'property';
    out.push(`<meta ${key}="${escapeAttr(m[key])}" content="${escapeAttr(m.content)}" />`);
  }
  for (const l of head.link) {
    const attrs = Object.entries(l).map(([k, v]) => `${k}="${escapeAttr(v)}"`).join(' ');
    out.push(`<link ${attrs} />`);
  }
  if (head.jsonld) {
    // </script> di dalam JSON akan menutup tag lebih awal — harus di-escape.
    const json = JSON.stringify(head.jsonld).replace(/</g, '\\u003c');
    out.push(`<script type="application/ld+json">${json}</script>`);
  }

  return out.join('\n    ');
}
