"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getNavigationByRole, getRoleColor } from "./role-navigation"

interface AuthSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function AuthSidebar({ isOpen, onToggle }: AuthSidebarProps) {
  const { user } = useAuth()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (!user) return null

  const navigation = getNavigationByRole(user.rol)
  const roleColor = getRoleColor(user.rol)

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
                <div className={`w-8 h-8 rounded-full ${roleColor} flex items-center justify-center`}>
                  <span className="text-white font-semibold text-sm">
                    {user.nombreCompleto.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{user.nombreCompleto.split(" ")[0]}</p>
                  <p className="text-xs text-gray-500">{user.rol}</p>
                </div>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={toggleCollapsed} className="hidden lg:flex">
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
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
                        isCollapsed && "px-2",
                      )}
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
                <p className="text-xs text-gray-500">AppRest v1.0</p>
                <p className="text-xs text-gray-400">© 2024</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
