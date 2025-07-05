export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "restaurante" | "mesero" | "cajero" | "cliente"
  licenseType?: "gratis" | "lite" | "pro" | "franquicia"
  empresaId?: string
  avatar?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Empresa {
  id: string
  nombre: string
  direccion: string
  telefono: string
  email: string
  logo?: string
  licenseType: "gratis" | "lite" | "pro" | "franquicia"
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Mesa {
  id: string
  numero: string
  capacidad: number
  area: string
  estado: "disponible" | "ocupada" | "reservada" | "limpieza"
  tipoMesa: string
  posicionX?: number
  posicionY?: number
  empresaId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Reservacion {
  id: string
  clienteNombre: string
  clienteTelefono: string
  clienteEmail?: string
  fecha: string
  hora: string
  numeroPersonas: number
  mesaId?: string
  estado: "confirmada" | "pendiente" | "cancelada" | "completada"
  notas?: string
  empresaId: string
  createdAt: string
  updatedAt: string
}

export interface Venta {
  id: string
  folio: string
  mesaId?: string
  clienteId?: string
  meseroId: string
  productos: ProductoVenta[]
  subtotal: number
  impuestos: number
  descuentos: number
  total: number
  metodoPago: "efectivo" | "tarjeta" | "transferencia" | "mixto"
  estado: "pendiente" | "pagada" | "cancelada"
  tipo: "comedor" | "mostrador" | "domicilio"
  empresaId: string
  createdAt: string
  updatedAt: string
}

export interface ProductoVenta {
  productoId: string
  nombre: string
  cantidad: number
  precio: number
  subtotal: number
  notas?: string
}

// Interfaces para clientes
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
  email?: string
  fechaNacimiento?: string
  direccion?: Direccion
  preferencias?: Preferencias
  historialVisitas: HistorialVisita[]
  puntos: number
  nivelFidelidad: "Bronce" | "Plata" | "Oro" | "Platino"
  fechaRegistro: string
  activo: boolean
  notas?: string
}

// Interfaces para productos (ya existentes)
export interface Producto {
  id: string
  claveProducto: string
  nombre: string
  descripcion?: string
  tipoProducto: "Platillo" | "Producto" | "Botella"
  grupoProductoId: string
  subgrupoProductoId?: string
  precio: number
  costo?: number
  unidadId: string
  areaProduccionId: string
  almacenId: string
  favorito: boolean
  suspendido: boolean
  controlStock: boolean
  facturable: boolean
  comedor: boolean
  aDomicilio: boolean
  mostrador: boolean
  enLinea: boolean
  enApp: boolean
  enMenuQR: boolean
  imagen?: string
  empresaId: string
  fechaCreacion: string
  fechaActualizacion: string
}

export interface GrupoProducto {
  id: string
  clave: string
  descripcion: string
  orden: number
  activo: boolean
  imagen?: string
  empresaId: string
}

export interface SubgrupoProducto {
  id: string
  grupoProductoId: string
  clave: string
  descripcion: string
  activo: boolean
  empresaId: string
}

export interface Unidad {
  id: string
  clave: string
  descripcion: string
  abreviacion: string
  empresaId: string
}

export interface AreaProduccion {
  id: string
  clave: string
  descripcion: string
  activa: boolean
  empresaId: string
}

export interface Almacen {
  id: string
  clave: string
  descripcion: string
  tipo: "General" | "Refrigerador" | "Congelador" | "Barra" | "Bodega"
  activo: boolean
  empresaId: string
}

// Tipos para licencias
export type LicenseType = "gratis" | "lite" | "pro" | "franquicia"

export interface LicenseFeatures {
  maxMesas: number
  maxUsuarios: number
  reportesAvanzados: boolean
  integracionesTerceros: boolean
  soportePrioritario: boolean
  menuDigital: boolean
  reservaciones: boolean
  delivery: boolean
  inventario: boolean
  contabilidad: boolean
}
