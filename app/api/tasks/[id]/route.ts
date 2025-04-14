import { type NextRequest, NextResponse } from "next/server"

// Import the tasks array from the parent route
// This is a workaround for Next.js environment
import { tasks } from "../route"

// PATCH handler to update a task's status
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    if (!body.status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    const taskIndex = tasks.findIndex((task) => task.id === id)

    if (taskIndex === -1) {
      return NextResponse.json({ error: `Task with ID ${id} not found` }, { status: 404 })
    }

    const updatedTask = {
      ...tasks[taskIndex],
      status: body.status,
    }

    tasks[taskIndex] = updatedTask

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  }
}

// DELETE handler to remove a task
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const taskIndex = tasks.findIndex((task) => task.id === id)

    if (taskIndex === -1) {
      return NextResponse.json({ error: `Task with ID ${id} not found` }, { status: 404 })
    }

    tasks.splice(taskIndex, 1)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 })
  }
}
