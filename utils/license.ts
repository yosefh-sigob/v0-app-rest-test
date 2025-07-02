export type LicenseType = "Gratis" | "Lite" | "Pro" | "Franquicia"

export interface LicenseFeature {
  name: string
  description: string
  requiredLicense: LicenseType
}

export const LICENSE_FEATURES: Record<string, LicenseFeature> = {
  gestionProductos: {
    name: "Gestión de Productos",
    description: "Crear, editar y eliminar productos",
    requiredLicense: "Lite",
  },
  reportesAvanzados: {
    name: "Reportes Avanzados",
    description: "Reportes detallados y análisis",
    requiredLicense: "Pro",
  },
  multiplesSucursales: {
    name: "Múltiples Sucursales",
    description: "Gestión de varias ubicaciones",
    requiredLicense: "Pro",
  },
  integracionPOS: {
    name: "Integración POS",
    description: "Conexión con sistemas de punto de venta",
    requiredLicense: "Pro",
  },
  apiCompleta: {
    name: "API Completa",
    description: "Acceso completo a la API",
    requiredLicense: "Franquicia",
  },
  usuariosIlimitados: {
    name: "Usuarios Ilimitados",
    description: "Sin límite de usuarios",
    requiredLicense: "Franquicia",
  },
  soporteDedicado: {
    name: "Soporte Dedicado",
    description: "Soporte personalizado 24/7",
    requiredLicense: "Franquicia",
  },
}

const LICENSE_HIERARCHY: Record<LicenseType, number> = {
  Gratis: 0,
  Lite: 1,
  Pro: 2,
  Franquicia: 3,
}

export function hasLicenseAccess(currentLicense: LicenseType, requiredLicense: LicenseType): boolean {
  return LICENSE_HIERARCHY[currentLicense] >= LICENSE_HIERARCHY[requiredLicense]
}

export function canAccessFeature(currentLicense: LicenseType, featureKey: string): boolean {
  const feature = LICENSE_FEATURES[featureKey]
  if (!feature) return true // Si no está definida la feature, permitir acceso
  return hasLicenseAccess(currentLicense, feature.requiredLicense)
}

export function getUpgradeMessage(featureKey: string): string {
  const feature = LICENSE_FEATURES[featureKey]
  if (!feature) return "Funcionalidad no disponible"
  return `Esta funcionalidad requiere el plan ${feature.requiredLicense} o superior.`
}

export function getLicenseColor(license: LicenseType): string {
  const colors = {
    Gratis: "bg-gray-100 text-gray-800",
    Lite: "bg-blue-100 text-blue-800",
    Pro: "bg-orange-100 text-orange-800",
    Franquicia: "bg-purple-100 text-purple-800",
  }
  return colors[license]
}
