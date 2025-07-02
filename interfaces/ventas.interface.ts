export interface Venta {
  VentaULID: string
  FolioVenta: string
  TipoVenta: "Comedor" | "Mostrador" | "Domicilio" | "EnLinea"
  ClienteULID?: string
  MesaULID?: string
  UsuarioVentaULID: string
  FechaVenta: Date
  HoraVenta: string
  Subtotal: number
  ImpuestoULID: string
  PorcentajeImpuesto: number
  TotalImpuesto: number
  Total: number
  EstadoVenta: "Abierta" | "Cerrada" | "Cancelada"
  Observaciones?: string
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: string
  SucursalULID: string
  EmpresaULID: string
}

export interface VentaDetalle {
  VentaDetalleULID: string
  VentaULID: string
  ProductoULID: string
  PresentacionULID: string
  Cantidad: number
  PrecioUnitario: number
  Descuento: number
  Subtotal: number
  ImpuestoULID: string
  PorcentajeImpuesto: number
  TotalImpuesto: number
  Total: number
  MesaULID?: string
  AreaProduccionULID: string
  HoraPedido: string
  HoraInicioPreparacion?: Date
  HoraFin?: Date
  TiempoPreparacion?: number
  EstadoProducto: "Pedido" | "En Proceso" | "Aceptado" | "Pausado" | "Terminado"
  AvisoDemorado: boolean
  OrdenPreparacion: number
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: string
  EmpresaULID: string
}
