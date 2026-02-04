import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { COMPANY_INFO } from '../data/constants';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const { t } = useLanguage();

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      key: 'phone',
      value: COMPANY_INFO.phone,
      link: `tel:${COMPANY_INFO.phone}`,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      key: 'email',
      value: COMPANY_INFO.email,
      link: `mailto:${COMPANY_INFO.email}`,
      color: 'from-red-500 to-red-600'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      key: 'whatsapp',
      value: COMPANY_INFO.whatsapp,
      link: `https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}`,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      key: 'instagram',
      value: COMPANY_INFO.instagram,
      link: `https://instagram.com/${COMPANY_INFO.instagram.replace('@', '')}`,
      color: 'from-pink-500 to-purple-600'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-warmth-50 to-heritage-50">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-warmth-100 text-warmth-700 rounded-full text-sm font-sans font-medium mb-4">
            {t('contact.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-heritage-900 mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-heritage-700 max-w-3xl mx-auto font-body leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-bold text-heritage-900 mb-8">
              {t('contact.contactInfo')}
            </h3>

            <div className="space-y-4 mb-8">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  target={method.key === 'instagram' ? '_blank' : undefined}
                  rel={method.key === 'instagram' ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="block card-elevated p-6 hover:scale-105 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-heritage-600 font-sans mb-1">
                        {t(`contact.methods.${method.key}`)}
                      </div>
                      <div className="text-lg font-body font-semibold text-heritage-900">
                        {method.value}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-heritage-400 group-hover:text-warmth-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="card-elevated p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-warmth-500 to-warmth-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-heritage-600 font-sans mb-1">
                    {t('contact.address')}
                  </div>
                  <div className="text-heritage-900 font-body leading-relaxed">
                    {COMPANY_INFO.address}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-heritage-800 to-heritage-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl sticky top-24"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-warmth-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-3xl font-display font-bold mb-4 text-warmth-300">
                {t('contact.cta.title')}
              </h3>
              <p className="text-warmth-100 font-body text-lg leading-relaxed">
                {t('contact.cta.description')}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {t('contact.cta.benefits').map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-warmth-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-warmth-100 font-body">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}?text=Halo,%20saya%20tertarik%20untuk%20bermitra%20dengan%20Permen%20Jahe%20Padjajaran`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-8 py-4 text-lg font-semibold text-heritage-900 bg-warmth-400 rounded-full hover:bg-warmth-300 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              {t('contact.cta.whatsapp')}
            </a>

            <div className="mt-6 text-center">
              <a
                href={`mailto:${COMPANY_INFO.email}?subject=Inquiry%20Kemitraan%20Permen%20Jahe%20Padjajaran`}
                className="text-warmth-200 hover:text-warmth-100 font-body text-sm underline transition-colors"
              >
                {t('contact.cta.email')}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Social Proof Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-white rounded-3xl p-8 shadow-xl text-center"
        >
          <p className="text-heritage-700 font-body text-lg mb-4">
            {t('contact.socialProof.text')}
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-heritage-600 font-sans">
            {t('contact.socialProof.items').map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

