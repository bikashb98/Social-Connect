
import supabase from "../../../supabaseClient";

export async function GET(req: Request, {params} : {params:{user_id: string}} ) {
    
    const {user_id} = await params;

    const {data: profile, error} = await supabase.from("profiles").select("*").eq("user_id", user_id).single();

    if (error || !profile) {
        return new Response(JSON.stringify({error: error?.message || "Failed to fetch user profile"}), {status: 400});
    }

    return new Response(JSON.stringify({profile}), {status: 200});
}
