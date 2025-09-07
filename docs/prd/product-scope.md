# Product Scope

## Phase 1 Scope (Current)

### Core Infrastructure

- **Backend Foundation**: Supabase (Postgres + Auth + Storage + Realtime + Edge Functions + pgvector)
- **Frontend Platform**: Vercel (Next.js App Router + Vercel AI SDK + Edge Middleware)
- **PWA Capabilities**: Service Worker + IndexedDB for offline functionality

### Core Features

1. **Authentication & Authorization**
   - Supabase Auth integration
   - JWT token management
   - Row Level Security (RLS) implementation
   - Role-based access control

2. **Content Management System**
   - Course/module/lesson hierarchy
   - Rich media content support
   - Content versioning
   - Search and discovery

3. **File Storage & Delivery**
   - Signed URL-based media delivery
   - Optimized content delivery
   - Support for images, videos, PDFs
   - Caching strategies

4. **Quiz Engine**
   - Interactive quiz creation
   - Multiple question types
   - Attempt tracking and scoring
   - Progress analytics

5. **RAG (Retrieval Augmented Generation) System**
   - Content ingestion pipeline
   - Vector embeddings (pgvector)
   - Semantic search capabilities
   - Context-aware responses

6. **AI Tutor Orchestration**
   - Prompt assembly and management
   - Streaming responses
   - Context maintenance
   - Personalized interactions

7. **Progressive Web App (PWA)**
   - Offline content caching
   - Background sync
   - Push notifications (Phase 2)
   - App-like experience

8. **Observability & Monitoring**
   - Comprehensive logging
   - Performance metrics
   - Error tracking
   - User analytics

9. **Compliance & Privacy**
   - GDPR/DPDP compliance
   - Consent management
   - Data retention policies
   - Privacy controls

## Out of Scope (Future Phases)

- **Live Classes**: WebRTC-based real-time classes
- **Advanced Dashboards**: Educator and institution analytics
- **Notification System**: Push notifications and email campaigns
- **Internationalization**: Multi-language support
- **Advanced Moderation**: AI-powered content moderation
- **Peer Learning**: Student collaboration features
