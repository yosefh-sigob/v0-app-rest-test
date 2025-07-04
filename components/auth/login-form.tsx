"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, ChefHat, User, Lock, Hash, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { loginSchema, type LoginFormData } from "@/schemas/auth.schemas"

const demoUsers = [
  {
    usuario: "admin",
    contraseña: "admin123",
    pin: "1234",
    rol: "Administrador",
    descripcion: "Acceso completo al sistema",
    color: "bg-purple-500",
  },
  {
    usuario: "gerente",
    contraseña: "gerente123",
    pin: "7890",
    rol: "Gerente",
    descripcion: "Gestión y reportes",
    color: "bg-indigo-500",
  },
  {
    usuario: "cajero",
    contraseña: "cajero123",
    pin: "9012",
    rol: "Cajero",
    descripcion: "Punto de venta y cobros",
    color: "bg-green-500",
  },
  {
    usuario: "mesero",
    contraseña: "mesero123",
    pin: "5678",
    rol: "Mesero",
    descripcion: "Mesas y órdenes",
    color: "bg-blue-500",
  },
  {
    usuario: "cocinero",
    contraseña: "cocina123",
    pin: "3456",
    rol: "Cocinero",
    descripcion: "Cocina e inventario",
    color: "bg-orange-500",
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
    const success = await login(data)
    if (!success) {
      form.setError("root", {
        message: "Credenciales inválidas. Verifica usuario, contraseña y PIN.",
      })
    }
  }

  const fillDemoUser = (user: (typeof demoUsers)[0]) => {
    form.setValue("usuario", user.usuario)
    form.setValue("contraseña", user.contraseña)
    form.setValue("pin", user.pin)
    setActiveTab("login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">AppRest</CardTitle>
            <CardDescription className="text-gray-600">Sistema de Gestión de Restaurantes</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="demo">Usuarios Demo</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="usuario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usuario</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="Ingresa tu usuario" className="pl-10" {...field} />
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
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Ingresa tu contraseña"
                              className="pl-10 pr-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
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
                        <FormLabel>PIN</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type={showPin ? "text" : "password"}
                              placeholder="Ingresa tu PIN"
                              className="pl-10 pr-10"
                              maxLength={6}
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPin(!showPin)}
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

                  {form.formState.errors.root && (
                    <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md">
                      {form.formState.errors.root.message}
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
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
                Haz clic en cualquier usuario para auto-completar las credenciales
              </div>

              <div className="space-y-3">
                {demoUsers.map((user) => (
                  <Card
                    key={user.usuario}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => fillDemoUser(user)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center`}>
                          <span className="text-white font-semibold text-sm">
                            {user.usuario.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium">{user.usuario}</span>
                            <Badge variant="secondary" className="text-xs">
                              {user.rol}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{user.descripcion}</p>
                          <Separator className="my-2" />
                          <div className="text-xs text-gray-500 space-y-1">
                            <div>Contraseña: {user.contraseña}</div>
                            <div>PIN: {user.pin}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button onClick={() => setActiveTab("login")} variant="ghost" size="sm">
                  Ir al formulario de login →
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
