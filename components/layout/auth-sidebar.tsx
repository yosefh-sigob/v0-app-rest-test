"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { getRoleNavigation, getRoleBadgeColor } from "./role-navigation"
import { ChevronLeft } from "lucide-react"

interface AuthSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function AuthSidebar({ isOpen, onToggle }: AuthSidebarProps) {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const navigation = getRoleNavigation(user.role)

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r bg-background transition-transform duration-200 ease-in-out md:relative md:top-0 md:h-screen md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* User Info */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.fullName}</p>
                <Badge variant="secondary" className={`text-xs mt-1 ${getRoleBadgeColor(user.role)}`}>
                  {user.role}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={onToggle} className="md:hidden">
                <ChevronLeft className="h-4 w-4" />
              </Button>
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
                        "w-full justify-start h-auto p-3",
                        isActive && "bg-orange-100 text-orange-900 hover:bg-orange-200",
                      )}
                      onClick={() => {
                        // Close sidebar on mobile after navigation
                        if (window.innerWidth < 768) {
                          onToggle()
                        }
                      }}
                    >
                      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{item.title}</div>
                        {item.description && <div className="text-xs text-muted-foreground">{item.description}</div>}
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">AppRest v2.0</p>
              <Badge variant="outline" className="mt-1 text-xs">
                Licencia: Pro
              </Badge>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
