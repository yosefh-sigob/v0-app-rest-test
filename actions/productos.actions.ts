"use server"

import { revalidatePath } from "next/cache"
import {
  createProductoSchema,
  updateProductoSchema,
  type CreateProductoInput,
  type UpdateProductoInput,
  type Producto,
} from "@/schemas/produtos.schemas"
import { generateULID } from "@/utils/ulid"

// Mock data para simular base de datos
const mockProductos: Producto[] = [
  {
    ProductoULID: generateULID(),
    ClaveProducto: "HAM001",
    TipoProducto: "Platillo",
    Nombredelproducto: "Hamburguesa Clásica",
    Descripcion: "Hamburguesa con carne, lechuga, tomate y queso",
    Favorito: true,
    ExentoImpuesto: false,
    PrecioAbierto: false,
    ControlStock: true,
    PrecioxUtilidad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnAPP: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "REF001",
    TipoProducto: "Botella",
    Nombredelproducto: "Coca Cola 600ml",
    Descripcion: "Refresco de cola en botella de vidrio",
    Favorito: false,
    ExentoImpuesto: false,
    PrecioAbierto: false,
    ControlStock: true,
    PrecioxUtilidad: true,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
]

export async function getProductos(params: { page?: number; limit?: number } = {}) {
  try {
    const { page = 1, limit = 10 } = params

    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 100))

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const productos = mockProductos.slice(startIndex, endIndex)

    return {
      success: true,
      data: {
        productos,
        total: mockProductos.length,
        page,
        limit,
      },
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al obtener productos",
    }
  }
}

export async function createProducto(data: CreateProductoInput) {
  try {
    // Validar datos
    const validatedData = createProductoSchema.parse(data)

    // Verificar que no exista la clave
    const existingProducto = mockProductos.find((p) => p.ClaveProducto === validatedData.ClaveProducto)
    if (existingProducto) {
      return {
        success: false,
        message: "Ya existe un producto con esta clave",
      }
    }

    // Crear nuevo producto
    const newProducto: Producto = {
      ...validatedData,
      ProductoULID: generateULID(),
      Fecha_UltimoCambio: new Date().toISOString(),
      Fecha_Sync: new Date().toISOString(),
    }

    mockProductos.unshift(newProducto)

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
    }
  }
}

export async function updateProducto(id: string, data: UpdateProductoInput) {
  try {
    // Validar datos
    const validatedData = updateProductoSchema.parse(data)

    // Buscar producto
    const index = mockProductos.findIndex((p) => p.ProductoULID === id)
    if (index === -1) {
      return {
        success: false,
        message: "Producto no encontrado",
      }
    }

    // Verificar clave única si se está actualizando
    if (validatedData.ClaveProducto) {
      const existingProducto = mockProductos.find(
        (p) => p.ClaveProducto === validatedData.ClaveProducto && p.ProductoULID !== id,
      )
      if (existingProducto) {
        return {
          success: false,
          message: "Ya existe un producto con esta clave",
        }
      }
    }

    // Actualizar producto
    const updatedProducto: Producto = {
      ...mockProductos[index],
      ...validatedData,
      Fecha_UltimoCambio: new Date().toISOString(),
    }

    mockProductos[index] = updatedProducto

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
    }
  }
}

export async function deleteProducto(id: string) {
  try {
    const index = mockProductos.findIndex((p) => p.ProductoULID === id)
    if (index === -1) {
      return {
        success: false,
        message: "Producto no encontrado",
      }
    }

    mockProductos.splice(index, 1)

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
  try {
    const index = mockProductos.findIndex((p) => p.ProductoULID === id)
    if (index === -1) {
      return {
        success: false,
        message: "Producto no encontrado",
      }
    }

    mockProductos[index] = {
      ...mockProductos[index],
      Favorito: !mockProductos[index].Favorito,
      Fecha_UltimoCambio: new Date().toISOString(),
    }

    revalidatePath("/productos")

    return {
      success: true,
      message: "Estado de favorito actualizado",
      data: mockProductos[index],
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar favorito",
    }
  }
}
