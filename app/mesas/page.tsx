"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Utensils,
  Users,
  Clock,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react"

export default function MesasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTable, setSelectedTable] = useState<any>(null)

  // Datos simulados de mesas
  const mesas = [
    {
      id: 1,
      number: 1,
      capacity: 4,
      status: "disponible",
      waiter: null,
      order: null,
      area: "Terraza",
      notes: "",
      lastCleaned: "14:30",
    },
    {
      id: 2,
      number: 2,
      capacity: 2,
      status: "ocupada",
      waiter: "Ana García",
      order: { id: "ORD-001", total: 156, items: 3, time: "45 min" },
      area: "Interior",
      notes: "Cliente VIP",
      lastCleaned: "13:15",
    },
    {
      id: 3,
      number: 3,
      capacity: 6,
      status: "ocupada",
      waiter: "Carlos López",
      order: { id: "ORD-002", total: 320, items: 5, time: "25 min" },
      area: "Interior",
      notes: "Celebración cumpleaños",
      lastCleaned: "12:45",
    },
    {
      id: 4,
      number: 4,
      capacity: 4,
      status: "reservada",
      waiter: null,
      order: null,
      area: "Ventana",
      notes: "Reserva 19:30 - Familia Rodríguez",
      lastCleaned: "14:00",
    },
    {
      id: 5,
      number: 5,
      capacity: 4,
      status: "ocupada",
      waiter: "María Rodríguez",
      order: { id: "ORD-003", total: 245, items: 4, time: "15 min" },
      area: "Terraza",
      notes: "",
      lastCleaned: "13:30",
    },
    {
      id: 6,
      number: 6,
      capacity: 2,
      status: "limpieza",
      waiter: null,
      order: null,
      area: "Interior",
      notes: "Limpieza profunda",
      lastCleaned: "En proceso",
    },
    {
      id: 7,
      number: 7,
      capacity: 8,
      status: "disponible",
      waiter: null,
      order: null,
      area: "Salón Privado",
      notes: "Mesa para grupos grandes",
      lastCleaned: "14:15",
    },
    {
      id: 8,
      number: 8,
      capacity: 4,
      status: "ocupada",
      waiter: "Luis Martín",
      order: { id: "ORD-004", total: 189, items: 2, time: "35 min" },
      area: "Ventana",
      notes: "Mesa con vista",
      lastCleaned: "13:00",
    },
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "disponible":
        return <CheckCircle className="h-4 w-4" />
      case "ocupada":
        return <Users className="h-4 w-4" />
      case "reservada":
        return <Clock className="h-4 w-4" />
      case "limpieza":
        return <Sparkles className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const filteredMesas = mesas.filter((mesa) => {
    const matchesSearch =
      mesa.number.toString().includes(searchTerm) ||
      mesa.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mesa.waiter?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || mesa.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    disponible: mesas.filter((m) => m.status === "disponible").length,
    ocupada: mesas.filter((m) => m.status === "ocupada").length,
    reservada: mesas.filter((m) => m.status === "reservada").length,
    limpieza: mesas.filter((m) => m.status === "limpieza").length,
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-orange-50/30 to-amber-50/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Mesas</h1>
          <p className="text-gray-600">Control y administración de todas las mesas</p>
        </div>
        <Button className="restaurant-gradient text-white">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Mesa
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="restaurant-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Disponibles</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.disponible}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="restaurant-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ocupadas</p>
                <p className="text-2xl font-bold text-red-600">{statusCounts.ocupada}</p>
              </div>
              <Users className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="restaurant-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reservadas</p>
                <p className="text-2xl font-bold text-amber-600">{statusCounts.reservada}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="restaurant-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Limpieza</p>
                <p className="text-2xl font-bold text-blue-600">{statusCounts.limpieza}</p>
              </div>
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="restaurant-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por número, área o mesero..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="ocupada">Ocupada</SelectItem>
                <SelectItem value="reservada">Reservada</SelectItem>
                <SelectItem value="limpieza">En Limpieza</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Mesas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMesas.map((mesa) => (
          <Card key={mesa.id} className="restaurant-card hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Mesa {mesa.number}</CardTitle>
                <Badge className={getStatusColor(mesa.status)}>
                  {getStatusIcon(mesa.status)}
                  <span className="ml-1 capitalize">{mesa.status}</span>
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {mesa.capacity} personas • {mesa.area}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mesa.waiter && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Mesero:</span>
                  <span className="font-medium">{mesa.waiter}</span>
                </div>
              )}

              {mesa.order && (
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-orange-800">Orden Activa</span>
                    <span className="text-sm font-bold text-orange-800">${mesa.order.total}</span>
                  </div>
                  <div className="text-xs text-orange-600">
                    {mesa.order.items} items • {mesa.order.time}
                  </div>
                </div>
              )}

              {mesa.notes && (
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <span className="font-medium">Notas:</span> {mesa.notes}
                </div>
              )}

              <div className="text-xs text-gray-500">Última limpieza: {mesa.lastCleaned}</div>

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => setSelectedTable(mesa)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Ver
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Mesa {selectedTable?.number}</DialogTitle>
                      <DialogDescription>Detalles completos de la mesa</DialogDescription>
                    </DialogHeader>
                    {selectedTable && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Estado</Label>
                            <Badge className={getStatusColor(selectedTable.status)}>{selectedTable.status}</Badge>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Capacidad</Label>
                            <p className="text-sm">{selectedTable.capacity} personas</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Área</Label>
                            <p className="text-sm">{selectedTable.area}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Última limpieza</Label>
                            <p className="text-sm">{selectedTable.lastCleaned}</p>
                          </div>
                        </div>

                        {selectedTable.waiter && (
                          <div>
                            <Label className="text-sm font-medium">Mesero asignado</Label>
                            <p className="text-sm">{selectedTable.waiter}</p>
                          </div>
                        )}

                        {selectedTable.order && (
                          <div className="bg-orange-50 p-3 rounded-lg">
                            <Label className="text-sm font-medium text-orange-800">Orden Activa</Label>
                            <div className="mt-1 space-y-1">
                              <p className="text-sm">ID: {selectedTable.order.id}</p>
                              <p className="text-sm">Total: ${selectedTable.order.total}</p>
                              <p className="text-sm">Items: {selectedTable.order.items}</p>
                              <p className="text-sm">Tiempo: {selectedTable.order.time}</p>
                            </div>
                          </div>
                        )}

                        {selectedTable.notes && (
                          <div>
                            <Label className="text-sm font-medium">Notas</Label>
                            <p className="text-sm bg-gray-50 p-2 rounded">{selectedTable.notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Edit className="h-3 w-3 mr-1" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMesas.length === 0 && (
        <Card className="restaurant-card">
          <CardContent className="p-8 text-center">
            <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron mesas</h3>
            <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
