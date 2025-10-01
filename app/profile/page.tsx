"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Calendar, Save, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function ProfilePage() {
  const { user } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveSuccess(false)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSaving(false)
    setSaveSuccess(true)

    setTimeout(() => setSaveSuccess(false), 3000)
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2 gradient-text">Your Profile</h1>
          <p className="text-lg text-muted-foreground">Manage your account information</p>
        </div>

        <div className="grid gap-6">
          <Card className="glass-strong border-2 depth-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-black">Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-8">
                <Avatar className="h-32 w-32 border-4 border-primary/20 shadow-xl">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-4xl font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="mt-4 glass border-2 bg-transparent">
                  Change Avatar
                </Button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12 glass border-2 focus:border-primary transition-smooth"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 glass border-2 focus:border-primary transition-smooth"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Member Since</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      value={new Date(user.createdAt).toLocaleDateString()}
                      disabled
                      className="pl-10 h-12 glass border-2 bg-muted/50"
                    />
                  </div>
                </div>

                {saveSuccess && (
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold">
                    Profile updated successfully!
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full h-12 text-base font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:scale-105 transition-smooth dark:btn-glow shadow-lg"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Save Changes
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="glass-strong border-2 depth-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-black">Account Statistics</CardTitle>
              <CardDescription>Your learning journey at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 glass rounded-lg border-2">
                  <div className="text-3xl font-black gradient-text mb-1">42</div>
                  <p className="text-sm text-muted-foreground">Tools Used</p>
                </div>
                <div className="text-center p-4 glass rounded-lg border-2">
                  <div className="text-3xl font-black gradient-text mb-1">15</div>
                  <p className="text-sm text-muted-foreground">Study Days</p>
                </div>
                <div className="text-center p-4 glass rounded-lg border-2">
                  <div className="text-3xl font-black gradient-text mb-1">8</div>
                  <p className="text-sm text-muted-foreground">Cheat Sheets</p>
                </div>
                <div className="text-center p-4 glass rounded-lg border-2">
                  <div className="text-3xl font-black gradient-text mb-1">92%</div>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
