export interface GrupoProducto {
  GrupoProductoULID: string
  ClaveGrupo: string
  Orden: number
  Descripcion: string
  Clasificacion: string
  MenuQR: boolean
  CatalogoOnline: boolean
  APPComensal: boolean
  Inactiva: boolean
  Paletacolor: string
  Imagen?: string
  Sucursales: boolean
  AplicarComentarios: boolean
  CamposDinamicos?: Record<string, any>
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: string
}

export interface Producto {
  ProductoULID: string
  GrupoProductoULID: string
  SubgrupoProductoULID?: string
  ClaveProducto: string
  TipoProducto: "Platillo" | "Producto" | "Botella"
  Nombredelproducto: string
  Favorito: boolean
  Descripcion?: string
  ExentoImpuesto: boolean
  PrecioAbierto: boolean
  UnidadesULID: string
  AreaProduccionULID: string
  AlmacenULID: string
  ControlStock: boolean
  PrecioxUtilidadad: boolean
  Facturable: boolean
  ClaveTributaria?: string
  Suspendido: boolean
  Comedor: boolean
  ADomicilio: boolean
  Mostrador: boolean
  Enlinea: boolean
  EnAPP: boolean
  CanalesVenta: boolean
  EnMenuQR: boolean
  ClasificacionQRULID?: string
  DatosDinamicos?: Record<string, any>
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: string
  EmpresaULID: string
}

export interface ProductoPresentacion {
  PresentacionULID: string
  ProductoULID: string
  CodigoPresentacion: string
  NombrePresentacion: string
  CostoInsumos: number
  UnidadesULID: string
  PreciodeVenta: number
  ComisiondeVenta: number
  ComisiondeVentaPorcentaje: number
  Puntos: number
  VariosenEnPlato: boolean
  TieneReceta: boolean
  TiempodeProduccion: number
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: string
  EmpresaULID: string
}
