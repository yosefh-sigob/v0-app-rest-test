"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { AuthHeader } from "./auth-header"
import { AuthSidebar } from "./auth-sidebar"
import { LoginForm } from "@/components/auth/login-form"
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

  // Mostrar skeleton mientras carga
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar skeleton */}
          <div className="hidden lg:block w-64 bg-white border-r">
            <div className="p-4 border-b">
              <Skeleton className="h-8 w-32" />
            </div>
            <div className="p-4 space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="flex-1">
            {/* Header skeleton */}
            <div className="h-16 bg-white border-b flex items-center justify-between px-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>

            {/* Content skeleton */}
            <div className="p-6 space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Mostrar login si no está autenticado
  if (!isAuthenticated) {
    return <LoginForm />
  }

  // Mostrar layout autenticado
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
