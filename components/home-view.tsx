"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, Calendar, ChefHat, TrendingUp, Clock, MapPin, Bell } from "lucide-react"
import Link from "next/link"

interface HomeViewProps {
  stats: {
    mesasOcupadas: number
    totalMesas: number
    ventasHoy: number
    clientesAtendidos: number
    reservacionesHoy: number
  }
}

export function HomeView({ stats }: HomeViewProps) {
  const ocupacionPorcentaje = Math.round((stats.mesasOcupadas / stats.totalMesas) * 100)

  return (
    <div className="min-h-screen bg-gradient-restaurant">
      <div className="container mx-auto px-4 py-8">
        {/* Header de Bienvenida */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-restaurant-neutral mb-2">¡Bienvenido a RestApp! 🍽️</h1>
          <p className="text-lg text-restaurant-neutral-light">Tu sistema completo de gestión para restaurantes</p>
        </div>

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-restaurant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ocupación de Mesas</CardTitle>
              <MapPin className="h-4 w-4 text-restaurant-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-restaurant-primary">
                {stats.mesasOcupadas}/{stats.totalMesas}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant={ocupacionPorcentaje > 80 ? "destructive" : "secondary"}>{ocupacionPorcentaje}%</Badge>
                <p className="text-xs text-muted-foreground">
                  {ocupacionPorcentaje > 80 ? "Alta ocupación" : "Disponible"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-restaurant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas de Hoy</CardTitle>
              <DollarSign className="h-4 w-4 text-restaurant-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-restaurant-secondary">${stats.ventasHoy.toLocaleString()}</div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <p className="text-xs text-green-600">+12% vs ayer</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-restaurant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Atendidos</CardTitle>
              <Users className="h-4 w-4 text-restaurant-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-restaurant-accent">{stats.clientesAtendidos}</div>
              <p className="text-xs text-muted-foreground mt-2">Promedio: 3.2 personas/mesa</p>
            </CardContent>
          </Card>

          <Card className="card-restaurant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservaciones</CardTitle>
              <Calendar className="h-4 w-4 text-restaurant-info" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-restaurant-info">{stats.reservacionesHoy}</div>
              <p className="text-xs text-muted-foreground mt-2">Para hoy</p>
            </CardContent>
          </Card>
        </div>

        {/* Acciones Rápidas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="card-restaurant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ChefHat className="h-5 w-5 text-restaurant-primary" />
                <span>Acciones Rápidas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button asChild className="btn-primary">
                  <Link href="/ventas/pos">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Nueva Venta
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/reservaciones">
                    <Calendar className="h-4 w-4 mr-2" />
                    Reservaciones
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/mesas">
                    <MapPin className="h-4 w-4 mr-2" />
                    Ver Mesas
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/productos">
                    <ChefHat className="h-4 w-4 mr-2" />
                    Productos
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="card-restaurant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-restaurant-warning" />
                <span>Notificaciones</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <Clock className="h-4 w-4 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800">Mesa 5 - Tiempo de espera alto</p>
                  <p className="text-xs text-yellow-600">45 minutos desde el pedido</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <Calendar className="h-4 w-4 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800">Reservación confirmada</p>
                  <p className="text-xs text-blue-600">Mesa para 4 - 19:30</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">Meta de ventas alcanzada</p>
                  <p className="text-xs text-green-600">102% del objetivo diario</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selección de Rol */}
        <Card className="card-restaurant">
          <CardHeader>
            <CardTitle>Acceso por Rol</CardTitle>
            <p className="text-sm text-muted-foreground">Selecciona tu rol para acceder a las funciones específicas</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild size="lg" className="btn-primary h-20 flex-col">
                <Link href="/dashboard">
                  <Users className="h-6 w-6 mb-2" />
                  <span className="font-semibold">Administrador</span>
                  <span className="text-xs opacity-90">Acceso completo</span>
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/mesero">
                  <ChefHat className="h-6 w-6 mb-2" />
                  <span className="font-semibold">Mesero</span>
                  <span className="text-xs opacity-70">Mesas y pedidos</span>
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/cajero">
                  <DollarSign className="h-6 w-6 mb-2" />
                  <span className="font-semibold">Cajero</span>
                  <span className="text-xs opacity-70">Ventas y cobros</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
