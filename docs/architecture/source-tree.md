# Source Tree Structure

## Project Root

```
neet-prep-ai-phase1/
├── README.md                 # Project overview and setup instructions
├── package.json             # Dependencies and scripts
├── pnpm-lock.yaml          # Lock file for reproducible builds
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── postcss.config.js       # PostCSS configuration
├── middleware.ts           # Next.js middleware for auth/routing
├── next-env.d.ts          # Next.js TypeScript definitions
├── .env.example           # Environment variables template
├── .env.local             # Local environment variables (gitignored)
├── .gitignore             # Git ignore rules
├── .bmad-core/            # BMAD Method configuration
├── .ai/                   # AI development logs
├── .vscode/               # VS Code workspace settings
└── node_modules/          # Dependencies (gitignored)
```

## Application Structure (app/)

```
app/
├── layout.tsx             # Root layout component
├── page.tsx               # Landing page
├── globals.css            # Global styles
├── loading.tsx            # Global loading component
├── error.tsx              # Global error boundary
├── not-found.tsx          # 404 page
├── favicon.ico            # Favicon
│
├── (auth)/                # Authentication route group
│   ├── layout.tsx         # Auth layout (centered, minimal)
│   ├── login/
│   │   └── page.tsx       # Login form
│   ├── register/
│   │   └── page.tsx       # Registration form
│   └── reset-password/
│       └── page.tsx       # Password reset form
│
├── (dashboard)/           # Protected dashboard routes
│   ├── layout.tsx         # Dashboard layout (sidebar, nav)
│   ├── page.tsx           # Dashboard home
│   ├── courses/
│   │   ├── page.tsx       # Course catalog
│   │   ├── [id]/
│   │   │   ├── page.tsx   # Course details
│   │   │   └── modules/
│   │   │       └── [moduleId]/
│   │   │           ├── page.tsx         # Module overview
│   │   │           └── lessons/
│   │   │               └── [lessonId]/
│   │   │                   └── page.tsx  # Lesson content
│   │   └── search/
│   │       └── page.tsx   # Course search results
│   ├── quiz/
│   │   ├── page.tsx       # Quiz dashboard
│   │   ├── [id]/
│   │   │   ├── page.tsx   # Quiz attempt
│   │   │   └── results/
│   │   │       └── page.tsx # Quiz results
│   │   └── history/
│   │       └── page.tsx   # Quiz attempt history
│   ├── tutor/
│   │   └── page.tsx       # AI tutor chat interface
│   ├── progress/
│   │   └── page.tsx       # Learning progress tracking
│   └── profile/
│       └── page.tsx       # User profile settings
│
└── api/                   # API routes
    ├── auth/
    │   ├── login/
    │   │   └── route.ts   # POST /api/auth/login
    │   ├── register/
    │   │   └── route.ts   # POST /api/auth/register
    │   ├── logout/
    │   │   └── route.ts   # POST /api/auth/logout
    │   └── refresh/
    │       └── route.ts   # POST /api/auth/refresh
    ├── courses/
    │   ├── route.ts       # GET /api/courses (list courses)
    │   ├── [id]/
    │   │   ├── route.ts   # GET /api/courses/[id]
    │   │   ├── modules/
    │   │   │   └── route.ts # GET /api/courses/[id]/modules
    │   │   └── progress/
    │   │       └── route.ts # GET/PUT /api/courses/[id]/progress
    │   └── search/
    │       └── route.ts   # GET /api/courses/search
    ├── lessons/
    │   ├── [id]/
    │   │   ├── route.ts   # GET /api/lessons/[id]
    │   │   └── progress/
    │   │       └── route.ts # PUT /api/lessons/[id]/progress
    │   └── content/
    │       └── [id]/
    │           └── route.ts # GET /api/lessons/content/[id]
    ├── quiz/
    │   ├── [id]/
    │   │   ├── route.ts   # GET /api/quiz/[id]
    │   │   ├── attempt/
    │   │   │   └── route.ts # POST /api/quiz/[id]/attempt
    │   │   └── results/
    │   │       └── route.ts # GET /api/quiz/[id]/results
    │   └── attempts/
    │       └── route.ts   # GET /api/quiz/attempts (user history)
    ├── ai/
    │   ├── tutor/
    │   │   └── route.ts   # POST /api/ai/tutor (chat completion)
    │   ├── embeddings/
    │   │   └── route.ts   # POST /api/ai/embeddings (generate)
    │   └── search/
    │       └── route.ts   # POST /api/ai/search (semantic search)
    ├── user/
    │   ├── profile/
    │   │   └── route.ts   # GET/PUT /api/user/profile
    │   └── progress/
    │       └── route.ts   # GET /api/user/progress
    ├── admin/
    │   ├── courses/
    │   │   └── route.ts   # Admin course management
    │   ├── users/
    │   │   └── route.ts   # Admin user management
    │   └── analytics/
    │       └── route.ts   # Admin analytics
    └── health/
        └── route.ts       # Health check endpoint
```

