import getUserPreviousLinks from "~/utils/getUserPreviousLinks";
import {useLinkStore} from "~/stores/link";
import {storeToRefs} from "pinia";

async function loadUserPreviousLinks() {

    const linkStore = useLinkStore()

    const {links} = storeToRefs(linkStore)

    // @ts-ignore
    let previousData = await getUserPreviousLinks()

    if (previousData !== null) {
        let currentId = 1;
        const outputArray = Object.entries(previousData)
            .filter(([key, value]) => value !== null)
            .map(([key, value], index) => ({
                id: currentId + index,
                href: value,
                platform: key
            }));

        links.value = outputArray
    } else {
        links.value = []
    }
}

export default loadUserPreviousLinks