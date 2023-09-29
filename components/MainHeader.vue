<script setup lang="ts">
import {useLinkStore} from "@/stores/link";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const router = useRouter()
const linkStore = useLinkStore();
const {links, filledLinks, showError} = storeToRefs(linkStore);

function showPreview(): void {
  filledLinks.value = links.value.filter(link => link.link.trim() !== "")
  showError.value = false
  if (links.value.length === filledLinks.value.length) {
    router.push("/preview")
  } else {
    showError.value = true
  }
}
</script>

<template>
  <header class="flex items-center justify-between container mx-auto bg-white p-4 my-4 rounded-xl">
    <RouterLink class="font-bold text-2xl" to="/">DevLinks</RouterLink>
    <nav class="flex items-center gap-4 text-lg">
      <RouterLink to="/links">Links</RouterLink>
      <RouterLink to="/profile">Profile Details</RouterLink>
    </nav>
    <button @click="showPreview" class="py-2 px-4 border-2 border-violet-700 rounded-lg font-bold text-violet-700">Preview</button>
  </header>
</template>

<style scoped>
.router-link-exact-active {
  color: #6d28d9;
  font-weight: bold;
  padding: 8px 30px;
  background: #ddd6fe;
  border-radius: 5px;
}
</style>