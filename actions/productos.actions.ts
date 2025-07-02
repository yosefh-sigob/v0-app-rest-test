"use server"

import { revalidatePath } from "next/cache"
import { generateULID } from "@/utils/ulid"
import { createProductoSchema, updateProductoSchema, searchProductosSchema } from "@/schemas/productos.schemas"
import type { CreateProductoInput, UpdateProductoInput, SearchProductosInput } from "@/schemas/productos.schemas"
import type { Producto } from "@/interfaces/database"

// Mock data expandido con muchos más productos
const mockProductos: Producto[] = [
  // TACOS
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8Q",
    GrupoProductoULID: 1,
    SubgrupoProductoULID: 1,
    ClaveProducto: "TACO001",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Tacos al Pastor",
    Favorito: true,
    Descripcion: "3 tacos de trompo con piña, cebolla y cilantro",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    AlmacenULID: 1,
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    ClaveTributaria: "50211503",
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: true,
    EnMenuQR: true,
    ClasificacionQRULID: 1,
    DatosDinamicos: null,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8R",
    GrupoProductoULID: 1,
    ClaveProducto: "TACO002",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Tacos de Carnitas",
    Favorito: true,
    Descripcion: "3 tacos de carnitas con cebolla y cilantro",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    ControlStock: false,
    PrecioxUtilidadad: true,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8S",
    GrupoProductoULID: 1,
    ClaveProducto: "TACO003",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Tacos de Asada",
    Favorito: false,
    Descripcion: "3 tacos de carne asada con guacamole",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8T",
    GrupoProductoULID: 1,
    ClaveProducto: "TACO004",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Tacos de Pollo",
    Favorito: false,
    Descripcion: "3 tacos de pollo a la plancha con verduras",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    ControlStock: false,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },

  // HAMBURGUESAS
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8U",
    GrupoProductoULID: 2,
    ClaveProducto: "BURG001",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Hamburguesa Clásica",
    Favorito: true,
    Descripcion: "Carne de res, lechuga, tomate, cebolla y salsa especial",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 2,
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnAPP: false,
    CanalesVenta: true,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8V",
    GrupoProductoULID: 2,
    ClaveProducto: "BURG002",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Hamburguesa BBQ",
    Favorito: true,
    Descripcion: "Carne de res, tocino, queso cheddar y salsa BBQ",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 2,
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnAPP: true,
    CanalesVenta: true,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8W",
    GrupoProductoULID: 2,
    ClaveProducto: "BURG003",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Hamburguesa Hawaiana",
    Favorito: false,
    Descripcion: "Carne de res, jamón, piña y queso manchego",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 2,
    ControlStock: false,
    PrecioxUtilidadad: true,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8X",
    GrupoProductoULID: 2,
    ClaveProducto: "BURG004",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Hamburguesa Vegetariana",
    Favorito: false,
    Descripcion: "Hamburguesa de lentejas con verduras frescas",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 2,
    ControlStock: false,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: true,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },

  // PIZZAS
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8Y",
    GrupoProductoULID: 3,
    ClaveProducto: "PIZZ001",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Pizza Margherita",
    Favorito: true,
    Descripcion: "Salsa de tomate, mozzarella fresca y albahaca",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 3,
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnAPP: true,
    CanalesVenta: true,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8Z",
    GrupoProductoULID: 3,
    ClaveProducto: "PIZZ002",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Pizza Pepperoni",
    Favorito: true,
    Descripcion: "Salsa de tomate, mozzarella y pepperoni",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 3,
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnAPP: true,
    CanalesVenta: true,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R90",
    GrupoProductoULID: 3,
    ClaveProducto: "PIZZ003",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Pizza Hawaiana",
    Favorito: false,
    Descripcion: "Salsa de tomate, mozzarella, jamón y piña",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 3,
    ControlStock: false,
    PrecioxUtilidadad: true,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R91",
    GrupoProductoULID: 3,
    ClaveProducto: "PIZZ004",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Pizza Cuatro Quesos",
    Favorito: false,
    Descripcion: "Mozzarella, parmesano, gorgonzola y queso de cabra",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 3,
    ControlStock: false,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: false,
    Enlinea: true,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },

  // ENSALADAS
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R92",
    GrupoProductoULID: 4,
    ClaveProducto: "ENSA001",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Ensalada César",
    Favorito: false,
    Descripcion: "Lechuga romana, crutones, parmesano y aderezo césar",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 4,
    ControlStock: false,
    PrecioxUtilidadad: true,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R93",
    GrupoProductoULID: 4,
    ClaveProducto: "ENSA002",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Ensalada Griega",
    Favorito: false,
    Descripcion: "Tomate, pepino, cebolla, aceitunas y queso feta",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 4,
    ControlStock: false,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: false,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R94",
    GrupoProductoULID: 4,
    ClaveProducto: "ENSA003",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Ensalada de Pollo",
    Favorito: true,
    Descripcion: "Lechuga mixta, pollo a la plancha, aguacate y vinagreta",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 4,
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },

  // BEBIDAS
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R95",
    GrupoProductoULID: 5,
    ClaveProducto: "BEB001",
    TipoProducto: "Producto" as const,
    Nombredelproducto: "Coca Cola",
    Favorito: true,
    Descripcion: "Refresco de cola 355ml",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 2,
    AreaProduccionULID: 5,
    ControlStock: true,
    PrecioxUtilidadad: true,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnAPP: true,
    CanalesVenta: true,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R96",
    GrupoProductoULID: 5,
    ClaveProducto: "BEB002",
    TipoProducto: "Producto" as const,
    Nombredelproducto: "Agua Natural",
    Favorito: false,
    Descripcion: "Agua purificada 500ml",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 2,
    AreaProduccionULID: 5,
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R97",
    GrupoProductoULID: 5,
    ClaveProducto: "BEB003",
    TipoProducto: "Producto" as const,
    Nombredelproducto: "Jugo de Naranja",
    Favorito: true,
    Descripcion: "Jugo natural de naranja 300ml",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 2,
    AreaProduccionULID: 5,
    ControlStock: false,
    PrecioxUtilidadad: true,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R98",
    GrupoProductoULID: 5,
    ClaveProducto: "BEB004",
    TipoProducto: "Botella" as const,
    Nombredelproducto: "Cerveza Corona",
    Favorito: false,
    Descripcion: "Cerveza clara 355ml",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 2,
    AreaProduccionULID: 5,
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7R99",
    GrupoProductoULID: 5,
    ClaveProducto: "BEB005",
    TipoProducto: "Producto" as const,
    Nombredelproducto: "Limonada",
    Favorito: false,
    Descripcion: "Limonada natural con hielo",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 2,
    AreaProduccionULID: 5,
    ControlStock: false,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: false,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },

  // POSTRES
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7RA0",
    GrupoProductoULID: 6,
    ClaveProducto: "POST001",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Flan Napolitano",
    Favorito: true,
    Descripcion: "Flan casero con caramelo",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 6,
    ControlStock: false,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7RA1",
    GrupoProductoULID: 6,
    ClaveProducto: "POST002",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Pastel de Chocolate",
    Favorito: true,
    Descripcion: "Rebanada de pastel de chocolate con betún",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 6,
    ControlStock: false,
    PrecioxUtilidadad: true,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7RA2",
    GrupoProductoULID: 6,
    ClaveProducto: "POST003",
    TipoProducto: "Producto" as const,
    Nombredelproducto: "Helado de Vainilla",
    Favorito: false,
    Descripcion: "2 bolas de helado de vainilla",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 6,
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7RA3",
    GrupoProductoULID: 6,
    ClaveProducto: "POST004",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Cheesecake",
    Favorito: false,
    Descripcion: "Rebanada de cheesecake de fresa",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 6,
    ControlStock: false,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: false,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },

  // DESAYUNOS
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7RA4",
    GrupoProductoULID: 7,
    ClaveProducto: "DESA001",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Huevos Rancheros",
    Favorito: true,
    Descripcion: "Huevos estrellados con salsa ranchera y frijoles",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    ControlStock: false,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7RA5",
    GrupoProductoULID: 7,
    ClaveProducto: "DESA002",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Chilaquiles Verdes",
    Favorito: true,
    Descripcion: "Totopos con salsa verde, queso y crema",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    ControlStock: false,
    PrecioxUtilidadad: true,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7RA6",
    GrupoProductoULID: 7,
    ClaveProducto: "DESA003",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Hotcakes",
    Favorito: false,
    Descripcion: "3 hotcakes con miel de maple y mantequilla",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    ControlStock: false,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },

  // PRODUCTOS SUSPENDIDOS
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7RA7",
    GrupoProductoULID: 8,
    ClaveProducto: "SOPA001",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Sopa de Tortilla",
    Favorito: false,
    Descripcion: "Sopa tradicional con tortilla frita y aguacate",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    ControlStock: false,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: true,
    Comedor: true,
    ADomicilio: false,
    Mostrador: false,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7RA8",
    GrupoProductoULID: 9,
    ClaveProducto: "ANTO001",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Quesadillas",
    Favorito: false,
    Descripcion: "Quesadillas de queso con guacamole",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    ControlStock: false,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: true,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: false,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
  {
    ProductoULID: "01HKQM5Z8X9Y2W3V4U5T6S7RA9",
    GrupoProductoULID: 9,
    ClaveProducto: "ANTO002",
    TipoProducto: "Platillo" as const,
    Nombredelproducto: "Nachos",
    Favorito: false,
    Descripcion: "Totopos con queso derretido y jalapeños",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    ControlStock: true,
    PrecioxUtilidadad: false,
    Facturable: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnAPP: false,
    CanalesVenta: false,
    EnMenuQR: true,
    Fecha_UltimoCambio: new Date(),
    UsuarioULID: 1,
    EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P",
  },
]

