import {useSupabaseClient} from "#imports";
import Database from "~/utils/types/database";
import {useUserStore} from "~/stores/user";

async function signOut(){

    const supabase = useSupabaseClient<Database>()

    const userStore = useUserStore()

    const {clearUserStore} = userStore

    clearUserStore()

    await supabase.auth.signOut()
}

export default signOut