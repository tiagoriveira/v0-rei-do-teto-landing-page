# Rei do Teto - Landing Page & CRM

Professional landing page for Rei do Teto construction company with integrated CRM system.

## 🚀 Features

### Landing Page
- **Modern Design**: Bold, asymmetric layout with professional aesthetics
- **Real Service Images**: 8 service categories with high-quality images
- **Intelligent Form**: Conditional fields based on customer type (B2C/B2B)
- **Direct Integration**: Form submissions save directly to Supabase
- **Fully Responsive**: Mobile-first design with smooth animations
- **Interactive Contact**: All contact info (phone, email, WhatsApp) are clickable links

### CRM Dashboard
- **Lead Management**: View and manage all form submissions
- **Status Tracking**: Update lead status (New, Contacted, Qualified, Converted, Archived)
- **Filtering & Sorting**: Filter by status, sort by date/name
- **Secure Access**: Password-protected admin area with Supabase Auth
- **Real-time Updates**: Instant data refresh

## 📋 Setup Steps

### 1. Database Setup
Go to your Supabase SQL Editor and run the SQL commands in `SETUP_INSTRUCTIONS.md`

### 2. Create Admin User
In Supabase Dashboard:
- Go to Authentication > Users
- Click "Add User"
- Email: `admin@reidoteto.com.br` (or your preferred email)
- Create a secure password
- Save the credentials

### 3. Access the Application

**Landing Page**: `https://your-domain.com/`
**Admin Login**: `https://your-domain.com/admin/login`
**CRM Dashboard**: `https://your-domain.com/admin/dashboard`

## 🎨 Design System

**Colors:**
- Primary (Gold): `#F9A825`
- Secondary (Purple): `#6A1B9A`
- Dark: `#121212`

**Typography:**
- Headings: Poppins (bold, modern)
- Body: Inter (clean, readable)

## 📱 Pages

- `/` - Landing page with quote form
- `/admin/login` - Admin authentication
- `/admin/dashboard` - CRM lead management

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Anonymous users can only insert leads (public form)
- Only authenticated users can view/manage leads
- Password-protected admin area

## 📊 Lead Statuses

- **New**: Just submitted
- **Contacted**: Initial contact made
- **Qualified**: Interested and qualified
- **Converted**: Became a customer
- **Archived**: Not pursuing

## 🛠️ Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth + Database)
- shadcn/ui components

## 📞 Contact Information

Update the contact details in `app/page.tsx`:
- Phone: `(27) 99636-9622`
- Email: `contato@reidoteto.com.br`
- WhatsApp: `https://wa.me/5527996369622`

---

Built with modern web technologies for optimal performance and user experience.
