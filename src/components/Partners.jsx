import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PARTNERS } from '../data/constants';
import { useLanguage } from '../context/LanguageContext';

const Partners = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const { t } = useLanguage();

  // Get translated benefits list using returnObjects option
  const benefitsList = t('partners.benefits.list', { returnObjects: true }) || [];

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

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16"
        >
          <div className="bg-gradient-to-br from-warmth-50 to-warmth-100 rounded-xl md:rounded-2xl p-4 md:p-6 text-center shadow-lg">
            <div className="text-2xl md:text-4xl font-display font-bold text-warmth-600 mb-1 md:mb-2">
              {PARTNERS.length}+
            </div>
            <div className="text-heritage-700 font-body text-sm md:text-base">
              {t('partners.stats.active')}
            </div>
          </div>

          <div className="bg-gradient-to-br from-heritage-50 to-heritage-100 rounded-xl md:rounded-2xl p-4 md:p-6 text-center shadow-lg">
            <div className="text-2xl md:text-4xl font-display font-bold text-heritage-600 mb-1 md:mb-2">
              2021
            </div>
            <div className="text-heritage-700 font-body text-sm md:text-base">
              {t('partners.stats.since')}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl md:rounded-2xl p-4 md:p-6 text-center shadow-lg">
            <div className="text-2xl md:text-4xl font-display font-bold text-green-600 mb-1 md:mb-2">
              100%
            </div>
            <div className="text-heritage-700 font-body text-sm md:text-base">
              {t('partners.stats.satisfaction')}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-xl md:rounded-2xl p-4 md:p-6 text-center shadow-lg">
            <div className="text-2xl md:text-4xl font-display font-bold text-blue-600 mb-1 md:mb-2">
              2+
            </div>
            <div className="text-heritage-700 font-body text-sm md:text-base">
              {t('partners.stats.coverage')}
            </div>
          </div>
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
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-warmth-400 to-warmth-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 gpu-accelerated">
                  <span className="text-xl md:text-2xl">
                    {index === 0 ? '🏢' : index === 1 ? '🚚' : index === 2 ? '🏪' : '🤝'}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-display font-bold text-heritage-900 mb-2">
                    {partner.name}
                  </h3>

                  <div className="space-y-1 md:space-y-2 text-heritage-600 font-body">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-warmth-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm md:text-base break-word">{partner.location}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-warmth-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
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

        {/* Testimonial / Partnership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-gradient-to-br from-warmth-500 to-warmth-600 rounded-2xl md:rounded-3xl p-6 md:p-12 text-white shadow-2xl overflow-x-hidden"
        >
          <div className="text-center mb-6 md:mb-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 md:mb-4">
              {t('partners.benefits.title')}
            </h3>
            <p className="text-warmth-100 font-body text-base md:text-lg max-w-2xl mx-auto">
              {t('partners.benefits.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.isArray(benefitsList) && benefitsList.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{benefit.icon}</div>
                <h4 className="text-lg md:text-xl font-display font-bold mb-1 md:mb-2">
                  {benefit.title}
                </h4>
                <p className="text-warmth-100 font-body text-sm md:text-base">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold text-warmth-700 bg-white rounded-full hover:bg-warmth-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              {t('partners.cta')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;

