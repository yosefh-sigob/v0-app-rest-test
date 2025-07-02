import type { Usuario, Producto, Mesa, Cliente, Venta, Reservacion, Encuesta, CampanaSMS } from "@/lib/types"
import type { Producto as ProductoNew } from "@/interfaces/database"

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

// Productos mock expandidos con muchos más ejemplos
export const mockProductos: Producto[] = [
  // TACOS
  {
    id: "prod-001",
    name: "Tacos al Pastor",
    description: "3 tacos de trompo con piña, cebolla y cilantro",
    price: 85.0,
    category: "Tacos",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: true,
    preparationTime: 12,
    ingredients: ["Carne de cerdo", "Piña", "Cebolla", "Cilantro", "Tortilla"],
  },
  {
    id: "prod-002",
    name: "Tacos de Carnitas",
    description: "3 tacos de carnitas con cebolla y cilantro",
    price: 80.0,
    category: "Tacos",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: true,
    preparationTime: 10,
    ingredients: ["Carnitas de cerdo", "Cebolla", "Cilantro", "Tortilla"],
  },
  {
    id: "prod-003",
    name: "Tacos de Asada",
    description: "3 tacos de carne asada con guacamole",
    price: 90.0,
    category: "Tacos",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 15,
    ingredients: ["Carne de res", "Guacamole", "Cebolla", "Cilantro", "Tortilla"],
  },
  {
    id: "prod-004",
    name: "Tacos de Pollo",
    description: "3 tacos de pollo a la plancha con verduras",
    price: 75.0,
    category: "Tacos",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 12,
    ingredients: ["Pollo", "Verduras", "Cebolla", "Cilantro", "Tortilla"],
  },

  // HAMBURGUESAS
  {
    id: "prod-005",
    name: "Hamburguesa Clásica",
    description: "Carne de res, lechuga, tomate, cebolla y salsa especial",
    price: 120.0,
    category: "Hamburguesas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: true,
    preparationTime: 15,
    ingredients: ["Carne de res", "Pan", "Lechuga", "Tomate", "Cebolla", "Salsa especial"],
  },
  {
    id: "prod-006",
    name: "Hamburguesa BBQ",
    description: "Carne de res, tocino, queso cheddar y salsa BBQ",
    price: 145.0,
    category: "Hamburguesas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: true,
    preparationTime: 18,
    ingredients: ["Carne de res", "Tocino", "Queso cheddar", "Salsa BBQ", "Pan"],
  },
  {
    id: "prod-007",
    name: "Hamburguesa Hawaiana",
    description: "Carne de res, jamón, piña y queso manchego",
    price: 135.0,
    category: "Hamburguesas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 16,
    ingredients: ["Carne de res", "Jamón", "Piña", "Queso manchego", "Pan"],
  },
  {
    id: "prod-008",
    name: "Hamburguesa Vegetariana",
    description: "Hamburguesa de lentejas con verduras frescas",
    price: 110.0,
    category: "Hamburguesas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 14,
    ingredients: ["Hamburguesa de lentejas", "Lechuga", "Tomate", "Aguacate", "Pan integral"],
  },

  // PIZZAS
  {
    id: "prod-009",
    name: "Pizza Margherita",
    description: "Salsa de tomate, mozzarella fresca y albahaca",
    price: 180.0,
    category: "Pizzas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: true,
    preparationTime: 20,
    ingredients: ["Masa de pizza", "Salsa de tomate", "Mozzarella", "Albahaca"],
  },
  {
    id: "prod-010",
    name: "Pizza Pepperoni",
    description: "Salsa de tomate, mozzarella y pepperoni",
    price: 200.0,
    category: "Pizzas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: true,
    preparationTime: 22,
    ingredients: ["Masa de pizza", "Salsa de tomate", "Mozzarella", "Pepperoni"],
  },
  {
    id: "prod-011",
    name: "Pizza Hawaiana",
    description: "Salsa de tomate, mozzarella, jamón y piña",
    price: 195.0,
    category: "Pizzas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 20,
    ingredients: ["Masa de pizza", "Salsa de tomate", "Mozzarella", "Jamón", "Piña"],
  },
  {
    id: "prod-012",
    name: "Pizza Cuatro Quesos",
    description: "Mozzarella, parmesano, gorgonzola y queso de cabra",
    price: 220.0,
    category: "Pizzas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 25,
    ingredients: ["Masa de pizza", "Mozzarella", "Parmesano", "Gorgonzola", "Queso de cabra"],
  },

  // ENSALADAS
  {
    id: "prod-013",
    name: "Ensalada César",
    description: "Lechuga romana, crutones, parmesano y aderezo césar",
    price: 95.0,
    category: "Ensaladas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 10,
    ingredients: ["Lechuga romana", "Crutones", "Parmesano", "Aderezo césar"],
  },
  {
    id: "prod-014",
    name: "Ensalada Griega",
    description: "Tomate, pepino, cebolla, aceitunas y queso feta",
    price: 105.0,
    category: "Ensaladas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 8,
    ingredients: ["Tomate", "Pepino", "Cebolla", "Aceitunas", "Queso feta"],
  },
  {
    id: "prod-015",
    name: "Ensalada de Pollo",
    description: "Lechuga mixta, pollo a la plancha, aguacate y vinagreta",
    price: 125.0,
    category: "Ensaladas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: true,
    preparationTime: 12,
    ingredients: ["Lechuga mixta", "Pollo", "Aguacate", "Tomate cherry", "Vinagreta"],
  },

  // BEBIDAS
  {
    id: "prod-016",
    name: "Coca Cola",
    description: "Refresco de cola 355ml",
    price: 25.0,
    category: "Bebidas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: true,
    preparationTime: 2,
    ingredients: ["Coca Cola 355ml"],
  },
  {
    id: "prod-017",
    name: "Agua Natural",
    description: "Agua purificada 500ml",
    price: 15.0,
    category: "Bebidas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 1,
    ingredients: ["Agua purificada 500ml"],
  },
  {
    id: "prod-018",
    name: "Jugo de Naranja",
    description: "Jugo natural de naranja 300ml",
    price: 35.0,
    category: "Bebidas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: true,
    preparationTime: 5,
    ingredients: ["Naranjas frescas"],
  },
  {
    id: "prod-019",
    name: "Cerveza Corona",
    description: "Cerveza clara 355ml",
    price: 45.0,
    category: "Bebidas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 2,
    ingredients: ["Cerveza Corona 355ml"],
  },
  {
    id: "prod-020",
    name: "Limonada",
    description: "Limonada natural con hielo",
    price: 30.0,
    category: "Bebidas",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 5,
    ingredients: ["Limones", "Agua", "Azúcar", "Hielo"],
  },

  // POSTRES
  {
    id: "prod-021",
    name: "Flan Napolitano",
    description: "Flan casero con caramelo",
    price: 55.0,
    category: "Postres",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: true,
    preparationTime: 5,
    ingredients: ["Leche", "Huevos", "Azúcar", "Vainilla"],
  },
  {
    id: "prod-022",
    name: "Pastel de Chocolate",
    description: "Rebanada de pastel de chocolate con betún",
    price: 65.0,
    category: "Postres",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: true,
    preparationTime: 3,
    ingredients: ["Pastel de chocolate", "Betún de chocolate", "Decoración"],
  },
  {
    id: "prod-023",
    name: "Helado de Vainilla",
    description: "2 bolas de helado de vainilla",
    price: 40.0,
    category: "Postres",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 2,
    ingredients: ["Helado de vainilla", "Decoración"],
  },
  {
    id: "prod-024",
    name: "Cheesecake",
    description: "Rebanada de cheesecake de fresa",
    price: 70.0,
    category: "Postres",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 5,
    ingredients: ["Cheesecake", "Mermelada de fresa", "Galleta"],
  },

  // DESAYUNOS
  {
    id: "prod-025",
    name: "Huevos Rancheros",
    description: "Huevos estrellados con salsa ranchera y frijoles",
    price: 85.0,
    category: "Desayunos",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: true,
    preparationTime: 15,
    ingredients: ["Huevos", "Salsa ranchera", "Frijoles", "Tortillas"],
  },
  {
    id: "prod-026",
    name: "Chilaquiles Verdes",
    description: "Totopos con salsa verde, queso y crema",
    price: 75.0,
    category: "Desayunos",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: true,
    preparationTime: 12,
    ingredients: ["Totopos", "Salsa verde", "Queso", "Crema", "Cebolla"],
  },
  {
    id: "prod-027",
    name: "Hotcakes",
    description: "3 hotcakes con miel de maple y mantequilla",
    price: 65.0,
    category: "Desayunos",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 10,
    ingredients: ["Harina", "Huevos", "Leche", "Miel de maple", "Mantequilla"],
  },

  // PRODUCTOS SUSPENDIDOS
  {
    id: "prod-028",
    name: "Sopa de Tortilla",
    description: "Sopa tradicional con tortilla frita y aguacate",
    price: 60.0,
    category: "Sopas",
    image: "/placeholder.svg?height=150&width=150",
    available: false,
    favorite: false,
    preparationTime: 15,
    ingredients: ["Caldo de pollo", "Tortilla", "Aguacate", "Queso", "Chile"],
  },
  {
    id: "prod-029",
    name: "Quesadillas",
    description: "Quesadillas de queso con guacamole",
    price: 55.0,
    category: "Antojitos",
    image: "/placeholder.svg?height=150&width=150",
    available: false,
    favorite: false,
    preparationTime: 8,
    ingredients: ["Tortilla", "Queso", "Guacamole"],
  },
  {
    id: "prod-030",
    name: "Nachos",
    description: "Totopos con queso derretido y jalapeños",
    price: 70.0,
    category: "Antojitos",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    favorite: false,
    preparationTime: 8,
    ingredients: ["Totopos", "Queso", "Jalapeños", "Crema", "Guacamole"],
  },
]

