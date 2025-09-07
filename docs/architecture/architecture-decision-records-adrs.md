# Architecture Decision Records (ADRs)

## ADR-001: Choose Supabase over Custom Backend

**Decision**: Use Supabase as primary backend service
**Rationale**:

- Reduces development time
- Built-in authentication and authorization
- PostgreSQL with pgvector for AI capabilities
- Real-time subscriptions
- Automatic API generation

## ADR-002: Next.js App Router over Pages Router

**Decision**: Use Next.js 14+ App Router
**Rationale**:

- Better performance with server components
- Improved caching strategies
- Native TypeScript support
- Better developer experience

## ADR-003: Vercel AI SDK over Custom AI Integration

**Decision**: Use Vercel AI SDK for AI integrations
**Rationale**:

- Simplified streaming responses
- Built-in provider abstractions
- Excellent TypeScript support
- Performance optimizations
