"use server"

import { type LoginCredentials, type User, UserRole } from "@/interfaces/auth"
import { loginSchema } from "@/schemas/auth.schemas"

// Usuarios demo para testing
const DEMO_USERS: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@restaurant.com",
    fullName: "Administrador Sistema",
    role: UserRole.ADMINISTRADOR,
    pin: "1234",
    isActive: true,
    empresaId: "empresa-1",
  },
  {
    id: "2",
    username: "mesero",
    email: "mesero@restaurant.com",
    fullName: "Juan Pérez",
    role: UserRole.MESERO,
    pin: "5678",
    isActive: true,
    empresaId: "empresa-1",
  },
  {
    id: "3",
    username: "cajero",
    email: "cajero@restaurant.com",
    fullName: "María García",
    role: UserRole.CAJERO,
    pin: "9012",
    isActive: true,
    empresaId: "empresa-1",
  },
  {
    id: "4",
    username: "cocinero",
    email: "cocinero@restaurant.com",
    fullName: "Carlos López",
    role: UserRole.COCINERO,
    pin: "3456",
    isActive: true,
    empresaId: "empresa-1",
  },
  {
    id: "5",
    username: "gerente",
    email: "gerente@restaurant.com",
    fullName: "Ana Martínez",
    role: UserRole.GERENTE,
    pin: "7890",
    isActive: true,
    empresaId: "empresa-1",
  },
]

const DEMO_PASSWORDS: Record<string, string> = {
  admin: "admin123",
  mesero: "mesero123",
  cajero: "cajero123",
  cocinero: "cocina123",
  gerente: "gerente123",
}

export async function authenticateUser(credentials: LoginCredentials) {
  try {
    // Validar datos de entrada
    const validatedData = loginSchema.parse(credentials)

    // Buscar usuario
    const user = DEMO_USERS.find((u) => u.username === validatedData.username)

    if (!user) {
      return { success: false, error: "Usuario no encontrado" }
    }

    if (!user.isActive) {
      return { success: false, error: "Usuario inactivo" }
    }

    // Verificar contraseña
    const expectedPassword = DEMO_PASSWORDS[user.username]
    if (expectedPassword !== validatedData.password) {
      return { success: false, error: "Contraseña incorrecta" }
    }

    // Verificar PIN
    if (user.pin !== validatedData.pin) {
      return { success: false, error: "PIN incorrecto" }
    }

    // Generar token simple (en producción usar JWT)
    const token = `token_${user.id}_${Date.now()}`

    // Actualizar último login
    const authenticatedUser: User = {
      ...user,
      lastLogin: new Date(),
    }

    return {
      success: true,
      user: authenticatedUser,
      token,
      message: "Autenticación exitosa",
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return { success: false, error: "Error en la autenticación" }
  }
}

export async function validateToken(token: string) {
  try {
    // Validación simple del token (en producción usar JWT)
    if (token.startsWith("token_")) {
      return { valid: true }
    }
    return { valid: false }
  } catch (error) {
    return { valid: false }
  }
}
