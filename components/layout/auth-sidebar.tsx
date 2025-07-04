"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChefHat, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/contexts/auth-context"
import { getNavigationByRole, getRoleColor } from "./role-navigation"
import { cn } from "@/lib/utils"

interface AuthSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

function getUserInitials(nombreCompleto: string): string {
  if (!nombreCompleto || typeof nombreCompleto !== "string") return "U"

  const names = nombreCompleto.trim().split(" ")
  if (names.length === 1) return names[0].charAt(0).toUpperCase()

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
}

export function AuthSidebar({ isOpen, onToggle }: AuthSidebarProps) {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const navigation = getNavigationByRole(user.rol)
  const roleColor = getRoleColor(user.rol)
  const userInitials = getUserInitials(user.nombreCompleto)

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={onToggle}>
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-amber-900 to-amber-800 text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-amber-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">AppRest</h2>
                <p className="text-xs text-amber-200">Gestión Restaurante</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onToggle} className="lg:hidden text-white hover:bg-amber-700">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-amber-700">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full ${roleColor} flex items-center justify-center`}>
                <span className="text-white font-semibold text-sm">{userInitials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.nombreCompleto}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {user.rol}
                  </Badge>
                  <Badge variant="outline" className="text-xs text-amber-200 border-amber-200">
                    {user.nivelLicencia}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link key={item.href} href={item.href} onClick={() => onToggle()}>
                    <div
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive ? "bg-amber-600 text-white" : "text-amber-100 hover:bg-amber-700 hover:text-white",
                      )}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-amber-700">
            <div className="text-center">
              <p className="text-xs text-amber-200">{user.nombreEmpresa}</p>
              <p className="text-xs text-amber-300 mt-1">v2.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
