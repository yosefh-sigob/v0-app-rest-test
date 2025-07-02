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
  reportesAvanzados: {
    name: "Reportes Avanzados",
    description: "Análisis detallado de ventas y productos",
    requiredLicense: "Pro",
  },
  multiSucursal: {
    name: "Multi-sucursal",
    description: "Gestión de múltiples ubicaciones",
    requiredLicense: "Franquicia",
  },
  integrationPOS: {
    name: "Integración POS",
    description: "Conexión con sistemas de punto de venta",
    requiredLicense: "Pro",
  },
}

export function hasAccess(currentLicense: LicenseType, requiredLicense: LicenseType): boolean {
  return LICENSE_HIERARCHY[currentLicense] >= LICENSE_HIERARCHY[requiredLicense]
}

export function getUpgradeMessage(feature: string, requiredLicense: LicenseType): string {
  return `Esta funcionalidad requiere el plan ${requiredLicense}. Actualiza tu plan para acceder a ${feature}.`
}

export function getLicenseColor(license: LicenseType): string {
  const colors = {
    Gratis: "bg-gray-500",
    Lite: "bg-blue-500",
    Pro: "bg-purple-500",
    Franquicia: "bg-orange-500",
  }
  return colors[license]
}
