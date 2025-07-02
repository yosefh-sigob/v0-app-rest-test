import { z } from "zod"

export const TipoProductoEnum = z.enum(["Platillo", "Producto", "Botella"])
export const NivelLicenciaEnum = z.enum(["Gratis", "Lite", "Pro", "Franquicia"])

export const createProductoSchema = z.object({
  GrupoProductoULID: z.number().min(1, "Selecciona un grupo de producto"),
  SubgrupoProductoULID: z.number().optional(),
  ClaveProducto: z.string().min(1, "La clave es requerida").max(10, "Máximo 10 caracteres"),
  TipoProducto: TipoProductoEnum,
  Nombredelproducto: z.string().min(1, "El nombre es requerido").max(20, "Máximo 20 caracteres"),
  Favorito: z.boolean().default(false),
  Descripcion: z.string().optional(),
  ExentoImpuesto: z.boolean().default(false),
  PrecioAbierto: z.boolean().default(false),
  UnidadesULID: z.number().min(1, "Selecciona una unidad"),
  AreaProduccionULID: z.number().optional(),
  AlmacenULID: z.number().optional(),
  ControlStock: z.boolean().default(false),
  PrecioxUtilidadad: z.boolean().default(false),
  Facturable: z.boolean().default(true),
  ClaveTributaria: z.string().max(20).optional(),
  Suspendido: z.boolean().default(false),
  Comedor: z.boolean().default(true),
  ADomicilio: z.boolean().default(false),
  Mostrador: z.boolean().default(false),
  Enlinea: z.boolean().default(false),
  EnAPP: z.boolean().default(false),
  EnMenuQR: z.boolean().default(false),
  ClasificacionQRULID: z.number().optional(),
})

export const updateProductoSchema = createProductoSchema.partial()

export const searchProductosSchema = z.object({
  search: z.string().optional(),
  tipo: TipoProductoEnum.optional(),
  favorito: z.boolean().optional(),
  suspendido: z.boolean().optional(),
  grupoId: z.number().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
})

export type CreateProductoInput = z.infer<typeof createProductoSchema>
export type UpdateProductoInput = z.infer<typeof updateProductoSchema>
export type SearchProductosInput = z.infer<typeof searchProductosSchema>
