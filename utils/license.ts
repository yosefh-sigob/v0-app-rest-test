import { NivelLicencia } from "@/interfaces/database"

export interface LicenseFeatures {
  maxMesas: number
  maxUsuarios: number
  ventaComedor: boolean
  ventaMostrador: boolean
  ventaDomicilio: boolean
  moduloReservas: boolean
  moduloEncuestas: boolean
  reportesAvanzados: boolean
  integracionesExternas: boolean
  soportePrioritario: boolean
}

export const LICENSE_FEATURES: Record<NivelLicencia, LicenseFeatures> = {
  [NivelLicencia.GRATIS]: {
    maxMesas: 5,
    maxUsuarios: 2,
    ventaComedor: true,
    ventaMostrador: false,
    ventaDomicilio: false,
    moduloReservas: false,
    moduloEncuestas: false,
    reportesAvanzados: false,
    integracionesExternas: false,
    soportePrioritario: false,
  },
  [NivelLicencia.LITE]: {
    maxMesas: 15,
    maxUsuarios: 5,
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: false,
    moduloReservas: true,
    moduloEncuestas: false,
    reportesAvanzados: false,
    integracionesExternas: false,
    soportePrioritario: false,
  },
  [NivelLicencia.PRO]: {
    maxMesas: 50,
    maxUsuarios: 15,
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: true,
    moduloReservas: true,
    moduloEncuestas: true,
    reportesAvanzados: true,
    integracionesExternas: true,
    soportePrioritario: false,
  },
  [NivelLicencia.FRANQUICIA]: {
    maxMesas: -1, // Ilimitado
    maxUsuarios: -1, // Ilimitado
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: true,
    moduloReservas: true,
    moduloEncuestas: true,
    reportesAvanzados: true,
    integracionesExternas: true,
    soportePrioritario: true,
  },
}

export function getLicenseFeatures(license: NivelLicencia): LicenseFeatures {
  return LICENSE_FEATURES[license]
}

export function hasFeature(license: NivelLicencia, feature: keyof LicenseFeatures): boolean {
  return LICENSE_FEATURES[license][feature] as boolean
}

export function canAddMore(license: NivelLicencia, feature: "maxMesas" | "maxUsuarios", current: number): boolean {
  const limit = LICENSE_FEATURES[license][feature] as number
  return limit === -1 || current < limit
}
