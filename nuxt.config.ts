// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: '/fonts/fonts.css' }
      ]
    }
  },

  modules: ['@nuxtjs/tailwindcss'],
  
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost'
    }
  }
})
