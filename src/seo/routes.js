// =============================================================================
// PETA RUTE + METADATA SEO
// =============================================================================
// Satu sumber kebenaran, dipakai oleh:
//   - scripts/prerender.mjs  -> menyisipkan <head> dan JSON-LD ke HTML statis
//   - scripts/prerender.mjs  -> membangun sitemap.xml
//   - src/seo/useSeo.js      -> memperbarui <head> saat navigasi sisi klien
//
// Setiap rute wajib punya pasangan bahasa lewat `pairKey` agar hreflang dan
// tautan alternate bisa dibangun otomatis.

import { SITE, GTIN, PRODUCT_INFO } from '../data/constants';
import * as ld from './jsonld';

const rupiah = (n) => `Rp${n.toLocaleString('id-ID')}`;

export const FAQ_ID = [
  {
    question: 'Apa manfaat Permen Jahe Padjajaran?',
    answer:
      'Permen Jahe Padjajaran dibuat dari jahe dan rempah alami sehingga membantu menghangatkan tubuh, menjaga daya tahan tubuh, dan memberikan rasa nyaman pada tenggorokan. Cocok dikonsumsi harian, saat perjalanan, atau ketika cuaca dingin.'
  },
  {
    question: 'Terbuat dari bahan apa saja permen ini?',
    answer:
      'Bahan utamanya jahe pilihan yang diolah bersama gula dan rempah Nusantara. Seluruh proses dilakukan secara higienis di fasilitas produksi PT Padjajaran Pratama Wijaya yang telah mengantongi legalitas lengkap.'
  },
  {
    question: 'Berapa isi satu toples dan satu karton?',
    answer: `Satu toples berisi ${PRODUCT_INFO.packaging.piecesPerJar} butir permen, dan satu karton berisi ${PRODUCT_INFO.packaging.jarsPerCarton} toples.`
  },
  {
    question: 'Berapa harga jual Permen Jahe Padjajaran?',
    answer: `Harga jual yang disarankan ke konsumen adalah ${rupiah(PRODUCT_INFO.packaging.retailPricePerJar)} per toples. Untuk mitra distributor, harga pembelian ${rupiah(PRODUCT_INFO.packaging.partnerPricePerCarton)} per karton dengan potensi keuntungan ${rupiah(PRODUCT_INFO.packaging.profitPerCarton)} per karton.`
  },
  {
    question: 'Bagaimana cara menjadi mitra distributor?',
    answer:
      'Hubungi kami melalui WhatsApp di 0812-2188-6566 atau email jahepadjajaran@gmail.com. Tim kami akan menjelaskan skema kemitraan, minimum order, dan dukungan promosi yang tersedia.'
  },
  {
    question: 'Ke mana saja produk ini dikirim?',
    answer:
      'Saat ini jaringan distribusi kami mencakup Jabodetabek dan Jawa Barat, bekerja sama dengan PT Indomarco Prismatama serta beberapa distributor dan grosir. Untuk wilayah di luar itu, silakan hubungi kami untuk pembahasan lebih lanjut.'
  },
  {
    question: 'Apa nomor barcode produk ini?',
    answer: `Barcode resmi Permen Jahe Padjajaran adalah ${GTIN.printed} (EAN-13: ${GTIN.ean13}). Nomor ini tercetak di setiap kemasan dan dapat dipakai untuk memastikan keaslian produk.`
  }
];

