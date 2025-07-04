"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { RolUsuario } from "@/interfaces/auth"
import {
  LayoutDashboard,
  Users,
  Package,
  UserCheck,
  Calendar,
  MessageSquare,
  CreditCard,
  ChefHat,
  Settings,
  BarChart3,
  Receipt,
  ShoppingCart,
  Truck,
} from "lucide-react"

interface NavigationItem {
  name: string
  href: string
  icon: any
  roles: RolUsuario[]
  badge?: string
}

const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: [RolUsuario.ADMINISTRADOR, RolUsuario.GERENTE, RolUsuario.CAJERO],
  },
  {
    name: "Punto de Venta",
    href: "/ventas/pos",
    icon: CreditCard,
    roles: [RolUsuario.CAJERO, RolUsuario.ADMINISTRADOR, RolUsuario.GERENTE],
  },
  {
    name: "Mesas",
    href: "/mesas",
    icon: Users,
    roles: [RolUsuario.MESERO, RolUsuario.ADMINISTRADOR, RolUsuario.GERENTE],
  },
  {
    name: "Órdenes",
    href: "/ordenes",
    icon: Receipt,
    roles: [RolUsuario.MESERO, RolUsuario.COCINERO, RolUsuario.ADMINISTRADOR, RolUsuario.GERENTE],
  },
  {
    name: "Cocina",
    href: "/cocina",
    icon: ChefHat,
    roles: [RolUsuario.COCINERO, RolUsuario.ADMINISTRADOR, RolUsuario.GERENTE],
  },
  {
    name: "Productos",
    href: "/productos",
    icon: Package,
    roles: [RolUsuario.ADMINISTRADOR, RolUsuario.GERENTE],
  },
  {
    name: "Clientes",
    href: "/clientes",
    icon: UserCheck,
    roles: [RolUsuario.ADMINISTRADOR, RolUsuario.GERENTE, RolUsuario.CAJERO],
  },
  {
    name: "Reservaciones",
    href: "/reservaciones",
    icon: Calendar,
    roles: [RolUsuario.ADMINISTRADOR, RolUsuario.GERENTE, RolUsuario.MESERO],
  },
  {
    name: "Encuestas",
    href: "/encuestas/crear",
    icon: MessageSquare,
    roles: [RolUsuario.ADMINISTRADOR, RolUsuario.GERENTE],
  },
  {
    name: "Reportes",
    href: "/reportes",
    icon: BarChart3,
    roles: [RolUsuario.ADMINISTRADOR, RolUsuario.GERENTE],
  },
  {
    name: "Inventario",
    href: "/inventario",
    icon: ShoppingCart,
    roles: [RolUsuario.ADMINISTRADOR, RolUsuario.GERENTE],
  },
  {
    name: "Delivery",
    href: "/delivery",
    icon: Truck,
    roles: [RolUsuario.ADMINISTRADOR, RolUsuario.GERENTE, RolUsuario.CAJERO],
  },
  {
    name: "Configuración",
    href: "/configuracion",
    icon: Settings,
    roles: [RolUsuario.ADMINISTRADOR],
  },
]

export function RoleNavigation() {
  const pathname = usePathname()
  const { usuario } = useAuth()

  if (!usuario) return null

  // Filtrar navegación según el rol del usuario
  const allowedItems = navigationItems.filter((item) => item.roles.includes(usuario.Rol))

  return (
    <nav className="flex-1 px-4 py-6 space-y-2">
      {allowedItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors group",
              isActive
                ? "bg-amber-800 text-amber-100 shadow-lg"
                : "text-amber-200 hover:bg-amber-800/50 hover:text-amber-100",
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span className="flex-1">{item.name}</span>
            {item.badge && (
              <span className="ml-2 px-2 py-1 text-xs bg-amber-600 text-amber-100 rounded-full">{item.badge}</span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
