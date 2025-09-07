# Phase 1 Tasklists — GitHub Issue Style

## M1: Foundation

- [ ] Init monorepo, Next.js scaffold, Tailwind + shadcn/ui
- [ ] Connect GitHub ↔ Vercel, create preview/prod
- [ ] Create Supabase project, connect to repo
- [ ] Add Drizzle migrations + seed script
- [ ] CI checks: lint, typecheck, tests

## M2: Core Data & Auth

- [ ] Create ERD tables (users, profiles, institutions, courses, lessons, quizzes, attempts)
- [ ] Enable RLS, policies per tenant_id + role
- [ ] Supabase Auth (email OTP + OAuth)
- [ ] JWT helpers in Next.js
- [ ] Protect routes with middleware

## M3: Content & Quiz

- [ ] ContentAPI (CRUD courses/modules/lessons)
- [ ] FilesAPI (signed URLs via Supabase Storage)
- [ ] Quiz engine endpoints (start, submit, score)
- [ ] Result page UI

## M4: RAG + AI Tutor

- [ ] Ingestion pipeline: chunk, embed, pgvector upsert
- [ ] Prompt templates (system/safety/grounding/few-shot)
- [ ] TutorAPI: retrieval + orchestration + streaming (SSE)
- [ ] Persist ai_sessions + ai_messages

## M5: PWA + Offline

- [ ] Service Worker (app shell, static precache)
- [ ] Stale-While-Revalidate for content pages
- [ ] IndexedDB queue for offline attempts
- [ ] Background sync API

## M6: Observability + Compliance

- [ ] Structured logging
- [ ] Metrics + OTEL tracing
- [ ] Consent capture flow
- [ ] DSR endpoints (export/delete)
- [ ] Retention jobs (Supabase Edge cron)
