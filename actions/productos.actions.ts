"use server"

import { createProductoSchema, updateProductoSchema, type SearchProductosInput } from "@/schemas/productos.schemas"
import { searchProductos } from "@/lib/data/mock-data"

// Simular delay de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function createProducto(data: unknown) {
  await delay(1000) // Simular latencia de red

  try {
    const validatedData = createProductoSchema.parse(data)

    // Simular creación exitosa
    return {
      success: true,
      message: "Producto creado exitosamente",
      data: {
        ProductoULID: `01HKQR8X9M2N3P4Q5R6S7T8U9${Date.now()}`,
        ...validatedData,
        FechaCreacion: new Date(),
        FechaActualizacion: new Date(),
      },
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

    return {
      success: true,
      message: "Producto actualizado exitosamente",
      data: {
        ProductoULID: id,
        ...validatedData,
        FechaActualizacion: new Date(),
      },
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
    // Simular eliminación (soft delete)
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
    return {
      success: true,
      message: "Estado de favorito actualizado",
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar favorito",
    }
  }
}
