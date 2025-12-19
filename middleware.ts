import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import supabase from "./app/supabaseClient";

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");
    const refreshToken = cookieStore.get("refresh_token");

    if (!accessToken && !refreshToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const {
    data: { user },
    error,
  } = (await supabase.auth.getUser(accessToken?.value)) || " ";

  if (error || !user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

}

export const config = {
    matcher: ["/dashboard/:path*"],
}