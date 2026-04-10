import { COMPANY_INFO } from '../data/constants';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-heritage-900 text-white pt-16 pb-8 overflow-hidden">
      <div className="section-container">
        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row md:justify-between items-start gap-10 mb-12">

          {/* Brand & Mission */}
          <div className="space-y-6 max-w-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-warmth-500 to-warmth-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-3">
                <span className="text-white text-xl font-bold">JP</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-white uppercase">
                  Jahe Padjajaran
                </span>
                <span className="text-xs font-sans text-warmth-400 tracking-widest uppercase font-medium">
                  Premium Spices & Heritages
                </span>
              </div>
            </div>
            <p className="text-warmth-200 font-body leading-relaxed text-sm md:text-base opacity-75">
              {t('footer.description')}
            </p>
          </div>

          {/* Location Focus - Minimalist */}
          <div className="md:text-right">
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-4 text-warmth-500">
              {t('footer.location', 'Origin')}
            </h4>
            <p className="text-warmth-100 font-body text-sm md:text-base leading-relaxed md:max-w-xs md:ml-auto opacity-90">
              {COMPANY_INFO.address}
            </p>
            <div className="mt-6 flex md:justify-end">
              <span className="inline-flex items-center px-4 py-1.5 bg-heritage-800 border border-heritage-700 text-warmth-400 rounded-full text-[10px] font-sans uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                Export Quality Standard
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal & Disclaimer */}
        <div className="pt-8 border-t border-heritage-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-warmth-500 text-[11px] md:text-xs font-body mb-2">
                &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. {t('footer.bottom.rights')}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-[10px] text-heritage-500 font-sans tracking-wide">
                <span>NIB: {COMPANY_INFO.legal.nib}</span>
                <span>NPWP: {COMPANY_INFO.legal.npwp}</span>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end space-y-1 opacity-40">
              <span className="text-[9px] font-sans text-warmth-400 tracking-[0.3em] uppercase">Authentic Indonesian Product</span>
              <div className="h-0.5 w-12 bg-warmth-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;