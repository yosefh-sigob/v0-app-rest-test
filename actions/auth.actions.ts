"use server"

import type { LoginCredentials, AuthResponse, User } from "@/interfaces/auth"
import { RolUsuario, NivelLicencia } from "@/interfaces/auth"

// Base de datos mock de usuarios
const MOCK_USERS: User[] = [
  {
    id: "1",
    usuario: "admin",
    nombreCompleto: "Juan Carlos Administrador",
    correo: "admin@apprest.com",
    rol: RolUsuario.ADMINISTRADOR,
    esAdministrador: true,
    nivelLicencia: NivelLicencia.FRANQUICIA,
    empresaId: "emp_001",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "2",
    usuario: "gerente",
    nombreCompleto: "María Elena Gerente",
    correo: "gerente@apprest.com",
    rol: RolUsuario.GERENTE,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.PRO,
    empresaId: "emp_001",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "3",
    usuario: "cajero",
    nombreCompleto: "Pedro Luis Cajero",
    correo: "cajero@apprest.com",
    rol: RolUsuario.CAJERO,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.LITE,
    empresaId: "emp_001",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "4",
    usuario: "mesero",
    nombreCompleto: "Ana Sofia Mesero",
    correo: "mesero@apprest.com",
    rol: RolUsuario.MESERO,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.LITE,
    empresaId: "emp_001",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "5",
    usuario: "cocinero",
    nombreCompleto: "Roberto Chef Cocinero",
    correo: "cocinero@apprest.com",
    rol: RolUsuario.COCINERO,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.GRATIS,
    empresaId: "emp_001",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
    avatar: "/placeholder-user.jpg",
  },
]

// Credenciales mock (en producción estarían hasheadas)
const MOCK_CREDENTIALS = {
  admin: { contraseña: "admin123", pin: "1234" },
  gerente: { contraseña: "gerente123", pin: "7890" },
  cajero: { contraseña: "cajero123", pin: "9012" },
  mesero: { contraseña: "mesero123", pin: "5678" },
  cocinero: { contraseña: "cocina123", pin: "3456" },
}

export async function authenticateUser(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const { usuario, contraseña, pin } = credentials

    // Buscar usuario en la base de datos mock
    const user = MOCK_USERS.find((u) => u.usuario === usuario && u.activo)

    if (!user) {
      return {
        success: false,
        error: "Usuario no encontrado o inactivo",
      }
    }

    // Verificar credenciales
    const userCredentials = MOCK_CREDENTIALS[usuario as keyof typeof MOCK_CREDENTIALS]

    if (!userCredentials || userCredentials.contraseña !== contraseña || userCredentials.pin !== pin) {
      return {
        success: false,
        error: "Credenciales inválidas",
      }
    }

    // Generar token mock (en producción sería un JWT real)
    const token = `token_${user.id}_${Date.now()}`

    // Actualizar último login
    const updatedUser: User = {
      ...user,
      ultimoLogin: new Date(),
    }

    return {
      success: true,
      user: updatedUser,
      token,
    }
  } catch (error) {
    console.error("Error en autenticación:", error)
    return {
      success: false,
      error: "Error interno del servidor",
    }
  }
}

export async function validateToken(token: string): Promise<User | null> {
  try {
    // En producción aquí se validaría el JWT
    if (!token.startsWith("token_")) {
      return null
    }

    const userId = token.split("_")[1]
    const user = MOCK_USERS.find((u) => u.id === userId && u.activo)

    return user || null
  } catch (error) {
    console.error("Error validando token:", error)
    return null
  }
}
