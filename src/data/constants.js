export const COMPANY_INFO = {
  name: 'PT Padjajaran Pratama Wijaya',
  address: 'Jl. Haji Maksum No.29 RT 02 / RW 04, Sawangan Baru, Sawangan, Kota Depok, Provinsi Jawa Barat, Kode Pos 16511',
  phone: '0812-2188-6566',
  email: 'jahepadjajaran@gmail.com',
  whatsapp: '0812-2188-6566',
  instagram: '@jahepadjajaran.id',

  legal: {
    registrationNumber: 'AHU-040034.AH.01.30.Tahun 2022',
    registrationDate: '22 September 2022',
    nib: '2209220123674',
    npwp: '61.109.433.5-448.000',
    businessScale: 'Usaha Mikro',
    investmentType: 'PMDN (Penanaman Modal Dalam Negeri)',
    businessActivity: 'Perdagangan Eceran Makanan Lainnya',
    kbliCode: '47249',
    riskLevel: 'Rendah',
    issuedBy: 'Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia'
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
  { key: 'pricing', href: '#pricing' },
  { key: 'partners', href: '#partners' },
  { key: 'contact', href: '#contact' }
];
