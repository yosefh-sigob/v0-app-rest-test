"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Loader2,
  Save,
  X,
  Package,
  Utensils,
  Wine,
  Home,
  Truck,
  ShoppingCart,
  Smartphone,
  QrCode,
  Upload,
  ImageIcon,
  Trash2,
  Info,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { createProducto, updateProducto } from "@/actions/productos.actions"
import { createProductoSchema, type CreateProductoInput } from "@/schemas/productos.schemas"
import { validateImageFile, compressImage, getImageSrc } from "@/lib/utils/image"
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

const TIPO_OPTIONS = [
  {
    value: "Platillo",
    label: "Platillo",
    icon: <Utensils className="h-4 w-4" />,
    description: "Comida preparada con receta",
  },
  {
    value: "Producto",
    label: "Producto",
    icon: <Package className="h-4 w-4" />,
    description: "Artículo que se vende tal como se compra",
  },
  {
    value: "Botella",
    label: "Botella",
    icon: <Wine className="h-4 w-4" />,
    description: "Bebidas alcohólicas y no alcohólicas",
  },
]

export function ProductoForm({
  producto,
  gruposProductos,
  unidades,
  areasProduccion,
  almacenes,
  onSuccess,
  onCancel,
}: ProductoFormProps) {
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isEditing = !!producto

  const form = useForm<CreateProductoInput>({
    resolver: zodResolver(createProductoSchema),
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validation = validateImageFile(file)
    if (!validation.isValid) {
      toast.error(validation.error)
      return
    }

    setImageLoading(true)
    try {
      const compressedBase64 = await compressImage(file, 800, 0.8)
      form.setValue("Imagen", compressedBase64)
      toast.success("Imagen cargada exitosamente")
    } catch (error) {
      toast.error("Error al procesar la imagen")
      console.error("Error processing image:", error)
    } finally {
      setImageLoading(false)
    }
  }

  const handleRemoveImage = () => {
    form.setValue("Imagen", "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const onSubmit = async (data: CreateProductoInput) => {
    setLoading(true)
    try {
      const result = isEditing ? await updateProducto(producto!.ProductoULID, data) : await createProducto(data)

      if (result.success) {
        toast.success(result.message)
        onSuccess()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Error al guardar el producto")
    } finally {
      setLoading(false)
    }
  }

  const watchedChannels = form.watch(["Comedor", "ADomicilio", "Mostrador", "Enlinea", "EnMenuQR"])
  const activeChannels = watchedChannels.filter(Boolean).length
  const currentImage = form.watch("Imagen")

  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 h-12">
              <TabsTrigger value="general" className="text-sm font-medium">
                📝 General
              </TabsTrigger>
              <TabsTrigger value="configuracion" className="text-sm font-medium">
                ⚙️ Configuración
              </TabsTrigger>
              <TabsTrigger value="canales" className="text-sm font-medium">
                🛒 Canales de Venta
              </TabsTrigger>
              <TabsTrigger value="avanzado" className="text-sm font-medium">
                🔧 Avanzado
              </TabsTrigger>
            </TabsList>

            {/* Tab General */}
            <TabsContent value="general" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Información Básica */}
                <div className="lg:col-span-2">
                  <Card className="h-fit">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-blue-600" />
                        Información Básica
                      </CardTitle>
                      <CardDescription>Datos principales que identifican tu producto</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="Nombredelproducto"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Nombre del Producto *</FormLabel>
                              <FormControl>
                                <Input placeholder="Ej: Hamburguesa Clásica" className="h-11 text-base" {...field} />
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
                              <FormLabel className="text-base font-medium">Código del Producto *</FormLabel>
                              <FormControl>
                                <Input placeholder="Ej: HAM001" className="h-11 text-base font-mono" {...field} />
                              </FormControl>
                              <FormDescription>Código único para identificar el producto en el sistema</FormDescription>
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
                            <FormLabel className="text-base font-medium">Tipo de Producto *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-11">
                                  <SelectValue placeholder="Selecciona el tipo de producto" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {TIPO_OPTIONS.map((option) => (
                                  <SelectItem key={option.value} value={option.value} className="py-3">
                                    <div className="flex items-start gap-3">
                                      {option.icon}
                                      <div>
                                        <div className="font-medium">{option.label}</div>
                                        <div className="text-sm text-gray-500">{option.description}</div>
                                      </div>
                                    </div>
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
                        name="Descripcion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Descripción</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe el producto, ingredientes, características especiales..."
                                className="min-h-[120px] text-base resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Esta descripción será visible para los clientes</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Imagen del Producto */}
                <div className="lg:col-span-1">
                  <Card className="h-fit">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-green-600" />
                        Imagen del Producto
                      </CardTitle>
                      <CardDescription>Sube una imagen atractiva de tu producto</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="Imagen"
                        render={() => (
                          <FormItem>
                            <FormControl>
                              <div className="space-y-4">
                                {/* Vista previa de la imagen */}
                                <div className="flex justify-center">
                                  {currentImage ? (
                                    <div className="relative group">
                                      <img
                                        src={getImageSrc(currentImage) || "/placeholder.svg"}
                                        alt="Vista previa"
                                        className="w-full max-w-xs h-48 object-cover rounded-xl border-2 border-gray-200 shadow-sm"
                                      />
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={handleRemoveImage}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <div
                                      className="w-full max-w-xs h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                                      onClick={() => fileInputRef.current?.click()}
                                    >
                                      <ImageIcon className="h-12 w-12 text-gray-400 mb-3" />
                                      <p className="text-sm text-gray-600 text-center font-medium">
                                        Haz clic para subir
                                      </p>
                                      <p className="text-xs text-gray-500 text-center mt-1">
                                        o arrastra una imagen aquí
                                      </p>
                                    </div>
                                  )}
                                </div>

                                {/* Botones de carga */}
                                <div className="space-y-3">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={imageLoading}
                                    className="w-full h-11"
                                  >
                                    {imageLoading ? (
                                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    ) : (
                                      <Upload className="h-4 w-4 mr-2" />
                                    )}
                                    {currentImage ? "Cambiar Imagen" : "Subir Imagen"}
                                  </Button>

                                  {currentImage && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={handleRemoveImage}
                                      className="w-full h-11 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Eliminar Imagen
                                    </Button>
                                  )}
                                </div>

                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/jpeg,image/jpg,image/png,image/webp"
                                  onChange={handleImageUpload}
                                  className="hidden"
                                />
                              </div>
                            </FormControl>
                            <FormDescription className="text-center text-sm">
                              <strong>Formatos:</strong> JPG, PNG, WebP
                              <br />
                              <strong>Tamaño máximo:</strong> 5MB
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Clasificación */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-purple-600" />
                    Clasificación y Organización
                  </CardTitle>
                  <CardDescription>
                    Organiza tu producto en categorías y define sus características operativas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FormField
                      control={form.control}
                      name="GrupoProductoID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Categoría</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value === "none" ? undefined : Number(value))}
                            defaultValue={field.value?.toString() || "none"}
                          >
                            <FormControl>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">Sin categoría</SelectItem>
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
                          <FormLabel className="text-base font-medium">Unidad de Medida</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value === "none" ? undefined : Number(value))}
                            defaultValue={field.value?.toString() || "none"}
                          >
                            <FormControl>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">Sin unidad</SelectItem>
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

                    <FormField
                      control={form.control}
                      name="AreaProduccionID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Área de Producción</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value === "none" ? undefined : Number(value))}
                            defaultValue={field.value?.toString() || "none"}
                          >
                            <FormControl>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">Sin área específica</SelectItem>
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
                          <FormLabel className="text-base font-medium">Almacén</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value === "none" ? undefined : Number(value))}
                            defaultValue={field.value?.toString() || "none"}
                          >
                            <FormControl>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">Sin almacén específico</SelectItem>
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

            {/* Tab Configuración */}
            <TabsContent value="configuracion" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Configuración de Ventas
                  </CardTitle>
                  <CardDescription>Define cómo se comportará este producto en las operaciones de venta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="PermiteDescuento"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-6 space-y-0">
                          <div className="space-y-1 flex-1">
                            <FormLabel className="text-base font-medium">Permite Descuento</FormLabel>
                            <FormDescription className="text-sm">
                              El producto puede tener descuentos aplicados durante la venta
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ControlaStock"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-6 space-y-0">
                          <div className="space-y-1 flex-1">
                            <FormLabel className="text-base font-medium">Controla Stock</FormLabel>
                            <FormDescription className="text-sm">
                              Verificar disponibilidad en inventario antes de vender
                            </FormDescription>
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
                        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-6 space-y-0">
                          <div className="space-y-1 flex-1">
                            <FormLabel className="text-base font-medium">Acepta Propina</FormLabel>
                            <FormDescription className="text-sm">
                              Permitir agregar propina adicional a este producto
                            </FormDescription>
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
                        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-6 space-y-0">
                          <div className="space-y-1 flex-1">
                            <FormLabel className="text-base font-medium">Pregunta Cocción</FormLabel>
                            <FormDescription className="text-sm">
                              Solicitar término de cocción al momento de ordenar
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Canales */}
            <TabsContent value="canales" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-blue-600" />
                    Canales de Venta
                    <Badge variant="secondary" className="ml-2">
                      {activeChannels} activos
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Selecciona en qué canales estará disponible este producto para la venta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="Comedor"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-6 space-y-0 hover:bg-green-50 transition-colors">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <Home className="h-5 w-5 text-green-600" />
                              <FormLabel className="text-base font-medium">Comedor</FormLabel>
                            </div>
                            <FormDescription className="text-sm">
                              Disponible para mesas del restaurante y servicio en el local
                            </FormDescription>
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
                        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-6 space-y-0 hover:bg-blue-50 transition-colors">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <Truck className="h-5 w-5 text-blue-600" />
                              <FormLabel className="text-base font-medium">A Domicilio</FormLabel>
                            </div>
                            <FormDescription className="text-sm">
                              Disponible para entrega a domicilio y delivery
                            </FormDescription>
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
                        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-6 space-y-0 hover:bg-purple-50 transition-colors">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <ShoppingCart className="h-5 w-5 text-purple-600" />
                              <FormLabel className="text-base font-medium">Mostrador</FormLabel>
                            </div>
                            <FormDescription className="text-sm">
                              Disponible para venta directa en mostrador
                            </FormDescription>
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
                        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-6 space-y-0 hover:bg-orange-50 transition-colors">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <Smartphone className="h-5 w-5 text-orange-600" />
                              <FormLabel className="text-base font-medium">En Línea</FormLabel>
                            </div>
                            <FormDescription className="text-sm">
                              Disponible en plataformas digitales y apps de delivery
                            </FormDescription>
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
                        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-6 space-y-0 hover:bg-gray-50 transition-colors">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <QrCode className="h-5 w-5 text-gray-600" />
                              <FormLabel className="text-base font-medium">Menú QR</FormLabel>
                            </div>
                            <FormDescription className="text-sm">
                              Visible en el menú digital accesible por código QR
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {activeChannels === 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800 mb-1">¡Atención requerida!</h4>
                          <p className="text-sm text-yellow-700">
                            El producto no estará disponible en ningún canal de venta. Selecciona al menos un canal para
                            que los clientes puedan ordenarlo.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeChannels > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <p className="text-sm text-green-700 font-medium">
                          Producto disponible en {activeChannels} canal{activeChannels > 1 ? "es" : ""} de venta
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Avanzado */}
            <TabsContent value="avanzado" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    Configuración Avanzada
                  </CardTitle>
                  <CardDescription>Opciones adicionales para el manejo especial del producto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="Favorito"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-6 space-y-0 hover:bg-yellow-50 transition-colors">
                          <div className="space-y-1 flex-1">
                            <FormLabel className="text-base font-medium flex items-center gap-2">
                              ⭐ Producto Favorito
                            </FormLabel>
                            <FormDescription className="text-sm">
                              Marcar como producto destacado para promociones especiales
                            </FormDescription>
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
                        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-6 space-y-0 hover:bg-red-50 transition-colors">
                          <div className="space-y-1 flex-1">
                            <FormLabel className="text-base font-medium flex items-center gap-2">
                              ⏸️ Producto Suspendido
                            </FormLabel>
                            <FormDescription className="text-sm">
                              Temporalmente no disponible para la venta
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {form.watch("Suspendido") && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-red-800 mb-1">Producto Suspendido</h4>
                          <p className="text-sm text-red-700">
                            Este producto no estará disponible para la venta hasta que se reactive. Los clientes no
                            podrán verlo ni ordenarlo.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4 pt-8 border-t bg-white sticky bottom-0 pb-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              className="h-12 px-8 bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 h-12 px-8 text-base font-medium"
            >
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              {isEditing ? "Actualizar" : "Crear"} Producto
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
