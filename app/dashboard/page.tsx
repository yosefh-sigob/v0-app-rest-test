import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, DollarSign, ShoppingCart, Users, TrendingUp, Clock } from "lucide-react"
import { mockDashboardData } from "@/lib/data/mock-data"

export default function DashboardPage() {
  const { ventasHoy, ordenesHoy, clientesTotal, mesasOcupadas, mesasTotal, ventasRecientes } = mockDashboardData

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${ventasHoy.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +20.1% desde ayer
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Órdenes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{ordenesHoy}</div>
              <p className="text-xs text-muted-foreground">+15% desde ayer</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientesTotal.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+5.2% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mesas Ocupadas</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mesasOcupadas}/{mesasTotal}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((mesasOcupadas / mesasTotal) * 100)}% de ocupación
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Ventas Recientes</CardTitle>
              <CardDescription>Últimas transacciones del día</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ventasRecientes.map((venta) => (
                  <div key={venta.id} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{venta.mesa}</p>
                      <p className="text-sm text-muted-foreground">
                        Orden #{venta.orden} - ${venta.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="ml-auto font-medium flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {venta.hora}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Estado de Mesas</CardTitle>
              <CardDescription>Vista rápida del comedor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Disponibles</span>
                  <span className="text-sm font-medium text-green-600">{mesasTotal - mesasOcupadas}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ocupadas</span>
                  <span className="text-sm font-medium text-blue-600">{mesasOcupadas}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Reservadas</span>
                  <span className="text-sm font-medium text-orange-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Fuera de servicio</span>
                  <span className="text-sm font-medium text-red-600">1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
