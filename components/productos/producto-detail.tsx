"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit, Package, ShoppingCart, Utensils, Star } from "lucide-react"
import type { Producto } from "@/schemas/productos.schemas"
import { getGrupoById, getUnidadById, getAreaProduccionById, getAlmacenById } from "@/lib/mock/productos.mock"

interface ProductoDetailProps {
  producto: Producto
  onEdit: () => void
  onClose: () => void
}

export function ProductoDetail({ producto, onEdit, onClose }: ProductoDetailProps) {
  const getProductoIcon = (tipo: string) => {
    switch (tipo) {
      case "Platillo":
        return <Utensils className="h-5 w-5" />
      case "Botella":
        return <ShoppingCart className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
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

  const grupo = producto.GrupoProductoID ? getGrupoById(producto.GrupoProductoID) : null
  const unidad = producto.UnidadID ? getUnidadById(producto.UnidadID) : null
  const areaProduccion = producto.AreaProduccionID ? getAreaProduccionById(producto.AreaProduccionID) : null
  const almacen = producto.AlmacenID ? getAlmacenById(producto.AlmacenID) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
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

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">{producto.Nombredelproducto}</h2>
            {producto.Favorito && <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
            {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Badge className={getProductoColor(producto.TipoProducto)}>
              {getProductoIcon(producto.TipoProducto)}
              <span className="ml-1">{producto.TipoProducto}</span>
            </Badge>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">{producto.ClaveProducto}</span>
          </div>

          {producto.Descripcion && <p className="text-gray-600">{producto.Descripcion}</p>}
        </div>

        <Button onClick={onEdit} className="bg-orange-500 hover:bg-orange-600">
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </div>

      <Separator />

      {/* Información del producto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Configuración básica */}
        <Card>
          <CardHeader>
            <CardTitle>⚙️ Configuración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {grupo && (
              <div className="flex justify-between">
                <span className="text-gray-600">Grupo:</span>
                <span className="font-medium">{grupo.nombre}</span>
              </div>
            )}

            {unidad && (
              <div className="flex justify-between">
                <span className="text-gray-600">Unidad:</span>
                <span className="font-medium">
                  {unidad.nombre} ({unidad.abreviacion})
                </span>
              </div>
            )}

            {areaProduccion && (
              <div className="flex justify-between">
                <span className="text-gray-600">Área de Producción:</span>
                <span className="font-medium">{areaProduccion.nombre}</span>
              </div>
            )}

            {almacen && (
              <div className="flex justify-between">
                <span className="text-gray-600">Almacén:</span>
                <span className="font-medium">{almacen.nombre}</span>
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Control de Stock:</span>
                <Badge variant={producto.ControlStock ? "default" : "secondary"}>
                  {producto.ControlStock ? "Sí" : "No"}
                </Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Facturable:</span>
                <Badge variant={producto.Facturable ? "default" : "secondary"}>
                  {producto.Facturable ? "Sí" : "No"}
                </Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Exento de Impuesto:</span>
                <Badge variant={producto.ExentoImpuesto ? "default" : "secondary"}>
                  {producto.ExentoImpuesto ? "Sí" : "No"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Canales de venta */}
        <Card>
          <CardHeader>
            <CardTitle>🛒 Canales de Venta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-2 rounded border">
                <span className="text-sm">🏠 Comedor</span>
                <Badge variant={producto.Comedor ? "default" : "secondary"} className="text-xs">
                  {producto.Comedor ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-2 rounded border">
                <span className="text-sm">🚚 Domicilio</span>
                <Badge variant={producto.ADomicilio ? "default" : "secondary"} className="text-xs">
                  {producto.ADomicilio ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-2 rounded border">
                <span className="text-sm">🏪 Mostrador</span>
                <Badge variant={producto.Mostrador ? "default" : "secondary"} className="text-xs">
                  {producto.Mostrador ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-2 rounded border">
                <span className="text-sm">💻 En Línea</span>
                <Badge variant={producto.Enlinea ? "default" : "secondary"} className="text-xs">
                  {producto.Enlinea ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-2 rounded border">
                <span className="text-sm">📱 En APP</span>
                <Badge variant={producto.EnAPP ? "default" : "secondary"} className="text-xs">
                  {producto.EnAPP ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-2 rounded border">
                <span className="text-sm">📱 Menú QR</span>
                <Badge variant={producto.EnMenuQR ? "default" : "secondary"} className="text-xs">
                  {producto.EnMenuQR ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información del sistema */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Información del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">ID del Producto:</span>
              <span className="font-mono text-xs">{producto.ProductoULID}</span>
            </div>

            {producto.Fecha_UltimoCambio && (
              <div className="flex justify-between">
                <span className="text-gray-600">Última Modificación:</span>
                <span>{new Date(producto.Fecha_UltimoCambio).toLocaleString()}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Botón de cerrar */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </div>
  )
}
