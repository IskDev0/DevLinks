<script setup lang="ts">
import {useLinkStore} from "~/stores/link";
import {storeToRefs} from "pinia";
import loadUserPreviousLinks from "~/utils/loadUserPreviousLinks";
import loadUserPreviousDetails from "~/utils/loadUserPreviousDetails";
import {useUserStore} from "~/stores/user";

const linkStore = useLinkStore();
const userStore = useUserStore()

const {links, errorMessage, showError} = storeToRefs(linkStore)

const {closeError} = linkStore


const {firstName, lastName, image, email, bgColor, textColor, cardColor} = storeToRefs(userStore)

onMounted(() => {
  const previousLinks = localStorage.getItem("links");
  const previousUserDetails = localStorage.getItem("userDetails");

  if (previousLinks != null && previousUserDetails != null) {
    const userDetails = JSON.parse(previousUserDetails);

    links.value = JSON.parse(previousLinks);
    firstName.value = userDetails.firstName;
    lastName.value = userDetails.lastName;
    image.value = userDetails.image;
    email.value = userDetails.email;
    bgColor.value = userDetails.bgColor;
    textColor.value = userDetails.textColor;
    cardColor.value = userDetails.cardColor;
  } else {
    loadUserPreviousLinks();
    loadUserPreviousDetails();
  }
})
</script>

<template>
  <section class="flex items-start gap-24 mt-10">
    <div class="hidden md:block md:w-1/2 lg:w-1/3 h-screen">
      <LinksPreview :links="links"/>
    </div>
    <ProfileDetails/>
  </section>
  <ErrorMessage :message="errorMessage" @close="closeError" v-if="showError"/>
</template>