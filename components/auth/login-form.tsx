"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { type LoginFormData, loginSchema } from "@/schemas/auth.schemas"
import { useAuth } from "@/contexts/auth-context"
import { ChefHat, User, Lock, Hash, AlertCircle } from "lucide-react"

const DEMO_USERS = [
  { username: "admin", password: "admin123", pin: "1234", role: "Administrador", color: "bg-purple-500" },
  { username: "mesero", password: "mesero123", pin: "5678", role: "Mesero", color: "bg-blue-500" },
  { username: "cajero", password: "cajero123", pin: "9012", role: "Cajero", color: "bg-green-500" },
  { username: "cocinero", password: "cocina123", pin: "3456", role: "Cocinero", color: "bg-orange-500" },
  { username: "gerente", password: "gerente123", pin: "7890", role: "Gerente", color: "bg-indigo-500" },
]

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const success = await login(data)
      if (!success) {
        setError("Credenciales incorrectas")
      }
    } catch (err) {
      setError("Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoUser = (user: (typeof DEMO_USERS)[0]) => {
    setValue("username", user.username)
    setValue("password", user.password)
    setValue("pin", user.pin)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <ChefHat className="w-8 h-8 text-orange-600" />
          </div>
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>Accede al sistema de restaurante</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="demo">Usuarios Demo</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Usuario</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="username" placeholder="Ingresa tu usuario" className="pl-10" {...register("username")} />
                  </div>
                  {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      className="pl-10"
                      {...register("password")}
                    />
                  </div>
                  {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pin">PIN</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="pin"
                      type="password"
                      placeholder="Ingresa tu PIN"
                      className="pl-10"
                      maxLength={6}
                      {...register("pin")}
                    />
                  </div>
                  {errors.pin && <p className="text-sm text-red-600">{errors.pin.message}</p>}
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="demo" className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">Selecciona un usuario demo para probar el sistema:</div>

              <div className="space-y-2">
                {DEMO_USERS.map((user) => (
                  <Button
                    key={user.username}
                    variant="outline"
                    className="w-full justify-between h-auto p-4 bg-transparent"
                    onClick={() => fillDemoUser(user)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${user.color}`} />
                      <div className="text-left">
                        <div className="font-medium">{user.username}</div>
                        <div className="text-sm text-gray-500">{user.role}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      PIN: {user.pin}
                    </Badge>
                  </Button>
                ))}
              </div>

              <div className="text-xs text-gray-500 text-center mt-4">
                Haz clic en un usuario para auto-completar el formulario
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