export async function getProductos(params: SearchProductosInput) {
  try {
    const validatedParams = searchProductosSchema.parse(params)

    // Simular filtrado
    let filteredProductos = [...mockProductos]

    if (validatedParams.search) {
      const searchTerm = validatedParams.search.toLowerCase()
      filteredProductos = filteredProductos.filter(
        (p) =>
          p.Nombredelproducto.toLowerCase().includes(searchTerm) ||
          p.Descripcion?.toLowerCase().includes(searchTerm) ||
          p.ClaveProducto.toLowerCase().includes(searchTerm),
      )
    }

    if (validatedParams.tipo) {
      filteredProductos = filteredProductos.filter((p) => p.TipoProducto === validatedParams.tipo)
    }

    if (validatedParams.favorito !== undefined) {
      filteredProductos = filteredProductos.filter((p) => p.Favorito === validatedParams.favorito)
    }

    if (validatedParams.suspendido !== undefined) {
      filteredProductos = filteredProductos.filter((p) => p.Suspendido === validatedParams.suspendido)
    }

    if (validatedParams.grupoId) {
      filteredProductos = filteredProductos.filter((p) => p.GrupoProductoULID === validatedParams.grupoId)
    }

    // Simular paginación
    const total = filteredProductos.length
    const totalPages = Math.ceil(total / validatedParams.limit)
    const startIndex = (validatedParams.page - 1) * validatedParams.limit
    const endIndex = startIndex + validatedParams.limit
    const productos = filteredProductos.slice(startIndex, endIndex)

    return {
      success: true,
      data: {
        productos,
        total,
        page: validatedParams.page,
        totalPages,
        limit: validatedParams.limit,
      },
    }
  } catch (error) {
    console.error("Error getting productos:", error)
    return {
      success: false,
      message: "Error al obtener productos",
      data: {
        productos: [],
        total: 0,
        page: 1,
        totalPages: 0,
        limit: 20,
      },
    }
  }
}

