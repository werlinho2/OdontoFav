"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, ArrowLeft, Clock, Calendar, CheckCircle2, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "5527998654698";

interface BlogPost {
  id: string;
  category: string;
  title: string;
  desc: string;
  date: string;
  readTime: string;
  image: string;
  introduction: string;
  paragraphs: string[];
  keyTakeaways?: string[];
  conclusion: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "alinhadores-invisiveis",
    category: "Ortodontia",
    title: "Alinhadores Invisíveis vs Aparelho Tradicional: Qual escolher?",
    desc: "Descubra as vantagens estéticas e de tempo dos novos alinhadores transparentes e se eles são adequados para o seu caso.",
    date: "08 Ago, 2026",
    readTime: "4 min de leitura",
    image: "https://images.unsplash.com/photo-1656514894252-fb336a3ad6a6?w=800&q=80",
    introduction: "A busca por um sorriso perfeitamente alinhado sempre esteve associada aos tradicionais aparelhos metálicos, cheios de fios e braquetes. Porém, a tecnologia odontológica evoluiu drasticamente, trazendo os alinhadores invisíveis como a principal alternativa para quem busca discrição e conforto.",
    paragraphs: [
      "Os alinhadores invisíveis são placas termoplásticas transparentes feitas sob medida através de um escaneamento digital 3D da boca do paciente. Isso elimina a necessidade daquelas massas de moldagem desconfortáveis do passado. A partir do modelo digital, a Dra. Rogéria Lima Becalli planeja todas as movimentações necessárias no computador, permitindo que você veja o resultado final antes de iniciar o tratamento.",
      "Uma das grandes vantagens dos alinhadores é a higiene. Por serem completamente removíveis, você pode retirá-los para se alimentar e escovar os dentes normalmente, evitando o acúmulo de placa bacteriana comum nos braquetes metálicos. Além disso, não há fios de metal para machucar as bochechas ou gengivas.",
      "Em termos de tempo, os alinhadores transparentes podem reduzir a duração do tratamento em até 50% em locais selecionados. Isso ocorre porque a força aplicada é distribuída de forma totalmente controlada e precisa em cada dente, otimizando as consultas de acompanhamento que tendem a ser mais rápidas e espaçadas."
    ],
    keyTakeaways: [
      "Praticamente invisíveis, mantendo a estética natural do seu sorriso durante o tratamento.",
      "100% removíveis, permitindo alimentação sem restrições e higiene bucal perfeita.",
      "Muito mais confortáveis, sem pontas de metal ou fios que machucam a boca.",
      "Previsibilidade total através do escaneamento digital e planejamento 3D."
    ],
    conclusion: "A escolha ideal depende do seu estilo de vida e do diagnóstico feito pelo ortodontista. Na OdontoFav, realizamos o escaneamento 3D completo em sua consulta de avaliação para definir qual a melhor tecnologia para o seu caso."
  },
  {
    id: "clareamento-dental",
    category: "Estética",
    title: "5 Dicas Essenciais para Manter seu Clareamento por Mais Tempo",
    desc: "Saiba quais alimentos evitar e quais hábitos fáceis de adotar no dia a dia ajudam a prolongar a brancura natural dos dentes.",
    date: "05 Ago, 2026",
    readTime: "3 min de leitura",
    image: "https://images.unsplash.com/photo-1684607633080-df59e6874367?w=800&q=80",
    introduction: "Ter dentes brancos e brilhantes é o desejo de quase todos os pacientes. O clareamento dental (seja a laser na clínica ou caseiro supervisionado) entrega resultados incríveis, mas a durabilidade desse novo sorriso depende diretamente dos cuidados pós-tratamento.",
    paragraphs: [
      "O esmalte dos dentes possui microporos que ficam temporariamente mais expostos logo após as sessões de clareamento. Por isso, as primeiras duas semanas são cruciais para evitar que novos corantes penetrem na estrutura dental e causem manchas precoces.",
      "Adotar pequenos hábitos diários pode prolongar o brilho por anos. Reduzir a frequência de bebidas ácidas e com forte pigmentação, escovar os dentes logo após refeições coloridas e utilizar cremes dentais neutros indicados pela clínica fazem toda a diferença na longevidade do resultado."
    ],
    keyTakeaways: [
      "Evite alimentos e bebidas com pigmentação forte (café, vinho tinto, refrigerantes de cola, açaí, molho de tomate e shoyu) principalmente nas duas primeiras semanas.",
      "Se consumir bebidas coloridas, utilize um canudo para diminuir o contato direto do líquido com os dentes frontais.",
      "Mantenha uma higiene impecável, escovando e usando fio dental após cada refeição. Se não puder escovar na hora, faça bochechos com água.",
      "Evite o tabagismo. A nicotina e o alcatrão são os principais vilões, amarelando o esmalte dentário de forma profunda e acelerada.",
      "Faça limpezas e profilaxias periódicas a cada 6 meses na OdontoFav para remover manchas superficiais acumuladas."
    ],
    conclusion: "O clareamento dental não é permanente, mas com esses cuidados você conseguirá manter o sorriso iluminado por muito mais tempo. Seus dentes merecem esse cuidado!"
  },
  {
    id: "implante-dentario",
    category: "Reabilitação",
    title: "A Importância do Implante Dentário para a Saúde Geral",
    desc: "Perder um dente vai além da estética. Entenda os impactos reais na mastigação, digestão e na estrutura óssea do rosto.",
    date: "01 Ago, 2026",
    readTime: "5 min de leitura",
    image: "https://images.unsplash.com/photo-1660737217649-e3bd4ef2888a?w=800&q=80",
    introduction: "A perda de um ou mais dentes é uma situação que afeta milhões de pessoas. Embora o impacto visual na estética seja a primeira reclamação, a falta de dentes desencadeia problemas de saúde física e funcional muito mais graves a longo prazo.",
    paragraphs: [
      "Os dentes funcionam em um sistema integrado. Quando um dente é perdido, os adjacentes começam a se inclinar para ocupar o espaço vazio, desalinhando a mordida e sobrecarregando a articulação temporomandibular (ATM), o que causa dores de cabeça e no pescoço.",
      "Além disso, a ausência da raiz dentária faz com que o osso da mandíbula ou maxilar sofra reabsorção (perda de densidade óssea). Com o tempo, isso altera a estrutura facial, dando um aspecto envelhecido precoce com bochechas caídas e lábios afinados.",
      "Os implantes dentários modernos agem exatamente como raízes artificiais de titânio integradas ao osso, devolvendo 100% da força mastigatória. Isso previne a atrofia óssea e permite uma alimentação saudável e nutritiva sem desconfortos digestivos."
    ],
    keyTakeaways: [
      "Preservação óssea da face, prevenindo o afinamento labial e o aspecto facial envelhecido.",
      "Restabelecimento completo da mastigação, facilitando a digestão e absorção de nutrientes.",
      "Estabilização da arcada dentária, impedindo a movimentação e desalinhamento dos outros dentes.",
      "Devolução total da segurança e autoestima para falar, sorrir e comer em público."
    ],
    conclusion: "Substituir dentes ausentes é uma questão de saúde integral e qualidade de vida. Na OdontoFav, utilizamos cirurgia guiada por computador, garantindo implantes rápidos, precisos e com recuperação extremamente confortável."
  }
];

