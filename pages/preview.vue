<script setup lang="ts">
import {useLinkStore} from "~/stores/link";
import {useUserStore} from "~/stores/user";
import {storeToRefs} from "pinia";
import linkColor from "~/utils/linkColor";
import loadUserPreviousLinks from "~/utils/loadUserPreviousLinks";
import loadUserPreviousDetails from "~/utils/loadUserPreviousDetails";

definePageMeta({
  layout: "no-header"
})

const linkStore = useLinkStore();
const userStore = useUserStore();
const user = useSupabaseUser()
const {firstName, lastName, image, email, bgColor, textColor, cardColor} = storeToRefs(userStore)
const {links} = storeToRefs(linkStore)

const showCopyMessage = ref<boolean>(false)

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

async function copyLink() {
  showCopyMessage.value = true
  await navigator.clipboard.writeText(`${window.location.origin}/share/${user.value?.id}`)
  setTimeout(() => {
    showCopyMessage.value = false
  }, 1500)
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 flex items-center justify-between bg-white p-4 m-4 rounded-xl mx-4">
    <RouterLink class="py-2 px-4 border-2 border-violet-700 rounded-lg font-bold text-violet-700" to="/links">Back to
      Editor
    </RouterLink>
    <button @click="copyLink" class="py-2 px-4 bg-violet-700 rounded-lg font-bold text-white">Share Link</button>
  </header>
  <section class="h-screen flex flex-col items-center justify-center px-4" :style="{backgroundColor: bgColor, color: textColor}">
      <div :style="{backgroundColor: cardColor}" class="w-[300px] max-w-[400px] mx-auto flex flex-col items-center gap-4 bg-white px-4 py-8 rounded-xl mt-32">
        <div class="flex flex-col items-center">
          <img class="rounded-full w-32 h-32" :src="image ? image : '/placeholder.png'" alt="profile">
          <h1 class="text-xl font-bold mt-4">{{ firstName }} {{ lastName }}</h1>
          <span class="text-gray-400">{{ email }}</span>
        </div>
        <TransitionGroup name="list">
          <div class="px-4 w-full" v-for="link in links" :key="link.id">
            <a :href="link.href" target="_blank"
               class="w-full flex items-center justify-between gap-2 py-2 px-4 rounded-lg" :class="linkColor(link)">
              <span class="flex items-center gap-2">
              <img
                  :src="linkImage(link)" alt="icon"><span>{{ link.platform }}</span>
                </span>
              <Icon name="mdi:arrow-right"/>
            </a>
          </div>
        </TransitionGroup>
      </div>
  </section>
<Transition name="slide">
  <div v-if="showCopyMessage" class="fixed right-10 bottom-10 text-center bg-white w-[200px] mx-auto py-2 px-8 font-bold rounded-xl text-violet-700 shadow-xl">URL copied</div>
</Transition>
</template>

<style scoped>
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>