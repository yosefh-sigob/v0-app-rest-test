export type LicenseType = "Gratis" | "Lite" | "Pro" | "Franquicia"

export const LICENSE_FEATURES = {
  Gratis: {
    gestionProductos: true,
    ventaComedor: true,
    ventaMostrador: false,
    ventaDomicilio: false,
    menuDigital: false,
    reportesBasicos: false,
    reportesAvanzados: false,
    controlInventario: false,
    integracionesAPI: false,
    campanaSMS: false,
    programaLealtad: false,
    multiSucursal: false,
    reportesCorporativos: false,
    dashboardCentralizado: false,
  },
  Lite: {
    gestionProductos: true,
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: true,
    menuDigital: true,
    reportesBasicos: true,
    reportesAvanzados: false,
    controlInventario: false,
    integracionesAPI: false,
    campanaSMS: false,
    programaLealtad: false,
    multiSucursal: false,
    reportesCorporativos: false,
    dashboardCentralizado: false,
  },
  Pro: {
    gestionProductos: true,
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: true,
    menuDigital: true,
    reportesBasicos: true,
    reportesAvanzados: true,
    controlInventario: true,
    integracionesAPI: true,
    campanaSMS: true,
    programaLealtad: true,
    multiSucursal: false,
    reportesCorporativos: false,
    dashboardCentralizado: false,
  },
  Franquicia: {
    gestionProductos: true,
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: true,
    menuDigital: true,
    reportesBasicos: true,
    reportesAvanzados: true,
    controlInventario: true,
    integracionesAPI: true,
    campanaSMS: true,
    programaLealtad: true,
    multiSucursal: true,
    reportesCorporativos: true,
    dashboardCentralizado: true,
  },
}

export function hasFeature(license: LicenseType, feature: keyof typeof LICENSE_FEATURES.Gratis): boolean {
  return LICENSE_FEATURES[license][feature] || false
}

export function getRequiredLicense(feature: keyof typeof LICENSE_FEATURES.Gratis): LicenseType {
  const licenses: LicenseType[] = ["Gratis", "Lite", "Pro", "Franquicia"]

  for (const license of licenses) {
    if (LICENSE_FEATURES[license][feature]) {
      return license
    }
  }

  return "Pro" // Default fallback
}
