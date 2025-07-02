import { z } from "zod"

export const planodeMesasSchema = z.object({
  NombrePlanodeMesas: z
    .string()
    .min(1, "El nombre del plano es requerido")
    .max(255, "El nombre no puede exceder 255 caracteres"),
  ComensalesMaximos: z.number().int("Debe ser un número entero").positive("Debe ser un número positivo"),
  Activo: z.boolean().default(true),
  UsuarioULID: z.number().int().positive(),
  EmpresaULID: z.string().length(26, "ULID de empresa inválido"),
})

export const areaVentasSchema = z.object({
  PlanoULID: z.string().length(26, "ULID de plano inválido"),
  Descripcion: z
    .string()
    .min(1, "La descripción es requerida")
    .max(15, "La descripción no puede exceder 15 caracteres"),
  Fumar: z.boolean().default(false),
  Exterior: z.boolean().default(false),
  Barra: z.boolean().default(false),
  UsuarioULID: z.number().int().positive(),
  EmpresaULID: z.string().length(26, "ULID de empresa inválido"),
})

export const tipoMesaSchema = z.object({
  Descripcion: z
    .string()
    .min(1, "La descripción es requerida")
    .max(100, "La descripción no puede exceder 100 caracteres"),
  NumeroComensales: z.number().int("Debe ser un número entero").positive("Debe ser un número positivo"),
  NumeroMaxComensales: z.number().int("Debe ser un número entero").positive("Debe ser un número positivo"),
  Icono: z.string().max(255, "El icono no puede exceder 255 caracteres").optional(),
  UsuarioULID: z.number().int().positive(),
  EmpresaULID: z.string().length(26, "ULID de empresa inválido"),
})

export const mesaSchema = z.object({
  ClaveMesa: z.string().max(3, "La clave no puede exceder 3 caracteres"),
  NombreMesa: z
    .string()
    .min(1, "El nombre de la mesa es requerido")
    .max(20, "El nombre no puede exceder 20 caracteres"),
  TipoMesaULID: z.number().int().positive(),
  AreaVentasULID: z.number().int().positive(),
  ComensalesMaximos: z.number().int("Debe ser un número entero").positive("Debe ser un número positivo"),
  UsuarioULID: z.number().int().positive(),
  EmpresaULID: z.string().length(26, "ULID de empresa inválido"),
})

export type PlanodeMesasFormData = z.infer<typeof planodeMesasSchema>
export type AreaVentasFormData = z.infer<typeof areaVentasSchema>
export type TipoMesaFormData = z.infer<typeof tipoMesaSchema>
export type MesaFormData = z.infer<typeof mesaSchema>
