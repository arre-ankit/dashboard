import { type NextRequest, NextResponse } from "next/server"

// Type definitions
export interface Task {
  id: string
  title: string
  startDate: string
  dueDate: string
  status: "Complete" | "Work in progress"
  createdAt: string
}

// In-memory database for Next.js environment
// This avoids file system operations that might not work in the preview environment
export const tasks: Task[] = [
  {
    id: "1",
    title: "Clearing and Grubbing",
    startDate: new Date(2025, 3, 7).toISOString(),
    dueDate: new Date(2025, 3, 17).toISOString(),
    status: "Work in progress",
    createdAt: new Date(2025, 2, 31).toISOString(),
  },
  {
    id: "2",
    title: "OGL Recording",
    startDate: new Date(2025, 3, 18).toISOString(),
    dueDate: new Date(2025, 3, 21).toISOString(),
    status: "Work in progress",
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


// GET handler to retrieve all tasks
export async function GET() {
  try {
    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

// POST handler to add a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.dueDate || !body.startDate) {
      return NextResponse.json({ error: "Title, start date, and due date are required" }, { status: 400 })
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: body.title,
      startDate: new Date(body.startDate).toISOString(),
      dueDate: new Date(body.dueDate).toISOString(),
      status: body.status || "Work in progress",
      createdAt: new Date().toISOString(),
    }

    tasks.push(newTask)

    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    console.error("Error adding task:", error)
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 })
  }
}
