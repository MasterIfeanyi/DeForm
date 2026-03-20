'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Input, Button, FieldLabel } from '@/components/ui';
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation"
import Icon from '@/icons/Icon';


export default function SignUpForm() {

    const router = useRouter()

    const { t } = useTranslation()

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)


    const handleChange = (field) => (e) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }))
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
    }


    const validate = () => {
        const newErrors = {}

        if (!form.firstName.trim()) newErrors.firstName = t('signUp.errors.firstNameRequired')
        if (!form.lastName.trim()) newErrors.lastName = t('signUp.errors.lastNameRequired')
        if (!form.email.trim()) {
            newErrors.email = t('signUp.errors.emailRequired')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = t('signUp.errors.emailInvalid')
        }
        if (!form.password) {
            newErrors.password = t('signUp.errors.passwordRequired')
        } else if (form.password.length < 8) {
            newErrors.password = t('signUp.errors.passwordMinLength')
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validate()) return
        setLoading(true)
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                    name: `${form.firstName} ${form.lastName}`.trim(),
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setErrors({ email: data.error })
                return
            }

            router.push('/verify-email')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-background flex flex-col items-center justify-start px-4 py-8">
                {/* Back arrow */}
                <div className="w-full max-w-130 mb-6">
                    <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Icon name="back" className="w-5 h-5 text-current" />
                    </Link>
                </div>

                <div className="w-full max-w-130">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-5">
                        <Icon name="document" className="w-5 h-5" /> DeForm.
                    </div>
                    {/* Heading */}
                    <h3 className="text-[1.75rem] font-medium text-foreground leading-tight mb-2">
                        {t('auth.signUp.title')}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-7 leading-relaxed">
                        {t('auth.signUp.subtitle')}
                    </p>


                    <>
                        <FieldLabel
                            labelIdentifier={t('auth.signUp.nameLabel')}
                            className="text-base font-medium text-foreground mb-3 block"
                        />
                        <div className="flex gap-4 mb-1">
                            <div className="flex-1">
                                <Input
                                    id="firstName"
                                    placeholder={t('auth.signUp.firstNamePlaceholder')}
                                    value={form.firstName}
                                    onChange={handleChange('firstName')}
                                    wrapperClassName="w-full"
                                    className={`h-14 text-base rounded-xl ${errors.firstName ? 'border-danger focus:border-danger' : ''}`}
                                />
                                {errors.firstName && (
                                    <p className="text-danger text-xs mt-1">{errors.firstName}</p>
                                )}
                            </div>

                            <div className="flex-1">
                                <Input
                                    id="lastName"
                                    placeholder={t('auth.signUp.lastNamePlaceholder')}
                                    value={form.lastName}
                                    onChange={handleChange('lastName')}
                                    wrapperClassName="w-full"
                                    className={`h-14 text-base rounded-xl ${errors.lastName ? 'border-danger focus:border-danger' : ''}`}
                                />
                                {errors.lastName && (
                                    <p className="text-danger text-xs mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>
                    </>

                    {/* Email */}
                    <div className="mt-4">
                        <FieldLabel
                            labelIdentifier={t('auth.signUp.emailLabel')}
                            className="text-base font-medium text-foreground mb-3 block"
                        />
                        <Input
                            id="email"
                            type="email"
                            placeholder={t('auth.signUp.emailPlaceholder')}
                            value={form.email}
                            onChange={handleChange('email')}
                            wrapperClassName="w-full"
                            className={`h-14 text-base rounded-xl ${errors.email ? 'border-danger focus:border-danger' : ''}`}
                        />
                        {errors.email && (
                            <p className="text-danger text-xs mt-1">{errors.email}</p>
                        )}
                    </div>


                    {/* Password */}
                    <div className="mt-4 relative">
                        <FieldLabel
                            labelIdentifier={t('auth.signUp.passwordLabel')}
                            className="text-base font-medium text-foreground mb-3 block"
                        />
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder={t('auth.signUp.passwordPlaceholder')}
                            value={form.password}
                            onChange={handleChange('password')}
                            icon={true}
                            iconName={showPassword ? 'eyeOff' : 'eye'}
                            onIconClick={() => setShowPassword(prev => !prev)}
                            wrapperClassName="w-full"
                            className={`h-14 placeholder:text-muted-foreground text-base rounded-xl ${errors.password ? 'border-danger focus:border-danger' : ''}`}
                        />
                        {errors.password && (
                            <p className="text-danger text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    <Button
                        variant="primary"
                        size="large"
                        loading={loading}
                        onClick={handleSubmit}
                        className="rounded-xl! mt-5 bg-blue-600! hover:bg-blue-700! text-lg!"
                    >
                        {t('common.submit')}
                    </Button>


                    {/* Divider */}
                    <div className="border-t border-border my-6"></div>


                    {/* Create Account Button */}
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            variant="other"
                            className="h-12! rounded-xl! border-2! border-primary! text-primary! hover:bg-accent! font-semibold! px-8!"
                        >
                            <Link href="/signin">
                                {t('auth.signUp.alreadyHaveAccount')}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
