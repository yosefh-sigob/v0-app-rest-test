"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Edit, Star, Package, Utensils, Truck, Store, Smartphone, QrCode } from "lucide-react"
import type { Producto } from "@/interfaces/database"

interface ProductoDetailProps {
  producto: Producto
  onClose: () => void
  onEdit: () => void
}

export function ProductoDetail({ producto, onClose, onEdit }: ProductoDetailProps) {
  const canalesActivos = [
    { key: "Comedor", value: producto.Comedor, icon: Utensils, label: "Comedor" },
    { key: "ADomicilio", value: producto.ADomicilio, icon: Truck, label: "A Domicilio" },
    { key: "Mostrador", value: producto.Mostrador, icon: Store, label: "Mostrador" },
    { key: "Enlinea", value: producto.Enlinea, icon: Package, label: "En Línea" },
    { key: "EnAPP", value: producto.EnAPP, icon: Smartphone, label: "APP" },
    { key: "EnMenuQR", value: producto.EnMenuQR, icon: QrCode, label: "Menú QR" },
  ].filter((canal) => canal.value)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold">{producto.Nombredelproducto}</h2>
            {producto.Favorito && <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{producto.ClaveProducto}</Badge>
            <Badge variant={producto.Suspendido ? "destructive" : "default"}>{producto.TipoProducto}</Badge>
            {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
          </div>
        </div>
        <Button onClick={onEdit}>
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>
      </div>

      {/* Descripción */}
      {producto.Descripcion && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Descripción</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{producto.Descripcion}</p>
          </CardContent>
        </Card>
      )}

      {/* Información General */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tipo de Producto</p>
              <p className="text-sm">{producto.TipoProducto}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Grupo</p>
              <p className="text-sm">ID: {producto.GrupoProductoULID}</p>
            </div>
            {producto.SubgrupoProductoULID && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subgrupo</p>
                <p className="text-sm">ID: {producto.SubgrupoProductoULID}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">Unidad</p>
              <p className="text-sm">ID: {producto.UnidadesULID}</p>
            </div>
          </div>

          {(producto.AreaProduccionULID || producto.AlmacenULID) && (
            <>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                {producto.AreaProduccionULID && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Área de Producción</p>
                    <p className="text-sm">ID: {producto.AreaProduccionULID}</p>
                  </div>
                )}
                {producto.AlmacenULID && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Almacén</p>
                    <p className="text-sm">ID: {producto.AlmacenULID}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Canales de Venta */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Canales de Venta</CardTitle>
          <CardDescription>Canales donde está disponible el producto</CardDescription>
        </CardHeader>
        <CardContent>
          {canalesActivos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {canalesActivos.map((canal) => {
                const Icon = canal.icon
                return (
                  <div key={canal.key} className="flex items-center space-x-2 p-2 rounded-lg bg-muted/50">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{canal.label}</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No hay canales de venta configurados</p>
          )}
        </CardContent>
      </Card>

      {/* Configuración */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Configuración</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Control de Stock</span>
              <Badge variant={producto.ControlStock ? "default" : "secondary"}>
                {producto.ControlStock ? "Sí" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Precio Abierto</span>
              <Badge variant={producto.PrecioAbierto ? "default" : "secondary"}>
                {producto.PrecioAbierto ? "Sí" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Precio por Utilidad</span>
              <Badge variant={producto.PrecioxUtilidadad ? "default" : "secondary"}>
                {producto.PrecioxUtilidadad ? "Sí" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Facturable</span>
              <Badge variant={producto.Facturable ? "default" : "secondary"}>{producto.Facturable ? "Sí" : "No"}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Exento de Impuesto</span>
              <Badge variant={producto.ExentoImpuesto ? "default" : "secondary"}>
                {producto.ExentoImpuesto ? "Sí" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Producto Favorito</span>
              <Badge variant={producto.Favorito ? "default" : "secondary"}>{producto.Favorito ? "Sí" : "No"}</Badge>
            </div>
          </div>

          {producto.ClaveTributaria && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clave Tributaria</p>
                <p className="text-sm">{producto.ClaveTributaria}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Información del Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información del Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID del Producto:</span>
              <span className="font-mono text-xs">{producto.ProductoULID}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Última Modificación:</span>
              <span>{new Date(producto.Fecha_UltimoCambio).toLocaleString()}</span>
            </div>
            {producto.Fecha_Sync && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Última Sincronización:</span>
                <span>{new Date(producto.Fecha_Sync).toLocaleString()}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
