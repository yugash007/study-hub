import { convertToModelMessages, streamText, type UIMessage } from "ai"
import { defaultModel } from "@/lib/deepseek"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()

    const prompt = convertToModelMessages(messages)

    const result = streamText({
      model: defaultModel,
      system: `You are a helpful AI study assistant. You help students with:
- Explaining complex concepts in simple terms
- Providing step-by-step solutions to problems
- Answering questions about any subject
- Offering study tips and learning strategies
- Debugging code and explaining programming concepts

Be encouraging, patient, and thorough in your explanations.`,
      messages: prompt,
      abortSignal: req.signal,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
