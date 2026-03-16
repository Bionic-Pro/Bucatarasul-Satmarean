-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
-- Stores user information linked to auth.users
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  preferences jsonb default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- 2. RECIPES TABLE
-- Stores saved recipes
create table public.recipes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  description text,
  image_url text, -- We can store the base64 or a storage URL here. Note: Base64 strings can be large.
  recipe_data jsonb not null, -- Stores the full recipe object structure
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Recipes
alter table public.recipes enable row level security;

create policy "Users can view their own recipes."
  on public.recipes for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own recipes."
  on public.recipes for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own recipes."
  on public.recipes for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own recipes."
  on public.recipes for delete
  using ( auth.uid() = user_id );

-- 3. AUTOMATION
-- Function to handle new user signup automatically
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on auth.users insert
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();