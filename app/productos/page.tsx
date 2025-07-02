import { ProductosView } from "@/components/productos/productos-view"
import { MainLayout } from "@/components/layout/main-layout"
import {
  searchProductos,
  MOCK_GRUPOS_PRODUCTOS,
  MOCK_UNIDADES,
  MOCK_AREAS_PRODUCCION,
  MOCK_ALMACENES,
} from "@/lib/data/mock-data"
import type { SearchProductosInput } from "@/schemas/productos.schemas"

interface ProductosPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProductosPage({ searchParams }: ProductosPageProps) {
  // Convertir searchParams a filtros
  const filters: SearchProductosInput = {
    search: typeof searchParams.search === "string" ? searchParams.search : "",
    tipo: typeof searchParams.tipo === "string" ? (searchParams.tipo as any) : undefined,
    favorito: searchParams.favorito === "true" ? true : searchParams.favorito === "false" ? false : undefined,
    suspendido: searchParams.suspendido === "true" ? true : searchParams.suspendido === "false" ? false : undefined,
    grupoId: typeof searchParams.grupoId === "string" ? Number(searchParams.grupoId) : undefined,
    page: typeof searchParams.page === "string" ? Number(searchParams.page) : 1,
    limit: typeof searchParams.limit === "string" ? Number(searchParams.limit) : 20,
  }

  // Obtener datos simulados
  const initialData = searchProductos(filters)

  return (
    <MainLayout>
      <ProductosView
        initialData={initialData}
        gruposProductos={MOCK_GRUPOS_PRODUCTOS}
        unidades={MOCK_UNIDADES}
        areasProduccion={MOCK_AREAS_PRODUCCION}
        almacenes={MOCK_ALMACENES}
      />
    </MainLayout>
  )
}
