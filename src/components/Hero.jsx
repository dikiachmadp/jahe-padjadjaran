import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToProduct = () => {
    const element = document.querySelector('#product');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-heritage-800 via-heritage-700 to-warmth-700"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-warmth-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-warmth-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="150" r="3" fill="currentColor" className="text-warmth-200" />
            <circle cx="350" cy="100" r="2" fill="currentColor" className="text-warmth-200" />
            <circle cx="600" cy="200" r="3" fill="currentColor" className="text-warmth-200" />
            <circle cx="150" cy="400" r="2" fill="currentColor" className="text-warmth-200" />
            <circle cx="700" cy="450" r="3" fill="currentColor" className="text-warmth-200" />
            <circle cx="400" cy="500" r="2" fill="currentColor" className="text-warmth-200" />
          </svg>
        </div>
      </div>

      <div className="section-container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-warmth-400/20 backdrop-blur-sm text-warmth-100 rounded-full text-sm font-sans font-medium border border-warmth-400/30">
                🌿 Produk Lokal Berkualitas
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
            >
              Permen Jahe
              <span className="block text-warmth-300">Padjajaran</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-warmth-100 mb-8 font-body leading-relaxed"
            >
              Kehangatan rempah nusantara dalam setiap butir.
              Permen berbasis jahe alami yang menjaga daya tahan tubuh dan
              memberikan kenyamanan pada tenggorokan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={scrollToProduct}
                className="btn-primary text-lg px-10 py-4"
              >
                Lihat Produk
              </button>
              <a
                href="#partners"
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Jadi Mitra
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-display font-bold text-warmth-300 mb-1">
                  100%
                </div>
                <div className="text-sm text-warmth-100 font-sans">
                  Bahan Alami
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-display font-bold text-warmth-300 mb-1">
                  2021
                </div>
                <div className="text-sm text-warmth-100 font-sans">
                  Sejak
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-display font-bold text-warmth-300 mb-1">
                  4+
                </div>
                <div className="text-sm text-warmth-100 font-sans">
                  Mitra Distribusi
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-br from-warmth-400/20 to-warmth-600/20 rounded-full blur-2xl"
              ></motion.div>
              
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-8 bg-gradient-to-tr from-heritage-400/20 to-heritage-600/20 rounded-full blur-xl"
              ></motion.div>

              {/* Product showcase placeholder */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="w-80 h-80 bg-white/10 backdrop-blur-md rounded-full border-4 border-white/20 flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🫚</div>
                    <div className="text-2xl font-display font-bold text-white">
                      Jahe Berkualitas
                    </div>
                    <div className="text-warmth-200 font-sans mt-2">
                      Processed with Care
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
