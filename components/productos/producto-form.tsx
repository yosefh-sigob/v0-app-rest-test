"use client"

import type React from "react"
import type { Produto } from "@/schemas/produtos.schemas" // Import Produto type

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Upload, X, Save, ArrowLeft, Package, Settings, ShoppingCart, ImageIcon } from "lucide-react"
import { createProducto, updateProducto } from "@/actions/productos.actions"
import {
  createProductoSchema,
  updateProductoSchema,
  type CreateProductoInput,
  type UpdateProductoInput,
} from "@/schemas/produtos.schemas"
import { toast } from "@/hooks/use-toast"

interface ProductoFormProps {
  producto?: Produto
  onSuccess: (producto: Produto) => void
  onCancel: () => void
}

export function ProductoForm({ producto, onSuccess, onCancel }: ProductoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(producto?.Imagen || null)
  const [activeTab, setActiveTab] = useState("general")

  const isEditing = !!producto

  const form = useForm<CreateProductoInput | UpdateProductoInput>({
    resolver: zodResolver(isEditing ? updateProductoSchema : createProductoSchema),
    defaultValues: {
      ClaveProducto: producto?.ClaveProducto || "",
      TipoProducto: producto?.TipoProducto || "Produto",
      Nombredelproducto: producto?.Nombredelproducto || "",
      Descripcion: producto?.Descripcion || "",
      Favorito: producto?.Favorito || false,
      ExentoImpuesto: producto?.ExentoImpuesto || false,
      PrecioAbierto: producto?.PrecioAbierto || false,
      ControlStock: producto?.ControlStock || false,
      PrecioxUtilidad: producto?.PrecioxUtilidad || false,
      Facturable: producto?.Facturable || true,
      ClaveTributaria: producto?.ClaveTributaria || "",
      Suspendido: producto?.Suspendido || false,
      Comedor: producto?.Comedor || false,
      ADomicilio: producto?.ADomicilio || false,
      Mostrador: producto?.Mostrador || false,
      Enlinea: producto?.Enlinea || false,
      EnAPP: producto?.EnAPP || false,
      EnMenuQR: producto?.EnMenuQR || false,
      Imagen: producto?.Imagen || "",
      GrupoProductoID: producto?.GrupoProductoID,
      SubgrupoProductoID: producto?.SubgrupoProductoID,
      UnidadID: producto?.UnidadID,
      AreaProduccionID: producto?.AreaProduccionID,
      AlmacenID: producto?.AlmacenID,
      ClasificacionQRID: producto?.ClasificacionQRID,
    },
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        form.setValue("Imagen", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    form.setValue("Imagen", "")
  }

  const onSubmit = async (data: CreateProductoInput | UpdateProductoInput) => {
    setIsSubmitting(true)
    try {
      let result
      if (isEditing && producto) {
        result = await updateProducto(producto.ProductoULID, data as UpdateProductoInput)
      } else {
        result = await createProducto(data as CreateProductoInput)
      }

      if (result.success) {
        toast({
          title: "Éxito",
          description: result.message,
        })
        onSuccess(result.data)
      } else {
        toast({
          title: "Error",
          description: result.message || "Error al procesar el produto",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error inesperado al procesar el produto",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const tipoProductoOptions = [
    { value: "Platillo", label: "🍽️ Platillo", description: "Comida preparada con receta" },
    { value: "Produto", label: "📦 Produto", description: "Artículo que se vende tal como se compra" },
    { value: "Botella", label: "🍷 Botella", description: "Bebidas alcohólicas y no alcohólicas" },
  ]

  const canalesVenta = [
    { key: "Comedor", label: "🏠 Comedor", description: "Servicio en mesas del restaurante" },
    { key: "ADomicilio", label: "🚚 A Domicilio", description: "Entrega a domicilio" },
    { key: "Mostrador", label: "🏪 Mostrador", description: "Venta directa en mostrador" },
    { key: "Enlinea", label: "💻 En Línea", description: "Pedidos por internet" },
    { key: "EnAPP", label: "📱 En APP", description: "Pedidos por aplicación móvil" },
    { key: "EnMenuQR", label: "📱 Menú QR", description: "Pedidos por código QR" },
  ]

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="imagen" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Imagen
          </TabsTrigger>
          <TabsTrigger value="configuracion" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configuración
          </TabsTrigger>
          <TabsTrigger value="canales" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Canales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-orange-600" />
                Información General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ClaveProducto">Clave del Produto *</Label>
                  <Input
                    id="ClaveProducto"
                    placeholder="Ej: PROD001"
                    {...form.register("ClaveProducto")}
                    className="font-mono"
                  />
                  {form.formState.errors.ClaveProducto && (
                    <p className="text-sm text-red-600">{form.formState.errors.ClaveProducto.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="TipoProducto">Tipo de Produto *</Label>
                  <Select
                    value={form.watch("TipoProducto")}
                    onValueChange={(value) => form.setValue("TipoProducto", value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tipoProductoOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex flex-col">
                            <span>{option.label}</span>
                            <span className="text-xs text-gray-500">{option.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.TipoProducto && (
                    <p className="text-sm text-red-600">{form.formState.errors.TipoProducto.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="Nombredelproducto">Nombre del Produto *</Label>
                <Input
                  id="Nombredelproducto"
                  placeholder="Ej: Hamburguesa Clásica"
                  {...form.register("Nombredelproducto")}
                />
                {form.formState.errors.Nombredelproducto && (
                  <p className="text-sm text-red-600">{form.formState.errors.Nombredelproducto.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="Descripcion">Descripción</Label>
                <Textarea
                  id="Descripcion"
                  placeholder="Describe el produto, ingredientes, características..."
                  rows={3}
                  {...form.register("Descripcion")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ClaveTributaria">Clave Tributaria (SAT)</Label>
                <Input
                  id="ClaveTributaria"
                  placeholder="Clave del SAT para facturación"
                  {...form.register("ClaveTributaria")}
                  className="font-mono"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imagen" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-blue-600" />
                Imagen del Produto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full max-w-md h-48 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Arrastra una imagen aquí o haz clic para seleccionar</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF hasta 5MB</p>
                  </div>
                )}

                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" className="w-full bg-transparent" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        {imagePreview ? "Cambiar Imagen" : "Subir Imagen"}
                      </span>
                    </Button>
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-600" />
                Configuración del Produto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Estado y Características</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="Favorito" className="font-medium">
                          ⭐ Produto Favorito
                        </Label>
                        <p className="text-sm text-gray-500">Marcar como produto destacado</p>
                      </div>
                      <Switch
                        id="Favorito"
                        checked={form.watch("Favorito")}
                        onCheckedChange={(checked) => form.setValue("Favorito", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="Suspendido" className="font-medium">
                          🚫 Produto Suspendido
                        </Label>
                        <p className="text-sm text-gray-500">Ocultar del menú temporalmente</p>
                      </div>
                      <Switch
                        id="Suspendido"
                        checked={form.watch("Suspendido")}
                        onCheckedChange={(checked) => form.setValue("Suspendido", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="PrecioAbierto" className="font-medium">
                          💰 Precio Abierto
                        </Label>
                        <p className="text-sm text-gray-500">El mesero puede capturar el precio</p>
                      </div>
                      <Switch
                        id="PrecioAbierto"
                        checked={form.watch("PrecioAbierto")}
                        onCheckedChange={(checked) => form.setValue("PrecioAbierto", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Inventario y Facturación</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ControlStock" className="font-medium">
                          📦 Control de Stock
                        </Label>
                        <p className="text-sm text-gray-500">Llevar control de inventario</p>
                      </div>
                      <Switch
                        id="ControlStock"
                        checked={form.watch("ControlStock")}
                        onCheckedChange={(checked) => form.setValue("ControlStock", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="Facturable" className="font-medium">
                          🧾 Facturable
                        </Label>
                        <p className="text-sm text-gray-500">Se puede incluir en facturas</p>
                      </div>
                      <Switch
                        id="Facturable"
                        checked={form.watch("Facturable")}
                        onCheckedChange={(checked) => form.setValue("Facturable", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ExentoImpuesto" className="font-medium">
                          🏷️ Exento de Impuesto
                        </Label>
                        <p className="text-sm text-gray-500">No aplica IVA u otros impuestos</p>
                      </div>
                      <Switch
                        id="ExentoImpuesto"
                        checked={form.watch("ExentoImpuesto")}
                        onCheckedChange={(checked) => form.setValue("ExentoImpuesto", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="PrecioxUtilidad" className="font-medium">
                          📈 Precio por Utilidad
                        </Label>
                        <p className="text-sm text-gray-500">Calcular precio basado en costo + utilidad</p>
                      </div>
                      <Switch
                        id="PrecioxUtilidad"
                        checked={form.watch("PrecioxUtilidad")}
                        onCheckedChange={(checked) => form.setValue("PrecioxUtilidad", checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="canales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-green-600" />
                Canales de Venta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">Selecciona en qué canales estará disponible este produto:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {canalesVenta.map((canal) => (
                    <div key={canal.key} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <Label htmlFor={canal.key} className="font-medium">
                            {canal.label}
                          </Label>
                          <p className="text-sm text-gray-500">{canal.description}</p>
                        </div>
                        <Switch
                          id={canal.key}
                          checked={form.watch(canal.key as any)}
                          onCheckedChange={(checked) => form.setValue(canal.key as any, checked)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Resumen de Canales Activos</h4>
                  <div className="flex flex-wrap gap-2">
                    {canalesVenta
                      .filter((canal) => form.watch(canal.key as any))
                      .map((canal) => (
                        <Badge key={canal.key} variant="secondary">
                          {canal.label}
                        </Badge>
                      ))}
                    {canalesVenta.filter((canal) => form.watch(canal.key as any)).length === 0 && (
                      <p className="text-sm text-gray-500 italic">No hay canales seleccionados</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botones de acción fijos */}
      <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
          <Save className="h-4 w-4 mr-2" />
          {isSubmitting ? "Guardando..." : isEditing ? "Actualizar Produto" : "Crear Produto"}
        </Button>
      </div>
    </form>
  )
}
