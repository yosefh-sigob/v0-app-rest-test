// Interfaces basadas en el modelo DBML
export type ULID = string

// Enums principales del sistema
export enum TipoEmpresa {
  UNICA = "Unica",
  MATRIZ = "Matriz",
  SUCURSAL = "Sucursal",
}

export enum TipoPersona {
  FISICA = "Fisica",
  MORAL = "Moral",
}

export enum TipoProducto {
  PLATILLO = "Platillo",
  PRODUCTO = "Producto",
  BOTELLA = "Botella",
}

export enum EstadoVenta {
  PEDIDO = "Pedido",
  EN_PROCESO = "En Proceso",
  ACEPTADO = "Aceptado",
  PAUSADO = "Pausado",
  TERMINADO = "Terminado",
}

export enum TipoVenta {
  COMEDOR = "Comedor",
  MOSTRADOR = "Mostrador",
  DOMICILIO = "Domicilio",
  FICHAS = "Fichas",
  EVENTOS = "Eventos",
}

export enum EstadoReservacion {
  PENDIENTE = "Pendiente",
  CONFIRMADA = "Confirmada",
  SENTADO = "Sentado",
  CANCELADA = "Cancelada",
}

export enum CanalReservacion {
  EN_SITIO = "En Sitio",
  TELEFONO = "Telefono",
  ONLINE = "Online",
}

export enum NivelLicencia {
  GRATIS = "Gratis",
  LITE = "Lite",
  PRO = "Pro",
  FRANQUICIA = "Franquicia",
}

// Interfaces principales del sistema
export interface Empresa {
  EmpresaULID: ULID
  NombreRestaurante: string
  Esquema: string
  Licencia: NivelLicencia
  TipoEmpresa: TipoEmpresa
  TipoPersona: TipoPersona
  RFC: string
  RazonSocial: string
  NombreComercial: string
  Calle: string
  NumeroExterior: string
  NumeroInterior?: string
  Colonia: string
  CodigoPostal: string
  Ciudad: string
  Estado: string
  Pais: string
  Telefono: string
  Email: string
  SitioWeb?: string
  Logo?: string
  FechaRegistro: Date
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: number
}

export interface Usuario {
  UsuarioULID: ULID
  NombreCompleto: string
  Usuario: string
  Correo: string
  Contraseña: string
  PIN: string
  Celular: string
  Puesto: string
  EsAdministrador: boolean
  Suspendido: boolean
  FechaSuspension?: Date
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  Usuario2ULID?: number
  EmpresaULID: ULID
}

export interface Configuracion {
  ConfiguracionULID: ULID
  EmpresaULID: ULID
  HabilitarPedidosQR: boolean
  VentaComedor: boolean
  VentaMostrador: boolean
  VentaADomicilio: boolean
  VentaAMenuDigital: boolean
  ModuloReservas: boolean
  MonedaULID: number
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: number
}

export interface Producto {
  ProductoULID: ULID
  GrupoProductoULID: number
  SubgrupoProductoULID: number
  ClaveProducto: string
  TipoProducto: TipoProducto
  Nombredelproducto: string
  Favorito: boolean
  Descripcion: string
  ExentoImpuesto: boolean
  PrecioAbierto: boolean
  UnidadesULID: number
  AreaProduccionULID: number
  AlmacenULID: number
  ControlStock: boolean
  PrecioxUtilidad: boolean
  Facturable: boolean
  ClaveTributaria: string
  Suspendido: boolean
  Comedor: boolean
  ADomicilio: boolean
  Mostrador: boolean
  Enlinea: boolean
  EnAPP: boolean
  CanalesVenta: boolean
  EnMenuQR: boolean
  ClasificacionQRULID?: number
  DatosDinamicos?: any
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface Mesa {
  MesaULID: ULID
  ClaveMesa: string
  NombreMesa: string
  TipoMesaULID: number
  AreaVentasULID: number
  ComensalesMaximos: number
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface AreaVentas {
  AreaULID: ULID
  PlanoULID: ULID
  Descripcion: string
  Fumar: boolean
  Exterior: boolean
  Barra: boolean
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface Venta {
  VentaULID: ULID
  TurnoULID: number
  CanalULID: number
  EstadoVenta: EstadoVenta
  NumCuenta: string
  TipoVenta: TipoVenta
  TipoDescuentoULID?: number
  AreaULID: number
  Personas: number
  FechaApertura: Date
  Cancelada: boolean
  UsuarioULID: number
  FechaCancelacion?: Date
  Impresa: boolean
  FechaImpresion?: Date
  FechaCierre?: Date
  MesaULID?: number
  MeseroULID?: number
  Subtotal: number
  CostoReparto: number
  Comisiones: number
  ImpuestoULID?: number
  Descuentos: number
  TotalPropina: number
  Total: number
  Saldo: number
  EstadoCuenta: string
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  EmpresaULID: ULID
}

export interface Cliente {
  ClienteULID: ULID
  Celular: string
  Nombres: string
  Apellidos: string
  NombreCorto: string
  NotasEspeciales: string
  FechaNacimiento?: Date
  Correo: string
  Comentarios: string
  LimitedeCredito: number
  DiasdeCredito: number
  SaldodeCredito: number
  Suspendido: boolean
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface Reservacion {
  ReservacionULID: ULID
  CanalReservacion: CanalReservacion
  ComisionistaULID?: number
  TipoReservacionULID: number
  ListadeEspera: boolean
  Niños: boolean
  CantidadNiños?: number
  Mascotas: boolean
  SilladeRuedas: boolean
  SillaBebe: boolean
  ClienteULID: number
  ClienteNombre: string
  PaisCelular: string
  ClienteCelular: string
  ClienteCorreo: string
  NumeroPersonas: number
  Notas: string
  MesaULID: number
  FechaReservacion: Date
  HoraReservacion: string
  TiempodeEspera: number
  EstadoReservacion: EstadoReservacion
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface Encuesta {
  EncuestaULID: ULID
  Titulo: string
  Descripcion: string
  FechaInicio: Date
  FechaFin: Date
  Activa: boolean
  TipoEncuesta: string
  Preguntas: any
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}

export interface CampanaSMS {
  CampanaULID: ULID
  Nombre: string
  Mensaje: string
  FechaEnvio: Date
  Estado: string
  Destinatarios: number
  Enviados: number
  Entregados: number
  Respuestas: number
  Fecha_UltimoCambio: Date
  Fecha_Sync: Date
  UsuarioULID: number
  EmpresaULID: ULID
}
