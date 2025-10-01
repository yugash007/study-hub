import { createOpenAI } from "@ai-sdk/openai"

export const deepseek = createOpenAI({
  apiKey: "sk-19d6c655095546fca3826f3ae85cc332",
  baseURL: "https://api.deepseek.com",
})

// Default model
export const defaultModel = deepseek("deepseek-chat")
