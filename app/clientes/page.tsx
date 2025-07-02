"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Search, Edit, Phone, Mail, Calendar, User, TrendingUp } from "lucide-react"
import { mockClientes } from "@/lib/data/mock-data"
import type { Cliente } from "@/lib/types"

export default function ClientesPage() {
  const [clientes] = useState<Cliente[]>(mockClientes)
  const [busqueda, setBusqueda] = useState("")
  const [dialogAbierto, setDialogAbierto] = useState(false)
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null)

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.telefono.includes(busqueda),
  )

  const abrirDetalleCliente = (cliente: Cliente) => {
    setClienteSeleccionado(cliente)
    setDialogAbierto(true)
  }

  return (
    <MainLayout title="Gestión de Clientes">
      <div className="space-y-6">
        {/* Header con acciones */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Clientes</h2>
            <p className="text-muted-foreground">Gestiona tu base de datos de clientes</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Cliente
          </Button>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Estadísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {
                  clientes.filter(
                    (c) => c.ultimaVisita && new Date(c.ultimaVisita) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                  ).length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Promedio Visitas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(clientes.reduce((sum, c) => sum + c.visitas, 0) / clientes.length)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Clientes VIP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{clientes.filter((c) => c.visitas >= 10).length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de clientes */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clientesFiltrados.map((cliente) => (
            <Card key={cliente.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {cliente.nombre} {cliente.apellidos}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Phone className="h-3 w-3 mr-1" />
                      {cliente.telefono}
                    </CardDescription>
                  </div>
                  {cliente.visitas >= 10 && <Badge className="bg-yellow-500 hover:bg-yellow-600">VIP</Badge>}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {cliente.email && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-3 w-3 mr-2" />
                      {cliente.email}
                    </div>
                  )}

                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingUp className="h-3 w-3 mr-2" />
                    {cliente.visitas} visitas
                  </div>

                  {cliente.ultimaVisita && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-2" />
                      Última visita: {new Date(cliente.ultimaVisita).toLocaleDateString()}
                    </div>
                  )}

                  {cliente.notas && <p className="text-sm text-muted-foreground line-clamp-2">{cliente.notas}</p>}

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => abrirDetalleCliente(cliente)}
                    >
                      <User className="h-3 w-3 mr-1" />
                      Ver Perfil
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog de detalles del cliente */}
        <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Perfil de {clienteSeleccionado?.nombre} {clienteSeleccionado?.apellidos}
              </DialogTitle>
              <DialogDescription>Información completa del cliente</DialogDescription>
            </DialogHeader>
            {clienteSeleccionado && (
              <div className="space-y-6">
                {/* Información básica */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre Completo</Label>
                    <p className="font-medium">
                      {clienteSeleccionado.nombre} {clienteSeleccionado.apellidos}
                    </p>
                  </div>
                  <div>
                    <Label>Teléfono</Label>
                    <p className="font-medium">{clienteSeleccionado.telefono}</p>
                  </div>
                  {clienteSeleccionado.email && (
                    <div>
                      <Label>Email</Label>
                      <p className="font-medium">{clienteSeleccionado.email}</p>
                    </div>
                  )}
                  {clienteSeleccionado.fechaNacimiento && (
                    <div>
                      <Label>Fecha de Nacimiento</Label>
                      <p className="font-medium">
                        {new Date(clienteSeleccionado.fechaNacimiento).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{clienteSeleccionado.visitas}</div>
                        <p className="text-sm text-muted-foreground">Visitas</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {clienteSeleccionado.ultimaVisita
                            ? Math.floor(
                                (Date.now() - new Date(clienteSeleccionado.ultimaVisita).getTime()) /
                                  (1000 * 60 * 60 * 24),
                              )
                            : "N/A"}
                        </div>
                        <p className="text-sm text-muted-foreground">Días desde última visita</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {clienteSeleccionado.visitas >= 10 ? "VIP" : "Regular"}
                        </div>
                        <p className="text-sm text-muted-foreground">Categoría</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Notas */}
                {clienteSeleccionado.notas && (
                  <div>
                    <Label>Notas</Label>
                    <p className="mt-1 p-3 bg-muted rounded-md">{clienteSeleccionado.notas}</p>
                  </div>
                )}

                {/* Acciones */}
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Editar Cliente</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Ver Historial
                  </Button>
                  <Button variant="outline">Enviar Encuesta</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
