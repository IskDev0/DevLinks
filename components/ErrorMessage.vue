<script setup lang="ts">

defineProps({
  message: {
    type: String,
    required: true
  }
})

const emit = defineEmits({
  close: null
})

function closeError(): void {
  emit("close")
}
</script>

<template>
<div class="fixed h-screen w-screen bg-black/[0.5] top-0 right-0">
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[500px] py-4 px-8 rounded-xl text-center">
    <h1 class="font-bold text-3xl">Error</h1>
    <p class="text-gray-400 mt-2 mb-4">{{message}}</p>
    <button @click="closeError" class="bg-red-500 text-white w-full uppercase rounded-md py-2">Ok</button>
  </div>
</div>
</template>