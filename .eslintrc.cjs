module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'dist-ssr', 'node_modules', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',

    // eslint-plugin-react mengikuti konvensi React 19 yang menulis atribut ini
    // camelCase. Proyek ini masih di React 18, yang justru memperingatkan di
    // runtime bila `fetchPriority` dipakai dan meminta bentuk huruf kecil.
    // Bentuk huruf kecil yang dipakai di sini sudah diverifikasi tidak
    // memunculkan peringatan saat render maupun saat hydration.
    'react/no-unknown-property': ['error', { ignore: ['fetchpriority'] }],
  },
  overrides: [
    {
      // Berkas ini bukan modul komponen untuk Fast Refresh: entry SSR yang
      // dipanggil script build, dan modul non-React.
      files: ['src/entry-server.jsx', 'src/context/LanguageContext.jsx', 'scripts/**'],
      rules: { 'react-refresh/only-export-components': 'off' },
    },
  ],
}