export const FAQ_EN = [
  {
    question: 'What are the benefits of Jahe Padjajaran ginger candy?',
    answer:
      'Made from selected ginger and natural Indonesian spices, it helps warm the body, supports the immune system and soothes the throat. Suitable for daily use, travel, or cold weather.'
  },
  {
    question: 'What is it made of?',
    answer:
      'The main ingredient is selected ginger, processed together with sugar and Indonesian spices. Production is carried out hygienically at PT Padjajaran Pratama Wijaya, which holds complete business licensing.'
  },
  {
    question: 'How many pieces are in one jar and one carton?',
    answer: `One jar contains ${PRODUCT_INFO.packaging.piecesPerJar} pieces, and one carton contains ${PRODUCT_INFO.packaging.jarsPerCarton} jars.`
  },
  {
    question: 'How much does it cost?',
    answer: `The recommended retail price is ${rupiah(PRODUCT_INFO.packaging.retailPricePerJar)} per jar. Distribution partners buy at ${rupiah(PRODUCT_INFO.packaging.partnerPricePerCarton)} per carton, with a potential margin of ${rupiah(PRODUCT_INFO.packaging.profitPerCarton)} per carton.`
  },
  {
    question: 'How can I become a distribution partner?',
    answer:
      'Reach us on WhatsApp at +62 812-2188-6566 or by email at jahepadjajaran@gmail.com. Our team will walk you through the partnership scheme, minimum order and promotional support.'
  },
  {
    question: 'Where do you ship?',
    answer:
      'Our distribution network currently covers Greater Jakarta and West Java, working with PT Indomarco Prismatama and several distributors and wholesalers. For other regions, please get in touch.'
  },
  {
    question: 'What is the product barcode?',
    answer: `The official barcode for Jahe Padjajaran ginger candy is ${GTIN.printed} (EAN-13: ${GTIN.ean13}). It is printed on every pack and can be used to verify authenticity.`
  }
];

const HOME_CRUMB_ID = { name: 'Beranda', path: '/' };
const HOME_CRUMB_EN = { name: 'Home', path: '/en/' };

