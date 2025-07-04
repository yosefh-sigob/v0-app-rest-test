"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useAuth } from "@/contexts/auth-context"
import { loginSchema, type LoginFormData } from "@/schemas/auth.schemas"
import { ChefHat, Eye, EyeOff, Loader2, User, Lock, Hash } from "lucide-react"

const demoUsers = [
  {
    usuario: "admin",
    contraseña: "admin123",
    pin: "1234",
    nombre: "Administrador Sistema",
    rol: "Administrador",
    color: "bg-purple-100 text-purple-800",
  },
  {
    usuario: "gerente",
    contraseña: "gerente123",
    pin: "7890",
    nombre: "María García López",
    rol: "Gerente",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    usuario: "cajero",
    contraseña: "cajero123",
    pin: "9012",
    nombre: "Carlos Rodríguez",
    rol: "Cajero",
    color: "bg-green-100 text-green-800",
  },
  {
    usuario: "mesero",
    contraseña: "mesero123",
    pin: "5678",
    nombre: "Ana Martínez",
    rol: "Mesero",
    color: "bg-blue-100 text-blue-800",
  },
  {
    usuario: "cocinero",
    contraseña: "cocina123",
    pin: "3456",
    nombre: "José Luis Hernández",
    rol: "Cocinero",
    color: "bg-orange-100 text-orange-800",
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
    const success = await login(data)
    if (success) {
      // Redirect will be handled by the auth context
      window.location.href = "/dashboard"
    }
  }

  const fillDemoUser = (demoUser: (typeof demoUsers)[0]) => {
    form.setValue("usuario", demoUser.usuario)
    form.setValue("contraseña", demoUser.contraseña)
    form.setValue("pin", demoUser.pin)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <ChefHat className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">AppRest</CardTitle>
            <CardDescription className="text-gray-600">Sistema de Gestión de Restaurante</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
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
                            <Input {...field} placeholder="Ingresa tu usuario" className="pl-10" />
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
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                              placeholder="Ingresa tu PIN"
                              className="pl-10 pr-10"
                              maxLength={6}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPin(!showPin)}
                            >
                              {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
              <div className="text-center text-sm text-gray-600 mb-4">
                Haz clic en cualquier usuario para auto-completar las credenciales
              </div>

              <div className="space-y-3">
                {demoUsers.map((user) => (
                  <Button
                    key={user.usuario}
                    variant="outline"
                    className="w-full h-auto p-4 justify-start bg-transparent"
                    onClick={() => fillDemoUser(user)}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {user.nombre
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{user.nombre}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className={`text-xs ${user.color}`}>
                            {user.rol}
                          </Badge>
                          <span className="text-xs text-gray-500">@{user.usuario}</span>
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>

              <Separator />

              <div className="text-xs text-gray-500 space-y-1">
                <p>
                  <strong>Credenciales:</strong> Todas usan contraseña {"{rol}"}123 y PIN único
                </p>
                <p>
                  <strong>Ejemplo:</strong> admin/admin123/1234
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
