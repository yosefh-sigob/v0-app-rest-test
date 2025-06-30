"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Users, Clock, Plus, Edit, Eye } from "lucide-react"
import { mockMesas } from "@/lib/data/mock-data"
import { type Mesa, EstadoMesa } from "@/lib/types"

export default function MesasPage() {
  const [mesas, setMesas] = useState<Mesa[]>(mockMesas)
  const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null)
  const [dialogAbierto, setDialogAbierto] = useState(false)

  const getEstadoColor = (estado: EstadoMesa) => {
    switch (estado) {
      case EstadoMesa.DISPONIBLE:
        return "bg-green-500 hover:bg-green-600"
      case EstadoMesa.OCUPADA:
        return "bg-blue-500 hover:bg-blue-600"
      case EstadoMesa.RESERVADA:
        return "bg-orange-500 hover:bg-orange-600"
      case EstadoMesa.FUERA_SERVICIO:
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const cambiarEstadoMesa = (mesaId: string, nuevoEstado: EstadoMesa) => {
    setMesas(mesas.map((mesa) => (mesa.id === mesaId ? { ...mesa, estado: nuevoEstado } : mesa)))
  }

  const abrirDetalleMesa = (mesa: Mesa) => {
    setMesaSeleccionada(mesa)
    setDialogAbierto(true)
  }

  return (
    <MainLayout title="Gestión de Mesas">
      <div className="space-y-6">
        {/* Header con acciones */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Mesas del Restaurante</h2>
            <p className="text-muted-foreground">Gestiona el estado y ocupación de las mesas</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Mesa
          </Button>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Mesas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mesas.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mesas.filter((m) => m.estado === EstadoMesa.DISPONIBLE).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ocupadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mesas.filter((m) => m.estado === EstadoMesa.OCUPADA).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Capacidad Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mesas.reduce((total, mesa) => total + mesa.capacidad, 0)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Grid de mesas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mesas.map((mesa) => (
            <Card key={mesa.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{mesa.numero}</CardTitle>
                  <Badge className={getEstadoColor(mesa.estado)}>{mesa.estado}</Badge>
                </div>
                <CardDescription>{mesa.area}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {mesa.comensales || 0}/{mesa.capacidad} personas
                  </div>

                  {mesa.estado === EstadoMesa.OCUPADA && (
                    <>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {mesa.tiempoOcupada}
                      </div>
                      <div className="text-lg font-semibold">${mesa.total?.toFixed(2) || "0.00"}</div>
                      <div className="text-sm text-muted-foreground">Mesero: {mesa.mesero}</div>
                    </>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => abrirDetalleMesa(mesa)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Botones de cambio de estado */}
                  <div className="grid grid-cols-2 gap-1 mt-2">
                    {mesa.estado !== EstadoMesa.DISPONIBLE && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs bg-transparent"
                        onClick={() => cambiarEstadoMesa(mesa.id, EstadoMesa.DISPONIBLE)}
                      >
                        Liberar
                      </Button>
                    )}
                    {mesa.estado === EstadoMesa.DISPONIBLE && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs bg-transparent"
                        onClick={() => cambiarEstadoMesa(mesa.id, EstadoMesa.OCUPADA)}
                      >
                        Ocupar
                      </Button>
                    )}
                    {mesa.estado !== EstadoMesa.RESERVADA && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs bg-transparent"
                        onClick={() => cambiarEstadoMesa(mesa.id, EstadoMesa.RESERVADA)}
                      >
                        Reservar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog de detalles de mesa */}
        <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalles de {mesaSeleccionada?.numero}</DialogTitle>
              <DialogDescription>Información completa de la mesa</DialogDescription>
            </DialogHeader>
            {mesaSeleccionada && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Estado</Label>
                    <Badge className={getEstadoColor(mesaSeleccionada.estado)}>{mesaSeleccionada.estado}</Badge>
                  </div>
                  <div>
                    <Label>Área</Label>
                    <p>{mesaSeleccionada.area}</p>
                  </div>
                  <div>
                    <Label>Capacidad</Label>
                    <p>{mesaSeleccionada.capacidad} personas</p>
                  </div>
                  <div>
                    <Label>Comensales Actuales</Label>
                    <p>{mesaSeleccionada.comensales || 0}</p>
                  </div>
                </div>

                {mesaSeleccionada.estado === EstadoMesa.OCUPADA && (
                  <div className="space-y-2">
                    <div>
                      <Label>Mesero Asignado</Label>
                      <p>{mesaSeleccionada.mesero}</p>
                    </div>
                    <div>
                      <Label>Tiempo Ocupada</Label>
                      <p>{mesaSeleccionada.tiempoOcupada}</p>
                    </div>
                    <div>
                      <Label>Total Cuenta</Label>
                      <p className="text-lg font-semibold">${mesaSeleccionada.total?.toFixed(2)}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Editar Mesa</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Historial
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
