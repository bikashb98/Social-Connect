import supabase from "@/app/supabaseClient";

export async function GET (req: Request) {
    const url = new URL(req.url);
    const access_token = url.searchParams.get('access_token');
    console.log("Access Token:", access_token);
    console.log("Request URL:", req.url);

    if (!access_token) {
        return new Response(JSON.stringify({ error: "Access token is missing", }), { status: 400 });
    }

    const { data: {user}, error: userError } = await supabase.auth.getUser(access_token);

    if (userError || !user) {
        return new Response(JSON.stringify({ error: "Invalid access token", }), { status: 400 });
    }
}