<script setup lang="ts">
import {useLinkStore} from "~/stores/link";
import {storeToRefs} from "pinia";
import {useSupabaseUser} from "#imports";
import Database from "~/utils/types/database";
import LinkItemType from "~/utils/types/linkItemType";
import loadUserPreviousLinks from "~/utils/loadUserPreviousLinks";
import {useUserStore} from "~/stores/user";

const router = useRouter()

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const linkStore = useLinkStore()
const userStore = useUserStore()

const {links, platformsList, filledLinks, showError, errorMessage, isLoading} = storeToRefs(linkStore)
const {firstName, lastName, image, email, bgColor, textColor, cardColor} = storeToRefs(userStore)
const {closeError} = linkStore

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

  try {
    isLoading.value = true
    toggleScroll(true)
    const existingData = await fetchUserLinks();

    const filledLinksValue = filterFilledLinks(links.value);

    errorMessage.value = ""

    if (filledLinksValue.length === links.value.length) {
      if (existingData?.length === 0) {
        await insertUserLinks();
      } else {
        await updateUserLinks();
      }

    } else {
      errorMessage.value = "Please fill all fields"
      showError.value = true;
    }
  } catch (error) {
    errorMessage.value = error.message
    showError.value = true
  }
  isLoading.value = false
  toggleScroll(false)
}

async function fetchUserLinks() {
  const {data, error} = await supabase
      .from('links')
      .select('*')
      .eq('userId', user.value?.id)

  if (data !== null) {
    return data
  } else {
    return null
  }
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

  const {data: colors} = await supabase
      .from('userDetails')
      .insert({
        bgColor: bgColor.value,
        textColor: textColor.value,
        cardColor: cardColor.value
      })

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

  localStorage.setItem("links", JSON.stringify(links.value))

  const {data: colors, error: errorColor} = await supabase
      .from('userDetails')
      .update({
        bgColor: bgColor.value,
        textColor: textColor.value,
        cardColor: cardColor.value
      })
      .eq('userId', user.value?.id)
      .select();

  localStorage.setItem("userDetails", JSON.stringify({
    firstName: firstName.value,
    lastName: lastName.value,
    image: image.value,
    email: email.value,
    bgColor: bgColor.value,
    textColor: textColor.value,
    cardColor: cardColor.value
  }))

  await router.push("/profile");
}

function getLinkByPlatform(platform: string): string | undefined {
  return links.value.find(link => link.platform === platform)?.href;
}

onMounted(() => {
  const previousLinks = localStorage.getItem("links");
  const previousUserDetails = localStorage.getItem("userDetails");

  if (previousLinks != null && previousUserDetails != null) {
    const userDetails = JSON.parse(previousUserDetails);

    links.value = JSON.parse(previousLinks);
    firstName.value = userDetails.firstName;
    lastName.value = userDetails.lastName;
    image.value = userDetails.image;
    email.value = userDetails.email;
    bgColor.value = userDetails.bgColor;
    textColor.value = userDetails.textColor;
    cardColor.value = userDetails.cardColor;
  } else {
    loadUserPreviousLinks();
    loadUserPreviousDetails();
  }
})


function toggleScroll(type: boolean): void {
  type ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
}


</script>

<template>
  <section class="container mx-auto mt-10">
    <div class="flex items-start gap-8 md:gap-12 lg:gap-24">
      <div class="hidden md:block md:w-1/2 lg:w-1/3 h-screen">
        <LinksPreview :links="links"/>
      </div>
      <div class="w-full w-1/2 md:w-2/3 bg-white py-8 px-6 rounded-xl">
        <h1 class="text-3xl font-bold">Customize your links</h1>
        <p class="text-gray-500 pt-4 pb-8">Add/edit/remove links below and then share all your profiles with the
          world!</p>
        <button @click="addLinks"
                class="w-full py-2 px-4 border-2 border-purple-700 text-purple-700 font-bold rounded-lg">+ Add new link
        </button>
        <div class="bg-[#eeeeee] rounded-xl p-4 mt-10">
          <h2 class="font-semibold text-xl text-gray-400 mb-4">Select colors</h2>
          <div class="flex flex-col gap-4">
            <label class="flex items-center gap-4 bg-white cursor-pointer" for="bgColor">
              <input class="h-8 w-8" type="color" v-model="bgColor" id="bgColor">
              <span>Background color</span>
            </label>
            <label class="flex items-center gap-4 bg-white cursor-pointer" for="textColor">
              <input class="h-8 w-8" type="color" v-model="textColor" id="textColor">
              <span>Text color</span>
            </label>
            <label class="flex items-center gap-4 bg-white cursor-pointer" for="cardColor">
              <input class="h-8 w-8" type="color" v-model="cardColor" id="cardColor">
              <span>Card color</span>
            </label>
          </div>
        </div>
        <LinksList :links="links"/>
        <div class="flex justify-end">
          <button @click="uploadUserLinks" class="mt-10 text-white bg-purple-700 py-2 px-6 rounded-lg text-lg self-end">
            Save
          </button>
        </div>
      </div>
    </div>
  </section>
  <ErrorMessage :message="errorMessage" @close="closeError" v-if="showError"/>
  <TheSpinner v-if="isLoading"/>
</template>
