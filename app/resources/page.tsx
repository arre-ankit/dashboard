import ResourceManagement from "@/components/resource-management"
import NavHeader from "@/components/nav-header"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      <main className="container mx-auto py-6 px-4">
        <ResourceManagement />
      </main>
    </div>
  )
}
