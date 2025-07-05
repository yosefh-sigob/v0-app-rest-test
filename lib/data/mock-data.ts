import { generateULID } from "@/lib/utils/ulid"

// Interfaces para los datos mock
export interface HistorialVisita {
  fecha: string
  mesa: string
  consumo: number
  platillos: string[]
}

export interface Direccion {
  calle: string
  colonia: string
  ciudad: string
  codigoPostal: string
  estado: string
}

export interface Preferencias {
  tipoComida: string[]
  alergias: string[]
  ocasionesEspeciales: string[]
}

export interface Cliente {
  id: string
  nombre: string
  apellidos: string
  telefono: string
  email: string
  fechaNacimiento: string
  direccion: Direccion
  preferencias: Preferencias
  historialVisitas: HistorialVisita[]
  puntos: number
  nivelFidelidad: "Bronce" | "Plata" | "Oro" | "Platino"
  fechaRegistro: string
  activo: boolean
  notas: string
}

export interface Producto {
  id: string
  clave: string
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  subcategoria?: string
  disponible: boolean
  favorito: boolean
  suspendido: boolean
  imagen?: string
  tipoProducto: "Platillo" | "Producto" | "Botilla"
  unidad: string
  stock?: number
  stockMinimo?: number
  ingredientes?: string[]
  tiempoPreparacion?: number
  calorias?: number
  tags?: string[]
}

export interface Mesa {
  id: string
  numero: string
  capacidad: number
  area: string
  estado: "Disponible" | "Ocupada" | "Reservada" | "Limpieza"
  ubicacion: string
  tipo: "Regular" | "VIP" | "Terraza" | "Barra"
}

export interface ProductoVenta {
  id: string
  producto: Producto
  cantidad: number
  precio: number
  total: number
  modificaciones?: string[]
  notas?: string
}

// Mock data para productos
export const mockProductos: Producto[] = [
  {
    id: generateULID(),
    clave: "TAC001",
    nombre: "Tacos al Pastor",
    descripcion: "Deliciosos tacos al pastor con piña, cebolla y cilantro",
    precio: 85.0,
    categoria: "Tacos",
    subcategoria: "Tacos de Carne",
    disponible: true,
    favorito: true,
    suspendido: false,
    imagen: "/placeholder.svg?height=200&width=200",
    tipoProducto: "Platillo",
    unidad: "Orden",
    stock: 50,
    stockMinimo: 10,
    ingredientes: ["Carne de cerdo", "Piña", "Cebolla", "Cilantro", "Tortilla"],
    tiempoPreparacion: 8,
    calorias: 320,
    tags: ["Mexicano", "Picante", "Popular"],
  },
  {
    id: generateULID(),
    clave: "HAM001",
    nombre: "Hamburguesa Clásica",
    descripcion: "Hamburguesa con carne de res, lechuga, tomate, cebolla y queso",
    precio: 125.0,
    categoria: "Hamburguesas",
    disponible: true,
    favorito: false,
    suspendido: false,
    imagen: "/placeholder.svg?height=200&width=200",
    tipoProducto: "Platillo",
    unidad: "Pieza",
    stock: 30,
    stockMinimo: 5,
    ingredientes: ["Carne de res", "Pan", "Lechuga", "Tomate", "Cebolla", "Queso"],
    tiempoPreparacion: 12,
    calorias: 580,
    tags: ["Americano", "Carne"],
  },
  {
    id: generateULID(),
    clave: "PIZ001",
    nombre: "Pizza Margherita",
    descripcion: "Pizza tradicional con salsa de tomate, mozzarella y albahaca",
    precio: 180.0,
    categoria: "Pizzas",
    disponible: true,
    favorito: true,
    suspendido: false,
    imagen: "/placeholder.svg?height=200&width=200",
    tipoProducto: "Platillo",
    unidad: "Pieza",
    stock: 25,
    stockMinimo: 5,
    ingredientes: ["Masa", "Salsa de tomate", "Mozzarella", "Albahaca"],
    tiempoPreparacion: 15,
    calorias: 450,
    tags: ["Italiano", "Vegetariano"],
  },
  {
    id: generateULID(),
    clave: "ENS001",
    nombre: "Ensalada César",
    descripcion: "Ensalada fresca con lechuga romana, crutones, parmesano y aderezo césar",
    precio: 95.0,
    categoria: "Ensaladas",
    disponible: true,
    favorito: false,
    suspendido: false,
    imagen: "/placeholder.svg?height=200&width=200",
    tipoProducto: "Platillo",
    unidad: "Porción",
    stock: 40,
    stockMinimo: 8,
    ingredientes: ["Lechuga romana", "Crutones", "Queso parmesano", "Aderezo césar"],
    tiempoPreparacion: 5,
    calorias: 280,
    tags: ["Saludable", "Vegetariano", "Fresco"],
  },
  {
    id: generateULID(),
    clave: "PAS001",
    nombre: "Pasta Alfredo",
    descripción: "Pasta fettuccine con salsa alfredo cremosa",
    precio: 140.0,
    categoria: "Pastas",
    disponible: true,
    favorito: false,
    suspendido: false,
    imagen: "/placeholder.svg?height=200&width=200",
    tipoProducto: "Platillo",
    unidad: "Porción",
    stock: 35,
    stockMinimo: 7,
    ingredientes: ["Pasta fettuccine", "Crema", "Mantequilla", "Queso parmesano"],
    tiempoPreparacion: 10,
    calorias: 520,
    tags: ["Italiano", "Cremoso"],
  },
  {
    id: generateULID(),
    clave: "BEB001",
    nombre: "Coca Cola",
    descripcion: "Refresco de cola 355ml",
    precio: 35.0,
    categoria: "Bebidas",
    subcategoria: "Refrescos",
    disponible: true,
    favorito: false,
    suspendido: false,
    imagen: "/placeholder.svg?height=200&width=200",
    tipoProducto: "Producto",
    unidad: "Botella",
    stock: 100,
    stockMinimo: 20,
    calorias: 140,
    tags: ["Refresco", "Frio"],
  },
  {
    id: generateULID(),
    clave: "BEB002",
    nombre: "Agua Natural",
    descripcion: "Agua natural 500ml",
    precio: 25.0,
    categoria: "Bebidas",
    subcategoria: "Agua",
    disponible: true,
    favorito: false,
    suspendido: false,
    imagen: "/placeholder.svg?height=200&width=200",
    tipoProducto: "Producto",
    unidad: "Botella",
    stock: 80,
    stockMinimo: 15,
    calorias: 0,
    tags: ["Natural", "Saludable"],
  },
  {
    id: generateULID(),
    clave: "QUE001",
    nombre: "Quesadilla",
    descripcion: "Quesadilla de queso con tortilla de harina",
    precio: 65.0,
    categoria: "Antojitos",
    disponible: true,
    favorito: true,
    suspendido: false,
    imagen: "/placeholder.svg?height=200&width=200",
    tipoProducto: "Platillo",
    unidad: "Pieza",
    stock: 45,
    stockMinimo: 10,
    ingredientes: ["Tortilla de harina", "Queso Oaxaca"],
    tiempoPreparacion: 6,
    calorias: 380,
    tags: ["Mexicano", "Queso"],
  },
]

