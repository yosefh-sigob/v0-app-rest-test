"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  Users,
  Utensils,
  Plus,
  ArrowLeft,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Coffee,
  UtensilsCrossed,
  Timer,
} from "lucide-react"

export default function MeseroPage() {
  const [selectedTable, setSelectedTable] = useState<number | null>(null)

  const mesasAsignadas = [
    {
      id: 1,
      numero: "M01",
      comensales: 4,
      estado: "ocupada",
      tiempo: "15 min",
      total: 450.0,
      items: ["Pasta Carbonara", "Pizza Margherita", "Ensalada César", "Agua"],
      mesero: "Juan Pérez",
    },
    {
      id: 2,
      numero: "M03",
      comensales: 2,
      estado: "ordenando",
      tiempo: "5 min",
      total: 0,
      items: [],
      mesero: "Juan Pérez",
    },
    {
      id: 3,
      numero: "M07",
      comensales: 6,
      estado: "comiendo",
      tiempo: "35 min",
      total: 890.5,
      items: ["Paella Valenciana", "Sangría", "Pan de Ajo", "Flan", "Café"],
      mesero: "Juan Pérez",
    },
    {
      id: 4,
      numero: "M12",
      comensales: 3,
      estado: "cuenta",
      tiempo: "45 min",
      total: 320.0,
      items: ["Hamburguesa", "Papas Fritas", "Refresco"],
      mesero: "Juan Pérez",
    },
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "ocupada":
        return "status-occupied"
      case "ordenando":
        return "status-ordering"
      case "comiendo":
        return "status-eating"
      case "cuenta":
        return "status-billing"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "ocupada":
        return <Users className="h-4 w-4" />
      case "ordenando":
        return <UtensilsCrossed className="h-4 w-4" />
      case "comiendo":
        return <Coffee className="h-4 w-4" />
      case "cuenta":
        return <DollarSign className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const totalVentas = mesasAsignadas.reduce((sum, mesa) => sum + mesa.total, 0)
  const totalComensales = mesasAsignadas.reduce((sum, mesa) => sum + mesa.comensales, 0)
  const propinas = totalVentas * 0.1

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-amber-50/30">
      {/* Header */}
      <div className="restaurant-gradient text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al Inicio
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Panel de Mesero</h1>
                <p className="text-orange-100">Juan Pérez - Turno Vespertino</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-orange-100">Turno iniciado</p>
              <p className="text-lg font-semibold">14:30 - Activo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Mesas Asignadas</CardTitle>
              <Utensils className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{mesasAsignadas.length}</div>
              <p className="text-xs text-gray-600">3 activas, 1 ordenando</p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Comensales Activos</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalComensales}</div>
              <p className="text-xs text-gray-600">En {mesasAsignadas.length} mesas</p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ventas del Turno</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${totalVentas.toFixed(2)}</div>
              <p className="text-xs text-green-600">+12% vs ayer</p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Propinas Estimadas</CardTitle>
              <Plus className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${propinas.toFixed(2)}</div>
              <p className="text-xs text-gray-600">10% promedio</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mesas Section */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="mesas" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mesas">Mis Mesas</TabsTrigger>
                <TabsTrigger value="ordenes">Órdenes Activas</TabsTrigger>
              </TabsList>

              <TabsContent value="mesas" className="space-y-4">
                <Card className="restaurant-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-orange-600" />
                      Mesas Asignadas
                    </CardTitle>
                    <CardDescription>Gestiona tus mesas y órdenes activas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {mesasAsignadas.map((mesa) => (
                        <Card
                          key={mesa.id}
                          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                            selectedTable === mesa.id ? "ring-2 ring-orange-500" : ""
                          }`}
                          onClick={() => setSelectedTable(selectedTable === mesa.id ? null : mesa.id)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg text-gray-900">{mesa.numero}</CardTitle>
                              <Badge className={getEstadoColor(mesa.estado)}>
                                {getEstadoIcon(mesa.estado)}
                                <span className="ml-1">{mesa.estado}</span>
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center text-gray-600">
                                  <Users className="h-4 w-4 mr-2" />
                                  {mesa.comensales} comensales
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {mesa.tiempo}
                                </div>
                              </div>

                              <div className="text-lg font-semibold text-gray-900">${mesa.total.toFixed(2)}</div>

                              {selectedTable === mesa.id && mesa.items.length > 0 && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                  <p className="text-sm font-medium text-gray-700 mb-2">Orden actual:</p>
                                  <ul className="text-xs text-gray-600 space-y-1">
                                    {mesa.items.map((item, index) => (
                                      <li key={index} className="flex items-center">
                                        <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <div className="space-y-2">
                                {mesa.estado === "ordenando" && (
                                  <Button className="w-full restaurant-gradient text-white" size="sm">
                                    <UtensilsCrossed className="h-4 w-4 mr-2" />
                                    Tomar Orden
                                  </Button>
                                )}
                                {mesa.estado === "cuenta" && (
                                  <Button className="w-full restaurant-gradient text-white" size="sm">
                                    <DollarSign className="h-4 w-4 mr-2" />
                                    Procesar Pago
                                  </Button>
                                )}
                                <Button variant="outline" className="w-full bg-transparent" size="sm">
                                  Ver Detalles
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ordenes" className="space-y-4">
                <Card className="restaurant-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Timer className="h-5 w-5 text-orange-600" />
                      Órdenes en Proceso
                    </CardTitle>
                    <CardDescription>Seguimiento de órdenes en cocina</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mesasAsignadas
                        .filter((mesa) => mesa.items.length > 0)
                        .map((mesa) => (
                          <div key={mesa.id} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Badge className={getEstadoColor(mesa.estado)}>{mesa.numero}</Badge>
                                <span className="font-medium text-gray-900">{mesa.comensales} comensales</span>
                              </div>
                              <div className="text-sm text-gray-600 flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {mesa.tiempo}
                              </div>
                            </div>
                            <div className="space-y-2">
                              {mesa.items.map((item, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-700">{item}</span>
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance */}
            <Card className="restaurant-card">
              <CardHeader>
                <CardTitle className="text-lg">Rendimiento del Turno</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Mesas Atendidas</span>
                    <span className="font-medium">4/6</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Satisfacción Cliente</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Tiempo Promedio</span>
                    <span className="font-medium">25 min</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="restaurant-card">
              <CardHeader>
                <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start restaurant-gradient text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Asignar Nueva Mesa
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Utensils className="h-4 w-4 mr-2" />
                  Ver Menú Completo
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Clock className="h-4 w-4 mr-2" />
                  Historial de Órdenes
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Solicitar Ayuda
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="restaurant-card">
              <CardHeader>
                <CardTitle className="text-lg">Consejos del Día</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm font-medium text-orange-800">Plato Especial</p>
                    <p className="text-xs text-orange-600">Recomienda la Paella Valenciana - 15% más propina</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Meta del Día</p>
                    <p className="text-xs text-green-600">Vas 80% hacia tu meta de ventas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
