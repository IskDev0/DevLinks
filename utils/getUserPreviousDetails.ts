import {useSupabaseClient} from "#imports";
import Database from "~/utils/types/database";

async function getUserPreviousDetails() {

    const supabase = useSupabaseClient<Database>()
    const user = useSupabaseUser()

    const {data, error} = await
        supabase
            .from("userDetails")
            .select("firstName, lastName, email, image, bgColor, textColor")
            .eq("userId", user.value?.id)
            .single()

    if (error) {
        throw error;
    } else {
        return data
    }
}

export default getUserPreviousDetails