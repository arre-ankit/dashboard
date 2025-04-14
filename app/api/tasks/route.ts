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
