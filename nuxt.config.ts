/* eslint-disable import/no-extraneous-dependencies */
import {FileSystemIconLoader} from 'unplugin-icons/loaders';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    [
      'unplugin-icons/nuxt',
      {
        customCollections: {
          _: FileSystemIconLoader('./assets/icons', (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" '),
          ),
        },
      },
    ],
  ],

  imports: {
    autoImport: false,
  },

  typescript: {
    shim: false,
  },

  googleFonts: {
    families: {
      Inter: [400, 700, 900],
    },
  },

  eslint: {
    emitWarning: false,
  },
});
