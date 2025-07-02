import { z } from "zod"

export const grupoProductoSchema = z.object({
  GrupoProductoULID: z.string().length(26),
  ClaveGrupo: z.string().min(1).max(50),
  Orden: z.number().int().positive(),
  Descripcion: z.string().min(1).max(255),
  Clasificacion: z.string().max(100),
  MenuQR: z.boolean().default(false),
  CatalogoOnline: z.boolean().default(false),
  APPComensal: z.boolean().default(false),
  Inactiva: z.boolean().default(false),
  Paletacolor: z.string().max(25),
  Imagen: z.string().optional(),
  Sucursales: z.boolean().default(true),
  AplicarComentarios: z.boolean().default(false),
  CamposDinamicos: z.record(z.any()).optional(),
})

export const productoSchema = z.object({
  ProductoULID: z.string().length(26),
  GrupoProductoULID: z.string().length(26),
  SubgrupoProductoULID: z.string().length(26).optional(),
  ClaveProducto: z.string().min(1).max(10),
  TipoProducto: z.enum(["Platillo", "Producto", "Botella"]),
  Nombredelproducto: z.string().min(1).max(20),
  Favorito: z.boolean().default(false),
  Descripcion: z.string().optional(),
  ExentoImpuesto: z.boolean().default(false),
  PrecioAbierto: z.boolean().default(false),
  UnidadesULID: z.string().length(26),
  AreaProduccionULID: z.string().length(26),
  AlmacenULID: z.string().length(26),
  ControlStock: z.boolean().default(false),
  PrecioxUtilidadad: z.boolean().default(false),
  Facturable: z.boolean().default(true),
  ClaveTributaria: z.string().max(20).optional(),
  Suspendido: z.boolean().default(false),
  Comedor: z.boolean().default(true),
  ADomicilio: z.boolean().default(false),
  Mostrador: z.boolean().default(true),
  Enlinea: z.boolean().default(false),
  EnAPP: z.boolean().default(false),
  CanalesVenta: z.boolean().default(false),
  EnMenuQR: z.boolean().default(false),
  ClasificacionQRULID: z.string().length(26).optional(),
  DatosDinamicos: z.record(z.any()).optional(),
})

export const productoPresentacionSchema = z.object({
  PresentacionULID: z.string().length(26),
  ProductoULID: z.string().length(26),
  CodigoPresentacion: z.string().min(1).max(15),
  NombrePresentacion: z.string().min(1).max(25),
  CostoInsumos: z.number().min(0),
  UnidadesULID: z.string().length(26),
  PreciodeVenta: z.number().min(0),
  ComisiondeVenta: z.number().min(0),
  ComisiondeVentaPorcentaje: z.number().min(0).max(100),
  Puntos: z.number().min(0),
  VariosenEnPlato: z.boolean().default(false),
  TieneReceta: z.boolean().default(false),
  TiempodeProduccion: z.number().min(0),
})

export type GrupoProductoFormData = z.infer<typeof grupoProductoSchema>
export type ProductoFormData = z.infer<typeof productoSchema>
export type ProductoPresentacionFormData = z.infer<typeof productoPresentacionSchema>
