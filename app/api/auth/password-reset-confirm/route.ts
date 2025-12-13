import { NextResponse, NextRequest } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { access_token, new_password } = body;

  if (!access_token || !new_password) {
    return NextResponse.json ({ error: "Access token and new password are required" }, { status: 400 });
  }


  const supabaseUrl: string = process.env.SUPABASE_URL || "";
  const supabaseAnonKey: string = process.env.SUPABASE_KEY || "";

  const supabaseUser: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, 
    {global: {
      headers: { Authorization: `Bearer ${access_token}` },
    } }
  );

  const {error} = await supabaseUser.auth.updateUser({
    password: new_password,
  });

  if (error) {
    return NextResponse.json({ error: "Password reset failed: " + error.message }, { status: 500 });
  }



  return NextResponse.json({ message: "Password reset successful" }, { status: 200 });
}
