"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Upload,
  Plus,
  ArrowLeft,
  RotateCw,
  Check,
  X,
  Sparkles,
  Zap,
  Trophy,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Flashcard {
  id: number
  front: string
  back: string
  difficulty: "easy" | "medium" | "hard"
  nextReview: Date
  reviewCount: number
}

const mockFlashcards: Flashcard[] = [
  {
    id: 1,
    front: "What is the time complexity of binary search?",
    back: "O(log n) - Binary search divides the search space in half with each iteration, resulting in logarithmic time complexity.",
    difficulty: "medium",
    nextReview: new Date(),
    reviewCount: 3,
  },
  {
    id: 2,
    front: "Define polymorphism in OOP",
    back: "Polymorphism is the ability of objects to take on multiple forms. It allows methods to do different things based on the object it is acting upon.",
    difficulty: "hard",
    nextReview: new Date(),
    reviewCount: 1,
  },
  {
    id: 3,
    front: "What is the Pythagorean theorem?",
    back: "a² + b² = c², where c is the hypotenuse of a right triangle and a and b are the other two sides.",
    difficulty: "easy",
    nextReview: new Date(),
    reviewCount: 5,
  },
]

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(mockFlashcards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [studyMode, setStudyMode] = useState(false)
  const [newFront, setNewFront] = useState("")
  const [newBack, setNewBack] = useState("")
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 })

  const currentCard = flashcards[currentIndex]

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % flashcards.length)
  }

  const handlePrevious = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length)
  }

  const handleDifficulty = (difficulty: "easy" | "medium" | "hard") => {
    setSessionStats((prev) => ({
      correct: difficulty === "easy" ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
    }))

    // Update card difficulty and schedule next review (spaced repetition)
    const updatedCards = [...flashcards]
    updatedCards[currentIndex] = {
      ...updatedCards[currentIndex],
      difficulty,
      reviewCount: updatedCards[currentIndex].reviewCount + 1,
    }
    setFlashcards(updatedCards)

    handleNext()
  }

  const handleAddCard = () => {
    if (!newFront.trim() || !newBack.trim()) return

    const newCard: Flashcard = {
      id: flashcards.length + 1,
      front: newFront,
      back: newBack,
      difficulty: "medium",
      nextReview: new Date(),
      reviewCount: 0,
    }

    setFlashcards([...flashcards, newCard])
    setNewFront("")
    setNewBack("")
  }

  const handleGenerateFromText = () => {
    // Simulate AI generation
    const generatedCards: Flashcard[] = [
      {
        id: flashcards.length + 1,
        front: "What is React?",
        back: "React is a JavaScript library for building user interfaces, particularly single-page applications.",
        difficulty: "medium",
        nextReview: new Date(),
        reviewCount: 0,
      },
      {
        id: flashcards.length + 2,
        front: "What are React Hooks?",
        back: "Hooks are functions that let you use state and other React features in functional components.",
        difficulty: "medium",
        nextReview: new Date(),
        reviewCount: 0,
      },
    ]

    setFlashcards([...flashcards, ...generatedCards])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Grid pattern background */}
      <div className="fixed inset-0 grid-pattern opacity-50 pointer-events-none" />

      {/* Gradient orbs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg glow-primary">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black gradient-text">AI Flashcard Generator</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Smart learning with spaced repetition</p>
              </div>
            </div>
            {studyMode && (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-bold text-muted-foreground">Session Progress</div>
                  <div className="text-lg font-black gradient-text">
                    {sessionStats.correct}/{sessionStats.total}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="relative container mx-auto px-4 py-8">
        <Tabs defaultValue="study" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12">
            <TabsTrigger value="study" className="font-bold" onClick={() => setStudyMode(true)}>
              <Brain className="mr-2 h-4 w-4" />
              Study Mode
            </TabsTrigger>
            <TabsTrigger value="create" className="font-bold" onClick={() => setStudyMode(false)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Cards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="study" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-black gradient-text mb-1">{flashcards.length}</div>
                  <div className="text-sm text-muted-foreground">Total Cards</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-black gradient-text mb-1">
                    {sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-black gradient-text mb-1">{sessionStats.total}</div>
                  <div className="text-sm text-muted-foreground">Reviewed</div>
                </CardContent>
              </Card>
            </div>

            {/* Flashcard Display */}
            <div className="max-w-3xl mx-auto">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">
                  Card {currentIndex + 1} of {flashcards.length}
                </span>
                <Progress value={((currentIndex + 1) / flashcards.length) * 100} className="w-32 h-2" />
              </div>

              <div className="relative h-[400px] cursor-pointer perspective-1000" onClick={handleFlip}>
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front of card */}
                  <Card
                    className={`absolute inset-0 border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm backface-hidden ${
                      !isFlipped ? "block" : "hidden"
                    }`}
                  >
                    <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-xl glow-primary">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-2xl font-bold leading-relaxed">{currentCard?.front}</p>
                      <p className="text-sm text-muted-foreground mt-6">Click to reveal answer</p>
                    </CardContent>
                  </Card>

                  {/* Back of card */}
                  <Card
                    className={`absolute inset-0 border-2 border-secondary/30 bg-gradient-to-br from-secondary/10 to-accent/10 backdrop-blur-sm backface-hidden ${
                      isFlipped ? "block" : "hidden"
                    }`}
                  >
                    <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-accent shadow-xl glow-secondary">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-lg leading-relaxed">{currentCard?.back}</p>
                      <p className="text-sm text-muted-foreground mt-6">How well did you know this?</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Navigation and Difficulty Buttons */}
              <div className="mt-6 space-y-4">
                {isFlipped ? (
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      onClick={() => handleDifficulty("hard")}
                      variant="outline"
                      size="lg"
                      className="border-2 border-red-500/30 hover:bg-red-500/10 font-bold"
                    >
                      <X className="mr-2 h-5 w-5 text-red-500" />
                      Hard
                    </Button>
                    <Button
                      onClick={() => handleDifficulty("medium")}
                      variant="outline"
                      size="lg"
                      className="border-2 border-amber-500/30 hover:bg-amber-500/10 font-bold"
                    >
                      <RotateCw className="mr-2 h-5 w-5 text-amber-500" />
                      Medium
                    </Button>
                    <Button
                      onClick={() => handleDifficulty("easy")}
                      variant="outline"
                      size="lg"
                      className="border-2 border-green-500/30 hover:bg-green-500/10 font-bold"
                    >
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      Easy
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      onClick={handlePrevious}
                      variant="outline"
                      size="lg"
                      className="flex-1 border-2 font-bold bg-transparent"
                    >
                      <ChevronLeft className="mr-2 h-5 w-5" />
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      variant="outline"
                      size="lg"
                      className="flex-1 border-2 font-bold bg-transparent"
                    >
                      Next
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Spaced Repetition Info */}
            <Card className="max-w-3xl mx-auto border-2 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Spaced Repetition Algorithm
                </CardTitle>
                <CardDescription>
                  Our AI-powered system schedules reviews based on your performance to maximize retention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="text-2xl font-black text-green-500 mb-1">Easy</div>
                    <div className="text-xs text-muted-foreground">Review in 7 days</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="text-2xl font-black text-amber-500 mb-1">Medium</div>
                    <div className="text-xs text-muted-foreground">Review in 3 days</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="text-2xl font-black text-red-500 mb-1">Hard</div>
                    <div className="text-xs text-muted-foreground">Review tomorrow</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Manual Creation */}
              <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" />
                    Create Flashcard Manually
                  </CardTitle>
                  <CardDescription>Add your own custom flashcards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="front" className="font-semibold">
                      Front (Question)
                    </Label>
                    <Input
                      id="front"
                      placeholder="What is the capital of France?"
                      value={newFront}
                      onChange={(e) => setNewFront(e.target.value)}
                      className="h-12 border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="back" className="font-semibold">
                      Back (Answer)
                    </Label>
                    <Textarea
                      id="back"
                      placeholder="Paris is the capital and most populous city of France..."
                      value={newBack}
                      onChange={(e) => setNewBack(e.target.value)}
                      className="min-h-[120px] border-2"
                    />
                  </div>
                  <Button
                    onClick={handleAddCard}
                    disabled={!newFront.trim() || !newBack.trim()}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:scale-105 transition-smooth shadow-lg"
                    size="lg"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Add Flashcard
                  </Button>
                </CardContent>
              </Card>

              {/* AI Generation */}
              <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI-Powered Generation
                  </CardTitle>
                  <CardDescription>Let AI create flashcards from your notes or textbook</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="content" className="font-semibold">
                      Paste Your Study Material
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="Paste your lecture notes, textbook excerpts, or any study material here..."
                      className="min-h-[200px] border-2"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleGenerateFromText}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:scale-105 transition-smooth shadow-lg"
                      size="lg"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Flashcards
                    </Button>
                    <Button variant="outline" size="lg" className="border-2 font-bold bg-transparent">
                      <Upload className="mr-2 h-5 w-5" />
                      Upload PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Card Library */}
              <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    Your Flashcard Library ({flashcards.length} cards)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {flashcards.map((card, index) => (
                      <div
                        key={card.id}
                        className="p-4 rounded-lg border-2 border-border/50 bg-card/30 hover-lift transition-smooth"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="font-bold mb-1">{card.front}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">{card.back}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded ${
                                card.difficulty === "easy"
                                  ? "bg-green-500/20 text-green-500"
                                  : card.difficulty === "medium"
                                    ? "bg-amber-500/20 text-amber-500"
                                    : "bg-red-500/20 text-red-500"
                              }`}
                            >
                              {card.difficulty}
                            </span>
                            <span className="text-xs text-muted-foreground">Reviewed {card.reviewCount}x</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
