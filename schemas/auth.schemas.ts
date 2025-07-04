import { z } from "zod"
import { RolUsuario, NivelLicencia } from "@/interfaces/auth"

export const loginSchema = z.object({
  usuario: z.string().min(1, "El usuario es requerido"),
  contraseña: z.string().min(1, "La contraseña es requerida"),
  pin: z.string().min(4, "El PIN debe tener al menos 4 dígitos").max(6, "El PIN debe tener máximo 6 dígitos"),
})

export const userSchema = z.object({
  id: z.string(),
  usuario: z.string(),
  nombreCompleto: z.string(),
  correo: z.string().email(),
  rol: z.nativeEnum(RolUsuario),
  esAdministrador: z.boolean(),
  nivelLicencia: z.nativeEnum(NivelLicencia),
  empresaId: z.string(),
  nombreEmpresa: z.string(),
  avatar: z.string().optional(),
  activo: z.boolean(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type UserData = z.infer<typeof userSchema>
