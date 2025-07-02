import { z } from "zod"
import { TipoEmpresa } from "@/interfaces/empresa.interface"

export const empresaSchema = z.object({
  NombreRestaurante: z
    .string()
    .min(1, "El nombre del restaurante es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  Esquema: z.string().max(100, "El esquema no puede exceder 100 caracteres").optional(),
  Licencia: z.string().max(3, "La licencia no puede exceder 3 caracteres").optional(),
  TipoEmpresa: z.nativeEnum(TipoEmpresa),
  UsuarioULID: z.number().int("Debe ser un número entero").positive("Debe ser un número positivo"),
})

export const usuarioSchema = z.object({
  NombreCompleto: z
    .string()
    .min(1, "El nombre completo es requerido")
    .max(255, "El nombre no puede exceder 255 caracteres"),
  Usuario: z
    .string()
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(100, "El usuario no puede exceder 100 caracteres"),
  Correo: z.string().email("Correo electrónico inválido").max(100, "El correo no puede exceder 100 caracteres"),
  Contraseña: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(8, "La contraseña no puede exceder 8 caracteres"),
  PIN: z
    .string()
    .length(4, "El PIN debe tener exactamente 4 dígitos")
    .regex(/^\d{4}$/, "El PIN debe contener solo números"),
  Celular: z
    .string()
    .length(10, "El celular debe tener 10 dígitos")
    .regex(/^\d{10}$/, "El celular debe contener solo números"),
  Puesto: z.string().max(100, "El puesto no puede exceder 100 caracteres").optional(),
  EsAdministrador: z.boolean().default(false),
  EmpresaULID: z.string().length(26, "ULID de empresa inválido"),
})

export type EmpresaFormData = z.infer<typeof empresaSchema>
export type UsuarioFormData = z.infer<typeof usuarioSchema>