// Mock data para clientes
export const mockClientes: Cliente[] = [
  {
    id: generateULID(),
    nombre: "Juan Carlos",
    apellidos: "García López",
    telefono: "5551234567",
    email: "juan.garcia@email.com",
    fechaNacimiento: "1985-03-15",
    direccion: {
      calle: "Av. Reforma 123",
      colonia: "Centro",
      ciudad: "Ciudad de México",
      codigoPostal: "06000",
      estado: "CDMX",
    },
    preferencias: {
      tipoComida: ["Mexicana", "Italiana"],
      alergias: [],
      ocasionesEspeciales: ["Cumpleaños"],
    },
    historialVisitas: [
      {
        fecha: "2024-01-15",
        mesa: "Mesa 5",
        consumo: 850.0,
        platillos: ["Tacos al Pastor", "Agua de Horchata"],
      },
      {
        fecha: "2024-01-08",
        mesa: "Mesa 2",
        consumo: 650.0,
        platillos: ["Quesadillas", "Refresco"],
      },
    ],
    puntos: 125,
    nivelFidelidad: "Bronce",
    fechaRegistro: "2023-12-01",
    activo: true,
    notas: "Cliente frecuente, prefiere mesa cerca de la ventana",
  },
  {
    id: generateULID(),
    nombre: "María Elena",
    apellidos: "Rodríguez Martínez",
    telefono: "5559876543",
    email: "maria.rodriguez@email.com",
    fechaNacimiento: "1990-07-22",
    direccion: {
      calle: "Calle Madero 456",
      colonia: "Roma Norte",
      ciudad: "Ciudad de México",
      codigoPostal: "06700",
      estado: "CDMX",
    },
    preferencias: {
      tipoComida: ["Vegetariana", "Saludable"],
      alergias: ["Mariscos"],
      ocasionesEspeciales: ["Aniversario"],
    },
    historialVisitas: [
      {
        fecha: "2024-01-12",
        mesa: "Mesa 8",
        consumo: 720.0,
        platillos: ["Ensalada César", "Agua Natural"],
      },
    ],
    puntos: 89,
    nivelFidelidad: "Bronce",
    fechaRegistro: "2024-01-05",
    activo: true,
    notas: "Vegetariana estricta, alérgica a mariscos",
  },
  {
    id: generateULID(),
    nombre: "Carlos Alberto",
    apellidos: "Hernández Silva",
    telefono: "5556547890",
    email: "carlos.hernandez@email.com",
    fechaNacimiento: "1978-11-30",
    direccion: {
      calle: "Insurgentes Sur 789",
      colonia: "Del Valle",
      ciudad: "Ciudad de México",
      codigoPostal: "03100",
      estado: "CDMX",
    },
    preferencias: {
      tipoComida: ["Mexicana", "Mariscos"],
      alergias: [],
      ocasionesEspeciales: ["Reuniones de trabajo"],
    },
    historialVisitas: [
      {
        fecha: "2024-01-10",
        mesa: "Mesa 12",
        consumo: 1250.0,
        platillos: ["Parrillada Mixta", "Cerveza", "Flan"],
      },
      {
        fecha: "2024-01-03",
        mesa: "Mesa 15",
        consumo: 980.0,
        platillos: ["Ceviche", "Tacos de Pescado", "Margarita"],
      },
      {
        fecha: "2023-12-28",
        mesa: "Mesa 10",
        consumo: 1100.0,
        platillos: ["Molcajete", "Michelada"],
      },
    ],
    puntos: 245,
    nivelFidelidad: "Plata",
    fechaRegistro: "2023-11-15",
    activo: true,
    notas: "Cliente VIP, suele venir con clientes de trabajo",
  },
  {
    id: generateULID(),
    nombre: "Ana Patricia",
    apellidos: "López Fernández",
    telefono: "5553216549",
    email: "ana.lopez@email.com",
    fechaNacimiento: "1995-04-18",
    direccion: {
      calle: "Polanco 321",
      colonia: "Polanco",
      ciudad: "Ciudad de México",
      codigoPostal: "11560",
      estado: "CDMX",
    },
    preferencias: {
      tipoComida: ["Internacional", "Postres"],
      alergias: ["Nueces"],
      ocasionesEspeciales: ["Citas románticas"],
    },
    historialVisitas: [
      {
        fecha: "2024-01-14",
        mesa: "Mesa 3",
        consumo: 450.0,
        platillos: ["Pasta Alfredo", "Vino Tinto"],
      },
    ],
    puntos: 67,
    nivelFidelidad: "Bronce",
    fechaRegistro: "2024-01-10",
    activo: true,
    notas: "Alérgica a nueces, prefiere ambiente romántico",
  },
  {
    id: generateULID(),
    nombre: "Roberto",
    apellidos: "Sánchez Morales",
    telefono: "5557894561",
    email: "roberto.sanchez@email.com",
    fechaNacimiento: "1982-09-05",
    direccion: {
      calle: "Av. Universidad 654",
      colonia: "Coyoacán",
      ciudad: "Ciudad de México",
      codigoPostal: "04000",
      estado: "CDMX",
    },
    preferencias: {
      tipoComida: ["Mexicana", "Picante"],
      alergias: [],
      ocasionesEspeciales: ["Fútbol", "Reuniones familiares"],
    },
    historialVisitas: [
      {
        fecha: "2024-01-13",
        mesa: "Mesa 20",
        consumo: 890.0,
        platillos: ["Alitas Búfalo", "Cerveza", "Nachos"],
      },
      {
        fecha: "2024-01-06",
        mesa: "Mesa 18",
        consumo: 1050.0,
        platillos: ["Parrillada Familiar", "Refrescos"],
      },
    ],
    puntos: 156,
    nivelFidelidad: "Bronce",
    fechaRegistro: "2023-12-20",
    activo: true,
    notas: "Viene a ver partidos de fútbol, le gusta la comida picante",
  },
]

