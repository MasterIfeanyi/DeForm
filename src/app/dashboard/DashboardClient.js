'use client'

import React, { useMemo, useState, useRef, useEffect, useLayoutEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import Icon from '@/icons/Icon'
import NavLink from '../_components/NavLink'
import StatCard from '../_components/StatCard'
import FormCard from '../_components/FormCard'
import { signOut } from 'next-auth/react';
import { getNestedValue } from '@/utils/fx'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const STATS_CONFIG = [
    { key: 'forms', title: 'Forms', icon: 'document', path: 'forms.total' },
    { key: 'responses', title: 'Responses', icon: 'email', path: 'responses.total' },
    { key: 'views', title: 'Views', icon: 'eye', path: 'views.total' },
    { key: 'conversion', title: 'Conversion', icon: 'chart', path: 'conversion.rate' },
];

const dashboardMetrics = {
    forms: { total: 12 },
    responses: { total: 1245 },
    views: { total: 3890 },
    conversion: { rate: 24 },
};

export default function Dashboard() {

    const [isDragging, setIsDragging] = useState(false);
    const dividerRef = useRef(null);
    const hasLoaded = useRef(false);

    const [sidebarWidth, setSidebarWidth] = useState(() => {
        if (typeof window === 'undefined') return 216; // SSR guard
        const saved = localStorage.getItem('sidebarWidth');
        if (!saved) return 216;
        const width = Number(saved);
        return width >= 180 && width <= 320 ? width : 216;
    });


    // Mouse move/up handlers
    useEffect(() => {
        const onMouseMove = (e) => {
            if (!isDragging) return;
            const newWidth = e.clientX;
            const min = 180;
            const max = 320;
            if (newWidth >= min && newWidth <= max) {
                setSidebarWidth(newWidth);
            }
        };

        const onMouseUp = () => {
            setIsDragging(false);
            localStorage.setItem('sidebarWidth', sidebarWidth.toString());
        };

        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isDragging, sidebarWidth]);

    const startDragging = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const queryClient = useQueryClient();
    const [isRecentFormsOpen, setIsRecentFormsOpen] = useState(true);

    const navItems = [
        { href: "/dashboard", label: "Dashboard", icon: "home" },
        { href: "/forms", label: "My Forms", icon: "document" },
        { href: "/analytics", label: "Analytics", icon: "chart" },
        { href: "/settings", label: "Settings", icon: "settings" },
    ];

    const handleLogout = () => {
        // clear react query cache
        queryClient.clear();
        signOut({ callbackUrl: '/signin' });
    };

    // const { data: dashboardMetrics } = useQuery({
    //   queryKey: ['dashboard-metrics'],
    //   queryFn: () => fetch('/api/dashboard').then(res => res.json()),
    //   staleTime: 5 * 60 * 1000,
    //   refetchOnWindowFocus: false,
    // });

    const { data: forms = [], isLoading } = useQuery({
        queryKey: ['forms'],
        queryFn: async () => {
            const res = await fetch('/api/forms')
            if (!res.ok) return [] // 401, 500, etc → just return empty array
            const data = await res.json()
            return Array.isArray(data) ? data : []
        },
        // .then(data => Array.isArray(data) ? data : data.forms ?? data.data ?? []),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    const stats = useMemo(() => {
        return STATS_CONFIG.map(stat => ({
            title: stat.title,
            value: getNestedValue(dashboardMetrics, stat.path)?.toLocaleString() || '0',
            icon: <Icon name={stat.icon} className="w-5 h-5" />,
        }));
    }, []);


    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="border-r border-border p-5 hidden md:flex flex-col transition-all duration-150" style={{ width: sidebarWidth ?? 216 }}>
                <Link href="/" className="flex items-center gap-2 mb-8">
                    <Icon name="document" className="w-5 h-5" />
                    <span className="font-medium">DeForm.</span>
                </Link>
                <nav className="flex flex-col gap-2 text-sm">
                    {navItems.map((item) => (
                        <NavLink key={item.href} href={item.href} icon={item.icon}>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="mt-auto">
                    <Button
                        variant="other"
                        className="w-full mt-6"
                        icon={<Icon name="logout" className="w-4 h-4" />}
                        onClick={handleLogout}
                    >
                        Log out
                    </Button>
                </div>
            </aside>

            <div
                ref={dividerRef}
                className="hidden md:block relative w-1 cursor-col-resize hover:bg-blue-200/50 transition-colors group"
                onMouseDown={startDragging}
            >
                {/* Icon that appears on hover */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <Icon name="resize" className="w-4 h-4 text-blue-500" />
                </div>
            </div>

            {/* Main */}
            <main className="flex-1 p-6 md:p-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-medium">Dashboard</h1>
                        <p className="text-muted-foreground text-sm">Manage your forms and track responses</p>
                    </div>
                    <Link href="builder" className="rounded-xl! p-3! text-white bg-blue-600! hover:bg-blue-700!">
                        + Create Form
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </div>

                {/* Recent Forms */}
                <div className="rounded-xl mt-2 bg-card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-medium">Recent Forms</h2>
                        <Icon
                            onClick={() => setIsRecentFormsOpen(prev => !prev)}
                            name="chevronDown"
                            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isRecentFormsOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </div>

                    {isRecentFormsOpen && (
                        <div className="space-y-3">
                            {isLoading ? (
                                <p className="text-sm text-muted-foreground">Loading...</p>
                            ) : forms.length === 0 ? (
                                <div>empty state</div>
                            ) : (
                                forms.map(form => <FormCard key={form.id} form={form} />)
                            )}

                            {/* {(forms ?? []).map((form) => (
                                <FormCard key={form.id} form={form} />
                            ))} */}
                        </div>
                    )}
                </div>

                {/* Empty State */}
                {forms.length === 0 && (
                    <div className="mt-10 border border-dashed border-border rounded-xl p-10 text-center">
                        <Icon name="document" className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                        <h3 className="font-medium mb-1">No forms yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Create your first form to start collecting responses
                        </p>
                        <Button className="rounded-xl! bg-blue-600! hover:bg-blue-700!">
                            Create your first form
                        </Button>
                    </div>
                )}
            </main>
        </div>
    )
}
