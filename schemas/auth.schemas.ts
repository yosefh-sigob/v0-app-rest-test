import { z } from "zod"

export const loginSchema = z.object({
  username: z.string().min(1, "El usuario es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  pin: z.string().min(4, "El PIN debe tener al menos 4 dígitos").max(6, "El PIN no puede tener más de 6 dígitos"),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  role: z.enum(["Administrador", "Mesero", "Cajero", "Cocinero", "Gerente"]),
  pin: z.string(),
  isActive: z.boolean(),
  empresaId: z.string(),
})
