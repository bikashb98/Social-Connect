import supabase from "../../../supabaseClient";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response(
      JSON.stringify({ error: error?.message || "Failed to fetch user data" }),
      { status: 400 },
    );
  }

  const id = user?.id;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", id)
    .single();

  if (profileError || !profile) {
    return new Response(
      JSON.stringify({
        error: profileError?.message || "Failed to fetch user profile",
      }),
      { status: 400 },
    );
  }

  return new Response(JSON.stringify({ profile }), { status: 200 });
}


export async function PATCH (req: NextRequest) {
    
    const body = await req.json();


    const allowed_fields = ['bio', 'avatar_url, visibility, location, website'];

    const update = Object.fromEntries(Object.entries(body).filter(([key]) => allowed_fields.includes(key)));

    if (Object.keys(update).length === 0) {
      
      return NextResponse.json({error: "No valid fields to update"}, {status: 400});
    }

    const { data: {user}, error:userError} = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({error: userError?.message || "Failed to fetch user data"}, {status: 400});
    }

    const id = user.id;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .update(update)
      .eq("user_id", id)
      .select()
      .single();

    if (profileError || !profile) {
      return NextResponse.json({error: profileError?.message || "Failed to update user profile"}, {status: 400});
    }

    return NextResponse.json({profile}, {status: 200});



}