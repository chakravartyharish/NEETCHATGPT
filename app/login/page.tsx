
'use client'
import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function LoginPage() {
  const sb = supabaseBrowser()
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState<string>('')

  async function magicLink(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin + '/app' }})
    setMsg(error ? error.message : 'Check your email for a magic link.')
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form onSubmit={magicLink} className="mt-4 space-y-3">
        <input className="w-full border p-2 rounded" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="px-4 py-2 bg-sky-600 text-white rounded">Send Magic Link</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  )
}
