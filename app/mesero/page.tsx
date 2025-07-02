"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, DollarSign, TrendingUp, Home, ChefHat, Bell, CheckCircle, AlertCircle, Timer } from "lucide-react"

// Datos simulados para el mesero
const meseroStats = {
  mesasAsignadas: 8,
  clientesAtendidos: 24,
  ventasHoy: 1250.5,
  promedioServicio: 4.8,
}

const mesasAsignadas = [
  { id: 1, numero: "Mesa 1", estado: "ocupada", clientes: 4, tiempo: "45 min", pedido: "En cocina" },
  { id: 2, numero: "Mesa 3", estado: "disponible", clientes: 0, tiempo: "-", pedido: "-" },
  { id: 5, numero: "Mesa 5", estado: "ocupada", clientes: 2, tiempo: "20 min", pedido: "Servido" },
  { id: 8, numero: "Mesa 8", estado: "reservada", clientes: 0, tiempo: "15:30", pedido: "Reserva" },
  { id: 12, numero: "Mesa 12", estado: "ocupada", clientes: 6, tiempo: "1h 10min", pedido: "Listo" },
  { id: 15, numero: "Mesa 15", estado: "limpieza", clientes: 0, tiempo: "5 min", pedido: "Limpiando" },
]

const pedidosPendientes = [
  { id: 1, mesa: "Mesa 1", items: "2x Pasta, 1x Pizza", estado: "preparando", tiempo: "8 min" },
  { id: 2, mesa: "Mesa 12", items: "3x Ensalada, 2x Sopa", estado: "listo", tiempo: "Listo" },
  { id: 3, mesa: "Mesa 5", items: "1x Hamburguesa", estado: "servido", tiempo: "Servido" },
]

export default function MeseroPage() {
  const [selectedTab, setSelectedTab] = useState("mesas")

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "disponible":
        return "bg-green-100 text-green-800 border-green-200"
      case "ocupada":
        return "bg-red-100 text-red-800 border-red-200"
      case "reservada":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "limpieza":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPedidoIcon = (estado: string) => {
    switch (estado) {
      case "preparando":
        return <Timer className="h-4 w-4 text-amber-600" />
      case "listo":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "servido":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen restaurant-bg">
      {/* Header específico para mesero */}
      <header className="restaurant-header px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
              >
                <Home className="h-4 w-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
            <div className="h-6 w-px bg-orange-200" />
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Mesero</h1>
                <p className="text-sm text-gray-600">Juan Pérez - Turno Día</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ChefHat className="h-4 w-4 mr-2" />
                Dashboard Completo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Estadísticas del mesero */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mesas Asignadas</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{meseroStats.mesasAsignadas}</div>
              <p className="text-xs text-muted-foreground">6 ocupadas, 2 disponibles</p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Hoy</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{meseroStats.clientesAtendidos}</div>
              <p className="text-xs text-muted-foreground">+12% vs ayer</p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas Generadas</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">${meseroStats.ventasHoy}</div>
              <p className="text-xs text-muted-foreground">Meta: $1,500</p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calificación</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{meseroStats.promedioServicio}</div>
              <p className="text-xs text-muted-foreground">⭐ Excelente servicio</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs para diferentes vistas */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mesas">Mis Mesas</TabsTrigger>
            <TabsTrigger value="pedidos">Pedidos Pendientes</TabsTrigger>
          </TabsList>

          <TabsContent value="mesas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mesasAsignadas.map((mesa) => (
                <Card key={mesa.id} className="restaurant-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{mesa.numero}</CardTitle>
                      <Badge className={getEstadoColor(mesa.estado)}>
                        {mesa.estado.charAt(0).toUpperCase() + mesa.estado.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Clientes:</span>
                      <span className="font-medium">{mesa.clientes || "N/A"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tiempo:</span>
                      <span className="font-medium">{mesa.tiempo}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Estado:</span>
                      <span className="font-medium">{mesa.pedido}</span>
                    </div>
                    <div className="pt-2">
                      <Button
                        size="sm"
                        className="w-full restaurant-gradient text-white"
                        disabled={mesa.estado === "disponible"}
                      >
                        {mesa.estado === "disponible" ? "Mesa Libre" : "Gestionar Mesa"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pedidos" className="space-y-6">
            <div className="space-y-4">
              {pedidosPendientes.map((pedido) => (
                <Card key={pedido.id} className="restaurant-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getPedidoIcon(pedido.estado)}
                        <div>
                          <h3 className="font-semibold">{pedido.mesa}</h3>
                          <p className="text-sm text-gray-600">{pedido.items}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            pedido.estado === "listo"
                              ? "bg-green-100 text-green-800"
                              : pedido.estado === "preparando"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {pedido.tiempo}
                        </Badge>
                        <div className="mt-2">
                          <Button
                            size="sm"
                            variant={pedido.estado === "listo" ? "default" : "outline"}
                            className={pedido.estado === "listo" ? "restaurant-gradient text-white" : ""}
                          >
                            {pedido.estado === "listo" ? "Servir" : "Ver Detalles"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
