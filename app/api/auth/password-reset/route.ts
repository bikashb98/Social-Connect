import supabase from "@/app/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body?.email;

  const { data: emailData, error: emailError } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (!emailData || emailError) {
    return NextResponse.json(
      { message: "Email not found " + emailError?.message },
      { status: 404 },
    );
  }


  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/auth/password-reset",
  });

  if (error) {
    return NextResponse.json(
      { message: "Error sending password reset email:" + error.message },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Password reset email sent" },
    { status: 200 },
  );
}
