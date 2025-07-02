"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Crown, ArrowUp } from "lucide-react"
import { useLicense } from "@/contexts/license-context"
import { hasAccess, FEATURES, getUpgradeMessage, getLicenseColor } from "@/utils/license"

interface LicenseGuardProps {
  feature: string
  children: ReactNode
  fallback?: ReactNode
  showUpgradeCard?: boolean
}

export function LicenseGuard({ feature, children, fallback, showUpgradeCard = true }: LicenseGuardProps) {
  const { currentLicense, setLicense } = useLicense()
  const featureConfig = FEATURES[feature]

  if (!featureConfig) {
    console.warn(`Feature "${feature}" not found in license configuration`)
    return <>{children}</>
  }

  const hasFeatureAccess = hasAccess(currentLicense, featureConfig.requiredLicense)

  if (hasFeatureAccess) {
    return <>{children}</>
  }

  if (fallback !== undefined) {
    return <>{fallback}</>
  }

  if (!showUpgradeCard) {
    return null
  }

  return (
    <Card className="border-2 border-dashed border-orange-200 bg-orange-50/30">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
          <Lock className="h-6 w-6 text-orange-600" />
        </div>
        <CardTitle className="text-lg text-orange-800">Funcionalidad Bloqueada</CardTitle>
        <CardDescription className="text-orange-700">
          {getUpgradeMessage(featureConfig.name, featureConfig.requiredLicense)}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="text-gray-600">
            Plan Actual: {currentLicense}
          </Badge>
          <ArrowUp className="h-4 w-4 text-orange-500" />
          <Badge className={`${getLicenseColor(featureConfig.requiredLicense)} text-white`}>
            Requiere: {featureConfig.requiredLicense}
          </Badge>
        </div>

        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLicense(featureConfig.requiredLicense)}
            className="text-orange-600 border-orange-200 hover:bg-orange-50"
          >
            <Crown className="h-4 w-4 mr-1" />
            Probar {featureConfig.requiredLicense}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">En un entorno real, esto te llevaría a la página de facturación</p>
      </CardContent>
    </Card>
  )
}
