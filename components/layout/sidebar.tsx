"use client"

import {
  Home,
  Users,
  ChefHat,
  MapPin,
  DollarSign,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  User,
  CreditCard,
  Package,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  {
    title: "Principal",
    items: [
      {
        title: "Inicio",
        url: "/",
        icon: Home,
      },
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Operaciones",
    items: [
      {
        title: "Punto de Venta",
        url: "/ventas/pos",
        icon: DollarSign,
      },
      {
        title: "Mesas",
        url: "/mesas",
        icon: MapPin,
      },
      {
        title: "Productos",
        url: "/productos",
        icon: Package,
      },
      {
        title: "Clientes",
        url: "/clientes",
        icon: Users,
      },
      {
        title: "Reservaciones",
        url: "/reservaciones",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Roles",
    items: [
      {
        title: "Mesero",
        url: "/mesero",
        icon: ChefHat,
      },
      {
        title: "Cajero",
        url: "/cajero",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "Marketing",
    items: [
      {
        title: "Crear Encuesta",
        url: "/encuestas/crear",
        icon: MessageSquare,
      },
      {
        title: "Campañas SMS",
        url: "/encuestas/campanas",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Configuración",
    items: [
      {
        title: "Configuración",
        url: "/configuracion",
        icon: Settings,
      },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="sidebar-restaurant">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-restaurant-primary rounded-lg flex items-center justify-center">
            <ChefHat className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">RestApp</h2>
            <p className="text-xs text-gray-300">Sistema de Gestión</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-restaurant">
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-gray-300 text-xs uppercase tracking-wider">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="text-gray-200 hover:text-white hover:bg-white/10 data-[active=true]:bg-restaurant-primary data-[active=true]:text-white"
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-restaurant-primary text-white">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin Usuario</p>
            <p className="text-xs text-gray-300 truncate">Administrador</p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
