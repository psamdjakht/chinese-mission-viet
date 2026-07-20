-- Chạy trong Supabase SQL Editor một lần cho mỗi dự án.
create table if not exists public.learner_backups (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.learner_backups enable row level security;
drop policy if exists "Users can view own backup" on public.learner_backups;
create policy "Users can view own backup" on public.learner_backups for select using (auth.uid() = user_id);
drop policy if exists "Users can insert own backup" on public.learner_backups;
create policy "Users can insert own backup" on public.learner_backups for insert with check (auth.uid() = user_id);
drop policy if exists "Users can update own backup" on public.learner_backups;
create policy "Users can update own backup" on public.learner_backups for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