## Components Structure

```
components/
├── ui/                    # Base UI components (shadcn/ui style)
│   ├── button.tsx         # Reusable button component
│   ├── input.tsx          # Form input component
│   ├── card.tsx           # Card container component
│   ├── badge.tsx          # Badge/tag component
│   ├── avatar.tsx         # User avatar component
│   ├── dialog.tsx         # Modal dialog component
│   ├── dropdown-menu.tsx  # Dropdown menu component
│   ├── tabs.tsx           # Tab navigation component
│   ├── progress.tsx       # Progress bar component
│   ├── skeleton.tsx       # Loading skeleton component
│   ├── toast.tsx          # Toast notification component
│   └── index.ts           # Re-export all UI components
│
├── layout/                # Layout-specific components
│   ├── header.tsx         # Main navigation header
│   ├── sidebar.tsx        # Dashboard sidebar navigation
│   ├── footer.tsx         # Footer component
│   ├── breadcrumb.tsx     # Breadcrumb navigation
│   └── mobile-nav.tsx     # Mobile navigation component
│
├── auth/                  # Authentication components
│   ├── login-form.tsx     # Login form component
│   ├── register-form.tsx  # Registration form component
│   ├── reset-form.tsx     # Password reset form
│   ├── auth-guard.tsx     # Route protection component
│   └── social-login.tsx   # Social login buttons
│
├── course/                # Course-related components
│   ├── course-card.tsx    # Course preview card
│   ├── course-grid.tsx    # Course grid layout
│   ├── course-list.tsx    # Course list layout
│   ├── course-header.tsx  # Course detail header
│   ├── module-list.tsx    # Course modules list
│   ├── lesson-content.tsx # Lesson content renderer
│   ├── lesson-video.tsx   # Video lesson player
│   ├── lesson-nav.tsx     # Lesson navigation
│   └── progress-tracker.tsx # Course progress component
│
├── quiz/                  # Quiz-related components
│   ├── quiz-card.tsx      # Quiz preview card
│   ├── quiz-question.tsx  # Individual question component
│   ├── quiz-timer.tsx     # Quiz countdown timer
│   ├── quiz-results.tsx   # Results display component
│   ├── answer-choice.tsx  # Multiple choice option
│   ├── quiz-progress.tsx  # Quiz progress indicator
│   └── quiz-summary.tsx   # Quiz attempt summary
│
├── tutor/                 # AI tutor components
│   ├── chat-interface.tsx # Main chat interface
│   ├── message-bubble.tsx # Individual chat message
│   ├── typing-indicator.tsx # AI typing animation
│   ├── chat-input.tsx     # Message input component
│   ├── conversation-history.tsx # Chat history
│   └── suggested-questions.tsx # Quick question buttons
│
├── profile/               # User profile components
│   ├── profile-header.tsx # Profile header with avatar
│   ├── profile-stats.tsx  # Learning statistics
│   ├── achievement-grid.tsx # Achievements display
│   ├── settings-form.tsx  # Profile settings form
│   └── preferences.tsx    # User preferences
│
├── search/                # Search-related components
│   ├── search-bar.tsx     # Main search input
│   ├── search-filters.tsx # Filter options
│   ├── search-results.tsx # Results display
│   └── search-suggestions.tsx # Search autocomplete
│
├── common/                # Common utility components
│   ├── loading-spinner.tsx # Loading indicator
│   ├── error-boundary.tsx # Error boundary wrapper
│   ├── empty-state.tsx    # Empty state placeholder
│   ├── confirmation-dialog.tsx # Confirmation modal
│   ├── date-picker.tsx    # Date selection component
│   └── file-upload.tsx    # File upload component
│
└── providers/             # Context providers
    ├── auth-provider.tsx  # Authentication context
    ├── theme-provider.tsx # Theme/dark mode context
    ├── query-provider.tsx # React Query provider
    └── toast-provider.tsx # Toast notification provider
```

