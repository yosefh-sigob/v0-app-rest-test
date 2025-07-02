import type { ULID } from "./empresa.interface"

export enum EstadoVenta {
  PEDIDO = "Pedido",
  EN_PROCESO = "En Proceso",
  ACEPTADO = "Aceptado",
}

export enum TipoVenta {
  COMEDOR = "Comedor",
  MOSTRADOR = "Mostrador",
  DOMICILIO = "Domicilio",
  FICHAS = "Fichas",
  EVENTOS = "Eventos",
}

export interface Venta {
  VentaULID: ULID
  TurnoULID: number
  CanalULID: number
  EstadoVenta: EstadoVenta
  NumCuenta: string
  TipoVenta: TipoVenta
  TipoDescuentoULID: number
  AreaULID: number
  Personas: number
  FechaApertura: Date
  Cancelada: boolean
  UsuarioULID: number
  FechaCancelacion?: Date
  Impresa: boolean
  FechaImpresion?: Date
  FechaCierre?: Date
  MesaULID: number
  MeseroULID: number
  Subtotal: number
  CostoReparto: number
  Comisiones: number
  ImpuestoULID: number
  Descuentos: number
  TotalPropina: number
  Total: number
  Saldo: number
  EstadoCuenta: string
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  EmpresaULID: ULID
}
