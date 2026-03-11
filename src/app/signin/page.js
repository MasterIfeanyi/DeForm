'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Suspense } from 'react';
import { Input, Button } from '@/components/ui';
import Link from 'next/link';
import Image from "next/image";


export default function SignInForm () {

  const router = useRouter();
  const searchParams = useSearchParams();


  const errorParam = searchParams.get('error');
  const callbackUrl = searchParams.get('callbackUrl') || '/getting-started';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const errorRef = useRef(null);

  // Focus error message when it appears
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const displayError = errorParam === 'CredentialsSignin' 
    ? 'Invalid email or password' 
    : errorParam ? 'An error occurred. Please try again.' : null;

  return (
    <>
        <div className='min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-card'>
            

            <div className="hidden lg:block relative w-full h-screen">
                <Image 
                    src="/images/formsignup.png"
                    alt="space background"
                    fill
                    className="object-cover object-center"
                />
            </div>



            <div className="flex flex-col justify-center items-center px-4 py-8 bg-white sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <h1 className="text-3xl font-bold text-foreground mb-8">
                        Log in
                    </h1>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Input */}
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address or mobile number"
                            required
                            className="!mt-0 !h-14 !rounded-xl !border-gray-300 !text-base placeholder:text-muted-foreground"
                        />

                        {/* Password Input */}
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="!mt-0 !h-14 !rounded-xl !border-gray-300 !text-base placeholder:text-muted-foreground"
                        />

                        {/* Log In Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            loading={loading}
                            className="!h-12 !rounded-xl !bg-blue-600 hover:!bg-blue-700 !font-bold !text-lg"
                        >
                            Log in
                        </Button>

                        {/* Forgotten Password Link */}
                        <div className="text-center py-2">
                            <a href="#"
                                className="text-primary hover:underline text-sm font-medium"
                            >
                                Forgotten password?
                            </a>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-border my-6"></div>

                        {/* Create Account Button */}
                        <div className="flex justify-center">
                            <Button
                                type="button"
                                variant="other"
                                className="!h-12 !rounded-xl !border-2 !border-primary !text-primary hover:!bg-accent !font-semibold !px-8"
                            >
                                Create new account
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </>
  );
}

