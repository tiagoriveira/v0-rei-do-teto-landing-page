export type LeadStatus = 'novo' | 'contatado' | 'qualificado' | 'proposta' | 'convertido' | 'arquivado'

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  customer_type: 'b2c' | 'b2b'
  project: string
  custom_description?: string
  city: string
  message?: string
  status: LeadStatus
  created_at: string
  updated_at: string
  priority?: 'baixa' | 'media' | 'alta'
  notes?: string
}

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(27) 99123-4567',
    customer_type: 'b2c',
    project: 'Forro de PVC para Sala',
    city: 'Vitória',
    message: 'Gostaria de orçamento para sala de aproximadamente 30m²',
    status: 'novo',
    priority: 'alta',
    created_at: '2025-02-13T10:30:00',
    updated_at: '2025-02-13T10:30:00',
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@empresa.com.br',
    phone: '(27) 99234-5678',
    customer_type: 'b2b',
    project: 'Forro Modular para Escritório',
    city: 'Serra',
    message: 'Precisamos de forro acústico para escritório com 200m²',
    status: 'contatado',
    priority: 'alta',
    created_at: '2025-02-12T14:20:00',
    updated_at: '2025-02-13T09:15:00',
    notes: 'Cliente solicitou visita técnica para quinta-feira',
  },
  {
    id: '3',
    name: 'Carlos Souza',
    email: 'carlos@email.com',
    phone: '(27) 99345-6789',
    customer_type: 'b2c',
    project: 'Forro Drywall para Quarto',
    city: 'Vila Velha',
    status: 'qualificado',
    priority: 'media',
    created_at: '2025-02-11T16:45:00',
    updated_at: '2025-02-12T11:30:00',
    notes: 'Projeto para 2 quartos, aguardando medidas',
  },
  {
    id: '4',
    name: 'Ana Paula Costa',
    email: 'ana.costa@loja.com',
    phone: '(27) 99456-7890',
    customer_type: 'b2b',
    project: 'Divisórias Drywall Corporativo',
    city: 'Vitória',
    message: 'Reforma completa da loja, preciso de divisórias e forro',
    status: 'proposta',
    priority: 'alta',
    created_at: '2025-02-10T11:00:00',
    updated_at: '2025-02-12T15:20:00',
    notes: 'Proposta enviada, aguardando resposta até sexta',
  },
  {
    id: '5',
    name: 'Roberto Santos',
    email: 'roberto.santos@gmail.com',
    phone: '(27) 99567-8901',
    customer_type: 'b2c',
    project: 'Sanca de Gesso',
    city: 'Cariacica',
    status: 'convertido',
    priority: 'media',
    created_at: '2025-02-08T09:30:00',
    updated_at: '2025-02-11T14:00:00',
    notes: 'Projeto iniciado, previsão de entrega em 5 dias',
  },
  {
    id: '6',
    name: 'Patricia Almeida',
    email: 'patricia@email.com',
    phone: '(27) 99678-9012',
    customer_type: 'b2c',
    project: 'Forro de PVC para Cozinha',
    city: 'Vitória',
    status: 'arquivado',
    priority: 'baixa',
    created_at: '2025-02-05T13:15:00',
    updated_at: '2025-02-09T10:00:00',
    notes: 'Cliente decidiu não realizar o projeto no momento',
  },
  {
    id: '7',
    name: 'Fernando Lima',
    email: 'fernando.lima@construtora.com',
    phone: '(27) 99789-0123',
    customer_type: 'b2b',
    project: 'Projeto Comercial Completo',
    city: 'Serra',
    message: 'Construção de novo prédio comercial, necessário orçamento completo',
    status: 'qualificado',
    priority: 'alta',
    created_at: '2025-02-09T08:00:00',
    updated_at: '2025-02-11T16:45:00',
    notes: 'Grande projeto, agendar reunião com sócios',
  },
  {
    id: '8',
    name: 'Juliana Martins',
    email: 'ju.martins@outlook.com',
    phone: '(27) 99890-1234',
    customer_type: 'b2c',
    project: 'Forro de PVC para Banheiro',
    city: 'Viana',
    status: 'novo',
    priority: 'media',
    created_at: '2025-02-13T08:15:00',
    updated_at: '2025-02-13T08:15:00',
  },
]

export const getStatusLabel = (status: LeadStatus): string => {
  const labels: Record<LeadStatus, string> = {
    novo: 'Novo',
    contatado: 'Contatado',
    qualificado: 'Qualificado',
    proposta: 'Proposta Enviada',
    convertido: 'Convertido',
    arquivado: 'Arquivado',
  }
  return labels[status]
}

export const getStatusColor = (status: LeadStatus): string => {
  const colors: Record<LeadStatus, string> = {
    novo: 'bg-blue-100 text-blue-800 border-blue-200',
    contatado: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    qualificado: 'bg-purple-100 text-purple-800 border-purple-200',
    proposta: 'bg-orange-100 text-orange-800 border-orange-200',
    convertido: 'bg-green-100 text-green-800 border-green-200',
    arquivado: 'bg-gray-100 text-gray-800 border-gray-200',
  }
  return colors[status]
}

export const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    baixa: 'text-gray-500',
    media: 'text-yellow-500',
    alta: 'text-red-500',
  }
  return colors[priority] || 'text-gray-500'
}
