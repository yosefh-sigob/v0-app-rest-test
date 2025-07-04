export interface User {
  id: string
  username: string
  email: string
  fullName: string
  role: UserRole
  pin: string
  isActive: boolean
  lastLogin?: Date
  empresaId: string
}

export enum UserRole {
  ADMINISTRADOR = "Administrador",
  MESERO = "Mesero",
  CAJERO = "Cajero",
  COCINERO = "Cocinero",
  GERENTE = "Gerente",
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  username: string
  password: string
  pin: string
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
}
