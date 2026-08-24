import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FAQ_ID, FAQ_EN } from '../seo/routes';

/**
 * Daftar pertanyaan yang sering diajukan.
 *
 * Sengaja dibangun dengan <details>/<summary> asli, bukan state React, supaya
 * seluruh jawaban tetap ada di HTML hasil prerender dan terbaca crawler tanpa
 * JavaScript — sekaligus menjadi sumber untuk structured data FAQPage.
 */
const FAQ = () => {
  const { t, isIndonesian } = useLanguage();
  const items = isIndonesian ? FAQ_ID : FAQ_EN;
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="section-container max-w-4xl">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-warmth-100 text-warmth-700 rounded-full text-sm font-sans font-medium mb-4">
            {t('faq.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-heritage-900 mb-6">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-heritage-700 font-body leading-relaxed">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="divide-y divide-warmth-100 border-y border-warmth-100">
          {items.map((item, index) => (
            <details
              key={item.question}
              open={open === index}
              onToggle={(e) => e.currentTarget.open && setOpen(index)}
              className="group py-5"
            >
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none text-left">
                <h3 className="text-base md:text-lg font-sans font-bold text-heritage-900 group-open:text-warmth-700 transition-colors">
                  {item.question}
                </h3>
                <ChevronDown
                  className="w-5 h-5 shrink-0 mt-0.5 text-warmth-600 transition-transform duration-300 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 pr-9 text-heritage-700 font-body leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
