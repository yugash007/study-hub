"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, ArrowLeft, Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  topic: string
}

interface QuizResult {
  score: number
  totalQuestions: number
  weakTopics: { topic: string; accuracy: number }[]
  strongTopics: { topic: string; accuracy: number }[]
}

export default function WeaknessDetectorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<QuizResult | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setQuizStarted(false)
      setShowResult(false)
    }
  }

  const handleGenerateQuiz = async () => {
    if (!file) return

    setIsGenerating(true)

    // Simulate AI quiz generation
    setTimeout(() => {
      const mockQuestions: Question[] = [
        {
          id: 1,
          question: "What is the time complexity of binary search in a sorted array?",
          options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
          correctAnswer: 1,
          topic: "Algorithms",
        },
        {
          id: 2,
          question: "Which data structure uses LIFO (Last In First Out) principle?",
          options: ["Queue", "Stack", "Array", "Linked List"],
          correctAnswer: 1,
          topic: "Data Structures",
        },
        {
          id: 3,
          question: "What does SQL stand for?",
          options: [
            "Structured Query Language",
            "Simple Question Language",
            "Standard Query Logic",
            "System Query Language",
          ],
          correctAnswer: 0,
          topic: "Databases",
        },
        {
          id: 4,
          question: "In object-oriented programming, what is encapsulation?",
          options: [
            "Creating multiple instances",
            "Hiding internal state and requiring interaction through methods",
            "Inheriting from parent classes",
            "Overloading methods",
          ],
          correctAnswer: 1,
          topic: "OOP Concepts",
        },
        {
          id: 5,
          question: "What is the purpose of a foreign key in a database?",
          options: [
            "To uniquely identify a record",
            "To link two tables together",
            "To encrypt data",
            "To index a column",
          ],
          correctAnswer: 1,
          topic: "Databases",
        },
      ]

      setQuestions(mockQuestions)
      setAnswers(new Array(mockQuestions.length).fill(-1))
      setIsGenerating(false)
      setQuizStarted(true)
      setCurrentQuestion(0)
      setSelectedAnswer(null)
    }, 2000)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedAnswer
      setAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(answers[currentQuestion + 1] !== -1 ? answers[currentQuestion + 1] : null)
      } else {
        // Calculate results
        calculateResults(newAnswers)
      }
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] !== -1 ? answers[currentQuestion - 1] : null)
    }
  }

  const calculateResults = (finalAnswers: number[]) => {
    let correctCount = 0
    const topicScores: { [key: string]: { correct: number; total: number } } = {}

    questions.forEach((q, index) => {
      const isCorrect = finalAnswers[index] === q.correctAnswer
      if (isCorrect) correctCount++

      if (!topicScores[q.topic]) {
        topicScores[q.topic] = { correct: 0, total: 0 }
      }
      topicScores[q.topic].total++
      if (isCorrect) topicScores[q.topic].correct++
    })

    const topicAccuracies = Object.entries(topicScores).map(([topic, scores]) => ({
      topic,
      accuracy: Math.round((scores.correct / scores.total) * 100),
    }))

    const weakTopics = topicAccuracies.filter((t) => t.accuracy < 70).sort((a, b) => a.accuracy - b.accuracy)
    const strongTopics = topicAccuracies.filter((t) => t.accuracy >= 70).sort((a, b) => b.accuracy - a.accuracy)

    setResult({
      score: correctCount,
      totalQuestions: questions.length,
      weakTopics,
      strongTopics,
    })
    setShowResult(true)
  }

  const handleRetry = () => {
    setQuizStarted(false)
    setShowResult(false)
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedAnswer(null)
    setFile(null)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

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
                <Target className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h1 className="text-2xl font-black text-foreground">Topic Weakness Detector</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {!quizStarted && !showResult && (
            <>
              {/* Description */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Identify Your Knowledge Gaps</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Upload your study notes and we'll generate a personalized quiz to identify which topics you need to
                    focus on. Get targeted feedback on your weakest areas before the exam.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    Upload Your Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.txt,.md"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm font-semibold text-foreground mb-2">
                        {file ? file.name : "Click to upload your study notes"}
                      </p>
                      <p className="text-xs text-muted-foreground">PDF, TXT, or Markdown files</p>
                    </label>
                  </div>

                  <Button onClick={handleGenerateQuiz} disabled={!file || isGenerating} className="w-full" size="lg">
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Quiz...
                      </>
                    ) : (
                      <>
                        <Target className="mr-2 h-4 w-4" />
                        Generate Personalized Quiz
                      </>
                    )}
                  </Button>

                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">How it works:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• AI analyzes your notes to identify key topics</li>
                      <li>• Generates 5-10 targeted questions per topic</li>
                      <li>• Provides detailed feedback on weak areas</li>
                      <li>• Suggests specific topics to review</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {quizStarted && !showResult && (
            <Card>
              <CardHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      Question {currentQuestion + 1} of {questions.length}
                    </CardTitle>
                    <span className="text-sm font-semibold text-muted-foreground">
                      Topic: {questions[currentQuestion].topic}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground leading-relaxed">
                    {questions[currentQuestion].question}
                  </h3>

                  <RadioGroup
                    value={selectedAnswer?.toString()}
                    onValueChange={(val) => handleAnswerSelect(Number.parseInt(val))}
                  >
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                            selectedAnswer === index
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => handleAnswerSelect(index)}
                        >
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    Previous
                  </Button>
                  <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} className="flex-1">
                    {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {showResult && result && (
            <>
              {/* Score Card */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-6xl font-black text-primary mb-4">
                      {Math.round((result.score / result.totalQuestions) * 100)}%
                    </div>
                    <p className="text-lg text-muted-foreground">
                      You got {result.score} out of {result.totalQuestions} questions correct
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Weak Topics */}
              {result.weakTopics.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="h-5 w-5" />
                      Topics to Focus On
                    </CardTitle>
                    <CardDescription>These topics need more attention before your exam</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {result.weakTopics.map((topic, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">{topic.topic}</span>
                            <span className="text-sm text-destructive font-bold">{topic.accuracy}% accuracy</span>
                          </div>
                          <Progress value={topic.accuracy} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Strong Topics */}
              {result.strongTopics.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <CheckCircle2 className="h-5 w-5" />
                      Strong Topics
                    </CardTitle>
                    <CardDescription>You're doing well in these areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {result.strongTopics.map((topic, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">{topic.topic}</span>
                            <span className="text-sm text-primary font-bold">{topic.accuracy}% accuracy</span>
                          </div>
                          <Progress value={topic.accuracy} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button onClick={handleRetry} className="w-full" size="lg">
                Take Another Quiz
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
