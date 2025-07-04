"use server"

import type { LoginCredentials, AuthResponse, User } from "@/interfaces/auth"
import { RolUsuario, NivelLicencia } from "@/interfaces/auth"
import { loginSchema } from "@/schemas/auth.schemas"

// Usuarios demo para el sistema
const DEMO_USERS: User[] = [
  {
    id: "admin-001",
    usuario: "admin",
    nombreCompleto: "Juan Carlos Administrador",
    correo: "admin@apprest.com",
    rol: RolUsuario.ADMINISTRADOR,
    esAdministrador: true,
    nivelLicencia: NivelLicencia.FRANQUICIA,
    empresaId: "empresa-001",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "mesero-001",
    usuario: "mesero",
    nombreCompleto: "María Elena Mesero",
    correo: "mesero@apprest.com",
    rol: RolUsuario.MESERO,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.PRO,
    empresaId: "empresa-001",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "cajero-001",
    usuario: "cajero",
    nombreCompleto: "Pedro Luis Cajero",
    correo: "cajero@apprest.com",
    rol: RolUsuario.CAJERO,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.PRO,
    empresaId: "empresa-001",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "cocinero-001",
    usuario: "cocinero",
    nombreCompleto: "Ana Sofia Cocinero",
    correo: "cocinero@apprest.com",
    rol: RolUsuario.COCINERO,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.LITE,
    empresaId: "empresa-001",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
  {
    id: "gerente-001",
    usuario: "gerente",
    nombreCompleto: "Roberto Carlos Gerente",
    correo: "gerente@apprest.com",
    rol: RolUsuario.GERENTE,
    esAdministrador: false,
    nivelLicencia: NivelLicencia.PRO,
    empresaId: "empresa-001",
    nombreEmpresa: "Restaurante Demo",
    activo: true,
  },
]

// Credenciales demo (en producción esto vendría de la base de datos)
const DEMO_CREDENTIALS = {
  admin: { contraseña: "admin123", pin: "1234" },
  mesero: { contraseña: "mesero123", pin: "5678" },
  cajero: { contraseña: "cajero123", pin: "9012" },
  cocinero: { contraseña: "cocina123", pin: "3456" },
  gerente: { contraseña: "gerente123", pin: "7890" },
}

export async function authenticateUser(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    // Validar datos de entrada
    const validatedData = loginSchema.parse(credentials)

    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Buscar usuario
    const user = DEMO_USERS.find((u) => u.usuario === validatedData.usuario)

    if (!user) {
      return {
        success: false,
        error: "Usuario no encontrado",
      }
    }

    // Verificar credenciales
    const userCredentials = DEMO_CREDENTIALS[user.usuario as keyof typeof DEMO_CREDENTIALS]

    if (
      !userCredentials ||
      userCredentials.contraseña !== validatedData.contraseña ||
      userCredentials.pin !== validatedData.pin
    ) {
      return {
        success: false,
        error: "Credenciales inválidas",
      }
    }

    // Verificar si el usuario está activo
    if (!user.activo) {
      return {
        success: false,
        error: "Usuario inactivo",
      }
    }

    // Generar token (en producción sería un JWT real)
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
      error: "Error interno del servidor",
    }
  }
}

export async function verifyToken(token: string): Promise<AuthResponse> {
  try {
    // En producción, aquí verificarías el JWT
    if (!token || !token.startsWith("token_")) {
      return {
        success: false,
        error: "Token inválido",
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: "Error verificando token",
    }
  }
}
