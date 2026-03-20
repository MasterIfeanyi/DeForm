'use client';
import Icon from '@/icons/Icon';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from "@/hooks/useTranslation";

export default function Navbar() {

    const { t } = useTranslation()

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-1 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-foreground hover:opacity-80 transition-opacity flex items-center gap-2">
                    <Icon name="document" className="w-5 h-5" /> DeForm.
                </Link>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/signin"
                        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {t("auth.landing.nav.logIn")}
                    </Link>
                    <Link
                        href="/signup"
                        className="px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    >
                        {t("auth.landing.nav.signUp")}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <Icon name="close" className="w-5 h-5" /> : <Icon name="menu" className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden py-4 border-t border-border">
                    <div className="flex flex-col gap-2">
                        <Link
                            href="/signin"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-center text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                            {t("auth.landing.nav.logIn")}
                        </Link>
                        <Link
                            href="/signup"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-center text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                        >
                            {t("auth.landing.nav.signUp")}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    </nav>
  );
}