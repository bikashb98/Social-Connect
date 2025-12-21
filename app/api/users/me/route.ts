import supabase from "../../../supabaseClient";

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
