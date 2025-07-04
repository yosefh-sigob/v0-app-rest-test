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
  Check,
  AlertCircle,
  Calendar,
  User,
  Building,
  Hash,
  FileText,
  Settings,
  ShoppingCart,
  Home,
  Truck,
  Smartphone,
  QrCode,
  Monitor,
  Globe,
} from "lucide-react"
import type { Producto } from "@/schemas/productos.schemas"

interface ProductoDetailProps {
  producto: Producto
  onEdit: () => void
  onClose: () => void
}

export function ProductoDetail({ producto, onEdit, onClose }: ProductoDetailProps) {
  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Platillo":
        return <Utensils className="h-5 w-5 text-orange-600" />
      case "Botella":
        return <Wine className="h-5 w-5 text-purple-600" />
      default:
        return <Package className="h-5 w-5 text-blue-600" />
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Platillo":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Botella":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const canalesActivos = [
    { key: "Comedor", label: "🏠 Comedor", icon: <Home className="h-4 w-4" />, activo: producto.Comedor },
    { key: "ADomicilio", label: "🚚 A Domicilio", icon: <Truck className="h-4 w-4" />, activo: producto.ADomicilio },
    { key: "Mostrador", label: "🏪 Mostrador", icon: <Monitor className="h-4 w-4" />, activo: producto.Mostrador },
    { key: "Enlinea", label: "💻 En Línea", icon: <Globe className="h-4 w-4" />, activo: producto.Enlinea },
    { key: "EnAPP", label: "📱 En APP", icon: <Smartphone className="h-4 w-4" />, activo: producto.EnAPP },
    { key: "EnMenuQR", label: "📱 Menú QR", icon: <QrCode className="h-4 w-4" />, activo: producto.EnMenuQR },
  ]

  const configuraciones = [
    { key: "Favorito", label: "⭐ Producto Favorito", activo: producto.Favorito },
    { key: "Suspendido", label: "🚫 Suspendido", activo: producto.Suspendido },
    { key: "PrecioAbierto", label: "💰 Precio Abierto", activo: producto.PrecioAbierto },
    { key: "ControlStock", label: "📦 Control de Stock", activo: producto.ControlStock },
    { key: "Facturable", label: "🧾 Facturable", activo: producto.Facturable },
    { key: "ExentoImpuesto", label: "🏷️ Exento de Impuesto", activo: producto.ExentoImpuesto },
    { key: "PrecioxUtilidad", label: "📈 Precio por Utilidad", activo: producto.PrecioxUtilidad },
  ]

  return (
    <div className="space-y-6">
      {/* Header con imagen y información principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden relative">
                {producto.Imagen ? (
                  <img
                    src={producto.Imagen || "/placeholder.svg"}
                    alt={producto.Nombredelproducto}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    {getTipoIcon(producto.TipoProducto)}
                  </div>
                )}
                {producto.Favorito && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Favorito
                    </Badge>
                  </div>
                )}
                {producto.Suspendido && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="destructive">Suspendido</Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${getTipoColor(producto.TipoProducto)}`}>
                    {getTipoIcon(producto.TipoProducto)}
                    <span className="ml-2">{producto.TipoProducto}</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Información básica */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{producto.Nombredelproducto}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Hash className="h-4 w-4" />
                      <span className="font-mono">{producto.ClaveProducto}</span>
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
            </CardHeader>
            <CardContent>
              {producto.Descripcion && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-700">Descripción</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed pl-6">{producto.Descripcion}</p>
                </div>
              )}

              {producto.ClaveTributaria && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-700">Clave Tributaria (SAT)</span>
                  </div>
                  <p className="text-gray-600 font-mono pl-6">{producto.ClaveTributaria}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Configuraciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-600" />
            Configuración del Producto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {configuraciones.map((config) => (
              <div key={config.key} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm font-medium">{config.label}</span>
                {config.activo ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-gray-400" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Canales de venta */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            Canales de Venta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {canalesActivos.map((canal) => (
              <div
                key={canal.key}
                className={`flex items-center gap-3 p-3 border rounded-lg ${
                  canal.activo ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className={`${canal.activo ? "text-green-600" : "text-gray-400"}`}>{canal.icon}</div>
                <span className={`text-sm font-medium ${canal.activo ? "text-green-800" : "text-gray-500"}`}>
                  {canal.label}
                </span>
                {canal.activo ? (
                  <Check className="h-4 w-4 text-green-600 ml-auto" />
                ) : (
                  <X className="h-4 w-4 text-gray-400 ml-auto" />
                )}
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">Resumen</h4>
            <div className="flex flex-wrap gap-2">
              {canalesActivos
                .filter((canal) => canal.activo)
                .map((canal) => (
                  <Badge key={canal.key} variant="secondary" className="bg-green-100 text-green-800">
                    {canal.label}
                  </Badge>
                ))}
              {canalesActivos.filter((canal) => canal.activo).length === 0 && (
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">No hay canales de venta activos</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metadatos del sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            Información del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-700">Última Modificación</span>
              </div>
              <p className="text-gray-600 pl-6">
                {producto.Fecha_UltimoCambio
                  ? new Date(producto.Fecha_UltimoCambio).toLocaleString("es-MX")
                  : "No disponible"}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-700">ID del Producto</span>
              </div>
              <p className="text-gray-600 font-mono pl-6">{producto.ProductoULID}</p>
            </div>

            {producto.UsuarioID && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Usuario</span>
                </div>
                <p className="text-gray-600 pl-6">ID: {producto.UsuarioID}</p>
              </div>
            )}

            {producto.EmpresaULID && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Empresa</span>
                </div>
                <p className="text-gray-600 font-mono pl-6">{producto.EmpresaULID}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
