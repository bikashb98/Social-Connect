"use client";

import { useEffect } from "react";

export default function AuthCallback() {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (!accessToken) {
      console.error("No access token found in URL");
      return;
    }

    (async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken }),
        });

        if (response.status === 200) {
          window.location.href = "/login?verified=true";
        } else {
          const data = await response.json();
          console.error("Failed to verify access token", data);
        }
      } catch (error) {
        console.error("Error verifying access token", error);
      }
    })();
  }, []);

  return <div>Verifying your email... Please wait</div>;
}
