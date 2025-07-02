"use server"

import type { Producto, GrupoProducto } from "@/interfaces/productos.interface"
import type { ProductoFormData } from "@/schemas/productos.schema"
import { mockProductos, mockGruposProductos } from "@/utils/mock-data"
import { generateULID } from "@/utils/ulid"

export async function obtenerProductos(): Promise<Producto[]> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockProductos
}

export async function obtenerGruposProductos(): Promise<GrupoProducto[]> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 150))
  return mockGruposProductos
}

export async function buscarProductos(termino: string): Promise<Producto[]> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockProductos.filter(
    (producto) =>
      producto.Nombredelproducto.toLowerCase().includes(termino.toLowerCase()) ||
      producto.ClaveProducto.toLowerCase().includes(termino.toLowerCase()),
  )
}

export async function obtenerProductosActivos(): Promise<Producto[]> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 200))

  return mockProductos.filter((producto) => !producto.Suspendido)
}

export async function crearProducto(data: ProductoFormData): Promise<Producto> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  const nuevoProducto: Producto = {
    ProductoULID: generateULID(),
    ...data,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
  }

  return nuevoProducto
}

export async function actualizarProducto(id: string, data: Partial<ProductoFormData>): Promise<Producto> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 300))

  const producto = mockProductos.find((p) => p.ProductoULID === id)
  if (!producto) {
    throw new Error("Producto no encontrado")
  }

  return {
    ...producto,
    ...data,
    Fecha_UltimoCambio: new Date(),
  }
}

export async function suspenderProducto(id: string): Promise<Producto> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 200))

  const producto = mockProductos.find((p) => p.ProductoULID === id)
  if (!producto) {
    throw new Error("Producto no encontrado")
  }

  return {
    ...producto,
    Suspendido: true,
    Fecha_UltimoCambio: new Date(),
  }
}
