import type { Empresa, Usuario } from "@/interfaces/empresa.interface"
import type { Producto, GrupoProducto } from "@/interfaces/productos.interface"
import type { Mesa, AreaVentas, TipoMesa } from "@/interfaces/mesas.interface"
import type { Cliente } from "@/interfaces/clientes.interface"
import type { Reservacion } from "@/interfaces/reservaciones.interface"
import type { Venta } from "@/interfaces/ventas.interface"
import { TipoEmpresa, TipoProducto, CanalReservacion, EstadoReservacion, EstadoVenta, TipoVenta } from "@/interfaces"

// Datos mock para la empresa
export const mockEmpresa: Empresa = {
  EmpresaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3C",
  NombreRestaurante: "Restaurante El Buen Sabor",
  Esquema: "restaurant_schema",
  Licencia: "PRO",
  TipoEmpresa: TipoEmpresa.UNICA,
  FechaRegistro: new Date("2024-01-01"),
  Fecha_UltimoCambio: new Date(),
  Fecha_Sync: new Date(),
  UsuarioULID: 1,
}

// Datos mock para usuarios
export const mockUsuarios: Usuario[] = [
  {
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3D",
    NombreCompleto: "Juan Carlos Pérez",
    Usuario: "admin",
    Correo: "admin@restaurante.com",
    Contraseña: "123456",
    PIN: "1234",
    Celular: "5551234567",
    Puesto: "Administrador",
    EsAdministrador: true,
    Suspendido: false,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
  {
    UsuarioULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3E",
    NombreCompleto: "María González",
    Usuario: "mesero1",
    Correo: "maria@restaurante.com",
    Contraseña: "123456",
    PIN: "2345",
    Celular: "5551234568",
    Puesto: "Mesero",
    EsAdministrador: false,
    Suspendido: false,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
]

// Datos mock para grupos de productos
export const mockGruposProductos: GrupoProducto[] = [
  {
    GrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3F",
    Clave: "PLATOS",
    Orden: "001",
    Descripcion: "Platos Principales",
    Clasificacion: "Comida",
    MenuQR: true,
    CatalogoOnline: true,
    APPComensal: true,
    Inactiva: false,
    Paletacolor: "#d97706",
    Imagen: "/placeholder.svg?height=100&width=100",
    Sucursales: true,
    AplicarComentarios: true,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
  {
    GrupoProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3G",
    Clave: "BEBIDAS",
    Orden: "002",
    Descripcion: "Bebidas",
    Clasificacion: "Bebidas",
    MenuQR: true,
    CatalogoOnline: true,
    APPComensal: true,
    Inactiva: false,
    Paletacolor: "#0ea5e9",
    Imagen: "/placeholder.svg?height=100&width=100",
    Sucursales: true,
    AplicarComentarios: false,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
]

// Datos mock para productos
export const mockProductos: Producto[] = [
  {
    ProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3H",
    GrupoProductoULID: 1,
    SubgrupoProductoULID: 1,
    ClaveProducto: "TACO001",
    TipoProducto: TipoProducto.PLATILLO,
    Nombredelproducto: "Tacos al Pastor",
    Favorito: true,
    Descripcion: "Deliciosos tacos al pastor con piña",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    AlmacenULID: 1,
    ControlStock: true,
    PrecioxUtilidad: false,
    Facturable: true,
    ClaveTributaria: "50211503",
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnAPP: true,
    CanalesVenta: true,
    EnMenuQR: true,
    ClasificacionQRULID: 1,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
  {
    ProductoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3I",
    GrupoProductoULID: 1,
    SubgrupoProductoULID: 1,
    ClaveProducto: "ENCH001",
    TipoProducto: TipoProducto.PLATILLO,
    Nombredelproducto: "Enchiladas Verdes",
    Favorito: true,
    Descripcion: "Enchiladas bañadas en salsa verde",
    ExentoImpuesto: false,
    PrecioAbierto: false,
    UnidadesULID: 1,
    AreaProduccionULID: 1,
    AlmacenULID: 1,
    ControlStock: true,
    PrecioxUtilidad: false,
    Facturable: true,
    ClaveTributaria: "50211503",
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnAPP: true,
    CanalesVenta: true,
    EnMenuQR: true,
    ClasificacionQRULID: 1,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
]

// Datos mock para tipos de mesa
export const mockTiposMesa: TipoMesa[] = [
  {
    TipoMesaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3J",
    Descripcion: "Mesa Redonda",
    NumeroComensales: 4,
    NumeroMaxComensales: 6,
    Icono: "circle",
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
  {
    TipoMesaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3K",
    Descripcion: "Mesa Rectangular",
    NumeroComensales: 6,
    NumeroMaxComensales: 8,
    Icono: "rectangle",
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
]

// Datos mock para áreas de ventas
export const mockAreasVentas: AreaVentas[] = [
  {
    AreaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3L",
    PlanoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3M",
    Descripcion: "Terraza",
    Fumar: true,
    Exterior: true,
    Barra: false,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
  {
    AreaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3N",
    PlanoULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3M",
    Descripcion: "Salón Principal",
    Fumar: false,
    Exterior: false,
    Barra: false,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
]

// Datos mock para mesas
export const mockMesas: Mesa[] = [
  {
    MesaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3O",
    ClaveMesa: "T01",
    NombreMesa: "Terraza 1",
    TipoMesaULID: 1,
    AreaVentasULID: 1,
    ComensalesMaximos: 4,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
  {
    MesaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3P",
    ClaveMesa: "S01",
    NombreMesa: "Salón 1",
    TipoMesaULID: 2,
    AreaVentasULID: 2,
    ComensalesMaximos: 6,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
]

// Datos mock para clientes
export const mockClientes: Cliente[] = [
  {
    ClienteULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3Q",
    Celular: "5551234567",
    Nombres: "Ana",
    Apellidos: "García López",
    NombreCorto: "Ana G.",
    NotasEspeciales: "Alérgica a mariscos",
    FechaNacimiento: new Date("1985-05-15"),
    Correo: "ana.garcia@email.com",
    Comentarios: "Cliente frecuente, prefiere mesa en terraza",
    LimitedeCredito: 1000,
    DiasdeCredito: 30,
    SaldodeCredito: 0,
    Suspendido: false,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
]

// Datos mock para reservaciones
export const mockReservaciones: Reservacion[] = [
  {
    ReservacionULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3R",
    CanalReservacion: CanalReservacion.TELEFONO,
    ComisionistaULID: 1,
    TipoReservacionULID: 1,
    ListadeEspera: false,
    Niños: true,
    CantidadNiños: 2,
    Mascotas: false,
    SilladeRuedas: false,
    SillaBebe: true,
    ClienteULID: 1,
    ClienteNombre: "Ana García López",
    PaisCelular: "+52",
    ClienteCelular: "5551234567",
    ClienteCorreo: "ana.garcia@email.com",
    NumeroPersonas: 4,
    Notas: "Mesa en terraza, celebración cumpleaños",
    MesaULID: 1,
    FechaReservacion: new Date(),
    HoraReservacion: "19:00",
    TiempodeEspera: 15,
    EstadoReservacion: EstadoReservacion.CONFIRMADA,
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    UsuarioULID: 1,
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
]

// Datos mock para ventas
export const mockVentas: Venta[] = [
  {
    VentaULID: "01HKQM5X8P9R2T4V6W8Y0Z1A3S",
    TurnoULID: 1,
    CanalULID: 1,
    EstadoVenta: EstadoVenta.EN_PROCESO,
    NumCuenta: "001",
    TipoVenta: TipoVenta.COMEDOR,
    TipoDescuentoULID: 0,
    AreaULID: 1,
    Personas: 4,
    FechaApertura: new Date(),
    Cancelada: false,
    UsuarioULID: 1,
    Impresa: false,
    MesaULID: 1,
    MeseroULID: 2,
    Subtotal: 450.0,
    CostoReparto: 0,
    Comisiones: 0,
    ImpuestoULID: 1,
    Descuentos: 0,
    TotalPropina: 50.0,
    Total: 500.0,
    Saldo: 500.0,
    EstadoCuenta: "Abierta",
    Fecha_UltimoCambio: new Date(),
    Fecha_Sync: new Date(),
    EmpresaULID: mockEmpresa.EmpresaULID,
  },
]

// Estados de mesa para la vista
export const estadosMesa = [
  { id: "disponible", label: "Disponible", color: "bg-green-500", count: 8 },
  { id: "ocupada", label: "Ocupada", color: "bg-red-500", count: 12 },
  { id: "reservada", label: "Reservada", color: "bg-yellow-500", count: 3 },
  { id: "limpieza", label: "Limpieza", color: "bg-blue-500", count: 2 },
]

// Estadísticas del dashboard
export const mockEstadisticas = {
  ventasHoy: 15420.5,
  ordenesActivas: 23,
  clientesHoy: 87,
  mesasOcupadas: 12,
  totalMesas: 25,
  promedioTicket: 385.5,
  ventasSemana: 98750.25,
  clientesNuevos: 15,
}
