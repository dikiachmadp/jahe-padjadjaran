import { Link } from 'react-router-dom';
import { Check, ShieldCheck, ScanBarcode, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { COMPANY_INFO, PRODUCT_INFO, GTIN, waLink } from '../data/constants';
import { GALLERY_IMAGES } from '../data/gallery';
import { trackWhatsApp } from '../analytics/ga';

const rupiah = (n) => `Rp${n.toLocaleString('id-ID')}`;

/**
 * Halaman produk kanonik.
 *
 * Sengaja dibangun tanpa framer-motion dan tanpa animasi berbasis scroll: ini
 * halaman yang paling penting untuk mesin pencari, jadi seluruh isinya harus
 * langsung terlihat di HTML hasil prerender tanpa menunggu JavaScript.
 */
const ProductPage = () => {
  const { t, isIndonesian } = useLanguage();
  const p = PRODUCT_INFO.packaging;
  const hero = GALLERY_IMAGES[4]; // foto lanskap, paling cocok untuk header

  const benefits = t('product.benefits', { returnObjects: true }) ?? PRODUCT_INFO.benefits;
  const features = t('product.features', { returnObjects: true }) ?? PRODUCT_INFO.features;

  const specs = [
    { label: t('productPage.specs.brand'), value: 'Jahe Padjajaran' },
    { label: t('productPage.specs.producer'), value: COMPANY_INFO.name },
    { label: t('productPage.specs.origin'), value: 'Indonesia' },
    { label: t('productPage.specs.category'), value: COMPANY_INFO.legal.businessActivity },
    { label: t('productPage.specs.perJar'), value: `${p.piecesPerJar} ${t('productPage.unitPieces')}` },
    { label: t('productPage.specs.perCarton'), value: `${p.jarsPerCarton} ${t('productPage.unitJars')}` },
    { label: t('productPage.specs.retail'), value: rupiah(p.retailPricePerJar) },
    { label: t('productPage.specs.barcode'), value: GTIN.ean13, mono: true }
  ];

  const partnershipPath = isIndonesian ? '/kemitraan/' : '/en/partnership/';

  return (
    <article className="pt-28 md:pt-32 pb-24">
      {/* ---------------------------------------------------------------- Header */}
      <header className="section-container mb-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm font-sans text-heritage-500">
          <Link to={isIndonesian ? '/' : '/en/'} className="hover:text-warmth-700 underline-offset-4 hover:underline">
            {t('nav.home')}
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-heritage-700">{t('productPage.title')}</span>
        </nav>

        <span className="inline-block px-4 py-2 bg-warmth-100 text-warmth-700 rounded-full text-sm font-sans font-medium mb-4">
          {t('productPage.eyebrow')}
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-heritage-900 mb-4 leading-tight">
          {t('productPage.title')}
        </h1>
        <p className="text-xl md:text-2xl text-warmth-700 font-body max-w-3xl">
          {t('productPage.tagline')}
        </p>
      </header>

      <div className="section-container grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
        {/* ------------------------------------------------------------ Kolom kiri */}
        <div className="space-y-12">
          <img
            src={hero.src}
            srcSet={hero.srcSet}
            sizes="(min-width: 1024px) 640px, 100vw"
            alt={t(hero.altKey)}
            width={hero.width}
            height={hero.height}
            className="w-full rounded-3xl shadow-xl border-8 border-white object-cover aspect-[4/3]"
          />

          <p className="text-lg text-heritage-700 font-body leading-relaxed">
            {t('productPage.intro')}
          </p>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-heritage-900 mb-6">
              {t('productPage.benefitsTitle')}
            </h2>
            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-heritage-700 font-body">
                  <Check className="w-5 h-5 shrink-0 mt-1 text-warmth-600" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-heritage-900 mb-6">
              {t('productPage.featuresTitle')}
            </h2>
            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-heritage-700 font-body">
                  <Check className="w-5 h-5 shrink-0 mt-1 text-warmth-600" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ----------------------------------------------------------- Kolom kanan */}
        <aside className="space-y-8 lg:sticky lg:top-28">
          <section className="bg-warmth-50 border border-warmth-200 rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-heritage-900 mb-5">
              {t('productPage.specsTitle')}
            </h2>
            <dl className="divide-y divide-warmth-200">
              {specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 py-3 text-sm">
                  <dt className="text-heritage-600 font-sans">{spec.label}</dt>
                  <dd className={`text-heritage-900 font-sans font-semibold text-right ${spec.mono ? 'tabular-nums tracking-wide' : ''}`}>
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Blok barcode: menyebut angkanya dalam bentuk teks agar terindeks. */}
          <section className="bg-heritage-900 text-white rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <ScanBarcode className="w-6 h-6 text-warmth-400" aria-hidden="true" />
              <h2 className="text-xl font-display font-bold">{t('productPage.barcodeTitle')}</h2>
            </div>
            <p className="text-warmth-100/80 font-body text-sm leading-relaxed mb-5">
              {t('productPage.barcodeIntro')}
            </p>
            <p className="font-sans font-bold text-2xl tracking-[0.15em] tabular-nums text-warmth-300 mb-5">
              {GTIN.printed}
            </p>
            <Link
              to={GTIN.digitalLinkPath + '/'}
              className="inline-flex items-center gap-2 text-warmth-300 hover:text-warmth-200 font-sans font-semibold text-sm underline underline-offset-4"
            >
              {t('productPage.barcodeCta')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </section>

          <section className="border border-warmth-200 rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-warmth-600" aria-hidden="true" />
              <h2 className="text-xl font-display font-bold text-heritage-900">
                {t('productPage.legalTitle')}
              </h2>
            </div>
            <dl className="space-y-2 text-sm font-sans">
              <div className="flex justify-between gap-4">
                <dt className="text-heritage-600">{t('about.legal.registrationNumber')}</dt>
                <dd className="text-heritage-900 font-semibold text-right">{COMPANY_INFO.legal.registrationNumber}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-heritage-600">{t('about.legal.nib')}</dt>
                <dd className="text-heritage-900 font-semibold tabular-nums">{COMPANY_INFO.legal.nib}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-heritage-600">{t('about.legal.kbliCode')}</dt>
                <dd className="text-heritage-900 font-semibold tabular-nums">{COMPANY_INFO.legal.kbliCode}</dd>
              </div>
            </dl>
          </section>

          <section className="bg-gradient-to-br from-warmth-600 to-warmth-500 text-white rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-display font-bold mb-3">{t('productPage.ctaTitle')}</h2>
            <p className="text-white/85 font-body text-sm leading-relaxed mb-6">
              {t('productPage.ctaText')}
            </p>
            <div className="space-y-3">
              <Link
                to={partnershipPath}
                className="block w-full text-center py-3 font-sans font-bold text-warmth-800 bg-white rounded-xl hover:bg-warmth-50 transition-colors"
              >
                {t('productPage.ctaPartnership')}
              </Link>
              <a
                href={waLink('Halo, saya ingin bertanya tentang Permen Jahe Padjajaran')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp('product_page')}
                className="block w-full text-center py-3 font-sans font-bold text-white border border-white/40 rounded-xl hover:bg-white/10 transition-colors"
              >
                {t('productPage.ctaWhatsapp')}
              </a>
            </div>
          </section>
        </aside>
      </div>
    </article>
  );
};

export default ProductPage;
