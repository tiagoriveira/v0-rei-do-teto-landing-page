import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LogOut, Users, TrendingUp, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  customer_type: 'b2c' | 'b2b'
  project: string
  custom_description: string | null
  city: string
  message: string | null
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  created_at: string
}

async function getLeads() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/admin/login')
  }

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.log('[v0] Error fetching leads:', error)
    return []
  }

  return leads as Lead[]
}

async function getStats() {
  const supabase = await createClient()
  
  const { data: leads } = await supabase.from('leads').select('status')
  
  if (!leads) return { total: 0, new: 0, converted: 0, lost: 0 }
  
  return {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    converted: leads.filter(l => l.status === 'converted').length,
    lost: leads.filter(l => l.status === 'lost').length,
  }
}

const statusColors = {
  new: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  contacted: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  qualified: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  converted: 'bg-green-500/10 text-green-600 border-green-500/20',
  lost: 'bg-red-500/10 text-red-500 border-red-500/20',
}

const statusLabels = {
  new: 'Novo',
  contacted: 'Contatado',
  qualified: 'Qualificado',
  converted: 'Convertido',
  lost: 'Perdido',
}

export default async function AdminDashboard() {
  const leads = await getLeads()
  const stats = await getStats()

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">RT</span>
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl">CRM Admin</h1>
              <p className="text-xs text-muted-foreground">Gerenciamento de Leads</p>
            </div>
          </div>
          <form action="/api/auth/signout" method="post">
            <Button variant="outline" size="sm" type="submit">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </form>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.new}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Convertidos</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.converted}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perdidos</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.lost}</div>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Todos os Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left">Data</th>
                    <th className="px-4 py-3 text-left">Nome</th>
                    <th className="px-4 py-3 text-left">Contato</th>
                    <th className="px-4 py-3 text-left">Tipo</th>
                    <th className="px-4 py-3 text-left">Projeto</th>
                    <th className="px-4 py-3 text-left">Cidade</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                        Nenhum lead ainda. Aguardando submissões do formulário.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                          {new Date(lead.created_at).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="px-4 py-3 font-medium">{lead.name}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-1">
                            <a href={`mailto:${lead.email}`} className="text-primary hover:underline text-xs">
                              {lead.email}
                            </a>
                            <a href={`tel:${lead.phone}`} className="text-muted-foreground hover:text-primary text-xs">
                              {lead.phone}
                            </a>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-xs">
                            {lead.customer_type === 'b2c' ? 'Residencial' : 'Empresarial'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 max-w-xs">
                          <div className="text-xs">{lead.project}</div>
                          {lead.custom_description && (
                            <div className="text-xs text-muted-foreground mt-1 truncate">
                              {lead.custom_description}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">{lead.city}</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className={`text-xs ${statusColors[lead.status]}`}>
                            {statusLabels[lead.status]}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Back to site link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-primary hover:underline">
            ← Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  )
}
