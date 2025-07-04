import { z } from "zod"

export const loginSchema = z.object({
  usuario: z.string().min(1, "El usuario es requerido").min(3, "El usuario debe tener al menos 3 caracteres"),
  contraseña: z.string().min(1, "La contraseña es requerida").min(6, "La contraseña debe tener al menos 6 caracteres"),
  pin: z
    .string()
    .min(1, "El PIN es requerido")
    .length(4, "El PIN debe tener exactamente 4 dígitos")
    .regex(/^\d+$/, "El PIN debe contener solo números"),
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
  activo: z.boolean(),
  avatar: z.string().optional(),
  ultimoLogin: z.date().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type UserData = z.infer<typeof userSchema>
