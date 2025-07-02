"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { toast } from "sonner"
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Heart,
  HeartOff,
  Package,
  Utensils,
  Wine,
  ShoppingCart,
  Home,
  Truck,
  Smartphone,
  QrCode,
  X,
  RefreshCw,
} from "lucide-react"
import { ProductoForm } from "./producto-form"
import { ProductoDetail } from "./producto-detail"
import { LicenseGuard } from "@/components/license-guard"
import { LicenseSelector } from "@/components/license-selector"
import { useLicense } from "@/contexts/license-context"
import { getProductos, deleteProducto, toggleFavoriteProducto } from "@/actions/productos.actions"
import type { Producto } from "@/interfaces/database"
import type { SearchProductosInput } from "@/schemas/productos.schemas"

interface ProductosViewProps {
  initialData: {
    productos: Producto[]
    total: number
    page: number
    totalPages: number
    limit: number
  }
  gruposProductos: Array<{ id: number; nombre: string }>
  unidades: Array<{ id: number; nombre: string; abreviacion: string }>
  areasProduccion: Array<{ id: number; nombre: string }>
  almacenes: Array<{ id: number; nombre: string }>
}

const TIPO_ICONS = {
  Platillo: <Utensils className="h-4 w-4" />,
  Producto: <Package className="h-4 w-4" />,
  Botella: <Wine className="h-4 w-4" />,
}

