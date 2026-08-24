import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import DigitalLinkPage from './pages/DigitalLinkPage';
import PartnershipPage from './pages/PartnershipPage';
import NotFound from './pages/NotFound';

import { LanguageProvider } from './context/LanguageContext';
import { ROUTES, findRoute } from './seo/routes';
import { useSeo } from './seo/useSeo';
import { GTIN } from './data/constants';
import { initAnalytics, trackPageView, trackBarcodeScan } from './analytics/ga';
import i18n from './i18n/index.js';

const PAGES = {
  home: Home,
  product: ProductPage,
  digitalLink: DigitalLinkPage,
  partnership: PartnershipPage
};

/**
 * Menjaga <head> dan bahasa aktif tetap sinkron dengan rute, lalu menggulung
 * halaman ke atas saat berpindah rute (tapi tidak saat hanya hash yang berubah,
 * karena itu navigasi antar-section di beranda).
 */
const RouteEffects = () => {
  const location = useLocation();
  const route = findRoute(location.pathname);

  useSeo(route);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (!route) return;
    trackPageView(route.path, route.title);
    // Halaman Digital Link hanya dicapai lewat pindaian QR di kemasan atau
    // pencarian angka barcode, jadi kunjungannya dicatat terpisah.
    if (route.page === 'digitalLink') trackBarcodeScan(GTIN.ean13);
  }, [route]);

  useEffect(() => {
    if (route && i18n.language !== route.locale) {
      i18n.changeLanguage(route.locale);
    }
  }, [route]);

  useEffect(() => {
    if (location.hash) return;
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return null;
};

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <LanguageProvider>
        <RouteEffects />
        <div className="relative overflow-x-hidden">
          <Header />
          <main className="overflow-x-hidden">
            <Routes>
              {ROUTES.map((route) => {
                const Page = PAGES[route.page];
                return <Route key={route.path} path={route.path} element={<Page />} />;
              })}

              {/* Varian penulisan GTIN yang mungkin diketik manual, diarahkan ke
                  bentuk kanonik GTIN-14. Padanannya di sisi server ada di
                  deploy/.htaccess sebagai redirect 301. */}
              <Route path={`/01/${GTIN.ean13}`} element={<Navigate to={`/01/${GTIN.gtin14}/`} replace />} />
              <Route path={`/01/${GTIN.upcA}`} element={<Navigate to={`/01/${GTIN.gtin14}/`} replace />} />
              <Route path={`/barcode/${GTIN.ean13}`} element={<Navigate to={`/01/${GTIN.gtin14}/`} replace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </LazyMotion>
  );
}

export default App;
