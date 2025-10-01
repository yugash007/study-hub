"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/lib/auth-context"

export function AppHeader() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="glass-strong sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-3 group">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary transition-smooth group-hover:scale-110 dark:glow-primary">
              <BookOpen className="h-6 w-6 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-0 blur-xl transition-smooth group-hover:opacity-50" />
            </div>
            <h1 className="text-2xl font-black gradient-text">StudyHub</h1>
          </Link>

          <nav className="flex items-center gap-3">
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground transition-smooth hover:scale-105"
                >
                  Dashboard
                </Link>
                <Link
                  href="/#tools"
                  className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground transition-smooth hover:scale-105"
                >
                  Tools
                </Link>
                <Link
                  href="/help"
                  className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground transition-smooth hover:scale-105"
                >
                  Help
                </Link>
              </>
            )}
            {mounted && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="glass border-2 hover:scale-110 transition-smooth dark:hover:glow-primary"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
            {user ? (
              <UserNav />
            ) : (
              <>
                <Button asChild variant="ghost" className="hidden sm:inline-flex font-bold">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:scale-105 transition-smooth dark:btn-glow shadow-lg"
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
