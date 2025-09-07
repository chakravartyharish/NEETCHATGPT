/**
 * Global type definitions for the NEET Prep AI application
 */

// User and Authentication types
export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Content and Learning types
export interface Subject {
  id: string
  name: string
  description?: string
  topics: Topic[]
}

export interface Topic {
  id: string
  subject_id: string
  name: string
  description?: string
  difficulty_level: 'easy' | 'medium' | 'hard'
  content_url?: string
}

export interface Question {
  id: string
  topic_id: string
  question_text: string
  options: string[]
  correct_answer: number
  explanation?: string
  difficulty_level: 'easy' | 'medium' | 'hard'
  created_at: string
}

// AI Tutor types
export interface TutorSession {
  id: string
  user_id: string
  topic_id?: string
  messages: TutorMessage[]
  created_at: string
  updated_at: string
}

export interface TutorMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

// Quiz and Assessment types
export interface Quiz {
  id: string
  title: string
  description?: string
  questions: Question[]
  duration_minutes?: number
  passing_score?: number
  created_at: string
}

export interface QuizAttempt {
  id: string
  quiz_id: string
  user_id: string
  answers: Record<string, number>
  score: number
  completed_at: string
}

// Progress Tracking types
export interface UserProgress {
  id: string
  user_id: string
  topic_id: string
  completion_percentage: number
  last_accessed: string
  quiz_scores: number[]
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Component Props types
export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

// Search and Filter types
export interface SearchFilters {
  subject?: string
  topic?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  query?: string
}
