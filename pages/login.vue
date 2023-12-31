<script setup lang="ts">
import {useSupabaseClient} from "#imports";
import Database from "~/utils/types/database";
import {useLinkStore} from "~/stores/link";
import {storeToRefs} from "pinia";

definePageMeta({
  layout: "ho-header"
})

const linkStore = useLinkStore()
const {showError, errorMessage, isLoading} = storeToRefs(linkStore)
const {closeError} = linkStore

const showPassword = ref<boolean>(false)

const email = ref<string>()
const password = ref<string>()

const router = useRouter()
const supabase = useSupabaseClient<Database>()

const iconType = computed(() => showPassword.value ? 'mdi:eye-off' : 'mdi:eye')
const inputType = computed(() => showPassword.value ? 'text' : 'password')

async function signInWithEmail(): Promise<void> {
  isLoading.value = true
  try {
    closeError()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error){
      errorMessage.value = error.message
      showError.value = true
    }

  }catch (error) {
    console.error(error)
  }
  isLoading.value = false
  await router.push("/links")
}


</script>

<template>
  <section class="w-96 mx-auto">
    <div class="mt-10 mx-4">
      <h1 class="text-center font-bold text-3xl mb-10">Sign In</h1>
      <form @submit.prevent="signInWithEmail" class="flex flex-col gap-4">
        <div class="flex items-center gap-2 py-2 px-4 rounded-lg border-2 border-gray-300 bg-white">
          <Icon color="#818181" name="mdi:email"/>
          <input v-model="email" class="focus:outline-none" type="email" placeholder="Email">
        </div>
        <div class="flex items-center justify-between gap-2 py-2 px-4 rounded-lg border-2 border-gray-300 bg-white">
          <input v-model="password" class="focus:outline-none" :type="inputType" placeholder="Password">
          <Icon color="#818181" @click="showPassword = !showPassword" :name="iconType"/>
        </div>
        <input class="py-2 px-4 bg-violet-700 text-white rounded-xl font-semibold cursor-pointer" type="submit" value="Sign In">
      </form>
      <span class="block text-center mt-4">Don't have an account? <RouterLink class="text-violet-700 font-semibold" to="/register">Sign Up</RouterLink></span>
    </div>
  </section>
  <ErrorMessage :message="errorMessage" @close="closeError" v-if="showError"/>
  <TheSpinner v-if="isLoading"/>
</template>