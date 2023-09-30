<script setup lang="ts">
import {useLinkStore} from "~/stores/link";
import {storeToRefs} from "pinia";
import LinksPreview from "~/components/LinksPreview.vue";
const linkStore = useLinkStore()

const {links, platformsList} = storeToRefs(linkStore)

function addLinks (): void {
  const availablePlatforms = getAvailablePlatforms();

  if (availablePlatforms.length > 0) {
    links.value.push({id: links.value.length + 1, platform: availablePlatforms[0], href: ''});
  }
}

function getAvailablePlatforms (): string[] {
  const allPlatforms = linkStore.links.map(link => link.platform);
  return platformsList.value.filter(platform => !allPlatforms.includes(platform));
}
</script>

<template>
  <section class="container mx-auto mt-10">
    <div class="flex items-start gap-24">
      <div class="w-1/3 h-screen">
      <LinksPreview :links="links"/>
      </div>
    <div class="w-2/3 bg-white py-8 px-6 rounded-xl">
      <h1 class="text-3xl font-bold">Customize your links</h1>
      <p class="text-gray-500 pt-4 pb-8">Add/edit/remove links below and then share all your profiles with the
        world!</p>
      <button @click="addLinks"
              class="w-full py-2 px-4 border-2 border-purple-700 text-purple-700 font-bold rounded-lg">+ Add new link
      </button>
      <LinksList :links="links"/>
    </div>
    </div>
  </section>
</template>
