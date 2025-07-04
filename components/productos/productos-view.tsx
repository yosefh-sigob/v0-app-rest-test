"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import {
  Plus,
  Search,
  Filter,
  Package,
  Utensils,
  Wine,
  Star,
  Edit,
  Trash2,
  Eye,
  Home,
  Truck,
  ShoppingCart,
  Smartphone,
  QrCode,
  Heart,
  AlertCircle,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
} from "lucide-react"
import { ProductoForm } from "./producto-form"
import { ProductoDetail } from "./producto-detail"
import { deleteProducto, toggleFavoriteProducto } from "@/actions/productos.actions"
import { getImageSrc } from "@/lib/utils/image"
import type { Producto } from "@/interfaces/database"

interface ProductosViewProps {
  productos: Producto[]
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

type ViewMode = "grid" | "list"
type SortField = "nombre" | "codigo" | "tipo" | "fecha"
type SortOrder = "asc" | "desc"

export function ProductosView({
  productos,
  gruposProductos,
  unidades,
  areasProduccion,
  almacenes,
}: ProductosViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTipo, setSelectedTipo] = useState<string>("all")
  const [selectedGrupo, setSelectedGrupo] = useState<string>("all")
  const [selectedEstado, setSelectedEstado] = useState<string>("all")
  const [showForm, setShowForm] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null)
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortField, setSortField] = useState<SortField>("nombre")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")

  // Filtros y búsqueda
  const filteredProductos = useMemo(() => {
    const filtered = productos.filter((producto) => {
      const matchesSearch =
        producto.Nombredelproducto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.ClaveProducto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (producto.Descripcion && producto.Descripcion.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesTipo = selectedTipo === "all" || producto.TipoProducto === selectedTipo
      const matchesGrupo = selectedGrupo === "all" || producto.GrupoProductoID?.toString() === selectedGrupo
      const matchesEstado =
        selectedEstado === "all" ||
        (selectedEstado === "activo" && !producto.Suspendido) ||
        (selectedEstado === "suspendido" && producto.Suspendido) ||
        (selectedEstado === "favorito" && producto.Favorito)

      return matchesSearch && matchesTipo && matchesGrupo && matchesEstado
    })

    // Ordenamiento
    filtered.sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortField) {
        case "nombre":
          aValue = a.Nombredelproducto.toLowerCase()
          bValue = b.Nombredelproducto.toLowerCase()
          break
        case "codigo":
          aValue = a.ClaveProducto.toLowerCase()
          bValue = b.ClaveProducto.toLowerCase()
          break
        case "tipo":
          aValue = a.TipoProducto.toLowerCase()
          bValue = b.TipoProducto.toLowerCase()
          break
        case "fecha":
          aValue = new Date(a.FechaActualizacion).getTime()
          bValue = new Date(b.FechaActualizacion).getTime()
          break
        default:
          aValue = a.Nombredelproducto.toLowerCase()
          bValue = b.Nombredelproducto.toLowerCase()
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [productos, searchTerm, selectedTipo, selectedGrupo, selectedEstado, sortField, sortOrder])

  const handleCreateProducto = () => {
    setEditingProducto(null)
    setShowForm(true)
  }

  const handleEditProducto = (producto: Producto) => {
    setEditingProducto(producto)
    setShowForm(true)
  }

  const handleViewProducto = (producto: Producto) => {
    setSelectedProducto(producto)
    setShowDetail(true)
  }

  const handleDeleteProducto = async (producto: Producto) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar "${producto.Nombredelproducto}"?`)) {
      try {
        const result = await deleteProducto(producto.ProductoULID)
        if (result.success) {
          toast.success(result.message)
          window.location.reload()
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        toast.error("Error al eliminar el producto")
      }
    }
  }

  const handleToggleFavorite = async (producto: Producto) => {
    try {
      const result = await toggleFavoriteProducto(producto.ProductoULID)
      if (result.success) {
        toast.success(result.message)
        window.location.reload()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Error al actualizar el producto")
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingProducto(null)
    window.location.reload()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingProducto(null)
  }

  const handleDetailClose = () => {
    setShowDetail(false)
    setSelectedProducto(null)
  }

  const getChannelBadges = (producto: Producto) => {
    const channels = []
    if (producto.Comedor) channels.push({ icon: <Home className="h-3 w-3" />, label: "Comedor" })
    if (producto.ADomicilio) channels.push({ icon: <Truck className="h-3 w-3" />, label: "Domicilio" })
    if (producto.Mostrador) channels.push({ icon: <ShoppingCart className="h-3 w-3" />, label: "Mostrador" })
    if (producto.Enlinea) channels.push({ icon: <Smartphone className="h-3 w-3" />, label: "En línea" })
    if (producto.EnMenuQR) channels.push({ icon: <QrCode className="h-3 w-3" />, label: "QR" })
    return channels
  }

  const stats = {
    total: productos.length,
    activos: productos.filter((p) => !p.Suspendido).length,
    favoritos: productos.filter((p) => p.Favorito).length,
    suspendidos: productos.filter((p) => p.Suspendido).length,
  }

  return (
    <div className="space-y-8">
      {/* Header con estadísticas */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestión de Productos</h1>
            <p className="text-orange-100">Administra tu catálogo de productos de manera eficiente</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-orange-100">Total</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">{stats.activos}</div>
              <div className="text-sm text-orange-100">Activos</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">{stats.favoritos}</div>
              <div className="text-sm text-orange-100">Favoritos</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">{stats.suspendidos}</div>
              <div className="text-sm text-orange-100">Suspendidos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controles y filtros */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              Filtros y Búsqueda
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button onClick={handleCreateProducto} className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Produto
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Búsqueda */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Filtro por tipo */}
            <Select value={selectedTipo} onValueChange={setSelectedTipo}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Tipo" />
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

            {/* Filtro por grupo */}
            <Select value={selectedGrupo} onValueChange={setSelectedGrupo}>
              <SelectTrigger className="h-11">
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

            {/* Filtro por estado */}
            <Select value={selectedEstado} onValueChange={setSelectedEstado}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="activo">Activos</SelectItem>
                <SelectItem value="suspendido">Suspendidos</SelectItem>
                <SelectItem value="favorito">Favoritos</SelectItem>
              </SelectContent>
            </Select>

            {/* Ordenamiento */}
            <div className="flex gap-2">
              <Select
                value={`${sortField}-${sortOrder}`}
                onValueChange={(value) => {
                  const [field, order] = value.split("-") as [SortField, SortOrder]
                  setSortField(field)
                  setSortOrder(order)
                }}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nombre-asc">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-4 w-4" />
                      Nombre A-Z
                    </div>
                  </SelectItem>
                  <SelectItem value="nombre-desc">
                    <div className="flex items-center gap-2">
                      <SortDesc className="h-4 w-4" />
                      Nombre Z-A
                    </div>
                  </SelectItem>
                  <SelectItem value="codigo-asc">Código A-Z</SelectItem>
                  <SelectItem value="codigo-desc">Código Z-A</SelectItem>
                  <SelectItem value="tipo-asc">Tipo A-Z</SelectItem>
                  <SelectItem value="tipo-desc">Tipo Z-A</SelectItem>
                  <SelectItem value="fecha-desc">Más recientes</SelectItem>
                  <SelectItem value="fecha-asc">Más antiguos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Resultados */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              Mostrando {filteredProductos.length} de {productos.length} produtos
            </span>
            {(searchTerm || selectedTipo !== "all" || selectedGrupo !== "all" || selectedEstado !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedTipo("all")
                  setSelectedGrupo("all")
                  setSelectedEstado("all")
                }}
              >
                Limpiar filtros
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lista de produtos */}
      {filteredProductos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron produtos</h3>
            <p className="text-gray-600 text-center mb-4">
              {searchTerm || selectedTipo !== "all" || selectedGrupo !== "all" || selectedEstado !== "all"
                ? "Intenta ajustar los filtros de búsqueda"
                : "Comienza creando tu primer produto"}
            </p>
            {!searchTerm && selectedTipo === "all" && selectedGrupo === "all" && selectedEstado === "all" && (
              <Button onClick={handleCreateProducto} className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Crear Primeiro Produto
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProductos.map((producto) => (
            <Card
              key={producto.ProductoULID}
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-orange-200"
              onClick={() => handleViewProducto(producto)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={getImageSrc(producto.Imagen) || "/placeholder.svg"}
                    alt={producto.Nombredelproducto}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    {producto.Favorito && (
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Favorito
                      </Badge>
                    )}
                    {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                      {TIPO_ICONS[producto.TipoProducto]}
                      <span className="ml-1 text-xs">{producto.TipoProducto}</span>
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-t-lg" />
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                      {producto.Nombredelproducto}
                    </h3>
                    <p className="text-sm text-gray-600 font-mono">{producto.ClaveProducto}</p>
                  </div>

                  {producto.Descripcion && <p className="text-sm text-gray-600 line-clamp-2">{producto.Descripcion}</p>}

                  {/* Canales de venta */}
                  <div className="flex flex-wrap gap-1">
                    {getChannelBadges(producto)
                      .slice(0, 3)
                      .map((channel, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                          {channel.icon}
                          <span className="ml-1">{channel.label}</span>
                        </Badge>
                      ))}
                    {getChannelBadges(producto).length > 3 && (
                      <Badge variant="secondary" className="text-xs px-2 py-1">
                        +{getChannelBadges(producto).length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleToggleFavorite(producto)
                        }}
                        className={`h-8 w-8 p-0 ${producto.Favorito ? "text-yellow-500" : "text-gray-400"}`}
                      >
                        <Heart className={`h-4 w-4 ${producto.Favorito ? "fill-current" : ""}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewProducto(producto)
                        }}
                        className="h-8 w-8 p-0 text-blue-600"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditProducto(producto)
                        }}
                        className="h-8 w-8 p-0 text-green-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteProducto(producto)
                        }}
                        className="h-8 w-8 p-0 text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {new Date(producto.FechaActualizacion).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Vista de lista */
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredProductos.map((producto) => (
                <div
                  key={producto.ProductoULID}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleViewProducto(producto)}
                >
                  <img
                    src={getImageSrc(producto.Imagen) || "/placeholder.svg"}
                    alt={producto.Nombredelproducto}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{producto.Nombredelproducto}</h3>
                      {producto.Favorito && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      {producto.Suspendido && (
                        <Badge variant="destructive" className="text-xs">
                          Suspendido
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-mono">{producto.ClaveProducto}</span>
                      <div className="flex items-center gap-1">
                        {TIPO_ICONS[producto.TipoProducto]}
                        {producto.TipoProducto}
                      </div>
                      <span>{getChannelBadges(producto).length} canales</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleFavorite(producto)
                      }}
                      className={`h-8 w-8 p-0 ${producto.Favorito ? "text-yellow-500" : "text-gray-400"}`}
                    >
                      <Heart className={`h-4 w-4 ${producto.Favorito ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditProducto(producto)
                      }}
                      className="h-8 w-8 p-0 text-green-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteProducto(producto)
                      }}
                      className="h-8 w-8 p-0 text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de formulario */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="overflow-hidden">
          <DialogHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 -m-6 mb-0">
            <DialogTitle className="text-2xl font-bold">
              {editingProducto ? "Editar Produto" : "Crear Nuevo Produto"}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
            <ProductoForm
              producto={editingProducto}
              gruposProductos={gruposProductos}
              unidades={unidades}
              areasProduccion={areasProduccion}
              almacenes={almacenes}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de detalles */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="overflow-hidden">
          <DialogHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 -m-6 mb-0">
            <DialogTitle className="text-2xl font-bold">Detalles del Produto</DialogTitle>
          </DialogHeader>
          <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
            {selectedProducto && (
              <ProductoDetail
                producto={selectedProducto}
                gruposProductos={gruposProductos}
                unidades={unidades}
                areasProduccion={areasProduccion}
                almacenes={almacenes}
                onEdit={() => {
                  setShowDetail(false)
                  handleEditProducto(selectedProducto)
                }}
                onClose={handleDetailClose}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
