"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BookOpen,
  BarChart3,
  Clock,
  Users,
  Moon,
  Sun,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  Flame,
  MessageSquare,
  Timer,
  Trophy,
  Rocket,
  Star,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/lib/auth-context"

const tools = [
  {
    id: "ai-arena",
    title: "AI Arena",
    description: "Engage with AI-powered tutors and challenges in the arena.",
    icon: MessageSquare,
    href: "https://ai-study-arena.vercel.app",
    color: "secondary",
  },
  {
    id: "exam-heatmap",
    title: "Exam Prep Heatmap",
    description: "Visual heatmap of most frequently tested topics from past exam papers",
    icon: BarChart3,
    href: "/tools/exam-heatmap",
    color: "accent",
  },
  {
    id: "focus-timer",
    title: "Focus Timer & Pomodoro",
    description: "Stay focused with customizable study sessions and break reminders",
    icon: Timer,
    href: "/tools/focus-timer",
    color: "primary",
  },
  {
    id: "revision-planner",
    title: "Time-Smart Revision Planner",
    description: "Automated, prioritized revision schedule based on your available time",
    icon: Clock,
    href: "/tools/revision-planner",
    color: "accent",
  },
  {
    id: "study-arena",
    title: "Group Study Arena",
    description: "Virtual study room with collaborative tools and gamified challenges",
    icon: Users,
    href: "/tools/study-arena",
    color: "warning",
  },
]

