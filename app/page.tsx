import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { HomeView } from "@/components/home/home-view"

// Mock data for the dashboard
const mockDashboardData = {
  ventasHoy: {
    total: 15420.5,
    ordenes: 45,
    promedio: 342.68,
    crecimiento: 12.5,
  },
  mesasOcupadas: {
    ocupadas: 8,
    total: 12,
    porcentaje: 66.7,
  },
  productosPopulares: [
    { nombre: "Tacos al Pastor", ventas: 25, ingresos: 625.0 },
    { nombre: "Hamburguesa Clásica", ventas: 18, ingresos: 540.0 },
    { nombre: "Pizza Margherita", ventas: 15, ingresos: 450.0 },
  ],
  reservacionesHoy: [
    { hora: "19:00", cliente: "María García", personas: 4, mesa: 5 },
    { hora: "20:30", cliente: "Carlos López", personas: 2, mesa: 8 },
    { hora: "21:00", cliente: "Ana Martínez", personas: 6, mesa: 12 },
  ],
  alertas: [
    { tipo: "inventario", mensaje: "Stock bajo en ingredientes para tacos", urgencia: "alta" },
    { tipo: "reservacion", mensaje: "Mesa 5 confirmada para las 19:00", urgencia: "media" },
    { tipo: "sistema", mensaje: "Backup completado exitosamente", urgencia: "baja" },
  ],
}

export default async function HomePage() {
  return (
    <AuthenticatedLayout>
      <HomeView data={mockDashboardData} />
    </AuthenticatedLayout>
  )
}
