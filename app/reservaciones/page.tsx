"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Phone, Users, CalendarIcon, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { mockReservaciones } from "@/lib/data/mock-data"
import { type Reservacion, EstadoReservacion } from "@/lib/types"

export default function ReservacionesPage() {
  const [reservaciones, setReservaciones] = useState<Reservacion[]>(mockReservaciones)
  const [busqueda, setBusqueda] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("todas")
  const [dialogAbierto, setDialogAbierto] = useState(false)
  const [reservacionSeleccionada, setReservacionSeleccionada] = useState<Reservacion | null>(null)
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(new Date())

  const reservacionesFiltradas = reservaciones.filter((reservacion) => {
    const coincideBusqueda =
      reservacion.cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      reservacion.cliente.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
      reservacion.telefono.includes(busqueda)
    const coincideEstado = filtroEstado === "todas" || reservacion.estado === filtroEstado
    return coincideBusqueda && coincideEstado
  })

  const getEstadoColor = (estado: EstadoReservacion) => {
    switch (estado) {
      case EstadoReservacion.PENDIENTE:
        return "bg-yellow-500 hover:bg-yellow-600"
      case EstadoReservacion.CONFIRMADA:
        return "bg-green-500 hover:bg-green-600"
      case EstadoReservacion.SENTADO:
        return "bg-blue-500 hover:bg-blue-600"
      case EstadoReservacion.CANCELADA:
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getEstadoIcon = (estado: EstadoReservacion) => {
    switch (estado) {
      case EstadoReservacion.PENDIENTE:
        return <AlertCircle className="h-3 w-3" />
      case EstadoReservacion.CONFIRMADA:
        return <CheckCircle className="h-3 w-3" />
      case EstadoReservacion.SENTADO:
        return <Users className="h-3 w-3" />
      case EstadoReservacion.CANCELADA:
        return <XCircle className="h-3 w-3" />
      default:
        return <AlertCircle className="h-3 w-3" />
    }
  }

  const cambiarEstadoReservacion = (reservacionId: string, nuevoEstado: EstadoReservacion) => {
    setReservaciones(
      reservaciones.map((reservacion) =>
        reservacion.id === reservacionId ? { ...reservacion, estado: nuevoEstado } : reservacion,
      ),
    )
  }

  const abrirDetalleReservacion = (reservacion: Reservacion) => {
    setReservacionSeleccionada(reservacion)
    setDialogAbierto(true)
  }

  const cerrarDialog = () => {
    setDialogAbierto(false)
    setReservacionSeleccionada(null)
  }

  return (
    <MainLayout title="Sistema de Reservaciones">
      <div className="space-y-6">
        {/* Header con acciones */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Reservaciones</h2>
            <p className="text-muted-foreground">Gestiona las reservaciones del restaurante</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Reservación
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar reservaciones..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filtroEstado} onValueChange={setFiltroEstado}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todos los estados</SelectItem>
              <SelectItem value={EstadoReservacion.PENDIENTE}>Pendientes</SelectItem>
              <SelectItem value={EstadoReservacion.CONFIRMADA}>Confirmadas</SelectItem>
              <SelectItem value={EstadoReservacion.SENTADO}>Sentados</SelectItem>
              <SelectItem value={EstadoReservacion.CANCELADA}>Canceladas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Estadísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Hoy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reservaciones.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {reservaciones.filter((r) => r.estado === EstadoReservacion.PENDIENTE).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {reservaciones.filter((r) => r.estado === EstadoReservacion.CONFIRMADA).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Personas Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reservaciones.reduce((total, r) => total + r.personas, 0)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de reservaciones */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reservacionesFiltradas.map((reservacion) => (
            <Card key={reservacion.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {reservacion.cliente.nombre} {reservacion.cliente.apellidos}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Phone className="h-3 w-3 mr-1" />
                      {reservacion.telefono}
                    </CardDescription>
                  </div>
                  <Badge className={getEstadoColor(reservacion.estado)}>
                    {getEstadoIcon(reservacion.estado)}
                    <span className="ml-1">{reservacion.estado}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="h-3 w-3 mr-2" />
                    {new Date(reservacion.fecha).toLocaleDateString()}
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-2" />
                    {reservacion.hora}
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-3 w-3 mr-2" />
                    {reservacion.personas} personas
                  </div>

                  {reservacion.mesa && <div className="text-sm font-medium">Mesa: {reservacion.mesa.numero}</div>}

                  {reservacion.notas && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{reservacion.notas}</p>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => abrirDetalleReservacion(reservacion)}
                    >
                      Ver Detalles
                    </Button>
                    {reservacion.estado === EstadoReservacion.PENDIENTE && (
                      <Button
                        size="sm"
                        onClick={() => cambiarEstadoReservacion(reservacion.id, EstadoReservacion.CONFIRMADA)}
                      >
                        Confirmar
                      </Button>
                    )}
                    {reservacion.estado === EstadoReservacion.CONFIRMADA && (
                      <Button
                        size="sm"
                        onClick={() => cambiarEstadoReservacion(reservacion.id, EstadoReservacion.SENTADO)}
                      >
                        Sentar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog de detalles de reservación */}
        <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Reservación de {reservacionSeleccionada?.cliente.nombre} {reservacionSeleccionada?.cliente.apellidos}
              </DialogTitle>
              <DialogDescription>Detalles completos de la reservación</DialogDescription>
            </DialogHeader>
            {reservacionSeleccionada && (
              <div className="space-y-6">
                {/* Información del cliente */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cliente</Label>
                    <p className="font-medium">
                      {reservacionSeleccionada.cliente.nombre} {reservacionSeleccionada.cliente.apellidos}
                    </p>
                  </div>
                  <div>
                    <Label>Teléfono</Label>
                    <p className="font-medium">{reservacionSeleccionada.telefono}</p>
                  </div>
                  {reservacionSeleccionada.email && (
                    <div>
                      <Label>Email</Label>
                      <p className="font-medium">{reservacionSeleccionada.email}</p>
                    </div>
                  )}
                  <div>
                    <Label>Estado</Label>
                    <Badge className={getEstadoColor(reservacionSeleccionada.estado)}>
                      {getEstadoIcon(reservacionSeleccionada.estado)}
                      <span className="ml-1">{reservacionSeleccionada.estado}</span>
                    </Badge>
                  </div>
                </div>

                {/* Detalles de la reservación */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Fecha</Label>
                    <p className="font-medium">{new Date(reservacionSeleccionada.fecha).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Hora</Label>
                    <p className="font-medium">{reservacionSeleccionada.hora}</p>
                  </div>
                  <div>
                    <Label>Número de Personas</Label>
                    <p className="font-medium">{reservacionSeleccionada.personas}</p>
                  </div>
                  {reservacionSeleccionada.mesa && (
                    <div>
                      <Label>Mesa Asignada</Label>
                      <p className="font-medium">{reservacionSeleccionada.mesa.numero}</p>
                    </div>
                  )}
                </div>

                {/* Notas */}
                {reservacionSeleccionada.notas && (
                  <div>
                    <Label>Notas Especiales</Label>
                    <p className="mt-1 p-3 bg-muted rounded-md">{reservacionSeleccionada.notas}</p>
                  </div>
                )}

                {/* Acciones */}
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Editar Reservación</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Asignar Mesa
                  </Button>
                  {reservacionSeleccionada.estado === EstadoReservacion.PENDIENTE && (
                    <Button
                      onClick={() => {
                        cambiarEstadoReservacion(reservacionSeleccionada.id, EstadoReservacion.CONFIRMADA)
                        cerrarDialog()
                      }}
                    >
                      Confirmar
                    </Button>
                  )}
                  {reservacionSeleccionada.estado !== EstadoReservacion.CANCELADA && (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        cambiarEstadoReservacion(reservacionSeleccionada.id, EstadoReservacion.CANCELADA)
                        cerrarDialog()
                      }}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
