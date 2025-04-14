"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { format, subDays, startOfDay, isSameDay } from "date-fns"
import { useTasks } from "@/context/task-context"

export default function DashboardStats() {
  const { tasks, isLoading } = useTasks()

  if (isLoading) {
    return <div className="text-center py-8">Loading dashboard data...</div>
  }

  // Calculate statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "Complete").length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  // Data for pie chart
  const statusData = [
    { name: "Complete", value: completedTasks, color: "#10b981" },
    { name: "In Progress", value: totalTasks - completedTasks, color: "#94a3b8" },
  ]

  // Data for line chart (tasks added over time)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i)
    return {
      date: startOfDay(date),
      count: tasks.filter((task) => {
        // Safely handle potentially undefined createdAt
        if (!task.createdAt) return false
        const createdDate = new Date(task.createdAt)
        return isSameDay(createdDate, date)
      }).length,
    }
  }).reverse()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
            <CardDescription>Overall progress of your tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Progress</span>
                <span>{Math.round(completionRate)}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
              <div className="text-sm text-muted-foreground">
                {completedTasks} of {totalTasks} tasks completed
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Status</CardTitle>
            <CardDescription>Distribution of task statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    {statusData.length > 0 ? (
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    ) : (
                      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                        No data available
                      </text>
                    )}
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tasks Added Over Time</CardTitle>
          <CardDescription>Number of tasks added in the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last7Days}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => (date ? format(date, "MMM d") : "")} />
                  <YAxis allowDecimals={false} />
                  <ChartTooltip labelFormatter={(date) => (date ? format(date, "MMMM d, yyyy") : "Unknown date")} />
                  <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} name="Tasks Added" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
