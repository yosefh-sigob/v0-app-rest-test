import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChefHat, CreditCard, Users, Utensils } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-gray-900">AppRest</h1>
            </div>
            <div className="text-sm text-gray-500">Sistema de Gestión de Restaurante</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Bienvenido a AppRest</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecciona tu rol para acceder al sistema de gestión del restaurante
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Mesero Card */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-orange-200">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Utensils className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Mesero</CardTitle>
              <CardDescription className="text-gray-600">
                Gestiona mesas, toma pedidos y atiende a los clientes
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-orange-500" />
                  Gestión de mesas y clientes
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Utensils className="h-4 w-4 mr-2 text-orange-500" />
                  Toma de pedidos
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ChefHat className="h-4 w-4 mr-2 text-orange-500" />
                  Seguimiento de órdenes
                </div>
              </div>
              <Link href="/mesero" className="block">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Acceder como Mesero</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Cajero Card */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-200">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Cajero</CardTitle>
              <CardDescription className="text-gray-600">
                Procesa pagos, genera facturas y maneja el punto de venta
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
                  Procesamiento de pagos
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  Facturación y recibos
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ChefHat className="h-4 w-4 mr-2 text-blue-500" />
                  Reportes de ventas
                </div>
              </div>
              <Link href="/cajero" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Acceder como Cajero</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Necesitas ayuda?</h3>
            <p className="text-gray-600 mb-4">
              Si tienes problemas para acceder al sistema o necesitas soporte técnico, contacta al administrador del
              restaurante.
            </p>
            <Button variant="outline" className="text-gray-600 border-gray-300 bg-transparent">
              Contactar Soporte
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">© 2024 AppRest - Sistema de Gestión de Restaurante</div>
        </div>
      </footer>
    </div>
  )
}
