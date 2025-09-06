# Phase 1 Planning — NEET Prep AI Platform

## Milestones
1. **M1: Foundation**
   - Repo setup, Vercel + Supabase projects
   - CI/CD pipelines with migrations & seed
2. **M2: Core Data & Auth**
   - ERD + RLS policies
   - Supabase Auth (email OTP + OAuth)
3. **M3: Content & Quiz**
   - Content API + signed URL delivery
   - Quiz engine (tables + APIs + scoring)
4. **M4: RAG + AI Tutor**
   - Ingestion pipeline (chunk → embed → pgvector)
   - Prompt orchestration + streaming via Vercel AI SDK
5. **M5: PWA + Offline**
   - Service worker, stale‑while‑revalidate
   - IndexedDB sync of attempts
6. **M6: Observability + Compliance**
   - Logs/metrics/traces
   - Consent & DSR endpoints, retention jobs

## Dependencies
- Vercel & Supabase accounts
- Drizzle ORM for migrations
- Embeddings model (OpenAI or local)

## Risks
- Latency of AI calls → mitigate with SSE streaming + caching
- Supabase limits (pgvector scale) → plan for sharding if needed
- Offline sync conflicts → design idempotent API endpoints

## Timeline (solo dev, est.)
- 8–10 weeks (2 per milestone incl. buffer)
