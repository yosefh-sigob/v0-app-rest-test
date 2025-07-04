import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { ProductosView } from "@/components/productos/productos-view"
import { obtenerProductos } from "@/actions/productos.actions"

export default async function ProductosPage() {
  const productos = await obtenerProductos()

  return (
    <AuthenticatedLayout title="Gestión de Productos">
      <ProductosView productos={productos} />
    </AuthenticatedLayout>
  )
}
