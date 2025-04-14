"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useTasks } from "@/context/task-context"
import { toast } from "@/components/ui/use-toast"

export default function TaskForm() {
  const { addTask } = useTasks()
  const [task, setTask] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [dueDate, setDueDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!task || !startDate || !dueDate) return

    if (startDate > dueDate) {
      setError("Start date cannot be after due date")
      return
    }

    setIsSubmitting(true)

    try {
      await addTask({
        title: task,
        startDate: startDate.toISOString(),
        dueDate: dueDate.toISOString(),
        status: "Work in progress",
      })

      // Reset form
      setTask("")
      setStartDate(undefined)
      setDueDate(undefined)

      // Show success toast
      toast({
        title: "Task added",
        description: "Your task has been added successfully.",
      })
    } catch (error) {
      console.error("Failed to add task:", error)
      setError(error instanceof Error ? error.message : "Failed to add task")

      // Show error toast
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="task">Task</Label>
        <Input
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task description"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="startDate">Start date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="startDate"
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : "Select start date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Due date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="dueDate"
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? format(dueDate, "PPP") : "Select due date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white"
        disabled={isSubmitting || !task || !startDate || !dueDate}
      >
        {isSubmitting ? "Adding..." : "Add Task"}
      </Button>
    </form>
  )
}
