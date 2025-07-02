"use server"

import type { Empresa } from "@/interfaces/empresa.interface"
import { mockEmpresas } from "@/utils/mock-data"
import { generateULID } from "@/utils/ulid"

export async function getEmpresas(): Promise<Empresa[]> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockEmpresas
}

export async function getEmpresaById(id: string): Promise<Empresa | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockEmpresas.find((empresa) => empresa.EmpresaULID === id) || null
}

export async function createEmpresa(
  data: Omit<Empresa, "EmpresaULID" | "FechaRegistro" | "Fecha_UltimoCambio">,
): Promise<Empresa> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const nuevaEmpresa: Empresa = {
    ...data,
    EmpresaULID: generateULID(),
    FechaRegistro: new Date(),
    Fecha_UltimoCambio: new Date(),
  }

  mockEmpresas.push(nuevaEmpresa)
  return nuevaEmpresa
}

export async function updateEmpresa(id: string, data: Partial<Empresa>): Promise<Empresa | null> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const index = mockEmpresas.findIndex((empresa) => empresa.EmpresaULID === id)
  if (index === -1) return null

  mockEmpresas[index] = {
    ...mockEmpresas[index],
    ...data,
    Fecha_UltimoCambio: new Date(),
  }

  return mockEmpresas[index]
}

export async function deleteEmpresa(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const index = mockEmpresas.findIndex((empresa) => empresa.EmpresaULID === id)
  if (index === -1) return false

  mockEmpresas.splice(index, 1)
  return true
}
