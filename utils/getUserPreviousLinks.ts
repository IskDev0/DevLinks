import {useSupabaseClient} from "#imports";
import Database from "~/utils/types/database";

async function getUserPreviousLinks() {
    const supabase = useSupabaseClient<Database>()
    const user = useSupabaseUser()

    const {data, error} = await supabase
        .from("links")
        .select("GitHub, GitLab, LinkedIn, Twitter, Youtube")
        .eq("userId", user.value?.id)
        .single()

    if (data !== null) {
        return data
    } else {
        return {};
    }
}


export default getUserPreviousLinks