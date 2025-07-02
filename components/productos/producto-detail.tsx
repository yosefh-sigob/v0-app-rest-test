"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
  Settings,
  X,
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

const TIPO_COLORS = {
  Platillo: "bg-green-100 text-green-800 border-green-200",
  Producto: "bg-blue-100 text-blue-800 border-blue-200",
  Botella: "bg-purple-100 text-purple-800 border-purple-200",
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
  const area = areasProduccion.find((a) => a.id === producto.AreaProduccionULID)
  const almacen = almacenes.find((a) => a.id === producto.AlmacenULID)

  const getChannelBadges = () => {
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
      channels.push({ icon: <QrCode className="h-3 w-3" />, label: "Menú QR", color: "bg-gray-100 text-gray-800" })
    return channels
  }

  const getConfigBadges = () => {
    const configs = []
    if (producto.Favorito)
      configs.push({ label: "Favorito", color: "bg-yellow-100 text-yellow-800", icon: <Star className="h-3 w-3" /> })
    if (producto.ControlStock)
      configs.push({
        label: "Control Stock",
        color: "bg-indigo-100 text-indigo-800",
        icon: <Package className="h-3 w-3" />,
      })
    if (producto.PrecioAbierto)
      configs.push({
        label: "Precio Abierto",
        color: "bg-cyan-100 text-cyan-800",
        icon: <Settings className="h-3 w-3" />,
      })
    if (producto.ExentoImpuesto)
      configs.push({
        label: "Exento Impuesto",
        color: "bg-red-100 text-red-800",
        icon: <Settings className="h-3 w-3" />,
      })
    if (producto.Suspendido)
      configs.push({ label: "Suspendido", color: "bg-red-100 text-red-800", icon: <X className="h-3 w-3" /> })
    return configs
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <img
              src={`/placeholder.svg?height=80&width=80&text=${encodeURIComponent(producto.Nombredelproducto)}`}
              alt={producto.Nombredelproducto}
              className="w-20 h-20 object-cover rounded-lg border"
            />
            <div>
              <h2 className="text-2xl font-bold">{producto.Nombredelproducto}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`${TIPO_COLORS[producto.TipoProducto]} border`}>
                  {TIPO_ICONS[producto.TipoProducto]}
                  {producto.TipoProducto}
                </Badge>
                <Badge variant="outline">{producto.ClaveProducto}</Badge>
                {producto.Favorito && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    <Star className="h-3 w-3 mr-1" />
                    Favorito
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {producto.Descripcion && <p className="text-muted-foreground max-w-2xl">{producto.Descripcion}</p>}
        </div>
        <Button onClick={onEdit} className="bg-orange-600 hover:bg-orange-700">
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información General */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5" />
              Información General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Categoría</label>
                <p className="font-medium">{grupo?.nombre || "Sin categoría"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Unidad</label>
                <p className="font-medium">{unidad ? `${unidad.nombre} (${unidad.abreviacion})` : "Sin unidad"}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Área de Producción</label>
                <p className="font-medium flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  {area?.nombre || "Sin área"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Almacén</label>
                <p className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {almacen?.nombre || "Sin almacén"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {getConfigBadges().map((config, index) => (
                <Badge key={index} className={`${config.color} border`}>
                  {config.icon}
                  {config.label}
                </Badge>
              ))}
              {getConfigBadges().length === 0 && (
                <p className="text-sm text-muted-foreground">Sin configuraciones especiales</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Canales de Venta */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Canales de Venta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {getChannelBadges().map((channel, index) => (
                <Badge key={index} className={`${channel.color} border`}>
                  {channel.icon}
                  {channel.label}
                </Badge>
              ))}
              {getChannelBadges().length === 0 && (
                <p className="text-sm text-muted-foreground">Sin canales de venta configurados</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Información del Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Información del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Último Cambio</label>
              <p className="font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {producto.Fecha_UltimoCambio?.toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }) || "No disponible"}
              </p>
            </div>

            {producto.ClaveTributaria && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Clave Tributaria</label>
                <p className="font-medium">{producto.ClaveTributaria}</p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-muted-foreground">Usuario</label>
              <p className="font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Usuario #{producto.UsuarioULID}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {producto.Suspendido && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-800">
              <X className="h-5 w-5" />
              <span className="font-medium">Producto Suspendido</span>
            </div>
            <p className="text-sm text-red-700 mt-1">
              Este producto no está disponible para la venta. Puedes reactivarlo editando el producto.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
