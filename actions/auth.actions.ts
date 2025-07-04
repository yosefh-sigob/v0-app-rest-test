"use server"

import { type LoginCredentials, type UsuarioAuth, type SesionAuth, RolUsuario } from "@/interfaces/auth"
import { loginSchema } from "@/schemas/auth.schemas"
import { generateULID } from "@/lib/utils/ulid"

// Mock de usuarios para demostración
const mockUsuarios: UsuarioAuth[] = [
  {
    UsuarioULID: generateULID(),
    NombreCompleto: "Juan Pérez Administrador",
    Usuario: "admin",
    Correo: "admin@restaurant.com",
    Celular: "5551234567",
    Puesto: "Administrador General",
    Rol: RolUsuario.ADMINISTRADOR,
    EsAdministrador: true,
    EmpresaULID: "empresa_001",
    NombreEmpresa: "Restaurante Demo",
    NivelLicencia: "Pro",
    Avatar: "/placeholder-user.jpg",
  },
  {
    UsuarioULID: generateULID(),
    NombreCompleto: "María García Mesero",
    Usuario: "mesero",
    Correo: "mesero@restaurant.com",
    Celular: "5551234568",
    Puesto: "Mesero Senior",
    Rol: RolUsuario.MESERO,
    EsAdministrador: false,
    EmpresaULID: "empresa_001",
    NombreEmpresa: "Restaurante Demo",
    NivelLicencia: "Pro",
  },
  {
    UsuarioULID: generateULID(),
    NombreCompleto: "Carlos López Cajero",
    Usuario: "cajero",
    Correo: "cajero@restaurant.com",
    Celular: "5551234569",
    Puesto: "Cajero Principal",
    Rol: RolUsuario.CAJERO,
    EsAdministrador: false,
    EmpresaULID: "empresa_001",
    NombreEmpresa: "Restaurante Demo",
    NivelLicencia: "Pro",
  },
  {
    UsuarioULID: generateULID(),
    NombreCompleto: "Ana Martínez Cocinero",
    Usuario: "cocinero",
    Correo: "cocinero@restaurant.com",
    Celular: "5551234570",
    Puesto: "Chef Principal",
    Rol: RolUsuario.COCINERO,
    EsAdministrador: false,
    EmpresaULID: "empresa_001",
    NombreEmpresa: "Restaurante Demo",
    NivelLicencia: "Pro",
  },
]

// Mock de credenciales (en producción esto vendría de la base de datos)
const mockCredenciales = [
  { usuario: "admin", contraseña: "admin123", pin: "1234" },
  { usuario: "mesero", contraseña: "mesero123", pin: "5678" },
  { usuario: "cajero", contraseña: "cajero123", pin: "9012" },
  { usuario: "cocinero", contraseña: "cocina123", pin: "3456" },
]

export async function loginAction(credentials: LoginCredentials) {
  try {
    // Validar datos de entrada
    const validatedData = loginSchema.parse(credentials)

    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Buscar credenciales
    const credencial = mockCredenciales.find(
      (c) => c.usuario === validatedData.usuario && c.contraseña === validatedData.contraseña,
    )

    if (!credencial) {
      return {
        success: false,
        error: "Usuario o contraseña incorrectos",
      }
    }

    // Si se requiere PIN, validarlo
    if (validatedData.pin && credencial.pin !== validatedData.pin) {
      return {
        success: false,
        error: "PIN incorrecto",
      }
    }

    // Buscar usuario
    const usuario = mockUsuarios.find((u) => u.Usuario === validatedData.usuario)

    if (!usuario) {
      return {
        success: false,
        error: "Usuario no encontrado",
      }
    }

    // Generar token (en producción sería un JWT real)
    const token = `token_${generateULID()}_${Date.now()}`
    const expiracion = new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 horas

    const sesion: SesionAuth = {
      usuario,
      token,
      expiracion,
    }

    return {
      success: true,
      data: sesion,
    }
  } catch (error) {
    console.error("Error en loginAction:", error)
    return {
      success: false,
      error: "Error interno del servidor",
    }
  }
}

export async function logoutAction() {
  try {
    // Simular delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // En producción aquí se invalidaría el token en el servidor
    return {
      success: true,
    }
  } catch (error) {
    console.error("Error en logoutAction:", error)
    return {
      success: false,
      error: "Error al cerrar sesión",
    }
  }
}

export async function verificarSesionAction(token: string) {
  try {
    // Simular verificación de token
    await new Promise((resolve) => setTimeout(resolve, 300))

    // En producción aquí se verificaría el token JWT
    if (token.startsWith("token_")) {
      return {
        success: true,
        data: { valid: true },
      }
    }

    return {
      success: false,
      error: "Token inválido",
    }
  } catch (error) {
    console.error("Error en verificarSesionAction:", error)
    return {
      success: false,
      error: "Error verificando sesión",
    }
  }
}
