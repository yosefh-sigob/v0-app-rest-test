"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  LayoutDashboard,
  Utensils,
  Package,
  Users,
  Calendar,
  MessageSquare,
  CreditCard,
  BarChart3,
  Settings,
  ChefHat,
  Home,
  Menu,
  X,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Mesas",
    href: "/mesas",
    icon: Utensils,
  },
  {
    name: "Productos",
    href: "/productos",
    icon: Package,
  },
  {
    name: "Clientes",
    href: "/clientes",
    icon: Users,
  },
  {
    name: "Reservaciones",
    href: "/reservaciones",
    icon: Calendar,
  },
  {
    name: "Encuestas",
    href: "/encuestas/crear",
    icon: MessageSquare,
    children: [
      {
        name: "Crear Encuesta",
        href: "/encuestas/crear",
      },
      {
        name: "Campañas SMS",
        href: "/encuestas/campanas",
      },
    ],
  },
  {
    name: "Ventas",
    href: "/ventas/pos",
    icon: CreditCard,
  },
  {
    name: "Reportes",
    href: "/reportes",
    icon: BarChart3,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold">AppRest</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {/* Quick Access */}
          <div className="mb-4">
            {!isCollapsed && (
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Acceso Rápido</p>
            )}
            <Link href="/">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700",
                  isCollapsed && "justify-center px-2",
                )}
              >
                <Home className="h-4 w-4" />
                {!isCollapsed && <span className="ml-2">Inicio</span>}
              </Button>
            </Link>
          </div>

          <Separator className="bg-gray-700 my-4" />

          {/* Main Navigation */}
          {!isCollapsed && <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Gestión</p>}

          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

            return (
              <div key={item.name}>
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 transition-colors",
                      isActive && "bg-orange-600 text-white hover:bg-orange-700",
                      isCollapsed && "justify-center px-2",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span className="ml-2">{item.name}</span>}
                  </Button>
                </Link>

                {/* Submenu */}
                {item.children && !isCollapsed && isActive && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link key={child.name} href={child.href}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "w-full justify-start text-gray-400 hover:text-white hover:bg-gray-700",
                            pathname === child.href && "text-orange-400",
                          )}
                        >
                          <span className="ml-2">{child.name}</span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <Link href="/configuracion">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700",
              isCollapsed && "justify-center px-2",
            )}
          >
            <Settings className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Configuración</span>}
          </Button>
        </Link>
      </div>
    </div>
  )
}
