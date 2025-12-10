"use client";

import { BellIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { removeCookie } from "../actions/cookie";
import { useEffect } from "react";

import { accessTokenCheck } from "../actions/feedauthcheck";

export default function DashboardPage() {
  const router = useRouter();
  const notifications = 3;

  useEffect(() => {
    const checkAuth = async () => {
      const result = await accessTokenCheck();
      if (!result.authenticated) {
        router.push("/");
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    const logout = await removeCookie();
    if (logout.message === true) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/assets/logos/logo1.png"
                alt="Logo"
                width={150}
                height={50}
                className="cursor-pointer"
              />
            </div>

            {/* Right Side - Icons and Buttons */}
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                <BellIcon className="h-6 w-6 text-gray-700" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Profile Icon */}
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-full p-2 transition">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  U
                </div>
              </div>

              {/* Logout Button */}
              <Button onClick={handleLogout} variant="outline" className="h-9">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="w-full">
          {/* Main Feed */}
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-4">
              <h2 className="text-2xl font-bold mb-4">
                Welcome to your Dashboard!
              </h2>
              <p className="text-gray-600">
                Start connecting with friends and sharing your moments.
              </p>
            </div>

            {/* Sample Post */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                  U
                </div>
                <div>
                  <h3 className="font-semibold">Your Name</h3>
                  <p className="text-sm text-gray-500">Just now</p>
                </div>
              </div>
              <p className="text-gray-800 mb-4">
                This is your first post on social-connect!
              </p>
              <div className="flex space-x-4 text-gray-500 text-sm">
                <button className="hover:text-blue-600">Like</button>
                <button className="hover:text-blue-600">Comment</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
