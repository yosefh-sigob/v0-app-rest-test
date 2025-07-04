"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Loader2, User, Lock, Hash, Eye, EyeOff } from "lucide-react"
import { loginSchema, type LoginFormData } from "@/schemas/auth.schemas"
import { useAuth } from "@/contexts/auth-context"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPin, setShowPin] = useState(false)
  const [loginType, setLoginType] = useState<"password" | "pin">("password")
  const { login, isLoading } = useAuth()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usuario: "",
      contraseña: "",
      pin: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    const credentials = {
      usuario: data.usuario,
      contraseña: data.contraseña,
      ...(loginType === "pin" && { pin: data.pin }),
    }

    await login(credentials)
  }

  const demoUsers = [
    { usuario: "admin", rol: "Administrador", contraseña: "admin123", pin: "1234" },
    { usuario: "mesero", rol: "Mesero", contraseña: "mesero123", pin: "5678" },
    { usuario: "cajero", rol: "Cajero", contraseña: "cajero123", pin: "9012" },
    { usuario: "cocinero", rol: "Cocinero", contraseña: "cocina123", pin: "3456" },
  ]

  const fillDemoUser = (usuario: string, contraseña: string, pin: string) => {
    form.setValue("usuario", usuario)
    form.setValue("contraseña", contraseña)
    form.setValue("pin", pin)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo y título */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full shadow-lg">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AppRest</h1>
          <p className="text-gray-600">Sistema de Gestión para Restaurantes</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">Ingresa tus credenciales para acceder al sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={loginType} onValueChange={(value) => setLoginType(value as "password" | "pin")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Contraseña
                </TabsTrigger>
                <TabsTrigger value="pin" className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  PIN
                </TabsTrigger>
              </TabsList>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="usuario">Usuario</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="usuario"
                      placeholder="Ingresa tu usuario"
                      className="pl-10"
                      {...form.register("usuario")}
                    />
                  </div>
                  {form.formState.errors.usuario && (
                    <p className="text-sm text-red-600">{form.formState.errors.usuario.message}</p>
                  )}
                </div>

                <TabsContent value="password" className="space-y-2 mt-0">
                  <Label htmlFor="contraseña">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="contraseña"
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresa tu contraseña"
                      className="pl-10 pr-10"
                      {...form.register("contraseña")}
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
                  {form.formState.errors.contraseña && (
                    <p className="text-sm text-red-600">{form.formState.errors.contraseña.message}</p>
                  )}
                </TabsContent>

                <TabsContent value="pin" className="space-y-2 mt-0">
                  <Label htmlFor="pin">PIN (4 dígitos)</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="pin"
                      type={showPin ? "text" : "password"}
                      placeholder="Ingresa tu PIN"
                      maxLength={4}
                      className="pl-10 pr-10"
                      {...form.register("pin")}
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
                  {form.formState.errors.pin && (
                    <p className="text-sm text-red-600">{form.formState.errors.pin.message}</p>
                  )}
                </TabsContent>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                  disabled={isLoading}
                >
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
            </Tabs>

            <Separator />

            {/* Usuarios demo */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600 text-center font-medium">Usuarios de Demostración</p>
              <div className="grid grid-cols-2 gap-2">
                {demoUsers.map((user) => (
                  <Button
                    key={user.usuario}
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-2 text-xs bg-transparent"
                    onClick={() => fillDemoUser(user.usuario, user.contraseña, user.pin)}
                    disabled={isLoading}
                  >
                    <Badge variant="secondary" className="text-xs">
                      {user.rol}
                    </Badge>
                    <span className="font-mono">{user.usuario}</span>
                  </Button>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center">
                Haz clic en cualquier usuario para llenar automáticamente los campos
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500">© 2024 AppRest - Sistema de Gestión para Restaurantes</p>
      </div>
    </div>
  )
}
