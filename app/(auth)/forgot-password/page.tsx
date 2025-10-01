"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSuccess(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)]" />

      <div className="w-full max-w-md relative z-10">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-smooth mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-smooth group-hover:-translate-x-1" />
          Back to login
        </Link>

        <Card className="glass-strong border-2 depth-xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-xl dark:glow-success">
                {isSuccess ? (
                  <CheckCircle className="h-8 w-8 text-white" />
                ) : (
                  <BookOpen className="h-8 w-8 text-white" />
                )}
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-black gradient-text">
                {isSuccess ? "Check Your Email" : "Reset Password"}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {isSuccess
                  ? "We've sent password reset instructions to your email"
                  : "Enter your email and we'll send you reset instructions"}
              </CardDescription>
            </div>
          </CardHeader>

          {!isSuccess ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 glass border-2 focus:border-primary transition-smooth"
                      required
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:scale-105 transition-smooth dark:btn-glow shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </CardFooter>
            </form>
          ) : (
            <CardFooter>
              <Button asChild className="w-full h-12 text-base font-bold">
                <Link href="/login">Back to Login</Link>
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
