'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';

export default function EmailIdentifyPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    

    const handleSendResetLink = async () => {
        setError('');
        setSuccess('');
        setLoading(true);

        if (!email) {
            setError('Please enter your email address');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.status === 200) {
                setSuccess('Password reset link sent! Check your email.');
            } else {
                setError(data.error || 'Failed to send reset link');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center h-16">
                        <Link href="/">
                            <Image 
                                src="/assets/logos/logo1.png" 
                                alt="social-connect logo" 
                                width={150} 
                                height={50}
                                className="cursor-pointer"
                            />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Find Your Account Card */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Find Your Account</h1>
                        <p className="text-gray-600 mb-6">
                            Please enter your email to search for your account.
                        </p>
                        
                        <div className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 text-base"
                                disabled={loading}
                            />

                            {success && (
                                <div className='w-full text-green-600 text-sm text-center bg-green-50 p-3 rounded'>
                                    {success}
                                </div>
                            )}

                            {error && (
                                <div className="border border-gray-300 rounded p-4 bg-gray-50">
                                    <p className="text-sm text-gray-700 mb-3">
                                        <span className="font-semibold">No search results</span>
                                    </p>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Your search did not return any results. Please try again with other information.
                                    </p>
                                    <Link href="/" className="text-blue-600 hover:underline text-sm">
                                        Back to Login
                                    </Link>
                                </div>
                            )}

                            <Button
                                onClick={handleSendResetLink}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}