"use server";

import { cookies } from "next/headers";

export async function removeCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  return { message: true };
}
