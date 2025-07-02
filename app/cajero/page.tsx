"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  CreditCard,
  DollarSign,
  Receipt,
  Clock,
  Calculator,
  ArrowLeft,
  Users,
  TrendingUp,
  Banknote,
  Printer,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function CajeroPage() {
  const [selectedPayment, setSelectedPayment] = useState<string>("")
  const [cashAmount, setCashAmount] = useState<string>("")

  const ventasPendientes = [
    {
      id: 1,
      mesa: "M01",
      total: 450.0,
      mesero: "Juan Pérez",
      tiempo: "15 min",
      items: ["Pasta Carbonara", "Pizza Margherita", "Ensalada César", "Agua"],
      comensales: 4,
    },
    {
      id: 2,
      mesa: "M07",
      total: 890.5,
      mesero: "María García",
      tiempo: "35 min",
      items: ["Paella Valenciana", "Sangría", "Pan de Ajo", "Flan", "Café"],
      comensales: 6,
    },
    {
      id: 3,
      mesa: "M12",
      total: 320.0,
      mesero: "Carlos López",
      tiempo: "45 min",
      items: ["Hamburguesa", "Papas Fritas", "Refresco"],
      comensales: 3,
    },
    {
      id: 4,
      mesa: "Mostrador",
      total: 125.0,
      mesero: "Venta directa",
      tiempo: "2 min",
      items: ["Café", "Croissant"],
      comensales: 1,
    },
  ]

  const ventasDelDia = [
    { hora: "14:30", mesa: "M05", total: 280.5, metodo: "Tarjeta", mesero: "Ana García" },
    { hora: "14:15", mesa: "M02", total: 156.0, metodo: "Efectivo", mesero: "Juan Pérez" },
    { hora: "13:45", mesa: "M08", total: 420.75, metodo: "Tarjeta", mesero: "María García" },
    { hora: "13:30", mesa: "Mostrador", total: 85.0, metodo: "Efectivo", mesero: "Venta directa" },
  ]

  const totalPendiente = ventasPendientes.reduce((sum, venta) => sum + venta.total, 0)
  const ventasEfectivo = 2100.0
  const ventasTarjeta = 3140.5
  const totalVentas = ventasEfectivo + ventasTarjeta

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
                <h1 className="text-3xl font-bold">Punto de Venta</h1>
                <p className="text-orange-100">Cajero Principal - Turno Vespertino</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-orange-100">Caja abierta</p>
              <p className="text-lg font-semibold">14:00 - ${totalVentas.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ventas del Turno</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${totalVentas.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15% vs ayer
              </p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Efectivo</CardTitle>
              <Banknote className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${ventasEfectivo.toLocaleString()}</div>
              <p className="text-xs text-gray-600">{Math.round((ventasEfectivo / totalVentas) * 100)}% del total</p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tarjetas</CardTitle>
              <CreditCard className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${ventasTarjeta.toLocaleString()}</div>
              <p className="text-xs text-gray-600">{Math.round((ventasTarjeta / totalVentas) * 100)}% del total</p>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Cuentas Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{ventasPendientes.length}</div>
              <p className="text-xs text-gray-600">${totalPendiente.toLocaleString()} total</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Processing */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="pendientes" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pendientes">Cuentas Pendientes</TabsTrigger>
                <TabsTrigger value="procesar">Procesar Pago</TabsTrigger>
                <TabsTrigger value="historial">Historial</TabsTrigger>
              </TabsList>

              <TabsContent value="pendientes" className="space-y-4">
                <Card className="restaurant-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="h-5 w-5 text-orange-600" />
                      Cuentas por Cobrar
                    </CardTitle>
                    <CardDescription>Mesas listas para procesar el pago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {ventasPendientes.map((venta) => (
                        <div
                          key={venta.id}
                          className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge variant="outline" className="font-medium">
                                  {venta.mesa}
                                </Badge>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Users className="h-4 w-4 mr-1" />
                                  {venta.comensales} personas
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {venta.tiempo}
                                </div>
                              </div>

                              <p className="text-sm text-gray-600 mb-2">Mesero: {venta.mesero}</p>

                              <div className="text-sm text-gray-600 mb-3">
                                <p className="font-medium mb-1">Orden:</p>
                                <div className="flex flex-wrap gap-1">
                                  {venta.items.map((item, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {item}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="text-right ml-4">
                              <div className="text-2xl font-bold text-gray-900 mb-2">${venta.total.toFixed(2)}</div>
                              <div className="space-y-2">
                                <Button
                                  size="sm"
                                  className="w-full restaurant-gradient text-white"
                                  onClick={() => setSelectedPayment(venta.id.toString())}
                                >
                                  <CreditCard className="h-4 w-4 mr-2" />
                                  Cobrar
                                </Button>
                                <Button variant="outline" size="sm" className="w-full bg-transparent">
                                  <Receipt className="h-4 w-4 mr-2" />
                                  Ver Cuenta
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="procesar" className="space-y-4">
                <Card className="restaurant-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-orange-600" />
                      Procesar Pago
                    </CardTitle>
                    <CardDescription>Selecciona el método de pago</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedPayment && (
                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="font-medium text-orange-800">
                          Procesando pago para:{" "}
                          {ventasPendientes.find((v) => v.id.toString() === selectedPayment)?.mesa}
                        </p>
                        <p className="text-2xl font-bold text-orange-900">
                          ${ventasPendientes.find((v) => v.id.toString() === selectedPayment)?.total.toFixed(2)}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="h-20 flex-col bg-transparent hover:bg-green-50 border-green-200"
                      >
                        <Banknote className="h-8 w-8 mb-2 text-green-600" />
                        <span>Efectivo</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex-col bg-transparent hover:bg-blue-50 border-blue-200"
                      >
                        <CreditCard className="h-8 w-8 mb-2 text-blue-600" />
                        <span>Tarjeta</span>
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cash-amount">Monto recibido (Efectivo)</Label>
                        <Input
                          id="cash-amount"
                          type="number"
                          placeholder="0.00"
                          value={cashAmount}
                          onChange={(e) => setCashAmount(e.target.value)}
                          className="text-lg"
                        />
                      </div>

                      {cashAmount && selectedPayment && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span>Total a pagar:</span>
                            <span className="font-bold">
                              ${ventasPendientes.find((v) => v.id.toString() === selectedPayment)?.total.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Recibido:</span>
                            <span>${Number.parseFloat(cashAmount || "0").toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                            <span>Cambio:</span>
                            <span className="text-green-600">
                              $
                              {Math.max(
                                0,
                                Number.parseFloat(cashAmount || "0") -
                                  (ventasPendientes.find((v) => v.id.toString() === selectedPayment)?.total || 0),
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}

                      <Button className="w-full restaurant-gradient text-white" size="lg">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Confirmar Pago
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="historial" className="space-y-4">
                <Card className="restaurant-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-orange-600" />
                      Ventas del Día
                    </CardTitle>
                    <CardDescription>Historial de transacciones completadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {ventasDelDia.map((venta, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-sm">
                              <p className="font-medium">{venta.mesa}</p>
                              <p className="text-gray-600">{venta.mesero}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge
                              variant="outline"
                              className={
                                venta.metodo === "Efectivo"
                                  ? "border-green-500 text-green-700"
                                  : "border-blue-500 text-blue-700"
                              }
                            >
                              {venta.metodo}
                            </Badge>
                            <div className="text-right">
                              <p className="font-bold">${venta.total.toFixed(2)}</p>
                              <p className="text-xs text-gray-500">{venta.hora}</p>
                            </div>
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
            {/* Quick Actions */}
            <Card className="restaurant-card">
              <CardHeader>
                <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start restaurant-gradient text-white">
                  <Calculator className="h-4 w-4 mr-2" />
                  Venta Mostrador
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Printer className="h-4 w-4 mr-2" />
                  Reimprimir Ticket
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Corte de Caja
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Reporte de Ventas
                </Button>
              </CardContent>
            </Card>

            {/* Cash Register Status */}
            <Card className="restaurant-card">
              <CardHeader>
                <CardTitle className="text-lg">Estado de Caja</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Efectivo en caja:</span>
                  <span className="font-bold text-green-600">${ventasEfectivo.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Transacciones:</span>
                  <span className="font-bold">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Promedio por venta:</span>
                  <span className="font-bold">${Math.round(totalVentas / 23)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="restaurant-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  Alertas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm font-medium text-amber-800">Cambio Bajo</p>
                  <p className="text-xs text-amber-600">Solicitar cambio de billetes pequeños</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Meta Alcanzada</p>
                  <p className="text-xs text-green-600">Ventas superaron la meta diaria</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
