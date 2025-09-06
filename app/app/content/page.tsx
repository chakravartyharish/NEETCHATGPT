
import { supabaseServer } from '@/lib/supabase/server'

export default async function ContentPage() {
  const sb = supabaseServer()
  const { data, error } = await sb.from('lessons').select('id,title,type').limit(20)
  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold">Lessons</h1>
      {error && <p className="text-red-600">{error.message}</p>}
      <ul className="mt-4 space-y-2">
        {data?.map((l:any)=>(<li key={l.id} className="border p-3 rounded">{l.title} <span className="text-xs opacity-70">({l.type})</span></li>))}
      </ul>
    </div>
  )
}
