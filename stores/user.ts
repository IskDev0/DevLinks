import {defineStore} from "pinia";

export const useUserStore = defineStore("user", () => {

    const firstName = ref<string>("")
    const lastName = ref<string>("")
    const email = ref<string>("")
    const image = ref<string>("")

    const clearUserStore = ():void => {
        firstName.value = ""
        lastName.value = ""
        email.value = ""
        image.value = ""
    }

    return {
        firstName, lastName, email, image, clearUserStore
    }
})