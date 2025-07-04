"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { getNavigationByRole, getRoleBadgeColor } from "./role-navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface AuthSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function AuthSidebar({ isOpen, onToggle }: AuthSidebarProps) {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const navigation = getNavigationByRole(user.rol)

  const getUserInitials = (nombreCompleto: string) => {
    if (!nombreCompleto || typeof nombreCompleto !== "string") return "U"
    return nombreCompleto
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div
      className={cn(
        "relative flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
        isOpen ? "w-64" : "w-16",
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-white shadow-md hover:bg-gray-50"
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      {/* User Info */}
      <div className="p-4">
        <div className={cn("flex items-center", isOpen ? "space-x-3" : "justify-center")}>
          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
            <span className="text-orange-600 font-medium text-sm">{getUserInitials(user.nombreCompleto)}</span>
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.nombreCompleto}</p>
              <Badge variant="secondary" className={`text-xs ${getRoleBadgeColor(user.rol)}`}>
                {user.rol}
              </Badge>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10",
                    isOpen ? "px-3" : "px-0 justify-center",
                    isActive && "bg-orange-100 text-orange-700 hover:bg-orange-100",
                  )}
                >
                  <Icon className={cn("h-5 w-5", isOpen && "mr-3")} />
                  {isOpen && (
                    <div className="flex-1 text-left">
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  )}
                </Button>
              </Link>
            )
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      {isOpen && (
        <div className="p-4 border-t">
          <div className="text-xs text-gray-500 space-y-1">
            <p>Empresa: {user.nombreEmpresa}</p>
            <p>Licencia: {user.nivelLicencia}</p>
          </div>
        </div>
      )}
    </div>
  )
}
