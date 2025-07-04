import { ProductosView } from "@/components/productos/productos-view"
import {
  MOCK_PRODUCTOS,
  MOCK_GRUPOS_PRODUCTOS,
  MOCK_UNIDADES,
  MOCK_AREAS_PRODUCCION,
  MOCK_ALMACENES,
} from "@/lib/data/mock-data"

export default async function ProductosPage() {
  // Simular carga de datos
  await new Promise((resolve) => setTimeout(resolve, 100))

  return (
    <div className="container mx-auto py-6">
      <ProductosView
        productos={MOCK_PRODUCTOS}
        gruposProductos={MOCK_GRUPOS_PRODUCTOS}
        unidades={MOCK_UNIDADES}
        areasProduccion={MOCK_AREAS_PRODUCCION}
        almacenes={MOCK_ALMACENES}
      />
    </div>
  )
}
