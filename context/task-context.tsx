"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Type definitions
export interface Task {
  id: string
  title: string
  startDate: string
  dueDate: string
  status: "Complete" | "Work in progress"
  createdAt: string
}

// Initial tasks data
const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Site inspection",
    startDate: new Date(2024, 3, 25).toISOString(), // April 25, 2024
    dueDate: new Date(2024, 4, 1).toISOString(), // May 1, 2024
    status: "Complete",
    createdAt: new Date(2024, 3, 15).toISOString(),
  },
  {
    id: "2",
    title: "Foundation design",
    startDate: new Date(2024, 4, 1).toISOString(), // May 1, 2024
    dueDate: new Date(2024, 4, 7).toISOString(), // May 7, 2024
    status: "Work in progress",
    createdAt: new Date(2024, 3, 20).toISOString(),
  },
  {
    id: "3",
    title: "Structural analysis",
    startDate: new Date(2024, 4, 5).toISOString(), // May 5, 2024
    dueDate: new Date(2024, 4, 12).toISOString(), // May 12, 2024
    status: "Work in progress",
    createdAt: new Date(2024, 3, 25).toISOString(),
  },
  {
    id: "4",
    title: "Cost estimation",
    startDate: new Date(2024, 4, 10).toISOString(), // May 10, 2024
    dueDate: new Date(2024, 4, 18).toISOString(), // May 18, 2024
    status: "Work in progress",
    createdAt: new Date(2024, 4, 1).toISOString(),
  },
]

interface TaskContextType {
  tasks: Task[]
  isLoading: boolean
  addTask: (task: Omit<Task, "id" | "createdAt">) => Promise<Task>
  updateTaskStatus: (id: string, status: "Complete" | "Work in progress") => Promise<Task>
  deleteTask: (id: string) => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Initialize tasks from initial data
  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setTasks(INITIAL_TASKS)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Add a new task
  const addTask = async (taskData: Omit<Task, "id" | "createdAt">): Promise<Task> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString(),
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
    return newTask
  }

  // Update task status
  const updateTaskStatus = async (id: string, status: "Complete" | "Work in progress"): Promise<Task> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const taskIndex = tasks.findIndex((task) => task.id === id)

    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`)
    }

    const updatedTask = {
      ...tasks[taskIndex],
      status,
    }

    setTasks((prevTasks) => [...prevTasks.slice(0, taskIndex), updatedTask, ...prevTasks.slice(taskIndex + 1)])

    return updatedTask
  }

  // Delete a task
  const deleteTask = async (id: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const taskIndex = tasks.findIndex((task) => task.id === id)

    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`)
    }

    setTasks((prevTasks) => [...prevTasks.slice(0, taskIndex), ...prevTasks.slice(taskIndex + 1)])
  }

  return (
    <TaskContext.Provider value={{ tasks, isLoading, addTask, updateTaskStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider")
  }
  return context
}
