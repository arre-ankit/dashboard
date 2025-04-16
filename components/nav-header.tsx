import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NavHeader() {
  return (
    <header className="py-8 text-center border-b">
      <h1 className="text-4xl font-bold tracking-tight">CIVIL ENGINEERING</h1>
      <div className="mt-4 flex justify-center gap-4">
        <Button asChild variant="outline">
          <Link href="/tasks">Tasks</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/resources">Resources</Link>
        </Button>
      </div>
    </header>
  )
}
