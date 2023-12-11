// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/buy/distributer/**': { ssr: false },
    '/authenticate/**': { ssr: false }
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  modules: ["@nuxt/ui", "@pinia/nuxt",
    // "@vite-pwa/nuxt"
  ],

})