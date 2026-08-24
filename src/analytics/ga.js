// =============================================================================
// GOOGLE ANALYTICS 4
// =============================================================================
// ID diambil dari variabel lingkungan VITE_GA_MEASUREMENT_ID (lihat .env.example).
// Selama variabel itu kosong, seluruh modul ini tidak melakukan apa pun — tidak
// ada skrip yang dimuat dan tidak ada cookie yang dibuat. Jadi build tetap aman
// dijalankan sebelum ID-nya tersedia.

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const isEnabled = () => Boolean(MEASUREMENT_ID) && typeof window !== 'undefined';

let loaded = false;

/** Muat gtag.js sekali, secara asinkron agar tidak menahan render. */
export function initAnalytics() {
  if (!isEnabled() || loaded) return;
  loaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // Bentuk kanonik dari snippet gtag: yang didorong ke dataLayer harus objek
  // `arguments`, bukan array biasa hasil rest parameter.
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // Pengiriman page_view diurus manual agar navigasi SPA ikut tercatat.
  // Catatan: parameter anonymize_ip tidak dipakai — di GA4 anonimisasi IP
  // selalu aktif dan parameternya diabaikan (itu peninggalan Universal
  // Analytics), jadi mencantumkannya hanya menyiratkan kontrol yang tidak ada.
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView(path, title) {
  if (!isEnabled() || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href
  });
}

export function trackEvent(name, params = {}) {
  if (!isEnabled() || !window.gtag) return;
  window.gtag('event', name, params);
}

// ---------------------------------------------------------------- event khusus

/** Klik tombol WhatsApp — kanal konversi utama situs ini. */
export const trackWhatsApp = (location) => trackEvent('contact_whatsapp', { link_location: location });

/** Klik alamat email. */
export const trackEmail = (location) => trackEvent('contact_email', { link_location: location });

/**
 * Kunjungan ke halaman GS1 Digital Link. Karena URL ini hanya dicapai lewat
 * pindaian QR di kemasan atau pencarian angka barcode, jumlahnya adalah ukuran
 * langsung seberapa sering kode di kemasan benar-benar dipakai orang.
 */
export const trackBarcodeScan = (gtin) => trackEvent('barcode_scan', { gtin });
