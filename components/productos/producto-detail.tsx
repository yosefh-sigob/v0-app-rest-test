"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Edit,
  Package,
  Utensils,
  Wine,
  Star,
  Home,
  Truck,
  ShoppingCart,
  Smartphone,
  QrCode,
  Clock,
  DollarSign,
  Hash,
  FileText,
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
  const areaProduccion = areasProduccion.find((a) => a.id === producto.AreaProduccionID)
  const almacen = almacenes.find((a) => a.id === producto.AlmacenID)

  const getChannelBadges = () => {
    const channels = []
    if (producto.Comedor) channels.push({ icon: <Home className="h-4 w-4" />, label: "Comedor" })
    if (producto.ADomicilio) channels.push({ icon: <Truck className="h-4 w-4" />, label: "Domicilio" })
    if (producto.Mostrador) channels.push({ icon: <ShoppingCart className="h-4 w-4" />, label: "Mostrador" })
    if (producto.Enlinea) channels.push({ icon: <Smartphone className="h-4 w-4" />, label: "En línea" })
    if (producto.EnMenuQR) channels.push({ icon: <QrCode className="h-4 w-4" />, label: "QR" })
    return channels
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={`/placeholder.svg?height=80&width=80&text=${encodeURIComponent(producto.Nombredelproducto)}`}
            alt={producto.Nombredelproducto}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">{producto.Nombredelproducto}</h2>
              {producto.Favorito && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
              {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                {TIPO_ICONS[producto.TipoProducto]}
                {producto.TipoProducto}
              </Badge>
              <Badge variant="outline">{producto.ClaveProducto}</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={onEdit} size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button onClick={onClose} variant="outline" size="sm">
            Cerrar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información General */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Información General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Descripción</label>
              <p className="mt-1">{producto.Descripcion || "Sin descripción"}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Categoría</label>
                <p className="mt-1">{grupo?.nombre || "Sin categoría"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Unidad</label>
                <p className="mt-1">{unidad?.nombre || "Sin unidad"}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Área de Producción</label>
                <p className="mt-1">{areaProduccion?.nombre || "Sin área"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Almacén</label>
                <p className="mt-1">{almacen?.nombre || "Sin almacén"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Configuración
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tiempo de Preparación</label>
                <p className="mt-1 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {producto.TiempoPreparacion || 0} min
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Precio Base</label>
                <p className="mt-1 flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />${producto.PrecioBase || 0}
                </p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Orden de Impresión</label>
              <p className="mt-1">{producto.OrdenImpresion || 0}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Canales de Venta */}
      <Card>
        <CardHeader>
          <CardTitle>Canales de Venta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {getChannelBadges().map((channel, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {channel.icon}
                {channel.label}
              </Badge>
            ))}
            {getChannelBadges().length === 0 && (
              <p className="text-muted-foreground">No hay canales de venta configurados</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Información del Sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <label className="font-medium text-muted-foreground">ID del Producto</label>
              <p className="mt-1 font-mono text-xs">{producto.ProductoULID}</p>
            </div>
            <div>
              <label className="font-medium text-muted-foreground">Creado</label>
              <p className="mt-1">{new Date(producto.FechaCreacion).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="font-medium text-muted-foreground">Actualizado</label>
              <p className="mt-1">{new Date(producto.FechaActualizacion).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
