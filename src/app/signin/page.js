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
                    src="/images/sun.png"
                    alt="space background"
                    fill
                    className="object-cover object-center"
                />
            </div>



            <div className="flex flex-col justify-center px-4 py-8 bg-white sm:px-6 lg:px-8">
            
            </div>

        </div>
    </>
  );
}

