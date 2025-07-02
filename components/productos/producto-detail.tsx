"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Calendar,
  User,
  Building,
  MapPin,
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
  Platillo: <Utensils className="h-4 w-4" />,
  Producto: <Package className="h-4 w-4" />,
  Botella: <Wine className="h-4 w-4" />,
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
  const grupo = gruposProductos.find((g) => g.id === producto.GrupoProductoULID)
  const unidad = unidades.find((u) => u.id === producto.UnidadesULID)
  const areaProduccion = areasProduccion.find((a) => a.id === producto.AreaProduccionULID)
  const almacen = almacenes.find((a) => a.id === producto.AlmacenULID)

  const getChannelBadges = () => {
    const channels = []
    if (producto.Comedor) channels.push({ icon: <Home className="h-3 w-3" />, label: "Comedor" })
    if (producto.ADomicilio) channels.push({ icon: <Truck className="h-3 w-3" />, label: "Domicilio" })
    if (producto.Mostrador) channels.push({ icon: <ShoppingCart className="h-3 w-3" />, label: "Mostrador" })
    if (producto.Enlinea) channels.push({ icon: <Smartphone className="h-3 w-3" />, label: "En línea" })
    if (producto.EnMenuQR) channels.push({ icon: <QrCode className="h-3 w-3" />, label: "Menú QR" })
    return channels
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{producto.Nombredelproducto}</h2>
            {producto.Favorito && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
            {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {TIPO_ICONS[producto.TipoProducto]}
              {producto.TipoProducto}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {producto.ClaveProducto}
            </Badge>
          </div>
        </div>
        <Button onClick={onEdit} className="bg-orange-600 hover:bg-orange-700">
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </div>

      {/* Imagen */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <img
              src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(producto.Nombredelproducto)}`}
              alt={producto.Nombredelproducto}
              className="w-full max-w-md h-48 object-cover rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Información básica */}
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
              <p className="text-sm">{unidad?.nombre || "Sin unidad"}</p>
            </div>
          </div>

          {areaProduccion && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Área de Producción</h4>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{areaProduccion.nombre}</span>
              </div>
            </div>
          )}

          {almacen && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Almacén</h4>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{almacen.nombre}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Canales de venta */}
      <Card>
        <CardHeader>
          <CardTitle>Canales de Venta</CardTitle>
          <CardDescription>Dónde está disponible este producto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {getChannelBadges().map((channel, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
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

      {/* Configuración */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Control de Stock</h4>
              <Badge variant={producto.ControlStock ? "default" : "secondary"}>
                {producto.ControlStock ? "Activado" : "Desactivado"}
              </Badge>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Precio Abierto</h4>
              <Badge variant={producto.PrecioAbierto ? "default" : "secondary"}>
                {producto.PrecioAbierto ? "Sí" : "No"}
              </Badge>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Facturable</h4>
              <Badge variant={producto.Facturable ? "default" : "secondary"}>{producto.Facturable ? "Sí" : "No"}</Badge>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Exento de Impuesto</h4>
              <Badge variant={producto.ExentoImpuesto ? "default" : "secondary"}>
                {producto.ExentoImpuesto ? "Sí" : "No"}
              </Badge>
            </div>
          </div>

          {producto.ClaveTributaria && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Clave Tributaria</h4>
              <p className="text-sm font-mono">{producto.ClaveTributaria}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Información del sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Última modificación</p>
                <p className="text-xs text-muted-foreground">
                  {producto.Fecha_UltimoCambio.toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">ID del Producto</p>
                <p className="text-xs text-muted-foreground font-mono">{producto.ProductoULID}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Datos dinámicos */}
      {producto.DatosDinamicos && (
        <Card>
          <CardHeader>
            <CardTitle>Datos Adicionales</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-auto">
              {JSON.stringify(producto.DatosDinamicos, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
