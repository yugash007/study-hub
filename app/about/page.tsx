import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Target, Users, Zap, ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-smooth mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-smooth group-hover:-translate-x-1" />
          Back to home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6 shadow-xl dark:glow-primary">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-black mb-4 gradient-text">About StudyHub</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Empowering students worldwide with AI-powered learning tools
            </p>
          </div>

          <Card className="glass-strong border-2 depth-xl mb-8">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-black mb-6 gradient-text">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At StudyHub, we believe that every student deserves access to powerful, intelligent tools that make
                learning more efficient and effective. Our mission is to transform the way students prepare for exams by
                leveraging cutting-edge AI technology.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We've built a comprehensive suite of 7 AI-powered tools designed specifically for university students,
                helping them save time, identify weaknesses, and achieve better results in their exams.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="glass border-2 depth-md hover-lift transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg dark:glow-primary">
                    <Target className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To become the world's leading AI-powered learning platform, helping millions of students achieve
                  academic excellence through intelligent, personalized study tools.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-2 depth-md hover-lift transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg dark:glow-secondary">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black">Our Values</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Innovation, accessibility, and student success drive everything we do. We're committed to continuous
                  improvement and putting students first in every decision.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-strong border-2 depth-xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg dark:glow-success">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-black gradient-text">Join Our Community</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Join thousands of students who are already using StudyHub to ace their exams. Whether you're preparing
                for finals, working on assignments, or just trying to understand complex topics, we're here to help you
                succeed.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:scale-105 transition-smooth dark:btn-glow shadow-lg"
              >
                <Link href="/signup">Get Started Free</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
