-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  customer_type TEXT NOT NULL CHECK (customer_type IN ('b2c', 'b2b')),
  project TEXT NOT NULL,
  custom_description TEXT,
  city TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all leads
CREATE POLICY "Admin can view all leads" 
  ON public.leads FOR SELECT 
  TO authenticated 
  USING (true);

-- Allow authenticated users to update leads
CREATE POLICY "Admin can update leads" 
  ON public.leads FOR UPDATE 
  TO authenticated 
  USING (true);

-- Allow anyone to insert leads (from contact form)
CREATE POLICY "Anyone can insert leads" 
  ON public.leads FOR INSERT 
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads(status);
