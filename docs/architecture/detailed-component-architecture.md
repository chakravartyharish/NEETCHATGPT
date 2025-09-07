# Detailed Component Architecture

## Frontend Architecture

### Component Structure

```
app/
├── (auth)/                 # Auth route group
│   ├── login/
│   └── register/
├── (dashboard)/           # Authenticated routes
│   ├── courses/
│   ├── quiz/
│   └── tutor/
├── api/                   # API routes
│   ├── auth/
│   ├── content/
│   ├── quiz/
│   └── ai/
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── course/           # Course-specific components
│   ├── quiz/             # Quiz components
│   └── tutor/            # AI tutor components
└── lib/                  # Utilities and configurations
    ├── supabase/
    ├── ai/
    └── utils/
```

### PWA Implementation

```typescript
// Service Worker Strategy
const strategies = {
  // Critical resources - Cache First
  static: new CacheFirst({
    cacheName: 'static-resources',
    plugins: [new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 })],
  }),

  // API responses - Network First with fallback
  api: new NetworkFirst({
    cacheName: 'api-responses',
    networkTimeoutSeconds: 3,
    plugins: [new BackgroundSyncPlugin('api-sync')],
  }),

  // Content - Stale While Revalidate
  content: new StaleWhileRevalidate({
    cacheName: 'content-cache',
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  }),
}
```

### State Management

```typescript
// Zustand store structure
interface AppState {
  user: User | null
  course: CourseState
  quiz: QuizState
  tutor: TutorState
  offline: OfflineState
}

// React Query for server state
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        if (error?.status === 404) return false
        return failureCount < 3
      },
    },
  },
})
```

## Backend Architecture

### Database Schema Design

```sql
-- Users and Authentication
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'student',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Content Hierarchy
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB, -- Rich content structure
  content_type lesson_type DEFAULT 'text',
  duration_minutes INTEGER,
  order_index INTEGER NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz System
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  instructions TEXT,
  time_limit_minutes INTEGER,
  passing_score INTEGER DEFAULT 70,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type question_type DEFAULT 'multiple_choice',
  options JSONB, -- Array of answer options
  correct_answers JSONB, -- Array of correct option indices
  explanation TEXT,
  points INTEGER DEFAULT 1,
  order_index INTEGER NOT NULL
);

-- Vector Embeddings for RAG
CREATE TABLE content_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID, -- References various content types
  content_type TEXT NOT NULL, -- 'lesson', 'quiz', 'explanation'
  content_text TEXT NOT NULL,
  embedding vector(1536), -- OpenAI embedding dimension
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Progress and Analytics
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  status progress_status DEFAULT 'not_started',
  completion_percentage INTEGER DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  answers JSONB NOT NULL, -- User's answer data
  time_taken_seconds INTEGER,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP DEFAULT NOW()
);
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Example policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Students can view published courses" ON courses
  FOR SELECT USING (
    is_published = true OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('educator', 'admin')
    )
  );

CREATE POLICY "Users can manage their own progress" ON user_progress
  FOR ALL USING (auth.uid() = user_id);
```

### API Design

```typescript
// RESTful API structure
/api/
├── auth/
│   ├── login          # POST - User authentication
│   ├── register       # POST - User registration
│   └── refresh        # POST - Token refresh
├── courses/
│   ├── [id]           # GET - Course details
│   ├── [id]/modules   # GET - Course modules
│   └── search         # GET - Course search
├── lessons/
│   ├── [id]           # GET - Lesson content
│   └── [id]/progress  # PUT - Update progress
├── quiz/
│   ├── [id]           # GET - Quiz details
│   ├── [id]/attempt   # POST - Submit quiz attempt
│   └── [id]/results   # GET - Quiz results
└── ai/
    ├── tutor          # POST - AI tutor interaction
    └── embeddings     # POST - Generate embeddings
```

## AI/ML Architecture

### RAG (Retrieval Augmented Generation) System

```typescript
// RAG Pipeline Implementation
class RAGEngine {
  private vectorStore: VectorStore
  private embeddings: OpenAIEmbeddings
  private llm: ChatOpenAI

  async generateResponse(query: string, userId: string): Promise<string> {
    // 1. Generate query embedding
    const queryEmbedding = await this.embeddings.embedQuery(query)

    // 2. Similarity search
    const relevantDocs = await this.vectorStore.similaritySearch(queryEmbedding, {
      k: 5,
      filter: { userId },
    })

    // 3. Context assembly
    const context = this.assembleContext(relevantDocs, userId)

    // 4. Prompt engineering
    const prompt = this.createPrompt(query, context)

    // 5. LLM generation
    const response = await this.llm.call(prompt)

    return response.content
  }

  private assembleContext(docs: Document[], userId: string): string {
    // Assemble relevant context from retrieved documents
    // Include user's learning progress and preferences
    return docs.map(doc => doc.pageContent).join('\n\n')
  }
}
```

### Content Ingestion Pipeline

```typescript
// Automated content processing
class ContentProcessor {
  async ingestContent(content: LessonContent): Promise<void> {
    // 1. Text extraction
    const textChunks = await this.chunkText(content.text)

    // 2. Generate embeddings
    const embeddings = await Promise.all(textChunks.map(chunk => this.generateEmbedding(chunk)))

    // 3. Store in vector database
    await this.storeEmbeddings(content.id, textChunks, embeddings)

    // 4. Update search index
    await this.updateSearchIndex(content)
  }

  private async chunkText(text: string): Promise<string[]> {
    // Intelligent chunking preserving context
    // Consider sentence boundaries, headings, etc.
    const chunks = []
    const sentences = text.split(/[.!?]+/)

    let currentChunk = ''
    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > 1000) {
        chunks.push(currentChunk.trim())
        currentChunk = sentence
      } else {
        currentChunk += sentence + '. '
      }
    }

    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim())
    }

    return chunks
  }
}
```
