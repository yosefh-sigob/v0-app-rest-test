"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { Upload, X, ImageIcon, Save, XCircle } from "lucide-react"
import {
  createProductoSchema,
  updateProductoSchema,
  type CreateProductoInput,
  type UpdateProductoInput,
  type Producto,
} from "@/schemas/productos.schemas"
import { createProducto, updateProducto } from "@/actions/productos.actions"

interface ProductoFormProps {
  producto?: Producto
  onSuccess: (producto: Producto) => void
  onCancel: () => void
}

export function ProductoForm({ producto, onSuccess, onCancel }: ProductoFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(producto?.Imagen || null)
  const [isDragOver, setIsDragOver] = useState(false)

  const isEditing = !!producto

  const form = useForm<CreateProductoInput | UpdateProductoInput>({
    resolver: zodResolver(isEditing ? updateProductoSchema : createProductoSchema),
    defaultValues: {
      Nombredelproducto: producto?.Nombredelproducto || "",
      ClaveProducto: producto?.ClaveProducto || "",
      TipoProducto: producto?.TipoProducto || "Producto",
      Descripcion: producto?.Descripcion || "",
      Imagen: producto?.Imagen || "",
      GrupoProductoID: producto?.GrupoProductoID || undefined,
      UnidadID: producto?.UnidadID || undefined,
      AreaProduccionID: producto?.AreaProduccionID || undefined,
      AlmacenID: producto?.AlmacenID || undefined,
      PermiteDescuento: producto?.PermiteDescuento ?? true,
      ControlaStock: producto?.ControlaStock ?? false,
      AceptaPropina: producto?.AceptaPropina ?? false,
      PreguntaCoccion: producto?.PreguntaCoccion ?? false,
      Comedor: producto?.Comedor ?? true,
      ADomicilio: producto?.ADomicilio ?? false,
      Mostrador: producto?.Mostrador ?? false,
      Enlinea: producto?.Enlinea ?? false,
      EnMenuQR: producto?.EnMenuQR ?? false,
      Favorito: producto?.Favorito ?? false,
      Suspendido: producto?.Suspendido ?? false,
    },
  })

  const handleImageUpload = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast({
        title: "Error",
        description: "La imagen no puede ser mayor a 5MB",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      setImagePreview(base64)
      form.setValue("Imagen", base64)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find((file) => file.type.startsWith("image/"))

    if (imageFile) {
      handleImageUpload(imageFile)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    form.setValue("Imagen", "")
  }

  const onSubmit = async (data: CreateProductoInput | UpdateProductoInput) => {
    setIsLoading(true)
    try {
      let result
      if (isEditing && producto) {
        result = await updateProducto(producto.ProductoULID, data as UpdateProductoInput)
      } else {
        result = await createProducto(data as CreateProductoInput)
      }

      if (result.success && result.data) {
        onSuccess(result.data)
      } else {
        toast({
          title: "Error",
          description: result.error || "Error al guardar el producto",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error inesperado al guardar el producto",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">📝 General</TabsTrigger>
            <TabsTrigger value="imagen">🖼️ Imagen</TabsTrigger>
            <TabsTrigger value="configuracion">⚙️ Configuración</TabsTrigger>
            <TabsTrigger value="canales">🛒 Canales</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="Nombredelproducto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre del Producto *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Hamburguesa Clásica" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ClaveProducto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Clave del Producto *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: HAM001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="TipoProducto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Producto *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Platillo">🍽️ Platillo</SelectItem>
                          <SelectItem value="Producto">📦 Producto</SelectItem>
                          <SelectItem value="Botella">🍷 Botella</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Platillo: Requiere receta | Producto: Se vende como se compra | Botella: Bebidas alcohólicas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe el producto..." className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="imagen" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Imagen del Producto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {imagePreview ? (
                    <div className="relative">
                      <div className="aspect-video w-full max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
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
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDragOver ? "border-orange-500 bg-orange-50" : "border-gray-300"
                      }`}
                      onDrop={handleDrop}
                      onDragOver={(e) => {
                        e.preventDefault()
                        setIsDragOver(true)
                      }}
                      onDragLeave={() => setIsDragOver(false)}
                    >
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Arrastra una imagen aquí o haz clic para seleccionar</p>
                      <p className="text-sm text-gray-500 mb-4">Formatos: JPG, PNG, GIF (máx. 5MB)</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("image-upload")?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Seleccionar Imagen
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuracion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Configuración del Producto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-gray-700">Opciones de Venta</h4>

                    <FormField
                      control={form.control}
                      name="PermiteDescuento"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div>
                            <FormLabel>Permite Descuento</FormLabel>
                            <FormDescription>El producto puede tener descuentos aplicados</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="AceptaPropina"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div>
                            <FormLabel>Acepta Propina</FormLabel>
                            <FormDescription>Se puede agregar propina a este producto</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="PreguntaCoccion"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div>
                            <FormLabel>Pregunta Cocción</FormLabel>
                            <FormDescription>Preguntar término de cocción al ordenar</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-gray-700">Control de Inventario</h4>

                    <FormField
                      control={form.control}
                      name="ControlaStock"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div>
                            <FormLabel>Controla Stock</FormLabel>
                            <FormDescription>Llevar control de entradas y salidas</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="Favorito"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div>
                            <FormLabel>Producto Favorito</FormLabel>
                            <FormDescription>Marcar como producto recurrente</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="Suspendido"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div>
                            <FormLabel>Suspendido</FormLabel>
                            <FormDescription>Producto temporalmente no disponible</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="canales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Canales de Venta</CardTitle>
                <p className="text-sm text-gray-600">Selecciona dónde estará disponible este producto</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="Comedor"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 p-4 border rounded-lg">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="flex-1">
                          <FormLabel className="text-base font-medium">🏠 Comedor</FormLabel>
                          <FormDescription>Disponible para consumo en el restaurante</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ADomicilio"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 p-4 border rounded-lg">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="flex-1">
                          <FormLabel className="text-base font-medium">🚚 A Domicilio</FormLabel>
                          <FormDescription>Disponible para entrega a domicilio</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Mostrador"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 p-4 border rounded-lg">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="flex-1">
                          <FormLabel className="text-base font-medium">🏪 Mostrador</FormLabel>
                          <FormDescription>Disponible para venta en mostrador</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Enlinea"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 p-4 border rounded-lg">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="flex-1">
                          <FormLabel className="text-base font-medium">💻 En Línea</FormLabel>
                          <FormDescription>Disponible en plataformas digitales</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="EnMenuQR"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 p-4 border rounded-lg">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="flex-1">
                          <FormLabel className="text-base font-medium">📱 Menú QR</FormLabel>
                          <FormDescription>Visible en el menú digital QR</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator />

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            <XCircle className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-600">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Guardando..." : isEditing ? "Actualizar Producto" : "Crear Producto"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
