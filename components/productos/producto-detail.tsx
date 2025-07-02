"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Edit,
  X,
  Package,
  Star,
  Clock,
  MapPin,
  ShoppingCart,
  Home,
  Truck,
  Smartphone,
  QrCode,
  Check,
  AlertCircle,
  Utensils,
  Wine,
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

  const getChannels = () => {
    const channels = []
    if (producto.Comedor) channels.push({ icon: <Home className="h-4 w-4" />, label: "Comedor" })
    if (producto.ADomicilio) channels.push({ icon: <Truck className="h-4 w-4" />, label: "Domicilio" })
    if (producto.Mostrador) channels.push({ icon: <ShoppingCart className="h-4 w-4" />, label: "Mostrador" })
    if (producto.Enlinea) channels.push({ icon: <Smartphone className="h-4 w-4" />, label: "En línea" })
    if (producto.EnAPP) channels.push({ icon: <Smartphone className="h-4 w-4" />, label: "APP" })
    if (producto.EnMenuQR) channels.push({ icon: <QrCode className="h-4 w-4" />, label: "Menú QR" })
    return channels
  }

  const getConfigurationItems = () => {
    const items = []
    if (producto.Favorito)
      items.push({ icon: <Star className="h-4 w-4 text-yellow-500" />, label: "Producto Favorito" })
    if (producto.ControlStock)
      items.push({ icon: <Package className="h-4 w-4 text-blue-500" />, label: "Control de Stock" })
    if (producto.PrecioAbierto)
      items.push({ icon: <Edit className="h-4 w-4 text-green-500" />, label: "Precio Abierto" })
    if (producto.Facturable) items.push({ icon: <Check className="h-4 w-4 text-green-500" />, label: "Facturable" })
    if (producto.ExentoImpuesto)
      items.push({ icon: <AlertCircle className="h-4 w-4 text-orange-500" />, label: "Exento de Impuesto" })
    if (producto.PrecioxUtilidadad)
      items.push({ icon: <Clock className="h-4 w-4 text-purple-500" />, label: "Precio por Utilidad" })
    return items
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
              {TIPO_ICONS[producto.TipoProducto]}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{producto.Nombredelproducto}</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{producto.ClaveProducto}</Badge>
                <Badge variant={producto.Suspendido ? "destructive" : "default"}>{producto.TipoProducto}</Badge>
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
          <Button onClick={onEdit} size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Imagen del producto */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-48 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={`/placeholder.svg?height=192&width=192&text=${encodeURIComponent(producto.Nombredelproducto)}`}
                alt={producto.Nombredelproducto}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Descripción</h3>
                <p className="text-muted-foreground">{producto.Descripcion || "Sin descripción disponible"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Categoría</span>
                  <p className="font-medium">{grupo?.nombre || "Sin categoría"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Unidad</span>
                  <p className="font-medium">{unidad ? `${unidad.nombre} (${unidad.abreviacion})` : "Sin unidad"}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuración */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Configuración
            </CardTitle>
            <CardDescription>Opciones y comportamiento del producto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {getConfigurationItems().length > 0 ? (
              getConfigurationItems().map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Sin configuraciones especiales</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Canales de Venta
            </CardTitle>
            <CardDescription>Dónde está disponible este producto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {getChannels().length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {getChannels().map((channel, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {channel.icon}
                    <span className="text-sm">{channel.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Sin canales de venta configurados</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Información adicional */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Información Adicional
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Área de Producción</span>
                <p className="font-medium">{areaProduccion?.nombre || "Sin área asignada"}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Almacén</span>
                <p className="font-medium">{almacen?.nombre || "Sin almacén asignado"}</p>
              </div>
            </div>

            <div className="space-y-3">
              {producto.ClaveTributaria && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Clave Tributaria</span>
                  <p className="font-medium">{producto.ClaveTributaria}</p>
                </div>
              )}
              {producto.ClasificacionQRULID && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Clasificación QR</span>
                  <p className="font-medium">{producto.ClasificacionQRULID}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Creado</span>
              <p className="font-medium">{new Date(producto.Fecha_UltimoCambio).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Última modificación</span>
              <p className="font-medium">{new Date(producto.Fecha_UltimoCambio).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Estado</span>
              <p className="font-medium">{producto.Suspendido ? "Suspendido" : "Activo"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">ID</span>
              <p className="font-medium text-xs">{producto.ProductoULID}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
