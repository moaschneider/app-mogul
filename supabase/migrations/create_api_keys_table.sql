-- Create the api_keys table
create table if not exists api_keys (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  key text not null unique,
  type text default 'dev',
  usage integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create an index on the key column for faster lookups
create index if not exists api_keys_key_idx on api_keys(key);

-- Enable Row Level Security (RLS)
alter table api_keys enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Enable all operations for all users" on api_keys;
drop policy if exists "Allow select for authenticated users" on api_keys;
drop policy if exists "Allow insert for authenticated users" on api_keys;
drop policy if exists "Allow update for authenticated users" on api_keys;
drop policy if exists "Allow delete for authenticated users" on api_keys;

-- Create a policy that allows all operations for all users (including anonymous)
-- This is a simplified approach for demo purposes
create policy "Enable all operations for all users" on api_keys
  for all
  using (true)
  with check (true); 