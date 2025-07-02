export interface Reservacion {
  ReservacionULID: string
  TipoReservacionULID: string
  ClienteULID: string
  ClienteNombre: string
  ClienteTelefono: string
  ClienteCorreo?: string
  NumeroPersonas: number
  Notas?: string
  MesaULID: string
  FechaReservacion: Date
  HoraReservacion: string
  TiempodeEspera: number
  EstadoReservacion: "Pendiente" | "Confirmada" | "Sentado" | "Cancelada"
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: string
  EmpresaULID: string
}

export interface TipoReservacion {
  TipoReservacionULID: string
  Descripcion: string
  Politicas?: string
  AtencionEspecial?: string
  TipoDescuentoULID?: string
  Comisionista: boolean
  Garantizada: boolean
  CostoxPersonaGarantia?: number
  CondicionesGarantia?: string
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: string
  EmpresaULID: string
}
