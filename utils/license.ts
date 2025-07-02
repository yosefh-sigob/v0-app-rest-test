export type LicenseLevel = "Gratis" | "Lite" | "Pro" | "Franquicia"

export interface LicenseFeatures {
  maxProducts: number
  maxUsers: number
  hasAdvancedReports: boolean
  hasInventoryControl: boolean
  hasMultiLocation: boolean
  hasAPIAccess: boolean
  hasCustomBranding: boolean
  hasPrioritySupport: boolean
}

export const LICENSE_FEATURES: Record<LicenseLevel, LicenseFeatures> = {
  Gratis: {
    maxProducts: 10,
    maxUsers: 1,
    hasAdvancedReports: false,
    hasInventoryControl: false,
    hasMultiLocation: false,
    hasAPIAccess: false,
    hasCustomBranding: false,
    hasPrioritySupport: false,
  },
  Lite: {
    maxProducts: 50,
    maxUsers: 3,
    hasAdvancedReports: true,
    hasInventoryControl: false,
    hasMultiLocation: false,
    hasAPIAccess: false,
    hasCustomBranding: false,
    hasPrioritySupport: false,
  },
  Pro: {
    maxProducts: 200,
    maxUsers: 10,
    hasAdvancedReports: true,
    hasInventoryControl: true,
    hasMultiLocation: false,
    hasAPIAccess: true,
    hasCustomBranding: true,
    hasPrioritySupport: true,
  },
  Franquicia: {
    maxProducts: -1, // Ilimitado
    maxUsers: -1, // Ilimitado
    hasAdvancedReports: true,
    hasInventoryControl: true,
    hasMultiLocation: true,
    hasAPIAccess: true,
    hasCustomBranding: true,
    hasPrioritySupport: true,
  },
}

export function getLicenseFeatures(level: LicenseLevel): LicenseFeatures {
  return LICENSE_FEATURES[level]
}

export function canAccessFeature(userLicense: LicenseLevel, requiredLicense: LicenseLevel): boolean {
  const levels: LicenseLevel[] = ["Gratis", "Lite", "Pro", "Franquicia"]
  const userIndex = levels.indexOf(userLicense)
  const requiredIndex = levels.indexOf(requiredLicense)
  return userIndex >= requiredIndex
}

export function getUpgradeMessage(currentLicense: LicenseLevel, requiredLicense: LicenseLevel): string {
  const messages = {
    Lite: "Actualiza a Lite para acceder a esta funcionalidad",
    Pro: "Actualiza a Pro para acceder a funcionalidades avanzadas",
    Franquicia: "Actualiza a Franquicia para acceso completo",
  }
  return messages[requiredLicense] || "Actualiza tu plan para acceder a esta funcionalidad"
}
