"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  ChefHat,
  Users,
  ShoppingCart,
  Package,
  Calendar,
  BarChart3,
  Settings,
  Menu,
  Home,
  Utensils,
  CreditCard,
  ClipboardList,
  MessageSquare,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Vista general del sistema",
  },
  {
    name: "Ventas",
    icon: ShoppingCart,
    children: [
      { name: "Punto de Venta", href: "/ventas/pos", icon: CreditCard },
      { name: "Comandas", href: "/ventas/comandas", icon: ClipboardList },
      { name: "Historial", href: "/ventas/historial", icon: BarChart3 },
    ],
  },
  {
    name: "Mesas",
    href: "/mesas",
    icon: Utensils,
    description: "Gestión de mesas y reservaciones",
  },
  {
    name: "Productos",
    icon: Package,
    children: [
      { name: "Catálogo", href: "/productos/catalogo", icon: Package },
      { name: "Grupos", href: "/productos/grupos", icon: Package },
      { name: "Modificadores", href: "/productos/modificadores", icon: Package },
    ],
  },
  {
    name: "Clientes",
    href: "/clientes",
    icon: Users,
    description: "Gestión de clientes",
  },
  {
    name: "Reservaciones",
    href: "/reservaciones",
    icon: Calendar,
    description: "Sistema de reservaciones",
  },
  {
    name: "Encuestas",
    icon: MessageSquare,
    children: [
      { name: "Crear Encuesta", href: "/encuestas/crear", icon: MessageSquare },
      { name: "Campañas SMS", href: "/encuestas/campanas", icon: MessageSquare },
      { name: "Resultados", href: "/encuestas/resultados", icon: BarChart3 },
    ],
  },
  {
    name: "Reportes",
    href: "/reportes",
    icon: BarChart3,
    description: "Reportes y análisis",
  },
  {
    name: "Configuración",
    href: "/configuracion",
    icon: Settings,
    description: "Configuración del sistema",
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState<string[]>([])

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupName) ? prev.filter((name) => name !== groupName) : [...prev, groupName],
    )
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <ChefHat className="h-8 w-8 text-orange-600" />
          <span className="text-xl font-bold">AppRest</span>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            if (item.children) {
              const isOpen = openGroups.includes(item.name)
              return (
                <div key={item.name}>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => toggleGroup(item.name)}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                  {isOpen && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn("w-full justify-start", pathname === child.href && "bg-accent")}
                          >
                            <child.icon className="mr-2 h-3 w-3" />
                            {child.name}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link key={item.href} href={item.href!}>
                <Button variant="ghost" className={cn("w-full justify-start", pathname === item.href && "bg-accent")}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden border-r bg-background lg:block lg:w-64", className)}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden bg-transparent">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
