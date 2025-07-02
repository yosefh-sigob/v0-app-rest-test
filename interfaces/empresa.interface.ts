export type ULID = string

export enum TipoEmpresa {
  UNICA = "Unica",
  MATRIZ = "Matriz",
  SUCURSAL = "Sucursal",
}

export interface Empresa {
  EmpresaULID: string
  RazonSocial: string
  NombreComercial: string
  RFC: string
  Direccion: string
  Telefono: string
  Email: string
  SitioWeb?: string
  Logo?: string
  TipoEmpresa: "Restaurante" | "Franquicia" | "Corporativo"
  Activa: boolean
  FechaRegistro: Date
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: string
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

export interface Sucursal {
  SucursalULID: string
  EmpresaULID: string
  ClaveSucursal: string
  NombreSucursal: string
  Direccion: string
  Telefono: string
  Email: string
  Gerente: string
  Activa: boolean
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: string
}
