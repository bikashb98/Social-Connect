"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.status === 200) {
      router.push("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center px-4 pt-20 pb-32">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Logo and Tagline */}
          <div className="flex flex-col md:pr-8">
            <Image
              src="/assets/logos/logo1.png"
              alt="social-connect logo"
              width={500}
              height={166}
              className="w-full max-w-md"
            />
            <p className="text-2xl md:text-3xl text-slate-700 leading-snug font-normal">
              Connect with friends and the world around you on social-connect.
            </p>
          </div>

          {/* Right Side - Login Card */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base px-4"
                />

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-base px-4 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {error && (
                  <div className="w-full text-red-600 text-sm text-center">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 text-xl rounded-md"
                >
                  Log In
                </Button>

                <div className="text-center py-2">
                  <a href="#" className="text-blue-600 hover:underline text-sm">
                    Forgot password?
                  </a>
                </div>

                <hr className="my-3" />

                <div className="text-center pt-2 pb-4">
                  <Button
                    onClick={() => router.push("/register")}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-10 h-12 text-lg rounded-md"
                  >
                    Create new account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
