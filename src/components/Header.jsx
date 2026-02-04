import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION } from '../data/constants';
import { useLanguage } from '../context/LanguageContext';

// Navigation icons configuration
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
  pricing: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
};

// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose, activeSection, onNavigate }) => {
  const menuRef = useRef(null);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Prevent event propagation on menu click
  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  const mobileMenuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      x: 50,
      opacity: 0,
    },
    open: (index) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.1 + index * 0.05,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />

          {/* Mobile Menu Panel */}
          <motion.div
            ref={menuRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 overflow-y-auto"
            onClick={handleMenuClick}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-heritage-100">
              <span className="font-display font-bold text-heritage-900 text-lg">
                Menu
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-heritage-100 flex items-center justify-center text-heritage-600 hover:bg-heritage-200 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Items */}
            <div className="py-4 px-4 space-y-2">
              {NAVIGATION.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => onNavigate(item.href)}
                  custom={index}
                  variants={menuItemVariants}
                  className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl font-sans font-medium transition-all duration-300 ${activeSection === item.href
                      ? 'bg-warmth-50 text-warmth-600 shadow-sm'
                      : 'text-heritage-800 hover:bg-heritage-50 hover:text-warmth-600'
                    }`}
                >
                  <span
                    className={`transition-colors ${activeSection === item.href ? 'text-warmth-500' : 'text-heritage-400'
                      }`}
                  >
                    {NAV_ICONS[item.key]}
                  </span>
                  <span>{item.key.charAt(0).toUpperCase() + item.key.slice(1)}</span>
                  {activeSection === item.href && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-warmth-500 rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-heritage-100 my-4" />

            {/* Language Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="px-4"
            >
              <div className="bg-heritage-50 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-xl">🇮🇩</span>
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-heritage-900">
                        Bahasa Indonesia
                      </p>
                      <p className="text-xs text-heritage-500">
                        Current language
                      </p>
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 bg-warmth-500 text-white rounded-xl font-sans font-semibold text-sm hover:bg-warmth-600 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                  >
                    Switch
                  </button>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="px-4 pb-4 mt-4"
            >
              <button
                onClick={() => onNavigate('#contact')}
                className="w-full btn-primary py-4 text-lg shadow-warmth-500/30"
              >
                Contact Us
              </button>
            </motion.div>

            {/* Brand Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-heritage-50 to-transparent"
            >
              <div className="flex items-center justify-center space-x-2 text-heritage-400">
                <span className="text-sm">by</span>
                <span className="font-display font-semibold text-heritage-600">Jahe Padjajaran</span>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const { language, toggleLanguage, t, isIndonesian } = useLanguage();

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = NAVIGATION.map(item => item.href);
      for (const href of sections.reverse()) {
        const element = document.querySelector(href);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const scrollToSection = useCallback((href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(href);
    }
  }, []);

  const handleNavigate = useCallback((href) => {
    scrollToSection(href);
    closeMobileMenu();
  }, [scrollToSection, closeMobileMenu]);

  return (
    <>
      {/* Mobile Menu - rendered outside header for proper z-index */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
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
                <span
                  className={`font-display font-bold text-lg transition-colors ${isScrolled || isMobileMenuOpen ? 'text-heritage-900' : 'text-white'
                    }`}
                >
                  Jahe Padjajaran
                </span>
                <span
                  className={`text-xs font-sans transition-colors ${isScrolled || isMobileMenuOpen ? 'text-heritage-600' : 'text-warmth-100'
                    }`}
                >
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
                  className={`font-sans font-medium transition-all duration-300 hover:text-warmth-600 relative group ${isScrolled || isMobileMenuOpen ? 'text-heritage-800' : 'text-white'
                    }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {t(`nav.${item.key}`)}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-warmth-500 transition-all duration-300 group-hover:w-full ${activeSection === item.href ? 'w-full' : 'w-0'
                      }`}
                  />
                </button>
              ))}

              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 border-2 ${isScrolled || isMobileMenuOpen
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
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden relative w-10 h-10 rounded-lg transition-colors flex items-center justify-center ${isScrolled || isMobileMenuOpen
                  ? 'text-heritage-900 hover:bg-heritage-100'
                  : 'text-white hover:bg-white/10'
                }`}
              aria-label="Toggle menu"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="sr-only">Toggle menu</span>
              <div className="relative w-6 h-6">
                <motion.span
                  className="absolute top-0 left-0 w-full h-0.5 bg-current rounded-full"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 10 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute top-1/2 left-0 w-full h-0.5 bg-current rounded-full"
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-current rounded-full"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -10 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

