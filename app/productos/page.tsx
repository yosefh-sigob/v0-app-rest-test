import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { ProductosView } from "@/components/productos/productos-view"

export default async function ProductosPage() {
  return (
    <AuthenticatedLayout>
      <ProductosView />
    </AuthenticatedLayout>
  )
}
