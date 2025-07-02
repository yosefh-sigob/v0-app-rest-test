"use server"

import type { Mesa, AreaVenta, PlanodeMesas } from "@/interfaces/mesas.interface"
import { mockMesas, mockAreasVenta, mockPlanosMesas } from "@/utils/mock-data"
import { generateULID } from "@/utils/ulid"

export async function getMesas(): Promise<Mesa[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockMesas
}

export async function getAreasVenta(): Promise<AreaVenta[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return mockAreasVenta
}

export async function getPlanosMesas(): Promise<PlanodeMesas[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockPlanosMesas
}

export async function getMesaById(id: string): Promise<Mesa | null> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockMesas.find((mesa) => mesa.MesaULID === id) || null
}

export async function getMesasByArea(areaId: string): Promise<Mesa[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return mockMesas.filter((mesa) => mesa.AreaVentasULID === areaId)
}

export async function updateEstadoMesa(id: string, estado: Mesa["Estado"]): Promise<Mesa | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const index = mockMesas.findIndex((mesa) => mesa.MesaULID === id)
  if (index === -1) return null

  mockMesas[index].Estado = estado
  mockMesas[index].Fecha_UltimoCambio = new Date()

  return mockMesas[index]
}

export async function createMesa(data: Omit<Mesa, "MesaULID" | "Fecha_UltimoCambio" | "Fecha_Sync">): Promise<Mesa> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const nuevaMesa: Mesa = {
    ...data,
    MesaULID: generateULID(),
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
  }

  mockMesas.push(nuevaMesa)
  return nuevaMesa
}

export async function deleteMesa(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const index = mockMesas.findIndex((mesa) => mesa.MesaULID === id)
  if (index === -1) return false

  mockMesas.splice(index, 1)
  return true
}

export async function getEstadisticasMesas() {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const disponibles = mockMesas.filter((mesa) => mesa.Estado === "Disponible").length
  const ocupadas = mockMesas.filter((mesa) => mesa.Estado === "Ocupada").length
  const reservadas = mockMesas.filter((mesa) => mesa.Estado === "Reservada").length
  const limpieza = mockMesas.filter((mesa) => mesa.Estado === "Limpieza").length

  return {
    total: mockMesas.length,
    disponibles,
    ocupadas,
    reservadas,
    limpieza,
    porcentajeOcupacion: Math.round((ocupadas / mockMesas.length) * 100),
  }
}
