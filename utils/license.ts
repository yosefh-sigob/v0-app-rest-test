import { NivelLicencia } from "@/interfaces/database"

export interface LicenseFeature {
  name: string
  description: string
  requiredLevel: NivelLicencia
}

export const LICENSE_FEATURES: Record<string, LicenseFeature> = {
  // Funcionalidades básicas
  ventaComedor: {
    name: "Venta en Comedor",
    description: "Gestión de mesas y órdenes en comedor",
    requiredLevel: NivelLicencia.GRATIS,
  },
  ventaMostrador: {
    name: "Venta en Mostrador",
    description: "Punto de venta para mostrador",
    requiredLevel: NivelLicencia.LITE,
  },
  ventaDomicilio: {
    name: "Venta a Domicilio",
    description: "Gestión de entregas a domicilio",
    requiredLevel: NivelLicencia.LITE,
  },

  // Gestión de productos
  gestionProductos: {
    name: "Gestión de Productos",
    description: "CRUD completo de productos",
    requiredLevel: NivelLicencia.GRATIS,
  },
  presentacionesProductos: {
    name: "Presentaciones de Productos",
    description: "Múltiples presentaciones por producto",
    requiredLevel: NivelLicencia.PRO,
  },
  recetasProductos: {
    name: "Recetas de Productos",
    description: "Gestión de ingredientes y costos",
    requiredLevel: NivelLicencia.PRO,
  },

  // Módulos avanzados
  moduloReservas: {
    name: "Módulo de Reservas",
    description: "Sistema completo de reservaciones",
    requiredLevel: NivelLicencia.LITE,
  },
  moduloEncuestas: {
    name: "Módulo de Encuestas",
    description: "Encuestas y feedback de clientes",
    requiredLevel: NivelLicencia.PRO,
  },
  campanaSMS: {
    name: "Campañas SMS",
    description: "Marketing por SMS",
    requiredLevel: NivelLicencia.PRO,
  },

  // Reportes y análisis
  reportesBasicos: {
    name: "Reportes Básicos",
    description: "Reportes de ventas básicos",
    requiredLevel: NivelLicencia.LITE,
  },
  reportesAvanzados: {
    name: "Reportes Avanzados",
    description: "Análisis detallado y métricas",
    requiredLevel: NivelLicencia.PRO,
  },

  // Funcionalidades de franquicia
  multiSucursal: {
    name: "Multi-sucursal",
    description: "Gestión de múltiples sucursales",
    requiredLevel: NivelLicencia.FRANQUICIA,
  },
  centralizacion: {
    name: "Centralización",
    description: "Control centralizado de operaciones",
    requiredLevel: NivelLicencia.FRANQUICIA,
  },
}

export const LICENSE_HIERARCHY = [NivelLicencia.GRATIS, NivelLicencia.LITE, NivelLicencia.PRO, NivelLicencia.FRANQUICIA]

export function hasLicenseAccess(currentLicense: NivelLicencia, requiredFeature: string): boolean {
  const feature = LICENSE_FEATURES[requiredFeature]
  if (!feature) return false

  const currentIndex = LICENSE_HIERARCHY.indexOf(currentLicense)
  const requiredIndex = LICENSE_HIERARCHY.indexOf(feature.requiredLevel)

  return currentIndex >= requiredIndex
}

export function getUpgradeMessage(currentLicense: NivelLicencia, requiredFeature: string): string {
  const feature = LICENSE_FEATURES[requiredFeature]
  if (!feature) return "Funcionalidad no disponible"

  if (hasLicenseAccess(currentLicense, requiredFeature)) {
    return ""
  }

  return `Esta funcionalidad requiere el plan ${feature.requiredLevel}. Actualiza tu licencia para acceder a ${feature.name}.`
}

export function getLicenseFeatures(license: NivelLicencia): LicenseFeature[] {
  return Object.values(LICENSE_FEATURES).filter((feature) =>
    hasLicenseAccess(license, Object.keys(LICENSE_FEATURES).find((key) => LICENSE_FEATURES[key] === feature) || ""),
  )
}

export function getNextLicenseLevel(currentLicense: NivelLicencia): NivelLicencia | null {
  const currentIndex = LICENSE_HIERARCHY.indexOf(currentLicense)
  if (currentIndex === -1 || currentIndex === LICENSE_HIERARCHY.length - 1) {
    return null
  }
  return LICENSE_HIERARCHY[currentIndex + 1]
}
