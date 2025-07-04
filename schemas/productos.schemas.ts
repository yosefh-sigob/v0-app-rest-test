import { z } from "zod"

export const ProductoFormSchema = z.object({
  ClaveProducto: z
    .string()
    .min(1, "La clave del producto es requerida")
    .max(10, "La clave no puede tener más de 10 caracteres")
    .regex(/^[A-Z0-9]+$/, "La clave solo puede contener letras mayúsculas y números")
    .transform((val) => val.toUpperCase()),

  TipoProducto: z.enum(["Platillo", "Producto", "Botella"], {
    required_error: "Debe seleccionar un tipo de producto",
  }),

  Nombredelproducto: z
    .string()
    .min(1, "El nombre del producto es requerido")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .trim(),

  Descripcion: z.string().max(500, "La descripción no puede tener más de 500 caracteres").optional().default(""),

  Favorito: z.boolean().default(false),

  ExentoImpuesto: z.boolean().default(false),

  PrecioAbierto: z.boolean().default(false),

  ControlStock: z.boolean().default(false),

  PrecioxUtilidadad: z.boolean().default(false),

  Facturable: z.boolean().default(true),

  Suspendido: z.boolean().default(false),

  // Canales de venta - al menos uno debe estar activo
  Comedor: z.boolean().default(false),
  ADomicilio: z.boolean().default(false),
  Mostrador: z.boolean().default(false),
  Enlinea: z.boolean().default(false),
  EnAPP: z.boolean().default(false),
  EnMenuQR: z.boolean().default(false),

  // Campos opcionales con ULIDs
  GrupoProductoULID: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? undefined : val)),

  SubgrupoProductoULID: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? undefined : val)),

  UnidadesULID: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? undefined : val)),

  AreaProduccionULID: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? undefined : val)),

  AlmacenULID: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? undefined : val)),

  ClasificacionQRULID: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? undefined : val)),

  ClaveTributaria: z
    .string()
    .max(20, "La clave tributaria no puede tener más de 20 caracteres")
    .optional()
    .nullable()
    .transform((val) => (val === "" ? undefined : val)),

  // Datos dinámicos como JSON
  DatosDinamicos: z.record(z.any()).optional().default({}),
})

export const ProductoFilterSchema = z.object({
  busqueda: z.string().optional(),
  tipo: z.enum(["todos", "Platillo", "Producto", "Botella"]).default("todos"),
  favoritos: z.boolean().optional(),
  suspendidos: z.boolean().optional(),
  grupo: z.string().optional(),
  subgrupo: z.string().optional(),
  ordenarPor: z
    .enum(["Nombredelproducto", "ClaveProducto", "TipoProducto", "Fecha_UltimoCambio"])
    .default("Nombredelproducto"),
  direccion: z.enum(["asc", "desc"]).default("asc"),
})

export const ProductoSearchSchema = z.object({
  query: z.string().min(1, "Ingrese un término de búsqueda").max(100),
  campos: z
    .array(z.enum(["Nombredelproducto", "ClaveProducto", "Descripcion"]))
    .default(["Nombredelproducto", "ClaveProducto"]),
})

export const ClaveProductoSchema = z.object({
  clave: z
    .string()
    .min(1, "La clave es requerida")
    .max(10, "La clave no puede tener más de 10 caracteres")
    .regex(/^[A-Z0-9]+$/, "La clave solo puede contener letras mayúsculas y números")
    .transform((val) => val.toUpperCase()),
  excludeId: z.string().optional(),
})

// Esquemas para datos relacionados
export const GrupoProductoSchema = z.object({
  GrupoProductoULID: z.string(),
  ClaveGrupo: z.string(),
  Descripcion: z.string(),
  Orden: z.number(),
  Clasificacion: z.string(),
  MenuQR: z.boolean(),
  CatalogoOnline: z.boolean(),
  APPComensal: z.boolean(),
  Inactiva: z.boolean(),
  Paletacolor: z.string(),
  Imagen: z.string().optional(),
  Sucursales: z.boolean(),
  AplicarComentarios: z.boolean(),
})

export const SubgrupoProductoSchema = z.object({
  SubgrupoProductoULID: z.string(),
  ClaveGrupo: z.string(),
  ClaveSubGrupo: z.string(),
  Descripcion: z.string(),
  AplicarComentarios: z.boolean(),
  Suspendido: z.boolean(),
})

export const UnidadSchema = z.object({
  UnidadULID: z.string(),
  ClaveUnidad: z.string(),
  Descripcion: z.string(),
  Abreviacion: z.string(),
})

export const AreaProduccionSchema = z.object({
  AreaProduccionULID: z.string(),
  ClaveArea: z.string(),
  Descripcion: z.string(),
  Impresora: z.string().optional(),
  Activa: z.boolean(),
})

// Tipos TypeScript derivados de los esquemas
export type ProductoFormData = z.infer<typeof ProductoFormSchema>
export type ProductoFilterData = z.infer<typeof ProductoFilterSchema>
export type ProductoSearchData = z.infer<typeof ProductoSearchSchema>
export type ClaveProductoData = z.infer<typeof ClaveProductoSchema>
export type GrupoProductoData = z.infer<typeof GrupoProductoSchema>
export type SubgrupoProductoData = z.infer<typeof SubgrupoProductoSchema>
export type UnidadData = z.infer<typeof UnidadSchema>
export type AreaProduccionData = z.infer<typeof AreaProduccionSchema>

// Validaciones personalizadas
export const validarCanalesVenta = (data: ProductoFormData): boolean => {
  return [data.Comedor, data.ADomicilio, data.Mostrador, data.Enlinea, data.EnAPP, data.EnMenuQR].some(
    (canal) => canal === true,
  )
}

export const validarClaveUnica = async (
  clave: string,
  excludeId?: string,
  validatorFn?: (clave: string, excludeId?: string) => Promise<boolean>,
): Promise<boolean> => {
  if (!validatorFn) return true

  try {
    const existe = await validatorFn(clave, excludeId)
    return !existe
  } catch (error) {
    console.error("Error validando clave:", error)
    return false
  }
}

// Constantes para opciones
export const TIPOS_PRODUCTO = [
  { value: "Platillo", label: "Platillo" },
  { value: "Producto", label: "Producto" },
  { value: "Botella", label: "Botella" },
] as const

export const CANALES_VENTA = [
  { key: "Comedor", label: "Comedor", description: "Venta en el comedor del restaurante" },
  { key: "ADomicilio", label: "A Domicilio", description: "Servicio de entrega a domicilio" },
  { key: "Mostrador", label: "Mostrador", description: "Venta directa en mostrador" },
  { key: "Enlinea", label: "En Línea", description: "Venta a través de plataforma web" },
  { key: "EnAPP", label: "En APP", description: "Venta a través de aplicación móvil" },
  { key: "EnMenuQR", label: "Menú QR", description: "Disponible en menú con código QR" },
] as const

export const CAMPOS_ORDENAMIENTO = [
  { value: "Nombredelproducto", label: "Nombre" },
  { value: "ClaveProducto", label: "Clave" },
  { value: "TipoProducto", label: "Tipo" },
  { value: "Fecha_UltimoCambio", label: "Última modificación" },
] as const
