import { convertToModelMessages, streamText, type UIMessage } from 'ai'
import { gateway } from '@ai-sdk/gateway'

import { PCE_CHAT_SYSTEM_PROMPT } from '@/lib/ai/pce-chat-system'

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Messages are required.' }, { status: 400 })
    }

    const result = streamText({
      model: gateway('openai/gpt-4o-mini'),
      system: PCE_CHAT_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json(
      {
        error:
          'Chat is temporarily unavailable. Please contact us on WhatsApp at +92 304 6668810 or visit a branch.',
      },
      { status: 500 },
    )
  }
}
