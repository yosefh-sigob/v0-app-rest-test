import { z } from "zod"
import { TipoProducto } from "@/interfaces/productos.interface"

export const grupoProductoSchema = z.object({
  Clave: z.string().max(50, "La clave no puede exceder 50 caracteres"),
  Orden: z.string().max(3, "El orden no puede exceder 3 caracteres"),
  Descripcion: z.string().max(255, "La descripción no puede exceder 255 caracteres"),
  Clasificacion: z.string().max(100, "La clasificación no puede exceder 100 caracteres"),
  MenuQR: z.boolean().default(false),
  CatalogoOnline: z.boolean().default(false),
  APPComensal: z.boolean().default(false),
  Inactiva: z.boolean().default(false),
  Paletacolor: z.string().max(25, "La paleta de color no puede exceder 25 caracteres").optional(),
  Imagen: z.string().max(255, "La imagen no puede exceder 255 caracteres").optional(),
  Sucursales: z.boolean().default(false),
  AplicarComentarios: z.boolean().default(false),
  CamposDinamicos: z.any().optional(),
  UsuarioULID: z.number().int().positive(),
  EmpresaULID: z.string().length(26, "ULID de empresa inválido"),
})

export const productoSchema = z.object({
  GrupoProductoULID: z.number().int().positive(),
  SubgrupoProductoULID: z.number().int().positive(),
  ClaveProducto: z.string().max(10, "La clave no puede exceder 10 caracteres"),
  TipoProducto: z.nativeEnum(TipoProducto),
  Nombredelproducto: z
    .string()
    .min(1, "El nombre del producto es requerido")
    .max(20, "El nombre no puede exceder 20 caracteres"),
  Favorito: z.boolean().default(false),
  Descripcion: z.string().optional(),
  ExentoImpuesto: z.boolean().default(false),
  PrecioAbierto: z.boolean().default(false),
  UnidadesULID: z.number().int().positive(),
  AreaProduccionULID: z.number().int().positive(),
  AlmacenULID: z.number().int().positive(),
  ControlStock: z.boolean().default(false),
  PrecioxUtilidad: z.boolean().default(false),
  Facturable: z.boolean().default(true),
  ClaveTributaria: z.string().max(20, "La clave tributaria no puede exceder 20 caracteres").optional(),
  Suspendido: z.boolean().default(false),
  Comedor: z.boolean().default(true),
  ADomicilio: z.boolean().default(false),
  Mostrador: z.boolean().default(false),
  Enlinea: z.boolean().default(false),
  EnAPP: z.boolean().default(false),
  CanalesVenta: z.boolean().default(false),
  EnMenuQR: z.boolean().default(false),
  ClasificacionQRULID: z.number().int().positive().optional(),
  DatosDinamicos: z.any().optional(),
  UsuarioULID: z.number().int().positive(),
  EmpresaULID: z.string().length(26, "ULID de empresa inválido"),
})

export type GrupoProductoFormData = z.infer<typeof grupoProductoSchema>
export type ProductoFormData = z.infer<typeof productoSchema>
