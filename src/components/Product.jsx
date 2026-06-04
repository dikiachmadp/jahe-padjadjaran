import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import {
  Check,
  Leaf,
  Sparkles,
  Package,
  Boxes,
  Tag,
  ShoppingBag,
  Weight
} from 'lucide-react';

// 1. Pindahkan definisi komponen ikon ke luar agar hemat memori RAM
const SLIDE_ICONS = {
  pouch: <ShoppingBag size={100} strokeWidth={1} className="md:w-32 md:h-32 w-24 h-24" />,
  bundle: <Package size={100} strokeWidth={1} className="md:w-32 md:h-32 w-24 h-24" />,
  carton: <Boxes size={100} strokeWidth={1} className="md:w-32 md:h-32 w-24 h-24" />,
};

const FEATURE_ICONS = [
  <Leaf key="f1" className="w-6 h-6 md:w-8 md:h-8 text-white" />,
  <Sparkles key="f2" className="w-6 h-6 md:w-8 md:h-8 text-white" />,
  <Package key="f3" className="w-6 h-6 md:w-8 md:h-8 text-white" />,
  <Boxes key="f4" className="w-6 h-6 md:w-8 md:h-8 text-white" /> // Mengganti Globe ke Boxes agar selaras jika kurang
];

const Product = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  const benefits = t('product.benefits', { returnObjects: true }) || [];
  const features = t('product.features', { returnObjects: true }) || [];

  // 2. Bungkus slides dengan useMemo agar teks bisa dinamis mengikuti i18n t() tanpa penurunan performa
  const slides = useMemo(() => [
    {
      id: 'pouch',
      icon: SLIDE_ICONS.pouch,
      title: t('product.slides.pouch.title', { defaultValue: "Single Pouch" }),
      subtitle: t('product.slides.pouch.subtitle', { defaultValue: "Pilihan pas untuk menemani aktivitas harianmu." }),
      info: t('product.slides.pouch.info', { defaultValue: "Berat Bersih: 100gr" }),
      badge: t('product.slides.pouch.badge', { defaultValue: "Best Seller" })
    },
    {
      id: 'bundle',
      icon: SLIDE_ICONS.bundle,
      title: t('product.slides.bundle.title', { defaultValue: "Family Bundle" }),
      subtitle: t('product.slides.bundle.subtitle', { defaultValue: "Stok lebih banyak untuk dinikmati bersama keluarga." }),
      info: t('product.slides.bundle.info', { defaultValue: "Isi: 5 - 10 Pouch" }),
      badge: t('product.slides.bundle.badge', { defaultValue: "Hemat" })
    },
    {
      id: 'carton',
      icon: SLIDE_ICONS.carton,
      title: t('product.slides.carton.title', { defaultValue: "Master Carton" }),
      subtitle: t('product.slides.carton.subtitle', { defaultValue: "Kapasitas maksimal untuk kebutuhan bisnis atau grosir." }),
      info: t('product.slides.carton.info', { defaultValue: "Isi: 20 Pouch (2kg)" }),
      badge: t('product.slides.carton.badge', { defaultValue: "Harga Grosir" })
    }
  ], [t]);

  // Amankan index slider agar tidak out-of-bounds jika terjadi keanehan data
  const currentSlide = slides[activeSlide] || slides[0];

  return (
    <section id="product" className="py-16 md:py-20 bg-white overflow-x-hidden">
      <div className="section-container">
        {/* Header Section */}
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
          {/* Visual Element: Swipable Packaging Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative bg-gradient-to-br from-warmth-100 to-warmth-50 rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden min-h-[440px] flex flex-col justify-center border border-warmth-200">
              <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-warmth-200 rounded-full blur-2xl md:blur-3xl opacity-40"></div>
              <div className="absolute bottom-0 left-0 w-32 md:w-40 h-32 md:h-40 bg-heritage-200 rounded-full blur-2xl md:blur-3xl opacity-40"></div>

              <div className="relative z-10 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="flex justify-center mb-6 text-warmth-600 drop-shadow-2xl">
                      {currentSlide.icon}
                    </div>

                    <div className="inline-block mb-3 px-3 py-1 bg-warmth-200 text-warmth-800 rounded-full text-xs font-bold uppercase tracking-widest">
                      {currentSlide.badge}
                    </div>

                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl">
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-heritage-900 mb-2">
                        {currentSlide.title}
                      </h3>
                      <p className="text-base md:text-lg text-heritage-600 font-body mb-4 leading-relaxed">
                        {currentSlide.subtitle}
                      </p>

                      <div className="flex items-center justify-center space-x-2 text-warmth-700 font-bold bg-warmth-50 py-2 px-4 rounded-xl border border-warmth-100">
                        <Weight size={18} />
                        <span>{currentSlide.info}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dots Indicator */}
                <div className="mt-10 flex items-center justify-center space-x-3">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all duration-500 ${activeSlide === index
                        ? 'w-12 bg-warmth-600 shadow-md'
                        : 'w-2.5 bg-warmth-300 hover:bg-warmth-400'
                        }`}
                      aria-label={`Slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits Section */}
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
                  className="flex items-start space-x-4 p-4 bg-warmth-50 rounded-xl hover:bg-warmth-100 transition-all duration-300 border border-transparent hover:border-warmth-200 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-warmth-500 to-warmth-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </div>
                  <div className="flex-1">
                    <p className="text-base md:text-lg font-body text-heritage-800 leading-snug">
                      {typeof benefit === 'string' ? benefit : benefit?.title || ''}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold text-heritage-900 mb-8 text-center">
            {t('product.featuresTitle')}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.isArray(features) && features.map((feature, index) => (
              <motion.div
                key={index}
                className="card-elevated p-5 md:p-6 text-center group bg-white border border-warmth-50"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-warmth-400 to-warmth-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:rotate-3 transition-all">
                  {/* Berikan fallback icon jika index terjemahan melebihi kapasitas icon array */}
                  {FEATURE_ICONS[index] || <Package className="w-6 h-6 text-white" />}
                </div>
                <p className="text-sm md:text-base text-heritage-800 font-body font-medium">
                  {typeof feature === 'string' ? feature : feature?.title || ''}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Packaging Info Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-br from-heritage-800 to-heritage-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Boxes className="absolute -right-10 -bottom-10 w-64 h-64 rotate-12" />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-center">
            <div>
              <ShoppingBag className="mx-auto mb-4 text-warmth-400" size={40} />
              <div className="text-3xl font-display font-bold mb-1">100 Gram</div>
              <div className="text-warmth-200 text-sm uppercase tracking-widest font-sans">
                per Pouch
              </div>
            </div>

            <div className="md:border-x border-white/10 px-4">
              <Boxes className="mx-auto mb-4 text-warmth-400" size={40} />
              <div className="text-3xl font-display font-bold mb-1">20 Pouch</div>
              <div className="text-warmth-200 text-sm uppercase tracking-widest font-sans">
                Per Carton
              </div>
            </div>

            <div>
              <Tag className="mx-auto mb-4 text-warmth-400" size={40} />
              <div className="text-3xl font-display font-bold mb-1">
                {/* 3. Ditambahkan Optional Chaining (?.) dan nilai fallback '0' agar tidak crash jika data kosong */}
                Rp10.000
              </div>
              <div className="text-warmth-200 text-sm uppercase tracking-widest font-sans">
                Harga Mulai dari
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Product;