export interface Cliente {
  ClienteULID: string
  ClaveCliente: string
  NombreCompleto: string
  Telefono: string
  Email?: string
  FechaNacimiento?: Date
  Direccion?: string
  CodigoPostal?: string
  Ciudad?: string
  Estado?: string
  Pais?: string
  TipoCliente: "Frecuente" | "Ocasional" | "VIP"
  Activo: boolean
  Puntos: number
  FechaRegistro: Date
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: string
  EmpresaULID: string
}

export interface ClienteDireccion {
  DireccionULID: string
  ClienteULID: string
  TipoDireccion: "Casa" | "Trabajo" | "Otro"
  Direccion: string
  CodigoPostal: string
  Ciudad: string
  Estado: string
  Pais: string
  Principal: boolean
  Fecha_UltimoCambio: Date
  Fecha_Sync?: Date
  UsuarioULID: string
  EmpresaULID: string
}
