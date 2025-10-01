"use client"

import type React from "react"

import { useRef, useEffect } from "react"
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
import { useChat } from "ai/react"

const quickPrompts = [
  { icon: Calculator, text: "Explain calculus derivatives", category: "Math" },
  { icon: Code, text: "Debug my Python code", category: "Programming" },
  { icon: BookOpen, text: "Summarize this chapter", category: "Study Help" },
  { icon: Lightbulb, text: "Give me study tips", category: "Tips" },
]

export default function AITutorPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hi! I'm your AI study assistant powered by DeepSeek. I can help you with homework, explain complex concepts, provide step-by-step solutions, and answer any questions you have. What would you like to learn today?",
      },
    ],
  })

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleQuickPrompt = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as React.ChangeEvent<HTMLInputElement>)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
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
                <p className="text-xs text-muted-foreground hidden sm:block">Powered by DeepSeek AI</p>
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

            {isLoading && (
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
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything... (Press Enter to send)"
                className="flex-1 h-12 border-2"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:scale-105 transition-smooth shadow-lg px-6"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Powered by DeepSeek AI • Available 24/7 • Supports all subjects
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
