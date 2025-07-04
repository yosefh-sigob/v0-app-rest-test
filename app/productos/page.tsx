import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { ProductosView } from "@/components/productos/productos-view"

export default function ProductosPage() {
  return (
    <AuthenticatedLayout>
      <ProductosView />
    </AuthenticatedLayout>
  )
}
