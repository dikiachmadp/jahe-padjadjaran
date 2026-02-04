import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PRODUCT_INFO, PRICING_FEATURES } from '../data/constants';
import { useLanguage } from '../context/LanguageContext';

const Pricing = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const { t } = useLanguage();

  // Use static arrays from constants - prevents t().map() crash
  const partnerFeatures = PRICING_FEATURES.partnerPrice.features;
  const retailFeatures = PRICING_FEATURES.retailPrice.features;

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-warmth-50 to-white">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-warmth-100 text-warmth-700 rounded-full text-sm font-sans font-medium mb-4">
            {t('pricing.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-heritage-900 mb-6">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-heritage-700 max-w-3xl mx-auto font-body leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Partner Purchase Price */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-elevated p-8"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-heritage-500 to-heritage-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-heritage-900 mb-3">
                {t('pricing.partnerPrice.title')}
              </h3>
              <div className="text-4xl font-display font-bold text-warmth-600 mb-2">
                Rp {PRODUCT_INFO.packaging.partnerPricePerCarton.toLocaleString('id-ID')}
              </div>
              <div className="text-heritage-600 font-body mb-6">
                {t('pricing.partnerPrice.perCarton')}
              </div>
              <div className="space-y-3 text-left">
                {partnerFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-warmth-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-heritage-700 font-body">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Retail Price */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-elevated p-8 border-2 border-warmth-400 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-warmth-500 text-white px-4 py-1 text-xs font-sans font-semibold rounded-bl-xl">
              {t('pricing.retailPrice.label')}
            </div>
            <div className="text-center mt-4">
              <div className="w-20 h-20 bg-gradient-to-br from-warmth-500 to-warmth-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">🏪</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-heritage-900 mb-3">
                {t('pricing.retailPrice.title')}
              </h3>
              <div className="text-4xl font-display font-bold text-warmth-600 mb-2">
                Rp {PRODUCT_INFO.packaging.retailPricePerJar.toLocaleString('id-ID')}
              </div>
              <div className="text-heritage-600 font-body mb-6">
                {t('pricing.retailPrice.perJar')}
              </div>
              <div className="space-y-3 text-left">
                {retailFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-warmth-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-heritage-700 font-body">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Profit */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-elevated p-8 bg-gradient-to-br from-green-50 to-emerald-50"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-heritage-900 mb-3">
                {t('pricing.profit.title')}
              </h3>
              <div className="text-4xl font-display font-bold text-green-600 mb-2">
                Rp {PRODUCT_INFO.packaging.profitPerJar.toLocaleString('id-ID')}
              </div>
              <div className="text-heritage-600 font-body mb-2">
                {t('pricing.profit.perJar')}
              </div>
              <div className="text-2xl font-display font-bold text-green-600 mb-2">
                Rp {PRODUCT_INFO.packaging.profitPerCarton.toLocaleString('id-ID')}
              </div>
              <div className="text-heritage-600 font-body mb-6">
                {t('pricing.profit.perCarton')}
              </div>
              <div className="p-4 bg-white rounded-xl">
                <div className="text-sm text-heritage-600 font-body mb-2">
                  {t('pricing.profit.margin')}
                </div>
                <div className="text-3xl font-display font-bold text-green-600">
                  ~39%
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Breakdown Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-br from-heritage-800 to-heritage-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
        >
          <h3 className="text-3xl font-display font-bold mb-8 text-center text-warmth-300">
            {t('pricing.breakdown.title')}
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-warmth-200 font-body">{t('pricing.breakdown.basePrice.label')}</span>
                  <span className="font-display font-bold text-xl">
                    Rp {PRODUCT_INFO.packaging.basePricePerJar.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="text-sm text-warmth-300">
                  ({PRODUCT_INFO.packaging.piecesPerJar} butir × Rp {PRODUCT_INFO.packaging.pricePerPiece.toLocaleString('id-ID')})
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-warmth-200 font-body">{t('pricing.breakdown.partnerPrice.label')}</span>
                  <span className="font-display font-bold text-xl text-warmth-300">
                    Rp {PRODUCT_INFO.packaging.partnerPricePerCarton.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="text-sm text-warmth-300">
                  ({PRODUCT_INFO.packaging.jarsPerCarton} toples)
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-warmth-200 font-body">{t('pricing.breakdown.retailPrice.label')}</span>
                  <span className="font-display font-bold text-xl text-green-300">
                    Rp {PRODUCT_INFO.packaging.retailPricePerJar.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="text-sm text-warmth-300">
                  {t('pricing.breakdown.retailPrice.calc')}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-400/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-200 font-body font-semibold">{t('pricing.breakdown.totalProfit.label')}</span>
                  <span className="font-display font-bold text-2xl text-green-300">
                    Rp {PRODUCT_INFO.packaging.profitPerCarton.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="text-sm text-green-300">
                  (Rp {PRODUCT_INFO.packaging.profitPerJar.toLocaleString('id-ID')} × {PRODUCT_INFO.packaging.jarsPerCarton} toples)
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <p className="text-warmth-200 font-body">
              {t('pricing.breakdown.paymentNote')}
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-primary text-lg px-12 py-4">
            {t('pricing.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
