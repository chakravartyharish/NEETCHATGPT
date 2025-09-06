
import Link from 'next/link'

export default function AppHome() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">App Home</h1>
      <ul className="list-disc pl-5">
        <li><Link className="text-sky-600 underline" href="/app/content">Content</Link></li>
        <li><Link className="text-sky-600 underline" href="/app/quiz">Quiz</Link></li>
        <li><Link className="text-sky-600 underline" href="/app/tutor">AI Tutor</Link></li>
      </ul>
    </div>
  )
}
