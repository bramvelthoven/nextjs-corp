'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ModeToggle } from "../ui/mode-toggle"
import {
  Menu,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Settings,
  ChevronDown
} from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const pathName = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = createClient();

  const menuItems = [
    { label: "How it Works", href: "/how-it-works" },
    { label: "Plans & Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
  ]

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    }

    getUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
        }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  }

  return (
      <nav
          className={`w-full bg-background border-b fixed top-0 z-50 transition-shadow ${
              scrolled ? "shadow-md" : ""
          }`}
      >
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="flex items-center">
          <span className="text-2xl font-extrabold tracking-tight text-primary group-hover:text-secondary-accent transition-colors">
            Solaro
            <span className="text-secondary-accent">.io</span>
          </span>
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
            <Button variant="ghost" asChild>
              <Link href="/chat">Let's have a chat!</Link>
            </Button>

            {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem className="cursor-pointer">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button variant="ghost" asChild>
                  <Link href="/auth">Login</Link>
                </Button>
            )}
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
                <Button variant="ghost" asChild>
                  <Link href="/chat" onClick={() => setOpen(false)}>
                    Chat Rooms
                  </Link>
                </Button>

                {user ? (
                    <>
                      <div className="flex items-center gap-2 py-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                          <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium truncate">{user.email}</span>
                      </div>
                      <Link href="/dashboard" className="flex items-center gap-2 py-2" onClick={() => setOpen(false)}>
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link href="/settings" className="flex items-center gap-2 py-2" onClick={() => setOpen(false)}>
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      <Button variant="ghost" className="justify-start pl-0 gap-2" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </Button>
                    </>
                ) : (
                    <Button variant="ghost" asChild>
                      <Link href="/auth" onClick={() => setOpen(false)}>
                        Login
                      </Link>
                    </Button>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
  )
}