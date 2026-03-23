'use client'

import React, {useMemo} from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import Icon from '@/icons/Icon'
import { usePathname } from "next/navigation";
import NavLink from '../_components/NavLink'
import StatCard from '../_components/StatCard'
import { signOut } from 'next-auth/react';
import { getNestedValue } from '@/utils/fx'

const STATS_CONFIG = [
  { key: 'forms',      title: 'Forms',      icon: 'document',  path: 'forms.total'     },
  { key: 'responses',  title: 'Responses',  icon: 'email',     path: 'responses.total' },
  { key: 'views',      title: 'Views',      icon: 'eye',       path: 'views.total'     },
  { key: 'conversion', title: 'Conversion', icon: 'chart',     path: 'conversion.rate' },
];

const dashboardMetrics = {
  forms:      { total: 12   },
  responses:  { total: 1245 },
  views:      { total: 3890 },
  conversion: { rate: 24    },
};

export default function Dashboard() {

  
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "home" },
    { href: "/forms", label: "My Forms", icon: "document" },
    { href: "/analytics", label: "Analytics", icon: "chart" },
    { href: "/settings", label: "Settings", icon: "settings" },
  ];

  const stats = useMemo(() => {
  return STATS_CONFIG.map(stat => ({
    title: stat.title,
    value: getNestedValue(dashboardMetrics, stat.path)?.toLocaleString() || '0',
    icon: <Icon name={stat.icon} className="w-5 h-5" />,
    subtitle: `All ${stat.title.toLowerCase()}`,
  }));
}, []);


  return (
    <div className="min-h-screen bg-background flex">

      {/* Sidebar */}
      <aside className="w-54 border-r border-border p-5 hidden md:flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <Icon name="document" className="w-5 h-5" />
          <span className="font-medium">DeForm.</span>
        </div>

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
            onClick={() => signOut({ callbackUrl: '/home' })}
          >
            Log out
          </Button>
        </div>
      </aside>

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
        <div className="border border-border rounded-xl p-5 bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Recent Forms</h2>
            <Link href="#" className="text-sm text-primary">View all</Link>
          </div>

          <div className="space-y-3">

            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted transition">
                <div>
                  <p className="font-medium">Untitled Form</p>
                  <p className="text-sm text-muted-foreground">0 responses</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="other" className="h-10! px-4!">
                    Edit
                  </Button>
                  <Button variant="primary" className="h-10! px-4!">
                    View
                  </Button>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Empty State */}
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

      </main>
    </div>
  )
}
