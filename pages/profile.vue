<script setup lang="ts">
import {useLinkStore} from "~/stores/link";
import {storeToRefs} from "pinia";
const linkStore = useLinkStore();

const {links} = storeToRefs(linkStore)
</script>

<template>
  <section class="flex items-start gap-24">
    <div class="w-1/3 h-screen">
      <LinksPreview :links="links"/>
    </div>
<ProfileDetails/>
  </section>
</template>