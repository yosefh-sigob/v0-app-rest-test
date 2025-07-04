"use server"

import type { LoginCredentials, AuthResponse, User } from "@/interfaces/auth"
import { RolUsuario, NivelLicencia } from "@/interfaces/auth"
import { loginSchema } from "@/schemas/auth.schemas"

// Mock users database
const mockUsers: User[] = [
  {
    id: "1",
    usuario: "admin",
    nombreCompleto: "Administrador Sistema",
    correo: "admin@apprest.com",
    rol: RolUsuario.ADMINISTRADOR,
    esAdministrador: true,
    nivelLicencia: NivelLicencia.PRO,
    empresaId: "emp1",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "2",
    usuario: "gerente",
    nombreCompleto: "María García López",
    correo: "gerente@apprest.com",
    rol: RolUsuario.GERENTE,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.PRO,
    empresaId: "emp1",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "3",
    usuario: "cajero",
    nombreCompleto: "Carlos Rodríguez Pérez",
    correo: "cajero@apprest.com",
    rol: RolUsuario.CAJERO,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.LITE,
    empresaId: "emp1",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "4",
    usuario: "mesero",
    nombreCompleto: "Ana Martínez Silva",
    correo: "mesero@apprest.com",
    rol: RolUsuario.MESERO,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.LITE,
    empresaId: "emp1",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "5",
    usuario: "cocinero",
    nombreCompleto: "José Luis Hernández",
    correo: "cocinero@apprest.com",
    rol: RolUsuario.COCINERO,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.GRATIS,
    empresaId: "emp1",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
]

// Mock credentials database
const mockCredentials = [
  { usuario: "admin", contraseña: "admin123", pin: "1234" },
  { usuario: "gerente", contraseña: "gerente123", pin: "7890" },
  { usuario: "cajero", contraseña: "cajero123", pin: "9012" },
  { usuario: "mesero", contraseña: "mesero123", pin: "5678" },
  { usuario: "cocinero", contraseña: "cocina123", pin: "3456" },
]

export async function authenticateUser(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    // Validate input
    const validatedCredentials = loginSchema.parse(credentials)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user credentials
    const userCredentials = mockCredentials.find(
      (cred) =>
        cred.usuario === validatedCredentials.usuario &&
        cred.contraseña === validatedCredentials.contraseña &&
        cred.pin === validatedCredentials.pin,
    )

    if (!userCredentials) {
      return {
        success: false,
        error: "Credenciales inválidas. Verifica usuario, contraseña y PIN.",
      }
    }

    // Find user data
    const user = mockUsers.find((u) => u.usuario === userCredentials.usuario)

    if (!user || !user.activo) {
      return {
        success: false,
        error: "Usuario no encontrado o inactivo.",
      }
    }

    // Generate token (in real app, use JWT)
    const token = `token_${user.id}_${Date.now()}`

    return {
      success: true,
      user,
      token,
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return {
      success: false,
      error: "Error interno del servidor.",
    }
  }
}

export async function verifyToken(token: string): Promise<{ valid: boolean; user?: User }> {
  // In a real app, verify JWT token
  // For now, just check if token exists and extract user ID
  if (!token.startsWith("token_")) {
    return { valid: false }
  }

  const userId = token.split("_")[1]
  const user = mockUsers.find((u) => u.id === userId)

  return {
    valid: !!user,
    user,
  }
}
