'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Icon from '@/icons/Icon'


export default function FormCard({ form }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)

    // close on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const menuActions = [
        { label: 'Edit', icon: 'edit', onClick: () => console.log('edit', form.id) },
        { label: 'Share', icon: 'share', onClick: () => console.log('share', form.id) },
        { label: 'Delete', icon: 'trash', onClick: () => console.log('delete', form.id), danger: true },
    ]

    return (
        <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted transition">

            {/* Clickable title → individual form page */}
            <Link href={`/forms/${form.id}`} className="group">
                <p className="font-medium group-hover:text-primary transition-colors">
                    {form.title}
                </p>
            </Link>
            <p className="text-sm text-muted-foreground">
                {form.responseCount} responses
            </p>

            {/* Three-dot menu */}
            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setMenuOpen(prev => !prev)}
                    className="p-2 rounded-lg hover:bg-secondary transition text-muted-foreground hover:text-foreground"
                >
                    <Icon name="moreVertical" className="w-4 h-4" />
                </button>

                {menuOpen && (
                    <div className="absolute right-0 mt-1 w-40 bg-card border border-border rounded-xl shadow-md z-10 py-1">
                        {menuActions.map((action) => (
                            <button
                                key={action.label}
                                onClick={() => { action.onClick(); setMenuOpen(false) }}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition ${action.danger ? 'text-danger' : 'text-foreground'}`}
                            >
                                <Icon name={action.icon} className="w-4 h-4" />
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}