"use server"

import type { Mesa, AreaVentas, TipoMesa } from "@/interfaces/mesas.interface"
import type { MesaFormData } from "@/schemas/mesas.schema"
import { mockMesas, mockAreasVentas, mockTiposMesa } from "@/utils/mock-data"
import { generateULID } from "@/utils/ulid"

export async function obtenerMesas(): Promise<Mesa[]> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockMesas
}

export async function obtenerAreasVentas(): Promise<AreaVentas[]> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 150))
  return mockAreasVentas
}

export async function obtenerTiposMesa(): Promise<TipoMesa[]> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockTiposMesa
}

export async function crearMesa(data: MesaFormData): Promise<Mesa> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  const nuevaMesa: Mesa = {
    MesaULID: generateULID(),
    ...data,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
  }

  return nuevaMesa
}

export async function actualizarMesa(id: string, data: Partial<MesaFormData>): Promise<Mesa> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 300))

  const mesa = mockMesas.find((m) => m.MesaULID === id)
  if (!mesa) {
    throw new Error("Mesa no encontrada")
  }

  return {
    ...mesa,
    ...data,
    Fecha_UltimoCambio: new Date(),
  }
}

export async function cambiarEstadoMesa(id: string, estado: string): Promise<Mesa> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 200))

  const mesa = mockMesas.find((m) => m.MesaULID === id)
  if (!mesa) {
    throw new Error("Mesa no encontrada")
  }

  // En una implementación real, el estado se guardaría en una tabla separada
  return {
    ...mesa,
    Fecha_UltimoCambio: new Date(),
  }
}
