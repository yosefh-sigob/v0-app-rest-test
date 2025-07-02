import { Crown, Zap, Star, Building2 } from "lucide-react"

export type LicenseType = "Gratis" | "Lite" | "Pro" | "Franquicia"

export interface License {
  name: LicenseType
  price: string
  period: string
  features: string[]
  color: string
}

export const LICENSES: License[] = [
  {
    name: "Gratis",
    price: "$0",
    period: "por mes",
    features: ["Dashboard básico", "Hasta 5 productos", "1 usuario"],
    color: "bg-gray-500",
  },
  {
    name: "Lite",
    price: "$29",
    period: "por mes",
    features: ["Gestión de productos", "Hasta 100 productos", "3 usuarios", "Reportes básicos"],
    color: "bg-blue-500",
  },
  {
    name: "Pro",
    price: "$79",
    period: "por mes",
    features: ["Gestión completa", "Productos ilimitados", "10 usuarios", "Reportes avanzados", "Inventario", "POS"],
    color: "bg-purple-500",
  },
  {
    name: "Franquicia",
    price: "$199",
    period: "por mes",
    features: ["Multi-sucursal", "Usuarios ilimitados", "API completa", "Soporte prioritario", "Personalización"],
    color: "bg-orange-500",
  },
]

export const FEATURES: Record<string, { name: string; requiredLicense: LicenseType }> = {
  gestionProductos: { name: "Gestión de Productos", requiredLicense: "Lite" },
  inventario: { name: "Control de Inventario", requiredLicense: "Pro" },
  pos: { name: "Punto de Venta", requiredLicense: "Pro" },
  reportesAvanzados: { name: "Reportes Avanzados", requiredLicense: "Pro" },
  multiSucursal: { name: "Multi-sucursal", requiredLicense: "Franquicia" },
  api: { name: "API Completa", requiredLicense: "Franquicia" },
}

const LICENSE_HIERARCHY: Record<LicenseType, number> = {
  Gratis: 0,
  Lite: 1,
  Pro: 2,
  Franquicia: 3,
}

export function hasAccess(currentLicense: LicenseType, requiredLicense: LicenseType): boolean {
  return LICENSE_HIERARCHY[currentLicense] >= LICENSE_HIERARCHY[requiredLicense]
}

export function getLicenseColor(license: LicenseType): string {
  const licenseData = LICENSES.find((l) => l.name === license)
  return licenseData?.color || "bg-gray-500"
}

export function getLicenseIcon(license: LicenseType) {
  switch (license) {
    case "Gratis":
      return Crown
    case "Lite":
      return Zap
    case "Pro":
      return Star
    case "Franquicia":
      return Building2
    default:
      return Crown
  }
}

export function getUpgradeMessage(featureName: string, requiredLicense: LicenseType): string {
  return `${featureName} requiere el plan ${requiredLicense} o superior. Actualiza tu plan para acceder a esta funcionalidad.`
}
