<script setup lang="ts">

import {useSupabaseClient, useSupabaseUser} from "#imports";

const supabase = useSupabaseClient()
const user = useSupabaseUser()
async function SignOut(){
  await supabase.auth.signOut()
}
</script>

<template>
<p>links page</p>
<p>{{user}}</p>
  <button @click="SignOut">SignOut</button>
</template>