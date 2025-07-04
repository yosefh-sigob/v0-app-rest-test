"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProductoForm } from "./producto-form"
import { ProductoDetail } from "./producto-detail"
import {
  Plus,
  Search,
  Grid3X3,
  List,
  Star,
  StarOff,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Package,
  Heart,
  AlertTriangle,
  TrendingUp,
  BarChart3,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import {
  alternarFavoritoAction,
  alternarSuspendidoAction,
  eliminarProductoAction,
  obtenerProductosAction,
} from "@/actions/productos.actions"
import { ProductosService, type Producto } from "@/lib/services/productos.service"

interface ProductosViewProps {
  productosIniciales: Producto[]
  datosRelacionados: {
    grupos: any[]
    subgrupos: any[]
    unidades: any[]
    areasProduccion: any[]
  }
  estadisticasIniciales: {
    total: number
    activos: number
    favoritos: number
    suspendidos: number
    porTipo: Record<string, number>
  }
}

export function ProductosView({ productosIniciales, datosRelacionados, estadisticasIniciales }: ProductosViewProps) {
  // Estados principales
  const [productos, setProductos] = useState<Producto[]>(productosIniciales)
  const [estadisticas, setEstadisticas] = useState(estadisticasIniciales)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // Estados de UI
  const [vistaActual, setVistaActual] = useState<"grid" | "lista">("grid")
  const [modalFormulario, setModalFormulario] = useState(false)
  const [modalDetalle, setModalDetalle] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)
  const [modoEdicion, setModoEdicion] = useState(false)

  // Estados de filtros
  const [busqueda, setBusqueda] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroFavoritos, setFiltroFavoritos] = useState<boolean | undefined>(undefined)
  const [filtroSuspendidos, setFiltroSuspendidos] = useState<boolean | undefined>(undefined)
  const [filtroGrupo, setFiltroGrupo] = useState("todos")
  const [filtroSubgrupo, setFiltroSubgrupo] = useState("todos")
  const [ordenarPor, setOrdenarPor] = useState<keyof Producto>("Nombredelproducto")
  const [direccionOrden, setDireccionOrden] = useState<"asc" | "desc">("asc")

  // Productos filtrados y ordenados
  const productosFiltrados = useMemo(() => {
    let resultado = ProductosService.filtrarProductos(productos, {
      busqueda,
      tipo: filtroTipo,
      favoritos: filtroFavoritos,
      suspendidos: filtroSuspendidos,
      grupo: filtroGrupo,
      subgrupo: filtroSubgrupo,
    })

    resultado = ProductosService.ordenarProductos(resultado, ordenarPor, direccionOrden)

    return resultado
  }, [
    productos,
    busqueda,
    filtroTipo,
    filtroFavoritos,
    filtroSuspendidos,
    filtroGrupo,
    filtroSubgrupo,
    ordenarPor,
    direccionOrden,
  ])

  // Función para refrescar datos
  const refrescarDatos = async () => {
    setRefreshing(true)
    try {
      const result = await obtenerProductosAction()
      if (result.success && result.data) {
        setProductos(result.data)
        // Recalcular estadísticas
        const stats = await ProductosService.obtenerEstadisticas()
        setEstadisticas(stats)
      } else {
        toast.error(result.error || "Error al refrescar datos")
      }
    } catch (error) {
      toast.error("Error al refrescar datos")
    } finally {
      setRefreshing(false)
    }
  }

  // Handlers para acciones
  const handleNuevoProducto = () => {
    setProductoSeleccionado(null)
    setModoEdicion(false)
    setModalFormulario(true)
  }

  const handleEditarProducto = (producto: Producto) => {
    setProductoSeleccionado(producto)
    setModoEdicion(true)
    setModalFormulario(true)
  }

  const handleVerDetalle = (producto: Producto) => {
    setProductoSeleccionado(producto)
    setModalDetalle(true)
  }

  const handleEliminarProducto = (producto: Producto) => {
    setProductoSeleccionado(producto)
    setModalEliminar(true)
  }

  const confirmarEliminar = async () => {
    if (!productoSeleccionado) return

    setLoading(true)
    try {
      const result = await eliminarProductoAction(productoSeleccionado.ProductoULID)
      if (result.success) {
        toast.success(result.message || "Producto eliminado exitosamente")
        await refrescarDatos()
        setModalEliminar(false)
        setProductoSeleccionado(null)
      } else {
        toast.error(result.error || "Error al eliminar producto")
      }
    } catch (error) {
      toast.error("Error al eliminar producto")
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFavorito = async (producto: Producto) => {
    try {
      const result = await alternarFavoritoAction(producto.ProductoULID)
      if (result.success) {
        toast.success(result.message)
        await refrescarDatos()
      } else {
        toast.error(result.error || "Error al actualizar favorito")
      }
    } catch (error) {
      toast.error("Error al actualizar favorito")
    }
  }

  const handleToggleSuspendido = async (producto: Producto) => {
    try {
      const result = await alternarSuspendidoAction(producto.ProductoULID)
      if (result.success) {
        toast.success(result.message)
        await refrescarDatos()
      } else {
        toast.error(result.error || "Error al actualizar estado")
      }
    } catch (error) {
      toast.error("Error al actualizar estado")
    }
  }

  const handleFormularioExito = async () => {
    setModalFormulario(false)
    setProductoSeleccionado(null)
    setModoEdicion(false)
    await refrescarDatos()
  }

  const limpiarFiltros = () => {
    setBusqueda("")
    setFiltroTipo("todos")
    setFiltroFavoritos(undefined)
    setFiltroSuspendidos(undefined)
    setFiltroGrupo("todos")
    setFiltroSubgrupo("todos")
    setOrdenarPor("Nombredelproducto")
    setDireccionOrden("asc")
  }

  const obtenerNombreGrupo = (grupoId?: string) => {
    if (!grupoId) return "Sin grupo"
    const grupo = datosRelacionados.grupos.find((g) => g.GrupoProductoULID === grupoId)
    return grupo?.Descripcion || "Grupo desconocido"
  }

  const obtenerColorTipo = (tipo: string) => {
    switch (tipo) {
      case "Platillo":
        return "bg-orange-100 text-orange-800"
      case "Producto":
        return "bg-blue-100 text-blue-800"
      case "Botella":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-600">Gestiona el catálogo de productos de tu restaurante</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={refrescarDatos}
            disabled={refreshing}
            className="flex items-center gap-2 bg-transparent"
          >
            <BarChart3 className="h-4 w-4" />
            {refreshing ? "Actualizando..." : "Actualizar"}
          </Button>
          <Button onClick={handleNuevoProducto} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.total}</div>
            <p className="text-xs text-muted-foreground">{estadisticas.activos} activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.favoritos}</div>
            <p className="text-xs text-muted-foreground">Productos destacados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspendidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.suspendidos}</div>
            <p className="text-xs text-muted-foreground">Productos inactivos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Más Vendido</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(estadisticas.porTipo)[0] || "N/A"}</div>
            <p className="text-xs text-muted-foreground">Tipo más común</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros y Búsqueda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Búsqueda */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nombre, clave o descripción..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setVistaActual(vistaActual === "grid" ? "lista" : "grid")}
              >
                {vistaActual === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
              </Button>
              <Button variant="outline" onClick={limpiarFiltros}>
                Limpiar Filtros
              </Button>
            </div>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="filtro-tipo">Tipo de Producto</Label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  <SelectItem value="Platillo">Platillo</SelectItem>
                  <SelectItem value="Producto">Producto</SelectItem>
                  <SelectItem value="Botella">Botella</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="filtro-grupo">Grupo</Label>
              <Select value={filtroGrupo} onValueChange={setFiltroGrupo}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los grupos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los grupos</SelectItem>
                  {datosRelacionados.grupos.map((grupo) => (
                    <SelectItem key={grupo.GrupoProductoULID} value={grupo.GrupoProductoULID}>
                      {grupo.Descripcion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ordenar-por">Ordenar por</Label>
              <Select value={ordenarPor} onValueChange={(value) => setOrdenarPor(value as keyof Producto)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nombredelproducto">Nombre</SelectItem>
                  <SelectItem value="ClaveProducto">Clave</SelectItem>
                  <SelectItem value="TipoProducto">Tipo</SelectItem>
                  <SelectItem value="Fecha_UltimoCambio">Última modificación</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="direccion-orden">Dirección</Label>
              <Select value={direccionOrden} onValueChange={(value) => setDireccionOrden(value as "asc" | "desc")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascendente</SelectItem>
                  <SelectItem value="desc">Descendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Switches de filtros */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="solo-favoritos"
                checked={filtroFavoritos === true}
                onCheckedChange={(checked) => setFiltroFavoritos(checked ? true : undefined)}
              />
              <Label htmlFor="solo-favoritos">Solo favoritos</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="solo-activos"
                checked={filtroSuspendidos === false}
                onCheckedChange={(checked) => setFiltroSuspendidos(checked ? false : undefined)}
              />
              <Label htmlFor="solo-activos">Solo activos</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="solo-suspendidos"
                checked={filtroSuspendidos === true}
                onCheckedChange={(checked) => setFiltroSuspendidos(checked ? true : undefined)}
              />
              <Label htmlFor="solo-suspendidos">Solo suspendidos</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando {productosFiltrados.length} de {productos.length} productos
        </p>
      </div>

      {/* Lista/Grid de Productos */}
      {vistaActual === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {productosFiltrados.map((producto) => (
            <Card key={producto.ProductoULID} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base line-clamp-1">{producto.Nombredelproducto}</CardTitle>
                    <CardDescription className="text-sm">{producto.ClaveProducto}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleVerDetalle(producto)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalle
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditarProducto(producto)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleToggleFavorito(producto)}>
                        {producto.Favorito ? (
                          <>
                            <StarOff className="mr-2 h-4 w-4" />
                            Quitar de favoritos
                          </>
                        ) : (
                          <>
                            <Star className="mr-2 h-4 w-4" />
                            Marcar como favorito
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleSuspendido(producto)}>
                        {producto.Suspendido ? "Activar" : "Suspender"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEliminarProducto(producto)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={obtenerColorTipo(producto.TipoProducto)}>{producto.TipoProducto}</Badge>
                    {producto.Favorito && (
                      <Badge variant="outline" className="text-yellow-600">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Favorito
                      </Badge>
                    )}
                    {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{producto.Descripcion || "Sin descripción"}</p>

                  <div className="text-xs text-gray-500">Grupo: {obtenerNombreGrupo(producto.GrupoProductoULID)}</div>

                  {producto.DatosDinamicos?.precio && (
                    <div className="text-sm font-semibold text-green-600">${producto.DatosDinamicos.precio}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {productosFiltrados.map((producto) => (
                <div key={producto.ProductoULID} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-medium">{producto.Nombredelproducto}</h3>
                          <p className="text-sm text-gray-600">{producto.ClaveProducto}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={obtenerColorTipo(producto.TipoProducto)}>{producto.TipoProducto}</Badge>
                          {producto.Favorito && (
                            <Badge variant="outline" className="text-yellow-600">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Favorito
                            </Badge>
                          )}
                          {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{producto.Descripcion || "Sin descripción"}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>Grupo: {obtenerNombreGrupo(producto.GrupoProductoULID)}</span>
                        {producto.DatosDinamicos?.precio && (
                          <span className="font-semibold text-green-600">${producto.DatosDinamicos.precio}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleToggleFavorito(producto)}>
                        {producto.Favorito ? (
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleVerDetalle(producto)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditarProducto(producto)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleSuspendido(producto)}>
                            {producto.Suspendido ? "Activar" : "Suspender"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEliminarProducto(producto)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estado vacío */}
      {productosFiltrados.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600 text-center mb-4">
              {productos.length === 0
                ? "Comienza agregando tu primer producto al catálogo"
                : "Intenta ajustar los filtros de búsqueda"}
            </p>
            {productos.length === 0 && (
              <Button onClick={handleNuevoProducto}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Primer Producto
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Modal Formulario */}
      <Dialog open={modalFormulario} onOpenChange={setModalFormulario}>
        <DialogContent className="w-[80vw] max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{modoEdicion ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
          </DialogHeader>
          <ProductoForm
            producto={productoSeleccionado}
            datosRelacionados={datosRelacionados}
            onSuccess={handleFormularioExito}
            onCancel={() => setModalFormulario(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Modal Detalle */}
      <Dialog open={modalDetalle} onOpenChange={setModalDetalle}>
        <DialogContent className="w-[80vw] max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalle del Producto</DialogTitle>
          </DialogHeader>
          {productoSeleccionado && (
            <ProductoDetail
              producto={productoSeleccionado}
              datosRelacionados={datosRelacionados}
              onEdit={() => {
                setModalDetalle(false)
                handleEditarProducto(productoSeleccionado)
              }}
              onClose={() => setModalDetalle(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Confirmar Eliminación */}
      <AlertDialog open={modalEliminar} onOpenChange={setModalEliminar}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el producto{" "}
              <strong>{productoSeleccionado?.Nombredelproducto}</strong> del catálogo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmarEliminar} disabled={loading} className="bg-red-600 hover:bg-red-700">
              {loading ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
