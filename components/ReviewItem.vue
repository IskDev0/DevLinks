<script setup lang="ts">
import {PropType} from "vue";
import ReviewItemType from "~/utils/types/reviewItemType";

defineProps({
  review: {
    type: Object as PropType<ReviewItemType>,
    required: true
  }
})
</script>

<template>
  <article class="flex flex-col items-start p-4 rounded-xl bg-white">
    <div class="flex items-center gap-3">
      <img class="rounded-full h-16" :src="review.image" alt="review">
      <h1 class="font-bold text-xl">{{ review.name }}</h1>
    </div>
    <p class="mt-2">{{ review.text }}</p>
  </article>
</template>