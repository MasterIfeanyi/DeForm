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
            // todo: replace with real API call
            await new Promise(resolve => setTimeout(resolve, 1500))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-background flex flex-col items-center justify-start px-4 py-8">
                {/* Back arrow */}
                <div className="w-full max-w-[520px] mb-6">
                    <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Icon name="back" className="w-5 h-5 text-current" />
                    </Link>
                </div>

                <div className="w-full max-w-[520px]">
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
                </div>

                <FieldLabel
                    className="text-sm font-medium text-foreground mb-2"
                />
                <div className="flex gap-3 mb-1">
                    <div className="flex-1">
                        <Input
                            id="firstName"
                            placeholder={t('auth.signUp.firstNamePlaceholder')}
                            value={form.firstName}
                            onChange={handleChange('firstName')}
                            className={errors.firstName ? 'border-danger focus:border-danger' : ''}
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
                            className={errors.lastName ? 'border-danger focus:border-danger' : ''}
                        />
                        {errors.lastName && (
                            <p className="text-danger text-xs mt-1">{errors.lastName}</p>
                        )}
                    </div>
                </div>

            </div>
        </>
    )
}
