"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Plus, Search, Grid, List, Star, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { LicenseGuard } from "@/components/license-guard"
import { ProductoForm } from "@/components/productos/producto-form"
import { ProductoDetail } from "@/components/productos/producto-detail"
import { toggleFavoriteProducto, deleteProducto } from "@/actions/productos.actions"
import type { Producto } from "@/interfaces/database"
import { NivelLicencia } from "@/interfaces/database"
import type { SearchProductosInput } from "@/schemas/productos.schemas"

interface ProductosViewProps {
  productosData: {
    productos: Producto[]
    total: number
    page: number
    totalPages: number
  }
  gruposProductos: Array<{ id: number; nombre: string }>
  unidades: Array<{ id: number; nombre: string; abreviacion: string }>
  areasProduccion: Array<{ id: number; nombre: string }>
  almacenes: Array<{ id: number; nombre: string }>
  searchParams: SearchProductosInput
}

export function ProductosView({
  productosData,
  gruposProductos,
  unidades,
  areasProduccion,
  almacenes,
  searchParams,
}: ProductosViewProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // En producción, esto vendría de la sesión del usuario
  const currentLicense = NivelLicencia.PRO

  const { productos, total, page, totalPages } = productosData

  const productosActivos = productos.filter((p) => !p.Suspendido)
  const productosSuspendidos = productos.filter((p) => p.Suspendido)

  const updateSearchParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(urlSearchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete("page") // Reset page when filtering
    router.push(`/productos?${params.toString()}`)
  }

  const handleToggleFavorite = async (producto: Producto) => {
    try {
      const result = await toggleFavoriteProducto(producto.ProductoULID)
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Error al actualizar favorito")
    }
  }

  const handleDelete = async (producto: Producto) => {
    if (!confirm(`¿Estás seguro de eliminar el producto "${producto.Nombredelproducto}"?`)) {
      return
    }

    try {
      const result = await deleteProducto(producto.ProductoULID)
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Error al eliminar producto")
    }
  }

  const handleEdit = (producto: Producto) => {
    setSelectedProducto(producto)
    setIsFormOpen(true)
  }

  const handleView = (producto: Producto) => {
    setSelectedProducto(producto)
    setIsDetailOpen(true)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(urlSearchParams.toString())
    params.set("page", newPage.toString())
    router.push(`/productos?${params.toString()}`)
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground">
            Gestiona el catálogo de productos de tu restaurante ({total} productos)
          </p>
        </div>

        <LicenseGuard currentLicense={currentLicense} requiredFeature="ventaComedor">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedProducto(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <ProductoForm
                producto={selectedProducto}
                gruposProductos={gruposProductos}
                unidades={unidades}
                areasProduccion={areasProduccion}
                almacenes={almacenes}
                onSuccess={() => {
                  setIsFormOpen(false)
                  setSelectedProducto(null)
                }}
                onCancel={() => {
                  setIsFormOpen(false)
                  setSelectedProducto(null)
                }}
              />
            </DialogContent>
          </Dialog>
        </LicenseGuard>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar productos..."
            defaultValue={searchParams.search || ""}
            onChange={(e) => {
              const value = e.target.value
              setTimeout(() => updateSearchParams("search", value || null), 500)
            }}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select
            defaultValue={searchParams.tipo || "Platillo"}
            onValueChange={(value) => updateSearchParams("tipo", value || null)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Platillo">Platillo</SelectItem>
              <SelectItem value="Producto">Producto</SelectItem>
              <SelectItem value="Botella">Botella</SelectItem>
            </SelectContent>
          </Select>

          <Select
            defaultValue={searchParams.favorito?.toString() || "true"}
            onValueChange={(value) => updateSearchParams("favorito", value || null)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Favoritos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Favoritos</SelectItem>
              <SelectItem value="false">No favoritos</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <Tabs defaultValue="activos" className="w-full">
        <TabsList>
          <TabsTrigger value="activos">Activos ({productosActivos.length})</TabsTrigger>
          <TabsTrigger value="suspendidos">Suspendidos ({productosSuspendidos.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="activos" className="space-y-4">
          {productosActivos.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">No hay productos activos</h3>
                  <p className="text-muted-foreground">Comienza agregando productos a tu catálogo</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "space-y-4"
                }
              >
                {productosActivos.map((producto) => (
                  <ProductoCard
                    key={producto.ProductoULID}
                    producto={producto}
                    viewMode={viewMode}
                    onToggleFavorite={handleToggleFavorite}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                  />
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <Button variant="outline" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                    Anterior
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Página {page} de {totalPages}
                  </span>
                  <Button variant="outline" onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
                    Siguiente
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="suspendidos" className="space-y-4">
          {productosSuspendidos.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">No hay productos suspendidos</h3>
                  <p className="text-muted-foreground">Los productos suspendidos aparecerán aquí</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-4"
              }
            >
              {productosSuspendidos.map((producto) => (
                <ProductoCard
                  key={producto.ProductoULID}
                  producto={producto}
                  viewMode={viewMode}
                  onToggleFavorite={handleToggleFavorite}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog para ver detalles */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedProducto && (
            <ProductoDetail
              producto={selectedProducto}
              onClose={() => setIsDetailOpen(false)}
              onEdit={() => {
                setIsDetailOpen(false)
                setIsFormOpen(true)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface ProductoCardProps {
  producto: Producto
  viewMode: "grid" | "list"
  onToggleFavorite: (producto: Producto) => void
  onEdit: (producto: Producto) => void
  onDelete: (producto: Producto) => void
  onView: (producto: Producto) => void
}

function ProductoCard({ producto, viewMode, onToggleFavorite, onEdit, onDelete, onView }: ProductoCardProps) {
  if (viewMode === "list") {
    return (
      <Card className={producto.Suspendido ? "opacity-60" : ""}>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-lg font-semibold">{producto.Nombredelproducto.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{producto.Nombredelproducto}</h3>
                <Badge variant="outline" className="text-xs">
                  {producto.ClaveProducto}
                </Badge>
                {producto.Favorito && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">{producto.Descripcion}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={producto.Suspendido ? "destructive" : "default"} className="text-xs">
                  {producto.TipoProducto}
                </Badge>
                <div className="flex space-x-1">
                  {producto.Comedor && (
                    <Badge variant="outline" className="text-xs">
                      Comedor
                    </Badge>
                  )}
                  {producto.ADomicilio && (
                    <Badge variant="outline" className="text-xs">
                      Domicilio
                    </Badge>
                  )}
                  {producto.Mostrador && (
                    <Badge variant="outline" className="text-xs">
                      Mostrador
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  •••
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(producto)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Ver detalles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(producto)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleFavorite(producto)}>
                  <Star className="w-4 h-4 mr-2" />
                  {producto.Favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(producto)} className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`overflow-hidden ${producto.Suspendido ? "opacity-60" : ""}`}>
      <div className="aspect-square bg-muted flex items-center justify-center relative">
        <span className="text-2xl font-bold text-muted-foreground">
          {producto.Nombredelproducto.charAt(0).toUpperCase()}
        </span>
        {producto.Favorito && <Star className="absolute top-2 right-2 w-5 h-5 fill-yellow-400 text-yellow-400" />}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base line-clamp-1">{producto.Nombredelproducto}</CardTitle>
            <Badge variant="outline" className="text-xs mt-1">
              {producto.ClaveProducto}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                •••
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(producto)}>
                <Eye className="w-4 h-4 mr-2" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(producto)}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleFavorite(producto)}>
                <Star className="w-4 h-4 mr-2" />
                {producto.Favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(producto)} className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {producto.Descripcion && <CardDescription className="line-clamp-2">{producto.Descripcion}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={producto.Suspendido ? "destructive" : "default"}>{producto.TipoProducto}</Badge>
        </div>
        <div className="flex flex-wrap gap-1">
          {producto.Comedor && (
            <Badge variant="outline" className="text-xs">
              Comedor
            </Badge>
          )}
          {producto.ADomicilio && (
            <Badge variant="outline" className="text-xs">
              Domicilio
            </Badge>
          )}
          {producto.Mostrador && (
            <Badge variant="outline" className="text-xs">
              Mostrador
            </Badge>
          )}
          {producto.EnMenuQR && (
            <Badge variant="outline" className="text-xs">
              QR
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
