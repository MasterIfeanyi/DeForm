'use client';

import { useState } from 'react';
import Link from 'next/link';
// import { Menu, X } from 'lucide-react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi2'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-1 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-foreground hover:opacity-80 transition-opacity flex items-center gap-2">
                    <HiDocumentText className="text-2xl" /> DeForm.
                </Link>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/log-in"
                        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/sign-up"
                        className="px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden py-4 border-t border-border">
                    <div className="flex flex-col gap-2">
                        <Link
                            href="/log-in"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-center text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/sign-up"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-center text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </div>
    </nav>
  );
}