"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Search, Plus, Grid3X3, List, Eye, Heart, Edit, Trash2, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { LicenseGuard } from "@/components/license-guard"
import { ProductoForm } from "./producto-form"
import { ProductoDetail } from "./producto-detail"
import { ProductosLoading } from "./productos-loading"
import { getProductos, deleteProducto, toggleFavoriteProducto } from "@/actions/productos.actions"
import type { Producto } from "@/interfaces/database"
import type { SearchProductosInput } from "@/schemas/productos.schemas"

interface ProductosData {
  productos: Producto[]
  total: number
  page: number
  totalPages: number
  limit: number
}

interface ProductosViewProps {
  initialData: ProductosData
}

export function ProductosView({ initialData }: ProductosViewProps) {
  const [data, setData] = useState<ProductosData>(initialData)
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Filtros
  const [filters, setFilters] = useState<SearchProductosInput>({
    search: "",
    tipo: "all",
    favorito: "all",
    suspendido: false,
    page: 1,
    limit: 20,
  })

  // Cargar productos
  const loadProductos = async (newFilters: SearchProductosInput) => {
    setLoading(true)
    try {
      const result = await getProductos(newFilters)
      if (result.success) {
        setData(result.data)
        setFilters(newFilters)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Error al cargar productos")
    } finally {
      setLoading(false)
    }
  }

  // Manejar búsqueda
  const handleSearch = (search: string) => {
    const newFilters = { ...filters, search, page: 1 }
    loadProductos(newFilters)
  }

  // Manejar filtros
  const handleFilterChange = (key: keyof SearchProductosInput, value: any) => {
    const newFilters = { ...filters, [key]: value, page: 1 }
    loadProductos(newFilters)
  }

  // Manejar paginación
  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page }
    loadProductos(newFilters)
  }

  // Manejar favoritos
  const handleToggleFavorite = async (producto: Producto) => {
    startTransition(async () => {
      const result = await toggleFavoriteProducto(producto.ProductoULID)
      if (result.success) {
        toast.success(result.message)
        // Recargar datos
        loadProductos(filters)
      } else {
        toast.error(result.message)
      }
    })
  }

  // Manejar eliminación
  const handleDelete = async (producto: Producto) => {
    startTransition(async () => {
      const result = await deleteProducto(producto.ProductoULID)
      if (result.success) {
        toast.success(result.message)
        // Recargar datos
        loadProductos(filters)
      } else {
        toast.error(result.message)
      }
    })
  }

  // Manejar ver detalles
  const handleViewDetails = (producto: Producto) => {
    setSelectedProduct(producto)
    setShowDetailModal(true)
  }

  // Manejar edición
  const handleEdit = (producto: Producto) => {
    setSelectedProduct(producto)
    setShowCreateModal(true)
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Platillo":
        return "bg-green-100 text-green-800"
      case "Producto":
        return "bg-blue-100 text-blue-800"
      case "Botella":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading && data.productos.length === 0) {
    return <ProductosLoading />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Productos</h1>
          <p className="text-muted-foreground">Gestiona tu catálogo de productos</p>
        </div>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedProduct(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[80vw] max-w-none max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedProduct ? "Editar Producto" : "Crear Producto"}</DialogTitle>
            </DialogHeader>
            <ProductoForm
              producto={selectedProduct}
              onSuccess={() => {
                setShowCreateModal(false)
                setSelectedProduct(null)
                loadProductos(filters)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar productos..."
                  value={filters.search || ""}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filters.tipo || "all"} onValueChange={(value) => handleFilterChange("tipo", value || "all")}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="Platillo">Platillo</SelectItem>
                <SelectItem value="Producto">Producto</SelectItem>
                <SelectItem value="Botella">Botella</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.favorito === undefined ? "all" : filters.favorito.toString()}
              onValueChange={(value) => handleFilterChange("favorito", value === "all" ? undefined : value === "true")}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Favoritos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="true">Solo favoritos</SelectItem>
                <SelectItem value="false">No favoritos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Controles de vista */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {data.total} producto{data.total !== 1 ? "s" : ""} encontrado{data.total !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Lista de productos */}
      {loading ? (
        <ProductosLoading />
      ) : data.productos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">No hay productos</h3>
              <p className="text-muted-foreground">No se encontraron productos con los filtros aplicados</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-4"
          }
        >
          {data.productos.map((producto) => (
            <Card key={producto.ProductoULID} className={viewMode === "list" ? "flex" : ""}>
              <CardHeader className={viewMode === "list" ? "flex-1" : ""}>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-base">{producto.Nombredelproducto}</CardTitle>
                    <CardDescription className="text-sm">{producto.Descripcion}</CardDescription>
                  </div>
                  {producto.Favorito && <Heart className="h-4 w-4 text-red-500 fill-current" />}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getTipoColor(producto.TipoProducto)}>{producto.TipoProducto}</Badge>
                  <Badge variant="outline" className="text-xs">
                    {producto.ClaveProducto}
                  </Badge>
                  {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
                </div>
              </CardHeader>
              <CardContent className={viewMode === "list" ? "flex items-center gap-2" : "pt-0"}>
                <div className="flex items-center gap-1">
                  {/* Botón Ver - Siempre disponible */}
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(producto)}>
                    <Eye className="h-4 w-4" />
                  </Button>

                  {/* Botón Favorito - Siempre disponible */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFavorite(producto)}
                    disabled={isPending}
                  >
                    <Heart className={`h-4 w-4 ${producto.Favorito ? "text-red-500 fill-current" : ""}`} />
                  </Button>

                  {/* Botón Editar - Solo con licencia */}
                  <LicenseGuard
                    feature="productos.editar"
                    fallback={
                      <Button variant="outline" size="sm" disabled>
                        <Edit className="h-4 w-4" />
                      </Button>
                    }
                  >
                    <Button variant="outline" size="sm" onClick={() => handleEdit(producto)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </LicenseGuard>

                  {/* Botón Eliminar - Solo con licencia */}
                  <LicenseGuard
                    feature="productos.eliminar"
                    fallback={
                      <Button variant="outline" size="sm" disabled>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    }
                  >
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" disabled={isPending}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción marcará el producto "{producto.Nombredelproducto}" como suspendido. ¿Estás
                            seguro?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(producto)}>Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </LicenseGuard>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Paginación */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(data.page - 1)}
            disabled={data.page === 1 || loading}
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground">
            Página {data.page} de {data.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(data.page + 1)}
            disabled={data.page === data.totalPages || loading}
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Modal de detalles */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="w-[80vw] max-w-none max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Producto</DialogTitle>
          </DialogHeader>
          {selectedProduct && <ProductoDetail producto={selectedProduct} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
