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
  Home,
  Truck,
  ShoppingCart,
  Smartphone,
  QrCode,
  Star,
  Calendar,
  Tag,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { getImageSrc } from "@/lib/utils/image"
import type { Produto } from "@/interfaces/database"

interface ProductoDetailProps {
  produto: Produto
  gruposProductos: Array<{ id: number; nombre: string }>
  unidades: Array<{ id: number; nombre: string; abreviacion: string }>
  areasProduccion: Array<{ id: number; nombre: string }>
  almacenes: Array<{ id: number; nombre: string }>
  onEdit: () => void
  onClose: () => void
}

const TIPO_ICONS = {
  Platillo: <Utensils className="h-5 w-5" />,
  Produto: <Package className="h-5 w-5" />,
  Botella: <Wine className="h-5 w-5" />,
}

export function ProductoDetail({
  produto,
  gruposProductos,
  unidades,
  areasProduccion,
  almacenes,
  onEdit,
  onClose,
}: ProductoDetailProps) {
  const grupo = gruposProductos.find((g) => g.id === produto.GrupoProductoID)
  const unidad = unidades.find((u) => u.id === produto.UnidadID)
  const areaProduccion = areasProduccion.find((a) => a.id === produto.AreaProduccionID)
  const almacen = almacenes.find((a) => a.id === produto.AlmacenID)

  const getChannelBadges = () => {
    const channels = []
    if (produto.Comedor)
      channels.push({ icon: <Home className="h-4 w-4" />, label: "Comedor", color: "bg-green-100 text-green-800" })
    if (produto.ADomicilio)
      channels.push({ icon: <Truck className="h-4 w-4" />, label: "Domicilio", color: "bg-blue-100 text-blue-800" })
    if (produto.Mostrador)
      channels.push({
        icon: <ShoppingCart className="h-4 w-4" />,
        label: "Mostrador",
        color: "bg-purple-100 text-purple-800",
      })
    if (produto.Enlinea)
      channels.push({
        icon: <Smartphone className="h-4 w-4" />,
        label: "En línea",
        color: "bg-orange-100 text-orange-800",
      })
    if (produto.EnMenuQR)
      channels.push({ icon: <QrCode className="h-4 w-4" />, label: "QR", color: "bg-gray-100 text-gray-800" })
    return channels
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header con imagen y información principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Imagen del produto */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={getImageSrc(produto.Imagen) || "/placeholder.svg"}
                  alt={produto.Nombredelproducto}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {produto.Favorito && (
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      Favorito
                    </Badge>
                  )}
                  {produto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                    {TIPO_ICONS[produto.TipoProducto]}
                    <span className="ml-2">{produto.TipoProducto}</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información principal */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{produto.Nombredelproducto}</h1>
            <div className="flex items-center gap-4 text-lg text-gray-600 mb-4">
              <span className="font-mono font-medium">Código: {produto.ClaveProducto}</span>
              <Separator orientation="vertical" className="h-6" />
              <span className="flex items-center gap-2">
                {TIPO_ICONS[produto.TipoProducto]}
                {produto.TipoProducto}
              </span>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              {produto.Descripcion || "Sin descripción disponible"}
            </p>
          </div>

          {/* Canales de venta */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              Canales de Venta
            </h3>
            <div className="flex flex-wrap gap-3">
              {getChannelBadges().map((channel, index) => (
                <Badge key={index} variant="secondary" className={`${channel.color} px-3 py-2 text-sm`}>
                  {channel.icon}
                  <span className="ml-2">{channel.label}</span>
                </Badge>
              ))}
              {getChannelBadges().length === 0 && (
                <div className="text-gray-500 italic">No hay canales de venta configurados</div>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4">
            <Button onClick={onEdit} className="bg-orange-600 hover:bg-orange-700">
              <Edit className="h-4 w-4 mr-2" />
              Editar Produto
            </Button>
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Cerrar
            </Button>
          </div>
        </div>
      </div>

      {/* Información detallada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Clasificación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-purple-600" />
              Clasificación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Categoría</label>
                <p className="text-base text-gray-900">{grupo?.nombre || "Sin categoría"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Unidad de Medida</label>
                <p className="text-base text-gray-900">
                  {unidad ? `${unidad.nombre} (${unidad.abreviacion})` : "Sin unidad"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Área de Producción</label>
                <p className="text-base text-gray-900">{areaProduccion?.nombre || "Sin área específica"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Almacén</label>
                <p className="text-base text-gray-900">{almacen?.nombre || "Sin almacén específico"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-green-600" />
              Configuración
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                {produto.PermiteDescuento ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400" />
                )}
                <span className="text-sm">Permite Descuento</span>
              </div>
              <div className="flex items-center gap-3">
                {produto.ControlaStock ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400" />
                )}
                <span className="text-sm">Controla Stock</span>
              </div>
              <div className="flex items-center gap-3">
                {produto.AceptaPropina ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400" />
                )}
                <span className="text-sm">Acepta Propina</span>
              </div>
              <div className="flex items-center gap-3">
                {produto.PreguntaCoccion ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400" />
                )}
                <span className="text-sm">Pregunta Cocción</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información del sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            Información del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Fecha de Creación</label>
              <p className="text-base text-gray-900">{formatDate(produto.FechaCreacion)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Última Actualización</label>
              <p className="text-base text-gray-900">{formatDate(produto.FechaActualizacion)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estado del produto */}
      {(produto.Favorito || produto.Suspendido) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Estado Especial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {produto.Favorito && (
                <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
                  <Star className="h-5 w-5 text-yellow-600 fill-current" />
                  <span className="text-yellow-800 font-medium">Produto Favorito</span>
                </div>
              )}
              {produto.Suspendido && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-800 font-medium">Produto Suspendido</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
