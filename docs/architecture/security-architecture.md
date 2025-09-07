# Security Architecture

## Authentication & Authorization

```typescript
// JWT-based authentication with Supabase
interface SecurityContext {
  user: User
  roles: string[]
  permissions: string[]
  sessionToken: string
}

// Role-based access control
const permissions = {
  student: ['read:courses', 'write:progress', 'read:own_data'],
  educator: ['read:courses', 'write:courses', 'read:analytics'],
  admin: ['*'], // Full access
  moderator: ['read:*', 'write:moderation'],
}

// Middleware for route protection
export async function authMiddleware(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const { data: user } = await supabase.auth.getUser(token)

    if (!user) {
      return new Response('Invalid token', { status: 401 })
    }

    // Add user context to request
    request.headers.set('x-user-id', user.id)
    request.headers.set('x-user-role', user.role)

    return NextResponse.next()
  } catch (error) {
    return new Response('Token validation failed', { status: 401 })
  }
}
```

## Data Encryption & Privacy

```typescript
// Encryption utilities
class EncryptionService {
  private readonly algorithm = 'aes-256-gcm'
  private readonly keyLength = 32

  async encryptSensitiveData(data: string): Promise<EncryptedData> {
    const key = crypto.randomBytes(this.keyLength)
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipher(this.algorithm, key)

    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()])

    return {
      encrypted: encrypted.toString('base64'),
      key: key.toString('base64'),
      iv: iv.toString('base64'),
      tag: cipher.getAuthTag().toString('base64'),
    }
  }
}

// GDPR compliance utilities
class PrivacyService {
  async anonymizeUserData(userId: string): Promise<void> {
    // Remove personally identifiable information
    await supabase
      .from('profiles')
      .update({
        email: `deleted_${Date.now()}@example.com`,
        full_name: 'Deleted User',
        avatar_url: null,
      })
      .eq('id', userId)

    // Keep learning data but anonymized
    await this.anonymizeLearningData(userId)
  }
}
```
