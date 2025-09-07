import { supabaseServer } from '@/lib/supabase/server'
import OpenAI from 'openai'
import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

const SYSTEM = `You are a helpful NEET exam tutor. Explain step by step, cite short bullet references when possible, and keep answers focused on syllabus.`

export async function POST(req: NextRequest) {
  const sb = supabaseServer()
  const { question } = await req.json()

  // Retrieve top-3 chunks (placeholder RPC; replace with real vector similarity)
  const { data: ctx } = await sb.rpc('match_documents', { query_text: question, match_count: 3 })
  const context = (ctx || []).map((c: any) => `[${c.lang}/${c.topic}] ${c.text}`).join('\n---\n')

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const stream = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    messages: [
      { role: 'system', content: SYSTEM },
      { role: 'user', content: `Context:\n${context}\n\nQuestion: ${question}\nAnswer:` },
    ],
  })

  const encoder = new TextEncoder()
  const rs = new ReadableStream({
    async start(controller) {
      for await (const part of stream) {
        const token = part.choices?.[0]?.delta?.content || ''
        if (token) controller.enqueue(encoder.encode(token))
      }
      controller.close()
    },
  })
  return new Response(rs, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
