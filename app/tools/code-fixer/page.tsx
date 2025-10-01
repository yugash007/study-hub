"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, ArrowLeft, Loader2, CheckCircle2, AlertTriangle, Copy } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FixResult {
  originalCode: string
  fixedCode: string
  errors: { line: number; message: string; severity: "error" | "warning" }[]
  fixes: string[]
  explanation: string
}

export default function CodeFixerPage() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("python")
  const [isFixing, setIsFixing] = useState(false)
  const [result, setResult] = useState<FixResult | null>(null)
  const [copied, setCopied] = useState(false)

  const handleFix = async () => {
    if (!code.trim()) return

    setIsFixing(true)

    // Simulate AI processing
    setTimeout(() => {
      const mockResult: FixResult = {
        originalCode: code,
        fixedCode: `def binary_search(arr, target):
    """
    Perform binary search on a sorted array.
    Returns the index of target if found, -1 otherwise.
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Test the function
test_array = [1, 3, 5, 7, 9, 11, 13]
result = binary_search(test_array, 7)
print(f"Found at index: {result}")`,
        errors: [
          {
            line: 2,
            message: "Missing docstring for function documentation",
            severity: "warning",
          },
          {
            line: 5,
            message: "Variable 'mid' calculation could cause integer overflow in some languages",
            severity: "warning",
          },
          {
            line: 8,
            message: "Missing return statement for when element is not found",
            severity: "error",
          },
        ],
        fixes: [
          "Added comprehensive docstring explaining function purpose and return value",
          "Fixed missing return statement at the end of function",
          "Improved variable naming for clarity",
          "Added example usage with test case",
          "Formatted code according to PEP 8 style guidelines",
        ],
        explanation:
          "The main issue was a missing return statement when the target element is not found in the array. Without this, the function would return None implicitly, which could cause confusion. I've also added proper documentation, improved code formatting, and included a practical example to demonstrate usage.",
      }

      setResult(mockResult)
      setIsFixing(false)
    }, 2500)
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.fixedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleReset = () => {
    setCode("")
    setResult(null)
    setCopied(false)
  }

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
                <Code className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h1 className="text-2xl font-black text-foreground">Error Fixer for Code Snippets</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Debug Your Code Instantly</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Paste buggy code from your lecture notes or assignments, and our AI will identify errors, fix them, and
                explain what was wrong. Perfect for CS students dealing with broken code examples.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Paste Your Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Programming Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="csharp">C#</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                      <SelectItem value="rust">Rust</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">Code Snippet</Label>
                  <Textarea
                    id="code"
                    placeholder="Paste your buggy code here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                </div>

                <Button onClick={handleFix} disabled={!code.trim() || isFixing} className="w-full" size="lg">
                  {isFixing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing & Fixing...
                    </>
                  ) : (
                    <>
                      <Code className="mr-2 h-4 w-4" />
                      Fix My Code
                    </>
                  )}
                </Button>

                {result && (
                  <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
                    Try Another Code
                  </Button>
                )}

                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">What we fix:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Syntax errors and typos</li>
                    <li>• Logic bugs and edge cases</li>
                    <li>• Missing imports and dependencies</li>
                    <li>• Code style and best practices</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Result Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Fixed Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Corrected Code</Label>
                        <Button onClick={handleCopy} size="sm" variant="outline" className="bg-transparent">
                          {copied ? (
                            <>
                              <CheckCircle2 className="mr-2 h-3 w-3" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="mr-2 h-3 w-3" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <Textarea
                        value={result.fixedCode}
                        readOnly
                        className="min-h-[300px] font-mono text-sm bg-muted"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[300px] flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                    <div className="text-center">
                      <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Fixed code will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Errors and Fixes */}
          {result && (
            <>
              {/* Errors Found */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Issues Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.errors.map((error, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-l-4 ${
                          error.severity === "error"
                            ? "border-destructive bg-destructive/10"
                            : "border-secondary bg-secondary/10"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-semibold ${
                              error.severity === "error"
                                ? "bg-destructive text-destructive-foreground"
                                : "bg-secondary text-secondary-foreground"
                            }`}
                          >
                            {error.severity}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground mb-1">Line {error.line}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{error.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Fixes Applied */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Fixes Applied
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.fixes.map((fix, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground leading-relaxed">{fix}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Explanation */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Detailed Explanation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground leading-relaxed">{result.explanation}</p>
                </CardContent>
              </Card>
            </>
          )}

          {/* Tips Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Pro Tips for Better Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Test Edge Cases</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Always test your code with empty inputs, null values, and boundary conditions.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Read Error Messages</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Error messages often tell you exactly what's wrong and where to look.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Use Debuggers</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Step through your code line by line to understand how it executes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
