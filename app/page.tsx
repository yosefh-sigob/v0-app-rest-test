import { HomeView } from "@/components/home-view"
import { mockEstadisticas } from "@/utils/mock-data"

export default async function HomePage() {
  // Simular obtención de datos del servidor
  await new Promise((resolve) => setTimeout(resolve, 300))

  const estadisticas = mockEstadisticas

  return <HomeView estadisticas={estadisticas} />
}
