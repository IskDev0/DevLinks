<script setup lang="ts">
import {useLinkStore} from "~/stores/link";
import {useUserStore} from "~/stores/user";
import {storeToRefs} from "pinia";
import linkColor from "~/utils/linkColor";

definePageMeta({
  layout: "ho-header"
})

const linkStore = useLinkStore();
const userStore = useUserStore();
const user = useSupabaseUser()
const {firstName, lastName, image, email} = storeToRefs(userStore)
const {links} = storeToRefs(linkStore)

onMounted(() => {
  loadUserPreviousLinks()
  loadUserPreviousDetails()
})

async function copyLink() {
  await navigator.clipboard.writeText(`${window.location.origin}/share/${user.value?.id}`)
}
</script>

<template>
  <header class="flex items-center justify-between bg-white p-4 m-4 rounded-xl">
    <RouterLink class="py-2 px-4 border-2 border-violet-700 rounded-lg font-bold text-violet-700" to="/links">Back to
      Editor
    </RouterLink>
    <button @click="copyLink" class="py-2 px-4 bg-violet-700 rounded-lg font-bold text-white">Share Link</button>
  </header>
  <section>
    <div class="container mx-auto">
      <div class="w-[400px] mx-auto flex flex-col items-center gap-4 bg-white px-4 py-8 rounded-xl mt-32">
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
    </div>
  </section>
</template>