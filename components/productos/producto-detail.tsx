"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Calendar,
  User,
  MapPin,
  Warehouse,
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
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              {TIPO_ICONS[producto.TipoProducto]}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{producto.Nombredelproducto}</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {TIPO_ICONS[producto.TipoProducto]}
                  {producto.TipoProducto}
                </Badge>
                <Badge variant="outline">{producto.ClaveProducto}</Badge>
                {producto.Favorito && (
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    <Star className="h-3 w-3 mr-1" />
                    Favorito
                  </Badge>
                )}
                {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
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
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Imagen */}
      <Card>
        <CardContent className="p-6">
          <img
            src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(producto.Nombredelproducto)}`}
            alt={producto.Nombredelproducto}
            className="w-full h-48 object-cover rounded-lg"
          />
        </CardContent>
      </Card>

      {/* Información General */}
      <Card>
        <CardHeader>
          <CardTitle>Información General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {producto.Descripcion && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Descripción</h4>
              <p className="text-sm">{producto.Descripcion}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Categoría</h4>
              <p className="text-sm">{grupo?.nombre || "Sin categoría"}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Unidad</h4>
              <p className="text-sm">{unidad ? `${unidad.nombre} (${unidad.abreviacion})` : "Sin unidad"}</p>
            </div>
          </div>

          {(areaProduccion || almacen) && (
            <div className="grid grid-cols-2 gap-4">
              {areaProduccion && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Área de Producción</h4>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{areaProduccion.nombre}</p>
                  </div>
                </div>
              )}
              {almacen && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Almacén</h4>
                  <div className="flex items-center gap-2">
                    <Warehouse className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{almacen.nombre}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Canales de Venta */}
      <Card>
        <CardHeader>
          <CardTitle>Canales de Venta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {getChannelBadges().map((channel, index) => (
              <Badge key={index} variant="secondary" className={channel.color}>
                {channel.icon}
                {channel.label}
              </Badge>
            ))}
            {getChannelBadges().length === 0 && (
              <p className="text-sm text-muted-foreground">No hay canales de venta configurados</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Configuración Avanzada */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Permite Descuento</h4>
              <Badge variant={producto.PermiteDescuento ? "default" : "secondary"}>
                {producto.PermiteDescuento ? "Sí" : "No"}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Controla Stock</h4>
              <Badge variant={producto.ControlaStock ? "default" : "secondary"}>
                {producto.ControlaStock ? "Sí" : "No"}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Acepta Propina</h4>
              <Badge variant={producto.AceptaPropina ? "default" : "secondary"}>
                {producto.AceptaPropina ? "Sí" : "No"}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Pregunta Cocción</h4>
              <Badge variant={producto.PreguntaCoccion ? "default" : "secondary"}>
                {producto.PreguntaCoccion ? "Sí" : "No"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metadatos */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Creado: {new Date(producto.FechaCreacion).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>ID: {producto.ProductoULID}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
