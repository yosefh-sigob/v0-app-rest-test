"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Crown, Zap, Building } from "lucide-react"
import { NivelLicencia } from "@/interfaces/database"
import { hasLicenseAccess, getLicenseUpgradeMessage, getFeatureByName } from "@/utils/license"

interface LicenseGuardProps {
  children: ReactNode
  requiredLicense?: NivelLicencia
  feature?: string
  currentLicense?: NivelLicencia
  fallback?: ReactNode
  showUpgrade?: boolean
}

const LICENSE_ICONS = {
  [NivelLicencia.GRATIS]: <div className="w-5 h-5 rounded-full bg-gray-400" />,
  [NivelLicencia.LITE]: <Zap className="w-5 h-5 text-blue-500" />,
  [NivelLicencia.PRO]: <Crown className="w-5 h-5 text-purple-500" />,
  [NivelLicencia.FRANQUICIA]: <Building className="w-5 h-5 text-orange-500" />,
}

const LICENSE_COLORS = {
  [NivelLicencia.GRATIS]: "bg-gray-100 text-gray-800 border-gray-200",
  [NivelLicencia.LITE]: "bg-blue-100 text-blue-800 border-blue-200",
  [NivelLicencia.PRO]: "bg-purple-100 text-purple-800 border-purple-200",
  [NivelLicencia.FRANQUICIA]: "bg-orange-100 text-orange-800 border-orange-200",
}

export function LicenseGuard({
  children,
  requiredLicense = NivelLicencia.GRATIS,
  feature,
  currentLicense = NivelLicencia.GRATIS, // En producción vendría de la sesión
  fallback,
  showUpgrade = true,
}: LicenseGuardProps) {
  // Si se proporciona un feature, obtener la licencia requerida
  const featureInfo = feature ? getFeatureByName(feature) : null
  const actualRequiredLicense = featureInfo?.requiredLicense || requiredLicense

  // Verificar si tiene acceso
  const hasAccess = hasLicenseAccess(currentLicense, actualRequiredLicense)

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
  const upgradeMessage = getLicenseUpgradeMessage(currentLicense, actualRequiredLicense)
  const featureName = featureInfo?.name || "esta funcionalidad"

  return (
    <Card className="border-dashed">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center mb-2">
          <Lock className="w-8 h-8 text-muted-foreground" />
        </div>
        <CardTitle className="text-lg">Funcionalidad Bloqueada</CardTitle>
        <CardDescription>{featureName} requiere una licencia superior</CardDescription>
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
            <Badge variant="outline" className={LICENSE_COLORS[actualRequiredLicense]}>
              {LICENSE_ICONS[actualRequiredLicense]}
              {actualRequiredLicense}
            </Badge>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{upgradeMessage}</p>

        <Button className="bg-orange-600 hover:bg-orange-700">
          <Crown className="w-4 h-4 mr-2" />
          Actualizar Licencia
        </Button>
      </CardContent>
    </Card>
  )
}
