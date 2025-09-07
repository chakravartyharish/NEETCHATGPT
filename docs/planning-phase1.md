# Phase 1 Planning — NEET Prep AI Platform

## Current Status (September 7, 2025)

**Overall Progress**: 25% Complete  
**Active Milestone**: M2 (Core Data & Auth)  
**Timeline**: On track for 8-10 week completion

## Milestones

1. **M1: Foundation** ✅ **COMPLETED** (2 weeks)
   - ✅ Repo setup, Vercel + Supabase projects
   - ✅ CI/CD pipelines with migrations & seed
   - ✅ BMAD methodology implementation
   - ✅ Development toolchain and quality gates

2. **M2: Core Data & Auth** 🚧 **IN PROGRESS** (Week 3-4)
   - 🚧 ERD + RLS policies (In Progress)
   - 📋 Supabase Auth (email OTP + OAuth)
   - 📋 Enhanced authentication middleware
   - 📋 User profile management system

3. **M3: Content & Quiz** 📋 **PLANNED** (Week 5-6)
   - 📋 Content API + signed URL delivery
   - 📋 Quiz engine (tables + APIs + scoring)
   - 📋 Content management interface
   - 📋 Quiz taking and results system

4. **M4: RAG + AI Tutor** 🔧 **PARTIALLY STARTED** (Week 7-8)
   - 🔧 Basic ingestion pipeline exists
   - 🔧 Basic AI tutor API exists
   - 📋 Enhanced prompt orchestration + streaming via Vercel AI SDK
   - 📋 Conversation management and optimization

5. **M5: PWA + Offline** 📋 **PLANNED** (Week 9-10)
   - 🔧 Basic service worker exists
   - 📋 Enhanced stale‑while‑revalidate
   - 📋 IndexedDB sync of attempts
   - 📋 Comprehensive offline functionality

6. **M6: Observability + Compliance** 📋 **PLANNED** (Week 11-12)
   - 📋 Logs/metrics/traces
   - 📋 Consent & DSR endpoints, retention jobs
   - 📋 Performance monitoring
   - 📋 Security compliance validation

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
