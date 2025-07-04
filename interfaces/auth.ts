export enum RolUsuario {
  ADMINISTRADOR = "Administrador",
  GERENTE = "Gerente",
  CAJERO = "Cajero",
  MESERO = "Mesero",
  COCINERO = "Cocinero",
}

export enum NivelLicencia {
  GRATIS = "Gratis",
  LITE = "Lite",
  PRO = "Pro",
  FRANQUICIA = "Franquicia",
}

export interface User {
  id: string
  usuario: string
  nombreCompleto: string
  correo: string
  rol: RolUsuario
  esAdministrador: boolean
  nivelLicencia: NivelLicencia
  empresaId: string
  nombreEmpresa: string
  avatar?: string
  activo: boolean
}

export interface LoginCredentials {
  usuario: string
  contraseña: string
  pin: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
}

export interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
}