export async function createProducto(data: CreateProductoInput) {
  try {
    const validatedData = createProductoSchema.parse(data)

    const newProducto: Producto = {
      ProductoULID: generateULID(),
      ...validatedData,
      Fecha_UltimoCambio: new Date(),
      Fecha_Sync: new Date(),
      UsuarioULID: 1, // En producción vendría de la sesión
      EmpresaULID: "01HKQM5Z8X9Y2W3V4U5T6S7R8P", // En producción vendría de la sesión
    }

    // Simular guardado en base de datos
    mockProductos.push(newProducto)

    revalidatePath("/productos")

    return {
      success: true,
      message: "Producto creado exitosamente",
      data: newProducto,
    }
  } catch (error) {
    console.error("Error creating producto:", error)
    return {
      success: false,
      message: "Error al crear producto",
    }
  }
}

export async function updateProducto(id: string, data: UpdateProductoInput) {
  try {
    const validatedData = updateProductoSchema.parse(data)

    const index = mockProductos.findIndex((p) => p.ProductoULID === id)
    if (index === -1) {
      return {
        success: false,
        message: "Producto no encontrado",
      }
    }

    mockProductos[index] = {
      ...mockProductos[index],
      ...validatedData,
      Fecha_UltimoCambio: new Date(),
    }

    revalidatePath("/productos")

    return {
      success: true,
      message: "Producto actualizado exitosamente",
      data: mockProductos[index],
    }
  } catch (error) {
    console.error("Error updating producto:", error)
    return {
      success: false,
      message: "Error al actualizar producto",
    }
  }
}

