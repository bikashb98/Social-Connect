import { NextResponse, NextRequest } from "next/server";
import supabase from "@/app/supabaseClient";

export async function POST(req: NextRequest) {
  console.log("Password Reset Confirm Request Received");
  const body = await req.json();

  console.log("Request body:", body);

  return NextResponse.json({ message: "All good" }, { status: 200 });
}
