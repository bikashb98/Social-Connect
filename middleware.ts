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

  try {
    const { exp } = decodeJwtPayload(accessToken!.value);
    const isExpired = Date.now() / 1000 >= exp;

    if (isExpired) {
      await fetch("/api/auth/token/refresh", {
        method: "POST",
      });
    }
  } catch (error) {
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

function decodeJwtPayload(token: string): { exp: number } {
  const payload = token.split(".")[1];
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
