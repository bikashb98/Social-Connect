"use server";

import { cookies } from "next/headers";
import supabase from "../supabaseClient";

export async function accessTokenCheck() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const refreshToken = cookieStore.get("refresh_token");

  if (!accessToken && !refreshToken) {
    return { authenticated: false };
  }

  const {
    data: { user },
    error,
  } = (await supabase.auth.getUser(accessToken?.value)) || " ";

  if (error || !user) {
    return { authenticated: false };
  }

  return { authenticated: true };
}
