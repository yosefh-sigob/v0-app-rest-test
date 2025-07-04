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
  Warehouse,
  FileText,
  CreditCard,
} from "lucide-react"
import type { RolUsuario } from "@/interfaces/auth"

export interface NavigationItem {
  title: string
  href: string
  icon: any
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
          icon: Package,
          description: "Gestión de productos y menú",
        },
        {
          title: "Mesas",
          href: "/mesas",
          icon: UtensilsCrossed,
          description: "Administración de mesas",
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
          description: "Base de datos de clientes",
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
          icon: Package,
          description: "Gestión de productos",
        },
        {
          title: "Mesas",
          href: "/mesas",
          icon: UtensilsCrossed,
          description: "Administración de mesas",
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

    case "Cajero":
      return [
        ...baseNavigation,
        {
          title: "POS Ventas",
          href: "/cajero",
          icon: CreditCard,
          description: "Punto de venta principal",
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
          description: "Consulta de clientes",
        },
        {
          title: "Facturas",
          href: "/facturas",
          icon: Receipt,
          description: "Gestión de facturas",
        },
        {
          title: "Reportes de Ventas",
          href: "/reportes/ventas",
          icon: FileText,
          description: "Reportes básicos",
        },
      ]

    case "Mesero":
      return [
        ...baseNavigation,
        {
          title: "Mis Mesas",
          href: "/mesero",
          icon: UtensilsCrossed,
          description: "Gestión de mesas asignadas",
        },
        {
          title: "Órdenes",
          href: "/ordenes",
          icon: ClipboardList,
          description: "Tomar y gestionar órdenes",
        },
        {
          title: "Reservaciones",
          href: "/reservaciones",
          icon: Calendar,
          description: "Consultar reservas",
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
          title: "Órdenes de Cocina",
          href: "/cocina",
          icon: ChefHat,
          badge: "3",
          description: "Órdenes pendientes",
        },
        {
          title: "Inventario",
          href: "/inventario",
          icon: Warehouse,
          description: "Control de ingredientes",
        },
        {
          title: "Recetas",
          href: "/productos",
          icon: Coffee,
          description: "Consultar recetas",
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

export function getRoleBadgeColor(rol: RolUsuario): string {
  switch (rol) {
    case "Administrador":
      return "bg-red-100 text-red-800 border-red-200"
    case "Gerente":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Cajero":
      return "bg-green-100 text-green-800 border-green-200"
    case "Mesero":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "Cocinero":
      return "bg-orange-100 text-orange-800 border-orange-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}
