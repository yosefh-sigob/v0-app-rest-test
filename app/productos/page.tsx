"use client"

"use server"

import { obtenerProductosPorEmpresa } from "@/actions/productos.actions"
import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Search, Edit, Star, Package } from "lucide-react"
import type { Producto } from "@/lib/types"

// Simulamos obtener la empresa del usuario autenticado
const EMPRESA_ID = "01HKQZX8Y9Z2M3N4P5Q6R7S8T9" // En producción vendría de la sesión

export default async function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas")
  const [dialogAbierto, setDialogAbierto] = useState(false)
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null)

  const result = await obtenerProductosPorEmpresa(EMPRESA_ID)

  if (!result.success) {
    return (
      <MainLayout title="Catálogo de Productos">
        <div className="container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="text-muted-foreground mt-2">{result.error}</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  setProductos(result.data || [])

  const categorias = [...new Set(productos.map((p) => p.categoria))]

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.codigo.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoriaFiltro === "todas" || producto.categoria === categoriaFiltro
    return coincideBusqueda && coincideCategoria
  })

  const toggleDisponibilidad = (productoId: string) => {
    setProductos(
      productos.map((producto) =>
        producto.id === productoId ? { ...producto, disponible: !producto.disponible } : producto,
      ),
    )
  }

  const toggleFavorito = (productoId: string) => {
    setProductos(
      productos.map((producto) =>
        producto.id === productoId ? { ...producto, favorito: !producto.favorito } : producto,
      ),
    )
  }

  const abrirEdicion = (producto: Producto) => {
    setProductoEditando(producto)
    setDialogAbierto(true)
  }

  const cerrarDialog = () => {
    setDialogAbierto(false)
    setProductoEditando(null)
  }

  return (
    <MainLayout title="Catálogo de Productos">
      <div className="space-y-6">
        {/* Header con acciones */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Productos</h2>
            <p className="text-muted-foreground">Gestiona tu catálogo de productos y menú</p>
          </div>
          <Button onClick={() => setDialogAbierto(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas las categorías</SelectItem>
              {categorias.map((categoria) => (
                <SelectItem key={categoria} value={categoria}>
                  {categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Estadísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productos.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{productos.filter((p) => p.disponible).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{productos.filter((p) => p.favorito).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categorias.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de productos */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {productosFiltrados.map((producto) => (
            <Card key={producto.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{producto.nombre}</CardTitle>
                      {producto.favorito && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                    <CardDescription>{producto.codigo}</CardDescription>
                  </div>
                  <Badge variant={producto.disponible ? "default" : "secondary"}>
                    {producto.disponible ? "Disponible" : "No disponible"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{producto.descripcion}</p>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{producto.categoria}</Badge>
                    <span className="text-lg font-semibold">${producto.precio.toFixed(2)}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => abrirEdicion(producto)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toggleFavorito(producto.id)}>
                      <Star className={`h-3 w-3 ${producto.favorito ? "text-yellow-500 fill-current" : ""}`} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toggleDisponibilidad(producto.id)}>
                      <Package className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog para crear/editar producto */}
        <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{productoEditando ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
              <DialogDescription>
                {productoEditando ? "Modifica los datos del producto" : "Completa la información del nuevo producto"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="codigo">Código</Label>
                  <Input id="codigo" defaultValue={productoEditando?.codigo} placeholder="P001" />
                </div>
                <div>
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select defaultValue={productoEditando?.categoria}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                      <SelectItem value="nueva">+ Nueva categoría</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="nombre">Nombre del Producto</Label>
                <Input id="nombre" defaultValue={productoEditando?.nombre} placeholder="Nombre del producto" />
              </div>

              <div>
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  defaultValue={productoEditando?.descripcion}
                  placeholder="Descripción del producto"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="precio">Precio</Label>
                  <Input
                    id="precio"
                    type="number"
                    step="0.01"
                    defaultValue={productoEditando?.precio}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="disponible" defaultChecked={productoEditando?.disponible ?? true} />
                    <Label htmlFor="disponible">Disponible</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="favorito" defaultChecked={productoEditando?.favorito ?? false} />
                    <Label htmlFor="favorito">Producto favorito</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={cerrarDialog}>
                Cancelar
              </Button>
              <Button onClick={cerrarDialog}>{productoEditando ? "Guardar Cambios" : "Crear Producto"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
