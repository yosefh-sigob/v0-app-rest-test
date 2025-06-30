"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Clock,
  Utensils,
  Star,
  AlertCircle,
  CheckCircle,
  Calendar,
  Package,
  UserCheck,
} from "lucide-react"

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")

  // Datos simulados
  const stats = {
    today: {
      sales: 15420,
      orders: 89,
      customers: 156,
      avgOrder: 173,
    },
    week: {
      sales: 98750,
      orders: 567,
      customers: 892,
      avgOrder: 174,
    },
    month: {
      sales: 387500,
      orders: 2234,
      customers: 3456,
      avgOrder: 173,
    },
  }

  const currentStats = stats[selectedPeriod as keyof typeof stats]

  const recentOrders = [
    { id: "001", table: "Mesa 5", items: 3, total: 245, status: "preparando", time: "5 min" },
    { id: "002", table: "Mesa 12", items: 2, total: 180, status: "listo", time: "2 min" },
    { id: "003", table: "Mesa 3", items: 4, total: 320, status: "entregado", time: "15 min" },
    { id: "004", table: "Mesa 8", items: 1, total: 95, status: "preparando", time: "8 min" },
  ]

  const tableStatus = [
    { number: 1, status: "disponible", capacity: 4, waiter: null },
    { number: 2, status: "ocupada", capacity: 2, waiter: "Ana García", order: 156 },
    { number: 3, status: "ocupada", capacity: 6, waiter: "Carlos López", order: 320 },
    { number: 4, status: "reservada", capacity: 4, waiter: null, reservation: "19:30" },
    { number: 5, status: "ocupada", capacity: 4, waiter: "María Rodríguez", order: 245 },
    { number: 6, status: "limpieza", capacity: 2, waiter: null },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "disponible":
        return "status-available"
      case "ocupada":
        return "status-occupied"
      case "reservada":
        return "status-reserved"
      case "limpieza":
        return "status-cleaning"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOrderStatusIcon = (status: string) => {
    switch (status) {
      case "preparando":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "listo":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "entregado":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-orange-50/30 to-amber-50/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Resumen general de tu restaurante</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedPeriod === "today" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("today")}
            size="sm"
          >
            Hoy
          </Button>
          <Button
            variant={selectedPeriod === "week" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("week")}
            size="sm"
          >
            Semana
          </Button>
          <Button
            variant={selectedPeriod === "month" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("month")}
            size="sm"
          >
            Mes
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="restaurant-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ventas</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${currentStats.sales.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card className="restaurant-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Órdenes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{currentStats.orders}</div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card className="restaurant-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Clientes</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{currentStats.customers}</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.3% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card className="restaurant-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ticket Promedio</CardTitle>
            <Star className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${currentStats.avgOrder}</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3.1% vs período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders and Tables */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="orders">Órdenes Recientes</TabsTrigger>
              <TabsTrigger value="tables">Estado de Mesas</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4">
              <Card className="restaurant-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-orange-600" />
                    Órdenes Activas
                  </CardTitle>
                  <CardDescription>Órdenes en proceso y recientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getOrderStatusIcon(order.status)}
                          <div>
                            <p className="font-medium text-gray-900">{order.table}</p>
                            <p className="text-sm text-gray-600">
                              {order.items} items • ${order.total}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={`${order.status === "listo" ? "border-green-500 text-green-700" : "border-amber-500 text-amber-700"}`}
                          >
                            {order.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tables" className="space-y-4">
              <Card className="restaurant-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-orange-600" />
                    Estado de Mesas
                  </CardTitle>
                  <CardDescription>Vista general de todas las mesas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tableStatus.map((table) => (
                      <div key={table.number} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">Mesa {table.number}</h4>
                          <Badge className={getStatusColor(table.status)}>{table.status}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Capacidad: {table.capacity} personas</p>
                          {table.waiter && <p>Mesero: {table.waiter}</p>}
                          {table.order && <p>Cuenta: ${table.order}</p>}
                          {table.reservation && <p>Reserva: {table.reservation}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="restaurant-card">
            <CardHeader>
              <CardTitle className="text-lg">Resumen Rápido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Mesas Ocupadas</span>
                </div>
                <span className="font-medium">3/6</span>
              </div>
              <Progress value={50} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Meseros Activos</span>
                </div>
                <span className="font-medium">4/6</span>
              </div>
              <Progress value={67} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Productos Activos</span>
                </div>
                <span className="font-medium">45/52</span>
              </div>
              <Progress value={87} className="h-2" />
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
                <p className="text-sm font-medium text-amber-800">Stock Bajo</p>
                <p className="text-xs text-amber-600">3 productos necesitan reposición</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Reserva Próxima</p>
                <p className="text-xs text-blue-600">Mesa 4 reservada para las 19:30</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800">Meta Alcanzada</p>
                <p className="text-xs text-green-600">Ventas del día superaron la meta</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="restaurant-card">
            <CardHeader>
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Nueva Reserva
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Agregar Producto
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Registrar Cliente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
