<script setup lang="ts">

import linkColor from "~/utils/linkColor";
import {PropType} from "vue";
import LinkItemType from "~/utils/types/linkItemType";

defineProps({
  links: {
    type: Array as PropType<LinkItemType[]>
  }
})
</script>

<template>
  <ul class="flex flex-col gap-5 px-4">
    <li v-for="link in links">
      <div class="w-full flex items-center gap-2 py-2 px-4 rounded-lg" :class="linkColor(link)"><img
          :src="linkImage(link)" alt="icon"><span>{{ link.platform }}</span></div>
    </li>
  </ul>
</template>