function BlogContent() {
  const searchParams = useSearchParams();
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);

  useEffect(() => {
    const postId = searchParams.get("post");
    if (postId) {
      const post = blogPosts.find((p) => p.id === postId);
      if (post) {
        setActivePost(post);
        window.scrollTo(0, 0);
      }
    } else {
      setActivePost(null);
    }
  }, [searchParams]);

  const selectPost = (post: BlogPost | null) => {
    setActivePost(post);
    if (post) {
      window.history.pushState(null, "", `/blog?post=${post.id}`);
    } else {
      window.history.pushState(null, "", "/blog");
    }
    window.scrollTo(0, 0);
  };

  const trackConversion = (label: string) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', { content_name: `Blog - ${label}` });
    }
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-SEU_CONVERSION_ID_AQUI/SEU_CONVERSION_LABEL_AQUI',
        'event_category': 'WhatsApp',
        'event_label': `Blog - ${label}`
      });
    }
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        'event': 'whatsapp_click',
        'unidade': `Blog - ${label}`
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex flex-col justify-between">
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 py-4 px-6 md:px-16 flex justify-between items-center">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-brand-blue-marine hover:text-brand-blue font-bold transition-colors text-sm md:text-base group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Voltar para a Home</span>
        </Link>
        <Link href="/">
          <Image src="/logo.png" alt="OdontoFav Logo" width={110} height={35} className="w-auto h-[25px] md:h-[30px]" />
        </Link>
      </header>

      {/* CONTENT BLOCK */}
      <main className="flex-1 pb-24">
        <AnimatePresence mode="wait">
          {!activePost ? (
            // LIST VIEW
            <motion.div 
              key="list"
              className="container mx-auto px-6 md:px-16 lg:px-32 pt-12 md:pt-16 space-y-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight font-bodoni">
                  Blog <span className="text-brand-blue">Educativo</span>
                </h1>
                <p className="text-gray-600 text-lg">
                  Artigos e orientações profissionais sobre saúde bucal, estética do sorriso e inovações na odontologia.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-brand-blue-marine/10 transition-all duration-300 flex flex-col group cursor-pointer"
                    onClick={() => selectPost(post)}
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
                        <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-xl leading-snug group-hover:text-brand-blue transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {post.desc}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-brand-blue-marine group-hover:text-brand-blue flex items-center gap-1.5 transition-colors">
                        <span>Ler Artigo Completo</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          ) : (
            // ARTICLE DETAIL VIEW
            <motion.div 
              key="detail"
              className="container mx-auto px-6 md:px-16 lg:px-32 pt-12 md:pt-16 max-w-4xl space-y-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Back Button */}
              <button 
                onClick={() => selectPost(null)}
                className="inline-flex items-center gap-2 text-brand-blue-marine hover:text-brand-blue font-bold transition-colors cursor-pointer text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar para a Lista de Artigos</span>
              </button>

              {/* Cover Image & Category */}
              <div className="relative h-[250px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-md">
                <Image 
                  src={activePost.image} 
                  alt={activePost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-6 left-6 bg-brand-blue-marine text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                  {activePost.category}
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-bodoni">
                  {activePost.title}
                </h1>
                <div className="flex items-center gap-6 text-sm text-gray-400 font-medium">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{activePost.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{activePost.readTime}</span>
                </div>
              </div>

              {/* Rich Body Content */}
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">
                <p className="font-semibold text-gray-900 border-l-4 border-brand-blue pl-4 italic">
                  {activePost.introduction}
                </p>

                {activePost.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}

                {activePost.keyTakeaways && (
                  <div className="my-8 bg-brand-light p-6 md:p-8 rounded-2xl border border-brand-accent/20 space-y-4">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue-marine" />
                      <span>Diferenciais e Cuidados Importantes</span>
                    </h4>
                    <ul className="space-y-3 text-sm md:text-base text-gray-700">
                      {activePost.keyTakeaways.map((item, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <span className="text-brand-blue font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="pt-4 border-t border-gray-100 text-gray-600">
                  {activePost.conclusion}
                </p>
              </div>

              {/* CTA Schedule Appointment */}
              <div className="bg-brand-blue-marine text-white rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
                <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold">Quer saber qual tratamento é ideal para você?</h3>
                  <p className="text-white/80 text-sm md:text-base">
                    Agende uma consulta com a Dra. Rogéria Lima Becalli na OdontoFav. Realizamos planejamento digital 3D completo em Serra e Vitória.
                  </p>
                  <button 
                    onClick={() => setIsWhatsappModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-white text-brand-blue-marine hover:bg-brand-light px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-md hover:scale-105 cursor-pointer mt-4"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Falar no WhatsApp</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-blue-marine-dark text-white/50 text-center py-6 border-t border-white/5 text-xs">
        <p>© 2026 OdontoFav - Todos os direitos reservados. RT: Dra. Rogéria Lima Becalli (CRO-ES)</p>
      </footer>

      {/* WHATSAPP UNIT SELECTOR MODAL */}
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
                className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-brand-blue-marine/5 hover:border-brand-blue-marine/20 transition-all group animate-none"
              >
                <div className="flex flex-col gap-1 text-left">
                  <span className="font-bold text-gray-900 group-hover:text-brand-blue-marine transition-colors font-sans">Unidade Serra</span>
                  <span className="text-xs text-gray-500 font-sans">Av. Jones dos Santos Neves, 429 - Caçaroca</span>
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
                className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-brand-blue-marine/5 hover:border-brand-blue-marine/20 transition-all group animate-none"
              >
                <div className="flex flex-col gap-1 text-left">
                  <span className="font-bold text-gray-900 group-hover:text-brand-blue-marine transition-colors font-sans">Unidade Vitória</span>
                  <span className="text-xs text-gray-500 font-sans">Rua Cândido Portinari, 27 - Santa Luíza</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-blue-marine text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-light flex items-center justify-center text-brand-blue-marine font-bold">Carregando...</div>}>
      <BlogContent />
    </Suspense>
  );
}
