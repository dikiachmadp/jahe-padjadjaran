import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { COMPANY_INFO } from '../data/constants';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const { t } = useLanguage();

  // Get translated features array using returnObjects option
  const features = t('about.features', { returnObjects: true }) || [];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-warmth-50 to-white">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-warmth-100 text-warmth-700 rounded-full text-sm font-sans font-medium mb-4">
            {t('about.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-heritage-900 mb-6">
            {t('about.title')}
          </h2>
          <p className="text-xl text-heritage-700 max-w-3xl mx-auto font-body leading-relaxed">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {Array.isArray(features) && features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-elevated p-8 text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-display font-bold text-heritage-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-heritage-600 font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Company Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-heritage-800 to-heritage-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-display font-bold mb-6 text-warmth-300">
                {t('about.legal.title')}
              </h3>
              <div className="space-y-4 font-body">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-warmth-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-warmth-100">{t('about.legal.registrationNumber')}</div>
                    <div className="text-warmth-200">{COMPANY_INFO.legal.registrationNumber}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-warmth-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-warmth-100">{t('about.legal.nib')}</div>
                    <div className="text-warmth-200">{COMPANY_INFO.legal.nib}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-warmth-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-warmth-100">{t('about.legal.npwp')}</div>
                    <div className="text-warmth-200">{COMPANY_INFO.legal.npwp}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-warmth-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-warmth-100">{t('about.legal.kbliCode')}</div>
                    <div className="text-warmth-200">{COMPANY_INFO.legal.kbliCode} - {t('about.legal.businessActivity')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-display font-bold mb-6 text-warmth-300">
                {t('about.business.title')}
              </h3>
              <div className="space-y-4 font-body">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-sm text-warmth-200 mb-1">{t('about.business.scale')}</div>
                  <div className="font-semibold">{COMPANY_INFO.legal.businessScale}</div>
                </div>

                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-sm text-warmth-200 mb-1">{t('about.business.investment')}</div>
                  <div className="font-semibold">{COMPANY_INFO.legal.investmentType}</div>
                </div>

                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-sm text-warmth-200 mb-1">{t('about.business.risk')}</div>
                  <div className="font-semibold flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    {COMPANY_INFO.legal.riskLevel}
                  </div>
                </div>

                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-sm text-warmth-200 mb-1">{t('about.business.registrationDate')}</div>
                  <div className="font-semibold">{COMPANY_INFO.legal.registrationDate}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-sm text-warmth-200 text-center">
              {t('about.business.issuedBy')} {COMPANY_INFO.legal.issuedBy}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
