"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResourceTable from "@/components/resource-table"
import ResourceCharts from "@/components/resource-charts"
import { toast } from "@/components/ui/use-toast"

// Define the Resource type
export interface Resource {
  id: string
  name: string
  workHours: number
  hourlyRate: number
  cost: number
  type: "Buy" | "Rent"
}

// Initial resources data
const INITIAL_RESOURCES: Resource[] = [
  { id: "1", name: "Excavator", workHours: 72, hourlyRate: 300, cost: 21600, type: "Rent" },
  { id: "2", name: "Survey Team", workHours: 16, hourlyRate: 350, cost: 5600, type: "Rent" },
  { id: "3", name: "Bulldozer", workHours: 32, hourlyRate: 400, cost: 12800, type: "Rent" },
  { id: "4", name: "Grader", workHours: 56, hourlyRate: 380, cost: 21280, type: "Rent" },
  { id: "5", name: "Roller", workHours: 72, hourlyRate: 360, cost: 25920, type: "Rent" },
  { id: "6", name: "Loader", workHours: 40, hourlyRate: 300, cost: 12000, type: "Rent" },
  { id: "7", name: "WMM Plant", workHours: 8, hourlyRate: 350, cost: 2800, type: "Rent" },
  { id: "8", name: "Sprayer", workHours: 16, hourlyRate: 250, cost: 4000, type: "Rent" },
  { id: "9", name: "Paver", workHours: 32, hourlyRate: 500, cost: 16000, type: "Rent" },
  { id: "10", name: "Bitumen Sprayer", workHours: 24, hourlyRate: 450, cost: 10800, type: "Rent" },
  { id: "11", name: "Hire Crew", workHours: 8, hourlyRate: 300, cost: 2400, type: "Rent" },
  { id: "12", name: "Concrete Mixer", workHours: 48, hourlyRate: 280, cost: 13440, type: "Buy" },
  { id: "13", name: "Hand Tools", workHours: 120, hourlyRate: 50, cost: 6000, type: "Buy" },
  { id: "14", name: "Safety Equipment", workHours: 200, hourlyRate: 30, cost: 6000, type: "Buy" },
]

export default function ResourceManagement() {
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES)
  const [resourceName, setResourceName] = useState("")
  const [workHours, setWorkHours] = useState("")
  const [hourlyRate, setHourlyRate] = useState("")
  const [resourceType, setResourceType] = useState<"Buy" | "Rent">("Rent")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("table")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Calculate cost
      const hours = Number.parseFloat(workHours)
      const rate = Number.parseFloat(hourlyRate)
      const cost = hours * rate

      // Create new resource
      const newResource: Resource = {
        id: Date.now().toString(),
        name: resourceName,
        workHours: hours,
        hourlyRate: rate,
        cost,
        type: resourceType,
      }

      // Add to resources
      setResources([...resources, newResource])

      // Reset form
      setResourceName("")
      setWorkHours("")
      setHourlyRate("")
      setResourceType("Rent")

      // Show success toast
      toast({
        title: "Resource added",
        description: `${resourceName} has been added successfully.`,
      })
    } catch (error) {
      console.error("Error adding resource:", error)
      toast({
        title: "Error",
        description: "Failed to add resource. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteResource = (id: string) => {
    try {
      const resourceToDelete = resources.find((r) => r.id === id)
      setResources(resources.filter((resource) => resource.id !== id))

      toast({
        title: "Resource deleted",
        description: `${resourceToDelete?.name || "Resource"} has been deleted.`,
      })
    } catch (error) {
      console.error("Error deleting resource:", error)
      toast({
        title: "Error",
        description: "Failed to delete resource.",
        variant: "destructive",
      })
    }
  }

  const handleChangeType = (id: string, newType: "Buy" | "Rent") => {
    try {
      const updatedResources = resources.map((resource) => {
        if (resource.id === id) {
          return { ...resource, type: newType }
        }
        return resource
      })

      setResources(updatedResources)

      const resourceName = resources.find((r) => r.id === id)?.name || "Resource"
      toast({
        title: "Resource updated",
        description: `${resourceName} changed to ${newType}.`,
      })
    } catch (error) {
      console.error("Error changing resource type:", error)
      toast({
        title: "Error",
        description: "Failed to change resource type.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Resource</CardTitle>
          <CardDescription>Enter resource details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="resourceName">Resource</Label>
              <Input
                id="resourceName"
                value={resourceName}
                onChange={(e) => setResourceName(e.target.value)}
                placeholder="Enter resource name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workHours">Work Hours</Label>
              <Input
                id="workHours"
                type="number"
                value={workHours}
                onChange={(e) => setWorkHours(e.target.value)}
                placeholder="Enter work hours"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (INR)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="Enter hourly rate"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resourceType">Buy or Rent</Label>
              <Select value={resourceType} onValueChange={(value) => setResourceType(value as "Buy" | "Rent")}>
                <SelectTrigger id="resourceType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Buy">Buy</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Resource"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Tabs defaultValue="table" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="table">Resources Table</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <ResourceTable resources={resources} onDelete={handleDeleteResource} onChangeType={handleChangeType} />
        </TabsContent>

        <TabsContent value="charts">
          <ResourceCharts resources={resources} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
