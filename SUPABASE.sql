-- Run once in Supabase → SQL Editor.
--
-- One row per client, with the record itself in a jsonb column. That keeps the
-- schema stable while the shape of a client record is still moving; when call
-- telemetry arrives it gets its own proper table rather than being stuffed in
-- here.

create table if not exists public.clients (
  slug        text primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

-- Only the service role key reaches this table, and that key never leaves the
-- server. RLS on with no policies means anon/public keys can read nothing.
alter table public.clients enable row level security;

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists clients_touch_updated_at on public.clients;
create trigger clients_touch_updated_at
  before update on public.clients
  for each row execute function public.touch_updated_at();
