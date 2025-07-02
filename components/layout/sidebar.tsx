"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Home,
  LayoutDashboard,
  Utensils,
  Package,
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  ChefHat,
  CreditCard,
} from "lucide-react"

const menuItems = [
  {
    title: "Panel Principal",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: "Gestión de Mesas",
    href: "/mesas",
    icon: Utensils,
    badge: "12",
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
    badge: "3",
  },
  {
    title: "Encuestas",
    href: "/encuestas",
    icon: MessageSquare,
    badge: null,
    submenu: [
      { title: "Crear Encuesta", href: "/encuestas/crear" },
      { title: "Campañas SMS", href: "/encuestas/campanas" },
    ],
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
  {
    title: "Configuración",
    href: "/configuracion",
    icon: Settings,
    badge: null,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="sidebar-restaurant w-64 min-h-screen p-6">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
          <ChefHat className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">El Buen Sabor</h2>
          <p className="text-xs text-gray-300">Sistema de Gestión</p>
        </div>
      </div>

      {/* Botón volver al inicio */}
      <Link href="/">
        <Button variant="secondary" className="w-full mb-6 bg-orange-500 hover:bg-orange-600 text-white border-none">
          <Home className="w-4 h-4 mr-2" />
          Volver al Inicio
        </Button>
      </Link>

      {/* Menú de navegación */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <div key={item.href}>
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left hover:bg-white/10 hover:text-white",
                    isActive && "bg-white/20 text-white",
                  )}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span className="flex-1">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="bg-orange-500 text-white">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Submenú */}
              {item.submenu && isActive && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.submenu.map((subitem) => (
                    <Link key={subitem.href} href={subitem.href}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "w-full justify-start text-left text-gray-300 hover:bg-white/10 hover:text-white",
                          pathname === subitem.href && "bg-white/20 text-white",
                        )}
                      >
                        {subitem.title}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Información de licencia */}
      <div className="mt-8 p-4 bg-white/10 rounded-lg">
        <div className="text-sm text-gray-300 mb-2">Licencia Actual</div>
        <Badge className="bg-gradient-primary text-white">PRO</Badge>
        <div className="text-xs text-gray-400 mt-2">Todas las funciones disponibles</div>
      </div>
    </div>
  )
}
