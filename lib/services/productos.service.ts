import type { Producto } from "@/interfaces/database"
import type { SearchProductosInput } from "@/schemas/productos.schemas"

export class ProductosService {
  static async getById(id: string): Promise<Producto | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Mock data
    return {
      ProductoULID: id,
      Nombredelproducto: "Hamburguesa Clásica",
      ClaveProducto: "HAM001",
      TipoProducto: "Platillo",
      Descripcion: "Hamburguesa de carne de res con lechuga, tomate, cebolla y papas fritas",
      GrupoProductoID: 2,
      UnidadID: 1,
      AreaProduccionID: 1,
      AlmacenID: 1,
      PermiteDescuento: true,
      ControlaStock: false,
      AceptaPropina: false,
      PreguntaCoccion: true,
      Comedor: true,
      ADomicilio: true,
      Mostrador: false,
      Enlinea: true,
      EnMenuQR: true,
      Favorito: true,
      Suspendido: false,
      FechaCreacion: new Date("2024-01-01"),
      FechaActualizacion: new Date("2024-01-15"),
    }
  }

  static async search(filters: SearchProductosInput) {
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock search results
    const mockResults = [
      {
        ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U9V",
        Nombredelproducto: "Hamburguesa Clásica",
        ClaveProducto: "HAM001",
        TipoProducto: "Platillo" as const,
        Descripcion: "Hamburguesa de carne de res con lechuga, tomate, cebolla y papas fritas",
        GrupoProductoID: 2,
        UnidadID: 1,
        AreaProduccionID: 1,
        AlmacenID: 1,
        PermiteDescuento: true,
        ControlaStock: false,
        AceptaPropina: false,
        PreguntaCoccion: true,
        Comedor: true,
        ADomicilio: true,
        Mostrador: false,
        Enlinea: true,
        EnMenuQR: true,
        Favorito: true,
        Suspendido: false,
        FechaCreacion: new Date("2024-01-01"),
        FechaActualizacion: new Date("2024-01-15"),
      },
    ]

    return {
      productos: mockResults,
      total: mockResults.length,
      page: filters.page,
      totalPages: Math.ceil(mockResults.length / filters.limit),
      limit: filters.limit,
    }
  }

  static async create(data: Partial<Producto>): Promise<Producto> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    return {
      ProductoULID: `01HKQR8X9M2N3P4Q5R6S7T8U9${Date.now()}`,
      Nombredelproducto: data.Nombredelproducto || "",
      ClaveProducto: data.ClaveProducto || "",
      TipoProducto: data.TipoProducto || "Producto",
      Descripcion: data.Descripcion || "",
      GrupoProductoID: data.GrupoProductoID,
      UnidadID: data.UnidadID,
      AreaProduccionID: data.AreaProduccionID,
      AlmacenID: data.AlmacenID,
      PermiteDescuento: data.PermiteDescuento ?? true,
      ControlaStock: data.ControlaStock ?? false,
      AceptaPropina: data.AceptaPropina ?? false,
      PreguntaCoccion: data.PreguntaCoccion ?? false,
      Comedor: data.Comedor ?? true,
      ADomicilio: data.ADomicilio ?? false,
      Mostrador: data.Mostrador ?? false,
      Enlinea: data.Enlinea ?? false,
      EnMenuQR: data.EnMenuQR ?? false,
      Favorito: data.Favorito ?? false,
      Suspendido: data.Suspendido ?? false,
      FechaCreacion: new Date(),
      FechaActualizacion: new Date(),
    }
  }

  static async update(id: string, data: Partial<Producto>): Promise<Producto> {
    await new Promise((resolve) => setTimeout(resolve, 600))

    const existing = await this.getById(id)
    if (!existing) {
      throw new Error("Producto no encontrado")
    }

    return {
      ...existing,
      ...data,
      FechaActualizacion: new Date(),
    }
  }

  static async delete(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return true
  }

  static async toggleFavorite(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return true
  }
}
