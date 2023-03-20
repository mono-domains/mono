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

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost'
    }
  }
})
