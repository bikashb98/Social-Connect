import supabase from "@/app/supabaseClient";

export async function POST(req: Request) {
  const body = await req.json();

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("email")
    .or(`username.eq.${body?.username}, email.eq.${body?.email}`)
    .limit(1);

  if (!userData || userError) {
    return new Response(
      JSON.stringify({ message: "User not found" + userError.message }),
      { status: 404 },
    );
  }

  const email = userData[0]?.email;
  const password = body.password;

  if (!email) {
    return new Response(JSON.stringify({ message: "Email not found" }), {
      status: 404,
    });
  }

  const { data: signIndata, error: signInError } =
    await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  if (signInError) {
    return new Response(JSON.stringify({ message: signInError.message }), {
      status: 401,
    });
  }

  const id = signIndata.user?.id;

  const { error } = await supabase
    .from("users")
    .update({ last_login: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }

  const accessToken = `Bearer ${signIndata.session?.access_token}`;
  const refreshToken = signIndata.session?.refresh_token;

  return new Response(JSON.stringify({ accessToken, refreshToken }), {
    status: 200,
  });
}
