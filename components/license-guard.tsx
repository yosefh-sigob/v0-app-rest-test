"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Crown, ArrowUp } from "lucide-react"
import { useLicense } from "@/contexts/license-context"
import { canAccessFeature, getUpgradeMessage, LICENSE_FEATURES } from "@/utils/license"
import type { LicenseType } from "@/utils/license"

interface LicenseGuardProps {
  feature: string
  children: ReactNode
  fallback?: ReactNode
  showUpgrade?: boolean
}

const LICENSE_COLORS: Record<LicenseType, string> = {
  Gratis: "bg-gray-100 text-gray-800 border-gray-200",
  Lite: "bg-blue-100 text-blue-800 border-blue-200",
  Pro: "bg-orange-100 text-orange-800 border-orange-200",
  Franquicia: "bg-purple-100 text-purple-800 border-purple-200",
}

export function LicenseGuard({ feature, children, fallback, showUpgrade = true }: LicenseGuardProps) {
  const { currentLicense, setLicense } = useLicense()

  if (canAccessFeature(currentLicense, feature)) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  if (!showUpgrade) {
    return null
  }

  const featureInfo = LICENSE_FEATURES[feature]
  const requiredLicense = featureInfo?.requiredLicense || "Pro"

  return (
    <Card className="border-dashed border-2 border-orange-200 bg-orange-50/50">
      <CardHeader className="text-center pb-3">
        <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
          <Lock className="h-6 w-6 text-orange-600" />
        </div>
        <CardTitle className="text-lg text-orange-900">{featureInfo?.name || "Funcionalidad Premium"}</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-sm text-orange-700">{getUpgradeMessage(feature)}</p>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Requiere plan:</span>
          <Badge className={`${LICENSE_COLORS[requiredLicense]} border`}>
            <Crown className="h-3 w-3 mr-1" />
            {requiredLicense}
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button onClick={() => setLicense(requiredLicense)} className="bg-orange-600 hover:bg-orange-700" size="sm">
            <ArrowUp className="h-4 w-4 mr-2" />
            Probar {requiredLicense}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setLicense("Franquicia")}>
            Ver Todos los Planes
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Puedes cambiar de plan en cualquier momento para probar las funcionalidades
        </p>
      </CardContent>
    </Card>
  )
}
