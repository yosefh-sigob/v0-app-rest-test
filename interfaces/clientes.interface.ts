import type { ULID } from "./empresa.interface"

export interface Cliente {
  ClienteULID: ULID
  Celular: string
  Nombres: string
  Apellidos: string
  NombreCorto: string
  NotasEspeciales: string
  FechaNacimiento: Date
  Correo: string
  Comentarios: string
  LimitedeCredito: number
  DiasdeCredito: number
  SaldodeCredito: number
  Suspendido: boolean
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface ClienteDomicilio {
  ClienteDomicilioULID: ULID
  ClienteULID: ULID
  TipoDomicilio: string
  Pais: string
  CP: string
  Estado: string
  Colonia: string
  Ciudad: string
  Direccion: string
  Exterior: string
  Interior: string
  Referencias: string
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}