// Mesas mock
export const mockMesas: Mesa[] = [
  {
    id: 1,
    number: 1,
    capacity: 4,
    status: "disponible",
    area: "Terraza",
    notes: "",
    lastCleaned: "14:30",
  },
  {
    id: 2,
    number: 2,
    capacity: 2,
    status: "ocupada",
    waiter: "Ana García",
    order: { id: "ORD-001", total: 156, items: 3, time: "45 min" },
    area: "Interior",
    notes: "Cliente VIP",
    lastCleaned: "13:15",
  },
  {
    id: 3,
    number: 3,
    capacity: 6,
    status: "reservada",
    waiter: "María García",
    order: null,
    area: "Interior",
    notes: "",
    lastCleaned: "",
  },
  {
    id: 4,
    number: 4,
    capacity: 4,
    status: "ocupada",
    waiter: "Juan Pérez",
    order: { id: "ORD-002", total: 320, items: 2, time: "15 min" },
    area: "Terraza",
    notes: "",
    lastCleaned: "",
  },
  {
    id: 5,
    number: 5,
    capacity: 8,
    status: "disponible",
    waiter: "",
    order: null,
    area: "Salón Principal",
    notes: "",
    lastCleaned: "",
  },
]

// Clientes mock
export const mockClientes: Cliente[] = [
  {
    id: "cli-001",
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+1 555-0123",
    visits: 15,
    totalSpent: 450.75,
    lastVisit: "2024-01-15",
    vip: true,
    preferences: ["Sin cebolla", "Extra queso"],
    notes: "Cliente frecuente, prefiere mesa junto a la ventana",
  },
  {
    id: "cli-002",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    phone: "+1 555-0124",
    visits: 8,
    totalSpent: 220.3,
    lastVisit: "2024-01-12",
    vip: false,
    preferences: ["Vegetariano"],
    notes: "Alérgico a los mariscos",
  },
  {
    id: "1",
    name: "Ana",
    email: "ana@email.com",
    phone: "5551234567",
    visits: 5,
    totalSpent: 0,
    lastVisit: "2024-01-15",
    vip: false,
    preferences: [],
    notes: "",
  },
  {
    id: "2",
    name: "Roberto",
    email: "roberto@email.com",
    phone: "5559876543",
    visits: 12,
    totalSpent: 0,
    lastVisit: "2024-01-20",
    vip: false,
    preferences: [],
    notes: "",
  },
  {
    id: "3",
    name: "Laura",
    email: "laura@email.com",
    phone: "5555555555",
    visits: 3,
    totalSpent: 0,
    lastVisit: "2024-01-10",
    vip: false,
    preferences: [],
    notes: "",
  },
]

