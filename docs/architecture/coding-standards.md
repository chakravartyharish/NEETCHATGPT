# Coding Standards

## General Principles

### Code Quality

- **Readability First**: Code should be self-documenting
- **Consistency**: Follow established patterns throughout the codebase
- **Simplicity**: Prefer simple, straightforward solutions over complex ones
- **Performance**: Consider performance implications but prioritize maintainability

### SOLID Principles

- **Single Responsibility**: Each module/function should have one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Subtypes must be substitutable for their base types
- **Interface Segregation**: Many client-specific interfaces over one general-purpose interface
- **Dependency Inversion**: Depend on abstractions, not concretions

## TypeScript Standards

### Type Safety

```typescript
// Prefer explicit types over 'any'
interface User {
  id: string
  email: string
  profile: UserProfile
}

// Use union types for known variants
type UserRole = 'student' | 'educator' | 'admin' | 'moderator'

// Use branded types for IDs
type UserId = string & { readonly brand: unique symbol }
type CourseId = string & { readonly brand: unique symbol }
```

### Naming Conventions

```typescript
// PascalCase for types, interfaces, classes
interface UserProfile {}
class AuthService {}
type PaymentStatus = 'pending' | 'completed' | 'failed'

// camelCase for variables, functions, methods
const currentUser = getCurrentUser()
const isAuthenticated = () => !!user

// UPPER_SNAKE_CASE for constants
const MAX_RETRY_ATTEMPTS = 3
const API_BASE_URL = 'https://api.example.com'

// kebab-case for file names
// user-service.ts, auth-helpers.ts, quiz-components.tsx
```

### Error Handling

```typescript
// Use Result pattern for operations that can fail
type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E }

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const user = await userService.getById(id)
    return { success: true, data: user }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}

// Use custom error types
class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}
```

## React/Next.js Standards

### Component Structure

```typescript
// Functional components with TypeScript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
        },
        {
          'px-2 py-1 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        { 'opacity-50 cursor-not-allowed': disabled }
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Hooks Usage

```typescript
// Custom hooks for reusable logic
function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { user, loading, isAuthenticated: !!user }
}

// Use useCallback for event handlers
const handleSubmit = useCallback(
  async (data: FormData) => {
    setLoading(true)
    try {
      await submitForm(data)
      onSuccess?.()
    } catch (error) {
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  },
  [onSuccess]
)
```

### Server Components (App Router)

```typescript
// Server components for data fetching
async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div>
      <CourseHeader course={course} />
      <CourseContent course={course} />
    </div>
  );
}

// Client components for interactivity
'use client';

function InteractiveQuiz({ quizId }: { quizId: string }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Client-side logic here
  return <div>Quiz interface</div>;
}
```

## API Standards

### API Routes Structure

```typescript
// app/api/courses/[id]/route.ts
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const course = await courseService.getById(params.id)

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    return NextResponse.json({ data: course })
  } catch (error) {
    console.error('Failed to fetch course:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const validatedData = courseUpdateSchema.parse(body)

    const updatedCourse = await courseService.update(params.id, validatedData)

    return NextResponse.json({ data: updatedCourse })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

### Error Response Format

```typescript
interface ApiError {
  error: string
  code?: string
  details?: any
  timestamp: string
}

interface ApiResponse<T> {
  data?: T
  error?: string
  meta?: {
    page?: number
    limit?: number
    total?: number
  }
}
```

## Database Standards

### Supabase Patterns

```typescript
// Use typed clients
const supabase = createClient<Database>(url, key);

// Proper error handling
async function getUserProgress(userId: string): Promise<UserProgress[]> {
  const { data, error } = await supabase
    .from('user_progress')
    .select(`
      *,
      lesson:lessons(title, module:modules(title, course:courses(title)))
    `)
    .eq('user_id', userId)
    .order('last_accessed_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch user progress: ${error.message}`);
  }

  return data || [];
}

