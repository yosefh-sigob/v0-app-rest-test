export type LicenseType = "Gratis" | "Lite" | "Pro" | "Franquicia"

export interface LicenseFeatures {
  gestionProductos: boolean
  ventaComedor: boolean
  ventaMostrador: boolean
  ventaDomicilio: boolean
  menuQR: boolean
  reportesBasicos: boolean
  reportesAvanzados: boolean
  controlInventario: boolean
  integracionesAPI: boolean
  campanasSMS: boolean
  multiSucursal: boolean
  usuariosIlimitados: boolean
  soportePrioritario: boolean
  maxProductos: number
  maxUsuarios: number
}

export const LICENSE_FEATURES: Record<LicenseType, LicenseFeatures> = {
  Gratis: {
    gestionProductos: true,
    ventaComedor: true,
    ventaMostrador: false,
    ventaDomicilio: false,
    menuQR: false,
    reportesBasicos: false,
    reportesAvanzados: false,
    controlInventario: false,
    integracionesAPI: false,
    campanasSMS: false,
    multiSucursal: false,
    usuariosIlimitados: false,
    soportePrioritario: false,
    maxProductos: 50,
    maxUsuarios: 1,
  },
  Lite: {
    gestionProductos: true,
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: true,
    menuQR: true,
    reportesBasicos: true,
    reportesAvanzados: false,
    controlInventario: false,
    integracionesAPI: false,
    campanasSMS: false,
    multiSucursal: false,
    usuariosIlimitados: false,
    soportePrioritario: false,
    maxProductos: 200,
    maxUsuarios: 3,
  },
  Pro: {
    gestionProductos: true,
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: true,
    menuQR: true,
    reportesBasicos: true,
    reportesAvanzados: true,
    controlInventario: true,
    integracionesAPI: true,
    campanasSMS: true,
    multiSucursal: false,
    usuariosIlimitados: false,
    soportePrioritario: false,
    maxProductos: -1, // Ilimitado
    maxUsuarios: 10,
  },
  Franquicia: {
    gestionProductos: true,
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: true,
    menuQR: true,
    reportesBasicos: true,
    reportesAvanzados: true,
    controlInventario: true,
    integracionesAPI: true,
    campanasSMS: true,
    multiSucursal: true,
    usuariosIlimitados: true,
    soportePrioritario: true,
    maxProductos: -1, // Ilimitado
    maxUsuarios: -1, // Ilimitado
  },
}

export function hasFeature(license: LicenseType, feature: keyof LicenseFeatures): boolean {
  return LICENSE_FEATURES[license][feature] as boolean
}

export function getFeatureValue(license: LicenseType, feature: keyof LicenseFeatures): boolean | number {
  return LICENSE_FEATURES[license][feature]
}
