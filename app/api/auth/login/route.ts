import supabase from "@/app/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("email")
    .or(`username.eq.${body?.username}, email.eq.${body?.email}`)
    .limit(1);

  if (!userData || userError) {
    return NextResponse.json(
      { message: "User not found" + userError.message },
      { status: 404 },
    );
  }

  const email = userData[0]?.email;
  const password = body.password;

  if (!email) {
    return NextResponse.json({ message: "Email not found" }, { status: 404 });
  }

  const { data: signIndata, error: signInError } =
    await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  if (signInError) {
    return NextResponse.json({ message: signInError.message }, { status: 401 });
  }

  const id = signIndata.user?.id;

  const { error } = await supabase
    .from("users")
    .update({ last_login: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  console.log ('Login data check' , signIndata);

  const session = signIndata.session;

  const res = NextResponse.json(
    { message: "Login successful" },
    { status: 200 },
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60,
  };

  res.cookies.set("access_token", session!.access_token, cookieOptions);
  res.cookies.set("refresh_token", session!.refresh_token, cookieOptions);

  return res;
}
