<script setup lang="ts">
import {useLinkStore} from "@/stores/link";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import {useUserStore} from "~/stores/user";

const user = useSupabaseUser()
const router = useRouter()
const userStore = useUserStore()
const linkStore = useLinkStore();
const {links, filledLinks, showError, errorMessage} = storeToRefs(linkStore);
const {firstName, lastName, image, email, bgColor, textColor, cardColor} = storeToRefs(userStore)

const isBioFilled = computed(() => {
  return firstName.value !== "" && lastName.value !== "" && image.value !== "" && email.value !== ""
})

function showPreview(): void {
  filledLinks.value = links.value.filter(link => link.href.trim() !== "")
  linkStore.closeError()
  if (links.value.length === filledLinks.value.length && isBioFilled.value) {
    router.push("/preview")
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
    errorMessage.value = "Please fill all fields"
    showError.value = true
  }
}
</script>

<template>
  <header class="container mx-auto bg-white rounded-xl">
    <div class="p-4 my-4 flex items-center justify-between">
    <RouterLink class="font-bold text-2xl" to="/">DevLinks</RouterLink>
    <nav class="hidden md:flex items-center gap-4 text-lg">
      <RouterLink to="/links">Links</RouterLink>
      <RouterLink to="/profile">Profile Details</RouterLink>
    </nav>
      <nav class="flex items-center gap-4 text-lg md:hidden">
        <RouterLink to="/links"><Icon name="mdi:link-variant"/></RouterLink>
        <RouterLink to="/profile"><Icon name="mdi:account"/></RouterLink>
      </nav>
    <button @click="showPreview" class="hidden py-2 px-4 border-2 border-violet-700 rounded-lg font-bold text-violet-700 md:block">
      Preview
    </button>
      <button @click="showPreview" class="block py-2 px-4 border-2 border-violet-700 rounded-lg font-bold text-violet-700 md:hidden">
        <Icon name="mdi:eye"/>
      </button>
    </div>
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