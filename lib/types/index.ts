export interface Mesa {
  id: number
  number: number
  capacity: number
  status: "disponible" | "ocupada" | "reservada" | "limpieza"
  waiter?: string
  order?: {
    id: string
    total: number
    items: number
    time: string
  }
  area: string
  notes: string
  lastCleaned: string
}

export interface Producto {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  available: boolean
  favorite: boolean
  preparationTime: number
  ingredients: string[]
}

export interface Cliente {
  id: string
  name: string
  email: string
  phone: string
  visits: number
  totalSpent: number
  lastVisit: string
  vip: boolean
  preferences: string[]
  notes: string
}

export interface Reservacion {
  id: string
  customerName: string
  customerPhone: string
  date: string
  time: string
  guests: number
  table?: number
  status: "pendiente" | "confirmada" | "sentado" | "cancelada"
  notes: string
  createdAt: string
}

export enum EstadoReservacion {
  PENDIENTE = "pendiente",
  CONFIRMADA = "confirmada",
  SENTADO = "sentado",
  CANCELADA = "cancelada",
  NO_SHOW = "no_show",
}

export interface Encuesta {
  id: string
  title: string
  description: string
  questions: Question[]
  active: boolean
  responses: number
  createdAt: string
}

export interface Question {
  id: string
  type: "rating" | "multiple" | "text" | "yesno"
  question: string
  options?: string[]
  required: boolean
}

export interface CampanaSMS {
  id: string
  name: string
  message: string
  recipients: number
  sent: number
  delivered: number
  responses: number
  status: "draft" | "sending" | "completed" | "paused"
  createdAt: string
  scheduledAt?: string
}
