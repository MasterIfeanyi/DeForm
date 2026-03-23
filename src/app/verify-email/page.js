// app/verify-email/page.tsx
'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Input, Button, FieldLabel } from '@/components/ui';
import Icon from '@/icons/Icon';

import React, { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation"

export default function VerifyEmailPage() {

    const [email, setEmail] = useState(null);

    useEffect(() => {
        setEmail(sessionStorage.getItem('pendingEmail'));
    }, []);

    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState('')
    const [timer, setTimer] = useState(30)

    const router = useRouter();

    const { t } = useTranslation();

    useEffect(() => {
        if (timer === 0) return
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [timer])

    const handleSubmit = async () => {
        if (!code.trim()) {
            setError(t('auth.verify.errors.codeRequired'))
            return
        }

        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, email }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || t('auth.verify.errors.invalidCode'))
                setLoading(false);
                return
            }

            // Try auto sign-in with stored password
            const storedPassword = sessionStorage.getItem('pendingPassword')

            if (storedPassword) {
                
                const result = await signIn('credentials', {
                    email: data.email,
                    password: storedPassword,
                    redirect: false,
                })

                sessionStorage.removeItem('pendingEmail')
                sessionStorage.removeItem('pendingPassword')

                if (result?.ok) {
                    router.push('/dashboard')
                    return
                }
            }

            // Fallback: cross-device or sessionStorage unavailable
            router.push('/signin')

        } finally {
            setLoading(false)
        }
    }

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

    const resendCode = async () => {
        if (timer > 0) return

        await fetch('/api/resend-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })

        setTimer(30)
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center px-4 py-8">

            {/* Back */}
            <div className="w-full max-w-130 mb-6">
                <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
                    <Icon name="back" className="w-5 h-5" />
                </button>
            </div>

            <div className="w-full max-w-130">

                {/* Logo */}
                <div className="flex items-center gap-2 mb-5">
                    <Icon name="document" className="w-5 h-5" /> DeForm.
                </div>

                {/* Heading */}
                <h3 className="text-[1.75rem] font-medium mb-2">
                    {t('auth.verify.title')}
                </h3>

                <p className="text-muted-foreground text-sm mb-6">
                    {t('auth.verify.subtitle')}{' '}
                    <span className="text-foreground font-medium">{email ?? ''}</span>
                </p>

                {/* Code Input */}
                <div className="mb-2">
                    <FieldLabel
                        labelIdentifier={t('auth.verify.codeLabel')}
                        className="text-base font-medium mb-3 block"
                    />
                    <Input
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value)
                            if (error) setError('')
                        }}
                        placeholder={t('auth.verify.codePlaceholder')}
                        className={`h-14 text-base rounded-xl ${error ? 'border-danger focus:border-danger' : ''
                            }`}
                    />
                    {error && (
                        <p className="text-danger text-xs mt-1">{error}</p>
                    )}
                </div>

                {/* CTA */}
                <Button
                    variant="primary"
                    size="large"
                    loading={loading}
                    onClick={handleSubmit}
                    className="rounded-xl! mt-4 bg-blue-600! hover:bg-blue-700! text-lg!"
                >
                    {t('auth.verify.verifyButton')}
                </Button>

                {/* Resend */}
                <div className="mt-5 text-sm text-muted-foreground">
                    {t('auth.verify.noCode')}{' '}
                    <button
                        onClick={resendCode}
                        disabled={timer > 0}
                        className="text-primary font-medium disabled:opacity-50"
                    >
                        {timer > 0
                            ? t('auth.verify.resendIn', { seconds: timer })
                            : t('auth.verify.resend')}
                    </button>
                </div>

                {/* Divider */}
                <div className="border-t border-border my-6"></div>

                {/* Back */}
                <div className="flex justify-center">
                    <Button
                        variant="other"
                        className="h-12! rounded-xl! px-8! border-2! border-primary! text-primary! hover:bg-accent!"
                    >
                        <Link href="/signin">
                            {t('auth.verify.backToLogin')}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}