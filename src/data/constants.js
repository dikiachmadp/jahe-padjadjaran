export const COMPANY_INFO = {
  name: 'PT Padjajaran Pratama Wijaya',
  address: 'Jl. Haji Maksum No.29 RT 02 / RW 04, Sawangan Baru, Sawangan, Kota Depok, Provinsi Jawa Barat, Kode Pos 16511',
  phone: '0812-2188-6566',
  email: 'jahepadjajaran@gmail.com',
  whatsapp: '0812-2188-6566',
  instagram: '@jahepadjajaran.id',
  instagramUrl: 'https://www.instagram.com/jahepadjajaran.id/',

  legal: {
    registrationNumber: 'AHU-040034.AH.01.30.Tahun 2022',
    registrationDate: '22 September 2022',
    nib: '2209220123674',
    // NPWP sengaja tidak ditampilkan di situs. Nomor pajak yang terpampang
    // publik mempermudah pemalsuan identitas atas nama perusahaan, sementara
    // NIB di atas sudah cukup sebagai bukti legalitas yang memang publik.
    businessScale: 'Usaha Mikro',
    investmentType: 'PMDN (Penanaman Modal Dalam Negeri)',
    businessActivity: 'Perdagangan Eceran Makanan Lainnya',
    kbliCode: '47249',
    riskLevel: 'Rendah',
    issuedBy: 'Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia'
  }
};

// =============================================================================
// KONTAK — HELPER
// =============================================================================
// wa.me menuntut nomor format internasional TANPA "0" di depan dan TANPA tanda
// baca. '0812-2188-6566' harus menjadi '6281221886566', bukan '081221886566'.

const COUNTRY_CODE = '62';

/** Ubah nomor lokal Indonesia ("0812-2188-6566") menjadi format wa.me ("6281221886566"). */
export const toInternational = (phone) => {
  const digits = String(phone).replace(/\D/g, '');
  if (digits.startsWith(COUNTRY_CODE)) return digits;
  return COUNTRY_CODE + digits.replace(/^0+/, '');
};

/** Nomor WhatsApp perusahaan dalam format internasional. */
export const WHATSAPP_NUMBER = toInternational(COMPANY_INFO.whatsapp);

/** Bangun tautan wa.me, opsional dengan pesan awal. */
export const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}` +
  (message ? `?text=${encodeURIComponent(message)}` : '');

/** Tautan tel: yang valid (butuh format internasional juga). */
export const telLink = `tel:+${toInternational(COMPANY_INFO.phone)}`;

/** Tautan mailto: perusahaan. */
export const mailLink = `mailto:${COMPANY_INFO.email}`;

// =============================================================================
// IDENTITAS SITUS & GTIN PRODUK
// =============================================================================

export const SITE = {
  url: 'https://jahepadjajaran.com',
  name: 'Jahe Padjajaran',
  defaultLocale: 'id',
  ogImage: '/img/og-image.jpg'
};

// Barcode produk. EAN-13 tercetak di kemasan: 0 661706 054362
// GTIN-14 (bentuk kanonik untuk GS1 Application Identifier "01") = padding nol.
export const GTIN = {
  ean13: '0661706054362',
  upcA: '661706054362',
  gtin14: '00661706054362',
  /** Persis seperti tercetak di bawah simbol barcode. */
  printed: '0 661706 054362',
  /** GS1 Digital Link — isi QR code di kemasan. */
  get digitalLinkPath() {
    return `/01/${this.gtin14}`;
  },
  get digitalLinkUrl() {
    return `${SITE.url}/01/${this.gtin14}`;
  }
};


export const PRODUCT_INFO = {
  name: 'Permen Jahe Padjadaran',
  description: 'Permen berbasis rempah yang dibuat dari bahan alami berkualitas tinggi',
  benefits: [
    'Menghangatkan tubuh',
    'Menjaga daya tahan tubuh',
    'Memberikan rasa nyaman pada tenggorokan',
    'Alternatif sehat untuk konsumsi harian'
  ],
  features: [
    'Berbahan alami berkualitas tinggi',
    'Diproses secara higienis',
    'Kemasan modern dan praktis',
    'Cita rasa jahe khas nusantara'
  ],
  packaging: {
    piecesPerJar: 55,
    jarsPerCarton: 10,
    pricePerPiece: 500,
    basePricePerJar: 27500,
    partnerPricePerCarton: 190000,
    retailPricePerJar: 20000,
    profitPerJar: 7500,
    profitPerCarton: 75000
  }
};

// =============================================================================
// STATIC ARRAYS - Moved from translations.js to prevent t().map() crashes
// =============================================================================

export const PRICING_FEATURES = {
  partnerPrice: {
    features: [
      'Sistem pembayaran fleksibel',
      'Dukungan promosi',
      'Produk berkualitas terjamin'
    ]
  },
  retailPrice: {
    features: [
      'Harga kompetitif',
      'Margin keuntungan jelas',
      'Mudah dijual kembali'
    ]
  }
};

export const PARTNERS_BENEFITS = [
  {
    icon: '🎯',
    title: 'partners.benefits.0.title',
    description: 'partners.benefits.0.description'
  },
  {
    icon: '💼',
    title: 'partners.benefits.1.title',
    description: 'partners.benefits.1.description'
  },
  {
    icon: '📈',
    title: 'partners.benefits.2.title',
    description: 'partners.benefits.2.description'
  },
  {
    icon: '🚚',
    title: 'partners.benefits.3.title',
    description: 'partners.benefits.3.description'
  },
  {
    icon: '🤝',
    title: 'partners.benefits.4.title',
    description: 'partners.benefits.4.description'
  },
  {
    icon: '📊',
    title: 'partners.benefits.5.title',
    description: 'partners.benefits.5.description'
  }
];

export const CTA_BENEFITS = [
  'Proses kemitraan yang mudah',
  'Dukungan penuh dari tim kami',
  'Margin keuntungan kompetitif',
  'Produk dengan legalitas lengkap'
];

export const SOCIAL_PROOF_ITEMS = [
  'Legalitas Lengkap',
  'Produk Berkualitas',
  'Terpercaya Sejak 2021'
];

export const PARTNERS = [
  {
    name: 'PT. Indomarco Prismatama',
    location: 'Area Jabodetabek dan Jawa Barat',
    startYear: 2024
  },
  {
    name: 'Bhakti Karya Distribusi Indonesia',
    location: 'Jabodetabek',
    startYear: 2021
  },
  {
    name: 'Berkah Perkasa Sejahtera',
    location: 'Jabodetabek',
    startYear: 2021
  },
  {
    name: 'Trader dan Grosir',
    location: 'Area Jabodetabek dan Jawa Barat',
    startYear: 2021
  }
];

export const NAVIGATION = [
  { key: 'home', href: '#hero' },
  { key: 'about', href: '#about' },
  { key: 'products', href: '#product' },
  { key: 'partners', href: '#partners' },
  { key: 'gallery', href: '#gallery' },
  { key: 'contact', href: '#contact' }
];
