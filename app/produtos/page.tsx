import { ProductosView } from "@/components/produtos/produtos-view"
import { getProductos } from "@/actions/produtos.actions"

export default async function ProductosPage() {
  // Obtener produtos del servidor
  const result = await getProductos({ page: 1, limit: 100 })

  const produtos = result.success && result.data ? result.data.produtos : []

  return <ProductosView initialProductos={produtos} />
}
