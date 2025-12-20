"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthPasswordReset() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Extract access token from URL hash
  const getAccessToken = () => {
    if (typeof window === "undefined")
      return { access_token: "", refresh_token: "" };

    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const access_token = params.get("access_token") || "";
    const refresh_token = params.get("refresh_token") || "";

    return { access_token, refresh_token };
  };

  const handleResetPassword = async () => {
    setError("");
    setSuccess("");

    const { access_token, refresh_token } = getAccessToken();

    // Validation
    if (!access_token) {
      setError("No access token found. Please use the link from your email.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Call password reset API
    const response = await fetch("/api/auth/password-reset-confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: access_token,
        refresh_token: refresh_token,
        new_password: newPassword,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      setError(data.error || "Password reset failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <Image
              src="/assets/logos/logo1.png"
              alt="social-connect logo"
              width={150}
              height={50}
              className="cursor-pointer"
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Password Reset Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
              Reset Your Password
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Enter your new password below
            </p>

            <div className="space-y-4">
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-12 text-base"
              />

              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 text-base"
              />

              {error && (
                <div className="w-full text-red-600 text-sm text-center bg-red-50 p-3 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="w-full text-green-600 text-sm text-center bg-green-50 p-3 rounded">
                  {success}
                </div>
              )}

              <Button
                onClick={handleResetPassword}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 text-lg"
                disabled={!!success}
              >
                Reset Password
              </Button>

              <div className="text-center pt-4">
                <Link
                  href="/"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
