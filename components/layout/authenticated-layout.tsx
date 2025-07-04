"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { AuthHeader } from "./auth-header"
import { AuthSidebar } from "./auth-sidebar"
import { Skeleton } from "@/components/ui/skeleton"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar skeleton */}
          <div className="hidden lg:block w-64 bg-white border-r">
            <div className="p-4 space-y-4">
              <Skeleton className="h-12 w-full" />
              <div className="space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="flex-1">
            <Skeleton className="h-16 w-full" />
            <div className="p-6 space-y-6">
              <Skeleton className="h-8 w-64" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AuthSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        <div className="flex-1 flex flex-col min-h-screen">
          <AuthHeader onToggleSidebar={toggleSidebar} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
