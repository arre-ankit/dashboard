import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TaskProvider } from "@/context/task-context"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Civil Engineering Task Management",
  description: "Track and manage civil engineering tasks and projects",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
          <TaskProvider>{children}</TaskProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}


import './globals.css'