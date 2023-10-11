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
    ssr: true
})
