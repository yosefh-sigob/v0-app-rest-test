// Tipos principales para el sistema
export type ULID = string

export enum TipoEmpresa {
  UNICA = "Unica",
  MATRIZ = "Matriz",
  SUCURSAL = "Sucursal",
}

export enum EstadoVenta {
  PEDIDO = "Pedido",
  EN_PROCESO = "En Proceso",
  ACEPTADO = "Aceptado",
}

export enum TipoVenta {
  COMEDOR = "Comedor",
  MOSTRADOR = "Mostrador",
  DOMICILIO = "Domicilio",
}

export enum EstadoMesa {
  DISPONIBLE = "Disponible",
  OCUPADA = "Ocupada",
  RESERVADA = "Reservada",
  FUERA_SERVICIO = "Fuera de Servicio",
}

export enum EstadoReservacion {
  PENDIENTE = "Pendiente",
  CONFIRMADA = "Confirmada",
  SENTADO = "Sentado",
  CANCELADA = "Cancelada",
}

export interface Usuario {
  id: string
  nombre: string
  usuario: string
  correo: string
  puesto: string
  esAdministrador: boolean
  activo: boolean
}

export interface Producto {
  id: string
  codigo: string
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  disponible: boolean
  imagen?: string
  favorito: boolean
}

export interface Mesa {
  id: string
  numero: string
  nombre: string
  capacidad: number
  estado: EstadoMesa
  area: string
  comensales?: number
  mesero?: string
  tiempoOcupada?: string
  total?: number
}

export interface Cliente {
  id: string
  nombre: string
  apellidos: string
  telefono: string
  email?: string
  fechaNacimiento?: Date
  notas?: string
  visitas: number
  ultimaVisita?: Date
}

export interface Venta {
  id: string
  numero: string
  mesa?: string
  cliente?: string
  mesero: string
  fecha: Date
  estado: EstadoVenta
  tipo: TipoVenta
  subtotal: number
  impuestos: number
  descuentos: number
  propina: number
  total: number
  productos: ProductoVenta[]
}

export interface ProductoVenta {
  id: string
  producto: Producto
  cantidad: number
  precio: number
  modificadores?: string[]
  notas?: string
  total: number
}

export interface Reservacion {
  id: string
  cliente: Cliente
  fecha: Date
  hora: string
  personas: number
  mesa?: Mesa
  estado: EstadoReservacion
  notas?: string
  telefono: string
  email?: string
}

export interface Encuesta {
  id: string
  titulo: string
  descripcion: string
  activa: boolean
  preguntas: PreguntaEncuesta[]
  respuestas: number
  fechaCreacion: Date
}

export interface PreguntaEncuesta {
  id: string
  pregunta: string
  tipo: "calificacion" | "multiple" | "texto" | "si_no"
  requerida: boolean
  opciones?: string[]
  orden: number
}
