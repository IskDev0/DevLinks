<template>
  <div class="flex flex-col gap-10 mt-10">
    <LinkItem :link="link" :index="index" v-for="(link, index) in links" :key="link.id"/>
  </div>
</template>

<script setup lang="ts">
import LinkItem from "@/components/LinkItem.vue";
import type {PropType} from "vue";
import type LinkItemType from "@/utils/types/linkItemType";

defineProps({
  links: {
    type: Array as PropType<LinkItemType[]>,
  }
})
</script>