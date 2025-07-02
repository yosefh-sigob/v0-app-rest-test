"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  CreditCard,
  DollarSign,
  Receipt,
  TrendingUp,
  Home,
  ChefHat,
  Bell,
  Search,
  Clock,
  CheckCircle,
} from "lucide-react"

// Datos simulados para el cajero
const cajeroStats = {
  ventasHoy: 3450.75,
  transacciones: 47,
  ticketPromedio: 73.42,
  efectivo: 1250.3,
}

const cuentasPendientes = [
  {
    id: 1,
    mesa: "Mesa 1",
    cliente: "Juan Pérez",
    total: 125.5,
    items: 4,
    tiempo: "45 min",
    mesero: "Carlos",
  },
  {
    id: 2,
    mesa: "Mesa 5",
    cliente: "María García",
    total: 89.25,
    items: 3,
    tiempo: "30 min",
    mesero: "Ana",
  },
  {
    id: 3,
    mesa: "Mesa 12",
    cliente: "Pedro López",
    total: 234.75,
    items: 6,
    tiempo: "1h 15min",
    mesero: "Carlos",
  },
  {
    id: 4,
    mesa: "Mesa 8",
    cliente: "Laura Martín",
    total: 67.5,
    items: 2,
    tiempo: "25 min",
    mesero: "Ana",
  },
]

const transaccionesRecientes = [
  { id: 1, mesa: "Mesa 3", total: 156.75, metodo: "Tarjeta", hora: "14:32", estado: "completada" },
  { id: 2, mesa: "Mesa 7", total: 89.5, metodo: "Efectivo", hora: "14:28", estado: "completada" },
  { id: 3, mesa: "Mesa 2", total: 203.25, metodo: "Tarjeta", hora: "14:15", estado: "completada" },
  { id: 4, mesa: "Mesa 9", total: 45.0, metodo: "Efectivo", hora: "14:10", estado: "completada" },
]

export default function CajeroPage() {
  const [selectedTab, setSelectedTab] = useState("cuentas")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCuentas = cuentasPendientes.filter(
    (cuenta) =>
      cuenta.mesa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cuenta.cliente.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen restaurant-bg">
      {/* Header específico para cajero */}
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
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Cajero</h1>
                <p className="text-sm text-gray-600">Ana Rodríguez - Turno Día</p>
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
        {/* Estadísticas del cajero */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${cajeroStats.ventasHoy}</div>
              <p className="text-xs text-muted-foreground">+15% vs ayer</p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transacciones</CardTitle>
              <Receipt className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{cajeroStats.transacciones}</div>
              <p className="text-xs text-muted-foreground">4 pendientes</p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">${cajeroStats.ticketPromedio}</div>
              <p className="text-xs text-muted-foreground">+8% vs promedio</p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efectivo en Caja</CardTitle>
              <CreditCard className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">${cajeroStats.efectivo}</div>
              <p className="text-xs text-muted-foreground">36% del total</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs para diferentes vistas */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cuentas">Cuentas Pendientes</TabsTrigger>
            <TabsTrigger value="transacciones">Transacciones</TabsTrigger>
          </TabsList>

          <TabsContent value="cuentas" className="space-y-6">
            {/* Buscador */}
            <Card className="restaurant-card">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por mesa o cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lista de cuentas pendientes */}
            <div className="space-y-4">
              {filteredCuentas.map((cuenta) => (
                <Card key={cuenta.id} className="restaurant-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <Receipt className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{cuenta.mesa}</h3>
                          <p className="text-sm text-gray-600">{cuenta.cliente}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {cuenta.tiempo}
                            </span>
                            <span>Mesero: {cuenta.mesero}</span>
                            <span>{cuenta.items} items</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 mb-2">${cuenta.total}</div>
                        <div className="space-x-2">
                          <Button size="sm" className="restaurant-gradient text-white">
                            Procesar Pago
                          </Button>
                          <Button size="sm" variant="outline">
                            Ver Detalles
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transacciones" className="space-y-6">
            <div className="space-y-4">
              {transaccionesRecientes.map((transaccion) => (
                <Card key={transaccion.id} className="restaurant-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{transaccion.mesa}</h3>
                          <p className="text-sm text-gray-600">
                            {transaccion.metodo} - {transaccion.hora}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">${transaccion.total}</div>
                        <Badge className="bg-green-100 text-green-800 mt-1">{transaccion.estado}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Acceso rápido al POS */}
        <div className="mt-8">
          <Card className="restaurant-card">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">¿Necesitas procesar una venta directa?</h3>
              <p className="text-gray-600 mb-4">Accede al punto de venta para transacciones rápidas</p>
              <Link href="/ventas/pos">
                <Button size="lg" className="restaurant-gradient text-white">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Abrir Punto de Venta
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
