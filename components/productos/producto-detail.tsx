"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  Utensils,
  Wine,
  Star,
  Home,
  Truck,
  ShoppingCart,
  Smartphone,
  QrCode,
  Edit,
  X,
  Check,
  AlertCircle,
} from "lucide-react"
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
  const area = areasProduccion.find((a) => a.id === producto.AreaProduccionID)
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
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">{TIPO_ICONS[producto.TipoProducto]}</div>
            <div>
              <h2 className="text-2xl font-bold">{producto.Nombredelproducto}</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{producto.ClaveProducto}</Badge>
                <Badge variant="secondary">{producto.TipoProducto}</Badge>
                {producto.Favorito && (
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    <Star className="h-3 w-3 mr-1" />
                    Favorito
                  </Badge>
                )}
                {producto.Suspendido && (
                  <Badge variant="destructive">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Suspendido
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={onEdit} className="bg-orange-600 hover:bg-orange-700">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cerrar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Descripción */}
          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{producto.Descripcion || "Sin descripción disponible"}</p>
            </CardContent>
          </Card>

          {/* Configuración */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Permite Descuento</span>
                  {producto.PermiteDescuento ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Controla Stock</span>
                  {producto.ControlaStock ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Acepta Propina</span>
                  {producto.AceptaPropina ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Pregunta Cocción</span>
                  {producto.PreguntaCoccion ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Canales de Venta */}
          <Card>
            <CardHeader>
              <CardTitle>Canales de Venta</CardTitle>
              <CardDescription>Dónde está disponible este producto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {getChannelBadges().map((channel, index) => (
                  <div key={index} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${channel.color}`}>
                    {channel.icon}
                    <span className="text-sm font-medium">{channel.label}</span>
                  </div>
                ))}
                {getChannelBadges().length === 0 && (
                  <p className="text-muted-foreground text-sm">No hay canales de venta configurados</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información Lateral */}
        <div className="space-y-6">
          {/* Imagen */}
          <Card>
            <CardContent className="p-4">
              <img
                src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(producto.Nombredelproducto)}`}
                alt={producto.Nombredelproducto}
                className="w-full h-48 object-cover rounded-md"
              />
            </CardContent>
          </Card>

          {/* Clasificación */}
          <Card>
            <CardHeader>
              <CardTitle>Clasificación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Categoría</label>
                <p className="text-sm">{grupo?.nombre || "Sin categoría"}</p>
              </div>
              <Separator />
              <div>
                <label className="text-sm font-medium text-muted-foreground">Unidad de Medida</label>
                <p className="text-sm">{unidad ? `${unidad.nombre} (${unidad.abreviacion})` : "Sin unidad"}</p>
              </div>
              <Separator />
              <div>
                <label className="text-sm font-medium text-muted-foreground">Área de Producción</label>
                <p className="text-sm">{area?.nombre || "Sin área específica"}</p>
              </div>
              <Separator />
              <div>
                <label className="text-sm font-medium text-muted-foreground">Almacén</label>
                <p className="text-sm">{almacen?.nombre || "Sin almacén específico"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Información del Sistema */}
          <Card>
            <CardHeader>
              <CardTitle>Información del Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">ID del Producto</label>
                <p className="text-xs font-mono bg-gray-100 p-2 rounded">{producto.ProductoULID}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Fecha de Creación</label>
                <p className="text-sm">{new Date(producto.FechaCreacion).toLocaleDateString()}</p>
              </div>
              {producto.FechaModificacion && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Última Modificación</label>
                  <p className="text-sm">{new Date(producto.FechaModificacion).toLocaleDateString()}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
