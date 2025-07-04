"use server"

import type { LoginCredentials, AuthResponse, User } from "@/interfaces/auth"
import { RolUsuario, NivelLicencia } from "@/interfaces/auth"

// Mock users database
const mockUsers: User[] = [
  {
    id: "1",
    usuario: "admin",
    nombreCompleto: "Administrador Sistema",
    correo: "admin@apprest.com",
    rol: RolUsuario.ADMINISTRADOR,
    esAdministrador: true,
    nivelLicencia: NivelLicencia.FRANQUICIA,
    empresaId: "emp_001",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "2",
    usuario: "gerente",
    nombreCompleto: "María García Gerente",
    correo: "gerente@apprest.com",
    rol: RolUsuario.GERENTE,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.PRO,
    empresaId: "emp_001",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "3",
    usuario: "cajero",
    nombreCompleto: "Carlos López Cajero",
    correo: "cajero@apprest.com",
    rol: RolUsuario.CAJERO,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.LITE,
    empresaId: "emp_001",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "4",
    usuario: "mesero",
    nombreCompleto: "Ana Martínez Mesero",
    correo: "mesero@apprest.com",
    rol: RolUsuario.MESERO,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.LITE,
    empresaId: "emp_001",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "5",
    usuario: "cocinero",
    nombreCompleto: "José Rodríguez Cocinero",
    correo: "cocinero@apprest.com",
    rol: RolUsuario.COCINERO,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.GRATIS,
    empresaId: "emp_001",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
]

// Mock credentials
const mockCredentials = {
  admin: { contraseña: "admin123", pin: "1234" },
  gerente: { contraseña: "gerente123", pin: "7890" },
  cajero: { contraseña: "cajero123", pin: "9012" },
  mesero: { contraseña: "mesero123", pin: "5678" },
  cocinero: { contraseña: "cocina123", pin: "3456" },
}

export async function authenticateUser(credentials: LoginCredentials): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // Find user
    const user = mockUsers.find((u) => u.usuario === credentials.usuario)
    if (!user) {
      return {
        success: false,
        error: "Usuario no encontrado",
      }
    }

    // Check if user is active
    if (!user.activo) {
      return {
        success: false,
        error: "Usuario inactivo",
      }
    }

    // Verify credentials
    const userCreds = mockCredentials[credentials.usuario as keyof typeof mockCredentials]
    if (!userCreds) {
      return {
        success: false,
        error: "Credenciales no configuradas",
      }
    }

    if (userCreds.contraseña !== credentials.contraseña) {
      return {
        success: false,
        error: "Contraseña incorrecta",
      }
    }

    if (userCreds.pin !== credentials.pin) {
      return {
        success: false,
        error: "PIN incorrecto",
      }
    }

    // Generate token
    const token = `token_${user.id}_${Date.now()}`

    return {
      success: true,
      user,
      token,
    }
  } catch (error) {
    return {
      success: false,
      error: "Error interno del servidor",
    }
  }
}

export async function verifyToken(token: string): Promise<{ valid: boolean; user?: User }> {
  // Simulate token verification
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Simple token validation (in real app, verify JWT)
  if (token.startsWith("token_")) {
    const userId = token.split("_")[1]
    const user = mockUsers.find((u) => u.id === userId)

    if (user && user.activo) {
      return { valid: true, user }
    }
  }

  return { valid: false }
}
