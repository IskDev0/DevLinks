import {defineStore} from "pinia";

export const useLinkStore = defineStore("links", () => {

    const links = ref<LinkItemType>([
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

    return {
        links, platformsList, deleteItem
    }
})