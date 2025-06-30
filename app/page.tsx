import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Users, CreditCard, Phone, Mail, MapPin } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="restaurant-gradient text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ChefHat className="h-10 w-10" />
              <div>
                <h1 className="text-3xl font-bold">AppRest</h1>
                <p className="text-orange-100">Sistema de Gestión Restaurante</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>info@apprest.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Bienvenido a <span className="text-orange-600">AppRest</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            La solución completa para la gestión de tu restaurante. Controla ventas, mesas, inventario y más desde una
            sola plataforma.
          </p>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="restaurant-card group hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Panel de Mesero</CardTitle>
                <CardDescription className="text-gray-600">
                  Gestiona tus mesas asignadas, toma órdenes y brinda el mejor servicio
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/mesero">
                  <Button size="lg" className="w-full restaurant-gradient text-white hover:opacity-90">
                    Acceder como Mesero
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="restaurant-card group hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Panel de Cajero</CardTitle>
                <CardDescription className="text-gray-600">
                  Procesa pagos, gestiona cuentas y mantén el control financiero
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/cajero">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    Acceder como Cajero
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Admin Access */}
          <div className="mt-12">
            <Card className="restaurant-card max-w-md mx-auto">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <ChefHat className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Panel Administrativo</CardTitle>
                <CardDescription>Acceso completo al sistema de gestión</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
                  >
                    Dashboard Completo
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Características Principales</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Gestión de Mesas</h4>
              <p className="text-gray-600">Control completo del estado de mesas y reservaciones</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Punto de Venta</h4>
              <p className="text-gray-600">Sistema POS completo con múltiples métodos de pago</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Gestión de Inventario</h4>
              <p className="text-gray-600">Control de productos, categorías y stock en tiempo real</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ChefHat className="h-8 w-8 text-orange-500" />
                <span className="text-2xl font-bold">AppRest</span>
              </div>
              <p className="text-gray-400">La solución completa para la gestión moderna de restaurantes.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contacto</h5>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@apprest.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>123 Restaurant St, Food City</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Soporte</h5>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  Centro de Ayuda
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  Contactar Soporte
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AppRest. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
