import { NextResponse, NextRequest } from "next/server";
import supabase from "../../../supabaseClient";

export async function POST(req: NextRequest) {

  try {
    const body = await req.json();

    const { access_token, refresh_token, new_password } = body;

  if (!access_token || !new_password) {
    return NextResponse.json(
      { error: "Access token and new password are required" },
      { status: 400 },
    );
  }

    await supabase.auth.setSession({
    access_token: access_token,
    refresh_token: refresh_token
   })

    const { error } = await supabase.auth.updateUser({
      password: new_password
    })

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to reset password" },
        { status: 400 },
      );
    }

 



    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in password-reset-confirm:', error);
    return NextResponse.json(
      { error: "Failed to parse request or reset password" },
      { status: 500 },
    );
  }
}
