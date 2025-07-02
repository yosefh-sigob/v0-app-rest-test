import { NivelLicencia } from "@/interfaces/database"

export interface LicenseFeatures {
  ventaComedor: boolean
  ventaMostrador: boolean
  ventaADomicilio: boolean
  menuDigital: boolean
  moduloReservas: boolean
  reportesAvanzados: boolean
  multiSucursal: boolean
  integracionesExternas: boolean
  gestionInventario: boolean
  programaLealtad: boolean
}

export const LICENSE_FEATURES: Record<NivelLicencia, LicenseFeatures> = {
  [NivelLicencia.GRATIS]: {
    ventaComedor: true,
    ventaMostrador: false,
    ventaADomicilio: false,
    menuDigital: false,
    moduloReservas: false,
    reportesAvanzados: false,
    multiSucursal: false,
    integracionesExternas: false,
    gestionInventario: false,
    programaLealtad: false,
  },
  [NivelLicencia.LITE]: {
    ventaComedor: true,
    ventaMostrador: true,
    ventaADomicilio: false,
    menuDigital: true,
    moduloReservas: false,
    reportesAvanzados: false,
    multiSucursal: false,
    integracionesExternas: false,
    gestionInventario: true,
    programaLealtad: false,
  },
  [NivelLicencia.PRO]: {
    ventaComedor: true,
    ventaMostrador: true,
    ventaADomicilio: true,
    menuDigital: true,
    moduloReservas: true,
    reportesAvanzados: true,
    multiSucursal: false,
    integracionesExternas: true,
    gestionInventario: true,
    programaLealtad: true,
  },
  [NivelLicencia.FRANQUICIA]: {
    ventaComedor: true,
    ventaMostrador: true,
    ventaADomicilio: true,
    menuDigital: true,
    moduloReservas: true,
    reportesAvanzados: true,
    multiSucursal: true,
    integracionesExternas: true,
    gestionInventario: true,
    programaLealtad: true,
  },
}

export function hasLicenseFeature(currentLicense: NivelLicencia, feature: keyof LicenseFeatures): boolean {
  return LICENSE_FEATURES[currentLicense][feature]
}

export function getRequiredLicenseForFeature(feature: keyof LicenseFeatures): NivelLicencia | null {
  const licenses = Object.entries(LICENSE_FEATURES) as [NivelLicencia, LicenseFeatures][]

  for (const [license, features] of licenses) {
    if (features[feature]) {
      return license
    }
  }

  return null
}

export function getLicenseUpgradeMessage(
  currentLicense: NivelLicencia,
  requiredFeature: keyof LicenseFeatures,
): string {
  const requiredLicense = getRequiredLicenseForFeature(requiredFeature)

  if (!requiredLicense) {
    return "Esta característica no está disponible en ningún plan."
  }

  const featureNames: Record<keyof LicenseFeatures, string> = {
    ventaComedor: "Venta en Comedor",
    ventaMostrador: "Venta en Mostrador",
    ventaADomicilio: "Venta a Domicilio",
    menuDigital: "Menú Digital",
    moduloReservas: "Módulo de Reservas",
    reportesAvanzados: "Reportes Avanzados",
    multiSucursal: "Multi-Sucursal",
    integracionesExternas: "Integraciones Externas",
    gestionInventario: "Gestión de Inventario",
    programaLealtad: "Programa de Lealtad",
  }

  return `${featureNames[requiredFeature]} requiere el plan ${requiredLicense}. Actualiza tu licencia para acceder a esta funcionalidad.`
}
