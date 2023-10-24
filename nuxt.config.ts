export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
      "@pinia/nuxt",
      "@nuxtjs/tailwindcss",
      "nuxt-headlessui",
      "@nuxtjs/supabase",
      "nuxt-icon",
      "nuxt-swiper"
  ],
    supabase: {
        redirect: false
    },
    ssr: true,
    app: {
      head: {
          title: "DevLinks",
          htmlAttrs: {
            lang: "en-US"
          },
          meta: [
              {
                  name: "description",
                  content: "Devlinks is an amazingly user-friendly service designed for those who want to simplify access to their social networks, online portfolios, and other important resources."
              },
          ],
          link: [
              {
                  rel: 'icon',
                  type: 'image/png',
                  href: '/favicon.svg'
              }
          ]
      }
    }
})
