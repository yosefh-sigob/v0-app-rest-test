import { z } from "zod"
import { RolUsuario } from "@/interfaces/auth"

export const loginSchema = z.object({
  usuario: z
    .string()
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(50, "El usuario no puede exceder 50 caracteres"),
  contraseña: z
    .string()
    .min(4, "La contraseña debe tener al menos 4 caracteres")
    .max(20, "La contraseña no puede exceder 20 caracteres"),
  pin: z
    .string()
    .length(4, "El PIN debe tener exactamente 4 dígitos")
    .regex(/^\d+$/, "El PIN solo puede contener números")
    .optional(),
})

export const usuarioAuthSchema = z.object({
  UsuarioULID: z.string(),
  NombreCompleto: z.string(),
  Usuario: z.string(),
  Correo: z.string().email(),
  Celular: z.string(),
  Puesto: z.string(),
  Rol: z.nativeEnum(RolUsuario),
  EsAdministrador: z.boolean(),
  EmpresaULID: z.string(),
  NombreEmpresa: z.string(),
  NivelLicencia: z.string(),
  Avatar: z.string().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type UsuarioAuthData = z.infer<typeof usuarioAuthSchema>
