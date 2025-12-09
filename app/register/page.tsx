'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    setError('');
    setSuccess('');

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password
      })
    });

    const data = await response.json();

    if (response.status === 200) {
      setSuccess(data.message || 'Registration successful! Please check your email.');
      // Optionally redirect after a delay
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } else {
      setError(data.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center px-4 py-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Logo and Tagline */}
          <div className="flex flex-col md:pr-8">
            <Image 
              src="/assets/logos/logo1.png" 
              alt="social-connect logo" 
              width={500} 
              height={166}
              className="-mb-4 w-full max-w-md"
            />
            <p className="text-2xl md:text-3xl text-gray-800 leading-snug md:pl-2">
              Connect with friends and the world around you on social-connect.
            </p>
          </div>

          {/* Right Side - Registration Card */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-3xl font-bold text-center mb-2">Sign Up</h2>
              <p className="text-gray-600 text-center mb-6">It&apos;s quick and easy.</p>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12 text-base"
                  />
                  <Input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>

                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 text-base"
                />
                
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                />
                
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 text-base"
                />

                {error && <div className='w-full text-red-600 text-sm text-center bg-red-50 p-2 rounded'>{error}</div>}
                {success && <div className='w-full text-green-600 text-sm text-center bg-green-50 p-2 rounded'>{success}</div>}

                <p className="text-xs text-gray-600 text-center py-2">
                  By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.
                </p>

                <Button
                  onClick={handleRegister}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold h-12 text-lg rounded-md"
                >
                  Sign Up
                </Button>

                <div className="text-center pt-4">
                  <Link href="/" className="text-blue-600 hover:underline text-sm font-semibold">
                    Already have an account?
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}