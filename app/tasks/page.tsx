import { Suspense } from "react"
import TaskForm from "@/components/task-form"
import TaskTable from "@/components/task-table"
import DashboardStats from "@/components/dashboard-stats"
import StatusGraph from "@/components/status-graph"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NavHeader from "@/components/nav-header"

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-background">
    <NavHeader />
    <main className="container mx-auto py-6 px-4">
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          <div className="bg-card rounded-lg shadow p-6">
            <Suspense fallback={<div>Loading form...</div>}>
              <TaskForm />
            </Suspense>
          </div>

          <div className="bg-card rounded-lg shadow">
            <Suspense fallback={<div>Loading tasks...</div>}>
              <TaskTable />
            </Suspense>
          </div>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="bg-card rounded-lg shadow p-6">
            <Suspense fallback={<div>Loading stats...</div>}>
              <DashboardStats />
            </Suspense>
          </div>
          
          <div className="bg-card rounded-lg shadow">
            <Suspense fallback={<div>Loading status graph...</div>}>
              <StatusGraph />
            </Suspense>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  </div>
  )
}
