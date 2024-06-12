import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: "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",
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const response = await openai.chat.completions.create({
    model: 'gpt-4-0125-preview',
    stream: true,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
