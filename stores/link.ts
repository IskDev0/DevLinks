import {defineStore} from "pinia";
import LinkItemType from "~/utils/types/linkItemType";

export const useLinkStore = defineStore("links", () => {

    const links = ref<LinkItemType[]>([
        {
            id: 1,
            href: "https://github.com",
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

    const showError = ref<boolean>(false)

    return {
        links, platformsList, deleteItem, filledLinks, showError
    }
})