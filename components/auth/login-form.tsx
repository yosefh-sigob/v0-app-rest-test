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
import { ChefHat, Loader2, User, Lock, Hash } from "lucide-react"

const DEMO_USERS = [
  {
    usuario: "admin",
    contraseña: "admin123",
    pin: "1234",
    rol: "Administrador",
    color: "bg-purple-100 text-purple-800",
    descripcion: "Acceso completo al sistema",
  },
  {
    usuario: "mesero",
    contraseña: "mesero123",
    pin: "5678",
    rol: "Mesero",
    color: "bg-blue-100 text-blue-800",
    descripcion: "Gestión de mesas y órdenes",
  },
  {
    usuario: "cajero",
    contraseña: "cajero123",
    pin: "9012",
    rol: "Cajero",
    color: "bg-green-100 text-green-800",
    descripcion: "Punto de venta y pagos",
  },
  {
    usuario: "cocinero",
    contraseña: "cocina123",
    pin: "3456",
    rol: "Cocinero",
    color: "bg-orange-100 text-orange-800",
    descripcion: "Gestión de cocina",
  },
  {
    usuario: "gerente",
    contraseña: "gerente123",
    pin: "7890",
    rol: "Gerente",
    color: "bg-indigo-100 text-indigo-800",
    descripcion: "Supervisión y reportes",
  },
]

export function LoginForm() {
  const { login, isLoading } = useAuth()
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
    if (success) {
      // La redirección se maneja en el AuthenticatedLayout
    }
  }

  const handleDemoLogin = (demoUser: (typeof DEMO_USERS)[0]) => {
    form.setValue("usuario", demoUser.usuario)
    form.setValue("contraseña", demoUser.contraseña)
    form.setValue("pin", demoUser.pin)
    setActiveTab("login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <ChefHat className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">AppRest</CardTitle>
          <CardDescription>Sistema de Gestión de Restaurante</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                            <Input {...field} type="password" placeholder="Ingresa tu contraseña" className="pl-10" />
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
                              type="password"
                              placeholder="PIN de 4 dígitos"
                              maxLength={4}
                              className="pl-10"
                            />
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
                Selecciona un usuario demo para probar el sistema
              </div>

              <div className="space-y-3">
                {DEMO_USERS.map((user) => (
                  <Card
                    key={user.usuario}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleDemoLogin(user)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{user.usuario}</span>
                            <Badge variant="secondary" className={user.color}>
                              {user.rol}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{user.descripcion}</p>
                        </div>
                      </div>
                      <Separator className="my-2" />
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>Contraseña: {user.contraseña}</div>
                        <div>PIN: {user.pin}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
