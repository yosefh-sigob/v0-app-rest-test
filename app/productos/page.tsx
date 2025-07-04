import { ProductosView } from "@/components/productos/productos-view"
import { getProductos } from "@/actions/productos.actions"

export default async function ProductosPage() {
  // Obtener productos del servidor
  const result = await getProductos({ page: 1, limit: 100 })

  const productos = result.success && result.data ? result.data.productos : []

  return <ProductosView initialProductos={productos} />
}
