import type { Producto } from "@/interfaces/database"
import type { SearchProductosInput } from "@/schemas/productos.schemas"

// Datos mock para grupos de productos
export const MOCK_GRUPOS_PRODUCTOS = [
  { id: 1, nombre: "Tacos" },
  { id: 2, nombre: "Hamburguesas" },
  { id: 3, nombre: "Pizzas" },
  { id: 4, nombre: "Ensaladas" },
  { id: 5, nombre: "Bebidas" },
  { id: 6, nombre: "Postres" },
  { id: 7, nombre: "Desayunos" },
  { id: 8, nombre: "Sopas" },
  { id: 9, nombre: "Antojitos" },
  { id: 10, nombre: "Mariscos" },
]

// Datos mock para unidades
export const MOCK_UNIDADES = [
  { id: 1, nombre: "Pieza", abreviacion: "pza" },
  { id: 2, nombre: "Litro", abreviacion: "lt" },
  { id: 3, nombre: "Kilogramo", abreviacion: "kg" },
  { id: 4, nombre: "Gramo", abreviacion: "gr" },
  { id: 5, nombre: "Porción", abreviacion: "porción" },
  { id: 6, nombre: "Botella", abreviacion: "bot" },
  { id: 7, nombre: "Vaso", abreviacion: "vaso" },
]

// Datos mock para áreas de producción
export const MOCK_AREAS_PRODUCCION = [
  { id: 1, nombre: "Cocina Principal" },
  { id: 2, nombre: "Parrilla" },
  { id: 3, nombre: "Horno de Pizza" },
  { id: 4, nombre: "Ensaladas" },
  { id: 5, nombre: "Barra de Bebidas" },
  { id: 6, nombre: "Repostería" },
  { id: 7, nombre: "Freidora" },
]

// Datos mock para almacenes
export const MOCK_ALMACENES = [
  { id: 1, nombre: "Almacén General" },
  { id: 2, nombre: "Refrigerador" },
  { id: 3, nombre: "Congelador" },
  { id: 4, nombre: "Bodega Seca" },
  { id: 5, nombre: "Barra" },
]

