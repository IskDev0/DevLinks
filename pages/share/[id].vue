<script setup lang="ts">
import {useLinkStore} from "~/stores/link";
import {useUserStore} from "~/stores/user";
import Database from "~/utils/types/database";
import {storeToRefs} from "pinia";
import linkColor from "~/utils/linkColor";
import ProfileShareSkeleton from "~/components/ProfileShareSkeleton.vue";

definePageMeta({
  layout: "ho-header"
})

const supabase = useSupabaseClient<Database>()
const route = useRoute()

const linkStore = useLinkStore()
const userStore = useUserStore()

const {links} = storeToRefs(linkStore)
const {firstName, lastName, image, email, bgColor, textColor} = storeToRefs(userStore)

async function loadCurrentUserLinks(): Promise<void> {
  const {data, error} = await supabase
      .from('links')
      .select('GitHub, GitLab, LinkedIn, Twitter, Youtube')
      .eq('userId', route.params.id)
      .single()

  //@ts-ignore
  links.value = data

  if (data !== null) {
    let currentId = 1;
    links.value = Object.entries(data)
        .filter(([key, value]) => value !== null)
        .map(([key, value], index) => ({
          id: currentId + index,
          href: value,
          platform: key
        }))
  } else {
    links.value = []
  }
}

async function loadCurrentUserDetails(): Promise<void> {
  const {data, error} = await supabase
      .from('userDetails')
      .select('*')
      .eq('userId', route.params.id)
      .single()

  firstName.value = data.firstName
  lastName.value = data.lastName
  image.value = data.image
  email.value = data.email
  bgColor.value = data.bgColor
  textColor.value = data.textColor
}

onMounted(() => {
  loadCurrentUserLinks()
  loadCurrentUserDetails()
})

</script>

<template>
  <section class="h-screen flex flex-col items-center justify-center" :style="{backgroundColor: bgColor, color: textColor}">
    <div class="container mx-auto">
      <div v-if="firstName && lastName && image && email" class="w-[400px] mx-auto flex flex-col items-center gap-4 px-4 py-8 rounded-xl shadow-2xl">
        <div class="flex flex-col items-center">
          <img class="rounded-full w-32 h-32" :src="image ? image : '/placeholder.png'" alt="profile">
          <h1 class="text-xl font-bold mt-4">{{ firstName }} {{ lastName }}</h1>
          <span class="opacity-78">{{ email }}</span>
        </div>
        <TransitionGroup name="list">
          <div class="px-4 w-full" v-for="link in links" :key="link.id">
            <a :href="link.href" target="_blank"
               class="w-full flex items-center justify-between gap-2 py-2 px-4 rounded-lg border-[1px] border-white/50" :class="linkColor(link)">
              <span class="flex items-center gap-2">
              <img
                  :src="linkImage(link)" alt="icon"><span>{{ link.platform }}</span>
                </span>
              <Icon name="mdi:arrow-right"/>
            </a>
          </div>
        </TransitionGroup>
      </div>
      <ProfileShareSkeleton v-else/>
    </div>
  </section>
</template>