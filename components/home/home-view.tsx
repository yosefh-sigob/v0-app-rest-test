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
  Clock,
  MapPin,
} from "lucide-react"

interface HomeViewProps {
  data: {
    ventasHoy: number
    ordenesActivas: number
    mesasOcupadas: number
    clientesAtendidos: number
  }
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
      value: `$${data.ventasHoy.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Órdenes Activas",
      value: data.ordenesActivas.toString(),
      icon: Clock,
      color: "text-blue-600",
    },
    {
      title: "Mesas Ocupadas",
      value: data.mesasOcupadas.toString(),
      icon: MapPin,
      color: "text-orange-600",
    },
    {
      title: "Clientes Atendidos",
      value: data.clientesAtendidos.toString(),
      icon: Users,
      color: "text-purple-600",
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Sistema de Restaurante</h1>
          <p className="text-xl text-gray-600">Selecciona tu rol para comenzar</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center p-6">
                <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10 mr-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Card
              key={role.id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => setSelectedRole(role.id)}
            >
              <CardHeader className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full ${role.color} flex items-center justify-center mb-4`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="w-full">Acceder como {role.title}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access Modules */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Acceso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <Link href={module.href} className="block">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${module.color}`}>
                        <module.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-600">Sistema de Gestión de Restaurantes v2.0</p>
          <Badge variant="outline" className="mt-2">
            Licencia: Gratis
          </Badge>
        </div>
      </div>
    </div>
  )
}
