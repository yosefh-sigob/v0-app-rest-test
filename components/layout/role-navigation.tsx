"use client"

import { UserRole } from "@/interfaces/auth"
import {
  LayoutDashboard,
  Utensils,
  Users,
  CreditCard,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  ChefHat,
  MapPin,
  Package,
  ClipboardList,
  TrendingUp,
  FileText,
} from "lucide-react"

export interface NavigationItem {
  title: string
  href: string
  icon: any
  description?: string
  badge?: string
}

export function getRoleNavigation(role: UserRole): NavigationItem[] {
  const baseNavigation: NavigationItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Panel principal",
    },
  ]

  switch (role) {
    case UserRole.ADMINISTRADOR:
      return [
        ...baseNavigation,
        {
          title: "Productos",
          href: "/productos",
          icon: Utensils,
          description: "Gestionar catálogo",
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
          description: "Gestionar reservas",
        },
        {
          title: "POS",
          href: "/ventas/pos",
          icon: CreditCard,
          description: "Punto de venta",
        },
        {
          title: "Encuestas SMS",
          href: "/encuestas",
          icon: MessageSquare,
          description: "Campañas SMS",
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
          description: "Ajustes del sistema",
        },
      ]

    case UserRole.MESERO:
      return [
        ...baseNavigation,
        {
          title: "Mis Mesas",
          href: "/mesero",
          icon: MapPin,
          description: "Mesas asignadas",
        },
        {
          title: "Tomar Orden",
          href: "/mesero/orden",
          icon: ClipboardList,
          description: "Nueva orden",
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

    case UserRole.CAJERO:
      return [
        ...baseNavigation,
        {
          title: "Punto de Venta",
          href: "/cajero",
          icon: CreditCard,
          description: "Procesar pagos",
        },
        {
          title: "Clientes",
          href: "/clientes",
          icon: Users,
          description: "Gestionar clientes",
        },
        {
          title: "Reportes Ventas",
          href: "/reportes/ventas",
          icon: TrendingUp,
          description: "Reportes de caja",
        },
        {
          title: "Facturas",
          href: "/facturas",
          icon: FileText,
          description: "Facturación",
        },
      ]

    case UserRole.COCINERO:
      return [
        ...baseNavigation,
        {
          title: "Órdenes Cocina",
          href: "/cocina",
          icon: ChefHat,
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
          description: "Ver catálogo",
        },
      ]

    case UserRole.GERENTE:
      return [
        ...baseNavigation,
        {
          title: "Productos",
          href: "/productos",
          icon: Utensils,
          description: "Gestionar catálogo",
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
          description: "Gestionar reservas",
        },
        {
          title: "Reportes",
          href: "/reportes",
          icon: BarChart3,
          description: "Análisis completo",
        },
        {
          title: "Encuestas SMS",
          href: "/encuestas",
          icon: MessageSquare,
          description: "Campañas SMS",
        },
      ]

    default:
      return baseNavigation
  }
}

export function getRoleBadgeColor(role: UserRole): string {
  switch (role) {
    case UserRole.ADMINISTRADOR:
      return "bg-purple-100 text-purple-800"
    case UserRole.MESERO:
      return "bg-blue-100 text-blue-800"
    case UserRole.CAJERO:
      return "bg-green-100 text-green-800"
    case UserRole.COCINERO:
      return "bg-orange-100 text-orange-800"
    case UserRole.GERENTE:
      return "bg-indigo-100 text-indigo-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
