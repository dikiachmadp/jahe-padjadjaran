import { useEffect } from 'react';
import { buildHead } from './head';

const MANAGED = 'data-seo';

/**
 * Menyinkronkan <head> saat navigasi sisi klien.
 *
 * Pada muat halaman pertama, <head> sudah benar karena disisipkan saat
 * prerender — hook ini hanya mengambil alih setelah pengguna berpindah rute.
 * Semua tag yang dikelola diberi atribut data-seo agar bisa dibersihkan tanpa
 * menyentuh tag lain (favicon, manifest, preload font).
 */
export function useSeo(route) {
  useEffect(() => {
    if (!route) return;
    const head = buildHead(route);

    document.title = head.title;
    document.documentElement.lang = head.lang;

    document.head.querySelectorAll(`[${MANAGED}]`).forEach((el) => el.remove());

    const upsertMeta = (m) => {
      const key = m.name ? 'name' : 'property';
      const existing = document.head.querySelector(`meta[${key}="${m[key]}"]`);
      if (existing) {
        existing.setAttribute('content', m.content);
        return;
      }
      const el = document.createElement('meta');
      el.setAttribute(key, m[key]);
      el.setAttribute('content', m.content);
      el.setAttribute(MANAGED, '');
      document.head.appendChild(el);
    };

    head.meta.forEach(upsertMeta);

    document.head.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    head.link.forEach((l) => {
      const el = document.createElement('link');
      Object.entries(l).forEach(([k, v]) => el.setAttribute(k, v));
      el.setAttribute(MANAGED, '');
      document.head.appendChild(el);
    });

    const oldLd = document.head.querySelector('script[type="application/ld+json"]');
    if (oldLd) oldLd.remove();
    if (head.jsonld) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(head.jsonld);
      script.setAttribute(MANAGED, '');
      document.head.appendChild(script);
    }
  }, [route]);
}
