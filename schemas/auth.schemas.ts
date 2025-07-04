import { z } from "zod"

export const loginSchema = z.object({
  usuario: z.string().min(1, "El usuario es requerido"),
  contraseña: z.string().min(1, "La contraseña es requerida"),
  pin: z.string().min(4, "El PIN debe tener al menos 4 dígitos").max(6, "El PIN no puede tener más de 6 dígitos"),
})

export const userSchema = z.object({
  id: z.string(),
  usuario: z.string(),
  nombreCompleto: z.string(),
  correo: z.string().email(),
  rol: z.enum(["Administrador", "Gerente", "Cajero", "Mesero", "Cocinero"]),
  esAdministrador: z.boolean(),
  nivelLicencia: z.enum(["Gratis", "Lite", "Pro", "Franquicia"]),
  empresaId: z.string(),
  nombreEmpresa: z.string(),
  avatar: z.string().optional(),
  activo: z.boolean(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type UserData = z.infer<typeof userSchema>
