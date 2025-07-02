"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  Plus,
  Search,
  CalendarIcon,
  Clock,
  Users,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
} from "lucide-react"
import { mockReservaciones } from "@/lib/data/mock-data"
import type { Reservacion } from "@/lib/types"

type EstadoReservacion = "pendiente" | "confirmada" | "cancelada" | "completada"

export default function ReservacionesPage() {
  const [reservaciones] = useState<Reservacion[]>(mockReservaciones)
  const [busqueda, setBusqueda] = useState("")
  const [filtroEstado, setFiltroEstado] = useState<string>("todas")
  const [dialogAbierto, setDialogAbierto] = useState(false)
  const [reservacionSeleccionada, setReservacionSeleccionada] = useState<Reservacion | null>(null)
  const [fecha, setFecha] = useState<Date>()

  const reservacionesFiltradas = reservaciones.filter((reservacion) => {
    const coincideBusqueda =
      reservacion.clienteNombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      reservacion.clienteTelefono.includes(busqueda)
    const coincideEstado = filtroEstado === "todas" || reservacion.estado === filtroEstado
    return coincideBusqueda && coincideEstado
  })

  const getEstadoColor = (estado: EstadoReservacion) => {
    switch (estado) {
      case "confirmada":
        return "bg-green-500 hover:bg-green-600"
      case "pendiente":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "cancelada":
        return "bg-red-500 hover:bg-red-600"
      case "completada":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getEstadoIcon = (estado: EstadoReservacion) => {
    switch (estado) {
      case "confirmada":
        return <CheckCircle className="h-4 w-4" />
      case "pendiente":
        return <AlertCircle className="h-4 w-4" />
      case "cancelada":
        return <XCircle className="h-4 w-4" />
      case "completada":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const abrirDetalleReservacion = (reservacion: Reservacion) => {
    setReservacionSeleccionada(reservacion)
    setDialogAbierto(true)
  }

  return (
    <MainLayout title="Reservaciones">
      <div className="space-y-6">
        {/* Header con acciones */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Reservaciones</h2>
            <p className="text-muted-foreground">Gestiona las reservas de mesas de tu restaurante</p>
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
              placeholder="Buscar por cliente o teléfono..."
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
              <SelectItem value="pendiente">Pendientes</SelectItem>
              <SelectItem value="confirmada">Confirmadas</SelectItem>
              <SelectItem value="completada">Completadas</SelectItem>
              <SelectItem value="cancelada">Canceladas</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-48 bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fecha ? format(fecha, "PPP", { locale: es }) : "Seleccionar fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={fecha} onSelect={setFecha} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {/* Estadísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Reservaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reservaciones.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {reservaciones.filter((r) => r.estado === "confirmada").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {reservaciones.filter((r) => r.estado === "pendiente").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Hoy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {reservaciones.filter((r) => r.fecha === new Date().toISOString().split("T")[0]).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de reservaciones */}
        <div className="space-y-4">
          {reservacionesFiltradas.map((reservacion) => (
            <Card key={reservacion.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{reservacion.clienteNombre}</h3>
                      <Badge className={getEstadoColor(reservacion.estado)}>
                        {getEstadoIcon(reservacion.estado)}
                        {reservacion.estado}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{new Date(reservacion.fecha).toLocaleDateString()}</p>
                          <p className="text-xs text-muted-foreground">Fecha</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{reservacion.hora}</p>
                          <p className="text-xs text-muted-foreground">Hora</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{reservacion.numeroPersonas} personas</p>
                          <p className="text-xs text-muted-foreground">Mesa {reservacion.mesa}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{reservacion.clienteTelefono}</p>
                          <p className="text-xs text-muted-foreground">Teléfono</p>
                        </div>
                      </div>
                    </div>

                    {reservacion.notas && (
                      <p className="text-sm text-muted-foreground bg-gray-50 p-2 rounded-md">{reservacion.notas}</p>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => abrirDetalleReservacion(reservacion)}>
                      Ver Detalles
                    </Button>
                    {reservacion.estado === "pendiente" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Confirmar
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
              <DialogTitle>Detalles de Reservación</DialogTitle>
              <DialogDescription>Información completa de la reserva</DialogDescription>
            </DialogHeader>
            {reservacionSeleccionada && (
              <div className="space-y-6">
                {/* Información básica */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cliente</Label>
                    <p className="font-medium">{reservacionSeleccionada.clienteNombre}</p>
                  </div>
                  <div>
                    <Label>Teléfono</Label>
                    <p className="font-medium">{reservacionSeleccionada.clienteTelefono}</p>
                  </div>
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
                    <p className="font-medium">{reservacionSeleccionada.numeroPersonas}</p>
                  </div>
                  <div>
                    <Label>Mesa Asignada</Label>
                    <p className="font-medium">Mesa {reservacionSeleccionada.mesa}</p>
                  </div>
                </div>

                {/* Estado */}
                <div>
                  <Label>Estado</Label>
                  <Badge className={getEstadoColor(reservacionSeleccionada.estado)}>
                    {getEstadoIcon(reservacionSeleccionada.estado)}
                    {reservacionSeleccionada.estado}
                  </Badge>
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
                    Cambiar Estado
                  </Button>
                  <Button variant="outline">Contactar Cliente</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
