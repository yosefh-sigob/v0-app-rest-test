export interface PlanodeMesas {
  PlanoULID: string
  NombrePlanodeMesas: string
  ComensalesMaximos: number
  Activo: boolean
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: string
  EmpresaULID: string
}

export interface AreaVenta {
  AreaULID: string
  PlanoULID: string
  Descripcion: string
  Fumar: boolean
  Exterior: boolean
  Barra: boolean
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: string
  EmpresaULID: string
}

export interface Mesa {
  MesaULID: string
  ClaveMesa: string
  NombreMesa: string
  TipoMesaULID: string
  AreaVentasULID: string
  ComensalesMaximos: number
  Estado: "Disponible" | "Ocupada" | "Reservada" | "Limpieza"
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: string
  EmpresaULID: string
}

export interface TipoMesa {
  TipoMesaULID: string
  Descripcion: string
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: string
  EmpresaULID: string
}
