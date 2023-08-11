import fetch from 'node-fetch'

// const apiBase = process.env.NODE_ENV === 'development' ? 'http://localhost' : 'https://api.mono.domains'
const apiBase = 'https://api.mono.domains'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'mono domains - awesome domains for the cheapest prices',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'mono domains is a domain search engine that helps you find the cheapest domain names. with mono, you can find awesome domain names for the best prices!' },
        { name: 'format-detection', content: 'telephone=no' },
        { hid: 'canonical', rel: 'canonical', href: 'https://mono.domains' },
        { hid: 'twitter:site', name: 'twitter:site', content: 'https://mono.domains' },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://mono.domains/android-chrome-512x512.png' },
        { property: 'og:type', content: 'website' },
        { hid: 'og:title', property: 'og:title', content: 'mono domains - awesome domains for the cheapest prices' },
        { hid: 'og:description', property: 'og:description', content: 'mono domains is a domain search engine that helps you find the cheapest domain names. with mono, you can find awesome domain names for the best prices!' },
        { hid: 'og:url', property: 'og:url', content: 'https://mono.domains' },
        { property: 'og:site_name', content: 'mono domains' },
        { hid: 'og:image', property: 'og:image', content: 'https://mono.domains/android-chrome-512x512.png' }
      ],
      link: [
        { rel: 'stylesheet', href: '/fonts/fonts.css' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href:'/site.webmanifest' }
      ]
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-simple-sitemap'
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  ssr: true,

  sitemap: {
    siteUrl: 'https://mono.domains',
    trailingSlash: true,
  },
  
  runtimeConfig: {
    public: {
      apiBase
    }
  },

  vite: {
    logLevel: 'silent'
  },

  hooks: {
    'nitro:config': async (nitroConfig) => {
      if (nitroConfig.dev) {
        return
      }

      // Fetch all the routes from the API
      const apiRequest = await fetch(apiBase + '/extension/all')
      const apiJson = await apiRequest.json()

      nitroConfig.prerender.routes.push(`/extensions`)

      // Then add them to the prerender routes list
      Object.values(apiJson.results).forEach((extensionList) => {
        Object.values(extensionList).forEach((extension) => {
          // Files/directories starting with . are ignored in Netlify deploys,
          // so exclude the . from the generated route
          nitroConfig.prerender.routes.push(`/extensions/${extension.extension.substring(1)}`)
        })
      })
    }
  }
})
