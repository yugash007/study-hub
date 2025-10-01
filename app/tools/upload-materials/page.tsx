"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, Sparkles, Loader2, CheckCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  saveStudyMaterial,
  createFlashcard,
  getUserStudyMaterials,
  deleteStudyMaterial,
  type StudyMaterial,
} from "@/lib/firestore"
import { useEffect } from "react"

export default function UploadMaterialsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [summary, setSummary] = useState("")
  const [materials, setMaterials] = useState<StudyMaterial[]>([])
  const [category, setCategory] = useState("General")
  const userId = "demo-user" // Replace with actual auth user ID

  useEffect(() => {
    loadMaterials()
  }, [])

  const loadMaterials = async () => {
    try {
      const data = await getUserStudyMaterials(userId)
      setMaterials(data)
    } catch (error) {
      console.error("Failed to load materials:", error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setSummary("")
    }
  }

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        resolve(text)
      }
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  const processFile = async () => {
    if (!file) return

    setProcessing(true)
    try {
      // Extract text from file
      const fileContent = await extractTextFromFile(file)

      // Use AI to summarize (using AI SDK)
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: fileContent, fileName: file.name }),
      })

      const data = await response.json()
      setSummary(data.summary)

      // Save to Firestore
      await saveStudyMaterial({
        userId,
        title: file.name,
        content: data.summary,
        originalFileName: file.name,
        fileType: file.type,
        category,
        flashcardsGenerated: 0,
      })

      // Generate flashcards from summary
      if (data.flashcards && data.flashcards.length > 0) {
        for (const card of data.flashcards) {
          await createFlashcard({
            userId,
            question: card.question,
            answer: card.answer,
            category,
            difficulty: "medium",
          })
        }
      }

      await loadMaterials()
      setFile(null)
    } catch (error) {
      console.error("Error processing file:", error)
      alert("Failed to process file. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteStudyMaterial(id)
      await loadMaterials()
    } catch (error) {
      console.error("Failed to delete material:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            AI-Powered Study Material Processor
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Upload & Summarize
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload PDFs, documents, or code files. AI will summarize and create flashcards automatically.
          </p>
        </div>

        {/* Upload Card */}
        <Card className="p-8 border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full bg-primary/10 p-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Upload Study Material</h3>
                <p className="text-sm text-muted-foreground">Supports .txt, .md, .js, .py, .pdf and more</p>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".txt,.md,.js,.py,.java,.cpp,.pdf,.doc,.docx"
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Math, Science, Programming"
                  className="w-full px-4 py-2 rounded-lg border bg-background"
                />
              </div>

              {file && (
                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{(file.size / 1024).toFixed(2)} KB</span>
                </div>
              )}

              <Button onClick={processFile} disabled={!file || processing} className="w-full" size="lg">
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Process & Summarize
                  </>
                )}
              </Button>
            </div>

            {summary && (
              <div className="space-y-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Successfully Processed!</span>
                </div>
                <p className="text-sm text-muted-foreground">{summary}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Materials List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Your Study Materials</h2>
          {materials.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              No materials uploaded yet. Upload your first file to get started!
            </Card>
          ) : (
            <div className="grid gap-4">
              {materials.map((material) => (
                <Card key={material.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{material.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{material.content}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="px-2 py-1 bg-primary/10 rounded-full">{material.category}</span>
                        <span>{material.fileType}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => material.id && handleDelete(material.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
