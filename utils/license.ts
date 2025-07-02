import { NivelLicencia } from "@/interfaces/database"

export interface LicenseFeature {
  name: string
  description: string
  requiredLicense: NivelLicencia
}

export const LICENSE_FEATURES: Record<string, LicenseFeature> = {
  // Características básicas
  gestionProductos: {
    name: "Gestión de Productos",
    description: "Crear y editar productos básicos",
    requiredLicense: NivelLicencia.GRATIS,
  },
  ventaComedor: {
    name: "Venta en Comedor",
    description: "Gestión de mesas y órdenes en comedor",
    requiredLicense: NivelLicencia.LITE,
  },
  ventaDomicilio: {
    name: "Venta a Domicilio",
    description: "Gestión de entregas a domicilio",
    requiredLicense: NivelLicencia.LITE,
  },

  // Características Pro
  gestionInventario: {
    name: "Gestión de Inventario",
    description: "Control de stock y almacenes",
    requiredLicense: NivelLicencia.PRO,
  },
  reportesAvanzados: {
    name: "Reportes Avanzados",
    description: "Reportes detallados y análisis",
    requiredLicense: NivelLicencia.PRO,
  },
  integraccionesAPI: {
    name: "Integraciones API",
    description: "Conectar con sistemas externos",
    requiredLicense: NivelLicencia.PRO,
  },

  // Características Franquicia
  multiSucursal: {
    name: "Multi-sucursal",
    description: "Gestión de múltiples sucursales",
    requiredLicense: NivelLicencia.FRANQUICIA,
  },
  reportesCorporativos: {
    name: "Reportes Corporativos",
    description: "Reportes consolidados de todas las sucursales",
    requiredLicense: NivelLicencia.FRANQUICIA,
  },
}

export function hasLicenseAccess(currentLicense: NivelLicencia, requiredLicense: NivelLicencia): boolean {
  const licenseOrder = {
    [NivelLicencia.GRATIS]: 0,
    [NivelLicencia.LITE]: 1,
    [NivelLicencia.PRO]: 2,
    [NivelLicencia.FRANQUICIA]: 3,
  }

  return licenseOrder[currentLicense] >= licenseOrder[requiredLicense]
}

export function getFeatureByName(featureName: string): LicenseFeature | undefined {
  return LICENSE_FEATURES[featureName]
}

export function getLicenseUpgradeMessage(currentLicense: NivelLicencia, requiredLicense: NivelLicencia): string {
  const upgradeMessages = {
    [NivelLicencia.GRATIS]: {
      [NivelLicencia.LITE]: "Actualiza a Lite para acceder a esta funcionalidad",
      [NivelLicencia.PRO]: "Actualiza a Pro para acceder a esta funcionalidad",
      [NivelLicencia.FRANQUICIA]: "Actualiza a Franquicia para acceder a esta funcionalidad",
    },
    [NivelLicencia.LITE]: {
      [NivelLicencia.PRO]: "Actualiza a Pro para acceder a esta funcionalidad",
      [NivelLicencia.FRANQUICIA]: "Actualiza a Franquicia para acceder a esta funcionalidad",
    },
    [NivelLicencia.PRO]: {
      [NivelLicencia.FRANQUICIA]: "Actualiza a Franquicia para acceder a esta funcionalidad",
    },
  }

  return upgradeMessages[currentLicense]?.[requiredLicense] || "Actualiza tu licencia para acceder a esta funcionalidad"
}
