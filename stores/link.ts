import {defineStore} from "pinia";
import LinkItemType from "~/utils/types/linkItemType";

export const useLinkStore = defineStore("links", () => {

    const links = ref<LinkItemType[]>([
        {
            id: 1,
            href: "",
            platform: "GitHub"
        }
    ])

    const platformsList = ref<string[]>([
        "GitHub",
        "GitLab",
        "LinkedIn",
        "Twitter",
        "Youtube"

    ])

    const deleteItem = (index: number):void => {
        if (links.value.length > 1) {
            links.value = links.value.filter((link, i):boolean => i !== index)
        }
    }

    const filledLinks = ref<LinkItemType[]>([])

    const isLoading = ref<boolean>(false)

    const showError = ref<boolean>(false)

    const errorMessage = ref<string>("")

    const closeError = ():void => {
        showError.value = false
        errorMessage.value = ""
    }

    return {
        links, platformsList, deleteItem, filledLinks, showError, errorMessage, closeError, isLoading
    }
})