"use client"

"use server"

import {
  getProductos,
  getGruposProductos,
  getUnidades,
  getAreasProduccion,
  getAlmacenes,
} from "@/actions/productos.actions"
import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import type { Producto, SearchProductosInput } from "@/lib/types"
import { ProductosView } from "@/components/productos/productos-view"
import { ProductosLoading } from "@/components/productos/productos-loading"
import { Suspense } from "react"

// Simulamos obtener la empresa del usuario autenticado
const EMPRESA_ID = "01HKQZX8Y9Z2M3N4P5Q6R7S8T9" // En producción vendría de la sesión

interface ProductosPageProps {
  searchParams: Promise<{
    search?: string
    tipo?: string
    activo?: string
    favorito?: string
    page?: string
  }>
}

export default async function ProductosPage({ searchParams }: ProductosPageProps) {
  const params = await searchParams

  // Convertir parámetros de búsqueda
  const searchInput: SearchProductosInput = {
    search: params.search,
    tipo: params.tipo as any,
    activo: params.activo ? params.activo === "true" : undefined,
    favorito: params.favorito ? params.favorito === "true" : undefined,
    page: params.page ? Number.parseInt(params.page) : 1,
    limit: 20,
  }

  // Obtener datos en paralelo
  const [productosData, gruposProductos, unidades, areasProduccion, almacenes] = await Promise.all([
    getProductos(searchInput),
    getGruposProductos(),
    getUnidades(),
    getAreasProduccion(),
    getAlmacenes(),
  ])

  const [productos, setProductos] = useState<Producto[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas")
  const [dialogAbierto, setDialogAbierto] = useState(false)
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null)

  if (!productosData.success) {
    return (
      <MainLayout title="Catálogo de Productos">
        <div className="container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="text-muted-foreground mt-2">{productosData.error}</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  setProductos(productosData.data || [])

  const categorias = [...new Set(productos.map((p) => p.categoria))]

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.codigo.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoriaFiltro === "todas" || producto.categoria === categoriaFiltro
    return coincideBusqueda && coincideCategoria
  })

  const toggleDisponibilidad = (productoId: string) => {
    setProductos(
      productos.map((producto) =>
        producto.id === productoId ? { ...producto, disponible: !producto.disponible } : producto,
      ),
    )
  }

  const toggleFavorito = (productoId: string) => {
    setProductos(
      productos.map((producto) =>
        producto.id === productoId ? { ...producto, favorito: !producto.favorito } : producto,
      ),
    )
  }

  const abrirEdicion = (producto: Producto) => {
    setProductoEditando(producto)
    setDialogAbierto(true)
  }

  const cerrarDialog = () => {
    setDialogAbierto(false)
    setProductoEditando(null)
  }

  return (
    <MainLayout title="Catálogo de Productos">
      <Suspense fallback={<ProductosLoading />}>
        <ProductosView
          productosData={productosData}
          gruposProductos={gruposProductos}
          unidades={unidades}
          areasProduccion={areasProduccion}
          almacenes={almacenes}
          searchParams={searchInput}
        />
      </Suspense>
    </MainLayout>
  )
}
