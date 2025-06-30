"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, Search, ShoppingCart, CreditCard, DollarSign, Receipt, Trash2 } from "lucide-react"
import { mockProductos, mockMesas } from "@/lib/data/mock-data"
import type { Producto, ProductoVenta } from "@/lib/types"

export default function PuntoVentaPage() {
  const [productos] = useState<Producto[]>(mockProductos)
  const [carrito, setCarrito] = useState<ProductoVenta[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas")
  const [mesaSeleccionada, setMesaSeleccionada] = useState("")
  const [tipoVenta, setTipoVenta] = useState("comedor")

  const categorias = [...new Set(productos.map((p) => p.categoria))]

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoriaFiltro === "todas" || producto.categoria === categoriaFiltro
    return coincideBusqueda && coincideCategoria && producto.disponible
  })

  const agregarAlCarrito = (producto: Producto) => {
    const itemExistente = carrito.find((item) => item.producto.id === producto.id)

    if (itemExistente) {
      setCarrito(
        carrito.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1, total: (item.cantidad + 1) * item.precio }
            : item,
        ),
      )
    } else {
      const nuevoItem: ProductoVenta = {
        id: Date.now().toString(),
        producto,
        cantidad: 1,
        precio: producto.precio,
        total: producto.precio,
      }
      setCarrito([...carrito, nuevoItem])
    }
  }

  const actualizarCantidad = (itemId: string, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(itemId)
      return
    }

    setCarrito(
      carrito.map((item) =>
        item.id === itemId ? { ...item, cantidad: nuevaCantidad, total: nuevaCantidad * item.precio } : item,
      ),
    )
  }

  const eliminarDelCarrito = (itemId: string) => {
    setCarrito(carrito.filter((item) => item.id !== itemId))
  }

  const calcularSubtotal = () => {
    return carrito.reduce((total, item) => total + item.total, 0)
  }

  const calcularImpuestos = () => {
    return calcularSubtotal() * 0.16 // 16% IVA
  }

  const calcularTotal = () => {
    return calcularSubtotal() + calcularImpuestos()
  }

  const procesarVenta = () => {
    if (carrito.length === 0) return

    const venta = {
      productos: carrito,
      mesa: mesaSeleccionada,
      tipo: tipoVenta,
      subtotal: calcularSubtotal(),
      impuestos: calcularImpuestos(),
      total: calcularTotal(),
      fecha: new Date(),
    }

    console.log("Procesando venta:", venta)
    alert("Venta procesada exitosamente")
    setCarrito([])
  }

  return (
    <MainLayout title="Punto de Venta">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Panel de productos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filtros */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Grid de productos */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {productosFiltrados.map((producto) => (
              <Card
                key={producto.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => agregarAlCarrito(producto)}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium line-clamp-2">{producto.nombre}</h3>
                      {producto.favorito && (
                        <Badge variant="secondary" className="ml-2">
                          ★
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{producto.descripcion}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{producto.categoria}</Badge>
                      <span className="text-lg font-semibold">${producto.precio.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Panel del carrito */}
        <div className="space-y-6">
          {/* Configuración de venta */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nueva Venta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tipo de Venta</label>
                <Select value={tipoVenta} onValueChange={setTipoVenta}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comedor">Comedor</SelectItem>
                    <SelectItem value="mostrador">Mostrador</SelectItem>
                    <SelectItem value="domicilio">Domicilio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {tipoVenta === "comedor" && (
                <div>
                  <label className="text-sm font-medium">Mesa</label>
                  <Select value={mesaSeleccionada} onValueChange={setMesaSeleccionada}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar mesa" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockMesas
                        .filter((m) => m.estado === "Disponible")
                        .map((mesa) => (
                          <SelectItem key={mesa.id} value={mesa.numero}>
                            {mesa.numero} - {mesa.area}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Carrito */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Carrito</CardTitle>
                <Badge variant="outline">
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  {carrito.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {carrito.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">El carrito está vacío</p>
                  <p className="text-sm text-muted-foreground">Selecciona productos para agregar</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {carrito.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">{item.producto.nombre}</h4>
                        <p className="text-xs text-muted-foreground">${item.precio.toFixed(2)} c/u</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.cantidad}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-medium text-sm">${item.total.toFixed(2)}</p>
                        <Button size="sm" variant="ghost" onClick={() => eliminarDelCarrito(item.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resumen y pago */}
          {carrito.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${calcularSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impuestos (16%):</span>
                    <span>${calcularImpuestos().toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${calcularTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" onClick={procesarVenta}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Procesar Venta
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Efectivo
                    </Button>
                    <Button variant="outline" size="sm">
                      <Receipt className="h-4 w-4 mr-1" />
                      Imprimir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
