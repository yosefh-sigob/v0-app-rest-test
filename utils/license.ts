export type LicenseType = "Gratis" | "Lite" | "Pro" | "Franquicia"

export interface LicenseFeature {
  name: string
  description: string
  requiredLicense: LicenseType
}

export const LICENSE_HIERARCHY: Record<LicenseType, number> = {
  Gratis: 0,
  Lite: 1,
  Pro: 2,
  Franquicia: 3,
}

export const FEATURES: Record<string, LicenseFeature> = {
  gestionProductos: {
    name: "Gestión de Productos",
    description: "Crear, editar y eliminar productos",
    requiredLicense: "Lite",
  },
  inventarioAvanzado: {
    name: "Inventario Avanzado",
    description: "Control de stock y alertas",
    requiredLicense: "Pro",
  },
  reportesAvanzados: {
    name: "Reportes Avanzados",
    description: "Análisis detallado de ventas",
    requiredLicense: "Pro",
  },
  multiUbicacion: {
    name: "Múltiples Ubicaciones",
    description: "Gestionar varias sucursales",
    requiredLicense: "Pro",
  },
  franquicia: {
    name: "Gestión de Franquicia",
    description: "Dashboard centralizado para franquicias",
    requiredLicense: "Franquicia",
  },
}

export function hasAccess(currentLicense: LicenseType, requiredLicense: LicenseType): boolean {
  return LICENSE_HIERARCHY[currentLicense] >= LICENSE_HIERARCHY[requiredLicense]
}

export function getUpgradeMessage(featureName: string, requiredLicense: LicenseType): string {
  return `Esta funcionalidad requiere el plan ${requiredLicense}. Actualiza tu plan para acceder a ${featureName}.`
}

export function getLicenseColor(license: LicenseType): string {
  const colors = {
    Gratis: "bg-gray-500",
    Lite: "bg-blue-500",
    Pro: "bg-orange-500",
    Franquicia: "bg-purple-500",
  }
  return colors[license]
}
