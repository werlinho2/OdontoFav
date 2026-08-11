"use client";

import Image from "next/image";
import { CheckCircle2, MessageCircle, MapPin, Phone, Star, ShieldCheck, Clock, Users, Menu, X } from "lucide-react";
import { useState, useRef, MouseEvent, useEffect } from "react";
import { motion } from "framer-motion";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const GlowSection = ({ children, className, as: Component = "section" }: { children: React.ReactNode, className?: string, as?: React.ElementType }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Component 
      ref={sectionRef as any}
      onMouseMove={handleMouseMove}
      className={`glow-bg ${className || ""}`}
      style={{ '--x': `${mousePos.x}px`, '--y': `${mousePos.y}px` } as React.CSSProperties}
    >
      {children}
    </Component>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [activeCaseIndex, setActiveCaseIndex] = useState<number | null>(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const WHATSAPP_NUMBER = "5527998654698";
  const INSTAGRAM_LINK = "https://www.instagram.com/favodonto/";

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    if (id === 'blog') {
      window.location.href = '/blog';
    } else {
      scrollTo(id);
    }
  };

  const trackConversion = (label: string) => {
    // 1. Meta Pixel event
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', { content_name: label });
    }
    // 2. Google Ads Conversion tracking (Gtag)
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-SEU_CONVERSION_ID_AQUI/SEU_CONVERSION_LABEL_AQUI',
        'event_category': 'WhatsApp',
        'event_label': label
      });
    }
    // 3. Google Tag Manager (GTM) Custom Event
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        'event': 'whatsapp_click',
        'unidade': label
      });
    }
  };

  const navLinks = [
    { label: "Sobre", id: "sobre" },
    { label: "Especialidades", id: "especialidades" },
    { label: "Casos Reais", id: "casos" },
    { label: "Depoimentos", id: "depoimentos" },
    { label: "Blog", id: "blog" },
    { label: "FAQ", id: "faq" },
    { label: "Contato", id: "contato" },
  ];

  const testimonials = [
    { name: "Maria Oliveira", service: "Ortodontia", text: "A melhor decisão que tomei. O processo foi impecável, sem dor e o resultado superou absoluto todas as minhas expectativas. A Dra. Rogéria tem mãos de ouro.", avatar: "1" },
    { name: "João Santos", service: "Tecnologia", text: "Toda a equipe é fantástica. A tecnologia utilizada na clínica me passou muita segurança e clareza do que estava sendo feito a cada etapa.", avatar: "11" },
    { name: "Ana Beatriz", service: "Atendimento", text: "Sempre tive um pouco de fobia, mas a OdontoFav mudou essa visão completamente. Ambiente relaxante, atendimento focado e humanizado.", avatar: "5" },
    { name: "Maria Oliveira", service: "Ortodontia", text: "A melhor decisão que tomei. O processo foi impecável, sem dor e o resultado superou absoluto todas as minhas expectativas. A Dra. Rogéria tem mãos de ouro.", avatar: "1" },
    { name: "João Santos", service: "Tecnologia", text: "Toda a equipe é fantástica. A tecnologia utilizada na clínica me passou muita segurança e clareza do que estava sendo feito a cada etapa.", avatar: "11" },
    { name: "Ana Beatriz", service: "Atendimento", text: "Sempre tive um pouco de fobia, mas a OdontoFav mudou essa visão completamente. Ambiente relaxante, atendimento focado e humanizado.", avatar: "5" },
  ];

  const blogPosts = [
    {
      id: "alinhadores-invisiveis",
      category: "Ortodontia",
      title: "Alinhadores Invisíveis vs Aparelho Tradicional: Qual escolher?",
      desc: "Descubra as vantagens estéticas e de tempo dos novos alinhadores transparentes e se eles são adequados para o seu caso.",
      date: "08 Ago, 2026",
      image: "https://images.unsplash.com/photo-1656514894252-fb336a3ad6a6?w=600&q=80"
    },
    {
      id: "clareamento-dental",
      category: "Estética",
      title: "5 Dicas Essenciais para Manter seu Clareamento por Mais Tempo",
      desc: "Saiba quais alimentos evitar e quais hábitos fáceis de adotar no dia a dia ajudam a prolongar a brancura natural dos dentes.",
      date: "05 Ago, 2026",
      image: "https://images.unsplash.com/photo-1684607633080-df59e6874367?w=800&q=80"
    },
    {
      id: "implante-dentario",
      category: "Reabilitação",
      title: "A Importância do Implante Dentário para a Saúde Geral",
      desc: "Perder um dente vai além da estética. Entenda os impactos reais na mastigação, digestão e na estrutura óssea do rosto.",
      date: "01 Ago, 2026",
      image: "https://images.unsplash.com/photo-1660737217649-e3bd4ef2888a?w=800&q=80"
    }
  ];

  const faqItems = [
    {
      question: "Como faço para agendar uma consulta na OdontoFav?",
      answer: "Você pode agendar sua avaliação clicando em qualquer botão de agendamento no site. Um modal aparecerá para você escolher a unidade desejada (Serra ou Vitória) e você será redirecionado para falar diretamente com a nossa equipe via WhatsApp de forma rápida e prática."
    },
    {
      question: "Quais formas de pagamento vocês aceitam?",
      answer: "Aceitamos diversas formas de pagamento para facilitar o seu tratamento: PIX, cartões de débito e crédito (com parcelamento facilitado). Oferecemos também condições especiais para tratamentos de reabilitação e estética completos. Venha fazer uma avaliação e planejar conosco."
    },
    {
      question: "A clínica possui estacionamento ou acessibilidade?",
      answer: "Sim, ambas as nossas unidades foram planejadas pensando no seu conforto total: a Unidade Serra possui fácil acesso no nível da rua com estacionamento em frente, e a Unidade Vitória fica no Edifício River Center com estacionamento privativo e elevador com acesso direto do subsolo."
    },
    {
      question: "O que são alinhadores invisíveis e por que são melhores?",
      answer: "Os alinhadores invisíveis são placas transparentes sequenciais feitas sob medida com tecnologia 3D. Eles são extremamente discretos, confortáveis, removíveis para comer e higienizar, e tendem a corrigir o sorriso de forma até 50% mais rápida do que os aparelhos ortodônticos metálicos convencionais."
    },
    {
      question: "Como funciona a primeira consulta de avaliação?",
      answer: "Na primeira consulta, realizamos um escaneamento e diagnóstico digital completo. A Dra. Rogéria Lima Becalli avaliará a saúde do seu sorriso e criará um planejamento 3D personalizado, permitindo que você visualize os objetivos do tratamento antes mesmo de começar."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-8 md:px-16 lg:px-32 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Image 
              src="/logo.png" 
              alt="OdontoFav Logo" 
              width={isScrolled ? 40 : 50} 
              height={isScrolled ? 40 : 50} 
              className="rounded-full border border-gray-100 transition-all duration-300"
            />
            <span className="text-xl font-extrabold text-brand-blue-marine leading-tight tracking-tight">ODONTOFAV</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 transition-colors group cursor-pointer"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">{link.label}</span>
                <div className="absolute inset-0 bg-brand-blue-marine rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-0 scale-90 group-hover:scale-100"></div>
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsWhatsappModalOpen(true)}
            className={`hidden md:flex items-center gap-2 bg-brand-blue-marine hover:bg-brand-blue text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Agendar Avaliação</span>
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-brand-blue-marine"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-md border-gray-100 ${isMenuOpen ? 'max-h-96 py-4 border-b shadow-lg' : 'max-h-0 py-0 border-transparent'}`}>
          <div className="container mx-auto px-8 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => {
                  handleNavClick(link.id);
                  setIsMenuOpen(false);
                }}
                className="text-left font-medium text-brand-blue-marine hover:text-brand-blue transition-colors text-lg cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsWhatsappModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-brand-blue-marine text-white w-full py-3 rounded-full text-sm font-medium mt-4 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Agendar Avaliação</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-brand-light pt-32 pb-48 md:pt-40 md:pb-56 flex flex-col items-center text-center"
      >
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-brand-blue-marine/10 md:bg-brand-blue-marine/15 rounded-full blur-3xl pointer-events-none animate-blob"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-brand-blue-marine/10 md:bg-brand-blue-marine/20 rounded-full blur-3xl pointer-events-none animate-blob" style={{ animationDelay: '2s', animationDuration: '15s' }}></div>
        
        <div className="container mx-auto px-8 md:px-16 lg:px-32 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-marine/10 text-brand-blue-marine font-medium text-sm mb-6">
            <Star className="w-4 h-4 fill-brand-blue-marine text-brand-blue-marine" />
            <span>Referência em Serra e Vitória</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight max-w-4xl mb-8">
            Seu sorriso merece <br />
            o cuidado da <span className="text-brand-blue-marine relative whitespace-nowrap">
              OdontoFav
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-blue" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-10">
            Especialistas em transformar vidas através da saúde bucal. Atendimento humanizado e tecnologia de ponta no coração de Serra e Vitória.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={() => setIsWhatsappModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-brand-blue-marine hover:bg-brand-blue text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-brand-blue-marine/30 transform hover:-translate-y-1 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Agendar Avaliação</span>
            </button>
            <button
              onClick={() => scrollTo('especialidades')}
              className="flex items-center justify-center gap-2 bg-white text-brand-blue-marine border-2 border-brand-blue-marine hover:bg-brand-blue-marine/5 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>Conhecer Especialistas</span>
            </button>
          </div>
        </div>
      </motion.section>

      {/* TREATMENTS SECTION */}
      <section id="especialidades" className="py-24 bg-white relative">
        {/* WAVE DIVIDER */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[calc(100%-1px)] z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[80px] text-white fill-current block" preserveAspectRatio="none">
            <path d="M0,60 C480,140 960,-20 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-8 md:px-16 lg:px-32 relative z-30">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Nossas <span className="text-brand-blue-marine">Especialidades</span>
            </h2>
            <p className="text-lg text-gray-600">
              Oferecemos tratamentos qualificados em diversas áreas para garantir a saúde e a beleza do seu sorriso em um só lugar.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Ortodontia (Aparelhos)", 
                desc: "Alinhamento perfeito para a estética e funcionalidade da sua mordida.",
                icon: "🦷",
                image: "https://images.unsplash.com/photo-1656514894252-fb336a3ad6a6?w=500&q=80"
              },
              { 
                title: "Clareamento", 
                desc: "Conquiste um sorriso mais branco e iluminado com total segurança.",
                icon: "✨",
                image: "https://images.unsplash.com/photo-1684607633080-df59e6874367?w=500&q=80"
              },
              { 
                title: "Implante Dentário", 
                desc: "Recupere a confiança para sorrir e mastigar com dentes fixos e naturais.",
                icon: "🔩",
                image: "https://images.unsplash.com/photo-1660737217649-e3bd4ef2888a?w=500&q=80"
              },
              { 
                title: "Prótese Dentária", 
                desc: "Reabilitação oral personalizada para devolver a harmonia natural do seu rosto.",
                icon: "👄",
                image: "https://images.unsplash.com/photo-1612283105859-6e2585710acd?w=500&q=80"
              },
              { 
                title: "Cirurgias", 
                desc: "Procedimentos cirúrgicos seguros e humanizados para o seu bem-estar.",
                icon: "⚕️",
                image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=500&q=80"
              },
              { 
                title: "Endodontia (Canal)", 
                desc: "Tratamento especializado para eliminar a dor e salvar o dente natural.",
                icon: "🩺",
                image: "https://cdsodontodigital.com.br/wp-content/uploads/2022/02/07.jpg"
              },
              { 
                title: "Harmonização Facial", 
                desc: "Realce sua beleza natural com procedimentos estéticos faciais modernos.",
                icon: "💆‍♀️",
                image: "https://images.prismic.io/albufeira/4e43b1e5-566c-47c9-b923-162197e23212_what-is-a-botox-lip-flip.png?auto=compress%2Cformat&fit=max&q=50"
              },
              { 
                title: "Estética do Sorriso", 
                desc: "Transformações personalizadas com facetas em resina e lentes de contato porcelana.",
                icon: "💎",
                image: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?w=500&q=80"
              }
            ].map((treatment, idx) => (
              <motion.div 
                key={idx} 
                className="flip-card cursor-default"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="flip-card-inner">
                  {/* Front Side */}
                  <div className="flip-card-front">
                    <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center text-brand-blue-marine transition-colors duration-300 shrink-0 mb-6">
                      <span className="text-3xl">{treatment.icon}</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-bold text-gray-800 text-xl text-center">{treatment.title}</h3>
                      <p className="text-gray-500 leading-relaxed text-sm text-center">{treatment.desc}</p>
                    </div>
                  </div>
                  
                  {/* Back Side */}
                  <div className="flip-card-back" style={{ backgroundImage: `url(${treatment.image})` }}>
                    <div className="flip-card-back-content p-6">
                      <h3 className="font-bold text-white text-xl mb-3">{treatment.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed mb-6">Conheça nossos diferenciais em {treatment.title.toLowerCase()}.</p>
                      <button
                        onClick={() => setIsWhatsappModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-white text-brand-blue-marine px-4 py-2 rounded-full text-xs font-semibold hover:scale-105 transition-transform cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Saber Mais</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASOS REAIS SECTION */}
      <motion.section 
        id="casos" 
        className="py-24 bg-brand-light relative"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
      >
        {/* WAVE DIVIDER */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[calc(100%-1px)] z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[80px] text-brand-light fill-current block" preserveAspectRatio="none">
            <path d="M0,60 C480,140 960,-20 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-8 md:px-16 lg:px-32 relative z-30">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Casos <span className="text-brand-blue-marine">Reais</span>, Resultados <span className="text-brand-blue-marine">Reais</span>
            </h2>
            <p className="text-lg text-gray-600">
              Acompanhe a transformação no sorriso e na confiança dos nossos pacientes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: 'caso1.png', title: 'Lentes de Contato', duration: '2 sessões', quote: '"Sorriso harmonizado milimetricamente. Ficou exatamente como eu sonhava!"' },
              { img: 'caso2.png', title: 'Clareamento Dental', duration: '3 semanas', quote: '"Sorriso mais branco e iluminado com segurança, sem qualquer sensibilidade."' },
              { img: 'caso3.png', title: 'Alinhadores Invisíveis', duration: '6 meses', quote: '"Tratamento super rápido com alinhadores transparentes de última geração."' },
              { img: 'caso4.png', title: 'Reabilitação Completa', duration: 'Finalizado', quote: '"Implantes guiados com cirurgia minimamente invasiva e carga imediata."' }
            ].map((item, i) => {
              const isOpen = activeCaseIndex === i;
              return (
                <div 
                  key={i} 
                  onClick={() => setActiveCaseIndex(isOpen ? null : i)}
                  className="relative aspect-[3/4] rounded-3xl overflow-hidden group shadow-md border-4 border-white cursor-pointer select-none"
                >
                  <Image 
                    src={`/${item.img}`} 
                    alt="Sorriso" 
                    fill 
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${isOpen ? 'scale-105' : ''}`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500 from-black/80 via-transparent to-transparent group-hover:from-black/95 group-hover:via-black/50 ${isOpen ? 'from-black/95 via-black/50' : ''}`}></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end">
                    <p className="font-bold text-xl relative z-10 drop-shadow-md">{item.title}</p>
                    <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <div className={`pt-2 transition-opacity duration-500 delay-100 group-hover:opacity-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                          <p className="text-xs text-brand-accent mb-3 font-medium flex items-center gap-1 uppercase tracking-wider">
                            <Clock className="w-3 h-3" /> {item.duration}
                          </p>
                          <p className="text-sm text-white/90 italic border-l-2 border-brand-accent pl-3 leading-relaxed">
                            {item.quote}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* DRA ROGÉRIA SECTION - SOBRE */}
      <motion.section 
        id="sobre" 
        className="py-24 bg-white relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
      >
        {/* WAVE DIVIDER */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[calc(100%-1px)] z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[80px] text-white fill-current block" preserveAspectRatio="none">
            <path d="M0,60 C480,140 960,-20 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-8 md:px-16 lg:px-32 relative z-30">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left side: Images in vertical rounded rectangles */}
            <div className="relative w-full max-w-sm mx-auto h-[550px] flex justify-center items-center">
              {/* Background Border Rectangle */}
              <div className="absolute top-4 -left-4 md:top-6 md:-left-6 w-full h-full border-2 border-brand-blue-marine rounded-[40px] z-0"></div>

              {/* Foreground Image Rectangle */}
              <div className="relative w-full h-full bg-brand-light rounded-[40px] z-10 overflow-hidden shadow-2xl border-4 border-white">
                <Image 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80" 
                  alt="Dra. Rogéria Lima Becalli" 
                  fill 
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-brand-blue-marine/10">
                  <span className="text-sm font-bold text-brand-blue-marine">Responsável Técnica</span>
                </div>
              </div>
            </div>
            
            {/* Right side: Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-marine/10 text-brand-blue-marine font-medium text-sm">
                <span>Conheça nossa História</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Sobre a <span className="text-brand-blue-marine">Dra. Rogéria Lima Becalli</span>
              </h2>
              
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Eu sou a <strong className="text-gray-900 font-semibold">Dra. Rogéria Lima Becalli</strong>, fundadora e especialista à frente da OdontoFav.
                </p>
                <p>
                  Com mais de 15 anos de experiência e milhares de sorrisos transformados, sou referência em Odontologia Estética e Reabilitação Oral. Nossa abordagem une arte, ciência e a mais alta tecnologia para entregar resultados perfeitos.
                </p>
                <p>
                  Nossos espaços em Serra e Vitória foram totalmente pensados para proporcionar uma experiência sensorial e relaxante, que redefine o conceito de ida ao dentista com conforto absoluto.
                </p>
                <p className="text-xl text-brand-blue-marine font-medium italic pt-4">
                  &quot;Aqui, cada paciente é único. Será um prazer receber você em nossas clínicas ✨&quot;
                </p>
              </div>
              
              <div className="pt-6 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm">
                    <span className="text-2xl">✨</span>
                  </div>
                  <span className="font-medium text-gray-800">Especialista em Implantodontia Avançada & Estética</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <span className="font-medium text-gray-800">Planejamento 3D e Diagnóstico por Imagem</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <span className="font-medium text-gray-800">Atendimento Humanizado, Seguro e Confortável</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm">
                    <span className="text-2xl">📱</span>
                  </div>
                  <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer" className="font-medium text-brand-blue-marine hover:text-brand-blue transition-colors">
                    Acompanhe no @favodonto
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* WHY CHOOSE US SECTION - GLOW BACKGROUND */}
      <GlowSection className="py-24 bg-brand-blue-marine text-white relative">
        {/* WAVE DIVIDER */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[calc(100%-1px)] z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[80px] text-brand-blue-marine fill-current block" preserveAspectRatio="none">
            <path d="M0,60 C480,140 960,-20 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        <motion.div 
          className="container mx-auto px-8 md:px-16 lg:px-32 relative z-30"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Por que escolher a OdontoFav?
            </h2>
            <p className="text-lg text-white/80">
              Nosso compromisso é com a sua saúde, bem-estar e o seu sorriso mais bonito.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all">
              <ShieldCheck className="w-12 h-12 text-white mb-6 opacity-90" />
              <h3 className="text-xl font-bold mb-3">Segurança e Qualidade</h3>
              <p className="text-white/80 leading-relaxed">
                Utilizamos materiais de alta qualidade e seguimos rígidos protocolos de biossegurança para garantir seu conforto.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all">
              <Users className="w-12 h-12 text-white mb-6 opacity-90" />
              <h3 className="text-xl font-bold mb-3">Atendimento Humanizado</h3>
              <p className="text-white/80 leading-relaxed">
                Entendemos seus medos e expectativas, oferecendo um cuidado empático e acolhedor em todas as etapas.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all">
              <Clock className="w-12 h-12 text-white mb-6 opacity-90" />
              <h3 className="text-xl font-bold mb-3">Agilidade e Pontualidade</h3>
              <p className="text-white/80 leading-relaxed">
                Respeitamos o seu tempo com agendamentos precisos e tratamentos otimizados para a sua rotina.
              </p>
            </div>
          </div>
        </motion.div>
      </GlowSection>

      {/* TESTIMONIALS SECTION */}
      <motion.section 
        id="depoimentos" 
        className="py-24 bg-brand-light relative"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
      >
        {/* WAVE DIVIDER */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[calc(100%-1px)] z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[80px] text-brand-light fill-current block" preserveAspectRatio="none">
            <path d="M0,60 C480,140 960,-20 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-8 md:px-16 lg:px-32 relative z-30">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              O que dizem <span className="text-brand-blue-marine">nossos pacientes</span>
            </h2>
            <p className="text-lg text-gray-600">
              A satisfação de quem já transformou o sorriso com a gente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] overflow-hidden mask-y relative">
            {/* Column 1 - Fast */}
            <div className="flex flex-col gap-6 animate-marquee-fast">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={`c1-${i}`} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-light rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="flex text-brand-blue-marine mb-4 relative z-10">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-600 italic mb-6 relative z-10 text-sm leading-relaxed">&quot;{t.text}&quot;</p>
                  <div className="flex items-center gap-4 relative z-10 border-t border-gray-50 pt-4">
                    <Image src={`https://i.pravatar.cc/150?img=${t.avatar}`} alt={t.name} width={40} height={40} className="rounded-full border border-gray-200" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-brand-blue-marine font-medium">{t.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Column 2 - Medium */}
            <div className="hidden md:flex flex-col gap-6 animate-marquee-medium">
              {[...testimonials.slice(2), ...testimonials.slice(0,2), ...testimonials.slice(2), ...testimonials.slice(0,2)].map((t, i) => (
                <div key={`c2-${i}`} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-light rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="flex text-brand-blue-marine mb-4 relative z-10">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-600 italic mb-6 relative z-10 text-sm leading-relaxed">&quot;{t.text}&quot;</p>
                  <div className="flex items-center gap-4 relative z-10 border-t border-gray-50 pt-4">
                    <Image src={`https://i.pravatar.cc/150?img=${t.avatar}`} alt={t.name} width={40} height={40} className="rounded-full border border-gray-200" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-brand-blue-marine font-medium">{t.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3 - Slow */}
            <div className="hidden md:flex flex-col gap-6 animate-marquee-slow">
              {[...testimonials.slice(4), ...testimonials.slice(0,4), ...testimonials.slice(4), ...testimonials.slice(0,4)].map((t, i) => (
                <div key={`c3-${i}`} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-light rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="flex text-brand-blue-marine mb-4 relative z-10">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-600 italic mb-6 relative z-10 text-sm leading-relaxed">&quot;{t.text}&quot;</p>
                  <div className="flex items-center gap-4 relative z-10 border-t border-gray-50 pt-4">
                    <Image src={`https://i.pravatar.cc/150?img=${t.avatar}`} alt={t.name} width={40} height={40} className="rounded-full border border-gray-200" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-brand-blue-marine font-medium">{t.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* BLOG EDUCATIVO SECTION */}
      <section id="blog" className="py-24 bg-white relative">
        {/* WAVE DIVIDER */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[calc(100%-1px)] z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[80px] text-white fill-current block" preserveAspectRatio="none">
            <path d="M0,60 C480,140 960,-20 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-8 md:px-16 lg:px-32 relative z-30">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-marine/10 text-brand-blue-marine font-medium text-sm">
              <span>Blog OdontoFav</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Dicas de <span className="text-brand-blue-marine">Saúde Bucal</span>
            </h2>
            <p className="text-lg text-gray-600">
              Artigos educativos preparados por nossa equipe para ajudar você a cuidar do seu sorriso diariamente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <motion.article 
                key={idx}
                onClick={() => window.location.href = `/blog?post=${post.id}`}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-brand-blue-marine/10 transition-all duration-300 flex flex-col group cursor-pointer"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="relative h-48 w-full overflow-hidden shrink-0">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-brand-blue-marine text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between flex-1 gap-6">
                  <div className="space-y-3">
                    <span className="text-xs text-gray-400 font-medium">{post.date}</span>
                    <h3 className="font-bold text-gray-900 text-xl leading-snug group-hover:text-brand-blue transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {post.desc}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-brand-blue-marine group-hover:text-brand-blue flex items-center gap-1.5 transition-colors w-fit mt-auto">
                    <span>Ler Artigo</span>
                    <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 bg-brand-light relative">
        {/* WAVE DIVIDER */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[calc(100%-1px)] z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[80px] text-brand-light fill-current block" preserveAspectRatio="none">
            <path d="M0,60 C480,140 960,-20 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-8 md:px-16 lg:px-32 max-w-4xl relative z-30">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-marine/10 text-brand-blue-marine font-medium text-sm">
              <span>Dúvidas Comuns</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Perguntas <span className="text-brand-blue-marine">Frequentes</span>
            </h2>
            <p className="text-lg text-gray-600">
              Encontre respostas rápidas para as principais dúvidas sobre os nossos atendimentos e tratamentos.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <motion.div 
                  key={idx}
                  className="border border-gray-100 rounded-2xl overflow-hidden bg-brand-light/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-900 hover:text-brand-blue transition-colors cursor-pointer gap-4"
                  >
                    <span className="text-base md:text-lg">{item.question}</span>
                    <span className={`w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-100 text-brand-blue-marine shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="p-6 pt-0 text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-50/50 bg-white">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section id="contato" className="py-24 bg-white flex flex-col relative">
        {/* WAVE DIVIDER */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[calc(100%-1px)] z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[80px] text-white fill-current block" preserveAspectRatio="none">
            <path d="M0,60 C480,140 960,-20 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-8 md:px-16 lg:px-32 relative z-30">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-marine/10 text-brand-blue-marine font-medium text-sm">
              <MapPin className="w-4 h-4 fill-brand-blue-marine text-brand-blue-marine" />
              <span>Visite uma de nossas clínicas</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Nossas <span className="text-brand-blue-marine">Unidades</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estruturas modernas preparadas com a mais alta tecnologia para o seu atendimento em Serra e Vitória.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Unidade Serra */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-brand-light p-6 md:p-8 rounded-3xl border border-brand-blue-marine/5 flex flex-col justify-between shadow-sm relative overflow-hidden group"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-brand-blue-marine font-bold">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xl text-gray-900">Unidade Serra</h3>
                    <p className="text-xs text-brand-blue-marine font-medium">Fácil acesso com UPA próxima</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-gray-600 text-sm">
                  <p className="leading-relaxed">
                    <strong className="text-gray-900 block font-semibold mb-0.5">Endereço</strong>
                    Av. Jones dos Santos Neves, 429 - Caçaroca<br />Serra - ES | CEP: 29176-437
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-gray-900 block font-semibold mb-0.5">Horário</strong>
                    Segunda a Sexta: 08:00 às 18:00 | Sábado: 08:00 às 12:00
                  </p>
                </div>
                
                <div className="w-full h-[250px] rounded-2xl overflow-hidden shadow-inner border border-gray-200/50">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7492.3301105941055!2d-40.312131660330365!3d-20.127160499583514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb81f0030acd295%3A0x44c48624826978a7!2sOdonto%20Fav!5e0!3m2!1spt-BR!2sbr!4v1774023400814!5m2!1spt-BR!2sbr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale-[5%] contrast-110"
                  ></iframe>
                </div>
              </div>
              
              <div className="pt-6 flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://api.whatsapp.com/send/?phone=5527998654698&text=Ol%C3%A1%2C+vim+pelo+site%2C+quero+agendar+uma+consulta+na+Serra%21"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-blue-marine hover:bg-brand-blue text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md transform hover:-translate-y-0.5 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Agendar na Serra
                </a>
                <a 
                  href="https://maps.google.com/?q=Odonto+Fav+Serra" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-blue-marine border border-brand-blue-marine/20 hover:bg-brand-blue-marine/5 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-0.5 text-sm cursor-pointer"
                >
                  Ver Rota
                </a>
              </div>
            </motion.div>

            {/* Unidade Vitória */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-brand-light p-6 md:p-8 rounded-3xl border border-brand-blue-marine/5 flex flex-col justify-between shadow-sm relative overflow-hidden group"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-brand-blue-marine font-bold">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xl text-gray-900">Unidade Vitória</h3>
                    <p className="text-xs text-brand-blue-marine font-medium">Ed. River Center - 5º Andar</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-gray-600 text-sm">
                  <p className="leading-relaxed">
                    <strong className="text-gray-900 block font-semibold mb-0.5">Endereço</strong>
                    Rua Cândido Portinari, 27, Sala 507 - Santa Luíza<br />Vitória - ES | CEP: 29045-415
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-gray-900 block font-semibold mb-0.5">Horário</strong>
                    Segunda a Sexta: 08:00 às 18:00 | Sábado: 08:00 às 12:00
                  </p>
                </div>
                
                <div className="w-full h-[250px] rounded-2xl overflow-hidden shadow-inner border border-gray-200/50">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7484.423881185257!2d-40.3109273064209!3d-20.291492699999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb8170054fd579b%3A0x87837a66ea0af76c!2sOdonto%20Fav%20Vit%C3%B3ria!5e0!3m2!1spt-BR!2sbr!4v1774023475356!5m2!1spt-BR!2sbr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale-[5%] contrast-110"
                  ></iframe>
                </div>
              </div>
              
              <div className="pt-6 flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://api.whatsapp.com/send/?phone=5527998654698&text=Ol%C3%A1%2C+vim+pelo+site%2C+quero+agendar+uma+consulta+em+Vit%C3%B3ria%21"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-blue-marine hover:bg-brand-blue text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md transform hover:-translate-y-0.5 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Agendar em Vitória
                </a>
                <a 
                  href="https://maps.google.com/?q=Odonto+Fav+Vitória" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-blue-marine border border-brand-blue-marine/20 hover:bg-brand-blue-marine/5 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-0.5 text-sm cursor-pointer"
                >
                  Ver Rota
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <GlowSection as="footer" className="bg-brand-blue-marine-dark text-white/80 py-16 border-t border-brand-blue">
        <div className="container mx-auto px-8 md:px-16 lg:px-32 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12 border-b border-white/10 pb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Image 
                  src="/logo_branco.png" 
                  alt="OdontoFav Logo" 
                  width={50} 
                  height={50} 
                  className="rounded-full border border-white/20"
                />
                <span className="text-2xl font-bold text-white tracking-tight">OdontoFav</span>
              </div>
              <p className="text-sm leading-relaxed">
                A transformação do seu sorriso em cada movimento. Especialistas certificados em Reabilitação Oral e Odontologia Estética Digital.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-xl">Navegação</h4>
              <ul className="space-y-4 text-sm">
                {navLinks.map(link => (
                  <li key={`footer-${link.id}`}>
                    <button onClick={() => handleNavClick(link.id)} className="hover:text-brand-light transition-colors cursor-pointer">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-xl">Contato</h4>
              <ul className="space-y-4 mb-6 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-white/60 shrink-0" />
                  <span>(27) 99865-4698</span>
                </li>
              </ul>
              <a 
                href={INSTAGRAM_LINK}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors w-fit text-sm"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-brand-blue-marine transition-all">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <span>@favodonto</span>
              </a>
            </div>
          </div>
          
          <div className="text-center text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} OdontoFav. Todos os direitos reservados.</p>
            <p>Dra. Rogéria Lima Becalli - Responsável Técnica</p>
          </div>
        </div>
      </GlowSection>

      {/* FLOATING WHATSAPP BUTTON */}
      <button
        onClick={() => setIsWhatsappModalOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-brand-blue-marine hover:bg-brand-blue-marine-dark text-white p-4 rounded-full shadow-2xl hover:shadow-[0_0_30px_rgba(26,49,81,0.6)] transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 flex items-center justify-center group cursor-pointer"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Fale com a gente!
        </span>
      </button>

      {/* WHATSAPP MODAL */}
      {isWhatsappModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsWhatsappModalOpen(false)}
          ></div>
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full relative z-10 shadow-2xl border border-gray-100 flex flex-col gap-6">
            <button 
              onClick={() => setIsWhatsappModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Agendar Avaliação</h3>
              <p className="text-sm text-gray-500">Escolha a unidade mais próxima para falar conosco pelo WhatsApp:</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <a 
                href="https://api.whatsapp.com/send/?phone=5527998654698&text=Ol%C3%A1%2C+vim+pelo+site%2C+quero+agendar+uma+consulta+na+Serra%21"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackConversion('Serra');
                  setIsWhatsappModalOpen(false);
                }}
                className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-brand-blue-marine/5 hover:border-brand-blue-marine/20 transition-all group"
              >
                <div className="flex flex-col gap-1 text-left">
                  <span className="font-bold text-gray-900 group-hover:text-brand-blue-marine transition-colors">Unidade Serra</span>
                  <span className="text-xs text-gray-500">Av. Jones dos Santos Neves, 429 - Caçaroca</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-blue-marine text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
              </a>

              <a 
                href="https://api.whatsapp.com/send/?phone=5527998654698&text=Ol%C3%A1%2C+vim+pelo+site%2C+quero+agendar+uma+consulta+em+Vit%C3%B3ria%21"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackConversion('Vitória');
                  setIsWhatsappModalOpen(false);
                }}
                className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-brand-blue-marine/5 hover:border-brand-blue-marine/20 transition-all group"
              >
                <div className="flex flex-col gap-1 text-left">
                  <span className="font-bold text-gray-900 group-hover:text-brand-blue-marine transition-colors">Unidade Vitória</span>
                  <span className="text-xs text-gray-500">Rua Cândido Portinari, 27 - Santa Luíza</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-blue-marine text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
              </a>
            </div>
            
            <p className="text-xs text-gray-400 text-center">Atendimento de Segunda a Sábado</p>
          </div>
        </div>
      )}
    </div>
  );
}
