<script setup lang="ts">

import linkColor from "~/utils/linkColor";
import {PropType} from "vue";
import LinkItemType from "~/utils/types/linkItemType";
import {useUserStore} from "~/stores/user";
import {storeToRefs} from "pinia";

const userStore = useUserStore()

const {firstName, lastName, image, email} = storeToRefs(userStore)

defineProps({
  links: {
    type: Array as PropType<LinkItemType[]>
  }
})
</script>

<template>
    <div class="flex flex-col items-center">
      <div class="relative w-[400px]">
        <img
            class="h-[calc(100%-100px)]"
            src="/phone.png"
            alt="phone"
        >


        <div class="flex flex-col items-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-[calc(100%-50px)]">
          <img
              class="rounded-full w-32 h-32 mb-8"
              :src="image ? image : '/placeholder.png'"
              alt="profile"
          >
          <div class="flex flex-col items-center">
            <div class="px-8 break-words text-xl font-bold">
              {{ firstName }} {{ lastName }}
            </div>
            <span class="text-gray-400">{{ email }}</span>
          </div>

          <div class="flex flex-col gap-4 mt-10 overflow-x-hidden w-full">
            <TransitionGroup name="list">
              <div class="px-4" v-for="link in links" :key="link.id">
                <div class="w-full flex items-center gap-2 py-2 px-4 rounded-lg" :class="linkColor(link)">
                  <img
                      :src="linkImage(link)" alt="icon"><span>{{ link.platform }}</span></div>
              </div>
            </TransitionGroup>
          </div>
      </div>
      </div>
    </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>