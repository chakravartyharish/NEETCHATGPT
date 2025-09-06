
create extension if not exists vector;
create extension if not exists pgcrypto;

create table if not exists institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

create table if not exists users (
  id uuid primary key,
  tenant_id uuid references institutions(id),
  email text unique,
  full_name text,
  role text default 'student',
  created_at timestamptz default now()
);

create table if not exists profiles (
  user_id uuid primary key references users(id),
  preferences jsonb default '{}'::jsonb,
  student_model jsonb default '{}'::jsonb,
  locale text default 'en-IN'
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references institutions(id),
  title text not null,
  subject text,
  metadata jsonb default '{}'::jsonb
);

create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid,
  title text not null,
  type text default 'article',
  media_url text,
  content jsonb default '{}'::jsonb,
  position int default 0
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid,
  stem text not null,
  type text default 'MCQ',
  choices text[],
  answer_key text,
  solution jsonb,
  topic text,
  difficulty float default 0.5
);

create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid,
  title text not null,
  config jsonb default '{}'::jsonb
);

create table if not exists attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references quizzes(id),
  user_id uuid references users(id),
  responses jsonb,
  score int,
  started_at timestamptz default now(),
  submitted_at timestamptz
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid,
  ref_type text,
  ref_id uuid,
  lang text default 'en',
  topic text,
  text text
);

create table if not exists embeddings (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents(id) on delete cascade,
  embedding vector(1536),
  chunk_id text,
  chunk_index int
);
create index if not exists embeddings_ivfflat on embeddings using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index if not exists documents_topic_lang on documents (topic, lang);

-- Placeholder vector RPC
create or replace function match_documents(query_text text, match_count int default 3)
returns table(id uuid, document_id uuid, text text, topic text, lang text, similarity float)
language sql as $$
  select e.id, d.id as document_id, d.text, d.topic, d.lang, 1.0 as similarity
  from embeddings e
  join documents d on d.id = e.document_id
  limit match_count;
$$;

alter table users enable row level security;
alter table courses enable row level security;
alter table lessons enable row level security;
alter table questions enable row level security;
alter table quizzes enable row level security;
alter table attempts enable row level security;
alter table documents enable row level security;
alter table embeddings enable row level security;

create policy tenant_read_courses on courses for select using (true);
create policy tenant_read_lessons on lessons for select using (true);
create policy tenant_read_questions on questions for select using (true);
create policy tenant_read_documents on documents for select using (true);
create policy tenant_read_embeddings on embeddings for select using (true);