// Ventas mock
export const mockVentas: Venta[] = [
  {
    id: "1",
    number: "V001",
    table: "M01",
    waiter: "Juan Pérez",
    date: new Date(),
    status: "en_proceso",
    type: "comedor",
    subtotal: 400.0,
    taxes: 64.0,
    discounts: 0,
    tip: 50.0,
    total: 450.0,
    items: [
      {
        id: "1",
        product: mockProductos[0],
        quantity: 2,
        price: 120.0,
        total: 240.0,
      },
      {
        id: "2",
        product: mockProductos[1],
        quantity: 1,
        price: 180.0,
        total: 180.0,
      },
    ],
  },
]

// Reservaciones mock
export const mockReservaciones: Reservacion[] = [
  {
    id: "res-001",
    customerName: "Ana Martínez",
    customerPhone: "+1 555-0125",
    date: "2024-01-20",
    time: "19:30",
    guests: 4,
    table: 5,
    status: "confirmada",
    notes: "Celebración de aniversario",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "res-002",
    customerName: "Luis Fernández",
    customerPhone: "+1 555-0126",
    date: "2024-01-20",
    time: "20:00",
    guests: 2,
    status: "pendiente",
    notes: "Primera cita",
    createdAt: "2024-01-16T14:20:00Z",
  },
  {
    id: "1",
    cliente: mockClientes[0],
    fecha: new Date("2024-01-25"),
    hora: "19:00",
    personas: 4,
    estado: "confirmada",
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
    estado: "pendiente",
    telefono: "5559876543",
    email: "roberto@email.com",
  },
]

