"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Crown, Zap, Rocket, Building, Check, X, Info } from "lucide-react"
import type { LicenseType } from "@/utils/license"

interface LicenseSelectorProps {
  currentLicense: LicenseType
  onLicenseChange: (license: LicenseType) => void
}

const LICENSE_CONFIG = {
  Gratis: {
    name: "Gratis",
    icon: <Info className="h-5 w-5" />,
    color: "bg-gray-100 text-gray-800 border-gray-200",
    buttonColor: "bg-gray-600 hover:bg-gray-700",
    price: "Gratis",
    description: "Perfecto para empezar",
    features: [
      { name: "Gestión básica de productos", included: true },
      { name: "Hasta 50 productos", included: true },
      { name: "1 usuario", included: true },
      { name: "Soporte por email", included: true },
      { name: "Reportes básicos", included: false },
      { name: "Múltiples sucursales", included: false },
      { name: "Integración POS", included: false },
      { name: "API avanzada", included: false },
    ],
  },
  Lite: {
    name: "Lite",
    icon: <Zap className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    price: "$29/mes",
    description: "Para restaurantes pequeños",
    features: [
      { name: "Gestión completa de productos", included: true },
      { name: "Hasta 500 productos", included: true },
      { name: "3 usuarios", included: true },
      { name: "Soporte prioritario", included: true },
      { name: "Reportes básicos", included: true },
      { name: "Múltiples sucursales", included: false },
      { name: "Integración POS", included: false },
      { name: "API avanzada", included: false },
    ],
  },
  Pro: {
    name: "Pro",
    icon: <Rocket className="h-5 w-5" />,
    color: "bg-orange-100 text-orange-800 border-orange-200",
    buttonColor: "bg-orange-600 hover:bg-orange-700",
    price: "$79/mes",
    description: "Para restaurantes en crecimiento",
    features: [
      { name: "Gestión ilimitada de productos", included: true },
      { name: "Productos ilimitados", included: true },
      { name: "10 usuarios", included: true },
      { name: "Soporte 24/7", included: true },
      { name: "Reportes avanzados", included: true },
      { name: "Hasta 3 sucursales", included: true },
      { name: "Integración POS", included: true },
      { name: "API avanzada", included: false },
    ],
  },
  Franquicia: {
    name: "Franquicia",
    icon: <Building className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-800 border-purple-200",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
    price: "$199/mes",
    description: "Para cadenas y franquicias",
    features: [
      { name: "Gestión empresarial completa", included: true },
      { name: "Productos ilimitados", included: true },
      { name: "Usuarios ilimitados", included: true },
      { name: "Soporte dedicado", included: true },
      { name: "Reportes empresariales", included: true },
      { name: "Sucursales ilimitadas", included: true },
      { name: "Integración POS completa", included: true },
      { name: "API completa", included: true },
    ],
  },
}

export function LicenseSelector({ currentLicense, onLicenseChange }: LicenseSelectorProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-orange-600" />
            <span>Plan Actual</span>
          </div>
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Ver Planes
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Planes y Precios</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(LICENSE_CONFIG).map(([key, config]) => (
                  <Card
                    key={key}
                    className={`relative ${currentLicense === key ? "ring-2 ring-orange-500 ring-offset-2" : ""}`}
                  >
                    <CardHeader className="text-center">
                      <div className={`inline-flex p-2 rounded-lg ${config.color.split(" ")[0]} mb-2`}>
                        {config.icon}
                      </div>
                      <CardTitle className="text-lg">{config.name}</CardTitle>
                      <div className="text-2xl font-bold">{config.price}</div>
                      <p className="text-sm text-muted-foreground">{config.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <ul className="space-y-2">
                        {config.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            {feature.included ? (
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            ) : (
                              <X className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            )}
                            <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                          </li>
                        ))}
                      </ul>
                      <Separator />
                      <Button
                        onClick={() => {
                          onLicenseChange(key as LicenseType)
                          setShowDetails(false)
                        }}
                        className={`w-full ${config.buttonColor}`}
                        variant={currentLicense === key ? "outline" : "default"}
                      >
                        {currentLicense === key ? "Plan Actual" : "Seleccionar"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className={`${LICENSE_CONFIG[currentLicense].color} border`}>
              {LICENSE_CONFIG[currentLicense].icon}
              {LICENSE_CONFIG[currentLicense].name}
            </Badge>
            <span className="text-sm text-muted-foreground">{LICENSE_CONFIG[currentLicense].description}</span>
          </div>
          <div className="flex gap-2">
            {(Object.keys(LICENSE_CONFIG) as LicenseType[]).map((license) => (
              <Button
                key={license}
                variant={currentLicense === license ? "default" : "outline"}
                size="sm"
                onClick={() => onLicenseChange(license)}
                className={currentLicense === license ? LICENSE_CONFIG[license].buttonColor : ""}
              >
                {LICENSE_CONFIG[license].name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
