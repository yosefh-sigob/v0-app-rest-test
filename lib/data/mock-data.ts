import { generateULID } from "@/lib/utils/ulid"
import type { Cliente } from "@/lib/types"

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

// Tipos para el historial de visitas y otros datos
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
