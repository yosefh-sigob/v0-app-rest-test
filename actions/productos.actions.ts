"use server"

import { revalidatePath } from "next/cache"
import { createProductoSchema, updateProductoSchema, type SearchProductosInput } from "@/schemas/productos.schemas"
import {
  searchProductos,
  addProducto,
  updateProducto as updateProductoMock,
  deleteProducto as deleteProductoMock,
  toggleFavoriteProducto as toggleFavoriteMock,
} from "@/lib/data/mock-data"

// Simular delay de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function createProducto(data: unknown) {
  await delay(1000) // Simular latencia de red

  try {
    const validatedData = createProductoSchema.parse(data)

    // Usar la función mock para agregar el producto
    const newProducto = addProducto(validatedData)

    revalidatePath("/productos")

    return {
      success: true,
      message: "Producto creado exitosamente",
      data: newProducto,
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al crear el producto",
      error: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

export async function updateProducto(id: string, data: unknown) {
  await delay(800)

  try {
    const validatedData = updateProductoSchema.parse(data)

    // Usar la función mock para actualizar el producto
    const updatedProducto = updateProductoMock(id, validatedData)

    if (!updatedProducto) {
      return {
        success: false,
        message: "Producto no encontrado",
      }
    }

    revalidatePath("/productos")

    return {
      success: true,
      message: "Producto actualizado exitosamente",
      data: updatedProducto,
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar el producto",
      error: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

export async function getProductos(filters: SearchProductosInput) {
  await delay(500)

  try {
    const data = searchProductos(filters)

    return {
      success: true,
      data,
    }
  } catch (error) {
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

export async function deleteProducto(id: string) {
  await delay(600)

  try {
    // Usar la función mock para eliminar (suspender) el producto
    const success = deleteProductoMock(id)

    if (!success) {
      return {
        success: false,
        message: "Producto no encontrado",
      }
    }

    revalidatePath("/productos")

    return {
      success: true,
      message: "Producto eliminado exitosamente",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al eliminar el producto",
    }
  }
}

export async function toggleFavoriteProducto(id: string) {
  await delay(400)

  try {
    // Usar la función mock para alternar favorito
    const updatedProducto = toggleFavoriteMock(id)

    if (!updatedProducto) {
      return {
        success: false,
        message: "Producto no encontrado",
      }
    }

    revalidatePath("/productos")

    return {
      success: true,
      message: `Producto ${updatedProducto.Favorito ? "agregado a" : "removido de"} favoritos`,
      data: updatedProducto,
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar favorito",
    }
  }
}
