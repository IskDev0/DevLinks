import {useSupabaseClient} from "#imports";
import Database from "~/utils/types/database";

async function signOut(){

    const supabase = useSupabaseClient<Database>()

    await supabase.auth.signOut()
}

export default signOut