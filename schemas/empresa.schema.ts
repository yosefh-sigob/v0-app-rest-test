import { z } from "zod"

export const empresaSchema = z.object({
  EmpresaULID: z.string().length(26),
  RazonSocial: z.string().min(1, "La razón social es requerida").max(255),
  NombreComercial: z.string().min(1, "El nombre comercial es requerido").max(255),
  RFC: z.string().min(12, "RFC inválido").max(13),
  Direccion: z.string().min(1, "La dirección es requerida"),
  Telefono: z.string().min(10, "Teléfono inválido").max(15),
  Email: z.string().email("Email inválido"),
  SitioWeb: z.string().url("URL inválida").optional(),
  Logo: z.string().optional(),
  TipoEmpresa: z.enum(["Restaurante", "Franquicia", "Corporativo"]),
  Activa: z.boolean().default(true),
})

export const sucursalSchema = z.object({
  SucursalULID: z.string().length(26),
  EmpresaULID: z.string().length(26),
  ClaveSucursal: z.string().min(1).max(10),
  NombreSucursal: z.string().min(1).max(255),
  Direccion: z.string().min(1),
  Telefono: z.string().min(10).max(15),
  Email: z.string().email(),
  Gerente: z.string().min(1).max(255),
  Activa: z.boolean().default(true),
})

export type EmpresaFormData = z.infer<typeof empresaSchema>
export type SucursalFormData = z.infer<typeof sucursalSchema>
