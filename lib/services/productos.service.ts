import { db } from "@/lib/database/connection"
import { productos } from "@/lib/database/schema"
import { eq, and, like } from "drizzle-orm"
import type { Producto, NewProducto } from "@/lib/database/connection"

export class ProductosService {
  static async crear(data: NewProducto): Promise<Producto> {
    const [nuevoProducto] = await db.insert(productos).values(data).returning()
    return nuevoProducto
  }

  static async obtenerPorId(id: string): Promise<Producto | null> {
    const [producto] = await db.select().from(productos).where(eq(productos.ProductoULID, id)).limit(1)

    return producto || null
  }

  static async obtenerPorEmpresa(empresaId: string): Promise<Producto[]> {
    return await db.select().from(productos).where(eq(productos.EmpresaULID, empresaId))
  }

  static async buscarProductos(empresaId: string, termino: string): Promise<Producto[]> {
    return await db
      .select()
      .from(productos)
      .where(and(eq(productos.EmpresaULID, empresaId), like(productos.Nombredelproducto, `%${termino}%`)))
  }

  static async obtenerProductosActivos(empresaId: string): Promise<Producto[]> {
    return await db
      .select()
      .from(productos)
      .where(and(eq(productos.EmpresaULID, empresaId), eq(productos.Suspendido, false)))
  }

  static async actualizar(id: string, data: Partial<NewProducto>): Promise<Producto | null> {
    const [productoActualizado] = await db
      .update(productos)
      .set({ ...data, Fecha_UltimoCambio: new Date() })
      .where(eq(productos.ProductoULID, id))
      .returning()

    return productoActualizado || null
  }

  static async eliminar(id: string): Promise<boolean> {
    const resultado = await db.delete(productos).where(eq(productos.ProductoULID, id))

    return resultado.rowCount > 0
  }
}
