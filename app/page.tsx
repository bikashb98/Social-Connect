'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Login:', { email, password });
    // Add your login logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center px-4 pt-20 pb-32">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Logo and Tagline */}
          <div className="flex flex-col md:pr-8">
            <Image 
              src="/assets/logos/logo.png" 
              alt="social-connect logo" 
              width={500} 
              height={166}
              className="-mb-4 w-full max-w-md"
            />
            <p className="text-2xl md:text-3xl text-gray-800 leading-snug md:pl-2">
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
                
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 text-base px-4"
                />

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
