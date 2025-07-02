"use server"

import { revalidatePath } from "next/cache"
import { generateULID } from "@/utils/ulid"
import {
  createProductoSchema,
  updateProductoSchema,
  deleteProductoSchema,
  searchProductosSchema,
  type CreateProductoInput,
  type UpdateProductoInput,
  type SearchProductosInput,
} from "@/schemas/productos.schemas"
import type { Producto } from "@/interfaces/database"

// Mock data - En producción esto vendría de la base de datos
const mockProductos: Producto[] = [
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8Q",
    GrupoProductoULID: 1,
    SubgrupoProductoULID: 1,
    ClaveProducto: "HAM001",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Hamburguesa Clásica",
    Favorito: true,
    Descripcion: "Hamburguesa de carne con lechuga, tomate y cebolla",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    AlmacenULID: 1,
    ControlStock: true,
    PrecioxUtilidad: false,
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
    GrupoProductoULID: 2,
    SubgrupoProductoULID: 2,
    ClaveProducto: "PIZ001",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Pizza Margherita",
    Favorito: false,
    Descripcion: "Pizza con salsa de tomate, mozzarella y albahaca",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 2,
    AlmacenULID: 1,
    ControlStock: true,
    PrecioxUtilidad: false,
    Facturable: true,
    ClaveTributaria: "50211503",
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnAPP: true,
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
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8S",
    GrupoProductoULID: 3,
    SubgrupoProductoULID: 3,
    ClaveProducto: "BEB001",
    TipoProducto: "Producto" as const,
    Nombredelproducto: "Coca Cola",
    Favorito: false,
    Descripcion: "Refresco de cola 355ml",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 2,
    AreaProduccionULID: 3,
    AlmacenULID: 2,
    ControlStock: true,
    PrecioxUtilidad: true,
    Facturable: true,
    ClaveTributaria: "50202306",
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnAPP: true,
    CanalesVenta: true,
    EnMenuQR: true,
    ClasificacionQRULID: 2,
    DatosDinamicos: null,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
]

export async function getProductos(params?: SearchProductosInput): Promise<{
  productos: Producto[]
  total: number
  page: number
  totalPages: number
}> {
  try {
    const validatedParams = searchProductosSchema.parse(params || {})

    let filteredProductos = [...mockProductos]

    // Aplicar filtros
    if (validatedParams.search) {
      const searchTerm = validatedParams.search.toLowerCase()
      filteredProductos = filteredProductos.filter(
        (producto) =>
          producto.Nombredelproducto.toLowerCase().includes(searchTerm) ||
          producto.Descripcion?.toLowerCase().includes(searchTerm) ||
          producto.ClaveProducto.toLowerCase().includes(searchTerm),
      )
    }

    if (validatedParams.tipo) {
      filteredProductos = filteredProductos.filter((producto) => producto.TipoProducto === validatedParams.tipo)
    }

    if (validatedParams.activo !== undefined) {
      filteredProductos = filteredProductos.filter((producto) => !producto.Suspendido === validatedParams.activo)
    }

    if (validatedParams.favorito !== undefined) {
      filteredProductos = filteredProductos.filter((producto) => producto.Favorito === validatedParams.favorito)
    }

    // Paginación
    const total = filteredProductos.length
    const totalPages = Math.ceil(total / validatedParams.limit)
    const startIndex = (validatedParams.page - 1) * validatedParams.limit
    const endIndex = startIndex + validatedParams.limit

    const productos = filteredProductos.slice(startIndex, endIndex)

    return {
      productos,
      total,
      page: validatedParams.page,
      totalPages,
    }
  } catch (error) {
    console.error("Error al obtener productos:", error)
    throw new Error("Error al obtener productos")
  }
}

export async function getProductoById(id: string): Promise<Producto | null> {
  try {
    const producto = mockProductos.find((p) => p.ProductoULID === id)
    return producto || null
  } catch (error) {
    console.error("Error al obtener producto:", error)
    throw new Error("Error al obtener producto")
  }
}

export async function createProducto(data: CreateProductoInput): Promise<{
  success: boolean
  message: string
  producto?: Producto
}> {
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

    // En producción: guardar en base de datos
    mockProductos.push(newProducto)

    revalidatePath("/productos")

    return {
      success: true,
      message: "Producto creado exitosamente",
      producto: newProducto,
    }
  } catch (error) {
    console.error("Error al crear producto:", error)
    return {
      success: false,
      message: "Error al crear producto",
    }
  }
}

