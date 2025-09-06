# Phase 1 BMAD Extended Diagrams

## Blueprint → Model → Architect → Develop

### Blueprint (Problem, Personas, Features)
```mermaid
flowchart TD
  P[Problem: AI tutoring for NEET] --> G[Goal: Scalable PWA with offline + AI tutor]
  G --> Personas[Personas]
  Personas --> Student
  Personas --> Educator
  Personas --> Institution
  Personas --> Moderator
  G --> Features[Phase 1 Features: Auth, Content, Quiz, AI Tutor, PWA]
```

### Model (Blocks, Data Flow)
```mermaid
flowchart LR
  AuthBlock[Auth Block] --> DB[(Supabase Postgres + RLS)]
  ContentBlock[Content Block] --> DB
  QuizBlock[Quiz Block] --> DB
  AITutorBlock[AI Tutor Block] --> DB
  AITutorBlock --> AI[Vercel AI SDK]
  PWA[Service Worker + IndexedDB] --> API[APIs]
  API --> DB
```

### Architect (System Design)
```mermaid
flowchart TD
  User --> CDN --> VercelEdge --> Next[Next.js App Router]
  Next --> Supabase[(Auth + Postgres + Storage + pgvector)]
  Next --> AI[Vercel AI SDK]
  Next --> Logs[Observability]
  PWA[Service Worker + Cache + IndexedDB] --> Next
```

### Develop (Action Steps)
```mermaid
flowchart TD
  Start --> Repo[Init Monorepo + CI/CD]
  Repo --> DBMigrate[Setup DB + RLS + Migrations]
  DBMigrate --> Auth[Implement Auth + JWT]
  Auth --> Content[ContentAPI + Storage]
  Content --> Quiz[Quiz Engine APIs]
  Quiz --> RAG[RAG Ingestion Pipeline]
  RAG --> Tutor[AITutor API Orchestrator]
  Tutor --> PWA[Service Worker + Offline Sync]
  PWA --> Obs[Observability + Compliance]
  Obs --> Done[Phase 1 Complete]
```
