import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'

import App from './App.jsx'
import id from './i18n/locales/id.json'
import en from './i18n/locales/en.json'

/**
 * Render satu rute menjadi string HTML saat build.
 *
 * Setiap rute mendapat instance i18n sendiri supaya bahasa satu halaman tidak
 * bocor ke halaman berikutnya dalam proses build yang sama.
 */
export async function render(url, locale = 'id') {
  const i18n = createInstance()
  await i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: 'id',
    supportedLngs: ['id', 'en'],
    defaultNS: 'translation',
    resources: { id: { translation: id }, en: { translation: en } },
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  })

  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </StaticRouter>
    </React.StrictMode>
  )
}

export { ROUTES } from './seo/routes'
export { renderHead } from './seo/head'
