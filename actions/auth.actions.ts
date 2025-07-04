"use server"

import type { LoginCredentials, AuthResponse, User, RolUsuario, NivelLicencia } from "@/interfaces/auth"

// Base de datos mock de usuarios
const MOCK_USERS: User[] = [
  {
    id: "01HKQM7X8P9R2S3T4U5V6W7X8Y",
    usuario: "admin",
    nombreCompleto: "Juan Carlos Administrador",
    correo: "admin@apprest.com",
    rol: "Administrador" as RolUsuario,
    esAdministrador: true,
    nivelLicencia: "FRANQUICIA" as NivelLicencia,
    empresaId: "01HKQM7X8P9R2S3T4U5V6W7X8Z",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "01HKQM7X8P9R2S3T4U5V6W7X9A",
    usuario: "gerente",
    nombreCompleto: "María Elena Gerente",
    correo: "gerente@apprest.com",
    rol: "Gerente" as RolUsuario,
    esAdministrador: false,
    nivelLicencia: "PRO" as NivelLicencia,
    empresaId: "01HKQM7X8P9R2S3T4U5V6W7X8Z",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
  },
  {
    id: "01HKQM7X8P9R2S3T4U5V6W7X9B",
    usuario: "cajero",
    nombreCompleto: "Pedro Luis Cajero",
    correo: "cajero@apprest.com",
    rol: "Cajero" as RolUsuario,
    esAdministrador: false,
    nivelLicencia: "LITE" as NivelLicencia,
    empresaId: "01HKQM7X8P9R2S3T4U5V6W7X8Z",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
  },
  {
    id: "01HKQM7X8P9R2S3T4U5V6W7X9C",
    usuario: "mesero",
    nombreCompleto: "Ana Sofia Mesero",
    correo: "mesero@apprest.com",
    rol: "Mesero" as RolUsuario,
    esAdministrador: false,
    nivelLicencia: "LITE" as NivelLicencia,
    empresaId: "01HKQM7X8P9R2S3T4U5V6W7X8Z",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
  },
  {
    id: "01HKQM7X8P9R2S3T4U5V6W7X9D",
    usuario: "cocinero",
    nombreCompleto: "Roberto Chef Cocinero",
    correo: "cocinero@apprest.com",
    rol: "Cocinero" as RolUsuario,
    esAdministrador: false,
    nivelLicencia: "GRATIS" as NivelLicencia,
    empresaId: "01HKQM7X8P9R2S3T4U5V6W7X8Z",
    nombreEmpresa: "Restaurante El Buen Sabor",
    activo: true,
  },
]

// Credenciales mock (en producción esto estaría en base de datos encriptada)
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

    // Buscar usuario
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

    // Generar token mock
    const token = `token_${user.id}_${Date.now()}`

    // Actualizar último login
    const updatedUser = {
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

export async function validateToken(token: string): Promise<AuthResponse> {
  try {
    // En producción, aquí validarías el token JWT
    if (!token || !token.startsWith("token_")) {
      return {
        success: false,
        error: "Token inválido",
      }
    }

    // Extraer ID del usuario del token mock
    const parts = token.split("_")
    if (parts.length !== 3) {
      return {
        success: false,
        error: "Formato de token inválido",
      }
    }

    const userId = parts[1]
    const user = MOCK_USERS.find((u) => u.id === userId && u.activo)

    if (!user) {
      return {
        success: false,
        error: "Usuario no encontrado",
      }
    }

    return {
      success: true,
      user,
      token,
    }
  } catch (error) {
    console.error("Error validando token:", error)
    return {
      success: false,
      error: "Error validando sesión",
    }
  }
}
