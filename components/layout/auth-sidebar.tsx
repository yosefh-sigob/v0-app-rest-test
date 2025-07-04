"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, ChefHat } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getNavigationByRole, getRoleColor } from "./role-navigation"

interface AuthSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

function getUserInitials(nombreCompleto?: string): string {
  if (!nombreCompleto || typeof nombreCompleto !== "string") {
    return "U"
  }

  const names = nombreCompleto.trim().split(" ").filter(Boolean)

  if (names.length === 0) return "U"
  if (names.length === 1) return names[0].charAt(0).toUpperCase()

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
}

function getFirstName(nombreCompleto?: string): string {
  if (!nombreCompleto || typeof nombreCompleto !== "string") {
    return "Usuario"
  }

  const names = nombreCompleto.trim().split(" ").filter(Boolean)
  return names.length > 0 ? names[0] : "Usuario"
}

export function AuthSidebar({ isOpen, onToggle }: AuthSidebarProps) {
  const { user } = useAuth()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (!user) return null

  const navigation = getNavigationByRole(user.rol)
  const roleColor = getRoleColor(user.rol)
  const userInitials = getUserInitials(user.nombreCompleto)
  const firstName = getFirstName(user.nombreCompleto)

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-white border-r transition-all duration-300 lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <ChefHat className="h-8 w-8 text-orange-600" />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">AppRest</h2>
                  <p className="text-xs text-gray-500">Gestión</p>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className="flex justify-center w-full">
                <ChefHat className="h-8 w-8 text-orange-600" />
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={toggleCollapsed} className="hidden lg:flex">
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* User info */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full ${roleColor} flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-semibold text-sm">{userInitials}</span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{firstName}</p>
                  <p className="text-xs text-gray-500 truncate">{user.rol}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {user.nivelLicencia}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start h-10",
                        isActive && "bg-orange-100 text-orange-900 hover:bg-orange-200",
                        isCollapsed && "px-2 justify-center",
                      )}
                      onClick={() => {
                        if (window.innerWidth < 1024) {
                          onToggle()
                        }
                      }}
                    >
                      <Icon className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-3")} />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left">{item.title}</span>
                          {item.badge && (
                            <Badge variant="destructive" className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4">
            {!isCollapsed && (
              <div className="text-center">
                <p className="text-xs text-gray-500">{user.nombreEmpresa}</p>
                <p className="text-xs text-gray-400">AppRest v1.0</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
