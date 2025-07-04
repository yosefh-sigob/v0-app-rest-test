import type { Producto } from "@/schemas/productos.schemas"
import type { SearchProductosInput } from "@/schemas/productos.schemas"
import {
  getAllProductos,
  getProductoById,
  addProducto,
  updateProducto,
  deleteProducto,
  toggleFavoriteProducto,
  toggleSuspendProducto,
  filterProductos,
  existsClaveProducto,
  getProductosStats,
} from "@/lib/mock/productos.mock"

export class ProductosService {
  static async getById(id: string): Promise<Producto | null> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 300))
    return getProductoById(id)
  }

  static async search(filters: SearchProductosInput) {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Aplicar filtros
    const filteredProducts = filterProductos({
      search: filters.search,
      tipo: filters.tipo,
      favorito: filters.favorito,
      suspendido: filters.suspendido,
      grupoId: filters.grupoId,
    })

    // Calcular paginación
    const total = filteredProducts.length
    const totalPages = Math.ceil(total / filters.limit)
    const startIndex = (filters.page - 1) * filters.limit
    const endIndex = startIndex + filters.limit
    const productos = filteredProducts.slice(startIndex, endIndex)

    return {
      productos,
      total,
      page: filters.page,
      totalPages,
      limit: filters.limit,
    }
  }

  static async getAll(): Promise<Producto[]> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 200))
    return getAllProductos()
  }

  static async create(data: Partial<Producto>): Promise<Producto> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Validar que la clave no exista
    if (data.ClaveProducto && existsClaveProducto(data.ClaveProducto)) {
      throw new Error("Ya existe un producto con esta clave")
    }

    // Crear el producto
    const newProducto = addProducto(data as Omit<Producto, "ProductoULID" | "Fecha_UltimoCambio">)
    return newProducto
  }

  static async update(id: string, data: Partial<Producto>): Promise<Producto> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Validar que el producto existe
    const existingProducto = getProductoById(id)
    if (!existingProducto) {
      throw new Error("Producto no encontrado")
    }

    // Validar que la clave no exista en otro producto
    if (data.ClaveProducto && existsClaveProducto(data.ClaveProducto, id)) {
      throw new Error("Ya existe un producto con esta clave")
    }

    // Actualizar el producto
    const updatedProducto = updateProducto(id, data)
    if (!updatedProducto) {
      throw new Error("Error al actualizar el producto")
    }

    return updatedProducto
  }

  static async delete(id: string): Promise<boolean> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Verificar que el producto existe
    const existingProducto = getProductoById(id)
    if (!existingProducto) {
      throw new Error("Producto no encontrado")
    }

    // Eliminar el producto
    return deleteProducto(id)
  }

  static async toggleFavorite(id: string): Promise<Producto | null> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Verificar que el producto existe
    const existingProducto = getProductoById(id)
    if (!existingProducto) {
      throw new Error("Producto no encontrado")
    }

    // Alternar favorito
    return toggleFavoriteProducto(id)
  }

  static async toggleSuspend(id: string): Promise<Producto | null> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Verificar que el producto existe
    const existingProducto = getProductoById(id)
    if (!existingProducto) {
      throw new Error("Producto no encontrado")
    }

    // Alternar suspendido
    return toggleSuspendProducto(id)
  }

  static async getStats() {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 200))
    return getProductosStats()
  }

  static async validateClaveProducto(clave: string, excludeId?: string): Promise<boolean> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 100))
    return !existsClaveProducto(clave, excludeId)
  }
}
