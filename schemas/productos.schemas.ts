import { z } from "zod"

// Esquema base para producto
export const productoBaseSchema = z.object({
  ClaveProducto: z
    .string()
    .min(1, "La clave del producto es requerida")
    .max(10, "La clave no puede tener más de 10 caracteres")
    .regex(/^[A-Z0-9]+$/, "La clave solo puede contener letras mayúsculas y números"),

  TipoProducto: z.enum(["Platillo", "Producto", "Botella"], {
    required_error: "El tipo de producto es requerido",
  }),

  Nombredelproducto: z
    .string()
    .min(1, "El nombre del producto es requerido")
    .max(100, "El nombre no puede tener más de 100 caracteres"),

  Descripcion: z.string().max(500, "La descripción no puede tener más de 500 caracteres").optional(),

  Imagen: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),

  // Configuraciones booleanas
  Favorito: z.boolean().default(false),
  ExentoImpuesto: z.boolean().default(false),
  PrecioAbierto: z.boolean().default(false),
  ControlStock: z.boolean().default(false),
  PrecioxUtilidad: z.boolean().default(false),
  Facturable: z.boolean().default(true),
  Suspendido: z.boolean().default(false),

  // Canales de venta
  Comedor: z.boolean().default(false),
  ADomicilio: z.boolean().default(false),
  Mostrador: z.boolean().default(false),
  Enlinea: z.boolean().default(false),
  EnAPP: z.boolean().default(false),
  EnMenuQR: z.boolean().default(false),

  // Referencias opcionales
  GrupoProductoID: z.string().optional(),
  UnidadID: z.string().optional(),
  AreaProduccionID: z.string().optional(),
  AlmacenID: z.string().optional(),
  ClasificacionQRID: z.string().optional(),
  ClaveTributaria: z.string().optional(),
})

// Esquema completo del producto (incluye campos del sistema)
export const productoSchema = productoBaseSchema.extend({
  ProductoULID: z.string(),
  Fecha_UltimoCambio: z.string(),
  Fecha_Sync: z.string().optional(),
  UsuarioULID: z.string().optional(),
  EmpresaULID: z.string().optional(),
})

// Esquema para crear producto
export const createProductoSchema = productoBaseSchema.refine(
  (data) => {
    // Al menos un canal de venta debe estar activo
    return data.Comedor || data.ADomicilio || data.Mostrador || data.Enlinea || data.EnAPP || data.EnMenuQR
  },
  {
    message: "Debe seleccionar al menos un canal de venta",
    path: ["Comedor"], // Mostrar error en el primer campo de canales
  },
)

// Esquema para actualizar producto
export const updateProductoSchema = productoBaseSchema.partial().refine(
  (data) => {
    // Si se proporcionan canales de venta, al menos uno debe estar activo
    const hasChannelData = [
      data.Comedor,
      data.ADomicilio,
      data.Mostrador,
      data.Enlinea,
      data.EnAPP,
      data.EnMenuQR,
    ].some((channel) => channel !== undefined)

    if (hasChannelData) {
      return data.Comedor || data.ADomicilio || data.Mostrador || data.Enlinea || data.EnAPP || data.EnMenuQR
    }

    return true
  },
  {
    message: "Debe seleccionar al menos un canal de venta",
    path: ["Comedor"],
  },
)

// Esquema para búsqueda/filtros
export const searchProductosInputSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  tipo: z.enum(["Platillo", "Producto", "Botella"]).optional(),
  favorito: z.boolean().optional(),
  suspendido: z.boolean().optional(),
  grupoId: z.string().optional(),
  sortBy: z.enum(["nombre", "clave", "tipo", "fecha"]).default("nombre"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
})

// Tipos TypeScript
export type Producto = z.infer<typeof productoSchema>
export type CreateProductoInput = z.infer<typeof createProductoSchema>
export type UpdateProductoInput = z.infer<typeof updateProductoSchema>
export type SearchProductosInput = z.infer<typeof searchProductosInputSchema>

// Esquemas para validación de campos individuales
export const claveProductoSchema = z
  .string()
  .min(1, "La clave es requerida")
  .max(10, "Máximo 10 caracteres")
  .regex(/^[A-Z0-9]+$/, "Solo letras mayúsculas y números")

export const nombreProductoSchema = z.string().min(1, "El nombre es requerido").max(100, "Máximo 100 caracteres")

// Constantes para tipos de producto
export const TIPOS_PRODUCTO = [
  { value: "Platillo", label: "🍽️ Platillo", description: "Comida preparada con receta" },
  { value: "Producto", label: "📦 Producto", description: "Artículo que se vende tal como se compra" },
  { value: "Botella", label: "🍷 Botella", description: "Bebidas alcohólicas y no alcohólicas" },
] as const

// Constantes para canales de venta
export const CANALES_VENTA = [
  { key: "Comedor", label: "🏠 Comedor", description: "Servicio en mesas del restaurante" },
  { key: "ADomicilio", label: "🚚 A Domicilio", description: "Entrega a domicilio" },
  { key: "Mostrador", label: "🏪 Mostrador", description: "Venta directa en mostrador" },
  { key: "Enlinea", label: "💻 En Línea", description: "Pedidos por internet" },
  { key: "EnAPP", label: "📱 En APP", description: "Pedidos por aplicación móvil" },
  { key: "EnMenuQR", label: "📱 Menú QR", description: "Pedidos por código QR" },
] as const

// Función helper para validar producto
export function validateProducto(data: unknown): { success: boolean; data?: Producto; errors?: string[] } {
  try {
    const validatedData = productoSchema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`)
      return { success: false, errors }
    }
    return { success: false, errors: ["Error de validación desconocido"] }
  }
}

// Función helper para validar datos de creación
export function validateCreateProducto(data: unknown): {
  success: boolean
  data?: CreateProductoInput
  errors?: string[]
} {
  try {
    const validatedData = createProductoSchema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`)
      return { success: false, errors }
    }
    return { success: false, errors: ["Error de validación desconocido"] }
  }
}
