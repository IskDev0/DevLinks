import getUserPreviousLinks from "~/utils/getUserPreviousLinks";
import {useUserStore} from "~/stores/user";
import {storeToRefs} from "pinia";

async function loadUserPreviousDetails() {

    const userStore = useUserStore()

    const {firstName, lastName, image, email} = storeToRefs(userStore)

    // @ts-ignore
    let previousData = await getUserPreviousDetails()

        if (previousData !== null){
            firstName.value = previousData.firstName
            lastName.value = previousData.lastName
            image.value = previousData.image
            email.value = previousData.email
        }else {
            firstName.value = ""
            lastName.value = ""
            image.value = ""
            email.value = ""
        }


}

export default loadUserPreviousDetails