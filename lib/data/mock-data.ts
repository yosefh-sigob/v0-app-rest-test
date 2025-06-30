import {
  type Usuario,
  type Producto,
  type Mesa,
  type Cliente,
  type Venta,
  type Reservacion,
  type Encuesta,
  EstadoMesa,
  EstadoVenta,
  TipoVenta,
  EstadoReservacion,
} from "@/lib/types"

// Usuarios mock
export const mockUsuarios: Usuario[] = [
  {
    id: "1",
    nombre: "Juan Pérez",
    usuario: "jperez",
    correo: "juan@restaurant.com",
    puesto: "Mesero",
    esAdministrador: false,
    activo: true,
  },
  {
    id: "2",
    nombre: "María García",
    usuario: "mgarcia",
    correo: "maria@restaurant.com",
    puesto: "Cajero",
    esAdministrador: false,
    activo: true,
  },
  {
    id: "3",
    nombre: "Carlos López",
    usuario: "clopez",
    correo: "carlos@restaurant.com",
    puesto: "Administrador",
    esAdministrador: true,
    activo: true,
  },
]

// Productos mock
export const mockProductos: Producto[] = [
  {
    id: "1",
    codigo: "P001",
    nombre: "Hamburguesa Clásica",
    descripcion: "Hamburguesa de carne con lechuga, tomate y cebolla",
    precio: 120.0,
    categoria: "Hamburguesas",
    disponible: true,
    favorito: true,
  },
  {
    id: "2",
    codigo: "P002",
    nombre: "Pizza Margherita",
    descripcion: "Pizza con salsa de tomate, mozzarella y albahaca",
    precio: 180.0,
    categoria: "Pizzas",
    disponible: true,
    favorito: false,
  },
  {
    id: "3",
    codigo: "P003",
    nombre: "Ensalada César",
    descripcion: "Lechuga romana, crutones, parmesano y aderezo césar",
    precio: 95.0,
    categoria: "Ensaladas",
    disponible: true,
    favorito: false,
  },
  {
    id: "4",
    codigo: "P004",
    nombre: "Tacos al Pastor",
    descripcion: "Tres tacos de pastor con piña, cebolla y cilantro",
    precio: 85.0,
    categoria: "Tacos",
    disponible: true,
    favorito: true,
  },
  {
    id: "5",
    codigo: "P005",
    nombre: "Refresco",
    descripcion: "Bebida gaseosa 355ml",
    precio: 25.0,
    categoria: "Bebidas",
    disponible: true,
    favorito: false,
  },
]

// Mesas mock
export const mockMesas: Mesa[] = [
  {
    id: "1",
    numero: "M01",
    nombre: "Mesa 1",
    capacidad: 4,
    estado: EstadoMesa.OCUPADA,
    area: "Terraza",
    comensales: 3,
    mesero: "Juan Pérez",
    tiempoOcupada: "25 min",
    total: 450.0,
  },
  {
    id: "2",
    numero: "M02",
    nombre: "Mesa 2",
    capacidad: 2,
    estado: EstadoMesa.DISPONIBLE,
    area: "Interior",
  },
  {
    id: "3",
    numero: "M03",
    nombre: "Mesa 3",
    capacidad: 6,
    estado: EstadoMesa.RESERVADA,
    area: "Interior",
    mesero: "María García",
  },
  {
    id: "4",
    numero: "M04",
    nombre: "Mesa 4",
    capacidad: 4,
    estado: EstadoMesa.OCUPADA,
    area: "Terraza",
    comensales: 4,
    mesero: "Juan Pérez",
    tiempoOcupada: "15 min",
    total: 320.0,
  },
  {
    id: "5",
    numero: "M05",
    nombre: "Mesa 5",
    capacidad: 8,
    estado: EstadoMesa.DISPONIBLE,
    area: "Salón Principal",
  },
]

// Clientes mock
export const mockClientes: Cliente[] = [
  {
    id: "1",
    nombre: "Ana",
    apellidos: "Martínez",
    telefono: "5551234567",
    email: "ana@email.com",
    visitas: 5,
    ultimaVisita: new Date("2024-01-15"),
  },
  {
    id: "2",
    nombre: "Roberto",
    apellidos: "Sánchez",
    telefono: "5559876543",
    email: "roberto@email.com",
    visitas: 12,
    ultimaVisita: new Date("2024-01-20"),
  },
  {
    id: "3",
    nombre: "Laura",
    apellidos: "González",
    telefono: "5555555555",
    visitas: 3,
    ultimaVisita: new Date("2024-01-10"),
  },
]

// Ventas mock
export const mockVentas: Venta[] = [
  {
    id: "1",
    numero: "V001",
    mesa: "M01",
    mesero: "Juan Pérez",
    fecha: new Date(),
    estado: EstadoVenta.EN_PROCESO,
    tipo: TipoVenta.COMEDOR,
    subtotal: 400.0,
    impuestos: 64.0,
    descuentos: 0,
    propina: 50.0,
    total: 450.0,
    productos: [
      {
        id: "1",
        producto: mockProductos[0],
        cantidad: 2,
        precio: 120.0,
        total: 240.0,
      },
      {
        id: "2",
        producto: mockProductos[1],
        cantidad: 1,
        precio: 180.0,
        total: 180.0,
      },
    ],
  },
]

// Reservaciones mock
export const mockReservaciones: Reservacion[] = [
  {
    id: "1",
    cliente: mockClientes[0],
    fecha: new Date("2024-01-25"),
    hora: "19:00",
    personas: 4,
    estado: EstadoReservacion.CONFIRMADA,
    telefono: "5551234567",
    email: "ana@email.com",
    notas: "Mesa cerca de la ventana",
  },
  {
    id: "2",
    cliente: mockClientes[1],
    fecha: new Date("2024-01-26"),
    hora: "20:30",
    personas: 2,
    estado: EstadoReservacion.PENDIENTE,
    telefono: "5559876543",
    email: "roberto@email.com",
  },
]

// Encuestas mock
export const mockEncuestas: Encuesta[] = [
  {
    id: "1",
    titulo: "Satisfacción del Cliente",
    descripcion: "Encuesta post-visita para medir la satisfacción",
    activa: true,
    respuestas: 45,
    fechaCreacion: new Date("2024-01-01"),
    preguntas: [
      {
        id: "1",
        pregunta: "¿Cómo calificarías la calidad de la comida?",
        tipo: "calificacion",
        requerida: true,
        orden: 1,
      },
      {
        id: "2",
        pregunta: "¿Cómo fue el servicio?",
        tipo: "calificacion",
        requerida: true,
        orden: 2,
      },
      {
        id: "3",
        pregunta: "¿Recomendarías nuestro restaurante?",
        tipo: "si_no",
        requerida: true,
        orden: 3,
      },
    ],
  },
]

// Datos del dashboard
export const mockDashboardData = {
  ventasHoy: 12345.5,
  ordenesHoy: 89,
  clientesTotal: 1234,
  mesasOcupadas: 12,
  mesasTotal: 20,
  ventasRecientes: [
    { id: 1, mesa: "M01", orden: 1001, total: 450.0, hora: "14:30" },
    { id: 2, mesa: "M03", orden: 1002, total: 320.0, hora: "14:25" },
    { id: 3, mesa: "M07", orden: 1003, total: 180.0, hora: "14:20" },
    { id: 4, mesa: "M12", orden: 1004, total: 95.0, hora: "14:15" },
    { id: 5, mesa: "M05", orden: 1005, total: 240.0, hora: "14:10" },
  ],
}
