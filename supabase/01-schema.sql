-- ==========================================================================
-- Trade With Badami — blog database (run ONCE in Supabase > SQL Editor)
-- 1) Change the admin email below to the email you will log in with.
-- 2) Click "Run".
-- ==========================================================================

-- ---- Who is an admin ------------------------------------------------------
create table if not exists public.admins (
  email text primary key
);
alter table public.admins enable row level security;   -- no policies = not readable from the website

insert into public.admins (email)
values ('mskanwal47@gmail.com')                          -- <<< PUT YOUR ADMIN EMAIL HERE
on conflict do nothing;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ---- Posts ----------------------------------------------------------------
create table if not exists public.posts (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title            text not null,
  excerpt          text not null default '',
  content          text not null default '',
  category         text not null default 'strategy',
  cover_url        text,
  meta_description text,
  keywords         text,
  read_minutes     int  not null default 5,
  published        boolean not null default false,
  published_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists posts_published_idx on public.posts (published, published_at desc);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts
for each row execute function public.touch_updated_at();

-- ---- Security (Row Level Security) -----------------------------------------
alter table public.posts enable row level security;

drop policy if exists "public can read published posts" on public.posts;
create policy "public can read published posts" on public.posts
  for select using (published = true and (published_at is null or published_at <= now()));

drop policy if exists "admin can read all posts" on public.posts;
create policy "admin can read all posts" on public.posts
  for select to authenticated using (public.is_admin());

drop policy if exists "admin can insert posts" on public.posts;
create policy "admin can insert posts" on public.posts
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admin can update posts" on public.posts;
create policy "admin can update posts" on public.posts
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin can delete posts" on public.posts;
create policy "admin can delete posts" on public.posts
  for delete to authenticated using (public.is_admin());

-- ---- Image storage (cover images + images inside articles) -----------------
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

drop policy if exists "admin can upload blog images" on storage.objects;
create policy "admin can upload blog images" on storage.objects
  for insert to authenticated with check (bucket_id = 'blog-images' and public.is_admin());

drop policy if exists "admin can update blog images" on storage.objects;
create policy "admin can update blog images" on storage.objects
  for update to authenticated using (bucket_id = 'blog-images' and public.is_admin());

drop policy if exists "admin can delete blog images" on storage.objects;
create policy "admin can delete blog images" on storage.objects
  for delete to authenticated using (bucket_id = 'blog-images' and public.is_admin());

drop policy if exists "anyone can view blog images" on storage.objects;
create policy "anyone can view blog images" on storage.objects
  for select using (bucket_id = 'blog-images');
