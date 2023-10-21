<script setup>
defineProps(["error"])

function handleClearError(){
  clearError({
    redirect: "/"
  })
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="bg-white rounded-xl shadow-md p-4 text-center w-[400px] max-w-[400px]">
    <h1 class="text-8xl font-bold text-violet-700">{{ error.statusCode }}</h1>
      <p class="text-xl py-4">Ooops something went wrong</p>
      <p class="text-3xl pb-4">{{ error.message }}</p>
      <button @click="handleClearError" class="w-full py-2 px-4 border-2 border-purple-700 text-purple-700 font-bold rounded-lg hover:bg-violet-700 hover:text-white transition ease-in-out duration-300">Go Home</button>
    </div>
  </div>
</template>