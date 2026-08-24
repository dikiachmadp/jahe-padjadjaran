import { m } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { COMPANY_INFO, waLink, telLink, mailLink } from '../data/constants';
import { trackWhatsApp, trackEmail } from '../analytics/ga';
import { useLanguage } from '../context/LanguageContext';
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Handshake
} from 'lucide-react';

const Contact = () => {
  const [ref, isVisible] = useScrollAnimation(0.15);
  const { t } = useLanguage();

  const ctaBenefits = t('contact.cta.benefits', { returnObjects: true }) || [];
  const socialProofItems = t('contact.socialProof.items', { returnObjects: true }) || [];

  // Definisi animasi yang lebih ringan untuk performa
  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    animate: isVisible ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const contactMethods = [
    {
      icon: <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />,
      key: 'whatsapp',
      value: COMPANY_INFO.whatsapp,
      link: waLink(),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Phone className="w-5 h-5 md:w-6 md:h-6" />,
      key: 'phone',
      value: COMPANY_INFO.phone,
      link: telLink,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />,
      key: 'email',
      value: COMPANY_INFO.email,
      link: mailLink,
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-warmth-50 to-heritage-50 overflow-hidden">
      <div className="section-container">
        <m.div
          ref={ref}
          {...fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 bg-warmth-100 text-warmth-700 rounded-full text-sm font-sans font-medium mb-4">
            {t('contact.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-heritage-900 mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-lg md:text-xl text-heritage-700 max-w-3xl mx-auto font-body leading-relaxed px-4">
            {t('contact.subtitle')}
          </p>
        </m.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Info Kontak */}
          <div className="space-y-6">
            <m.h3
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl font-display font-bold text-heritage-900"
            >
              {t('contact.contactInfo')}
            </m.h3>

            <div className="grid gap-4">
              {contactMethods.map((method, index) => (
                <m.a
                  key={method.key}
                  href={method.link}
                  onClick={() => {
                    if (method.key === 'whatsapp') trackWhatsApp('contact_card');
                    if (method.key === 'email') trackEmail('contact_card');
                  }}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.01, x: 5 }}
                  style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                  className="card-elevated p-4 md:p-6 group flex items-center space-x-4 transition-shadow hover:shadow-xl"
                >
                  <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                    {method.icon}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-xs md:text-sm text-heritage-500 font-sans uppercase tracking-wider mb-0.5">
                      {t(`contact.methods.${method.key}`)}
                    </div>
                    <div className="text-base md:text-lg font-body font-semibold text-heritage-900 truncate">
                      {method.value}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-heritage-300 group-hover:text-warmth-600 transition-colors" />
                </m.a>
              ))}
            </div>

            {/* Alamat */}
            <m.div
              {...fadeInUp}
              transition={{ delay: 0.5 }}
              className="card-elevated p-5 md:p-6 border-l-4 border-warmth-500 bg-white"
            >
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-warmth-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-xs md:text-sm text-heritage-500 font-sans uppercase tracking-wider mb-1">
                    {t('contact.address')}
                  </div>
                  <div className="text-heritage-900 font-body leading-relaxed text-sm md:text-base">
                    {COMPANY_INFO.address}
                  </div>
                </div>
              </div>
            </m.div>
          </div>

          {/* Kartu CTA Kemitraan */}
          <m.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
            className="bg-gradient-to-br from-heritage-800 to-heritage-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-warmth-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-warmth-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl transform rotate-3">
                  <Handshake size={40} className="text-heritage-900" />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-warmth-300">
                  {t('contact.cta.title')}
                </h3>
                <p className="text-warmth-100 font-body text-base md:text-lg">
                  {t('contact.cta.description')}
                </p>
              </div>

              <div className="space-y-4 mb-10">
                {ctaBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-warmth-400 flex-shrink-0" />
                    <span className="text-warmth-100 font-body text-sm md:text-base">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <m.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={waLink('Halo, saya tertarik untuk bermitra dengan Permen Jahe Padjajaran')}
                onClick={() => trackWhatsApp('contact_cta')}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-4 text-lg font-bold text-heritage-900 bg-warmth-400 rounded-xl hover:bg-warmth-300 transition-colors shadow-lg shadow-warmth-900/20"
              >
                {t('contact.cta.whatsapp')}
              </m.a>

              <div className="mt-6 text-center">
                <a
                  href={mailLink}
                  onClick={() => trackEmail('contact_cta')}
                  className="text-warmth-200 hover:text-warmth-100 font-body text-sm underline transition-colors"
                >
                  {t('contact.cta.email')}
                </a>
              </div>
            </div>
          </m.div>
        </div>

        {/* Banner Bukti Sosial */}
        <m.div
          {...fadeInUp}
          transition={{ delay: 0.6 }}
          className="mt-12 md:mt-20 bg-white rounded-2xl p-6 md:p-10 shadow-xl text-center"
        >
          <p className="text-heritage-700 font-body text-lg mb-6">
            {t('contact.socialProof.text')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {socialProofItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 group">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm md:text-base text-heritage-600 font-sans font-medium uppercase tracking-wide">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default Contact;