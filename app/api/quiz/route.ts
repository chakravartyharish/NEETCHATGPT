
import { NextRequest } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const sb = supabaseServer()
  const body = await req.json().catch(()=>({}))
  if (body.action === 'start') {
    const { data } = await sb.from('questions').select('id,stem,choices').limit(1)
    return new Response(JSON.stringify({ question: data?.[0] || null }), { headers:{'Content-Type':'application/json'} })
  }
  if (body.action === 'submit') {
    const { data } = await sb.from('questions').select('answer_key').eq('id', body.questionId).single()
    const correct = data?.answer_key === body.answer
    return new Response(JSON.stringify({ result: correct ? 'correct' : 'incorrect' }), { headers:{'Content-Type':'application/json'} })
  }
  return new Response(JSON.stringify({ ok: true }), { headers:{'Content-Type':'application/json'} })
}
