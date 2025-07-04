import {
  Home,
  Users,
  ShoppingCart,
  Package,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  ChefHat,
  CreditCard,
  FileText,
  Utensils,
} from "lucide-react"
import { RolUsuario } from "@/interfaces/auth"

export interface NavigationItem {
  title: string
  href: string
  icon: any
  description?: string
  badge?: string
}

export function getNavigationByRole(rol: RolUsuario): NavigationItem[] {
  const baseNavigation: NavigationItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
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
          icon: Utensils,
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
          icon: CreditCard,
          description: "Punto de venta",
        },
        {
          title: "Encuestas SMS",
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
          icon: Utensils,
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
          icon: CreditCard,
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
          icon: FileText,
          description: "Reportes de ventas",
        },
        {
          title: "Facturas",
          href: "/facturas",
          icon: FileText,
          description: "Gestión de facturas",
        },
      ]

    case RolUsuario.MESERO:
      return [
        ...baseNavigation,
        {
          title: "Mesas",
          href: "/mesas",
          icon: Utensils,
          description: "Gestión de mesas",
        },
        {
          title: "Órdenes",
          href: "/ordenes",
          icon: ShoppingCart,
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
          description: "Órdenes de cocina",
          badge: "3",
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
          icon: Utensils,
          description: "Consulta de productos",
        },
      ]

    default:
      return baseNavigation
  }
}

export function getRoleBadgeColor(rol: RolUsuario): string {
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
