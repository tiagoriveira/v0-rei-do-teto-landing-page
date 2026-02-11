-- Create leads table to store form submissions from landing page
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  customer_type text not null check (customer_type in ('b2c', 'b2b')),
  project text not null,
  custom_description text,
  city text not null,
  message text,
  status text default 'new' check (status in ('new', 'contacted', 'qualified', 'closed', 'lost')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.leads enable row level security;

-- Allow anonymous inserts (for the public form)
create policy "leads_insert_anon" on public.leads
  for insert
  to anon
  with check (true);

-- Allow authenticated users to view all leads (for admin dashboard)
create policy "leads_select_auth" on public.leads
  for select
  to authenticated
  using (true);

-- Allow authenticated users to update leads (for admin dashboard)
create policy "leads_update_auth" on public.leads
  for update
  to authenticated
  using (true)
  with check (true);

-- Create index for better query performance
create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_status_idx on public.leads(status);
