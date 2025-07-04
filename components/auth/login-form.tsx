"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2, ChefHat, User, Lock, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { loginSchema, type LoginFormData } from "@/schemas/auth.schemas"

const DEMO_USERS = [
  {
    usuario: "admin",
    contraseña: "admin123",
    pin: "1234",
    nombre: "Juan Carlos Administrador",
    rol: "Administrador",
    licencia: "FRANQUICIA",
    color: "bg-red-500",
    descripcion: "Acceso completo al sistema",
  },
  {
    usuario: "gerente",
    contraseña: "gerente123",
    pin: "7890",
    nombre: "María Elena Gerente",
    rol: "Gerente",
    licencia: "PRO",
    color: "bg-blue-500",
    descripcion: "Gestión y reportes avanzados",
  },
  {
    usuario: "cajero",
    contraseña: "cajero123",
    pin: "9012",
    nombre: "Pedro Luis Cajero",
    rol: "Cajero",
    licencia: "LITE",
    color: "bg-green-500",
    descripcion: "Punto de venta y cobros",
  },
  {
    usuario: "mesero",
    contraseña: "mesero123",
    pin: "5678",
    nombre: "Ana Sofia Mesero",
    rol: "Mesero",
    licencia: "LITE",
    color: "bg-purple-500",
    descripcion: "Gestión de mesas y órdenes",
  },
  {
    usuario: "cocinero",
    contraseña: "cocina123",
    pin: "3456",
    nombre: "Roberto Chef Cocinero",
    rol: "Cocinero",
    licencia: "GRATIS",
    color: "bg-orange-500",
    descripcion: "Cocina e inventario básico",
  },
]

export function LoginForm() {
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showPin, setShowPin] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usuario: "",
      contraseña: "",
      pin: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    await login(data)
  }

  const handleDemoLogin = (demoUser: (typeof DEMO_USERS)[0]) => {
    form.setValue("usuario", demoUser.usuario)
    form.setValue("contraseña", demoUser.contraseña)
    form.setValue("pin", demoUser.pin)
    setActiveTab("login")
  }

  const getUserInitials = (nombre: string) => {
    const names = nombre.split(" ")
    return names.length >= 2 ? names[0][0] + names[1][0] : names[0][0]
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-gray-900">AppRest</CardTitle>
            <CardDescription className="text-gray-600 mt-2">Sistema de Gestión de Restaurantes</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="text-sm">
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger value="demo" className="text-sm">
                Usuarios Demo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="usuario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Usuario</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              placeholder="Ingresa tu usuario"
                              className="pl-10 h-11"
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contraseña"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Ingresa tu contraseña"
                              className="pl-10 pr-10 h-11"
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">PIN</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              type={showPin ? "text" : "password"}
                              placeholder="PIN de 4 dígitos"
                              className="pl-10 pr-10 h-11"
                              maxLength={4}
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPin(!showPin)}
                              disabled={isLoading}
                            >
                              {showPin ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Iniciando sesión...
                      </>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="demo" className="space-y-4">
              <div className="text-center text-sm text-gray-600 mb-4">
                Selecciona un usuario para auto-completar las credenciales
              </div>

              <div className="space-y-3">
                {DEMO_USERS.map((user) => (
                  <Card
                    key={user.usuario}
                    className="cursor-pointer hover:shadow-md transition-all duration-200 border hover:border-orange-200"
                    onClick={() => handleDemoLogin(user)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full ${user.color} flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">{getUserInitials(user.nombre)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-gray-900">{user.nombre}</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {user.rol}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {user.licencia}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{user.descripcion}</p>
                          <Separator className="my-2" />
                          <div className="text-xs text-gray-500 space-y-1">
                            <div>
                              Usuario: <span className="font-mono">{user.usuario}</span>
                            </div>
                            <div>
                              Contraseña: <span className="font-mono">{user.contraseña}</span>
                            </div>
                            <div>
                              PIN: <span className="font-mono">{user.pin}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center pt-4">
                <Button
                  onClick={() => setActiveTab("login")}
                  variant="ghost"
                  size="sm"
                  className="text-orange-600 hover:text-orange-700"
                >
                  ← Volver al formulario de login
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