## Library Structure (lib/)

```
lib/
├── supabase/              # Supabase integration
│   ├── client.ts          # Client-side Supabase client
│   ├── server.ts          # Server-side Supabase client
│   ├── auth.ts            # Authentication helpers
│   ├── database.ts        # Database query helpers
│   ├── storage.ts         # File storage helpers
│   └── types.ts           # Database type definitions
│
├── ai/                    # AI/ML utilities
│   ├── openai.ts          # OpenAI client configuration
│   ├── embeddings.ts      # Embedding generation utilities
│   ├── rag.ts             # RAG implementation
│   ├── prompts.ts         # AI prompt templates
│   └── chat.ts            # Chat completion utilities
│
├── utils/                 # General utilities
│   ├── cn.ts              # Class name utility (clsx + tailwind-merge)
│   ├── date.ts            # Date formatting utilities
│   ├── format.ts          # Text formatting utilities
│   ├── validation.ts      # Validation helpers
│   ├── api.ts             # API client utilities
│   ├── cache.ts           # Caching utilities
│   └── constants.ts       # Application constants
│
├── hooks/                 # Custom React hooks
│   ├── use-auth.ts        # Authentication hook
│   ├── use-local-storage.ts # Local storage hook
│   ├── use-debounce.ts    # Debouncing hook
│   ├── use-online.ts      # Network status hook
│   ├── use-progress.ts    # Progress tracking hook
│   └── use-chat.ts        # AI chat hook
│
├── stores/                # Zustand stores
│   ├── auth-store.ts      # Authentication state
│   ├── course-store.ts    # Course-related state
│   ├── quiz-store.ts      # Quiz state management
│   ├── chat-store.ts      # Chat conversation state
│   └── offline-store.ts   # Offline sync state
│
└── validations/           # Zod validation schemas
    ├── auth.ts            # Authentication schemas
    ├── course.ts          # Course-related schemas
    ├── quiz.ts            # Quiz validation schemas
    ├── user.ts            # User profile schemas
    └── api.ts             # API request/response schemas
```

## Content & Documentation

```
content/                   # Sample/seed content
├── courses/
│   ├── biology/
│   │   ├── cell-biology.md
│   │   ├── genetics.md
│   │   └── ecology.md
│   ├── chemistry/
│   │   ├── organic-chemistry.md
│   │   ├── inorganic-chemistry.md
│   │   └── physical-chemistry.md
│   └── physics/
│       ├── mechanics.md
│       ├── thermodynamics.md
│       └── electromagnetism.md
└── biology_krebs_cycle.md # Example content

docs/                      # BMAD documentation
├── README_phase1.md       # Phase 1 overview
├── prd.md                 # Product Requirements (full)
├── architecture.md        # Architecture document (full)
├── planning-phase1.md     # Project planning
├── tasklists-phase1.md    # Task breakdowns
├── mermaid-phase1-bmad.md # BMAD diagrams
├── prd/                   # Sharded PRD documents
│   ├── index.md
│   ├── executive-summary.md
│   ├── problem-statement.md
│   ├── target-users-personas.md
│   ├── product-vision-goals.md
│   ├── product-scope.md
│   ├── functional-requirements.md
│   ├── non-functional-requirements.md
│   ├── user-stories-epics.md
│   ├── success-metrics.md
│   ├── technical-architecture-overview.md
│   ├── risk-assessment.md
│   ├── dependencies.md
│   ├── timeline-milestones.md
│   └── appendices.md
├── architecture/          # Sharded architecture documents
│   ├── index.md
│   ├── architecture-overview.md
│   ├── system-context-goals.md
│   ├── high-level-architecture.md
│   ├── technology-stack.md
│   ├── detailed-component-architecture.md
│   ├── security-architecture.md
│   ├── performance-architecture.md
│   ├── deployment-architecture.md
│   ├── monitoring-observability.md
│   ├── scalability-considerations.md
│   ├── integration-architecture.md
│   ├── future-architecture-considerations.md
│   ├── architecture-decision-records-adrs.md
│   ├── conclusion.md
│   ├── coding-standards.md
│   ├── tech-stack.md
│   └── source-tree.md
├── stories/               # User stories (BMAD format)
├── qa/                    # Quality assurance
│   ├── assessments/       # QA assessments
│   └── gates/             # Quality gates
└── epics/                 # Epic breakdowns
```

