# Rei do Teto - Setup Instructions

## Database Setup (Supabase)

Run the following SQL in your Supabase SQL Editor:

```sql
-- Create leads table
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
  status text default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'archived')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.leads enable row level security;

-- Allow anyone to insert (for the public form)
create policy "Anyone can submit leads"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- Only authenticated users can view/update leads (for admin)
create policy "Authenticated users can view leads"
  on public.leads for select
  to authenticated
  using (true);

create policy "Authenticated users can update leads"
  on public.leads for update
  to authenticated
  using (true);

-- Create index for performance
create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_status_idx on public.leads(status);
```

## Admin User Setup

1. Go to your Supabase Dashboard
2. Navigate to Authentication > Users
3. Click "Add User" (or sign up manually)
4. Use these credentials:
   - Email: admin@reidoteto.com.br
   - Password: (your secure password)
5. This user can now login at `/admin/login`

## Environment Variables

Make sure the following are set in your Vercel project (they should be auto-populated from Supabase integration):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Access Points

- **Landing Page**: `/` (public)
- **Admin Login**: `/admin/login`
- **CRM Dashboard**: `/admin/dashboard` (requires login)

## Features

### Landing Page
- Modern, bold design with real service images
- Intelligent quote form with conditional fields
- Direct Supabase integration for lead capture
- Mobile-responsive design

### CRM Dashboard
- View all leads with filtering by status
- Sort by date, name, or status
- Update lead status (New, Contacted, Qualified, Converted, Archived)
- Real-time updates
- Export capabilities (future enhancement)

## Notes

- The form on the landing page is fully functional and saves directly to Supabase
- The admin area is protected with Supabase authentication
- All contact links (phone, email, WhatsApp) are clickable
