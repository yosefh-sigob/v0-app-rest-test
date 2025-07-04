import {
  LayoutDashboard,
  Package,
  Users,
  Calendar,
  ShoppingCart,
  MessageSquare,
  BarChart3,
  Settings,
  ChefHat,
  Receipt,
  ClipboardList,
  UtensilsCrossed,
  Coffee,
} from "lucide-react"
import type { RolUsuario } from "@/interfaces/auth"

export interface NavigationItem {
  title: string
  href: string
  icon: any
  badge?: string
}

export function getNavigationByRole(rol: RolUsuario): NavigationItem[] {
  const baseNavigation: NavigationItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
  ]

  switch (rol) {
    case "Administrador":
      return [
        ...baseNavigation,
        {
          title: "Productos",
          href: "/productos",
          icon: Package,
        },
        {
          title: "Mesas",
          href: "/mesas",
          icon: UtensilsCrossed,
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
        },
        {
          title: "Reservaciones",
          href: "/reservaciones",
          icon: Calendar,
        },
        {
          title: "POS Ventas",
          href: "/ventas/pos",
          icon: ShoppingCart,
        },
        {
          title: "Encuestas",
          href: "/encuestas/campanas",
          icon: MessageSquare,
        },
        {
          title: "Reportes",
          href: "/reportes",
          icon: BarChart3,
        },
        {
          title: "Configuración",
          href: "/configuracion",
          icon: Settings,
        },
      ]

    case "Gerente":
      return [
        ...baseNavigation,
        {
          title: "Productos",
          href: "/productos",
          icon: Package,
        },
        {
          title: "Mesas",
          href: "/mesas",
          icon: UtensilsCrossed,
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
        },
        {
          title: "Reservaciones",
          href: "/reservaciones",
          icon: Calendar,
        },
        {
          title: "POS Ventas",
          href: "/ventas/pos",
          icon: ShoppingCart,
        },
        {
          title: "Reportes",
          href: "/reportes",
          icon: BarChart3,
        },
      ]

    case "Cajero":
      return [
        ...baseNavigation,
        {
          title: "POS Ventas",
          href: "/ventas/pos",
          icon: ShoppingCart,
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
        },
        {
          title: "Facturas",
          href: "/facturas",
          icon: Receipt,
        },
        {
          title: "Reportes",
          href: "/reportes/ventas",
          icon: BarChart3,
        },
      ]

    case "Mesero":
      return [
        ...baseNavigation,
        {
          title: "Mesas",
          href: "/mesas",
          icon: UtensilsCrossed,
        },
        {
          title: "Órdenes",
          href: "/mesero",
          icon: ClipboardList,
        },
        {
          title: "Reservaciones",
          href: "/reservaciones",
          icon: Calendar,
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
        },
      ]

    case "Cocinero":
      return [
        ...baseNavigation,
        {
          title: "Cocina",
          href: "/cocina",
          icon: ChefHat,
          badge: "3",
        },
        {
          title: "Inventario",
          href: "/inventario",
          icon: Package,
        },
        {
          title: "Productos",
          href: "/productos",
          icon: Coffee,
        },
      ]

    default:
      return baseNavigation
  }
}

export function getRoleColor(rol: RolUsuario): string {
  switch (rol) {
    case "Administrador":
      return "bg-red-500"
    case "Gerente":
      return "bg-blue-500"
    case "Cajero":
      return "bg-green-500"
    case "Mesero":
      return "bg-purple-500"
    case "Cocinero":
      return "bg-orange-500"
    default:
      return "bg-gray-500"
  }
}

export function getRoleBadgeVariant(rol: RolUsuario): "default" | "secondary" | "destructive" | "outline" {
  switch (rol) {
    case "Administrador":
      return "destructive"
    case "Gerente":
      return "default"
    case "Cajero":
      return "secondary"
    case "Mesero":
      return "outline"
    case "Cocinero":
      return "secondary"
    default:
      return "outline"
  }
}
