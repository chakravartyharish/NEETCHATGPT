
'use client'
import { useState } from 'react'

export default function TutorPage() {
  const [q, setQ] = useState('Explain Krebs cycle')
  const [a, setA] = useState<string>('')

  async function ask() {
    const r = await fetch('/api/ai/tutor', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ question: q }) })
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
    <div className="p-8 space-y-3">
      <textarea className="w-full border p-2 rounded" rows={3} value={q} onChange={e=>setQ(e.target.value)} />
      <button onClick={ask} className="px-4 py-2 bg-sky-600 text-white rounded">Ask</button>
      <pre className="whitespace-pre-wrap mt-4 p-3 border rounded">{a}</pre>
    </div>
  )
}
