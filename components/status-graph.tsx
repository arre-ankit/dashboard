"use client"

import { useTasks } from "@/context/task-context"
import { format, parseISO } from "date-fns"

interface Task {
  title: string
  startDate: string
  dueDate: string
  status: string
}

export default function StatusGraph() {
  const { tasks } = useTasks()
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Find the earliest start date and latest end date
  const dateRange = tasks.reduce(
    (range, task) => {
      const start = parseISO(task.startDate)
      const end = parseISO(task.dueDate)
      return {
        start: !range.start || start < range.start ? start : range.start,
        end: !range.end || end > range.end ? end : range.end,
      }
    },
    { start: null, end: null } as { start: Date | null; end: Date | null }
  )

  if (!dateRange.start || !dateRange.end || tasks.length === 0) {
    return <div className="text-center p-4">No tasks available</div>
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Status Graph</h2>
      <div className="relative">
        {/* Month headers */}
        <div className="flex mb-8 ml-24">
          {months.map((month, i) => (
            <div key={month} className="flex-1 text-center font-medium">
              {month}
            </div>
          ))}
        </div>

        {/* Tasks */}
        <div className="space-y-6">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center">
              <div className="w-24 font-medium">{task.title}</div>
              <div className="flex-1 relative h-2">
                <div
                  className="absolute h-2 bg-gray-800 rounded-full"
                  style={{
                    left: `${(parseISO(task.startDate).getMonth() / 12) * 100}%`,
                    right: `${100 - ((parseISO(task.dueDate).getMonth() + 1) / 12) * 100}%`,
                  }}
                >
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full" />
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 