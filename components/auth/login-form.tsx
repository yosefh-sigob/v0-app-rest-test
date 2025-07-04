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
import { useAuth } from "@/contexts/auth-context"
import { loginSchema, type LoginFormData } from "@/schemas/auth.schemas"

const DEMO_USERS = [
  {
    usuario: "admin",
    contraseña: "admin123",
    pin: "1234",
    nombre: "Juan Carlos Administrador",
    rol: "Administrador",
    badge: "FRANQUICIA",
    color: "bg-red-500",
  },
  {
    usuario: "gerente",
    contraseña: "gerente123",
    pin: "7890",
    nombre: "María Elena Gerente",
    rol: "Gerente",
    badge: "PRO",
    color: "bg-blue-500",
  },
  {
    usuario: "cajero",
    contraseña: "cajero123",
    pin: "9012",
    nombre: "Pedro Luis Cajero",
    rol: "Cajero",
    badge: "LITE",
    color: "bg-green-500",
  },
  {
    usuario: "mesero",
    contraseña: "mesero123",
    pin: "5678",
    nombre: "Ana Sofia Mesero",
    rol: "Mesero",
    badge: "LITE",
    color: "bg-purple-500",
  },
  {
    usuario: "cocinero",
    contraseña: "cocina123",
    pin: "3456",
    nombre: "Roberto Chef Cocinero",
    rol: "Cocinero",
    badge: "GRATIS",
    color: "bg-orange-500",
  },
]

export function LoginForm() {
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showPin, setShowPin] = useState(false)

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
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">AppRest</CardTitle>
          <CardDescription>Sistema de Gestión de Restaurantes</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
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
                            <Input {...field} placeholder="Ingresa tu usuario" className="pl-10" disabled={isLoading} />
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
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Ingresa tu contraseña"
                              className="pl-10 pr-10"
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
                        <FormLabel>PIN</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              type={showPin ? "text" : "password"}
                              placeholder="Ingresa tu PIN de 4 dígitos"
                              className="pl-10 pr-10"
                              maxLength={4}
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
              <div className="text-sm text-gray-600 mb-4">
                Haz clic en cualquier usuario para auto-completar las credenciales:
              </div>
              <div className="space-y-2">
                {DEMO_USERS.map((user) => (
                  <Button
                    key={user.usuario}
                    variant="outline"
                    className="w-full justify-start h-auto p-3 bg-transparent"
                    onClick={() => handleDemoLogin(user)}
                    disabled={isLoading}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center`}>
                        <span className="text-white font-semibold text-sm">
                          {user.nombre.split(" ")[0].charAt(0)}
                          {user.nombre.split(" ")[1]?.charAt(0) || ""}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{user.nombre}</div>
                        <div className="text-sm text-gray-500">{user.rol}</div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {user.badge}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
