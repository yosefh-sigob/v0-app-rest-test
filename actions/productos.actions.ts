"use server"

import { db } from "@/lib/database/connection"
import { productos } from "@/lib/database/schema"
import { eq, and, like } from "drizzle-orm"
import { productoSchema } from "@/schemas/database.schemas"
import { generateULID } from "@/utils/ulid"
import type { Producto } from "@/interfaces/database"

export async function crearProducto(data: unknown): Promise<{ success: boolean; data?: Producto; error?: string }> {
  try {
    const validatedData = productoSchema.parse(data)

    const productoData = {
      ProductoULID: generateULID(),
      ...validatedData,
      Fecha_UltimoCambio: new Date(),
      Fecha_Sync: new Date(),
    }

    const [nuevoProducto] = await db.insert(productos).values(productoData).returning()

    return { success: true, data: nuevoProducto }
  } catch (error) {
    console.error("Error al crear producto:", error)
    return { success: false, error: "Error al crear el producto" }
  }
}

export async function obtenerProductosPorEmpresa(
  empresaId: string,
): Promise<{ success: boolean; data?: Producto[]; error?: string }> {
  try {
    const productosEmpresa = await db.select().from(productos).where(eq(productos.EmpresaULID, empresaId))
    return { success: true, data: productosEmpresa }
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return { success: false, error: "Error al obtener los productos" }
  }
}

export async function buscarProductos(
  empresaId: string,
  termino: string,
): Promise<{ success: boolean; data?: Producto[]; error?: string }> {
  try {
    const productosEncontrados = await db
      .select()
      .from(productos)
      .where(and(eq(productos.EmpresaULID, empresaId), like(productos.Nombredelproducto, `%${termino}%`)))

    return { success: true, data: productosEncontrados }
  } catch (error) {
    console.error("Error al buscar productos:", error)
    return { success: false, error: "Error al buscar productos" }
  }
}

export async function obtenerProductosActivos(
  empresaId: string,
): Promise<{ success: boolean; data?: Producto[]; error?: string }> {
  try {
    const productosActivos = await db
      .select()
      .from(productos)
      .where(and(eq(productos.EmpresaULID, empresaId), eq(productos.Suspendido, false)))

    return { success: true, data: productosActivos }
  } catch (error) {
    console.error("Error al obtener productos activos:", error)
    return { success: false, error: "Error al obtener productos activos" }
  }
}

export async function actualizarProducto(
  id: string,
  data: unknown,
): Promise<{ success: boolean; data?: Producto; error?: string }> {
  try {
    const validatedData = productoSchema.partial().parse(data)

    const [productoActualizado] = await db
      .update(productos)
      .set({ ...validatedData, Fecha_UltimoCambio: new Date() })
      .where(eq(productos.ProductoULID, id))
      .returning()

    if (!productoActualizado) {
      return { success: false, error: "Producto no encontrado" }
    }

    return { success: true, data: productoActualizado }
  } catch (error) {
    console.error("Error al actualizar producto:", error)
    return { success: false, error: "Error al actualizar el producto" }
  }
}

export async function eliminarProducto(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const resultado = await db.delete(productos).where(eq(productos.ProductoULID, id))

    if (resultado.rowCount === 0) {
      return { success: false, error: "Producto no encontrado" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error al eliminar producto:", error)
    return { success: false, error: "Error al eliminar el producto" }
  }
}
