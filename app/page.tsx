import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { HomeView } from "@/components/home/home-view"

export default async function HomePage() {
  return (
    <AuthenticatedLayout>
      <HomeView />
    </AuthenticatedLayout>
  )
}