export async function deleteProducto(id: string) {
  try {
    const index = mockProductos.findIndex((p) => p.ProductoULID === id)
    if (index === -1) {
      return {
        success: false,
        message: "Producto no encontrado",
      }
    }

    // Eliminación suave - marcar como suspendido
    mockProductos[index].Suspendido = true
    mockProductos[index].Fecha_UltimoCambio = new Date()

    revalidatePath("/productos")

    return {
      success: true,
      message: "Producto eliminado exitosamente",
    }
  } catch (error) {
    console.error("Error deleting producto:", error)
    return {
      success: false,
      message: "Error al eliminar producto",
    }
  }
}

export async function toggleFavoriteProducto(id: string) {
  try {
    const index = mockProductos.findIndex((p) => p.ProductoULID === id)
    if (index === -1) {
      return {
        success: false,
        message: "Producto no encontrado",
      }
    }

    mockProductos[index].Favorito = !mockProductos[index].Favorito
    mockProductos[index].Fecha_UltimoCambio = new Date()

    revalidatePath("/productos")

    return {
      success: true,
      message: mockProductos[index].Favorito ? "Agregado a favoritos" : "Removido de favoritos",
    }
  } catch (error) {
    console.error("Error toggling favorite:", error)
    return {
      success: false,
      message: "Error al actualizar favorito",
    }
  }
}

export async function getGruposProductos() {
  // Mock data - En producción vendría de la base de datos
  return [
    { id: 1, nombre: "Tacos" },
    { id: 2, nombre: "Hamburguesas" },
    { id: 3, nombre: "Pizzas" },
    { id: 4, nombre: "Ensaladas" },
    { id: 5, nombre: "Bebidas" },
    { id: 6, nombre: "Postres" },
    { id: 7, nombre: "Desayunos" },
    { id: 8, nombre: "Sopas" },
    { id: 9, nombre: "Antojitos" },
  ]
}

export async function getUnidades() {
  // Mock data - En producción vendría de la base de datos
  return [
    { id: 1, nombre: "Pieza", abreviacion: "pza" },
    { id: 2, nombre: "Litro", abreviacion: "lt" },
    { id: 3, nombre: "Kilogramo", abreviacion: "kg" },
    { id: 4, nombre: "Gramo", abreviacion: "gr" },
    { id: 5, nombre: "Porción", abreviacion: "porción" },
  ]
}

export async function getAreasProduccion() {
  // Mock data - En producción vendría de la base de datos
  return [
    { id: 1, nombre: "Cocina Principal" },
    { id: 2, nombre: "Parrilla" },
    { id: 3, nombre: "Horno de Pizza" },
    { id: 4, nombre: "Ensaladas" },
    { id: 5, nombre: "Barra de Bebidas" },
    { id: 6, nombre: "Repostería" },
  ]
}

export async function getAlmacenes() {
  // Mock data - En producción vendría de la base de datos
  return [
    { id: 1, nombre: "Almacén General" },
    { id: 2, nombre: "Refrigerador" },
    { id: 3, nombre: "Congelador" },
    { id: 4, nombre: "Bodega Seca" },
  ]
}
