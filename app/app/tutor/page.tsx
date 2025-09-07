'use client'
import { useState } from 'react'

export default function TutorPage() {
  const [q, setQ] = useState('Explain Krebs cycle')
  const [a, setA] = useState<string>('')

  async function ask() {
    const r = await fetch('/api/ai/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q }),
    })
    const reader = r.body?.getReader()
    const decoder = new TextDecoder()
    let acc = ''
    while (true) {
      const { done, value } = await reader!.read()
      if (done) break
      acc += decoder.decode(value)
      setA(acc)
    }
  }

  return (
    <div className="space-y-3 p-8">
      <textarea
        className="w-full rounded border p-2"
        rows={3}
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <button onClick={ask} className="rounded bg-sky-600 px-4 py-2 text-white">
        Ask
      </button>
      <pre className="mt-4 whitespace-pre-wrap rounded border p-3">{a}</pre>
    </div>
  )
}
