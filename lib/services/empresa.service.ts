import { db } from "@/lib/database/connection"
import { empresa } from "@/lib/database/schema"
import { eq } from "drizzle-orm"
import type { Empresa, NewEmpresa } from "@/lib/database/connection"

export class EmpresaService {
  static async crear(data: NewEmpresa): Promise<Empresa> {
    const [nuevaEmpresa] = await db.insert(empresa).values(data).returning()
    return nuevaEmpresa
  }

  static async obtenerPorId(id: string): Promise<Empresa | null> {
    const [empresaEncontrada] = await db.select().from(empresa).where(eq(empresa.EmpresaULID, id)).limit(1)

    return empresaEncontrada || null
  }

  static async obtenerTodas(): Promise<Empresa[]> {
    return await db.select().from(empresa)
  }

  static async actualizar(id: string, data: Partial<NewEmpresa>): Promise<Empresa | null> {
    const [empresaActualizada] = await db
      .update(empresa)
      .set({ ...data, Fecha_UltimoCambio: new Date() })
      .where(eq(empresa.EmpresaULID, id))
      .returning()

    return empresaActualizada || null
  }

  static async eliminar(id: string): Promise<boolean> {
    const resultado = await db.delete(empresa).where(eq(empresa.EmpresaULID, id))

    return resultado.rowCount > 0
  }
}
