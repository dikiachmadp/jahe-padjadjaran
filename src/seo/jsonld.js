// =============================================================================
// STRUCTURED DATA (JSON-LD)
// =============================================================================
// Dibangun dari data yang sudah ada di src/data/constants.js agar tidak ada
// angka atau alamat yang ditulis dua kali.

import { COMPANY_INFO, PRODUCT_INFO, SITE, GTIN } from '../data/constants';

const abs = (path) => (path.startsWith('http') ? path : `${SITE.url}${path}`);

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const PRODUCT_ID = `${SITE.url}/#product`;

export const organization = () => ({
  '@type': ['Organization', 'LocalBusiness'],
  '@id': ORG_ID,
  name: COMPANY_INFO.name,
  alternateName: 'Jahe Padjajaran',
  url: SITE.url,
  logo: {
    '@type': 'ImageObject',
    url: abs('/img/logo-480.webp'),
    width: 480,
    height: 256
  },
  image: abs(SITE.ogImage),
  email: COMPANY_INFO.email,
  telephone: `+${COMPANY_INFO.phone.replace(/\D/g, '').replace(/^0/, '62')}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Haji Maksum No.29 RT 02 / RW 04',
    addressLocality: 'Sawangan',
    addressRegion: 'Jawa Barat',
    postalCode: '16511',
    addressCountry: 'ID'
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: -6.4025, longitude: 106.7942 },
    description: 'Jabodetabek dan Jawa Barat'
  },
  foundingDate: '2022-09-22',
  taxID: COMPANY_INFO.legal.nib,
  naics: COMPANY_INFO.legal.kbliCode,
  sameAs: [COMPANY_INFO.instagramUrl]
});

export const website = (locale = 'id') => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE.url,
  name: SITE.name,
  inLanguage: locale === 'en' ? 'en-US' : 'id-ID',
  publisher: { '@id': ORG_ID }
});

export const product = ({ locale = 'id', url } = {}) => ({
  '@type': 'Product',
  '@id': PRODUCT_ID,
  name: 'Permen Jahe Padjajaran',
  alternateName: 'Jahe Padjajaran Ginger Candy',
  description:
    locale === 'en'
      ? 'Ginger-based hard candy made from natural Indonesian spices. Warms the body, supports immunity and soothes the throat.'
      : 'Permen berbasis jahe dari rempah alami Nusantara. Menghangatkan tubuh, menjaga daya tahan, dan menenangkan tenggorokan.',
  // Barcode produk. gtin13 memakai bentuk EAN-13 seperti tercetak di kemasan;
  // gtin memakai bentuk GTIN-14 yang dipakai GS1 Digital Link.
  gtin13: GTIN.ean13,
  gtin: GTIN.gtin14,
  sku: GTIN.ean13,
  mpn: GTIN.ean13,
  category: 'Makanan & Minuman > Permen',
  url: abs(url ?? '/produk/permen-jahe-padjajaran/'),
  image: [abs(SITE.ogImage), abs('/img/img5-1200.webp'), abs('/img/img1-1200.webp')],
  brand: { '@type': 'Brand', name: 'Jahe Padjajaran' },
  manufacturer: { '@id': ORG_ID },
  countryOfOrigin: { '@type': 'Country', name: 'Indonesia' },
  offers: {
    '@type': 'Offer',
    url: abs(url ?? '/produk/permen-jahe-padjajaran/'),
    priceCurrency: 'IDR',
    price: String(PRODUCT_INFO.packaging.retailPricePerJar),
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@id': ORG_ID },
    areaServed: 'ID'
  }
});

export const breadcrumb = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: abs(item.path)
  }))
});

export const faqPage = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer }
  }))
});

/** Bungkus beberapa node menjadi satu blok @graph. */
export const graph = (...nodes) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.filter(Boolean)
});
