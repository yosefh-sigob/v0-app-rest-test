"use server"

import { revalidatePath } from "next/cache"
import { generateULID } from "@/utils/ulid"
import { createProductoSchema, updateProductoSchema, searchProductosSchema } from "@/schemas/productos.schemas"
import type { CreateProductoInput, UpdateProductoInput, SearchProductosInput } from "@/schemas/productos.schemas"
import type { Producto } from "@/interfaces/database"

// Mock data - En producción esto vendría de la base de datos
const mockProductos: Producto[] = [
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8Q",
    GrupoProductoULID: 1,
    SubgrupoProductoULID: 1,
    ClaveProducto: "TACO001",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Tacos al Pastor",
    Favorito: true,
    Descripcion: "Deliciosos tacos al pastor con piña y cebolla",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    AlmacenULID: 1,
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    ClaveTributaria: "50211503",
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: true,
    EnMenuQR: true,
    ClasificacionQRULID: 1,
    DatosDinamicos: null,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8R",
    GrupoProductoULID: 1,
    ClaveProducto: "BURG001",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Hamburguesa Clásica",
    Favorito: false,
    Descripcion: "Hamburguesa con carne, lechuga, tomate y queso",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    ControlStock: false,
    PrecioxUtilidadad: true,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8S",
    GrupoProductoULID: 2,
    ClaveProducto: "COCA001",
    TipoProducto: "Producto" as const,
    Nombredelproducto: "Coca Cola",
    Favorito: true,
    Descripcion: "Refresco de cola 355ml",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
]

export async function getProductos(params: SearchProductosInput) {
  try {
    const validatedParams = searchProductosSchema.parse(params)

    // Simular filtrado
    let filteredProductos = [...mockProductos]

    if (validatedParams.search) {
      const searchTerm = validatedParams.search.toLowerCase()
      filteredProductos = filteredProductos.filter(
        (p) =>
          p.Nombredelproducto.toLowerCase().includes(searchTerm) ||
          p.Descripcion?.toLowerCase().includes(searchTerm) ||
          p.ClaveProducto.toLowerCase().includes(searchTerm),
      )
    }

    if (validatedParams.tipo) {
      filteredProductos = filteredProductos.filter((p) => p.TipoProducto === validatedParams.tipo)
    }

    if (validatedParams.favorito !== undefined) {
      filteredProductos = filteredProductos.filter((p) => p.Favorito === validatedParams.favorito)
    }

    if (validatedParams.suspendido !== undefined) {
      filteredProductos = filteredProductos.filter((p) => p.Suspendido === validatedParams.suspendido)
    }

    // Simular paginación
    const total = filteredProductos.length
    const totalPages = Math.ceil(total / validatedParams.limit)
    const startIndex = (validatedParams.page - 1) * validatedParams.limit
    const endIndex = startIndex + validatedParams.limit
    const productos = filteredProductos.slice(startIndex, endIndex)

    return {
      success: true,
      data: {
        productos,
        total,
        page: validatedParams.page,
        totalPages,
        limit: validatedParams.limit,
      },
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
    mockProductos.push(newProducto)

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
  try {
    const validatedData = updateProductoSchema.parse(data)

    const index = mockProductos.findIndex((p) => p.ProductoULID === id)
    if (index === -1) {
      return {
        success: false,
        message: "Producto no encontrado",
      }
    }

    mockProductos[index] = {
      ...mockProductos[index],
      ...validatedData,
      Fecha_UltimoCambio: new Date(),
    }

    revalidatePath("/productos")

    return {
      success: true,
      message: "Producto actualizado exitosamente",
      data: mockProductos[index],
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
  try {
    const index = mockProductos.findIndex((p) => p.ProductoULID === id)
    if (index === -1) {
      return {
        success: false,
        message: "Producto no encontrado",
      }
    }

    // Eliminación suave - marcar como suspendido
    mockProductos[index].Suspendido = true
    mockProductos[index].Fecha_UltimoCambio = new Date()

    revalidatePath("/productos")

    return {
      success: true,
      message: "Producto eliminado exitosamente",
    }
  } catch (error) {
    console.error("Error deleting producto:", error)
    return {
      success: false,
      message: "Error al eliminar producto",
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

    mockProductos[index].Favorito = !mockProductos[index].Favorito
    mockProductos[index].Fecha_UltimoCambio = new Date()

    revalidatePath("/productos")

    return {
      success: true,
      message: mockProductos[index].Favorito ? "Agregado a favoritos" : "Removido de favoritos",
    }
  } catch (error) {
    console.error("Error toggling favorite:", error)
    return {
      success: false,
      message: "Error al actualizar favorito",
    }
  }
}

export async function getGruposProductos() {
  // Mock data - En producción vendría de la base de datos
  return [
    { id: 1, nombre: "Platillos Principales" },
    { id: 2, nombre: "Bebidas" },
    { id: 3, nombre: "Postres" },
    { id: 4, nombre: "Entradas" },
  ]
}

export async function getUnidades() {
  // Mock data - En producción vendría de la base de datos
  return [
    { id: 1, nombre: "Pieza", abreviacion: "pza" },
    { id: 2, nombre: "Kilogramo", abreviacion: "kg" },
    { id: 3, nombre: "Litro", abreviacion: "lt" },
    { id: 4, nombre: "Gramo", abreviacion: "gr" },
  ]
}

export async function getAreasProduccion() {
  // Mock data - En producción vendría de la base de datos
  return [
    { id: 1, nombre: "Cocina Principal" },
    { id: 2, nombre: "Parrilla" },
    { id: 3, nombre: "Barra de Bebidas" },
    { id: 4, nombre: "Repostería" },
  ]
}

export async function getAlmacenes() {
  // Mock data - En producción vendría de la base de datos
  return [
    { id: 1, nombre: "Almacén General" },
    { id: 2, nombre: "Refrigerador" },
    { id: 3, nombre: "Congelador" },
    { id: 4, nombre: "Bodega Seca" },
  ]
}
