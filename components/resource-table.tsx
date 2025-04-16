"use client"

import { useState } from "react"
import { Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Resource } from "./resource-management"

interface ResourceTableProps {
  resources: Resource[]
  onDelete: (id: string) => void
  onChangeType: (id: string, type: "Buy" | "Rent") => void
}

export default function ResourceTable({ resources, onDelete, onChangeType }: ResourceTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Calculate total cost
  const totalCost = resources.reduce((sum, resource) => sum + resource.cost, 0)

  const handleDelete = (id: string) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId)
      setDeleteId(null)
    }
  }

  const cancelDelete = () => {
    setDeleteId(null)
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left p-4 font-semibold">Resource</th>
              <th className="text-left p-4 font-semibold">Work Hours</th>
              <th className="text-left p-4 font-semibold">Hourly Rate (INR)</th>
              <th className="text-left p-4 font-semibold">Resource Cost (INR)</th>
              <th className="text-left p-4 font-semibold">Buy or Rent</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id} className="border-b">
                <td className="p-4">{resource.name}</td>
                <td className="p-4">{resource.workHours}</td>
                <td className="p-4">{resource.hourlyRate}</td>
                <td className="p-4">{resource.cost.toLocaleString()}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      resource.type === "Buy" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {resource.type}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onChangeType(resource.id, resource.type === "Buy" ? "Rent" : "Buy")}
                        >
                          Change to {resource.type === "Buy" ? "Rent" : "Buy"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(resource.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td className="p-4 font-semibold">Total</td>
              <td className="p-4"></td>
              <td className="p-4"></td>
              <td className="p-4 font-semibold">{totalCost.toLocaleString()}</td>
              <td className="p-4"></td>
              <td className="p-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={cancelDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this resource. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
