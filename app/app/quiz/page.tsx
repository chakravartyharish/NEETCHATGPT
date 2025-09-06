
'use client'
import { useState } from 'react'

export default function QuizPage() {
  const [question, setQuestion] = useState<any>(null)
  const [answer, setAnswer] = useState<string>('')
  const [result, setResult] = useState<string>('')

  async function start() {
    const r = await fetch('/api/quiz', { method: 'POST', body: JSON.stringify({ action:'start' }) })
    const j = await r.json(); setQuestion(j.question)
  }
  async function submit() {
    const r = await fetch('/api/quiz', { method: 'POST', body: JSON.stringify({ action:'submit', questionId: question.id, answer }) })
    const j = await r.json(); setResult(j.result)
  }

  return (
    <div className="p-8 space-y-3">
      <button onClick={start} className="px-4 py-2 bg-sky-600 text-white rounded">Start</button>
      {question && (
        <div className="space-y-2">
          <div className="font-medium">{question.stem}</div>
          {Array.isArray(question.choices) && question.choices.map((c:string)=>(
            <label key={c} className="block">
              <input type="radio" name="ans" value={c} onChange={e=>setAnswer(e.target.value)} /> {c}
            </label>
          ))}
          <button onClick={submit} className="px-4 py-2 bg-emerald-600 text-white rounded">Submit</button>
          {result && <div className="mt-2">Result: {result}</div>}
        </div>
      )}
    </div>
  )
}
