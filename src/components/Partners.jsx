import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PARTNERS } from '../data/constants';
import { useLanguage } from '../context/LanguageContext';
// Import Icon Lucide yang tetap digunakan
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
} from 'lucide-react';

const Partners = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const { t } = useLanguage();

  const benefitsList = t('partners.benefits.list', { returnObjects: true }) || [];

  const partnerTypeIcons = [
    <Building2 className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    <Truck className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    <Store className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    <Handshake className="w-6 h-6 md:w-8 md:h-8 text-white" />
  ];

  const benefitIcons = [
    <Target className="w-8 h-8 text-warmth-200" />,
    <Briefcase className="w-8 h-8 text-warmth-200" />,
    <TrendingUp className="w-8 h-8 text-warmth-200" />,
    <Truck className="w-8 h-8 text-warmth-200" />,
    <Handshake className="w-8 h-8 text-warmth-200" />,
    <BarChart3 className="w-8 h-8 text-warmth-200" />
  ];

  return (
    <section id="partners" className="py-16 md:py-20 bg-white overflow-x-hidden">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 bg-warmth-100 text-warmth-700 rounded-full text-sm font-sans font-medium mb-4">
            {t('partners.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-heritage-900 mb-6">
            {t('partners.title')}
          </h2>
          <p className="text-lg md:text-xl text-heritage-700 max-w-3xl mx-auto font-body leading-relaxed px-4">
            {t('partners.subtitle')}
          </p>
        </motion.div>

        {/* Stats Banner - Tanpa Icon, Fokus pada Angka */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16"
        >
          {[
            { label: t('partners.stats.active'), val: `${PARTNERS.length}+`, color: 'text-warmth-600', bg: 'from-warmth-50 to-warmth-100' },
            { label: t('partners.stats.since'), val: '2021', color: 'text-heritage-600', bg: 'from-heritage-50 to-heritage-100' },
            { label: t('partners.stats.satisfaction'), val: '100%', color: 'text-green-600', bg: 'from-green-50 to-emerald-100' },
            { label: t('partners.stats.coverage'), val: '2+', color: 'text-blue-600', bg: 'from-blue-50 to-sky-100' },
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.bg} rounded-xl md:rounded-2xl p-6 md:p-8 text-center shadow-lg`}>
              <div className={`text-3xl md:text-5xl font-display font-bold ${stat.color} mb-2`}>
                {stat.val}
              </div>
              <div className="text-heritage-700 font-body text-xs md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-10 md:mb-16">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="card-elevated p-4 md:p-8 group"
            >
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-warmth-400 to-warmth-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {partnerTypeIcons[index] || <Handshake className="text-white" />}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-display font-bold text-heritage-900 mb-2">
                    {partner.name}
                  </h3>

                  <div className="space-y-1 md:space-y-2 text-heritage-600 font-body">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-warmth-600 flex-shrink-0" />
                      <span className="text-sm md:text-base">{partner.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 text-warmth-600 flex-shrink-0" />
                      <span className="text-sm md:text-base">{t('partners.since', { year: partner.startYear })}</span>
                    </div>
                  </div>

                  <div className="mt-3 md:mt-4 inline-flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-sans font-medium">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>{t('partners.active')}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-gradient-to-br from-heritage-800 to-heritage-700 rounded-2xl md:rounded-3xl p-6 md:p-12 text-white shadow-2xl overflow-x-hidden"
        >
          <div className="text-center mb-6 md:mb-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 md:mb-4 text-warmth-300">
              {t('partners.benefits.title')}
            </h3>
            <p className="text-warmth-100 font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {t('partners.benefits.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.isArray(benefitsList) && benefitsList.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefitIcons[index]}
                </div>
                <h4 className="text-lg md:text-xl font-display font-bold mb-2 text-warmth-100">
                  {benefit.title}
                </h4>
                <p className="text-warmth-200/80 font-body text-sm md:text-base leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 md:mt-12">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold text-heritage-900 bg-warmth-300 rounded-full hover:bg-warmth-400 transition-all duration-300 shadow-xl"
            >
              {t('partners.cta')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;