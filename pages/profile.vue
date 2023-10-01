<script setup lang="ts">
import {useLinkStore} from "~/stores/link";
import {storeToRefs} from "pinia";
import loadUserPreviousLinks from "~/utils/loadUserPreviousLinks";

const linkStore = useLinkStore();

const {links} = storeToRefs(linkStore)

onMounted(() => {
  loadUserPreviousLinks()
})
</script>

<template>
  <section class="flex items-start gap-24 mt-10">
    <div class="w-1/3 h-screen">
      <LinksPreview :links="links"/>
    </div>
    <ProfileDetails/>
  </section>
</template>