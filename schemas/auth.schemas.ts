import { z } from "zod"

export const loginSchema = z.object({
  usuario: z
    .string()
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(50, "El usuario no puede exceder 50 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "El usuario solo puede contener letras, números y guiones bajos"),
  contraseña: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña no puede exceder 100 caracteres"),
  pin: z
    .string()
    .min(4, "El PIN debe tener al menos 4 dígitos")
    .max(6, "El PIN no puede exceder 6 dígitos")
    .regex(/^\d+$/, "El PIN solo puede contener números"),
})

export type LoginFormData = z.infer<typeof loginSchema>

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
  activo: z.boolean(),
  avatar: z.string().optional(),
  ultimoLogin: z.date().optional(),
})

import { RolUsuario, NivelLicencia } from "@/interfaces/auth"