// Mock data para mesas
export const mockMesas: Mesa[] = [
  {
    id: generateULID(),
    numero: "1",
    capacidad: 2,
    area: "Terraza",
    estado: "Disponible",
    ubicacion: "Terraza - Esquina",
    tipo: "Terraza",
  },
  {
    id: generateULID(),
    numero: "2",
    capacidad: 4,
    area: "Salón Principal",
    estado: "Ocupada",
    ubicacion: "Salón - Centro",
    tipo: "Regular",
  },
  {
    id: generateULID(),
    numero: "3",
    capacidad: 2,
    area: "Salón Principal",
    estado: "Disponible",
    ubicacion: "Salón - Ventana",
    tipo: "Regular",
  },
  {
    id: generateULID(),
    numero: "4",
    capacidad: 6,
    area: "Salón Principal",
    estado: "Reservada",
    ubicacion: "Salón - Lateral",
    tipo: "Regular",
  },
  {
    id: generateULID(),
    numero: "5",
    capacidad: 8,
    area: "Salón VIP",
    estado: "Disponible",
    ubicacion: "VIP - Privado",
    tipo: "VIP",
  },
  {
    id: generateULID(),
    numero: "B1",
    capacidad: 2,
    area: "Barra",
    estado: "Ocupada",
    ubicacion: "Barra - Izquierda",
    tipo: "Barra",
  },
  {
    id: generateULID(),
    numero: "B2",
    capacidad: 2,
    area: "Barra",
    estado: "Disponible",
    ubicacion: "Barra - Centro",
    tipo: "Barra",
  },
  {
    id: generateULID(),
    numero: "B3",
    capacidad: 2,
    area: "Barra",
    estado: "Disponible",
    ubicacion: "Barra - Derecha",
    tipo: "Barra",
  },
]
