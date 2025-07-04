import { z } from "zod"

// Esquema base para producto
export const productoSchema = z.object({
  ProductoULID: z.string().min(1, "ID requerido"),
  GrupoProductoID: z.number().optional(),
  SubgrupoProductoID: z.number().optional(),
  ClaveProducto: z.string().min(1, "Clave de producto requerida").max(10, "Máximo 10 caracteres"),
  TipoProducto: z.enum(["Platillo", "Producto", "Botella"], {
    required_error: "Tipo de producto requerido",
  }),
  Nombredelproducto: z.string().min(1, "Nombre requerido").max(100, "Máximo 100 caracteres"),
  Favorito: z.boolean().default(false),
  Descripcion: z.string().optional(),
  ExentoImpuesto: z.boolean().default(false),
  PrecioAbierto: z.boolean().default(false),
  UnidadID: z.number().optional(),
  AreaProduccionID: z.number().optional(),
  AlmacenID: z.number().optional(),
  ControlStock: z.boolean().default(false),
  PrecioxUtilidad: z.boolean().default(false),
  Facturable: z.boolean().default(true),
  ClaveTributaria: z.string().optional(),
  Suspendido: z.boolean().default(false),
  Comedor: z.boolean().default(false),
  ADomicilio: z.boolean().default(false),
  Mostrador: z.boolean().default(false),
  Enlinea: z.boolean().default(false),
  EnAPP: z.boolean().default(false),
  EnMenuQR: z.boolean().default(false),
  ClasificacionQRID: z.number().optional(),
  Imagen: z.string().optional(),
  DatosDinamicos: z.record(z.any()).optional(),
  Fecha_UltimoCambio: z.string().optional(),
  Fecha_Sync: z.string().optional(),
  UsuarioID: z.number().optional(),
  EmpresaULID: z.string().optional(),
})

// Esquema para crear producto
export const createProductoSchema = productoSchema.omit({
  ProductoULID: true,
  Fecha_UltimoCambio: true,
  Fecha_Sync: true,
})

// Esquema para actualizar producto
export const updateProductoSchema = productoSchema.partial().omit({
  ProductoULID: true,
  Fecha_UltimoCambio: true,
  Fecha_Sync: true,
})

// Esquema para búsqueda de productos
export const searchProductosSchema = z.object({
  search: z.string().optional(),
  tipo: z.enum(["Platillo", "Producto", "Botella"]).optional(),
  grupoId: z.number().optional(),
  favoritos: z.boolean().optional(),
  suspendidos: z.boolean().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
})

// Tipos TypeScript
export type Producto = z.infer<typeof productoSchema>
export type CreateProductoInput = z.infer<typeof createProductoSchema>
export type UpdateProductoInput = z.infer<typeof updateProductoSchema>
export type SearchProductosInput = z.infer<typeof searchProductosSchema>
