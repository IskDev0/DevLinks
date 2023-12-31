import {useUserStore} from "~/stores/user";
import {storeToRefs} from "pinia";

async function loadUserPreviousDetails() {

    const userStore = useUserStore()

    const {firstName, lastName, image, email, bgColor, textColor, cardColor} = storeToRefs(userStore)

    // @ts-ignore
    let previousData = await getUserPreviousDetails()

    if (previousData) {
        firstName.value = previousData.firstName
        lastName.value = previousData.lastName
        image.value = previousData.image
        email.value = previousData.email
        bgColor.value = previousData.bgColor
        textColor.value = previousData.textColor
        cardColor.value = previousData.cardColor

        localStorage.setItem("userDetails", JSON.stringify({
            firstName: firstName.value,
            lastName: lastName.value,
            image: image.value,
            email: email.value,
            bgColor: bgColor.value,
            textColor: textColor.value,
            cardColor: cardColor.value
        }))

    } else {
        firstName.value = "First name"
        lastName.value = "Last name"
        image.value = ""
        email.value = ""
        bgColor.value = "#ffffff"
        textColor.value = "#000000"
        cardColor.value = "#ffffff"
    }


}

export default loadUserPreviousDetails