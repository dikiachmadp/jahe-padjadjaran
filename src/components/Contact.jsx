import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { COMPANY_INFO } from '../data/constants';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const { t } = useLanguage();

  const formatWhatsAppNumber = (number) => {
    if (!number) return '';
    return number.replace(/\D/g, '').replace(/^0/, '62');
  };

  const WHATSAPP_MESSAGE = encodeURIComponent(
    "Halo, saya tertarik untuk bermitra dengan Permen Jahe Padjajaran"
  );

  const whatsappUrl = `https://wa.me/${formatWhatsAppNumber(
    COMPANY_INFO.whatsapp
  )}?text=${WHATSAPP_MESSAGE}`;

  const ctaBenefits = t('contact.cta.benefits', { returnObjects: true }) || [];
  const socialProofItems = t('contact.socialProof.items', { returnObjects: true }) || [];

  const contactMethods = [
    {
      key: 'whatsapp',
      value: COMPANY_INFO.whatsapp,
      link: whatsappUrl,
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-20 bg-gradient-to-b from-warmth-50 to-heritage-50">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-heritage-900 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-heritage-700 max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto bg-gradient-to-br from-heritage-800 to-heritage-700 rounded-2xl p-8 text-white shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-4 text-warmth-300 text-center">
            {t('contact.cta.title')}
          </h3>

          <div className="space-y-2 mb-6">
            {ctaBenefits.map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="text-warmth-300">✔</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* ✅ WHATSAPP BUTTON (FIXED) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold text-heritage-900 bg-warmth-400 rounded-full hover:bg-warmth-300 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            {t('contact.cta.whatsapp')}
          </a>

          <div className="mt-4 text-center">
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="text-warmth-200 hover:text-white text-sm underline"
            >
              {t('contact.cta.email')}
            </a>
          </div>
        </motion.div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-heritage-600">
            {socialProofItems.map((item, i) => (
              <span key={i}>✔ {item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;