import { ProductosView } from "@/components/productos/productos-view"
import {
  obtenerProductosAction,
  obtenerDatosRelacionadosAction,
  obtenerEstadisticasAction,
} from "@/actions/productos.actions"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"

export default async function ProductosPage() {
  // Cargar datos iniciales en paralelo
  const [productosResult, datosRelacionadosResult, estadisticasResult] = await Promise.all([
    obtenerProductosAction(),
    obtenerDatosRelacionadosAction(),
    obtenerEstadisticasAction(),
  ])

  // Manejar errores de carga
  if (!productosResult.success) {
    return (
      <AuthenticatedLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar productos</h2>
            <p className="text-gray-600">{productosResult.error}</p>
          </div>
        </div>
      </AuthenticatedLayout>
    )
  }

  const productos = productosResult.data || []
  const datosRelacionados = datosRelacionadosResult.success
    ? datosRelacionadosResult.data
    : {
        grupos: [],
        subgrupos: [],
        unidades: [],
        areasProduccion: [],
      }
  const estadisticas = estadisticasResult.success
    ? estadisticasResult.data
    : {
        total: 0,
        activos: 0,
        favoritos: 0,
        suspendidos: 0,
        porTipo: {},
      }

  return (
    <AuthenticatedLayout>
      <ProductosView
        productosIniciales={productos}
        datosRelacionados={datosRelacionados}
        estadisticasIniciales={estadisticas}
      />
    </AuthenticatedLayout>
  )
}
