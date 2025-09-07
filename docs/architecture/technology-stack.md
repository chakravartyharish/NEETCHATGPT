# Technology Stack

## Frontend Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **State Management**: Zustand + React Query
- **PWA**: Workbox for service worker management
- **Testing**: Jest + Testing Library + Playwright

## Backend Stack

- **Primary Backend**: Supabase
  - **Database**: PostgreSQL 15+ with pgvector
  - **Authentication**: Supabase Auth (JWT-based)
  - **Storage**: Supabase Storage (S3-compatible)
  - **Realtime**: Supabase Realtime (WebSocket)
  - **Edge Functions**: Deno-based serverless functions

## AI/ML Stack

- **AI Framework**: Vercel AI SDK
- **LLM Provider**: OpenAI (GPT-4, GPT-3.5-turbo)
- **Embeddings**: OpenAI text-embedding-3-small
- **Vector Database**: pgvector (PostgreSQL extension)
- **RAG Framework**: Custom implementation with LangChain concepts

## Infrastructure Stack

- **Hosting**: Vercel (Edge Functions + Static Hosting)
- **CDN**: Vercel Edge Network
- **Monitoring**: Vercel Analytics + Custom instrumentation
- **Caching**: Redis (Upstash) + Browser caching
- **CI/CD**: GitHub Actions + Vercel Git integration
