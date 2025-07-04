"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Grid3X3, List, Star, Eye, Edit, Trash2, Package, ShoppingCart, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
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
import { toast } from "@/hooks/use-toast"
import { ProductoForm } from "./producto-form"
import { ProductoDetail } from "./producto-detail"
import { getProductos, deleteProducto, toggleFavoriteProducto } from "@/actions/productos.actions"
import type { Producto } from "@/schemas/productos.schemas"

interface ProductosViewProps {
  initialProductos: Producto[]
}

export function ProductosView({ initialProductos = [] }: ProductosViewProps) {
  const [productos, setProductos] = useState<Producto[]>(initialProductos)
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>(initialProductos)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTipo, setSelectedTipo] = useState<string>("all")
  const [showFavoritos, setShowFavoritos] = useState(false)
  const [showSuspendidos, setShowSuspendidos] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<string>("nombre")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Filtrar y ordenar productos
  useEffect(() => {
    let filtered = [...productos]

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (producto) =>
          producto.Nombredelproducto.toLowerCase().includes(searchTerm.toLowerCase()) ||
          producto.ClaveProducto.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (producto.Descripcion && producto.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filtro por tipo
    if (selectedTipo !== "all") {
      filtered = filtered.filter((producto) => producto.TipoProducto === selectedTipo)
    }

    // Filtro por favoritos
    if (showFavoritos) {
      filtered = filtered.filter((producto) => producto.Favorito)
    }

    // Filtro por suspendidos
    if (showSuspendidos) {
      filtered = filtered.filter((producto) => producto.Suspendido)
    } else {
      filtered = filtered.filter((producto) => !producto.Suspendido)
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "nombre":
          return a.Nombredelproducto.localeCompare(b.Nombredelproducto)
        case "clave":
          return a.ClaveProducto.localeCompare(b.ClaveProducto)
        case "tipo":
          return a.TipoProducto.localeCompare(b.TipoProducto)
        case "fecha":
          return new Date(b.Fecha_UltimoCambio || "").getTime() - new Date(a.Fecha_UltimoCambio || "").getTime()
        default:
          return 0
      }
    })

    setFilteredProductos(filtered)
  }, [productos, searchTerm, selectedTipo, showFavoritos, showSuspendidos, sortBy])

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      const result = await getProductos({ page: 1, limit: 100 })
      if (result.success && result.data) {
        setProductos(result.data.productos)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (producto: Producto) => {
    try {
      const result = await deleteProducto(producto.ProductoULID)
      if (result.success) {
        setProductos((prev) => prev.filter((p) => p.ProductoULID !== producto.ProductoULID))
        toast({
          title: "Éxito",
          description: "Producto eliminado correctamente",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "No se pudo eliminar el producto",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar el producto",
        variant: "destructive",
      })
    }
  }

  const handleToggleFavorito = async (producto: Producto) => {
    try {
      const result = await toggleFavoriteProducto(producto.ProductoULID)
      if (result.success) {
        setProductos((prev) =>
          prev.map((p) => (p.ProductoULID === producto.ProductoULID ? { ...p, Favorito: !p.Favorito } : p)),
        )
        toast({
          title: "Éxito",
          description: `Producto ${!producto.Favorito ? "agregado a" : "removido de"} favoritos`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al actualizar favorito",
        variant: "destructive",
      })
    }
  }

  const handleProductoCreated = (newProducto: Producto) => {
    setProductos((prev) => [newProducto, ...prev])
    setIsCreateOpen(false)
    toast({
      title: "Éxito",
      description: "Producto creado correctamente",
    })
  }

  const handleProductoUpdated = (updatedProducto: Producto) => {
    setProductos((prev) => prev.map((p) => (p.ProductoULID === updatedProducto.ProductoULID ? updatedProducto : p)))
    setIsEditOpen(false)
    setSelectedProducto(null)
    toast({
      title: "Éxito",
      description: "Producto actualizado correctamente",
    })
  }

  const getProductoIcon = (tipo: string) => {
    switch (tipo) {
      case "Platillo":
        return <Utensils className="h-4 w-4" />
      case "Botella":
        return <ShoppingCart className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getProductoColor = (tipo: string) => {
    switch (tipo) {
      case "Platillo":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Botella":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const stats = {
    total: productos.length,
    platillos: productos.filter((p) => p.TipoProducto === "Platillo").length,
    productos: productos.filter((p) => p.TipoProducto === "Producto").length,
    botellas: productos.filter((p) => p.TipoProducto === "Botella").length,
    favoritos: productos.filter((p) => p.Favorito).length,
    suspendidos: productos.filter((p) => p.Suspendido).length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">🍽️ Gestión de Productos</h1>
            <p className="text-orange-100">Administra tu catálogo de productos, platillos y bebidas</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-orange-100">Total</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">{stats.favoritos}</div>
              <div className="text-sm text-orange-100">Favoritos</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">{stats.platillos}</div>
              <div className="text-sm text-orange-100">Platillos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 flex flex-col sm:flex-row gap-4">
              {/* Búsqueda */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtros */}
              <div className="flex gap-2">
                <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="Platillo">🍽️ Platillos</SelectItem>
                    <SelectItem value="Producto">📦 Productos</SelectItem>
                    <SelectItem value="Botella">🍷 Botellas</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nombre">Por nombre</SelectItem>
                    <SelectItem value="clave">Por clave</SelectItem>
                    <SelectItem value="tipo">Por tipo</SelectItem>
                    <SelectItem value="fecha">Por fecha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <Switch id="favoritos" checked={showFavoritos} onCheckedChange={setShowFavoritos} />
                <Label htmlFor="favoritos" className="text-sm">
                  ⭐ Favoritos
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="suspendidos" checked={showSuspendidos} onCheckedChange={setShowSuspendidos} />
                <Label htmlFor="suspendidos" className="text-sm">
                  🚫 Suspendidos
                </Label>
              </div>

              <Separator orientation="vertical" className="h-6" />

              <div className="flex items-center gap-1 border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setIsCreateOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Producto
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Lista de productos */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredProductos.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No hay productos</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedTipo !== "all" || showFavoritos || showSuspendidos
                ? "No se encontraron productos con los filtros aplicados"
                : "Comienza creando tu primer producto"}
            </p>
            {!searchTerm && selectedTipo === "all" && !showFavoritos && !showSuspendidos && (
              <Button onClick={() => setIsCreateOpen(true)} className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Crear Primer Producto
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-2"
          }
        >
          {filteredProductos.map((producto) => (
            <Card
              key={producto.ProductoULID}
              className={`group hover:shadow-lg transition-all duration-200 cursor-pointer ${
                viewMode === "list" ? "hover:bg-gray-50" : ""
              }`}
              onClick={() => {
                setSelectedProducto(producto)
                setIsDetailOpen(true)
              }}
            >
              <CardContent className={viewMode === "grid" ? "p-4" : "p-3"}>
                {viewMode === "grid" ? (
                  <div className="space-y-3">
                    {/* Imagen */}
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {producto.Imagen ? (
                        <img
                          src={producto.Imagen || "/placeholder.svg"}
                          alt={producto.Nombredelproducto}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          {getProductoIcon(producto.TipoProducto)}
                        </div>
                      )}

                      {/* Badges flotantes */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        {producto.Favorito && (
                          <Badge className="bg-yellow-500 text-white">
                            <Star className="h-3 w-3" />
                          </Badge>
                        )}
                        {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
                      </div>

                      {/* Botón de favorito */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleToggleFavorito(producto)
                        }}
                      >
                        <Star className={`h-4 w-4 ${producto.Favorito ? "fill-yellow-400 text-yellow-400" : ""}`} />
                      </Button>
                    </div>

                    {/* Información */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{producto.Nombredelproducto}</h3>
                          <p className="text-xs text-gray-500">{producto.ClaveProducto}</p>
                        </div>
                        <Badge className={`ml-2 text-xs ${getProductoColor(producto.TipoProducto)}`}>
                          {getProductoIcon(producto.TipoProducto)}
                          <span className="ml-1">{producto.TipoProducto}</span>
                        </Badge>
                      </div>

                      {producto.Descripcion && (
                        <p className="text-xs text-gray-600 line-clamp-2">{producto.Descripcion}</p>
                      )}

                      {/* Canales de venta */}
                      <div className="flex flex-wrap gap-1">
                        {producto.Comedor && (
                          <Badge variant="outline" className="text-xs">
                            🏠 Comedor
                          </Badge>
                        )}
                        {producto.ADomicilio && (
                          <Badge variant="outline" className="text-xs">
                            🚚 Domicilio
                          </Badge>
                        )}
                        {producto.Mostrador && (
                          <Badge variant="outline" className="text-xs">
                            🏪 Mostrador
                          </Badge>
                        )}
                        {producto.Enlinea && (
                          <Badge variant="outline" className="text-xs">
                            💻 Online
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProducto(producto)
                          setIsDetailOpen(true)
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProducto(producto)
                          setIsEditOpen(true)
                        }}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Editar
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. El producto "{producto.Nombredelproducto}" será
                              eliminado permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(producto)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ) : (
                  // Vista de lista
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {producto.Imagen ? (
                        <img
                          src={producto.Imagen || "/placeholder.svg"}
                          alt={producto.Nombredelproducto}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        getProductoIcon(producto.TipoProducto)
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{producto.Nombredelproducto}</h3>
                        {producto.Favorito && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                        {producto.Suspendido && (
                          <Badge variant="destructive" className="text-xs">
                            Suspendido
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{producto.ClaveProducto}</p>
                      {producto.Descripcion && <p className="text-sm text-gray-600 truncate">{producto.Descripcion}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={getProductoColor(producto.TipoProducto)}>
                        {getProductoIcon(producto.TipoProducto)}
                        <span className="ml-1">{producto.TipoProducto}</span>
                      </Badge>

                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedProducto(producto)
                            setIsDetailOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedProducto(producto)
                            setIsEditOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`${producto.Favorito ? "text-yellow-500" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleFavorito(producto)
                          }}
                        >
                          <Star className={`h-4 w-4 ${producto.Favorito ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de creación */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="w-[80vw] max-w-[80vw] max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold">✨ Crear Nuevo Producto</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0">
            <ProductoForm onSuccess={handleProductoCreated} onCancel={() => setIsCreateOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de edición */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="w-[80vw] max-w-[80vw] max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold">✏️ Editar Producto</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0">
            {selectedProducto && (
              <ProductoForm
                producto={selectedProducto}
                onSuccess={handleProductoUpdated}
                onCancel={() => {
                  setIsEditOpen(false)
                  setSelectedProducto(null)
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de detalles */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="w-[80vw] max-w-[80vw] max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold">👁️ Detalles del Producto</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0">
            {selectedProducto && (
              <ProductoDetail
                producto={selectedProducto}
                onEdit={() => {
                  setIsDetailOpen(false)
                  setIsEditOpen(true)
                }}
                onClose={() => {
                  setIsDetailOpen(false)
                  setSelectedProducto(null)
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
