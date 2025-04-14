"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useTasks } from "@/context/task-context"
import { type Task } from "@/app/api/tasks/route"

export default function TaskTable() {
  const { tasks, isLoading, updateTaskStatus, deleteTask } = useTasks()
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleStatusChange = async (id: string, newStatus: "Complete" | "Work in progress") => {
    setIsUpdating(id)

    try {
      await updateTaskStatus(id, newStatus)

      toast({
        title: "Status updated",
        description: `Task status changed to ${newStatus}.`,
      })
    } catch (error) {
      console.error("Failed to update task status:", error)
      toast({
        title: "Error",
        description: "Failed to update task status.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(null)
    }
  }

  const handleDelete = async (id: string) => {
    setIsDeleting(id)

    try {
      await deleteTask(id)

      toast({
        title: "Task deleted",
        description: "The task has been deleted successfully.",
      })
    } catch (error) {
      console.error("Failed to delete task:", error)
      toast({
        title: "Error",
        description: "Failed to delete task.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  if (isLoading) {
    return <div className="p-6 text-center">Loading tasks...</div>
  }

  if (tasks.length === 0) {
    return <div className="p-6 text-center">No tasks found. Add your first task above.</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 font-semibold">Task</th>
            <th className="text-left p-4 font-semibold">Start date</th>
            <th className="text-left p-4 font-semibold">Due date</th>
            <th className="text-left p-4 font-semibold">Status</th>
            <th className="text-left p-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="p-4">{task.title}</td>
              <td className="p-4">{format(new Date(task.startDate), "MMMM d, yyyy")}</td>
              <td className="p-4">{format(new Date(task.dueDate), "MMMM d, yyyy")}</td>
              <td className="p-4">
                {task.status === "Complete" ? (
                  <Badge
                    className="bg-green-500 hover:bg-green-600 cursor-pointer"
                    onClick={() => handleStatusChange(task.id, "Work in progress")}
                  >
                    {isUpdating === task.id ? "Updating..." : "Complete"}
                  </Badge>
                ) : (
                  <Badge
                    className="bg-gray-400 hover:bg-gray-500 cursor-pointer"
                    onClick={() => handleStatusChange(task.id, "Complete")}
                  >
                    {isUpdating === task.id ? "Updating..." : "Work in progress"}
                  </Badge>
                )}
              </td>
              <td className="p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(task.id)}
                  disabled={isDeleting === task.id}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
