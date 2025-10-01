"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Timer, ArrowLeft, Play, Pause, RotateCw, Clock, Zap, Trophy, Target } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { saveStudySession, addXPToUser } from "@/lib/firestore"
import { auth } from "@/lib/firebase"

const PRESET_TIMES = [
  { label: "5 min", minutes: 5 },
  { label: "10 min", minutes: 10 },
  { label: "15 min", minutes: 15 },
  { label: "25 min", minutes: 25 },
  { label: "30 min", minutes: 30 },
  { label: "45 min", minutes: 45 },
  { label: "60 min", minutes: 60 },
]

interface ConfettiParticle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  color: string
  size: number
  shape: "circle" | "square" | "triangle"
}

export default function FocusTimerPage() {
  const [customMinutes, setCustomMinutes] = useState<string>("")
  const [totalSeconds, setTotalSeconds] = useState<number>(0)
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number | null>(null)

  const saveCompletedSession = async (duration: number) => {
    try {
      const user = auth.currentUser
      if (user) {
        const xpEarned = 10
        await saveStudySession({
          userId: user.uid,
          duration,
          type: "focus",
          xpEarned,
        })
        await addXPToUser(user.uid, xpEarned)
        console.log("[v0] Study session saved to Firebase")
      } else {
        console.log("[v0] No user logged in, session not saved")
      }
    } catch (error) {
      console.error("[v0] Error saving study session:", error)
    }
  }

  const triggerCelebration = () => {
    setShowCelebration(true)

    // Create confetti particles
    const particles: ConfettiParticle[] = []
    const colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#ec4899", "#f97316", "#10b981", "#eab308"]
    const shapes: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"]

    for (let i = 0; i < 100; i++) {
      particles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * 5 + 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      })
    }

    setConfetti(particles)

    // Animate confetti
    const animate = () => {
      setConfetti((prev) => {
        const updated = prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.3, // gravity
            rotation: p.rotation + p.rotationSpeed,
          }))
          .filter((p) => p.y < window.innerHeight + 50)

        if (updated.length > 0) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          setShowCelebration(false)
        }

        return updated
      })
    }

    animationRef.current = requestAnimationFrame(animate)

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShowCelebration(false)
      setConfetti([])
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }, 5000)
  }

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            setSessionsCompleted((count) => count + 1)
            saveCompletedSession(totalSeconds)
            triggerCelebration()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, remainingSeconds, totalSeconds])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const handlePresetTime = (minutes: number) => {
    const seconds = minutes * 60
    setTotalSeconds(seconds)
    setRemainingSeconds(seconds)
    setIsRunning(false)
  }

  const handleCustomTime = () => {
    const minutes = Number.parseInt(customMinutes)
    if (isNaN(minutes) || minutes <= 0) return

    const seconds = minutes * 60
    setTotalSeconds(seconds)
    setRemainingSeconds(seconds)
    setIsRunning(false)
    setCustomMinutes("")
  }

  const handleStart = () => {
    if (remainingSeconds > 0) {
      setIsRunning(true)
    }
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setRemainingSeconds(totalSeconds)
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Grid pattern background */}
      <div className="fixed inset-0 grid-pattern opacity-50 pointer-events-none" />

      {/* Gradient orbs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-red-500/20 rounded-full blur-[120px] pointer-events-none animate-float delay-300" />

      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confetti.map((particle) => (
            <div
              key={particle.id}
              className="absolute"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                transform: `rotate(${particle.rotation}deg)`,
                transition: "none",
              }}
            >
              {particle.shape === "circle" && (
                <div
                  className="rounded-full"
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    backgroundColor: particle.color,
                  }}
                />
              )}
              {particle.shape === "square" && (
                <div
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    backgroundColor: particle.color,
                  }}
                />
              )}
              {particle.shape === "triangle" && (
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: `${particle.size / 2}px solid transparent`,
                    borderRight: `${particle.size / 2}px solid transparent`,
                    borderBottom: `${particle.size}px solid ${particle.color}`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-strong bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-smooth">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg glow-primary">
                <Timer className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black gradient-text">Focus Timer</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Stay focused and productive</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-bold text-muted-foreground">Sessions Today</div>
                <div className="text-lg font-black gradient-text">{sessionsCompleted}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
          <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-black gradient-text mb-1">{sessionsCompleted}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 mx-auto mb-2 text-amber-500" />
              <div className="text-2xl font-black gradient-text mb-1">{sessionsCompleted * 25}</div>
              <div className="text-sm text-muted-foreground">Minutes Focused</div>
            </CardContent>
          </Card>
          <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-black gradient-text mb-1">{sessionsCompleted * 10}</div>
              <div className="text-sm text-muted-foreground">XP Earned</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Timer Display */}
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center space-y-6">
                {/* Timer Display */}
                <div className="relative">
                  <div
                    className={`text-7xl sm:text-8xl md:text-9xl font-black gradient-text transition-smooth ${
                      isRunning ? "animate-pulse-glow" : ""
                    }`}
                  >
                    {formatTime(remainingSeconds)}
                  </div>
                  {totalSeconds > 0 && (
                    <div className="mt-4">
                      <Progress value={progressPercentage} className="h-3" />
                    </div>
                  )}
                </div>

                {/* Control Buttons */}
                <div className="flex gap-3 justify-center">
                  {!isRunning ? (
                    <Button
                      onClick={handleStart}
                      disabled={remainingSeconds === 0}
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold hover:scale-105 transition-smooth shadow-lg px-8"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Start
                    </Button>
                  ) : (
                    <Button
                      onClick={handleStop}
                      size="lg"
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:scale-105 transition-smooth shadow-lg px-8"
                    >
                      <Pause className="mr-2 h-5 w-5" />
                      Pause
                    </Button>
                  )}
                  <Button
                    onClick={handleReset}
                    disabled={remainingSeconds === totalSeconds}
                    variant="outline"
                    size="lg"
                    className="border-2 font-bold bg-transparent px-8"
                  >
                    <RotateCw className="mr-2 h-5 w-5" />
                    Reset
                  </Button>
                </div>

                {remainingSeconds === 0 && totalSeconds > 0 && (
                  <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/30 animate-scale-in">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Trophy className="h-8 w-8 text-green-500 animate-bounce" />
                      <p className="text-2xl font-black text-green-500">Session Complete!</p>
                      <Trophy className="h-8 w-8 text-green-500 animate-bounce" />
                    </div>
                    <p className="text-lg font-bold text-green-400">Amazing work! You earned +10 XP</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preset Times */}
          <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Quick Start Presets
              </CardTitle>
              <CardDescription>Choose a preset time to start your focus session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRESET_TIMES.map((preset) => (
                  <Button
                    key={preset.minutes}
                    onClick={() => handlePresetTime(preset.minutes)}
                    variant="outline"
                    className="border-2 font-bold hover:scale-105 transition-smooth hover:border-primary/50 hover:bg-primary/10"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Time Input */}
          <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                Custom Timer
              </CardTitle>
              <CardDescription>Set your own custom study duration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="custom-time" className="sr-only">
                    Minutes
                  </Label>
                  <Input
                    id="custom-time"
                    type="number"
                    min="1"
                    max="180"
                    placeholder="Enter minutes (e.g., 25)"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCustomTime()
                      }
                    }}
                    className="h-12 border-2 text-lg"
                  />
                </div>
                <Button
                  onClick={handleCustomTime}
                  disabled={!customMinutes || Number.parseInt(customMinutes) <= 0}
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:scale-105 transition-smooth shadow-lg px-6"
                  size="lg"
                >
                  Set Timer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pomodoro Info */}
          <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                Pomodoro Technique
              </CardTitle>
              <CardDescription>Maximize your productivity with proven time management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-bold mb-1">Focus for 25 minutes</p>
                    <p className="text-muted-foreground">Work on a single task without distractions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/5 border border-secondary/10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/20 text-secondary font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-bold mb-1">Take a 5-minute break</p>
                    <p className="text-muted-foreground">Rest, stretch, or grab a snack</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-accent font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-bold mb-1">Repeat 4 times</p>
                    <p className="text-muted-foreground">After 4 sessions, take a longer 15-30 minute break</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
