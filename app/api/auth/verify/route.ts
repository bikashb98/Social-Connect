import supabase from "@/app/supabaseClient";

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.SUPABASE_URL || "";
const supabaseAnonKey: string = process.env.SUPABASE_KEY || "";

export async function POST(req: Request) {
  try {
    const { accessToken } = await req.json();
    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: "Access token is required" }),
        { status: 400 },
      );
    }

    const supabaseUser: SupabaseClient = createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        global: {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      },
    );

    const { data: userData, error: userError } =
      await supabaseUser.auth.getUser(accessToken);

    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired access token" }),
        { status: 401 },
      );
    }
    const user = userData.user;
    const metadata = user.user_metadata;

    const { error } = await supabase.from("users").insert({
      id: user.id,
      email: user.email,
      username: metadata.username,
      first_name: metadata.first_name,
      last_name: metadata.last_name,
    });

    if (error) {
      return new Response(
        JSON.stringify({ error: "Error inserting user data:" + error.message }),
        { status: 500 },
      );
    }

    return new Response(
      JSON.stringify({ message: "User verified successfully" }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal Server Error" + error }),
      { status: 500 },
    );
  }
}
