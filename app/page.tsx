import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { HomeView } from "@/components/home/home-view"

export default async function HomePage() {
  // Datos mock para el dashboard
  const dashboardData = {
    ventasHoy: 15420,
    ordenesActivas: 8,
    mesasOcupadas: 12,
    clientesAtendidos: 45,
  }

  return (
    <AuthenticatedLayout>
      <HomeView data={dashboardData} />
    </AuthenticatedLayout>
  )
}
