"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, ArrowLeft, Upload, Loader2, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"

interface TopicData {
  topic: string
  frequency: number
  years: string[]
  importance: "high" | "medium" | "low"
}

export default function ExamHeatmapPage() {
  const [subject, setSubject] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [heatmapData, setHeatmapData] = useState<TopicData[] | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files)
      setHeatmapData(null)
    }
  }

  const handleAnalyze = async () => {
    if (!files || files.length === 0 || !subject.trim()) return

    setIsProcessing(true)

    // Simulate AI processing
    setTimeout(() => {
      const mockData: TopicData[] = [
        {
          topic: "Data Structures & Algorithms",
          frequency: 95,
          years: ["2024", "2023", "2022", "2021", "2020"],
          importance: "high",
        },
        {
          topic: "Object-Oriented Programming",
          frequency: 88,
          years: ["2024", "2023", "2022", "2021"],
          importance: "high",
        },
        {
          topic: "Database Design & SQL",
          frequency: 82,
          years: ["2024", "2023", "2022", "2020"],
          importance: "high",
        },
        {
          topic: "Web Development Fundamentals",
          frequency: 76,
          years: ["2024", "2023", "2022"],
          importance: "medium",
        },
        {
          topic: "Software Testing",
          frequency: 68,
          years: ["2024", "2023", "2021"],
          importance: "medium",
        },
        {
          topic: "Version Control (Git)",
          frequency: 55,
          years: ["2024", "2022"],
          importance: "medium",
        },
        {
          topic: "API Design & REST",
          frequency: 48,
          years: ["2024", "2023"],
          importance: "low",
        },
        {
          topic: "Security Best Practices",
          frequency: 42,
          years: ["2023", "2021"],
          importance: "low",
        },
      ]

      setHeatmapData(mockData)
      setIsProcessing(false)
    }, 2500)
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
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

  const getBarWidth = (frequency: number) => {
    return `${frequency}%`
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
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-black text-foreground">Exam Prep Heatmap</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Discover What Topics Matter Most</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Upload multiple years of past exam papers, and our AI will analyze them to create a visual heatmap
                showing which topics appear most frequently. Focus your study time on what actually gets tested.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Upload Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload Past Papers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold text-foreground">
                  Subject Name
                </label>
                <Input
                  id="subject"
                  placeholder="e.g., Computer Science 101, Organic Chemistry, Calculus II"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm font-semibold text-foreground mb-2">
                    {files ? `${files.length} file(s) selected` : "Click to upload past exam papers"}
                  </p>
                  <p className="text-xs text-muted-foreground">Upload multiple PDF files (3-5 years recommended)</p>
                </label>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!files || files.length === 0 || !subject.trim() || isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Papers...
                  </>
                ) : (
                  <>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Heatmap
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Heatmap Results */}
          {heatmapData && (
            <>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Topic Frequency Analysis
                  </CardTitle>
                  <CardDescription>
                    Topics ranked by how often they appear in past exams. Focus on high-frequency topics first.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {heatmapData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-sm font-bold text-muted-foreground w-6">{index + 1}</span>
                            <span className="text-sm font-semibold text-foreground">{item.topic}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground">{item.frequency}%</span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-semibold ${getImportanceColor(item.importance)}`}
                            >
                              {item.importance}
                            </span>
                          </div>
                        </div>
                        <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
                          <div
                            className={`absolute left-0 top-0 h-full ${item.importance === "high" ? "bg-primary" : item.importance === "medium" ? "bg-secondary" : "bg-border"} transition-all duration-500`}
                            style={{ width: getBarWidth(item.frequency) }}
                          />
                          <div className="absolute left-0 top-0 h-full w-full flex items-center px-3">
                            <span className="text-xs text-foreground font-medium">
                              Appeared in: {item.years.join(", ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Study Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Study Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2 p-4 bg-primary/10 rounded-lg border-2 border-primary">
                      <h4 className="font-bold text-foreground flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-black">
                          1
                        </span>
                        High Priority
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Focus 60% of your study time on these topics. They appear in almost every exam.
                      </p>
                      <p className="text-xs font-semibold text-primary">
                        {heatmapData.filter((t) => t.importance === "high").length} topics
                      </p>
                    </div>
                    <div className="space-y-2 p-4 bg-secondary/10 rounded-lg border-2 border-secondary">
                      <h4 className="font-bold text-foreground flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-black">
                          2
                        </span>
                        Medium Priority
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Allocate 30% of your time here. These topics appear regularly but less frequently.
                      </p>
                      <p className="text-xs font-semibold text-secondary">
                        {heatmapData.filter((t) => t.importance === "medium").length} topics
                      </p>
                    </div>
                    <div className="space-y-2 p-4 bg-muted rounded-lg border-2 border-border">
                      <h4 className="font-bold text-foreground flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-muted-foreground text-background flex items-center justify-center text-xs font-black">
                          3
                        </span>
                        Low Priority
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Use remaining 10% for these. Good to know but less likely to be heavily tested.
                      </p>
                      <p className="text-xs font-semibold text-muted-foreground">
                        {heatmapData.filter((t) => t.importance === "low").length} topics
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
