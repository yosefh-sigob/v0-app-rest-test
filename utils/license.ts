import { NivelLicencia } from "@/interfaces/database"

export interface LicenseFeatures {
  ventaComedor: boolean
  ventaMostrador: boolean
  ventaDomicilio: boolean
  reservaciones: boolean
  encuestas: boolean
  reportes: boolean
  productos: number // -1 para ilimitado
  mesas: number // -1 para ilimitado
  usuarios: number // -1 para ilimitado
}

export const licenseFeatures: Record<NivelLicencia, LicenseFeatures> = {
  [NivelLicencia.GRATIS]: {
    ventaComedor: false,
    ventaMostrador: false,
    ventaDomicilio: false,
    reservaciones: false,
    encuestas: false,
    reportes: false,
    productos: 10,
    mesas: 5,
    usuarios: 1,
  },
  [NivelLicencia.LITE]: {
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: false,
    reservaciones: true,
    encuestas: false,
    reportes: true,
    productos: 50,
    mesas: 15,
    usuarios: 3,
  },
  [NivelLicencia.PRO]: {
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: true,
    reservaciones: true,
    encuestas: true,
    reportes: true,
    productos: 200,
    mesas: 50,
    usuarios: 10,
  },
  [NivelLicencia.FRANQUICIA]: {
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: true,
    reservaciones: true,
    encuestas: true,
    reportes: true,
    productos: -1,
    mesas: -1,
    usuarios: -1,
  },
}

export function hasFeatureAccess(currentLicense: NivelLicencia, feature: keyof LicenseFeatures): boolean {
  return licenseFeatures[currentLicense][feature] as boolean
}

export function getFeatureLimit(currentLicense: NivelLicencia, feature: keyof LicenseFeatures): number {
  return licenseFeatures[currentLicense][feature] as number
}

export function canExceedLimit(
  currentLicense: NivelLicencia,
  feature: keyof LicenseFeatures,
  currentCount: number,
): boolean {
  const limit = getFeatureLimit(currentLicense, feature)
  return limit === -1 || currentCount < limit
}

export function getLicenseOrder(): NivelLicencia[] {
  return [NivelLicencia.GRATIS, NivelLicencia.LITE, NivelLicencia.PRO, NivelLicencia.FRANQUICIA]
}

export function isLicenseHigherOrEqual(currentLicense: NivelLicencia, requiredLicense: NivelLicencia): boolean {
  const order = getLicenseOrder()
  const currentIndex = order.indexOf(currentLicense)
  const requiredIndex = order.indexOf(requiredLicense)
  return currentIndex >= requiredIndex
}
