import { z } from "zod"

export const createProductoSchema = z.object({
  Nombredelproducto: z.string().min(1, "El nombre del producto es requerido").max(255),
  ClaveProducto: z.string().min(1, "La clave del producto es requerida").max(50),
  TipoProducto: z.enum(["Platillo", "Producto", "Botella"]),
  Descripcion: z.string().optional(),
  GrupoProductoID: z.number().optional(),
  UnidadID: z.number().optional(),
  AreaProduccionID: z.number().optional(),
  AlmacenID: z.number().optional(),
  PermiteDescuento: z.boolean().default(true),
  ControlaStock: z.boolean().default(false),
  AceptaPropina: z.boolean().default(false),
  PreguntaCoccion: z.boolean().default(false),
  Comedor: z.boolean().default(true),
  ADomicilio: z.boolean().default(false),
  Mostrador: z.boolean().default(false),
  Enlinea: z.boolean().default(false),
  EnMenuQR: z.boolean().default(false),
  Favorito: z.boolean().default(false),
  Suspendido: z.boolean().default(false),
})

export const updateProductoSchema = createProductoSchema.partial()

export const searchProductosSchema = z.object({
  search: z.string().optional(),
  tipo: z.enum(["Platillo", "Producto", "Botella"]).optional(),
  favorito: z.boolean().optional(),
  suspendido: z.boolean().optional(),
  grupoId: z.number().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
})

export type CreateProductoInput = z.infer<typeof createProductoSchema>
export type UpdateProductoInput = z.infer<typeof updateProductoSchema>
export type SearchProductosInput = z.infer<typeof searchProductosSchema>
