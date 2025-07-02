import { HomeView } from "@/components/home-view"

export default async function HomePage() {
  // Aquí se pueden obtener datos del servidor si es necesario
  const stats = {
    mesasOcupadas: 12,
    totalMesas: 20,
    ventasHoy: 15420.5,
    clientesAtendidos: 45,
    reservacionesHoy: 8,
  }

  return <HomeView stats={stats} />
}
