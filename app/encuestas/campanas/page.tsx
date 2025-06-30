"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Send, Eye, BarChart3, Users, MessageSquare, Calendar, Clock } from "lucide-react"

interface CampanaSMS {
  id: string
  nombre: string
  encuesta: string
  mensaje: string
  estado: "borrador" | "activa" | "completada" | "pausada"
  enviados: number
  entregados: number
  respuestas: number
  fechaCreacion: Date
  fechaEnvio?: Date
}

export default function CampanasSMSPage() {
  const [campanas] = useState<CampanaSMS[]>([
    {
      id: "1",
      nombre: "Encuesta Post-Visita Enero",
      encuesta: "Satisfacción del Cliente",
      mensaje: "Hola {nombre}, nos gustaría conocer tu opinión sobre tu visita. Completa nuestra encuesta: {link}",
      estado: "activa",
      enviados: 150,
      entregados: 142,
      respuestas: 89,
      fechaCreacion: new Date("2024-01-15"),
      fechaEnvio: new Date("2024-01-16"),
    },
    {
      id: "2",
      nombre: "Feedback Fin de Semana",
      encuesta: "Experiencia del Cliente",
      mensaje: "Gracias por visitarnos este fin de semana. Tu opinión es importante: {link}",
      estado: "completada",
      enviados: 89,
      entregados: 85,
      respuestas: 67,
      fechaCreacion: new Date("2024-01-10"),
      fechaEnvio: new Date("2024-01-12"),
    },
    {
      id: "3",
      nombre: "Encuesta Nuevos Clientes",
      encuesta: "Primera Impresión",
      mensaje: "Bienvenido a nuestro restaurante. Comparte tu primera experiencia: {link}",
      estado: "borrador",
      enviados: 0,
      entregados: 0,
      respuestas: 0,
      fechaCreacion: new Date("2024-01-20"),
    },
  ])

  const [busqueda, setBusqueda] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("todas")
  const [dialogAbierto, setDialogAbierto] = useState(false)
  const [campanaSeleccionada, setCampanaSeleccionada] = useState<CampanaSMS | null>(null)

  const campanasFiltradas = campanas.filter((campana) => {
    const coincideBusqueda = campana.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideEstado = filtroEstado === "todas" || campana.estado === filtroEstado
    return coincideBusqueda && coincideEstado
  })

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activa":
        return "bg-green-500 hover:bg-green-600"
      case "completada":
        return "bg-blue-500 hover:bg-blue-600"
      case "pausada":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "borrador":
        return "bg-gray-500 hover:bg-gray-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const calcularTasaRespuesta = (respuestas: number, entregados: number) => {
    if (entregados === 0) return 0
    return Math.round((respuestas / entregados) * 100)
  }

  const abrirDetalleCampana = (campana: CampanaSMS) => {
    setCampanaSeleccionada(campana)
    setDialogAbierto(true)
  }

  return (
    <MainLayout title="Campañas SMS">
      <div className="space-y-6">
        {/* Header con acciones */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Campañas SMS</h2>
            <p className="text-muted-foreground">Gestiona el envío de encuestas por SMS a tus clientes</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Campaña
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar campañas..."
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
              <SelectItem value="activa">Activas</SelectItem>
              <SelectItem value="completada">Completadas</SelectItem>
              <SelectItem value="pausada">Pausadas</SelectItem>
              <SelectItem value="borrador">Borradores</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Estadísticas generales */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Campañas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campanas.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">SMS Enviados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campanas.reduce((total, c) => total + c.enviados, 0)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Respuestas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {campanas.reduce((total, c) => total + c.respuestas, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tasa Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  campanas.reduce((total, c) => total + calcularTasaRespuesta(c.respuestas, c.entregados), 0) /
                    campanas.filter((c) => c.entregados > 0).length || 0,
                )}
                %
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de campañas */}
        <div className="space-y-4">
          {campanasFiltradas.map((campana) => (
            <Card key={campana.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{campana.nombre}</h3>
                      <Badge className={getEstadoColor(campana.estado)}>{campana.estado}</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">Encuesta: {campana.encuesta}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{campana.enviados}</p>
                          <p className="text-xs text-muted-foreground">Enviados</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{campana.entregados}</p>
                          <p className="text-xs text-muted-foreground">Entregados</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{campana.respuestas}</p>
                          <p className="text-xs text-muted-foreground">Respuestas</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {calcularTasaRespuesta(campana.respuestas, campana.entregados)}%
                          </p>
                          <p className="text-xs text-muted-foreground">Tasa respuesta</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Creada: {campana.fechaCreacion.toLocaleDateString()}
                      </div>
                      {campana.fechaEnvio && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Enviada: {campana.fechaEnvio.toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => abrirDetalleCampana(campana)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    {campana.estado === "borrador" && (
                      <Button size="sm">
                        <Send className="h-4 w-4 mr-1" />
                        Enviar
                      </Button>
                    )}
                    {campana.estado === "activa" && (
                      <Button size="sm" variant="outline">
                        Pausar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog de detalles de campaña */}
        <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{campanaSeleccionada?.nombre}</DialogTitle>
              <DialogDescription>Detalles y estadísticas de la campaña SMS</DialogDescription>
            </DialogHeader>
            {campanaSeleccionada && (
              <div className="space-y-6">
                {/* Información básica */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Estado</Label>
                    <Badge className={getEstadoColor(campanaSeleccionada.estado)}>{campanaSeleccionada.estado}</Badge>
                  </div>
                  <div>
                    <Label>Encuesta Asociada</Label>
                    <p className="font-medium">{campanaSeleccionada.encuesta}</p>
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <Label>Mensaje SMS</Label>
                  <div className="mt-1 p-3 bg-muted rounded-md text-sm">{campanaSeleccionada.mensaje}</div>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{campanaSeleccionada.enviados}</div>
                        <p className="text-sm text-muted-foreground">Enviados</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{campanaSeleccionada.entregados}</div>
                        <p className="text-sm text-muted-foreground">Entregados</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{campanaSeleccionada.respuestas}</div>
                        <p className="text-sm text-muted-foreground">Respuestas</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {calcularTasaRespuesta(campanaSeleccionada.respuestas, campanaSeleccionada.entregados)}%
                        </div>
                        <p className="text-sm text-muted-foreground">Tasa Respuesta</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Fecha de Creación</Label>
                    <p className="font-medium">{campanaSeleccionada.fechaCreacion.toLocaleDateString()}</p>
                  </div>
                  {campanaSeleccionada.fechaEnvio && (
                    <div>
                      <Label>Fecha de Envío</Label>
                      <p className="font-medium">{campanaSeleccionada.fechaEnvio.toLocaleDateString()}</p>
                    </div>
                  )}
                </div>

                {/* Acciones */}
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Editar Campaña</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Ver Respuestas
                  </Button>
                  <Button variant="outline">Duplicar</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
