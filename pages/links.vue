<script setup lang="ts">
import {useLinkStore} from "~/stores/link";
import {storeToRefs} from "pinia";
import {useSupabaseUser} from "#imports";
import Database from "~/utils/types/database";
import LinkItemType from "~/utils/types/linkItemType";

const router = useRouter()

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const linkStore = useLinkStore()

const {links, platformsList, filledLinks, showError} = storeToRefs(linkStore)

function addLinks(): void {
  const availablePlatforms = getAvailablePlatforms();

  if (availablePlatforms.length > 0) {
    links.value.push({id: links.value.length + 1, platform: availablePlatforms[0], href: ""});
  }
}

function getAvailablePlatforms(): string[] {
  const allPlatforms = links.value.map(link => link.platform);
  return platformsList.value.filter(platform => !allPlatforms.includes(platform));
}

async function uploadUserLinks(): Promise<void> {

  const {data: existingData, error} = await fetchUserLinks();

  const filledLinksValue = filterFilledLinks(links.value);

  if (filledLinksValue.length === links.value.length) {
    if (existingData?.length === 0) {
      await insertUserLinks();
    } else {
      await updateUserLinks();
    }
  } else {
    showError.value = true;
  }
}

async function fetchUserLinks() {
  const {data, error} = await supabase
      .from('links')
      .select('*')
      .eq('userId', user.value?.id)

  return data
}

function filterFilledLinks(linksValue: LinkItemType[]): LinkItemType[] {
  return linksValue.filter(link => link.href.trim() !== "");
}

async function insertUserLinks(): Promise<void> {
  const linkData = {
    "GitHub": getLinkByPlatform("GitHub"),
    "GitLab": getLinkByPlatform("GitLab"),
    "LinkedIn": getLinkByPlatform("LinkedIn"),
    "Twitter": getLinkByPlatform("Twitter"),
    "Youtube": getLinkByPlatform("Youtube"),
    "userId": user.value?.id
  };

  const {data, error} = await supabase
      .from('links')
      .insert([linkData]);

  if (error) {
    throw error;
  }

  await router.push("/profile");
}

async function updateUserLinks(): Promise<void> {
  const linkData = {
    "GitHub": getLinkByPlatform("GitHub"),
    "GitLab": getLinkByPlatform("GitLab"),
    "LinkedIn": getLinkByPlatform("LinkedIn"),
    "Twitter": getLinkByPlatform("Twitter"),
    "Youtube": getLinkByPlatform("Youtube"),
  };

  const {data, error} = await supabase
      .from('links')
      .update(linkData)
      .eq('userId', user.value?.id)
      .select();

  await router.push("/profile");
}

function getLinkByPlatform(platform: string): string | undefined {
  return links.value.find(link => link.platform === platform)?.href;
}


function closeError(): void {
  showError.value = false
}

async function getUserPreviousLinks() {
  const {data, error} = await
      supabase
          .from("links")
          .select("GitHub, GitLab, LinkedIn, Twitter, Youtube")
          .eq("userId", user.value?.id)
          .single()

  if (error) {
    throw error;
  }else {
    return data
  }
}

onMounted(async ():Promise<void> => {
  let previousData = await getUserPreviousLinks()

  if (previousData !== null) {
    let currentId = 1;
    const outputArray = Object.entries(previousData)
        .filter(([key, value]) => value !== null)
        .map(([key, value], index) => ({
          id: currentId + index,
          href: value,
          platform: key
        }));

    links.value = outputArray
  } else {
    links.value = []
  }
})


</script>

<template>
  <section class="container mx-auto mt-10">
    <div class="flex items-start gap-24">
      <div class="w-1/3 h-screen">
        <LinksPreview :links="links"/>
      </div>
      <div class="w-2/3 bg-white py-8 px-6 rounded-xl">
        <h1 class="text-3xl font-bold">Customize your links</h1>
        <p class="text-gray-500 pt-4 pb-8">Add/edit/remove links below and then share all your profiles with the
          world!</p>
        <button @click="addLinks"
                class="w-full py-2 px-4 border-2 border-purple-700 text-purple-700 font-bold rounded-lg">+ Add new link
        </button>
        <LinksList :links="links"/>
        <div class="flex justify-end">
          <button @click="uploadUserLinks" class="mt-10 text-white bg-purple-700 py-2 px-6 rounded-lg text-lg self-end">
            Save
          </button>
        </div>
      </div>
    </div>
  </section>
  <ErrorMessage @close="closeError" v-if="showError"/>
</template>
