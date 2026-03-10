'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Suspense } from 'react';

function SignInForm () {

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
        redirect: false, // Critical: we handle redirect manually
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else if (result?.ok) {
        // Session cookie is now set
        // Use Next.js router for SPA navigation
        router.push(callbackUrl);
        // Refresh to update server components with new session
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold text-center">Sign In</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Show error message from URL if present */}
                {displayError && (
                    <div 
                        role="alert"
                        aria-live="polite"
                        tabIndex={-1}
                        className="p-3 text-sm text-red-800 bg-red-100 rounded"
                    >
                        {displayError}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <p className="text-sm text-center text-gray-600">
                Do not have an account?{' '}
                <a href="/register" className="text-indigo-600 hover:underline">
                    Register
                </a>
            </p>
        </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}