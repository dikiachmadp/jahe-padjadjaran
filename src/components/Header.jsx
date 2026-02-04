import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION } from '../data/constants';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t, isIndonesian } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <nav className="section-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('#hero')}
            className="flex items-center space-x-3 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-warmth-500 to-warmth-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white text-xl font-bold">JP</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-bold text-lg transition-colors ${isScrolled ? 'text-heritage-900' : 'text-white'
                }`}>
                Jahe Padjajaran
              </span>
              <span className={`text-xs font-sans transition-colors ${isScrolled ? 'text-heritage-600' : 'text-warmth-100'
                }`}>
                Rempah Nusantara
              </span>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {NAVIGATION.map((item, index) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`font-sans font-medium transition-colors hover:text-warmth-600 ${isScrolled ? 'text-heritage-800' : 'text-white'
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 border-2 ${isScrolled
                ? 'border-heritage-200 text-heritage-800 hover:border-warmth-500'
                : 'border-white/30 text-white hover:border-warmth-300 hover:bg-white/10'
                }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              aria-label={t('language.switch')}
            >
              <span className="text-lg">{isIndonesian ? '🇮🇩' : '🇺🇸'}</span>
              <span className="font-sans font-bold text-sm">
                {isIndonesian ? 'EN' : 'ID'}
              </span>
            </motion.button>

            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary"
            >
              {t('nav.contactUs')}
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-heritage-900' : 'text-white'
              }`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-2">
                {NAVIGATION.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-3 font-sans font-medium text-heritage-800 hover:bg-warmth-50 rounded-lg transition-colors"
                  >
                    {t(`nav.${item.key}`)}
                  </button>
                ))}

                {/* Mobile Language Toggle */}
                <div className="flex items-center justify-between px-4 py-3 bg-warmth-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{isIndonesian ? '🇮🇩' : '🇺🇸'}</span>
                    <span className="font-sans font-medium text-heritage-800">
                      {isIndonesian ? 'English' : 'Bahasa Indonesia'}
                    </span>
                  </div>
                  <button
                    onClick={toggleLanguage}
                    className="px-4 py-2 bg-warmth-500 text-white rounded-lg font-sans font-medium hover:bg-warmth-600 transition-colors"
                  >
                    {isIndonesian ? 'Switch' : 'Ganti'}
                  </button>
                </div>

                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-primary w-full mt-4"
                >
                  {t('nav.contactUs')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
