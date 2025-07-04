import type React from "react"
import { RolUsuario } from "@/interfaces/auth"
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
  UtensilsCrossed,
  Receipt,
  ClipboardList,
} from "lucide-react"

export interface NavigationItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  description?: string
}

export function getNavigationByRole(role: RolUsuario): NavigationItem[] {
  const baseNavigation: NavigationItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Panel principal",
    },
  ]

  switch (role) {
    case RolUsuario.ADMINISTRADOR:
      return [
        ...baseNavigation,
        {
          title: "Productos",
          href: "/productos",
          icon: Package,
          description: "Gestión de productos",
        },
        {
          title: "Mesas",
          href: "/mesas",
          icon: UtensilsCrossed,
          description: "Gestión de mesas",
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
          description: "Base de clientes",
        },
        {
          title: "Reservaciones",
          href: "/reservaciones",
          icon: Calendar,
          description: "Gestión de reservas",
        },
        {
          title: "POS Ventas",
          href: "/ventas/pos",
          icon: ShoppingCart,
          description: "Punto de venta",
        },
        {
          title: "Encuestas SMS",
          href: "/encuestas/campanas",
          icon: MessageSquare,
          description: "Campañas de encuestas",
        },
        {
          title: "Reportes",
          href: "/reportes",
          icon: BarChart3,
          description: "Análisis y reportes",
        },
        {
          title: "Configuración",
          href: "/configuracion",
          icon: Settings,
          description: "Configuración del sistema",
        },
      ]

    case RolUsuario.GERENTE:
      return [
        ...baseNavigation,
        {
          title: "Productos",
          href: "/productos",
          icon: Package,
          description: "Gestión de productos",
        },
        {
          title: "Mesas",
          href: "/mesas",
          icon: UtensilsCrossed,
          description: "Gestión de mesas",
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
          description: "Base de clientes",
        },
        {
          title: "Reservaciones",
          href: "/reservaciones",
          icon: Calendar,
          description: "Gestión de reservas",
        },
        {
          title: "POS Ventas",
          href: "/ventas/pos",
          icon: ShoppingCart,
          description: "Punto de venta",
        },
        {
          title: "Reportes",
          href: "/reportes",
          icon: BarChart3,
          description: "Análisis y reportes",
        },
      ]

    case RolUsuario.CAJERO:
      return [
        ...baseNavigation,
        {
          title: "POS Ventas",
          href: "/ventas/pos",
          icon: ShoppingCart,
          description: "Punto de venta",
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
          description: "Base de clientes",
        },
        {
          title: "Reportes Básicos",
          href: "/reportes/basicos",
          icon: BarChart3,
          description: "Reportes de ventas",
        },
        {
          title: "Facturas",
          href: "/facturas",
          icon: Receipt,
          description: "Gestión de facturas",
        },
      ]

    case RolUsuario.MESERO:
      return [
        ...baseNavigation,
        {
          title: "Mesas",
          href: "/mesas",
          icon: UtensilsCrossed,
          description: "Gestión de mesas",
        },
        {
          title: "Órdenes",
          href: "/ordenes",
          icon: ClipboardList,
          description: "Gestión de órdenes",
        },
        {
          title: "Reservaciones",
          href: "/reservaciones",
          icon: Calendar,
          description: "Gestión de reservas",
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
          description: "Base de clientes",
        },
      ]

    case RolUsuario.COCINERO:
      return [
        ...baseNavigation,
        {
          title: "Cocina",
          href: "/cocina",
          icon: ChefHat,
          badge: "3",
          description: "Órdenes de cocina",
        },
        {
          title: "Inventario",
          href: "/inventario",
          icon: Package,
          description: "Control de inventario",
        },
        {
          title: "Productos",
          href: "/productos",
          icon: Package,
          description: "Gestión de productos",
        },
      ]

    default:
      return baseNavigation
  }
}

export function getRoleColor(role: RolUsuario): string {
  switch (role) {
    case RolUsuario.ADMINISTRADOR:
      return "bg-purple-500"
    case RolUsuario.GERENTE:
      return "bg-indigo-500"
    case RolUsuario.CAJERO:
      return "bg-green-500"
    case RolUsuario.MESERO:
      return "bg-blue-500"
    case RolUsuario.COCINERO:
      return "bg-orange-500"
    default:
      return "bg-gray-500"
  }
}

export function getRoleBadgeColor(role: RolUsuario): string {
  switch (role) {
    case RolUsuario.ADMINISTRADOR:
      return "bg-purple-100 text-purple-800"
    case RolUsuario.GERENTE:
      return "bg-indigo-100 text-indigo-800"
    case RolUsuario.CAJERO:
      return "bg-green-100 text-green-800"
    case RolUsuario.MESERO:
      return "bg-blue-100 text-blue-800"
    case RolUsuario.COCINERO:
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function getRoleBadgeVariant(role: RolUsuario): "default" | "secondary" | "destructive" | "outline" {
  switch (role) {
    case RolUsuario.ADMINISTRADOR:
      return "destructive"
    case RolUsuario.GERENTE:
      return "default"
    case RolUsuario.CAJERO:
      return "secondary"
    case RolUsuario.MESERO:
      return "outline"
    case RolUsuario.COCINERO:
      return "secondary"
    default:
      return "outline"
  }
}
