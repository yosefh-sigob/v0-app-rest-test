export type ULID = string

export enum TipoEmpresa {
  UNICA = "Unica",
  MATRIZ = "Matriz",
  SUCURSAL = "Sucursal",
}

export interface Empresa {
  EmpresaULID: ULID
  NombreRestaurante: string
  Esquema: string
  Licencia: string
  TipoEmpresa: TipoEmpresa
  FechaRegistro: Date
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: number
}

export interface Usuario {
  UsuarioULID: ULID
  NombreCompleto: string
  Usuario: string
  Correo: string
  Contraseña: string
  PIN: string
  Celular: string
  Puesto: string
  EsAdministrador: boolean
  Suspendido: boolean
  FechaSuspension?: Date
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  Usuario2ULID?: number
  EmpresaULID: ULID
}