// Productos mock más extensos
export const MOCK_PRODUCTOS: Producto[] = [
  // Tacos
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U9V",
    Nombredelproducto: "Taco de Carnitas",
    ClaveProducto: "TAC001",
    TipoProducto: "Platillo",
    Descripcion: "Taco de carnitas con cebolla, cilantro y salsa verde",
    GrupoProductoID: 1,
    UnidadID: 1,
    AreaProduccionID: 1,
    AlmacenID: 1,
    PermiteDescuento: true,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: true,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U9W",
    Nombredelproducto: "Taco de Pastor",
    ClaveProducto: "TAC002",
    TipoProducto: "Platillo",
    Descripcion: "Taco de pastor con piña, cebolla y cilantro",
    GrupoProductoID: 1,
    UnidadID: 1,
    AreaProduccionID: 2,
    AlmacenID: 1,
    PermiteDescuento: true,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: false,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U9X",
    Nombredelproducto: "Taco de Asada",
    ClaveProducto: "TAC003",
    TipoProducto: "Platillo",
    Descripcion: "Taco de carne asada con guacamole y pico de gallo",
    GrupoProductoID: 1,
    UnidadID: 1,
    AreaProduccionID: 2,
    AlmacenID: 1,
    PermiteDescuento: true,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: true,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: true,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  // Hamburguesas
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U9Y",
    Nombredelproducto: "Hamburguesa Clásica",
    ClaveProducto: "HAM001",
    TipoProducto: "Platillo",
    Descripcion: "Hamburguesa de carne de res con lechuga, tomate, cebolla y papas fritas",
    GrupoProductoID: 2,
    UnidadID: 1,
    AreaProduccionID: 1,
    AlmacenID: 1,
    PermiteDescuento: true,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: true,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: true,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U9Z",
    Nombredelproducto: "Hamburguesa BBQ",
    ClaveProducto: "HAM002",
    TipoProducto: "Platillo",
    Descripcion: "Hamburguesa con salsa BBQ, tocino, cebolla caramelizada y queso cheddar",
    GrupoProductoID: 2,
    UnidadID: 1,
    AreaProduccionID: 1,
    AlmacenID: 1,
    PermiteDescuento: true,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: true,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: false,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  // Pizzas
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U90",
    Nombredelproducto: "Pizza Margherita",
    ClaveProducto: "PIZ001",
    TipoProducto: "Platillo",
    Descripcion: "Pizza con salsa de tomate, mozzarella fresca y albahaca",
    GrupoProductoID: 3,
    UnidadID: 1,
    AreaProduccionID: 3,
    AlmacenID: 1,
    PermiteDescuento: true,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: true,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U91",
    Nombredelproducto: "Pizza Pepperoni",
    ClaveProducto: "PIZ002",
    TipoProducto: "Platillo",
    Descripcion: "Pizza con pepperoni, mozzarella y salsa de tomate",
    GrupoProductoID: 3,
    UnidadID: 1,
    AreaProduccionID: 3,
    AlmacenID: 1,
    PermiteDescuento: true,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: false,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  // Ensaladas
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U92",
    Nombredelproducto: "Ensalada César",
    ClaveProducto: "ENS001",
    TipoProducto: "Platillo",
    Descripcion: "Ensalada con lechuga romana, crutones, parmesano y aderezo césar",
    GrupoProductoID: 4,
    UnidadID: 5,
    AreaProduccionID: 4,
    AlmacenID: 2,
    PermiteDescuento: true,
    ControlaStock: true,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: false,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  // Bebidas
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U93",
    Nombredelproducto: "Coca Cola",
    ClaveProducto: "BEB001",
    TipoProducto: "Producto",
    Descripcion: "Refresco de cola 355ml",
    GrupoProductoID: 5,
    UnidadID: 6,
    AreaProduccionID: 5,
    AlmacenID: 4,
    PermiteDescuento: true,
    ControlaStock: true,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: false,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U94",
    Nombredelproducto: "Agua Natural",
    ClaveProducto: "BEB002",
    TipoProducto: "Producto",
    Descripcion: "Agua natural 500ml",
    GrupoProductoID: 5,
    UnidadID: 6,
    AreaProduccionID: 5,
    AlmacenID: 4,
    PermiteDescuento: false,
    ControlaStock: true,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: false,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U95",
    Nombredelproducto: "Cerveza Corona",
    ClaveProducto: "BEB003",
    TipoProducto: "Botella",
    Descripcion: "Cerveza Corona 355ml",
    GrupoProductoID: 5,
    UnidadID: 6,
    AreaProduccionID: 5,
    AlmacenID: 5,
    PermiteDescuento: true,
    ControlaStock: true,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnMenuQR: true,
    Favorito: true,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  // Postres
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U96",
    Nombredelproducto: "Flan Napolitano",
    ClaveProducto: "POS001",
    TipoProducto: "Platillo",
    Descripcion: "Flan casero con caramelo y crema batida",
    GrupoProductoID: 6,
    UnidadID: 5,
    AreaProduccionID: 6,
    AlmacenID: 2,
    PermiteDescuento: true,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: false,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U97",
    Nombredelproducto: "Pastel de Chocolate",
    ClaveProducto: "POS002",
    TipoProducto: "Platillo",
    Descripcion: "Rebanada de pastel de chocolate con betún",
    GrupoProductoID: 6,
    UnidadID: 5,
    AreaProduccionID: 6,
    AlmacenID: 2,
    PermiteDescuento: true,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: true,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  // Desayunos
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U98",
    Nombredelproducto: "Huevos Rancheros",
    ClaveProducto: "DES001",
    TipoProducto: "Platillo",
    Descripcion: "Huevos estrellados con salsa ranchera, frijoles y tortillas",
    GrupoProductoID: 7,
    UnidadID: 5,
    AreaProduccionID: 1,
    AlmacenID: 1,
    PermiteDescuento: true,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: true,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: false,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U99",
    Nombredelproducto: "Hotcakes",
    ClaveProducto: "DES002",
    TipoProducto: "Platillo",
    Descripcion: "Stack de 3 hotcakes con miel de maple y mantequilla",
    GrupoProductoID: 7,
    UnidadID: 5,
    AreaProduccionID: 1,
    AlmacenID: 1,
    PermiteDescuento: true,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: true,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  // Sopas
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U9A",
    Nombredelproducto: "Sopa de Tortilla",
    ClaveProducto: "SOP001",
    TipoProducto: "Platillo",
    Descripcion: "Sopa de tortilla con aguacate, queso fresco y crema",
    GrupoProductoID: 8,
    UnidadID: 5,
    AreaProduccionID: 1,
    AlmacenID: 1,
    PermiteDescuento: true,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: false,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  // Antojitos
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U9B",
    Nombredelproducto: "Quesadillas",
    ClaveProducto: "ANT001",
    TipoProducto: "Platillo",
    Descripcion: "Quesadillas de queso con guacamole y salsa",
    GrupoProductoID: 9,
    UnidadID: 5,
    AreaProduccionID: 1,
    AlmacenID: 1,
    PermiteDescuento: true,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: false,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U9C",
    Nombredelproducto: "Nachos",
    ClaveProducto: "ANT002",
    TipoProducto: "Platillo",
    Descripcion: "Nachos con queso derretido, jalapeños y guacamole",
    GrupoProductoID: 9,
    UnidadID: 5,
    AreaProduccionID: 1,
    AlmacenID: 1,
    PermiteDescuento: true,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: true,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  // Mariscos
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U9D",
    Nombredelproducto: "Camarones al Ajillo",
    ClaveProducto: "MAR001",
    TipoProducto: "Platillo",
    Descripcion: "Camarones salteados en ajo con arroz y ensalada",
    GrupoProductoID: 10,
    UnidadID: 5,
    AreaProduccionID: 1,
    AlmacenID: 3,
    PermiteDescuento: true,
    ControlaStock: true,
    AceptaPropina: false,
    PreguntaCoccion: true,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: true,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U9E",
    Nombredelproducto: "Filete de Pescado",
    ClaveProducto: "MAR002",
    TipoProducto: "Platillo",
    Descripcion: "Filete de pescado a la plancha con vegetales",
    GrupoProductoID: 10,
    UnidadID: 5,
    AreaProduccionID: 1,
    AlmacenID: 3,
    PermiteDescuento: true,
    ControlaStock: true,
    AceptaPropina: false,
    PreguntaCoccion: true,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnMenuQR: true,
    Favorito: false,
    Suspendido: false,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
  // Producto suspendido para pruebas
  {
    ProductoULID: "01HKQR8X9M2N3P4Q5R6S7T8U9F",
    Nombredelproducto: "Producto Suspendido",
    ClaveProducto: "SUS001",
    TipoProducto: "Producto",
    Descripcion: "Este producto está suspendido temporalmente",
    GrupoProductoID: 5,
    UnidadID: 1,
    AreaProduccionID: 1,
    AlmacenID: 1,
    PermiteDescuento: false,
    ControlaStock: false,
    AceptaPropina: false,
    PreguntaCoccion: false,
    Comedor: false,
    ADomicilio: false,
    Mostrador: false,
    Enlinea: false,
    EnMenuQR: false,
    Favorito: false,
    Suspendido: true,
    FechaCreacion: new Date("2024-01-01"),
    FechaActualizacion: new Date("2024-01-15"),
  },
]

