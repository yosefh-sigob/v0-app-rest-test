"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Users,
  ChefHat,
  CreditCard,
  Calendar,
  BarChart3,
  Settings,
  Package,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Inicio",
    href: "/",
    icon: Home,
    badge: null,
  },
  {
    title: "Mesas",
    href: "/mesas",
    icon: Users,
    badge: "8 ocupadas",
  },
  {
    title: "Productos",
    href: "/productos",
    icon: Package,
    badge: null,
  },
  {
    title: "Clientes",
    href: "/clientes",
    icon: Users,
    badge: null,
  },
  {
    title: "Reservaciones",
    href: "/reservaciones",
    icon: Calendar,
    badge: "3 hoy",
  },
  {
    title: "Punto de Venta",
    href: "/ventas/pos",
    icon: CreditCard,
    badge: null,
  },
  {
    title: "Reportes",
    href: "/reportes",
    icon: BarChart3,
    badge: null,
  },
]

const rolesItems = [
  {
    title: "Mesero",
    href: "/mesero",
    icon: ChefHat,
    description: "Gestión de mesas y pedidos",
  },
  {
    title: "Cajero",
    href: "/cajero",
    icon: CreditCard,
    description: "Punto de venta y facturación",
  },
]

const encuestasItems = [
  {
    title: "Crear Encuesta",
    href: "/encuestas/crear",
    icon: MessageSquare,
    badge: null,
  },
  {
    title: "Campañas SMS",
    href: "/encuestas/campanas",
    icon: MessageSquare,
    badge: "2 activas",
  },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn("sidebar-restaurant flex flex-col transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      {/* Header del sidebar */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-white">El Buen Sabor</h2>
              <p className="text-xs text-white/70">Sistema de Gestión</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:bg-white/10"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navegación principal */}
      <div className="flex-1 overflow-y-auto scrollbar-restaurant">
        <div className="p-4 space-y-2">
          {!collapsed && (
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Navegación</h3>
          )}

          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Button
                key={item.href}
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white hover:bg-white/10",
                  isActive && "bg-white/20 text-white",
                  collapsed && "px-2",
                )}
              >
                <Link href={item.href}>
                  <item.icon className={cn("w-4 h-4", !collapsed && "mr-3")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              </Button>
            )
          })}
        </div>

        <Separator className="mx-4 bg-white/10" />

        {/* Sección de roles */}
        <div className="p-4 space-y-2">
          {!collapsed && (
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Acceso Rápido</h3>
          )}

          {rolesItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn("w-full justify-start text-white hover:bg-white/10", collapsed && "px-2")}
            >
              <Link href={item.href}>
                <item.icon className={cn("w-4 h-4", !collapsed && "mr-3")} />
                {!collapsed && (
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-white/70">{item.description}</div>
                  </div>
                )}
              </Link>
            </Button>
          ))}
        </div>

        <Separator className="mx-4 bg-white/10" />

        {/* Sección de encuestas */}
        <div className="p-4 space-y-2">
          {!collapsed && (
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Encuestas SMS</h3>
          )}

          {encuestasItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn("w-full justify-start text-white hover:bg-white/10", collapsed && "px-2")}
            >
              <Link href={item.href}>
                <item.icon className={cn("w-4 h-4", !collapsed && "mr-3")} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Footer del sidebar */}
      <div className="p-4 border-t border-white/10">
        <Button
          asChild
          variant="ghost"
          className={cn("w-full justify-start text-white hover:bg-white/10", collapsed && "px-2")}
        >
          <Link href="/configuracion">
            <Settings className={cn("w-4 h-4", !collapsed && "mr-3")} />
            {!collapsed && <span>Configuración</span>}
          </Link>
        </Button>
      </div>
    </div>
  )
}
