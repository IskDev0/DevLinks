import {useSupabaseClient} from "#imports";
import Database from "~/utils/types/database";

async function getUserPreviousDetails() {

    const supabase = useSupabaseClient<Database>()
    const user = useSupabaseUser()

    try {
        const {data, error} = await
            supabase
                .from("userDetails")
                .select("firstName, lastName, email, image, bgColor, textColor, cardColor")
                .eq("userId", user.value?.id)
                .maybeSingle()

        if (data){
            return data
        }else {
            return null
        }
    }catch (error){
        console.error(error)
    }
}

export default getUserPreviousDetails