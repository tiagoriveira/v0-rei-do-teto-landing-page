'use client'

import React from "react"
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { 
  CheckCircle2, 
  Clock, 
  Shield, 
  Award, 
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  Star,
  Zap,
  Target,
  Home,
  Hammer,
  DoorOpen,
  Sparkles,
  Volume2,
  Building2,
  Lightbulb,
  Wrench
} from 'lucide-react'

export default function Page() {
  const [customerType, setCustomerType] = useState<'b2c' | 'b2b' | ''>('')
  const [selectedProject, setSelectedProject] = useState('')
  const [showCustomDescription, setShowCustomDescription] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const supabase = createClient()
    
    const { error } = await supabase.from('leads').insert({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      customer_type: formData.get('customerType') as string,
      project: formData.get('project') as string,
      custom_description: formData.get('customDescription') as string || null,
      city: formData.get('city') as string,
      message: formData.get('message') as string || null,
    })
    
    setIsSubmitting(false)
    
    if (error) {
      console.log('[v0] Error submitting lead:', error)
      alert('Erro ao enviar formulário. Tente novamente.')
    } else {
      setSubmitSuccess(true)
      ;(e.target as HTMLFormElement).reset()
      setCustomerType('')
      setSelectedProject('')
      setShowCustomDescription(false)
      setTimeout(() => setSubmitSuccess(false), 5000)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-foreground">RT</span>
            </div>
            <div>
              <span className="font-heading font-bold text-xl block">Rei do Teto</span>
              <span className="text-xs text-muted-foreground">Forros e Divisórias</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-sm font-medium hover:text-primary transition-colors relative group">
              Sobre
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
            <a href="#servicos" className="text-sm font-medium hover:text-primary transition-colors relative group">
              Serviços
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
            <a href="#tendencias" className="text-sm font-medium hover:text-primary transition-colors relative group">
              Tendências
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="hidden sm:flex bg-transparent">
              <a href="tel:+5527996369622">
                <Phone className="mr-2 h-4 w-4" />
                Ligar
              </a>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg">
              <a href="#orcamento">
                Orçamento Grátis
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90">
        {/* Geometric Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center gap-2 text-background">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <span className="text-sm font-medium">+10 anos de experiência</span>
              </div>
              <div className="flex items-center gap-2 text-background">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Entrega em até 7 dias</span>
              </div>
              <div className="flex items-center gap-2 text-background">
                <Target className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">+500 projetos realizados</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center mb-12">
              <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl mb-6 text-balance text-background leading-tight">
                Forros e Divisórias que{' '}
                <span className="text-primary">Transformam</span> Ambientes
              </h1>
              <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                Especialistas em PVC, Drywall e Acabamentos no Espírito Santo. Qualidade premium, prazos cumpridos e preços que cabem no seu bolso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-foreground shadow-xl text-base">
                  <a href="#orcamento">
                    Solicitar Orçamento Grátis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent border-2 border-background/20 text-background hover:bg-background/10 text-base">
                  <a href="https://wa.me/5527996369622" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
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
      <section id="servicos" className="py-24 md:py-32 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 rounded-full">
              <span className="text-sm font-semibold text-primary">Nossos Serviços</span>
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-balance">
              Soluções Completas em Acabamentos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Do projeto à execução, oferecemos qualidade premium para residências e empresas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { image: '/images/service-pvc.jpg', title: 'Forros de PVC', desc: 'Resistente à umidade, fácil limpeza e ótimo custo-benefício' },
              { image: '/images/service-drywall.jpg', title: 'Forros Drywall', desc: 'Acabamento moderno e versátil para qualquer ambiente' },
              { image: '/images/service-divisorias.jpg', title: 'Divisórias', desc: 'Otimização de espaços com divisórias inteligentes' },
              { image: '/images/service-gesso.jpg', title: 'Sancas de Gesso', desc: 'Elegância e sofisticação com iluminação integrada' },
              { image: '/images/service-acustico.jpg', title: 'Forros Acústicos', desc: 'Controle acústico profissional para ambientes corporativos' },
              { image: '/images/service-modular.jpg', title: 'Forros Modulares', desc: 'Praticidade e acesso facilitado para instalações' },
              { image: '/images/service-iluminacao.jpg', title: 'Iluminação Embutida', desc: 'Projetos luminotécnicos completos e modernos' },
              { image: '/images/service-manutencao.jpg', title: 'Manutenção', desc: 'Reparos e manutenção preventiva de forros' },
            ].map((service, idx) => (
              <Card key={idx} className="group overflow-hidden border-2 hover:border-primary hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={service.image || "/placeholder.svg"} 
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 right-4 font-heading font-bold text-lg text-background">
                    {service.title}
                  </h3>
                </div>
                <CardContent className="p-5">
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
                { title: 'PVC Amadeirado', trend: 'Mais Popular', desc: 'Aparência de madeira com praticidade do PVC', image: '/images/trends/pvc-amadeirado.jpg' },
                { title: 'Drywall Clean', trend: 'Minimalista', desc: 'Linhas retas e iluminação embutida', image: '/images/trends/drywall-clean.jpg' },
                { title: 'PVC Colorido', trend: 'Ousadia', desc: 'Cores vibrantes para ambientes modernos', image: '/images/trends/pvc-colorido.jpg' },
                { title: 'Sanca Invertida', trend: 'Sofisticação', desc: 'Iluminação indireta para efeito aconchegante', image: '/images/trends/sanca-invertida.jpg' },
              ].map((trend, idx) => (
                <Card key={idx} className="group overflow-hidden border-2 hover:border-primary transition-all duration-300">
                  <div className="relative h-40 overflow-hidden">
                    <Image 
                      src={trend.image} 
                      alt={trend.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <CardContent className="p-5">
                    <div className="bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full inline-block mb-2">
                      {trend.trend}
                    </div>
                    <h4 className="font-heading font-semibold text-lg mb-1">{trend.title}</h4>
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
                { title: 'Modular Corporativo', trend: 'Eficiência', desc: 'Fácil acesso a instalações e manutenção', image: '/images/trends/modular-corporativo.jpg' },
                { title: 'Acústico Premium', trend: 'Conforto', desc: 'Redução de ruído para alta produtividade', image: '/images/trends/acustico-premium.jpg' },
                { title: 'Divisórias Inteligentes', trend: 'Flexibilidade', desc: 'Reconfiguração rápida de espaços', image: '/images/trends/divisorias-inteligentes.jpg' },
                { title: 'Design Sustentável', trend: 'ESG', desc: 'Materiais eco-friendly e certificados', image: '/images/trends/sustentavel.jpg' },
              ].map((trend, idx) => (
                <Card key={idx} className="group overflow-hidden border-2 hover:border-secondary transition-all duration-300">
                  <div className="relative h-40 overflow-hidden">
                    <Image 
                      src={trend.image} 
                      alt={trend.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <CardContent className="p-5">
                    <div className="bg-secondary/10 text-secondary text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full inline-block mb-2">
                      {trend.trend}
                    </div>
                    <h4 className="font-heading font-semibold text-lg mb-1">{trend.title}</h4>
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

                  {submitSuccess && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm text-center">
                      ✓ Orçamento enviado com sucesso! Entraremos em contato em breve.
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
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
      <footer className="bg-gradient-to-br from-foreground via-foreground/98 to-foreground text-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-foreground">RT</span>
                </div>
                <div>
                  <span className="font-heading font-bold text-xl block">Rei do Teto</span>
                  <span className="text-xs text-background/60">Forros e Divisórias</span>
                </div>
              </div>
              <p className="text-sm text-background/70 leading-relaxed">
                Mais de 10 anos transformando ambientes no Espírito Santo com qualidade, profissionalismo e os melhores preços.
              </p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-5">Entre em Contato</h3>
              <div className="space-y-3">
                <a 
                  href="tel:+5527996369622" 
                  className="flex items-center gap-3 text-sm text-background/80 hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 bg-background/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-background/60">Telefone</div>
                    <div className="font-medium">(27) 99636-9622</div>
                  </div>
                </a>
                <a 
                  href="mailto:contato@reidoteto.com.br" 
                  className="flex items-center gap-3 text-sm text-background/80 hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 bg-background/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-background/60">E-mail</div>
                    <div className="font-medium">contato@reidoteto.com.br</div>
                  </div>
                </a>
                <a 
                  href="https://wa.me/5527996369622" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-background/80 hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 bg-background/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-background/60">WhatsApp</div>
                    <div className="font-medium">Atendimento Rápido</div>
                  </div>
                </a>
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
    </div>
  )
}
