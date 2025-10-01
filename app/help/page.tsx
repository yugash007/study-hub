import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { HelpCircle, BookOpen, MessageSquare, ArrowLeft } from "lucide-react"

const faqs = [
  {
    question: "How do I get started with StudyHub?",
    answer:
      "Simply sign up for a free account, and you'll have immediate access to all 7 AI-powered study tools. No credit card required!",
  },
  {
    question: "Is StudyHub free to use?",
    answer:
      "Yes! StudyHub offers a free tier with access to all basic features. We also offer premium plans with advanced features and unlimited usage.",
  },
  {
    question: "What tools are available?",
    answer:
      "We offer 7 powerful tools: Formula Generator, Analogy Engine, Exam Heatmap, Weakness Detector, Revision Planner, Code Fixer, and Group Study Arena.",
  },
  {
    question: "Can I use StudyHub on mobile devices?",
    answer:
      "StudyHub is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers.",
  },
  {
    question: "How does the AI work?",
    answer:
      "Our AI uses advanced machine learning models trained on educational content to provide personalized study assistance, generate summaries, identify patterns, and more.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take security seriously. All data is encrypted in transit and at rest. We never share your personal information with third parties.",
  },
  {
    question: "Can I collaborate with other students?",
    answer:
      "Yes! Our Group Study Arena tool allows you to create virtual study rooms and collaborate with classmates in real-time.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support PDF, DOCX, TXT, and various image formats. Our tools can extract and analyze content from all these file types.",
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 mb-6 shadow-xl dark:glow-primary">
              <HelpCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-black mb-4 gradient-text">Help Center</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Find answers to common questions and get support
            </p>
          </div>

          <Card className="glass-strong border-2 depth-xl mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-black">Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-bold hover:text-primary transition-smooth">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass border-2 depth-md hover-lift transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg dark:glow-primary">
                    <BookOpen className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black">Documentation</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Explore our comprehensive guides and tutorials to get the most out of StudyHub.
                </p>
                <Button variant="outline" className="w-full glass border-2 bg-transparent">
                  View Docs
                </Button>
              </CardContent>
            </Card>

            <Card className="glass border-2 depth-md hover-lift transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg dark:glow-secondary">
                    <MessageSquare className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black">Contact Support</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:scale-105 transition-smooth dark:btn-glow shadow-lg"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
