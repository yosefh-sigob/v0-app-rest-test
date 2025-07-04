"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Save, X, ImageIcon } from "lucide-react"
import {
  createProductoSchema,
  updateProductoSchema,
  type Producto,
  TIPOS_PRODUCTO,
  CANALES_VENTA,
} from "@/schemas/productos.schemas"
import { createProducto, updateProducto, validateClaveProducto } from "@/actions/productos.actions"
import { MOCK_GRUPOS_PRODUCTOS, MOCK_UNIDADES, MOCK_AREAS_PRODUCCION, MOCK_ALMACENES } from "@/lib/mock/productos.mock"
import { toast } from "@/hooks/use-toast"

interface ProductoFormProps {
  producto?: Producto
  onSuccess: (producto: Producto) => void
  onCancel: () => void
}

export function ProductoForm({ producto, onSuccess, onCancel }: ProductoFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(producto?.Imagen || null)
  const [isValidatingClave, setIsValidatingClave] = useState(false)
  const isEditing = !!producto

  const form = useForm({
    resolver: zodResolver(isEditing ? updateProductoSchema : createProductoSchema),
    defaultValues: {
      ClaveProducto: producto?.ClaveProducto || "",
      TipoProducto: producto?.TipoProducto || "Producto",
      Nombredelproducto: producto?.Nombredelproducto || "",
      Descripcion: producto?.Descripcion || "",
      Imagen: producto?.Imagen || "",
      Favorito: producto?.Favorito || false,
      ExentoImpuesto: producto?.ExentoImpuesto || false,
      PrecioAbierto: producto?.PrecioAbierto || false,
      ControlStock: producto?.ControlStock || false,
      PrecioxUtilidad: producto?.PrecioxUtilidad || false,
      Facturable: producto?.Facturable ?? true,
      Suspendido: producto?.Suspendido || false,
      Comedor: producto?.Comedor || false,
      ADomicilio: producto?.ADomicilio || false,
      Mostrador: producto?.Mostrador || false,
      Enlinea: producto?.Enlinea || false,
      EnAPP: producto?.EnAPP || false,
      EnMenuQR: producto?.EnMenuQR || false,
      GrupoProductoID: producto?.GrupoProductoID || "0",
      UnidadID: producto?.UnidadID || "0",
      AreaProduccionID: producto?.AreaProduccionID || "0",
      AlmacenID: producto?.AlmacenID || "0",
      ClaveTributaria: producto?.ClaveTributaria || "",
    },
  })

  // Validar clave de producto en tiempo real
  const handleClaveChange = async (clave: string) => {
    if (!clave || clave.length < 3) return

    setIsValidatingClave(true)
    try {
      const result = await validateClaveProducto(clave, producto?.ProductoULID)
      if (!result.isValid) {
        form.setError("ClaveProducto", {
          type: "manual",
          message: "Esta clave ya existe",
        })
      } else {
        form.clearErrors("ClaveProducto")
      }
    } catch (error) {
      console.error("Error validando clave:", error)
    } finally {
      setIsValidatingClave(false)
    }
  }

  const handleImageChange = (url: string) => {
    setImagePreview(url)
    form.setValue("Imagen", url)
  }

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      let result
      if (isEditing) {
        result = await updateProducto(producto.ProductoULID, data)
      } else {
        result = await createProducto(data)
      }

      if (result.success && result.data) {
        onSuccess(result.data)
        toast({
          title: "Éxito",
          description: result.message,
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Error al guardar el producto",
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

  // Contar canales activos
  const canalesActivos = CANALES_VENTA.filter((canal) => form.watch(canal.key as any)).length

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">📝 Información Básica</CardTitle>
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
                      <div className="relative">
                        <Input
                          placeholder="Ej: HAM001"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.toUpperCase()
                            field.onChange(value)
                            handleClaveChange(value)
                          }}
                          className="uppercase"
                        />
                        {isValidatingClave && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>Solo letras mayúsculas y números (máx. 10 caracteres)</FormDescription>
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
                        {TIPOS_PRODUCTO.map((tipo) => (
                          <SelectItem key={tipo.value} value={tipo.value}>
                            <div className="flex flex-col">
                              <span>{tipo.label}</span>
                              <span className="text-xs text-gray-500">{tipo.description}</span>
                            </div>
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
              name="Nombredelproducto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Producto *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Hamburguesa Clásica" {...field} />
                  </FormControl>
                  <FormDescription>Nombre descriptivo del producto (máx. 100 caracteres)</FormDescription>
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
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Descripción detallada del producto (máx. 500 caracteres)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ClaveTributaria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clave Tributaria (SAT)</FormLabel>
                  <FormControl>
                    <Input placeholder="Clave del SAT para facturación" {...field} />
                  </FormControl>
                  <FormDescription>Clave del catálogo del SAT para emisión de CFDi</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Imagen */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Imagen del Producto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="Imagen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de Imagen</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        placeholder="https://ejemplo.com/imagen.jpg"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          handleImageChange(e.target.value)
                        }}
                      />

                      {imagePreview && (
                        <div className="relative w-full max-w-sm">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-lg border"
                            onError={() => {
                              setImagePreview(null)
                              form.setValue("Imagen", "")
                            }}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setImagePreview(null)
                              form.setValue("Imagen", "")
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>URL de la imagen del producto (opcional)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle>⚙️ Configuración del Producto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Referencias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="GrupoProductoID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grupo de Producto</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un grupo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Sin grupo</SelectItem>
                        {MOCK_GRUPOS_PRODUCTOS.map((grupo) => (
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una unidad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Sin unidad</SelectItem>
                        {MOCK_UNIDADES.map((unidad) => (
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
                    <FormLabel>Área de Producción</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un área" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Sin área</SelectItem>
                        {MOCK_AREAS_PRODUCCION.map((area) => (
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un almacén" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Sin almacén</SelectItem>
                        {MOCK_ALMACENES.map((almacen) => (
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

            {/* Configuraciones booleanas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="Favorito"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">⭐ Favorito</FormLabel>
                      <FormDescription className="text-sm">Marcar como producto destacado</FormDescription>
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
                      <FormLabel className="text-base">📦 Control de Stock</FormLabel>
                      <FormDescription className="text-sm">Llevar control de inventario</FormDescription>
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
                      <FormLabel className="text-base">🧾 Facturable</FormLabel>
                      <FormDescription className="text-sm">Se puede incluir en facturas</FormDescription>
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
                      <FormLabel className="text-base">🏷️ Exento de Impuesto</FormLabel>
                      <FormDescription className="text-sm">No aplica IVA u otros impuestos</FormDescription>
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
                      <FormLabel className="text-base">💰 Precio Abierto</FormLabel>
                      <FormDescription className="text-sm">El mesero puede capturar el precio</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="PrecioxUtilidad"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">📈 Precio por Utilidad</FormLabel>
                      <FormDescription className="text-sm">Calcular precio basado en costo + utilidad</FormDescription>
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

        {/* Canales de venta */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>🛒 Canales de Venta</span>
              <Badge variant={canalesActivos > 0 ? "default" : "destructive"}>{canalesActivos} activos</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CANALES_VENTA.map((canal) => (
                <FormField
                  key={canal.key}
                  control={form.control}
                  name={canal.key as any}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">{canal.label}</FormLabel>
                        <FormDescription className="text-sm">{canal.description}</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {canalesActivos === 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">⚠️ Debe seleccionar al menos un canal de venta</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading || canalesActivos === 0}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Guardando..." : isEditing ? "Actualizar Producto" : "Crear Producto"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
