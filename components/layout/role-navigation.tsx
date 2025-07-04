import type React from "react"
import {
  LayoutDashboard,
  Utensils,
  MapPin,
  Users,
  Calendar,
  CreditCard,
  MessageSquare,
  BarChart3,
  Settings,
  ChefHat,
  Package,
  FileText,
} from "lucide-react"
import type { RolUsuario } from "@/interfaces/auth"

export interface NavigationItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  description?: string
}

export function getNavigationByRole(rol: RolUsuario): NavigationItem[] {
  const baseNavigation: NavigationItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Panel principal",
    },
  ]

  switch (rol) {
    case "Administrador":
      return [
        ...baseNavigation,
        {
          title: "Productos",
          href: "/productos",
          icon: Utensils,
          description: "Gestión de productos",
        },
        {
          title: "Mesas",
          href: "/mesas",
          icon: MapPin,
          description: "Administrar mesas",
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
          icon: CreditCard,
          description: "Punto de venta",
        },
        {
          title: "Encuestas SMS",
          href: "/encuestas",
          icon: MessageSquare,
          description: "Campañas de satisfacción",
        },
        {
          title: "Reportes",
          href: "/reportes",
          icon: BarChart3,
          description: "Análisis y estadísticas",
        },
        {
          title: "Configuración",
          href: "/configuracion",
          icon: Settings,
          description: "Configuración del sistema",
        },
      ]

    case "Gerente":
      return [
        ...baseNavigation,
        {
          title: "Productos",
          href: "/productos",
          icon: Utensils,
          description: "Gestión de productos",
        },
        {
          title: "Mesas",
          href: "/mesas",
          icon: MapPin,
          description: "Administrar mesas",
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
          icon: CreditCard,
          description: "Punto de venta",
        },
        {
          title: "Reportes",
          href: "/reportes",
          icon: BarChart3,
          description: "Análisis y estadísticas",
        },
      ]

    case "Cajero":
      return [
        ...baseNavigation,
        {
          title: "POS Ventas",
          href: "/ventas/pos",
          icon: CreditCard,
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
          icon: FileText,
          description: "Gestión de facturas",
        },
      ]

    case "Mesero":
      return [
        ...baseNavigation,
        {
          title: "Mesas",
          href: "/mesas",
          icon: MapPin,
          description: "Mis mesas asignadas",
        },
        {
          title: "Órdenes",
          href: "/ordenes",
          icon: Utensils,
          description: "Tomar órdenes",
        },
        {
          title: "Reservaciones",
          href: "/reservaciones",
          icon: Calendar,
          description: "Ver reservas",
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
          description: "Información de clientes",
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
          description: "Órdenes pendientes",
        },
        {
          title: "Inventario",
          href: "/inventario",
          icon: Package,
          description: "Stock de ingredientes",
        },
        {
          title: "Productos",
          href: "/productos",
          icon: Utensils,
          description: "Recetas y productos",
        },
      ]

    default:
      return baseNavigation
  }
}

export function getRoleColor(rol: RolUsuario): string {
  switch (rol) {
    case "Administrador":
      return "bg-purple-500"
    case "Gerente":
      return "bg-indigo-500"
    case "Cajero":
      return "bg-green-500"
    case "Mesero":
      return "bg-blue-500"
    case "Cocinero":
      return "bg-orange-500"
    default:
      return "bg-gray-500"
  }
}

export function getRoleBadgeVariant(rol: RolUsuario): "default" | "secondary" | "destructive" | "outline" {
  switch (rol) {
    case "Administrador":
      return "default"
    case "Gerente":
      return "secondary"
    default:
      return "outline"
  }
}