// Use RLS policies
-- Enable RLS
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policy for users to access their own data
CREATE POLICY "Users can access own progress" ON user_progress
  FOR ALL USING (auth.uid() = user_id);
```

## Testing Standards

### Unit Tests

```typescript
// Use Jest + Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Integration Tests

```typescript
// API route testing
import { createMocks } from 'node-mocks-http'
import handler from './api/courses/[id]/route'

describe('/api/courses/[id]', () => {
  it('returns course data for valid ID', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: 'course-123' },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.data).toHaveProperty('id', 'course-123')
  })
})
```

## Performance Standards

### Code Splitting

```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

// Route-based code splitting is automatic in Next.js App Router
```

### Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image';

function CourseCard({ course }: { course: Course }) {
  return (
    <div>
      <Image
        src={course.thumbnailUrl}
        alt={course.title}
        width={300}
        height={200}
        className="rounded-lg"
        priority={course.featured}
      />
    </div>
  );
}
```

### Memoization

```typescript
// Use React.memo for components
const ExpensiveComponent = React.memo(function ExpensiveComponent({
  data
}: {
  data: ComplexData
}) {
  const processedData = useMemo(() => {
    return expensiveProcessing(data);
  }, [data]);

  return <div>{processedData}</div>;
});

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return heavyComputation(props.data);
}, [props.data]);
```

## Security Standards

### Input Validation

```typescript
// Use Zod for runtime validation
import { z } from 'zod'

const userRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2).max(100),
  role: z.enum(['student', 'educator']),
})

type UserRegistration = z.infer<typeof userRegistrationSchema>
```

### Environment Variables

```typescript
// Validate environment variables at startup
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_KEY: z.string(),
  OPENAI_API_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
```

## Documentation Standards

### Function Documentation

````typescript
/**
 * Calculates the user's progress through a course.
 *
 * @param userId - The unique identifier for the user
 * @param courseId - The unique identifier for the course
 * @returns Promise that resolves to the progress percentage (0-100)
 *
 * @example
 * ```typescript
 * const progress = await calculateProgress('user-123', 'course-456');
 * console.log(`Progress: ${progress}%`);
 * ```
 */
async function calculateProgress(userId: string, courseId: string): Promise<number> {
  // Implementation
}
````

### README Structure

````markdown
# Component/Module Name

Brief description of what this component/module does.

## Usage

```typescript
import { ComponentName } from './ComponentName';

<ComponentName prop1="value" prop2={value} />
```
````

## Props

| Prop  | Type   | Default | Description          |
| ----- | ------ | ------- | -------------------- |
| prop1 | string | -       | Description of prop1 |
| prop2 | number | 0       | Description of prop2 |

## Examples

Provide practical examples of usage.

```

## Git Standards

### Commit Messages
```

type(scope): description

feat(auth): add password reset functionality
fix(quiz): resolve scoring calculation bug
docs(readme): update installation instructions
style(button): improve hover states
refactor(api): extract common validation logic
test(quiz): add integration tests for scoring
chore(deps): update dependencies

```

### Branch Naming
```

feature/auth-system
bugfix/quiz-scoring-error
hotfix/security-vulnerability
docs/api-documentation
refactor/database-queries

```

## File Organization

### Directory Structure
```

src/
├── app/ # Next.js App Router
│ ├── (auth)/ # Route groups
│ ├── (dashboard)/
│ ├── api/ # API routes
│ └── globals.css
├── components/ # Reusable components
│ ├── ui/ # Base UI components
│ ├── course/ # Domain-specific components
│ └── layout/ # Layout components
├── lib/ # Utilities and configurations
│ ├── supabase/
│ ├── ai/
│ ├── utils/
│ └── validations/
├── types/ # TypeScript type definitions
├── hooks/ # Custom React hooks
└── constants/ # Application constants

```

These standards ensure consistency, maintainability, and quality across the NEET Prep AI Platform codebase.
```
