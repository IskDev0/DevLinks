<script setup lang="ts">
import {useUserStore} from "~/stores/user";
import {storeToRefs} from "pinia";
import {useSupabaseClient} from "#imports";
import Database from "~/utils/types/database";

const userStore = useUserStore()
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const {firstName, lastName, image, email, bgColor, textColor, cardColor} = storeToRefs(userStore)

const showNotification = ref<boolean>(false)

async function uploadUserDetails() {
  showNotification.value = true
  const existingData = await fetchUserDetails()

  if (existingData === null) {
    await insertUserDetails()
  } else {
    await updateUserDetails()
  }

  setTimeout(() => {
    showNotification.value = false
  }, 1500)

}

async function fetchUserDetails() {
  const {data, error} = await supabase
      .from('userDetails')
      .select('*')
      .eq('userId', user.value?.id)
      .single()

  return data
}

async function insertUserDetails() {
  const {data, error} = await supabase
      .from('userDetails')
      .insert([
        {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          image: image.value,
          userId: user.value?.id
        },
      ])
      .select()
}

async function updateUserDetails() {
  const {data, error} = await supabase
      .from('userDetails')
      .update({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        image: image.value
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
}

function extractImageFromURL(){
  return image.value.substring(image.value.lastIndexOf("/") + 1)
}

const imageUrl = ref<string>()
const file = ref()
const handleFileInputChange = async (e: { target: { files: any[]; }; }) => {
  file.value = e.target.files[0]
  if (!file.value) return

  const {data, error} = await supabase.storage
      .from('avatars')
      .upload(`${user.value?.id}/${file.value.name}`, file.value, {
        cacheControl: '3600',
        upsert: true
      })

  if (error) {
    throw error
  }

  const oldImage = extractImageFromURL()

  const {error:removeError} = await supabase
      .storage
      .from('avatars')
      .remove([`${user.value?.id}/${oldImage}`])

  if (removeError){
    console.error(error)
  }


  const { data:imageURl } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(`${user.value?.id}/${file.value.name}`)

  image.value = imageURl.publicUrl

  imageUrl.value = URL.createObjectURL(file.value)

  const {data:updateData, error:updateError} = await supabase
      .from('userDetails')
      .update({
        image: image.value
      })
      .eq('userId', user.value?.id)
      .select()


  localStorage.setItem("userDetails", JSON.stringify({
    firstName: firstName.value,
    lastName: lastName.value,
    image: image.value,
    email: email.value,
    bgColor: bgColor.value,
    textColor: textColor.value,
    cardColor: cardColor.value
  }))
}

const imagePreview = computed(() => {
  return imageUrl.value ? imageUrl.value : "/placeholder.png"
})

</script>

<template>
  <div class="w-full md:w-1/2 lg:w-2/3 bg-white py-8 px-6 rounded-xl">
    <h1 class="text-3xl font-bold">Profile Details</h1>
    <p class="text-gray-500 pt-4 pb-8">Add your details to create a personal touch to your profile.</p>
    <div class="flex flex-col gap-8 text-gray-500">
      <div class="flex items-start gap-4 justify-between bg-gray-100 rounded-xl p-4 md:items-center">
        <h2 class="hidden md:block">Profile picture</h2>

        <div class="h-40 w-40">
          <label
              class="rounded-lg cursor-pointer bg-gray-50">
            <div class="relative">
              <img class="rounded-xl border-[1px] border-gray-200 aspect-square" :src="imagePreview"
                   alt="profile image">
              <span v-if="!imagePreview"
                    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-xs text-center">Click to change image</span>
            </div>
            <input @change="handleFileInputChange" type="file" class="hidden"/>
          </label>
        </div>

        <span class="w-64">Image must be bellow 1024 x 1024px. Use PNG, JPG, or BPM format.</span>
      </div>
      <div class="bg-gray-100 p-4 rounded-xl">
        <form class="flex flex-col gap-4">
          <label class="flex items-center justify-between" for="firstName"><span class="w-1/2">First name*</span> <input
              v-model="firstName"
              class="outline-1 w-1/2 py-2 px-4 bg-white border-2 border-gray-200 rounded-lg focus:outline-purple-700"
              type="text" placeholder="John" id="firstName"></label>
          <label class="flex items-center justify-between" for="lastName"><span class="w-1/2">Last name*</span> <input
              v-model="lastName"
              class="outline-1 w-1/2 py-2 px-4 bg-white border-2 border-gray-200 rounded-lg focus:outline-purple-700"
              type="text" placeholder="Smith" id="lastName"></label>
          <label class="flex items-center justify-between" for="email"><span class="w-1/2">Email</span> <input
              v-model="email"
              class="outline-1 w-1/2 py-2 px-4 bg-white border-2 border-gray-200 rounded-lg focus:outline-purple-700"
              type="text" placeholder="john.smith@gmail.com" id="email"></label>
        </form>
      </div>
      <button @click="uploadUserDetails" class="text-white bg-purple-700 py-2 px-6 rounded-lg text-lg self-end">Save</button>
    </div>
  </div>
  <Transition name="slide">
  <div v-if="showNotification" class="flex items-center gap-2 fixed bottom-10 right-10 z-10 bg-violet-700 text-white py-2 px-4 rounded-xl">
    <Icon name="mdi:content-save" width="24" height="24"/>
    <p>Your data is saved</p>
  </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>