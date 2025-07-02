"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, ChefHat, CreditCard, TrendingUp, Clock, DollarSign, ShoppingCart, Home } from "lucide-react"
import Link from "next/link"
import { formatCurrency, formatNumber } from "@/utils/format"

interface HomeViewProps {
  estadisticas: {
    ventasHoy: number
    ventasAyer: number
    mesasOcupadas: number
    mesasDisponibles: number
    clientesAtendidos: number
    productosVendidos: number
    promedioTicket: number
    tiempoPromedioAtencion: number
  }
}

export function HomeView({ estadisticas }: HomeViewProps) {
  const crecimientoVentas = ((estadisticas.ventasHoy - estadisticas.ventasAyer) / estadisticas.ventasAyer) * 100
  const totalMesas = estadisticas.mesasOcupadas + estadisticas.mesasDisponibles
  const porcentajeOcupacion = (estadisticas.mesasOcupadas / totalMesas) * 100

  return (
    <div className="min-h-screen bg-gradient-restaurant">
      {/* Header con navegación de regreso */}
      <div className="header-restaurant p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-restaurant-primary mb-2">Sistema de Gestión Restaurante</h1>
            <p className="text-restaurant-neutral-light">Selecciona tu rol para comenzar</p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-restaurant-primary text-restaurant-primary hover:bg-restaurant-primary hover:text-white bg-transparent"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-8">
        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-restaurant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
              <DollarSign className="h-4 w-4 text-restaurant-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-restaurant-primary">{formatCurrency(estadisticas.ventasHoy)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className={crecimientoVentas >= 0 ? "text-green-600" : "text-red-600"}>
                  {crecimientoVentas >= 0 ? "+" : ""}
                  {crecimientoVentas.toFixed(1)}%
                </span>
                <span className="ml-1">vs ayer</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-restaurant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ocupación de Mesas</CardTitle>
              <Users className="h-4 w-4 text-restaurant-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-restaurant-secondary">
                {estadisticas.mesasOcupadas}/{totalMesas}
              </div>
              <div className="text-xs text-muted-foreground">{porcentajeOcupacion.toFixed(0)}% ocupación</div>
            </CardContent>
          </Card>

          <Card className="card-restaurant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Atendidos</CardTitle>
              <Users className="h-4 w-4 text-restaurant-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-restaurant-accent">
                {formatNumber(estadisticas.clientesAtendidos)}
              </div>
              <div className="text-xs text-muted-foreground">
                Promedio: {formatNumber(Math.round(estadisticas.clientesAtendidos / 8))} por hora
              </div>
            </CardContent>
          </Card>

          <Card className="card-restaurant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
              <CreditCard className="h-4 w-4 text-restaurant-info" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-restaurant-info">
                {formatCurrency(estadisticas.promedioTicket)}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatNumber(estadisticas.productosVendidos)} productos vendidos
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selección de roles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Mesero */}
          <Card className="card-restaurant hover:scale-105 transition-transform duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Mesero</CardTitle>
              <CardDescription>Gestiona mesas, toma pedidos y atiende a los clientes</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2 mb-6">
                <Badge variant="secondary" className="mr-2">
                  Gestión de Mesas
                </Badge>
                <Badge variant="secondary" className="mr-2">
                  Toma de Pedidos
                </Badge>
                <Badge variant="secondary">Atención al Cliente</Badge>
              </div>
              <Button asChild className="w-full btn-primary">
                <Link href="/mesero">Acceder como Mesero</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Cajero */}
          <Card className="card-restaurant hover:scale-105 transition-transform duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Cajero</CardTitle>
              <CardDescription>Procesa pagos, genera facturas y maneja el punto de venta</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2 mb-6">
                <Badge variant="secondary" className="mr-2">
                  Punto de Venta
                </Badge>
                <Badge variant="secondary" className="mr-2">
                  Facturación
                </Badge>
                <Badge variant="secondary">Reportes</Badge>
              </div>
              <Button asChild className="w-full btn-secondary">
                <Link href="/cajero">Acceder como Cajero</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Administrador */}
          <Card className="card-restaurant hover:scale-105 transition-transform duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Administrador</CardTitle>
              <CardDescription>Gestiona el restaurante, productos, empleados y reportes</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2 mb-6">
                <Badge variant="secondary" className="mr-2">
                  Gestión Completa
                </Badge>
                <Badge variant="secondary" className="mr-2">
                  Reportes
                </Badge>
                <Badge variant="secondary">Configuración</Badge>
              </div>
              <Button asChild className="w-full bg-transparent" variant="outline">
                <Link href="/dashboard">Acceder como Admin</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Métricas adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="card-restaurant">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-restaurant-primary" />
                Tiempo Promedio de Atención
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-restaurant-primary mb-2">
                {estadisticas.tiempoPromedioAtencion} min
              </div>
              <p className="text-sm text-muted-foreground">
                Tiempo desde que el cliente se sienta hasta que recibe su pedido
              </p>
            </CardContent>
          </Card>

          <Card className="card-restaurant">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2 text-restaurant-secondary" />
                Productos Más Vendidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tacos al Pastor</span>
                  <Badge variant="outline">45 vendidos</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Nachos Supremos</span>
                  <Badge variant="outline">32 vendidos</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Quesadillas</span>
                  <Badge variant="outline">28 vendidos</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
