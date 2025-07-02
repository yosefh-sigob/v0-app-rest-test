import { z } from "zod"

export const planodeMesasSchema = z.object({
  PlanoULID: z.string().length(26),
  NombrePlanodeMesas: z.string().min(1).max(255),
  ComensalesMaximos: z.number().int().positive(),
  Activo: z.boolean().default(true),
})

export const areaVentaSchema = z.object({
  AreaULID: z.string().length(26),
  PlanoULID: z.string().length(26),
  Descripcion: z.string().min(1).max(15),
  Fumar: z.boolean().default(false),
  Exterior: z.boolean().default(false),
  Barra: z.boolean().default(false),
})

export const mesaSchema = z.object({
  MesaULID: z.string().length(26),
  ClaveMesa: z.string().min(1).max(3),
  NombreMesa: z.string().min(1).max(20),
  TipoMesaULID: z.string().length(26),
  AreaVentasULID: z.string().length(26),
  ComensalesMaximos: z.number().int().positive(),
  Estado: z.enum(["Disponible", "Ocupada", "Reservada", "Limpieza"]).default("Disponible"),
})

export const tipoMesaSchema = z.object({
  TipoMesaULID: z.string().length(26),
  Descripcion: z.string().min(1).max(255),
})

export type PlanodeMesasFormData = z.infer<typeof planodeMesasSchema>
export type AreaVentaFormData = z.infer<typeof areaVentaSchema>
export type MesaFormData = z.infer<typeof mesaSchema>
export type TipoMesaFormData = z.infer<typeof tipoMesaSchema>
