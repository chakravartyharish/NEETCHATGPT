
import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!
const client = new OpenAI({ apiKey: OPENAI_API_KEY })
const sb = createClient(SUPABASE_URL, SUPABASE_KEY)

const CONTENT_DIR = path.join(process.cwd(), 'content')

function chunkText(text: string, size = 800, overlap = 100) {
  const out: string[] = []
  let i = 0
  while (i < text.length) {
    out.push(text.slice(i, i + size))
    i += size - overlap
  }
  return out
}

async function main() {
  if (!fs.existsSync(CONTENT_DIR)) return console.log('No content/ dir found')
  const files = fs.readdirSync(CONTENT_DIR)
  for (const file of files) {
    const full = path.join(CONTENT_DIR, file)
    const text = fs.readFileSync(full, 'utf-8')
    const topic = path.basename(file, path.extname(file))
    const lang = 'en'
    const { data: doc, error } = await sb.from('documents').insert({ text, topic, lang }).select().single()
    if (error) throw error
    const chunks = chunkText(text)
    for (let idx = 0; idx < chunks.length; idx++) {
      const chunk = chunks[idx]
      const emb = await client.embeddings.create({ model: 'text-embedding-3-small', input: chunk })
      const vector = emb.data[0].embedding
      await sb.from('embeddings').insert({
        document_id: doc.id,
        embedding: vector as any,
        chunk_id: `${doc.id}-${idx}`,
        chunk_index: idx
      })
      console.log('Inserted chunk', idx, 'for', file)
    }
  }
  console.log('Done.')
}

main().catch((e)=>{ console.error(e); process.exit(1) })
