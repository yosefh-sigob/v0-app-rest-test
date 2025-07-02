"use client"

import { useState } from "react"
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
import { Loader2, Save, X, Package, Utensils, Wine, Home, Truck, ShoppingCart, Smartphone, QrCode } from "lucide-react"
import { createProducto, updateProducto } from "@/actions/productos.actions"
import { createProductoSchema, type CreateProductoInput } from "@/schemas/productos.schemas"
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
  { value: "Platillo", label: "Platillo", icon: <Utensils className="h-4 w-4" /> },
  { value: "Producto", label: "Producto", icon: <Package className="h-4 w-4" /> },
  { value: "Botella", label: "Botella", icon: <Wine className="h-4 w-4" /> },
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
  const isEditing = !!producto

  const form = useForm<CreateProductoInput>({
    resolver: zodResolver(createProductoSchema),
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="configuracion">Configuración</TabsTrigger>
            <TabsTrigger value="canales">Canales de Venta</TabsTrigger>
            <TabsTrigger value="avanzado">Avanzado</TabsTrigger>
          </TabsList>

          {/* Tab General */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>Datos principales del producto</CardDescription>
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
                        <FormDescription>Código único para identificar el producto</FormDescription>
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
                          {TIPO_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                {option.icon}
                                {option.label}
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
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe el producto, ingredientes, características..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Clasificación</CardTitle>
                <CardDescription>Categorización y unidades</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="GrupoProductoID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoría</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value === "none" ? undefined : Number(value))}
                          defaultValue={field.value?.toString() || "none"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una categoría" />
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
                        <FormLabel>Unidad de Medida</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value === "none" ? undefined : Number(value))}
                          defaultValue={field.value?.toString() || "none"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una unidad" />
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="AreaProduccionID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Área de Producción</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value === "none" ? undefined : Number(value))}
                          defaultValue={field.value?.toString() || "none"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un área" />
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
                        <FormLabel>Almacén</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value === "none" ? undefined : Number(value))}
                          defaultValue={field.value?.toString() || "none"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un almacén" />
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
          <TabsContent value="configuracion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Ventas</CardTitle>
                <CardDescription>Opciones de comportamiento del producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="PermiteDescuento"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
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
                    name="ControlaStock"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Controla Stock</FormLabel>
                          <FormDescription>Verificar disponibilidad antes de vender</FormDescription>
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
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Acepta Propina</FormLabel>
                          <FormDescription>Permitir agregar propina a este producto</FormDescription>
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
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Pregunta Cocción</FormLabel>
                          <FormDescription>Solicitar término de cocción al ordenar</FormDescription>
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
          <TabsContent value="canales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Canales de Venta
                  <Badge variant="secondary">{activeChannels} activos</Badge>
                </CardTitle>
                <CardDescription>Selecciona dónde estará disponible este producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="Comedor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Home className="h-4 w-4 text-green-600" />
                            <FormLabel className="text-base">Comedor</FormLabel>
                          </div>
                          <FormDescription>Disponible para mesas del restaurante</FormDescription>
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
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-blue-600" />
                            <FormLabel className="text-base">A Domicilio</FormLabel>
                          </div>
                          <FormDescription>Disponible para entrega a domicilio</FormDescription>
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
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <ShoppingCart className="h-4 w-4 text-purple-600" />
                            <FormLabel className="text-base">Mostrador</FormLabel>
                          </div>
                          <FormDescription>Disponible para venta en mostrador</FormDescription>
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
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4 text-orange-600" />
                            <FormLabel className="text-base">En Línea</FormLabel>
                          </div>
                          <FormDescription>Disponible en plataformas digitales</FormDescription>
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
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <QrCode className="h-4 w-4 text-gray-600" />
                            <FormLabel className="text-base">Menú QR</FormLabel>
                          </div>
                          <FormDescription>Visible en el menú digital QR</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {activeChannels === 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      ⚠️ <strong>Atención:</strong> El producto no estará disponible en ningún canal de venta. Selecciona
                      al menos un canal para que los clientes puedan ordenarlo.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Avanzado */}
          <TabsContent value="avanzado" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuración Avanzada</CardTitle>
                <CardDescription>Opciones adicionales del producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="Favorito"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Producto Favorito</FormLabel>
                          <FormDescription>Marcar como producto destacado</FormDescription>
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
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Producto Suspendido</FormLabel>
                          <FormDescription>Temporalmente no disponible</FormDescription>
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
        </Tabs>

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700">
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            {isEditing ? "Actualizar" : "Crear"} Producto
          </Button>
        </div>
      </form>
    </Form>
  )
}
