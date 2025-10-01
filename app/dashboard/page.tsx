"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Lightbulb,
  BarChart3,
  Target,
  Clock,
  Code,
  Award,
  Calendar,
  Flame,
  Trophy,
  Zap,
  Brain,
  Users,
  MessageSquare,
  Timer,
  Star,
  ChevronRight,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const tools = [
  {
    id: "formula-generator",
    title: "Formula Generator",
    icon: BookOpen,
    href: "/tools/formula-generator",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "analogy-engine",
    title: "Analogy Engine",
    icon: Lightbulb,
    href: "/tools/analogy-engine",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "exam-heatmap",
    title: "Exam Heatmap",
    icon: BarChart3,
    href: "/tools/exam-heatmap",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "weakness-detector",
    title: "Weakness Detector",
    icon: Target,
    href: "/tools/weakness-detector",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "revision-planner",
    title: "Revision Planner",
    icon: Clock,
    href: "/tools/revision-planner",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "code-fixer",
    title: "Code Fixer",
    icon: Code,
    href: "/tools/code-fixer",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "study-arena",
    title: "Study Arena",
    icon: Users,
    href: "/tools/study-arena",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "flashcards",
    title: "AI Flashcards",
    icon: Brain,
    href: "/tools/flashcards",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "ai-tutor",
    title: "AI Tutor",
    icon: MessageSquare,
    href: "/tools/ai-tutor",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "focus-timer",
    title: "Focus Timer",
    icon: Timer,
    href: "/tools/focus-timer",
    color: "from-orange-500 to-red-500",
  },
]

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first study session",
    icon: Star,
    unlocked: true,
    progress: 100,
  },
  { id: 2, title: "Week Warrior", description: "Maintain a 7-day streak", icon: Flame, unlocked: true, progress: 100 },
  { id: 3, title: "Tool Master", description: "Use all 10 tools", icon: Trophy, unlocked: false, progress: 60 },
  {
    id: 4,
    title: "Speed Learner",
    description: "Complete 50 flashcards in one session",
    icon: Zap,
    unlocked: false,
    progress: 40,
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/dashboard")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Grid pattern background */}
      <div className="fixed inset-0 grid-pattern opacity-50 pointer-events-none" />

      {/* Gradient orbs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative container mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black mb-2">
                Welcome back, <span className="gradient-text">{user.name}</span>!
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">Ready to level up your learning?</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-bold text-muted-foreground">Level 12</div>
                <div className="text-2xl font-black gradient-text">2,450 XP</div>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg glow-primary">
                <Trophy className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Progress to Level 13</span>
              <span className="text-muted-foreground">2,450 / 3,000 XP</span>
            </div>
            <Progress value={81.6} className="h-3" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="relative overflow-hidden border-2 border-border/50 bg-card/50 backdrop-blur-sm hover-lift transition-smooth">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold">Study Streak</CardTitle>
              <Flame className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-black gradient-text">7 Days</div>
              <p className="text-xs text-muted-foreground mt-1">🔥 Keep the fire burning!</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 border-border/50 bg-card/50 backdrop-blur-sm hover-lift transition-smooth">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold">Tools Mastered</CardTitle>
              <Award className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-black gradient-text">6/10</div>
              <p className="text-xs text-muted-foreground mt-1">60% completion</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 border-border/50 bg-card/50 backdrop-blur-sm hover-lift transition-smooth">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold">Study Time</CardTitle>
              <Clock className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-black gradient-text">24.5h</div>
              <p className="text-xs text-muted-foreground mt-1">This week</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 border-border/50 bg-card/50 backdrop-blur-sm hover-lift transition-smooth">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-yellow-500/10" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold">Next Exam</CardTitle>
              <Calendar className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-black gradient-text">14 Days</div>
              <p className="text-xs text-muted-foreground mt-1">Stay focused!</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-black">Achievements</CardTitle>
                    <CardDescription>Unlock rewards as you progress</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="font-bold">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon
                    return (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-xl border-2 transition-smooth ${
                          achievement.unlocked
                            ? "bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30"
                            : "bg-muted/30 border-border/50 opacity-60"
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                              achievement.unlocked
                                ? "bg-gradient-to-br from-primary to-secondary shadow-lg"
                                : "bg-muted"
                            }`}
                          >
                            <Icon
                              className={`h-5 w-5 ${achievement.unlocked ? "text-primary-foreground" : "text-muted-foreground"}`}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm mb-1">{achievement.title}</h4>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                        {!achievement.unlocked && (
                          <div className="space-y-1">
                            <Progress value={achievement.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground text-right">{achievement.progress}%</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-black">Weekly Goals</CardTitle>
              <CardDescription>Track your progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Study 25 hours</span>
                  <span className="text-muted-foreground">24.5/25h</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Complete 100 flashcards</span>
                  <span className="text-muted-foreground">75/100</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Use 5 different tools</span>
                  <span className="text-muted-foreground">6/5 ✓</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Maintain daily streak</span>
                  <span className="text-muted-foreground">7/7 days</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black">Quick Access</h2>
            <Button variant="ghost" size="sm" className="font-bold">
              View All Tools
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {tools.slice(0, 5).map((tool) => {
              const Icon = tool.icon
              return (
                <Link key={tool.id} href={tool.href}>
                  <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm hover-lift hover:border-primary/30 transition-smooth cursor-pointer group h-full">
                    <CardHeader className="text-center">
                      <div
                        className={`flex h-14 w-14 mx-auto mb-3 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} shadow-lg group-hover:scale-110 transition-smooth group-hover:glow-primary`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-sm font-bold group-hover:gradient-text transition-smooth">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-black">Recent Activity</CardTitle>
            <CardDescription>Your latest study sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  tool: "AI Flashcards",
                  time: "2 hours ago",
                  status: "Completed",
                  xp: "+50 XP",
                  icon: Brain,
                  color: "from-indigo-500 to-purple-500",
                },
                {
                  tool: "Focus Timer",
                  time: "5 hours ago",
                  status: "Completed",
                  xp: "+30 XP",
                  icon: Timer,
                  color: "from-orange-500 to-red-500",
                },
                {
                  tool: "Exam Heatmap",
                  time: "Yesterday",
                  status: "In Progress",
                  xp: "",
                  icon: BarChart3,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  tool: "AI Tutor",
                  time: "Yesterday",
                  status: "Completed",
                  xp: "+40 XP",
                  icon: MessageSquare,
                  color: "from-violet-500 to-fuchsia-500",
                },
              ].map((activity, index) => {
                const Icon = activity.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl border-2 border-border/50 bg-card/30 hover-lift transition-smooth"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${activity.color} shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">{activity.tool}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-sm font-bold ${activity.status === "Completed" ? "text-green-500" : "text-amber-500"}`}
                      >
                        {activity.status}
                      </span>
                      {activity.xp && <p className="text-xs text-muted-foreground mt-1">{activity.xp}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
