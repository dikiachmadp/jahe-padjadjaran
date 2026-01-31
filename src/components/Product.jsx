import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PRODUCT_INFO } from '../data/constants';

const Product = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <section id="product" className="py-20 bg-white">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-warmth-100 text-warmth-700 rounded-full text-sm font-sans font-medium mb-4">
            Produk Unggulan
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-heritage-900 mb-6">
            {PRODUCT_INFO.name}
          </h2>
          <p className="text-xl text-heritage-700 max-w-3xl mx-auto font-body leading-relaxed">
            {PRODUCT_INFO.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-warmth-100 to-warmth-50 rounded-3xl p-12 shadow-xl">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-warmth-200 rounded-full blur-3xl opacity-40"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-heritage-200 rounded-full blur-3xl opacity-40"></div>
              
              <div className="relative z-10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-9xl mb-6">🫙</div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <div className="text-3xl font-display font-bold text-heritage-900 mb-2">
                      Toples Praktis
                    </div>
                    <div className="text-lg text-heritage-600 font-body">
                      {PRODUCT_INFO.packaging.piecesPerJar} butir per toples
                    </div>
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-warmth-400 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-warmth-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 bg-warmth-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
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
              Manfaat untuk Kesehatan
            </h3>
            <div className="space-y-4">
              {PRODUCT_INFO.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-warmth-50 rounded-xl hover:bg-warmth-100 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-warmth-500 to-warmth-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-body text-heritage-800">
                      {benefit}
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
          <h3 className="text-3xl font-display font-bold text-heritage-900 mb-8 text-center">
            Keunggulan Produk
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCT_INFO.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="card-elevated p-6 text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-warmth-400 to-warmth-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">
                    {index === 0 ? '🌱' : index === 1 ? '✨' : index === 2 ? '📦' : '🇮🇩'}
                  </span>
                </div>
                <p className="text-heritage-800 font-body leading-relaxed">
                  {feature}
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
          className="mt-16 bg-gradient-to-br from-warmth-500 to-warmth-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-display font-bold mb-3">
              Spesifikasi Kemasan
            </h3>
            <p className="text-warmth-100 font-body text-lg">
              Dikemas dengan praktis untuk memudahkan distribusi dan penjualan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-5xl mb-3">🫙</div>
              <div className="text-2xl font-display font-bold mb-2">
                {PRODUCT_INFO.packaging.piecesPerJar} Butir
              </div>
              <div className="text-warmth-100 font-sans text-sm">
                Per Toples
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-5xl mb-3">📦</div>
              <div className="text-2xl font-display font-bold mb-2">
                {PRODUCT_INFO.packaging.jarsPerCarton} Toples
              </div>
              <div className="text-warmth-100 font-sans text-sm">
                Per Karton
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-5xl mb-3">💰</div>
              <div className="text-2xl font-display font-bold mb-2">
                Rp {PRODUCT_INFO.packaging.pricePerPiece.toLocaleString('id-ID')}
              </div>
              <div className="text-warmth-100 font-sans text-sm">
                Per Butir
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Product;
