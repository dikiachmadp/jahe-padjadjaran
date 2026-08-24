import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { m, LayoutGroup } from 'framer-motion';
import { NAVIGATION } from '../data/constants';
import { useLanguage } from '../context/LanguageContext';
import { ROUTES, findRoute } from '../seo/routes';

// Icons Mapping
import {
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineCube,
  HiOutlineUserGroup,
  HiOutlinePhotograph,
  HiOutlineMail
} from 'react-icons/hi';

const NAV_ICONS = {
  home: <HiOutlineHome size={22} />,
  about: <HiOutlineInformationCircle size={22} />,
  products: <HiOutlineCube size={22} />,
  partners: <HiOutlineUserGroup size={22} />,
  gallery: <HiOutlinePhotograph size={22} />,
  contact: <HiOutlineMail size={22} />,
};

const MobileBottomNav = ({ activeSection, onNavigate, isAtBottom }) => {
  const { t } = useLanguage();
  const isFullWidth = isAtBottom;

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-[70] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isFullWidth ? 'px-0 pb-0' : 'px-4 pb-6'
        }`}
    >
      <div className={`flex items-center justify-around relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isFullWidth
        ? 'bg-transparent shadow-none border-none rounded-none px-0 py-4 pb-[env(safe-area-inset-bottom,1rem)]'
        : 'bg-white/85 backdrop-blur-xl border-t border-x border-b border-white/20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-[2.5rem] px-2 py-2'
        }`}>
        <LayoutGroup id="nav-indicator-mobile">
          {NAVIGATION.map((item) => {
            const isActive = activeSection === item.href;

            return (
              <button
                key={item.href}
                onClick={() => onNavigate(item.href)}
                className="relative flex flex-col items-center justify-center flex-1 py-1 outline-none tap-highlight-transparent"
              >
                {isActive && (
                  <m.div
                    layoutId="active-pill-mobile"
                    className={`absolute inset-0 rounded-2xl mx-1 ${isFullWidth ? 'bg-warmth-600/20 scale-110' : 'bg-warmth-600/10'
                      }`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <m.span
                  animate={{
                    y: isActive ? -2 : 0,
                    scale: isFullWidth && isActive ? 1.15 : 1
                  }}
                  className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-warmth-800' : 'text-zinc-500'
                    }`}
                >
                  {NAV_ICONS[item.key]}
                </m.span>

                <span className={`text-[9px] mt-1 font-sans font-black uppercase tracking-tighter transition-all duration-300 ${isActive ? 'text-warmth-800 opacity-100' : 'opacity-0 h-0'
                  }`}>
                  {t(`nav.${item.key}`)}
                </span>
              </button>
            );
          })}
        </LayoutGroup>
      </div>
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const { t, isIndonesian } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const currentRoute = findRoute(location.pathname);
  const homePath = isIndonesian ? '/' : '/en/';
  const isHome = currentRoute?.page === 'home';

  // Varian transparan hanya masuk akal di atas hero gelap beranda. Di halaman
  // lain latarnya terang, sehingga teks putih akan hilang — pakai varian solid.
  const isSolid = isScrolled || !isHome;

  const triggerHaptic = useCallback(() => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(12);
  }, []);

  // Menu utama menunjuk ke section di beranda. Dari halaman lain, arahkan dulu
  // ke beranda dengan hash-nya; scroll dikerjakan setelah halaman berganti.
  const scrollToSection = useCallback((href) => {
    triggerHaptic();
    if (!isHome) {
      navigate(`${homePath}${href}`);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }, [triggerHaptic, isHome, navigate, homePath]);

  // Pergantian bahasa berarti pindah ke URL padanan, bukan sekadar mengganti
  // string — tiap bahasa punya rute sendiri agar bisa diindeks terpisah.
  const switchLanguage = useCallback(() => {
    const target = ROUTES.find(
      (r) => r.pairKey === (currentRoute?.pairKey ?? 'home') && r.locale !== (currentRoute?.locale ?? 'id')
    );
    navigate(target ? target.path : (isIndonesian ? '/en/' : '/'));
  }, [currentRoute, navigate, isIndonesian]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setIsScrolled(currentScrollY > 20);

      const atBottom = currentScrollY + windowHeight >= documentHeight - 10;
      setIsAtBottom(atBottom);

      if (!isHome) return;
      const sections = [...NAVIGATION].reverse();
      for (const item of sections) {
        const element = document.querySelector(item.href);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(item.href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Setelah pindah ke beranda dengan hash (mis. dari halaman produk), gulung ke
  // section tujuan begitu elemennya sudah ada di DOM.
  useEffect(() => {
    if (!isHome || !location.hash) return;
    const element = document.querySelector(location.hash);
    if (!element) return;
    const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }, [isHome, location.hash]);

  return (
    <>
      <MobileBottomNav
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isAtBottom={isAtBottom}
      />

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isSolid ? 'top-4 mx-4 md:top-0 md:mx-0' : 'top-0 mx-0'
          }`}
      >
        <div
          className={`transition-all duration-500 ${isSolid ? 'bg-white/95 backdrop-blur-md shadow-lg rounded-2xl md:rounded-none border border-white/20' : 'bg-transparent'
            }`}
        >
          <nav className="max-w-7xl mx-auto px-6">
            <div className={`flex items-center justify-between transition-all duration-500 ${isSolid ? 'h-16 md:h-20' : 'h-20 md:h-24'
              }`}>
              <Link to={homePath} aria-label={t('nav.home')} className="z-10 flex items-center">
                <div className={`transition-all duration-500 ${isSolid ? 'w-32 md:w-52' : 'w-40 md:w-60'}`}>
                  <img
                    src="/img/logo-240.webp"
                    srcSet="/img/logo-240.webp 240w, /img/logo-480.webp 480w"
                    sizes="(min-width: 768px) 240px, 160px"
                    alt="Permen Jahe Padjajaran"
                    width={240}
                    height={128}
                    fetchpriority="high"
                    decoding="async"
                    className="w-full h-auto"
                  />
                </div>
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                {NAVIGATION.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`text-sm font-sans font-bold tracking-tight transition-all duration-300 hover:text-warmth-600 relative group ${isSolid ? 'text-heritage-800' : 'text-white'
                      }`}
                  >
                    {t(`nav.${item.key}`)}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-warmth-600 transition-all duration-500 ${activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-1/2'
                      }`} />
                  </button>
                ))}

                <button
                  onClick={switchLanguage}
                  className={`ml-4 px-4 py-2 rounded-full border-2 text-xs font-black transition-all duration-300 ${isSolid
                    ? 'border-heritage-100 text-heritage-900 bg-heritage-50'
                    : 'border-white/20 text-white bg-white/10 hover:bg-white/20'
                    }`}
                >
                  {isIndonesian ? 'ENGLISH' : 'BAHASA'}
                </button>
              </div>

              <div className="md:hidden flex items-center">
                <button
                  onClick={switchLanguage}
                  className={`px-3 py-1.5 rounded-xl font-sans font-bold text-xs shadow-md transition-all duration-300 active:scale-90 ${isSolid
                    ? 'text-white bg-warmth-600 border border-warmth-700'
                    : 'text-white bg-white/20 border border-white/30 backdrop-blur-sm'
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