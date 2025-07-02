"use client"

import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Crown, ArrowUp } from "lucide-react"
import { useLicense } from "@/contexts/license-context"
import { hasAccess, FEATURES, getUpgradeMessage, getLicenseColor } from "@/utils/license"

interface LicenseGuardProps {
  feature: string
  children: ReactNode
  fallback?: ReactNode
  showUpgrade?: boolean
}

export function LicenseGuard({ feature, children, fallback, showUpgrade = true }: LicenseGuardProps) {
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

  if (!showUpgrade) {
    return null
  }

  return (
    <Card className="border-2 border-dashed border-orange-200 bg-orange-50/30">
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-full">
            <Lock className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">
              {featureConfig.name} - Plan {featureConfig.requiredLicense}
            </h3>
            <p className="text-muted-foreground mb-4">
              {getUpgradeMessage(featureConfig.name, featureConfig.requiredLicense)}
            </p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="outline">Plan actual: {currentLicense}</Badge>
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
              <Badge className={`${getLicenseColor(featureConfig.requiredLicense)} text-white`}>
                <Crown className="h-3 w-3 mr-1" />
                Plan {featureConfig.requiredLicense}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setLicense(featureConfig.requiredLicense)}>
              Probar {featureConfig.requiredLicense}
            </Button>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              Actualizar Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
