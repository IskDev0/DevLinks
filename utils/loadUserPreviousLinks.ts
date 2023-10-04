import getUserPreviousLinks from "~/utils/getUserPreviousLinks";
import {useLinkStore} from "~/stores/link";
import {storeToRefs} from "pinia";

async function loadUserPreviousLinks() {
    const linkStore = useLinkStore()
    const {links} = storeToRefs(linkStore)

    // @ts-ignore
    let previousData = await getUserPreviousLinks()

    if (Object.keys(previousData).length > 0 && previousData !== null) {
        let currentId = 1;
        // @ts-ignore
        links.value = Object.entries(previousData)
            .filter(([key, value]) => value !== null)
            .map(([key, value], index) => ({
                id: currentId + index,
                href: value,
                platform: key
            }))
    } else {
        links.value = [
            {
                id: 1,
                href: "",
                platform: "GitHub"
            }
        ]
    }
}


export default loadUserPreviousLinks