const features = [
  {
    icon: Flame,
    value: "365",
    label: "Day Streak",
    description: "Keep your learning momentum going",
    color: "text-warning",
  },
  {
    icon: Trophy,
    value: "10x",
    label: "Faster Learning",
    description: "AI-powered study optimization",
    color: "text-primary",
  },
  {
    icon: Award,
    value: "50+",
    label: "Achievements",
    description: "Unlock rewards as you progress",
    color: "text-accent",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Success Rate",
    description: "Students improving their grades",
    color: "text-success",
  },
]

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 animate-gradient-rotate pointer-events-none" />
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none animate-float" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none animate-float delay-300" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[100px] pointer-events-none animate-float delay-500" />

      <header className="sticky top-0 z-50 backdrop-blur-strong bg-background/80 border-b border-border/50 animate-slide-up">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-secondary to-accent transition-smooth group-hover:scale-110 group-hover:glow-primary animate-gradient-border">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-black gradient-text">StudyHub</h1>
            </Link>

            <nav className="flex items-center gap-3">
              <Link
                href="#tools"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-smooth hover:scale-105"
              >
                <Sparkles className="h-4 w-4" />
                Tools
              </Link>
              <Link
                href="/dashboard"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-smooth hover:scale-105"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Link>
              {mounted && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="border-2 hover:scale-110 transition-smooth hover:glow-primary"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              )}
              {user ? (
                <UserNav />
              ) : (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    className="hidden sm:inline-flex font-bold hover:scale-105 transition-smooth"
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground font-bold hover:scale-105 transition-smooth shadow-lg hover:glow-primary shimmer"
                  >
                    <Link href="/signup">Get Started Free</Link>
                  </Button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <section className="relative container mx-auto px-4 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full border-2 border-primary/30 bg-primary/10 backdrop-blur-sm animate-float animate-scale-in">
            <Star className="h-4 w-4 text-primary animate-spin-slow" />
            <span className="text-sm font-bold gradient-text">AI-Powered Learning Platform</span>
            <Sparkles className="h-4 w-4 text-accent" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-balance leading-[1.1] tracking-tight animate-slide-up delay-100">
            Master Any Subject
            <br />
            <span className="gradient-text">10x Faster with AI</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed text-pretty max-w-3xl mx-auto animate-slide-up delay-200">
            The complete AI study toolkit with flashcards, spaced repetition, progress tracking, gamification, and 24/7
            AI tutoring. Everything you need to ace your exams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-300">
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto text-base font-bold bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground hover:scale-105 transition-smooth px-8 py-6 shadow-xl hover:glow-primary shimmer"
            >
              <Link href="/signup">
                <Rocket className="mr-2 h-5 w-5" />
                Start Learning Free
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto text-base font-bold border-2 hover:scale-105 transition-smooth px-8 py-6 bg-transparent hover:bg-primary/5"
            >
              <Link href="#tools">
                <Sparkles className="mr-2 h-5 w-5" />
                Explore Tools
              </Link>
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in delay-400">
            <div className="flex items-center gap-2 hover:text-foreground transition-smooth hover:scale-110">
              <Users className="h-4 w-4 text-primary" />
              <span className="font-semibold">50,000+ Students</span>
            </div>
            <div className="flex items-center gap-2 hover:text-foreground transition-smooth hover:scale-110">
              <Award className="h-4 w-4 text-warning" />
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 hover:text-foreground transition-smooth hover:scale-110">
              <Zap className="h-4 w-4 text-accent" />
              <span className="font-semibold">1M+ Study Sessions</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className={`relative overflow-hidden border-2 border-border/50 bg-card/50 backdrop-blur-sm hover-glow-intense transition-smooth animate-scale-in delay-${(index + 1) * 100}`}
              >
                <CardContent className="p-6 text-center">
                  <Icon className={`h-8 w-8 mx-auto mb-3 ${feature.color} animate-float delay-${index * 100}`} />
                  <div className="text-3xl font-black gradient-text mb-1">{feature.value}</div>
                  <div className="text-sm font-bold mb-1">{feature.label}</div>
                  <div className="text-xs text-muted-foreground">{feature.description}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section id="tools" className="relative container mx-auto px-4 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12 md:mb-16 animate-slide-up">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight">
            Your Complete <span className="gradient-text">Study Arsenal</span>
          </h3>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            10 powerful AI tools designed to transform how you learn. From flashcards to AI tutoring, we've got
            everything covered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <Link key={tool.id} href={tool.href} className="group">
                <Card
                  className={`h-full border-2 border-border/50 bg-card/50 backdrop-blur-sm hover-glow-intense transition-smooth cursor-pointer overflow-hidden relative animate-slide-up delay-${Math.min(index * 100, 600)}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-smooth animate-gradient-rotate" />

                  <CardHeader className="relative">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl ${
                          tool.color === "primary"
                            ? "bg-primary"
                            : tool.color === "secondary"
                              ? "bg-secondary"
                              : tool.color === "accent"
                                ? "bg-accent"
                                : tool.color === "success"
                                  ? "bg-success"
                                  : tool.color === "warning"
                                    ? "bg-warning"
                                    : "bg-primary"
                        } transition-smooth group-hover:scale-110 group-hover:rotate-6 shadow-lg ${
                          tool.color === "primary"
                            ? "group-hover:glow-primary"
                            : tool.color === "secondary"
                              ? "group-hover:glow-secondary"
                              : tool.color === "accent"
                                ? "group-hover:glow-accent"
                                : tool.color === "success"
                                  ? "group-hover:glow-success"
                                  : tool.color === "warning"
                                    ? "group-hover:glow-warning"
                                    : "group-hover:glow-primary"
                        }`}
                      >
                        <Icon
                          className={`h-6 w-6 sm:h-7 sm:w-7 ${
                            tool.color === "primary"
                              ? "text-primary-foreground"
                              : tool.color === "secondary"
                                ? "text-secondary-foreground"
                                : tool.color === "accent"
                                  ? "text-accent-foreground"
                                  : tool.color === "success"
                                    ? "text-success-foreground"
                                    : tool.color === "warning"
                                      ? "text-warning-foreground"
                                      : "text-primary-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg sm:text-xl font-bold mb-2 group-hover:gradient-text transition-smooth">
                          {tool.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <CardDescription className="text-sm sm:text-base leading-relaxed">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="relative container mx-auto px-4 lg:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto animate-scale-in">
          <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm hover-glow-intense transition-smooth">
            <div className="absolute inset-0 animate-gradient-rotate opacity-50" />
            <CardContent className="relative p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent mb-6 glow-primary animate-pulse-glow shimmer">
                <Zap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">
                Ready to <span className="gradient-text">Transform Your Learning?</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 50,000+ students who are already studying smarter with AI-powered tools. Start your free trial
                today.
              </p>
              <Button
                size="lg"
                asChild
                className="text-base font-bold bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground hover:scale-105 transition-smooth px-8 py-6 shadow-xl hover:glow-primary shimmer"
              >
                <Link href="/signup">
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Started Free
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="relative backdrop-blur-strong bg-background/80 border-t border-border/50 py-8 mt-16 md:mt-20 animate-fade-in">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-secondary to-accent shadow-lg glow-primary animate-gradient-border">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-black gradient-text">StudyHub</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 StudyHub. Empowering students with AI-powered learning tools.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
