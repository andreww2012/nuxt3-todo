// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-svgo',
    '@nuxtjs/google-fonts',
  ],

  imports: {
    autoImport: false,
  },

  typescript: {
    shim: false,
  },

  alias: {
    // https://github.com/nuxt/nuxt/issues/14585#issuecomment-1397362390
    pinia:
      process.env.NODE_ENV === 'production'
        ? '/node_modules/pinia/dist/pinia.mjs'
        : '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  },

  googleFonts: {
    families: {
      Inter: [400, 900],
    },
  },
});
