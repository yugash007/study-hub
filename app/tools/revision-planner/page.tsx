"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ArrowLeft, Calendar, Loader2, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface StudyBlock {
  time: string
  duration: number
  topic: string
  priority: "high" | "medium" | "low"
  activities: string[]
}

interface StudyPlan {
  totalHours: number
  blocks: StudyBlock[]
  tips: string[]
}

export default function RevisionPlannerPage() {
  const [availableHours, setAvailableHours] = useState("")
  const [examDate, setExamDate] = useState("")
  const [topics, setTopics] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null)

  const handleGenerate = async () => {
    if (!availableHours || !examDate || !topics) return

    setIsGenerating(true)

    // Simulate AI processing
    setTimeout(() => {
      const hours = Number.parseFloat(availableHours)
      const mockPlan: StudyPlan = {
        totalHours: hours,
        blocks: [
          {
            time: "9:00 AM - 10:30 AM",
            duration: 1.5,
            topic: "Data Structures & Algorithms",
            priority: "high",
            activities: [
              "Review sorting algorithms (30 min)",
              "Practice binary search problems (45 min)",
              "Quick quiz on time complexity (15 min)",
            ],
          },
          {
            time: "10:45 AM - 11:45 AM",
            duration: 1,
            topic: "Database Design",
            priority: "high",
            activities: [
              "Review normalization concepts (20 min)",
              "Practice SQL queries (30 min)",
              "Review foreign keys and relationships (10 min)",
            ],
          },
          {
            time: "12:00 PM - 1:00 PM",
            duration: 1,
            topic: "Break & Lunch",
            priority: "low",
            activities: ["Rest and recharge", "Light review of flashcards", "Prepare for afternoon session"],
          },
          {
            time: "1:00 PM - 2:15 PM",
            duration: 1.25,
            topic: "Object-Oriented Programming",
            priority: "medium",
            activities: [
              "Review inheritance and polymorphism (30 min)",
              "Code practice: design patterns (35 min)",
              "Review encapsulation examples (20 min)",
            ],
          },
          {
            time: "2:30 PM - 3:30 PM",
            duration: 1,
            topic: "Web Development",
            priority: "medium",
            activities: [
              "Review HTTP methods and REST (20 min)",
              "Practice API design questions (25 min)",
              "Review authentication concepts (15 min)",
            ],
          },
          {
            time: "3:45 PM - 4:30 PM",
            duration: 0.75,
            topic: "Final Review & Practice Test",
            priority: "high",
            activities: [
              "Take a mini practice test (30 min)",
              "Review mistakes and weak areas (15 min)",
              "Plan tomorrow's focus topics",
            ],
          },
        ],
        tips: [
          "Take a 5-10 minute break between each study block to maintain focus",
          "Start with high-priority topics when your energy is highest",
          "Use active recall techniques rather than passive reading",
          "Review your weakest topics identified by the Weakness Detector",
          "Stay hydrated and maintain good posture during study sessions",
        ],
      }

      setStudyPlan(mockPlan)
      setIsGenerating(false)
    }, 2000)
  }

  const handleDownload = () => {
    if (!studyPlan) return

    let planText = `STUDY PLAN - ${examDate}\n`
    planText += `Total Study Time: ${studyPlan.totalHours} hours\n\n`
    planText += "=".repeat(50) + "\n\n"

    studyPlan.blocks.forEach((block, index) => {
      planText += `${index + 1}. ${block.time} (${block.duration}h) - ${block.topic}\n`
      planText += `   Priority: ${block.priority.toUpperCase()}\n`
      planText += "   Activities:\n"
      block.activities.forEach((activity) => {
        planText += `   - ${activity}\n`
      })
      planText += "\n"
    })

    planText += "=".repeat(50) + "\n\n"
    planText += "STUDY TIPS:\n"
    studyPlan.tips.forEach((tip, index) => {
      planText += `${index + 1}. ${tip}\n`
    })

    const blob = new Blob([planText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "study-plan.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-primary text-primary-foreground"
      case "medium":
        return "bg-secondary text-secondary-foreground"
      case "low":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-black text-foreground">Time-Smart Revision Planner</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Optimize Your Study Time</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Tell us how much time you have available, and we'll create an intelligent, prioritized revision schedule
                that maximizes your exam preparation efficiency.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Plan Your Study Session
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hours">Available Study Time (hours)</Label>
                  <Input
                    id="hours"
                    type="number"
                    min="1"
                    max="24"
                    step="0.5"
                    placeholder="e.g., 6"
                    value={availableHours}
                    onChange={(e) => setAvailableHours(e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exam-date">Exam Date</Label>
                  <Input
                    id="exam-date"
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topics">Topics to Cover</Label>
                  <Textarea
                    id="topics"
                    placeholder="List the topics you need to study, separated by commas&#10;e.g., Data Structures, Algorithms, Databases, OOP"
                    value={topics}
                    onChange={(e) => setTopics(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!availableHours || !examDate || !topics || isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Plan...
                    </>
                  ) : (
                    <>
                      <Clock className="mr-2 h-4 w-4" />
                      Generate Study Plan
                    </>
                  )}
                </Button>

                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">Smart Planning Features:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Prioritizes high-frequency exam topics</li>
                    <li>• Includes strategic break times</li>
                    <li>• Balances different learning activities</li>
                    <li>• Adapts to your available time</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Preview/Info Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-secondary" />
                  Study Plan Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!studyPlan ? (
                  <div className="min-h-[400px] flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                    <div className="text-center">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Your study plan will appear here</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border-2 border-primary">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Study Time</p>
                        <p className="text-2xl font-black text-primary">{studyPlan.totalHours} hours</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Study Blocks</p>
                        <p className="text-2xl font-black text-primary">{studyPlan.blocks.length}</p>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {studyPlan.blocks.slice(0, 3).map((block, index) => (
                        <div key={index} className="p-3 bg-card border border-border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="text-xs text-muted-foreground">{block.time}</p>
                              <p className="font-semibold text-sm text-foreground">{block.topic}</p>
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-semibold ${getPriorityColor(block.priority)}`}
                            >
                              {block.priority}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{block.duration}h session</p>
                        </div>
                      ))}
                      {studyPlan.blocks.length > 3 && (
                        <p className="text-xs text-center text-muted-foreground py-2">
                          + {studyPlan.blocks.length - 3} more blocks
                        </p>
                      )}
                    </div>

                    <Button onClick={handleDownload} variant="outline" className="w-full bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Download Full Plan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Full Study Plan */}
          {studyPlan && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Your Complete Study Schedule</CardTitle>
                <CardDescription>Follow this schedule to maximize your exam preparation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {studyPlan.blocks.map((block, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4 py-2">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">{block.time}</p>
                          <h4 className="text-lg font-bold text-foreground">{block.topic}</h4>
                          <p className="text-sm text-muted-foreground">{block.duration} hour session</p>
                        </div>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${getPriorityColor(block.priority)}`}
                        >
                          {block.priority}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {block.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="flex items-start gap-2">
                            <span className="text-primary font-bold mt-1">•</span>
                            <span className="text-sm text-foreground leading-relaxed">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-muted rounded-lg">
                  <h4 className="font-bold text-foreground mb-4">Study Tips for Success</h4>
                  <ul className="space-y-2">
                    {studyPlan.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-secondary font-bold mt-1">{index + 1}.</span>
                        <span className="text-sm text-foreground leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
