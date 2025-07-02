"use server"

import type { Empresa, Usuario } from "@/interfaces/empresa.interface"
import type { EmpresaFormData, UsuarioFormData } from "@/schemas/empresa.schema"
import { mockEmpresa, mockUsuarios } from "@/utils/mock-data"
import { generateULID } from "@/utils/ulid"

export async function obtenerEmpresa(): Promise<Empresa> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockEmpresa
}

export async function obtenerUsuarios(): Promise<Usuario[]> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 150))
  return mockUsuarios
}

export async function crearEmpresa(data: EmpresaFormData): Promise<Empresa> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  const nuevaEmpresa: Empresa = {
    EmpresaULID: generateULID(),
    ...data,
    FechaRegistro: new Date(),
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
  }

  return nuevaEmpresa
}

export async function crearUsuario(data: UsuarioFormData): Promise<Usuario> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  const nuevoUsuario: Usuario = {
    UsuarioULID: generateULID(),
    ...data,
    Suspendido: false,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
  }

  return nuevoUsuario
}

export async function actualizarEmpresa(id: string, data: Partial<EmpresaFormData>): Promise<Empresa> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    ...mockEmpresa,
    ...data,
    Fecha_UltimoCambio: new Date(),
  }
}

export async function suspenderUsuario(id: string): Promise<Usuario> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 200))

  const usuario = mockUsuarios.find((u) => u.UsuarioULID === id)
  if (!usuario) {
    throw new Error("Usuario no encontrado")
  }

  return {
    ...usuario,
    Suspendido: true,
    FechaSuspension: new Date(),
    Fecha_UltimoCambio: new Date(),
  }
}
