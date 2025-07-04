"use server"

import { ProductosService } from "@/lib/services/productos.service"
import { searchProductosInputSchema, type SearchProductosInput, type Producto } from "@/schemas/productos.schemas"

export async function getProductos(filters: SearchProductosInput = { page: 1, limit: 10 }) {
  try {
    const validatedFilters = searchProductosInputSchema.parse(filters)
    const result = await ProductosService.search(validatedFilters)

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return {
      success: false,
      message: "Error al obtener productos",
      data: null,
    }
  }
}

export async function getProductoById(id: string) {
  try {
    const producto = await ProductosService.getById(id)

    if (!producto) {
      return {
        success: false,
        message: "Producto no encontrado",
        data: null,
      }
    }

    return {
      success: true,
      data: producto,
    }
  } catch (error) {
    console.error("Error al obtener producto:", error)
    return {
      success: false,
      message: "Error al obtener producto",
      data: null,
    }
  }
}

export async function createProducto(data: Partial<Producto>) {
  try {
    const producto = await ProductosService.create(data)

    return {
      success: true,
      data: producto,
    }
  } catch (error) {
    console.error("Error al crear producto:", error)
    return {
      success: false,
      message: "Error al crear producto",
      data: null,
    }
  }
}

export async function updateProducto(id: string, data: Partial<Producto>) {
  try {
    const producto = await ProductosService.update(id, data)

    return {
      success: true,
      data: producto,
    }
  } catch (error) {
    console.error("Error al actualizar producto:", error)
    return {
      success: false,
      message: "Error al actualizar producto",
      data: null,
    }
  }
}

export async function deleteProducto(id: string) {
  try {
    const success = await ProductosService.delete(id)

    return {
      success,
      message: success ? "Producto eliminado correctamente" : "Error al eliminar producto",
    }
  } catch (error) {
    console.error("Error al eliminar producto:", error)
    return {
      success: false,
      message: "Error al eliminar producto",
    }
  }
}

export async function toggleFavoriteProducto(id: string) {
  try {
    const producto = await ProductosService.toggleFavorite(id)

    if (!producto) {
      return {
        success: false,
        message: "Producto no encontrado",
        data: null,
      }
    }

    return {
      success: true,
      data: producto,
    }
  } catch (error) {
    console.error("Error al actualizar favorito:", error)
    return {
      success: false,
      message: "Error al actualizar favorito",
      data: null,
    }
  }
}
