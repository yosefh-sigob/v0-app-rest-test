import { z } from "zod"
import { TipoProducto } from "@/interfaces/database"

export const createProductoSchema = z.object({
  GrupoProductoULID: z.number().min(1, "Grupo de producto es requerido"),
  SubgrupoProductoULID: z.number().min(1, "Subgrupo de producto es requerido"),
  ClaveProducto: z.string().min(1, "Clave de producto es requerida").max(10, "Máximo 10 caracteres"),
  TipoProducto: z.nativeEnum(TipoProducto, {
    errorMap: () => ({ message: "Tipo de producto inválido" }),
  }),
  Nombredelproducto: z.string().min(1, "Nombre es requerido").max(20, "Máximo 20 caracteres"),
  Favorito: z.boolean().default(false),
  Descripcion: z.string().max(500, "Máximo 500 caracteres").optional(),
  ExentoImpuesto: z.boolean().default(false),
  PrecioAbierto: z.boolean().default(false),
  UnidadesULID: z.number().min(1, "Unidad es requerida"),
  AreaProduccionULID: z.number().min(1, "Área de producción es requerida"),
  AlmacenULID: z.number().min(1, "Almacén es requerido"),
  ControlStock: z.boolean().default(false),
  PrecioxUtilidad: z.boolean().default(false),
  Facturable: z.boolean().default(true),
  ClaveTributaria: z.string().max(20, "Máximo 20 caracteres").optional(),
  Suspendido: z.boolean().default(false),
  Comedor: z.boolean().default(true),
  ADomicilio: z.boolean().default(false),
  Mostrador: z.boolean().default(false),
  Enlinea: z.boolean().default(false),
  EnAPP: z.boolean().default(false),
  CanalesVenta: z.boolean().default(false),
  EnMenuQR: z.boolean().default(false),
  ClasificacionQRULID: z.number().optional(),
  DatosDinamicos: z.any().optional(),
})

export const updateProductoSchema = createProductoSchema.partial().extend({
  ProductoULID: z.string().min(1, "ID de producto es requerido"),
})

export const deleteProductoSchema = z.object({
  ProductoULID: z.string().min(1, "ID de producto es requerido"),
})

export const searchProductosSchema = z.object({
  search: z.string().optional(),
  categoria: z.string().optional(),
  tipo: z.nativeEnum(TipoProducto).optional(),
  activo: z.boolean().optional(),
  favorito: z.boolean().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
})

export const presentacionSchema = z.object({
  ProductoULID: z.string().min(1, "ID de producto es requerido"),
  CodigoPresentacion: z.string().min(1, "Código es requerido").max(15, "Máximo 15 caracteres"),
  NombrePresentacion: z.string().min(1, "Nombre es requerido").max(25, "Máximo 25 caracteres"),
  CostoInsumos: z.number().min(0, "Costo debe ser mayor a 0"),
  UnidadesULID: z.number().min(1, "Unidad es requerida"),
  PreciodeVenta: z.number().min(0, "Precio debe ser mayor a 0"),
  ComisiondeVenta: z.number().min(0, "Comisión debe ser mayor o igual a 0"),
  ComisiondeVentaPorcentaje: z.number().min(0).max(100, "Porcentaje debe estar entre 0 y 100"),
  Puntos: z.number().min(0, "Puntos deben ser mayor o igual a 0"),
  VariosenEnPlato: z.boolean().default(false),
  TieneReceta: z.boolean().default(false),
  TiempodeProduccion: z.number().min(0, "Tiempo debe ser mayor o igual a 0"),
})

export type CreateProductoInput = z.infer<typeof createProductoSchema>
export type UpdateProductoInput = z.infer<typeof updateProductoSchema>
export type SearchProductosInput = z.infer<typeof searchProductosSchema>
export type PresentacionInput = z.infer<typeof presentacionSchema>
