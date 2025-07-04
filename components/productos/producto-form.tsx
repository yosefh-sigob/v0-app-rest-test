"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Save,
  X,
  Upload,
  Package,
  Settings,
  ShoppingCart,
  ImageIcon,
  Info,
  Utensils,
  Wine,
  Home,
  Truck,
  Smartphone,
  QrCode,
} from "lucide-react"
import { createProducto, updateProducto } from "@/actions/productos.actions"
import { productoSchema, type CreateProductoInput } from "@/schemas/productos.schemas"
import type { Producto } from "@/interfaces/database"

interface ProductoFormProps {
  producto?: Producto | null
  gruposProductos: Array<{ id: number; nombre: string }>
  unidades: Array<{ id: number; nombre: string; abreviacion: string }>
  areasProduccion: Array<{ id: number; nombre: string }>
  almacenes: Array<{ id: number; nombre: string }>
  onSuccess: () => void
  onCancel: () => void
}

const TIPO_ICONS = {
  Platillo: <Utensils className="h-4 w-4" />,
  Producto: <Package className="h-4 w-4" />,
  Botella: <Wine className="h-4 w-4" />,
}

export function ProductoForm({
  producto,
  gruposProductos,
  unidades,
  areasProduccion,
  almacenes,
  onSuccess,
  onCancel,
}: ProductoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(producto?.Imagen || null)

  const form = useForm<CreateProductoInput>({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      Nombredelproducto: producto?.Nombredelproducto || "",
      ClaveProducto: producto?.ClaveProducto || "",
      TipoProducto: producto?.TipoProducto || "Producto",
      Descripcion: producto?.Descripcion || "",
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: CreateProductoInput) => {
    setIsSubmitting(true)
    try {
      let result
      if (producto) {
        result = await updateProducto(producto.ProductoULID, data)
      } else {
        result = await createProducto(data)
      }

      if (result.success) {
        toast.success(result.message)
        onSuccess()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Error al guardar el producto")
    } finally {
      setIsSubmitting(false)
    }
  }

  const tipoProducto = form.watch("TipoProducto")

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="basico" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basico" className="flex items-center gap-2">
                <Info className="h-4 w-4" />📝 Básico
              </TabsTrigger>
              <TabsTrigger value="imagen" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                🖼️ Imagen
              </TabsTrigger>
              <TabsTrigger value="configuracion" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                ⚙️ Configuración
              </TabsTrigger>
              <TabsTrigger value="canales" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />🛒 Canales
              </TabsTrigger>
            </TabsList>

            {/* Tab Básico */}
            <TabsContent value="basico" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    Información Básica
                  </CardTitle>
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
                          <FormLabel>Código del Producto *</FormLabel>
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
                            <SelectItem value="Platillo">
                              <div className="flex items-center gap-2">
                                {TIPO_ICONS.Platillo}
                                Platillo (lleva receta)
                              </div>
                            </SelectItem>
                            <SelectItem value="Producto">
                              <div className="flex items-center gap-2">
                                {TIPO_ICONS.Producto}
                                Producto (se vende como se compra)
                              </div>
                            </SelectItem>
                            <SelectItem value="Botella">
                              <div className="flex items-center gap-2">
                                {TIPO_ICONS.Botella}
                                Botella (bebidas alcohólicas)
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
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
                          <Textarea
                            placeholder="Describe el producto, ingredientes, características..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Esta descripción aparecerá en el menú y ayudará a los clientes a conocer el producto.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="GrupoProductoID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoría</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number(value))}
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una categoría" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {gruposProductos.map((grupo) => (
                                <SelectItem key={grupo.id} value={grupo.id.toString()}>
                                  {grupo.nombre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="UnidadID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unidad de Medida</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number(value))}
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una unidad" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {unidades.map((unidad) => (
                                <SelectItem key={unidad.id} value={unidad.id.toString()}>
                                  {unidad.nombre} ({unidad.abreviacion})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="AreaProduccionID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Área de Producción</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number(value))}
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un área" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {areasProduccion.map((area) => (
                                <SelectItem key={area.id} value={area.id.toString()}>
                                  {area.nombre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="AlmacenID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Almacén</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number(value))}
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un almacén" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {almacenes.map((almacen) => (
                                <SelectItem key={almacen.id} value={almacen.id.toString()}>
                                  {almacen.nombre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Imagen */}
            <TabsContent value="imagen" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-green-600" />
                    Imagen del Producto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-64 h-64 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setImagePreview(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Sin imagen</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <Button type="button" variant="outline" className="relative bg-transparent">
                        <Upload className="h-4 w-4 mr-2" />
                        Subir Imagen
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </Button>
                      {imagePreview && (
                        <Button type="button" variant="ghost" onClick={() => setImagePreview(null)}>
                          Quitar Imagen
                        </Button>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 text-center max-w-md">
                      Sube una imagen atractiva de tu producto. Se recomienda una imagen cuadrada de al menos 400x400
                      píxeles para mejor calidad.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Configuración */}
            <TabsContent value="configuracion" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-purple-600" />
                    Configuración del Producto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Opciones de Venta</h4>

                      <FormField
                        control={form.control}
                        name="PermiteDescuento"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Permite Descuento</FormLabel>
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
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Acepta Propina</FormLabel>
                              <FormDescription>Los clientes pueden agregar propina a este producto</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {tipoProducto === "Platillo" && (
                        <FormField
                          control={form.control}
                          name="PreguntaCoccion"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Pregunta Cocción</FormLabel>
                                <FormDescription>Preguntar al cliente el término de cocción</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Control de Inventario</h4>

                      <FormField
                        control={form.control}
                        name="ControlaStock"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Controla Stock</FormLabel>
                              <FormDescription>Llevar control de entradas y salidas de almacén</FormDescription>
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
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Producto Favorito</FormLabel>
                              <FormDescription>Marcar como producto recurrente o destacado</FormDescription>
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
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 bg-red-50">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base text-red-700">Producto Suspendido</FormLabel>
                              <FormDescription className="text-red-600">
                                El producto no estará disponible para la venta
                              </FormDescription>
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

            {/* Tab Canales */}
            <TabsContent value="canales" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-orange-600" />
                    Canales de Venta
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Selecciona en qué canales estará disponible este producto para la venta.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="Comedor"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <Home className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-medium">Comedor</FormLabel>
                              <FormDescription>Disponible para consumo en el restaurante</FormDescription>
                            </div>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ADomicilio"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Truck className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-medium">A Domicilio</FormLabel>
                              <FormDescription>Disponible para entrega a domicilio</FormDescription>
                            </div>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="Mostrador"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <ShoppingCart className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-medium">Mostrador</FormLabel>
                              <FormDescription>Venta directa en mostrador</FormDescription>
                            </div>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="Enlinea"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-orange-100 rounded-lg">
                              <Smartphone className="h-5 w-5 text-orange-600" />
                            </div>
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-medium">En Línea</FormLabel>
                              <FormDescription>Disponible en plataformas digitales</FormDescription>
                            </div>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="EnMenuQR"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 md:col-span-2">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <QrCode className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-medium">Menú QR</FormLabel>
                              <FormDescription>Visible en el menú digital con código QR</FormDescription>
                            </div>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Resumen de canales seleccionados */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Canales Seleccionados:</h4>
                    <div className="flex flex-wrap gap-2">
                      {form.watch("Comedor") && (
                        <Badge className="bg-green-100 text-green-800">
                          <Home className="h-3 w-3 mr-1" />
                          Comedor
                        </Badge>
                      )}
                      {form.watch("ADomicilio") && (
                        <Badge className="bg-blue-100 text-blue-800">
                          <Truck className="h-3 w-3 mr-1" />
                          Domicilio
                        </Badge>
                      )}
                      {form.watch("Mostrador") && (
                        <Badge className="bg-purple-100 text-purple-800">
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Mostrador
                        </Badge>
                      )}
                      {form.watch("Enlinea") && (
                        <Badge className="bg-orange-100 text-orange-800">
                          <Smartphone className="h-3 w-3 mr-1" />
                          En Línea
                        </Badge>
                      )}
                      {form.watch("EnMenuQR") && (
                        <Badge className="bg-gray-100 text-gray-800">
                          <QrCode className="h-3 w-3 mr-1" />
                          Menú QR
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Botones de acción */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t bg-gray-50 p-4 -mx-6 -mb-6 rounded-b-lg">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {producto ? "Actualizar" : "Crear"} Producto
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
