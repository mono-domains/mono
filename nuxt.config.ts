import fetch from 'node-fetch'

const apiBase = 'http://localhost'

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
      apiBase
    }
  },
  
  hooks: {
    'nitro:config': async (nitroConfig) => {
      if (nitroConfig.dev) {
        return
      }

      // Fetch all the routes from the API
      const apiRequest = await fetch(apiBase + '/extension/all')
      const apiJson = await apiRequest.json()

      // Then add them to the prerender routes list
      apiJson.results.forEach((extension) => {
        nitroConfig.prerender.routes.push(`/extensions/${extension.name}`)
      })
    }
  }
})
