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
    title: "Clearing and Grubbing",
    startDate: new Date(2025, 3, 7).toISOString(),
    dueDate: new Date(2025, 3, 17).toISOString(),
    status: "Complete",
    createdAt: new Date(2025, 2, 31).toISOString(),
  },
  {
    id: "2",
    title: "OGL Recording",
    startDate: new Date(2025, 3, 18).toISOString(),
    dueDate: new Date(2025, 3, 21).toISOString(),
    status: "Complete",
    createdAt: new Date(2025, 2, 31).toISOString(),
  },
  {
    id: "3",
    title: "Embankment Layer",
    startDate: new Date(2025, 3, 22).toISOString(),
    dueDate: new Date(2025, 3, 25).toISOString(),
    status: "Work in progress",
    createdAt: new Date(2025, 2, 31).toISOString(),
  },
  {
    id: "4",
    title: "Subgrade 1",
    startDate: new Date(2025, 3, 18).toISOString(),
    dueDate: new Date(2025, 3, 28).toISOString(),
    status: "Work in progress",
    createdAt: new Date(2025, 2, 31).toISOString(),
  },
  {
    id: "5",
    title: "Subgrade 2",
    startDate: new Date(2025, 3, 29).toISOString(),
    dueDate: new Date(2025, 4, 7).toISOString(),
    status: "Work in progress",
    createdAt: new Date(2025, 2, 31).toISOString(),
  },
  {
    id: "6",
    title: "Subgrade Top",
    startDate: new Date(2025, 4, 8).toISOString(),
    dueDate: new Date(2025, 4, 20).toISOString(),
    status: "Work in progress",
    createdAt: new Date(2025, 2, 31).toISOString(),
  },
  {
    id: "7",
    title: "GSB",
    startDate: new Date(2025, 4, 21).toISOString(),
    dueDate: new Date(2025, 4, 27).toISOString(),
    status: "Work in progress",
    createdAt: new Date(2025, 2, 31).toISOString(),
  },
  {
    id: "8",
    title: "WMM",
    startDate: new Date(2025, 4, 21).toISOString(),
    dueDate: new Date(2025, 4, 27).toISOString(),
    status: "Work in progress",
    createdAt: new Date(2025, 2, 31).toISOString(),
  },
  {
    id: "9",
    title: "Prime Coat",
    startDate: new Date(2025, 4, 21).toISOString(),
    dueDate: new Date(2025, 4, 22).toISOString(),
    status: "Work in progress",
    createdAt: new Date(2025, 2, 31).toISOString(),
  },
  {
    id: "10",
    title: "DBM",
    startDate: new Date(2025, 4, 28).toISOString(),
    dueDate: new Date(2025, 5, 2).toISOString(),
    status: "Work in progress",
    createdAt: new Date(2025, 2, 31).toISOString(),
  },
  {
    id: "11",
    title: "BC",
    startDate: new Date(2025, 5, 3).toISOString(),
    dueDate: new Date(2025, 5, 5).toISOString(),
    status: "Work in progress",
    createdAt: new Date(2025, 2, 31).toISOString(),
  },
  {
    id: "12",
    title: "Road Furniture",
    startDate: new Date(2025, 5, 6).toISOString(),
    dueDate: new Date(2025, 5, 6).toISOString(),
    status: "Work in progress",
    createdAt: new Date(2025, 2, 31).toISOString(),
  },
];

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