export function ProductosView({
  initialData,
  gruposProductos,
  unidades,
  areasProduccion,
  almacenes,
}: ProductosViewProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentLicense, setLicense } = useLicense()

  // Estados con valores por defecto seguros
  const [data, setData] = useState(
    initialData || {
      productos: [],
      total: 0,
      page: 1,
      totalPages: 0,
      limit: 20,
    },
  )
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showForm, setShowForm] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productoToDelete, setProductoToDelete] = useState<Producto | null>(null)

  // Filtros con valores por defecto seguros
  const [filters, setFilters] = useState<SearchProductosInput>({
    search: searchParams.get("search") || "",
    tipo: (searchParams.get("tipo") as any) || undefined,
    favorito:
      searchParams.get("favorito") === "true" ? true : searchParams.get("favorito") === "false" ? false : undefined,
    suspendido:
      searchParams.get("suspendido") === "true" ? true : searchParams.get("suspendido") === "false" ? false : undefined,
    grupoId: searchParams.get("grupoId") ? Number(searchParams.get("grupoId")) : undefined,
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 20,
  })

  // Actualizar URL cuando cambien los filtros
  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.search) params.set("search", filters.search)
    if (filters.tipo) params.set("tipo", filters.tipo)
    if (filters.favorito !== undefined) params.set("favorito", filters.favorito.toString())
    if (filters.suspendido !== undefined) params.set("suspendido", filters.suspendido.toString())
    if (filters.grupoId) params.set("grupoId", filters.grupoId.toString())
    if (filters.page > 1) params.set("page", filters.page.toString())
    if (filters.limit !== 20) params.set("limit", filters.limit.toString())

    const newUrl = params.toString() ? `?${params.toString()}` : ""
    router.replace(`/productos${newUrl}`, { scroll: false })
  }, [filters, router])

  // Cargar productos cuando cambien los filtros
  useEffect(() => {
    const loadProductos = async () => {
      setLoading(true)
      try {
        const result = await getProductos(filters)
        if (result.success) {
          setData(result.data)
        }
      } catch (error) {
        toast.error("Error al cargar productos")
      } finally {
        setLoading(false)
      }
    }

    loadProductos()
  }, [filters])

  // Handlers
  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value, page: 1 }))
  }

  const handleFilterChange = (key: keyof SearchProductosInput, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  const handleEdit = (producto: Producto) => {
    setSelectedProducto(producto)
    setShowForm(true)
  }

  const handleView = (producto: Producto) => {
    setSelectedProducto(producto)
    setShowDetail(true)
  }

  const handleDelete = (producto: Producto) => {
    setProductoToDelete(producto)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!productoToDelete) return

    try {
      const result = await deleteProducto(productoToDelete.ProductoULID)
      if (result.success) {
        toast.success(result.message)
        // Recargar datos
        await refreshData()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Error al eliminar producto")
    } finally {
      setDeleteDialogOpen(false)
      setProductoToDelete(null)
    }
  }

  const handleToggleFavorite = async (producto: Producto) => {
    try {
      const result = await toggleFavoriteProducto(producto.ProductoULID)
      if (result.success) {
        toast.success(result.message)
        // Recargar datos
        await refreshData()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Error al actualizar favorito")
    }
  }

  const refreshData = async () => {
    const result = await getProductos(filters)
    if (result.success) {
      setData(result.data)
    }
  }

  const handleFormSuccess = async () => {
    // No cerrar el modal automáticamente, solo recargar datos
    await refreshData()
    toast.success("¡Producto guardado! Puedes seguir agregando más productos o cerrar el modal.")
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedProducto(null)
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      tipo: undefined,
      favorito: undefined,
      suspendido: undefined,
      grupoId: undefined,
      page: 1,
      limit: 20,
    })
  }

  const hasActiveFilters = useMemo(() => {
    return !!(
      filters.search ||
      filters.tipo ||
      filters.favorito !== undefined ||
      filters.suspendido !== undefined ||
      filters.grupoId
    )
  }, [filters])

  const getChannelBadges = (producto: Producto) => {
    const channels = []
    if (producto.Comedor) channels.push({ icon: <Home className="h-3 w-3" />, label: "Comedor" })
    if (producto.ADomicilio) channels.push({ icon: <Truck className="h-3 w-3" />, label: "Domicilio" })
    if (producto.Mostrador) channels.push({ icon: <ShoppingCart className="h-3 w-3" />, label: "Mostrador" })
    if (producto.Enlinea) channels.push({ icon: <Smartphone className="h-3 w-3" />, label: "En línea" })
    if (producto.EnMenuQR) channels.push({ icon: <QrCode className="h-3 w-3" />, label: "QR" })
    return channels
  }

  return (
    <div className="space-y-6">
      {/* Selector de Licencia */}
      <LicenseSelector currentLicense={currentLicense} onLicenseChange={setLicense} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground">Gestiona tu catálogo de productos y platillos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <LicenseGuard feature="gestionProductos">
            <Button
              onClick={() => {
                setSelectedProducto(null)
                setShowForm(true)
              }}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Producto
            </Button>
          </LicenseGuard>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="ml-auto text-orange-600 hover:text-orange-700"
              >
                <X className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                value={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tipo */}
            <Select
              value={filters.tipo || "all"}
              onValueChange={(value) => handleFilterChange("tipo", value === "all" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de producto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="Platillo">Platillo</SelectItem>
                <SelectItem value="Producto">Producto</SelectItem>
                <SelectItem value="Botella">Botella</SelectItem>
              </SelectContent>
            </Select>

            {/* Grupo */}
            <Select
              value={filters.grupoId?.toString() || "all"}
              onValueChange={(value) => handleFilterChange("grupoId", value === "all" ? undefined : Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {gruposProductos.map((grupo) => (
                  <SelectItem key={grupo.id} value={grupo.id.toString()}>
                    {grupo.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Estado */}
            <Select
              value={
                filters.favorito === true
                  ? "favoritos"
                  : filters.suspendido === true
                    ? "suspendidos"
                    : filters.suspendido === false
                      ? "activos"
                      : "all"
              }
              onValueChange={(value) => {
                if (value === "favoritos") {
                  handleFilterChange("favorito", true)
                  handleFilterChange("suspendido", undefined)
                } else if (value === "suspendidos") {
                  handleFilterChange("favorito", undefined)
                  handleFilterChange("suspendido", true)
                } else if (value === "activos") {
                  handleFilterChange("favorito", undefined)
                  handleFilterChange("suspendido", false)
                } else {
                  handleFilterChange("favorito", undefined)
                  handleFilterChange("suspendido", undefined)
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="activos">Activos</SelectItem>
                <SelectItem value="favoritos">Favoritos</SelectItem>
                <SelectItem value="suspendidos">Suspendidos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Controles de vista */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {data.total} producto{data.total !== 1 ? "s" : ""} encontrado{data.total !== 1 ? "s" : ""}
          </span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="text-xs">
              Filtrado
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Lista de productos */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="h-32 bg-gray-200 rounded-md" />
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : data.productos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3>
            <p className="text-muted-foreground text-center mb-4">
              {hasActiveFilters ? "Intenta ajustar los filtros de búsqueda" : "Comienza agregando tu primer producto"}
            </p>
            {!hasActiveFilters && (
              <LicenseGuard feature="gestionProductos">
                <Button
                  onClick={() => {
                    setSelectedProducto(null)
                    setShowForm(true)
                  }}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Primer Producto
                </Button>
              </LicenseGuard>
            )}
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.productos.map((producto) => (
            <Card
              key={producto.ProductoULID}
              className={`group hover:shadow-md transition-shadow ${
                producto.Suspendido ? "opacity-60 border-dashed" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Imagen */}
                  <div className="relative">
                    <img
                      src={`/placeholder.svg?height=120&width=160&text=${encodeURIComponent(producto.Nombredelproducto)}`}
                      alt={producto.Nombredelproducto}
                      className="w-full h-30 object-cover rounded-md"
                    />
                    {producto.Favorito && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">
                          <Star className="h-3 w-3 mr-1" />
                          Favorito
                        </Badge>
                      </div>
                    )}
                    {producto.Suspendido && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="destructive">Suspendido</Badge>
                      </div>
                    )}
                  </div>

                  {/* Información */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-sm leading-tight">{producto.Nombredelproducto}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4 bg-red-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(producto)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          <LicenseGuard feature="gestionProductos">
                            <DropdownMenuItem onClick={() => handleEdit(producto)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                          </LicenseGuard>
                          <DropdownMenuItem onClick={() => handleToggleFavorite(producto)}>
                            {producto.Favorito ? (
                              <>
                                <HeartOff className="h-4 w-4 mr-2" />
                                Quitar de favoritos
                              </>
                            ) : (
                              <>
                                <Heart className="h-4 w-4 mr-2" />
                                Agregar a favoritos
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <LicenseGuard feature="gestionProductos">
                            <DropdownMenuItem onClick={() => handleDelete(producto)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </LicenseGuard>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {producto.Descripcion || "Sin descripción"}
                    </p>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {TIPO_ICONS[producto.TipoProducto]}
                        {producto.TipoProducto}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {producto.ClaveProducto}
                      </Badge>
                    </div>

                    {/* Canales de venta */}
                    <div className="flex flex-wrap gap-1">
                      {getChannelBadges(producto)
                        .slice(0, 3)
                        .map((channel, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {channel.icon}
                            {channel.label}
                          </Badge>
                        ))}
                      {getChannelBadges(producto).length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{getChannelBadges(producto).length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {data.productos.map((producto) => (
                <div
                  key={producto.ProductoULID}
                  className={`p-4 hover:bg-muted/50 transition-colors ${producto.Suspendido ? "opacity-60" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Imagen pequeña */}
                    <img
                      src={`/placeholder.svg?height=64&width=64&text=${encodeURIComponent(producto.Nombredelproducto)}`}
                      alt={producto.Nombredelproducto}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    />

                    {/* Información */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{producto.Nombredelproducto}</h3>
                            {producto.Favorito && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                            {producto.Suspendido && (
                              <Badge variant="destructive" className="text-xs">
                                Suspendido
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{producto.Descripcion || "Sin descripción"}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {TIPO_ICONS[producto.TipoProducto]}
                              {producto.TipoProducto}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {producto.ClaveProducto}
                            </Badge>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(producto)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(producto)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleFavorite(producto)}>
                              {producto.Favorito ? (
                                <>
                                  <HeartOff className="h-4 w-4 mr-2" />
                                  Quitar de favoritos
                                </>
                              ) : (
                                <>
                                  <Heart className="h-4 w-4 mr-2" />
                                  Agregar a favoritos
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDelete(producto)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Paginación */}
      {data.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, data.page - 1))}
                  className={data.page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNum)}
                      isActive={data.page === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(data.totalPages, data.page + 1))}
                  className={data.page === data.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Modal de Formulario - Más ancho */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedProducto ? (
                <>
                  <Edit className="h-5 w-5" />
                  Editar Producto: {selectedProducto.Nombredelproducto}
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  Nuevo Producto
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <ProductoForm
            producto={selectedProducto}
            gruposProductos={gruposProductos}
            unidades={unidades}
            areasProduccion={areasProduccion}
            almacenes={almacenes}
            onSuccess={handleFormSuccess}
            onCancel={handleCloseForm}
          />
        </DialogContent>
      </Dialog>

      {/* Modal de Detalles */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Producto</DialogTitle>
          </DialogHeader>
          {selectedProducto && (
            <ProductoDetail
              producto={selectedProducto}
              gruposProductos={gruposProductos}
              unidades={unidades}
              areasProduccion={areasProduccion}
              almacenes={almacenes}
              onEdit={() => {
                setShowDetail(false)
                setShowForm(true)
              }}
              onClose={() => {
                setShowDetail(false)
                setSelectedProducto(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo de Confirmación de Eliminación */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción marcará el producto "{productoToDelete?.Nombredelproducto}" como suspendido. Podrás
              reactivarlo más tarde si es necesario.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
