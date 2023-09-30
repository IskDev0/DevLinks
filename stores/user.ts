import {defineStore} from "pinia";

export const useUserStore = defineStore("user", () => {

    const firstName = ref<string>("")
    const lastName = ref<string>("")
    const email = ref<string>("")
    const image = ref<string>("")

    return {
        firstName, lastName, email, image
    }
})