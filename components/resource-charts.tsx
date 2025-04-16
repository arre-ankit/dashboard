"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { Resource } from "./resource-management"

export default function ResourceCharts({ resources }: { resources: Resource[] }) {
  // Data for pie chart (Buy vs Rent)
  const buyCount = resources.filter((r) => r.type === "Buy").length
  const rentCount = resources.filter((r) => r.type === "Rent").length

  const pieData = [
    { name: "Buy", value: buyCount, color: "#3b82f6" },
    { name: "Rent", value: rentCount, color: "#10b981" },
  ]

  // Data for bar charts
  // Limit to top 10 resources for better visualization
  const resourcesByCost = [...resources]
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 10)
    .map((r) => ({
      name: r.name,
      cost: r.cost,
    }))

  const resourcesByWorkHours = [...resources]
    .sort((a, b) => b.workHours - a.workHours)
    .slice(0, 10)
    .map((r) => ({
      name: r.name,
      hours: r.workHours,
    }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Resources by Type</CardTitle>
          <CardDescription>Distribution of Buy vs Rent resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resources by Cost</CardTitle>
          <CardDescription>Top 10 resources by cost (INR)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourcesByCost} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} INR`, "Cost"]} />
                  <Legend />
                  <Bar dataKey="cost" name="Cost (INR)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Resources by Work Hours</CardTitle>
          <CardDescription>Top 10 resources by work hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourcesByWorkHours}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} hours`, "Work Hours"]} />
                  <Legend />
                  <Bar dataKey="hours" name="Work Hours" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
