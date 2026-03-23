'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import Icon from '@/icons/Icon'
import { usePathname } from "next/navigation";
import NavLink from '../_components/NavLink'
import StatCard from '../_components/StatCard'

export default function Dashboard() {

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "home" },
    { href: "/forms", label: "My Forms", icon: "document" },
    { href: "/analytics", label: "Analytics", icon: "chart" },
    { href: "/settings", label: "Settings", icon: "settings" },
  ];


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

          <Button className="rounded-xl! bg-blue-600! hover:bg-blue-700!">
            + Create Form
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {["Forms", "Responses", "Views", "Conversion"].map((item, i) => (
            // <div key={i} className="p-5 rounded-xl border border-border bg-card">
            //   <p className="text-sm text-muted-foreground mb-1">{item}</p>
            //   <h3 className="text-xl font-medium">0</h3>
            // </div>

            <StatCard
              key={i}
              title="Responses"
              value="1,245"
              icon="chart"
              subtitle="All responses"
            />
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
