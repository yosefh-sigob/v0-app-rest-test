import type { ULID } from "./empresa.interface"

export enum TipoProducto {
  PLATILLO = "Platillo",
  PRODUCTO = "Producto",
  BOTELLA = "Botella",
}

export interface GrupoProducto {
  GrupoProductoULID: ULID
  Clave: string
  Orden: string
  Descripcion: string
  Clasificacion: string
  MenuQR: boolean
  CatalogoOnline: boolean
  APPComensal: boolean
  Inactiva: boolean
  Paletacolor: string
  Imagen: string
  Sucursales: boolean
  AplicarComentarios: boolean
  CamposDinamicos?: any
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface Producto {
  ProductoULID: ULID
  GrupoProductoULID: number
  SubgrupoProductoULID: number
  ClaveProducto: string
  TipoProducto: TipoProducto
  Nombredelproducto: string
  Favorito: boolean
  Descripcion: string
  ExentoImpuesto: boolean
  PrecioAbierto: boolean
  UnidadesULID: number
  AreaProduccionULID: number
  AlmacenULID: number
  ControlStock: boolean
  PrecioxUtilidad: boolean
  Facturable: boolean
  ClaveTributaria: string
  Suspendido: boolean
  Comedor: boolean
  ADomicilio: boolean
  Mostrador: boolean
  Enlinea: boolean
  EnAPP: boolean
  CanalesVenta: boolean
  EnMenuQR: boolean
  ClasificacionQRULID: number
  DatosDinamicos?: any
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}
