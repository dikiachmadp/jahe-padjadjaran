import { Link } from 'react-router-dom';
import { ScanBarcode, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { COMPANY_INFO, PRODUCT_INFO, GTIN, SITE, waLink } from '../data/constants';
import { GALLERY_IMAGES } from '../data/gallery';
import { trackWhatsApp } from '../analytics/ga';

/**
 * Halaman tujuan GS1 Digital Link — inilah yang dibuka ketika QR pada kemasan
 * dipindai (https://jahepadjajaran.com/01/00661706054362).
 *
 * Dua tugasnya:
 *  1. Meyakinkan konsumen bahwa produk yang dipegang memang terdaftar.
 *  2. Menjadi halaman yang muncul ketika angka barcode diketik di mesin pencari.
 *     Karena itu setiap varian penulisan angka ditampilkan sebagai teks nyata,
 *     bukan gambar, dan halaman ini dirender penuh saat build.
 */
const DigitalLinkPage = () => {
  const { t, isIndonesian } = useLanguage();
  const photo = GALLERY_IMAGES[0];

  const numbers = [
    { label: t('digitalLink.printed'), value: GTIN.printed, highlight: true },
    { label: t('digitalLink.ean13'), value: GTIN.ean13 },
    { label: t('digitalLink.upcA'), value: GTIN.upcA },
    { label: t('digitalLink.gtin14'), value: GTIN.gtin14 },
    { label: t('digitalLink.digitalLink'), value: GTIN.digitalLinkUrl, wrap: true }
  ];

  const productPath = isIndonesian ? '/produk/permen-jahe-padjajaran/' : '/en/product/ginger-candy/';

  return (
    <article className="pt-28 md:pt-32 pb-24">
      <div className="section-container max-w-5xl">
        <header className="mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-warmth-100 text-warmth-700 rounded-full text-sm font-sans font-medium mb-5">
            <ScanBarcode className="w-4 h-4" aria-hidden="true" />
            {t('digitalLink.eyebrow')}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-heritage-900 mb-5 leading-tight">
            {t('digitalLink.title')}
          </h1>
          <p className="text-lg text-heritage-700 font-body leading-relaxed max-w-3xl">
            {t('digitalLink.lead')}
          </p>
        </header>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-start">
          <div className="space-y-8">
            {/* Angka barcode dalam semua bentuk penulisan yang mungkin dicari. */}
            <section className="bg-heritage-900 text-white rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-display font-bold mb-6">{t('digitalLink.numbersTitle')}</h2>
              <dl className="divide-y divide-heritage-700/60">
                {numbers.map((n) => (
                  <div key={n.label} className="py-4 first:pt-0 last:pb-0">
                    <dt className="text-[11px] uppercase tracking-[0.2em] font-sans text-warmth-500 mb-1.5">
                      {n.label}
                    </dt>
                    <dd
                      className={`font-sans font-bold tabular-nums ${
                        n.highlight
                          ? 'text-2xl md:text-3xl tracking-[0.15em] text-warmth-300'
                          : 'text-base text-warmth-100'
                      } ${n.wrap ? 'break-all tracking-normal' : ''}`}
                    >
                      {n.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="border border-warmth-200 rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <ShieldCheck className="w-6 h-6 text-warmth-600" aria-hidden="true" />
                <h2 className="text-xl font-display font-bold text-heritage-900">
                  {t('digitalLink.ownerTitle')}
                </h2>
              </div>
              <p className="font-sans font-bold text-heritage-900 text-lg mb-2">{COMPANY_INFO.name}</p>
              <address className="not-italic text-heritage-700 font-body leading-relaxed text-sm mb-4">
                {COMPANY_INFO.address}
              </address>
              <dl className="space-y-1.5 text-sm font-sans">
                <div className="flex justify-between gap-4">
                  <dt className="text-heritage-600">{t('about.legal.registrationNumber')}</dt>
                  <dd className="text-heritage-900 font-semibold text-right">{COMPANY_INFO.legal.registrationNumber}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-heritage-600">{t('about.legal.nib')}</dt>
                  <dd className="text-heritage-900 font-semibold tabular-nums">{COMPANY_INFO.legal.nib}</dd>
                </div>
              </dl>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="border border-warmth-200 rounded-3xl overflow-hidden">
              <img
                src={photo.src}
                srcSet={photo.srcSet}
                sizes="(min-width: 768px) 400px, 100vw"
                alt={t(photo.altKey)}
                width={photo.width}
                height={photo.height}
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="p-6">
                <h2 className="text-sm uppercase tracking-[0.2em] font-sans text-warmth-600 mb-2">
                  {t('digitalLink.productTitle')}
                </h2>
                <p className="font-display font-bold text-2xl text-heritage-900 mb-1">
                  {t('productPage.title')}
                </p>
                <p className="text-heritage-600 font-body text-sm mb-5">
                  {PRODUCT_INFO.packaging.piecesPerJar} {t('productPage.unitPieces')} · {COMPANY_INFO.name}
                </p>
                <Link
                  to={productPath}
                  className="inline-flex items-center gap-2 text-warmth-700 hover:text-warmth-600 font-sans font-semibold text-sm underline underline-offset-4"
                >
                  {t('digitalLink.seeProduct')}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </section>

            <section className="bg-gradient-to-br from-warmth-600 to-warmth-500 text-white rounded-3xl p-6 md:p-8">
              <h2 className="text-lg font-display font-bold mb-2">{t('digitalLink.contactTitle')}</h2>
              <p className="text-white/85 font-body text-sm leading-relaxed mb-5">
                {t('digitalLink.contactText')}
              </p>
              <a
                href={waLink(`Halo, saya memindai barcode ${GTIN.ean13} pada kemasan Permen Jahe Padjajaran`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp('digital_link')}
                className="inline-flex items-center justify-center gap-2 w-full py-3 font-sans font-bold text-warmth-800 bg-white rounded-xl hover:bg-warmth-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                {t('digitalLink.whatsapp')}
              </a>
              <Link
                to={isIndonesian ? '/' : '/en/'}
                className="block text-center mt-3 py-3 font-sans font-semibold text-white/90 hover:text-white text-sm"
              >
                {t('digitalLink.seeHome')}
              </Link>
            </section>
          </aside>
        </div>

        <p className="mt-12 text-xs text-heritage-500 font-body leading-relaxed max-w-3xl">
          {SITE.url} · GS1 Application Identifier (01) = {GTIN.gtin14}
        </p>
      </div>
    </article>
  );
};

export default DigitalLinkPage;
