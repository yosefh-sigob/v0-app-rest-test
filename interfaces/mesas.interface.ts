import type { ULID } from "./empresa.interface"

export interface PlanodeMesas {
  PlanoULID: ULID
  NombrePlanodeMesas: string
  ComensalesMaximos: number
  Activo: boolean
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface AreaVentas {
  AreaULID: ULID
  PlanoULID: ULID
  Descripcion: string
  Fumar: boolean
  Exterior: boolean
  Barra: boolean
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface TipoMesa {
  TipoMesaULID: ULID
  Descripcion: string
  NumeroComensales: number
  NumeroMaxComensales: number
  Icono: string
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface Mesa {
  MesaULID: ULID
  ClaveMesa: string
  NombreMesa: string
  TipoMesaULID: number
  AreaVentasULID: number
  ComensalesMaximos: number
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}
