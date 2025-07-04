import type { Producto, SearchProductosInput } from "@/schemas/productos.schemas"
import {
  MOCK_PRODUCTOS,
  getProductoById,
  addProducto,
  updateProducto,
  deleteProducto,
  toggleFavoriteProducto,
} from "@/lib/mock/productos.mock"

export class ProductosService {
  static async getById(id: string): Promise<Producto | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return getProductoById(id)
  }

  static async search(filters: SearchProductosInput) {
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filteredProducts = [...MOCK_PRODUCTOS]

    // Filtro por búsqueda de texto
    if (filters.search && filters.search.trim() !== "") {
      const searchTerm = filters.search.toLowerCase().trim()
      filteredProducts = filteredProducts.filter(
        (producto) =>
          producto.Nombredelproducto.toLowerCase().includes(searchTerm) ||
          producto.ClaveProducto.toLowerCase().includes(searchTerm) ||
          (producto.Descripcion && producto.Descripcion.toLowerCase().includes(searchTerm)),
      )
    }

    // Filtro por tipo de producto
    if (filters.tipo) {
      filteredProducts = filteredProducts.filter((producto) => producto.TipoProducto === filters.tipo)
    }

    // Filtro por favorito
    if (filters.favorito !== undefined) {
      filteredProducts = filteredProducts.filter((producto) => producto.Favorito === filters.favorito)
    }

    // Filtro por suspendido
    if (filters.suspendido !== undefined) {
      filteredProducts = filteredProducts.filter((producto) => producto.Suspendido === filters.suspendido)
    }

    // Filtro por grupo
    if (filters.grupoId) {
      filteredProducts = filteredProducts.filter((producto) => producto.GrupoProductoID === filters.grupoId)
    }

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

  static async create(data: Partial<Producto>): Promise<Producto> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return addProducto(data as Omit<Producto, "ProductoULID" | "Fecha_UltimoCambio">)
  }

  static async update(id: string, data: Partial<Producto>): Promise<Producto> {
    await new Promise((resolve) => setTimeout(resolve, 600))

    const updated = updateProducto(id, data)
    if (!updated) {
      throw new Error("Producto no encontrado")
    }

    return updated
  }

  static async delete(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return deleteProducto(id)
  }

  static async toggleFavorite(id: string): Promise<Producto | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return toggleFavoriteProducto(id)
  }
}
