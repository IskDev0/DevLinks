import {defineStore} from "pinia";

export const useUserStore = defineStore("user", () => {

    const firstName = ref<string>("Firstname")
    const lastName = ref<string>("Lastname")
    const email = ref<string>("something@test.com")
    const image = ref<string>("https://nuxtjs.ir/logos/nuxt-icon-white.png")

    return {
        firstName, lastName, email, image
    }
})