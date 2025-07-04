import type React from "react"
import { RolUsuario } from "@/interfaces/auth"
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Calendar,
  CreditCard,
  MessageSquare,
  BarChart3,
  Settings,
  ChefHat,
  UtensilsCrossed,
  Receipt,
} from "lucide-react"

export interface NavigationItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  description?: string
}

export const getRoleBadgeColor = (rol: RolUsuario): string => {
  switch (rol) {
    case RolUsuario.ADMINISTRADOR:
      return "bg-purple-100 text-purple-800 border-purple-200"
    case RolUsuario.GERENTE:
      return "bg-indigo-100 text-indigo-800 border-indigo-200"
    case RolUsuario.CAJERO:
      return "bg-green-100 text-green-800 border-green-200"
    case RolUsuario.MESERO:
      return "bg-blue-100 text-blue-800 border-blue-200"
    case RolUsuario.COCINERO:
      return "bg-orange-100 text-orange-800 border-orange-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export const getNavigationByRole = (rol: RolUsuario): NavigationItem[] => {
  const baseNavigation: NavigationItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Panel principal",
    },
  ]

  switch (rol) {
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
          title: "Ventas",
          href: "/ventas/pos",
          icon: CreditCard,
          description: "Punto de venta",
        },
        {
          title: "Reservaciones",
          href: "/reservaciones",
          icon: Calendar,
          description: "Gestión de reservas",
        },
        {
          title: "Encuestas",
          href: "/encuestas/campanas",
          icon: MessageSquare,
          description: "Campañas SMS",
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
          title: "Ventas",
          href: "/ventas/pos",
          icon: CreditCard,
          description: "Punto de venta",
        },
        {
          title: "Reservaciones",
          href: "/reservaciones",
          icon: Calendar,
          description: "Gestión de reservas",
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
          title: "Punto de Venta",
          href: "/cajero",
          icon: CreditCard,
          description: "POS principal",
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
          description: "Base de clientes",
        },
        {
          title: "Facturas",
          href: "/facturas",
          icon: Receipt,
          description: "Facturación",
        },
        {
          title: "Reportes",
          href: "/reportes/ventas",
          icon: BarChart3,
          description: "Reportes de venta",
        },
      ]

    case RolUsuario.MESERO:
      return [
        ...baseNavigation,
        {
          title: "Mis Mesas",
          href: "/mesero",
          icon: UtensilsCrossed,
          description: "Mesas asignadas",
        },
        {
          title: "Órdenes",
          href: "/mesero/ordenes",
          icon: ShoppingCart,
          description: "Gestión de órdenes",
        },
        {
          title: "Reservaciones",
          href: "/reservaciones",
          icon: Calendar,
          description: "Reservas del día",
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
          description: "Información de clientes",
        },
      ]

    case RolUsuario.COCINERO:
      return [
        ...baseNavigation,
        {
          title: "Cocina",
          href: "/cocina",
          icon: ChefHat,
          description: "Órdenes de cocina",
        },
        {
          title: "Productos",
          href: "/productos",
          icon: Package,
          description: "Menú y recetas",
        },
        {
          title: "Inventario",
          href: "/inventario",
          icon: Package,
          description: "Stock de ingredientes",
        },
      ]

    default:
      return baseNavigation
  }
}
