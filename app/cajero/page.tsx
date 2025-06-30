import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, DollarSign, Receipt, Clock, Calculator } from "lucide-react"

export default function CajeroPage() {
  const ventasPendientes = [
    { id: 1, mesa: "M01", total: 450.0, mesero: "Juan Pérez", tiempo: "15 min" },
    { id: 2, mesa: "M07", total: 890.5, mesero: "María García", tiempo: "35 min" },
    { id: 3, mesa: "M12", total: 320.0, mesero: "Carlos López", tiempo: "45 min" },
    { id: 4, mesa: "Mostrador", total: 125.0, mesero: "Venta directa", tiempo: "2 min" },
  ]

  return (
    <MainLayout title="Punto de Venta - Cajero">
      <div className="space-y-6">
        {/* Estadísticas del turno */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas del Turno</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5,240.50</div>
              <p className="text-xs text-muted-foreground">23 transacciones</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efectivo</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,100.00</div>
              <p className="text-xs text-muted-foreground">40% del total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tarjetas</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,140.50</div>
              <p className="text-xs text-muted-foreground">60% del total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cuentas Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">$1,785.50 total</p>
            </CardContent>
          </Card>
        </div>

        {/* Ventas pendientes de cobro */}
        <Card>
          <CardHeader>
            <CardTitle>Cuentas por Cobrar</CardTitle>
            <CardDescription>Mesas listas para procesar el pago</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ventasPendientes.map((venta) => (
                <div key={venta.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{venta.mesa}</p>
                      <p className="text-sm text-muted-foreground">{venta.mesero}</p>
                    </div>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {venta.tiempo}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold">${venta.total.toFixed(2)}</p>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm">
                        <Receipt className="h-4 w-4 mr-2" />
                        Ver Cuenta
                      </Button>
                      <Button size="sm" variant="outline">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Cobrar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Acciones rápidas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Button className="h-20 text-lg">
            <Calculator className="mr-2 h-6 w-6" />
            Venta Mostrador
          </Button>
          <Button variant="outline" className="h-20 text-lg bg-transparent">
            <Receipt className="mr-2 h-6 w-6" />
            Reimprimir Ticket
          </Button>
          <Button variant="outline" className="h-20 text-lg bg-transparent">
            <DollarSign className="mr-2 h-6 w-6" />
            Corte de Caja
          </Button>
          <Button variant="outline" className="h-20 text-lg bg-transparent">
            <Clock className="mr-2 h-6 w-6" />
            Historial de Ventas
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
