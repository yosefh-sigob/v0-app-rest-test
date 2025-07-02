"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Clock,
  DollarSign,
  Warehouse,
  Users,
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
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">{TIPO_ICONS[producto.TipoProducto]}</div>
            <div>
              <h2 className="text-2xl font-bold">{producto.Nombredelproducto}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{producto.ClaveProducto}</Badge>
                <Badge variant="outline">{producto.TipoProducto}</Badge>
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
            src={`/placeholder.svg?height=300&width=400&text=${encodeURIComponent(producto.Nombredelproducto)}`}
            alt={producto.Nombredelproducto}
            className="w-full max-w-md mx-auto h-64 object-cover rounded-lg"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información General */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Información General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Descripción</label>
              <p className="mt-1">{producto.Descripcion || "Sin descripción"}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Categoría</label>
                <p className="mt-1">{grupo?.nombre || "Sin categoría"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Unidad</label>
                <p className="mt-1">{unidad ? `${unidad.nombre} (${unidad.abreviacion})` : "Sin unidad"}</p>
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

        {/* Configuración de Ventas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Configuración de Ventas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Canales de Venta</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {getChannelBadges().map((channel, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {channel.icon}
                    {channel.label}
                  </Badge>
                ))}
                {getChannelBadges().length === 0 && (
                  <p className="text-sm text-muted-foreground">Sin canales configurados</p>
                )}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tiempo de Preparación</label>
                <p className="mt-1 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {producto.TiempoPreparacion || 0} min
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Orden de Impresión</label>
                <p className="mt-1">{producto.OrdenImpresion || "No definido"}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Configuraciones Especiales</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {producto.RequierePreparacion && <Badge variant="outline">Requiere Preparación</Badge>}
                {producto.PermiteDescuento && <Badge variant="outline">Permite Descuento</Badge>}
                {producto.EsCombo && <Badge variant="outline">Es Combo</Badge>}
                {producto.TienePresentaciones && <Badge variant="outline">Tiene Presentaciones</Badge>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Control de Inventario */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Warehouse className="h-5 w-5" />
              Control de Inventario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Stock Mínimo</label>
                <p className="mt-1">{producto.StockMinimo || 0}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Stock Máximo</label>
                <p className="mt-1">{producto.StockMaximo || 0}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Configuraciones</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {producto.ManejaInventario && <Badge variant="outline">Maneja Inventario</Badge>}
                {producto.ControlaStock && <Badge variant="outline">Controla Stock</Badge>}
                {producto.AlertaStockMinimo && <Badge variant="outline">Alerta Stock Mínimo</Badge>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información Adicional */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Información Adicional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Notas Internas</label>
              <p className="mt-1">{producto.NotasInternas || "Sin notas"}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Instrucciones Especiales</label>
              <p className="mt-1">{producto.InstruccionesEspeciales || "Sin instrucciones"}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Creado</label>
                <p className="mt-1">
                  {producto.FechaCreacion ? new Date(producto.FechaCreacion).toLocaleDateString() : "No disponible"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Actualizado</label>
                <p className="mt-1">
                  {producto.FechaActualizacion
                    ? new Date(producto.FechaActualizacion).toLocaleDateString()
                    : "No disponible"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
