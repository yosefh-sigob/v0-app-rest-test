"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, Crown, Zap, Building, Star } from "lucide-react"
import { NivelLicencia } from "@/interfaces/database"
import { useLicense } from "@/contexts/license-context"

interface LicenseGuardProps {
  children: ReactNode
  requiredLicense?: NivelLicencia
  feature?: string
  fallback?: ReactNode
  showUpgrade?: boolean
}

const LICENSE_ICONS = {
  [NivelLicencia.GRATIS]: <Star className="h-4 w-4" />,
  [NivelLicencia.LITE]: <Zap className="h-4 w-4" />,
  [NivelLicencia.PRO]: <Crown className="h-4 w-4" />,
  [NivelLicencia.FRANQUICIA]: <Building className="h-4 w-4" />,
}

const LICENSE_COLORS = {
  [NivelLicencia.GRATIS]: "bg-gray-100 text-gray-800 border-gray-200",
  [NivelLicencia.LITE]: "bg-blue-100 text-blue-800 border-blue-200",
  [NivelLicencia.PRO]: "bg-purple-100 text-purple-800 border-purple-200",
  [NivelLicencia.FRANQUICIA]: "bg-orange-100 text-orange-800 border-orange-200",
}

const FEATURE_REQUIREMENTS = {
  gestionProductos: NivelLicencia.GRATIS,
  ventaComedor: NivelLicencia.GRATIS,
  ventaMostrador: NivelLicencia.LITE,
  ventaDomicilio: NivelLicencia.LITE,
  menuDigital: NivelLicencia.LITE,
  reportesBasicos: NivelLicencia.LITE,
  reportesAvanzados: NivelLicencia.PRO,
  controlInventario: NivelLicencia.PRO,
  integracionesAPI: NivelLicencia.PRO,
  campanaSMS: NivelLicencia.PRO,
  programaLealtad: NivelLicencia.PRO,
  multiSucursal: NivelLicencia.FRANQUICIA,
  reportesCorporativos: NivelLicencia.FRANQUICIA,
  dashboardCentralizado: NivelLicencia.FRANQUICIA,
}

const FEATURE_NAMES = {
  gestionProductos: "Gestión de Productos",
  ventaComedor: "Venta en Comedor",
  ventaMostrador: "Venta en Mostrador",
  ventaDomicilio: "Venta a Domicilio",
  menuDigital: "Menú Digital",
  reportesBasicos: "Reportes Básicos",
  reportesAvanzados: "Reportes Avanzados",
  controlInventario: "Control de Inventario",
  integracionesAPI: "Integraciones API",
  campanaSMS: "Campañas SMS",
  programaLealtad: "Programa de Lealtad",
  multiSucursal: "Multi-sucursal",
  reportesCorporativos: "Reportes Corporativos",
  dashboardCentralizado: "Dashboard Centralizado",
}

function hasLicenseAccess(currentLicense: NivelLicencia, requiredLicense: NivelLicencia): boolean {
  const licenseOrder = {
    [NivelLicencia.GRATIS]: 0,
    [NivelLicencia.LITE]: 1,
    [NivelLicencia.PRO]: 2,
    [NivelLicencia.FRANQUICIA]: 3,
  }

  return licenseOrder[currentLicense] >= licenseOrder[requiredLicense]
}

export function LicenseGuard({ children, requiredLicense, feature, fallback, showUpgrade = true }: LicenseGuardProps) {
  const { currentLicense, hasFeature } = useLicense()

  // Determinar si tiene acceso
  let hasAccess = false
  let actualRequiredLicense = requiredLicense

  if (feature) {
    hasAccess = hasFeature(feature)
    actualRequiredLicense = FEATURE_REQUIREMENTS[feature] || NivelLicencia.PRO
  } else if (requiredLicense) {
    hasAccess = hasLicenseAccess(currentLicense, requiredLicense)
    actualRequiredLicense = requiredLicense
  } else {
    hasAccess = true // Si no se especifica nada, permitir acceso
  }

  if (hasAccess) {
    return <>{children}</>
  }

  // Si se proporciona un fallback personalizado
  if (fallback) {
    return <>{fallback}</>
  }

  // Si no se debe mostrar el upgrade, no renderizar nada
  if (!showUpgrade) {
    return null
  }

  // Mostrar mensaje de upgrade
  const featureName = feature ? FEATURE_NAMES[feature] || feature : "esta funcionalidad"

  return (
    <Card className="border-dashed border-2 border-orange-200">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <Lock className="w-6 h-6 text-orange-600" />
          </div>
        </div>
        <CardTitle className="text-lg text-orange-800">Funcionalidad Bloqueada</CardTitle>
        <CardDescription>
          {featureName} requiere una licencia {actualRequiredLicense}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Actual:</span>
            <Badge variant="outline" className={LICENSE_COLORS[currentLicense]}>
              {LICENSE_ICONS[currentLicense]}
              {currentLicense}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Requerida:</span>
            <Badge variant="outline" className={LICENSE_COLORS[actualRequiredLicense!]}>
              {LICENSE_ICONS[actualRequiredLicense!]}
              {actualRequiredLicense}
            </Badge>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Cambia tu licencia en el selector de arriba para probar esta funcionalidad
        </p>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-xs text-orange-700">
            💡 <strong>Modo Demo:</strong> Usa el selector de licencia en la parte superior para cambiar entre planes y
            probar diferentes funcionalidades
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
