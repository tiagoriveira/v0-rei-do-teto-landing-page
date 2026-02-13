'use client'

import { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { createClient } from '@/lib/supabase/client'
import {
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Search,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  MapPin,
  AlertCircle,
  Filter,
  Menu,
  X,
  Home,
  LayoutDashboard,
  RefreshCw
} from 'lucide-react'

type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'

type Lead = {
  id: string
  name: string
  email: string
  phone: string
  customer_type: 'b2c' | 'b2b'
  project: string
  custom_description: string | null
  city: string
  message: string | null
  status: LeadStatus
  created_at: string
  updated_at: string
  priority?: 'alta' | 'media' | 'baixa'
  notes?: string
}

const getStatusLabel = (status: LeadStatus) => {
  const labels = {
    new: 'Novo',
    contacted: 'Contatado',
    qualified: 'Qualificado',
    converted: 'Convertido',
    lost: 'Perdido',
  }
  return labels[status] || status
}

const getStatusColor = (status: LeadStatus) => {
  const colors = {
    new: 'bg-blue-500 hover:bg-blue-600',
    contacted: 'bg-yellow-500 hover:bg-yellow-600',
    qualified: 'bg-purple-500 hover:bg-purple-600',
    converted: 'bg-green-500 hover:bg-green-600',
    lost: 'bg-gray-500 hover:bg-gray-600',
  }
  return colors[status] || 'bg-gray-500'
}

const getPriorityColor = (daysOld: number) => {
  if (daysOld === 0) return 'text-red-600'
  if (daysOld <= 2) return 'text-orange-600'
  return 'text-gray-600'
}

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<LeadStatus | 'todos'>('todos')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filterPriority, setFilterPriority] = useState('todos')

  const supabase = createClient()

  // Fetch leads from Supabase
  const fetchLeads = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.log('[v0] Error fetching leads:', error)
    } else {
      setLeads(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = leads.length
    const novos = leads.filter((l) => l.status === 'new').length
    const emAndamento = leads.filter((l) =>
      ['contacted', 'qualified'].includes(l.status)
    ).length
    const convertidos = leads.filter((l) => l.status === 'converted').length
    const taxaConversao = total > 0 ? ((convertidos / total) * 100).toFixed(1) : '0'

    return { total, novos, emAndamento, convertidos, taxaConversao }
  }, [leads])

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery) ||
        lead.city.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = filterStatus === 'todos' || lead.status === filterStatus

      return matchesSearch && matchesStatus
    })
  }, [leads, searchQuery, filterStatus])

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', leadId)

    if (error) {
      console.log('[v0] Error updating lead:', error)
      alert('Erro ao atualizar status. Tente novamente.')
    } else {
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId
            ? { ...lead, status: newStatus, updated_at: new Date().toISOString() }
            : lead
        )
      )
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getWhatsAppLink = (lead: Lead) => {
    const cleanPhone = lead.phone.replace(/\D/g, '')
    const message = encodeURIComponent(
      `Olá ${lead.name}!\n\nAqui é da Rei do Teto. Recebi seu interesse no projeto de *${lead.project}* em *${lead.city}*.\n\nGostaria de agendar uma visita técnica gratuita?`
    )
    return `https://wa.me/55${cleanPhone}?text=${message}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">RT</span>
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg">Rei do Teto</h2>
                <p className="text-xs text-muted-foreground">CRM</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-2">
            <Button
              variant="default"
              className="w-full justify-start bg-primary/10 text-primary hover:bg-primary/20"
            >
              <LayoutDashboard className="mr-3 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <a href="/">
                <Home className="mr-3 h-4 w-4" />
                Voltar ao Site
              </a>
            </Button>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Dados Mock</p>
            <p>Os leads exibidos são exemplos para demonstração</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-heading font-bold text-xl">Dashboard de Leads</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Gerencie seus contatos da landing page
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Última atualização: Agora</span>
              </div>
            </div>
          </div>
        </header>

        {/* Metrics Cards */}
        <div className="p-4 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Leads
                </CardTitle>
                <Users className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.total}</div>
                <p className="text-xs text-muted-foreground mt-1">Todos os contatos</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Novos Leads
                </CardTitle>
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{metrics.novos}</div>
                <p className="text-xs text-muted-foreground mt-1">Aguardando contato</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-yellow-500/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Em Andamento
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">
                  {metrics.emAndamento}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Em negociação
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-500/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Taxa de Conversão
                </CardTitle>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {metrics.taxaConversao}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.convertidos} convertidos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, email, telefone ou cidade..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as LeadStatus | 'todos')}>
                    <SelectTrigger className="w-full lg:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Status</SelectItem>
                      <SelectItem value="novo">Novo</SelectItem>
                      <SelectItem value="contatado">Contatado</SelectItem>
                      <SelectItem value="qualificado">Qualificado</SelectItem>
                      <SelectItem value="proposta">Proposta</SelectItem>
                      <SelectItem value="convertido">Convertido</SelectItem>
                      <SelectItem value="arquivado">Arquivado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="w-full lg:w-[160px]">
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Exibindo {filteredLeads.length} de {leads.length} leads</span>
              </div>
            </CardContent>
          </Card>

          {/* Leads List - Desktop Table */}
          <Card className="hidden lg:block">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left p-4 text-sm font-semibold">Lead</th>
                      <th className="text-left p-4 text-sm font-semibold">Contato</th>
                      <th className="text-left p-4 text-sm font-semibold">Projeto</th>
                      <th className="text-left p-4 text-sm font-semibold">Status</th>
                      <th className="text-left p-4 text-sm font-semibold">Prioridade</th>
                      <th className="text-left p-4 text-sm font-semibold">Data</th>
                      <th className="text-left p-4 text-sm font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{lead.name}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {lead.city}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <p className="text-sm">{lead.phone}</p>
                            <p className="text-xs text-muted-foreground">{lead.email}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <Badge variant="outline" className="mb-1">
                              {lead.customer_type === 'b2c' ? 'Residencial' : 'Comercial'}
                            </Badge>
                            <p className="text-sm">{lead.project}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Select
                            value={lead.status}
                            onValueChange={(v) => handleStatusChange(lead.id, v as LeadStatus)}
                          >
                            <SelectTrigger className="w-[140px]" onClick={(e) => e.stopPropagation()}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="novo">Novo</SelectItem>
                              <SelectItem value="contatado">Contatado</SelectItem>
                              <SelectItem value="qualificado">Qualificado</SelectItem>
                              <SelectItem value="proposta">Proposta</SelectItem>
                              <SelectItem value="convertido">Convertido</SelectItem>
                              <SelectItem value="arquivado">Arquivado</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-4">
                          <div className={`flex items-center gap-1 ${getPriorityColor(lead.priority || 'media')}`}>
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm font-medium capitalize">{lead.priority || 'média'}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                          </div>
                        </td>
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              asChild
                            >
                              <a href={`tel:${lead.phone}`}>
                                <Phone className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              asChild
                            >
                              <a href={getWhatsAppLink(lead)} target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Leads List - Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {filteredLeads.map((lead) => (
              <Card
                key={lead.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedLead(lead)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{lead.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        {lead.city}
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 ${getPriorityColor(lead.priority || 'media')}`}>
                      <AlertCircle className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <Badge variant="outline">
                      {lead.customer_type === 'b2c' ? 'Residencial' : 'Comercial'}
                    </Badge>
                    <p className="text-sm">{lead.project}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getStatusColor(lead.status)}>
                      {getStatusLabel(lead.status)}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-3 border-t" onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={`tel:${lead.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Ligar
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={getWhatsAppLink(lead)} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLeads.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Nenhum lead encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros ou aguarde novos contatos
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Lead Detail Modal */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedLead && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedLead.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Status and Priority */}
                <div className="flex flex-wrap gap-3">
                  <Badge className={`${getStatusColor(selectedLead.status)} text-sm px-3 py-1`}>
                    {getStatusLabel(selectedLead.status)}
                  </Badge>
                  <Badge variant="outline" className={`text-sm px-3 py-1 ${getPriorityColor(selectedLead.priority || 'media')}`}>
                    Prioridade: {selectedLead.priority || 'média'}
                  </Badge>
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    {selectedLead.customer_type === 'b2c' ? 'Residencial' : 'Comercial'}
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">Telefone</p>
                          <a href={`tel:${selectedLead.phone}`} className="font-medium hover:text-primary">
                            {selectedLead.phone}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">E-mail</p>
                          <a href={`mailto:${selectedLead.email}`} className="font-medium hover:text-primary text-sm break-all">
                            {selectedLead.email}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">Cidade</p>
                          <p className="font-medium">{selectedLead.city}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">Criado em</p>
                          <p className="font-medium text-sm">{formatDate(selectedLead.created_at)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Project Info */}
                <div>
                  <h4 className="font-semibold mb-3">Informações do Projeto</h4>
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Tipo de Projeto</p>
                        <p className="font-medium">{selectedLead.project}</p>
                      </div>
                      {selectedLead.custom_description && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Descrição Personalizada</p>
                          <p className="text-sm">{selectedLead.custom_description}</p>
                        </div>
                      )}
                      {selectedLead.message && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Mensagem</p>
                          <p className="text-sm">{selectedLead.message}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Notes */}
                {selectedLead.notes && (
                  <div>
                    <h4 className="font-semibold mb-3">Anotações</h4>
                    <Card className="bg-yellow-50 border-yellow-200">
                      <CardContent className="p-4">
                        <p className="text-sm">{selectedLead.notes}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1" asChild>
                    <a href={`tel:${selectedLead.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Ligar Agora
                    </a>
                  </Button>
                  <Button className="flex-1" variant="outline" asChild>
                    <a href={getWhatsAppLink(selectedLead)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
