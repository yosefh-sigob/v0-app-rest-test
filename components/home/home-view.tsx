"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Utensils,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  ChefHat,
  CreditCard,
  TrendingUp,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react"

interface DashboardData {
  ventasHoy: {
    total: number
    ordenes: number
    promedio: number
    crecimiento: number
  }
  mesasOcupadas: {
    ocupadas: number
    total: number
    porcentaje: number
  }
  productosPopulares: Array<{
    nombre: string
    ventas: number
    ingresos: number
  }>
  reservacionesHoy: Array<{
    hora: string
    cliente: string
    personas: number
    mesa: number
  }>
  alertas: Array<{
    tipo: string
    mensaje: string
    urgencia: string
  }>
}

interface HomeViewProps {
  data: DashboardData
}

export function HomeView({ data }: HomeViewProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const roles = [
    {
      id: "mesero",
      title: "Mesero",
      description: "Tomar órdenes y gestionar mesas",
      icon: ChefHat,
      color: "bg-blue-500",
      href: "/mesero",
    },
    {
      id: "cajero",
      title: "Cajero",
      description: "Procesar pagos y cerrar cuentas",
      icon: CreditCard,
      color: "bg-green-500",
      href: "/cajero",
    },
    {
      id: "admin",
      title: "Administrador",
      description: "Gestión completa del restaurante",
      icon: Settings,
      color: "bg-purple-500",
      href: "/dashboard",
    },
  ]

  const quickStats = [
    {
      title: "Ventas Hoy",
      value: `$${data.ventasHoy.total.toLocaleString()}`,
      subtitle: `${data.ventasHoy.ordenes} órdenes`,
      icon: TrendingUp,
      color: "text-green-600",
      change: `+${data.ventasHoy.crecimiento}%`,
    },
    {
      title: "Mesas Ocupadas",
      value: `${data.mesasOcupadas.ocupadas}/${data.mesasOcupadas.total}`,
      subtitle: `${data.mesasOcupadas.porcentaje}% ocupación`,
      icon: MapPin,
      color: "text-orange-600",
      change: "Normal",
    },
    {
      title: "Promedio por Orden",
      value: `$${data.ventasHoy.promedio.toFixed(2)}`,
      subtitle: "Ticket promedio",
      icon: BarChart3,
      color: "text-blue-600",
      change: "Estable",
    },
    {
      title: "Reservaciones Hoy",
      value: data.reservacionesHoy.length.toString(),
      subtitle: "Confirmadas",
      icon: Calendar,
      color: "text-purple-600",
      change: "Programadas",
    },
  ]

  const modules = [
    {
      title: "Productos",
      description: "Gestionar catálogo de productos",
      icon: Utensils,
      href: "/productos",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Mesas",
      description: "Administrar mesas y áreas",
      icon: MapPin,
      href: "/mesas",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Clientes",
      description: "Base de datos de clientes",
      icon: Users,
      href: "/clientes",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Reservaciones",
      description: "Gestionar reservas de mesas",
      icon: Calendar,
      href: "/reservaciones",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Encuestas SMS",
      description: "Campañas de satisfacción",
      icon: MessageSquare,
      href: "/encuestas",
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Reportes",
      description: "Análisis y estadísticas",
      icon: BarChart3,
      href: "/reportes",
      color: "bg-indigo-100 text-indigo-600",
    },
  ]

  const getAlertIcon = (urgencia: string) => {
    switch (urgencia) {
      case "alta":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "media":
        return <Info className="w-4 h-4 text-yellow-500" />
      case "baja":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const getAlertColor = (urgencia: string) => {
    switch (urgencia) {
      case "alta":
        return "border-red-200 bg-red-50"
      case "media":
        return "border-yellow-200 bg-yellow-50"
      case "baja":
        return "border-green-200 bg-green-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  if (selectedRole) {
    const role = roles.find((r) => r.id === selectedRole)
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className={`mx-auto w-16 h-16 rounded-full ${role?.color} flex items-center justify-center mb-4`}>
              {role?.icon && <role.icon className="w-8 h-8 text-white" />}
            </div>
            <CardTitle className="text-2xl">Acceso como {role?.title}</CardTitle>
            <CardDescription>Redirigiendo al módulo de {role?.title.toLowerCase()}...</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Button asChild className="w-full">
              <Link href={role?.href || "/"}>Continuar</Link>
            </Button>
            <Button variant="outline" onClick={() => setSelectedRole(null)} className="w-full">
              Volver
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Principal</h1>
        <p className="text-gray-600">Resumen de actividad del restaurante</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <Badge variant="outline" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productos Populares */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Productos Populares</span>
            </CardTitle>
            <CardDescription>Los más vendidos hoy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.productosPopulares.map((producto, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{producto.nombre}</p>
                    <p className="text-sm text-gray-500">{producto.ventas} vendidos</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${producto.ingresos.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reservaciones Hoy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Reservaciones Hoy</span>
            </CardTitle>
            <CardDescription>Próximas reservas confirmadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.reservacionesHoy.map((reservacion, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{reservacion.cliente}</p>
                    <p className="text-sm text-gray-500">
                      {reservacion.personas} personas • Mesa {reservacion.mesa}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{reservacion.hora}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Alertas del Sistema</span>
          </CardTitle>
          <CardDescription>Notificaciones importantes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.alertas.map((alerta, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alerta.urgencia)}`}>
                <div className="flex items-center space-x-3">
                  {getAlertIcon(alerta.urgencia)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alerta.mensaje}</p>
                    <p className="text-xs text-gray-500 capitalize">{alerta.tipo}</p>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">
                    {alerta.urgencia}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Modules */}
      <Card>
        <CardHeader>
          <CardTitle>Acceso Rápido a Módulos</CardTitle>
          <CardDescription>Accede directamente a las funciones principales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, index) => (
              <Link key={index} href={module.href}>
                <div className="p-4 rounded-lg border hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${module.color}`}>
                      <module.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{module.title}</h3>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
