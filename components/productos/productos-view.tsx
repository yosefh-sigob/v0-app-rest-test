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
  Edit,
  Trash2,
  Eye,
  Heart,
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
import { getImageSrc } from "@/lib/utils/image"
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
    tipo: (searchParams.get("tipo") as "Platillo" | "Producto" | "Botella") || undefined,
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
      } catch {
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

  const handleFilterChange = (key: keyof SearchProductosInput, value: string | number | boolean | undefined) => {
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
        await refreshData()
      } else {
        toast.error(result.message)
      }
    } catch {
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
        await refreshData()
      } else {
        toast.error(result.message)
      }
    } catch {
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
    await refreshData()
    setShowForm(false)
    setSelectedProducto(null)
    toast.success(selectedProducto ? "¡Producto actualizado exitosamente!" : "¡Producto creado exitosamente!")
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
    if (producto.Comedor)
      channels.push({ icon: <Home className="h-3 w-3" />, label: "Comedor", color: "bg-green-100 text-green-800" })
    if (producto.ADomicilio)
      channels.push({ icon: <Truck className="h-3 w-3" />, label: "Domicilio", color: "bg-blue-100 text-blue-800" })
    if (producto.Mostrador)
      channels.push({
        icon: <ShoppingCart className="h-3 w-3" />,
        label: "Mostrador",
        color: "bg-purple-100 text-purple-800",
      })
    if (producto.Enlinea)
      channels.push({
        icon: <Smartphone className="h-3 w-3" />,
        label: "En línea",
        color: "bg-orange-100 text-orange-800",
      })
    if (producto.EnMenuQR)
      channels.push({ icon: <QrCode className="h-3 w-3" />, label: "QR", color: "bg-gray-100 text-gray-800" })
    return channels
  }

  return (
    <div className="space-y-6 p-6">
      {/* Selector de Licencia */}
      <LicenseSelector currentLicense={currentLicense} onLicenseChange={setLicense} />

      {/* Header mejorado */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
            <p className="text-gray-600 mt-2">Administra tu catálogo de productos, platillos y bebidas</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package className="h-4 w-4" />
                <span>{data.total} productos totales</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{data.productos.filter((p) => p.Favorito).length} favoritos</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={refreshData} disabled={loading} className="bg-white">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Actualizar
            </Button>
            <LicenseGuard feature="gestionProductos">
              <Button
                onClick={() => {
                  setSelectedProducto(null)
                  setShowForm(true)
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Producto
              </Button>
            </LicenseGuard>
          </div>
        </div>
      </div>

      {/* Filtros mejorados */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5 text-orange-600" />
              Filtros de Búsqueda
            </CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              >
                <X className="h-4 w-4 mr-1" />
                Limpiar Filtros
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre o código..."
                value={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Tipo */}
            <Select
              value={filters.tipo || "all"}
              onValueChange={(value) => handleFilterChange("tipo", value === "all" ? undefined : value)}
            >
              <SelectTrigger className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                <SelectValue placeholder="Tipo de producto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="Platillo">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4" />
                    Platillo
                  </div>
                </SelectItem>
                <SelectItem value="Producto">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Producto
                  </div>
                </SelectItem>
                <SelectItem value="Botella">
                  <div className="flex items-center gap-2">
                    <Wine className="h-4 w-4" />
                    Botella
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Grupo */}
            <Select
              value={filters.grupoId?.toString() || "all"}
              onValueChange={(value) => handleFilterChange("grupoId", value === "all" ? undefined : Number(value))}
            >
              <SelectTrigger className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
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
              <SelectTrigger className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="activos">✅ Activos</SelectItem>
                <SelectItem value="favoritos">⭐ Favoritos</SelectItem>
                <SelectItem value="suspendidos">⏸️ Suspendidos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Controles de vista mejorados */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              {data.total} producto{data.total !== 1 ? "s" : ""} encontrado{data.total !== 1 ? "s" : ""}
            </span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                Filtrado
              </Badge>
            )}
          </div>
          {data.productos.length > 0 && (
            <div className="text-xs text-gray-500">
              Página {data.page} de {data.totalPages}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 mr-2">Vista:</span>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-orange-600 hover:bg-orange-700" : ""}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-orange-600 hover:bg-orange-700" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Lista de productos mejorada */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="h-40 bg-gray-200 rounded-md" />
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
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              {hasActiveFilters ? "No se encontraron productos" : "¡Comienza tu catálogo!"}
            </h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              {hasActiveFilters
                ? "Intenta ajustar los filtros de búsqueda para encontrar los productos que buscas"
                : "Agrega tu primer producto para comenzar a gestionar tu catálogo de platillos y bebidas"}
            </p>
            {!hasActiveFilters && (
              <LicenseGuard feature="gestionProductos">
                <Button
                  onClick={() => {
                    setSelectedProducto(null)
                    setShowForm(true)
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
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
              className={`group hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 ${
                producto.Favorito ? "border-l-yellow-400" : "border-l-transparent"
              } ${producto.Suspendido ? "opacity-60 border-dashed bg-gray-50" : "hover:border-l-orange-400"}`}
              onClick={() => handleView(producto)}
            >
              <CardContent className="p-0">
                <div className="space-y-0">
                  {/* Imagen */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={getImageSrc(producto.Imagen) || "/placeholder.svg"}
                      alt={producto.Nombredelproducto}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      {producto.Favorito && (
                        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Favorito
                        </Badge>
                      )}
                      {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                        {TIPO_ICONS[producto.TipoProducto]}
                        <span className="ml-1">{producto.TipoProducto}</span>
                      </Badge>
                    </div>
                  </div>

                  {/* Información */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg leading-tight text-gray-900 group-hover:text-orange-600 transition-colors">
                        {producto.Nombredelproducto}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Código: <span className="font-mono font-medium">{producto.ClaveProducto}</span>
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
                      {producto.Descripcion || "Sin descripción disponible"}
                    </p>

                    {/* Canales de venta */}
                    <div className="flex flex-wrap gap-1">
                      {getChannelBadges(producto)
                        .slice(0, 3)
                        .map((channel, index) => (
                          <Badge key={index} variant="secondary" className={`text-xs ${channel.color}`}>
                            {channel.icon}
                            <span className="ml-1">{channel.label}</span>
                          </Badge>
                        ))}
                      {getChannelBadges(producto).length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{getChannelBadges(producto).length - 3} más
                        </Badge>
                      )}
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-2 pt-2 border-t" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleView(producto)
                        }}
                        className="flex-1 h-9"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleToggleFavorite(producto)
                        }}
                        className="h-9 w-9 p-0"
                      >
                        {producto.Favorito ? (
                          <Heart className="h-4 w-4 text-red-500 fill-current" />
                        ) : (
                          <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
                        )}
                      </Button>
                      <LicenseGuard feature="gestionProductos" fallback={null}>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(producto)
                          }}
                          className="h-9 w-9 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(producto)
                          }}
                          className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </LicenseGuard>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="divide-y">
              {data.productos.map((producto) => (
                <div
                  key={producto.ProductoULID}
                  className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                    producto.Suspendido ? "opacity-60 bg-gray-25" : ""
                  }`}
                  onClick={() => handleView(producto)}
                >
                  <div className="flex items-center gap-6">
                    {/* Imagen pequeña */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={getImageSrc(producto.Imagen) || "/placeholder.svg"}
                        alt={producto.Nombredelproducto}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      {producto.Favorito && (
                        <div className="absolute -top-1 -right-1">
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        </div>
                      )}
                    </div>

                    {/* Información */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg text-gray-900 hover:text-orange-600 transition-colors">
                              {producto.Nombredelproducto}
                            </h3>
                            {producto.Suspendido && (
                              <Badge variant="destructive" className="text-xs">
                                Suspendido
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {producto.Descripcion || "Sin descripción disponible"}
                          </p>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-sm">
                              {TIPO_ICONS[producto.TipoProducto]}
                              <span className="ml-1">{producto.TipoProducto}</span>
                            </Badge>
                            <span className="text-sm text-gray-500">
                              Código: <span className="font-mono font-medium">{producto.ClaveProducto}</span>
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {getChannelBadges(producto).map((channel, index) => (
                              <Badge key={index} variant="secondary" className={`text-xs ${channel.color}`}>
                                {channel.icon}
                                <span className="ml-1">{channel.label}</span>
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleView(producto)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleToggleFavorite(producto)
                            }}
                            className="w-10 h-10 p-0"
                          >
                            {producto.Favorito ? (
                              <Heart className="h-4 w-4 text-red-500 fill-current" />
                            ) : (
                              <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
                            )}
                          </Button>
                          <LicenseGuard feature="gestionProductos" fallback={null}>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEdit(producto)
                              }}
                              className="w-10 h-10 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(producto)
                              }}
                              className="w-10 h-10 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </LicenseGuard>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Paginación mejorada */}
      {data.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, data.page - 1))}
                  className={`${data.page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-orange-50"}`}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNum)}
                      isActive={data.page === pageNum}
                      className={`cursor-pointer ${data.page === pageNum ? "bg-orange-600 text-white hover:bg-orange-700" : "hover:bg-orange-50"}`}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(data.totalPages, data.page + 1))}
                  className={`${data.page === data.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-orange-50"}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Modal de formulario - ANCHO 80% */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="w-[80vw] max-w-[80vw] max-h-[90vh] overflow-hidden p-0 gap-0">
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-orange-50 to-orange-100">
            <DialogTitle className="flex items-center gap-3 text-xl text-gray-900">
              {selectedProducto ? (
                <>
                  <div className="p-2 bg-orange-600 rounded-lg">
                    <Edit className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div>Editar Producto</div>
                    <div className="text-sm font-normal text-gray-600 mt-1">{selectedProducto.Nombredelproducto}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2 bg-orange-600 rounded-lg">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div>Nuevo Producto</div>
                    <div className="text-sm font-normal text-gray-600 mt-1">Agrega un nuevo producto a tu catálogo</div>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            <ProductoForm
              producto={selectedProducto}
              gruposProductos={gruposProductos}
              unidades={unidades}
              areasProduccion={areasProduccion}
              almacenes={almacenes}
              onSuccess={handleFormSuccess}
              onCancel={handleCloseForm}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de detalles - ANCHO 80% */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="w-[80vw] max-w-[80vw] max-h-[90vh] overflow-hidden p-0 gap-0">
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-blue-100">
            <DialogTitle className="flex items-center gap-3 text-xl text-gray-900">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <div>
                <div>Detalles del Producto</div>
                {selectedProducto && (
                  <div className="text-sm font-normal text-gray-600 mt-1">{selectedProducto.Nombredelproducto}</div>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
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
                onClose={() => setShowDetail(false)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmación de eliminación */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              ¿Suspender producto?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              El producto <strong>"{productoToDelete?.Nombredelproducto}"</strong> será marcado como suspendido y no
              estará disponible para la venta.
              <br />
              <br />
              Podrás reactivarlo más tarde desde la configuración del producto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Sí, suspender
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
