# Technical Architecture Overview

## High-Level Architecture

```
User → CDN → Vercel Edge → Next.js App Router → Supabase
                ↓
PWA (Service Worker + IndexedDB) ← → Vercel AI SDK
                ↓
        Observability Stack
```

## Technology Stack

**Frontend**:

- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- PWA capabilities

**Backend**:

- Supabase (Postgres + Auth + Storage + Realtime + Edge Functions)
- pgvector for embeddings
- Row Level Security (RLS)

**AI/ML**:

- Vercel AI SDK
- OpenAI API (GPT-4)
- Embedding models for RAG

**Infrastructure**:

- Vercel (hosting & edge functions)
- Supabase (database & backend services)
- CDN for global content delivery

**Observability**:

- Vercel Analytics
- Supabase Monitoring
- Custom error tracking
