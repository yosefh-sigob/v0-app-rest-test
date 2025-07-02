"use client"

import { useState } from "react"
import { Plus, Search, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LicenseGuard } from "@/components/license-guard"
import type { Producto } from "@/interfaces/database"
import { NivelLicencia } from "@/interfaces/database"

interface ProductosViewProps {
  productos: Producto[]
  empresaId: string
}

export function ProductosView({ productos, empresaId }: ProductosViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // En producción, esto vendría de la sesión del usuario
  const currentLicense = NivelLicencia.GRATIS

  const filteredProductos = productos.filter(
    (producto) =>
      producto.Nombredelproducto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.Descripcion?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const productosActivos = filteredProductos.filter((p) => !p.Suspendido)
  const productosSuspendidos = filteredProductos.filter((p) => p.Suspendido)

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground">Gestiona el catálogo de productos de tu restaurante</p>
        </div>

        <LicenseGuard currentLicense={currentLicense} requiredFeature="ventaComedor">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Producto
          </Button>
        </LicenseGuard>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <Tabs defaultValue="activos" className="w-full">
        <TabsList>
          <TabsTrigger value="activos">Activos ({productosActivos.length})</TabsTrigger>
          <TabsTrigger value="suspendidos">Suspendidos ({productosSuspendidos.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="activos" className="space-y-4">
          {productosActivos.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">No hay productos activos</h3>
                  <p className="text-muted-foreground">Comienza agregando productos a tu catálogo</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-4"
              }
            >
              {productosActivos.map((producto) => (
                <ProductoCard key={producto.ProductoULID} producto={producto} viewMode={viewMode} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="suspendidos" className="space-y-4">
          {productosSuspendidos.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">No hay productos suspendidos</h3>
                  <p className="text-muted-foreground">Los productos suspendidos aparecerán aquí</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-4"
              }
            >
              {productosSuspendidos.map((producto) => (
                <ProductoCard key={producto.ProductoULID} producto={producto} viewMode={viewMode} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ProductoCardProps {
  producto: Producto
  viewMode: "grid" | "list"
}

function ProductoCard({ producto, viewMode }: ProductoCardProps) {
  if (viewMode === "list") {
    return (
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-lg font-semibold">{producto.Nombredelproducto.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h3 className="font-semibold">{producto.Nombredelproducto}</h3>
              <p className="text-sm text-muted-foreground">{producto.Descripcion}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={producto.Favorito ? "default" : "secondary"}>{producto.TipoProducto}</Badge>
            {producto.Suspendido && <Badge variant="destructive">Suspendido</Badge>}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square bg-muted flex items-center justify-center">
        <span className="text-2xl font-bold text-muted-foreground">
          {producto.Nombredelproducto.charAt(0).toUpperCase()}
        </span>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base line-clamp-1">{producto.Nombredelproducto}</CardTitle>
          {producto.Favorito && (
            <Badge variant="secondary" className="ml-2">
              ★
            </Badge>
          )}
        </div>
        {producto.Descripcion && <CardDescription className="line-clamp-2">{producto.Descripcion}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Badge variant={producto.Suspendido ? "destructive" : "default"}>{producto.TipoProducto}</Badge>
          <div className="flex space-x-1">
            {producto.Comedor && (
              <Badge variant="outline" className="text-xs">
                Comedor
              </Badge>
            )}
            {producto.ADomicilio && (
              <Badge variant="outline" className="text-xs">
                Domicilio
              </Badge>
            )}
            {producto.Mostrador && (
              <Badge variant="outline" className="text-xs">
                Mostrador
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
