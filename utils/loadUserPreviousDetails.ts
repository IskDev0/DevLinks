import getUserPreviousLinks from "~/utils/getUserPreviousLinks";
import {useUserStore} from "~/stores/user";
import {storeToRefs} from "pinia";

async function loadUserPreviousDetails() {

    const userStore = useUserStore()

    const {firstName, lastName, image, email, bgColor, textColor, cardColor} = storeToRefs(userStore)

    // @ts-ignore
    let previousData = await getUserPreviousDetails()

        if (previousData !== null){
            firstName.value = previousData.firstName
            lastName.value = previousData.lastName
            image.value = previousData.image
            email.value = previousData.email
            bgColor.value = previousData.bgColor
            textColor.value = previousData.textColor
            cardColor.value = previousData.cardColor

        }else {
            firstName.value = ""
            lastName.value = ""
            image.value = ""
            email.value = ""
            bgColor.value = "#ffffff"
            textColor.value = "#000000"
            cardColor.value = "#ffffff"
        }


}

export default loadUserPreviousDetails