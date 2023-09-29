export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
      "@pinia/nuxt",
      "@nuxtjs/tailwindcss",
      "nuxt-headlessui",
      "@nuxtjs/supabase"
  ],
    supabase: {
        redirect: false
    }
})
