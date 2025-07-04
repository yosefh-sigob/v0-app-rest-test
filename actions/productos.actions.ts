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
const mockProductos: Producto[] = const productos = [
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
  {
    ProductoULID: generateULID(),
    ClaveProducto: "HAM002",
    TipoProducto: "Platillo",
    Nombredelproducto: "Hamburguesa BBQ",
    Descripcion: "Con tocino, queso cheddar y salsa BBQ",
    Favorito: true,
    ExentoImpuesto: false,
    PrecioAbierto: false,
    ControlStock: true,
    PrecioxUtilidad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnAPP: true,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "PIZ001",
    TipoProducto: "Platillo",
    Nombredelproducto: "Pizza Margarita",
    Descripcion: "Con queso mozzarella, jitomate y albahaca fresca",
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
    ClaveProducto: "BEB002",
    TipoProducto: "Botella",
    Nombredelproducto: "Agua Mineral 500ml",
    Descripcion: "Agua con gas embotellada",
    Favorito: false,
    ExentoImpuesto: false,
    PrecioAbierto: false,
    ControlStock: false,
    PrecioxUtilidad: false,
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
  {
    ProductoULID: generateULID(),
    ClaveProducto: "TAC001",
    TipoProducto: "Platillo",
    Nombredelproducto: "Tacos al Pastor",
    Descripcion: "Con piña, cebolla y cilantro",
    Favorito: true,
    ExentoImpuesto: false,
    PrecioAbierto: true,
    ControlStock: false,
    PrecioxUtilidad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: true,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "PST001",
    TipoProducto: "Producto",
    Nombredelproducto: "Pasta Alfredo",
    Descripcion: "Con salsa cremosa y parmesano",
    Favorito: false,
    ExentoImpuesto: false,
    PrecioAbierto: false,
    ControlStock: true,
    PrecioxUtilidad: true,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: false,
    Enlinea: false,
    EnAPP: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "ENS001",
    TipoProducto: "Platillo",
    Nombredelproducto: "Ensalada César",
    Descripcion: "Con aderezo, crutones y parmesano",
    Favorito: false,
    ExentoImpuesto: false,
    PrecioAbierto: false,
    ControlStock: false,
    PrecioxUtilidad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: false,
    Enlinea: true,
    EnAPP: true,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "DES001",
    TipoProducto: "Producto",
    Nombredelproducto: "Pastel de Chocolate",
    Descripcion: "Rebanada de pastel húmedo con betún",
    Favorito: true,
    ExentoImpuesto: false,
    PrecioAbierto: false,
    ControlStock: true,
    PrecioxUtilidad: true,
    Facturable: true,
    Suspendido: false,
    Comedor: false,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "CAF001",
    TipoProducto: "Botella",
    Nombredelproducto: "Café Americano",
    Descripcion: "Taza de café filtrado",
    Favorito: false,
    ExentoImpuesto: false,
    PrecioAbierto: true,
    ControlStock: false,
    PrecioxUtilidad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnAPP: true,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "SOP001",
    TipoProducto: "Platillo",
    Nombredelproducto: "Sopa Azteca",
    Descripcion: "Caldo de jitomate con totopos y aguacate",
    Favorito: false,
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
    EnAPP: true,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "BEB003",
    TipoProducto: "Botella",
    Nombredelproducto: "Jugo de Naranja 350ml",
    Descripcion: "Jugo natural sin azúcar añadida",
    Favorito: false,
    ExentoImpuesto: true,
    PrecioAbierto: false,
    ControlStock: false,
    PrecioxUtilidad: true,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "ENT001",
    TipoProducto: "Producto",
    Nombredelproducto: "Nachos con Queso",
    Descripcion: "Totopos bañados en queso fundido",
    Favorito: true,
    ExentoImpuesto: false,
    PrecioAbierto: false,
    ControlStock: true,
    PrecioxUtilidad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnAPP: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "BUR001",
    TipoProducto: "Platillo",
    Nombredelproducto: "Burrito de Arrachera",
    Descripcion: "Tortilla de harina rellena de carne arrachera",
    Favorito: true,
    ExentoImpuesto: false,
    PrecioAbierto: false,
    ControlStock: true,
    PrecioxUtilidad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: false,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnAPP: true,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "HEL001",
    TipoProducto: "Producto",
    Nombredelproducto: "Helado de Vainilla",
    Descripcion: "Helado artesanal en bola",
    Favorito: false,
    ExentoImpuesto: false,
    PrecioAbierto: false,
    ControlStock: true,
    PrecioxUtilidad: true,
    Facturable: true,
    Suspendido: false,
    Comedor: false,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: true,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "BOT002",
    TipoProducto: "Botella",
    Nombredelproducto: "Cerveza Artesanal 355ml",
    Descripcion: "IPA con notas cítricas",
    Favorito: false,
    ExentoImpuesto: false,
    PrecioAbierto: false,
    ControlStock: true,
    PrecioxUtilidad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "ENS002",
    TipoProducto: "Platillo",
    Nombredelproducto: "Ensalada Mediterránea",
    Descripcion: "Con queso feta, aceitunas y jitomate cherry",
    Favorito: true,
    ExentoImpuesto: true,
    PrecioAbierto: false,
    ControlStock: true,
    PrecioxUtilidad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: false,
    Enlinea: true,
    EnAPP: true,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "DES002",
    TipoProducto: "Producto",
    Nombredelproducto: "Flan Napolitano",
    Descripcion: "Postre tradicional con caramelo",
    Favorito: true,
    ExentoImpuesto: false,
    PrecioAbierto: false,
    ControlStock: true,
    PrecioxUtilidad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: false,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: true,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date().toISOString(),
  },
  {
    ProductoULID: generateULID(),
    ClaveProducto: "BEB004",
    TipoProducto: "Botella",
    Nombredelproducto: "Té Helado Limón 500ml",
    Descripcion: "Bebida refrescante con sabor limón",
    Favorito: false,
    ExentoImpuesto: true,
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
  {
    ProductoULID: generateULID(),
    ClaveProducto: "SND001",
    TipoProducto: "Platillo",
    Nombredelproducto: "Sándwich de Pollo",
    Descripcion: "Con mayonesa, lechuga y pan artesanal",
    Favorito: true,
    ExentoImpuesto: false,
    PrecioAbierto: false,
    ControlStock: true,
    PrecioxUtilidad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnAPP: true,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date().toISOString(),
  }
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
