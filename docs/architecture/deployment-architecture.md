# Deployment Architecture

## Infrastructure as Code

```yaml
# Vercel configuration
# vercel.json
{
  'version': 2,
  'builds': [{ 'src': 'next.config.js', 'use': '@vercel/next' }],
  'functions': { 'app/api/**/*.ts': { 'maxDuration': 30 } },
  'rewrites': [{ 'source': '/api/ai/:path*', 'destination': '/api/ai/:path*' }],
  'headers':
    [
      {
        'source': '/(.*)',
        'headers':
          [
            { 'key': 'X-Content-Type-Options', 'value': 'nosniff' },
            { 'key': 'X-Frame-Options', 'value': 'DENY' },
            { 'key': 'X-XSS-Protection', 'value': '1; mode=block' },
          ],
      },
    ],
}
```

## Environment Configuration

```typescript
// Environment-specific configurations
const config = {
  development: {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-3.5-turbo',
    },
    redis: {
      url: process.env.REDIS_URL,
    },
  },
  production: {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4',
    },
    redis: {
      url: process.env.REDIS_URL,
    },
  },
}
```
