import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/index.js'
import App from './App.jsx'

// Font di-self-host. Sebelumnya dimuat lewat @import Google Fonts di dalam CSS,
// yang memaksa browser menunggu CSS selesai sebelum bahkan tahu font mana yang
// perlu diunduh. Satu berkas variabel per keluarga menggantikan 14 berkas statis.
import '@fontsource-variable/playfair-display/wght.css'
import '@fontsource-variable/lora/wght.css'
import '@fontsource-variable/montserrat/wght.css'

import './index.css'

const container = document.getElementById('root')

const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// Build produksi menyajikan HTML yang sudah dirender penuh (lihat
// scripts/prerender.mjs), jadi cukup dihidrasi. Server dev Vite mengirim
// container kosong — di situ render biasa yang dipakai.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
