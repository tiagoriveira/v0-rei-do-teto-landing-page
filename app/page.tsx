'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  CheckCircle2, 
  Clock, 
  Shield, 
  Award, 
  Home,
  Building2,
  Hammer,
  Lightbulb,
  Volume2,
  DoorOpen,
  Wrench,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  MessageCircle
} from 'lucide-react'

export default function Page() {
  const [customerType, setCustomerType] = useState<'b2c' | 'b2b' | ''>('')
  const [selectedProject, setSelectedProject] = useState('')
  const [showCustomDescription, setShowCustomDescription] = useState(false)

  const b2cProjects = [
    'Forro de PVC para Sala',
    'Forro de PVC para Cozinha',
    'Forro de PVC para Banheiro',
    'Forro de PVC para Área Externa',
    'Forro Drywall para Quarto',
    'Divisória Drywall',
    'Sanca de Gesso',
    'Outro (descrever)'
  ]

  const b2bProjects = [
    'Forro Modular para Escritório',
    'Divisórias Drywall Corporativo',
    'Forro Acústico para Auditório',
    'Revestimento Completo de Loja',
    'Projeto Comercial Completo',
    'Outro (descrever)'
  ]

  const handleProjectChange = (value: string) => {
    setSelectedProject(value)
    setShowCustomDescription(value === 'Outro (descrever)')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    console.log('[v0] Form submitted:', Object.fromEntries(formData))
  }

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">RT</span>
            </div>
            <span className="font-heading font-bold text-xl">Rei do Teto</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#sobre" className="text-sm hover:text-primary transition-colors">Sobre</a>
            <a href="#servicos" className="text-sm hover:text-primary transition-colors">Serviços</a>
            <a href="#tendencias" className="text-sm hover:text-primary transition-colors">Tendências</a>
            <a href="#orcamento" className="text-sm hover:text-primary transition-colors">Orçamento</a>
          </nav>
          <Button asChild className="bg-secondary hover:bg-secondary/90">
            <a href="https://wa.me/5527996369622" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
              Transforme Seu Espaço com Forros e Divisórias de Qualidade
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
              Especialistas em PVC, Drywall e Acabamentos no Espírito Santo. Qualidade garantida, entrega rápida e os melhores preços da região.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="#orcamento">Solicitar Orçamento Grátis</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <a href="#servicos">Ver Nossos Serviços</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-balance">
              Por Que Escolher a Rei do Teto?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Mais de 10 anos transformando espaços em todo o Espírito Santo com excelência e profissionalismo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Garantia de Qualidade</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Materiais premium e mão de obra especializada com garantia
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Entrega Rápida</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cumprimento rigoroso de prazos sem perder a qualidade
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Equipe Qualificada</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Profissionais experientes e certificados
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Melhor Custo-Benefício</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Preços competitivos sem comprometer a qualidade
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-balance">
              Nossos Serviços
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Soluções completas em acabamentos para residências e empresas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Home, title: 'Forros de PVC', desc: 'Resistentes, fáceis de limpar e com ótimo acabamento' },
              { icon: Hammer, title: 'Forros Drywall', desc: 'Versáteis e modernos para qualquer ambiente' },
              { icon: DoorOpen, title: 'Divisórias', desc: 'Otimize espaços com divisórias funcionais' },
              { icon: Sparkles, title: 'Sancas de Gesso', desc: 'Elegância e sofisticação para seus ambientes' },
              { icon: Volume2, title: 'Forros Acústicos', desc: 'Controle de ruído para ambientes comerciais' },
              { icon: Building2, title: 'Forros Modulares', desc: 'Sistemas práticos para escritórios e lojas' },
              { icon: Lightbulb, title: 'Iluminação Embutida', desc: 'Projetos completos com iluminação integrada' },
              { icon: Wrench, title: 'Manutenção', desc: 'Reparos e manutenção de forros existentes' },
            ].map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-heading font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trends Section */}
      <section id="tendencias" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-balance">
              Tendências 2025/2026
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Os projetos mais procurados para sua casa ou empresa
            </p>
          </div>

          {/* B2C Section */}
          <div className="mb-12">
            <h3 className="font-heading font-semibold text-2xl mb-6 flex items-center gap-2">
              <Home className="h-6 w-6 text-primary" />
              Para Residências
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'PVC Amadeirado', trend: 'Mais Popular', desc: 'Aparência de madeira com praticidade do PVC' },
                { title: 'Drywall Clean', trend: 'Minimalista', desc: 'Linhas retas e iluminação embutida' },
                { title: 'PVC Colorido', trend: 'Ousadia', desc: 'Cores vibrantes para ambientes modernos' },
                { title: 'Sanca Invertida', trend: 'Sofisticação', desc: 'Iluminação indireta para efeito aconchegante' },
              ].map((trend, idx) => (
                <Card key={idx} className="border-2 hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
                      {trend.trend}
                    </div>
                    <h4 className="font-heading font-semibold text-lg mb-2">{trend.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{trend.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* B2B Section */}
          <div>
            <h3 className="font-heading font-semibold text-2xl mb-6 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              Para Empresas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: 'Modular Corporativo', trend: 'Eficiência', desc: 'Fácil acesso a instalações e manutenção' },
                { title: 'Acústico Premium', trend: 'Conforto', desc: 'Redução de ruído para alta produtividade' },
                { title: 'Divisórias Inteligentes', trend: 'Flexibilidade', desc: 'Reconfiguração rápida de espaços' },
                { title: 'Design Sustentável', trend: 'ESG', desc: 'Materiais eco-friendly e certificados' },
              ].map((trend, idx) => (
                <Card key={idx} className="border-2 hover:border-secondary transition-colors">
                  <CardContent className="p-6">
                    <div className="bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
                      {trend.trend}
                    </div>
                    <h4 className="font-heading font-semibold text-lg mb-2">{trend.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{trend.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-balance">
              Atendemos Todo o Espírito Santo
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Grande Vitória, Serra, Vila Velha, Cariacica, Viana e região. 
              Levamos qualidade e profissionalismo para todo o estado.
            </p>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <a href="#orcamento">Consultar Disponibilidade</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="orcamento" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-balance">
                Solicite Seu Orçamento
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Preencha o formulário e receba uma proposta personalizada em até 24 horas
              </p>
            </div>
            <Card className="border-2">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input id="name" name="name" placeholder="Seu nome" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="(27) 99999-9999" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerType">Tipo de Cliente *</Label>
                    <Select 
                      name="customerType" 
                      value={customerType} 
                      onValueChange={(value) => {
                        setCustomerType(value as 'b2c' | 'b2b')
                        setSelectedProject('')
                        setShowCustomDescription(false)
                      }}
                      required
                    >
                      <SelectTrigger id="customerType">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="b2c">Pessoa Física (Residencial)</SelectItem>
                        <SelectItem value="b2b">Pessoa Jurídica (Empresarial)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {customerType && (
                    <div className="space-y-2">
                      <Label htmlFor="project">Tipo de Projeto *</Label>
                      <Select 
                        name="project" 
                        value={selectedProject}
                        onValueChange={handleProjectChange}
                        required
                      >
                        <SelectTrigger id="project">
                          <SelectValue placeholder="Selecione o projeto" />
                        </SelectTrigger>
                        <SelectContent>
                          {(customerType === 'b2c' ? b2cProjects : b2bProjects).map((project) => (
                            <SelectItem key={project} value={project}>
                              {project}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {showCustomDescription && (
                    <div className="space-y-2">
                      <Label htmlFor="customDescription">Descreva Seu Projeto *</Label>
                      <Textarea 
                        id="customDescription" 
                        name="customDescription" 
                        placeholder="Conte-nos mais sobre o que você precisa..."
                        rows={4}
                        required
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade *</Label>
                    <Input id="city" name="city" placeholder="Ex: Vitória" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Informações Adicionais</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Conte-nos mais detalhes sobre o projeto, área aproximada, prazos..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                    Enviar Solicitação
                  </Button>

                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    Ao enviar, você concorda em receber contato da Rei do Teto para apresentação da proposta
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-balance">
              Nossos Diferenciais
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Visita Técnica Grátis', desc: 'Avaliação no local sem compromisso' },
              { title: 'Orçamento Detalhado', desc: 'Transparência total nos custos' },
              { title: 'Pagamento Flexível', desc: 'Condições facilitadas para seu projeto' },
              { title: 'Pós-Venda', desc: 'Suporte contínuo após a conclusão' },
            ].map((diff, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{diff.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{diff.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">RT</span>
                </div>
                <span className="font-heading font-bold text-xl">Rei do Teto</span>
              </div>
              <p className="text-sm text-background/70 leading-relaxed">
                Especialistas em forros e divisórias no Espírito Santo. Qualidade e confiança há mais de 10 anos.
              </p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Contato</h3>
              <div className="space-y-3">
                <a href="https://wa.me/5527996369622" className="flex items-center gap-2 text-sm text-background/70 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  (27) 99636-9622
                </a>
                <a href="mailto:contato@reidoteto.com.br" className="flex items-center gap-2 text-sm text-background/70 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  contato@reidoteto.com.br
                </a>
                <div className="flex items-center gap-2 text-sm text-background/70">
                  <MapPin className="h-4 w-4" />
                  Espírito Santo, Brasil
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Navegação</h3>
              <div className="space-y-2">
                <a href="#sobre" className="block text-sm text-background/70 hover:text-primary transition-colors">Sobre Nós</a>
                <a href="#servicos" className="block text-sm text-background/70 hover:text-primary transition-colors">Serviços</a>
                <a href="#tendencias" className="block text-sm text-background/70 hover:text-primary transition-colors">Tendências</a>
                <a href="#orcamento" className="block text-sm text-background/70 hover:text-primary transition-colors">Orçamento</a>
              </div>
            </div>
          </div>
          <div className="border-t border-background/10 pt-6 text-center">
            <p className="text-sm text-background/50">
              © 2025 Rei do Teto. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5527996369622"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-white" />
      </a>
    </div>
  )
}
