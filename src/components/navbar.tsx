'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ModeToggle } from "./ui/mode-toggle"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathName = usePathname();
  const [open, setOpen] = useState(false)
  const menuItems = [
    { label: "How it Works", href: "/how-it-works" },
    { label: "Plans & Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
  ]

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`w-full bg-background border-b fixed top-0 z-50 transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <Image src="/logo-new.png" alt="Logo" width={120} height={120} /> 
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => {
              const isActive = pathName === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200
                            ${
                    isActive
                      ? "border-b-2 border-secondary-accent text-secondary-accent"
                      : "hover:text-foreground/80"
                  }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          <ModeToggle />
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" aria-label="Open menu">
                <Menu height={50} width={50} color="#638763" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-6 flex flex-col gap-4">
              <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}  
                  className="text-base font-medium py-2"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <ModeToggle />
              <Button variant="outline" asChild className="mt-4">
                <Link href="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}