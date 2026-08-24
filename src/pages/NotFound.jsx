import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const NotFound = () => {
  const { t, isIndonesian } = useLanguage();

  return (
    <section className="min-h-[70vh] flex items-center justify-center pt-28 pb-20">
      <div className="section-container text-center max-w-xl">
        <p className="font-sans font-bold text-warmth-600 tracking-[0.3em] mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-heritage-900 mb-4">
          {isIndonesian ? 'Halaman tidak ditemukan' : 'Page not found'}
        </h1>
        <p className="text-heritage-700 font-body mb-8">
          {isIndonesian
            ? 'Halaman yang Anda cari tidak ada atau sudah dipindahkan.'
            : 'The page you are looking for does not exist or has been moved.'}
        </p>
        <Link
          to={isIndonesian ? '/' : '/en/'}
          className="inline-flex items-center justify-center px-8 py-3 font-sans font-bold text-white bg-gradient-to-r from-warmth-600 to-warmth-500 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          {t('nav.home')}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
