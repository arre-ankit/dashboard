// Type definitions
export interface Task {
  id: string
  title: string
  dueDate: Date | string
  status: "Complete" | "Work in progress"
  createdAt: Date | string
}

// Helper function to format dates
const formatDates = (task: Task): Task => {
  return {
    ...task,
    dueDate: new Date(task.dueDate),
    createdAt: new Date(task.createdAt),
  }
}

// Get all tasks
export async function getTasks(): Promise<Task[]> {
  try {
    const response = await fetch("/api/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Ensure we're not using cached data
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to fetch tasks: ${response.status} ${errorText}`)
    }

    const tasks = await response.json()
    // Format dates from strings to Date objects
    return tasks.map(formatDates)
  } catch (error) {
    console.error("Error in getTasks:", error)
    // Return empty array on error to prevent UI crashes
    return []
  }
}

// Add a new task
export async function addTask(taskData: Omit<Task, "id" | "createdAt">): Promise<Task> {
  try {
    // Convert Date object to ISO string for JSON serialization
    const payload = {
      ...taskData,
      dueDate: taskData.dueDate instanceof Date ? taskData.dueDate.toISOString() : taskData.dueDate,
    }

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to add task: ${response.status} ${errorText}`)
    }

    const task = await response.json()
    return formatDates(task)
  } catch (error) {
    console.error("Error in addTask:", error)
    throw error
  }
}

// Update task status
export async function updateTaskStatus(id: string, status: "Complete" | "Work in progress"): Promise<Task> {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to update task status: ${response.status} ${errorText}`)
    }

    const task = await response.json()
    return formatDates(task)
  } catch (error) {
    console.error("Error in updateTaskStatus:", error)
    throw error
  }
}

// Delete a task
export async function deleteTask(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to delete task: ${response.status} ${errorText}`)
    }
  } catch (error) {
    console.error("Error in deleteTask:", error)
    throw error
  }
}
