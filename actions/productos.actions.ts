"use server"

import type { Producto, GrupoProducto } from "@/interfaces/productos.interface"
import { mockProductos, mockGruposProductos } from "@/utils/mock-data"
import { generateULID } from "@/utils/ulid"

export async function getProductos(): Promise<Producto[]> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return mockProductos
}

export async function getGruposProductos(): Promise<GrupoProducto[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return mockGruposProductos
}

export async function getProductoById(id: string): Promise<Producto | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockProductos.find((producto) => producto.ProductoULID === id) || null
}

export async function getProductosByGrupo(grupoId: string): Promise<Producto[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockProductos.filter((producto) => producto.GrupoProductoULID === grupoId)
}

export async function createProducto(data: Omit<Producto, "ProductoULID" | "Fecha_UltimoCambio">): Promise<Producto> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const nuevoProducto: Producto = {
    ...data,
    ProductoULID: generateULID(),
    Fecha_UltimoCambio: new Date(),
  }

  mockProductos.push(nuevoProducto)
  return nuevoProducto
}

export async function updateProducto(id: string, data: Partial<Producto>): Promise<Producto | null> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const index = mockProductos.findIndex((producto) => producto.ProductoULID === id)
  if (index === -1) return null

  mockProductos[index] = {
    ...mockProductos[index],
    ...data,
    Fecha_UltimoCambio: new Date(),
  }

  return mockProductos[index]
}

export async function deleteProducto(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const index = mockProductos.findIndex((producto) => producto.ProductoULID === id)
  if (index === -1) return false

  mockProductos.splice(index, 1)
  return true
}

export async function toggleProductoFavorito(id: string): Promise<Producto | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const index = mockProductos.findIndex((producto) => producto.ProductoULID === id)
  if (index === -1) return null

  mockProductos[index].Favorito = !mockProductos[index].Favorito
  mockProductos[index].Fecha_UltimoCambio = new Date()

  return mockProductos[index]
}
