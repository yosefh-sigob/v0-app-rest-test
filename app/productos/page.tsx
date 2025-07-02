import { Suspense } from "react"
import { ProductosView } from "@/components/productos/productos-view"
import { ProductosLoading } from "@/components/productos/productos-loading"
import {
  getProductos,
  getGruposProductos,
  getUnidades,
  getAreasProduccion,
  getAlmacenes,
} from "@/actions/productos.actions"
import { searchProductosSchema } from "@/schemas/productos.schemas"

interface ProductosPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProductosPage({ searchParams }: ProductosPageProps) {
  const params = await searchParams

  // Validar y parsear parámetros de búsqueda
  const searchParamsData = {
    search: typeof params.search === "string" ? params.search : undefined,
    tipo: typeof params.tipo === "string" ? params.tipo : undefined,
    favorito: typeof params.favorito === "string" ? params.favorito === "true" : undefined,
    suspendido: typeof params.suspendido === "string" ? params.suspendido === "true" : undefined,
    grupoId: typeof params.grupoId === "string" ? Number.parseInt(params.grupoId) : undefined,
    page: typeof params.page === "string" ? Number.parseInt(params.page) : 1,
    limit: typeof params.limit === "string" ? Number.parseInt(params.limit) : 20,
  }

  const validatedParams = searchProductosSchema.parse(searchParamsData)

  // Obtener datos en paralelo
  const [productosResult, gruposProductos, unidades, areasProduccion, almacenes] = await Promise.all([
    getProductos(validatedParams),
    getGruposProductos(),
    getUnidades(),
    getAreasProduccion(),
    getAlmacenes(),
  ])

  // Manejar error de productos
  const productosData = productosResult.success
    ? productosResult.data
    : {
        productos: [],
        total: 0,
        page: 1,
        totalPages: 0,
        limit: 20,
      }

  return (
    <Suspense fallback={<ProductosLoading />}>
      <ProductosView
        initialData={productosData}
        gruposProductos={gruposProductos}
        unidades={unidades}
        areasProduccion={areasProduccion}
        almacenes={almacenes}
      />
    </Suspense>
  )
}
