import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Utensils, Plus } from "lucide-react"

export default function MeseroPage() {
  const mesasAsignadas = [
    { id: 1, numero: "M01", comensales: 4, estado: "ocupada", tiempo: "15 min", total: 450.0 },
    { id: 2, numero: "M03", comensales: 2, estado: "ordenando", tiempo: "5 min", total: 0 },
    { id: 3, numero: "M07", comensales: 6, estado: "comiendo", tiempo: "35 min", total: 890.5 },
    { id: 4, numero: "M12", comensales: 3, estado: "cuenta", tiempo: "45 min", total: 320.0 },
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "ocupada":
        return "bg-blue-500"
      case "ordenando":
        return "bg-yellow-500"
      case "comiendo":
        return "bg-green-500"
      case "cuenta":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <MainLayout title="Panel de Mesero">
      <div className="space-y-6">
        {/* Header con estadísticas rápidas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mesas Asignadas</CardTitle>
              <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comensales Activos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas del Turno</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,660.50</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Propinas</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$166.05</div>
            </CardContent>
          </Card>
        </div>

        {/* Mesas asignadas */}
        <Card>
          <CardHeader>
            <CardTitle>Mis Mesas</CardTitle>
            <CardDescription>Mesas asignadas y su estado actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {mesasAsignadas.map((mesa) => (
                <Card key={mesa.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{mesa.numero}</CardTitle>
                      <Badge className={getEstadoColor(mesa.estado)}>{mesa.estado}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {mesa.comensales} comensales
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {mesa.tiempo}
                      </div>
                      <div className="text-lg font-semibold">${mesa.total.toFixed(2)}</div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Button className="w-full" size="sm">
                        Ver Detalles
                      </Button>
                      {mesa.estado === "ordenando" && (
                        <Button variant="outline" className="w-full bg-transparent" size="sm">
                          Tomar Orden
                        </Button>
                      )}
                      {mesa.estado === "cuenta" && (
                        <Button variant="outline" className="w-full bg-transparent" size="sm">
                          Procesar Pago
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Acciones rápidas */}
        <div className="grid gap-4 md:grid-cols-3">
          <Button className="h-20 text-lg">
            <Plus className="mr-2 h-6 w-6" />
            Nueva Mesa
          </Button>
          <Button variant="outline" className="h-20 text-lg bg-transparent">
            <Utensils className="mr-2 h-6 w-6" />
            Ver Menú
          </Button>
          <Button variant="outline" className="h-20 text-lg bg-transparent">
            <Clock className="mr-2 h-6 w-6" />
            Historial
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
