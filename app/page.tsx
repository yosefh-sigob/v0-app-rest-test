import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { HomeView } from "@/components/home/home-view"

// Mock data for dashboard
const mockDashboardData = {
  ventasHoy: 15420.5,
  crecimientoVentas: 12.5,
  mesasOcupadas: 8,
  totalMesas: 12,
  productosPopulares: [
    { nombre: "Pizza Margherita", cantidad: 15, ingresos: 2250.0 },
    { nombre: "Hamburguesa Clásica", cantidad: 12, ingresos: 1800.0 },
    { nombre: "Ensalada César", cantidad: 8, ingresos: 960.0 },
  ],
  reservacionesHoy: [
    { cliente: "Juan Pérez", hora: "19:00", personas: 4, mesa: "Mesa 5" },
    { cliente: "María García", hora: "20:30", personas: 2, mesa: "Mesa 8" },
    { cliente: "Carlos López", hora: "21:00", personas: 6, mesa: "Mesa 12" },
  ],
  alertas: [
    { tipo: "warning", mensaje: "Stock bajo en ingredientes para pizza", urgencia: "media" },
    { tipo: "info", mensaje: "Nueva reservación para esta noche", urgencia: "baja" },
    { tipo: "error", mensaje: "Problema con impresora de cocina", urgencia: "alta" },
  ],
  estadisticasSemanales: {
    ventasSemana: [
      { dia: "Lun", ventas: 12500 },
      { dia: "Mar", ventas: 15200 },
      { dia: "Mié", ventas: 18900 },
      { dia: "Jue", ventas: 16700 },
      { dia: "Vie", ventas: 22100 },
      { dia: "Sáb", ventas: 28500 },
      { dia: "Dom", ventas: 25800 },
    ],
  },
}

export default async function HomePage() {
  return (
    <AuthenticatedLayout>
      <HomeView data={mockDashboardData} />
    </AuthenticatedLayout>
  )
}
