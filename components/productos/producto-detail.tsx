"use client"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit, X, Package, Star, Calendar, Building } from "lucide-react"
import type { Producto } from "@/schemas/productos.schemas"

interface ProductoDetailProps {
  producto: Producto
  onEdit: () => void
  onClose: () => void
}

export function ProductoDetail({ producto, onEdit, onClose }: ProductoDetailProps) {
  const getProductoIcon = (tipo: string) => {
    switch (tipo) {
      case "Platillo":
        return "🍽️"
      case "Botella":
        return "🍷"
      default:
        return "📦"
    }
  }

  const getProductoColor = (tipo: string) => {
    switch (tipo) {
      case "Platillo":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Botella":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No disponible"
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header con imagen y información principal */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Imagen */}
        <div className="lg:w-1/3">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {producto.Imagen ? (
              <img
                src={producto.Imagen || "/placeholder.svg"}
                alt={producto.Nombredelproducto}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                {getProductoIcon(producto.TipoProducto)}
              </div>
            )}
          </div>
        </div>

        {/* Información principal */}
        <div className="lg:w-2/3 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{producto.Nombredelproducto}</h1>
                {producto.Favorito && (
                  <Badge className="bg-yellow-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Favorito
                  </Badge>
                )}
                {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
              </div>
              <p className="text-gray-600 mb-2">
                Clave: <span className="font-mono">{producto.ClaveProducto}</span>
              </p>
              <Badge className={`${getProductoColor(producto.TipoProducto)} text-sm`}>
                <span className="mr-1">{getProductoIcon(producto.TipoProducto)}</span>
                {producto.TipoProducto}
              </Badge>
            </div>
          </div>

          {producto.Descripcion && (
            <div>
              <h3 className="font-semibold mb-2">Descripción</h3>
              <p className="text-gray-700 leading-relaxed">{producto.Descripcion}</p>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Configuración del producto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opciones de venta */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5" />
              Opciones de Venta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Permite Descuento</span>
              <span className={producto.PermiteDescuento ? "text-green-600" : "text-red-600"}>
                {producto.PermiteDescuento ? "✅ Sí" : "❌ No"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Acepta Propina</span>
              <span className={producto.AceptaPropina ? "text-green-600" : "text-red-600"}>
                {producto.AceptaPropina ? "✅ Sí" : "❌ No"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Pregunta Cocción</span>
              <span className={producto.PreguntaCoccion ? "text-green-600" : "text-red-600"}>
                {producto.PreguntaCoccion ? "✅ Sí" : "❌ No"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Controla Stock</span>
              <span className={producto.ControlaStock ? "text-green-600" : "text-red-600"}>
                {producto.ControlaStock ? "✅ Sí" : "❌ No"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Canales de venta */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="h-5 w-5" />
              Canales de Venta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>🏠 Comedor</span>
              <span className={producto.Comedor ? "text-green-600" : "text-gray-400"}>
                {producto.Comedor ? "✅ Activo" : "⭕ Inactivo"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>🚚 A Domicilio</span>
              <span className={producto.ADomicilio ? "text-green-600" : "text-gray-400"}>
                {producto.ADomicilio ? "✅ Activo" : "⭕ Inactivo"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>🏪 Mostrador</span>
              <span className={producto.Mostrador ? "text-green-600" : "text-gray-400"}>
                {producto.Mostrador ? "✅ Activo" : "⭕ Inactivo"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>💻 En Línea</span>
              <span className={producto.Enlinea ? "text-green-600" : "text-gray-400"}>
                {producto.Enlinea ? "✅ Activo" : "⭕ Inactivo"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>📱 Menú QR</span>
              <span className={producto.EnMenuQR ? "text-green-600" : "text-gray-400"}>
                {producto.EnMenuQR ? "✅ Activo" : "⭕ Inactivo"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información del sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Información del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-600">Último Cambio</Label>
            <p className="text-sm">{formatDate(producto.Fecha_UltimoCambio)}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-600">Última Sincronización</Label>
            <p className="text-sm">{formatDate(producto.Fecha_Sync)}</p>
          </div>
          {producto.UsuarioULID && (
            <div>
              <Label className="text-sm font-medium text-gray-600">Usuario</Label>
              <p className="text-sm font-mono">{producto.UsuarioULID}</p>
            </div>
          )}
          {producto.EmpresaULID && (
            <div>
              <Label className="text-sm font-medium text-gray-600">Empresa</Label>
              <p className="text-sm font-mono">{producto.EmpresaULID}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Botones de acción */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          <X className="h-4 w-4 mr-2" />
          Cerrar
        </Button>
        <Button onClick={onEdit} className="bg-orange-500 hover:bg-orange-600">
          <Edit className="h-4 w-4 mr-2" />
          Editar Producto
        </Button>
      </div>
    </div>
  )
}
