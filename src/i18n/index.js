import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translations directly (bundled with app)
import id from './locales/id.json'
import en from './locales/en.json'

// Supported languages
export const supportedLanguages = ['id', 'en']
export const defaultLanguage = 'id'

// i18n configuration
i18n
  // Pass to react-i18next
  .use(initReactI18next)

// Initialize i18n
i18n.init({
  supportedLngs: supportedLanguages,
  fallbackLng: defaultLanguage,
  defaultNS: 'translation',

  // Bundle translations directly
  resources: {
    id: { translation: id },
    en: { translation: en }
  },

  // Interpolation
  interpolation: {
    escapeValue: false, // React already safe from XSS
  },

  // React configuration
  react: {
    useSuspense: false,
  },
})

export default i18n
