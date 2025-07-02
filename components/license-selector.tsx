"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, Zap, Crown, Building, Check, Info } from "lucide-react"
import { NivelLicencia } from "@/interfaces/database"

interface LicenseSelectorProps {
  currentLicense: NivelLicencia
  onLicenseChange: (license: NivelLicencia) => void
}

const LICENSE_CONFIG = {
  [NivelLicencia.GRATIS]: {
    name: "Gratis",
    icon: <Star className="h-5 w-5" />,
    color: "bg-gray-100 text-gray-800 border-gray-300",
    buttonColor: "bg-gray-600 hover:bg-gray-700",
    description: "Perfecto para empezar",
    price: "$0",
    features: [
      "Gestión básica de productos",
      "Venta en comedor",
      "Hasta 50 productos",
      "1 usuario",
      "Soporte por email",
    ],
  },
  [NivelLicencia.LITE]: {
    name: "Lite",
    icon: <Zap className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-800 border-blue-300",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    description: "Para restaurantes pequeños",
    price: "$29",
    features: [
      "Todo lo de Gratis +",
      "Venta mostrador y domicilio",
      "Menú digital QR",
      "Reportes básicos",
      "Hasta 200 productos",
      "3 usuarios",
    ],
  },
  [NivelLicencia.PRO]: {
    name: "Pro",
    icon: <Crown className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-800 border-purple-300",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
    description: "Para restaurantes establecidos",
    price: "$79",
    features: [
      "Todo lo de Lite +",
      "Reportes avanzados",
      "Control de inventario",
      "Integraciones API",
      "Campañas SMS",
      "Productos ilimitados",
      "10 usuarios",
    ],
  },
  [NivelLicencia.FRANQUICIA]: {
    name: "Franquicia",
    icon: <Building className="h-5 w-5" />,
    color: "bg-orange-100 text-orange-800 border-orange-300",
    buttonColor: "bg-orange-600 hover:bg-orange-700",
    description: "Para cadenas y franquicias",
    price: "$199",
    features: [
      "Todo lo de Pro +",
      "Multi-sucursal",
      "Reportes corporativos",
      "Dashboard centralizado",
      "Usuarios ilimitados",
      "Soporte prioritario",
    ],
  },
}

export function LicenseSelector({ currentLicense, onLicenseChange }: LicenseSelectorProps) {
  const currentConfig = LICENSE_CONFIG[currentLicense]

  return (
    <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Info className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-orange-800">Modo Demo - Selector de Licencia</CardTitle>
              <CardDescription className="text-orange-600">
                Cambia entre planes para probar diferentes funcionalidades
              </CardDescription>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-orange-600 border-orange-300 hover:bg-orange-50 bg-transparent"
              >
                Ver Planes
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Planes y Precios</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {Object.entries(LICENSE_CONFIG).map(([license, config]) => (
                  <Card
                    key={license}
                    className={`relative ${license === currentLicense ? "ring-2 ring-orange-500" : ""}`}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className="flex justify-center mb-2">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${config.color}`}>
                          {config.icon}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{config.name}</CardTitle>
                      <CardDescription>{config.description}</CardDescription>
                      <div className="text-2xl font-bold text-gray-900">
                        {config.price}
                        <span className="text-sm font-normal text-gray-500">/mes</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {config.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-orange-700">Plan Actual:</span>
            <Badge className={`${currentConfig.color} border`}>
              {currentConfig.icon}
              {currentConfig.name}
            </Badge>
          </div>
          <div className="flex gap-2">
            {Object.entries(LICENSE_CONFIG).map(([license, config]) => (
              <Button
                key={license}
                variant={license === currentLicense ? "default" : "outline"}
                size="sm"
                onClick={() => onLicenseChange(license as NivelLicencia)}
                className={license === currentLicense ? config.buttonColor : ""}
              >
                {config.icon}
                {config.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