// Función de búsqueda mejorada
export function searchProductos(filters: SearchProductosInput) {
  let filteredProducts = [...MOCK_PRODUCTOS]

  // Filtro por búsqueda de texto
  if (filters.search && filters.search.trim() !== "") {
    const searchTerm = filters.search.toLowerCase().trim()
    filteredProducts = filteredProducts.filter(
      (producto) =>
        producto.Nombredelproducto.toLowerCase().includes(searchTerm) ||
        producto.ClaveProducto.toLowerCase().includes(searchTerm) ||
        (producto.Descripcion && producto.Descripcion.toLowerCase().includes(searchTerm)),
    )
  }

  // Filtro por tipo de producto
  if (filters.tipo) {
    filteredProducts = filteredProducts.filter((producto) => producto.TipoProducto === filters.tipo)
  }

  // Filtro por favorito
  if (filters.favorito !== undefined) {
    filteredProducts = filteredProducts.filter((producto) => producto.Favorito === filters.favorito)
  }

  // Filtro por suspendido
  if (filters.suspendido !== undefined) {
    filteredProducts = filteredProducts.filter((producto) => producto.Suspendido === filters.suspendido)
  }

  // Filtro por grupo
  if (filters.grupoId) {
    filteredProducts = filteredProducts.filter((producto) => producto.GrupoProductoID === filters.grupoId)
  }

  // Calcular paginación
  const total = filteredProducts.length
  const totalPages = Math.ceil(total / filters.limit)
  const startIndex = (filters.page - 1) * filters.limit
  const endIndex = startIndex + filters.limit
  const productos = filteredProducts.slice(startIndex, endIndex)

  return {
    productos,
    total,
    page: filters.page,
    totalPages,
    limit: filters.limit,
  }
}

// Función para obtener un producto por ID
export function getProductoById(id: string): Producto | null {
  return MOCK_PRODUCTOS.find((producto) => producto.ProductoULID === id) || null
}

// Función para agregar un producto (simulación)
export function addProducto(producto: Omit<Producto, "ProductoULID" | "FechaCreacion" | "FechaActualizacion">) {
  const newProducto: Producto = {
    ...producto,
    ProductoULID: `01HKQR8X9M2N3P4Q5R6S7T8U9${Date.now()}`,
    FechaCreacion: new Date(),
    FechaActualizacion: new Date(),
  }
  MOCK_PRODUCTOS.push(newProducto)
  return newProducto
}

// Función para actualizar un producto (simulación)
export function updateProducto(id: string, updates: Partial<Producto>) {
  const index = MOCK_PRODUCTOS.findIndex((producto) => producto.ProductoULID === id)
  if (index !== -1) {
    MOCK_PRODUCTOS[index] = {
      ...MOCK_PRODUCTOS[index],
      ...updates,
      FechaActualizacion: new Date(),
    }
    return MOCK_PRODUCTOS[index]
  }
  return null
}

// Función para eliminar (suspender) un producto
export function deleteProducto(id: string) {
  const index = MOCK_PRODUCTOS.findIndex((producto) => producto.ProductoULID === id)
  if (index !== -1) {
    MOCK_PRODUCTOS[index] = {
      ...MOCK_PRODUCTOS[index],
      Suspendido: true,
      FechaActualizacion: new Date(),
    }
    return true
  }
  return false
}

// Función para alternar favorito
export function toggleFavoriteProducto(id: string) {
  const index = MOCK_PRODUCTOS.findIndex((producto) => producto.ProductoULID === id)
  if (index !== -1) {
    MOCK_PRODUCTOS[index] = {
      ...MOCK_PRODUCTOS[index],
      Favorito: !MOCK_PRODUCTOS[index].Favorito,
      FechaActualizacion: new Date(),
    }
    return MOCK_PRODUCTOS[index]
  }
  return null
}
