import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION } from '../data/constants';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logos/logo.png';

// Icons configuration
const NAV_ICONS = {
  home: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  about: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  products: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  partners: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  contact: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  gallery: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

// Bottom Navigation Component
const MobileBottomNav = ({ isVisible, activeSection, onNavigate }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-lg border-t border-heritage-100 shadow-[0_-8px_20px_rgba(0,0,0,0.05)] px-4 pb-safe pt-2"
        >
          <div className="flex items-center justify-around h-16 max-w-md mx-auto">
            {NAVIGATION.map((item) => (
              <button
                key={item.href}
                onClick={() => onNavigate(item.href)}
                className={`flex flex-col items-center justify-center flex-1 transition-colors duration-300 ${activeSection === item.href ? 'text-warmth-600' : 'text-heritage-400'
                  }`}
              >
                <span className="mb-1">{NAV_ICONS[item.key]}</span>
                <span className="text-[10px] font-sans font-bold uppercase tracking-tighter">{item.key}</span>
              </button>
            ))}
          </div>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { toggleLanguage, t, isIndonesian } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Top Navbar mengecil jadi pil setelah scroll > 20px
      setIsScrolled(currentScrollY > 20);

      // Bottom Nav Smart Hide (Hanya bottom nav yang sembunyi)
      if (currentScrollY < lastScrollY.current || currentScrollY < 10) {
        setIsBottomNavVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsBottomNavVisible(false);
      }
      lastScrollY.current = currentScrollY;

      // Update Active Section
      const sections = [...NAVIGATION].reverse();
      for (const item of sections) {
        const element = document.querySelector(item.href);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(item.href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(href);
    }
  }, []);

  const handleNavigate = useCallback((href) => {
    scrollToSection(href);
  }, [scrollToSection]);

  return (
    <>
      {/* Bottom Nav hanya sembunyi saat scroll ke bawah */}
      <MobileBottomNav
        isVisible={isBottomNavVisible}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Top Header: Mengecil jadi pil di mobile, tidak pernah sembunyi */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
            ? 'top-4 mx-4 md:top-0 md:mx-0'
            : 'top-0 mx-0'
          }`}
      >
        <div
          className={`transition-all duration-500 ${isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-lg rounded-2xl md:rounded-none'
              : 'bg-transparent'
            }`}
        >
          <nav className="section-container">
            <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'
              }`}>
              {/* Logo */}
              <motion.button
                onClick={() => scrollToSection('#hero')}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className={`transition-all duration-500 ${isScrolled ? 'w-32 md:w-52' : 'w-40 md:w-60'}`}>
                  <img src={logo} alt="Logo" className="w-full h-auto" />
                </div>
              </motion.button>

              {/* Desktop Navigation */}
              <motion.div
                className="hidden md:flex items-center space-x-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {NAVIGATION.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`font-sans font-medium transition-all duration-300 hover:text-warmth-600 relative group ${isScrolled ? 'text-heritage-800' : 'text-white'
                      }`}
                  >
                    {t(`nav.${item.key}`)}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-warmth-500 transition-all duration-300 group-hover:w-full ${activeSection === item.href ? 'w-full' : 'w-0'}`} />
                  </button>
                ))}

                {/* Desktop Language Toggle: Text Only */}
                <button
                  onClick={toggleLanguage}
                  className={`font-sans font-bold text-sm transition-all duration-300 border-2 px-3 py-1.5 rounded-lg ${isScrolled ? 'border-heritage-200 text-heritage-800' : 'border-white/30 text-white'
                    }`}
                >
                  {isIndonesian ? 'EN' : 'ID'}
                </button>

                <button onClick={() => scrollToSection('#contact')} className="btn-primary">
                  {t('nav.contactUs')}
                </button>
              </motion.div>

              {/* Mobile Right Action: Text Only Toggle */}
              <div className="md:hidden flex items-center space-x-2">
                <button
                  onClick={toggleLanguage}
                  className={`px-3 py-1.5 rounded-xl font-sans font-bold text-xs transition-all duration-300 ${isScrolled
                      ? 'text-heritage-900 bg-heritage-50 border border-heritage-100'
                      : 'text-white bg-white/10 border border-white/20'
                    }`}
                >
                  {isIndonesian ? 'EN' : 'ID'}
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;