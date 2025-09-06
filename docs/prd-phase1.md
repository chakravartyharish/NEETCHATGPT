# Phase 1 PRD — NEET Prep AI Platform

## Scope (Phase 1 Only)
- **Backend & Infra Foundations**
  - Supabase (Postgres + Auth + Storage + Realtime + Edge Functions + pgvector)
  - Vercel (Next.js App Router + Vercel AI SDK + Edge Middleware)
- **Core Features**
  - Authentication & Authorization (Supabase Auth, JWT, RLS)
  - Content API (courses/modules/lessons)
  - Files API (media delivery via signed URLs)
  - Quiz Engine (quizzes, attempts, scoring)
  - RAG Ingestion Pipeline (chunk → embed → pgvector)
  - AI Tutor Orchestration (prompt assembly + streaming)
  - PWA shell with offline caching (static + SWR)
- **Observability**
  - Logs, metrics, traces, error monitoring
- **Compliance**
  - DPDP/GDPR: consent capture, RLS, retention schedules
- **Deliverables**
  - Working monorepo on GitHub with Vercel deployment
  - Phase 1 docs (Mermaid diagrams, checklist, PRD)
  - CI/CD pipelines with preview/prod

## Out of Scope (Future Phases)
- Live classes (WebRTC SFU)
- Dashboards (educator, institution, moderator)
- Notifications fanout
- i18n content
- Advanced moderation/feedback loops

## Success Criteria
- Deployed app responds to auth/login + content APIs
- Quizzes functional with scoring + persistence
- AI tutor returns grounded answers from embeddings
- Offline mode works for cached lessons/quizzes
- RLS ensures tenant/role security
