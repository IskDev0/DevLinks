import {defineStore} from "pinia";

export const useUserStore = defineStore("user", () => {

    const firstName = ref<string>("")
    const lastName = ref<string>("")
    const email = ref<string>("")
    const image = ref<string>("")
    const bgColor = ref<string>("#ffffff")
    const textColor = ref<string>("#000000")
    const cardColor = ref<string>("#ffffff")

    const clearUserStore = (): void => {
        firstName.value = ""
        lastName.value = ""
        email.value = ""
        image.value = ""
        bgColor.value = "#ffffff"
        textColor.value = "#000000"
        cardColor.value = "#ffffff"
    }

    return {
        firstName, lastName, email, image, clearUserStore, bgColor, textColor, cardColor
    }
})