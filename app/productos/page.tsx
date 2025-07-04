import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { ProductosView } from "@/components/productos/productos-view"
import { getProductos } from "@/actions/productos.actions"

export default async function ProductosPage() {
  const productos = await getProductos()

  return (
    <AuthenticatedLayout>
      <ProductosView productos={productos} />
    </AuthenticatedLayout>
  )
}
