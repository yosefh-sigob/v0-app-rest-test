import { getAllProductos } from "@/actions/productos.actions"
import { ProductosView } from "@/components/productos/productos-view"

export default async function ProductosPage() {
  // Obtener productos iniciales en el servidor
  const result = await getAllProductos()
  const productosIniciales = result.success ? result.data : []

  return <ProductosView initialProductos={productosIniciales} />
}
