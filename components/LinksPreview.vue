<script setup lang="ts">

import linkColor from "~/utils/linkColor";
import {PropType} from "vue";
import LinkItemType from "~/utils/types/linkItemType";
import {useUserStore} from "~/stores/user";
import {storeToRefs} from "pinia";

const userStore = useUserStore()

const {firstName, lastName, image, email, bgColor, textColor, cardColor} = storeToRefs(userStore)

defineProps({
  links: {
    type: Array as PropType<LinkItemType[]>
  }
})
</script>

<template>
    <div class="flex flex-col items-center">
      <div class="relative md:w-[300px] lg:w-[400px]" :style="{color: textColor}">
        <img
            :style="{backgroundColor: bgColor}"
            class="h-[calc(100%-100px)] rounded-[45px] lg:rounded-[60px]"
            src="/phone.png"
            alt="phone"
        >


        <div :style="{backgroundColor: cardColor}" class="flex flex-col items-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-[calc(100%-100px)] py-4 rounded-xl">
          <img
              class="rounded-full w-32 h-32 mb-8"
              :src="image ? image : '/placeholder.png'"
              alt="profile"
          >
          <div class="flex flex-col items-center">
            <div class="px-8 break-words text-xl font-bold">
              {{ firstName }} {{ lastName }}
            </div>
            <span class="opacity-80">{{ email }}</span>
          </div>

          <div class="flex flex-col gap-4 mt-5 overflow-x-hidden w-full py-5 rounded-xl">
            <TransitionGroup name="list">
              <div class="px-4" v-for="link in links" :key="link.id">
                <div class="w-full flex items-center gap-2 py-2 px-4 rounded-lg border-[1px] border-white/50" :class="linkColor(link)">
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