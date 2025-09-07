# Phase 1 Tasklists — GitHub Issue Style

## M1: Foundation ✅ COMPLETED

- [x] Init monorepo, Next.js scaffold, Tailwind + UI components
- [x] Connect GitHub ↔ Vercel, create preview/prod environment
- [x] Create Supabase project, connect to repo
- [x] Add database migrations + seed script foundation
- [x] CI checks: lint, typecheck, build validation
- [x] BMAD methodology implementation and documentation
- [x] Project foundation setup with development toolchain

## M2: Core Data & Auth 🚧 IN PROGRESS

- [ ] Complete database schema implementation (ERD tables: users, profiles, institutions, courses, lessons, quizzes, attempts)
- [ ] Enable RLS, policies per tenant_id + role
- [ ] Enhance Supabase Auth (email OTP + OAuth providers)
- [ ] Improve JWT helpers in Next.js middleware
- [ ] Protect routes with enhanced authentication middleware
- [ ] Complete user profile management system

## M3: Content & Quiz 📋 PLANNED

- [ ] ContentAPI (CRUD courses/modules/lessons) - Story 1.3
- [ ] FilesAPI (signed URLs via Supabase Storage) - Story 1.3
- [ ] Quiz engine endpoints (start, submit, score) - Story 1.4
- [ ] Question bank with multiple question types - Story 1.4
- [ ] Quiz taking interface with timer and navigation - Story 1.4
- [ ] Result analysis and progress tracking - Story 1.4

## M4: RAG + AI Tutor 🤖 PLANNED

- [ ] Enhanced ingestion pipeline: chunk, embed, pgvector upsert - Story 1.5
- [ ] Improved prompt templates (system/safety/grounding/few-shot) - Story 1.5
- [ ] Enhanced TutorAPI: retrieval + orchestration + streaming (SSE) - Story 1.5
- [ ] Persist ai_sessions + ai_messages with conversation management - Story 1.5
- [ ] Implement vector search optimization - Story 1.5
- [ ] Add AI safety and content filtering - Story 1.5

## M5: PWA + Offline 📱 PLANNED

- [ ] Enhanced Service Worker (app shell, static precache) - Story 1.6
- [ ] Stale-While-Revalidate for content pages - Story 1.6
- [ ] IndexedDB queue for offline quiz attempts - Story 1.6
- [ ] Background sync API for data synchronization - Story 1.6
- [ ] Offline content caching strategy - Story 1.6
- [ ] Network status indicators and offline UX - Story 1.6

## M6: Observability + Compliance 📊 PLANNED

- [ ] Structured logging with performance monitoring
- [ ] Metrics + OTEL tracing implementation
- [ ] Consent capture flow for GDPR/DPDP compliance
- [ ] DSR endpoints (export/delete user data)
- [ ] Retention jobs (Supabase Edge cron)
- [ ] Analytics dashboard for platform insights

## Current Sprint Status

**Active Stories:**

- Story 1.1: Project Foundation Setup ✅ **COMPLETED**
- Story 1.2: Database Schema & Authentication Setup 🚧 **IN PROGRESS**

**Next Stories (Ready for Implementation):**

- Story 1.3: Content Management System
- Story 1.4: Quiz Engine Implementation
- Story 1.5: AI Tutor Enhancement & RAG Implementation
- Story 1.6: PWA & Offline Capabilities
