// app/verify-email/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleVerify() {
        setLoading(true);
        setError('');

        const res = await fetch('/api/verify-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token.trim() }),
        });

        const data = await res.json();
        
        if (!res.ok) {
            setError(data.error);
            setLoading(false);
            return;
        }

         // 2. Grab credentials stored during signup
        const email = sessionStorage.getItem('pendingEmail');
        const password = sessionStorage.getItem('pendingPassword');

        // 3. Sign in automatically to create session
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        // 4. Clean up
        sessionStorage.removeItem('pendingEmail');
        sessionStorage.removeItem('pendingPassword');

        if (result?.error) {
            setError('Verified but could not sign in. Please sign in manually.');
            router.push('/signin');
            return;
        }

        router.push('/dashboard');
    }

    return (
        <div>
            <h1>Verify your email</h1>
            <p>Paste the code we sent you below.</p>
            <textarea
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste your verification code here..."
                rows={3}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleVerify} disabled={loading || !token}>
                {loading ? 'Verifying...' : 'Verify email'}
            </button>
        </div>
    );
}