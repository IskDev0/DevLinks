import {useSupabaseClient} from "#imports";
import Database from "~/utils/types/database";

async function signInWithGithub():Promise<void> {

    const supabase = useSupabaseClient<Database>()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
    })
}

export default signInWithGithub