"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Moon, Globe, Shield, Trash2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [studyReminders, setStudyReminders] = useState(true)

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      logout()
      window.location.href = "/"
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2 gradient-text">Settings</h1>
          <p className="text-lg text-muted-foreground">Customize your StudyHub experience</p>
        </div>

        <div className="grid gap-6">
          <Card className="glass-strong border-2 depth-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg dark:glow-primary">
                  <Moon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black">Appearance</CardTitle>
                  <CardDescription>Customize how StudyHub looks</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold">Theme</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                </div>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="w-32 glass border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-strong border-2">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-strong border-2 depth-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg dark:glow-secondary">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black">Notifications</CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold">Email Updates</Label>
                  <p className="text-sm text-muted-foreground">Get weekly study tips and updates</p>
                </div>
                <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold">Study Reminders</Label>
                  <p className="text-sm text-muted-foreground">Daily reminders to keep you on track</p>
                </div>
                <Switch checked={studyReminders} onCheckedChange={setStudyReminders} />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-strong border-2 depth-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg dark:glow-success">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black">Preferences</CardTitle>
                  <CardDescription>Customize your learning experience</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold">Language</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-32 glass border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-strong border-2">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-strong border-2 border-destructive/20 depth-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-pink-500 shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible account actions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 glass rounded-lg border-2 border-destructive/20">
                <div>
                  <Label className="text-base font-semibold text-destructive">Delete Account</Label>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  className="hover:scale-105 transition-smooth"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
