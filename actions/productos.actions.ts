"use server"

import { revalidatePath } from "next/cache"
import { generateULID } from "@/utils/ulid"
import { createProductoSchema, updateProductoSchema, searchProductosSchema } from "@/schemas/productos.schemas"
import type { CreateProductoInput, UpdateProductoInput, SearchProductosInput } from "@/schemas/productos.schemas"
import type { Producto } from "@/interfaces/database"
import { MOCK_PRODUCTOS, searchProductos } from "@/lib/data/mock-data"

// Simular delay de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getProductos(params: SearchProductosInput) {
  await delay(500) // Simular latencia de red

  try {
    const validatedParams = searchProductosSchema.parse(params)
    const data = searchProductos(validatedParams)

    return {
      success: true,
      data,
      message: "Productos cargados exitosamente",
    }
  } catch (error) {
    console.error("Error getting productos:", error)
    return {
      success: false,
      message: "Error al obtener productos",
      data: {
        productos: [],
        total: 0,
        page: 1,
        totalPages: 0,
        limit: 20,
      },
    }
  }
}

export async function createProducto(data: CreateProductoInput) {
  await delay(800)

  try {
    const validatedData = createProductoSchema.parse(data)

    const newProducto: Producto = {
      ProductoULID: generateULID(),
      ...validatedData,
      Fecha_UltimoCambio: new Date(),
      Fecha_Sync: new Date(),
      UsuarioULID: 1, // En producción vendría de la sesión
      EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P", // En producción vendría de la sesión
    }

    // Simular guardado en base de datos
    MOCK_PRODUCTOS.push(newProducto)

    revalidatePath("/productos")

    return {
      success: true,
      message: "Producto creado exitosamente",
      data: newProducto,
    }
  } catch (error) {
    console.error("Error creating producto:", error)
    return {
      success: false,
      message: "Error al crear producto",
    }
  }
}

export async function updateProducto(id: string, data: UpdateProductoInput) {
  await delay(600)

  try {
    const validatedData = updateProductoSchema.parse(data)

    const index = MOCK_PRODUCTOS.findIndex((p) => p.ProductoULID === id)
    if (index === -1) {
      return {
        success: false,
        message: "Producto no encontrado",
      }
    }

    MOCK_PRODUCTOS[index] = {
      ...MOCK_PRODUCTOS[index],
      ...validatedData,
      Fecha_UltimoCambio: new Date(),
    }

    revalidatePath("/productos")

    return {
      success: true,
      message: "Producto actualizado exitosamente",
      data: MOCK_PRODUCTOS[index],
    }
  } catch (error) {
    console.error("Error updating producto:", error)
    return {
      success: false,
      message: "Error al actualizar producto",
    }
  }
}

export async function deleteProducto(id: string) {
  await delay(300)

  try {
    const index = MOCK_PRODUCTOS.findIndex((p) => p.ProductoULID === id)
    if (index === -1) {
      return {
