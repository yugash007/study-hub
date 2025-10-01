"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, ArrowLeft, Loader2, BookOpen, Sparkles } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface Explanation {
  analogy: string
  examDefinition: string
  keyPoints: string[]
}

export default function AnalogyEnginePage() {
  const [topic, setTopic] = useState("")
  const [context, setContext] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [explanation, setExplanation] = useState<Explanation | null>(null)

  const handleGenerate = async () => {
    if (!topic.trim()) return

    setIsProcessing(true)

    // Simulate AI processing
    setTimeout(() => {
      const mockExplanation: Explanation = {
        analogy: `Think of ${topic} like a restaurant kitchen. Just as a kitchen has different stations (prep, grill, dessert) that work together to create a meal, ${topic} has different components that work together to achieve a goal. The head chef (main controller) coordinates everything, ensuring each station (component) does its job at the right time. Orders come in (inputs), get processed through various stations (operations), and complete meals go out (outputs). If one station is slow or makes a mistake, it affects the whole kitchen's performance - just like in ${topic}!`,
        examDefinition: `${topic} is a systematic approach or structure that organizes and coordinates multiple components or processes to achieve a specific objective. It involves the interaction of distinct elements that work together according to defined rules or protocols, with each component contributing to the overall functionality and output of the system.`,
        keyPoints: [
          `Multiple interconnected components working together`,
          `Clear input-process-output flow`,
          `Coordination and communication between parts`,
          `Each component has a specific role and responsibility`,
          `Performance depends on all parts functioning correctly`,
        ],
      }

      setExplanation(mockExplanation)
      setIsProcessing(false)
    }, 2000)
  }

  const handleReset = () => {
    setTopic("")
    setContext("")
    setExplanation(null)
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Lightbulb className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h1 className="text-2xl font-black text-foreground">Analogy Engine Explainer</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Understand Complex Topics Through Simple Analogies</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Enter any complex topic from your notes, and our AI will provide a relatable analogy plus an exam-ready
                definition. Perfect for deepening your understanding beyond rote memorization.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Enter Your Topic
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="topic" className="text-sm font-semibold text-foreground">
                    Topic or Concept
                  </label>
                  <Input
                    id="topic"
                    placeholder="e.g., Neural Networks, Quantum Entanglement, Supply Chain Management"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="context" className="text-sm font-semibold text-foreground">
                    Additional Context (Optional)
                  </label>
                  <Textarea
                    id="context"
                    placeholder="Add any specific details or aspects you want the analogy to focus on..."
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <Button onClick={handleGenerate} disabled={!topic.trim() || isProcessing} className="w-full" size="lg">
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Explanation
                    </>
                  )}
                </Button>

                {explanation && (
                  <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
                    Try Another Topic
                  </Button>
                )}

                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">Best for:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Abstract or theoretical concepts</li>
                    <li>• Technical terms and jargon</li>
                    <li>• Complex systems and processes</li>
                    <li>• Difficult-to-visualize ideas</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Result Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-secondary" />
                  Your Explanation
                </CardTitle>
              </CardHeader>
              <CardContent>
                {explanation ? (
                  <div className="space-y-6">
                    {/* Analogy */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
                          <Lightbulb className="h-4 w-4 text-secondary" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Simple Analogy</h3>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed bg-muted p-4 rounded-lg">
                        {explanation.analogy}
                      </p>
                    </div>

                    {/* Exam Definition */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Exam-Style Definition</h3>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed bg-muted p-4 rounded-lg">
                        {explanation.examDefinition}
                      </p>
                    </div>

                    {/* Key Points */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-accent" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Key Points to Remember</h3>
                      </div>
                      <ul className="space-y-2">
                        {explanation.keyPoints.map((point, index) => (
                          <li key={index} className="text-sm text-foreground flex items-start gap-2">
                            <span className="text-primary font-bold mt-0.5">•</span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[400px] flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                    <div className="text-center">
                      <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Enter a topic to generate an explanation</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Examples Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Example Topics to Try</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-auto py-4 px-4 flex flex-col items-start gap-2 bg-transparent"
                  onClick={() => setTopic("Machine Learning")}
                >
                  <span className="font-semibold text-foreground">Machine Learning</span>
                  <span className="text-xs text-muted-foreground text-left">Computer Science</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 px-4 flex flex-col items-start gap-2 bg-transparent"
                  onClick={() => setTopic("Photosynthesis")}
                >
                  <span className="font-semibold text-foreground">Photosynthesis</span>
                  <span className="text-xs text-muted-foreground text-left">Biology</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 px-4 flex flex-col items-start gap-2 bg-transparent"
                  onClick={() => setTopic("Blockchain")}
                >
                  <span className="font-semibold text-foreground">Blockchain</span>
                  <span className="text-xs text-muted-foreground text-left">Technology</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
