export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
      "@pinia/nuxt",
      "@nuxtjs/tailwindcss",
      "nuxt-headlessui",
      "@nuxtjs/supabase",
      "nuxt-icon"
  ],
    supabase: {
        redirect: false
    },
    ssr: true
})
