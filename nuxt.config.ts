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
  nitro: {
    preset: "vercel",
    storage: {
      data: {
        driver: 'vercelKV'
        /* Vercel KV driver options */
      }
    }
  },
  modules: ["@nuxt/ui", "@pinia/nuxt",
    // "@vite-pwa/nuxt"
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['w3m-button'].includes(tag),
    },
  },

})