// Encuestas mock
export const mockEncuestas: Encuesta[] = [
  {
    id: "enc-001",
    title: "Satisfacción del Servicio",
    description: "Encuesta para evaluar la calidad del servicio",
    questions: [
      {
        id: "q1",
        type: "rating",
        question: "¿Cómo calificarías la calidad de la comida?",
        required: true,
      },
      {
        id: "q2",
        type: "rating",
        question: "¿Cómo calificarías la atención del mesero?",
        required: true,
      },
      {
        id: "q3",
        type: "multiple",
        question: "¿Qué te gustó más de tu visita?",
        options: ["La comida", "El servicio", "El ambiente", "Los precios"],
        required: false,
      },
    ],
    active: true,
    responses: 45,
    createdAt: "2024-01-10T09:00:00Z",
  },
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

// Campanas SMS mock
export const mockCampanasSMS: CampanaSMS[] = [
  {
    id: "sms-001",
    name: "Promoción Fin de Semana",
    message: "¡Descuento del 20% en todas las pizzas este fin de semana! Reserva ya.",
    recipients: 150,
    sent: 150,
    delivered: 145,
    responses: 23,
    status: "completed",
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "sms-002",
    name: "Encuesta de Satisfacción",
    message: "Ayúdanos a mejorar. Completa nuestra encuesta: link.com/encuesta",
    recipients: 200,
    sent: 180,
    delivered: 175,
    responses: 67,
    status: "sending",
    createdAt: "2024-01-16T10:30:00Z",
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

// Datos simulados de productos
export const MOCK_PRODUCTOS: ProductoNew[] = [
  {
    ProductoULID: "01HN123456789ABCDEFGHIJ",
    ClaveProducto: "PLAT001",
    Nombredelproducto: "Hamburguesa Clásica",
    Descripcion: "Hamburguesa de carne de res con lechuga, tomate, cebolla y salsa especial",
    TipoProducto: "Platillo",
    GrupoProductoId: 1,
    UnidadId: 1,
    AreaProduccionId: 1,
    AlmacenId: 1,
    Favorito: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnMenuQR: true,
    FechaCreacion: new Date("2024-01-15"),
    FechaActualizacion: new Date("2024-01-20"),
  },
  {
    ProductoULID: "01HN123456789ABCDEFGHIK",
    ClaveProducto: "PLAT002",
    Nombredelproducto: "Pizza Margherita",
    Descripcion: "Pizza tradicional con salsa de tomate, mozzarella fresca y albahaca",
    TipoProducto: "Platillo",
    GrupoProductoId: 2,
    UnidadId: 1,
    AreaProduccionId: 2,
    AlmacenId: 1,
    Favorito: false,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: true,
    EnMenuQR: true,
    FechaCreacion: new Date("2024-01-16"),
    FechaActualizacion: new Date("2024-01-21"),
  },
  {
    ProductoULID: "01HN123456789ABCDEFGHIL",
    ClaveProducto: "BEB001",
    Nombredelproducto: "Coca Cola",
    Descripcion: "Refresco de cola 355ml",
    TipoProducto: "Producto",
    GrupoProductoId: 3,
    UnidadId: 2,
    AreaProduccionId: 3,
    AlmacenId: 2,
    Favorito: false,
    Suspendido: false,
    Comedor: true,
    ADomicilio: true,
    Mostrador: true,
    Enlinea: false,
    EnMenuQR: true,
    FechaCreacion: new Date("2024-01-17"),
    FechaActualizacion: new Date("2024-01-22"),
  },
  {
    ProductoULID: "01HN123456789ABCDEFGHIM",
    ClaveProducto: "VINO001",
    Nombredelproducto: "Vino Tinto Reserva",
    Descripcion: "Vino tinto de la casa, cosecha 2020",
    TipoProducto: "Botella",
    GrupoProductoId: 4,
    UnidadId: 3,
    AreaProduccionId: 3,
    AlmacenId: 2,
    Favorito: true,
    Suspendido: false,
    Comedor: true,
    ADomicilio: false,
    Mostrador: true,
    Enlinea: false,
    EnMenuQR: true,
    FechaCreacion: new Date("2024-01-18"),
    FechaActualizacion: new Date("2024-01-23"),
  },
  {
    ProductoULID: "01HN123456789ABCDEFGHIN",
    ClaveProducto: "PLAT003",
    Nombredelproducto: "Ensalada César",
    Descripcion: "Ensalada fresca con lechuga romana, crutones, parmesano y aderezo césar",
    TipoProducto: "Platillo",
    GrupoProductoId: 5,
    UnidadId: 1,
    AreaProduccionId: 1,
    AlmacenId: 1,
    Favorito: false,
    Suspendido: true,
    Comedor: true,
    ADomicilio: true,
    Mostrador: false,
    Enlinea: true,
    EnMenuQR: false,
    FechaCreacion: new Date("2024-01-19"),
    FechaActualizacion: new Date("2024-01-24"),
  },
]

// Datos simulados de grupos de productos
export const MOCK_GRUPOS_PRODUCTOS = [
  { id: 1, nombre: "Hamburguesas" },
  { id: 2, nombre: "Pizzas" },
  { id: 3, nombre: "Bebidas" },
  { id: 4, nombre: "Vinos" },
  { id: 5, nombre: "Ensaladas" },
  { id: 6, nombre: "Postres" },
  { id: 7, nombre: "Entradas" },
  { id: 8, nombre: "Platos Principales" },
]

// Datos simulados de unidades
export const MOCK_UNIDADES = [
  { id: 1, nombre: "Pieza", abreviacion: "pza" },
  { id: 2, nombre: "Litro", abreviacion: "lt" },
  { id: 3, nombre: "Botella", abreviacion: "bot" },
  { id: 4, nombre: "Kilogramo", abreviacion: "kg" },
  { id: 5, nombre: "Gramo", abreviacion: "gr" },
]

// Datos simulados de áreas de producción
export const MOCK_AREAS_PRODUCCION = [
  { id: 1, nombre: "Cocina Principal" },
  { id: 2, nombre: "Horno de Pizza" },
  { id: 3, nombre: "Bar" },
  { id: 4, nombre: "Parrilla" },
  { id: 5, nombre: "Repostería" },
]

// Datos simulados de almacenes
export const MOCK_ALMACENES = [
  { id: 1, nombre: "Almacén Principal" },
  { id: 2, nombre: "Bodega de Bebidas" },
  { id: 3, nombre: "Cámara Fría" },
  { id: 4, nombre: "Despensa Seca" },
]

// Función para simular búsqueda y filtrado
export function searchProductos(filters: {
  search?: string
  tipo?: string
  favorito?: boolean
  suspendido?: boolean
  grupoId?: number
  page?: number
  limit?: number
}) {
  let filteredProducts = [...MOCK_PRODUCTOS]

  // Filtro por búsqueda
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (producto) =>
        producto.Nombredelproducto.toLowerCase().includes(searchTerm) ||
        producto.ClaveProducto.toLowerCase().includes(searchTerm) ||
        producto.Descripcion?.toLowerCase().includes(searchTerm),
    )
  }

  // Filtro por tipo
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
    filteredProducts = filteredProducts.filter((producto) => producto.GrupoProductoId === filters.grupoId)
  }

  // Paginación
  const page = filters.page || 1
  const limit = filters.limit || 20
  const total = filteredProducts.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const productos = filteredProducts.slice(startIndex, endIndex)

  return {
    productos,
    total,
    page,
    totalPages,
    limit,
  }
}
