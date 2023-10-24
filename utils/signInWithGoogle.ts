import {useSupabaseClient} from "#imports";
import Database from "~/utils/types/database";

async function signInWithGoogle():Promise<void>{

    const supabase = useSupabaseClient<Database>()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    })
}

export default signInWithGoogle