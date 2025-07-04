export enum RolUsuario {
  ADMINISTRADOR = "Administrador",
  MESERO = "Mesero",
  CAJERO = "Cajero",
  COCINERO = "Cocinero",
  GERENTE = "Gerente",
}

export interface UsuarioAuth {
  UsuarioULID: string
  NombreCompleto: string
  Usuario: string
  Correo: string
  Celular: string
  Puesto: string
  Rol: RolUsuario
  EsAdministrador: boolean
  EmpresaULID: string
  NombreEmpresa: string
  NivelLicencia: string
  Avatar?: string
}

export interface SesionAuth {
  usuario: UsuarioAuth
  token: string
  expiracion: Date
}

export interface LoginCredentials {
  usuario: string
  contraseña: string
  pin?: string
}
