import type { ULID } from "./empresa.interface"

export enum CanalReservacion {
  EN_SITIO = "En Sitio",
  TELEFONO = "Telefono",
  ONLINE = "Online",
}

export enum EstadoReservacion {
  PENDIENTE = "Pendiente",
  CONFIRMADA = "Confirmada",
  SENTADO = "Sentado",
  CANCELADA = "Cancelada",
}

export interface TipoReservacion {
  TipoReservacionULID: ULID
  Descripcion: string
  Politicas: string
  AtencionEspecial: string
  TipoDescuentoULID: number
  Comisionista: boolean
  Garantizada: boolean
  CostoxPersonaGarantia: number
  CondicionesGarantia: string
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface Reservacion {
  ReservacionULID: ULID
  CanalReservacion: CanalReservacion
  ComisionistaULID: number
  TipoReservacionULID: number
  ListadeEspera: boolean
  Niños: boolean
  CantidadNiños: number
  Mascotas: boolean
  SilladeRuedas: boolean
  SillaBebe: boolean
  ClienteULID: number
  ClienteNombre: string
  PaisCelular: string
  ClienteCelular: string
  ClienteCorreo: string
  NumeroPersonas: number
  Notas: string
  MesaULID: number
  FechaReservacion: Date
  HoraReservacion: string
  TiempodeEspera: number
  EstadoReservacion: EstadoReservacion
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}
