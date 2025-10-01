"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  MessageSquare,
  ArrowLeft,
  Send,
  Sparkles,
  BookOpen,
  Code,
  Calculator,
  Lightbulb,
  User,
  Bot,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickPrompts = [
  { icon: Calculator, text: "Explain calculus derivatives", category: "Math" },
  { icon: Code, text: "Debug my Python code", category: "Programming" },
  { icon: BookOpen, text: "Summarize this chapter", category: "Study Help" },
  { icon: Lightbulb, text: "Give me study tips", category: "Tips" },
]

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I'm your AI study assistant. I can help you with homework, explain complex concepts, provide step-by-step solutions, and answer any questions you have. What would you like to learn today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: generateMockResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateMockResponse = (query: string): string => {
    if (query.toLowerCase().includes("derivative")) {
      return "Great question! A derivative represents the rate of change of a function. Here's a step-by-step explanation:\n\n1. **Basic Definition**: The derivative of f(x) at point x is the limit: f'(x) = lim(h→0) [f(x+h) - f(x)]/h\n\n2. **Power Rule**: For f(x) = x^n, the derivative is f'(x) = nx^(n-1)\n\n3. **Example**: If f(x) = x², then f'(x) = 2x\n\nWould you like me to explain any specific derivative rule or work through a practice problem?"
    }

    if (query.toLowerCase().includes("python") || query.toLowerCase().includes("code")) {
      return "I'd be happy to help with your Python code! To assist you better, please:\n\n1. Share the code snippet you're working on\n2. Describe what you're trying to achieve\n3. Explain what error or unexpected behavior you're seeing\n\nOnce you provide these details, I can help debug and explain the solution step by step!"
    }

    return "That's an interesting question! I can help you understand this topic better. Could you provide more details or context? For example:\n\n• What specific aspect are you struggling with?\n• Is this for a particular subject or course?\n• Would you like a simple explanation or a detailed breakdown?\n\nThe more information you share, the better I can tailor my explanation to your needs!"
  }

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg glow-primary">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black gradient-text">24/7 AI Study Assistant</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Get instant help with any subject</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative flex-1 container mx-auto px-4 py-6 flex flex-col max-w-5xl">
        {/* Messages */}
        <ScrollArea className="flex-1 pr-4 mb-6" ref={scrollRef}>
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                      <Bot className="h-5 w-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[80%] sm:max-w-[70%] ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground"
                      : "bg-card/50 backdrop-blur-sm border-2 border-border/50"
                  } rounded-2xl p-4 shadow-lg`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>

                {message.role === "user" && (
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarFallback className="bg-muted">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                    <Bot className="h-5 w-5 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-card/50 backdrop-blur-sm border-2 border-border/50 rounded-2xl p-4 shadow-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Prompts */}
        {messages.length === 1 && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-muted-foreground mb-3">Quick Start:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {quickPrompts.map((prompt, index) => {
                const Icon = prompt.icon
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto flex-col gap-2 p-4 border-2 hover:border-primary/30 transition-smooth bg-transparent"
                    onClick={() => handleQuickPrompt(prompt.text)}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-xs font-semibold text-center">{prompt.text}</span>
                  </Button>
                )
              })}
            </div>
          </div>
        )}

        {/* Input Area */}
        <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything... (Press Enter to send)"
                className="flex-1 h-12 border-2"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:scale-105 transition-smooth shadow-lg px-6"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Powered by advanced AI • Available 24/7 • Supports all subjects
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