export async function updateProducto(data: UpdateProductoInput): Promise<{
  success: boolean
  message: string
  producto?: Producto
}> {
  try {
    const validatedData = updateProductoSchema.parse(data)

    const index = mockProductos.findIndex((p) => p.ProductoULID === validatedData.ProductoULID)
    if (index === -1) {
      return {
        success: false,
        message: "Producto no encontrado",
      }
    }

    const updatedProducto = {
      ...mockProductos[index],
      ...validatedData,
      Fecha_UltimoCambio: new Date(),
    }

    // En producción: actualizar en base de datos
    mockProductos[index] = updatedProducto

    revalidatePath("/productos")

    return {
      success: true,
      message: "Producto actualizado exitosamente",
      producto: updatedProducto,
    }
  } catch (error) {
    console.error("Error al actualizar producto:", error)
    return {
      success: false,
      message: "Error al actualizar producto",
    }
  }
}

export async function deleteProducto(id: string): Promise<{
  success: boolean
  message: string
}> {
  try {
    const validatedData = deleteProductoSchema.parse({ ProductoULID: id })

    const index = mockProductos.findIndex((p) => p.ProductoULID === validatedData.ProductoULID)
    if (index === -1) {
      return {
        success: false,
        message: "Producto no encontrado",
      }
    }

    // En producción: eliminar de base de datos (soft delete)
    mockProductos[index].Suspendido = true
    mockProductos[index].Fecha_UltimoCambio = new Date()

    revalidatePath("/productos")

    return {
      success: true,
      message: "Producto eliminado exitosamente",
    }
  } catch (error) {
    console.error("Error al eliminar producto:", error)
    return {
      success: false,
      message: "Error al eliminar producto",
    }
  }
}

export async function toggleFavoriteProducto(id: string): Promise<{
  success: boolean
  message: string
}> {
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
      message: `Producto ${mockProductos[index].Favorito ? "agregado a" : "removido de"} favoritos`,
    }
  } catch (error) {
    console.error("Error al actualizar favorito:", error)
    return {
      success: false,
      message: "Error al actualizar favorito",
    }
  }
}

// Datos auxiliares para formularios
export async function getGruposProductos() {
  return [
    { id: 1, nombre: "Hamburguesas" },
    { id: 2, nombre: "Pizzas" },
    { id: 3, nombre: "Bebidas" },
    { id: 4, nombre: "Postres" },
    { id: 5, nombre: "Ensaladas" },
  ]
}

export async function getSubgruposProductos(grupoId: number) {
  const subgrupos = {
    1: [
      { id: 1, nombre: "Hamburguesas Clásicas" },
      { id: 2, nombre: "Hamburguesas Gourmet" },
    ],
    2: [
      { id: 3, nombre: "Pizzas Tradicionales" },
      { id: 4, nombre: "Pizzas Especiales" },
    ],
    3: [
      { id: 5, nombre: "Refrescos" },
      { id: 6, nombre: "Jugos" },
      { id: 7, nombre: "Cervezas" },
    ],
    4: [
      { id: 8, nombre: "Helados" },
      { id: 9, nombre: "Pasteles" },
    ],
    5: [
      { id: 10, nombre: "Ensaladas Verdes" },
      { id: 11, nombre: "Ensaladas de Frutas" },
    ],
  }

  return subgrupos[grupoId as keyof typeof subgrupos] || []
}

export async function getUnidades() {
  return [
    { id: 1, nombre: "Pieza", abreviacion: "pza" },
    { id: 2, nombre: "Litro", abreviacion: "lt" },
    { id: 3, nombre: "Kilogramo", abreviacion: "kg" },
    { id: 4, nombre: "Gramo", abreviacion: "gr" },
    { id: 5, nombre: "Porción", abreviacion: "porción" },
  ]
}

export async function getAreasProduccion() {
  return [
    { id: 1, nombre: "Cocina Principal" },
    { id: 2, nombre: "Horno de Pizza" },
    { id: 3, nombre: "Barra de Bebidas" },
    { id: 4, nombre: "Repostería" },
    { id: 5, nombre: "Parrilla" },
  ]
}

export async function getAlmacenes() {
  return [
    { id: 1, nombre: "Almacén Principal" },
    { id: 2, nombre: "Refrigerador" },
    { id: 3, nombre: "Congelador" },
    { id: 4, nombre: "Bodega Seca" },
  ]
}
