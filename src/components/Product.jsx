import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PRODUCT_INFO } from '../data/constants';
import { useLanguage } from '../context/LanguageContext';
// Import Icon Lucide
import {
  Check,
  Leaf,
  Sparkles,
  Package,
  Globe,
  Container,
  Boxes,
  Tag
} from 'lucide-react';

const Product = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const { t } = useLanguage();

  // Get translated arrays using returnObjects option
  const benefits = t('product.benefits', { returnObjects: true }) || [];
  const features = t('product.features', { returnObjects: true }) || [];

  // Mapping untuk Features Icons
  const featureIcons = [
    <Leaf className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    <Package className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" />
  ];

  return (
    <section id="product" className="py-16 md:py-20 bg-white overflow-x-hidden">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 bg-warmth-100 text-warmth-700 rounded-full text-sm font-sans font-medium mb-4">
            {t('product.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-heritage-900 mb-6">
            {t('product.title')}
          </h2>
          <p className="text-lg md:text-xl text-heritage-700 max-w-3xl mx-auto font-body leading-relaxed px-4">
            {t('product.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20">
          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative bg-gradient-to-br from-warmth-100 to-warmth-50 rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-warmth-200 rounded-full blur-2xl md:blur-3xl opacity-40"></div>
              <div className="absolute bottom-0 left-0 w-32 md:w-40 h-32 md:h-40 bg-heritage-200 rounded-full blur-2xl md:blur-3xl opacity-40"></div>

              <div className="relative z-10 flex items-center justify-center">
                <div className="text-center">
                  {/* Ganti Emoji Jar dengan Icon Container */}
                  <div className="flex justify-center mb-6 md:mb-8 text-warmth-600 drop-shadow-lg">
                    <Container size={100} strokeWidth={1} className="md:w-32 md:h-32 w-24 h-24" />
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
                    <div className="text-xl md:text-3xl font-display font-bold text-heritage-900 mb-2">
                      {t('product.showcase.title')}
                    </div>
                    <div className="text-base md:text-lg text-heritage-600 font-body">
                      {PRODUCT_INFO.packaging.piecesPerJar} {t('product.showcase.subtitle')}
                    </div>
                    <div className="mt-3 md:mt-4 flex items-center justify-center space-x-2">
                      <div className="w-2.5 h-2.5 bg-warmth-400 rounded-full animate-pulse"></div>
                      <div className="w-2.5 h-2.5 bg-warmth-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2.5 h-2.5 bg-warmth-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-3xl font-display font-bold text-heritage-900 mb-8">
              {t('product.benefitsTitle')}
            </h3>
            <div className="space-y-4">
              {Array.isArray(benefits) && benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-warmth-50 rounded-xl hover:bg-warmth-100 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-warmth-500 to-warmth-600 rounded-full flex items-center justify-center shadow-md">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />
                  </div>
                  <div className="flex-1">
                    <p className="text-base md:text-lg font-body text-heritage-800">
                      {typeof benefit === 'string' ? benefit : ''}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold text-heritage-900 mb-6 md:mb-8 text-center">
            {t('product.featuresTitle')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.isArray(features) && features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="card-elevated p-4 md:p-6 text-center group"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-warmth-400 to-warmth-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 gpu-accelerated">
                  {featureIcons[index]}
                </div>
                <p className="text-sm md:text-base text-heritage-800 font-body leading-relaxed">
                  {typeof feature === 'string' ? feature : ''}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Packaging Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 md:mt-16 bg-gradient-to-br from-warmth-500 to-warmth-600 rounded-2xl md:rounded-3xl p-6 md:p-12 text-white shadow-2xl overflow-x-hidden"
        >
          <div className="text-center mb-6 md:mb-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 md:mb-3">
              {t('product.packaging.title')}
            </h3>
            <p className="text-warmth-100 font-body text-base md:text-lg">
              {t('product.packaging.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 border border-white/20 text-center flex flex-col items-center">
              <Container className="mb-3 text-warmth-200" size={32} strokeWidth={1.5} />
              <div className="text-xl md:text-2xl font-display font-bold mb-1">
                {PRODUCT_INFO.packaging.piecesPerJar} {t('product.packaging.perPiece')}
              </div>
              <div className="text-xs md:text-sm text-warmth-100 font-sans uppercase tracking-wider">
                {t('product.packaging.perJar')}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 border border-white/20 text-center flex flex-col items-center">
              <Boxes className="mb-3 text-warmth-200" size={32} strokeWidth={1.5} />
              <div className="text-xl md:text-2xl font-display font-bold mb-1">
                {PRODUCT_INFO.packaging.jarsPerCarton} {t('product.packaging.perJar')}
              </div>
              <div className="text-xs md:text-sm text-warmth-100 font-sans uppercase tracking-wider">
                {t('product.packaging.perCarton')}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 border border-white/20 text-center flex flex-col items-center">
              <Tag className="mb-3 text-warmth-200" size={32} strokeWidth={1.5} />
              <div className="text-xl md:text-2xl font-display font-bold mb-1">
                Rp {PRODUCT_INFO.packaging.pricePerPiece.toLocaleString('id-ID')}
              </div>
              <div className="text-xs md:text-sm text-warmth-100 font-sans uppercase tracking-wider">
                {t('product.packaging.perPiece')}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Product;