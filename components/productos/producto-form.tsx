"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { createProducto, updateProducto } from "@/actions/productos.actions"
import { createProductoSchema, updateProductoSchema } from "@/schemas/productos.schemas"
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!producto

  const form = useForm<CreateProductoInput>({
    resolver: zodResolver(isEditing ? updateProductoSchema : createProductoSchema),
    defaultValues: {
      GrupoProductoULID: producto?.GrupoProductoULID || 0,
      SubgrupoProductoULID: producto?.SubgrupoProductoULID,
      ClaveProducto: producto?.ClaveProducto || "",
      TipoProducto: producto?.TipoProducto || "Platillo",
      Nombredelproducto: producto?.Nombredelproducto || "",
      Favorito: producto?.Favorito || false,
      Descripcion: producto?.Descripcion || "",
      ExentoImpuesto: producto?.ExentoImpuesto || false,
      PrecioAbierto: producto?.PrecioAbierto || false,
      UnidadesULID: producto?.UnidadesULID || 0,
      AreaProduccionULID: producto?.AreaProduccionULID,
      AlmacenULID: producto?.AlmacenULID,
      ControlStock: producto?.ControlStock || false,
      PrecioxUtilidadad: producto?.PrecioxUtilidadad || false,
      Facturable: producto?.Facturable ?? true,
      ClaveTributaria: producto?.ClaveTributaria || "",
      Suspendido: producto?.Suspendido || false,
      Comedor: producto?.Comedor ?? true,
      ADomicilio: producto?.ADomicilio || false,
      Mostrador: producto?.Mostrador || false,
      Enlinea: producto?.Enlinea || false,
      EnAPP: producto?.EnAPP || false,
      EnMenuQR: producto?.EnMenuQR || false,
      ClasificacionQRULID: producto?.ClasificacionQRULID,
    },
  })

  const onSubmit = async (data: CreateProductoInput) => {
    setIsSubmitting(true)
    try {
      const result = isEditing
        ? await updateProducto(producto.ProductoULID, data as UpdateProductoInput)
        : await createProducto(data)

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{isEditing ? "Editar Producto" : "Nuevo Producto"}</h2>
        <p className="text-muted-foreground">
          {isEditing ? "Modifica la información del producto" : "Completa la información del nuevo producto"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="configuracion">Configuración</TabsTrigger>
              <TabsTrigger value="canales">Canales</TabsTrigger>
              <TabsTrigger value="avanzado">Avanzado</TabsTrigger>
            </TabsList>

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
                      name="ClaveProducto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Clave del Producto *</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej: TACO001" {...field} />
                          </FormControl>
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
                          <FormDescription>Platillo lleva receta, Producto se vende como se compra</FormDescription>
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
                          <Textarea placeholder="Describe el producto..." className="resize-none" {...field} />
                        </FormControl>
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
                          <FormLabel>Grupo de Producto *</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number.parseInt(value))}
                            defaultValue={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un grupo" />
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
                      name="UnidadesULID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unidad de Medida *</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number.parseInt(value))}
                            defaultValue={field.value?.toString()}
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

                  <FormField
                    control={form.control}
                    name="Favorito"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Producto Favorito</FormLabel>
                          <FormDescription>Marcar si es un producto recurrente o favorito</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="configuracion" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración del Producto</CardTitle>
                  <CardDescription>Opciones de producción y almacén</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="AreaProduccionULID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Área de Producción</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value ? Number.parseInt(value) : undefined)}
                            defaultValue={field.value?.toString()}
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
                      name="AlmacenULID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Almacén</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value ? Number.parseInt(value) : undefined)}
                            defaultValue={field.value?.toString()}
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

                  <Separator />

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="ControlStock"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Control de Stock</FormLabel>
                            <FormDescription>Se lleva control de entradas y salidas de almacén</FormDescription>
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
                            <FormDescription>Permite capturar el precio al mesero</FormDescription>
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
                            <FormDescription>
                              Determina el precio de venta en base a un % de utilidad del costo
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

            <TabsContent value="canales" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Canales de Venta</CardTitle>
                  <CardDescription>Define en qué canales estará disponible el producto</CardDescription>
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
                            <FormDescription>Disponible para venta en comedor</FormDescription>
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
                            <FormLabel className="text-base">Mostrador</FormLabel>
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
                      name="EnMenuQR"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Menú QR</FormLabel>
                            <FormDescription>Visible en el menú digital QR</FormDescription>
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
                            <FormDescription>Disponible para pedidos en línea</FormDescription>
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
                            <FormDescription>Disponible en la aplicación móvil</FormDescription>
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

            <TabsContent value="avanzado" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración Avanzada</CardTitle>
                  <CardDescription>Opciones fiscales y administrativas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="ClaveTributaria"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Clave Tributaria</FormLabel>
                        <FormControl>
                          <Input placeholder="Clave conforme al catálogo del SAT" {...field} />
                        </FormControl>
                        <FormDescription>Clave conforme al catálogo del SAT para emitir CFDI</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="ExentoImpuesto"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Exento de Impuesto</FormLabel>
                            <FormDescription>El producto no causa impuestos</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="Facturable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Facturable</FormLabel>
                            <FormDescription>Determina si se puede facturar</FormDescription>
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
                            <FormLabel className="text-base">Suspendido</FormLabel>
                            <FormDescription>El producto está suspendido del menú</FormDescription>
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

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : isEditing ? "Actualizar" : "Crear Producto"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