export const ROUTES = [
  // ---------------------------------------------------------------- Bahasa Indonesia
  {
    path: '/',
    page: 'home',
    locale: 'id',
    pairKey: 'home',
    priority: 1.0,
    changefreq: 'monthly',
    title: 'Permen Jahe Padjajaran — Permen Jahe Alami Asli Indonesia',
    description:
      'Permen jahe berbahan rempah alami dari PT Padjajaran Pratama Wijaya. Menghangatkan tubuh, menjaga daya tahan, dan menenangkan tenggorokan. Terbuka untuk kemitraan distribusi.',
    jsonld: () => ld.graph(ld.organization(), ld.website('id'), ld.product({ locale: 'id' }), ld.faqPage(FAQ_ID))
  },
  {
    path: '/produk/permen-jahe-padjajaran/',
    page: 'product',
    locale: 'id',
    pairKey: 'product',
    priority: 0.9,
    changefreq: 'monthly',
    title: 'Permen Jahe Padjajaran — Spesifikasi, Kemasan & Barcode Produk',
    description: `Detail lengkap Permen Jahe Padjajaran: komposisi, manfaat, isi ${PRODUCT_INFO.packaging.piecesPerJar} butir per toples, dan barcode resmi ${GTIN.printed} (EAN-13 ${GTIN.ean13}).`,
    jsonld: () =>
      ld.graph(
        ld.organization(),
        ld.product({ locale: 'id', url: '/produk/permen-jahe-padjajaran/' }),
        ld.breadcrumb([HOME_CRUMB_ID, { name: 'Permen Jahe Padjajaran', path: '/produk/permen-jahe-padjajaran/' }])
      )
  },
  {
    path: `/01/${GTIN.gtin14}/`,
    page: 'digitalLink',
    locale: 'id',
    pairKey: 'digitalLink',
    priority: 0.9,
    changefreq: 'monthly',
    title: `${GTIN.ean13} — Permen Jahe Padjajaran | PT Padjajaran Pratama Wijaya`,
    description: `Halaman resmi untuk barcode ${GTIN.printed}. EAN-13 ${GTIN.ean13} / UPC-A ${GTIN.upcA} / GTIN-14 ${GTIN.gtin14} adalah kode produk Permen Jahe Padjajaran dari PT Padjajaran Pratama Wijaya, Depok, Indonesia.`,
    jsonld: () =>
      ld.graph(
        ld.organization(),
        ld.product({ locale: 'id', url: `/01/${GTIN.gtin14}/` }),
        ld.breadcrumb([
          HOME_CRUMB_ID,
          { name: 'Permen Jahe Padjajaran', path: '/produk/permen-jahe-padjajaran/' },
          { name: GTIN.ean13, path: `/01/${GTIN.gtin14}/` }
        ])
      )
  },
  {
    path: '/kemitraan/',
    page: 'partnership',
    locale: 'id',
    pairKey: 'partnership',
    priority: 0.8,
    changefreq: 'monthly',
    title: 'Kemitraan Distribusi Permen Jahe Padjajaran — Skema Harga & Margin',
    description: `Skema kemitraan Permen Jahe Padjajaran: harga mitra ${rupiah(PRODUCT_INFO.packaging.partnerPricePerCarton)} per karton, harga jual ${rupiah(PRODUCT_INFO.packaging.retailPricePerJar)} per toples, keuntungan ${rupiah(PRODUCT_INFO.packaging.profitPerCarton)} per karton.`,
    jsonld: () =>
      ld.graph(
        ld.organization(),
        ld.breadcrumb([HOME_CRUMB_ID, { name: 'Kemitraan', path: '/kemitraan/' }])
      )
  },

  // ---------------------------------------------------------------- English
  {
    path: '/en/',
    page: 'home',
    locale: 'en',
    pairKey: 'home',
    priority: 0.8,
    changefreq: 'monthly',
    title: 'Jahe Padjajaran — Natural Indonesian Ginger Candy',
    description:
      'Ginger candy made from natural Indonesian spices by PT Padjajaran Pratama Wijaya. Warms the body, supports immunity and soothes the throat. Open for distribution partnerships.',
    jsonld: () => ld.graph(ld.organization(), ld.website('en'), ld.product({ locale: 'en' }), ld.faqPage(FAQ_EN))
  },
  {
    path: '/en/product/ginger-candy/',
    page: 'product',
    locale: 'en',
    pairKey: 'product',
    priority: 0.7,
    changefreq: 'monthly',
    title: 'Jahe Padjajaran Ginger Candy — Specifications, Packaging & Barcode',
    description: `Full details of Jahe Padjajaran ginger candy: ingredients, benefits, ${PRODUCT_INFO.packaging.piecesPerJar} pieces per jar, and official barcode ${GTIN.printed} (EAN-13 ${GTIN.ean13}).`,
    jsonld: () =>
      ld.graph(
        ld.organization(),
        ld.product({ locale: 'en', url: '/en/product/ginger-candy/' }),
        ld.breadcrumb([HOME_CRUMB_EN, { name: 'Ginger Candy', path: '/en/product/ginger-candy/' }])
      )
  },
  {
    path: '/en/partnership/',
    page: 'partnership',
    locale: 'en',
    pairKey: 'partnership',
    priority: 0.6,
    changefreq: 'monthly',
    title: 'Jahe Padjajaran Distribution Partnership — Pricing & Margin',
    description: `Partnership scheme for Jahe Padjajaran ginger candy: partner price ${rupiah(PRODUCT_INFO.packaging.partnerPricePerCarton)} per carton, retail ${rupiah(PRODUCT_INFO.packaging.retailPricePerJar)} per jar, margin ${rupiah(PRODUCT_INFO.packaging.profitPerCarton)} per carton.`,
    jsonld: () =>
      ld.graph(ld.organization(), ld.breadcrumb([HOME_CRUMB_EN, { name: 'Partnership', path: '/en/partnership/' }]))
  }
];

/** Cari definisi rute untuk sebuah pathname (toleran terhadap trailing slash). */
export const findRoute = (pathname) => {
  const norm = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return ROUTES.find((r) => r.path === norm || r.path === pathname);
};

/** Semua padanan bahasa untuk satu rute, dipakai membangun hreflang. */
export const alternatesFor = (route) => ROUTES.filter((r) => r.pairKey === route.pairKey);

export const absoluteUrl = (path) => `${SITE.url}${path}`;
