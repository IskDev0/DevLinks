<script setup lang="ts">

</script>

<template>
  <header class="py-4">
    <div class="container mx-auto">
      <div class="flex items-center justify-between bg-white p-4 rounded-xl">
        <RouterLink class="font-bold text-2xl" to="/">DevLinks</RouterLink>
        <nav class="flex items-center gap-4">
          <RouterLink to="/login">Sign In</RouterLink>
          <RouterLink class="py-2 px-4 bg-violet-700 text-white rounded-xl" to="/register">Sign Up</RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>