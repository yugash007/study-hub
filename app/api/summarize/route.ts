import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { defaultModel } from "@/lib/deepseek"

export async function POST(req: NextRequest) {
  try {
    const { content, fileName } = await req.json()

    console.log("[v0] Starting summarization for:", fileName)
    console.log("[v0] Content length:", content?.length)

    if (!content || content.trim().length === 0) {
      console.log("[v0] Error: Empty content received")
      return NextResponse.json({ error: "No content to process" }, { status: 400 })
    }

    const { text } = await generateText({
      model: defaultModel,
      prompt: `You are a study assistant. Analyze this document and provide:
1. A concise summary (2-3 sentences)
2. Generate 3-5 flashcards in JSON format

Document: ${fileName}
Content: ${content.slice(0, 3000)}

Respond in this exact JSON format:
{
  "summary": "your summary here",
  "flashcards": [
    {"question": "question 1", "answer": "answer 1"},
    {"question": "question 2", "answer": "answer 2"}
  ]
}`,
    })

    console.log("[v0] AI response received:", text.slice(0, 100))

    let result
    try {
      result = JSON.parse(text)
    } catch (parseError) {
      console.log("[v0] JSON parse error, attempting to extract JSON from text")
      // Try to extract JSON from markdown code blocks
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[1] || jsonMatch[0])
      } else {
        throw new Error("Could not parse AI response as JSON")
      }
    }

    if (!result.summary || !result.flashcards) {
      console.log("[v0] Invalid result structure:", result)
      return NextResponse.json({ error: "AI response missing required fields" }, { status: 500 })
    }

    console.log("[v0] Successfully processed document")
    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Error in summarize API:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process document" },
      { status: 500 },
    )
  }
}
