<script setup lang="ts">
import {useSupabaseClient} from "#imports";
import Database from "~/utils/types/database";
import {useLinkStore} from "~/stores/link";
import {storeToRefs} from "pinia";
import signInWithGoogle from "~/utils/signInWithGoogle";
import signInWithGithub from "~/utils/signInWithGithub";

definePageMeta({
  layout: "ho-header"
})

const linkStore = useLinkStore()
const {showError, errorMessage, isLoading} = storeToRefs(linkStore)

const {closeError} = linkStore

const showPassword = ref<boolean>(false)
const showConfirmPassword = ref<boolean>(false)

const email = ref<string>()
const password = ref<string>()
const confirmPassword = ref<string>()

const router = useRouter()
const supabase = useSupabaseClient<Database>()

const iconType = computed(() => showPassword.value ? 'mdi:eye-off' : 'mdi:eye')
const inputType = computed(() => showPassword.value ? 'text' : 'password')
const confirmIconType = computed(() => showConfirmPassword.value ? 'mdi:eye-off' : 'mdi:eye')
const confirmInputType = computed(() => showConfirmPassword.value ? 'text' : 'password')

async function register(): Promise<void> {
  if (password.value === confirmPassword.value) {
    closeError()
    isLoading.value = true
    try {
      const {data, error} = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })

      if (error) {
        errorMessage.value = error.message
        showError.value = true
      }

    } catch (error) {
      console.error(error)
    }

    isLoading.value = false
    await router.push("/links")
  }else {
    showError.value = true
    errorMessage.value = "Passwords do not match"
  }
}

</script>

<template>
  <section class="w-96 mx-auto">
    <div class="mt-10 mx-4">
      <h1 class="text-center font-bold text-3xl mb-10">Sign Up</h1>
      <form
          @submit.prevent="register"
          class="flex flex-col gap-4">
        <div class="flex items-center gap-2 py-2 px-4 rounded-lg border-2 border-gray-300 bg-white">
          <Icon color="#818181" name="mdi:email"/>
          <input v-model="email" class="focus:outline-none" type="email" placeholder="Email">
        </div>
        <div class="flex items-center justify-between gap-2 py-2 px-4 rounded-lg border-2 border-gray-300 bg-white">
          <input
              v-model="password"
              class="focus:outline-none"
              :type="inputType"
              placeholder="Password">
          <Icon
              color="#818181"
              @click="showPassword = !showPassword"
              :name="iconType"/>
        </div>
        <div class="flex items-center justify-between gap-2 py-2 px-4 rounded-lg border-2 border-gray-300 bg-white">
          <input
              v-model="confirmPassword"
              class="focus:outline-none"
              :type="confirmInputType"
              placeholder="Confirm password">
          <Icon
              color="#818181"
              @click="showConfirmPassword = !showConfirmPassword"
              :name="confirmIconType"/>
        </div>
        <input class="py-2 px-4 bg-violet-700 text-white rounded-xl font-semibold cursor-pointer" type="submit"
               value="Create account">
      </form>
      <div class="flex gap-4 mt-4">
      <button class="bg-white py-3 rounded-xl flex justify-center gap-4 w-1/2" @click="signInWithGoogle"><Icon size="20" name="logos:google-icon"/></button>
      <button class="bg-white py-3 rounded-xl flex justify-center gap-4 w-1/2" @click="signInWithGithub"><Icon size="20" name="logos:github-icon"/></button>
      </div>
      <span class="block text-center mt-4">Already have an account? <RouterLink class="text-violet-700 font-semibold"
                                                                                to="/login">Sign In</RouterLink></span>
    </div>
  </section>
  <ErrorMessage :message="errorMessage" @close="closeError" v-if="showError"/>
  <TheSpinner v-if="isLoading"/>
</template>