import { useMemo } from 'react'; // Tambahkan ini untuk optimasi
import { m } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PARTNERS } from '../data/constants';
import { useLanguage } from '../context/LanguageContext';
import {
  Calendar,
  MapPin,
  Building2,
  Truck,
  Store,
  Handshake,
  Target,
  Briefcase,
  TrendingUp,
  BarChart3,
  ArrowRight
  // Zap dihapus sementara karena belum dipakai agar tidak warning
} from 'lucide-react';

// 1. Pindahkan mapping ikon ke luar komponen agar tidak dibuat ulang tiap render
const PARTNER_ICONS = {
  corporate: <Building2 className="w-6 h-6 md:w-8 md:h-8 text-white" />,
  logistics: <Truck className="w-6 h-6 md:w-8 md:h-8 text-white" />,
  retail: <Store className="w-6 h-6 md:w-8 md:h-8 text-white" />,
  distributor: <Handshake className="w-6 h-6 md:w-8 md:h-8 text-white" />,
  // sesuaikan key di bawah ini dengan property 'type' yang ada di data PARTNERS kamu
};

const BENEFIT_ICONS = [
  <Target key="1" className="w-8 h-8 text-warmth-400" />,
  <Briefcase key="2" className="w-8 h-8 text-warmth-400" />,
  <TrendingUp key="3" className="w-8 h-8 text-warmth-400" />,
  <Truck key="4" className="w-8 h-8 text-warmth-400" />,
  <Handshake key="5" className="w-8 h-8 text-warmth-400" />,
  <BarChart3 key="6" className="w-8 h-8 text-warmth-400" />
];

const Partners = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const { t } = useLanguage();

  const benefitsList = t('partners.benefits.list', { returnObjects: true }) || [];

  // 2. Gunakan useMemo agar array tidak digabungkan ulang setiap kali komponen render
  const extendedPartners = useMemo(() => [
    ...PARTNERS,
    {
      name: "PT Sumber Alfaria Trijaya",
      location: "Tangerang, Banten",
      startYear: 2025,
      type: "retail" // Dipetakan dengan aman ke PARTNER_ICONS.retail
    }
  ], []);

  return (
    <section id="partners" className="py-16 md:py-24 bg-white overflow-x-hidden">
      <div className="section-container">
        {/* Header */}
        <m.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-warmth-100 text-warmth-700 rounded-full text-sm font-sans font-semibold mb-4">
            {t('partners.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-heritage-900 mb-6">
            {t('partners.title')}
          </h2>
          <p className="text-lg md:text-xl text-heritage-700 max-w-2xl mx-auto font-body leading-relaxed">
            {t('partners.subtitle')}
          </p>
        </m.div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24">
          {[
            { label: t('partners.stats.active'), val: '10k+', color: 'text-warmth-600', bg: 'bg-warmth-50' },
            { label: t('partners.stats.since'), val: '2021', color: 'text-heritage-600', bg: 'bg-heritage-50' },
            { label: t('partners.stats.satisfaction'), val: '100%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Growth Rate', val: '145%', color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`${stat.bg} rounded-2xl p-6 md:p-8 text-center border border-black/5 shadow-sm`}
            >
              <div className={`text-3xl md:text-5xl font-display font-bold ${stat.color} mb-2`}>{stat.val}</div>
              <div className="text-heritage-700 font-body text-xs md:text-base font-semibold opacity-80">{stat.label}</div>
            </m.div>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-32">
          {extendedPartners.map((partner, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="p-6 md:p-8 bg-white rounded-2xl border border-heritage-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center space-x-5">
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-heritage-900 rounded-2xl flex items-center justify-center">
                  {/* 3. Ambil ikon berdasarkan tipe partner, gunakan fallback Handshake jika tipe tidak terdaftar */}
                  {PARTNER_ICONS[partner.type] || <Handshake className="text-white" />}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-display font-bold text-heritage-900 leading-tight">{partner.name}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-heritage-500 font-body text-sm">
                    <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" />{partner.location}</span>
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" />Sejak {partner.startYear}</span>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Partnership Benefits */}
        <div className="relative">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="bg-heritage-900 rounded-[2.5rem] p-8 md:p-20 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-warmth-500/10 rounded-full -mr-32 -mt-32"></div>

            <div className="relative z-10 text-center mb-12 md:mb-20">
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-warmth-300">
                {t('partners.benefits.title')}
              </h3>
              <p className="text-warmth-100/70 font-body text-base md:text-lg max-w-2xl mx-auto">
                {t('partners.benefits.subtitle')}
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefitsList.map((benefit, index) => (
                <m.div
                  key={index}
                  whileHover={{ y: -8 }}
                  transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
                  className="group bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-warmth-400/40 hover:bg-white/[0.07] transition-colors will-change-transform"
                >
                  {/* 4. Berikan fallback Target icon jika item melebihi jumlah ikon tersedia */}
                  <div className="mb-6 inline-block text-warmth-400 transition-transform duration-300 group-hover:scale-110">
                    {BENEFIT_ICONS[index] || <Target className="w-8 h-8 text-warmth-400" />}
                  </div>
                  <h4 className="text-xl font-display font-bold mb-3 text-white">
                    {benefit.title}
                  </h4>
                  <p className="text-warmth-100/60 font-body text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </m.div>
              ))}
            </div>

            <div className="relative z-10 text-center mt-16 md:mt-24">
              <m.a
                href="#contact"
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-heritage-900 bg-warmth-300 rounded-full hover:bg-warmth-400 transition-all shadow-lg"
              >
                {t('partners.cta')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </m.a>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;