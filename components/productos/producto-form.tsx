"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Loader2, Save, X, Package, Settings, ShoppingCart, Zap } from "lucide-react"
import { createProductoSchema, updateProductoSchema } from "@/schemas/productos.schemas"
import { createProducto, updateProducto } from "@/actions/productos.actions"
import type { CreateProductoInput, UpdateProductoInput } from "@/schemas/productos.schemas"
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

  const form = useForm<CreateProductoInput | UpdateProductoInput>({
    resolver: zodResolver(isEditing ? updateProductoSchema : createProductoSchema),
    defaultValues: {
      ClaveProducto: producto?.ClaveProducto || "",
      TipoProducto: producto?.TipoProducto || "Platillo",
      Nombredelproducto: producto?.Nombredelproducto || "",
      Descripcion: producto?.Descripcion || "",
      GrupoProductoULID: producto?.GrupoProductoULID || undefined,
      SubgrupoProductoULID: producto?.SubgrupoProductoULID || undefined,
      UnidadesULID: producto?.UnidadesULID || undefined,
      AreaProduccionULID: producto?.AreaProduccionULID || undefined,
      AlmacenULID: producto?.AlmacenULID || undefined,
      Favorito: producto?.Favorito || false,
      ExentoImpuesto: producto?.ExentoImpuesto || false,
      PrecioAbierto: producto?.PrecioAbierto || false,
      ControlStock: producto?.ControlStock || false,
      PrecioxUtilidadad: producto?.PrecioxUtilidadad || false,
      Facturable: producto?.Facturable || true,
      ClaveTributaria: producto?.ClaveTributaria || "",
      Suspendido: producto?.Suspendido || false,
      Comedor: producto?.Comedor || false,
      ADomicilio: producto?.ADomicilio || false,
      Mostrador: producto?.Mostrador || false,
      Enlinea: producto?.Enlinea || false,
      EnAPP: producto?.EnAPP || false,
      CanalesVenta: producto?.CanalesVenta || false,
      EnMenuQR: producto?.EnMenuQR || false,
      ClasificacionQRULID: producto?.ClasificacionQRULID || undefined,
    },
  })

  const onSubmit = async (data: CreateProductoInput | UpdateProductoInput) => {
    setLoading(true)
    try {
      const result = isEditing
        ? await updateProducto(producto!.ProductoULID, data as UpdateProductoInput)
        : await createProducto(data as CreateProductoInput)

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{isEditing ? "Editar Producto" : "Nuevo Producto"}</h3>
            <p className="text-sm text-muted-foreground">
              {isEditing ? "Modifica la información del producto" : "Completa la información del nuevo producto"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700">
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              {isEditing ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="configuracion" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuración
            </TabsTrigger>
            <TabsTrigger value="canales" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Canales
            </TabsTrigger>
            <TabsTrigger value="avanzado" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Avanzado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>Datos principales del producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ClaveProducto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código del Producto *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: TACO001" {...field} />
                        </FormControl>
                        <FormDescription>Código único para identificar el producto</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                            <SelectItem value="Platillo">Platillo</SelectItem>
                            <SelectItem value="Producto">Producto</SelectItem>
                            <SelectItem value="Botella">Botella</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="Nombredelproducto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Producto *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Tacos al Pastor" {...field} />
                      </FormControl>
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
                        <Textarea placeholder="Describe el producto..." className="resize-none" rows={3} {...field} />
                      </FormControl>
                      <FormDescription>Descripción detallada del producto (opcional)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="GrupoProductoULID"
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
                    name="UnidadesULID"
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
                    name="AreaProduccionULID"
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
                            <SelectItem value="none">Sin área</SelectItem>
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
                    name="AlmacenULID"
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
                            <SelectItem value="none">Sin almacén</SelectItem>
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

          <TabsContent value="configuracion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Producto</CardTitle>
                <CardDescription>Opciones de comportamiento y control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
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
                      name="ControlStock"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Control de Stock</FormLabel>
                            <FormDescription>Controlar inventario del producto</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="PrecioAbierto"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Precio Abierto</FormLabel>
                            <FormDescription>Permitir modificar precio en venta</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="Facturable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Facturable</FormLabel>
                            <FormDescription>Incluir en facturación</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ExentoImpuesto"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Exento de Impuesto</FormLabel>
                            <FormDescription>No aplicar impuestos</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="PrecioxUtilidadad"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Precio por Utilidad</FormLabel>
                            <FormDescription>Calcular precio automáticamente</FormDescription>
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

          <TabsContent value="canales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Canales de Venta</CardTitle>
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
                          <FormLabel className="text-base">Comedor</FormLabel>
                          <FormDescription>Disponible para servicio en mesa</FormDescription>
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
                          <FormLabel className="text-base">A Domicilio</FormLabel>
                          <FormDescription>Disponible para entrega</FormDescription>
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
                          <FormLabel className="text-base">Mostrador</FormLabel>
                          <FormDescription>Disponible para venta directa</FormDescription>
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
                          <FormLabel className="text-base">En Línea</FormLabel>
                          <FormDescription>Disponible en plataforma web</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="EnAPP"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">En APP</FormLabel>
                          <FormDescription>Disponible en aplicación móvil</FormDescription>
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
                          <FormLabel className="text-base">Menú QR</FormLabel>
                          <FormDescription>Mostrar en menú digital QR</FormDescription>
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

          <TabsContent value="avanzado" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración Avanzada</CardTitle>
                <CardDescription>Opciones adicionales y configuración fiscal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="ClaveTributaria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Clave Tributaria</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: 50211503" {...field} />
                      </FormControl>
                      <FormDescription>Código de clasificación fiscal del producto</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ClasificacionQRULID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Clasificación QR</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="ID de clasificación"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormDescription>Clasificación para organización en menú QR</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <FormField
                  control={form.control}
                  name="Suspendido"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Producto Suspendido</FormLabel>
                        <FormDescription>Desactivar temporalmente el producto</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("Suspendido") && (
                  <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">Advertencia</Badge>
                      <span className="text-sm font-medium">Producto Suspendido</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Este producto no estará disponible para la venta hasta que se reactive.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}