## Scripts & Automation

```
scripts/
├── ingest.ts              # Content ingestion for RAG
├── seed-db.ts             # Database seeding script
├── migrate.ts             # Database migration runner
├── build.sh               # Build automation script
├── deploy.sh              # Deployment script
└── test.sh                # Test runner script
```

## Supabase Configuration

```
supabase/
├── config.toml            # Supabase project configuration
├── migrations/            # Database migrations
│   ├── 0001_init.sql      # Initial schema setup
│   ├── 0002_auth_setup.sql # Authentication tables
│   ├── 0003_courses.sql   # Course-related tables
│   ├── 0004_quiz.sql      # Quiz system tables
│   ├── 0005_embeddings.sql # Vector embeddings tables
│   └── 0006_rls.sql       # Row Level Security policies
├── functions/             # Edge functions
│   ├── send-email/
│   │   └── index.ts       # Email sending function
│   ├── process-content/
│   │   └── index.ts       # Content processing function
│   └── analytics/
│       └── index.ts       # Analytics collection function
└── seed.sql               # Seed data for development
```

## Static Assets

```
public/
├── manifest.json          # PWA manifest
├── sw.js                  # Service worker
├── tw.css                 # Generated Tailwind CSS
├── icons/                 # PWA icons
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── apple-touch-icon.png
├── images/                # Static images
│   ├── logo.svg
│   ├── hero-bg.jpg
│   └── placeholder.png
└── fonts/                 # Custom fonts (if any)
    └── inter-var.woff2
```

## Configuration Files

```
styles/
└── globals.css            # Global CSS with Tailwind directives

.bmad-core/                # BMAD Method framework
├── agents/                # AI agents for development
├── templates/             # Document templates
├── tasks/                 # Reusable task definitions
├── workflows/             # Development workflows
├── data/                  # Knowledge base and preferences
├── core-config.yaml       # BMAD configuration
└── user-guide.md          # BMAD usage guide

.ai/                       # AI development assistance
└── debug-log.md           # Development debug log

.vscode/                   # VS Code configuration
├── settings.json          # Workspace settings
├── extensions.json        # Recommended extensions
└── launch.json            # Debug configuration
```

## Key File Purposes

### Core Application Files

- **middleware.ts**: Authentication and routing middleware
- **next.config.js**: Next.js build and runtime configuration
- **tailwind.config.ts**: Design system and utility classes
- **tsconfig.json**: TypeScript compiler configuration

### Database Integration

- **lib/supabase/**: All Supabase-related code and configurations
- **supabase/migrations/**: Database schema evolution
- **lib/validations/**: Runtime type validation with Zod

### AI Integration

- **lib/ai/**: AI/ML utilities and RAG implementation
- **app/api/ai/**: AI-related API endpoints
- **components/tutor/**: AI tutor user interface

### PWA Implementation

- **public/sw.js**: Service worker for offline functionality
- **public/manifest.json**: PWA configuration
- **lib/hooks/use-online.ts**: Network status detection

## Development Workflow Files

- **.bmad-core/**: BMAD Method framework for structured development
- **docs/**: Comprehensive project documentation
- **scripts/**: Automation and utility scripts
- **.vscode/**: IDE configuration for team consistency

This source tree structure provides a clear separation of concerns, makes it easy to locate specific functionality, and supports the scalable growth of the NEET Prep AI Platform.
