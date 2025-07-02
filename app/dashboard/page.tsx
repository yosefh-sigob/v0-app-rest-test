"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, ShoppingCart, TrendingUp, Clock, CheckCircle, AlertCircle, UserCheck } from "lucide-react"

// Datos simulados para el dashboard
const stats = {
  ventasHoy: 4250.75,
  ordenesActivas: 12,
  clientesHoy: 89,
  mesasOcupadas: 8,
}

const mesasEstado = [
  { numero: 1, estado: "ocupada", clientes: 4, tiempo: "45 min" },
  { numero: 2, estado: "disponible", clientes: 0, tiempo: "-" },
  { numero: 3, estado: "ocupada", clientes: 2, tiempo: "20 min" },
  { numero: 4, estado: "reservada", clientes: 0, tiempo: "19:30" },
  { numero: 5, estado: "ocupada", clientes: 6, tiempo: "1h 10min" },
  { numero: 6, estado: "limpieza", clientes: 0, tiempo: "5 min" },
]

const actividadReciente = [
  { id: 1, tipo: "orden", descripcion: "Nueva orden - Mesa 3", tiempo: "Hace 2 min", estado: "nueva" },
  { id: 2, tipo: "pago", descripcion: "Pago procesado - Mesa 1", tiempo: "Hace 5 min", estado: "completado" },
  { id: 3, tipo: "reserva", descripcion: "Reserva confirmada - Mesa 8", tiempo: "Hace 8 min", estado: "confirmado" },
  { id: 4, tipo: "orden", descripcion: "Orden lista - Mesa 5", tiempo: "Hace 12 min", estado: "listo" },
]

export default function DashboardPage() {
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "disponible":
        return "mesa-disponible"
      case "ocupada":
        return "mesa-ocupada"
      case "reservada":
        return "mesa-reservada"
      case "limpieza":
        return "mesa-limpieza"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActividadIcon = (tipo: string) => {
    switch (tipo) {
      case "orden":
        return <ShoppingCart className="h-4 w-4" />
      case "pago":
        return <DollarSign className="h-4 w-4" />
      case "reserva":
        return <UserCheck className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-8">
        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${stats.ventasHoy}</div>
              <p className="text-xs text-muted-foreground">+20.1% desde ayer</p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Órdenes Activas</CardTitle>
              <ShoppingCart className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.ordenesActivas}</div>
              <p className="text-xs text-muted-foreground">3 listas para servir</p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Hoy</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.clientesHoy}</div>
              <p className="text-xs text-muted-foreground">+12% vs promedio</p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ocupación</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.mesasOcupadas}/15</div>
              <p className="text-xs text-muted-foreground">53% ocupación</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Estado de mesas */}
          <Card className="restaurant-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-orange-600" />
                <span>Estado de Mesas</span>
              </CardTitle>
              <CardDescription>Vista rápida del estado actual de las mesas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {mesasEstado.map((mesa) => (
                  <div key={mesa.numero} className={`p-4 rounded-lg border ${getEstadoColor(mesa.estado)}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">Mesa {mesa.numero}</span>
                      <Badge variant="secondary" className="text-xs">
                        {mesa.estado}
                      </Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Clientes:</span>
                        <span>{mesa.clientes || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tiempo:</span>
                        <span>{mesa.tiempo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button className="w-full restaurant-gradient text-white">Ver Todas las Mesas</Button>
              </div>
            </CardContent>
          </Card>

          {/* Actividad reciente */}
          <Card className="restaurant-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Actividad Reciente</span>
              </CardTitle>
              <CardDescription>Últimas acciones en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actividadReciente.map((actividad) => (
                  <div key={actividad.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">{getActividadIcon(actividad.tipo)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{actividad.descripcion}</p>
                      <p className="text-xs text-gray-500">{actividad.tiempo}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Ver Todo el Historial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accesos rápidos */}
        <Card className="restaurant-card">
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
            <CardDescription>Funciones más utilizadas del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col space-y-2 restaurant-gradient text-white">
                <Users className="h-6 w-6" />
                <span className="text-sm">Nueva Reserva</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                <ShoppingCart className="h-6 w-6" />
                <span className="text-sm">Punto de Venta</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                <UserCheck className="h-6 w-6" />
                <span className="text-sm">Gestión Clientes</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                <TrendingUp className="h-6 w-6" />
                <span className="text-sm">Reportes</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
