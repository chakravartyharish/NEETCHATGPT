'use client'
import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function LoginPage() {
  const sb = supabaseBrowser()
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState<string>('')

  async function magicLink(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + '/app' },
    })
    setMsg(error ? error.message : 'Check your email for a magic link.')
  }

  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form onSubmit={magicLink} className="mt-4 space-y-3">
        <input
          className="w-full rounded border p-2"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="rounded bg-sky-600 px-4 py-2 text-white">Send Magic Link</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  )
}
