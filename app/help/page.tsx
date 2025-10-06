"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LifeBuoy, BookOpen } from "lucide-react"

const faqs = [
  {
    question: "How do I get started with StudyHub?",
    answer:
      "Simply sign up for a free account, and you'll have immediate access to all our AI-powered study tools. No credit card required!",
  },
  {
    question: "Is StudyHub free to use?",
    answer:
      "Yes! StudyHub offers a free tier with access to all basic features. We also offer premium plans with advanced features and unlimited usage.",
  },
  {
    question: "What tools are available?",
    answer:
      "We offer powerful tools like the AI Arena, Exam Prep Heatmap, Focus Timer, Time-Smart Revision Planner, and a Group Study Arena.",
  },
  {
    question: "Can I use StudyHub on mobile devices?",
    answer:
      "StudyHub is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers.",
  },
  {
    question: "How does the AI work?",
    answer:
      "Our platform leverages state-of-the-art AI models to provide services like the AI Arena. We are constantly working to improve the intelligence and accuracy of our tools.",
  },
  {
    question: "How is my data protected?",
    answer:
      "We take data privacy very seriously. All your data is encrypted and securely stored. For more details, please see our Privacy Policy.",
  },
]

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <Card className="max-w-4xl mx-auto glass-strong border-2 depth-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-xl dark:glow-primary">
              <LifeBuoy className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black gradient-text">Help & FAQ</CardTitle>
          <CardDescription className="text-base mt-2">
            Find answers to common questions about StudyHub
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
