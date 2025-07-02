"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Check } from "lucide-react"
import { LICENSES, getLicenseColor, getLicenseIcon } from "@/utils/license"

interface LicenseSelectorProps {
  currentLicense: string
  onLicenseChange: (license: string) => void
}

export function LicenseSelector({ currentLicense, onLicenseChange }: LicenseSelectorProps) {
  return (
    <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Crown className="h-5 w-5" />
          Selector de Licencia - Demo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {LICENSES.map((license) => {
            const isActive = currentLicense === license.name
            const IconComponent = getLicenseIcon(license.name)

            return (
              <Button
                key={license.name}
                variant={isActive ? "default" : "outline"}
                onClick={() => onLicenseChange(license.name)}
                className={`h-auto p-4 flex flex-col items-center gap-2 ${
                  isActive
                    ? `${getLicenseColor(license.name)} text-white hover:opacity-90`
                    : "hover:bg-orange-50 border-orange-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4" />
                  <span className="font-semibold">{license.name}</span>
                  {isActive && <Check className="h-4 w-4" />}
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{license.price}</div>
                  <div className="text-xs opacity-75">{license.period}</div>
                </div>
                <Badge variant={isActive ? "secondary" : "outline"} className="text-xs">
                  {license.features.length} funciones
                </Badge>
              </Button>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Plan actual:</strong> {currentLicense} •<strong> Funciones disponibles:</strong>{" "}
            {LICENSES.find((l) => l.name === currentLicense)?.features.length || 0}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
