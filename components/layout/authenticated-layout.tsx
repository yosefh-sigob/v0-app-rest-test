"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { AuthSidebar } from "./auth-sidebar"
import { AuthHeader } from "./auth-header"
import { Skeleton } from "@/components/ui/skeleton"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
  title?: string
}

export function AuthenticatedLayout({ children, title }: AuthenticatedLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth()

  // Mostrar loading mientras se verifica la sesión
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar skeleton */}
          <div className="hidden lg:block w-64 bg-gradient-to-b from-amber-900 to-amber-800 p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-32 bg-amber-700" />
              <Skeleton className="h-4 w-24 bg-amber-700" />
              <div className="space-y-2 mt-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full bg-amber-700" />
                ))}
              </div>
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="flex-1">
            <div className="h-16 bg-white border-b border-gray-200 px-6 py-4">
              <Skeleton className="h-8 w-48" />
            </div>
            <div className="p-6 space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return <LoginForm />
  }

  // Layout autenticado
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AuthSidebar />
        <div className="flex-1 lg:ml-0">
          <AuthHeader title={title} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
