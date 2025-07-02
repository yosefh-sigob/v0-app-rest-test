"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Edit,
  Star,
  Package,
  Utensils,
  Wine,
  Home,
  Truck,
  ShoppingCart,
  Smartphone,
  QrCode,
  Check,
  X,
  Calendar,
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

  const getChannelInfo = () => {
    const channels = []
    if (producto.Comedor) channels.push({ icon: <Home className="h-4 w-4" />, label: "Comedor", active: true })
    if (producto.ADomicilio) channels.push({ icon: <Truck className="h-4 w-4" />, label: "A Domicilio", active: true })
    if (producto.Mostrador)
      channels.push({ icon: <ShoppingCart className="h-4 w-4" />, label: "Mostrador", active: true })
    if (producto.Enlinea) channels.push({ icon: <Smartphone className="h-4 w-4" />, label: "En Línea", active: true })
    if (producto.EnAPP) channels.push({ icon: <Smartphone className="h-4 w-4" />, label: "APP", active: true })
    if (producto.EnMenuQR) channels.push({ icon: <QrCode className="h-4 w-4" />, label: "Menú QR", active: true })
    return channels
  }

  return (
    <div className="space-y-6">
      {/* Header con imagen */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={`/placeholder.svg?height=200&width=200&text=${encodeURIComponent(producto.Nombredelproducto)}`}
            alt={producto.Nombredelproducto}
            className="w-48 h-48 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{producto.Nombredelproducto}</h2>
              {producto.Favorito && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
              {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
            </div>
            <p className="text-muted-foreground">{producto.Descripcion || "Sin descripción disponible"}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              {TIPO_ICONS[producto.TipoProducto]}
              {producto.TipoProducto}
            </Badge>
            <Badge variant="outline">{producto.ClaveProducto}</Badge>
            {grupo && <Badge variant="secondary">{grupo.nombre}</Badge>}
          </div>

          <div className="flex gap-2">
            <Button onClick={onEdit} className="bg-orange-600 hover:bg-orange-700">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Información básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Código:</span>
              <span className="font-medium">{producto.ClaveProducto}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tipo:</span>
              <div className="flex items-center gap-1">
                {TIPO_ICONS[producto.TipoProducto]}
                <span className="font-medium">{producto.TipoProducto}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Categoría:</span>
              <span className="font-medium">{grupo?.nombre || "Sin categoría"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unidad:</span>
              <span className="font-medium">{unidad ? `${unidad.nombre} (${unidad.abreviacion})` : "Sin unidad"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Favorito:</span>
              <div className="flex items-center gap-1">
                {producto.Favorito ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Sí</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">No</span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Configuración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Área de Producción:</span>
              <span className="font-medium">{areaProduccion?.nombre || "No asignada"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Almacén:</span>
              <span className="font-medium">{almacen?.nombre || "No asignado"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Control de Stock:</span>
              <div className="flex items-center gap-1">
                {producto.ControlStock ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Activo</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Inactivo</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Precio Abierto:</span>
              <div className="flex items-center gap-1">
                {producto.PrecioAbierto ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Sí</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">No</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Precio por Utilidad:</span>
              <div className="flex items-center gap-1">
                {producto.PrecioxUtilidadad ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Sí</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">No</span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Canales de venta */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Canales de Venta</CardTitle>
          <CardDescription>Canales donde está disponible este producto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {getChannelInfo().map((channel, index) => (
              <div key={index} className="flex items-center gap-2 p-3 rounded-lg border bg-green-50 border-green-200">
                {channel.icon}
                <span className="font-medium text-green-800">{channel.label}</span>
                <Check className="h-4 w-4 text-green-600 ml-auto" />
              </div>
            ))}

            {/* Canales inactivos */}
            {!producto.Comedor && (
              <div className="flex items-center gap-2 p-3 rounded-lg border bg-gray-50 border-gray-200">
                <Home className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Comedor</span>
                <X className="h-4 w-4 text-gray-400 ml-auto" />
              </div>
            )}
            {!producto.ADomicilio && (
              <div className="flex items-center gap-2 p-3 rounded-lg border bg-gray-50 border-gray-200">
                <Truck className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">A Domicilio</span>
                <X className="h-4 w-4 text-gray-400 ml-auto" />
              </div>
            )}
            {!producto.Mostrador && (
              <div className="flex items-center gap-2 p-3 rounded-lg border bg-gray-50 border-gray-200">
                <ShoppingCart className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Mostrador</span>
                <X className="h-4 w-4 text-gray-400 ml-auto" />
              </div>
            )}
            {!producto.Enlinea && (
              <div className="flex items-center gap-2 p-3 rounded-lg border bg-gray-50 border-gray-200">
                <Smartphone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">En Línea</span>
                <X className="h-4 w-4 text-gray-400 ml-auto" />
              </div>
            )}
            {!producto.EnAPP && (
              <div className="flex items-center gap-2 p-3 rounded-lg border bg-gray-50 border-gray-200">
                <Smartphone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">APP</span>
                <X className="h-4 w-4 text-gray-400 ml-auto" />
              </div>
            )}
            {!producto.EnMenuQR && (
              <div className="flex items-center gap-2 p-3 rounded-lg border bg-gray-50 border-gray-200">
                <QrCode className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Menú QR</span>
                <X className="h-4 w-4 text-gray-400 ml-auto" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Información fiscal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información Fiscal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Clave Tributaria:</span>
            <span className="font-medium">{producto.ClaveTributaria || "No especificada"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Exento de Impuesto:</span>
            <div className="flex items-center gap-1">
              {producto.ExentoImpuesto ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Sí</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">No</span>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Facturable:</span>
            <div className="flex items-center gap-1">
              {producto.Facturable ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Sí</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">No</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información del sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información del Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fecha de Creación:</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{producto.Fecha_UltimoCambio.toLocaleDateString("es-MX")}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Última Modificación:</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{producto.Fecha_UltimoCambio.toLocaleDateString("es-MX")}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">ID del Producto:</span>
            <span className="font-mono text-sm">{producto.ProductoULID}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
