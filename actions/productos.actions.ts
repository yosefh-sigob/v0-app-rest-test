"use server"

import { revalidatePath } from "next/cache"
import { ProductosService } from "@/lib/services/productos.service"
import {
  createProductoSchema,
  updateProductoSchema,
  searchProductosInputSchema,
  type CreateProductoInput,
  type UpdateProductoInput,
  type SearchProductosInput,
} from "@/schemas/productos.schemas"

export async function getProductos(filters: SearchProductosInput = { page: 1, limit: 10 }) {
  try {
    const validatedFilters = searchProductosInputSchema.parse(filters)
    const result = await ProductosService.search(validatedFilters)

    return {
      success: true,
      data: result,
      message: "Productos obtenidos correctamente",
    }
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al obtener productos",
      data: null,
    }
  }
}

export async function getAllProductos() {
  try {
    const productos = await ProductosService.getAll()
    return {
      success: true,
      data: productos,
      message: "Productos obtenidos correctamente",
    }
  } catch (error) {
    console.error("Error al obtener todos los productos:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al obtener productos",
      data: [],
    }
  }
}

export async function getProductoById(id: string) {
  try {
    if (!id || id.trim() === "") {
      return {
        success: false,
        message: "ID de producto requerido",
        data: null,
      }
    }

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
      message: "Producto obtenido correctamente",
    }
  } catch (error) {
    console.error("Error al obtener producto:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al obtener producto",
      data: null,
    }
  }
}

export async function createProducto(data: CreateProductoInput) {
  try {
    // Validar datos de entrada
    const validatedData = createProductoSchema.parse(data)

    // Crear el producto
    const producto = await ProductosService.create(validatedData)

    // Revalidar la página de productos
    revalidatePath("/productos")

    return {
      success: true,
      data: producto,
      message: "Producto creado exitosamente",
    }
  } catch (error) {
    console.error("Error al crear producto:", error)

    let message = "Error al crear producto"
    if (error instanceof Error) {
      message = error.message
    }

    return {
      success: false,
      message,
      data: null,
    }
  }
}

export async function updateProducto(id: string, data: UpdateProductoInput) {
  try {
    if (!id || id.trim() === "") {
      return {
        success: false,
        message: "ID de producto requerido",
        data: null,
      }
    }

    // Validar datos de entrada
    const validatedData = updateProductoSchema.parse(data)

    // Actualizar el producto
    const producto = await ProductosService.update(id, validatedData)

    // Revalidar la página de productos
    revalidatePath("/productos")

    return {
      success: true,
      data: producto,
      message: "Producto actualizado exitosamente",
    }
  } catch (error) {
    console.error("Error al actualizar producto:", error)

    let message = "Error al actualizar producto"
    if (error instanceof Error) {
      message = error.message
    }

    return {
      success: false,
      message,
      data: null,
    }
  }
}

export async function deleteProducto(id: string) {
  try {
    if (!id || id.trim() === "") {
      return {
        success: false,
        message: "ID de producto requerido",
      }
    }

    // Eliminar el producto
    const success = await ProductosService.delete(id)

    if (!success) {
      return {
        success: false,
        message: "No se pudo eliminar el producto",
      }
    }

    // Revalidar la página de productos
    revalidatePath("/productos")

    return {
      success: true,
      message: "Producto eliminado exitosamente",
    }
  } catch (error) {
    console.error("Error al eliminar producto:", error)

    let message = "Error al eliminar producto"
    if (error instanceof Error) {
      message = error.message
    }

    return {
      success: false,
      message,
    }
  }
}

export async function toggleFavoriteProducto(id: string) {
  try {
    if (!id || id.trim() === "") {
      return {
        success: false,
        message: "ID de producto requerido",
        data: null,
      }
    }

    // Alternar favorito
    const producto = await ProductosService.toggleFavorite(id)

    if (!producto) {
      return {
        success: false,
        message: "No se pudo actualizar el producto",
        data: null,
      }
    }

    // Revalidar la página de productos
    revalidatePath("/productos")

    return {
      success: true,
      data: producto,
      message: `Producto ${producto.Favorito ? "agregado a" : "removido de"} favoritos`,
    }
  } catch (error) {
    console.error("Error al actualizar favorito:", error)

    let message = "Error al actualizar favorito"
    if (error instanceof Error) {
      message = error.message
    }

    return {
      success: false,
      message,
      data: null,
    }
  }
}

export async function toggleSuspendProducto(id: string) {
  try {
    if (!id || id.trim() === "") {
      return {
        success: false,
        message: "ID de producto requerido",
        data: null,
      }
    }

    // Alternar suspendido
    const producto = await ProductosService.toggleSuspend(id)

    if (!producto) {
      return {
        success: false,
        message: "No se pudo actualizar el producto",
        data: null,
      }
    }

    // Revalidar la página de productos
    revalidatePath("/productos")

    return {
      success: true,
      data: producto,
      message: `Producto ${producto.Suspendido ? "suspendido" : "reactivado"} exitosamente`,
    }
  } catch (error) {
    console.error("Error al cambiar estado del producto:", error)

    let message = "Error al cambiar estado del producto"
    if (error instanceof Error) {
      message = error.message
    }

    return {
      success: false,
      message,
      data: null,
    }
  }
}

export async function getProductosStats() {
  try {
    const stats = await ProductosService.getStats()
    return {
      success: true,
      data: stats,
      message: "Estadísticas obtenidas correctamente",
    }
  } catch (error) {
    console.error("Error al obtener estadísticas:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al obtener estadísticas",
      data: null,
    }
  }
}

export async function validateClaveProducto(clave: string, excludeId?: string) {
  try {
    if (!clave || clave.trim() === "") {
      return {
        success: false,
        message: "Clave de producto requerida",
        isValid: false,
      }
    }

    const isValid = await ProductosService.validateClaveProducto(clave.trim(), excludeId)

    return {
      success: true,
      isValid,
      message: isValid ? "Clave disponible" : "Clave ya existe",
    }
  } catch (error) {
    console.error("Error al validar clave:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al validar clave",
      isValid: false,
    }
  }
}
