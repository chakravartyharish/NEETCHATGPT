# Performance Architecture

## Caching Strategy

```typescript
// Multi-layer caching implementation
class CacheManager {
  private redis: Redis
  private browserCache: Cache

  async get(key: string): Promise<any> {
    // 1. Check browser cache first
    const browserResult = await this.browserCache.match(key)
    if (browserResult) return browserResult

    // 2. Check Redis cache
    const redisResult = await this.redis.get(key)
    if (redisResult) {
      // Update browser cache
      await this.browserCache.put(key, new Response(redisResult))
      return JSON.parse(redisResult)
    }

    // 3. Cache miss - fetch from database
    return null
  }
}

// Cache invalidation patterns
const cacheConfig = {
  courses: { ttl: 3600, tags: ['course', 'content'] },
  userProgress: { ttl: 300, tags: ['user', 'progress'] },
  quizResults: { ttl: 1800, tags: ['quiz', 'results'] },
  aiResponses: { ttl: 7200, tags: ['ai', 'responses'] },
}
```

## Database Optimization

```sql
-- Performance indexes
CREATE INDEX CONCURRENTLY idx_lessons_module_published
ON lessons(module_id, is_published) WHERE is_published = true;

CREATE INDEX CONCURRENTLY idx_content_embeddings_vector
ON content_embeddings USING ivfflat (embedding vector_cosine_ops);

CREATE INDEX CONCURRENTLY idx_user_progress_user_lesson
ON user_progress(user_id, lesson_id);

CREATE INDEX CONCURRENTLY idx_quiz_attempts_user_created
ON quiz_attempts(user_id, created_at DESC);

-- Partial indexes for common queries
CREATE INDEX CONCURRENTLY idx_courses_published
ON courses(created_at DESC) WHERE is_published = true;
```
