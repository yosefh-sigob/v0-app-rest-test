"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Zap } from "lucide-react"
import type { NivelLicencia } from "@/interfaces/database"
import { hasLicenseFeature, getLicenseUpgradeMessage, type LicenseFeatures } from "@/utils/license"

interface LicenseGuardProps {
  children: ReactNode
  currentLicense: NivelLicencia
  requiredFeature: keyof LicenseFeatures
  fallback?: ReactNode
  showUpgradePrompt?: boolean
}

export function LicenseGuard({
  children,
  currentLicense,
  requiredFeature,
  fallback,
  showUpgradePrompt = true,
}: LicenseGuardProps) {
  const hasAccess = hasLicenseFeature(currentLicense, requiredFeature)

  if (hasAccess) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  if (!showUpgradePrompt) {
    return null
  }

  const upgradeMessage = getLicenseUpgradeMessage(currentLicense, requiredFeature)

  return (
    <Card className="border-dashed border-2 border-muted-foreground/25">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Lock className="w-6 h-6 text-muted-foreground" />
        </div>
        <CardTitle className="text-lg">Funcionalidad Restringida</CardTitle>
        <CardDescription>{upgradeMessage}</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-muted-foreground">Plan actual:</span>
          <Badge variant="outline">{currentLicense}</Badge>
        </div>
        <Button className="w-full" size="sm">
          <Zap className="w-4 h-4 mr-2" />
          Actualizar Plan
        </Button>
      </CardContent>
    </Card>
  )
}
