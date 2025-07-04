"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Edit,
  X,
  Package,
  Utensils,
  Wine,
  Star,
  Home,
  Truck,
  ShoppingCart,
  Smartphone,
  QrCode,
  Check,
  AlertCircle,
  Calendar,
  Settings,
} from "lucide-react"
import { getImageSrc } from "@/lib/utils/image"
import type { Producto } from "@/interfaces/database"

interface ProductoDetailProps {
  producto: Producto
  gruposProductos: Array<{ id: number; nombre: string }>
  unidades: Array<{ id: number; nombre: string; abreviacion: string }>
  areasProduccion: Array<{ id: number; nombre: string }>
  almacenes: Array<{ id: number; nombre: string }>
  onEdit: () => void
  onClose: () => void
}

const TIPO_ICONS = {
  Platillo: <Utensils className="h-5 w-5" />,
  Producto: <Package className="h-5 w-5" />,
  Botella: <Wine className="h-5 w-5" />,
}

export function ProductoDetail({
  producto,
  gruposProductos,
  unidades,
  areasProduccion,
  almacenes,
  onEdit,
  onClose,
}: ProductoDetailProps) {
  const grupo = gruposProductos.find((g) => g.id === producto.GrupoProductoID)
  const unidad = unidades.find((u) => u.id === producto.UnidadID)
  const areaProduccion = areasProduccion.find((a) => a.id === producto.AreaProduccionID)
  const almacen = almacenes.find((a) => a.id === producto.AlmacenID)

  const getChannelBadges = () => {
    const channels = []
    if (producto.Comedor)
      channels.push({ icon: <Home className="h-4 w-4" />, label: "Comedor", color: "bg-green-100 text-green-800" })
    if (producto.ADomicilio)
      channels.push({ icon: <Truck className="h-4 w-4" />, label: "Domicilio", color: "bg-blue-100 text-blue-800" })
    if (producto.Mostrador)
      channels.push({
        icon: <ShoppingCart className="h-4 w-4" />,
        label: "Mostrador",
        color: "bg-purple-100 text-purple-800",
      })
    if (producto.Enlinea)
      channels.push({
        icon: <Smartphone className="h-4 w-4" />,
        label: "En línea",
        color: "bg-orange-100 text-orange-800",
      })
    if (producto.EnMenuQR)
      channels.push({ icon: <QrCode className="h-4 w-4" />, label: "Menú QR", color: "bg-gray-100 text-gray-800" })
    return channels
  }

  return (
    <div className="space-y-6">
      {/* Header con imagen y información principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Imagen */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={getImageSrc(producto.Imagen) || "/placeholder.svg"}
                  alt={producto.Nombredelproducto}
                  className="w-full h-64 lg:h-80 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {producto.Favorito && (
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      Favorito
                    </Badge>
                  )}
                  {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                    {TIPO_ICONS[producto.TipoProducto]}
                    <span className="ml-2">{producto.TipoProducto}</span>
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Código:</span>
                  <Badge variant="outline" className="font-mono">
                    {producto.ClaveProducto}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl text-gray-900">{producto.Nombredelproducto}</CardTitle>
                  <p className="text-gray-600 mt-2">{producto.Descripcion || "Sin descripción disponible"}</p>
                </div>
                <Button onClick={onEdit} className="bg-orange-600 hover:bg-orange-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Información básica */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Categoría</span>
                  <p className="text-gray-900">{grupo?.nombre || "Sin categoría"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Unidad</span>
                  <p className="text-gray-900">{unidad ? `${unidad.nombre} (${unidad.abreviacion})` : "Sin unidad"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Área de Producción</span>
                  <p className="text-gray-900">{areaProduccion?.nombre || "Sin área"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Almacén</span>
                  <p className="text-gray-900">{almacen?.nombre || "Sin almacén"}</p>
                </div>
              </div>

              <Separator />

              {/* Canales de venta */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Canales de Venta Disponibles</h4>
                <div className="flex flex-wrap gap-2">
                  {getChannelBadges().map((channel, index) => (
                    <Badge key={index} className={channel.color}>
                      {channel.icon}
                      <span className="ml-2">{channel.label}</span>
                    </Badge>
                  ))}
                  {getChannelBadges().length === 0 && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">No hay canales de venta configurados</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuración del producto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-600" />
                Configuración
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  {producto.PermiteDescuento ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm">Permite Descuento</span>
                </div>
                <div className="flex items-center gap-2">
                  {producto.ControlaStock ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm">Controla Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  {producto.AceptaPropina ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm">Acepta Propina</span>
                </div>
                <div className="flex items-center gap-2">
                  {producto.PreguntaCoccion ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm">Pregunta Cocción</span>
                </div>
                <div className="flex items-center gap-2">
                  {producto.Favorito ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm">Producto Favorito</span>
                </div>
                <div className="flex items-center gap-2">
                  {!producto.Suspendido ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm">Producto Activo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Información del sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Información del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-sm font-medium text-gray-600">ID del Producto</span>
              <p className="text-gray-900 font-mono text-sm">{producto.ProductoULID}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Fecha de Creación</span>
              <p className="text-gray-900">
                {new Date(producto.FechaCreacion).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Última Actualización</span>
              <p className="text-gray-900">
                {new Date(producto.FechaActualizacion).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex items-center justify-end space-x-4 pt-6 border-t bg-gray-50 p-4 -mx-6 -mb-6 rounded-b-lg">
        <Button variant="outline" onClick={onClose}>
          <X className="h-4 w-4 mr-2" />
          Cerrar
        </Button>
        <Button onClick={onEdit} className="bg-orange-600 hover:bg-orange-700">
          <Edit className="h-4 w-4 mr-2" />
          Editar Producto
        </Button>
      </div>
    </div>
  )
}
