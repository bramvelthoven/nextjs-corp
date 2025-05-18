'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ModeToggle } from "./ui/mode-toggle"

export function Navbar() {
  return (
    <div className="container mx-auto">
      <nav className="flex items-center justify-between py-6">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-bold text-foreground">Solaro.io</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-6">
            {["Research", "Product", "Safety", "Company"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium hover:text-foreground/80 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
          <ModeToggle />
          <Button variant="outline">
            <Link href="/login">Login</Link>
          </Button>
        </div>

      </nav>
    </div>
  )
}